# 支付系统 - Kubernetes 完整部署方案

> 基于 Spring Cloud Alibaba 的分布式支付系统，使用 Seata 保证事务一致性 + Redis 实现幂等性控制

## 项目简介

本项目提供了生产级的支付系统 Kubernetes 部署方案，针对支付场景深度优化：

- ✅ **幂等性保证** - Redis 缓存 + 数据库唯一索引双重保障
- ✅ **分布式事务** - Seata AT 模式保证支付与订单状态同步
- ✅ **支付核心服务**（3副本 + HPA 3-10） - 支持微信/支付宝支付
- ✅ **订单回调服务**（3副本 + HPA 3-10） - 处理第三方支付回调
- ✅ **对账服务**（定时任务） - 每30分钟对账确保资金安全
- ✅ **支付专用监控** - 实时监控支付成功率、响应时间、对账差异
- ✅ **高可用** - HPA 自动扩缩容 + 反亲和性调度
- ✅ **CI/CD 流水线** - GitLab CI 自动化部署

## 核心技术架构

### 支付三件套

```
用户支付请求 → Gateway → 幂等性检查(Redis) → 支付核心服务 → 第三方支付平台
                      ↓                       ↓
                 防止重复支付              Seata分布式事务
                                              ↓
                                        订单状态同步
                                              ↓
                                        回调服务
                                              ↓
                                        对账服务(CronJob)
```

#### 1. 幂等性保证（Redis + 数据库唯一索引）

**双重保障机制**：

- **Redis 缓存**：5分钟窗口期，快速拦截重复请求
  ```java
  // 幂等性键生成策略
  String idempotentKey = "payment:idempotent:" + businessNo;

  // Redis 检查
  Boolean exists = redisTemplate.hasKey(idempotentKey);
  if (exists) {
      throw new IdempotentException("重复支付请求");
  }

  // 设置缓存（5分钟过期）
  redisTemplate.opsForValue().set(idempotentKey, "1", 5, TimeUnit.MINUTES);
  ```

- **数据库唯一索引**：长期保证，防止 Redis 缓存失效后重复支付
  ```sql
  CREATE TABLE payment_records (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    payment_no VARCHAR(64) NOT NULL,
    business_no VARCHAR(64) NOT NULL,  -- 业务编号
    UNIQUE KEY uk_payment_no (payment_no),
    UNIQUE KEY uk_business_no (business_no)  -- 唯一索引防止重复
  );
  ```

#### 2. Seata 分布式事务（AT 模式）

**事务一致性保证**：

```java
@GlobalTransactional(name = "payment-tx-group", rollbackFor = Exception.class)
public void processPayment(PaymentRequest request) {
    // 1. 创建支付记录
    paymentService.createPayment(request);

    // 2. 更新订单状态（远程调用）
    orderService.updateOrderStatus(request.getBusinessNo(), "PAID");

    // 3. 扣减库存（远程调用）
    inventoryService.deductStock(request.getProductId(), request.getQuantity());

    // Seata 自动保证：任一步骤失败，全部回滚
}
```

**Seata AT 模式特点**：
- 无需手动编写补偿逻辑
- 自动记录 SQL 前后镜像
- 二阶段自动提交/回滚
- 高性能：默认行级锁

#### 3. 对账服务（定时任务）

**资金安全保障**：

```yaml
# CronJob 配置：每30分钟执行一次
schedule: "0/30 * * * *"
concurrencyPolicy: Forbid  # 不允许并发执行
```

**对账流程**：
1. 查询最近7天的支付记录
2. 调用微信/支付宝对账接口
3. 对比本地记录与第三方记录
4. 发现差异立即告警
5. 生成对账报告

## 架构概览

