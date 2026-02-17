#!/bin/bash

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# 命名空间
NAMESPACE="user-center"

# 打印带颜色的消息
print_info() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warn() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# 检查 kubectl 是否安装
check_kubectl() {
    if ! command -v kubectl &> /dev/null; then
        print_error "kubectl 未安装，请先安装 kubectl"
        exit 1
    fi
    print_info "kubectl 已安装"
}

# 检查集群连接
check_cluster() {
    if ! kubectl cluster-info &> /dev/null; then
        print_error "无法连接到 Kubernetes 集群"
        exit 1
    fi
    print_info "已连接到 Kubernetes 集群"
}

# 等待 Pod 就绪
wait_for_pods() {
    local namespace=$1
    local timeout=$2

    print_info "等待 Pod 就绪 (超时: ${timeout}s)..."
    local elapsed=0
    while [ $elapsed -lt $timeout ]; do
        local not_ready=$(kubectl get pods -n $namespace -o json | jq '.items[] | select(.status.phase != "Running" or (.status.conditions[] | select(.type == "Ready" and .status != "True")) | true )' | wc -l)
        if [ "$not_ready" -eq 0 ]; then
            print_info "所有 Pod 已就绪"
            return 0
        fi
        sleep 5
        elapsed=$((elapsed + 5))
        echo -n "."
    done
    echo ""
    print_warn "部分 Pod 未能在 ${timeout}s 内就绪"
    kubectl get pods -n $namespace
    return 1
}

# 部署基础设施
deploy_infrastructure() {
    print_info "开始部署基础设施..."

    # 创建命名空间
    kubectl apply -f k8s/00-namespace.yaml
    print_info "命名空间创建完成"

    # 部署 MySQL
    print_info "部署 MySQL..."
    kubectl apply -f k8s/mysql/statefulset.yaml
    sleep 5

    # 等待 MySQL 就绪
    print_info "等待 MySQL 就绪..."
    kubectl wait --for=condition=ready pod -l app=mysql -n $NAMESPACE --timeout=300s

    # 部署 Redis
    print_info "部署 Redis..."
    kubectl apply -f k8s/redis/deployment.yaml
    sleep 5

    # 等待 Redis 就绪
    print_info "等待 Redis 就绪..."
    kubectl wait --for=condition=ready pod -l app=redis -n $NAMESPACE --timeout=120s

    print_info "基础设施部署完成"
}

# 部署业务服务
deploy_services() {
    print_info "开始部署业务服务..."

    # 部署用户服务
    print_info "部署用户服务..."
    kubectl apply -f k8s/user-service/deployment.yaml
    sleep 2

    # 部署认证服务
    print_info "部署认证服务..."
    kubectl apply -f k8s/auth-service/deployment.yaml
    sleep 2

    # 部署权限服务
    print_info "部署权限服务..."
    kubectl apply -f k8s/permission-service/deployment.yaml
    sleep 2

    # 部署租户服务
    print_info "部署租户服务..."
    kubectl apply -f k8s/tenant-service/deployment.yaml
    sleep 2

    # 部署用户画像服务
    print_info "部署用户画像服务..."
    kubectl apply -f k8s/profile-service/deployment.yaml
    sleep 2

    # 等待所有服务就绪
    print_info "等待所有服务就绪..."
    kubectl wait --for=condition=available deployment -l component=service -n $NAMESPACE --timeout=600s

    print_info "业务服务部署完成"
}

# 部署监控
deploy_monitoring() {
    print_info "开始部署监控..."

    # 部署 ServiceMonitor
    kubectl apply -f monitoring/prometheus/servicemonitor.yaml

    # 部署告警规则
    kubectl apply -f monitoring/prometheus/prometheus-rule.yaml

    print_info "监控部署完成"
}

# 部署 Ingress
deploy_ingress() {
    print_info "开始部署 Ingress..."
    kubectl apply -f k8s/ingress/ingress.yaml
    print_info "Ingress 部署完成"
}

