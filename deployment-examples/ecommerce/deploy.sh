#!/bin/bash

# 电商微服务系统 K8s 自动部署脚本
# 使用方法: ./deploy.sh [step]
# step: all | infra | services | monitoring | cleanup

set -e

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# 配置
NAMESPACE="ecommerce"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
K8S_DIR="${SCRIPT_DIR}/k8s"

# 日志函数
log_info() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

log_warn() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# 检查 kubectl
check_kubectl() {
    if ! command -v kubectl &> /dev/null; then
        log_error "kubectl 未安装，请先安装 kubectl"
        exit 1
    fi
    log_info "kubectl 版本: $(kubectl version --client --short)"
}

# 检查集群连接
check_cluster() {
    if ! kubectl cluster-info &> /dev/null; then
        log_error "无法连接到 Kubernetes 集群"
        exit 1
    fi
    log_info "已连接到集群: $(kubectl config current-context)"
}

# 等待 Pod 就绪
wait_for_pods() {
    local label=$1
    local namespace=$2
    local timeout=${3:-300}

    log_info "等待 Pod 就绪 (标签: $label, 命名空间: $namespace)"

    local elapsed=0
    while [ $elapsed -lt $timeout ]; do
        local ready=$(kubectl get pods -n "$namespace" -l "$label" -o jsonpath='{.items[*].status.conditions[?(@.type=="Ready")].status}' 2>/dev/null | tr ' ' '\n' | grep -c "True" || echo "0")
        local total=$(kubectl get pods -n "$namespace" -l "$label" -o jsonpath='{.items}' | jq '. | length' 2>/dev/null || echo "0")

        if [ "$ready" -eq "$total" ] && [ "$total" -gt 0 ]; then
            log_info "所有 Pod 已就绪 ($ready/$total)"
            return 0
        fi

        log_info "等待中... ($ready/$total Pod 就绪)"
        sleep 10
        elapsed=$((elapsed + 10))
    done

    log_error "等待 Pod 超时"
    return 1
}

# 创建命名空间
create_namespace() {
    log_info "创建命名空间: $NAMESPACE"
    kubectl apply -f "${K8S_DIR}/00-namespace.yaml"
    log_info "命名空间创建完成"
}

# 部署基础设施
deploy_infrastructure() {
    log_info "========== 开始部署基础设施 =========="

    # MySQL
    log_info "部署 MySQL..."
    kubectl apply -f "${K8S_DIR}/mysql/"
    log_info "等待 MySQL 就绪..."
    wait_for_pods "app=mysql" "$NAMESPACE" 600

    # Nacos
    log_info "部署 Nacos..."
    kubectl apply -f "${K8S_DIR}/nacos/"
    log_info "等待 Nacos 就绪..."
    wait_for_pods "app=nacos" "$NAMESPACE" 600

    # Redis
    log_info "部署 Redis..."
    kubectl apply -f "${K8S_DIR}/redis/"
    log_info "等待 Redis 就绪..."
    wait_for_pods "app=redis" "$NAMESPACE" 300

    log_info "========== 基础设施部署完成 =========="
}

# 部署业务服务
deploy_services() {
    log_info "========== 开始部署业务服务 =========="

    # Gateway
    log_info "部署 Gateway..."
    kubectl apply -f "${K8S_DIR}/gateway/"
    log_info "等待 Gateway 就绪..."
    wait_for_pods "app=gateway" "$NAMESPACE" 300

    # Order Service
    log_info "部署订单服务..."
    kubectl apply -f "${K8S_DIR}/services/order-service/"
    log_info "等待订单服务就绪..."
    wait_for_pods "app=order-service" "$NAMESPACE" 300

    # User Service
    log_info "部署用户服务..."
    kubectl apply -f "${K8S_DIR}/services/user-service/"
    log_info "等待用户服务就绪..."
    wait_for_pods "app=user-service" "$NAMESPACE" 300

    # Payment Service
    log_info "部署支付服务..."
    kubectl apply -f "${K8S_DIR}/services/payment-service/"
    log_info "等待支付服务就绪..."
    wait_for_pods "app=payment-service" "$NAMESPACE" 300

    # Ingress
    log_info "部署 Ingress..."
    kubectl apply -f "${K8S_DIR}/ingress/"

    log_info "========== 业务服务部署完成 =========="
}

