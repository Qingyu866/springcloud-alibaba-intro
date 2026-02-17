# 电商微服务系统 - K8s 完整部署指南

## 目录结构

```
ecommerce/
├── k8s/                          # Kubernetes 配置文件
│   ├── 00-namespace.yaml         # 命名空间
│   ├── mysql/                    # MySQL 配置
│   │   ├── statefulset.yaml      # MySQL StatefulSet (3副本)
│   │   └── service.yaml          # MySQL Service
│   ├── nacos/                    # Nacos 配置
│   │   ├── statefulset.yaml      # Nacos StatefulSet (3副本)
│   │   └── service.yaml          # Nacos Service
│   ├── redis/                    # Redis 配置
│   │   ├── deployment.yaml       # Redis Deployment (1副本)
│   │   └── service.yaml          # Redis Service
│   ├── gateway/                  # Gateway 配置
│   │   ├── deployment.yaml       # Gateway Deployment
│   │   ├── service.yaml          # Gateway Service
│   │   └── hpa.yaml              # Gateway HPA (3-10副本)
│   ├── services/                 # 业务服务配置
│   │   ├── order-service/        # 订单服务
│   │   │   ├── deployment.yaml
│   │   │   ├── service.yaml
│   │   │   └── hpa.yaml          # HPA (3-10副本)
│   │   ├── user-service/         # 用户服务
│   │   │   ├── deployment.yaml
│   │   │   ├── service.yaml
│   │   │   └── hpa.yaml
│   │   └── payment-service/      # 支付服务
│   │       ├── deployment.yaml
│   │       ├── service.yaml
│   │       └── hpa.yaml
│   └── ingress/                  # Ingress 配置
│       └── ingress.yaml          # HTTP/HTTPS 路由
├── cicd/                         # CI/CD 配置
│   └── .gitlab-ci.yml            # GitLab CI 流水线
├── monitoring/                   # 监控配置
│   ├── prometheus/               # Prometheus 配置
│   │   ├── servicemonitor.yaml  # ServiceMonitor 定义
│   │   └── prometheus-rule.yaml  # 告警规则
│   └── grafana/                  # Grafana 配置
│       └── dashboard.json        # 监控面板
└── README.md                     # 本文件
```

## 前置要求

### 必需组件

1. **Kubernetes 集群** (v1.24+)
   - 3个 Master 节点
   - 至少 6 个 Worker 节点
   - 每个节点最低配置：4核CPU，16GB内存，100GB磁盘

2. **存储类 (StorageClass)**
   - 需要预先配置名为 `fast-ssd` 的 StorageClass
   - 支持动态卷供应

3. **Ingress Controller**
   - 安装 NGINX Ingress Controller
   ```bash
   kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.8.1/deploy/static/provider/cloud/deploy.yaml
   ```

4. **Cert-Manager** (可选，用于HTTPS)
   ```bash
   kubectl apply -f https://github.com/cert-manager/cert-manager/releases/download/v1.13.0/cert-manager.yaml
   ```

5. **Prometheus Operator**
   ```bash
   kubectl apply -f https://raw.githubusercontent.com/prometheus-operator/prometheus-operator/main/bundle.yaml
   ```

### 工具要求

- kubectl v1.24+
- Helm 3.x
- Docker 20.x+

## 部署步骤

### 1. 创建命名空间

```bash
kubectl apply -f k8s/00-namespace.yaml
```

### 2. 部署基础设施

#### 2.1 部署 MySQL

```bash
# 等待 MySQL 就绪
kubectl apply -f k8s/mysql/

# 检查状态
kubectl get pods -n ecommerce -l app=mysql
kubectl get pvc -n ecommerce

# 初始化 Nacos 数据库
kubectl exec -it mysql-0 -n ecommerce -- mysql -uroot -p <<EOF
CREATE DATABASE nacos_config CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
EOF
```

#### 2.2 部署 Nacos

```bash
kubectl apply -f k8s/nacos/

# 等待 Nacos 就绪
kubectl wait --for=condition=ready pod -l app=nacos -n ecommerce --timeout=300s

# 检查 Nacos 状态
kubectl get pods -n ecommerce -l app=nacos
kubectl exec -it nacos-0 -n ecommerce -- cat /home/nacos/logs/peer.log
```

#### 2.3 部署 Redis

```bash
kubectl apply -f k8s/redis/

# 检查 Redis 状态
kubectl get pods -n ecommerce -l app=redis
```

