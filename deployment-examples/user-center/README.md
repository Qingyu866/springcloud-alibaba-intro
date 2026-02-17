# 用户中心系统 - Kubernetes 完整部署方案

> 基于 Spring Cloud Alibaba 的生产级用户中心系统 Kubernetes 部署方案

## 项目简介

本项目提供了完整的用户中心系统 Kubernetes 部署方案，包括：

- ✅ **SSO 单点登录** - JWT Token + Redis 黑名单机制
- ✅ **多租户管理** - 基于 tenant_id 的数据隔离
- ✅ **RBAC 权限控制** - 用户-角色-权限模型
- ✅ **用户画像** - 标签系统、用户分群
- ✅ **OAuth2 集成** - 支持 GitHub、微信、钉钉登录
- ✅ **高可用架构** - 所有服务 3-10 副本 HPA
- ✅ **安全加固** - 密码加密、Token 刷新、防暴力破解
- ✅ **完整监控** - Prometheus + Grafana Dashboard

## 核心特性

### SSO 单点登录

```
┌─────────────┐      登录      ┌─────────────┐
│   用户      │ ──────────────> │ 认证服务    │
│             │ <────────────── │ (Auth)      │
└─────────────┘    JWT Token   └──────┬──────┘
      │                                │
      │ 访问应用                        │ Token 校验
      v                                v
┌─────────────┐      验证 Token  ┌──────┴──────┐
│ 业务应用    │ <──────────────  │  Redis      │
│ (多个)      │                 │  黑名单     │
└─────────────┘                  └─────────────┘
```

**特性**：
- JWT Token 认证，无状态
- Redis 黑名单机制，支持 Token 吊销
- Session 缓存，提升验证性能
- 跨域 Cookie 支持，统一登录入口

### 多租户数据隔离

```
┌─────────────────────────────────────────┐
│          应用层 (Tenant Interceptor)    │
│  自动注入 tenant_id 到所有 SQL 请求      │
└────────────────┬────────────────────────┘
                 │
┌────────────────▼────────────────────────┐
│         数据隔离层                       │
│  Strategy 1: DATABASE  (独立数据库)     │
│  Strategy 2: SCHEMA    (独立 Schema)    │
│  Strategy 3: COLUMN    (tenant_id 列)   │
└────────────────┬────────────────────────┘
                 │
┌────────────────▼────────────────────────┐
│         MySQL 数据库                     │
│  tenant_1_db  |  tenant_2_db  |  ...    │
└──────────────────────────────────────────┘
```

**隔离策略**：
- **DATABASE**: 每个租户独立数据库 (最高隔离)
- **SCHEMA**: 每个租户独立 Schema (推荐)
- **COLUMN**: 共享数据库，tenant_id 列隔离 (低成本)

### RBAC 权限模型

```
用户 (User)
  │
  ├─ 用户角色 (User-Role)  多对多
  │
  ├─ 角色 (Role)
  │   ├─ 超级管理员 (SUPER_ADMIN)
  │   ├─ 管理员 (ADMIN)
  │   └─ 普通用户 (USER)
  │
  └─ 角色权限 (Role-Permission)  多对多
      │
      └─ 权限 (Permission)
          ├─ 资源类型: API / Menu / Button
          └─ 操作: READ / WRITE / DELETE
```

**特性**：
- 用户-角色-权限 三级模型
- 支持数据权限 (租户/组织/自定义)
- 权限缓存 (Redis, 5分钟 TTL)
- 支持超级管理员角色

## 架构概览

```
                    ┌─────────────┐
                    │   Ingress   │
                    │  (SSO 入口) │
                    └──────┬──────┘
                           │
            ┌──────────────┼──────────────┐
            │              │              │
    ┌───────▼────┐  ┌───▼────┐   ┌───▼─────┐
    │   Auth      │  │  User  │   │ Permission│
    │  Service    │  │Service │   │ Service  │
    │ (SSO/OAuth2)│  │ (HPA)  │   │  (HPA)   │
    └───────┬────┘  └───┬────┘   └───┬─────┘
            │           │            │
    ┌───────┴───────┬──┴────────────┘
    │               │
┌───▼────┐   ┌─────▼─────┐   ┌──────┐
│ Tenant │   │  Profile  │   │ MySQL│
│Service │   │  Service  │   │ Redis │
│ (HPA)  │   │   (HPA)   │   │      │
└────────┘   └───────────┘   └───────┘
```

## 快速开始

### 前置要求

