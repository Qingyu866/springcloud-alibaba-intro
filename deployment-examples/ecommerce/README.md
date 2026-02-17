# 电商微服务系统 - Kubernetes 完整部署方案

> 基于 Spring Cloud Alibaba 的生产级 Kubernetes 部署方案

## 项目简介

本项目提供了完整的电商微服务系统 Kubernetes 部署方案，包括：

- ✅ **完整的 K8s 配置文件** - 可直接部署使用
- ✅ **基础设施服务** - MySQL (主从)、Nacos 集群、Redis
- ✅ **业务服务** - Gateway、订单、用户、支付服务
- ✅ **自动扩缩容** - HPA 配置 (3-10 副本)
- ✅ **服务监控** - Prometheus + Grafana
- ✅ **CI/CD 流水线** - GitLab CI 自动化部署
- ✅ **负载均衡** - Ingress 配置
- ✅ **告警规则** - 完整的 Prometheus 告警规则

## 架构概览

```
                    ┌─────────────┐
                    │   Ingress   │
                    │   (Nginx)    │
                    └──────┬──────┘
                           │
            ┌──────────────┼──────────────┐
            │              │              │
    ┌───────▼────┐  ┌───▼────┐   ┌───▼─────┐
    │   Gateway   │  │  Nacos  │   │  MySQL  │
    │  (3副本)   │  │(3副本) │   │ (主从)  │
    └───────┬────┘  └───┬────┘   └─────────┘
           │           │
    ┌──────┴──────┬───┴──────┐
    │             │          │
┌───▼────┐  ┌────▼────┐  ┌──▼─────┐
│Order   │  │  User   │  │Payment │
│Service │  │Service  │  │Service │
│(HPA)   │  │ (HPA)   │  │ (HPA)  │
└────────┘  └─────────┘  └────────┘
```

## 快速开始

### 前置要求

- Kubernetes 集群 (v1.24+)
- kubectl 已配置
- 镜像仓库访问权限
- StorageClass `fast-ssd` 已创建
- Ingress Controller 已安装

### 一键部署

```bash
# 克隆项目
git clone <repository-url>
cd deployment-examples/ecommerce

# 查看部署选项
./deploy.sh help

# 完整部署
./deploy.sh all

# 分步部署
./deploy.sh infra      # 仅基础设施
./deploy.sh services   # 仅业务服务
./deploy.sh monitoring # 仅监控

# 验证部署
./deploy.sh verify
```

### 手动部署

```bash
# 1. 创建命名空间
kubectl apply -f k8s/00-namespace.yaml

# 2. 部署基础设施
kubectl apply -f k8s/mysql/
kubectl apply -f k8s/nacos/
kubectl apply -f k8s/redis/

# 3. 部署业务服务
kubectl apply -f k8s/gateway/
kubectl apply -f k8s/services/order-service/
kubectl apply -f k8s/services/user-service/
kubectl apply -f k8s/services/payment-service/

# 4. 部署 Ingress
kubectl apply -f k8s/ingress/

# 5. 部署监控
kubectl apply -f monitoring/prometheus/
```

## 部署前配置

**重要**: 在部署前，请务必完成以下配置：

### 1. 更新镜像地址

```bash
# 批量替换镜像仓库地址
sed -i 's|your-registry|your-actual-registry.com|g' \
  k8s/gateway/deployment.yaml \
  k8s/services/*/deployment.yaml
```

### 2. 修改默认密码

**强烈建议修改所有默认密码！**

```bash
# 更新 MySQL 密码
kubectl create secret generic mysql-secret \
  --from-literal=root-password=your_strong_password \
  --from-literal=replication-user=replicator \
  --from-literal=replication-password=your_replicator_password \
  --namespace=ecommerce \
  --dry-run=client -o yaml | kubectl apply -f -

# 更新 Nacos 密码
kubectl create secret generic nacos-secret \
  --from-literal=mysql-user=root \
  --from-literal=mysql-password=your_mysql_password \
  --from-literal=nacos-auth=admin \
  --from-literal=nacos-password=your_nacos_password \
  --namespace=ecommerce \
  --dry-run=client -o yaml | kubectl apply -f -
```

