# Spring Cloud Alibaba - 生产级部署示例集合

> 基于 Spring Cloud Alibaba 的完整微服务系统 Kubernetes 部署方案集合

## 📚 项目简介

本项目提供了一套完整的、生产级的 Spring Cloud Alibaba 微服务系统部署示例，涵盖从基础电商系统到复杂综合项目的多种场景。所有示例均基于 **Kubernetes** 容器编排，配备完整的 **监控告警**、**CI/CD 流水线** 和 **运维文档**。

### ✨ 核心特性

- ✅ **开箱即用** - 完整的 K8s 配置文件，可直接部署
- ✅ **生产级质量** - 高可用、自动扩缩容、监控告警、日志聚合
- ✅ **完整文档** - 每个项目都有详细的部署文档、检查清单、故障排查指南
- ✅ **自动化** - 一键部署脚本、GitLab CI/CD 流水线
- ✅ **最佳实践** - 遵循 Spring Cloud Alibaba 和 Kubernetes 最佳实践
- ✅ **真实场景** - 基于真实业务场景的设计和优化

## 🎯 适用场景

| 场景 | 推荐项目 | 特点 |
|-----|---------|------|
| **学习微服务** | Ecommerce | 标准微服务架构，适合入门学习 |
| **高并发场景** | Flash Sale | 秒杀系统，支持 10,000+ QPS |
| **支付结算** | Payment | 分布式事务、幂等性、对账 |
| **多租户 SaaS** | User Center | SSO、RBAC、数据隔离 |
| **完整生态** | Comprehensive | 整合所有服务的大型微服务系统 |

## 📦 部署示例清单

### 1️⃣ 电商微服务系统 (Ecommerce)

**难度**: ⭐⭐ (适合新手)
**规模**: 4 个业务服务 + 3 个基础设施组件

**核心服务**:
- Gateway (API 网关)
- Order Service (订单服务)
- User Service (用户服务)
- Payment Service (支付服务)

**基础设施**:
- Nacos 集群 (3 副本)
- MySQL 主从复制 (3 副本)
- Redis 缓存 (1 副本)

**亮点**:
- 标准微服务架构，代码简洁易懂
- HPA 自动扩缩容 (3-10 副本)
- 完整的监控告警 (15+ 规则)
- 适合作为学习和参考项目

**快速开始**:
```bash
cd ecommerce
./deploy.sh all
```

**详细信息**: [ecommerce/README.md](./ecommerce/README.md)

---

### 2️⃣ 秒杀系统 (Flash Sale)

**难度**: ⭐⭐⭐⭐ (进阶)
**规模**: 3 个业务服务 + 高并发优化组件

**核心服务**:
- Flash Order Service (秒杀订单，5-20 副本快速扩容)
- Inventory Service (库存服务)
- Gateway (限流网关)

**高并发优化**:
- **Redis Cluster** (3 副本) + Lua 脚本原子性扣减库存
- **RocketMQ** (2 副本) 异步订单处理
- **Sentinel** 限流熔断
- **快速扩容** 15 秒内从 5 副本扩容到 20 副本

**性能指标**:
- QPS: 10,000+
- P99 延迟: < 500ms
- 错误率: < 1%

**快速开始**:
```bash
cd flash-sale
./deploy.sh all
```

**详细信息**: [flash-sale/README.md](./flash-sale/README.md)

---

### 3️⃣ 支付系统 (Payment)

**难度**: ⭐⭐⭐ (中级)
**规模**: 3 个业务服务 + 分布式事务组件

**核心服务**:
- Payment Service (支付核心)
- Callback Service (支付回调)
- Reconciliation Service (定时对账)

**核心特性**:
- **幂等性保证**: Redis (5 分钟窗口) + 数据库唯一索引
- **分布式事务**: Seata AT 模式保证支付与订单状态同步
- **支付渠道**: 微信支付、支付宝
- **对账服务**: 每 30 分钟自动对账，资金安全

**监控指标**:
- 支付成功率 > 99%
- 支付响应时间 P99 < 3s
- 对账差异 = 0

**快速开始**:
```bash
cd payment
./deploy.sh all
```

**详细信息**: [payment/README.md](./payment/README.md)

---

### 4️⃣ 用户中心系统 (User Center)

**难度**: ⭐⭐⭐⭐ (进阶)
**规模**: 5 个业务服务 + 安全认证组件

**核心服务**:
- User Service (用户管理)
- Auth Service (认证服务，SSO)
- Permission Service (RBAC 权限)
- Tenant Service (多租户管理)
- Profile Service (用户画像)