```
                    ┌─────────────┐
                    │   Ingress   │
                    │   (Nginx)    │
                    └──────┬──────┘
                           │
            ┌──────────────┴──────────────┐
            │                             │
    ┌───────▼────────┐          ┌────────▼─────┐
    │ Payment Service │          │Callback SVC   │
    │ (3副本+HPA 3-10)│          │(3副本+HPA 3-10)│
    └───────┬────────┘          └──────────────┘
            │
    ┌───────┴──────────────────────────────┐
    │                                      │
┌───▼────┐  ┌──────────┐  ┌──────────────┐
│ Redis  │  │  Seata   │  │    MySQL      │
│幂等缓存 │  │   TC     │  │  支付记录存储  │
│(5分钟) │  │分布式事务 │  │              │
└────────┘  └──────────┘  └──────────────┘
                                      │
                              ┌───────▼────────┐
                              │Reconciliation  │
                              │(定时对账任务)   │
                              └────────────────┘
```

## 快速开始

### 前置要求

- Kubernetes 集群 (v1.24+)
- kubectl 已配置
- 镜像仓库访问权限
- StorageClass `fast-ssd` 已创建
- Ingress Controller 已安装
- Prometheus Operator 已安装
- Nacos 服务（可复用其他环境）

### 一键部署

```bash
# 克隆项目
git clone <repository-url>
cd deployment-examples/payment

# 查看部署选项
./deploy.sh help

# 完整部署
./deploy.sh all

# 分步部署
./deploy.sh infra      # 仅基础设施（MySQL + Redis + Seata）
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
kubectl apply -f k8s/redis/
kubectl apply -f k8s/seata/

# 3. 部署业务服务
kubectl apply -f k8s/payment-service/
kubectl apply -f k8s/callback-service/
kubectl apply -f k8s/reconciliation-service/

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
  k8s/payment-service/deployment.yaml \
  k8s/callback-service/deployment.yaml \
  k8s/reconciliation-service/deployment.yaml
```

### 2. 配置支付密钥

**重要：请使用真实的支付密钥！**

```bash
# 创建支付密钥 Secret
kubectl create secret generic payment-service-secret \
  --from-literal=mysql-password=your_strong_password \
  --from-literal=wechat-app-id=your_wechat_app_id \
  --from-literal=wechat-mch-id=your_wechat_mch_id \
  --from-literal=wechat-api-key=your_wechat_api_key \
  --from-literal=alipay-app-id=your_alipay_app_id \
  --from-literal=alipay-private-key=your_alipay_private_key \
  --from-literal=alipay-public-key=your_alipay_public_key \
  --namespace=payment \
  --dry-run=client -o yaml | kubectl apply -f -
```

### 3. 初始化数据库

```bash
# 查看数据库初始化 SQL
./deploy.sh init-db

# 连接到 MySQL
kubectl exec -it mysql-0 -n payment -- mysql -uroot -p

# 执行初始化 SQL（参考 init-db 输出）
```

**关键表结构**：

```sql
-- 支付记录表
CREATE TABLE payment_records (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  payment_no VARCHAR(64) NOT NULL COMMENT '支付流水号',
  business_no VARCHAR(64) NOT NULL COMMENT '业务编号',
  payment_channel VARCHAR(20) NOT NULL COMMENT '支付渠道',
  amount DECIMAL(10,2) NOT NULL COMMENT '支付金额',
  status TINYINT NOT NULL DEFAULT 0 COMMENT '状态',
  notify_status TINYINT DEFAULT 0 COMMENT '回调状态',
  create_time DATETIME DEFAULT CURRENT_TIMESTAMP,
  update_time DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY uk_payment_no (payment_no),
  UNIQUE KEY uk_business_no (business_no),  -- 幂等性保证
  KEY idx_payment_channel (payment_channel)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Seata 相关表（参考 Seata 官方文档）
-- global_table, branch_table, lock_table
```

## 目录结构

