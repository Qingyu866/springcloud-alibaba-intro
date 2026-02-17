# 用户中心系统 - 部署前检查清单

## 部署前必读

**重要**: 在部署用户中心系统之前，请务必完成以下检查项。这可以避免大部分常见问题。

---

## 1. 环境准备

### 1.1 Kubernetes 集群

- [ ] Kubernetes 版本 >= 1.24
- [ ] 集群至少有 3 个节点
- [ ] 每个节点至少 4 核 CPU、8GB 内存
- [ ] 集群可从本地 kubectl 访问
- [ ] kubectl 版本与集群版本匹配 (±1 个小版本)

**验证命令**:
```bash
kubectl version --client
kubectl version --short
kubectl cluster-info
```

### 1.2 StorageClass 配置

- [ ] StorageClass `fast-ssd` 已创建
- [ ] StorageClass 支持动态卷供应
- [ ] 有足够的存储空间 (至少 100GB)

**验证命令**:
```bash
kubectl get storageclass
kubectl get pv
```

**创建 StorageClass** (如未创建):
```bash
kubectl apply -f - <<EOF
apiVersion: storage.k8s.io/v1
kind: StorageClass
metadata:
  name: fast-ssd
provisioner: kubernetes.io/aws-ebs
parameters:
  type: gp3
  iops: "3000"
  throughput: "125"
allowVolumeExpansion: true
volumeBindingMode: WaitForFirstConsumer
EOF
```

### 1.3 Ingress Controller

- [ ] Ingress Controller 已安装 (NGINX 推荐)
- [ ] Ingress Controller 可正常访问
- [ ] DNS 已配置指向 Ingress Controller

**验证命令**:
```bash
kubectl get pods -n ingress-nginx
kubectl get svc -n ingress-nginx
```

### 1.4 cert-manager (可选，用于 HTTPS)

- [ ] cert-manager 已安装
- [ ] ClusterIssuer `letsencrypt-prod` 已创建

**验证命令**:
```bash
kubectl get pods -n cert-manager
kubectl get clusterissuer
```

### 1.5 Prometheus Operator (可选，用于监控)

- [ ] Prometheus Operator 已安装
- [ ] Prometheus 已运行
- [ ] Grafana 已部署

**验证命令**:
```bash
kubectl get pods -n monitoring
kubectl get prometheus
```

---

## 2. 配置修改

### 2.1 镜像仓库地址

- [ ] 所有 `deployment.yaml` 中的镜像地址已更新
- [ ] 镜像仓库可从集群访问
- [ ] 镜像仓库认证已配置 (imagePullSecrets)

**修改步骤**:
```bash
# 查找所有镜像地址
grep -r "your-registry" k8s/

# 批量替换
sed -i 's|your-registry|your-actual-registry.com|g' \
  k8s/*/deployment.yaml
```

### 2.2 密码与密钥

**强烈建议修改所有默认密码！**

- [ ] MySQL root 密码已修改
- [ ] MySQL user 密码已修改
- [ ] Redis 密码已修改
- [ ] JWT Secret 已修改 (至少 32 字符)
- [ ] Password Salt 已修改
- [ ] 所有密码符合强密码策略

**修改命令**:
```bash
# MySQL Secret
kubectl create secret generic mysql-secret \
  --from-literal=root-password=$(openssl rand -base64 32) \
  --from-literal=user-password=$(openssl rand -base64 32) \
  --namespace=user-center \
  --dry-run=client -o yaml | kubectl apply -f -

# JWT Secret (至少 32 字符)
kubectl create secret generic jwt-secret \
  --from-literal=secret=$(openssl rand -base64 48) \
  --namespace=user-center \
  --dry-run=client -o yaml | kubectl apply -f -

# 查看现有密钥
kubectl get secret -n user-center
```

### 2.3 OAuth2 配置

如果需要 OAuth2 登录：

- [ ] GitHub OAuth2 应用已创建
- [ ] 微信开放平台应用已创建
- [ ] 钉钉应用已创建
- [ ] 回调地址已配置: `https://sso.example.com/auth/oauth2/callback/{provider}`
- [ ] Client ID 和 Secret 已更新到 ConfigMap/Environment

**配置位置**:
- 文件: `k8s/auth-service/deployment.yaml`
- 环境变量: `GITHUB_CLIENT_ID`, `GITHUB_CLIENT_SECRET`, 等

### 2.4 SSO Cookie 配置

- [ ] Cookie Domain 已修改为实际域名
- [ ] 允许的源 (allowed-origins) 已配置

**配置位置**:
- 文件: `k8s/auth-service/deployment.yaml`
- ConfigMap: `auth-config`

### 2.5 资源限制

根据实际负载调整：

- [ ] CPU requests/limits 已根据实际情况调整
- [ ] 内存 requests/limits 已根据实际情况调整
- [ ] HPA 阈值已根据实际情况调整

