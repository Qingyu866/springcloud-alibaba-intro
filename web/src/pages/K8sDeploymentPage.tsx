import { useState } from 'react';
import { CodeBlock } from '../components';

interface ConceptCardProps {
  name: string;
  description: string;
  icon: string;
  color: string;
}

const ConceptCard: React.FC<ConceptCardProps> = ({ name, description, icon, color }) => (
  <div className={`${color} border-2 rounded-lg p-5`}>
    <div className="flex items-center gap-3 mb-3">
      <span className="text-3xl">{icon}</span>
      <h3 className="text-xl font-bold text-gray-900">{name}</h3>
    </div>
    <p className="text-gray-700 text-sm">{description}</p>
  </div>
);

interface FaqCardProps {
  number: number;
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
}

const FaqCard: React.FC<FaqCardProps> = ({ number, question, answer, isOpen, onClick }) => (
  <div className="bg-white border-2 border-gray-200 rounded-lg overflow-hidden">
    <button
      onClick={onClick}
      className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
    >
      <h3 className="text-lg font-bold text-gray-900">
        {number}. {question}
      </h3>
      <span className="text-2xl text-gray-400">{isOpen ? '−' : '+'}</span>
    </button>
    {isOpen && (
      <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
        <div className="text-gray-700 whitespace-pre-line">{answer}</div>
      </div>
    )}
  </div>
);

