# 详细部署文档

## 目录

- [环境准备](#环境准备)
- [部署步骤](#部署步骤)
- [配置说明](#配置说明)
- [故障排查](#故障排查)
- [升级指南](#升级指南)
- [备份恢复](#备份恢复)

## 环境准备

### Kubernetes 集群要求

- **版本**: Kubernetes 1.25+
- **节点**: 最少 3 个节点 (推荐 5+ 个节点)
- **资源配置**:
  - Master: 4 CPU, 8GB RAM
  - Worker: 8 CPU, 32GB RAM
- **存储**: 支持 StorageClass (推荐 fast-ssd)

### 软件依赖

```bash
# 安装 kubectl
curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/darwin/arm64/kubectl"
chmod +x kubectl
sudo mv kubectl /usr/local/bin/

# 安装 helm
curl https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3 | bash

# 验证安装
kubectl version --client
helm version
```

### 镜像仓库准备

```bash
# 登录镜像仓库
docker login registry.example.com

# 验证访问
docker pull registry.example.com/springcloud-alibaba/gateway:latest
```

## 部署步骤

### 1. 创建命名空间

```bash
kubectl apply -f k8s/00-namespace.yaml
kubectl get namespace springcloud-alibaba
```

### 2. 部署基础设施

#### 2.1 部署 Nacos 集群

```bash
kubectl apply -f k8s/nacos/
kubectl wait --for=condition=ready pod -l app=nacos -n springcloud-alibaba --timeout=600s
kubectl get pods -n springcloud-alibaba -l app=nacos
```

#### 2.2 部署 MySQL 主从集群

```bash
kubectl apply -f k8s/mysql/
kubectl wait --for=condition=ready pod -l app=mysql -n springcloud-alibaba --timeout=600s
kubectl get pods -n springcloud-alibaba -l app=mysql
```

**验证主从复制**:

```bash
# 进入主库
kubectl exec -it -n springcloud-alibaba mysql-0 -- mysql -uroot -p

# 查看主库状态
SHOW MASTER STATUS;

# 进入从库
kubectl exec -it -n springcloud-alibaba mysql-1 -- mysql -uroot -p

# 查看从库状态
SHOW SLAVE STATUS\G
```

#### 2.3 部署 Redis 集群

```bash
kubectl apply -f k8s/redis/
kubectl wait --for=condition=ready pod -l app=redis -n springcloud-alibaba --timeout=600s

# 初始化 Redis 集群
kubectl apply -f k8s/redis/03-service.yaml
kubectl get job -n springcloud-alibaba redis-cluster-init
```

**验证集群状态**:

```bash
# 进入 Redis Pod
kubectl exec -it -n springcloud-alibaba redis-0 -- redis-cli -a redis@2024

# 查看集群信息
cluster info
cluster nodes
```

#### 2.4 部署 RocketMQ

```bash
kubectl apply -f k8s/rocketmq/
kubectl wait --for=condition=ready pod -l app=rocketmq-broker -n springcloud-alibaba --timeout=600s
kubectl get pods -n springcloud-alibaba -l app=rocketmq
```

#### 2.5 部署 Seata TC

```bash
kubectl apply -f k8s/seata/
kubectl wait --for=condition=ready pod -l app=seata -n springcloud-alibaba --timeout=300s
kubectl get pods -n springcloud-alibaba -l app=seata
```

#### 2.6 部署 Jaeger

```bash
kubectl apply -f k8s/jaeger/
kubectl get pods -n springcloud-alibaba -l app=jaeger
```

### 3. 部署业务服务

```bash
# 部署 Gateway
kubectl apply -f k8s/gateway/
kubectl wait --for=condition=ready pod -l app=gateway -n springcloud-alibaba --timeout=300s

# 部署核心服务
kubectl apply -f k8s/services/01-order-service.yaml
kubectl apply -f k8s/services/02-user-service.yaml
kubectl apply -f k8s/services/03-flash-order-service.yaml
kubectl apply -f k8s/services/04-inventory-service.yaml
kubectl apply -f k8s/services/05-payment-service.yaml
kubectl apply -f k8s/services/06-callback-service.yaml

# 部署其他服务
kubectl apply -f k8s/services/07-11-services-batch.yaml

# 验证所有服务
kubectl get pods -n springcloud-alibaba
kubectl get hpa -n springcloud-alibaba
```

### 4. 部署 Ingress

```bash
kubectl apply -f k8s/ingress/
kubectl get ingress -n springcloud-alibaba
```

### 5. 部署监控

```bash
# Prometheus ServiceMonitor
kubectl apply -f monitoring/prometheus/01-servicemonitor.yaml

# Prometheus 告警规则
kubectl apply -f monitoring/prometheus/02-prometheus-rules.yaml

# Grafana Dashboard
kubectl apply -f monitoring/grafana/01-dashboard-configmap.yaml

# AlertManager
kubectl apply -f monitoring/alertmanager/01-alertmanager-config.yaml
```

### 6. 部署日志系统

```bash
# Elasticsearch
kubectl apply -f logging/elasticsearch/01-statefulset.yaml
kubectl wait --for=condition=ready pod -l app=elasticsearch -n springcloud-alibaba --timeout=900s

# Kibana
kubectl apply -f logging/kibana/01-deployment.yaml

# Filebeat
kubectl apply -f logging/filebeat/01-daemonset.yaml
```

## 配置说明

### 环境变量配置

所有服务支持以下环境变量：

```bash
# Spring 配置
SPRING_PROFILES_ACTIVE=production
SPRING_CLOUD_NACOS_DISCOVERY_SERVER_ADDR=nacos-service:8848
SPRING_CLOUD_NACOS_CONFIG_SERVER_ADDR=nacos-service:8848

# 数据库配置
SPRING_DATASOURCE_URL=jdbc:mysql://mysql-service:3306/springcloud_alibaba
SPRING_DATASOURCE_USERNAME=app
SPRING_DATASOURCE_PASSWORD=<from-secret>

# Redis 配置
SPRING_REDIS_HOST=redis-service
SPRING_REDIS_PORT=6379
SPRING_REDIS_PASSWORD=<from-secret>

# RocketMQ 配置
ROCKETMQ_NAME_SERVER=rocketmq-namesrv:9876

# Seata 配置
SEATA_SERVICE_GROUP=default_tx_group
SEATA_TX_SERVICE_GROUP=default_tx_group

# JVM 配置
JAVA_OPTS=-Xms512m -Xmx512m -XX:+UseG1GC

# 监控配置
MANAGEMENT_ENDPOINTS_WEB_EXPOSURE_INCLUDE=health,info,metrics,prometheus
SPRING_SLEUTH_OTP_RECEIVER_ENDPOINT=http://jaeger-collector:14268/api/traces
```

### HPA 配置

所有核心服务配置了 HPA：

```yaml
minReplicas: 3
maxReplicas: 10
metrics:
  - type: Resource
    resource:
      name: cpu
      target:
        type: Utilization
        averageUtilization: 70
  - type: Resource
    resource:
      name: memory
      target:
        type: Utilization
        averageUtilization: 80
```

### 资源限制

服务资源配置：

| 服务类型 | CPU Request | CPU Limit | Memory Request | Memory Limit |
|---------|------------|-----------|---------------|-------------|
| 标准服务 | 500m | 2000m | 1Gi | 2Gi |
| 秒杀服务 | 1000m | 4000m | 2Gi | 4Gi |
| Gateway | 500m | 2000m | 1Gi | 2Gi |

## 故障排查

### Pod 无法启动

```bash
# 查看 Pod 状态
kubectl get pods -n springcloud-alibaba

# 查看 Pod 详情
kubectl describe pod -n springcloud-alibaba <pod-name>

# 查看 Pod 日志
kubectl logs -n springcloud-alibaba <pod-name>

# 查看所有事件
kubectl get events -n springcloud-alibaba --sort-by='.lastTimestamp'
```

### 服务间通信失败

```bash
# 查看 Service
kubectl get svc -n springcloud-alibaba

# 查看 Endpoints
kubectl get endpoints -n springcloud-alibaba

# 测试服务连通性
kubectl run -it --rm debug --image=busybox --restart=Never -- sh
wget -qO- http://gateway-service:8080/actuator/health
```

### HPA 不扩容

```bash
# 查看 HPA 状态
kubectl get hpa -n springcloud-alibaba -w

# 查看 HPA 详情
kubectl describe hpa -n springcloud-alibaba <hpa-name>

# 查看 Pod 资源使用
kubectl top pods -n springcloud-alibaba
```

### 数据库连接失败

```bash
# 测试数据库连接
kubectl run -it --rm mysql-client --image=mysql:8.0 --restart=Never -- \
  mysql -h mysql-service -u app -p

# 查看 Pod IP
kubectl get pods -n springcloud-alibaba -o wide
```

## 升级指南

### 滚动升级

```bash
# 更新镜像
kubectl set image deployment/gateway \
  gateway=registry.example.com/springcloud-alibaba/gateway:v1.0.1 \
  -n springcloud-alibaba

# 查看升级状态
kubectl rollout status deployment/gateway -n springcloud-alibaba

# 查看历史版本
kubectl rollout history deployment/gateway -n springcloud-alibaba
```

### 金丝雀发布

```bash
# 1. 创建新版本 Deployment
kubectl apply -f gateway-v2-deployment.yaml

# 2. 调整 Service 权重 (10% 流量到新版本)
kubectl patch svc gateway-service -n springcloud-alibaba -p '{"spec":{"sessionAffinity":"None"}}'

# 3. 逐步增加新版本流量
# 20% -> 50% -> 100%

# 4. 切换全部流量后删除旧版本
kubectl delete deployment gateway-v1 -n springcloud-alibaba
```

### 回滚

```bash
# 回滚到上一个版本
kubectl rollout undo deployment/gateway -n springcloud-alibaba

# 回滚到指定版本
kubectl rollout undo deployment/gateway -n springcloud-alibaba --to-revision=2
```

## 备份恢复

### 数据库备份

```bash
# 备份 MySQL
kubectl exec -n springcloud-alibaba mysql-0 -- \
  mysqldump -uroot -p$MYSQL_ROOT_PASSWORD \
  --all-databases > backup.sql

# 恢复 MySQL
kubectl exec -i -n springcloud-alibaba mysql-0 -- \
  mysql -uroot -p$MYSQL_ROOT_PASSWORD < backup.sql
```

### 配置备份

```bash
# 备份所有配置
kubectl get all,configmap,secret,pvc -n springcloud-alibaba -o yaml > backup.yaml

# 恢复配置
kubectl apply -f backup.yaml
```

### PV 快照

```bash
# 创建快照 (需要存储卷支持)
kubectl get pv
kubectl get pvc -n springcloud-alibaba
```

## 性能优化

### JVM 调优

```bash
# 标准服务
JAVA_OPTS="-Xms512m -Xmx512m -XX:+UseG1GC -XX:MaxGCPauseMillis=200"

# 高并发服务
JAVA_OPTS="-Xms1024m -Xmx1024m -XX:+UseG1GC -XX:MaxGCPauseMillis=100 -XX:+DisableExplicitGC"

# 大内存服务
JAVA_OPTS="-Xms4g -Xmx4g -XX:+UseG1GC -XX:MaxGCPauseMillis=200 -XX:InitiatingHeapOccupancyPercent=45"
```

### 数据库连接池

```yaml
spring:
  datasource:
    hikari:
      minimum-idle: 10
      maximum-pool-size: 50
      connection-timeout: 30000
      idle-timeout: 600000
      max-lifetime: 1800000
```

### Redis 连接池

```yaml
spring:
  redis:
    lettuce:
      pool:
        min-idle: 10
        max-idle: 50
        max-active: 200
        max-wait: -1ms
```

## 监控告警

### Prometheus 查询示例

```promql
# 服务 QPS
sum(rate(http_server_requests_seconds_count[1m])) by (app)

# 服务错误率
sum(rate(http_server_requests_seconds_count{status=~"5.."}[5m])) by (app) /
sum(rate(http_server_requests_seconds_count[5m])) by (app)

# P95 响应时间
histogram_quantile(0.95,
  sum(rate(http_server_requests_seconds_bucket[5m])) by (app, le))

# JVM 堆内存使用率
jvm_memory_used_bytes{area="heap"} / jvm_memory_max_bytes{area="heap"} * 100
```

### 常用 Grafana 面板

1. **服务概览**: 实例状态、QPS、错误率
2. **JVM 监控**: 堆内存、GC、线程数
3. **数据库监控**: QPS、慢查询、连接数
4. **Redis 监控**: 命令速率、内存使用、命中率
5. **HPA 状态**: 当前副本数、扩容事件

## 安全加固

### NetworkPolicy

```yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: deny-all
  namespace: springcloud-alibaba
spec:
  podSelector: {}
  policyTypes:
  - Ingress
  - Egress
```

### PodSecurityPolicy

```yaml
apiVersion: policy/v1beta1
kind: PodSecurityPolicy
metadata:
  name: restricted
spec:
  privileged: false
  runAsUser:
    rule: MustRunAsNonRoot
  seLinux:
    rule: RunAsAny
  fsGroup:
    rule: RunAsAny
```

### Secret 管理

```bash
# 使用外部 Secret 管理工具
kubectl create secret generic app-secret \
  --from-literal=password=$(vault kv get -field=password kv/app)
```

## 故障演练

### Pod 故障模拟

```bash
# 删除 Pod 测试自愈
kubectl delete pod -n springcloud-alibaba gateway-xxx

# 查看重建过程
kubectl get pods -n springcloud-alibaba -w
```

### 节点故障模拟

```bash
# 标记节点不可调度
kubectl cordon <node-name>

# 驱逐 Pod
kubectl drain <node-name> --ignore-daemonsets --delete-local-data
```

### 网络故障模拟

```bash
# 使用 Chaos Mesh 模拟网络延迟
kubectl apply -f network-delay.yaml
```

## 最佳实践

1. **资源配额**: 为每个命名空间设置 ResourceQuota
2. **LimitRange**: 限制 Pod 资源使用范围
3. **PodDisruptionBudget**: 保证最小可用副本数
4. **健康检查**: 配置 liveness 和 readiness probe
5. **优雅关闭**: 配置 preStop hook 和 terminationGracePeriodSeconds
6. **日志轮转**: 防止磁盘被日志占满
7. **监控告警**: 覆盖所有关键指标
8. **定期备份**: 数据库和配置定期备份
9. **灾备演练**: 定期进行故障演练
10. **文档更新**: 保持文档与实际配置一致

## 参考资源

- [Kubernetes 官方文档](https://kubernetes.io/docs/)
- [Spring Cloud Alibaba 文档](https://spring-cloud-alibaba-group.github.io/)
- [Prometheus 文档](https://prometheus.io/docs/)
- [Grafana 文档](https://grafana.com/docs/)
