# 电商微服务系统 K8s 部署文件总览

## 文件清单

### K8s 配置文件 (k8s/)

#### 1. 命名空间
- `00-namespace.yaml` - 创建 ecommerce 命名空间

#### 2. MySQL (k8s/mysql/)
- `statefulset.yaml` - MySQL StatefulSet (3副本主从复制)
  - ConfigMap: MySQL 配置
  - Secret: 数据库密码
  - InitContainer: MySQL 初始化
  - PVC 模板: 10Gi 存储
- `service.yaml` - MySQL 服务
  - Headless Service: 集群内部通信
  - ClusterIP Service: 外部访问

#### 3. Nacos (k8s/nacos/)
- `statefulset.yaml` - Nacos StatefulSet (3副本集群)
  - ConfigMap: Nacos 配置
  - Secret: 认证密码
  - 集群模式配置
  - PVC 模板: 5Gi 存储
- `service.yaml` - Nacos 服务
  - Headless Service: 集群内部通信
  - ClusterIP Service: 服务发现
  - LoadBalancer Service: 外部访问

#### 4. Redis (k8s/redis/)
- `deployment.yaml` - Redis Deployment (1副本)
  - ConfigMap: Redis 配置
  - 持久化配置
- `service.yaml` - Redis 服务
  - ClusterIP Service

#### 5. Gateway (k8s/gateway/)
- `deployment.yaml` - Gateway Deployment (3副本)
  - ConfigMap: 应用配置
  - 路由配置
  - 健康检查
- `service.yaml` - Gateway 服务
  - ClusterIP Service
- `hpa.yaml` - Gateway 自动扩缩容
  - 最小副本: 3
  - 最大副本: 10
  - CPU 阈值: 70%
  - 内存阈值: 80%

#### 6. 业务服务 (k8s/services/)

##### Order Service (k8s/services/order-service/)
- `deployment.yaml` - 订单服务 Deployment (3副本)
  - ConfigMap: 应用配置
  - Secret: 数据库密码
  - InitContainer: 依赖检查
  - 健康检查
- `service.yaml` - 订单服务
  - ClusterIP Service
- `hpa.yaml` - 自动扩缩容 (3-10副本)

##### User Service (k8s/services/user-service/)
- `deployment.yaml` - 用户服务 Deployment (3副本)
- `service.yaml` - 用户服务
- `hpa.yaml` - 自动扩缩容 (3-10副本)

##### Payment Service (k8s/services/payment-service/)
- `deployment.yaml` - 支付服务 Deployment (3副本)
- `service.yaml` - 支付服务
- `hpa.yaml` - 自动扩缩容 (3-10副本)

#### 7. Ingress (k8s/ingress/)
- `ingress.yaml` - Ingress 配置
  - HTTP 路由规则
  - HTTPS TLS 配置
  - 速率限制
  - 安全头配置

### CI/CD 配置 (cicd/)

- `.gitlab-ci.yml` - GitLab CI 流水线
  - Build 阶段: Maven 编译
  - Test 阶段: 单元测试 + 覆盖率
  - Package 阶段: 构建镜像
  - Deploy 阶段: 自动部署
  - 回滚任务

### 监控配置 (monitoring/)

#### Prometheus (monitoring/prometheus/)
- `servicemonitor.yaml` - ServiceMonitor 定义
  - Gateway 监控
  - Order Service 监控
  - User Service 监控
  - Payment Service 监控
- `prometheus-rule.yaml` - Prometheus 告警规则
  - 服务可用性告警
  - 高错误率告警
  - 高延迟告警
  - 资源使用告警
  - 业务指标告警

#### Grafana (monitoring/grafana/)
- `dashboard.json` - 监控面板配置
  - 服务概览
  - 请求速率
  - 错误率
  - P99 延迟
  - JVM 指标
  - 资源使用

### 文档 (根目录)

- `README.md` - 项目说明和快速开始
- `DEPLOYMENT.md` - 详细部署指南
- `CHECKLIST.md` - 部署前检查清单
- `deploy.sh` - 自动部署脚本

## 配置特点

### 1. 高可用性

- **MySQL**: 3 副本 StatefulSet，主从复制
- **Nacos**: 3 副本 StatefulSet，集群模式
- **Gateway**: 3 副本 + HPA (3-10)
- **业务服务**: 3 副本 + HPA (3-10)

