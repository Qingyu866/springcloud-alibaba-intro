import { useState } from 'react';
import { CodeBlock } from '../components';

interface MetricCardProps {
  name: string;
  description: string;
  example: string;
  icon: string;
  color: string;
}

const MetricCard: React.FC<MetricCardProps> = ({ name, description, example, icon, color }) => (
  <div className={`${color} border-2 rounded-lg p-5`}>
    <div className="flex items-center gap-3 mb-3">
      <span className="text-3xl">{icon}</span>
      <h3 className="text-xl font-bold text-gray-900">{name}</h3>
    </div>
    <p className="text-gray-700 text-sm mb-3">{description}</p>
    <div className="bg-white rounded p-2 text-xs font-mono">{example}</div>
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

export const MonitoringPage: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="bg-gradient-to-r from-purple-700 to-purple-900 text-white rounded-lg p-6 mb-8">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-4xl font-bold mb-2">监控告警</h1>
            <p className="text-purple-100 text-lg">微服务全链路监控实战</p>
          </div>
          <div className="flex gap-3 text-sm">
            <span className="px-3 py-1 bg-white/20 rounded-full">🔧 中级</span>
            <span className="px-3 py-1 bg-white/20 rounded-full">⏱️ 约70分钟</span>
            <span className="px-3 py-1 bg-white/20 rounded-full">📚 11个知识点</span>
          </div>
        </div>
      </div>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">为什么需要监控系统?</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-red-50 border-2 border-red-200 rounded-lg p-5">
            <h3 className="text-xl font-bold text-red-900 mb-3">❌ 无监控的问题</h3>
            <ul className="text-gray-700 space-y-2">
              <li>• 故障发现滞后，依赖用户反馈</li>
              <li>• 问题定位困难，排查耗时长</li>
              <li>• 性能瓶颈难以识别</li>
              <li>• 无法量化系统健康度</li>
              <li>• 容量规划缺乏依据</li>
            </ul>
          </div>

          <div className="bg-green-50 border-2 border-green-200 rounded-lg p-5">
            <h3 className="text-xl font-bold text-green-900 mb-3">✅ 监控核心价值</h3>
            <ul className="text-gray-700 space-y-2">
              <li>• 实时告警，快速响应故障</li>
              <li>• 全链路追踪，快速定位问题</li>
              <li>• 性能分析，发现瓶颈</li>
              <li>• 数据驱动，支持容量规划</li>
              <li>• 可视化大屏，系统状态一目了然</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">监控体系架构</h2>

        <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200 rounded-lg p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
            <div className="bg-white rounded-lg p-4 shadow-md">
              <div className="text-3xl mb-2">📊</div>
              <div className="font-bold text-gray-900">指标采集</div>
              <div className="text-xs text-gray-600 mt-2">Prometheus<br/>Micrometer</div>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-md">
              <div className="text-3xl mb-2">📈</div>
              <div className="font-bold text-gray-900">数据存储</div>
              <div className="text-xs text-gray-600 mt-2">Prometheus TSDB<br/>VictoriaMetrics</div>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-md">
              <div className="text-3xl mb-2">🎨</div>
              <div className="font-bold text-gray-900">可视化</div>
              <div className="text-xs text-gray-600 mt-2">Grafana<br/>自定义仪表盘</div>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-md">
              <div className="text-3xl mb-2">🚨</div>
              <div className="font-bold text-gray-900">告警通知</div>
              <div className="text-xs text-gray-600 mt-2">AlertManager<br/>钉钉/邮件/短信</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <MetricCard
            name="RED 方法"
            description="监控三要素：Rate（请求率）、Errors（错误率）、Duration（耗时）"
            example="http_requests_total, http_errors, http_duration"
            icon="🔴"
            color="bg-red-50 border-red-200"
          />
          <MetricCard
            name="USE 方法"
            description="资源监控：Utilization（利用率）、Saturation（饱和度）、Errors（错误）"
            example="cpu_usage, memory_usage, disk_io"
            icon="💻"
            color="bg-blue-50 border-blue-200"
          />
          <MetricCard
            name="四大黄金信号"
            description="Google SRE 监控指标：延迟、流量、错误、饱和度"
            example="latency, traffic, errors, saturation"
            icon="⭐"
            color="bg-yellow-50 border-yellow-200"
          />
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">1. Spring Boot Actuator 集成</h2>

        <div className="bg-white border-2 border-slate-200 rounded-lg p-6 mb-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">pom.xml 依赖配置</h3>
          <CodeBlock
            language="xml"
            code={`<dependencies>
    <!-- Spring Boot Actuator -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-actuator</artifactId>
    </dependency>

    <!-- Micrometer Prometheus -->
    <dependency>
        <groupId>io.micrometer</groupId>
        <artifactId>micrometer-registry-prometheus</artifactId>
    </dependency>

    <!-- 微服务监控（可选） -->
    <dependency>
        <groupId>de.codecentric</groupId>
        <artifactId>spring-boot-admin-starter-client</artifactId>
        <version>3.1.8</version>
    </dependency>
</dependencies>`}
          />
        </div>

        <div className="bg-white border-2 border-slate-200 rounded-lg p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">application.yml 配置</h3>
          <CodeBlock
            language="yaml"
            code={`spring:
  application:
    name: order-service

management:
  endpoints:
    web:
      exposure:
        include: '*'  # 暴露所有端点（生产环境需限制）
      base-path: /actuator
  endpoint:
    health:
      show-details: always  # 显示详细健康信息
      probes:
        enabled: true  # 启用 K8s 健康检查
    metrics:
      enabled: true
    prometheus:
      enabled: true
  metrics:
    export:
      prometheus:
        enabled: true
    tags:
      application: $\{spring.application.name}
      environment: $\{spring.profiles.active}
    distribution:
      percentiles-histogram:
        http.server.requests: true
      percentiles:
        http.server.requests: 0.5, 0.95, 0.99
      sla:
        http.server.requests: 100ms, 500ms, 1s, 2s

  # 健康检查配置
  health:
    redis:
      enabled: true
    db:
      enabled: true
    diskspace:
      enabled: true
    livenessstate:
      enabled: true
    readinessstate:
      enabled: true

# Spring Boot Admin 配置
spring.boot.admin:
  client:
    url: http://spring-boot-admin:8080
    instance:
      prefer-ip: true
      service-host-type: ip_name`}
          />
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">2. Prometheus 配置</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-white border-2 border-slate-200 rounded-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">prometheus.yml 采集配置</h3>
            <CodeBlock
              language="yaml"
              code={`global:
  scrape_interval: 15s
  evaluation_interval: 15s
  external_labels:
    cluster: 'production'
    env: 'prod'

# 告警规则文件
rule_files:
  - 'rules/*.yml'

# 服务发现配置
scrape_configs:
  # Spring Boot 应用
  - job_name: 'spring-boot-apps'
    metrics_path: '/actuator/prometheus'
    static_configs:
      - targets:
        - 'order-service:8080'
        - 'product-service:8080'
        - 'user-service:8080'
        labels:
          service: 'microservices'

  # K8s 服务发现
  - job_name: 'kubernetes-pods'
    kubernetes_sd_configs:
      - role: pod
    relabel_configs:
      - source_labels: [__meta_kubernetes_pod_annotation_prometheus_io_scrape]
        action: keep
        regex: true
      - source_labels: [__meta_kubernetes_pod_annotation_prometheus_io_path]
        action: replace
        target_label: __metrics_path__
        regex: (.+)
      - source_labels: [__address__, __meta_kubernetes_pod_annotation_prometheus_io_port]
        action: replace
        regex: ([^:]+)(?::\\d+)?;(\\d+)
        replacement: $\$1:\$\$2
        target_label: __address__

  # Node Exporter（主机监控）
  - job_name: 'node-exporter'
    static_configs:
      - targets:
        - 'node-exporter:9100'`}
            />
          </div>

          <div className="bg-white border-2 border-slate-200 rounded-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">告警规则 rules/alerts.yml</h3>
            <CodeBlock
              language="yaml"
              code={`groups:
  - name: spring-boot-alerts
    interval: 30s
    rules:
      # 服务可用性告警
      - alert: ServiceDown
        expr: up{job="spring-boot-apps"} == 0
        for: 1m
        labels:
          severity: critical
        annotations:
          summary: "服务下线告警"
          description: "\{\{ $labels.instance }} 服务已下线超过1分钟"

      # 高错误率告警
      - alert: HighErrorRate
        expr: |
          sum(rate(http_server_requests_seconds_count{status=~"5.."}[5m])) by (service)
          /
          sum(rate(http_server_requests_seconds_count[5m])) by (service)
          > 0.05
        for: 5m
        labels:
          severity: warning
        annotations:
          summary: "错误率过高"
          description: "\{\{ $labels.service }} 错误率超过5%"

      # API 响应慢告警
      - alert: SlowAPI
        expr: |
          histogram_quantile(0.95,
            sum(rate(http_server_requests_seconds_bucket[5m])) by (service, le)
          ) > 1
        for: 5m
        labels:
          severity: warning
        annotations:
          summary: "API 响应慢"
          description: "\{\{ $labels.service }} P95延迟超过1秒"

      # JVM 内存告警
      - alert: HighMemoryUsage
        expr: |
          jvm_memory_used_bytes{area="heap"}
          /
          jvm_memory_max_bytes{area="heap"}
          > 0.9
        for: 5m
        labels:
          severity: warning
        annotations:
          summary: "堆内存使用率过高"
          description: "\{\{ $labels.service }} 堆内存使用率超过90%"`}
            />
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">3. Grafana 仪表盘</h2>

        <div className="bg-white border-2 border-slate-200 rounded-lg p-6 mb-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">核心指标查询</h3>
          <CodeBlock
            language="yaml"
            code={`# 1. QPS（每秒请求数）
sum(rate(http_server_requests_seconds_count[1m])) by (service)

# 2. 错误率
sum(rate(http_server_requests_seconds_count{status=~"5.."}[5m])) by (service)
/
sum(rate(http_server_requests_seconds_count[5m])) by (service)

# 3. P95/P99 延迟
histogram_quantile(0.95,
  sum(rate(http_server_requests_seconds_bucket[5m])) by (service, le)
)

# 4. JVM 堆内存使用率
jvm_memory_used_bytes{area="heap"} / jvm_memory_max_bytes{area="heap"}

# 5. GC 时间占比
rate(jvm_gc_pause_seconds_sum[5m]) / rate(jvm_gc_pause_seconds_count[5m])

# 6. 线程数
jvm_threads_live_threads

# 7. HTTP 请求状态分布
sum(http_server_requests_seconds_count) by (status)

# 8. 数据库连接池使用率
hikaricp_connections_active / hikaricp_connections_max

# 9. Redis 命令执行耗时
rate(redis_command_duration_seconds_sum[5m])
/
rate(redis_command_duration_seconds_count[5m])

# 10. 容器 CPU 使用率
sum(rate(container_cpu_usage_seconds_total{image!=""}[5m])) by (pod_name)
/
sum(container_spec_cpu_quota{image!=""} / container_spec_cpu_period{image!=""}) by (pod_name)`}
          />
        </div>

        <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-5">
          <h4 className="font-bold text-blue-900 mb-3">📊 推荐的 Grafana 面板</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="font-semibold text-gray-900">应用监控面板</p>
              <ul className="text-gray-700 mt-2 space-y-1">
                <li>• Spring Boot 2.1 Dashboard (ID: 11378)</li>
                <li>• JVM Micrometer Dashboard (ID: 4701)</li>
              </ul>
            </div>
            <div>
              <p className="font-semibold text-gray-900">基础设施监控</p>
              <ul className="text-gray-700 mt-2 space-y-1">
                <li>• Node Exporter Full (ID: 1860)</li>
                <li>• Kubernetes Cluster Monitoring (ID: 7249)</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">4. AlertManager 告警配置</h2>

        <div className="bg-white border-2 border-slate-200 rounded-lg p-6">
          <CodeBlock
            language="yaml"
            code={`global:
  resolve_timeout: 5m

# 告警路由
route:
  group_by: ['alertname', 'cluster', 'service']
  group_wait: 10s
  group_interval: 10s
  repeat_interval: 1h
  receiver: 'default'

  routes:
    # Critical 级别告警立即发送
    - match:
        severity: critical
      receiver: 'critical-alerts'
      continue: true

    # Warning 级别聚合发送
    - match:
        severity: warning
      receiver: 'warning-alerts'
      group_wait: 5m

# 告警接收器
receivers:
  - name: 'default'
    webhook_configs:
      - url: 'http://alert-webhook:8080/webhook'

  # Critical 告警 - 钉钉 + 短信
  - name: 'critical-alerts'
    dingtalk_configs:
      - webhook_url: 'https://oapi.dingtalk.com/robot/send?access_token=xxx'
        message: |
          {
            "msgtype": "markdown",
            "markdown": {
              "title": "🚨 紧急告警",
              "text": "## 告警通知\\n\\n**告警名称**: \{\{ .GroupLabels.alertname }}\\n**严重级别**: \{\{ .CommonLabels.severity }}\\n**服务**: \{\{ .CommonLabels.service }}\\n**详情**: \{\{ .CommonAnnotations.description }}\\n**时间**: \{\{ .StartsAt }}"
            }
          }
    webhook_configs:
      - url: 'http://sms-gateway:8080/send'

  # Warning 告警 - 邮件
  - name: 'warning-alerts'
    email_configs:
      - to: 'ops-team@example.com'
        from: 'alertmanager@example.com'
        smarthost: 'smtp.example.com:587'
        auth_username: 'alertmanager@example.com'
        auth_password: 'password'
        headers:
          Subject: '⚠️ [WARNING] \{\{ .GroupLabels.alertname }}'

# 告警抑制规则
inhibit_rules:
  # 如果服务已下线，抑制该服务的其他告警
  - source_match:
      severity: 'critical'
      alertname: 'ServiceDown'
    target_match:
      severity: 'warning'
    equal: ['service', 'instance']`}
          />
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">5. 自定义业务指标</h2>

        <div className="bg-white border-2 border-slate-200 rounded-lg p-6">
          <CodeBlock
            language="java"
            code={`import io.micrometer.core.instrument.Counter;
import io.micrometer.core.instrument.Gauge;
import io.micrometer.core.instrument.MeterRegistry;
import io.micrometer.core.instrument.Timer;
import org.springframework.stereotype.Component;

@Component
public class BusinessMetrics {

    private final Counter orderCreatedCounter;
    private final Counter orderPaidCounter;
    private final Timer orderProcessTimer;
    private final MeterRegistry meterRegistry;

    public BusinessMetrics(MeterRegistry meterRegistry) {
        this.meterRegistry = meterRegistry;

        // 订单创建计数器
        this.orderCreatedCounter = Counter.builder("order.created")
            .description("订单创建总数")
            .tag("service", "order-service")
            .register(meterRegistry);

        // 订单支付计数器
        this.orderPaidCounter = Counter.builder("order.paid")
            .description("订单支付总数")
            .tag("service", "order-service")
            .register(meterRegistry);

        // 订单处理耗时
        this.orderProcessTimer = Timer.builder("order.process.duration")
            .description("订单处理耗时")
            .tag("service", "order-service")
            .publishPercentiles(0.5, 0.95, 0.99)
            .register(meterRegistry);
    }

    // 记录订单创建
    public void recordOrderCreated(String type, BigDecimal amount) {
        orderCreatedCounter.increment();
        meterRegistry.counter("order.created.amount",
            "type", type,
            "amount_range", getAmountRange(amount)
        ).increment(amount.doubleValue());
    }

    // 记录订单处理时间
    public <T> T recordOrderProcessTime(String operation, Runnable runnable) {
        return Timer.Sample.start(meterRegistry)
            .stop(Timer.builder("order.operation.duration")
                .tag("operation", operation)
                .register(meterRegistry))
            .record(() -> {
                runnable.run();
                return null;
            });
    }

    // 记录库存数量（Gauge）
    public void recordInventory(String productId, int quantity) {
        Gauge.builder("inventory.quantity", quantity, Quantity::getValue)
            .tag("product_id", productId)
            .description("商品库存数量")
            .register(meterRegistry);
    }

    private String getAmountRange(BigDecimal amount) {
        if (amount.compareTo(new BigDecimal("100")) < 0) return "0-100";
        if (amount.compareTo(new BigDecimal("500")) < 0) return "100-500";
        return "500+";
    }

    static class Quantity {
        private final int value;

        Quantity(int value) {
            this.value = value;
        }

        public int getValue() {
            return value;
        }
    }
}`}
          />
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">监控最佳实践</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-green-50 border-2 border-green-200 rounded-lg p-5">
            <h3 className="text-xl font-bold text-green-900 mb-3">指标设计</h3>
            <ul className="text-sm text-gray-700 space-y-2">
              <li>✓ 遵循 RED/USE 方法论</li>
              <li>✓ 指标命名规范清晰</li>
              <li>✓ 合理使用 Label 维度</li>
              <li>✓ 避免高基数 Label（如 user_id）</li>
              <li>✓ 定期审查无用指标</li>
            </ul>
          </div>

          <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-5">
            <h3 className="text-xl font-bold text-blue-900 mb-3">告警策略</h3>
            <ul className="text-sm text-gray-700 space-y-2">
              <li>✓ 告警分级（Critical/Warning/Info）</li>
              <li>✓ 合理设置阈值和持续时间</li>
              <li>✓ 避免告警风暴</li>
              <li>✓ 告警信息包含上下文</li>
              <li>✓ 定期演练告警响应流程</li>
            </ul>
          </div>

          <div className="bg-red-50 border-2 border-red-200 rounded-lg p-5">
            <h3 className="text-xl font-bold text-red-900 mb-3">仪表盘建设</h3>
            <ul className="text-sm text-gray-700 space-y-2">
              <li>✓ 分层展示（业务/应用/系统）</li>
              <li>✓ 大屏简洁关键指标</li>
              <li>✓ 详情面板支持钻取</li>
              <li>✓ 统一时间范围和刷新间隔</li>
              <li>✓ 定期优化查询性能</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">常见问题</h2>

        <div className="space-y-4">
          <FaqCard
            number={1}
            question="Prometheus 采集不到数据怎么办？"
            answer={"排查步骤：\n\n1. 检查 Actuator 端点\n   ```bash\n   curl http://service:8080/actuator/prometheus\n   ```\n\n2. 验证 Prometheus 配置\n   - 检查 targets 页面：http://prometheus:9090/targets\n   - 确认服务状态为 UP\n\n3. 检查网络连通性\n   ```bash\n   # 从 Prometheus 容器测试\n   prometheus> curl service:8080/actuator/health\n   ```\n\n4. 查看 Prometheus 日志\n   ```bash\n   kubectl logs -f prometheus-xxx -n monitoring\n   ```\n\n5. 验证 scrape_interval 配置\n   - 默认 15s，可能采集间隔过长\n\n【常见问题】\n- 端点路径错误：/actuator/prometheus\n- K8s Service 没有正确配置 selector\n- 网络策略阻止访问"}
            isOpen={openFaq === 1}
            onClick={() => toggleFaq(1)}
          />
          <FaqCard
            number={2}
            question="如何避免告警风暴？"
            answer={"告警风暴防护措施：\n\n1. 告警聚合\n   ```yaml\n   route:\n     group_by: ['alertname', 'cluster']\n     group_wait: 30s  # 等待30s聚合告警\n     group_interval: 5m\n   ```\n\n2. 告警抑制\n   ```yaml\n   inhibit_rules:\n     # 服务下线时抑制其他告警\n     - source_match:\n         alertname: 'ServiceDown'\n       target_match_re:\n         alertname: '.*'\n       equal: ['service']\n   ```\n\n3. 限流策略\n   ```yaml\n   # 相同告警1小时内重复1次\n   repeat_interval: 1h\n   ```\n\n4. 告警静默\n   - 维护窗口提前设置静默\n   - 使用 InhibitRules 自动抑制\n\n5. 分级通知\n   - Critical：即时通知\n   - Warning：5分钟聚合一次\n\n6. 智能抑制\n   - 根据依赖关系抑制\n   - 优先抑制下游服务告警"}
            isOpen={openFaq === 2}
            onClick={() => toggleFaq(2)}
          />
          <FaqCard
            number={3}
            question="Grafana 面板加载很慢如何优化？"
            answer={"Grafana 查询优化：\n\n1. 减少查询时间范围\n   - 避免查询超过30天的数据\n   - 使用时间范围下拉框限制\n\n2. 优化 PromQL 查询\n   ```promql\n   # 差：全量扫描\n   http_server_requests_seconds_count\n   \n   # 好：精确匹配\n   http_server_requests_seconds_count{service=\"order\"}\n   ```\n\n3. 使用 Recording Rules\n   ```yaml\n   # rules/recordings.yml\n   groups:\n     - name: performance_records\n       interval: 30s\n       rules:\n         - record: job:http_requests:rate5m\n           expr: sum(rate(http_server_requests_seconds_count[5m])) by (service)\n   ```\n\n4. 降低数据精度\n   - 使用 `rate[5m]` 而非 `rate[1m]`\n   - 聚合后再计算百分位\n\n5. 分片查询\n   - 大面板拆分为多个小面板\n   - 使用变量实现级联过滤\n\n6. 缓存策略\n   - 启用 Grafana 查询缓存\n   - 合理设置刷新间隔（最低 30s）\n\n7. Prometheus 优化\n   - 增加存储内存\n   --storage.tsdb.retention.time=15d\n   - 启用 TLS 压缩"}
            isOpen={openFaq === 3}
            onClick={() => toggleFaq(3)}
          />
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">下一步学习</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <a href="/logging" className="block bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-200 rounded-lg p-6 hover:shadow-lg transition">
            <h3 className="text-xl font-bold text-green-900 mb-2">📝 日志聚合</h3>
            <p className="text-gray-700 text-sm">ELK Stack 日志收集与分析</p>
          </a>
          <a href="/skywalking" className="block bg-gradient-to-br from-purple-50 to-purple-100 border-2 border-purple-200 rounded-lg p-6 hover:shadow-lg transition">
            <h3 className="text-xl font-bold text-purple-900 mb-2">🔍 链路追踪</h3>
            <p className="text-gray-700 text-sm">SkyWalking 分布式追踪</p>
          </a>
        </div>
      </section>
    </div>
  );
};
