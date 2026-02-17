#!/bin/bash
# Spring Cloud Alibaba 综合项目 - 自动化部署脚本
# 支持：15+ 微服务 + 完整基础设施 + 监控 + 日志 + CI/CD

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
NAMESPACE="springcloud-alibaba"
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

# 创建 Secrets
create_secrets() {
    log_info "创建 Secrets..."

    # MySQL Secret
    if ! kubectl get secret mysql-secret -n "${NAMESPACE}" &> /dev/null; then
        kubectl apply -f "${K8S_DIR}/mysql/04-secret.yaml"
        log_success "MySQL Secret 创建成功"
    else
        log_warning "MySQL Secret 已存在"
    fi

    # Elasticsearch Secret
    if ! kubectl get secret elasticsearch-secret -n "${NAMESPACE}" &> /dev/null; then
        kubectl apply -f "${SCRIPT_DIR}/logging/elasticsearch/01-statefulset.yaml"
        log_success "Elasticsearch Secret 创建成功"
    else
        log_warning "Elasticsearch Secret 已存在"
    fi
}

# 部署基础设施
deploy_infrastructure() {
    log_info "部署基础设施（Nacos + MySQL + Redis + RocketMQ + Seata + Jaeger）..."

    # Nacos 集群
    log_info "部署 Nacos 集群（3副本）..."
    kubectl apply -f "${K8S_DIR}/nacos/"
    log_success "Nacos 集群部署完成"

    # 等待 Nacos 就绪
    log_info "等待 Nacos 就绪..."
    kubectl wait --for=condition=ready pod -l app=nacos -n "${NAMESPACE}" --timeout=600s || true

    # MySQL 主从集群
    log_info "部署 MySQL 主从集群（1主2从）..."
    kubectl apply -f "${K8S_DIR}/mysql/"
    log_success "MySQL 集群部署完成"

    # 等待 MySQL 就绪
    log_info "等待 MySQL 就绪..."
    kubectl wait --for=condition=ready pod -l app=mysql -n "${NAMESPACE}" --timeout=600s || true

    # Redis 集群
    log_info "部署 Redis 集群（3主3从）..."
    kubectl apply -f "${K8S_DIR}/redis/"
    log_success "Redis 集群部署完成"

    # 等待 Redis 就绪
    log_info "等待 Redis 就绪..."
    kubectl wait --for=condition=ready pod -l app=redis -n "${NAMESPACE}" --timeout=600s || true

    # RocketMQ
    log_info "部署 RocketMQ（2副本）..."
    kubectl apply -f "${K8S_DIR}/rocketmq/"
    log_success "RocketMQ 部署完成"

    # 等待 RocketMQ 就绪
    log_info "等待 RocketMQ 就绪..."
    kubectl wait --for=condition=ready pod -l app=rocketmq-broker -n "${NAMESPACE}" --timeout=600s || true

    # Seata TC
    log_info "部署 Seata TC 集群（3副本）..."
    kubectl apply -f "${K8S_DIR}/seata/"
    log_success "Seata TC 部署完成"

    # 等待 Seata 就绪
    log_info "等待 Seata 就绪..."
    kubectl wait --for=condition=ready pod -l app=seata -n "${NAMESPACE}" --timeout=300s || true

    # Jaeger
    log_info "部署 Jaeger 链路追踪..."
    kubectl apply -f "${K8S_DIR}/jaeger/"
    log_success "Jaeger 部署完成"

    log_success "基础设施部署完成"
}

# 部署业务服务
deploy_services() {
    log_info "部署业务服务..."

    # 核心服务
    log_info "部署 Gateway（3副本 + HPA）..."
    kubectl apply -f "${K8S_DIR}/gateway/"
    log_success "Gateway 部署完成"

    log_info "部署订单服务..."
    kubectl apply -f "${K8S_DIR}/services/01-order-service.yaml"
    log_success "订单服务部署完成"

    log_info "部署用户服务..."
    kubectl apply -f "${K8S_DIR}/services/02-user-service.yaml"
    log_success "用户服务部署完成"

    log_info "部署秒杀订单服务（5副本 + HPA）..."
    kubectl apply -f "${K8S_DIR}/services/03-flash-order-service.yaml"
    log_success "秒杀订单服务部署完成"

    log_info "部署库存服务..."
    kubectl apply -f "${K8S_DIR}/services/04-inventory-service.yaml"
    log_success "库存服务部署完成"

    log_info "部署支付服务..."
    kubectl apply -f "${K8S_DIR}/services/05-payment-service.yaml"
    log_success "支付服务部署完成"

    log_info "部署支付回调服务..."
    kubectl apply -f "${K8S_DIR}/services/06-callback-service.yaml"
    log_success "支付回调服务部署完成"

    log_info "部署其他服务（认证、权限、租户、画像、对账）..."
    kubectl apply -f "${K8S_DIR}/services/07-11-services-batch.yaml"
    log_success "其他服务部署完成"

    # 等待服务就绪
    log_info "等待服务就绪..."
    kubectl wait --for=condition=ready pod -l component=api-gateway -n "${NAMESPACE}" --timeout=600s || true
    kubectl wait --for=condition=ready pod -l component=business-service -n "${NAMESPACE}" --timeout=600s || true

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
    kubectl apply -f "${SCRIPT_DIR}/monitoring/prometheus/01-servicemonitor.yaml"
    log_success "ServiceMonitor 部署完成"

    # Prometheus 告警规则
    log_info "部署 Prometheus 告警规则（50+ 规则）..."
    kubectl apply -f "${SCRIPT_DIR}/monitoring/prometheus/02-prometheus-rules.yaml"
    log_success "告警规则部署完成"

    # Grafana Dashboard
    log_info "部署 Grafana Dashboard..."
    kubectl apply -f "${SCRIPT_DIR}/monitoring/grafana/01-dashboard-configmap.yaml"
    log_success "Grafana Dashboard 部署完成"

    # AlertManager
    log_info "部署 AlertManager..."
    kubectl apply -f "${SCRIPT_DIR}/monitoring/alertmanager/01-alertmanager-config.yaml"
    log_success "AlertManager 部署完成"

    log_success "监控组件部署完成"
}

