import { useState } from 'react';
import { CodeBlock } from '../components';

interface ConceptCardProps {
  title: string;
  icon: string;
  description: string;
  examples: string[];
}

const ConceptCard: React.FC<ConceptCardProps> = ({ title, icon, description, examples }) => (
  <div className="bg-white border-2 border-blue-200 rounded-lg p-5">
    <div className="flex items-center mb-3">
      <span className="text-3xl mr-3">{icon}</span>
      <h3 className="text-xl font-bold text-gray-900">{title}</h3>
    </div>
    <p className="text-gray-700 mb-3">{description}</p>
    <ul className="text-sm text-gray-600 space-y-1">
      {examples.map((example, index) => (
        <li key={index} className="flex items-start">
          <span className="text-blue-600 mr-2">•</span>
          <span>{example}</span>
        </li>
      ))}
    </ul>
  </div>
);

interface TroubleshootingCardProps {
  issue: string;
  solution: string;
  code?: string;
  language?: string;
}

const TroubleshootingCard: React.FC<TroubleshootingCardProps> = ({ issue, solution, code, language }) => (
  <div className="bg-white border-2 border-red-200 rounded-lg p-5">
    <h4 className="text-lg font-bold text-red-900 mb-2">问题: {issue}</h4>
    <p className="text-gray-700 mb-3">{solution}</p>
    {code && language && (
      <CodeBlock language={language} code={code} />
    )}
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

export const KubernetesDeploymentPage: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="bg-gradient-to-r from-purple-700 to-purple-900 text-white rounded-lg p-6 mb-8">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-4xl font-bold mb-2">Kubernetes 部署</h1>
            <p className="text-purple-100 text-lg">Spring Cloud Alibaba 应用云原生部署</p>
          </div>
          <div className="flex gap-3 text-sm">
            <span className="px-3 py-1 bg-white/20 rounded-full">☸️ 中级</span>
            <span className="px-3 py-1 bg-white/20 rounded-full">⏱️ 约90分钟</span>
            <span className="px-3 py-1 bg-white/20 rounded-full">📚 12个知识点</span>
          </div>
        </div>
      </div>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">为什么需要 Kubernetes?</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-red-50 border-2 border-red-200 rounded-lg p-5">
            <h3 className="text-xl font-bold text-red-900 mb-3">❌ Docker Swarm 局限性</h3>
            <ul className="text-gray-700 space-y-2">
              <li>• 容器编排能力有限</li>
              <li>• 缺乏自我修复能力</li>
              <li>• 自动扩缩容不成熟</li>
              <li>• 服务发现与负载均衡简单</li>
              <li>• 滚动更新与回滚不完善</li>
              <li>• 存储编排能力弱</li>
            </ul>
          </div>

          <div className="bg-green-50 border-2 border-green-200 rounded-lg p-5">
            <h3 className="text-xl font-bold text-green-900 mb-3">✅ K8s 核心优势</h3>
            <ul className="text-gray-700 space-y-2">
              <li>• 自动化部署与回滚</li>
              <li>• 服务发现与负载均衡</li>
              <li>• 自我修复（自动重启）</li>
              <li>• 水平扩缩容（HPA）</li>
              <li>• 密钥与配置管理</li>
              <li>• 存储编排自动化</li>
              <li>• 批处理执行</li>
            </ul>
          </div>
        </div>

        <div className="mt-6 bg-blue-50 border-2 border-blue-200 rounded-lg p-5">
          <h3 className="text-xl font-bold text-blue-900 mb-3">🎯 Spring Cloud + K8s 协同</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-bold text-gray-900 mb-2">Spring Cloud 负责:</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• 应用层服务发现（Nacos）</li>
                <li>• 配置管理（Nacos Config）</li>
                <li>• 限流熔断（Sentinel）</li>
                <li>• 分布式事务（Seata）</li>
                <li>• 消息驱动（RocketMQ）</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-gray-900 mb-2">Kubernetes 负责:</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• 容器编排与调度</li>
                <li>• 服务负载均衡（Service）</li>
                <li>• 自动扩缩容（HPA）</li>
                <li>• 滚动更新与回滚</li>
                <li>• 健康检查与自愈</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">K8s 架构与核心概念</h2>

        <div className="bg-white border-2 border-purple-200 rounded-lg p-6 mb-6">
          <h3 className="text-2xl font-bold text-purple-900 mb-4">K8s 集群架构</h3>

          <CodeBlock
            language="yaml"
            code={`# Kubernetes 集群架构
#
#     +------------------控制平面------------------+
#     |  API Server  →  Scheduler  →  Controller  |
#     |       ↓                ↓             ↓     |
#     |   etcd (存储)    Cloud Controller        |
#     +----------------------+-------------------+
#                           |
#         +-----------------+------------------+
#         |                 |                  |
#    +----+-----+      +----+-----+      +----+-----+
#    | Node 1   |      | Node 2   |      | Node 3   |
#    |  Kubelet |      |  Kubelet |      |  Kubelet |
#    |  Proxy   |      |  Proxy   |      |  Proxy   |
#    |  +Pod+   |      |  +Pod+   |      |  +Pod+   |
#    +----------+      +----------+      +----------+

# 核心组件说明:
# - API Server: 集群统一入口，RESTful API
# - Scheduler: 资源调度，决定 Pod 运行在哪个节点
# - Controller Manager: 维护集群状态（副本数、节点状态）
# - etcd: 键值存储，保存集群配置数据
# - Kubelet: 节点代理，管理容器生命周期
# - Kube-proxy: 网络代理，维护网络规则`}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          <ConceptCard
            title="Pod"
            icon="📦"
            description="K8s 最小部署单元，包含一个或多个容器"
            examples={[
              '共享网络命名空间',
              '共享存储卷',
              '生命周期短暂',
              '通过 Controller 管理'
            ]}
          />
          <ConceptCard
            title="Deployment"
            icon="🚀"
            description="无状态应用部署控制器"
            examples={[
              '声明式部署',
              '滚动更新',
              '自动回滚',
              '副本数管理'
            ]}
          />
          <ConceptCard
            title="Service"
            icon="🔀"
            description="服务发现与负载均衡"
            examples={[
              'ClusterIP: 集群内部访问',
              'NodePort: 节点端口访问',
              'LoadBalancer: 云厂商 LB',
              'Pod 稳定网络标识'
            ]}
          />
          <ConceptCard
            title="Ingress"
            icon="🚪"
            description="HTTP/HTTPS 路由规则"
            examples={[
              '基于域名的路由',
              'TLS/SSL 终止',
              '路径重写',
              '七层负载均衡'
            ]}
          />
          <ConceptCard
            title="ConfigMap"
            icon="⚙️"
            description="配置数据分离"
            examples={[
              '环境变量注入',
              '配置文件挂载',
              '热更新配置',
              '与 Pod 解耦'
            ]}
          />
          <ConceptCard
            title="Secret"
            icon="🔐"
            description="敏感数据管理"
            examples={[
              '密码/Base64 编码',
              'TLS 证书',
              'Docker 镜像凭证',
              'RBAC Token'
            ]}
          />
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Spring Cloud 应用 K8s 部署</h2>

        <div className="space-y-6">
          <div className="bg-white border-2 border-blue-200 rounded-lg p-6">
            <h3 className="text-2xl font-bold text-blue-900 mb-4">1. 创建 Namespace</h3>

            <CodeBlock
              language="yaml"
              code={`# namespace.yaml
apiVersion: v1
kind: Namespace
metadata:
  name: spring-cloud-alibaba
  labels:
    name: spring-cloud-alibaba
    environment: production`}
            />
          </div>

          <div className="bg-white border-2 border-green-200 rounded-lg p-6">
            <h3 className="text-2xl font-bold text-green-900 mb-4">2. ConfigMap 配置管理</h3>

            <CodeBlock
              language="yaml"
              code={`# configmap.yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: order-service-config
  namespace: spring-cloud-alibaba
data:
  # 应用配置
  application.yaml: |
    spring:
      application:
        name: order-service
      cloud:
        nacos:
          server-addr: nacos-service.spring-cloud-alibaba.svc.cluster.local:8848
          discovery:
            namespace: public
            group: DEFAULT_GROUP
          config:
            namespace: public
            group: DEFAULT_GROUP
            file-extension: yaml
      datasource:
        url: jdbc:mysql://mysql-service.spring-cloud-alibaba.svc.cluster.local:3306/order_db?useSSL=false
        username: root
        password: root
        driver-class-name: com.mysql.cj.jdbc.Driver
      redis:
        host: redis-service.spring-cloud-alibaba.svc.cluster.local
        port: 6379
        database: 0

    server:
      port: 8080

    management:
      endpoints:
        web:
          exposure:
            include: health,info,prometheus
      endpoint:
        health:
          show-details: always
      health:
        redis:
          enabled: true
        db:
          enabled: true

  # JVM 参数
  JAVA_OPTS: >-
    -Xms512m
    -Xmx512m
    -XX:+UseG1GC
    -XX:MaxGCPauseMillis=200
    -XX:+HeapDumpOnOutOfMemoryError
    -XX:HeapDumpPath=/logs/heapdump.hprof`}
            />
          </div>

          <div className="bg-white border-2 border-purple-200 rounded-lg p-6">
            <h3 className="text-2xl font-bold text-purple-900 mb-4">3. Secret 敏感信息</h3>

            <CodeBlock
              language="yaml"
              code={`# secret.yaml
apiVersion: v1
kind: Secret
metadata:
  name: order-service-secret
  namespace: spring-cloud-alibaba
type: Opaque
data:
  # Base64 编码的密码
  mysql-password: cm9vdA==  # root
  redis-password: cm9vdA==  # root
  nacos-password: bmFjb3N=  # nacos

---
# 从命令行创建 Secret
# kubectl create secret generic order-service-secret \\
#   --from-literal=mysql-password=root \\
#   --from-literal=redis-password=root \\
#   --from-literal=nacos-password=nacos \\
#   -n spring-cloud-alibaba`}
            />
          </div>

          <div className="bg-white border-2 border-orange-200 rounded-lg p-6">
            <h3 className="text-2xl font-bold text-orange-900 mb-4">4. Deployment 部署配置</h3>

            <CodeBlock
              language="yaml"
              code={`# deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: order-service
  namespace: spring-cloud-alibaba
  labels:
    app: order-service
    version: v1
spec:
  # 副本数
  replicas: 3

  # 部署策略
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxSurge: 1        # 升级过程中最多可以多出几个 Pod
      maxUnavailable: 0  # 升级过程中最多允许几个 Pod 不可用

  # 选择器
  selector:
    matchLabels:
      app: order-service

  # Pod 模板
  template:
    metadata:
      labels:
        app: order-service
        version: v1
    spec:
      # 初始化容器
      initContainers:
      - name: wait-for-nacos
        image: busybox:1.35
        command: ['sh', '-c', 'until nc -z nacos-service 8848; do echo waiting for nacos; sleep 2; done;']

      # 应用容器
      containers:
      - name: order-service
        image: registry.cn-hangzhou.aliyuncs.com/spring-cloud-alibaba/order-service:1.0.0
        imagePullPolicy: Always

        # 端口配置
        ports:
        - name: http
          containerPort: 8080
          protocol: TCP

        # 环境变量
        env:
        - name: SPRING_PROFILES_ACTIVE
          value: "prod"
        - name: JAVA_OPTS
          valueFrom:
            configMapKeyRef:
              name: order-service-config
              key: JAVA_OPTS
        - name: MYSQL_PASSWORD
          valueFrom:
            secretKeyRef:
              name: order-service-secret
              key: mysql-password

        # 挂载配置文件
        volumeMounts:
        - name: config
          mountPath: /config
        - name: logs
          mountPath: /logs

        # 资源限制
        resources:
          requests:
            memory: "512Mi"
            cpu: "250m"
          limits:
            memory: "1Gi"
            cpu: "500m"

        # 健康检查
        livenessProbe:
          httpGet:
            path: /actuator/health/liveness
            port: 8080
          initialDelaySeconds: 60
          periodSeconds: 10
          timeoutSeconds: 5
          failureThreshold: 3

        readinessProbe:
          httpGet:
            path: /actuator/health/readiness
            port: 8080
          initialDelaySeconds: 30
          periodSeconds: 5
          timeoutSeconds: 3
          failureThreshold: 3

        startupProbe:
          httpGet:
            path: /actuator/health/liveness
            port: 8080
          initialDelaySeconds: 10
          periodSeconds: 5
          timeoutSeconds: 3
          failureThreshold: 30

        # 优雅关闭
        lifecycle:
          preStop:
            exec:
              command: ["sh", "-c", "sleep 10"]

      # 数据卷
      volumes:
      - name: config
        configMap:
          name: order-service-config
      - name: logs
        emptyDir: {}

      # 优雅终止
      terminationGracePeriodSeconds: 30`}
            />
          </div>

          <div className="bg-white border-2 border-blue-200 rounded-lg p-6">
            <h3 className="text-2xl font-bold text-blue-900 mb-4">5. Service 服务暴露</h3>

            <CodeBlock
              language="yaml"
              code={`# service.yaml
apiVersion: v1
kind: Service
metadata:
  name: order-service
  namespace: spring-cloud-alibaba
  labels:
    app: order-service
spec:
  type: ClusterIP
  selector:
    app: order-service
  ports:
  - name: http
    port: 8080
    targetPort: 8080
    protocol: TCP
  sessionAffinity: ClientIP  # 会话亲和性

---
# Headless Service (用于 StatefulSet)
apiVersion: v1
kind: Service
metadata:
  name: order-service-headless
  namespace: spring-cloud-alibaba
spec:
  type: ClusterIP
  clusterIP: None  # Headless Service
  selector:
    app: order-service
  ports:
  - port: 8080
    targetPort: 8080`}
            />
          </div>

          <div className="bg-white border-2 border-green-200 rounded-lg p-6">
            <h3 className="text-2xl font-bold text-green-900 mb-4">6. HPA 自动扩缩容</h3>

            <CodeBlock
              language="yaml"
              code={`# hpa.yaml
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: order-service-hpa
  namespace: spring-cloud-alibaba
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: order-service
  minReplicas: 3
  maxReplicas: 10
  metrics:
  # CPU 指标
  - type: Resource
    resource:
      name: cpu
      target:
        type: Utilization
        averageUtilization: 70  # CPU 使用率超过 70% 扩容

  # 内存指标
  - type: Resource
    resource:
      name: memory
      target:
        type: Utilization
        averageUtilization: 80  # 内存使用率超过 80% 扩容

  # 自定义指标 (需要 Metrics Adapter)
  - type: Pods
    pods:
      metric:
        name: http_requests_per_second
      target:
        type: AverageValue
        averageValue: "1000"

  behavior:
    scaleUp:
      stabilizationWindowSeconds: 60
      policies:
      - type: Percent
        value: 50  # 每次最多扩容 50%
        periodSeconds: 60
      - type: Pods
        value: 2  # 每次最多扩容 2 个 Pod
        periodSeconds: 60
      selectPolicy: Max

    scaleDown:
      stabilizationWindowSeconds: 300  # 缩容稳定窗口 5 分钟
      policies:
      - type: Percent
        value: 10  # 每次最多缩容 10%
        periodSeconds: 60
      - type: Pods
        value: 1  # 每次最多缩容 1 个 Pod
        periodSeconds: 60
      selectPolicy: Min`}
            />
          </div>

          <div className="bg-white border-2 border-slate-200 rounded-lg p-6">
            <h3 className="text-2xl font-bold text-slate-900 mb-4">7. Ingress 路由配置</h3>

            <CodeBlock
              language="yaml"
              code={`# ingress.yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: spring-cloud-alibaba-ingress
  namespace: spring-cloud-alibaba
  annotations:
    kubernetes.io/ingress.class: "nginx"
    nginx.ingress.kubernetes.io/rewrite-target: /
    nginx.ingress.kubernetes.io/ssl-redirect: "true"
    nginx.ingress.kubernetes.io/use-regex: "true"
    # 限流配置
    nginx.ingress.kubernetes.io/limit-rps: "100"
    # 超时配置
    nginx.ingress.kubernetes.io/proxy-connect-timeout: "60"
    nginx.ingress.kubernetes.io/proxy-send-timeout: "60"
    nginx.ingress.kubernetes.io/proxy-read-timeout: "60"
spec:
  # TLS 配置
  tls:
  - hosts:
    - api.example.com
    secretName: api-tls-secret

  rules:
  # 订单服务
  - host: api.example.com
    http:
      paths:
      - path: /api/order
        pathType: Prefix
        backend:
          service:
            name: order-service
            port:
              number: 8080

      # 库存服务
      - path: /api/inventory
        pathType: Prefix
        backend:
          service:
            name: inventory-service
            port:
              number: 8080

      # 用户服务
      - path: /api/user
        pathType: Prefix
        backend:
          service:
            name: user-service
            port:
              number: 8080`}
            />
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">K8s 服务发现集成</h2>

        <div className="space-y-6">
          <div className="bg-white border-2 border-blue-200 rounded-lg p-6">
            <h3 className="text-2xl font-bold text-blue-900 mb-4">Spring Cloud K8s 服务发现集成</h3>

            <CodeBlock
              language="xml"
              code={`&lt;?xml version="1.0" encoding="UTF-8"?&gt;
&lt;project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0
         http://maven.apache.org/xsd/maven-4.0.0.xsd"&gt;
    &lt;modelVersion&gt;4.0.0&lt;/modelVersion&gt;

    &lt;parent&gt;
        &lt;groupId&gt;com.alibaba.cloud&lt;/groupId&gt;
        &lt;artifactId&gt;spring-cloud-alibaba-examples&lt;/artifactId&gt;
        &lt;version&gt;1.0.0&lt;/version&gt;
    &lt;/parent&gt;

    &lt;artifactId&gt;order-service&lt;/artifactId&gt;

    &lt;properties&gt;
        &lt;java.version&gt;17&lt;/java.version&gt;
        &lt;spring-cloud-k8s.version&gt;2023.0.1&lt;/spring-cloud-k8s.version&gt;
    &lt;/properties&gt;

    &lt;dependencies&gt;
        &lt;!-- Spring Cloud Kubernetes --&gt;
        &lt;dependency&gt;
            &lt;groupId&gt;org.springframework.cloud&lt;/groupId&gt;
            &lt;artifactId&gt;spring-cloud-starter-kubernetes-client-all&lt;/artifactId&gt;
        &lt;/dependency&gt;

        &lt;!-- Spring Cloud Kubernetes Discovery --&gt;
        &lt;dependency&gt;
            &lt;groupId&gt;org.springframework.cloud&lt;/groupId&gt;
            &lt;artifactId&gt;spring-cloud-starter-kubernetes-client-discovery&lt;/artifactId&gt;
        &lt;/dependency&gt;

        &lt;!-- Spring Cloud Kubernetes Config --&gt;
        &lt;dependency&gt;
            &lt;groupId&gt;org.springframework.cloud&lt;/groupId&gt;
            &lt;artifactId&gt;spring-cloud-starter-kubernetes-client-config&lt;/artifactId&gt;
        &lt;/dependency&gt;

        &lt;!-- Spring Cloud LoadBalancer --&gt;
        &lt;dependency&gt;
            &lt;groupId&gt;org.springframework.cloud&lt;/groupId&gt;
            &lt;artifactId&gt;spring-cloud-starter-loadbalancer&lt;/artifactId&gt;
        &lt;/dependency&gt;
    &lt;/dependencies&gt;

    &lt;dependencyManagement&gt;
        &lt;dependencies&gt;
            &lt;dependency&gt;
                &lt;groupId&gt;org.springframework.cloud&lt;/groupId&gt;
                &lt;artifactId&gt;spring-cloud-kubernetes-dependencies&lt;/artifactId&gt;
                &lt;version&gt;$\{spring-cloud-k8s.version}&lt;/version&gt;
                &lt;type&gt;pom&lt;/type&gt;
                &lt;scope&gt;import&lt;/scope&gt;
            &lt;/dependency&gt;
        &lt;/dependencies&gt;
    &lt;/dependencyManagement&gt;
&lt;/project&gt;`}
            />
          </div>

          <div className="bg-white border-2 border-green-200 rounded-lg p-6">
            <h3 className="text-2xl font-bold text-green-900 mb-4">配置文件 (application.yaml)</h3>

            <CodeBlock
              language="yaml"
              code={`spring:
  application:
    name: order-service

  # Kubernetes 服务发现配置
  cloud:
    kubernetes:
      discovery:
        enabled: true
        # 服务发现模式
        all-namespaces: false  # 是否在所有命名空间查找服务
        include-namespaces: spring-cloud-alibaba  # 指定命名空间
        # 过滤服务
        filters:
          - name: order-service
        # Service 标签过滤
        service-labels:
          app: order-service
        # Pod 标签过滤
        pod-labels:
          app: order-service
      # 配置管理
      config:
        enabled: true
        sources:
          - namespace: spring-cloud-alibaba
            name: order-service-config
      # 负载均衡
      loadbalancer:
        mode: SERVICE  # SERVICE (通过 Service) 或 POD (直接 Pod)

    # 禁用 Nacos 服务发现 (使用 K8s 原生)
    nacos:
      discovery:
        enabled: false  # 生产环境可选择只用 K8s 服务发现

    # LoadBalancer 配置
    loadbalancer:
      ribbon:
        enabled: false  # 禁用 Ribbon
      cache:
        enabled: true
        ttl: 30s  # 缓存时间
      # 负载均衡策略
      cache-capacity: 1000

server:
  port: 8080

# Actuator 健康检查
management:
  endpoints:
    web:
      exposure:
        include: health,info,k8s,prometheus
  endpoint:
    health:
      show-details: always
      probes:
        enabled: true  # 启用 K8s 探针
  health:
    # Kubernetes 健康检查
    k8s:
      enabled: true`}
            />
          </div>

          <div className="bg-white border-2 border-purple-200 rounded-lg p-6">
            <h3 className="text-2xl font-bold text-purple-900 mb-4">服务调用示例</h3>

            <CodeBlock
              language="java"
              code={`package com.example.order.service;

import org.springframework.cloud.client.discovery.ReactiveDiscoveryClient;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.util.List;

/**
 * 订单服务 - 库存服务调用
 */
@Service
public class OrderService {

    private final WebClient webClient;
    private final ReactiveDiscoveryClient discoveryClient;

    public OrderService(WebClient.Builder webClientBuilder,
                       ReactiveDiscoveryClient discoveryClient) {
        this.discoveryClient = discoveryClient;
        this.webClient = webClientBuilder.build();
    }

    /**
     * 方式1: 使用 LoadBalancer (推荐)
     * Spring Cloud LoadBalancer 会自动从 K8s Service 获取实例列表
     */
    public Mono&lt;Boolean&gt; deductInventory(Long productId, Integer quantity) {
        return webClient.get()
            .uri("http://inventory-service/api/inventory/deduct")
            .retrieve()
            .bodyToMono(Boolean.class);
    }

    /**
     * 方式2: 手动从 K8s 获取服务实例
     */
    public Mono&lt;String&gt; getServiceInstances(String serviceName) {
        return discoveryClient.getInstances(serviceName)
            .collectList()
            .map(instances -&gt; {
                StringBuilder sb = new StringBuilder();
                sb.append("Service: ").append(serviceName).append("\\n");
                for (var instance : instances) {
                    sb.append("  - ")
                      .append(instance.getHost())
                      .append(":")
                      .append(instance.getPort())
                      .append("\\n");
                    // 获取元数据
                    var metadata = instance.getMetadata();
                    sb.append("    Metadata: ").append(metadata).append("\\n");
                }
                return sb.toString();
            });
    }

    /**
     * 方式3: 直接使用 K8s Service DNS
     */
    public Mono&lt;Boolean&gt; callServiceViaDNS(Long productId, Integer quantity) {
        // K8s Service DNS 格式: &lt;service-name&gt;.&lt;namespace&gt;.svc.cluster.local
        String serviceUrl = "http://inventory-service.spring-cloud-alibaba.svc.cluster.local";

        return webClient.get()
            .uri(serviceUrl + "/api/inventory/deduct")
            .retrieve()
            .bodyToMono(Boolean.class);
    }
}`}
            />
          </div>

          <div className="bg-white border-2 border-orange-200 rounded-lg p-6">
            <h3 className="text-2xl font-bold text-orange-900 mb-4">Nacos 与 K8s 服务发现共存方案</h3>

            <CodeBlock
              language="java"
              code={`package com.example.discovery.config;

import org.springframework.cloud.client.discovery.DiscoveryClient;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;

/**
 * 混合服务发现配置
 * 同时使用 Nacos 和 K8s 服务发现
 */
@Configuration
public class HybridDiscoveryConfiguration {

    /**
     * 组合 DiscoveryClient
     * 优先从 Nacos 查找，找不到再从 K8s 查找
     */
    @Bean
    @Primary
    public DiscoveryClient hybridDiscoveryClient(
            org.springframework.cloud.alibaba.nacos.NacosDiscoveryClient nacosClient,
            org.springframework.cloud.kubernetes.client.KubernetesInformerDiscoveryClient k8sClient) {

        return new DiscoveryClient() {
            @Override
            public String description() {
                return "Hybrid Discovery Client (Nacos + K8s)";
            }

            @Override
            public org.springframework.cloud.client.ServiceInstance getLocalServiceInstance() {
                // 优先使用 Nacos
                try {
                    return nacosClient.getLocalServiceInstance();
                } catch (Exception e) {
                    return k8sClient.getLocalServiceInstance();
                }
            }

            @Override
            public List&lt;org.springframework.cloud.client.ServiceInstance&gt; getInstances(String serviceId) {
                // 先从 Nacos 查找
                try {
                    List&lt;org.springframework.cloud.client.ServiceInstance&gt; instances =
                        nacosClient.getInstances(serviceId);
                    if (!instances.isEmpty()) {
                        return instances;
                    }
                } catch (Exception ignored) {
                }

                // Nacos 找不到，再从 K8s 查找
                return k8sClient.getInstances(serviceId);
            }

            @Override
            public List&lt;String&gt; getServices() {
                // 合并两个发现源的服务列表
                List&lt;String&gt; services = new java.util.ArrayList&lt;&gt;();
                services.addAll(nacosClient.getServices());
                services.addAll(k8sClient.getServices());
                return services.stream().distinct().toList();
            }
        };
    }
}`}
            />
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">HPA 自动扩缩容实战</h2>

        <div className="space-y-6">
          <div className="bg-white border-2 border-blue-200 rounded-lg p-6">
            <h3 className="text-2xl font-bold text-blue-900 mb-4">1. 安装 Metrics Server</h3>

            <CodeBlock
              language="bash"
              code={`# 安装 Metrics Server (HPA 依赖)
kubectl apply -f https://github.com/kubernetes-sigs/metrics-server/releases/latest/download/components.yaml

# 验证安装
kubectl get pods -n kube-system -l k8s-app=metrics-server

# 查看节点资源使用
kubectl top nodes

# 查看 Pod 资源使用
kubectl top pods -n spring-cloud-alibaba`}
            />
          </div>

          <div className="bg-white border-2 border-green-200 rounded-lg p-6">
            <h3 className="text-2xl font-bold text-green-900 mb-4">2. 配置 Actuator 监控端点</h3>

            <CodeBlock
              language="xml"
              code={`&lt;!-- pom.xml --&gt;
&lt;dependency&gt;
    &lt;groupId&gt;org.springframework.boot&lt;/groupId&gt;
    &lt;artifactId&gt;spring-boot-starter-actuator&lt;/artifactId&gt;
&lt;/dependency&gt;

&lt;!-- Micrometer Prometheus 指标 --&gt;
&lt;dependency&gt;
    &lt;groupId&gt;io.micrometer&lt;/groupId&gt;
    &lt;artifactId&gt;micrometer-registry-prometheus&lt;/artifactId&gt;
&lt;/dependency&gt;`}
            />
          </div>

          <div className="bg-white border-2 border-purple-200 rounded-lg p-6">
            <h3 className="text-2xl font-bold text-purple-900 mb-4">3. 应用配置暴露指标</h3>

            <CodeBlock
              language="yaml"
              code={`# application.yaml
management:
  endpoints:
    web:
      exposure:
        include: health,info,metrics,prometheus
  metrics:
    tags:
      application: $\{spring.application.name}
    export:
      prometheus:
        enabled: true
  prometheus:
    metrics:
      export:
        enabled: true`}
            />
          </div>

          <div className="bg-white border-2 border-orange-200 rounded-lg p-6">
            <h3 className="text-2xl font-bold text-orange-900 mb-4">4. 基于自定义指标的 HPA</h3>

            <CodeBlock
              language="yaml"
              code={`# 安装 Prometheus Adapter
kubectl apply -f https://raw.githubusercontent.com/kubernetes-sigs/prometheus-adapter/master/docs/de manifest.yaml

# 配置自定义指标规则
apiVersion: v1
kind: ConfigMap
metadata:
  name: prometheus-adapter-config
  namespace: kube-system
data:
  config.yaml: |
    rules:
    - seriesQuery: 'http_server_requests_seconds_count'
      resources:
        overrides:
          namespace:
            resource: namespace
          pod:
            resource: pod
      name:
        matches: "http_server_requests_seconds_count"
        as: "http_requests_per_second"
      metricsQuery: "sum(rate(<<.Series>>{<<.LabelMatchers>>}[2m])) by (<<.GroupBy>>)"

---
# 使用自定义指标的 HPA
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: order-service-custom-hpa
  namespace: spring-cloud-alibaba
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: order-service
  minReplicas: 2
  maxReplicas: 10
  metrics:
  # 基于每秒请求数扩容
  - type: Pods
    pods:
      metric:
        name: http_requests_per_second
      target:
        type: AverageValue
        averageValue: "500"  # 每个 Pod 最多处理 500 QPS`}
            />
          </div>

          <div className="bg-white border-2 border-slate-200 rounded-lg p-6">
            <h3 className="text-2xl font-bold text-slate-900 mb-4">5. HPA 常用命令</h3>

            <CodeBlock
              language="bash"
              code={`# 创建 HPA
kubectl autoscale deployment order-service \\
  --cpu-percent=70 \\
  --min=3 \\
  --max=10 \\
  -n spring-cloud-alibaba

# 查看 HPA 状态
kubectl get hpa -n spring-cloud-alibaba

# 查看 HPA 详细信息
kubectl describe hpa order-service -n spring-cloud-alibaba

# 查看扩缩容事件
kubectl get events -n spring-cloud-alibaba --field-selector reason=SuccessfulCreate

# 测试扩容 (压测)
kubectl run -it --rm load-test --image=busybox --restart=Never -- /bin/sh
# 在容器内执行:
ab -n 10000 -c 100 http://order-service:8080/api/orders

# 监控扩缩容过程
watch kubectl get pods -n spring-cloud-alibaba

# 删除 HPA
kubectl delete hpa order-service -n spring-cloud-alibaba`}
            />
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">健康检查与探针</h2>

        <div className="space-y-6">
          <div className="bg-white border-2 border-blue-200 rounded-lg p-6">
            <h3 className="text-2xl font-bold text-blue-900 mb-4">Spring Boot 健康检查配置</h3>

            <CodeBlock
              language="yaml"
              code={`# application.yaml
management:
  endpoint:
    health:
      # 显示详细健康信息
      show-details: always
      # 组件健康指标
      probes:
        enabled: true  # 启用 K8s 探针支持

  health:
    # 默认启用所有健康指示器
    defaults:
      enabled: true

    # 自定义健康指示器
    redis:
      enabled: true
    db:
      enabled: true
    diskspace:
      enabled: true

    # Liveness 探针配置 (检测死锁)
    livenessstate:
      enabled: true

    # Readiness 探针配置 (检测就绪状态)
    readinessstate:
      enabled: true

  # 健康检查端点
  endpoints:
    web:
      exposure:
        include: health,info,liveness,readiness`}
            />
          </div>

          <div className="bg-white border-2 border-green-200 rounded-lg p-6">
            <h3 className="text-2xl font-bold text-green-900 mb-4">自定义健康指示器</h3>

            <CodeBlock
              language="java"
              code={`package com.example.order.health;

import org.springframework.boot.actuate.health.Health;
import org.springframework.boot.actuate.health.HealthIndicator;
import org.springframework.stereotype.Component;

import java.io.File;

/**
 * 磁盘空间健康检查
 */
@Component("diskSpaceHealth")
public class DiskSpaceHealthIndicator implements HealthIndicator {

    private static final long THRESHOLD = 1024 * 1024 * 1024; // 1GB

    @Override
    public Health health() {
        File diskPartition = new File("/");
        long freeSpace = diskPartition.getFreeSpace();

        if (freeSpace < THRESHOLD) {
            return Health.down()
                .withDetail("freeSpace", freeSpace)
                .withDetail("threshold", THRESHOLD)
                .withDetail("path", diskPartition.getAbsolutePath())
                .withException(new RuntimeException("磁盘空间不足"))
                .build();
        }

        return Health.up()
            .withDetail("freeSpace", freeSpace)
            .withDetail("threshold", THRESHOLD)
            .withDetail("path", diskPartition.getAbsolutePath())
            .build();
    }
}

---

package com.example.order.health;

import org.springframework.boot.actuate.health.Health;
import org.springframework.boot.actuate.health.ReadinessStateHealthIndicator;
import org.springframework.stereotype.Component;

/**
 * 自定义 Readiness 健康检查
 * 确保服务真正准备好接收流量
 */
@Component
public class CustomReadinessHealthIndicator implements ReadinessStateHealthIndicator {

    private volatile boolean ready = false;

    @Override
    public Health getHealth(boolean includeArguments) {
        if (!ready) {
            return Health.down()
                .withDetail("reason", "应用正在初始化")
                .build();
        }

        return Health.up()
            .withDetail("status", "就绪")
            .build();
    }

    @Override
    public Health health() {
        return getHealth(false);
    }

    /**
     * 应用启动完成后调用
     */
    public void setReady(boolean ready) {
        this.ready = ready;
    }
}`}
            />
          </div>

          <div className="bg-white border-2 border-purple-200 rounded-lg p-6">
            <h3 className="text-2xl font-bold text-purple-900 mb-4">K8s 探针配置最佳实践</h3>

            <CodeBlock
              language="yaml"
              code={`apiVersion: apps/v1
kind: Deployment
metadata:
  name: order-service
spec:
  template:
    spec:
      containers:
      - name: order-service
        # Startup Probe (K8s 1.18+)
        # 启动探针: 检测应用是否启动
        startupProbe:
          httpGet:
            path: /actuator/health/liveness
            port: 8080
          initialDelaySeconds: 10   # 启动后 10s 开始检测
          periodSeconds: 5          # 每 5s 检测一次
          timeoutSeconds: 3         # 超时时间 3s
          successThreshold: 1       # 成功 1 次视为成功
          failureThreshold: 30      # 失败 30 次 (150s) 后重启 Pod

        # Liveness Probe
        # 存活探针: 检测应用是否健康，不健康则重启
        livenessProbe:
          httpGet:
            path: /actuator/health/liveness
            port: 8080
          initialDelaySeconds: 60   # 启动后 60s 开始检测
          periodSeconds: 10         # 每 10s 检测一次
          timeoutSeconds: 5         # 超时时间 5s
          successThreshold: 1       # 成功 1 次视为成功
          failureThreshold: 3       # 失败 3 次后重启 Pod

        # Readiness Probe
        # 就绪探针: 检测应用是否就绪，未就绪则从 Service 移除
        readinessProbe:
          httpGet:
            path: /actuator/health/readiness
            port: 8080
          initialDelaySeconds: 30   # 启动后 30s 开始检测
          periodSeconds: 5          # 每 5s 检测一次
          timeoutSeconds: 3         # 超时时间 3s
          successThreshold: 1       # 成功 1 次视为成功
          failureThreshold: 3       # 失败 3 次后标记为未就绪`}
            />
          </div>

          <div className="bg-white border-2 border-orange-200 rounded-lg p-6">
            <h3 className="text-2xl font-bold text-orange-900 mb-4">优雅关闭配置</h3>

            <CodeBlock
              language="yaml"
              code={`# application.yaml
server:
  shutdown: graceful  # 优雅关闭

spring:
  lifecycle:
    timeout-per-shutdown-phase: 30s  # 每个阶段超时时间

management:
  endpoint:
    health:
      probes:
        enabled: true

---

# K8s 配置
apiVersion: apps/v1
kind: Deployment
metadata:
  name: order-service
spec:
  template:
    spec:
      containers:
      - name: order-service
        env:
        # Spring Boot 优雅关闭
        - name: SERVER_SHUTDOWN
          value: "graceful"
        - name: SPRING_LIFECYCLE_TIMEOUT_PER_SHUTDOWN_PHASE
          value: "30s"

        lifecycle:
          preStop:
            exec:
              # 等待 10s，让 K8s Service 更新，将流量切换到其他 Pod
              command: ["sh", "-c", "sleep 10"]

      # 优雅终止宽限期
      terminationGracePeriodSeconds: 40  # preStop(10s) + Spring shutdown(30s)`}
            />
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">完整微服务系统部署实战</h2>

        <div className="space-y-6">
          <div className="bg-white border-2 border-blue-200 rounded-lg p-6">
            <h3 className="text-2xl font-bold text-blue-900 mb-4">1. 部署中间件</h3>

            <CodeBlock
              language="yaml"
              code={`# middleware.yaml
---
# MySQL
apiVersion: apps/v1
kind: StatefulSet
metadata:
  name: mysql
  namespace: spring-cloud-alibaba
spec:
  serviceName: mysql-service
  replicas: 1
  selector:
    matchLabels:
      app: mysql
  template:
    metadata:
      labels:
        app: mysql
    spec:
      containers:
      - name: mysql
        image: mysql:8.0
        ports:
        - containerPort: 3306
        env:
        - name: MYSQL_ROOT_PASSWORD
          value: "root"
        - name: MYSQL_DATABASE
          value: "order_db"
        volumeMounts:
        - name: data
          mountPath: /var/lib/mysql
        livenessProbe:
          exec:
            command: ["mysqladmin", "ping", "-h", "localhost"]
          initialDelaySeconds: 30
          periodSeconds: 10
        readinessProbe:
          exec:
            command: ["mysql", "-h", "127.0.0.1", "-e", "SELECT 1"]
          initialDelaySeconds: 5
          periodSeconds: 2
  volumeClaimTemplates:
  - metadata:
      name: data
    spec:
      accessModes: ["ReadWriteOnce"]
      resources:
        requests:
          storage: 20Gi

---
apiVersion: v1
kind: Service
metadata:
  name: mysql-service
  namespace: spring-cloud-alibaba
spec:
  clusterIP: None
  selector:
    app: mysql
  ports:
  - port: 3306

---
# Redis
apiVersion: apps/v1
kind: Deployment
metadata:
  name: redis
  namespace: spring-cloud-alibaba
spec:
  replicas: 1
  selector:
    matchLabels:
      app: redis
  template:
    metadata:
      labels:
        app: redis
    spec:
      containers:
      - name: redis
        image: redis:7-alpine
        ports:
        - containerPort: 6379
        command: ["redis-server", "--appendonly", "yes"]
        livenessProbe:
          exec:
            command: ["redis-cli", "ping"]
          initialDelaySeconds: 30
          periodSeconds: 10
        readinessProbe:
          exec:
            command: ["redis-cli", "ping"]
          initialDelaySeconds: 5
          periodSeconds: 2

---
apiVersion: v1
kind: Service
metadata:
  name: redis-service
  namespace: spring-cloud-alibaba
spec:
  selector:
    app: redis
  ports:
  - port: 6379

---
# Nacos
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nacos
  namespace: spring-cloud-alibaba
spec:
  replicas: 1
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
        - containerPort: 9848
        env:
        - name: MODE
          value: "standalone"
        - name: SPRING_DATASOURCE_PLATFORM
          value: "mysql"
        - name: MYSQL_SERVICE_HOST
          value: "mysql-service"
        - name: MYSQL_SERVICE_DB_NAME
          value: "nacos_config"
        - name: MYSQL_SERVICE_USER
          value: "root"
        - name: MYSQL_SERVICE_PASSWORD
          value: "root"
        livenessProbe:
          httpGet:
            path: /nacos/
            port: 8848
          initialDelaySeconds: 60
          periodSeconds: 10
        readinessProbe:
          httpGet:
            path: /nacos/
            port: 8848
          initialDelaySeconds: 30
          periodSeconds: 5

---
apiVersion: v1
kind: Service
metadata:
  name: nacos-service
  namespace: spring-cloud-alibaba
spec:
  selector:
    app: nacos
  ports:
  - name: http
    port: 8848
    targetPort: 8848
  - name: grpc
    port: 9848
    targetPort: 9848`}
            />
          </div>

          <div className="bg-white border-2 border-green-200 rounded-lg p-6">
            <h3 className="text-2xl font-bold text-green-900 mb-4">2. 部署业务服务</h3>

            <CodeBlock
              language="bash"
              code={`#!/bin/bash
# deploy.sh - 一键部署脚本

set -e

NAMESPACE="spring-cloud-alibaba"
REGISTRY="registry.cn-hangzhou.aliyuncs.com/spring-cloud-alibaba"

echo "🚀 开始部署 Spring Cloud Alibaba 应用到 Kubernetes"

# 1. 创建命名空间
echo "📦 创建命名空间..."
kubectl create namespace $NAMESPACE --dry-run=client -o yaml | kubectl apply -f -

# 2. 部署中间件
echo "🔧 部署中间件..."
kubectl apply -f k8s/middleware.yaml -n $NAMESPACE

# 等待中间件就绪
echo "⏳ 等待中间件就绪..."
kubectl wait --for=condition=ready pod -l app=mysql -n $NAMESPACE --timeout=300s
kubectl wait --for=condition=ready pod -l app=redis -n $NAMESPACE --timeout=300s
kubectl wait --for=condition=ready pod -l app=nacos -n $NAMESPACE --timeout=300s

# 3. 构建并推送镜像
echo "🏗️ 构建并推送镜像..."
services=("order-service" "inventory-service" "user-service" "gateway-service")

for service in "$\{services[@]}"; do
  echo "构建 $service 镜像..."
  cd $service
  docker build -t $REGISTRY/$service:1.0.0 .
  docker push $REGISTRY/$service:1.0.0
  cd ..
done

# 4. 部署业务服务
echo "🚀 部署业务服务..."
kubectl apply -f k8s/services/ -n $NAMESPACE

# 5. 等待服务就绪
echo "⏳ 等待服务就绪..."
kubectl wait --for=condition=ready pod -l app=order-service -n $NAMESPACE --timeout=600s
kubectl wait --for=condition=ready pod -l app=inventory-service -n $NAMESPACE --timeout=600s
kubectl wait --for=condition=ready pod -l app=user-service -n $NAMESPACE --timeout=600s
kubectl wait --for=condition=ready pod -l app=gateway-service -n $NAMESPACE --timeout=600s

# 6. 部署 HPA
echo "📊 部署自动扩缩容..."
kubectl apply -f k8s/hpa/ -n $NAMESPACE

# 7. 部署 Ingress
echo "🌐 部署 Ingress..."
kubectl apply -f k8s/ingress.yaml -n $NAMESPACE

echo "✅ 部署完成！"
echo ""
echo "📌 服务地址:"
echo "   Nacos: http://nacos-service.$NAMESPACE.svc.cluster.local:8848/nacos"
echo "   Gateway: http://api.example.com"
echo ""
echo "💡 查看状态:"
echo "   kubectl get pods -n $NAMESPACE"
echo "   kubectl get svc -n $NAMESPACE"
echo "   kubectl get hpa -n $NAMESPACE"`}
            />
          </div>

          <div className="bg-white border-2 border-purple-200 rounded-lg p-6">
            <h3 className="text-2xl font-bold text-purple-900 mb-4">3. 滚动更新</h3>

            <CodeBlock
              language="bash"
              code={`# 滚动更新部署
kubectl set image deployment/order-service \\
  order-service=registry.cn-hangzhou.aliyuncs.com/spring-cloud-alibaba/order-service:1.0.1 \\
  -n spring-cloud-alibaba

# 查看滚动更新状态
kubectl rollout status deployment/order-service -n spring-cloud-alibaba

# 查看更新历史
kubectl rollout history deployment/order-service -n spring-cloud-alibaba

# 回滚到上一版本
kubectl rollout undo deployment/order-service -n spring-cloud-alibaba

# 回滚到指定版本
kubectl rollout undo deployment/order-service --to-revision=2 -n spring-cloud-alibaba

# 暂停滚动更新
kubectl rollout pause deployment/order-service -n spring-cloud-alibaba

# 恢复滚动更新
kubectl rollout resume deployment/order-service -n spring-cloud-alibaba`}
            />
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">常见问题排查</h2>

        <div className="space-y-4">
          <TroubleshootingCard
            issue="Pod 一直处于 Pending 状态"
            solution="Pod 无法调度通常是因为资源不足或节点问题。检查步骤：
1. 查看 Pod 事件: kubectl describe pod &lt;pod-name&gt;
2. 检查节点资源: kubectl top nodes
3. 查看节点状态: kubectl get nodes
4. 检查调度器日志: kubectl logs -n kube-system -l k8s-app=kube-scheduler"
            code={`# 查看 Pod 详细信息和事件
kubectl describe pod order-service-xxx -n spring-cloud-alibaba

# 常见原因及解决方案:
# 1. 资源不足 - 增加 Node 或降低资源请求
# 2. 节点选择器不匹配 - 修复 nodeSelector
# 3. 污点容忍 - 添加 tolerations
# 4. 存储卷挂载失败 - 检查 PV/PVC`}
            language="bash"
          />

          <TroubleshootingCard
            issue="Pod 频繁重启 (CrashLoopBackOff)"
            solution="Pod 崩溃通常是应用错误或健康检查配置问题。检查应用日志和健康检查端点。"
            code={`# 查看 Pod 日志
kubectl logs order-service-xxx -n spring-cloud-alibaba

# 查看之前的日志（如果已重启）
kubectl logs order-service-xxx --previous -n spring-cloud-alibaba

# 进入容器调试
kubectl exec -it order-service-xxx -n spring-cloud-alibaba -- /bin/sh

# 常见原因:
# 1. 应用启动失败 - 检查应用日志
# 2. 健康检查失败 - 调整 initialDelaySeconds
# 3. OOM - 增加 memory limit
# 4. 依赖服务未就绪 - 检查 initContainers 或 readinessProbe`}
            language="bash"
          />

          <TroubleshootingCard
            issue="服务无法访问"
            solution="服务访问问题通常涉及网络、端口或 Service 配置。"
            code={`# 1. 检查 Pod 是否运行
kubectl get pods -n spring-cloud-alibaba

# 2. 检查 Service 配置
kubectl get svc -n spring-cloud-alibaba
kubectl describe svc order-service -n spring-cloud-alibaba

# 3. 检查 Endpoint
kubectl get endpoints order-service -n spring-cloud-alibaba

# 4. 测试 Pod 间网络
kubectl run -it --rm debug --image=busybox --restart=Never -n spring-cloud-alibaba -- /bin/sh
# 在容器内测试:
wget -O- http://order-service:8080/actuator/health

# 5. 检查 NetworkPolicy
kubectl get networkpolicy -n spring-cloud-alibaba

# 6. 检查 Ingress
kubectl get ingress -n spring-cloud-alibaba
kubectl describe ingress spring-cloud-alibaba-ingress -n spring-cloud-alibaba`}
            language="bash"
          />

          <TroubleshootingCard
            issue="HPA 不生效"
            solution="HPA 不工作通常是因为 Metrics Server 未安装或指标未正确暴露。"
            code={`# 1. 检查 Metrics Server
kubectl get pods -n kube-system -l k8s-app=metrics-server

# 2. 检查节点指标
kubectl top nodes

# 3. 检查 Pod 指标
kubectl top pods -n spring-cloud-alibaba

# 4. 检查 HPA 状态
kubectl get hpa -n spring-cloud-alibaba
kubectl describe hpa order-service -n spring-cloud-alibaba

# 5. 检查 Pod 资源请求（HPA 需要设置 requests）
kubectl describe pod order-service-xxx -n spring-cloud-alibaba | grep -A 5 "Requests"

# 6. 查看 HPA 事件
kubectl get events -n spring-cloud-alibaba --field-selector reason=FailedScale`}
            language="bash"
          />

          <TroubleshootingCard
            issue="滚动更新卡住"
            solution="滚动更新卡住通常是因为新版本 Pod 启动失败或健康检查不通过。"
            code={`# 1. 查看更新状态
kubectl rollout status deployment/order-service -n spring-cloud-alibaba

# 2. 查看新版本 ReplicaSet
kubectl get rs -n spring-cloud-alibaba -l app=order-service

# 3. 查看新版本 Pod 状态
kubectl get pods -n spring-cloud-alibaba -l app=order-service

# 4. 暂停更新（先调查问题）
kubectl rollout pause deployment/order-service -n spring-cloud-alibaba

# 5. 回滚到稳定版本
kubectl rollout undo deployment/order-service -n spring-cloud-alibaba

# 6. 检查 maxSurge 和 maxUnavailable 配置
kubectl describe deployment order-service -n spring-cloud-alibaba`}
            language="bash"
          />
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">常见问题</h2>

        <div className="space-y-4">
          <FaqCard
            number={1}
            question="K8s 和 Nacos 服务发现如何选择?"
            answer={"K8s 服务发现 vs Nacos 服务发现:\n\n【K8s 服务发现】\n优势:\n- 云原生，无需额外组件\n- 基于 Service DNS，简单可靠\n- 与 K8s 生态深度集成\n- 自动健康检查\n\n适用场景:\n- 纯 K8s 环境\n- 微服务都部署在 K8s\n- 云原生架构\n\n【Nacos 服务发现】\n优势:\n- 跨平台（K8s、VM、混合部署）\n- 动态配置管理\n- 更丰富的服务治理功能\n- Spring Cloud 生态集成\n\n适用场景:\n- 混合部署（K8s + VM）\n- 需要动态配置\n- 已有 Nacos 基础设施\n\n【推荐方案】\n- 新项目: 优先 K8s 服务发现\n- 混合环境: Nacos 服务发现\n- 复杂治理: Nacos 服务发现 + K8s 负载均衡"}
            isOpen={openFaq === 1}
            onClick={() => toggleFaq(1)}
          />
          <FaqCard
            number={2}
            question="如何实现零停机部署?"
            answer={"零停机部署方案:\n\n【1. 滚动更新】\napiVersion: apps/v1\nkind: Deployment\nspec:\n  strategy:\n    type: RollingUpdate\n    rollingUpdate:\n      maxSurge: 1           # 最多多 1 个 Pod\n      maxUnavailable: 0    # 不允许不可用\n\n【2. 优雅关闭】\n- 设置 terminationGracePeriodSeconds\n- preStop hook 等待流量切换\n- Spring Boot 开启 graceful shutdown\n\n【3. 健康检查】\n- readinessProbe: 确保就绪后才接收流量\n- livenessProbe: 检测到问题自动重启\n- startupProbe: 应用慢启动支持\n\n【4. 多副本部署】\n- 最少 3 个副本\n- 反亲和性: Pod 分散在不同节点\n- PDB: Pod Disruption Budget 保护\n\n【5. 蓝绿部署】\n- 部署新版本（不接收流量）\n- 新版本健康检查通过\n- 切换 Service 选择器\n- 保留旧版本用于回滚\n\n【6. 金丝雀发布】\n- 部署少量新版本 Pod\n- 引入部分流量验证\n- 逐步扩大流量\n- 全量切换"}
            isOpen={openFaq === 2}
            onClick={() => toggleFaq(2)}
          />
          <FaqCard
            number={3}
            question="HPA 扩缩容频繁抖动怎么办?"
            answer={"HPA 抖动解决方案:\n\n【1. 调整扩缩容策略】\nbehavior:\n  scaleUp:\n    stabilizationWindowSeconds: 60   # 扩容稳定窗口\n  scaleDown:\n    stabilizationWindowSeconds: 300  # 缩容稳定窗口（5分钟）\n\n【2. 优化指标阈值】\n- CPU 阈值不要设置太低（建议 70-80%）\n- 内存阈值建议 80% 以上\n- 自定义指标增加缓冲区\n\n【3. 调整冷却时间】\n- 扩容后等待更长时间再缩容\n- 缩容策略选择 Min（更保守）\n\n【4. 使用预测性扩缩容】\n- 基于历史数据预测\n- 提前扩容应对流量高峰\n- 安装 KEDA（Kubernetes Event-driven Autoscaling）\n\n【5. 监控与告警】\n- 监控 HPA 事件\n- 记录扩缩容频率\n- 设置告警阈值"}
            isOpen={openFaq === 3}
            onClick={() => toggleFaq(3)}
          />
          <FaqCard
            number={4}
            question="K8s 中如何实现分布式事务?"
            answer={"K8s 中分布式事务方案:\n\n【1. Seata AT 模式】\n- 部署 Seata Server（StatefulSet）\n- MySQL 持久化事务日志\n- 通过 Service 发现 Seata Server\n- 应用配置 Seata Client\n\n【2. Saga 模式】\n- 适合长事务\n- 定义正向/补偿服务\n- Seata Saga 状态机编排\n\n【3. TCC 模式】\n- 强一致性要求\n- 实现 Try/Confirm/Cancel 接口\n- 幂等性处理\n\n【部署示例】\napiVersion: apps/v1\nkind: StatefulSet\nmetadata:\n  name: seata-server\nspec:\n  serviceName: seata\n  replicas: 3\n  template:\n    spec:\n      containers:\n      - name: seata\n        image: seataio/seata-server:1.7.0\n        env:\n        - name: SEATA_MODE\n          value: \"raft\"\n        - name: SEATA_RAFT_PEERS\n          value: \"seata-0.seata:8091,seata-1.seata:8091,seata-2.seata:8091\""}
            isOpen={openFaq === 4}
            onClick={() => toggleFaq(4)}
          />
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">下一步学习</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <a href="/cicd" className="block bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-200 rounded-lg p-6 hover:shadow-lg transition">
            <h3 className="text-xl font-bold text-blue-900 mb-2">🚀 CI/CD 流水线</h3>
            <p className="text-gray-700 text-sm">GitOps + ArgoCD 自动化部署</p>
          </a>
          <a href="/monitoring" className="block bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-200 rounded-lg p-6 hover:shadow-lg transition">
            <h3 className="text-xl font-bold text-green-900 mb-2">📊 可观测性</h3>
            <p className="text-gray-700 text-sm">Prometheus + Grafana + Loki 监控</p>
          </a>
        </div>
      </section>
    </div>
  );
};