- Kubernetes 集群 (v1.24+)
- kubectl 已配置
- 镜像仓库访问权限
- StorageClass `fast-ssd` 已创建
- Ingress Controller 已安装
- cert-manager (用于 TLS 证书)

### 一键部署

```bash
# 克隆项目
git clone <repository-url>
cd deployment-examples/user-center

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
kubectl apply -f k8s/redis/

# 3. 部署业务服务
kubectl apply -f k8s/user-service/
kubectl apply -f k8s/auth-service/
kubectl apply -f k8s/permission-service/
kubectl apply -f k8s/tenant-service/
kubectl apply -f k8s/profile-service/

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
  k8s/user-service/deployment.yaml \
  k8s/auth-service/deployment.yaml \
  k8s/permission-service/deployment.yaml \
  k8s/tenant-service/deployment.yaml \
  k8s/profile-service/deployment.yaml
```

### 2. 修改默认密码

**强烈建议修改所有默认密码！**

```bash
# 更新 MySQL 密码
kubectl create secret generic mysql-secret \
  --from-literal=root-password=your_strong_password \
  --from-literal=user-password=your_user_password \
  --namespace=user-center \
  --dry-run=client -o yaml | kubectl apply -f -

# 更新 Redis 密码 (在 deployment.yaml 中修改)
kubectl set env deployment/redis \
  REDIS_PASSWORD=your_redis_password \
  -n user-center

# 更新 JWT Secret
kubectl create secret generic jwt-secret \
  --from-literal=secret=your_jwt_secret_key_min_32_chars \
  --namespace=user-center \
  --dry-run=client -o yaml | kubectl apply -f -
```

### 3. 配置 OAuth2 提供商

编辑 `k8s/auth-service/deployment.yaml`，配置 OAuth2 应用：

```yaml
env:
  - name: GITHUB_CLIENT_ID
    value: "your_github_client_id"
  - name: GITHUB_CLIENT_SECRET
    value: "your_github_client_secret"
  - name: WECHAT_APP_ID
    value: "your_wechat_app_id"
  - name: WECHAT_APP_SECRET
    value: "your_wechat_app_secret"
```

### 4. 初始化数据库

```bash
# 连接到 MySQL
kubectl exec -it mysql-0 -n user-center -- mysql -uroot -p

# 数据库会自动初始化 (通过 init.sql)
# 如需手动执行，查看 k8s/mysql/statefulset.yaml 中的 init.sql
```

详细配置说明请查看: [CHECKLIST.md](./CHECKLIST.md)

## 文件结构

```
user-center/
├── k8s/                          # Kubernetes 配置
│   ├── 00-namespace.yaml         # 命名空间
│   ├── mysql/                    # MySQL (StatefulSet)
│   ├── redis/                    # Redis (Deployment)
│   ├── user-service/             # 用户服务 + HPA
│   ├── auth-service/             # 认证服务 + SSO + HPA
│   ├── permission-service/       # 权限服务 + HPA
│   ├── tenant-service/           # 租户服务 + HPA
│   ├── profile-service/          # 用户画像服务 + HPA
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
| MySQL | StatefulSet | 1 | 20Gi | 用户数据存储 |
| Redis | Deployment | 1 | - | Session/Token 缓存 |

### 业务服务

| 服务 | 端口 | HPA | 说明 |
|-----|------|-----|------|
| User Service | 8084/8085 | 3-10 | 用户管理 |
| Auth Service | 8086/8087 | 3-10 | 认证/SSO/OAuth2 |
| Permission Service | 8088/8089 | 3-10 | RBAC 权限 |
| Tenant Service | 8090/8091 | 3-10 | 多租户管理 |
| Profile Service | 8092/8093 | 3-10 | 用户画像/分群 |

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

- **登录成功率** - 总登录请求 / 成功登录
- **Token 刷新失败率** - Token 刷新失败 / 总刷新请求
- **权限校验 P99 延迟** - 权限校验响应时间
- **暴力破解检测** - 失败登录次数 (按 IP)
- **租户数据访问量** - 按租户统计的请求量
- **用户标签更新量** - 用户画像标签更新速率

### 告警规则

预配置了以下告警规则：

#### 安全告警 (Critical)
- 暴力破解检测 - 5次失败登录
- JWT 校验失败率过高 - 可能存在攻击
- 租户隔离失效 - 数据泄露风险

#### 服务告警 (Critical)
- 认证服务下线 - 单点登录不可用
- MySQL 连接池耗尽
- Redis 连接失败率过高

#### 性能告警 (Warning)
- 登录成功率 < 99%
- Token 刷新失败率 > 5%
- 权限校验 P99 延迟 > 500ms
- 服务错误率 > 5%

#### 资源告警 (Warning)
- Pod 频繁重启
- CPU/内存使用率 > 90%

详细告警配置: [monitoring/prometheus/prometheus-rule.yaml](./monitoring/prometheus/prometheus-rule.yaml)

### Grafana Dashboard

导入 Dashboard JSON 查看监控大屏：

```bash
# 访问 Grafana
kubectl port-forward -n monitoring svc/grafana 3000:80