**核心特性**:
- **SSO 单点登录**: JWT Token + Redis 黑名单
- **多租户隔离**: 基于 tenant_id 的数据隔离
- **RBAC 权限**: 用户-角色-权限三级模型
- **OAuth2 集成**: 支持 GitHub、微信、钉钉登录

**安全加固**:
- 登录失败 5 次锁定 30 分钟
- JWT Token 自动刷新
- CORS 配置 + 速率限制

**快速开始**:
```bash
cd user-center
./deploy.sh all
```

**详细信息**: [user-center/README.md](./user-center/README.md)

---

### 5️⃣ 综合项目 (Comprehensive)

**难度**: ⭐⭐⭐⭐⭐ (架构师级)
**规模**: 12 个业务服务 + 完整的基础设施 + 可观测性

**核心服务** (整合所有项目):
- Gateway、Order、User、Payment
- Flash Order、Inventory、Callback
- Auth、Permission、Tenant、Profile
- Reconciliation (CronJob)

**基础设施**:
- Nacos Cluster (3 副本)
- MySQL Master-Slave (1 主 2 从)
- Redis Cluster (3 主 3 从)
- RocketMQ (2 副本)
- Seata TC (3 副本)
- Jaeger (链路追踪)

**可观测性**:
- **监控**: Prometheus + 50+ 告警规则 + Grafana 综合大屏
- **日志**: Elasticsearch (3 副本) + Kibana + Filebeat
- **追踪**: Jaeger 分布式链路追踪
- **告警**: AlertManager (邮件/钉钉/Slack)

**特性**:
- 完整的微服务生态系统
- 多租户 + 分布式事务 + 高并发
- 金丝雀发布 + 一键回滚
- 完整的 CI/CD 流水线

**快速开始**:
```bash
cd comprehensive
./deploy.sh all
```

**详细信息**: [comprehensive/README.md](./comprehensive/README.md)

---

## 🚀 统一部署流程

所有项目都遵循相同的部署流程，便于学习和操作：

### 前置要求

```bash
# 1. 检查 Kubernetes 连接
kubectl cluster-info

# 2. 检查 kubectl 版本 (>= 1.24)
kubectl version --client

# 3. 检查可用资源
kubectl top nodes
```

### 一键部署

```bash
# 进入目标项目目录
cd <project-name>

# 查看部署选项
./deploy.sh help

# 完整部署 (基础设施 + 业务服务 + 监控)
./deploy.sh all

# 分步部署
./deploy.sh infra       # 仅基础设施
./deploy.sh services    # 仅业务服务
./deploy.sh monitoring  # 仅监控

# 验证部署
./deploy.sh verify

# 清理资源
./deploy.sh cleanup
```

### 部署前配置 (重要!)

⚠️ **生产环境部署前，必须完成以下配置**:

```bash
# 1. 更新镜像地址
sed -i 's|your-registry|your-actual-registry.com|g' k8s/*/deployment.yaml

# 2. 修改默认密码 (参考各项目的 CHECKLIST.md)
kubectl create secret generic mysql-secret \
  --from-literal=root-password=your_strong_password \
  --namespace=<project-name>

# 3. 配置 Ingress 域名
edit k8s/ingress/ingress.yaml

# 4. 初始化数据库 (参考各项目的 DEPLOYMENT.md)
./deploy.sh init-db
```

详细配置清单请查看各项目的 `CHECKLIST.md` 文件。

## 📊 对比分析

| 特性 | Ecommerce | Flash Sale | Payment | User Center | Comprehensive |
|-----|-----------|------------|---------|-------------|---------------|
| **服务数量** | 4 | 3 | 3 | 5 | 12 |
| **代码复杂度** | ⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| **QPS 目标** | 1,000 | 10,000 | 500 | 1,000 | 10,000 |
| **HPA 副本** | 3-10 | 5-20 | 3-10 | 3-10 | 3-20 |
| **分布式事务** | ❌ | ❌ | ✅ Seata | ❌ | ✅ Seata |
| **多租户** | ❌ | ❌ | ❌ | ✅ | ✅ |
| **SSO** | ❌ | ❌ | ❌ | ✅ | ✅ |
| **监控规则** | 15+ | 20+ | 10+ | 28+ | 50+ |
| **文档完整度** | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |

## 📖 学习路径推荐

### 路径 A: 新人入门 (适合没有微服务经验的开发者)

1. **Ecommerce** → 学习标准微服务架构
2. **Payment** → 学习分布式事务和幂等性
3. **User Center** → 学习 SSO 和权限管理
4. **Comprehensive** → 理解完整的微服务生态

### 路径 B: 架构师速通 (适合有经验，想快速提升架构能力)

