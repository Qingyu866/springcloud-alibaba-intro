# 支付系统部署检查清单

## 部署前检查

### 1. 基础设施

- [ ] Kubernetes 集群版本 >= 1.24
- [ ] kubectl 已配置并可连接集群
- [ ] 镜像仓库访问权限已配置
- [ ] StorageClass `fast-ssd` 已创建
- [ ] Ingress Controller 已安装
- [ ] Prometheus Operator 已安装
- [ ] Nacos 服务可用（或准备部署）

### 2. 配置文件

- [ ] 镜像地址已更新（`your-registry` 替换为实际地址）
- [ ] 支付密钥已配置（Secret）
- [ ] MySQL 密码已修改（默认密码已更改）
- [ ] Ingress 域名已配置（`payment.example.com`）
- [ ] TLS 证书已配置（生产环境）

### 3. 数据库准备

- [ ] MySQL 部署完成并就绪
- [ ] 支付数据库已创建（`payment`）
- [ ] 支付记录表已创建（`payment_records`）
- [ ] Seata 相关表已创建（`global_table`、`branch_table`、`lock_table`）
- [ ] 数据库连接测试通过

### 4. 监控告警

- [ ] Prometheus ServiceMonitor 已部署
- [ ] 告警规则已部署
- [ ] Grafana Dashboard 已导入
- [ ] 告警通知已配置（邮件/短信/钉钉）

## 部署步骤检查

### 1. 基础设施部署

```bash
# 创建命名空间
kubectl apply -f k8s/00-namespace.yaml

# 部署 MySQL
kubectl apply -f k8s/mysql/
kubectl wait --for=condition=ready pod -l app=mysql -n payment --timeout=300s

# 部署 Redis
kubectl apply -f k8s/redis/
kubectl wait --for=condition=ready pod -l app=redis -n payment --timeout=180s

# 部署 Seata
kubectl apply -f k8s/seata/
kubectl wait --for=condition=ready pod -l app=seata -n payment --timeout=300s
```

- [ ] 命名空间创建成功
- [ ] MySQL 就绪（Pod 状态：Running）
- [ ] Redis 就绪（Pod 状态：Running）
- [ ] Seata 就绪（Pod 状态：Running）

### 2. 业务服务部署

```bash
# 部署支付服务
kubectl apply -f k8s/payment-service/
kubectl wait --for=condition=ready pod -l app=payment-service -n payment --timeout=300s

# 部署回调服务
kubectl apply -f k8s/callback-service/
kubectl wait --for=condition=ready pod -l app=callback-service -n payment --timeout=300s

# 部署对账服务
kubectl apply -f k8s/reconciliation-service/
kubectl wait --for=condition=ready pod -l app=reconciliation-service -n payment --timeout=300s
```

- [ ] 支付服务就绪（3个 Pod）
- [ ] 回调服务就绪（3个 Pod）
- [ ] 对账服务就绪（1个 Pod）
- [ ] HPA 创建成功

### 3. Ingress 部署

```bash
# 部署 Ingress
kubectl apply -f k8s/ingress/
```

- [ ] Ingress 创建成功
- [ ] DNS 解析配置完成
- [ ] HTTPS 证书有效（生产环境）

### 4. 监控部署

```bash
# 部署监控
kubectl apply -f monitoring/prometheus/
```

- [ ] ServiceMonitor 创建成功
- [ ] 告警规则创建成功
- [ ] Prometheus 已抓取指标
- [ ] Grafana Dashboard 已导入

## 部署后验证

### 1. Pod 状态检查

```bash
kubectl get pods -n payment
```

- [ ] 所有 Pod 状态为 `Running` 或 `Completed`
- [ ] 没有 `CrashLoopBackOff` 或 `Error` 状态的 Pod
- [ ] Pod 副本数符合预期（3/3/1）

### 2. 服务检查

```bash
kubectl get svc -n payment
```

- [ ] 所有 Service 的 ClusterIP 已分配
- [ ] Service 的 Endpoints 数量符合预期

### 3. HPA 检查

```bash
kubectl get hpa -n payment
```

- [ ] HPA 状态正常
- [ ] 目标副本数与当前副本数一致

### 4. 健康检查

```bash
# 支付服务健康检查
kubectl exec -it payment-service-0 -n payment -- curl http://localhost:8087/actuator/health

# 回调服务健康检查
kubectl exec -it callback-service-0 -n payment -- curl http://localhost:8089/actuator/health

# 对账服务健康检查
kubectl exec -it reconciliation-service-0 -n payment -- curl http://localhost:8091/actuator/health
```

- [ ] 支付服务健康检查通过
- [ ] 回调服务健康检查通过
- [ ] 对账服务健康检查通过

### 5. 功能测试

#### 5.1 幂等性测试

```bash
# 发送相同支付请求两次
curl -X POST https://payment.example.com/api/payment/create \
  -H "Content-Type: application/json" \
  -d '{"businessNo":"TEST001","amount":100,"paymentChannel":"wechat"}'

# 第二次请求应该返回幂等性错误
```

- [ ] 第一次请求成功
- [ ] 第二次请求被拦截（幂等性异常）

#### 5.2 支付流程测试

```bash
# 创建支付
curl -X POST https://payment.example.com/api/payment/create \
  -H "Content-Type: application/json" \
  -d '{"businessNo":"TEST002","amount":100,"paymentChannel":"wechat"}'

# 查询支付状态
curl https://payment.example.com/api/payment/query/TEST002
```

- [ ] 支付创建成功
- [ ] 支付状态查询正常

#### 5.3 对账测试