**默认配置**:
- CPU: 500m - 1000m
- 内存: 1Gi - 2Gi
- HPA CPU: 70%
- HPA 内存: 80%

---

## 3. 网络配置

### 3.1 DNS 配置

- [ ] `api.user-center.example.com` 已解析到 Ingress IP
- [ ] `sso.example.com` 已解析到 Ingress IP
- [ ] DNS 生效 (使用 `dig` 或 `nslookup` 验证)

**验证命令**:
```bash
dig api.user-center.example.com
dig sso.example.com
```

### 3.2 防火墙规则

- [ ] HTTPS (443) 端口已开放
- [ ] 集群节点间通信已允许
- [ ] 数据库端口 (如需外部访问) 已限制

### 3.3 Network Policy (可选)

如需启用网络策略：

- [ ] Network Policy 已应用
- [ ] 策略规则符合安全要求

---

## 4. 数据库准备

### 4.1 MySQL 初始化

- [ ] MySQL Pod 已启动并就绪
- [ ] 数据库初始化脚本已执行 (通过 init.sql)
- [ ] 默认管理员用户已创建
- [ ] 默认租户已创建

**验证步骤**:
```bash
# 等待 MySQL 就绪
kubectl wait --for=condition=ready pod -l app=mysql -n user-center --timeout=300s

# 连接数据库
kubectl exec -it mysql-0 -n user-center -- mysql -uroot -p

# 检查数据库
SHOW DATABASES;
USE user_center;
SHOW TABLES;
SELECT * FROM user;
SELECT * FROM tenant;
```

### 4.2 Redis 连接测试

- [ ] Redis Pod 已启动并就绪
- [ ] Redis 密码已设置
- [ ] Redis 连接正常

**验证命令**:
```bash
kubectl exec -it redis-0 -n user-center -- redis-cli -a your_password ping
# 应返回 PONG
```

---

## 5. 安全检查

### 5.1 Secret 管理

- [ ] 所有敏感信息使用 Secret 存储
- [ ] Secret 未提交到 Git (检查 .gitignore)
- [ ] 生产环境密码与开发环境分离

**检查命令**:
```bash
# 检查 .gitignore
cat .gitignore | grep Secret

# 查看所有 Secret
kubectl get secret -n user-center
```

### 5.2 RBAC 配置

- [ ] ServiceAccount 已创建
- [ ] Role/RoleBinding 已配置
- [ ] 最小权限原则已遵循

### 5.3 Pod 安全

- [ ] runAsNonRoot: true (所有 Pod)
- [ ] runAsUser 已设置 (非 root 用户)
- [ ] seccompProfile 已启用
- [ ] readOnlyRootFilesystem 已配置 (如适用)

**验证命令**:
```bash
kubectl get pods -n user-center -o jsonpath='{range .items[*]}{.metadata.name}{"\t"}{.spec.securityContext}{"\n"}{end}'
```

### 5.4 TLS 证书

- [ ] TLS 证书已配置
- [ ] 证书有效期充足
- [ ] HTTP 到 HTTPS 重定向已启用

**验证命令**:
```bash
kubectl get certificate -n user-center
kubectl describe certificate user-center-tls -n user-center
```

---

## 6. 监控与日志

### 6.1 Prometheus 监控

- [ ] ServiceMonitor 已创建
- [ ] Prometheus 正在抓取指标
- [ ] 告警规则已加载

**验证命令**:
```bash
# 检查 ServiceMonitor
kubectl get servicemonitor -n user-center

# 在 Prometheus UI 中检查
#kubectl port-forward -n monitoring svc/prometheus 9090:9090
# 访问 http://localhost:9090/targets
```

### 6.2 Grafana Dashboard

- [ ] Dashboard JSON 已导入
- [ ] 数据源配置正确
- [ ] Dashboard 显示正常

**导入步骤**:
1. 访问 Grafana
2. 点击 "+" -> "Import"
3. 上传 `monitoring/grafana/dashboard.json`
4. 选择 Prometheus 数据源

### 6.3 日志收集

如需日志收集 (如 ELK/Loki)：

- [ ] 日志收集 Agent 已安装
- [ ] 日志正在收集
- [ ] 日志查询正常

---

## 7. 备份策略

### 7.1 数据备份

- [ ] MySQL 备份计划已制定
- [ ] Redis 备份计划已制定
- [ ] 备份脚本已准备
- [ ] 备份存储位置已确定

### 7.2 灾难恢复

- [ ] 恢复流程已文档化
- [ ] 恢复测试已执行
- [ ] RTO/RPO 已定义

---

## 8. CI/CD 配置

### 8.1 GitLab CI 变量

- [ ] `DOCKER_REGISTRY`: 镜像仓库地址
- [ ] `REGISTRY_USER`: 镜像仓库用户名
- [ ] `REGISTRY_PASSWORD`: 镜像仓库密码
- [ ] `KUBECONFIG_DEV`: 开发环境 K8s 配置 (Base64)
- [ ] `KUBECONFIG_PROD`: 生产环境 K8s 配置 (Base64)