```
payment/
├── k8s/                          # Kubernetes 配置
│   ├── 00-namespace.yaml         # 命名空间
│   ├── mysql/                    # MySQL（单主）
│   │   └── statefulset.yaml      # MySQL StatefulSet + ConfigMap
│   ├── redis/                    # Redis（幂等性缓存）
│   │   └── deployment.yaml       # Redis Deployment + ConfigMap
│   ├── seata/                    # Seata Server（TC）
│   │   └── statefulset.yaml      # Seata StatefulSet + ConfigMap
│   ├── payment-service/          # 支付核心服务
│   │   ├── configmap.yaml        # 应用配置
│   │   ├── deployment.yaml       # 部署（3副本）
│   │   ├── service.yaml          # Service
│   │   └── hpa.yaml              # HPA（3-10）
│   ├── callback-service/         # 订单回调服务
│   │   ├── configmap.yaml        # 应用配置
│   │   ├── deployment.yaml       # 部署（3副本）
│   │   ├── service.yaml          # Service
│   │   ├── hpa.yaml              # HPA（3-10）
│   │   └── ingress.yaml          # 对外暴露回调接口
│   ├── reconciliation-service/   # 对账服务
│   │   ├── deployment.yaml       # 部署（1副本）
│   │   ├── service.yaml          # Service
│   │   └── cronjob.yaml          # 定时对账任务
│   └── ingress/                  # Ingress 配置
│       └── ingress.yaml
├── cicd/                         # CI/CD 配置
│   └── .gitlab-ci.yml           # GitLab CI 流水线
├── monitoring/                   # 监控配置
│   ├── prometheus/               # ServiceMonitor + 告警规则
│   │   ├── servicemonitor.yaml
│   │   └── prometheus-rule.yaml  # 支付专用告警
│   └── grafana/                  # Dashboard JSON
│       └── dashboard.json        # 支付实时监控
├── deploy.sh                     # 自动部署脚本
└── README.md                     # 本文件
```

## 组件说明

### 基础设施

| 组件 | 类型 | 副本数 | 存储 | 说明 |
|-----|------|-------|------|------|
| MySQL | StatefulSet | 1 | 20Gi/PV | 支付记录存储（单主） |
| Redis | Deployment | 1 | 2Gi/emptyDir | 幂等性缓存（5分钟窗口） |
| Seata | StatefulSet | 1 | - | 分布式事务 TC |

### 业务服务

| 服务 | 端口 | HPA | 说明 |
|-----|------|-----|------|
| Payment Service | 8086/8087 | 3-10 | 支付核心服务 |
| Callback Service | 8088/8089 | 3-10 | 订单回调服务 |
| Reconciliation Service | 8090/8091 | - | 对账服务 |

### HPA 配置

#### 支付服务（核心）
- **最小副本**: 3
- **最大副本**: 10
- **CPU 阈值**: 70%
- **内存阈值**: 80%
- **扩容策略**: 100% 或 2 个 Pod（30秒）
- **缩容策略**: 30%，稳定期 300 秒

#### 回调服务
- **最小副本**: 3
- **最大副本**: 10
- **扩容策略**: 100% 或 2 个 Pod（30秒）
- **缩容策略**: 30%，稳定期 300 秒

## 监控与告警

### Grafana Dashboard

导入 Dashboard: `monitoring/grafana/dashboard.json`

**核心监控指标**:
- 支付成功率（目标 > 99%）
- 支付 QPS（按渠道统计）
- 支付响应时间 P99（目标 < 3s）
- 支付渠道分布（微信/支付宝）
- 回调处理成功率
- 对账差异统计（目标 = 0）
- JVM 堆内存、GC 时间
- Pod 副本数、CPU/内存使用率
- Redis 连接数、内存使用率

### 告警规则

预配置支付专用告警规则：

#### 业务告警
- 支付成功率低（< 99%）
- 支付响应时间 P99 过高（> 3s）
- 对账差异检测（> 0）
- 微信支付错误率过高（> 5%）
- 支付宝错误率过高（> 5%）
- 回调处理失败率过高（> 1%）
- 回调处理延迟过高（> 1s）

#### 性能告警
- 支付 QPS 突增（> 2000）
- Pod CPU/内存使用率过高（> 90%）
- JVM 堆内存使用率过高（> 85%）
- GC 时间过长（> 100ms）

#### 基础设施告警
- 支付服务下线
- Redis 连接失败
- MySQL 连接失败
- Seata 连接失败
- HPA 达到最大副本数

## 幂等性设计说明

### 为什么需要幂等性？

支付系统中，用户可能因网络问题重复点击支付按钮，或者第三方支付平台重复回调，必须保证**同一笔业务只扣款一次**。

### 幂等性实现方案