### 3. 部署业务服务

#### 3.1 更新镜像地址

在所有 `deployment.yaml` 文件中，将镜像地址更新为您的实际镜像仓库：

```bash
# 批量替换
sed -i 's|your-registry|your-actual-registry.com|g' k8s/gateway/deployment.yaml
sed -i 's|your-registry|your-actual-registry.com|g' k8s/services/*/deployment.yaml
```

#### 3.2 部署 Gateway

```bash
kubectl apply -f k8s/gateway/

# 检查状态
kubectl get pods -n ecommerce -l app=gateway
kubectl logs -f deployment/gateway -n ecommerce
```

#### 3.3 部署业务服务

```bash
# 订单服务
kubectl apply -f k8s/services/order-service/

# 用户服务
kubectl apply -f k8s/services/user-service/

# 支付服务
kubectl apply -f k8s/services/payment-service/

# 检查所有服务
kubectl get pods -n ecommerce
kubectl get svc -n ecommerce
```

### 4. 部署 Ingress

```bash
kubectl apply -f k8s/ingress/ingress.yaml

# 检查 Ingress
kubectl get ingress -n ecommerce

# 如果使用本地测试，添加 hosts 记录
echo "127.0.0.1 ecommerce.example.com api.ecommerce.example.com" | sudo tee -a /etc/hosts
```

### 5. 部署监控

```bash
kubectl apply -f monitoring/prometheus/

# 导入 Grafana Dashboard
kubectl create configmap ecommerce-dashboard --from-file=monitoring/grafana/dashboard.json -n ecommerce
```

## 验证部署

### 1. 检查所有 Pod 状态

```bash
kubectl get pods -n ecommerce -o wide

# 预期输出示例
# NAME                              READY   STATUS    RESTARTS   AGE
# mysql-0                           2/2     Running   0          10m
# mysql-1                           2/2     Running   0          10m
# mysql-2                           2/2     Running   0          10m
# nacos-0                           1/1     Running   0          8m
# nacos-1                           1/1     Running   0          8m
# nacos-2                           1/1     Running   0          8m
# redis-xxxxxxxxxx-xxxxx            1/1     Running   0          5m
# gateway-xxxxxxxxxx-xxxxx          1/1     Running   0          3m
# order-service-xxxxxxxxxx-xxxxx    1/1     Running   0          2m
# user-service-xxxxxxxxxx-xxxxx     1/1     Running   0          2m
# payment-service-xxxxxxxxxx-xxxxx  1/1     Running   0          2m
```

### 2. 检查服务发现

```bash
# 登录 Nacos 控制台
kubectl port-forward -n ecommerce svc/nacos 8848:8848

# 访问 http://localhost:8848/nacos
# 用户名: nacos
# 密码: nacos

# 检查服务列表，应该能看到:
# - gateway-service
# - order-service
# - user-service
# - payment-service
```

### 3. 测试 API

```bash
# 测试 Gateway
kubectl port-forward -n ecommerce svc/gateway 8080:8080

# 测试用户服务
curl http://localhost:8080/api/user/v1/users/1

# 测试订单服务
curl http://localhost:8080/api/order/v1/orders/1

# 测试支付服务
curl http://localhost:8080/api/payment/v1/payments/1
```

### 4. 检查 HPA 状态

```bash
kubectl get hpa -n ecommerce

# 预期输出
# NAME                  REFERENCE                        TARGETS         MINPODS   MAXPODS   REPLICAS   AGE
# gateway-hpa           Deployment/gateway              30%/70%         3         10        3          10m
# order-service-hpa     Deployment/order-service        25%/70%         3         10        3          10m
# user-service-hpa      Deployment/user-service         20%/70%         3         10        3          10m
# payment-service-hpa   Deployment/payment-service      35%/70%         3         10        3          10m
```

### 5. 生成负载测试 HPA

```bash
# 安装负载生成工具
kubectl run -i --tty load-generator --image=busybox /bin/sh

# 在容器中执行
while true; do wget -q -O- http://gateway.ecommerce.svc.cluster.local:8080/api/user/v1/users/1; done
```

## 配置说明

### 密码更新

所有敏感信息都存储在 Kubernetes Secret 中，需要更新默认密码：

