# 秒杀系统部署前检查清单

## 1. 基础设施检查

### 1.1 Kubernetes 集群
- [ ] Kubernetes 版本 >= 1.24
- [ ] kubectl 已配置并可连接集群
- [ ] 节点资源充足（建议 >= 3 节点，每节点 >= 8C16G）
- [ ] StorageClass `fast-ssd` 已创建

```bash
# 检查集群版本
kubectl version --short

# 检查节点资源
kubectl top nodes

# 检查 StorageClass
kubectl get storageclass
```

### 1.2 必需组件
- [ ] Ingress Controller 已安装
- [ ] Prometheus Operator 已安装
- [ ] Metrics Server 已安装（用于 HPA）

```bash
# 检查 Ingress Controller
kubectl get pods -n ingress-nginx

# 检查 Prometheus Operator
kubectl get pods -n monitoring

# 检查 Metrics Server
kubectl get apiservice v1beta1.metrics.k8s.io
```

## 2. 配置检查

### 2.1 镜像仓库
- [ ] 镜像仓库地址已更新
- [ ] 镜像已构建并推送
- [ ] 镜像拉取凭证已配置

```bash
# 批量替换镜像地址
sed -i 's|your-registry|your-actual-registry.com|g' \
  k8s/gateway/deployment.yaml \
  k8s/order-service/deployment.yaml \
  k8s/inventory-service/deployment.yaml
```

### 2.2 密码配置
- [ ] MySQL 密码已修改
- [ ] Redis 密码已配置（如需要）
- [ ] Nacos 密码已配置（如需要）
- [ ] 敏感信息已存储在 Secret 中

```bash
# 更新 MySQL 密码
kubectl create secret generic mysql-secret \
  --from-literal=root-password=your_strong_password \
  --namespace=flash-sale \
  --dry-run=client -o yaml | kubectl apply -f -
```

### 2.3 数据库初始化
- [ ] MySQL 数据库已创建
- [ ] 数据表已创建
- [ ] 索引已创建
- [ ] 初始数据已导入

```sql
-- 创建数据库
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

## 3. 网络配置

### 3.1 Ingress 配置
- [ ] Ingress 域名已配置
- [ ] DNS 解析已配置
- [ ] SSL 证书已配置（生产环境）

```bash
# 检查 Ingress
kubectl get ingress -n flash-sale

# 测试域名解析
nslookup flash-sale.example.com
```

### 3.2 服务发现
- [ ] Nacos 地址已配置
- [ ] 服务注册已启用
- [ ] 服务发现已测试

## 4. 资源配额

### 4.1 资源需求
| 组件 | CPU | 内存 | 存储 |
|-----|-----|------|------|
| Redis (x3) | 3C | 6Gi | 15Gi |
| RocketMQ (x2) | 4C | 8Gi | 50Gi |
| Order Service (x5) | 10C | 20Gi | - |
| Inventory Service (x3) | 3C | 6Gi | - |
| Gateway (x3) | 3C | 6Gi | - |
| **总计** | **23C** | **46Gi** | **65Gi** |

### 4.2 HPA 配置
- [ ] Metrics Server 正常运行
- [ ] HPA 阈值已根据业务调整
- [ ] 最大副本数符合集群容量

```bash
# 测试 HPA
kubectl get hpa -n flash-sale
kubectl top pods -n flash-sale
```

## 5. 监控告警

### 5.1 Prometheus 配置
- [ ] ServiceMonitor 已创建
- [ ] 告警规则已加载
- [ ] 告警通道已配置

```bash
# 检查 Prometheus Target
kubectl get servicemonitor -n flash-sale

# 访问 Prometheus UI
kubectl port-forward -n monitoring svc/prometheus-operated 9090:9090
```

### 5.2 Grafana Dashboard
- [ ] Dashboard 已导入
- [ ] 数据源已配置
- [ ] 面板显示正常

```bash
# 导入 Dashboard
# 访问 Grafana: http://grafana.example.com
# 导入文件: monitoring/grafana/dashboard.json
```

### 5.3 告警接收
- [ ] 告警接收人已配置
- [ ] 告警级别已设置
- [ ] 告警静默规则已配置

## 6. 性能优化

### 6.1 Redis 优化
- [ ] Redis 配置已优化（禁用 RDB，仅 AOF）
- [ ] Lua 脚本已测试
- [ ] 集群模式已启用

```bash
# 测试 Lua 脚本
kubectl exec -it redis-0 -n flash-sale -- redis-cli \
  --eval /etc/redis/deduct_stock.lua \
  stock:activity:1 users:activity:1 , user123 1
