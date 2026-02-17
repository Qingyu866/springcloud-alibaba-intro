# 支付系统部署快速参考

## 快速命令

### 一键部署
```bash
cd /Users/qingyu/springcloud-alibaba-intro/deployment-examples/payment
./deploy.sh all
```

### 分步部署
```bash
./deploy.sh infra      # 基础设施
./deploy.sh services   # 业务服务
./deploy.sh monitoring # 监控
```

### 验证部署
```bash
./deploy.sh verify
```

### 查看日志
```bash
# 支付服务
kubectl logs -f payment-service-0 -n payment

# 回调服务
kubectl logs -f callback-service-0 -n payment

# 对账服务
kubectl logs -f reconciliation-service-0 -n payment
```

### 清理资源
```bash
./deploy.sh cleanup
```

## 核心配置

### 支付密钥配置
```bash
kubectl create secret generic payment-service-secret \
  --from-literal=mysql-password=your_password \
  --from-literal=wechat-app-id=wx1234567890abcdef \
  --from-literal=wechat-mch-id=1234567890 \
  --from-literal=wechat-api-key=your_key \
  --from-literal=alipay-app-id=2021001234567890 \
  --from-literal=alipay-private-key="your_key" \
  --from-literal=alipay-public-key="your_key" \
  --namespace=payment
```

### 数据库初始化
```bash
kubectl exec -it mysql-0 -n payment -- mysql -uroot -p
```
然后执行 `./deploy.sh init-db` 中的 SQL。

### Ingress 域名配置
```bash
sed -i 's|payment.example.com|your-domain.com|g' \
  k8s/callback-service/ingress.yaml \
  k8s/ingress/ingress.yaml
```

## 常用查询

### Pod 状态
```bash
kubectl get pods -n payment
kubectl describe pod <pod-name> -n payment
```

### 服务状态
```bash
kubectl get svc -n payment
kubectl get hpa -n payment
```

### 资源使用
```bash
kubectl top pods -n payment
kubectl top nodes
```

### 进入 Pod
```bash
kubectl exec -it <pod-name> -n payment -- /bin/sh
```

### 端口转发（本地调试）
```bash
kubectl port-forward svc/payment-service 8086:8086 -n payment
kubectl port-forward svc/callback-service 8088:8088 -n payment
```

## 监控

### Prometheus 查询
```bash
# 支付成功率
rate(payment_requests_total{status="success"}[5m]) / rate(payment_requests_total[5m])

# 支付 QPS
sum(rate(payment_requests_total[1m]))

# 支付延迟 P99
histogram_quantile(0.99, rate(payment_latency_seconds_bucket[5m]))

# 对账差异
reconciliation_difference_count
```

### Grafana Dashboard
导入 `monitoring/grafana/dashboard.json`

## 故障排查

### Pod 无法启动
```bash
kubectl logs <pod-name> -n payment
kubectl logs <pod-name> -n payment --previous
kubectl describe pod <pod-name> -n payment
```

### Redis 连接失败
```bash
kubectl exec -it redis-0 -n payment -- redis-cli ping
kubectl exec -it redis-0 -n payment -- redis-cli KEYS "payment:idempotent:*"
```

### MySQL 连接失败
```bash
kubectl exec -it mysql-0 -n payment -- mysql -uroot -p -e "SELECT 1"
```

### Seata 事务失败
```bash
kubectl logs seata-0 -n payment | grep -i error
```

### HPA 不工作
```bash
kubectl get apiservice v1beta1.metrics.k8s.io
kubectl top pods -n payment
kubectl describe hpa <hpa-name> -n payment
```

## 测试

### 幂等性测试
```bash
# 第一次请求
curl -X POST https://your-domain.com/api/payment/create \
  -H "Content-Type: application/json" \
  -d '{"businessNo":"TEST001","amount":100,"paymentChannel":"wechat"}'

# 第二次请求（应该被拦截）
curl -X POST https://your-domain.com/api/payment/create \
  -H "Content-Type: application/json" \
  -d '{"businessNo":"TEST001","amount":100,"paymentChannel":"wechat"}'
```

### 健康检查
```bash
curl https://your-domain.com/actuator/health
```

### 手动触发对账
```bash
kubectl create job --from=cronjob/reconciliation-cronjob manual-reconciliation -n payment
kubectl logs -f manual-reconciliation-xxx -n payment
```

## 文档

- **README.md**: 完整文档
- **DEPLOYMENT.md**: 详细部署步骤
- **CHECKLIST.md**: 部署检查清单
- **QUICKREF.md**: 本快速参考

## 目录结构

```
payment/
├── k8s/                    # Kubernetes 配置
│   ├── mysql/             # MySQL（支付记录）
│   ├── redis/             # Redis（幂等性缓存）
│   ├── seata/             # Seata（分布式事务）
│   ├── payment-service/   # 支付核心服务（3副本+HPA）
│   ├── callback-service/  # 回调服务（3副本+HPA）
│   ├── reconciliation-service/  # 对账服务（定时任务）
│   └── ingress/           # Ingress 配置
├── monitoring/            # 监控配置
│   ├── prometheus/        # ServiceMonitor + 告警
│   └── grafana/           # Dashboard
├── cicd/                  # CI/CD 流水线
├── deploy.sh              # 部署脚本
└── *.md                   # 文档
```

## 关键特性

- ✅ **幂等性**: Redis (5分钟) + 数据库唯一索引
- ✅ **分布式事务**: Seata AT 模式
- ✅ **高可用**: HPA (3-10副本)
- ✅ **对账**: CronJob 每30分钟
- ✅ **监控**: Prometheus + Grafana
- ✅ **告警**: 10+ 告警规则

## 支持的支付渠道

- 微信支付
- 支付宝

## 端口映射

| 服务 | HTTP | Management |
|-----|------|------------|
| Payment Service | 8086 | 8087 |
| Callback Service | 8088 | 8089 |
| Reconciliation Service | 8090 | 8091 |

## 环境要求

- Kubernetes >= 1.24
- kubectl 已配置
- StorageClass `fast-ssd`
- Ingress Controller
- Prometheus Operator
- Nacos 服务

## 默认密码（请修改！）

- MySQL: `root_password`
- 所有密码都在 Secret 中，请立即修改！

## 获取帮助

- 查看 README.md
- 查看 DEPLOYMENT.md
- 执行 `./deploy.sh help`