```bash
# MySQL 密码
kubectl create secret generic mysql-secret \
  --from-literal=root-password=your_strong_password \
  --from-literal=replication-user=replicator \
  --from-literal=replication-password=your_replicator_password \
  --namespace=ecommerce \
  --dry-run=client -o yaml | kubectl apply -f -

# Nacos 密码
kubectl create secret generic nacos-secret \
  --from-literal=mysql-user=root \
  --from-literal=mysql-password=your_mysql_password \
  --from-literal=nacos-auth=admin \
  --from-literal=nacos-password=your_nacos_password \
  --namespace=ecommerce \
  --dry-run=client -o yaml | kubectl apply -f -

# 业务服务数据库密码
kubectl create secret generic order-service-secret \
  --from-literal=mysql-password=your_mysql_password \
  --namespace=ecommerce \
  --dry-run=client -o yaml | kubectl apply -f -

kubectl create secret generic user-service-secret \
  --from-literal=mysql-password=your_mysql_password \
  --namespace=ecommerce \
  --dry-run=client -o yaml | kubectl apply -f -

kubectl create secret generic payment-service-secret \
  --from-literal=mysql-password=your_mysql_password \
  --namespace=ecommerce \
  --dry-run=client -o yaml | kubectl apply -f -
```

### 资源限制

根据实际负载调整资源限制：

```yaml
resources:
  requests:
    memory: "1Gi"      # 根据实际情况调整
    cpu: "500m"
  limits:
    memory: "2Gi"      # 根据实际情况调整
    cpu: "1000m"
```

### HPA 阈值调整

```bash
# 编辑 HPA 配置
kubectl edit hpa gateway-hpa -n ecommerce

# 调整指标和阈值
metrics:
  - type: Resource
    resource:
      name: cpu
      target:
        type: Utilization
        averageUtilization: 70  # 调整 CPU 阈值
```

## CI/CD 配置

### GitLab CI 配置

1. 在 GitLab 中配置 CI/CD 变量：
   - `DOCKER_REGISTRY`: 镜像仓库地址
   - `REGISTRY_USER`: 镜像仓库用户名
   - `REGISTRY_PASSWORD`: 镜像仓库密码
   - `KUBECONFIG`: K8s 集群配置 (Base64编码)

2. 配置 `.gitlab-ci.yml` 中的镜像地址和 K8s 上下文

3. 推送代码触发流水线

### 手动触发部署

```bash
# 开发环境
git push origin develop

# 生产环境 (需要手动批准)
git push origin main
# 在 GitLab UI 中点击 "deploy-prod" 作业的 "Play" 按钮
```

## 监控与告警

### Prometheus 监控指标

访问 Prometheus：
```bash
kubectl port-forward -n monitoring svc/prometheus-operated 9090:9090
```

查询示例：
```promql
# 服务可用性
up{namespace="ecommerce"}

# 请求速率
sum(rate(http_server_requests_seconds_count{namespace="ecommerce"}[5m])) by (service)

# 错误率
sum(rate(http_server_requests_seconds_count{status=~"5..", namespace="ecommerce"}[5m])) by (service)

# P99 延迟
histogram_quantile(0.99, sum(rate(http_server_requests_seconds_bucket{namespace="ecommerce"}[5m])) by (service, le))
```

### Grafana Dashboard

1. 导入提供的 Dashboard JSON
2. 配置 Prometheus 数据源
3. 查看监控面板

### 告警规则

配置告警接收器（AlertManager）：
```yaml
# alertmanager-config.yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: alertmanager-config
  namespace: ecommerce
data:
  alertmanager.yml: |
    global:
      resolve_timeout: 5m
    route:
      receiver: 'webhook'
      group_wait: 10s
      group_interval: 10s
      repeat_interval: 1h
      group_by: ['alertname', 'cluster', 'service']
    receivers:
    - name: 'webhook'
      webhook_configs:
      - url: 'https://your-webhook-url/alert'
```

## 故障排查

### Pod 无法启动

```bash
# 查看 Pod 状态
kubectl describe pod <pod-name> -n ecommerce

# 查看日志
kubectl logs <pod-name> -n ecommerce

# 查看之前容器日志（如果Pod重启）
kubectl logs <pod-name> -n ecommerce --previous
```

### 服务无法访问

```bash
# 检查 Service
kubectl get svc -n ecommerce

# 检查 Endpoints
kubectl get endpoints -n ecommerce

# 测试服务连通性
kubectl run -it --rm debug --image=busybox --restart=Never -- sh -c "nc -zv gateway 8080"
```