**设置步骤**:
1. 访问 GitLab 项目 -> Settings -> CI/CD -> Variables
2. 添加上述变量
3. 确保 `KUBECONFIG_*` 为 Type: File, Protected: 勾选

### 8.2 流水线测试

- [ ] CI 流水线可正常运行
- [ ] 镜像可成功推送到仓库
- [ ] 开发环境部署成功
- [ ] 生产环境部署需要手动审批

---

## 9. 功能测试

### 9.1 用户服务测试

```bash
# 测试用户创建
curl -X POST https://api.user-center.example.com/user/v1/users \
  -H "Content-Type: application/json" \
  -H "X-Tenant-ID: 1" \
  -d '{"username":"testuser","password":"Test@123","email":"test@example.com"}'

# 测试用户查询
curl -X GET https://api.user-center.example.com/user/v1/users/1 \
  -H "X-Tenant-ID: 1"
```

### 9.2 认证服务测试

```bash
# 测试登录
curl -X POST https://sso.example.com/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}'

# 测试 Token 刷新
curl -X POST https://sso.example.com/auth/token/refresh \
  -H "Content-Type: application/json" \
  -d '{"refreshToken":"your_refresh_token"}'

# 测试登出
curl -X POST https://sso.example.com/auth/logout \
  -H "Authorization: Bearer your_access_token"
```

### 9.3 权限服务测试

```bash
# 测试权限校验
curl -X POST https://api.user-center.example.com/permission/v1/check \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer your_token" \
  -d '{"permission":"user:manage"}'
```

### 9.4 租户服务测试

```bash
# 测试租户隔离
curl -X GET https://api.user-center.example.com/user/v1/users \
  -H "Authorization: Bearer your_token" \
  -H "X-Tenant-ID: 1"  # 租户1的用户

curl -X GET https://api.user-center.example.com/user/v1/users \
  -H "Authorization: Bearer your_token" \
  -H "X-Tenant-ID: 2"  # 租户2的用户 (应返回不同结果)
```

### 9.5 用户画像服务测试

```bash
# 测试用户标签更新
curl -X POST https://api.user-center.example.com/profile/v1/users/1/tags \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer your_token" \
  -d '{"tags":["vip","active"]}'

# 测试用户分群
curl -X GET https://api.user-center.example.com/profile/v1/segments \
  -H "Authorization: Bearer your_token"
```

---

## 10. 性能测试

### 10.1 基准测试

- [ ] 各服务 QPS 基准已测试
- [ ] P50/P95/P99 延迟已记录
- [ ] 数据库连接池已优化
- [ ] Redis 缓存命中率已验证

### 10.2 压力测试

- [ ] 高并发场景已测试
- [ ] HPA 自动扩缩容已验证
- [ ] 系统瓶颈已识别
- [ ] 优化方案已制定

**压力测试工具**:
```bash
# 使用 wrk 测试
wrk -t12 -c400 -d30s https://api.user-center.example.com/user/v1/users/1

# 使用 hey 测试
hey -n 10000 -c 100 https://api.user-center.example.com/user/v1/users
```

---

## 11. 文档完善

- [ ] README.md 已更新为生产环境配置
- [ ] DEPLOYMENT.md 已阅读
- [ ] 架构图已更新
- [ ] 运维手册已编写
- [ ] 应急预案已准备

---

## 12. 上线前最终检查

### 12.1 数据迁移

如需从旧系统迁移：

- [ ] 数据迁移脚本已准备
- [ ] 迁移测试已完成
- [ ] 回滚方案已准备
- [ ] 数据一致性已验证

### 12.2 灰度发布

- [ ] 灰度发布计划已制定
- [ ] 灰度流量比例已确定
- [ ] 监控告警已配置
- [ ] 回滚开关已准备

### 12.3 上线检查清单

- [ ] 所有服务 Pod 就绪
- [ ] 所有 HPA 正常工作
- [ ] 监控指标正常
- [ ] 日志正常输出
- [ ] 告警规则已配置
- [ ] DNS 生效
- [ ] SSL 证书有效
- [ ] 备份任务已启动
- [ ] 运维团队已通知

---

## 紧急联系信息

在部署前，准备以下联系方式：

- [ ] 运维负责人: _______________
- [ ] 开发负责人: _______________
- [ ] DBA: _______________
- [ ] 安全团队: _______________

---

## 部署确认

- [ ] 所有检查项已完成
- [ ] 团队已审核
- [ ] 上线时间已确定
- [ ] 回滚计划已准备

**部署执行人**: _______________
**部署时间**: _______________
**审批人**: _______________

---

**祝你部署顺利！**

如有问题，请参考 [DEPLOYMENT.md](./DEPLOYMENT.md) 或提交 Issue。
