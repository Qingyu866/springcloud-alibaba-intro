import { CodeBlock } from '../components';
export const K8sDeploymentPage: React.FC = () => (
  <div className="max-w-7xl mx-auto px-4 py-8">
    <div className="bg-gradient-to-r from-slate-700 to-slate-900 text-white rounded-lg p-6 mb-8">
      <h1 className="text-4xl font-bold mb-2">Kubernetes 部署</h1>
      <p className="text-slate-200">K8s 生产环境部署实战</p>
      <div className="flex gap-3 text-sm mt-4">
        <span className="px-3 py-1 bg-white/20 rounded-full">🏗️ 架构师</span>
        <span className="px-3 py-1 bg-white/20 rounded-full">⏱️ 约80分钟</span>
      </div>
    </div>

    <section className="mb-12">
      <h2 className="text-3xl font-bold text-gray-900 mb-6">Deployment 配置</h2>
      <CodeBlock language="yaml" code={`apiVersion: apps/v1
kind: Deployment
metadata:
  name: order-service
spec:
  replicas: 3
  selector:
    matchLabels:
      app: order-service
  template:
    metadata:
      labels:
        app: order-service
    spec:
      containers:
      - name: order-service
        image: order-service:latest
        ports:
        - containerPort: 8080
        env:
        - name: SPRING_PROFILES_ACTIVE
          value: "prod"
        resources:
          requests:
            memory: "512Mi"
            cpu: "500m"
          limits:
            memory: "1Gi"
            cpu: "1000m"
        livenessProbe:
          httpGet:
            path: /actuator/health
            port: 8080
          initialDelaySeconds: 60
          periodSeconds: 10
        readinessProbe:
          httpGet:
            path: /actuator/health
            port: 8080
          initialDelaySeconds: 30
          periodSeconds: 5`} />
    </section>

    <section className="mb-12">
      <h2 className="text-3xl font-bold text-gray-900 mb-6">Service 与 Ingress</h2>
      <CodeBlock language="yaml" code={`---
apiVersion: v1
kind: Service
metadata:
  name: order-service
spec:
  selector:
    app: order-service
  ports:
  - protocol: TCP
    port: 80
    targetPort: 8080
  type: ClusterIP

---
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: api-gateway
spec:
  rules:
  - host: api.example.com
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: gateway
            port:
              number: 80`} />
    </section>
  </div>
);