### HPA 不工作

```bash
# 检查 Metrics Server
kubectl get apiservice v1beta1.metrics.k8s.io

# 查看资源使用
kubectl top pods -n ecommerce

# 查看 HPA 事件
kubectl describe hpa <hpa-name> -n ecommerce
```

### 数据库连接问题

```bash
# 检查 MySQL 密码
kubectl get secret mysql-secret -n ecommerce -o jsonpath='{.data.root-password}' | base64 -d

# 测试数据库连接
kubectl run -it --rm mysql-client --image=mysql:8.0 --restart=Never -- \
  mysql -h mysql.ecommerce.svc.cluster.local -uroot -p
```

## 备份与恢复

### MySQL 备份

```bash
# 创建备份
kubectl exec mysql-0 -n ecommerce -- \
  mysqldump -uroot -p${MYSQL_PASSWORD} --all-databases > backup.sql

# 恢复备份
cat backup.sql | kubectl exec -i mysql-0 -n ecommerce -- \
  mysql -uroot -p${MYSQL_PASSWORD}
```

### Nacos 配置备份

```bash
# 导出配置
kubectl exec nacos-0 -n ecommerce -- \
  curl -X POST "http://localhost:8848/nacos/v1/cs/configs?export=true&tenant=ecommerce&group=DEFAULT_GROUP" > nacos-config.zip
```

## 扩缩容

### 手动扩缩容

```bash
# 扩容到 5 个副本
kubectl scale deployment order-service --replicas=5 -n ecommerce

# 缩容到 2 个副本
kubectl scale deployment order-service --replicas=2 -n ecommerce
```

### 节点扩容

```bash
# 添加新节点到集群
# 标记节点
kubectl label node new-node ecommerce=yes

# Pod 会自动调度到新节点
```

## 安全加固

### 网络策略

```yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: ecommerce-network-policy
  namespace: ecommerce
spec:
  podSelector: {}
  policyTypes:
  - Ingress
  - Egress
  ingress:
  - from:
    - namespaceSelector:
        matchLabels:
          name: ingress-nginx
  egress:
  - to:
    - namespaceSelector:
        matchLabels:
          name: ecommerce
```

### Pod 安全策略

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: secure-pod
spec:
  securityContext:
    runAsNonRoot: true
    runAsUser: 1000
    fsGroup: 1000
    seccompProfile:
      type: RuntimeDefault
  containers:
  - name: app
    securityContext:
      allowPrivilegeEscalation: false
      capabilities:
        drop:
        - ALL
      readOnlyRootFilesystem: true
```

## 清理

```bash
# 删除所有资源
kubectl delete namespace ecommerce

# 删除监控配置
kubectl delete prometheus -n monitoring ecommerce-prometheus
kubectl delete configmap -n ecommerce ecommerce-dashboard

# 删除 PV (需要手动操作)
kubectl delete pv $(kubectl get pv | grep ecommerce | awk '{print $1}')
```

## 附录

### 常用命令

```bash
# 查看所有资源
kubectl get all -n ecommerce

# 查看资源详情
kubectl describe deployment order-service -n ecommerce

# 实时查看日志
kubectl logs -f deployment/order-service -n ecommerce

# 进入容器
kubectl exec -it <pod-name> -n ecommerce -- /bin/bash

# 端口转发
kubectl port-forward svc/gateway 8080:8080 -n ecommerce

# 应用配置
kubectl apply -f k8s/

# 删除资源
kubectl delete -f k8s/
```

### 性能优化建议

1. **资源调优**
   - 根据实际负载调整 requests 和 limits
   - 使用垂直 Pod 自动扩缩容（VPA）

2. **网络优化**
   - 使用 Pod 反亲和性分散 Pod
   - 启用服务网格（Istio/Linkerd）

3. **存储优化**
   - 使用本地 SSD 存储
   - 配置合理的备份策略

4. **监控优化**
   - 调整 Prometheus 抓取间隔
   - 优化告警规则减少误报

### 相关文档

- [Spring Cloud Alibaba 官方文档](https://spring-cloud-alibaba-group.github.io/)
- [Kubernetes 官方文档](https://kubernetes.io/docs/)
- [Nacos 官方文档](https://nacos.io/docs/)
- [Prometheus 官方文档](https://prometheus.io/docs/)
