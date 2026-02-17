# 秒杀系统 - Kubernetes 完整部署方案

> 基于 Spring Cloud Alibaba 的高并发秒杀系统，使用 Redis 预减库存 + RocketMQ 异步下单

## 项目简介

本项目提供了生产级的秒杀系统 Kubernetes 部署方案，针对高并发场景深度优化：

- ✅ **Redis 集群模式**（3副本）- Lua 脚本预减库存
- ✅ **RocketMQ 集群**（2副本）- 异步下单削峰
- ✅ **订单服务**（5副本 + HPA 5-20）- 快速扩容
- ✅ **Sentinel 限流降级** - 保护系统稳定性
- ✅ **秒杀专用监控** - 实时监控库存、QPS、延迟
- ✅ **自动扩缩容** - HPA 支持秒杀流量突增
- ✅ **CI/CD 流水线** - GitLab CI 自动化部署

## 核心技术架构

### 秒杀三件套

```
用户请求 → Gateway → 限流Sentinel → Redis预减库存(Lua) → RocketMQ异步下单 → MySQL
                       ↓
                   直接返回
```

#### 1. Redis 预减库存（Lua 脚本）
- **原子性操作**：库存扣减 + 用户去重
- **高性能**：纯内存操作，单机 10W+ QPS
- **防超卖**：Lua 脚本保证原子性
- **自动回滚**：下单失败时回滚库存

```lua
-- deduct_stock.lua
local stock = tonumber(redis.call('get', stock_key))
if stock < quantity then
  return -1  -- 库存不足
end
redis.call('decrby', stock_key, quantity)
redis.call('sadd', users_key, user_id)
return 1  -- 成功
```

#### 2. RocketMQ 异步下单
- **削峰填谷**：消息队列缓冲下单请求
- **解耦系统**：订单服务与库存服务解耦
- **高吞吐**：单机 5W+ 消息/秒
- **可靠投递**：同步刷盘 + 主从复制

#### 3. Sentinel 限流降级
- **QPS 限流**：保护系统不被打垮
- **熔断降级**：异常时快速失败
- **实时监控**：QPS、拒绝数、响应时间

## 架构概览

```
                    ┌─────────────┐
                    │   Ingress   │
                    │   (Nginx)    │
                    └──────┬──────┘
                           │
                    ┌──────▼──────────┐
                    │     Gateway     │
                    │  (限流 Sentinel) │
                    │   (3副本+HPA)   │
                    └──────┬──────────┘
                           │
            ┌──────────────┴──────────────┐
            │                             │
    ┌───────▼────────┐          ┌────────▼─────┐
    │  Order Service │          │Inventory SVC │
    │  (5副本+HPA)   │          │  (3副本+HPA) │
    └───────┬────────┘          └──────────────┘
            │
    ┌───────┴──────────────────────────────┐
    │                                      │
┌───▼────┐  ┌──────────┐  ┌──────────────┐
│ Redis  │  │RocketMQ  │  │    MySQL      │
│(3副本) │  │ (2副本)  │  │  (主从复制)   │
│集群模式│  │异步下单  │  │              │
└────────┘  └──────────┘  └──────────────┘
```

## 快速开始

### 前置要求

- Kubernetes 集群 (v1.24+)
- kubectl 已配置
- 镜像仓库访问权限
- StorageClass `fast-ssd` 已创建
- Ingress Controller 已安装
- Prometheus Operator 已安装

### 一键部署

```bash
# 克隆项目
git clone <repository-url>
cd deployment-examples/flash-sale

# 查看部署选项
./deploy.sh help

# 完整部署
./deploy.sh all

# 分步部署
./deploy.sh infra      # 仅基础设施（Redis + RocketMQ）
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
kubectl apply -f k8s/redis/
kubectl apply -f k8s/rocketmq/

# 3. 部署业务服务
kubectl apply -f k8s/inventory-service/
kubectl apply -f k8s/order-service/
kubectl apply -f k8s/gateway/

# 4. 部署 Ingress
kubectl apply -f k8s/ingress/

# 5. 部署监控
kubectl apply -f monitoring/prometheus/
```

## 部署前配置

### 1. 更新镜像地址

```bash
# 批量替换镜像仓库地址
sed -i 's|your-registry|your-actual-registry.com|g' \
  k8s/gateway/deployment.yaml \
  k8s/order-service/deployment.yaml \
  k8s/inventory-service/deployment.yaml
```