### 2. 弹性伸缩

所有业务服务配置 HPA：
- 自动根据 CPU/内存使用率扩缩容
- 扩容策略: 快速响应 (100% 或 2 Pod)
- 缩容策略: 稳定优先 (50%，稳定期 300s)

### 3. 自愈能力

- Liveness Probe: 检测并重启失败容器
- Readiness Probe: 确保服务就绪后才接收流量
- Init Container: 等待依赖服务就绪

### 4. 资源管理

- Request: 保证最小资源分配
- Limit: 防止资源耗尽
- Pod 反亲和性: 分散部署到不同节点

### 5. 安全配置

- Secret 管理敏感信息
- 最小权限原则
- 网络策略 (可选)
- Pod 安全标准 (可选)

### 6. 可观测性

- Prometheus 指标采集
- 完整告警规则
- Grafana 可视化
- 分布式追踪支持

## 使用方式

### 快速部署

```bash
# 一键部署
./deploy.sh all

# 分步部署
./deploy.sh infra      # 基础设施
./deploy.sh services   # 业务服务
./deploy.sh monitoring # 监控
```

### 手动部署

```bash
kubectl apply -f k8s/
kubectl apply -f monitoring/prometheus/
```

## 部署前必做

1. **更新镜像地址**
   ```bash
   sed -i 's|your-registry|your-registry.com|g' k8s/*/*/deployment.yaml
   ```

2. **修改密码**
   ```bash
   kubectl create secret generic mysql-secret \
     --from-literal=root-password=your_password \
     --namespace=ecommerce --dry-run=client -o yaml | kubectl apply -f -
   ```

3. **初始化数据库**
   ```bash
   kubectl exec -it mysql-0 -n ecommerce -- mysql -uroot -p
   CREATE DATABASE ecommerce_order CHARACTER SET utf8mb4;
   ```

详细配置请参考: [CHECKLIST.md](./CHECKLIST.md)

## 文件统计

| 类型 | 数量 | 说明 |
|-----|------|------|
| YAML 配置 | 26 | K8s 资源配置 |
| CI/CD 配置 | 1 | GitLab CI 流水线 |
| 监控配置 | 3 | Prometheus + Grafana |
| 文档 | 4 | README + 部署指南 |
| 脚本 | 1 | 自动部署脚本 |
| **总计** | **35** | 完整部署方案 |

## 资源需求

### 集群要求

- **节点数**: 最少 6 个 Worker 节点
- **CPU**: 每节点 4 核以上
- **内存**: 每节点 16GB 以上
- **存储**: 需配置 fast-ssd StorageClass

### 资源分配 (部署后)

| 组件 | 副本 | CPU (Request) | Memory (Request) | 存储 |
|-----|------|--------------|-----------------|------|
| MySQL | 3 | 1500m | 3Gi | 30Gi |
| Nacos | 3 | 1500m | 3Gi | 15Gi |
| Redis | 1 | 250m | 512Mi | - |
| Gateway | 3 | 1500m | 3Gi | - |
| Order Service | 3 | 1500m | 3Gi | - |
| User Service | 3 | 1500m | 3Gi | - |
| Payment Service | 3 | 1500m | 3Gi | - |
| **总计** | **19** | **10.8 核** | **18.5Gi** | **45Gi** |

注意: HPA 可能会自动扩容到最多 10 副本/服务

## 技术栈

- **容器编排**: Kubernetes 1.24+
- **服务网格**: Spring Cloud Alibaba
- **服务发现**: Nacos 2.2.3
- **数据库**: MySQL 8.0
- **缓存**: Redis 7
- **网关**: Spring Cloud Gateway
- **监控**: Prometheus + Grafana
- **CI/CD**: GitLab CI
- **负载均衡**: NGINX Ingress

## 版本信息

- **创建时间**: 2026-02-17
- **K8s API**: networking.k8s.io/v1, apps/v1, autoscaling/v2
- **Prometheus**: monitoring.coreos.com/v1
- **适用场景**: 生产环境

## 许可证

MIT License

---

**注意**: 本部署方案仅供参考，生产环境使用前请根据实际需求进行调整和充分测试。
