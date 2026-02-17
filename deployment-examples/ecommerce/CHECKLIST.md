# 部署前配置检查清单

## 必须修改的配置项

### 1. 镜像仓库地址

**文件位置**: 所有 `deployment.yaml` 文件

```bash
# 需要替换的占位符
your-registry/gateway-service:latest
your-registry/order-service:latest
your-registry/user-service:latest
your-registry/payment-service:latest
```

**操作步骤**:
```bash
# 批量替换
sed -i.bak 's|your-registry|your-actual-registry.com|g' \
  k8s/gateway/deployment.yaml \
  k8s/services/order-service/deployment.yaml \
  k8s/services/user-service/deployment.yaml \
  k8s/services/payment-service/deployment.yaml
```

### 2. 密码配置

#### 2.1 MySQL 密码

**文件**: `k8s/mysql/statefulset.yaml`

```yaml
# 当前密码 (Base64 编码)
root-password: cm9vdF9wYXNzd29yZA==  # 原始: root_password
replication-user: cmVwbGljYXRvcg==   # 原始: replicator
replication-password: cmVwbGljYXRvcl9wYXNz  # 原始: replicator_pass
```

**修改方法**:
```bash
# 生成新密码的 Base64 编码
echo -n "your_strong_password" | base64

# 更新 Secret
kubectl create secret generic mysql-secret \
  --from-literal=root-password=your_strong_password \
  --from-literal=replication-user=replicator \
  --from-literal=replication-password=your_replicator_password \
  --namespace=ecommerce \
  --dry-run=client -o yaml | kubectl apply -f -
```

#### 2.2 Nacos 密码

**文件**: `k8s/nacos/statefulset.yaml`

```yaml
mysql-user: cm9vdA==                    # 原始: root
mysql-password: cm9vdF9wYXNzd29yZA==   # 原始: root_password
nacos-auth: YWRtaW4=                   # 原始: admin
nacos-password: TmFjb3RAMTIz           # 原始: Nacos@123
```

**修改方法**:
```bash
kubectl create secret generic nacos-secret \
  --from-literal=mysql-user=root \
  --from-literal=mysql-password=your_mysql_password \
  --from-literal=nacos-auth=admin \
  --from-literal=nacos-password=your_nacos_password \
  --namespace=ecommerce \
  --dry-run=client -o yaml | kubectl apply -f -
```

#### 2.3 业务服务数据库密码

**文件**: `k8s/services/*/deployment.yaml`

```bash
# 为所有业务服务更新密码
kubectl create secret generic order-service-secret \
  --from-literal=mysql-password=your_mysql_password \
  --namespace=ecommerce \
  --dry-run=client -o yaml | kubectl apply -f -

kubectl create secret generic user-service-secret \
  --from-literal=mysql-password=your_mysql_password \
  --namespace=ecommerce \
  --dry-run=client -o yaml | kubectl apply -f -

kubectl create secret generic payment-service-secret \
  --from-literal=mysql-password=your_mysql_password \
  --namespace=ecommerce \
  --dry-run=client -o yaml | kubectl apply -f -
```

### 3. 域名配置

**文件**: `k8s/ingress/ingress.yaml`

```yaml
spec:
  tls:
  - hosts:
    - ecommerce.example.com          # 替换为实际域名
    - api.ecommerce.example.com      # 替换为实际域名
    secretName: ecommerce-tls
  rules:
  - host: ecommerce.example.com      # 替换为实际域名
  - host: api.ecommerce.example.com  # 替换为实际域名
  - host: monitor.ecommerce.example.com  # 替换为实际域名
```

### 4. Ingress Controller

**检查是否已安装**:
```bash
kubectl get pods -n ingress-nginx
```

**如果未安装，执行**:
```bash
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.8.1/deploy/static/provider/cloud/deploy.yaml
```

### 5. StorageClass

**检查是否已配置**:
```bash
kubectl get storageclass
```

**需要名为 `fast-ssd` 的 StorageClass**，如果没有，创建：

```yaml
# fast-ssd-storageclass.yaml
apiVersion: storage.k8s.io/v1
kind: StorageClass
metadata:
  name: fast-ssd
provisioner: kubernetes.io/aws-ebs  # 根据实际云服务商调整
parameters:
  type: gp3
  iops: "3000"
  throughput: "125"
volumeBindingMode: WaitForFirstConsumer
allowVolumeExpansion: true
```

```bash
kubectl apply -f fast-ssd-storageclass.yaml
```

### 6. 资源限制

**根据实际情况调整资源限制**:

所有 `deployment.yaml` 和 `statefulset.yaml` 中都包含资源配置：

```yaml
resources:
  requests:
    memory: "1Gi"
    cpu: "500m"
  limits:
    memory: "2Gi"
    cpu: "1000m"
```

**建议配置**:

| 组件 | Memory Request | Memory Limit | CPU Request | CPU Limit |
|-----|----------------|--------------|-------------|-----------|
| MySQL | 1Gi | 2Gi | 500m | 1000m |
| Nacos | 1Gi | 2Gi | 500m | 1000m |
| Redis | 512Mi | 1Gi | 250m | 500m |
| Gateway | 1Gi | 2Gi | 500m | 1000m |
| Order Service | 1Gi | 2Gi | 500m | 1000m |
| User Service | 1Gi | 2Gi | 500m | 1000m |
| Payment Service | 1Gi | 2Gi | 500m | 1000m |

### 7. HPA 配置

**文件**: 所有 `hpa.yaml`

```yaml
spec:
  minReplicas: 3    # 最小副本数
  maxReplicas: 10   # 最大副本数
  metrics:
  - type: Resource
    resource:
      name: cpu
      target:
        type: Utilization
        averageUtilization: 70    # CPU 阈值
  - type: Resource
    resource:
      name: memory
      target:
        type: Utilization
        averageUtilization: 80    # 内存阈值
```

**根据实际负载调整**:
- 开发环境: minReplicas: 1, maxReplicas: 3
- 测试环境: minReplicas: 2, maxReplicas: 5
- 生产环境: minReplicas: 3, maxReplicas: 10

### 8. CI/CD 配置

**文件**: `cicd/.gitlab-ci.yml`

**需要在 GitLab 中配置的变量**:

| 变量名 | 说明 | 示例 |
|-------|------|------|
| DOCKER_REGISTRY | 镜像仓库地址 | registry.example.com |
| REGISTRY_USER | 镜像仓库用户名 | admin |
| REGISTRY_PASSWORD | 镜像仓库密码 | ******** |
| KUBECONFIG | K8s 配置 (Base64编码) | ******** |

**生成 KUBECONFIG**:
```bash
# 导出当前 kubeconfig
cat ~/.kube/config | base64 -w 0

# 在 GitLab CI/CD 设置中添加变量
# Settings -> CI/CD -> Variables -> Add Variable
# Key: KUBECONFIG
# Value: (上面生成的 Base64 字符串)
```

### 9. 监控配置

#### 9.1 Prometheus Operator

**检查是否已安装**:
```bash
kubectl get pods -n monitoring | grep prometheus-operator
```

**如果未安装**:
```bash
kubectl apply -f https://raw.githubusercontent.com/prometheus-operator/prometheus-operator/main/bundle.yaml
```

#### 9.2 告警接收器

**配置 AlertManager**:
```yaml
# alertmanager-secret.yaml
apiVersion: v1
kind: Secret
metadata:
  name: alertmanager-config
  namespace: ecommerce
stringData:
  alertmanager.yaml: |
    global:
      resolve_timeout: 5m
    route:
      receiver: 'webhook'
      group_wait: 10s
      group_interval: 10s
      repeat_interval: 1h
    receivers:
    - name: 'webhook'
      webhook_configs:
      - url: 'https://your-webhook-url/alert'
        send_resolved: true
```

```bash
kubectl apply -f alertmanager-secret.yaml
```

### 10. 数据库初始化

**需要手动创建的数据库**:

```bash
# 连接到 MySQL
kubectl exec -it mysql-0 -n ecommerce -- mysql -uroot -p

# 执行 SQL
CREATE DATABASE ecommerce_order CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE DATABASE ecommerce_user CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE DATABASE ecommerce_payment CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE DATABASE nacos_config CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- 创建应用用户
CREATE USER 'app_user'@'%' IDENTIFIED BY 'your_app_password';
GRANT ALL PRIVILEGES ON ecommerce_.* TO 'app_user'@'%';
GRANT ALL PRIVILEGES ON nacos_config.* TO 'app_user'@'%';
FLUSH PRIVILEGES;
```

## 可选配置项

### 1. Pod 反亲和性

已在所有 Deployment 中配置，确保 Pod 分散在不同节点：

```yaml
affinity:
  podAntiAffinity:
    preferredDuringSchedulingIgnoredDuringExecution:
    - weight: 100
      podAffinityTerm:
        labelSelector:
          matchExpressions:
          - key: app
            operator: In
            values:
            - gateway
        topologyKey: kubernetes.io/hostname
```

### 2. 节点选择器

如果需要将服务部署到特定节点，添加节点选择器：

```yaml
spec:
  template:
    spec:
      nodeSelector:
        node-role.kubernetes.io/worker: "true"
        ecommerce: "yes"
```

### 3. 污点和容忍度

如果需要控制 Pod 调度：

```yaml
spec:
  template:
    spec:
      tolerations:
      - key: "dedicated"
        operator: "Equal"
        value: "ecommerce"
        effect: "NoSchedule"
```

### 4. 优先级类