### 2. 修改默认密码

**强烈建议修改所有默认密码！**

```bash
# 更新 MySQL 密码
kubectl create secret generic mysql-secret \
  --from-literal=root-password=your_strong_password \
  --namespace=flash-sale \
  --dry-run=client -o yaml | kubectl apply -f -
```

### 3. 初始化数据库

```bash
# 连接到 MySQL
kubectl exec -it mysql-0 -n flash-sale -- mysql -uroot -p

# 创建数据库
CREATE DATABASE flash_sale CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- 创建库存表
CREATE TABLE inventory (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  activity_id BIGINT NOT NULL,
  stock INT NOT NULL DEFAULT 0,
  version INT NOT NULL DEFAULT 0,
  create_time DATETIME DEFAULT CURRENT_TIMESTAMP,
  update_time DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY uk_activity (activity_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 创建订单表
CREATE TABLE orders (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  order_no VARCHAR(64) NOT NULL,
  user_id BIGINT NOT NULL,
  activity_id BIGINT NOT NULL,
  quantity INT NOT NULL,
  status TINYINT NOT NULL DEFAULT 0,
  create_time DATETIME DEFAULT CURRENT_TIMESTAMP,
  update_time DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY uk_order_no (order_no),
  KEY idx_user_activity (user_id, activity_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
```

## 目录结构

```
flash-sale/
├── k8s/                          # Kubernetes 配置
│   ├── 00-namespace.yaml         # 命名空间
│   ├── redis/                    # Redis 集群（3副本）
│   │   ├── configmap.yaml        # Redis 配置 + Lua 脚本
│   │   ├── statefulset.yaml      # Redis StatefulSet
│   │   └── service.yaml          # Redis Service
│   ├── rocketmq/                 # RocketMQ（2副本）
│   │   ├── broker.yaml           # Broker 配置
│   │   └── service.yaml          # Service
│   ├── order-service/            # 订单服务
│   │   ├── configmap.yaml        # 应用配置
│   │   ├── deployment.yaml       # 部署（5副本）
│   │   ├── service.yaml          # Service
│   │   └── hpa.yaml              # HPA（5-20）
│   ├── inventory-service/        # 库存服务
│   │   ├── deployment.yaml       # 部署（3副本）
│   │   └── service.yaml          # Service + HPA
│   ├── gateway/                  # 网关
│   │   ├── deployment.yaml       # 部署（3副本）
│   │   └── service.yaml          # Service + HPA
│   └── ingress/                  # Ingress 配置
│       └── ingress.yaml
├── cicd/                         # CI/CD 配置
│   └── .gitlab-ci.yml           # GitLab CI 流水线
├── monitoring/                   # 监控配置
│   ├── prometheus/               # ServiceMonitor + 告警规则
│   │   ├── servicemonitor.yaml
│   │   └── prometheus-rule.yaml  # 秒杀专用告警
│   └── grafana/                  # Dashboard JSON
│       └── dashboard.json        # 秒杀实时监控
├── deploy.sh                     # 自动部署脚本
└── README.md                     # 本文件
```

## 组件说明

### 基础设施

| 组件 | 类型 | 副本数 | 存储 | 说明 |
|-----|------|-------|------|------|
| Redis | StatefulSet | 3 | 5Gi/PV | 集群模式 + Lua 脚本 |
| RocketMQ | StatefulSet | 2 | 20Gi/PV | 异步下单削峰 |

### 业务服务

| 服务 | 端口 | HPA | 说明 |
|-----|------|-----|------|
| Gateway | 8080/8081 | 3-10 | API 网关 + Sentinel |
| Order Service | 8082/8083 | 5-20 | 订单服务（核心） |
| Inventory Service | 8084/8085 | 3-10 | 库存服务 |

### HPA 配置

#### 订单服务（核心）
- **最小副本**: 5
- **最大副本**: 20
- **CPU 阈值**: 70%
- **内存阈值**: 80%
- **扩容策略**: 200% 或 5 个 Pod（15秒）
- **缩容策略**: 30%，稳定期 300 秒

#### 其他服务
- **最小副本**: 3
- **最大副本**: 10
- **扩容策略**: 100% 或 2 个 Pod（30秒）

## 监控与告警

### Grafana Dashboard