# 部署监控
deploy_monitoring() {
    log_info "========== 开始部署监控 =========="
    kubectl apply -f "${SCRIPT_DIR}/monitoring/prometheus/"
    log_info "监控配置已应用"
    log_info "========== 监控部署完成 =========="
}

# 验证部署
verify_deployment() {
    log_info "========== 验证部署 =========="

    log_info "检查所有 Pod 状态..."
    kubectl get pods -n "$NAMESPACE" -o wide

    log_info "\n检查 Service 状态..."
    kubectl get svc -n "$NAMESPACE"

    log_info "\n检查 HPA 状态..."
    kubectl get hpa -n "$NAMESPACE"

    log_info "\n检查 Ingress 状态..."
    kubectl get ingress -n "$NAMESPACE"

    log_info "========== 验证完成 =========="
}

# 显示访问信息
show_access_info() {
    log_info "========== 访问信息 =========="

    # Gateway Service
    GATEWAY_PORT=$(kubectl get svc gateway -n "$NAMESPACE" -o jsonpath='{.spec.ports[0].port}')
    log_info "Gateway 内部访问地址: gateway.$NAMESPACE.svc.cluster.local:$GATEWAY_PORT"

    # Nacos
    NACOS_PORT=$(kubectl get svc nacos -n "$NAMESPACE" -o jsonpath='{.spec.ports[0].port}')
    log_info "Nacos 内部访问地址: nacos.$NAMESPACE.svc.cluster.local:$NACOS_PORT"

    # Ingress
    INGRESS_HOST=$(kubectl get ingress ecommerce-ingress -n "$NAMESPACE" -o jsonpath='{.spec.rules[0].host}')
    log_info "Ingress 外部访问地址: $INGRESS_HOST"

    # Port Forward 命令
    log_info "\n本地调试命令:"
    log_info "  Gateway:   kubectl port-forward -n $NAMESPACE svc/gateway 8080:8080"
    log_info "  Nacos:     kubectl port-forward -n $NAMESPACE svc/nacos 8848:8848"
    log_info "  Prometheus: kubectl port-forward -n monitoring svc/prometheus-operated 9090:9090"

    log_info "========== 访问信息显示完成 =========="
}

# 清理资源
cleanup() {
    log_warn "========== 清理资源 =========="
    log_warn "这将删除命名空间 $NAMESPACE 下的所有资源"
    read -p "确认删除? (yes/no): " confirm

    if [ "$confirm" = "yes" ]; then
        kubectl delete namespace "$NAMESPACE"
        log_info "命名空间 $NAMESPACE 已删除"
    else
        log_info "取消删除"
    fi
}

# 显示帮助
show_help() {
    cat << EOF
电商微服务系统 K8s 自动部署脚本

使用方法:
    $0 [命令]

命令:
    all         部署所有组件 (默认)
    infra       仅部署基础设施 (MySQL, Nacos, Redis)
    services    仅部署业务服务 (Gateway, 业务服务, Ingress)
    monitoring  仅部署监控配置
    verify      验证部署状态
    cleanup     清理所有资源
    help        显示帮助信息

示例:
    $0 all                    # 完整部署
    $0 infra                  # 仅部署基础设施
    $0 services               # 仅部署业务服务
    $0 verify                 # 验证部署

注意事项:
    1. 确保 kubectl 已配置并可访问集群
    2. 确保已创建名为 fast-ssd 的 StorageClass
    3. 部署前请先更新镜像仓库地址
    4. 生产环境请修改默认密码

EOF
}

# 主函数
main() {
    local command=${1:-all}

    check_kubectl
    check_cluster

    case $command in
        all)
            create_namespace
            deploy_infrastructure
            deploy_services
            deploy_monitoring
            verify_deployment
            show_access_info
            ;;
        infra)
            create_namespace
            deploy_infrastructure
            verify_deployment
            ;;
        services)
            deploy_services
            verify_deployment
            ;;
        monitoring)
            deploy_monitoring
            verify_deployment
            ;;
        verify)
            verify_deployment
            show_access_info
            ;;
        cleanup)
            cleanup
            ;;
        help|--help|-h)
            show_help
            ;;
        *)
            log_error "未知命令: $command"
            show_help
            exit 1
            ;;
    esac
}

# 执行主函数
main "$@"
