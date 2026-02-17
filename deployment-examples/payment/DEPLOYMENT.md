# 支付系统详细部署文档

本文档提供支付系统的详细部署步骤和配置说明。

## 目录

1. [环境准备](#环境准备)
2. [基础设施部署](#基础设施部署)
3. [业务服务部署](#业务服务部署)
4. [监控部署](#监控部署)
5. [配置验证](#配置验证)
6. [常见问题](#常见问题)

## 环境准备

### 1.1 Kubernetes 集群

**最低要求**：
- Kubernetes 版本 >= 1.24
- 节点数量 >= 3（生产环境）
- 每个节点资源 >= 4C8G
- 网络插件已安装（Calico/Flannel）

**验证**：
```bash
kubectl version --client
kubectl cluster-info
```

### 1.2 StorageClass 配置

创建 `fast-ssd` StorageClass（示例）：

```yaml
apiVersion: storage.k8s.io/v1
kind: StorageClass
metadata:
  name: fast-ssd
provisioner: kubernetes.io/aws-ebs
parameters:
  type: gp3
  iops: "3000"
  throughput: "125"
volumeBindingMode: WaitForFirstConsumer
allowVolumeExpansion: true
```

**应用**：
```bash
kubectl apply -f fast-ssd-storageclass.yaml
kubectl get storageclass
```

### 1.3 Ingress Controller

**安装 NGINX Ingress Controller**（示例）：

```bash
helm repo add ingress-nginx https://kubernetes.github.io/ingress-nginx
helm repo update
helm install ingress-nginx ingress-nginx/ingress-nginx \
  --namespace ingress-nginx --create-namespace
```

**验证**：
```bash
kubectl get pods -n ingress-nginx
```

### 1.4 Prometheus Operator

**安装 Prometheus Operator**（示例）：

```bash
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
helm repo update
helm install kube-prometheus-stack prometheus-community/kube-prometheus-stack \
  --namespace monitoring --create-namespace
```

**验证**：
```bash
kubectl get pods -n monitoring
```

### 1.5 Nacos 服务

支付系统依赖 Nacos 进行服务注册和配置管理。

**选项1：复用现有 Nacos**

```bash
# 获取 Nacos 服务地址
NACOS_ADDR=$(kubectl get svc nacos -n nacos -o jsonpath='{.spec.clusterIP}')
echo $NACOS_ADDR
```

**选项2：部署新 Nacos**

```bash
# 参考 ecommerce 示例部署 Nacos
kubectl apply -f ../ecommerce/k8s/nacos/
```

## 基础设施部署

### 2.1 部署 MySQL

**步骤1：创建命名空间**
```bash
kubectl apply -f k8s/00-namespace.yaml
```

**步骤2：部署 MySQL**
```bash
kubectl apply -f k8s/mysql/statefulset.yaml
```

**步骤3：等待 MySQL 就绪**
```bash
kubectl wait --for=condition=ready pod -l app=mysql -n payment --timeout=300s
kubectl get pods -n payment
```

**步骤4：初始化数据库**
```bash
# 连接到 MySQL
kubectl exec -it mysql-0 -n payment -- mysql -uroot -p

# 执行初始化 SQL
CREATE DATABASE IF NOT EXISTS payment CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE payment;

-- 创建支付记录表
CREATE TABLE IF NOT EXISTS payment_records (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  payment_no VARCHAR(64) NOT NULL COMMENT '支付流水号',
  business_no VARCHAR(64) NOT NULL COMMENT '业务编号',
  payment_channel VARCHAR(20) NOT NULL COMMENT '支付渠道：wechat/alipay',
  amount DECIMAL(10,2) NOT NULL COMMENT '支付金额',
  status TINYINT NOT NULL DEFAULT 0 COMMENT '状态：0-处理中,1-成功,2-失败',
  notify_status TINYINT DEFAULT 0 COMMENT '回调状态：0-未回调,1-已回调',
  create_time DATETIME DEFAULT CURRENT_TIMESTAMP,
  update_time DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY uk_payment_no (payment_no),
  UNIQUE KEY uk_business_no (business_no),
  KEY idx_payment_channel (payment_channel),
  KEY idx_status (status),
  KEY idx_create_time (create_time)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='支付记录表';

-- 创建 Seata 相关表（参考 Seata 官方文档）
-- https://seata.io/zh-cn/docs/ops/deploy-guide-beginner.html
```

### 2.2 部署 Redis

**步骤1：部署 Redis**
```bash
kubectl apply -f k8s/redis/deployment.yaml
```

**步骤2：等待 Redis 就绪**
```bash
kubectl wait --for=condition=ready pod -l app=redis -n payment --timeout=180s
```

**步骤3：验证 Redis**
```bash
kubectl exec -it redis-0 -n payment -- redis-cli ping
# 应该返回 PONG
```

### 2.3 部署 Seata

**步骤1：部署 Seata**
```bash
kubectl apply -f k8s/seata/statefulset.yaml
```

**步骤2：等待 Seata 就绪**
```bash
kubectl wait --for=condition=ready pod -l app=seata -n payment --timeout=300s
```

**步骤3：验证 Seata**
```bash
kubectl exec -it seata-0 -n payment -- curl http://localhost:8091/
# 应该返回 Seata 欢迎信息
```

## 业务服务部署

### 3.1 配置支付密钥

**重要：请使用真实的支付密钥！**

```bash
# 创建支付密钥 Secret
kubectl create secret generic payment-service-secret \
  --from-literal=mysql-password=your_strong_password \
  --from-literal=wechat-app-id=wx1234567890abcdef \
  --from-literal=wechat-mch-id=1234567890 \
  --from-literal=wechat-api-key=your_wechat_api_key \
  --from-literal=alipay-app-id=2021001234567890 \
  --from-literal=alipay-private-key="your_alipay_private_key" \
  --from-literal=alipay-public-key="your_alipay_public_key" \
  --namespace=payment
```

### 3.2 部署支付服务

**步骤1：更新镜像地址**
```bash
# 批量替换镜像地址
sed -i 's|your-registry|your-actual-registry.com|g' k8s/payment-service/deployment.yaml
```

**步骤2：部署支付服务**
```bash
kubectl apply -f k8s/payment-service/
```

**步骤3：等待服务就绪**
```bash
kubectl wait --for=condition=ready pod -l app=payment-service -n payment --timeout=300s
```

**步骤4：验证服务**
```bash
kubectl get pods -n payment -l app=payment-service
kubectl get svc -n payment -l app=payment-service
kubectl get hpa -n payment -l app=payment-service
```

### 3.3 部署回调服务

**步骤1：更新镜像地址**
```bash
sed -i 's|your-registry|your-actual-registry.com|g' k8s/callback-service/deployment.yaml
```

**步骤2：部署回调服务**
```bash
kubectl apply -f k8s/callback-service/
```

**步骤3：等待服务就绪**
```bash
kubectl wait --for=condition=ready pod -l app=callback-service -n payment --timeout=300s
```

**步骤4：验证服务**
```bash
kubectl get pods -n payment -l app=callback-service
kubectl get svc -n payment -l app=callback-service
kubectl get hpa -n payment -l app=callback-service
```

### 3.4 部署对账服务

**步骤1：更新镜像地址**
```bash
sed -i 's|your-registry|your-actual-registry.com|g' k8s/reconciliation-service/deployment.yaml
```

**步骤2：部署对账服务**
```bash
kubectl apply -f k8s/reconciliation-service/
```

**步骤3：等待服务就绪**
```bash
kubectl wait --for=condition=ready pod -l app=reconciliation-service -n payment --timeout=300s
```

**步骤4：验证服务**
```bash
kubectl get pods -n payment -l app=reconciliation-service
kubectl get svc -n payment -l app=reconciliation-service
kubectl get cronjob -n payment
```

### 3.5 部署 Ingress

**步骤1：配置域名**
```bash
# 更新 Ingress 域名
sed -i 's|payment.example.com|your-payment-domain.com|g' \
  k8s/callback-service/ingress.yaml \
  k8s/ingress/ingress.yaml
```

**步骤2：部署 Ingress**
```bash
kubectl apply -f k8s/ingress/
kubectl apply -f k8s/callback-service/ingress.yaml
```

**步骤3：配置 DNS**
```bash
# 获取 Ingress 地址
kubectl get ingress -n payment

# 配置 DNS 解析
# A 记录: your-payment-domain.com -> <Ingress-IP>
```

**步骤4：验证 Ingress**
```bash
# 测试访问
curl -k https://your-payment-domain.com/actuator/health
```

## 监控部署

### 4.1 部署 ServiceMonitor

```bash
kubectl apply -f monitoring/prometheus/servicemonitor.yaml
```

**验证**：
```bash
kubectl get servicemonitor -n payment
```

### 4.2 部署告警规则

```bash
kubectl apply -f monitoring/prometheus/prometheus-rule.yaml
```

**验证**：
```bash
kubectl get prometheusrule -n payment
```

### 4.3 导入 Grafana Dashboard

**步骤1：获取 Grafana 地址**
```bash
kubectl get svc -n monitoring -l app.kubernetes.io/name=grafana
```

**步骤2：登录 Grafana**
- 默认用户名：`admin`
- 默认密码：`prom-operator`

**步骤3：导入 Dashboard**
1. 点击 `+` → `Import`
2. 上传 `monitoring/grafana/dashboard.json`
3. 选择 Prometheus 数据源
4. 点击 `Import`

**步骤4：验证 Dashboard**
- 检查所有面板是否有数据
- 检查时间范围是否正确

## 配置验证

### 5.1 健康检查

```bash
# 支付服务
kubectl exec -it payment-service-0 -n payment -- \
  curl http://localhost:8087/actuator/health

# 回调服务
kubectl exec -it callback-service-0 -n payment -- \
  curl http://localhost:8089/actuator/health

# 对账服务
kubectl exec -it reconciliation-service-0 -n payment -- \
  curl http://localhost:8091/actuator/health
```

**预期输出**：
```json
{
  "status": "UP",
  "groups": [
    {
      "name": "liveness",
      "status": "UP"
    },
    {
      "name": "readiness",
      "status": "UP"
    }
  ]
}
```

### 5.2 服务连通性测试

```bash
# 测试支付服务访问 MySQL
kubectl exec -it payment-service-0 -n payment -- \
  nc -zv mysql.payment.svc.cluster.local 3306

# 测试支付服务访问 Redis
kubectl exec -it payment-service-0 -n payment -- \
  nc -zv redis.payment.svc.cluster.local 6379

# 测试支付服务访问 Seata
kubectl exec -it payment-service-0 -n payment -- \
  nc -zv seata.payment.svc.cluster.local 8091
```

**预期输出**：
```
mysql.payment.svc.cluster.local (10.x.x.x:3306) open
redis.payment.svc.cluster.local (10.x.x.x:6379) open
seata.payment.svc.cluster.local (10.x.x.x:8091) open
```

### 5.3 幂等性测试

```bash
# 发送相同支付请求两次
curl -X POST https://your-payment-domain.com/api/payment/create \
  -H "Content-Type: application/json" \
  -d '{
    "businessNo":"TEST_IDEMPOTENT_001",
    "amount":100,
    "paymentChannel":"wechat"
  }'

# 第二次请求（应该返回幂等性错误）
curl -X POST https://your-payment-domain.com/api/payment/create \
  -H "Content-Type: application/json" \
  -d '{
    "businessNo":"TEST_IDEMPOTENT_001",
    "amount":100,
    "paymentChannel":"wechat"
  }'
```

**预期结果**：
- 第一次请求成功（返回支付记录）
- 第二次请求失败（返回幂等性错误）

### 5.4 监控指标验证

```bash
# 检查 Prometheus 是否抓取指标
curl http://prometheus.example.com/api/v1/query \
  --data-urlencode 'query=up{namespace="payment"}' | jq

# 检查支付服务指标
curl http://prometheus.example.com/api/v1/query \
  --data-urlencode 'query=payment_requests_total' | jq

# 检查 HPA 状态
kubectl get hpa -n payment -o yaml
```

## 常见问题

### Q1: Pod 一直处于 Pending 状态

**原因**：资源不足或 PVC 无法绑定

**解决方案**：
```bash
# 查看 Pod 详情
kubectl describe pod <pod-name> -n payment

# 查看 PVC 状态
kubectl get pvc -n payment

# 查看 PV 状态
kubectl get pv
```

### Q2: Pod 无法启动（CrashLoopBackOff）

**原因**：配置错误、依赖服务未就绪、健康检查失败

**解决方案**：
```bash
# 查看 Pod 日志
kubectl logs <pod-name> -n payment

# 查看之前容器日志
kubectl logs <pod-name> -n payment --previous

# 查看 Pod 详情
kubectl describe pod <pod-name> -n payment
```

### Q3: HPA 无法扩缩容

**原因**：Metrics Server 未安装或未配置

**解决方案**：
```bash
# 检查 Metrics Server
kubectl get apiservice v1beta1.metrics.k8s.io

# 安装 Metrics Server
kubectl apply -f https://github.com/kubernetes-sigs/metrics-server/releases/latest/download/components.yaml

# 查看资源使用
kubectl top pods -n payment
```

### Q4: Ingress 无法访问

**原因**：DNS 未配置、Ingress Controller 未安装、证书问题

**解决方案**：
```bash
# 检查 Ingress Controller
kubectl get pods -n ingress-nginx

# 检查 Ingress 配置
kubectl get ingress -n payment
kubectl describe ingress <ingress-name> -n payment

# 检查 DNS 解析
nslookup your-payment-domain.com

# 测试 Ingress 地址
curl -k https://<ingress-ip>/actuator/health
```

### Q5: Prometheus 无法抓取指标

**原因**：ServiceMonitor 配置错误、标签不匹配

**解决方案**：
```bash
# 检查 ServiceMonitor
kubectl get servicemonitor -n payment
kubectl describe servicemonitor <servicemonitor-name> -n payment

# 检查 Service 标签
kubectl get svc -n payment --show-labels

# 检查 Pod 标签
kubectl get pods -n payment --show-labels

# 手动测试指标
kubectl exec -it payment-service-0 -n payment -- \
  curl http://localhost:8087/actuator/prometheus
```

### Q6: Seata 事务回滚失败

**原因**：Seata Server 未启动、数据库连接失败、undo log 丢失

**解决方案**：
```bash
# 检查 Seata 状态
kubectl get pods -n payment -l app=seata
kubectl logs seata-0 -n payment

# 检查 Seata 表是否存在
kubectl exec -it mysql-0 -n payment -- mysql -uroot -p payment -e "SHOW TABLES LIKE 'global_table';"

# 检查 Seata 日志
kubectl logs seata-0 -n payment | grep -i error
```

### Q7: 对账任务执行失败

**原因**：数据库连接失败、第三方 API 不可用、超时

**解决方案**：
```bash
# 查看 CronJob 状态
kubectl get cronjob -n payment
kubectl describe cronjob reconciliation-cronjob -n payment

# 查看任务历史
kubectl get jobs -n payment

# 查看任务日志
kubectl logs <job-pod-name> -n payment
```

### Q8: 支付请求超时

**原因**：网络延迟、第三方支付平台慢、性能问题

**解决方案**：
```bash
# 检查 Pod 资源使用
kubectl top pods -n payment

# 检查 HPA 状态
kubectl get hpa -n payment

# 查看应用日志
kubectl logs payment-service-0 -n payment | grep -i timeout

# 扩容 Pod
kubectl scale deployment payment-service --replicas=5 -n payment
```

## 性能优化建议

### 1. JVM 优化

```yaml
env:
- name: JAVA_OPTS
  value: "-Xms512m -Xmx1g \
    -XX:+UseG1GC \
    -XX:MaxGCPauseMillis=200 \
    -XX:+HeapDumpOnOutOfMemoryError \
    -XX:HeapDumpPath=/logs/heapdump.hprof"
```

### 2. 数据库连接池优化

```yaml
spring:
  datasource:
    hikari:
      maximum-pool-size: 50
      minimum-idle: 10
      connection-timeout: 30000
      idle-timeout: 600000
      max-lifetime: 1800000
```

### 3. Redis 连接池优化

```yaml
spring:
  redis:
    lettuce:
      pool:
        max-active: 50
        max-wait: -1ms
        max-idle: 20
        min-idle: 10
```

### 4. Tomcat 线程池优化

```yaml
server:
  tomcat:
    threads:
      max: 500
      min-spare: 50
    accept-count: 500
    max-connections: 5000
```

## 下一步

完成部署后，建议：

1. 阅读完整文档：[README.md](./README.md)
2. 执行检查清单：[CHECKLIST.md](./CHECKLIST.md)
3. 进行性能测试
4. 配置监控告警
5. 制定应急预案

---

**需要帮助？**

- 提交 Issue：[GitHub Issues](https://github.com/your-repo/issues)
- 查看文档：[Spring Cloud Alibaba 官方文档](https://spring-cloud-alibaba-group.github.io/)