#### 方案1：Redis 缓存（短期）

**优势**：
- 高性能：毫秒级响应
- 自动过期：5分钟窗口期

**实现**：
```java
@Override
public Payment createPayment(PaymentRequest request) {
    String idempotentKey = "payment:idempotent:" + request.getBusinessNo();

    // 1. Redis 检查
    Boolean exists = redisTemplate.opsForValue()
        .setIfAbsent(idempotentKey, "1", 5, TimeUnit.MINUTES);
    if (Boolean.FALSE.equals(exists)) {
        throw new IdempotentException("重复支付请求");
    }

    // 2. 业务逻辑
    Payment payment = doCreatePayment(request);

    return payment;
}
```

#### 方案2：数据库唯一索引（长期）

**优势**：
- 持久化保证：即使 Redis 故障也能防止重复
- 事务支持：与业务逻辑在同一事务中

**实现**：
```sql
-- 创建唯一索引
CREATE UNIQUE INDEX uk_business_no ON payment_records(business_no);
```

```java
@Override
public Payment createPayment(PaymentRequest request) {
    try {
        // 尝试插入记录
        Payment payment = new Payment();
        payment.setBusinessNo(request.getBusinessNo());
        // ... 其他字段
        paymentMapper.insert(payment);
        return payment;
    } catch (DuplicateKeyException e) {
        throw new IdempotentException("重复支付请求", e);
    }
}
```

#### 方案3：双重保障（推荐）

结合 Redis 和数据库唯一索引，提供**高性能 + 持久化保证**：

```
请求 → Redis 检查（快速拦截）→ 数据库唯一索引（兜底保证）→ 第三方支付
```

## 分布式事务配置

### Seata AT 模式

**工作原理**：

1. **一阶段**：
   - 业务 SQL 执行前，查询当前数据（前镜像）
   - 业务 SQL 执行
   - 业务 SQL 执行后，查询当前数据（后镜像）
   - 保存行锁（SELECT FOR UPDATE）
   - 提交本地事务
   - 上报分支状态

2. **二阶段**：
   - **提交**：异步删除 undo log
   - **回滚**：根据 undo log 生成反向 SQL，执行回滚

**配置示例**：

```yaml
spring:
  cloud:
    alibaba:
      seata:
        tx-service-group: payment-tx-group
        registry:
          type: nacos
          nacos:
            server-addr: nacos.payment.svc.cluster.local:8848
            namespace: payment
            group: SEATA_GROUP
```

```java
@GlobalTransactional(name = "payment-tx-group", rollbackFor = Exception.class)
public void processPayment(PaymentRequest request) {
    // 1. 创建支付记录
    paymentService.createPayment(request);

    // 2. 更新订单状态
    orderService.updateOrderStatus(request.getBusinessNo(), "PAID");

    // 3. 扣减库存
    inventoryService.deductStock(request.getProductId(), request.getQuantity());

    // Seata 自动保证一致性
}
```

## 对账服务说明

### 对账流程

```
定时任务(CronJob) → 查询本地支付记录 → 调用第三方对账接口 → 对比记录 → 发现差异 → 告警
```

### 对账配置

```yaml
reconciliation:
  task:
    enabled: true
    cron: "0 0/30 * * * ?"  # 每30分钟
    timeout: 600000  # 10分钟超时
  strategy:
    days: 7  # 对账最近7天
    batch-size: 1000
    threads: 5
  alert:
    enabled: true
    difference-threshold: 0  # 任何差异都告警
```

### 对账差异处理

1. **立即告警**：发送邮件/短信给支付团队
2. **生成报告**：记录差异明细
3. **人工核实**：联系第三方支付平台
4. **手动修正**：根据核实结果修正数据

## 性能优化

### Redis 优化

```conf
# 幂等性缓存优化
maxmemory 1gb
maxmemory-policy allkeys-lru

# 仅使用 AOF
save ""
appendonly yes
appendfsync everysec
```

### MySQL 优化

```conf
# 性能优化
max_connections=500
innodb_buffer_pool_size=1G
innodb_flush_log_at_trx_commit=2
sync_binlog=1
```