```bash
# 手动触发对账任务
kubectl create job --from=cronjob/reconciliation-cronjob manual-reconciliation -n payment

# 查看对账任务日志
kubectl logs -f manual-reconciliation-xxx -n payment
```

- [ ] 对账任务执行成功
- [ ] 对账报告生成

### 6. 监控告警测试

#### 6.1 Prometheus 检查

```bash
# 检查 Prometheus 是否抓取指标
curl http://prometheus.example.com/api/v1/targets | jq '.data.activeTargets[] | select(.labels.namespace == "payment")'
```

- [ ] 所有支付服务指标已抓取

#### 6.2 Grafana Dashboard 检查

- [ ] 打开 Grafana Dashboard
- [ ] 支付成功率显示正常
- [ ] 支付 QPS 显示正常
- [ ] 支付响应时间显示正常

#### 6.3 告警测试

- [ ] 故意制造一个异常（如停止 Redis）
- [ ] 检查告警是否触发
- [ ] 检查告警通知是否发送

## 性能测试

### 1. 压测准备

```bash
# 安装压测工具
go install github.com/rakyll/hey@latest

# 获取支付服务地址
PAYMENT_URL=$(kubectl get svc payment-service -n payment -o jsonpath='{.status.loadBalancer.ingress[0].ip}')
```

### 2. 压测执行

```bash
# 压测支付创建接口（100 并发）
hey -n 10000 -c 100 -m POST \
  -H "Content-Type: application/json" \
  -d '{"businessNo":"{random}","amount":100,"paymentChannel":"wechat"}' \
  https://${PAYMENT_URL}/api/payment/create

# 观察 HPA 扩容
kubectl get hpa -n payment -w
kubectl get pods -n payment -w
```

- [ ] 支付成功率 >= 99%
- [ ] P99 延迟 < 3s
- [ ] HPA 自动扩容正常
- [ ] 没有 Pod OOMKilled

### 3. 压测结果分析

- [ ] QPS 达到预期（> 1000）
- [ ] CPU 使用率 < 80%
- [ ] 内存使用率 < 80%
- [ ] GC 暂停时间 < 100ms

## 安全检查

### 1. 密钥管理

- [ ] 支付密钥存储在 Secret 中
- [ ] Secret 未提交到 Git 仓库
- [ ] 密钥定期轮换策略已制定

### 2. 网络安全

- [ ] 所有支付接口强制 HTTPS
- [ ] Ingress 限流已配置
- [ ] 回调接口签名验证已启用

### 3. 数据安全

- [ ] 数据库访问白名单已配置
- [ ] 敏感字段加密存储
- [ ] 数据备份策略已制定

## 故障恢复测试

### 1. Pod 故障测试

```bash
# 删除一个 Pod
kubectl delete pod payment-service-0 -n payment

# 观察 Pod 重建
kubectl get pods -n payment -w
```

- [ ] Pod 自动重建成功
- [ ] 服务无中断

### 2. 节点故障测试

```bash
# 模拟节点故障（cordon）
kubectl cordon <node-name>
kubectl drain <node-name> --ignore-daemonsets --force

# 观察 Pod 迁移
kubectl get pods -n payment -o wide
```

- [ ] Pod 自动迁移到其他节点
- [ ] 服务无中断

### 3. Redis 故障测试

```bash
# 停止 Redis
kubectl scale deployment redis --replicas=0 -n payment

# 发送支付请求
curl -X POST https://payment.example.com/api/payment/create \
  -H "Content-Type: application/json" \
  -d '{"businessNo":"TEST003","amount":100,"paymentChannel":"wechat"}'
```

- [ ] 数据库唯一索引兜底生效
- [ ] 没有重复支付

### 4. Seata 故障测试

```bash
# 停止 Seata
kubectl scale statefulset seata --replicas=0 -n payment

# 发送支付请求
curl -X POST https://payment.example.com/api/payment/create \
  -H "Content-Type: application/json" \
  -d '{"businessNo":"TEST004","amount":100,"paymentChannel":"wechat"}'
```

- [ ] 事务回滚正常
- [ ] 数据一致性保证

## 生产环境准备

### 1. 容量规划

- [ ] 根据压测结果确定副本数
- [ ] 资源限制（CPU/内存）已配置
- [ ] 存储（PVC）容量充足

### 2. 备份策略

- [ ] 数据库定时备份
- [ ] Redis AOF 持久化已启用
- [ ] 配置文件版本控制

### 3. 应急预案

- [ ] 支付异常处理流程
- [ ] 对账差异处理流程
- [ ] 数据一致性校验流程
- [ ] 紧急回滚方案

### 4. 监控告警

- [ ] 告警接收人配置正确
- [ ] 告警阈值配置合理
- [ ] 告警通知渠道畅通
- [ ] 值班安排已确定

## 上线前最终检查

- [ ] 所有检查项已通过
- [ ] 测试环境验证通过
- [ ] 性能测试达到预期
- [ ] 安全检查无问题
- [ ] 监控告警已配置
- [ ] 应急预案已制定
- [ ] 团队培训已完成
- [ ] 上线方案已评审
- [ ] 回滚方案已准备
- [ ] 业务方已确认

## 签字确认

| 角色 | 姓名 | 签字 | 日期 |
|-----|------|------|------|
| 开发负责人 | | | |
| 测试负责人 | | | |
| 运维负责人 | | | |
| 业务负责人 | | | |
| 技术负责人 | | | |

---

**注意**: 本检查清单应贯穿整个部署流程，每完成一项就勾选一项，确保不遗漏任何关键步骤。