# 导入 Dashboard
# 文件: monitoring/grafana/dashboard.json
```

## CI/CD 流水线

GitLab CI 流水线包含以下阶段：

1. **Build** - Maven 编译
2. **Test** - 单元测试 + 集成测试 + 覆盖率报告
3. **Package** - 构建并推送 Docker 镜像
4. **Deploy** - 自动部署到 K8s (生产环境需手动审批)

### 配置步骤

1. 在 GitLab 中配置 CI/CD 变量：
   - `DOCKER_REGISTRY`: 镜像仓库地址
   - `REGISTRY_USER`: 镜像仓库用户名
   - `REGISTRY_PASSWORD`: 镜像仓库密码
   - `KUBECONFIG_DEV`: 开发环境 K8s 配置 (Base64)
   - `KUBECONFIG_PROD`: 生产环境 K8s 配置 (Base64)

2. 推送代码自动触发流水线

3. 生产环境部署需要手动批准

详细配置: [cicd/.gitlab-ci.yml](./cicd/.gitlab-ci.yml)

## 验证部署

### 检查所有服务状态

```bash
# 查看 Pod 状态
kubectl get pods -n user-center -o wide

# 查看 Service 状态
kubectl get svc -n user-center

# 查看 HPA 状态
kubectl get hpa -n user-center

# 查看 Ingress 状态
kubectl get ingress -n user-center
```

### 访问服务

```bash
# 本地调试 - 用户服务
kubectl port-forward -n user-center svc/user-service 8084:8084
# 访问: http://localhost:8084/user/actuator/health

# 本地调试 - 认证服务 (SSO)
kubectl port-forward -n user-center svc/auth-service 8086:8086
# 访问: http://localhost:8086/auth/actuator/health

# 本地调试 - MySQL
kubectl port-forward -n user-center mysql-0 3306:3306
# 连接: mysql -h127.0.0.1 -P3306 -uroot -p
```

### SSO 登录测试

```bash
# 1. 获取 Token
curl -X POST https://sso.example.com/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}'

# 响应示例
{
  "code": 200,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "refresh_token_here",
    "expiresIn": 7200
  }
}

# 2. 使用 Token 访问业务接口
curl -X GET https://api.user-center.example.com/user/v1/users/1 \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."

# 3. 刷新 Token
curl -X POST https://sso.example.com/auth/token/refresh \
  -H "Content-Type: application/json" \
  -d '{"refreshToken":"refresh_token_here"}'

# 4. 登出 (Token 加入黑名单)
curl -X POST https://sso.example.com/auth/logout \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

### 多租户测试

```bash
# 添加租户标识头
curl -X GET https://api.user-center.example.com/user/v1/users \
  -H "Authorization: Bearer token_here" \
  -H "X-Tenant-ID: 1"  # 租户ID

# 响应仅返回该租户的用户数据
```

### 负载测试 HPA

```bash
# 生成负载
kubectl run -it --rm load-generator --image=busybox /bin/sh
# 在容器中执行
while true; do wget -q -O- http://user-service.user-center.svc.cluster.local:8084/user/actuator/health; done

# 观察 HPA 自动扩容
kubectl get hpa -n user-center -w
kubectl get pods -n user-center -w
```

## 故障排查

### Pod 无法启动

```bash
# 查看 Pod 详情
kubectl describe pod <pod-name> -n user-center

# 查看日志
kubectl logs <pod-name> -n user-center

# 查看之前容器日志 (如果 Pod 重启)
kubectl logs <pod-name> -n user-center --previous
```

### 服务无法访问

```bash
# 检查 Endpoints
kubectl get endpoints -n user-center

# 测试服务连通性
kubectl run -it --rm debug --image=busybox --restart=Never -- \
  sh -c "nc -zv user-service.user-center.svc.cluster.local 8084"
```

### HPA 不工作

```bash
# 检查 Metrics Server
kubectl get apiservice v1beta1.metrics.k8s.io

# 查看资源使用
kubectl top pods -n user-center

# 查看 HPA 事件
kubectl describe hpa <hpa-name> -n user-center
```

