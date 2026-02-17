# 快速开始指南

## 一键部署

```bash
cd deployment-examples/comprehensive
chmod +x deploy.sh
./deploy.sh all
```

## 验证部署

```bash
# 查看所有Pod
kubectl get pods -n springcloud-alibaba

# 查看服务
kubectl get svc -n springcloud-alibaba

# 查看HPA
kubectl get hpa -n springcloud-alibaba
```

## 访问控制台

### Nacos 控制台

```bash
kubectl port-forward -n springcloud-alibaba svc/nacos-ui 8848:8848
# 浏览器访问: http://localhost:8848/nacos
# 默认账号: nacos / nacos
```

### Grafana

```bash
kubectl port-forward -n springcloud-alibaba svc/grafana 3000:80
# 浏览器访问: http://localhost:3000
# 默认账号: admin / admin
```

### Kibana

```bash
kubectl port-forward -n springcloud-alibaba svc/kibana-service 5601:5601
# 浏览器访问: http://localhost:5601
```

### Jaeger

```bash
kubectl port-forward -n springcloud-alibaba svc/jaeger-query 16686:16686
# 浏览器访问: http://localhost:16686
```

## 核心服务

| 服务 | 端口 | 说明 |
|------|------|------|
| Gateway | 8080 | API网关 |
| Order Service | 8081 | 订单服务 |
| User Service | 8082 | 用户服务 |
| Flash Order | 8083 | 秒杀服务 |
| Inventory | 8084 | 库存服务 |
| Payment | 8085 | 支付服务 |

## 监控指标

- QPS: 实时请求量
- 响应时间: P95 < 1s
- 错误率: < 1%
- 可用性: 99.99%

## 告警配置

- 严重告警: 邮件 + 钉钉 + Slack
- 警告告警: 邮件
- 恢复通知: 自动发送

## 常用命令

```bash
# 查看日志
kubectl logs -f -n springcloud-alibaba deployment/gateway

# 扩容服务
kubectl scale deployment/order-service --replicas=5 -n springcloud-alibaba

# 进入Pod
kubectl exec -it -n springcloud-alibaba pod/gateway-xxx -- /bin/bash

# 查看事件
kubectl get events -n springcloud-alibaba --sort-by='.lastTimestamp'
```

## 故障排查

1. **Pod无法启动**: `kubectl describe pod <pod-name> -n springcloud-alibaba`
2. **服务无法访问**: `kubectl get svc -n springcloud-alibaba`
3. **HPA不扩容**: `kubectl describe hpa <hpa-name> -n springcloud-alibaba`

## 更多文档

- [详细部署文档](DEPLOYMENT.md)
- [架构设计文档](ARCHITECTURE.md)
- [检查清单](CHECKLIST.md)