### 3. 初始化数据库

```bash
# 连接到 MySQL
kubectl exec -it mysql-0 -n ecommerce -- mysql -uroot -p

# 创建数据库
CREATE DATABASE ecommerce_order CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE DATABASE ecommerce_user CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE DATABASE ecommerce_payment CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE DATABASE nacos_config CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

详细配置说明请查看: [CHECKLIST.md](./CHECKLIST.md)

## 文件结构

```
ecommerce/
├── k8s/                          # Kubernetes 配置
│   ├── 00-namespace.yaml         # 命名空间
│   ├── mysql/                    # MySQL (3副本主从)
│   ├── nacos/                    # Nacos (3副本集群)
│   ├── redis/                    # Redis (1副本)
│   ├── gateway/                  # Gateway + HPA
│   ├── services/                 # 业务服务
│   │   ├── order-service/        # 订单服务 + HPA
│   │   ├── user-service/         # 用户服务 + HPA
│   │   └── payment-service/      # 支付服务 + HPA
│   └── ingress/                  # Ingress 配置
├── cicd/                         # CI/CD 配置
│   └── .gitlab-ci.yml            # GitLab CI 流水线
├── monitoring/                   # 监控配置
│   ├── prometheus/               # ServiceMonitor + 告警规则
│   └── grafana/                  # Dashboard JSON
├── deploy.sh                     # 自动部署脚本
├── DEPLOYMENT.md                 # 详细部署文档
├── CHECKLIST.md                  # 部署前检查清单
└── README.md                     # 本文件
```

## 组件说明

### 基础设施

| 组件 | 类型 | 副本数 | 存储 | 说明 |
|-----|------|-------|------|------|
| MySQL | StatefulSet | 3 | 10Gi/PV | 主从复制架构 |
| Nacos | StatefulSet | 3 | 5Gi/PV | 服务发现与配置中心 |
| Redis | Deployment | 1 | - | 缓存服务 |

### 业务服务

| 服务 | 端口 | HPA | 说明 |
|-----|------|-----|------|
| Gateway | 8080/8081 | 3-10 | API 网关 |
| Order Service | 8082/8083 | 3-10 | 订单服务 |
| User Service | 8084/8085 | 3-10 | 用户服务 |
| Payment Service | 8086/8087 | 3-10 | 支付服务 |

### HPA 配置

所有业务服务都配置了自动扩缩容：

- **最小副本**: 3
- **最大副本**: 10
- **CPU 阈值**: 70%
- **内存阈值**: 80%
- **扩容策略**: 100% 或 2 个 Pod (取最大值)
- **缩容策略**: 50%，稳定期 300 秒

## 监控与告警

### Prometheus 监控指标

所有服务都暴露了 Prometheus 指标端点：

- 服务可用性
- 请求速率 (RPS)
- 错误率 (5xx)
- P99 延迟
- JVM 堆内存使用率
- GC 暂停时间
- 数据库连接池使用率

### 告警规则

预配置了以下告警规则：

- 服务下线告警 (Critical)
- 高错误率告警 (Warning)
- 高延迟告警 (Warning)
- Pod 频繁重启告警 (Warning)
- CPU/内存使用率过高告警 (Warning)
- 数据库连接池告警 (Warning)
- Redis 连接异常告警 (Critical)

详细告警配置: [monitoring/prometheus/prometheus-rule.yaml](./monitoring/prometheus/prometheus-rule.yaml)

## CI/CD 流水线

GitLab CI 流水线包含以下阶段：

1. **Build** - Maven 编译
2. **Test** - 单元测试 + 覆盖率报告
3. **Package** - 构建并推送 Docker 镜像
4. **Deploy** - 自动部署到 K8s

### 配置步骤

1. 在 GitLab 中配置 CI/CD 变量：
   - `DOCKER_REGISTRY`: 镜像仓库地址
   - `REGISTRY_USER`: 镜像仓库用户名
   - `REGISTRY_PASSWORD`: 镜像仓库密码
   - `KUBECONFIG`: K8s 配置 (Base64)

2. 推送代码自动触发流水线

3. 生产环境部署需要手动批准

详细配置: [cicd/.gitlab-ci.yml](./cicd/.gitlab-ci.yml)

## 验证部署

### 检查所有服务状态

```bash
# 查看 Pod 状态
kubectl get pods -n ecommerce -o wide