### SSO 登录失败

```bash
# 检查 Redis 连接
kubectl exec -it redis-0 -n user-center -- redis-cli -a redis_password ping

# 查看 Token 黑名单
kubectl exec -it redis-0 -n user-center -- redis-cli -a redis_password
> KEYS auth:blacklist:*

# 检查 JWT Secret 配置
kubectl get secret jwt-secret -n user-center -o yaml
```

更多故障排查指南: [DEPLOYMENT.md](./DEPLOYMENT.md)

## 安全加固

### 密码策略

默认密码策略 (可配置)：
- 最小长度: 8 位
- 必须包含大写字母
- 必须包含数字
- 登录失败 5 次锁定 30 分钟

### JWT Token 管理

- **Access Token**: 2 小时过期
- **Refresh Token**: 7 天过期
- **黑名单机制**: 登出后 Token 立即失效
- **签名算法**: HS256 (HMAC-SHA256)

### OAuth2 安全

- 使用 HTTPS 回调地址
- State 参数防止 CSRF 攻击
- Token 仅用于一次性授权

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
kubectl edit hpa user-service-hpa -n user-center

# 调整扩缩容策略
behavior:
  scaleUp:
    stabilizationWindowSeconds: 0
    policies:
    - type: Percent
      value: 100
      periodSeconds: 30
```

### 数据库优化

```sql
-- 添加索引
CREATE INDEX idx_tenant_username ON user(tenant_id, username);
CREATE INDEX idx_user_status ON user(status);
CREATE INDEX idx_login_created ON login_log(created_at);

-- 分区表 (大表)
ALTER TABLE login_log PARTITION BY RANGE (YEAR(created_at)) (
  PARTITION p2023 VALUES LESS THAN (2024),
  PARTITION p2024 VALUES LESS THAN (2025),
  PARTITION pmax VALUES LESS THAN MAXVALUE
);
```

### Redis 缓存优化

```bash
# 调整内存策略
redis-cli CONFIG SET maxmemory-policy allkeys-lru

# 监控缓存命中率
redis-cli INFO stats | grep keyspace
```

## 备份与恢复

### MySQL 备份

```bash
# 创建备份
kubectl exec mysql-0 -n user-center -- \
  mysqldump -uroot -p${MYSQL_PASSWORD} --all-databases > backup.sql

# 恢复备份
cat backup.sql | kubectl exec -i mysql-0 -n user-center -- \
  mysql -uroot -p${MYSQL_PASSWORD}
```

### Redis 备份

```bash
# 创建 RDB 快照
kubectl exec redis-0 -n user-center -- redis-cli -a ${REDIS_PASSWORD} BGSAVE

# 备份 RDB 文件
kubectl cp user-center/redis-0:/data/dump.rdb ./dump.rdb
```

### 配置备份

```bash
# 导出所有配置
kubectl get all,configmap,secret,pvc -n user-center -o yaml > user-center-backup.yaml
```

## 常见问题

### Q: 如何修改租户隔离策略？

A: 编辑 `k8s/tenant-service/deployment.yaml` 中的 ConfigMap：

```yaml
tenant:
  isolation-strategy: schema  # database/schema/column
```

### Q: 如何添加新的 OAuth2 提供商？

A: 在 `k8s/auth-service/deployment.yaml` 中添加新的提供商配置，并在代码中实现对应的 OAuth2 客户端。

### Q: 用户画像服务如何计算分群？

A: 分群计算默认为异步模式，每小时自动刷新。可以通过 API 手动触发：

```bash
curl -X POST https://api.user-center.example.com/profile/v1/segments/{id}/refresh \
  -H "Authorization: Bearer token"
```

### Q: 如何实现跨应用 SSO？

A: 确保所有应用使用相同的：
- JWT Secret
- Redis 实例 (共享黑名单)
- Cookie Domain (`.example.com`)

## 贡献指南

欢迎提交 Issue 和 Pull Request！

## 许可证

本项目采用 MIT 许可证。

## 相关文档

- [详细部署文档](./DEPLOYMENT.md)
- [部署前检查清单](./CHECKLIST.md)
- [Spring Cloud Alibaba 官方文档](https://spring-cloud-alibaba-group.github.io/)
- [Kubernetes 官方文档](https://kubernetes.io/docs/)

## 联系方式

如有问题，请提交 Issue 或联系维护者。

---

**注意**: 本方案仅用于生产环境参考，部署前请根据实际需求进行调整和测试。