1. **Ecommerce** → 快速了解项目结构
2. **Flash Sale** → 学习高并发优化技巧
3. **Comprehensive** → 深入理解大规模微服务架构
4. ** Payment + User Center** → 补充分布式事务和多租户知识

## 🛠️ 技术栈

### 核心框架
- **Spring Cloud Alibaba** 2022.x
- **Spring Boot** 3.x
- **Nacos** 2.x (服务发现 + 配置中心)
- **Sentinel** 1.x (流量控制)
- **Seata** 1.x (分布式事务)
- **RocketMQ** 5.x (消息队列)

### 基础设施
- **Kubernetes** 1.24+ (容器编排)
- **Docker** 20+ (容器化)
- **MySQL** 8.0+ (关系型数据库)
- **Redis** 7.0+ (缓存)
- **Nginx** (Ingress Controller)

### 可观测性
- **Prometheus** (监控)
- **Grafana** (可视化)
- **AlertManager** (告警)
- **Elasticsearch** (日志存储)
- **Kibana** (日志查询)
- **Jaeger** (链路追踪)

### CI/CD
- **GitLab CI** (持续集成/部署)
- **Helm** (可选，用于复杂部署)
- **ArgoCD** (可选，用于 GitOps)

## 📋 部署检查清单

在部署任何项目前，请确保完成以下检查：

### 环境检查
- [ ] Kubernetes 集群已安装 (v1.24+)
- [ ] kubectl 已配置并可访问集群
- [ ] 镜像仓库可访问
- [ ] 节点资源充足 (CPU >= 8 核, 内存 >= 16GB)
- [ ] StorageClass 已创建 (例如: fast-ssd)
- [ ] Ingress Controller 已安装

### 配置检查
- [ ] 镜像地址已更新
- [ ] 默认密码已修改
- [ ] Ingress 域名已配置
- [ ] 监控告警通知已配置
- [ ] TLS 证书已准备 (生产环境)

### 部署后验证
- [ ] 所有 Pod 正常运行
- [ ] Service Endpoints 正常
- [ ] HPA 工作正常
- [ ] Ingress 可访问
- [ ] 监控指标正常
- [ ] 日志正常输出

详细检查清单请查看各项目的 `CHECKLIST.md` 文件。

## 🔧 故障排查

### 常见问题

**Q: Pod 无法启动?**
```bash
kubectl describe pod <pod-name> -n <namespace>
kubectl logs <pod-name> -n <namespace>
```

**Q: 服务无法访问?**
```bash
kubectl get endpoints -n <namespace>
kubectl get ingress -n <namespace>
```

**Q: HPA 不工作?**
```bash
kubectl get hpa -n <namespace>
kubectl top pods -n <namespace>
```

详细故障排查指南请查看各项目的 `DEPLOYMENT.md` 文件。

## 📚 参考文档

### 官方文档
- [Spring Cloud Alibaba 官方文档](https://sca.aliyun.com)
- [Spring Cloud Alibaba GitHub](https://github.com/alibaba/spring-cloud-alibaba)
- [Kubernetes 官方文档](https://kubernetes.io/docs/)
- [Nacos 官方文档](https://nacos.io/docs/)
- [Seata 官方文档](https://seata.io/)

### 项目文档
- [详细部署指南](./ecommerce/DEPLOYMENT.md)
- [部署前检查清单](./ecommerce/CHECKLIST.md)
- [架构设计文档](./comprehensive/ARCHITECTURE.md)

## 🤝 贡献指南

欢迎提交 Issue 和 Pull Request！

### 贡献方式
1. 报告 Bug
2. 提出改进建议
3. 提交代码改进
4. 完善文档

## 📄 许可证

本项目采用 MIT 许可证。

## 📞 联系方式

如有问题，请提交 Issue 或联系维护者。

---

## 🎓 使用建议

### 学习建议

1. **循序渐进**: 按照学习路径推荐，从简单的 Ecommerce 开始
2. **动手实践**: 每个项目都要亲自部署一遍，理解每个组件的作用
3. **对比学习**: 对比不同项目的架构设计，理解不同场景下的技术选型
4. **深入源码**: 结合官方文档，深入理解 Spring Cloud Alibaba 的原理

### 生产环境部署建议

1. **充分测试**: 在测试环境充分验证后再部署到生产环境
2. **灰度发布**: 使用金丝雀发布或蓝绿部署，降低风险
3. **监控告警**: 配置完善的监控告警，及时发现问题
4. **备份恢复**: 准备完善的备份和恢复方案
5. **应急预案**: 制定详细的故障应急预案

---

**注意**: 本项目仅用于学习和参考，部署到生产环境前请根据实际需求进行调整和测试。

**祝您学习愉快！** 🎉