```

### 6.2 RocketMQ 优化
- [ ] Broker 配置已优化
- [ ] 消费线程已调整
- [ ] 批量消费已启用

### 6.3 JVM 优化
- [ ] JVM 参数已配置
- [ ] GC 策略已选择（G1GC）
- [ ] 堆内存大小已设置

```yaml
JAVA_OPTS: "-Xms1g -Xmx2g -XX:+UseG1GC -XX:MaxGCPauseMillis=200"
```

## 7. 安全检查

### 7.1 网络策略
- [ ] Network Policy 已配置（可选）
- [ ] Pod 间通信已限制
- [ ] 外部访问已控制

### 7.2 Pod 安全
- [ ] Security Context 已配置
- [ ] 非 root 用户运行
- [ ] 只读根文件系统（可选）

### 7.3 密钥管理
- [ ] 密码使用 Secret 管理
- [ ] 敏感信息未明文存储
- [ .gitignore 已配置

## 8. CI/CD 配置

### 8.1 GitLab CI
- [ ] CI/CD 变量已配置
- [ ] Kubeconfig 已配置（Base64）
- [ ] 镜像仓库凭证已配置

```bash
# 编码 Kubeconfig
cat ~/.kube/config | base64 -w 0

# 在 GitLab 中配置变量
# Settings > CI/CD > Variables
# KUBECONFIG: <base64-encoded-kubeconfig>
```

### 8.2 部署流水线
- [ ] 构建阶段正常
- [ ] 测试阶段通过
- [ ] 部署阶段可用
- [ ] 手动批准已配置

## 9. 压测验证

### 9.1 压测准备
- [ ] 压测工具已安装（hey/wrk/ab）
- [ ] 测试数据已准备
- [ ] 监控已就绪

### 9.2 压测执行
- [ ] 预热请求已完成
- [ ] 压测已执行（1000 并发）
- [ ] 性能指标已记录

### 9.3 性能指标
| 指标 | 目标值 | 实际值 |
|-----|-------|-------|
| QPS | >= 10000 | ____ |
| P99 延迟 | <= 500ms | ____ |
| 错误率 | <= 1% | ____ |
| CPU 使用率 | <= 80% | ____ |
| 内存使用率 | <= 80% | ____ |

## 10. 运维准备

### 10.1 运维文档
- [ ] 部署文档已完善
- [ ] 运维手册已编写
- [ ] 故障排查指南已准备

### 10.2 应急预案
- [ ] 回滚方案已准备
- [ ] 应急联系人已确认
- [ ] 故障响应流程已制定

### 10.3 活动准备
- [ ] 活动前检查清单已准备
- [ ] 监控值班已安排
- [ ] 应急演练已完成

## 11. 部署验证

### 11.1 部署检查
```bash
# 运行部署验证
./deploy.sh verify

# 检查所有 Pod 状态
kubectl get pods -n flash-sale

# 检查所有 Service
kubectl get svc -n flash-sale

# 检查 HPA
kubectl get hpa -n flash-sale

# 检查 Ingress
kubectl get ingress -n flash-sale
```

### 11.2 健康检查
```bash
# 检查 Gateway
kubectl exec -it $(kubectl get pod -n flash-sale -l app=gateway -o jsonpath='{.items[0].metadata.name}') \
  -n flash-sale -- curl http://localhost:8081/actuator/health

# 检查 Order Service
kubectl exec -it $(kubectl get pod -n flash-sale -l app=order-service -o jsonpath='{.items[0].metadata.name}') \
  -n flash-sale -- curl http://localhost:8083/actuator/health

# 检查 Inventory Service
kubectl exec -it $(kubectl get pod -n flash-sale -l app=inventory-service -o jsonpath='{.items[0].metadata.name}') \
  -n flash-sale -- curl http://localhost:8085/actuator/health
```

### 11.3 功能测试
```bash
# 测试秒杀接口
curl -X POST http://flash-sale.example.com/api/flash-sale/order/create \
  -H "Content-Type: application/json" \
  -d '{"userId":"test","activityId":"1","quantity":1}'
```

## 12. 活动前最终检查

### 12.1 1 小时前
- [ ] 所有 Pod 正常运行
- [ ] 库存已预热到 Redis
- [ ] 监控 Dashboard 已打开
- [ ] 告警通道已测试

### 12.2 活动中
- [ ] 实时监控 QPS
- [ ] 实时监控错误率
- [ ] 实时监控延迟
- [ ] 实时监控 HPA 扩容

### 12.3 活动后
- [ ] 数据一致性校验
- [ ] 异常订单处理
- [ ] 监控数据导出
- [ ] 活动报告编写

## 签署确认

- [ ] 开发人员确认：_______________  日期：______
- [ ] 运维人员确认：_______________  日期：______
- [ ] 测试人员确认：_______________  日期：______
- [ ] 项目经理确认：_______________  日期：______

---

**注意事项**：
1. 本检查清单适用于生产环境部署
2. 请逐项检查并勾选，确保所有项目已完成
3. 如有特殊情况，请在备注中说明
4. 建议在测试环境完整验证后再部署到生产环境
