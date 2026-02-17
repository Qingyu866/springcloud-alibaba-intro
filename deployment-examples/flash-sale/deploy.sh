#!/bin/bash
# 秒杀系统 - 自动化部署脚本
# 用途：基于 Redis 预减库存 + RocketMQ 异步下单的高并发秒杀系统部署

set -e  # 遇到错误立即退出
set -u  # 使用未定义变量时报错
set -o pipefail  # 管道命令失败时退出

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 配置变量
NAMESPACE="flash-sale"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
K8S_DIR="${SCRIPT_DIR}/k8s"

# 日志函数
log_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# 检查依赖
check_dependencies() {
    log_info "检查依赖工具..."

    local dependencies=("kubectl" "helm" "jq")
    for cmd in "${dependencies[@]}"; do
        if ! command -v "$cmd" &> /dev/null; then
            log_error "缺少依赖工具: $cmd"
            exit 1
        fi
    done

    # 检查 kubectl 连接
    if ! kubectl cluster-info &> /dev/null; then
        log_error "无法连接到 Kubernetes 集群"
        exit 1
    fi

    log_success "依赖检查通过"
}

# 创建命名空间
create_namespace() {
    log_info "创建命名空间: ${NAMESPACE}"

    if kubectl get namespace "${NAMESPACE}" &> /dev/null; then
        log_warning "命名空间 ${NAMESPACE} 已存在，跳过创建"
    else
        kubectl apply -f "${K8S_DIR}/00-namespace.yaml"
        log_success "命名空间创建成功"
    fi
}

# 部署基础设施
deploy_infrastructure() {
    log_info "部署基础设施（Redis 集群 + RocketMQ）..."

    # Redis 集群（3副本）
    log_info "部署 Redis 集群（3副本）..."
    kubectl apply -f "${K8S_DIR}/redis/"
    log_success "Redis 集群部署完成"

    # 等待 Redis 就绪
    log_info "等待 Redis 就绪..."
    kubectl wait --for=condition=ready pod -l app=redis -n "${NAMESPACE}" --timeout=300s || true

    # RocketMQ（2副本）
    log_info "部署 RocketMQ（2副本）..."
    kubectl apply -f "${K8S_DIR}/rocketmq/"
    log_success "RocketMQ 部署完成"

    # 等待 RocketMQ 就绪
    log_info "等待 RocketMQ 就绪..."
    kubectl wait --for=condition=ready pod -l app=rocketmq-broker -n "${NAMESPACE}" --timeout=300s || true
    kubectl wait --for=condition=ready pod -l app=rocketmq-namesrv -n "${NAMESPACE}" --timeout=180s || true

    log_success "基础设施部署完成"
}

# 部署业务服务
deploy_services() {
    log_info "部署业务服务..."

    # 库存服务
    log_info "部署库存服务..."
    kubectl apply -f "${K8S_DIR}/inventory-service/"
    log_success "库存服务部署完成"

    # 订单服务
    log_info "部署订单服务（5副本 + HPA）..."
    kubectl apply -f "${K8S_DIR}/order-service/"
    log_success "订单服务部署完成"

    # 网关
    log_info "部署网关（3副本 + HPA）..."
    kubectl apply -f "${K8S_DIR}/gateway/"
    log_success "网关部署完成"

    # 等待服务就绪
    log_info "等待服务就绪..."
    kubectl wait --for=condition=ready pod -l app=inventory-service -n "${NAMESPACE}" --timeout=300s || true
    kubectl wait --for=condition=ready pod -l app=order-service -n "${NAMESPACE}" --timeout=300s || true
    kubectl wait --for=condition=ready pod -l app=gateway -n "${NAMESPACE}" --timeout=300s || true

    log_success "业务服务部署完成"
}

# 部署 Ingress
deploy_ingress() {
    log_info "部署 Ingress..."
    kubectl apply -f "${K8S_DIR}/ingress/"
    log_success "Ingress 部署完成"
}