### JVM 优化

```bash
# G1GC 优化（支付服务）
JAVA_OPTS="-Xms512m -Xmx1g \
  -XX:+UseG1GC \
  -XX:MaxGCPauseMillis=200 \
  -XX:+HeapDumpOnOutOfMemoryError"
```

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
   - `KUBECONFIG_STAGING`: 测试环境 K8s 配置（Base64）
   - `KUBECONFIG_PRODUCTION`: 生产环境 K8s 配置（Base64）

2. 推送代码自动触发流水线

3. 生产环境部署需要手动批准

详细配置: [cicd/.gitlab-ci.yml](./cicd/.gitlab-ci.yml)

## 故障排查

### Pod 无法启动

```bash
# 查看 Pod 详情
kubectl describe pod <pod-name> -n payment

# 查看日志
kubectl logs <pod-name> -n payment

# 查看之前容器日志
kubectl logs <pod-name> -n payment --previous
```

### Redis 连接失败

```bash
# 检查 Redis 状态
kubectl exec -it redis-0 -n payment -- redis-cli ping

# 检查幂等性缓存
kubectl exec -it redis-0 -n payment -- redis-cli \
  KEYS "payment:idempotent:*"
```

### Seata 事务回滚失败

```bash
# 查看 Seata 日志
kubectl logs -f seata-0 -n payment

# 检查 Seata 全局事务状态
# 需要访问 Seata 控制台或查询数据库
```

### HPA 不工作

```bash
# 检查 Metrics Server
kubectl get apiservice v1beta1.metrics.k8s.io

# 查看资源使用
kubectl top pods -n payment

# 查看 HPA 事件
kubectl describe hpa <hpa-name> -n payment
```

## 清理资源

```bash
# 使用脚本清理
./deploy.sh cleanup

# 手动清理
kubectl delete namespace payment

# 删除 PV（需要手动操作）
kubectl delete pv $(kubectl get pv | grep payment | awk '{print $1}')
```

## 最佳实践

### 1. 支付安全

- **密钥管理**：使用 Kubernetes Secret 存储支付密钥，定期轮换
- **签名验证**：严格验证第三方回调签名
- **HTTPS**：所有支付接口强制 HTTPS
- **限流**：防止恶意刷单攻击

### 2. 幂等性优化

```java
// 使用 SETNX 原子操作
Boolean success = redisTemplate.opsForValue()
    .setIfAbsent(idempotentKey, "1", 5, TimeUnit.MINUTES);

// 使用数据库唯一索引兜底
try {
    paymentMapper.insert(payment);
} catch (DuplicateKeyException e) {
    throw new IdempotentException("重复支付请求", e);
}
```

### 3. 分布式事务优化

```java
// 尽量缩小事务范围
@GlobalTransactional
public void processPayment(PaymentRequest request) {
    // 核心逻辑：支付 + 订单状态
    paymentService.createPayment(request);
    orderService.updateOrderStatus(request.getBusinessNo(), "PAID");

    // 非核心逻辑：异步处理
    applicationEventPublisher.publishEvent(new PaymentCompletedEvent(request));
}
```

### 4. 对账策略

```yaml
# 每日对账（凌晨）
cron: "0 0 2 * * ?"  # 每天凌晨2点

# 实时对账（高频）
cron: "0/30 * * * ?"  # 每30分钟
```

## 相关文档

- [Spring Cloud Alibaba 官方文档](https://spring-cloud-alibaba-group.github.io/)
- [Seata 官方文档](https://seata.io/)
- [Redis 官方文档](https://redis.io/docs/)
- [微信支付开发文档](https://pay.weixin.qq.com/wiki/doc/api/index.html)
- [支付宝开放平台](https://opendocs.alipay.com/)
- [Kubernetes 官方文档](https://kubernetes.io/docs/)

## 许可证

本项目采用 MIT 许可证。

## 联系方式

如有问题，请提交 Issue 或联系维护者。

---

**注意**: 本方案针对支付场景优化，部署前请务必：
1. 配置真实的支付密钥
2. 初始化数据库
3. 进行充分的测试
4. 配置监控告警