# 完整部署
deploy_all() {
    print_info "开始完整部署..."
    deploy_infrastructure
    deploy_services
    deploy_ingress
    deploy_monitoring
    wait_for_pods $NAMESPACE 600
    print_info "完整部署完成!"
    show_status
}

# 验证部署
verify() {
    print_info "开始验证部署..."

    echo ""
    print_info "=== Pod 状态 ==="
    kubectl get pods -n $NAMESPACE -o wide

    echo ""
    print_info "=== Service 状态 ==="
    kubectl get svc -n $NAMESPACE

    echo ""
    print_info "=== HPA 状态 ==="
    kubectl get hpa -n $NAMESPACE

    echo ""
    print_info "=== Ingress 状态 ==="
    kubectl get ingress -n $NAMESPACE

    echo ""
    print_info "=== PVC 状态 ==="
    kubectl get pvc -n $NAMESPACE

    echo ""
    print_info "验证完成"
}

# 显示状态
show_status() {
    print_info "当前部署状态:"
    verify
}

# 显示日志
show_logs() {
    local service=$1
    if [ -z "$service" ]; then
        print_error "请指定服务名称: ./deploy.sh logs <service-name>"
        echo "可用服务: user-service, auth-service, permission-service, tenant-service, profile-service"
        exit 1
    fi

    print_info "查看 ${service} 日志..."
    kubectl logs -l app=${service} -n $NAMESPACE --tail=100 -f
}

# 端口转发
port_forward() {
    local service=$1
    local local_port=$2
    local remote_port=${3:-8080}

    if [ -z "$service" ] || [ -z "$local_port" ]; then
        print_error "用法: ./deploy.sh port-forward <service-name> <local-port> [remote-port]"
        exit 1
    fi

    print_info "端口转发: ${service} ${local_port}:${remote_port}"
    kubectl port-forward svc/${service} -n $NAMESPACE ${local_port}:${remote_port}
}

# 清理资源
cleanup() {
    print_warn "即将删除所有资源..."
    read -p "确认删除? (yes/no): " confirm

    if [ "$confirm" != "yes" ]; then
        print_info "取消清理"
        exit 0
    fi

    print_info "开始清理..."
    kubectl delete namespace $NAMESPACE
    print_info "清理完成"

    print_warn "PV 需要手动删除:"
    kubectl get pv | grep $NAMESPACE | awk '{print $1}'
}

# 显示帮助
show_help() {
    echo "用户中心系统部署脚本"
    echo ""
    echo "用法: ./deploy.sh [command]"
    echo ""
    echo "命令:"
    echo "  all              完整部署 (基础设施 + 服务 + 监控)"
    echo "  infra            仅部署基础设施 (MySQL, Redis)"
    echo "  services         仅部署业务服务"
    echo "  monitoring       仅部署监控"
    echo "  ingress          仅部署 Ingress"
    echo "  verify           验证部署状态"
    echo "  status           查看部署状态"
    echo "  logs <service>   查看服务日志"
    echo "  port-forward <service> <local-port> [remote-port]  端口转发"
    echo "  cleanup          清理所有资源"
    echo "  help             显示帮助信息"
    echo ""
    echo "示例:"
    echo "  ./deploy.sh all"
    echo "  ./deploy.sh services"
    echo "  ./deploy.sh logs user-service"
    echo "  ./deploy.sh port-forward mysql 3306 3306"
}

# 主函数
main() {
    check_kubectl
    check_cluster

    local command=$1

    case $command in
        all)
            deploy_all
            ;;
        infra)
            deploy_infrastructure
            ;;
        services)
            deploy_services
            ;;
        monitoring)
            deploy_monitoring
            ;;
        ingress)
            deploy_ingress
            ;;
        verify)
            verify
            ;;
        status)
            show_status
            ;;
        logs)
            show_logs $2
            ;;
        port-forward)
            port_forward $2 $3 $4
            ;;
        cleanup)
            cleanup
            ;;
        help|--help|-h)
            show_help
            ;;
        *)
            print_error "未知命令: $command"
            echo ""
            show_help
            exit 1
            ;;
    esac
}

# 执行主函数
main $@
