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
            <span className="px-3 py-1 bg-white/20 rounded-full">⏱️ 约120分钟</span>
            <span className="px-3 py-1 bg-white/20 rounded-full">📚 18个知识点</span>
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
        <h2 className="text-3xl font-bold text-gray-900 mb-6">8. Helm Charts 管理</h2>

        <div className="bg-white border-2 border-slate-200 rounded-lg p-6 mb-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">什么是 Helm?</h3>
          <p className="text-gray-700 mb-4">
            Helm 是 K8s 的包管理器，类似于 Linux 的 yum/apt。通过 Helm Chart 可以打包、版本化和部署复杂的应用。
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-green-50 border border-green-200 rounded p-4">
              <h4 className="font-bold text-green-900 mb-2">✅ Helm 优势</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• 一键部署复杂应用</li>
                <li>• 版本管理与回滚</li>
                <li>• 参数化配置（values.yaml）</li>
                <li>• Chart 共享与复用</li>
                <li>• 生态丰富（官方仓库）</li>
              </ul>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded p-4">
              <h4 className="font-bold text-blue-900 mb-2">📦 Chart 结构</h4>
              <pre className="text-xs text-gray-700">
{`my-app/
├── Chart.yaml          # Chart 元数据
├── values.yaml         # 默认配置值
├── values-dev.yaml     # 开发环境配置
├── values-prod.yaml    # 生产环境配置
├── templates/          # K8s 资源模板
│   ├── deployment.yaml
│   ├── service.yaml
│   ├── ingress.yaml
│   ├── configmap.yaml
│   └── _helpers.tpl    # 模板助手
└── README.md           # 使用文档`}
              </pre>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white border-2 border-slate-200 rounded-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Chart.yaml（元数据）</h3>
            <CodeBlock
              language="yaml"
              code={`apiVersion: v2
name: order-service
description: A Helm chart for Spring Cloud Alibaba Order Service
type: application
version: 1.0.0        # Chart 版本
appVersion: "1.0.0"   # 应用版本
keywords:
  - spring-cloud
  - microservices
  - e-commerce
maintainers:
  - name: DevOps Team
    email: devops@example.com
icon: https://example.com/icon.png`}
            />
          </div>

          <div className="bg-white border-2 border-slate-200 rounded-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">values.yaml（可配置参数）</h3>
            <CodeBlock
              language="yaml"
              code={`# 全局配置
global:
  namespace: production
  imageRegistry: harbor.example.com

# 镜像配置
image:
  repository: prod/order-service
  tag: "1.0.0"
  pullPolicy: IfNotPresent

# 副本数
replicaCount: 3

# 服务配置
service:
  type: ClusterIP
  port: 80
  targetPort: 8080
  annotations: {}

# Ingress 配置
ingress:
  enabled: true
  className: nginx
  hosts:
    - host: api.example.com
      paths:
        - path: /api/orders
          pathType: Prefix
  tls:
    - secretName: api-tls
      hosts:
        - api.example.com

# 资源配置
resources:
  requests:
    memory: "512Mi"
    cpu: "500m"
  limits:
    memory: "1Gi"
    cpu: "1000m"

# HPA 配置
autoscaling:
  enabled: true
  minReplicas: 3
  maxReplicas: 10
  targetCPUUtilizationPercentage: 70
  targetMemoryUtilizationPercentage: 80

# 环境变量
env:
  - name: SPRING_PROFILES_ACTIVE
    value: "prod"
  - name: NACOS_SERVER_ADDR
    value: "nacos-service:8848"

# 健康检查
livenessProbe:
  httpGet:
    path: /actuator/health/liveness
    port: 8080
  initialDelaySeconds: 60
  periodSeconds: 10

readinessProbe:
  httpGet:
    path: /actuator/health/readiness
    port: 8080
  initialDelaySeconds: 30
  periodSeconds: 5

# Pod 亲和性
podAntiAffinity:
  enabled: true

# Node 选择器
nodeSelector: {}
#  example: disktype: ssd

# 容忍度
tolerations: []

# 服务账户
serviceAccount:
  create: true
  name: ""`}
            />
          </div>

          <div className="bg-white border-2 border-slate-200 rounded-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">templates/deployment.yaml（模板）</h3>
            <CodeBlock
              language="yaml"
              code={`apiVersion: apps/v1
kind: Deployment
metadata:
  name: {{ include "order-service.fullname" . }}
  labels:
    {{- include "order-service.labels" . | nindent 4 }}
spec:
  {{- if not .Values.autoscaling.enabled }}
  replicas: {{ .Values.replicaCount }}
  {{- end }}
  selector:
    matchLabels:
      {{- include "order-service.selectorLabels" . | nindent 6 }}
  template:
    metadata:
      labels:
        {{- include "order-service.selectorLabels" . | nindent 8 }}
    spec:
      containers:
      - name: {{ .Chart.Name }}
        image: "{{ .Values.global.imageRegistry }}/{{ .Values.image.repository }}:{{ .Values.image.tag | default .Chart.AppVersion }}"
        imagePullPolicy: {{ .Values.image.pullPolicy }}
        ports:
        - name: http
          containerPort: {{ .Values.service.targetPort }}
          protocol: TCP

        env:
        {{- range .Values.env }}
        - name: {{ .name }}
          value: {{ .value | quote }}
        {{- end }}

        resources:
          {{- toYaml .Values.resources | nindent 12 }}

        livenessProbe:
          {{- toYaml .Values.livenessProbe | nindent 12 }}

        readinessProbe:
          {{- toYaml .Values.readinessProbe | nindent 12 }}

      {{- with .Values.nodeSelector }}
      nodeSelector:
        {{- toYaml . | nindent 8 }}
      {{- end }}
      {{- with .Values.affinity }}
      affinity:
        {{- toYaml . | nindent 8 }}
      {{- end }}
      {{- with .Values.tolerations }}
      tolerations:
        {{- toYaml . | nindent 8 }}
      {{- end }}`}
            />
          </div>

          <div className="bg-white border-2 border-slate-200 rounded-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Helm 常用命令</h3>
            <CodeBlock
              language="bash"
              code={`# 安装 Helm
# macOS
brew install helm
# Linux
curl https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3 | bash

# 添加仓库
helm repo add bitnami https://charts.bitnami.com/bitnami
helm repo update

# 搜索 Chart
helm search repo mysql

# 部署应用
helm install my-order ./order-service
helm install my-order ./order-service -f values-prod.yaml
helm install my-order ./order-service --set image.tag=1.0.0

# 列出已安装
helm list
helm status my-order

# 升级应用
helm upgrade my-order ./order-service
helm upgrade my-order ./order-service --set replicaCount=5

# 回滚版本
helm rollback my-order
helm rollback my-order 2  # 回滚到版本2

# 卸载应用
helm uninstall my-order

# 调试模板
helm template my-order ./order-service
helm lint ./order-service

# 导出 YAML
helm get manifest my-order > deployment.yaml`}
            />
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">9. 资源调优策略</h2>

        <div className="space-y-6">
          <div className="bg-white border-2 border-slate-200 rounded-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">CPU/内存 Requests 与 Limits</h3>
            <CodeBlock
              language="yaml"
              code={`resources:
  requests:
    memory: "512Mi"   # 保证最小内存
    cpu: "500m"       # 保证最小 CPU（0.5核）
  limits:
    memory: "1Gi"     # 内存上限（超限会被 OOM Kill）
    cpu: "1000m"      # CPU 上限（超限会被限流）

# CPU 单位说明
# 100m = 0.1 CPU = 100 millicores
# 500m = 0.5 CPU
# 1000m = 1 CPU
# 2000m = 2 CPU

# 内存单位说明
# 1Gi = 1024Mi (2的幂次方，推荐)
# 1G  = 1000M (10的幂次方)
# 512Mi
# 1Gi`}
            />
            <div className="mt-4 bg-blue-50 border border-blue-200 rounded p-4">
              <h4 className="font-bold text-blue-900 mb-2">💡 调优建议</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• <strong>Requests = 峰值的 70-80%</strong>：保证正常运行，预留弹性空间</li>
                <li>• <strong>Limits = Requests 的 1.5-2 倍</strong>：允许突发流量，防止限流</li>
                <li>• <strong>CPU 可超售</strong>：CPU 是可压缩资源，设置低于实际容量</li>
                <li>• <strong>内存不可超售</strong>：内存不可压缩，超限会被强制杀死</li>
                <li>• <strong>监控调整</strong>：使用 kubectl top pods 监控实际使用</li>
              </ul>
            </div>
          </div>

          <div className="bg-white border-2 border-slate-200 rounded-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">JVM 内存调优（Java 应用）</h3>
            <CodeBlock
              language="yaml"
              code={`# 容器内存限制：1Gi
# JVM 最大堆：800Mi（留 200Mi 给 OS 和 JVM 元空间）

containers:
- name: order-service
  image: harbor.example.com/prod/order-service:1.0.0
  resources:
    requests:
      memory: "512Mi"
    limits:
      memory: "1Gi"
  env:
  - name: JAVA_OPTS
    value: >
      -Xms512m
      -Xmx800m
      -XX:MaxMetaspaceSize=128m
      -XX:ReservedCodeCacheSize=128m
      -XX:+UseG1GC
      -XX:MaxGCPauseMillis=100
      -XX:+HeapDumpOnOutOfMemoryError
      -XX:HeapDumpPath=/logs/heapdump.hprof

# 内存分配说明
# 总内存 1Gi = 1024Mi
# ├─ JVM Heap: 800Mi (78%)
# ├─ Metaspace: 128Mi (12.5%)
# ├─ Code Cache: 128Mi (12.5%)
# └─ OS + 其他: 预留 -XX:MaxRAMPercentage=75.0

# 推荐：使用 -XX:MaxRAMPercentage 自动计算
env:
- name: JAVA_OPTS
  value: >
    -XX:+UseContainerSupport
    -XX:MaxRAMPercentage=75.0
    -XX:InitialRAMPercentage=50.0
    -XX:+UseG1GC`}
            />
          </div>

          <div className="bg-white border-2 border-slate-200 rounded-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Pod 亲和性与反亲和性</h3>
            <CodeBlock
              language="yaml"
              code={`# Pod 反亲和性（分散到不同节点）
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
            - order-service
        topologyKey: kubernetes.io/hostname

# 硬反亲和性（必须分散）
affinity:
  podAntiAffinity:
    requiredDuringSchedulingIgnoredDuringExecution:
    - labelSelector:
        matchExpressions:
        - key: app
          operator: In
          values:
          - order-service
      topologyKey: kubernetes.io/hostname

# Node 亲和性（选择特定节点）
affinity:
  nodeAffinity:
    requiredDuringSchedulingIgnoredDuringExecution:
      nodeSelectorTerms:
      - matchExpressions:
        - key: disktype
          operator: In
          values:
          - ssd
    preferredDuringSchedulingIgnoredDuringExecution:
    - weight: 100
      preference:
        matchExpressions:
        - key: zone
          operator: In
          values:
          - cn-beijing

# 使用场景
# 反亲和性：高可用部署，避免单点故障
# 亲和性：性能优化，就近访问（同区域、同节点）`}
            />
          </div>

          <div className="bg-white border-2 border-slate-200 rounded-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">资源配额与限制范围</h3>
            <CodeBlock
              language="yaml"
              code={`# 1. ResourceQuota（命名空间资源配额）
apiVersion: v1
kind: ResourceQuota
metadata:
  name: compute-quota
  namespace: production
spec:
  hard:
    requests.cpu: "10"
    requests.memory: 20Gi
    limits.cpu: "20"
    limits.memory: 40Gi
    persistentvolumeclaims: "5"

# 2. LimitRange（Pod/容器资源限制）
apiVersion: v1
kind: LimitRange
metadata:
  name: resource-limits
  namespace: production
spec:
  limits:
  - default:        # 默认 limits
      memory: "1Gi"
      cpu: "1000m"
    defaultRequest: # 默认 requests
      memory: "512Mi"
      cpu: "500m"
    type: Container
  - max:            # Pod 最大 limits
      memory: "8Gi"
      cpu: "4000m"
    min:            # Pod 最小 requests
      memory: "128Mi"
      cpu: "100m"
    type: Pod

# 3. Pod Priority（Pod 优先级）
apiVersion: scheduling.k8s.io/v1
kind: PriorityClass
metadata:
  name: high-priority
value: 1000
globalDefault: false
description: "高优先级 Pod"

# 使用优先级
spec:
  priorityClassName: high-priority`}
            />
            <div className="mt-4 bg-green-50 border border-green-200 rounded p-4">
              <h4 className="font-bold text-green-900 mb-2">✅ 最佳实践</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• 为每个命名空间设置 ResourceQuota，防止资源耗尽</li>
                <li>• 使用 LimitRange 设置默认值，避免遗漏 requests/limits</li>
                <li>• 生产环境 Pod 设置 PriorityClass，确保核心服务优先调度</li>
                <li>• 监控资源使用率：kubectl top nodes / kubectl top pods</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">10. 多集群管理</h2>

        <div className="space-y-6">
          <div className="bg-white border-2 border-slate-200 rounded-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">多集群架构模式</h3>
            <CodeBlock
              language="bash"
              code={`# 多集群部署场景
# 场景1: 多地域容灾
# ├─ 集群 A: 北京 (主集群)
# ├─ 集群 B: 上海 (备集群)
# └─ 集群 C: 深圳 (备集群)
# DNS 流量调度: 基于地域就近访问

# 场景2: 多环境隔离
# ├─ 集群 Dev: 开发环境
# ├─ 集群 Test: 测试环境
# ├─ 集群 Staging: 预发环境
# └─ 集群 Prod: 生产环境

# 场景3: 多租户隔离
# ├─ 集群 A: 租户 A
# ├─ 集群 B: 租户 B
# └─ 集群 C: 租户 C

# 场景4: 混合云部署
# ├─ 集群 A: 阿里云 ACK
# ├─ 集群 B: 腾讯云 TKE
# └─ 集群 C: 自建 K8s (IDC)

# 场景5: 边缘计算
# ├─ 集群 Center: 中心集群 (管理面)
# ├─ 集群 Edge-1: 边缘节点 1
# ├─ 集群 Edge-2: 边缘节点 2
# └─ 集群 Edge-N: 边缘节点 N`}
            />
          </div>

          <div className="bg-white border-2 border-slate-200 rounded-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">kubectl 多集群配置</h3>
            <CodeBlock
              language="bash"
              code={`# 1. 查看当前配置
kubectl config current-context
kubectl config view

# 2. 添加多个集群上下文
kubectl config set-cluster cluster-beijing \\
  --server=https://beijing.k8s.example.com \\
  --certificate-authority=/path/to/ca.pem

kubectl config set-credentials admin-beijing \\
  --client-certificate=/path/to/admin.pem \\
  --client-key=/path/to/admin-key.pem

kubectl config set-context context-beijing \\
  --cluster=cluster-beijing \\
  --user=admin-beijing \\
  --namespace=production

# 3. 切换集群
kubectl config use-context context-beijing
kubectl config use-context context-shanghai

# 4. 简化切换（别名）
alias k8s-beijing='kubectl config use-context context-beijing'
alias k8s-shanghai='kubectl config use-context context-shanghai'
alias k='kubectl'

# 5. 同时操作多集群
# 使用 kubectlctx 工具
# macOS
brew install kctx
# 切换上下文
kctx context-beijing

# 使用 kubens 切换命名空间
kubens production`}
            />
          </div>

          <div className="bg-white border-2 border-slate-200 rounded-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">多集群部署工具</h3>
            <CodeBlock
              language="bash"
              code={`# 方案1: Helm + 多环境 values.yaml
# 目录结构
helm/order-service/
├── Chart.yaml
├── values.yaml           # 默认配置
├── values-beijing.yaml   # 北京集群配置
├── values-shanghai.yaml  # 上海集群配置
└── templates/

# 部署到不同集群
k8s-beijing
helm install order-service ./helm/order-service -f values-beijing.yaml

k8s-shanghai
helm install order-service ./helm/order-service -f values-shanghai.yaml

# 方案2: ArgoCD (GitOps)
# ApplicationSet 多集群部署
apiVersion: argoproj.io/v1alpha1
kind: ApplicationSet
metadata:
  name: order-service-multi-cluster
spec:
  generators:
  - clusters: # 自动发现所有集群
      selector:
        matchLabels:
          env: production
  template:
    metadata:
      name: '{{name}}-order-service'
    spec:
      project: default
      source:
        repoURL: https://github.com/example/helm-charts
        targetRevision: main
        helm:
          valueFiles:
          - values-{{metadata.labels.region}}.yaml
      destination:
        server: '{{server}}'
        namespace: production

# 方案3: Rancher（统一管理界面）
# - 可视化多集群管理
# - 集群模板
# - 统一 RBAC
# - 应用商店

# 方案4: OCI Helm Chart（推荐）
# 推送 Chart 到 OCI 仓库（Harbor/阿里云）
helm push order-service oci://harbor.example.com/chartrepo/prod

# 在不同集群拉取部署
helm pull oci://harbor.example.com/chartrepo/prod/order-service
helm install order-service ./order-service`}
            />
          </div>

          <div className="bg-white border-2 border-slate-200 rounded-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">跨集群服务发现</h3>
            <CodeBlock
              language="yaml"
              code={`# 方案1: ExternalName Service
apiVersion: v1
kind: Service
metadata:
  name: shanghai-order-service
  namespace: production
spec:
  type: ExternalName
  externalName: shanghai-order-service.production.svc.cluster.local
  sessionAffinity: None

# 方案2: Istio Multi-Cluster（推荐）
# 1. 全局控制平面
# 2. 多网络单集群 Istio 安装
# 3. 跨集群流量路由
apiVersion: networking.istio.io/v1beta1
kind: VirtualService
metadata:
  name: order-service-multi-cluster
spec:
  hosts:
  - order-service.production.svc.cluster.local
  http:
  - match:
    - headers:
        region:
          exact: beijing
    route:
    - destination:
        host: order-service
        subset: beijing
  - route:
    - destination:
        host: order-service
        subset: shanghai
      weight: 50
    - destination:
        host: order-service
        subset: beijing
      weight: 50

# 方案3: DNS 全局负载均衡
apiVersion: v1
kind: Service
metadata:
  name: order-service-global
  annotations:
    external-dns.alpha.kubernetes.io/hostname: order-global.example.com
spec:
  type: LoadBalancer
  externalTrafficPolicy: Local
  ports:
  - port: 80
    targetPort: 8080

# 方案4: 服务网格联邦
# - Linkerd Multi-Cluster
# - Consul Multi-Cluster Federation`}
            />
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">11. 生产环境完整部署案例</h2>

        <div className="bg-white border-2 border-slate-200 rounded-lg p-6 mb-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">电商系统 K8s 生产部署</h3>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
            <h4 className="font-bold text-blue-900 mb-2">📋 架构说明</h4>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• <strong>7个微服务</strong>：Gateway、User、Product、Order、Payment、Cart、Coupon</li>
              <li>• <strong>基础设施</strong>：Nacos（3节点）、MySQL（主从）、Redis（Cluster）、RocketMQ</li>
              <li>• <strong>可观测性</strong>：Prometheus + Grafana + ELK + SkyWalking</li>
              <li>• <strong>高可用</strong>：所有服务 {'>='} 3 副本，HPA 自动扩缩容</li>
              <li>• <strong>安全</strong>：TLS 证书、Secret 加密、NetworkPolicy 隔离</li>
            </ul>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white border-2 border-slate-200 rounded-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">1. 命名空间与资源配额</h3>
            <CodeBlock
              language="yaml"
              code={`---
# 1. 创建命名空间
apiVersion: v1
kind: Namespace
metadata:
  name: production
  labels:
    env: production
    team: backend

---
# 2. 资源配额
apiVersion: v1
kind: ResourceQuota
metadata:
  name: production-quota
  namespace: production
spec:
  hard:
    requests.cpu: "50"
    requests.memory: 100Gi
    limits.cpu: "100"
    limits.memory: 200Gi
    persistentvolumeclaims: "20"
    services.loadbalancers: "5"
    services.nodeports: "10"

---
# 3. LimitRange
apiVersion: v1
kind: LimitRange
metadata:
  name: production-limits
  namespace: production
spec:
  limits:
  - default:
      cpu: "1000m"
      memory: "1Gi"
    defaultRequest:
      cpu: "500m"
      memory: "512Mi"
    type: Container`}
            />
          </div>

          <div className="bg-white border-2 border-slate-200 rounded-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">2. Nacos 集群部署</h3>
            <CodeBlock
              language="yaml"
              code={`---
apiVersion: apps/v1
kind: StatefulSet
metadata:
  name: nacos
  namespace: production
spec:
  serviceName: nacos-headless
  replicas: 3
  selector:
    matchLabels:
      app: nacos
  template:
    metadata:
      labels:
        app: nacos
    spec:
      containers:
      - name: nacos
        image: nacos/nacos-server:v2.2.3
        ports:
        - containerPort: 8848
          name: client
        - containerPort: 9848
          name: raft-rpc
        - containerPort: 9849
          name: raft-raft
        env:
        - name: MODE
          value: "cluster"
        - name: NACOS_SERVERS
          value: "nacos-0.nacos-headless.production.svc.cluster.local:8848 nacos-1.nacos-headless.production.svc.cluster.local:8848 nacos-2.nacos-headless.production.svc.cluster.local:8848"
        - name: MYSQL_SERVICE_HOST
          value: "mysql-service"
        - name: MYSQL_SERVICE_DB_NAME
          value: "nacos_config"
        - name: MYSQL_SERVICE_USER
          value: "nacos"
        - name: MYSQL_SERVICE_PASSWORD
          valueFrom:
            secretKeyRef:
              name: nacos-secret
              key: mysql-password
        - name: SPRING_DATASOURCE_PLATFORM
          value: "mysql"
        - name: NACOS_AUTH_ENABLE
          value: "true"
        - name: NACOS_AUTH_TOKEN
          valueFrom:
            secretKeyRef:
              name: nacos-secret
              key: auth-token
        - name: JVM_XMS
          value: "1g"
        - name: JVM_XMX
          value: "1g"
        resources:
          requests:
            memory: "1Gi"
            cpu: "500m"
          limits:
            memory: "2Gi"
            cpu: "1000m"
        volumeMounts:
        - name: data
          mountPath: /home/nacos/data
        livenessProbe:
          httpGet:
            path: /nacos/v1/console/health/readiness
            port: 8848
          initialDelaySeconds: 60
          periodSeconds: 10
        readinessProbe:
          httpGet:
            path: /nacos/v1/console/health/readiness
            port: 8848
          initialDelaySeconds: 30
          periodSeconds: 5
  volumeClaimTemplates:
  - metadata:
      name: data
    spec:
      accessModes: [ "ReadWriteOnce" ]
      storageClassName: "fast-ssd"
      resources:
        requests:
          storage: 10Gi

---
apiVersion: v1
kind: Service
metadata:
  name: nacos-service
  namespace: production
spec:
  selector:
    app: nacos
  ports:
  - port: 8848
    targetPort: 8848
    name: client
  type: ClusterIP

---
apiVersion: v1
kind: Service
metadata:
  name: nacos-headless
  namespace: production
spec:
  clusterIP: None
  selector:
    app: nacos
  ports:
  - port: 8848
    targetPort: 8848
    name: client
  - port: 9848
    targetPort: 9848
    name: raft-rpc`}
            />
          </div>

          <div className="bg-white border-2 border-slate-200 rounded-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">3. 微服务部署示例（Order Service）</h3>
            <CodeBlock
              language="yaml"
              code={`---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: order-service
  namespace: production
  labels:
    app: order-service
    version: v1
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
      annotations:
        prometheus.io/scrape: "true"
        prometheus.io/port: "8080"
        prometheus.io/path: "/actuator/prometheus"
    spec:
      serviceAccountName: order-service
      securityContext:
        runAsNonRoot: true
        runAsUser: 1000
        fsGroup: 1000
      initContainers:
      - name: wait-nacos
        image: busybox:1.35
        command: ['sh', '-c', 'until nc -z nacos-service 8848; do echo waiting for nacos; sleep 2; done;']
      containers:
      - name: order-service
        image: harbor.example.com/prod/order-service:1.0.0
        imagePullPolicy: Always
        ports:
        - name: http
          containerPort: 8080
          protocol: TCP
        env:
        - name: SPRING_PROFILES_ACTIVE
          value: "prod"
        - name: NACOS_SERVER_ADDR
          value: "nacos-service:8848"
        - name: NACOS_NAMESPACE
          value: "production"
        - name: NACOS_GROUP
          value: "PROD_GROUP"
        - name: MYSQL_HOST
          value: "mysql-service"
        - name: MYSQL_PORT
          value: "3306"
        - name: MYSQL_DATABASE
          value: "order_db"
        - name: REDIS_HOST
          value: "redis-service"
        - name: REDIS_PORT
          value: "6379"
        - name: ROCKETMQ_NAME_SERVER
          value: "rocketmq-service:9876"
        - name: SKYWALKING_SERVICE_NAME
          value: "order-service"
        - name: SKYWALKING_AGENT_BACKEND_SERVICE
          value: "skywalking-oap:11800"
        - name: JAVA_OPTS
          value: >
            -Xms512m
            -Xmx800m
            -XX:MaxRAMPercentage=75.0
            -XX:+UseG1GC
            -XX:MaxGCPauseMillis=100
            -XX:+HeapDumpOnOutOfMemoryError
            -XX:HeapDumpPath=/logs/heapdump.hprof
            -Djava.security.egd=file:/dev/./urandom
        - name: TZ
          value: "Asia/Shanghai"
        resources:
          requests:
            memory: "512Mi"
            cpu: "500m"
          limits:
            memory: "1Gi"
            cpu: "1000m"
        volumeMounts:
        - name: logs
          mountPath: /logs
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
              command: ["sh", "-c", "sleep 15"]
      volumes:
      - name: logs
        emptyDir: {}
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
                  - order-service
              topologyKey: kubernetes.io/hostname

---
apiVersion: v1
kind: Service
metadata:
  name: order-service
  namespace: production
  labels:
    app: order-service
spec:
  selector:
    app: order-service
  ports:
  - name: http
    protocol: TCP
    port: 80
    targetPort: 8080
  type: ClusterIP
  sessionAffinity: ClientIP
  sessionAffinityConfig:
    clientIP:
      timeoutSeconds: 10800

---
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: order-service-hpa
  namespace: production
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
        periodSeconds: 30`}
            />
          </div>

          <div className="bg-white border-2 border-slate-200 rounded-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">4. Gateway Ingress 配置</h3>
            <CodeBlock
              language="yaml"
              code={`---
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: api-gateway
  namespace: production
  annotations:
    nginx.ingress.kubernetes.io/rewrite-target: /
    nginx.ingress.kubernetes.io/ssl-redirect: "true"
    nginx.ingress.kubernetes.io/force-ssl-redirect: "true"
    nginx.ingress.kubernetes.io/backend-protocol: "HTTP"
    nginx.ingress.kubernetes.io/proxy-body-size: "100m"
    nginx.ingress.kubernetes.io/proxy-connect-timeout: "60"
    nginx.ingress.kubernetes.io/proxy-send-timeout: "60"
    nginx.ingress.kubernetes.io/proxy-read-timeout: "60"
    nginx.ingress.kubernetes.io/rate-limit: "100"
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
      - path: /api/users
        pathType: Prefix
        backend:
          service:
            name: user-service
            port:
              number: 80
      - path: /api/products
        pathType: Prefix
        backend:
          service:
            name: product-service
            port:
              number: 80
      - path: /api/orders
        pathType: Prefix
        backend:
          service:
            name: order-service
            port:
              number: 80
      - path: /api/payments
        pathType: Prefix
        backend:
          service:
            name: payment-service
            port:
              number: 80

---
# Ingress Controller（如果未安装）
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-ingress-controller
  namespace: ingress-nginx
spec:
  replicas: 2
  selector:
    matchLabels:
      app: nginx-ingress
  template:
    metadata:
      labels:
        app: nginx-ingress
    spec:
      serviceAccountName: nginx-ingress-serviceaccount
      containers:
      - name: nginx-ingress-controller
        image: registry.k8s.io/ingress-nginx/controller:v1.8.1
        args:
          - /nginx-ingress-controller
          - --publish-service=$(POD_NAMESPACE)/ingress-nginx
          - --election-id=ingress-controller-leader
          - --watch-ingress-without-class=true
        env:
        - name: POD_NAME
          valueFrom:
            fieldRef:
              fieldPath: metadata.name
        - name: POD_NAMESPACE
          valueFrom:
            fieldRef:
              fieldPath: metadata.namespace
        ports:
        - name: http
          containerPort: 80
        - name: https
          containerPort: 443
        livenessProbe:
          httpGet:
            path: /healthz
            port: 10254
          initialDelaySeconds: 10
        readinessProbe:
          httpGet:
            path: /healthz
            port: 10254
          initialDelaySeconds: 10

---
apiVersion: v1
kind: Service
metadata:
  name: ingress-nginx
  namespace: ingress-nginx
spec:
  type: LoadBalancer
  externalTrafficPolicy: Local
  ports:
  - name: http
    port: 80
    targetPort: 80
  - name: https
    port: 443
    targetPort: 443
  selector:
    app: nginx-ingress`}
            />
          </div>

          <div className="bg-white border-2 border-slate-200 rounded-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">5. 监控与告警配置</h3>
            <CodeBlock
              language="yaml"
              code={`---
# Prometheus ServiceMonitor
apiVersion: monitoring.coreos.com/v1
kind: ServiceMonitor
metadata:
  name: order-service-sm
  namespace: production
  labels:
    app: order-service
spec:
  selector:
    matchLabels:
      app: order-service
  endpoints:
  - port: http
    path: /actuator/prometheus
    interval: 30s
    scrapeTimeout: 10s

---
# PodDisruptionBudget（PDB）
apiVersion: policy/v1
kind: PodDisruptionBudget
metadata:
  name: order-service-pdb
  namespace: production
spec:
  minAvailable: 2
  selector:
    matchLabels:
      app: order-service

---
# ConfigMap（应用配置）
apiVersion: v1
kind: ConfigMap
metadata:
  name: order-service-config
  namespace: production
data:
  application.yml: |
    spring:
      application:
        name: order-service
      cloud:
        nacos:
          server-addr: nacos-service:8848
          config:
            namespace: production
            group: PROD_GROUP
            file-extension: yml
          discovery:
            namespace: production
            group: PROD_GROUP
            metadata:
              management.context-path: /actuator
      datasource:
        driver-class-name: com.mysql.cj.jdbc.Driver
        url: jdbc:mysql://mysql-service:3306/order_db?useUnicode=true&characterEncoding=utf8&useSSL=false&serverTimezone=Asia/Shanghai
        username: order_user
        hikari:
          minimum-idle: 5
          maximum-pool-size: 20
          connection-timeout: 30000
          idle-timeout: 600000
          max-lifetime: 1800000
      redis:
        host: redis-service
        port: 6379
        database: 0
        timeout: 3000
        lettuce:
          pool:
            max-active: 20
            max-idle: 10
            min-idle: 5
      rocketmq:
        name-server: rocketmq-service:9876
        producer:
          group: order-producer-group
          send-message-timeout: 3000
          retry-times-when-send-failed: 2

    management:
      endpoints:
        web:
          exposure:
            include: health,info,prometheus,metrics
      endpoint:
        health:
          probes:
            enabled: true
          show-details: always
      metrics:
        export:
          prometheus:
            enabled: true
        tags:
          application: \${spring.application.name}

    logging:
      level:
        root: INFO
        com.example.order: DEBUG
      pattern:
        console: "%d{yyyy-MM-dd HH:mm:ss} [%thread] %-5level [trace-id: %X{traceId}] %logger{36} - %msg%n"
      file:
        name: /logs/order-service.log

---
# Secret（敏感信息）
apiVersion: v1
kind: Secret
metadata:
  name: order-service-secret
  namespace: production
type: Opaque
stringData:
  mysql-password: "SecurePassword123!"
  redis-password: "RedisSecurePassword456!"
  jwt-secret: "JwtSecretKey789!"
  rocketmq-access-key: "RocketMQAccessKey"
  rocketmq-secret-key: "RocketMQSecretKey"

---
# ServiceAccount（RBAC）
apiVersion: v1
kind: ServiceAccount
metadata:
  name: order-service
  namespace: production

---
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  name: order-service-role
  namespace: production
rules:
- apiGroups: [""]
  resources: ["configmaps", "secrets"]
  verbs: ["get", "list"]

---
apiVersion: rbac.authorization.k8s.io/v1
kind: RoleBinding
metadata:
  name: order-service-rolebinding
  namespace: production
subjects:
- kind: ServiceAccount
  name: order-service
  namespace: production
roleRef:
  kind: Role
  name: order-service-role
  apiGroup: rbac.authorization.k8s.io`}
            />
          </div>

          <div className="bg-green-50 border-2 border-green-200 rounded-lg p-6">
            <h3 className="text-xl font-bold text-green-900 mb-4">✅ 部署检查清单</h3>
            <CodeBlock
              language="bash"
              code={`# 1. 部署顺序检查
# [✓] 基础设施：MySQL、Redis、RocketMQ、Nacos
# [✓] 配置：ConfigMap、Secret
# [✓] 服务账户：ServiceAccount、Role、RoleBinding
# [✓] 应用：Deployment、Service
# [✓] 网关：Ingress
# [✓] 监控：ServiceMonitor、PodDisruptionBudget
# [✓] 自动扩缩容：HPA

# 2. 健康检查
kubectl get pods -n production
kubectl get svc -n production
kubectl get ingress -n production

# 3. 资源使用检查
kubectl top nodes
kubectl top pods -n production

# 4. 日志检查
kubectl logs -f deployment/order-service -n production

# 5. 扩缩容测试
kubectl autoscale deployment/order-service --min=3 --max=10 --cpu-percent=70 -n production
kubectl get hpa -n production

# 6. 故障切换测试
kubectl delete pod order-service-xxx -n production

# 7. 滚动更新测试
kubectl set image deployment/order-service order-service=harbor.example.com/prod/order-service:1.0.1 -n production
kubectl rollout status deployment/order-service -n production

# 8. 回滚测试
kubectl rollout undo deployment/order-service -n production

# 9. 监控面板
# - Prometheus: http://prometheus.example.com
# - Grafana: http://grafana.example.com
# - SkyWalking: http://skywalking.example.com
# - Nacos: http://nacos.example.com/nacos

# 10. 性能测试
# - 压测工具：JMeter、K6、Locust
# - 监控指标：QPS、响应时间、错误率
# - 自动扩缩容：观察 HPA 副本数变化`}
            />
          </div>
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
              <li>✓ readinessProbe 延迟启动</li>
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
          <FaqCard
            number={4}
            question="Helm 和 kubectl 有什么区别？什么时候用？"
            answer={"Helm vs kubectl：\n\n【kubectl】\n- 适用场景：简单应用、快速原型\n- 优点：直接、灵活、无需额外工具\n- 缺点：配置重复、版本管理困难\n\n【Helm】\n- 适用场景：复杂应用、生产环境\n- 优点：\n  • 参数化配置（values.yaml）\n  • 版本管理与回滚\n  • Chart 复用与共享\n  • 一键部署复杂应用\n- 缺点：学习曲线陡峭\n\n【选择建议】\n- 单个服务：kubectl\n- 微服务集群（5+ 服务）：Helm\n- 多环境部署：Helm + values-{env}.yaml\n- CI/CD 流水线：Helm\n\n【最佳实践】\n使用 Helm 管理应用，用 kubectl 调试和故障排查"}
            isOpen={openFaq === 4}
            onClick={() => toggleFaq(4)}
          />
          <FaqCard
            number={5}
            question="如何优化 K8s 资源配置？"
            answer={"资源优化策略：\n\n1. 设置合理的 requests/limits\n   ```yaml\n   requests:\n     memory: 峰值的70-80%\n     cpu: 峰值的70-80%\n   limits:\n     memory: requests的1.5-2倍\n     cpu: requests的1.5-2倍\n   ```\n\n2. 使用 HPA 自动扩缩容\n   - 根据CPU/内存自动调整副本数\n   - 设置合理的 min/max 副本数\n\n3. JVM 内存优化（Java 应用）\n   ```bash\n   -XX:MaxRAMPercentage=75.0  # 自动计算堆内存\n   ```\n\n4. 监控与调优\n   ```bash\n   kubectl top pods -n production\n   kubectl describe node <node-name>\n   ```\n\n5. 使用 LimitRange 设置默认值\n   - 避免遗漏 requests/limits\n\n【收益】\n- 降低成本：资源利用率提升30-50%\n- 提升稳定性：避免 OOM Kill\n- 改善性能：CPU 限流减少"}
            isOpen={openFaq === 5}
            onClick={() => toggleFaq(5)}
          />
          <FaqCard
            number={6}
            question="多集群部署如何管理？"
            answer={"多集群管理方案：\n\n1. 使用 kubectl context 切换\n   ```bash\n   kubectl config use-context context-beijing\n   kubectl config use-context context-shanghai\n   ```\n\n2. Helm 多环境部署\n   ```bash\n   # 北京集群\n   k8s-beijing\n   helm install app ./chart -f values-beijing.yaml\n   \n   # 上海集群\n   k8s-shanghai\n   helm install app ./chart -f values-shanghai.yaml\n   ```\n\n3. ArgoCD GitOps（推荐）\n   - ApplicationSet 多集群自动部署\n   - Git 统一管理配置\n   - 自动同步与漂移检测\n\n4. Rancher 可视化管理\n   - 统一管理界面\n   - 集群模板\n   - 统一 RBAC\n\n5. 跨集群服务发现\n   - ExternalName Service\n   - Istio Multi-Cluster\n   - DNS 全局负载均衡\n\n【架构选择】\n- 双集群容灾：主备模式\n- 多地域部署：多活模式\n- 多租户隔离：独立集群"}
            isOpen={openFaq === 6}
            onClick={() => toggleFaq(6)}
          />
          <FaqCard
            number={7}
            question="K8s 网络模型是什么？Service 和 Ingress 有什么区别？"
            answer={"K8s 网络模型：\n\n1. Pod 网络（扁平网络）\n   - 所有 Pod 在同一扁平网络\n   - 每个 Pod 有独立 IP\n   - Pod 之间可以直接通信\n\n2. Service（集群内部）\n   - 为 Pod 提供稳定访问入口\n   - 负载均衡到后端 Pod\n   - 类型：ClusterIP、NodePort、LoadBalancer\n   - 集群内部 DNS 解析\n\n3. Ingress（集群外部）\n   - HTTP/HTTPS 路由规则\n   - 基于 Host/Path 路由\n   - TLS/SSL 终止\n   - 流量入口管理\n\n4. NetworkPolicy（网络隔离）\n   - 控制 Pod 之间通信\n   - 白名单/黑名单模式\n\n【对比】\n- Service：L4（TCP/UDP）负载均衡\n- Ingress：L7（HTTP）路由\n- Service：集群内部\n- Ingress：集群外部\n\n【流量路径】\n外部流量 → Ingress → Service → Pod"}
            isOpen={openFaq === 7}
            onClick={() => toggleFaq(7)}
          />
          <FaqCard
            number={8}
            question="如何选择存储类型？PV/PVC/StorageClass 有什么区别？"
            answer={"K8s 存储类型：\n\n1. PV（PersistentVolume）\n   - 存储资源的抽象\n   - 独立生命周期\n   - 手动或自动创建\n\n2. PVC（PersistentVolumeClaim）\n   - 存储资源的声明\n   - Pod 通过 PVC 使用存储\n   - 绑定到 PV\n\n3. StorageClass（动态存储）\n   - 存储类别的定义\n   - 动态创建 PV\n   - 支持多种后端：本地、NFS、云存储\n\n【选择建议】\n\n| 场景 | 推荐方案 | 说明 |\n|------|---------|------|\n| 临时数据 | emptyDir | Pod 删除时数据消失 |\n| 配置文件 | ConfigMap | 配置数据注入 |\n| 日志文件 | hostPath | 本地路径挂载 |\n| 数据库 | PVC+StorageClass | 持久化存储，SSD |\n| 共享存储 | NFS/对象存储 | 多 Pod 共享 |\n\n【最佳实践】\n- 生产环境使用 StorageClass 动态创建\n- 数据库等有状态服务使用 StatefulSet + PVC\n- 日志使用 ELK/Loki，避免持久化"}
            isOpen={openFaq === 8}
            onClick={() => toggleFaq(8)}
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