# 部署日志系统
deploy_logging() {
    log_info "部署日志系统..."

    # Elasticsearch
    log_info "部署 Elasticsearch 集群（3副本）..."
    kubectl apply -f "${SCRIPT_DIR}/logging/elasticsearch/01-statefulset.yaml"
    log_success "Elasticsearch 部署完成"

    # 等待 Elasticsearch 就绪
    log_info "等待 Elasticsearch 就绪..."
    kubectl wait --for=condition=ready pod -l app=elasticsearch -n "${NAMESPACE}" --timeout=900s || true

    # Kibana
    log_info "部署 Kibana..."
    kubectl apply -f "${SCRIPT_DIR}/logging/kibana/01-deployment.yaml"
    log_success "Kibana 部署完成"

    # Filebeat
    log_info "部署 Filebeat 日志采集..."
    kubectl apply -f "${SCRIPT_DIR}/logging/filebeat/01-daemonset.yaml"
    log_success "Filebeat 部署完成"

    log_success "日志系统部署完成"
}

# 完整部署
deploy_all() {
    log_info "开始完整部署 Spring Cloud Alibaba 综合项目..."

    check_dependencies
    create_namespace
    create_secrets
    deploy_infrastructure
    deploy_services
    deploy_ingress
    deploy_monitoring
    deploy_logging

    log_success "Spring Cloud Alibaba 综合项目部署完成！"
    echo ""
    log_info "=========================================="
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
    echo "  4. 查看 Ingress："
    echo "     kubectl get ingress -n ${NAMESPACE}"
    echo ""
    echo "  5. 访问 Nacos 控制台："
    echo "     kubectl port-forward -n ${NAMESPACE} svc/nacos-ui 8848:8848"
    echo "     浏览器打开: http://localhost:8848/nacos"
    echo ""
    echo "  6. 访问 Grafana："
    echo "     kubectl port-forward -n ${NAMESPACE} svc/grafana 3000:80"
    echo "     浏览器打开: http://localhost:3000"
    echo ""
    echo "  7. 访问 Kibana："
    echo "     kubectl port-forward -n ${NAMESPACE} svc/kibana-service 5601:5601"
    echo "     浏览器打开: http://localhost:5601"
    echo ""
    echo "  8. 查看日志："
    echo "     kubectl logs -f -n ${NAMESPACE} deployment/gateway"
    log_info "=========================================="
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
    log_info "=== StatefulSet 状态 ==="
    kubectl get sts -n "${NAMESPACE}"

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
Spring Cloud Alibaba 综合项目 - 自动化部署脚本

用法: $0 [命令]

命令:
  all         完整部署（基础设施 + 服务 + 监控 + 日志）
  infra       仅部署基础设施（Nacos + MySQL + Redis + RocketMQ + Seata + Jaeger）
  services    仅部署业务服务（11个微服务）
  monitoring  仅部署监控组件（Prometheus + Grafana + AlertManager）
  logging     仅部署日志系统（Elasticsearch + Kibana + Filebeat）
  ingress     仅部署 Ingress
  verify      验证部署状态
  cleanup     清理所有资源
  help        显示此帮助信息

示例:
  $0 all              # 完整部署
  $0 infra            # 仅部署基础设施
  $0 verify           # 验证部署

特性:
  - Nacos 集群（3副本）
  - MySQL 主从（1主2从）
  - Redis 集群（3主3从）
  - RocketMQ（2副本）
  - Seata TC（3副本）
  - Jaeger 链路追踪
  - 11个业务微服务
  - HPA 自动扩缩容
  - Prometheus 监控（50+ 告警规则）
  - ELK 日志聚合
  - 完整 CI/CD 流水线

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
            create_secrets
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
        logging)
            check_dependencies
            deploy_logging
            ;;
        ingress)
            check_dependencies
            deploy_ingress
            verify_deployment
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
