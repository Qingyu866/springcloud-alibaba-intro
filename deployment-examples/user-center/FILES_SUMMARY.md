# 用户中心系统 - 文件清单

## 已创建文件列表

### 根目录文档

| 文件 | 说明 | 大小 |
|-----|------|------|
| README.md | 项目主文档，包含架构、快速开始、功能介绍 | 19KB |
| DEPLOYMENT.md | 详细部署文档，包含完整的部署流程和故障排查 | 29KB |
| CHECKLIST.md | 部署前检查清单，确保所有配置正确 | 12KB |
| deploy.sh | 自动化部署脚本，支持一键部署 | 7.6KB |

### Kubernetes 配置 (k8s/)

#### 命名空间
- `k8s/00-namespace.yaml` - 命名空间定义

#### 基础设施
- `k8s/mysql/statefulset.yaml` - MySQL StatefulSet + Service + 初始化脚本
  - 单主架构
  - 包含完整的数据库初始化 SQL
  - 自动创建用户、角色、权限、租户等表
- `k8s/redis/deployment.yaml` - Redis Deployment + Service
  - Session/Token 缓存
  - 配置了内存策略和持久化

#### 业务服务
- `k8s/user-service/deployment.yaml` - 用户服务 + HPA + ConfigMap + Service
  - 用户管理、注册、登录
  - 3-10 副本自动扩缩容
- `k8s/user-service/service.yaml` - (占位，已在 deployment.yaml 中定义)
- `k8s/user-service/hpa.yaml` - (占位，已在 deployment.yaml 中定义)

- `k8s/auth-service/deployment.yaml` - 认证服务 + HPA + ConfigMap + Service
  - SSO 单点登录
  - JWT Token 管理
  - OAuth2 集成 (GitHub/微信/钉钉)
  - Token 黑名单机制
  - 3-10 副本自动扩缩容
- `k8s/auth-service/configmap.yaml` - (占位，已在 deployment.yaml 中定义)
- `k8s/auth-service/hpa.yaml` - (占位，已在 deployment.yaml 中定义)
- `k8s/auth-service/ingress.yaml` - SSO 登录入口 Ingress

- `k8s/permission-service/deployment.yaml` - 权限服务 + HPA + ConfigMap + Service
  - RBAC 权限控制
  - 用户-角色-权限模型
  - 数据权限
  - 3-10 副本自动扩缩容

- `k8s/tenant-service/deployment.yaml` - 租户服务 + HPA + ConfigMap + Service
  - 多租户管理
  - 数据隔离 (database/schema/column)
  - 租户配额管理
  - 3-10 副本自动扩缩容

- `k8s/profile-service/deployment.yaml` - 用户画像服务 + HPA + ConfigMap + Service
  - 标签系统
  - 用户分群
  - 画像分析
  - 3-10 副本自动扩缩容

#### Ingress
- `k8s/ingress/ingress.yaml` - 统一 Ingress 配置
  - 支持 SSO 域名和 API 域名
  - TLS 配置
  - CORS 配置
  - 速率限制

### CI/CD 配置 (cicd/)
- `cicd/.gitlab-ci.yml` - GitLab CI 流水线
  - Build: Maven 编译
  - Test: 单元测试 + 集成测试
  - Package: 构建并推送 Docker 镜像
  - Deploy: 自动部署到 K8s

### 监控配置 (monitoring/)

#### Prometheus
- `monitoring/prometheus/servicemonitor.yaml` - ServiceMonitor 定义
  - 所有服务的监控端点
  - 15秒抓取间隔
- `monitoring/prometheus/prometheus-rule.yaml` - 告警规则
  - 服务健康告警
  - 性能告警 (延迟、错误率)
  - 安全告警 (暴力破解、JWT 校验失败)
  - 资源告警 (CPU、内存、Pod 重启)
  - 数据库告警 (连接池、Redis)
  - 租户隔离告警