export const K8sDeploymentPage: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="bg-gradient-to-r from-slate-700 to-slate-900 text-white rounded-lg p-6 mb-8">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-4xl font-bold mb-2">Kubernetes 部署</h1>
            <p className="text-slate-200 text-lg">K8s 生产环境部署实战</p>
          </div>
          <div className="flex gap-3 text-sm">
            <span className="px-3 py-1 bg-white/20 rounded-full">🏗️ 架构师</span>
            <span className="px-3 py-1 bg-white/20 rounded-full">⏱️ 约80分钟</span>
            <span className="px-3 py-1 bg-white/20 rounded-full">📚 12个知识点</span>
          </div>
        </div>
      </div>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">为什么使用 Kubernetes?</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-red-50 border-2 border-red-200 rounded-lg p-5">
            <h3 className="text-xl font-bold text-red-900 mb-3">❌ Docker Swarm 不足</h3>
            <ul className="text-gray-700 space-y-2">
              <li>• 功能有限，不适合复杂场景</li>
              <li>• 缺少自动扩缩容能力</li>
              <li>• 服务发现功能简单</li>
              <li>• 存储管理能力弱</li>
              <li>• 社区活跃度下降</li>
            </ul>
          </div>

          <div className="bg-green-50 border-2 border-green-200 rounded-lg p-5">
            <h3 className="text-xl font-bold text-green-900 mb-3">✅ K8s 核心优势</h3>
            <ul className="text-gray-700 space-y-2">
              <li>• 自动扩缩容：HPA 根据负载自动调整</li>
              <li>• 自愈能力：容器故障自动重启</li>
              <li>• 滚动更新：零停机发布</li>
              <li>• 服务发现：内置 DNS + Service</li>
              <li>• 存储编排：PV/PVC 统一管理</li>
              <li>• 云原生标准：CNCF 毕业</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">K8s 核心概念</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <ConceptCard
            name="Pod"
            description="最小部署单元，包含一个或多个容器，共享网络和存储"
            icon="📦"
            color="bg-blue-50 border-blue-200"
          />
          <ConceptCard
            name="Deployment"
            description="声明式管理 Pod，支持滚动更新和回滚"
            icon="🔄"
            color="bg-purple-50 border-purple-200"
          />
          <ConceptCard
            name="Service"
            description="为 Pod 提供稳定访问入口，支持负载均衡"
            icon="🔀"
            color="bg-green-50 border-green-200"
          />
          <ConceptCard
            name="Ingress"
            description="HTTP/HTTPS 路由规则，外部流量入口"
            icon="🚪"
            color="bg-orange-50 border-orange-200"
          />
          <ConceptCard
            name="ConfigMap"
            description="配置数据分离，支持热更新"
            icon="⚙️"
            color="bg-yellow-50 border-yellow-200"
          />
          <ConceptCard
            name="Secret"
            description="敏感数据加密存储，密码、证书管理"
            icon="🔐"
            color="bg-red-50 border-red-200"
          />
          <ConceptCard
            name="PV/PVC"
            description="持久化存储抽象，解耦存储和应用"
            icon="💾"
            color="bg-indigo-50 border-indigo-200"
          />
          <ConceptCard
            name="HPA"
            description="水平 Pod 自动扩缩容，基于 CPU/内存/自定义指标"
            icon="📊"
            color="bg-teal-50 border-teal-200"
          />
          <ConceptCard
            name="Namespace"
            description="资源隔离，多租户环境管理"
            icon="🏷️"
            color="bg-pink-50 border-pink-200"
          />
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">1. Deployment 配置</h2>

        <div className="bg-white border-2 border-slate-200 rounded-lg p-6 mb-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">微服务部署清单</h3>
          <CodeBlock
            language="yaml"
            code={`apiVersion: apps/v1
kind: Deployment
metadata:
  name: order-service
  namespace: production
spec:
  replicas: 3
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxSurge: 1
      maxUnavailable: 0
  selector:
    matchLabels:
      app: order-service
  template:
    metadata:
      labels:
        app: order-service
        version: v1
    spec:
      containers:
      - name: order-service
        image: harbor.example.com/prod/order-service:1.0.0
        ports:
        - containerPort: 8080
          protocol: TCP

        env:
        - name: SPRING_PROFILES_ACTIVE
          value: "prod"
        - name: NACOS_SERVER_ADDR
          value: "nacos-service:8848"
        - name: MYSQL_HOST
          valueFrom:
            configMapKeyRef:
              name: order-config
              key: mysql.host
        - name: MYSQL_PASSWORD
          valueFrom:
            secretKeyRef:
              name: order-secret
              key: mysql.password

        resources:
          requests:
            memory: "512Mi"
            cpu: "500m"
          limits:
            memory: "1Gi"
            cpu: "1000m"

        livenessProbe:
          httpGet:
            path: /actuator/health/liveness
            port: 8080
          initialDelaySeconds: 60
          periodSeconds: 10
          timeoutSeconds: 3
          failureThreshold: 3

        readinessProbe:
          httpGet:
            path: /actuator/health/readiness
            port: 8080
          initialDelaySeconds: 30
          periodSeconds: 5
          timeoutSeconds: 2
          failureThreshold: 3

        lifecycle:
          preStop:
            exec:
              command: ["sh", "-c", "sleep 15"]`}
          />
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">2. Service 与 Ingress</h2>

        <div className="space-y-6">
          <div className="bg-white border-2 border-slate-200 rounded-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">ClusterIP Service（内部服务）</h3>
            <CodeBlock
              language="yaml"
              code={`apiVersion: v1
kind: Service
metadata:
  name: order-service
  namespace: production
spec:
  selector:
    app: order-service
  ports:
  - name: http
    protocol: TCP
    port: 80
    targetPort: 8080
  type: ClusterIP
  sessionAffinity: ClientIP`}
            />
          </div>

          <div className="bg-white border-2 border-slate-200 rounded-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Ingress（外部访问）</h3>
            <CodeBlock
              language="yaml"
              code={`apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: api-gateway
  namespace: production
  annotations:
    nginx.ingress.kubernetes.io/rewrite-target: /
    nginx.ingress.kubernetes.io/ssl-redirect: "true"
    cert-manager.io/cluster-issuer: "letsencrypt-prod"
spec:
  ingressClassName: nginx
  tls:
  - hosts:
    - api.example.com
    secretName: api-tls
  rules:
  - host: api.example.com
    http:
      paths:
      - path: /api/orders
        pathType: Prefix
        backend:
          service:
            name: order-service
            port:
              number: 80
      - path: /api/products
        pathType: Prefix
        backend:
          service:
            name: product-service
            port:
              number: 80`}
            />
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">3. ConfigMap 与 Secret</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white border-2 border-blue-200 rounded-lg p-6">
            <h3 className="text-xl font-bold text-blue-900 mb-4">ConfigMap（配置）</h3>
            <CodeBlock
              language="yaml"
              code={`apiVersion: v1
kind: ConfigMap
metadata:
  name: order-config
data:
  application.yml: |
    spring:
      datasource:
        url: jdbc:mysql://mysql:3306/order_db
        username: order_user
      cloud:
        nacos:
          server-addr: nacos:8848
          config:
            namespace: production
---
# 使用方式
envFrom:
  - configMapRef:
      name: order-config`}
            />
          </div>

          <div className="bg-white border-2 border-red-200 rounded-lg p-6">
            <h3 className="text-xl font-bold text-red-900 mb-4">Secret（敏感信息）</h3>
            <CodeBlock
              language="yaml"
              code={`apiVersion: v1
kind: Secret
metadata:
  name: order-secret
type: Opaque
data:
  mysql.password: bXlzcWxwYXNzd29yZA== # base64编码
  jwt.secret: and0LXNlY3JldC1rZXk=
---
# 使用方式
env:
  - name: MYSQL_PASSWORD
    valueFrom:
      secretKeyRef:
        name: order-secret
        key: mysql.password

# 挂载为文件
volumes:
  - name: secret-volume
    secret:
      secretName: order-secret`}
            />
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">4. 持久化存储</h2>

        <div className="bg-white border-2 border-slate-200 rounded-lg p-6">
          <CodeBlock
            language="yaml"
            code={`# 1. 持久卷声明（PVC）
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: mysql-pvc
spec:
  accessModes:
    - ReadWriteOnce
  resources:
    requests:
      storage: 20Gi
  storageClassName: fast-ssd

---
# 2. Deployment 中使用 PVC
apiVersion: apps/v1
kind: Deployment
metadata:
  name: mysql
spec:
  template:
    spec:
      containers:
      - name: mysql
        image: mysql:8.0
        volumeMounts:
        - name: mysql-data
          mountPath: /var/lib/mysql
      volumes:
      - name: mysql-data
        persistentVolumeClaim:
          claimName: mysql-pvc

---
# 3. StorageClass（动态存储）
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
reclaimPolicy: Delete`}
          />
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">5. 水平自动扩缩容（HPA）</h2>

        <div className="bg-white border-2 border-slate-200 rounded-lg p-6">
          <CodeBlock
            language="yaml"
            code={`apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: order-hpa
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: order-service
  minReplicas: 3
  maxReplicas: 10
  metrics:
  - type: Resource
    resource:
      name: cpu
      target:
        type: Utilization
        averageUtilization: 70
  - type: Resource
    resource:
      name: memory
      target:
        type: Utilization
        averageUtilization: 80
  behavior:
    scaleDown:
      stabilizationWindowSeconds: 300
      policies:
      - type: Percent
        value: 50
        periodSeconds: 60
    scaleUp:
      stabilizationWindowSeconds: 0
      policies:
      - type: Percent
        value: 100
        periodSeconds: 30
      - type: Pods
        value: 2
        periodSeconds: 60`}
          />
        </div>

        <div className="mt-6 bg-blue-50 border-2 border-blue-200 rounded-lg p-6">
          <h4 className="font-bold text-blue-900 mb-2">💡 HPA 最佳实践</h4>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>• 合理设置 min/max 副本数，避免资源浪费</li>
            <li>• 配置多个指标（CPU + 内存 + 自定义指标）</li>
            <li>• 设置冷却时间，防止频繁扩缩容</li>
            <li>• 监控 HPA 事件，确保扩缩容正常工作</li>
          </ul>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">6. 滚动更新与回滚</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white border-2 border-green-200 rounded-lg p-6">
            <h3 className="text-xl font-bold text-green-900 mb-4">滚动更新策略</h3>
            <CodeBlock
              language="yaml"
              code={`spec:
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxSurge: 1        # 最多多出1个Pod
      maxUnavailable: 0  # 最多0个Pod不可用

# 更新镜像
kubectl set image deployment/order-service \\
  order-service=harbor.example.com/prod/order-service:1.1.0

# 查看更新状态
kubectl rollout status deployment/order-service`}
            />
          </div>

          <div className="bg-white border-2 border-red-200 rounded-lg p-6">
            <h3 className="text-xl font-bold text-red-900 mb-4">版本回滚</h3>
            <CodeBlock
              language="bash"
              code={`# 查看历史版本
kubectl rollout history deployment/order-service

# 回滚到上一版本
kubectl rollout undo deployment/order-service

# 回滚到指定版本
kubectl rollout undo deployment/order-service --to-revision=3

# 暂停更新
kubectl rollout pause deployment/order-service

# 恢复更新
kubectl rollout resume deployment/order-service`}
            />
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">7. K8s 常用管理命令</h2>

        <div className="bg-white border-2 border-slate-200 rounded-lg p-6">
          <CodeBlock
            language="bash"
            code={`# 部署管理
kubectl apply -f deployment.yaml           # 应用配置
kubectl get pods -n production             # 查看 Pod
kubectl get svc -n production              # 查看 Service
kubectl describe pod <pod-name>            # 查看详情

# 扩缩容
kubectl scale deployment/order-service --replicas=5
kubectl autoscale deployment/order-service --min=3 --max=10 --cpu-percent=70

# 日志查看
kubectl logs <pod-name> -f                 # 实时日志
kubectl logs <pod-name> --previous         # 前一个版本日志
kubectl logs -f deployment/order-service --all-containers=true

# 进入容器
kubectl exec -it <pod-name> -- sh
kubectl exec -it <pod-name> -c order-service -- sh

# 资源监控
kubectl top nodes                          # 节点资源
kubectl top pods -n production             # Pod 资源

# 故障排查
kubectl get events --sort-by=.metadata.creationTimestamp
kubectl get pods --field-selector=status.phase=Failed

# 清理资源
kubectl delete deployment order-service
kubectl delete pod <pod-name> --force --grace-period=0
kubectl delete all -l app=order-service`}
          />
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">K8s 部署最佳实践</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-green-50 border-2 border-green-200 rounded-lg p-5">
            <h3 className="text-xl font-bold text-green-900 mb-3">资源管理</h3>
            <ul className="text-sm text-gray-700 space-y-2">
              <li>✓ 设置 requests/limits 限制资源</li>
              <li>✓ 使用 HPA 自动扩缩容</li>
              <li>✓ 配置 Pod 反亲和性</li>
              <li>✓ 优先使用 SSD 存储</li>
              <li>✓ 监控资源使用率</li>
            </ul>
          </div>

          <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-5">
            <h3 className="text-xl font-bold text-blue-900 mb-3">高可用性</h3>
            <ul className="text-sm text-gray-700 space-y-2">
              <li>✓ 副本数 &gt;= 3</li>
              <li>✓ 配置健康检查</li>
              <li>✓ 滚动更新零停机</li>
              <li>� readinessProbe 延迟启动</li>
              <li>✓ preStop 优雅关闭</li>
            </ul>
          </div>

          <div className="bg-red-50 border-2 border-red-200 rounded-lg p-5">
            <h3 className="text-xl font-bold text-red-900 mb-3">安全加固</h3>
            <ul className="text-sm text-gray-700 space-y-2">
              <li>✓ 非 root 用户运行</li>
              <li>✓ Secret 存储敏感信息</li>
              <li>✓ NetworkPolicy 网络隔离</li>
              <li>✓ RBAC 权限控制</li>
              <li>✓ 镜像安全扫描</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">常见问题</h2>

        <div className="space-y-4">
          <FaqCard
            number={1}
            question="Pod 一直处于 Pending 状态怎么办？"
            answer={"Pod Pending 常见原因：\n\n1. 资源不足\n   kubectl describe pod <pod-name>\n   查看是否有 Insufficient cpu/memory\n\n2. 镜像拉取失败\n   - 检查镜像名称和标签\n   - 确认 imagePullSecret 配置\n   - 检查网络访问镜像仓库\n\n3. 存储卷挂载失败\n   - PVC 未绑定\n   - StorageClass 配置错误\n\n【解决方法】\n- 调整资源 requests\n- 添加节点或清理无用 Pod\n- 检查 PVC 状态：kubectl get pvc"}
            isOpen={openFaq === 1}
            onClick={() => toggleFaq(1)}
          />
          <FaqCard
            number={2}
            question="如何实现零停机发布？"
            answer={"零停机发布策略：\n\n1. 滚动更新配置\n   ```yaml\n   maxSurge: 1\n   maxUnavailable: 0\n   ```\n\n2. 健康检查配置\n   - readinessProbe: 确保就绪后才接收流量\n   - livenessProbe: 检测故障自动重启\n\n3. 优雅关闭\n   ```yaml\n   lifecycle:\n     preStop:\n       exec:\n         command: [\"sh\", \"-c\", \"sleep 15\"]\n   ```\n\n4. 多版本并行\n   - 使用 HPA 流量切换\n   - Istio 灰度发布\n\n【验证】\nkubectl rollout status deployment/order-service"}
            isOpen={openFaq === 2}
            onClick={() => toggleFaq(2)}
          />
          <FaqCard
            number={3}
            question="K8s 如何实现配置热更新？"
            answer={"配置热更新方案：\n\n1. ConfigMap 更新\n   ```bash\n   kubectl create configmap app-config \\\n     --from-file=config.yml --dry-run=client -o yaml | kubectl apply -f -\n   ```\n\n2. 挂载为文件（自动更新）\n   ```yaml\n   volumeMounts:\n   - name: config\n     mountPath: /etc/config\n   ```\n\n3. 环境变量（需重启 Pod）\n   - 更新 Deployment 触发滚动更新\n\n4. Nacos 配置中心（推荐）\n   - 动态配置，无需重启\n   - 配置版本管理\n   - 灰度发布支持\n\n【最佳实践】\n- 静态配置：ConfigMap\n- 敏感信息：Secret\n- 动态配置：Nacos/Apollo"}
            isOpen={openFaq === 3}
            onClick={() => toggleFaq(3)}
          />
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">下一步学习</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <a href="/cicd" className="block bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-200 rounded-lg p-6 hover:shadow-lg transition">
            <h3 className="text-xl font-bold text-blue-900 mb-2">🚀 CI/CD 流水线</h3>
            <p className="text-gray-700 text-sm">GitLab CI + ArgoCD 实现自动化部署</p>
          </a>
          <a href="/monitoring" className="block bg-gradient-to-br from-purple-50 to-purple-100 border-2 border-purple-200 rounded-lg p-6 hover:shadow-lg transition">
            <h3 className="text-xl font-bold text-purple-900 mb-2">📊 监控告警</h3>
            <p className="text-gray-700 text-sm">Prometheus + Grafana 全链路监控</p>
          </a>
        </div>
      </section>
    </div>
  );
};