# 部署监控
deploy_monitoring() {
    log_info "部署监控组件..."

    # Prometheus ServiceMonitor
    log_info "部署 Prometheus ServiceMonitor..."
    kubectl apply -f "${SCRIPT_DIR}/monitoring/prometheus/servicemonitor.yaml"
    log_success "ServiceMonitor 部署完成"

    # Prometheus 告警规则
    log_info "部署 Prometheus 告警规则..."
    kubectl apply -f "${SCRIPT_DIR}/monitoring/prometheus/prometheus-rule.yaml"
    log_success "告警规则部署完成"

    # Grafana Dashboard
    log_info "部署 Grafana Dashboard..."
    # 注意：Dashboard 需要手动导入到 Grafana
    log_warning "Grafana Dashboard 需要手动导入: ${SCRIPT_DIR}/monitoring/grafana/dashboard.json"

    log_success "监控组件部署完成"
}

# 完整部署
deploy_all() {
    log_info "开始完整部署秒杀系统..."

    check_dependencies
    create_namespace
    deploy_infrastructure
    deploy_services
    deploy_ingress
    deploy_monitoring

    log_success "秒杀系统部署完成！"
    echo ""
    log_info "下一步操作："
    echo "  1. 查看所有 Pod 状态："
    echo "     kubectl get pods -n ${NAMESPACE}"
    echo ""
    echo "  2. 查看 HPA 状态："
    echo "     kubectl get hpa -n ${NAMESPACE}"
    echo ""
    echo "  3. 查看服务端点："
    echo "     kubectl get svc -n ${NAMESPACE}"
    echo ""
    echo "  4. 导入 Grafana Dashboard："
    echo "     上传 ${SCRIPT_DIR}/monitoring/grafana/dashboard.json 到 Grafana"
}

# 验证部署
verify_deployment() {
    log_info "验证部署状态..."

    echo ""
    log_info "=== Pod 状态 ==="
    kubectl get pods -n "${NAMESPACE}" -o wide

    echo ""
    log_info "=== Service 状态 ==="
    kubectl get svc -n "${NAMESPACE}"

    echo ""
    log_info "=== HPA 状态 ==="
    kubectl get hpa -n "${NAMESPACE}"

    echo ""
    log_info "=== Ingress 状态 ==="
    kubectl get ingress -n "${NAMESPACE}"

    echo ""
    log_info "=== 部署健康检查 ==="
    local not_ready_pods=$(kubectl get pods -n "${NAMESPACE}" --no-headers | grep -v "Running\|Succeeded" | wc -l)
    if [ "$not_ready_pods" -eq 0 ]; then
        log_success "所有 Pod 运行正常"
    else
        log_warning "有 $not_ready_pods 个 Pod 未就绪"
    fi
}

# 清理资源
cleanup() {
    log_warning "清理所有资源..."

    read -p "确认删除命名空间 ${NAMESPACE} 及其所有资源？(yes/no): " confirm
    if [ "$confirm" != "yes" ]; then
        log_info "取消清理"
        return
    fi

    kubectl delete namespace "${NAMESPACE}"
    log_success "清理完成"
}

# 显示帮助
show_help() {
    cat << EOF
秒杀系统 - 自动化部署脚本

用法: $0 [命令]

命令:
  all         完整部署（基础设施 + 服务 + 监控）
  infra       仅部署基础设施（Redis + RocketMQ）
  services    仅部署业务服务（库存 + 订单 + 网关）
  monitoring  仅部署监控组件
  ingress     仅部署 Ingress
  verify      验证部署状态
  cleanup     清理所有资源
  help        显示此帮助信息

示例:
  $0 all              # 完整部署
  $0 infra            # 仅部署基础设施
  $0 verify           # 验证部署

特性:
  - Redis 集群模式（3副本）
  - RocketMQ Broker（2副本）
  - 订单服务（5副本 + HPA 5-20）
  - 库存服务（3副本 + HPA 3-10）
  - 网关（3副本 + HPA 3-10）
  - Prometheus 监控
  - 秒杀专用告警规则

文档: README.md
EOF
}

# 主函数
main() {
    case "${1:-help}" in
        all)
            deploy_all
            verify_deployment
            ;;
        infra)
            check_dependencies
            create_namespace
            deploy_infrastructure
            verify_deployment
            ;;
        services)
            check_dependencies
            deploy_services
            verify_deployment
            ;;
        monitoring)
            check_dependencies
            deploy_monitoring
            ;;
        ingress)
            check_dependencies
            deploy_ingress
            ;;
        verify)
            verify_deployment
            ;;
        cleanup)
            cleanup
            ;;
        help|*)
            show_help
            ;;
    esac
}

# 执行主函数
main "$@"