#### Grafana
- `monitoring/grafana/dashboard.json` - 监控大屏
  - 服务概览
  - 登录成功率
  - Token 刷新失败率
  - 权限校验 P99 延迟
  - QPS 统计
  - 错误率
  - 资源使用率

## 核心功能配置

### SSO 单点登录
- **JWT Token 配置**
  - Access Token: 2小时
  - Refresh Token: 7天
  - 签名算法: HS256
  - 黑名单机制: Redis

- **OAuth2 提供商**
  - GitHub
  - 微信
  - 钉钉

- **Session 管理**
  - Redis 缓存
  - TTL: 3600秒
  - Cookie Domain: .example.com

### 多租户隔离
- **隔离策略**
  - DATABASE: 独立数据库 (最高隔离)
  - SCHEMA: 独立 Schema (推荐)
  - COLUMN: tenant_id 列 (低成本)

- **请求处理**
  - 自动提取 X-Tenant-ID Header
  - MyBatis 拦截器自动注入
  - Redis 缓存租户信息 (TTL: 300秒)

### RBAC 权限模型
- **三级模型**
  - 用户 (User)
  - 角色 (Role)
  - 权限 (Permission)

- **权限类型**
  - API 权限
  - 菜单权限
  - 按钮权限

- **数据权限**
  - 租户隔离
  - 组织隔离
  - 自定义规则

### 安全配置
- **密码策略**
  - 最小长度: 8位
  - 必须包含大写字母
  - 必须包含数字
  - 登录失败5次锁定30分钟

- **防护机制**
  - 防暴力破解
  - JWT 黑名单
  - Token 自动刷新
  - CORS 配置
  - 速率限制

## 部署前必做配置

### 1. 修改镜像地址
```bash
sed -i 's|your-registry|your-actual-registry.com|g' k8s/*/deployment.yaml
```

### 2. 修改默认密码
```bash
# MySQL
kubectl create secret generic mysql-secret \
  --from-literal=root-password=your_strong_password \
  --from-literal=user-password=your_user_password \
  --namespace=user-center

# JWT
kubectl create secret generic jwt-secret \
  --from-literal=secret=your_jwt_secret_min_32_chars \
  --namespace=user-center

# Redis
kubectl set env deployment/redis REDIS_PASSWORD=your_redis_password -n user-center
```

### 3. 配置 OAuth2
编辑 `k8s/auth-service/deployment.yaml`，填入 OAuth2 应用凭证。

### 4. 配置域名
编辑 `k8s/ingress/ingress.yaml`，将 `example.com` 改为实际域名。

## 使用部署脚本

```bash
# 查看帮助
./deploy.sh help

# 完整部署
./deploy.sh all

# 分步部署
./deploy.sh infra      # 基础设施
./deploy.sh services   # 业务服务
./deploy.sh monitoring # 监控

# 验证
./deploy.sh verify

# 清理
./deploy.sh cleanup
```

## 文件统计

- **Kubernetes 配置**: 20 个 YAML 文件
- **监控配置**: 3 个文件 (ServiceMonitor, PrometheusRule, Grafana Dashboard)
- **CI/CD**: 1 个 GitLab CI 配置
- **文档**: 4 个 Markdown 文件
- **脚本**: 1 个 Bash 部署脚本

**总计**: 29 个文件

## 下一步

1. 阅读 [README.md](./README.md) 了解系统架构和快速开始
2. 按照 [CHECKLIST.md](./CHECKLIST.md) 完成部署前检查
3. 参考 [DEPLOYMENT.md](./DEPLOYMENT.md) 进行详细部署
4. 使用 [deploy.sh](./deploy.sh) 一键部署

## 注意事项

⚠️ **生产环境部署前必须**:
1. 修改所有默认密码
2. 更新镜像仓库地址
3. 配置真实的 OAuth2 应用
4. 启用 TLS 证书
5. 配置监控告警通知
6. 准备备份恢复方案
7. 进行压力测试

---

创建时间: 2026-02-17
版本: 1.0.0