导入 Dashboard: `monitoring/grafana/dashboard.json`

**核心监控指标**:
- 秒杀订单创建速率（OPS）
- 库存实时监控
- 请求 P99 延迟
- 错误率（5xx）
- Redis QPS、内存使用率
- RocketMQ 消息堆积
- JVM 堆内存、GC 时间
- Pod 副本数、CPU/内存使用率

### 告警规则

预配置秒杀专用告警规则：

#### 业务告警
- 库存不足告警（< 100）
- 订单成功率低（< 95%）
- RocketMQ 消息堆积（> 10000）
- Redis 连接失败
- Redis 内存使用率过高（> 90%）
- Redis 慢查询过多

#### 性能告警
- P99 延迟过高（> 0.5s）
- 错误率过高（> 5%）
- QPS 突增（> 10000）
- Pod CPU/内存使用率过高（> 90%）

#### JVM 告警
- 堆内存使用率过高（> 85%）
- GC 时间过长（> 100ms）
- GC 频率过高（> 10次/秒）

#### HPA 告警
- HPA 达到最大副本数
- HPA 频繁扩缩容（15分钟内>5次）

## 性能优化

### Redis 优化

```conf
# 禁用 RDB，仅使用 AOF
save ""

# AOF 每秒刷盘
appendonly yes
appendfsync everysec

# 慢查询阈值
slowlog-log-slower-than 10000

# Lua 脚本优化
lua-time-limit 5000

# 内存策略
maxmemory 2gb
maxmemory-policy allkeys-lru
```

### RocketMQ 优化

```conf
# 网络线程
clientManageThreadPoolNums = 32
defaultThreadPoolNums = 32

# 消费线程
consumeThreadMin = 32
consumeThreadMax = 64

# 批量消费
pullBatchSize = 32
```

### JVM 优化

```bash
# G1GC 优化（订单服务）
JAVA_OPTS="-Xms1g -Xmx2g \
  -XX:+UseG1GC \
  -XX:MaxGCPauseMillis=200 \
  -XX:+HeapDumpOnOutOfMemoryError"
```

### Tomcat 优化

```yaml
server:
  tomcat:
    threads:
      max: 800          # 最大工作线程
      min-spare: 100    # 最小空闲线程
    accept-count: 1000  # 等待队列长度
    max-connections: 10000
```

## 压测验证

### 准备工作

```bash
# 安装压测工具
go install github.com/rakyll/hey@latest

# 获取网关地址
GATEWAY_URL=$(kubectl get ingress flash-sale-ingress -n flash-sale -o jsonpath='{.spec.rules[0].host}')
```

### 压测脚本

```bash
# 1. 预热库存（在 MySQL 中执行）
INSERT INTO inventory (activity_id, stock) VALUES (1, 10000);

# 2. 预热 Redis（在订单服务中执行）
# 自动预热：定时任务每 5 分钟同步库存到 Redis

# 3. 压测下单接口（1000 并发）
hey -n 100000 -c 1000 -m POST \
  -H "Content-Type: application/json" \
  -d '{"userId":"{random}","activityId":"1","quantity":1}' \
  https://${GATEWAY_URL}/api/flash-sale/order/create

# 4. 观察 HPA 扩容
kubectl get hpa -n flash-sale -w
kubectl get pods -n flash-sale -w

# 5. 查看监控
# Prometheus: http://prometheus.example.com
# Grafana: 导入 dashboard.json
```

### 预期性能指标

| 指标 | 目标值 |
|-----|-------|
| QPS | 10000+ |
| P99 延迟 | < 500ms |
| 错误率 | < 1% |
| CPU 使用率 | < 80% |
| 内存使用率 | < 80% |
| GC 暂停时间 | < 100ms |

## CI/CD 流水线

GitLab CI 流水线包含以下阶段：

1. **Build** - Maven 编译
2. **Test** - 单元测试 + 覆盖率报告
3. **Security** - OWASP 安全扫描
4. **Package** - 构建并推送 Docker 镜像
5. **Deploy-Staging** - 部署到测试环境
6. **Smoke-Test** - 冒烟测试
7. **Deploy-Production** - 金丝雀部署（手动批准）

### 配置步骤

1. 在 GitLab 中配置 CI/CD 变量：
   - `DOCKER_REGISTRY`: 镜像仓库地址
   - `REGISTRY_USER`: 镜像仓库用户名
   - `REGISTRY_PASSWORD`: 镜像仓库密码
   - `KUBECONFIG`: K8s 配置（Base64）

