# 用户中心系统 - 详细部署文档

## 目录

- [1. 系统架构](#1-系统架构)
- [2. 环境准备](#2-环境准备)
- [3. 基础设施部署](#3-基础设施部署)
- [4. 业务服务部署](#4-业务服务部署)
- [5. 监控告警部署](#5-监控告警部署)
- [6. 验证测试](#6-验证测试)
- [7. 运维管理](#7-运维管理)
- [8. 故障排查](#8-故障排查)
- [9. 性能优化](#9-性能优化)
- [10. 安全加固](#10-安全加固)

---

## 1. 系统架构

### 1.1 整体架构图

```
┌─────────────────────────────────────────────────────────────┐
│                        Ingress Layer                        │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Ingress Controller (NGINX)                          │   │
│  │  - TLS 终止                                           │   │
│  │  - 路由分发                                            │   │
│  │  - 速率限制                                            │   │
│  └────────────────┬─────────────────────────────────────┘   │
└───────────────────┼─────────────────────────────────────────┘
                    │
        ┌───────────┴───────────┐
        │                       │
┌───────▼────────┐    ┌────────▼────────┐
│ SSO 域名        │    │ API 域名         │
│ sso.example.com│    │ api.example.com │
└────────┬───────┘    └────────┬────────┘
         │                     │
┌────────▼─────────────────────▼────────────────────────────┐
│                      Service Layer                         │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐  │
│  │   Auth   │  │   User   │  │Permission│  │  Tenant  │  │
│  │  Service │  │ Service  │  │ Service  │  │ Service  │  │
│  │ (3-10)   │  │ (3-10)   │  │ (3-10)   │  │ (3-10)   │  │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘  │
│  ┌──────────────────────────────┐                          │
│  │      Profile Service         │                          │
│  │        (3-10)                │                          │
│  └──────────────────────────────┘                          │
└──────────┬───────────────────────┬─────────────────────────┘
           │                       │
┌──────────▼─────────┐    ┌────────▼────────┐
│   Data Layer       │    │  Cache Layer    │
│  ┌────────────┐   │    │  ┌──────────┐   │
│  │   MySQL    │   │    │  │  Redis   │   │
│  │  (20Gi)    │   │    │  │ (512MB)  │   │
│  └────────────┘   │    │  └──────────┘   │
└───────────────────┘    └─────────────────┘
```

### 1.2 SSO 单点登录流程

```
1. 用户登录
   用户 → Auth Service: POST /auth/login
   Auth Service → MySQL: 验证用户
   Auth Service → Redis: 缓存 Session
   Auth Service → 用户: JWT Token

2. 访问应用
   用户 → 应用: 请求 (带 Token)
   应用 → Auth Service: 验证 Token
   Auth Service → Redis: 检查黑名单
   Auth Service → 应用: 返回用户信息

3. Token 刷新
   应用 → Auth Service: POST /auth/token/refresh
   Auth Service → 应用: 新 Token

4. 登出
   用户 → Auth Service: POST /auth/logout
   Auth Service → Redis: Token 加入黑名单
```

### 1.3 多租户数据隔离流程

```
Request
  │
  ├─ 拦截器提取 X-Tenant-ID Header
  │
  ├─ TenantContextHolder.set(tenantId)
  │
  ├─ MyBatis Interceptor
  │   │
  │   ├─ Strategy: COLUMN
  │   │   └─ 自动添加 WHERE tenant_id = ?
  │   │
  │   ├─ Strategy: SCHEMA
  │   │   └─ 动态切换 Schema
  │   │
  │   └─ Strategy: DATABASE
  │       └─ 动态切换 DataSource
  │
  └─ Execute SQL
```

---

## 2. 环境准备

### 2.1 Kubernetes 集群要求

**最低配置**:
- 版本: v1.24+
- 节点数: 3 个
- 单节点配置: 4 核 CPU、8GB 内存、50GB 存储

**推荐配置**:
- 版本: v1.26+
- 节点数: 5 个 (3 个 Master + 3 个 Worker)
- 单节点配置: 8 核 CPU、16GB 内存、100GB SSD

### 2.2 安装依赖组件

#### 2.2.1 安装 NGINX Ingress Controller

```bash
# 添加 Helm 仓库
helm repo add ingress-nginx https://kubernetes.github.io/ingress-nginx
helm repo update

# 安装
helm install ingress-nginx ingress-nginx/ingress-nginx \
  --namespace ingress-nginx \
  --create-namespace \
  --set controller.service.type=LoadBalancer \
  --set controller.resources.requests.cpu=500m \
  --set controller.resources.requests.memory=512Mi

# 验证
kubectl get pods -n ingress-nginx
kubectl get svc -n ingress-nginx
```

#### 2.2.2 安装 cert-manager (可选)

```bash
# 添加 Helm 仓库
helm repo add jetstack https://charts.jetstack.io
helm repo update

# 安装 CRDs
kubectl apply -f https://github.com/cert-manager/cert-manager/releases/download/v1.13.0/cert-manager.crds.yaml

# 安装
helm install cert-manager jetstack/cert-manager \
  --namespace cert-manager \
  --create-namespace \
  --version v1.13.0 \
  --set prometheus.enabled=false

# 创建 ClusterIssuer
kubectl apply -f - <<EOF
apiVersion: cert-manager.io/v1
kind: ClusterIssuer
metadata:
  name: letsencrypt-prod
spec:
  acme:
    server: https://acme-v02.api.letsencrypt.org/directory
    email: your-email@example.com
    privateKeySecretRef:
      name: letsencrypt-prod
    solvers:
    - http01:
        ingress:
          class: nginx
EOF

# 验证
kubectl get pods -n cert-manager
kubectl get clusterissuer
```

#### 2.2.3 安装 Metrics Server (HPA 必需)

```bash
kubectl apply -f https://github.com/kubernetes-sigs/metrics-server/releases/latest/download/components.yaml

# 验证
kubectl get apiservice v1beta1.metrics.k8s.io
kubectl top nodes
kubectl top pods
```

#### 2.2.4 安装 Prometheus Operator (可选)

```bash
# 添加 Helm 仓库
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
helm repo update

# 安装
helm install prometheus prometheus-community/kube-prometheus-stack \
  --namespace monitoring \
  --create-namespace \
  --set grafana.adminPassword=admin \
  --set prometheus.prometheusSpec.serviceMonitorSelectorNilUsesHelmValues=false

# 验证
kubectl get pods -n monitoring
kubectl get svc -n monitoring
```

### 2.3 创建 StorageClass

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

# 验证
kubectl get storageclass
```

---

## 3. 基础设施部署

### 3.1 部署 MySQL

#### 3.1.1 修改配置

编辑 `k8s/mysql/statefulset.yaml`:

```yaml
# 修改资源限制 (根据实际情况)
resources:
  requests:
    memory: "2Gi"  # 原始: 1Gi
    cpu: "1000m"   # 原始: 500m
  limits:
    memory: "4Gi"  # 原始: 2Gi
    cpu: "2000m"   # 原始: 1000m
```

#### 3.1.2 部署

```bash
# 部署 MySQL
kubectl apply -f k8s/mysql/statefulset.yaml

# 等待就绪
kubectl wait --for=condition=ready pod -l app=mysql -n user-center --timeout=600s

# 查看状态
kubectl get pods -n user-center -l app=mysql
kubectl get pvc -n user-center

# 查看日志
kubectl logs mysql-0 -n user-center
```

#### 3.1.3 验证初始化

```bash
# 连接数据库
kubectl exec -it mysql-0 -n user-center -- mysql -uroot -p

# 在 MySQL 中执行
SHOW DATABASES;
USE user_center;
SHOW TABLES;

# 检查初始数据
SELECT * FROM tenant;
SELECT * FROM user;
SELECT * FROM role;
SELECT * FROM permission;

# 退出
EXIT;
```

### 3.2 部署 Redis

#### 3.2.1 修改配置

编辑 `k8s/redis/deployment.yaml`:

```yaml
# 修改密码 (生产环境必须修改)
env:
  - name: REDIS_PASSWORD
    value: "your_strong_redis_password"

# 修改内存限制
resources:
  requests:
    memory: "512Mi"  # 原始: 256Mi
  limits:
    memory: "1Gi"    # 原始: 512Mi
```

#### 3.2.2 部署

```bash
# 部署 Redis
kubectl apply -f k8s/redis/deployment.yaml

# 等待就绪
kubectl wait --for=condition=ready pod -l app=redis -n user-center --timeout=120s

# 查看状态
kubectl get pods -n user-center -l app=redis

# 测试连接
kubectl exec -it redis-0 -n user-center -- redis-cli -a your_password ping
# 应返回: PONG
```

---

## 4. 业务服务部署

### 4.1 配置镜像地址

**重要**: 必须先修改镜像地址！

```bash
# 方法1: 手动修改每个文件
vi k8s/user-service/deployment.yaml
# 将 "your-registry/user-center/user-service:latest" 改为实际地址

# 方法2: 批量替换
find k8s -name "deployment.yaml" -exec sed -i 's|your-registry|your-actual-registry.com|g' {} \;
```

### 4.2 配置密钥

#### 4.2.1 更新数据库密码

```bash
# 生成新密码
MYSQL_ROOT_PASSWORD=$(openssl rand -base64 32)
MYSQL_USER_PASSWORD=$(openssl rand -base64 32)

# 创建 Secret
kubectl create secret generic mysql-secret \
  --from-literal=root-password="$MYSQL_ROOT_PASSWORD" \
  --from-literal=user-password="$MYSQL_USER_PASSWORD" \
  --namespace=user-center \
  --dry-run=client -o yaml | kubectl apply -f -

# 保存密码 (安全存储)
echo "MySQL Root Password: $MYSQL_ROOT_PASSWORD" > .secrets
echo "MySQL User Password: $MYSQL_USER_PASSWORD" >> .secrets
chmod 600 .secrets
```

#### 4.2.2 更新 Redis 密码

```bash
# 生成新密码
REDIS_PASSWORD=$(openssl rand -base64 32)

# 更新 deployment.yaml
kubectl set env deployment/redis \
  REDIS_PASSWORD="$REDIS_PASSWORD" \
  -n user-center

# 保存密码
echo "Redis Password: $REDIS_PASSWORD" >> .secrets
```

#### 4.2.3 更新 JWT Secret

```bash
# 生成强密钥 (至少 32 字符)
JWT_SECRET=$(openssl rand -base64 48)

# 创建 Secret
kubectl create secret generic jwt-secret \
  --from-literal=secret="$JWT_SECRET" \
  --namespace=user-center \
  --dry-run=client -o yaml | kubectl apply -f -

# 保存密钥
echo "JWT Secret: $JWT_SECRET" >> .secrets
```

#### 4.2.4 更新 OAuth2 配置 (如需要)

```bash
# 编辑认证服务配置
vi k8s/auth-service/deployment.yaml

# 修改以下环境变量
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

### 4.3 部署用户服务

```bash
# 部署
kubectl apply -f k8s/user-service/deployment.yaml

# 等待就绪
kubectl rollout status deployment/user-service -n user-center

# 查看状态
kubectl get pods -n user-center -l app=user-service
kubectl get hpa -n user-center

# 查看日志
kubectl logs -l app=user-service -n user-center --tail=100 -f
```

### 4.4 部署认证服务

```bash
# 部署
kubectl apply -f k8s/auth-service/deployment.yaml

# 等待就绪
kubectl rollout status deployment/auth-service -n user-center

# 查看状态
kubectl get pods -n user-center -l app=auth-service
kubectl get hpa -n user-center

# 查看日志
kubectl logs -l app=auth-service -n user-center --tail=100 -f
```

### 4.5 部署权限服务

```bash
# 部署
kubectl apply -f k8s/permission-service/deployment.yaml

# 等待就绪
kubectl rollout status deployment/permission-service -n user-center

# 查看状态
kubectl get pods -n user-center -l app=permission-service
kubectl get hpa -n user-center
```

### 4.6 部署租户服务

```bash
# 部署
kubectl apply -f k8s/tenant-service/deployment.yaml

# 等待就绪
kubectl rollout status deployment/tenant-service -n user-center

# 查看状态
kubectl get pods -n user-center -l app=tenant-service
kubectl get hpa -n user-center
```

### 4.7 部署用户画像服务

```bash
# 部署
kubectl apply -f k8s/profile-service/deployment.yaml

# 等待就绪
kubectl rollout status deployment/profile-service -n user-center

# 查看状态
kubectl get pods -n user-center -l app=profile-service
kubectl get hpa -n user-center
```

### 4.8 部署 Ingress

```bash
# 修改域名
vi k8s/ingress/ingress.yaml
# 将 example.com 改为实际域名

# 部署
kubectl apply -f k8s/ingress/ingress.yaml

# 查看状态
kubectl get ingress -n user-center
kubectl describe ingress user-center-ingress -n user-center
```

---

## 5. 监控告警部署

### 5.1 部署 ServiceMonitor

```bash
# 部署
kubectl apply -f monitoring/prometheus/servicemonitor.yaml

# 验证
kubectl get servicemonitor -n user-center

# 在 Prometheus 中查看
kubectl port-forward -n monitoring svc/prometheus-operated 9090:9090
# 访问 http://localhost:9090/targets
```

### 5.2 部署告警规则

```bash
# 部署
kubectl apply -f monitoring/prometheus/prometheus-rule.yaml

# 验证
kubectl get prometheusrule -n user-center

# 在 Prometheus 中查看规则
# http://localhost:9090/alerts
```

### 5.3 导入 Grafana Dashboard

```bash
# 访问 Grafana
kubectl port-forward -n monitoring svc/grafana 3000:80

# 登录 (默认: admin/admin)
# 导入 Dashboard: monitoring/grafana/dashboard.json

# 或使用 API 导入
GRAFANA_API_KEY="your_api_key"
curl -X POST http://localhost:3000/api/dashboards/import \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $GRAFANA_API_KEY" \
  -d @monitoring/grafana/dashboard.json
```

---

## 6. 验证测试

### 6.1 服务健康检查

```bash
# 检查所有 Pod
kubectl get pods -n user-center

# 检查所有 Service
kubectl get svc -n user-center

# 检查 HPA
kubectl get hpa -n user-center

# 检查 Ingress
kubectl get ingress -n user-center
```

### 6.2 功能测试

#### 6.2.1 测试用户注册

```bash
curl -X POST https://api.user-center.example.com/user/v1/users/register \
  -H "Content-Type: application/json" \
  -H "X-Tenant-ID: 1" \
  -d '{
    "username": "testuser",
    "password": "Test@123456",
    "email": "test@example.com",
    "phone": "13800138000"
  }'
```

#### 6.2.2 测试登录

```bash
curl -X POST https://sso.example.com/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "admin",
    "password": "admin123"
  }'

# 预期响应
{
  "code": 200,
  "message": "success",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "refresh_token_here",
    "expiresIn": 7200,
    "user": {
      "id": 1,
      "username": "admin",
      "tenantId": 1
    }
  }
}
```

#### 6.2.3 测试 Token 验证

```bash
# 使用上面获取的 Token
TOKEN="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."

curl -X GET https://api.user-center.example.com/user/v1/users/1 \
  -H "Authorization: Bearer $TOKEN" \
  -H "X-Tenant-ID: 1"
```

#### 6.2.4 测试权限校验

```bash
curl -X POST https://api.user-center.example.com/permission/v1/check \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "permission": "user:manage"
  }'
```

#### 6.2.5 测试租户隔离

```bash
# 租户 1 的用户
curl -X GET https://api.user-center.example.com/user/v1/users \
  -H "Authorization: Bearer $TOKEN" \
  -H "X-Tenant-ID: 1"

# 租户 2 的用户 (应返回不同结果)
curl -X GET https://api.user-center.example.com/user/v1/users \
  -H "Authorization: Bearer $TOKEN" \
  -H "X-Tenant-ID: 2"
```

### 6.3 性能测试

```bash
# 安装 wrk
brew install wrk  # macOS
# apt install wrk  # Ubuntu

# 测试登录接口
wrk -t12 -c400 -d30s \
  -s login.lua \
  https://sso.example.com/auth/login

# login.lua 内容
request = function()
  local body = '{"username":"admin","password":"admin123"}'
  return wrk.format("POST", "/auth/login", {
    ["Content-Type"]="application/json"
  }, body)
end

# 测试用户查询接口
wrk -t12 -c400 -d30s \
  -H "Authorization: Bearer $TOKEN" \
  https://api.user-center.example.com/user/v1/users
```

---

## 7. 运维管理

### 7.1 日常运维命令

#### 7.1.1 查看日志

```bash
# 查看所有服务日志
kubectl logs -l component=service -n user-center --tail=100

# 查看特定服务日志
kubectl logs -l app=user-service -n user-center -f

# 查看之前的日志 (Pod 重启后)
kubectl logs <pod-name> -n user-center --previous
```

#### 7.1.2 进入容器调试

```bash
# 进入用户服务容器
kubectl exec -it <pod-name> -n user-center -- /bin/bash

# 连接数据库
kubectl exec -it mysql-0 -n user-center -- mysql -uroot -p

# 连接 Redis
kubectl exec -it redis-0 -n user-center -- redis-cli -a your_password
```

#### 7.1.3 扩缩容

```bash
# 手动扩容到 5 个副本
kubectl scale deployment user-service --replicas=5 -n user-center

# 自动扩容 (HPA 会自动处理)
kubectl edit hpa user-service-hpa -n user-center

# 查看扩容状态
kubectl get hpa -n user-center -w
kubectl get pods -n user-center -w
```

#### 7.1.4 滚动更新

```bash
# 更新镜像
kubectl set image deployment/user-service \
  user-service=your-registry/user-center/user-service:v2.0 \
  -n user-center

# 查看更新状态
kubectl rollout status deployment/user-service -n user-center

# 回滚到上一个版本
kubectl rollout undo deployment/user-service -n user-center

# 回滚到指定版本
kubectl rollout undo deployment/user-service --to-revision=3 -n user-center

# 查看历史版本
kubectl rollout history deployment/user-service -n user-center
```

### 7.2 备份恢复

#### 7.2.1 MySQL 备份

```bash
# 创建备份脚本
cat > backup-mysql.sh <<'EOF'
#!/bin/bash
BACKUP_DIR="/backup/mysql"
DATE=$(date +%Y%m%d_%H%M%S)
NAMESPACE="user-center"

mkdir -p $BACKUP_DIR

kubectl exec mysql-0 -n $NAMESPACE -- \
  mysqldump -uroot -p${MYSQL_PASSWORD} \
  --all-databases \
  --single-transaction \
  --quick \
  --lock-tables=false \
  > $BACKUP_DIR/mysql_backup_${DATE}.sql

# 压缩备份
gzip $BACKUP_DIR/mysql_backup_${DATE}.sql

# 删除 7 天前的备份
find $BACKUP_DIR -name "*.sql.gz" -mtime +7 -delete
EOF

chmod +x backup-mysql.sh

# 执行备份
./backup-mysql.sh
```

#### 7.2.2 MySQL 恢复

```bash
# 创建恢复脚本
cat > restore-mysql.sh <<'EOF'
#!/bin/bash
BACKUP_FILE=$1
NAMESPACE="user-center"

if [ -z "$BACKUP_FILE" ]; then
  echo "Usage: $0 <backup-file>"
  exit 1
fi

# 解压 (如需要)
gunzip -c $BACKUP_FILE | \
  kubectl exec -i mysql-0 -n $NAMESPACE -- \
  mysql -uroot -p${MYSQL_PASSWORD}
EOF

chmod +x restore-mysql.sh

# 执行恢复
./restore-mysql.sh /backup/mysql/mysql_backup_20250101_120000.sql.gz
```

#### 7.2.3 Redis 备份

```bash
# 触发 RDB 快照
kubectl exec redis-0 -n user-center -- redis-cli -a your_password BGSAVE

# 等待快照完成
kubectl exec redis-0 -n user-center -- redis-cli -a your_password LASTSAVE

# 复制 RDB 文件
kubectl cp user-center/redis-0:/data/dump.rdb ./redis_backup_$(date +%Y%m%d).rdb
```

#### 7.2.4 配置备份

```bash
# 备份所有配置
kubectl get all,configmap,secret,pvc,ingress -n user-center -o yaml > user-center-config-backup.yaml

# 加密备份
gpg --symmetric --cipher-algo AES256 user-center-config-backup.yaml
```

### 7.3 监控告警

#### 7.3.1 查看 Prometheus 指标

```bash
# 端口转发
kubectl port-forward -n monitoring svc/prometheus-operated 9090:9090

# 访问
open http://localhost:9090

# 常用查询
# 登录成功率
sum(rate(auth_login_total{status="success"}[5m])) / sum(rate(auth_login_total[5m]))

# Token 刷新失败率
sum(rate(auth_token_refresh_total{status="failure"}[5m])) / sum(rate(auth_token_refresh_total[5m]))

# 权限校验 P99 延迟
histogram_quantile(0.99, sum(rate(http_server_requests_seconds_bucket{job="permission-service"}[5m])) by (le, path))

# MySQL 连接池使用率
sum(hikaricp_connections_active{job="user-service"}) / sum(hikaricp_connections_max{job="user-service"})
```

#### 7.3.2 查看 Grafana Dashboard

```bash
# 端口转发
kubectl port-forward -n monitoring svc/grafana 3000:80

# 访问
open http://localhost:3000

# 导入 Dashboard
# 文件: monitoring/grafana/dashboard.json
```

---

## 8. 故障排查

### 8.1 Pod 无法启动

#### 症状
- Pod 状态为 CrashLoopBackOff
- Pod 状态为 ImagePullBackOff
- Pod 状态为 Pending

#### 排查步骤

```bash
# 1. 查看 Pod 详情
kubectl describe pod <pod-name> -n user-center

# 2. 查看日志
kubectl logs <pod-name> -n user-center

# 3. 查看之前的日志 (如果重启)
kubectl logs <pod-name> -n user-center --previous

# 4. 查看事件
kubectl get events -n user-center --sort-by='.lastTimestamp'
```

#### 常见原因

**ImagePullBackOff**
```bash
# 原因: 镜像不存在或无权限
# 解决:
kubectl get secret <registry-secret> -n user-center
kubectl create secret docker-registry <registry-secret> \
  --docker-server=your-registry \
  --docker-username=user \
  --docker-password=password \
  -n user-center
```

**CrashLoopBackOff**
```bash
# 原因: 应用启动失败
# 解决: 查看日志, 检查配置
kubectl logs <pod-name> -n user-center
```

**Pending**
```bash
# 原因: 资源不足
# 解决:
kubectl top nodes
kubectl describe node <node-name>
```

### 8.2 服务无法访问

#### 症状
- 连接超时
- Connection refused
- 502 Bad Gateway

#### 排查步骤

```bash
# 1. 检查 Service
kubectl get svc -n user-center
kubectl describe svc <service-name> -n user-center

# 2. 检查 Endpoints
kubectl get endpoints -n user-center

# 3. 测试服务连通性
kubectl run -it --rm debug --image=busybox --restart=Never -- \
  sh -c "nc -zv <service-name>.user-center.svc.cluster.local 8084"

# 4. 测试 Pod 连通性
kubectl run -it --rm debug --image=busybox --restart=Never -- \
  sh -c "wget -qO- http://<pod-ip>:8084/actuator/health"
```

### 8.3 HPA 不工作

#### 症状
- Pod 不自动扩容
- HPA 状态显示 unknown

#### 排查步骤

```bash
# 1. 检查 Metrics Server
kubectl get apiservice v1beta1.metrics.k8s.io

# 2. 查看资源使用
kubectl top pods -n user-center

# 3. 查看 HPA 状态
kubectl get hpa -n user-center
kubectl describe hpa <hpa-name> -n user-center

# 4. 生成负载测试
kubectl run -it --rm load-generator --image=busybox /bin/sh
# 在容器中执行
while true; do wget -q -O- http://user-service.user-center.svc.cluster.local:8084/user/actuator/health; done
```

### 8.4 SSO 登录失败

#### 症状
- Token 无效
- 登录超时
- 验证失败

#### 排查步骤

```bash
# 1. 检查 Redis 连接
kubectl exec -it redis-0 -n user-center -- redis-cli -a your_password ping

# 2. 查看黑名单
kubectl exec -it redis-0 -n user-center -- redis-cli -a your_password
> KEYS auth:blacklist:*

# 3. 检查 JWT Secret
kubectl get secret jwt-secret -n user-center -o yaml

# 4. 查看认证服务日志
kubectl logs -l app=auth-service -n user-center --tail=100
```

### 8.5 租户隔离失效

#### 症状
- 数据泄露
- 跨租户访问

#### 排查步骤

```bash
# 1. 检查租户服务配置
kubectl get configmap tenant-config -n user-center -o yaml

# 2. 测试租户隔离
curl -X GET https://api.user-center.example.com/user/v1/users \
  -H "Authorization: Bearer $TOKEN" \
  -H "X-Tenant-ID: 1"

curl -X GET https://api.user-center.example.com/user/v1/users \
  -H "Authorization: Bearer $TOKEN" \
  -H "X-Tenant-ID: 2"

# 3. 查看租户服务日志
kubectl logs -l app=tenant-service -n user-center --tail=100
```

---

## 9. 性能优化

### 9.1 应用层优化

#### 9.1.1 JVM 参数调优

```yaml
# 编辑 deployment.yaml
env:
  - name: JAVA_OPTS
    value: >
      -Xms2g
      -Xmx4g
      -XX:+UseG1GC
      -XX:MaxGCPauseMillis=100
      -XX:G1HeapRegionSize=16m
      -XX:+HeapDumpOnOutOfMemoryError
      -XX:HeapDumpPath=/logs/heapdump.hprof
      -Dfile.encoding=UTF-8
      -Duser.timezone=Asia/Shanghai
```

#### 9.1.2 线程池调优

```yaml
# application.yml
server:
  tomcat:
    threads:
      max: 800
      min-spare: 100
    accept-count: 200
    connection-timeout: 10000
```

### 9.2 数据库优化

#### 9.2.1 连接池配置

```yaml
# application.yml
spring:
  datasource:
    hikari:
      maximum-pool-size: 100
      minimum-idle: 20
      connection-timeout: 30000
      idle-timeout: 600000
      max-lifetime: 1800000
      connection-test-query: SELECT 1
```

#### 9.2.2 SQL 优化

```sql
-- 添加复合索引
CREATE INDEX idx_tenant_username ON user(tenant_id, username);
CREATE INDEX idx_tenant_status ON user(tenant_id, status);
CREATE INDEX idx_user_created ON user(created_at);

-- 分析慢查询
SHOW VARIABLES LIKE 'slow_query_log';
SET GLOBAL slow_query_log = 'ON';
SET GLOBAL long_query_time = 1;

-- 查看慢查询
SELECT * FROM mysql.slow_log ORDER BY query_time DESC LIMIT 10;
```

### 9.3 缓存优化

#### 9.3.1 Redis 配置

```bash
# 调整内存策略
kubectl exec -it redis-0 -n user-center -- redis-cli -a your_password
> CONFIG SET maxmemory 1gb
> CONFIG SET maxmemory-policy allkeys-lru
> CONFIG REWRITE

# 查看命中率
> INFO stats
# keyspace_hits: 1000000
# keyspace_misses: 10000
# 命中率 = hits / (hits + misses) = 99%
```

#### 9.3.2 应用缓存策略

```yaml
# application.yml
cache:
  type: redis
  redis:
    time-to-live: 300  # 5分钟
    cache-null-values: false
  caffeine:
    spec: "maximumSize=1000,expireAfterWrite=5m"
```

---

## 10. 安全加固

### 10.1 网络策略

```yaml
# k8s/network-policy.yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: user-center-netpol
  namespace: user-center
spec:
  podSelector: {}
  policyTypes:
  - Ingress
  - Egress
  ingress:
  - from:
    - namespaceSelector:
        matchLabels:
          name: ingress-nginx
    ports:
    - protocol: TCP
      port: 8084
  - from:
    - podSelector:
        matchLabels:
          component: service
    ports:
    - protocol: TCP
      port: 3306
  egress:
  - to:
    - podSelector:
        matchLabels:
          app: mysql
    ports:
    - protocol: TCP
      port: 3306
  - to:
    - podSelector:
        matchLabels:
          app: redis
    ports:
    - protocol: TCP
      port: 6379
```

### 10.2 Pod 安全

```yaml
# deployment.yaml
spec:
  securityContext:
    runAsNonRoot: true
    runAsUser: 1000
    runAsGroup: 1000
    fsGroup: 1000
    seccompProfile:
      type: RuntimeDefault
  containers:
  - name: user-service
    securityContext:
      allowPrivilegeEscalation: false
      readOnlyRootFilesystem: true
      capabilities:
        drop:
        - ALL
```

### 10.3 密码策略

```yaml
# auth-service ConfigMap
auth:
  security:
    password-min-length: 10
    password-require-uppercase: true
    password-require-lowercase: true
    password-require-number: true
    password-require-special-char: true
    max-login-attempts: 5
    lockout-duration: 1800
    password-expiry-days: 90
```

### 10.4 审计日志

```yaml
# application.yml
logging:
  level:
    org.springframework.security: DEBUG
    com.yourcompany.usercenter: INFO
  file:
    name: /logs/audit.log
  pattern:
    console: "%d{yyyy-MM-dd HH:mm:ss} [%thread] %-5level %logger{36} - %msg%n"
```

---

## 附录

### A. 常用端口

| 服务 | 端口 | 说明 |
|-----|------|------|
| User Service | 8084 | HTTP API |
| Auth Service | 8086 | HTTP API |
| Permission Service | 8088 | HTTP API |
| Tenant Service | 8090 | HTTP API |
| Profile Service | 8092 | HTTP API |
| MySQL | 3306 | 数据库 |
| Redis | 6379 | 缓存 |
| Grafana | 3000 | 监控面板 |
| Prometheus | 9090 | 监控 |

### B. 环境变量

| 变量名 | 说明 | 默认值 |
|-------|------|-------|
| MYSQL_ROOT_PASSWORD | MySQL root 密码 | - |
| MYSQL_USER_PASSWORD | MySQL 用户密码 | - |
| REDIS_PASSWORD | Redis 密码 | - |
| JWT_SECRET | JWT 签名密钥 | - |
| PASSWORD_SALT | 密码盐值 | - |
| GITHUB_CLIENT_ID | GitHub OAuth2 ID | - |
| GITHUB_CLIENT_SECRET | GitHub OAuth2 Secret | - |

### C. 参考资料

- [Kubernetes 官方文档](https://kubernetes.io/docs/)
- [Spring Cloud Alibaba 文档](https://spring-cloud-alibaba-group.github.io/)
- [Prometheus 文档](https://prometheus.io/docs/)
- [Grafana 文档](https://grafana.com/docs/)

---

**祝你部署顺利！**