# 查看 Service 状态
kubectl get svc -n ecommerce

# 查看 HPA 状态
kubectl get hpa -n ecommerce

# 查看 Ingress 状态
kubectl get ingress -n ecommerce
```

### 访问服务

```bash
# 本地调试 - Gateway
kubectl port-forward -n ecommerce svc/gateway 8080:8080
# 访问: http://localhost:8080/api/user/v1/users/1

# 本地调试 - Nacos
kubectl port-forward -n ecommerce svc/nacos 8848:8848
# 访问: http://localhost:8848/nacos (用户名: nacos, 密码: nacos)

# 本地调试 - Prometheus
kubectl port-forward -n monitoring svc/prometheus-operated 9090:9090
# 访问: http://localhost:9090
```

### 负载测试 HPA

```bash
# 生成负载
kubectl run -it --rm load-generator --image=busybox /bin/sh
# 在容器中执行
while true; do wget -q -O- http://gateway.ecommerce.svc.cluster.local:8080/api/user/v1/users/1; done

# 观察 HPA 自动扩容
kubectl get hpa -n ecommerce -w
kubectl get pods -n ecommerce -w
```

## 故障排查

### Pod 无法启动

```bash
# 查看 Pod 详情
kubectl describe pod <pod-name> -n ecommerce

# 查看日志
kubectl logs <pod-name> -n ecommerce

# 查看之前容器日志 (如果 Pod 重启)
kubectl logs <pod-name> -n ecommerce --previous
```

### 服务无法访问

```bash
# 检查 Endpoints
kubectl get endpoints -n ecommerce

# 测试服务连通性
kubectl run -it --rm debug --image=busybox --restart=Never -- \
  sh -c "nc -zv gateway.ecommerce.svc.cluster.local 8080"
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

更多故障排查指南: [DEPLOYMENT.md](./DEPLOYMENT.md)

## 清理资源

```bash
# 使用脚本清理
./deploy.sh cleanup

# 手动清理
kubectl delete namespace ecommerce

# 删除 PV (需要手动操作)
kubectl delete pv $(kubectl get pv | grep ecommerce | awk '{print $1}')
```

## 性能优化

### 资源调优

根据实际负载调整资源配置：

```yaml
resources:
  requests:
    memory: "2Gi"   # 根据实际情况调整
    cpu: "1000m"
  limits:
    memory: "4Gi"
    cpu: "2000m"
```

### HPA 调优

```bash
# 调整 HPA 阈值
kubectl edit hpa gateway-hpa -n ecommerce

# 调整扩缩容策略
behavior:
  scaleUp:
    stabilizationWindowSeconds: 0
    policies:
    - type: Percent
      value: 100
      periodSeconds: 30
```

## 安全加固

### 网络策略

限制命名空间间的通信：

```bash
kubectl apply -f k8s/network-policy.yaml
```

### Pod 安全

启用 Pod 安全标准：

```yaml
securityContext:
  runAsNonRoot: true
  runAsUser: 1000
  fsGroup: 1000
  seccompProfile:
    type: RuntimeDefault
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
  curl -X POST "http://localhost:8848/nacos/v1/cs/configs?export=true&tenant=ecommerce" \
  > nacos-config.zip
```

## 贡献指南

欢迎提交 Issue 和 Pull Request！

## 许可证

本项目采用 MIT 许可证。

## 相关文档

- [详细部署文档](./DEPLOYMENT.md)
- [部署前检查清单](./CHECKLIST.md)
- [Spring Cloud Alibaba 官方文档](https://spring-cloud-alibaba-group.github.io/)
- [Kubernetes 官方文档](https://kubernetes.io/docs/)
- [Nacos 官方文档](https://nacos.io/docs/)

## 联系方式

如有问题，请提交 Issue 或联系维护者。

---

**注意**: 本方案仅用于生产环境参考，部署前请根据实际需求进行调整和测试。