创建高优先级类：

```yaml
# high-priority.yaml
apiVersion: scheduling.k8s.io/v1
kind: PriorityClass
metadata:
  name: high-priority
value: 1000
globalDefault: false
description: "高优先级 Pod"
```

在 Deployment 中使用：

```yaml
spec:
  template:
    spec:
      priorityClassName: high-priority
```

### 5. 网络策略

限制命名空间间的通信：

```yaml
# network-policy.yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: ecommerce-network-policy
  namespace: ecommerce
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
    - namespaceSelector:
        matchLabels:
          name: ecommerce
  egress:
  - to:
    - namespaceSelector:
        matchLabels:
          name: ecommerce
  - to:
    - namespaceSelector: {}
    ports:
    - protocol: TCP
      port: 53
    - protocol: UDP
      port: 53
```

## 部署前验证

在执行部署前，运行以下命令验证配置：

```bash
# 1. 验证 YAML 语法
kubectl apply --dry-run=client -f k8s/00-namespace.yaml
kubectl apply --dry-run=client -f k8s/mysql/
kubectl apply --dry-run=client -f k8s/nacos/
kubectl apply --dry-run=client -f k8s/redis/
kubectl apply --dry-run=client -f k8s/gateway/
kubectl apply --dry-run=client -f k8s/services/order-service/
kubectl apply --dry-run=client -f k8s/services/user-service/
kubectl apply --dry-run=client -f k8s/services/payment-service/
kubectl apply --dry-run=client -f k8s/ingress/

# 2. 验证 StorageClass
kubectl get storageclass fast-ssd

# 3. 验证 Ingress Controller
kubectl get pods -n ingress-nginx

# 4. 验证镜像仓库访问
docker login your-registry.com
docker pull your-registry.com/gateway-service:latest

# 5. 验证节点资源
kubectl top nodes
kubectl describe nodes | grep -A 5 "Allocated resources"
```

## 部署后检查

部署完成后，运行以下检查：

```bash
# 1. 检查所有 Pod 状态
kubectl get pods -n ecommerce

# 2. 检查服务发现
kubectl exec -it nacos-0 -n ecommerce -- curl -s "http://localhost:8848/nacos/v1/ns/instance/list?serviceName=gateway-service"

# 3. 检查数据库连接
kubectl exec -it order-service-xxxxxxxxxx -n ecommerce -- nc -zv mysql.ecommerce.svc.cluster.local 3306

# 4. 检查 Redis 连接
kubectl exec -it order-service-xxxxxxxxxx -n ecommerce -- nc -zv redis.ecommerce.svc.cluster.local 6379

# 5. 检查 HPA 状态
kubectl get hpa -n ecommerce

# 6. 检查监控端点
kubectl exec -it gateway-xxxxxxxxxx -n ecommerce -- curl -s http://localhost:8081/actuator/health

# 7. 查看 Ingress
kubectl get ingress -n ecommerce
kubectl describe ingress ecommerce-ingress -n ecommerce
```

## 常见问题

### Q1: 镜像拉取失败

**问题**: `Failed to pull image "your-registry/service:latest": rpc error: code = Unknown desc = Error response from daemon: pull access denied`

**解决方案**:
1. 确认镜像仓库地址正确
2. 创建 imagePullSecret:
```bash
kubectl create secret docker-registry registry-secret \
  --docker-server=your-registry.com \
  --docker-username=your-username \
  --docker-password=your-password \
  --namespace=ecommerce
```
3. 在 Deployment 中添加:
```yaml
spec:
  template:
    spec:
      imagePullSecrets:
      - name: registry-secret
```

### Q2: PVC 无法绑定

**问题**: `pod has unbound immediate PersistentVolumeClaims`

**解决方案**:
1. 检查 StorageClass 是否存在
2. 检查存储驱动是否正确
3. 检查是否有足够的存储空间

### Q3: 服务无法发现

**问题**: 服务无法在 Nacos 中注册

**解决方案**:
1. 检查 Nacos 地址配置
2. 检查命名空间配置
3. 检查网络连通性
4. 查看服务日志

## 部署检查清单

使用以下清单确保所有配置正确：

- [ ] 镜像仓库地址已更新
- [ ] MySQL 密码已修改
- [ ] Nacos 密码已修改
- [ ] 业务服务密码已修改
- [ ] 域名已配置（如需要）
- [ ] Ingress Controller 已安装
- [ ] StorageClass 已创建
- [ ] 资源限制已调整
- [ ] HPA 配置已审查
- [ ] CI/CD 变量已配置
- [ ] Prometheus Operator 已安装
- [ ] 数据库已初始化
- [ ] 镜像推送成功
- [ ] YAML 语法验证通过
- [ ] 节点资源充足
- [ ] 网络策略已配置（可选）

完成所有检查项后，可以开始部署！
