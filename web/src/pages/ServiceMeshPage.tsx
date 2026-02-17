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

export const ServiceMeshPage: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="bg-gradient-to-r from-indigo-700 to-purple-900 text-white rounded-lg p-6 mb-8">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-4xl font-bold mb-2">Service Mesh 实战</h1>
            <p className="text-indigo-200 text-lg">Istio 服务网格深度解析与实践</p>
          </div>
          <div className="flex gap-3 text-sm">
            <span className="px-3 py-1 bg-white/20 rounded-full">🏗️ 架构师</span>
            <span className="px-3 py-1 bg-white/20 rounded-full">⏱️ 约90分钟</span>
            <span className="px-3 py-1 bg-white/20 rounded-full">📚 15个知识点</span>
          </div>
        </div>
      </div>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">什么是 Service Mesh?</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-red-50 border-2 border-red-200 rounded-lg p-5">
            <h3 className="text-xl font-bold text-red-900 mb-3">❌ 传统微服务痛点</h3>
            <ul className="text-gray-700 space-y-2">
              <li>• 服务间调用逻辑分散在每个服务中</li>
              <li>• 熔断、限流、重试代码重复编写</li>
              <li>• 链路追踪依赖 SDK 集成</li>
              <li>• 安全认证逻辑侵入业务代码</li>
              <li>• 灰度发布实现复杂</li>
              <li>• 多语言栈统一治理困难</li>
            </ul>
          </div>

          <div className="bg-green-50 border-2 border-green-200 rounded-lg p-5">
            <h3 className="text-xl font-bold text-green-900 mb-3">✅ Service Mesh 价值</h3>
            <ul className="text-gray-700 space-y-2">
              <li>• 业务逻辑与基础设施逻辑分离</li>
              <li>• 统一的流量管理：路由、熔断、重试</li>
              <li>• 开箱即用的可观测性：Metrics/Traces/Logs</li>
              <li>• mTLS 自动加密通信</li>
              <li>• 声明式灰度发布</li>
              <li>• 跨语言统一治理能力</li>
            </ul>
          </div>
        </div>

        <div className="mt-6 bg-blue-50 border-2 border-blue-200 rounded-lg p-6">
          <h4 className="font-bold text-blue-900 mb-2">💡 核心理念</h4>
          <p className="text-gray-700 text-sm">
            Service Mesh 通过在每个服务旁边部署 Sidecar 代理，将服务间通信的管理逻辑从业务代码中剥离出来，
            形成一个专门处理服务间通信的基础设施层。这样开发人员可以专注于业务逻辑，而运维团队可以统一管理流量、安全和可观测性。
          </p>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Service Mesh 架构演进</h2>

        <div className="bg-white border-2 border-slate-200 rounded-lg p-6 mb-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">架构对比</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="border-2 border-gray-200 rounded-lg p-4">
              <h4 className="font-bold text-gray-900 mb-2">1. 无 Mesh</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Library 模式</li>
                <li>• 代码侵入</li>
                <li>• 多语言重复开发</li>
                <li>• 版本管理复杂</li>
              </ul>
            </div>
            <div className="border-2 border-gray-200 rounded-lg p-4">
              <h4 className="font-bold text-gray-900 mb-2">2. 第一代 Mesh</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• 边缘代理</li>
                <li>• 集中式管理</li>
                <li>• 单点故障风险</li>
                <li>• 性能瓶颈</li>
              </ul>
            </div>
            <div className="border-2 border-indigo-200 rounded-lg p-4 bg-indigo-50">
              <h4 className="font-bold text-indigo-900 mb-2">3. Sidecar Mesh</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Sidecar 代理</li>
                <li>• 去中心化</li>
                <li>• 高可用性</li>
                <li>• Istio/Linkerd</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Istio 核心组件</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          <ConceptCard
            name="Istiod"
            description="控制平面核心组件，统一配置管理、证书颁发、流量控制"
            icon="🎛️"
            color="bg-purple-50 border-purple-200"
          />
          <ConceptCard
            name="Envoy"
            description="数据平面代理，高性能 Sidecar，处理所有服务间流量"
            icon="🚀"
            color="bg-blue-50 border-blue-200"
          />
          <ConceptCard
            name="Pilot"
            description="服务发现与流量管理，将路由规则下发到 Envoy"
            icon="🧭"
            color="bg-green-50 border-green-200"
          />
          <ConceptCard
            name="Citadel"
            description="安全组件，管理 mTLS 证书和身份认证"
            icon="🔐"
            color="bg-red-50 border-red-200"
          />
          <ConceptCard
            name="Galley"
            description="配置验证与分发，支持多种配置源"
            icon="⚙️"
            color="bg-yellow-50 border-yellow-200"
          />
          <ConceptCard
            name="Sidecar"
            description="Envoy 代理实例，伴随每个服务 Pod 运行"
            icon="📦"
            color="bg-indigo-50 border-indigo-200"
          />
        </div>

        <div className="bg-white border-2 border-slate-200 rounded-lg p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Istio 架构图</h3>
          <div className="bg-gray-50 border-2 border-gray-200 rounded-lg p-6 text-center">
            <div className="text-sm text-gray-700 mb-4">
              <div className="font-bold text-lg mb-2">控制平面 (Control Plane)</div>
              <div className="inline-block bg-purple-100 border-2 border-purple-300 rounded-lg px-6 py-3">
                <strong>Istiod</strong> (Pilot + Citadel + Galley)
              </div>
            </div>
            <div className="border-t-2 border-gray-300 my-4 pt-4">
              <div className="font-bold text-lg mb-2">数据平面 (Data Plane)</div>
              <div className="flex justify-center gap-4 flex-wrap">
                <div className="bg-blue-100 border-2 border-blue-300 rounded-lg px-4 py-2">
                  Service A<br />
                  <span className="text-xs">+ Envoy Sidecar</span>
                </div>
                <div className="text-2xl text-gray-400">↔️</div>
                <div className="bg-blue-100 border-2 border-blue-300 rounded-lg px-4 py-2">
                  Service B<br />
                  <span className="text-xs">+ Envoy Sidecar</span>
                </div>
                <div className="text-2xl text-gray-400">↔️</div>
                <div className="bg-blue-100 border-2 border-blue-300 rounded-lg px-4 py-2">
                  Service C<br />
                  <span className="text-xs">+ Envoy Sidecar</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">1. Istio 安装部署</h2>

        <div className="bg-white border-2 border-slate-200 rounded-lg p-6 mb-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">安装 Istio</h3>
          <CodeBlock
            language="bash"
            code={`# 1. 下载 Istio
curl -L https://istio.io/downloadIstio | sh -
cd istio-*

# 2. 添加 istioctl 到 PATH
export PATH=$PWD/bin:$PATH

# 3. 安装 Istio (demo 配置)
istioctl install --set profile=demo -y

# 4. 验证安装
istioctl version

# 5. 查看所有 Pod
kubectl get pods -n istio-system

# 6. 启用自动注入 (针对 namespace)
kubectl label namespace default istio-injection=enabled`}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white border-2 border-blue-200 rounded-lg p-6">
            <h3 className="text-xl font-bold text-blue-900 mb-4">Profile 配置选择</h3>
            <CodeBlock
              language="bash"
              code={`# 查看所有 Profile
istioctl profile list

# Profile 说明:
# - demo: 开发测试，功能最全
# - default: 生产推荐，性能平衡
# - minimal: 最小化安装
# - ambient: 无 Sidecar 模式

# 安装指定 Profile
istioctl install --set profile=default -y

# 自定义配置
istioctl install \
  --set profile=default \
  --set values.pilot.autoscaleEnabled=true \
  -y`}
            />
          </div>

          <div className="bg-white border-2 border-green-200 rounded-lg p-6">
            <h3 className="text-xl font-bold text-green-900 mb-4">应用 Sidecar 注入</h3>
            <CodeBlock
              language="yaml"
              code={`apiVersion: apps/v1
kind: Deployment
metadata:
  name: order-service
spec:
  template:
    metadata:
      annotations:
        sidecar.istio.io/inject: "true"
    spec:
      containers:
      - name: order-service
        image: order-service:1.0.0
        ports:
        - containerPort: 8080
      # Sidecar 自动注入
      # istio-init: Init Container
      # istio-proxy: Envoy 容器`}
            />
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">2. 流量管理 (Traffic Management)</h2>

        <div className="bg-white border-2 border-slate-200 rounded-lg p-6 mb-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">VirtualService（虚拟服务）</h3>
          <CodeBlock
            language="yaml"
            code={`apiVersion: networking.istio.io/v1beta1
kind: VirtualService
metadata:
  name: order-service
spec:
  hosts:
  - order-service
  http:
  # 基于 HTTP Header 的路由
  - match:
    - headers:
        canary:
          exact: "true"
    route:
    - destination:
        host: order-service
        subset: v2  # 灰度版本
      weight: 100

  # 默认流量路由到 v1
  - route:
    - destination:
        host: order-service
        subset: v1
      weight: 100

  # 超时配置
    timeout: 10s
    retries:
      attempts: 3
      perTryTimeout: 2s
      retryOn: 5xx,connect-failure,refused-stream`}
          />
        </div>

        <div className="bg-white border-2 border-slate-200 rounded-lg p-6 mb-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">DestinationRule（目标规则）</h3>
          <CodeBlock
            language="yaml"
            code={`apiVersion: networking.istio.io/v1beta1
kind: DestinationRule
metadata:
  name: order-service
spec:
  host: order-service
  trafficPolicy:
    # 负载均衡策略
    loadBalancer:
      simple: LEAST_CONN  # ROUND_ROBIN / RANDOM / PASSTHROUGH
    # 连接池设置
    connectionPool:
      tcp:
        maxConnections: 100
      http:
        http1MaxPendingRequests: 50
        http2MaxRequests: 100
        maxRequestsPerConnection: 2
        idleTimeout: 60s
    # 熔断配置
    outlierDetection:
      consecutiveErrors: 5
      interval: 30s
      baseEjectionTime: 30s
      maxEjectionPercent: 50

  # 定义服务子集
  subsets:
  - name: v1
    labels:
      version: v1.0
  - name: v2
    labels:
      version: v2.0`}
          />
        </div>

        <div className="bg-white border-2 border-slate-200 rounded-lg p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Gateway（网关配置）</h3>
          <CodeBlock
            language="yaml"
            code={`apiVersion: networking.istio.io/v1beta1
kind: Gateway
metadata:
  name: ingress-gateway
spec:
  selector:
    istio: ingressgateway
  servers:
  - port:
      number: 443
      name: https
      protocol: HTTPS
    tls:
      mode: SIMPLE
      serverCertificate: /etc/certs/server.pem
      privateKey: /etc/certs/private-key.pem
    hosts:
    - api.example.com
---
apiVersion: networking.istio.io/v1beta1
kind: VirtualService
metadata:
  name: api-gateway
spec:
  hosts:
  - api.example.com
  gateways:
  - ingress-gateway
  http:
  - match:
    - uri:
        prefix: /api/orders
    route:
    - destination:
        host: order-service
        port:
          number: 8080
  - match:
    - uri:
        prefix: /api/products
    route:
    - destination:
        host: product-service
        port:
          number: 8080`}
          />
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">3. 灰度发布 (Canary Deployment)</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white border-2 border-green-200 rounded-lg p-6">
            <h3 className="text-xl font-bold text-green-900 mb-4">基于权重的灰度</h3>
            <CodeBlock
              language="yaml"
              code={`apiVersion: networking.istio.io/v1beta1
kind: VirtualService
metadata:
  name: order-service-canary
spec:
  hosts:
  - order-service
  http:
  - route:
    # 10% 流量到 v2
    - destination:
        host: order-service
        subset: v2
      weight: 10
    # 90% 流量到 v1
    - destination:
        host: order-service
        subset: v1
      weight: 90`}
            />
          </div>

          <div className="bg-white border-2 border-blue-200 rounded-lg p-6">
            <h3 className="text-xl font-bold text-blue-900 mb-4">基于 Header 的灰度</h3>
            <CodeBlock
              language="yaml"
              code={`apiVersion: networking.istio.io/v1beta1
kind: VirtualService
metadata:
  name: order-service-beta
spec:
  hosts:
  - order-service
  http:
  # Beta 用户访问 v2
  - match:
    - headers:
        user-type:
          exact: beta
    route:
    - destination:
        host: order-service
        subset: v2
  # 其他用户访问 v1
  - route:
    - destination:
        host: order-service
        subset: v1`}
            />
          </div>
        </div>

        <div className="mt-6 bg-indigo-50 border-2 border-indigo-200 rounded-lg p-6">
          <h4 className="font-bold text-indigo-900 mb-3">🚀 灰度发布完整流程</h4>
          <ol className="text-sm text-gray-700 space-y-2">
            <li><strong>1. 部署新版本</strong>：使用 version: v2 标签部署新版本服务</li>
            <li><strong>2. 配置 DestinationRule</strong>：定义 v1 和 v2 两个 subset</li>
            <li><strong>3. 配置 VirtualService</strong>：设置初始权重（如 5%）</li>
            <li><strong>4. 监控指标</strong>：观察错误率、延迟、业务指标</li>
            <li><strong>5. 逐步放量</strong>：调整权重 10% → 30% → 50% → 100%</li>
            <li><strong>6. 全量发布</strong>：所有流量切换到 v2</li>
            <li><strong>7. 清理配置</strong>：删除 v1 subset，更新 VirtualService</li>
          </ol>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">4. 安全管理 (Security)</h2>

        <div className="bg-white border-2 border-slate-200 rounded-lg p-6 mb-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">PeerAuthentication（mTLS 配置）</h3>
          <CodeBlock
            language="yaml"
            code={`# 全局启用 mTLS
apiVersion: security.istio.io/v1beta1
kind: PeerAuthentication
metadata:
  name: default
  namespace: istio-system
spec:
  mtls:
    mode: STRICT  # PERMISSIVE / STRICT / DISABLE

---
# 特定服务配置
apiVersion: security.istio.io/v1beta1
kind: PeerAuthentication
metadata:
  name: order-service-mtls
spec:
  selector:
    matchLabels:
      app: order-service
  mtls:
    mode: STRICT

---
# 端口级别配置
apiVersion: security.istio.io/v1beta1
kind: PeerAuthentication
metadata:
  name: order-service-port-mtls
spec:
  selector:
    matchLabels:
      app: order-service
  mtls:
    mode: PERMISSIVE
  portLevelMtls:
    9080:
      mode: STRICT`}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white border-2 border-red-200 rounded-lg p-6">
            <h3 className="text-xl font-bold text-red-900 mb-4">AuthorizationPolicy（访问控制）</h3>
            <CodeBlock
              language="yaml"
              code={`apiVersion: security.istio.io/v1beta1
kind: AuthorizationPolicy
metadata:
  name: order-service-authz
spec:
  selector:
    matchLabels:
      app: order-service
  action: ALLOW
  rules:
  # 只允许特定服务访问
  - from:
    - source:
        principals:
        - cluster.local/ns/default/sa/gateway
        - cluster.local/ns/default/sa/product-service
  # 只允许特定路径
  to:
  - operation:
      methods: ["GET", "POST"]
      paths: ["/api/orders/*"]
  # 要求 JWT 认证
  when:
  - key: request.auth.claims[role]
    values: ["admin", "user"]`}
            />
          </div>

          <div className="bg-white border-2 border-purple-200 rounded-lg p-6">
            <h3 className="text-xl font-bold text-purple-900 mb-4">RequestAuthentication（JWT 认证）</h3>
            <CodeBlock
              language="yaml"
              code={`apiVersion: security.istio.io/v1beta1
kind: RequestAuthentication
metadata:
  name: order-service-jwt
spec:
  selector:
    matchLabels:
      app: order-service
  jwtRules:
  - issuer: "https://auth.example.com"
    jwks: |
      {
        "keys": [
          {
            "kty": "RSA",
            "e": "AQAB",
            "use": "sig",
            "kid": "keyid1",
            "alg": "RS256",
            "n": "..."
          }
        ]
      }
    outputPayloadToHeader: x-jwt-payload`}
            />
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">5. 可观测性 (Observability)</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-5">
            <h3 className="text-xl font-bold text-blue-900 mb-3">📊 Metrics（指标）</h3>
            <ul className="text-sm text-gray-700 space-y-2">
              <li>• <strong>Proxy</strong>: Envoy 代理指标</li>
              <li>• <strong>Service</strong>: 服务级别指标</li>
              <li>• <strong>Control Plane</strong>: Istiod 指标</li>
              <li>• Prometheus 集成</li>
              <li>• Grafana 可视化</li>
            </ul>
          </div>

          <div className="bg-green-50 border-2 border-green-200 rounded-lg p-5">
            <h3 className="text-xl font-bold text-green-900 mb-3">🔍 Traces（链路追踪）</h3>
            <ul className="text-sm text-gray-700 space-y-2">
              <li>• <strong>Distributed Tracing</strong>: 分布式追踪</li>
              <li>• <strong>Span</strong>: 调用链详情</li>
              <li>• Jaeger 集成</li>
              <li>• Zipkin 兼容</li>
              <li>• 服务拓扑图</li>
            </ul>
          </div>

          <div className="bg-orange-50 border-2 border-orange-200 rounded-lg p-5">
            <h3 className="text-xl font-bold text-orange-900 mb-3">📝 Logs（日志）</h3>
            <ul className="text-sm text-gray-700 space-y-2">
              <li>• <strong>Access Logs</strong>: 访问日志</li>
              <li>• <strong>Envoy Logs</strong>: 代理日志</li>
              <li>• 日志格式化输出</li>
              <li>• 支持自定义格式</li>
              <li>• 集成日志系统</li>
            </ul>
          </div>
        </div>

        <div className="bg-white border-2 border-slate-200 rounded-lg p-6 mb-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Telemetry API（遥测配置）</h3>
          <CodeBlock
            language="yaml"
            code={`apiVersion: telemetry.istio.io/v1alpha1
kind: Telemetry
metadata:
  name: mesh-default
spec:
  # 指标采集
  metrics:
  - providers:
    - name: prometheus
  overrides:
  - match:
      metric: ALL_METRICS
    tagOverrides:
      destination_service:
        value: response.code`}
          />
        </div>

        <div className="bg-white border-2 border-slate-200 rounded-lg p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">启用 Kiali 服务网格可视化</h3>
          <CodeBlock
            language="bash"
            code={`# Kiali 默认包含在 Istio 安装中
# 访问 Kiali Dashboard
istioctl dashboard kiali

# 通过 Ingress 暴露
kubectl apply -f - <<EOF
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: kiali-ingress
spec:
  rules:
  - host: kiali.example.com
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: kiali
            port:
              number: 20001
EOF

# 查看服务拓扑图
# - 服务依赖关系
# - 流量分布
# - 健康状态
# - 延迟与错误率`}
          />
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">6. 实战案例：电商系统全链路灰度</h2>

        <div className="bg-white border-2 border-slate-200 rounded-lg p-6 mb-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">场景描述</h3>
          <div className="bg-gray-50 border-2 border-gray-200 rounded-lg p-4 mb-4">
            <p className="text-gray-700 text-sm">
              某电商平台需要上线新的订单服务（v2），要求对特定用户群体（如 Beta 用户）进行灰度测试。
              整个调用链涉及多个服务：Gateway → Order Service → Inventory Service → Payment Service。
              需要确保灰度用户的所有请求都在新版本服务链路上。
            </p>
          </div>

          <div className="flex items-center justify-center gap-2 flex-wrap text-sm">
            <span className="bg-blue-100 border-2 border-blue-300 rounded-lg px-3 py-2">
              Gateway
            </span>
            <span className="text-gray-400">→</span>
            <span className="bg-green-100 border-2 border-green-300 rounded-lg px-3 py-2">
              Order (v1/v2)
            </span>
            <span className="text-gray-400">→</span>
            <span className="bg-purple-100 border-2 border-purple-300 rounded-lg px-3 py-2">
              Inventory (v1/v2)
            </span>
            <span className="text-gray-400">→</span>
            <span className="bg-orange-100 border-2 border-orange-300 rounded-lg px-3 py-2">
              Payment (v1/v2)
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white border-2 border-blue-200 rounded-lg p-6">
            <h3 className="text-xl font-bold text-blue-900 mb-4">Step 1: DestinationRule</h3>
            <CodeBlock
              language="yaml"
              code={`apiVersion: networking.istio.io/v1beta1
kind: DestinationRule
metadata:
  name: order-service
spec:
  host: order-service
  subsets:
  - name: v1
    labels:
      version: v1.0
  - name: v2
    labels:
      version: v2.0
---
apiVersion: networking.istio.io/v1beta1
kind: DestinationRule
metadata:
  name: inventory-service
spec:
  host: inventory-service
  subsets:
  - name: v1
    labels:
      version: v1.0
  - name: v2
    labels:
      version: v2.0`}
            />
          </div>

          <div className="bg-white border-2 border-green-200 rounded-lg p-6">
            <h3 className="text-xl font-bold text-green-900 mb-4">Step 2: VirtualService（Header 路由）</h3>
            <CodeBlock
              language="yaml"
              code={`apiVersion: networking.istio.io/v1beta1
kind: VirtualService
metadata:
  name: order-service
spec:
  hosts:
  - order-service
  http:
  # Beta 用户访问 v2
  - match:
    - headers:
        x-user-type:
          exact: beta
    route:
    - destination:
        host: order-service
        subset: v2
    # 传递 Header 到下游
    headers:
      request:
        set:
          x-canary: "true"
  # 其他用户访问 v1
  - route:
    - destination:
        host: order-service
        subset: v1`}
            />
          </div>

          <div className="bg-white border-2 border-purple-200 rounded-lg p-6">
            <h3 className="text-xl font-bold text-purple-900 mb-4">Step 3: 下游服务路由</h3>
            <CodeBlock
              language="yaml"
              code={`apiVersion: networking.istio.io/v1beta1
kind: VirtualService
metadata:
  name: inventory-service
spec:
  hosts:
  - inventory-service
  http:
  # 读取上游传递的 Header
  - match:
    - headers:
        x-canary:
          exact: "true"
    route:
    - destination:
        host: inventory-service
        subset: v2
  - route:
    - destination:
        host: inventory-service
        subset: v1`}
            />
          </div>

          <div className="bg-white border-2 border-orange-200 rounded-lg p-6">
            <h3 className="text-xl font-bold text-orange-900 mb-4">Step 4: 验证灰度效果</h3>
            <CodeBlock
              language="bash"
              code={`# 发送 Beta 用户请求
curl -H "x-user-type: beta" \
  http://api.example.com/api/orders/create

# 发送普通用户请求
curl http://api.example.com/api/orders/create

# 查看 Kiali 服务拓扑
# 验证 Beta 用户流量是否全链路在 v2

# 查看访问日志
kubectl logs -l app=order-service -c istio-proxy \
  -n production --tail=100 | grep v2

# 监控指标
kubectl exec -it -n istio-system \
  $(kubectl get pod -n istio-system -l app=prometheus -o jsonpath='{.items[0].metadata.name}') \
  -- promtool query instant \
  'istio_requests_total{destination_service="order-service", response_code="200"}'`}
            />
          </div>
        </div>

        <div className="mt-6 bg-green-50 border-2 border-green-200 rounded-lg p-6">
          <h4 className="font-bold text-green-900 mb-3">💡 灰度发布最佳实践</h4>
          <ul className="text-sm text-gray-700 space-y-2">
            <li>• <strong>全链路一致性</strong>：确保灰度用户在整个调用链上都访问新版本</li>
            <li>• <strong>Header 透传</strong>：使用 request.headers.set 传递灰度标识</li>
            <li>• <strong>流量隔离</strong>：不同版本使用独立的数据库缓存</li>
            <li>• <strong>监控告警</strong>：设置错误率、延迟等告警阈值</li>
            <li>• <strong>快速回滚</strong>：出现问题立即调整 VirtualService 权重</li>
            <li>• <strong>数据兼容</strong>：确保新旧版本数据 Schema 兼容</li>
          </ul>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Istio 性能优化</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white border-2 border-blue-200 rounded-lg p-6">
            <h3 className="text-xl font-bold text-blue-900 mb-4">资源优化</h3>
            <CodeBlock
              language="yaml"
              code={`apiVersion: v1
kind: ConfigMap
metadata:
  name: istio-sidecar-injector
data:
  values: |
    sidecarResources:
      requests:
        cpu: 100m
        memory: 128Mi
      limits:
        cpu: 500m
        memory: 512Mi

---
# Sidecar 代理配置优化
apiVersion: networking.istio.io/v1beta1
kind: Sidecar
metadata:
  name: order-service-sidecar
spec:
  egress:
  - hosts:
    - "*/order-service"
    - "*/inventory-service"
  # 减少不必要的监听器
  ingress:
  - defaultEndpoint: 127.0.0.1:8080`}
            />
          </div>

          <div className="bg-white border-2 border-green-200 rounded-lg p-6">
            <h3 className="text-xl font-bold text-green-900 mb-4">网络优化</h3>
            <CodeBlock
              language="yaml"
              code={`apiVersion: v1
kind: ConfigMap
metadata:
  name: istio
data:
  mesh: |
    # 启用 Istio Ambient 模式
    # 无需 Sidecar，性能更优
    ambientMode:
      enabled: true

    # 连接池优化
    defaultConfig:
      connectionPool:
        tcp:
          maxConnections: 50
        http:
          h2UpgradePolicy: UPGRADE
          idleTimeout: 300s
          http2MaxRequests: 1000`}
            />
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">常见问题</h2>

        <div className="space-y-4">
          <FaqCard
            number={1}
            question="Istio 和 Spring Cloud Gateway 如何选择?"
            answer={"Istio vs Spring Cloud Gateway 对比：\n\n【Istio 优势】\n✓ 基础设施层统一治理\n✓ 跨语言支持\n✓ 更强大的灰度发布能力\n✓ mTLS 安全通信\n✓ 可观测性开箱即用\n\n【Spring Cloud Gateway 优势】\n✓ 轻量级，学习成本低\n✓ 与 Spring 生态集成好\n✓ 配置灵活，动态路由\n✓ 无需额外基础设施\n✓ 适合小规模团队\n\n【选择建议】\n- 微服务数量 < 10：Spring Cloud Gateway\n- 微服务数量 > 20：考虑 Istio\n- 多语言栈：必须 Istio\n- 单一 Java 技术栈：两者皆可\n- 对安全、可观测性要求高：Istio"}
            isOpen={openFaq === 1}
            onClick={() => toggleFaq(1)}
          />
          <FaqCard
            number={2}
            question="如何实现按用户 ID 灰度?"
            answer={"按用户 ID 灰度方案：\n\n【方案 1】基于 Header\n```yaml\napiVersion: networking.istio.io/v1beta1\nkind: VirtualService\nmetadata:\n  name: order-service\nspec:\n  http:\n  - match:\n    - headers:\n        x-user-id:\n          regex: \"^(1|5|[0-9]{2}[13579])$\"  # ID 尾数为 1,3,5,7,9\n    route:\n    - destination:\n        host: order-service\n        subset: v2\n```\n\n【方案 2】基于 Cookie\n```yaml\n- match:\n  - headers:\n      cookie:\n        regex: \"^(.*?;)?(user_canary=true)(;.*)?$\"\n```\n\n【方案 3】基于 URL 参数\n```yaml\n- match:\n  - queryParams:\n      canary:\n        exact: \"true\"\n```\n\n【最佳实践】\n- 灰度规则集中管理：使用 ConfigMap\n- 用户分片哈希：Hash(user_id) % 100 < 10\n- 灰度用户白名单：存储在 Redis/Nacos"}
            isOpen={openFaq === 2}
            onClick={() => toggleFaq(2)}
          />
          <FaqCard
            number={3}
            question="Sidecar 模式有什么性能开销?"
            answer={"Sidecar 性能开销分析：\n\n【延迟开销】\n- 同进程调用：+1-3ms\n- 跨主机调用：+3-10ms\n- HTTP/2 复用：延迟降低\n\n【资源开销】\n- CPU：每 Pod +10-50m (取决于流量)\n- 内存：每 Pod +64-128MB\n- 网络流量：+1% (控制平面)\n\n【优化方案】\n1. 启用 Ambient 模式（Istio 1.18+）\n   - 无需 Sidecar\n   - 共享代理，资源开销降低 70%\n\n2. 资源限制\n```yaml\nsidecarResources:\n  requests:\n    cpu: 100m\n    memory: 64Mi\n  limits:\n    cpu: 500m\n    memory: 128Mi\n```\n\n3. 按需注入\n   - 非关键服务禁用 Sidecar\n   - 使用 namespace 级别控制\n\n4. Proxy 配置优化\n   - 减少 egress hosts\n   - 禁用不必要的功能"}
            isOpen={openFaq === 3}
            onClick={() => toggleFaq(3)}
          />
          <FaqCard
            number={4}
            question="如何实现蓝绿部署?"
            answer={"Istio 蓝绿部署方案：\n\n【配置 DestinationRule】\n```yaml\napiVersion: networking.istio.io/v1beta1\nkind: DestinationRule\nmetadata:\n  name: order-service\nspec:\n  host: order-service\n  subsets:\n  - name: blue  # 当前生产版本\n    labels:\n      env: production\n  - name: green  # 新版本\n    labels:\n      env: staging\n```\n\n【蓝绿切换】\n```yaml\n# 切换到 Green\napiVersion: networking.istio.io/v1beta1\nkind: VirtualService\nmetadata:\n  name: order-service-blue-green\nspec:\n  http:\n  - route:\n    - destination:\n        host: order-service\n        subset: green  # 切换到 Green\n      weight: 100\n```\n\n【快速回滚】\n```bash\n# 一键切回 Blue\nkubectl patch virtualservice order-service \\\n  --type merge \\\n  -p '{\"spec\":{\"http\":[{\"route\":[{\"destination\":{\"host\":\"order-service\",\"subset\":\"blue\"}}]}]}}'\n```\n\n【注意事项】\n- 蓝绿两版本需要独立资源（数据库、缓存）\n- 切换前确保 Green 版本已完全就绪\n- 配置 readinessProbe 确保流量切换安全"}
            isOpen={openFaq === 4}
            onClick={() => toggleFaq(4)}
          />
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Istio 生产部署检查清单</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-green-50 border-2 border-green-200 rounded-lg p-5">
            <h3 className="text-xl font-bold text-green-900 mb-3">部署准备</h3>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>✓ 选择合适的 Profile (default/production)</li>
              <li>✓ 配置 Istiod 高可用 (至少 3 副本)</li>
              <li>✓ 启用 Pilot 全局缓存</li>
              <li>✓ 配置资源 limits (CPU/Memory)</li>
              <li>✓ 规划 Control Plane 数据存储</li>
              <li>✓ 配置 Ingress Gateway 证书</li>
            </ul>
          </div>

          <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-5">
            <h3 className="text-xl font-bold text-blue-900 mb-3">安全配置</h3>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>✓ 启用 mTLS (STRICT 模式)</li>
              <li>✓ 配置 AuthorizationPolicy</li>
              <li>✓ 启用 RequestAuthentication (JWT)</li>
              <li>✓ 配置 NetworkPolicy 网络隔离</li>
              <li>✓ 定期轮换 mTLS 证书</li>
              <li>✓ 限制 Citadel 访问权限</li>
            </ul>
          </div>

          <div className="bg-purple-50 border-2 border-purple-200 rounded-lg p-5">
            <h3 className="text-xl font-bold text-purple-900 mb-3">性能优化</h3>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>✓ 配置 Sidecar 资源限制</li>
              <li>✓ 优化 Sidecar egress hosts</li>
              <li>✓ 启用 Envoy HTTP/3 (QUIC)</li>
              <li>✓ 调整连接池参数</li>
              <li>✓ 配置 OutlierDetection 熔断</li>
              <li>✓ 监控 Envoy 代理性能</li>
            </ul>
          </div>

          <div className="bg-orange-50 border-2 border-orange-200 rounded-lg p-5">
            <h3 className="text-xl font-bold text-orange-900 mb-3">可观测性</h3>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>✓ 部署 Prometheus 监控</li>
              <li>✓ 配置 Grafana Dashboard</li>
              <li>✓ 集成 Jaeger 链路追踪</li>
              <li>✓ 启用 Kiali 可视化</li>
              <li>✓ 配置告警规则</li>
              <li>✓ 日志聚合分析</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">下一步学习</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <a href="/k8s-deployment" className="block bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-200 rounded-lg p-6 hover:shadow-lg transition">
            <h3 className="text-xl font-bold text-blue-900 mb-2">☸️ Kubernetes 部署</h3>
            <p className="text-gray-700 text-sm">K8s 基础知识与部署实践</p>
          </a>
          <a href="/observability" className="block bg-gradient-to-br from-purple-50 to-purple-100 border-2 border-purple-200 rounded-lg p-6 hover:shadow-lg transition">
            <h3 className="text-xl font-bold text-purple-900 mb-2">📊 可观测性体系</h3>
            <p className="text-gray-700 text-sm">Metrics/Traces/Logs 全链路监控</p>
          </a>
          <a href="/security-design" className="block bg-gradient-to-br from-red-50 to-red-100 border-2 border-red-200 rounded-lg p-6 hover:shadow-lg transition">
            <h3 className="text-xl font-bold text-red-900 mb-2">🔐 安全架构设计</h3>
            <p className="text-gray-700 text-sm">微服务安全最佳实践</p>
          </a>
          <a href="/performance-tuning" className="block bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-200 rounded-lg p-6 hover:shadow-lg transition">
            <h3 className="text-xl font-bold text-green-900 mb-2">⚡ 性能调优实战</h3>
            <p className="text-gray-700 text-sm">Service Mesh 性能优化技巧</p>
          </a>
        </div>
      </section>
    </div>
  );
};