2. 推送代码自动触发流水线

3. 生产环境部署需要手动批准

详细配置: [cicd/.gitlab-ci.yml](./cicd/.gitlab-ci.yml)

## 故障排查

### Pod 无法启动

```bash
# 查看 Pod 详情
kubectl describe pod <pod-name> -n flash-sale

# 查看日志
kubectl logs <pod-name> -n flash-sale

# 查看之前容器日志
kubectl logs <pod-name> -n flash-sale --previous
```

### Redis 连接失败

```bash
# 检查 Redis 集群状态
kubectl exec -it redis-0 -n flash-sale -- redis-cli cluster info

# 检查 Redis 节点
kubectl exec -it redis-0 -n flash-sale -- redis-cli cluster nodes

# 测试 Lua 脚本
kubectl exec -it redis-0 -n flash-sale -- redis-cli \
  --eval deduct_stock.lua stock_key users_key , user_id 1
```

### RocketMQ 消息堆积

```bash
# 查看 Broker 状态
kubectl exec -it rocketmq-broker-0 -n flash-sale -- \
  mqadmin clusterList -n rocketmq-namesrv:9876

# 查看消息堆积
kubectl exec -it rocketmq-broker-0 -n flash-sale -- \
  mqadmin brokerConsumeStats -b rocketmq-broker-0:10911

# 重试消费
kubectl exec -it rocketmq-broker-0 -n flash-sale -- \
  mqadmin resetOffsetByTime -n rocketmq-namesrv:9879 \
  -t flash-sale-order-topic -o now
```

### HPA 不工作

```bash
# 检查 Metrics Server
kubectl get apiservice v1beta1.metrics.k8s.io

# 查看资源使用
kubectl top pods -n flash-sale

# 查看 HPA 事件
kubectl describe hpa <hpa-name> -n flash-sale
```

## 清理资源

```bash
# 使用脚本清理
./deploy.sh cleanup

# 手动清理
kubectl delete namespace flash-sale

# 删除 PV（需要手动操作）
kubectl delete pv $(kubectl get pv | grep flash-sale | awk '{print $1}')
```

## 最佳实践

### 1. 秒杀活动准备

```bash
# 活动前 1 小时
1. 预热库存到 Redis
2. 检查 HPA 配置
3. 检查告警规则
4. 预扩容订单服务到 10 副本

# 活动中
1. 实时监控 Grafana Dashboard
2. 关注 Redis 内存使用率
3. 关注 RocketMQ 消息堆积
4. 准备手动扩容

# 活动后
1. 数据一致性校验
2. 库存回滚
3. 缩容服务
4. 生成活动报告
```

### 2. 流量削峰策略

```yaml
# Gateway 限流
spring:
  cloud:
    gateway:
      routes:
      - id: flash-sale-order
        filters:
        - name: RequestRateLimiter
          args:
            replenishRate: 1000  # 令牌每秒填充速率
            burstCapacity: 2000  # 令牌桶容量

# Sentinel 限流
spring:
  cloud:
    sentinel:
      datasource:
        flow:
          nacos:
            data-id: flash-sale-order-service-flow-rules
            group-id: SENTINEL_GROUP
            # 规则：QPS = 10000
```

### 3. 数据一致性

```java
// 1. Redis 预减库存（Lua 保证原子性）
// 2. RocketMQ 发送订单消息（异步下单）
// 3. 定时任务补偿（每分钟）
//    - 对比 Redis 和 MySQL 库存
//    - 回滚失败的订单
//    - 补充 Redis 库存
```

## 相关文档

- [Spring Cloud Alibaba 官方文档](https://spring-cloud-alibaba-group.github.io/)
- [Redis 官方文档](https://redis.io/docs/)
- [RocketMQ 官方文档](https://rocketmq.apache.org/docs/)
- [Sentinel 官方文档](https://sentinelguard.io/zh-cn/docs/)
- [Kubernetes 官方文档](https://kubernetes.io/docs/)

## 许可证

本项目采用 MIT 许可证。

## 联系方式

如有问题，请提交 Issue 或联系维护者。

---

**注意**: 本方案针对高并发秒杀场景优化，部署前请务必进行压测并根据实际需求调整配置。
