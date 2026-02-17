import { useState } from 'react';
import { CodeBlock } from '../components';

interface PillarCardProps {
  title: string;
  description: string;
  icon: string;
  color: string;
  details: string[];
}

const PillarCard: React.FC<PillarCardProps> = ({ title, description, icon, color, details }) => {
  const colorClasses = {
    blue: 'bg-blue-50 border-blue-200',
    green: 'bg-green-50 border-green-200',
    purple: 'bg-purple-50 border-purple-200',
  };

  return (
    <div className={`p-6 border-2 rounded-lg ${colorClasses[color as keyof typeof colorClasses]}`}>
      <div className="flex items-center mb-4">
        <span className="text-4xl mr-3">{icon}</span>
        <h3 className="text-2xl font-bold text-gray-900">{title}</h3>
      </div>
      <p className="text-gray-700 mb-4">{description}</p>
      <ul className="text-sm text-gray-700 space-y-2">
        {details.map((detail, index) => (
          <li key={index}>• {detail}</li>
        ))}
      </ul>
    </div>
  );
};

interface ToolCardProps {
  name: string;
  category: string;
  description: string;
  features: string[];
  icon: string;
  color: string;
}

const ToolCard: React.FC<ToolCardProps> = ({ name, category, description, features, icon, color }) => {
  const colorClasses = {
    blue: 'border-blue-300',
    green: 'border-green-300',
    purple: 'border-purple-300',
    orange: 'border-orange-300',
  };

  return (
    <div className={`bg-white border-2 ${colorClasses[color as keyof typeof colorClasses]} rounded-lg p-5`}>
      <div className="flex items-center mb-3">
        <span className="text-3xl mr-3">{icon}</span>
        <div>
          <span className="text-xs px-2 py-1 bg-gray-100 rounded">{category}</span>
          <h3 className="text-xl font-bold text-gray-900 mt-2">{name}</h3>
        </div>
      </div>
      <p className="text-gray-700 text-sm mb-3">{description}</p>
      <div>
        <h4 className="font-semibold text-gray-900 text-sm mb-2">核心特性</h4>
        <ul className="text-xs text-gray-600 space-y-1">
          {features.map((feature, index) => (
            <li key={index}>• {feature}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

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

interface SloCardProps {
  level: string;
  description: string;
  target: string;
  budget: string;
  color: string;
}

const SloCard: React.FC<SloCardProps> = ({ level, description, target, budget, color }) => {
  const colorClasses = {
    gold: 'bg-yellow-50 border-yellow-200',
    silver: 'bg-gray-50 border-gray-300',
    bronze: 'bg-orange-50 border-orange-200',
  };

  return (
    <div className={`p-5 border-2 rounded-lg ${colorClasses[color as keyof typeof colorClasses]}`}>
      <h3 className="text-xl font-bold text-gray-900 mb-2">{level}</h3>
      <p className="text-sm text-gray-700 mb-3">{description}</p>
      <div className="bg-white rounded p-3">
        <p className="text-xs text-gray-600">
          <span className="font-semibold">可用性目标:</span> {target}
        </p>
        <p className="text-xs text-gray-600 mt-1">
          <span className="font-semibold">年停机预算:</span> {budget}
        </p>
      </div>
    </div>
  );
};

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
            <h1 className="text-4xl font-bold mb-2">监控告警体系</h1>
            <p className="text-purple-100 text-lg">构建企业级可观测性平台</p>
          </div>
          <div className="flex gap-3 text-sm">
            <span className="px-3 py-1 bg-white/20 rounded-full">🏗️ 架构师</span>
            <span className="px-3 py-1 bg-white/20 rounded-full">⏱️ 约120分钟</span>
            <span className="px-3 py-1 bg-white/20 rounded-full">📚 20个知识点</span>
          </div>
        </div>
      </div>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">为什么需要监控告警体系?</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-red-50 border-2 border-red-200 rounded-lg p-5">
            <h3 className="text-xl font-bold text-red-900 mb-3">❌ 无监控的痛点</h3>
            <ul className="text-gray-700 space-y-2">
              <li>• 故障发现滞后，依赖用户反馈</li>
              <li>• 问题定位困难，排查耗时长</li>
              <li>• 性能瓶颈难以识别</li>
              <li>• 无法量化系统健康度</li>
              <li>• 容量规划缺乏依据</li>
              <li>• 业务异常无法及时感知</li>
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
              <li>• 业务监控，保障用户体验</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">一、可观测性三支柱</h2>

        <div className="bg-white border-2 border-blue-200 rounded-lg p-6 mb-6">
          <p className="text-gray-700 text-lg mb-4">
            <strong>可观测性 (Observability)</strong> 是指通过系统的外部输出来理解系统内部状态的能力。
            Google SRE 提出的<strong className="text-blue-600">三大支柱</strong>构成了完整的可观测性体系。
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="bg-blue-50 p-4 rounded border border-blue-200">
              <h4 className="font-bold text-blue-900 mb-2">📊 Metrics 指标</h4>
              <p className="text-sm text-gray-700">数值型时间序列数据，回答"发生了什么"</p>
              <p className="text-xs text-gray-600 mt-2">例如：QPS、RT、错误率、CPU使用率</p>
            </div>
            <div className="bg-green-50 p-4 rounded border border-green-200">
              <h4 className="font-bold text-green-900 mb-2">🔍 Traces 链路</h4>
              <p className="text-sm text-gray-700">请求的完整调用路径，回答"在哪里发生"</p>
              <p className="text-xs text-gray-600 mt-2">例如：TraceID、SpanID、服务拓扑</p>
            </div>
            <div className="bg-purple-50 p-4 rounded border border-purple-200">
              <h4 className="font-bold text-purple-900 mb-2">📝 Logs 日志</h4>
              <p className="text-sm text-gray-700">离散的文本记录，回答"为什么发生"</p>
              <p className="text-xs text-gray-600 mt-2">例如：ERROR日志、异常堆栈、调试信息</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <PillarCard
            title="Metrics 指标监控"
            description="通过数值型数据监控系统的运行状态，是最基础的可观测性能力"
            icon="📊"
            color="blue"
            details={[
              'RED 方法：Rate (请求率), Errors (错误率), Duration (延迟)',
              'USE 方法：Utilization (利用率), Saturation (饱和度), Errors (错误)',
              '业务指标：订单量、GMV、DAU、转化率',
              '资源指标：CPU、内存、磁盘、网络',
              '聚合类型：Counter (计数器), Gauge (仪表), Histogram (直方图)'
            ]}
          />
          <PillarCard
            title="Traces 链路追踪"
            description="追踪一个请求在微服务间的完整调用路径，定位性能瓶颈"
            icon="🔍"
            color="green"
            details={[
              'TraceID：全局唯一的请求标识',
              'SpanID：每个服务的调用标识',
              'ParentID：调用关系标识，构建调用树',
              'Tags：自定义标签（用户ID、订单ID）',
              'Annotations：时间点事件（错误、重试）',
              'Logs：链路日志，记录详细上下文'
            ]}
          />
          <PillarCard
            title="Logs 日志聚合"
            description="集中收集、存储、分析所有服务的日志，快速定位问题根因"
            icon="📝"
            color="purple"
            details={[
              '结构化日志：JSON 格式，便于解析',
              '日志级别：ERROR、WARN、INFO、DEBUG',
              '关联 TraceID：链路日志关联分析',
              '上下文信息：用户、时间、请求参数',
              '异常堆栈：完整错误信息',
              '日志采样：控制日志量，降低成本'
            ]}
          />
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">二、Prometheus + Grafana 实战</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <ToolCard
            name="Prometheus"
            category="时序数据库"
            description="云原生监控系统，Pull 模式采集指标"
            features={['Pull 模式采集', 'PromQL 查询语言', '服务发现', '告警规则', 'TSDB 存储']}
            icon="📊"
            color="blue"
          />
          <ToolCard
            name="Grafana"
            category="可视化平台"
            description="强大的开源可视化与告警平台"
            features={['灵活仪表盘', '多数据源支持', '告警通知', '模板变量', '插件生态']}
            icon="🎨"
            color="purple"
          />
          <ToolCard
            name="AlertManager"
            category="告警路由"
            description="Prometheus 告警管理与分发组件"
            features={['告警聚合', '告警抑制', '告警路由', '多渠道通知', '静默管理']}
            icon="🚨"
            color="orange"
          />
          <ToolCard
            name="Node Exporter"
            category="主机监控"
            description="采集主机级别的系统指标"
            features={['CPU/内存', '磁盘I/O', '网络统计', '文件系统', '系统负载']}
            icon="💻"
            color="green"
          />
        </div>

        <div className="bg-white border-2 border-slate-200 rounded-lg p-6 mb-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">1. Spring Boot Actuator 集成</h3>
          <h4 className="font-bold text-gray-900 mb-2">pom.xml 依赖配置</h4>
          <CodeBlock
            language="xml"
            code={`<dependencies>
    <!-- Spring Boot Actuator -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-actuator</artifactId>
    </dependency>

    <!-- Micrometer Prometheus Registry -->
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

        <div className="bg-white border-2 border-slate-200 rounded-lg p-6 mb-6">
          <h4 className="font-bold text-gray-900 mb-2">application.yml 配置</h4>
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
        step: 30s  # 采集间隔
    tags:
      application: $\{spring.application.name\}
      environment: $\{spring.profiles.active\}
      region: $\{REGION:cn-north\}
    distribution:
      percentiles-histogram:
        http.server.requests: true
      percentiles:
        http.server.requests: 0.5, 0.95, 0.99
      sla:
        http.server.requests: 100ms, 500ms, 1s, 2s
      # 启用 Prometheus 的总结
      summary:
        http.server.requests:
          percentiles: [0.5, 0.95, 0.99]

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
      service-host-type: ip_name
    # 健康检查周期
    period: 10000
    connect-timeout: 5000`}
          />
        </div>

        <div className="bg-white border-2 border-slate-200 rounded-lg p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">2. Prometheus 配置</h3>
          <h4 className="font-bold text-gray-900 mb-2">prometheus.yml 采集配置</h4>
          <CodeBlock
            language="yaml"
            code={`global:
  scrape_interval: 15s
  evaluation_interval: 15s
  external_labels:
    cluster: 'production'
    env: 'prod'
    datacenter: 'cn-north-1'

# 告警规则文件
rule_files:
  - 'rules/*.yml'
  - 'alerts/*.yml'

# 告警管理器配置
alerting:
  alertmanagers:
    - static_configs:
        - targets:
            - 'alertmanager:9093'

# 服务发现配置
scrape_configs:
  # Spring Boot 应用
  - job_name: 'spring-boot-apps'
    metrics_path: '/actuator/prometheus'
    scrape_interval: 30s
    static_configs:
      - targets:
          - 'order-service:8080'
          - 'product-service:8080'
          - 'user-service:8080'
        labels:
          service: 'microservices'
          team: 'backend'

  # Kubernetes 服务发现
  - job_name: 'kubernetes-pods'
    kubernetes_sd_configs:
      - role: pod
        namespaces:
          names:
            - production
            - staging
    relabel_configs:
      # 只采集带注解的 Pod
      - source_labels: [__meta_kubernetes_pod_annotation_prometheus_io_scrape]
        action: keep
        regex: true
      # 自定义采集路径
      - source_labels: [__meta_kubernetes_pod_annotation_prometheus_io_path]
        action: replace
        target_label: __metrics_path__
        regex: (.+)
      # 自定义端口
      - source_labels: [__address__, __meta_kubernetes_pod_annotation_prometheus_io_port]
        action: replace
        regex: ([^:]+)(?::\\d+)?;(\\d+)
        replacement: $\$1:\$\$2
        target_label: __address__
      # 添加 Pod 标签
      - action: labelmap
        regex: __meta_kubernetes_pod_label_(.+)
      # 添加命名空间标签
      - source_labels: [__meta_kubernetes_namespace]
        action: replace
        target_label: kubernetes_namespace
      # 添加 Pod 名称
      - source_labels: [__meta_kubernetes_pod_name]
        action: replace
        target_label: pod_name

  # Node Exporter（主机监控）
  - job_name: 'node-exporter'
    static_configs:
      - targets:
          - 'node-exporter:9100'
        labels:
          service: 'infrastructure'

  # Kubernetes API Server
  - job_name: 'kubernetes-apiservers'
    kubernetes_sd_configs:
      - role: endpoints
    scheme: https
    tls_config:
      ca_file: /var/run/secrets/kubernetes.io/serviceaccount/ca.crt
    bearer_token_file: /var/run/secrets/kubernetes.io/serviceaccount/token
    relabel_configs:
      - source_labels: [__meta_kubernetes_namespace, __meta_kubernetes_service_name, __meta_kubernetes_endpoint_port_name]
        action: keep
        regex: default;kubernetes;https`}
          />
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">三、Micrometer 指标采集</h2>

        <div className="bg-white border-2 border-slate-200 rounded-lg p-6 mb-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">自定义业务指标</h3>
          <CodeBlock
            language="java"
            code={`import io.micrometer.core.instrument.*;
import io.micrometer.core.instrument.distribution.CountAtBucket;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicLong;

/**
 * 业务指标收集器
 * 演示如何自定义业务指标并暴露给 Prometheus
 */
@Component
public class BusinessMetrics {

    private final Counter orderCreatedCounter;
    private final Counter orderPaidCounter;
    private final Timer orderProcessTimer;
    private final DistributionSummary orderAmountSummary;
    private final MeterRegistry meterRegistry;
    private final ConcurrentHashMap<String, AtomicLong> inventoryGauges;

    public BusinessMetrics(MeterRegistry meterRegistry) {
        this.meterRegistry = meterRegistry;
        this.inventoryGauges = new ConcurrentHashMap<>();

        // 1. Counter: 订单创建计数器
        this.orderCreatedCounter = Counter.builder("order.created")
            .description("订单创建总数")
            .tag("service", "order-service")
            .tag("type", "counter")
            .register(meterRegistry);

        // 2. Counter: 订单支付计数器
        this.orderPaidCounter = Counter.builder("order.paid")
            .description("订单支付总数")
            .tag("service", "order-service")
            .register(meterRegistry);

        // 3. Timer: 订单处理耗时（记录 P50/P95/P99）
        this.orderProcessTimer = Timer.builder("order.process.duration")
            .description("订单处理耗时分布")
            .tag("service", "order-service")
            .publishPercentiles(0.5, 0.95, 0.99)  // 发布百分位
            .publishPercentileHistogram(true)     // 启用直方图
            .sla(java.time.Duration.ofMillis(100),  // SLA 边界
                 java.time.Duration.ofMillis(500),
                 java.time.Duration.ofSeconds(1))
            .minimumExpectedValue(java.time.Duration.ofMillis(1))
            .maximumExpectedValue(java.time.Duration.ofSeconds(10))
            .register(meterRegistry);

        // 4. DistributionSummary: 订单金额分布
        this.orderAmountSummary = DistributionSummary.builder("order.amount")
            .description("订单金额分布")
            .tag("service", "order-service")
            .baseUnit("cny")  // 单位：人民币
            .publishPercentiles(0.5, 0.95, 0.99)
            .scale(100)  // 缩放因子（元转分）
            .register(meterRegistry);

        // 5. Gauge: 库存数量（需要手动注册）
        Gauge.builder("inventory.total", this, obj -> obj.getTotalInventory())
            .description("商品库存总量")
            .tag("service", "order-service")
            .register(meterRegistry);
    }

    /**
     * 记录订单创建
     * 使用 Counter 记录订单数量
     */
    public void recordOrderCreated(String orderType, String paymentMethod, BigDecimal amount) {
        // 增加订单创建计数
        orderCreatedCounter.increment();

        // 记录带标签的计数
        meterRegistry.counter("order.created",
            "type", orderType,
            "payment", paymentMethod
        ).increment();

        // 记录金额分布
        orderAmountSummary.record(amount.doubleValue());

        // 记录订单创建事件
        meterRegistry.counter("order.created.amount",
            "type", orderType,
            "amount_range", getAmountRange(amount)
        ).increment(amount.doubleValue());
    }

    /**
     * 记录订单处理时间
     * 使用 Timer 记录耗时分布
     */
    public void recordOrderProcessTime(String operation, Runnable runnable) {
        Timer.Sample sample = Timer.start(meterRegistry);
        try {
            runnable.run();
        } finally {
            sample.stop(Timer.builder("order.operation.duration")
                .tag("operation", operation)
                .tag("service", "order-service")
                .register(meterRegistry));
        }
    }

    /**
     * 异步方式记录订单处理时间（支持返回值）
     */
    public <T> T recordOrderProcessTime(String operation, Supplier<T> supplier) {
        Timer.Sample sample = Timer.start(meterRegistry);
        try {
            return supplier.get();
        } finally {
            sample.stop(Timer.builder("order.operation.duration")
                .tag("operation", operation)
                .register(meterRegistry));
        }
    }

    /**
     * 记录库存数量（Gauge 会自动获取当前值）
     */
    public void recordInventory(String productId, int quantity) {
        AtomicLong value = inventoryGauges.computeIfAbsent(
            productId,
            k -> {
                AtomicLong atomic = new AtomicLong(quantity);
                // 注册 Gauge
                Gauge.builder("inventory.quantity", atomic, AtomicLong::get)
                    .tag("product_id", productId)
                    .description("商品库存数量")
                    .register(meterRegistry);
                return atomic;
            }
        );
        value.set(quantity);
    }

    /**
     * 记录业务异常
     */
    public void recordBusinessError(String errorType, String errorDetail) {
        meterRegistry.counter("business.error",
            "type", errorType,
            "detail", errorDetail
        ).increment();
    }

    /**
     * 记录缓存命中率
     */
    public void recordCacheHit(String cacheName, boolean hit) {
        meterRegistry.counter("cache.access",
            "cache", cacheName,
            "result", hit ? "hit" : "miss"
        ).increment();
    }

    /**
     * 记录数据库连接池使用情况
     */
    public void recordDatabasePool(int active, int max, int idle) {
        Gauge.builder("db.pool.active", active, val -> val)
            .tag("service", "order-service")
            .register(meterRegistry);

        Gauge.builder("db.pool.max", max, val -> val)
            .register(meterRegistry);

        Gauge.builder("db.pool.idle", idle, val -> val)
            .register(meterRegistry);
    }

    /**
     * 创建自定义计量器
     */
    public void registerCustomMetrics() {
        // 注册一个函数式计数器
        meterRegistry.more().counter("requests.active",
            Tags.of("service", "order-service"),
            this::getActiveRequests);

        // 注册一个时间序列观察器
        meterRegistry.gauge("queue.size", Tags.empty(),
            new AtomicInteger(0), AtomicInteger::get);
    }

    // 辅助方法
    private String getAmountRange(BigDecimal amount) {
        if (amount.compareTo(new BigDecimal("100")) < 0) return "0-100";
        if (amount.compareTo(new BigDecimal("500")) < 0) return "100-500";
        if (amount.compareTo(new BigDecimal("1000")) < 0) return "500-1000";
        return "1000+";
    }

    private double getTotalInventory() {
        return inventoryGauges.values().stream()
            .mapToLong(AtomicLong::get)
            .sum();
    }

    private double getActiveRequests() {
        // 返回当前活跃请求数
        return 0.0;
    }
}`}
          />
        </div>

        <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-5">
          <h4 className="font-bold text-blue-900 mb-3">📊 Micrometer 四大指标类型</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="font-semibold text-gray-900">Counter 计数器</p>
              <p className="text-gray-700">只增不减，用于请求数、订单数等</p>
              <CodeBlock language="java" code={`Counter.builder("orders.total")
    .register(registry)
    .increment();`} />
            </div>
            <div>
              <p className="font-semibold text-gray-900">Gauge 仪表</p>
              <p className="text-gray-700">可增可减，用于库存、队列长度等</p>
              <CodeBlock language="java" code={`Gauge.builder("queue.size", queue, Queue::size)
    .register(registry);`} />
            </div>
            <div>
              <p className="font-semibold text-gray-900">Timer 计时器</p>
              <p className="text-gray-700">记录耗时分布，P50/P95/P99</p>
              <CodeBlock language="java" code={`Timer.builder("api.latency")
    .publishPercentiles(0.95, 0.99)
    .register(registry)
    .record(() -> {});`} />
            </div>
            <div>
              <p className="font-semibold text-gray-900">DistributionSummary 分布摘要</p>
              <p className="text-gray-700">记录数据分布，如订单金额</p>
              <CodeBlock language="java" code={`DistributionSummary.builder("order.amount")
    .publishPercentiles(0.95)
    .register(registry)
    .record(amount);`} />
            </div>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">四、Grafana Dashboard 设计</h2>

        <div className="bg-white border-2 border-slate-200 rounded-lg p-6 mb-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">核心 PromQL 查询</h3>
          <CodeBlock
            language="promql"
            code={`# ============================================
# 1. QPS（每秒请求数）
# ============================================
# 按 service 分组的 QPS
sum(rate(http_server_requests_seconds_count[1m])) by (service)

# 按 status 分组的 QPS
sum(rate(http_server_requests_seconds_count[1m])) by (status, service)

# 按 URI 分组的 TOP 10 接口
topk(10, sum(rate(http_server_requests_seconds_count[5m])) by (uri))

# ============================================
# 2. 错误率
# ============================================
# HTTP 5xx 错误率
sum(rate(http_server_requests_seconds_count{status=~"5.."}[5m])) by (service)
/
sum(rate(http_server_requests_seconds_count[5m])) by (service)
* 100

# 业务错误率
sum(rate(business_error_count[5m])) by (service)
/
sum(rate(order_created_total[5m])) by (service)

# ============================================
# 3. P95/P99 延迟
# ============================================
# P95 延迟
histogram_quantile(0.95,
  sum(rate(http_server_requests_seconds_bucket[5m])) by (service, le)
)

# P99 延迟
histogram_quantile(0.99,
  sum(rate(http_server_requests_seconds_bucket[5m])) by (service, le)
)

# 按 URI 分组的 P95 延迟
histogram_quantile(0.95,
  sum(rate(http_server_requests_seconds_bucket[5m])) by (uri, le)
)

# ============================================
# 4. JVM 堆内存使用率
# ============================================
jvm_memory_used_bytes{area="heap"}
/
jvm_memory_max_bytes{area="heap"}
* 100

# JVM 非堆内存使用率
jvm_memory_used_bytes{area="nonheap"}
/
jvm_memory_max_bytes{area="nonheap"}
* 100

# ============================================
# 5. GC 时间占比
# ============================================
# GC 平均耗时
rate(jvm_gc_pause_seconds_sum[5m])
/
rate(jvm_gc_pause_seconds_count[5m])

# GC 次数
rate(jvm_gc_pause_seconds_count[5m])

# ============================================
# 6. 线程数
# ============================================
jvm_threads_live_threads

jvm_threads_state_threads{state="RUNNABLE"}

# ============================================
# 7. HTTP 请求状态分布
# ============================================
sum(http_server_requests_seconds_count) by (status)

# ============================================
# 8. 数据库连接池使用率
# ============================================
hikaricp_connections_active
/
hikaricp_connections_max
* 100

# 连接池等待线程数
hikaricp_connections_pending

# ============================================
# 9. Redis 命令执行耗时
# ============================================
rate(redis_command_duration_seconds_sum[5m])
/
rate(redis_command_duration_seconds_count[5m])

# ============================================
# 10. 容器 CPU 使用率
# ============================================
sum(rate(container_cpu_usage_seconds_total{image!=""}[5m])) by (pod_name)
/
sum(container_spec_cpu_quota{image!=""} / container_spec_cpu_period{image!=""}) by (pod_name)
* 100

# ============================================
# 11. 业务指标
# ============================================
# 订单创建速率
sum(rate(order_created_total[1m])) by (type)

# 订单支付成功率
sum(rate(order_paid_total{status="success"}[5m]))
/
sum(rate(order_paid_total[5m]))

# GMV（成交金额）
sum(increase(order_amount_sum[1h]))

# ============================================
# 12. 缓存命中率
# ============================================
sum(rate(cache_access_total{result="hit"}[5m]))
/
sum(rate(cache_access_total[5m]))
* 100`}
          />
        </div>

        <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-5 mb-6">
          <h4 className="font-bold text-blue-900 mb-3">🎨 推荐的 Grafana 面板</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="font-semibold text-gray-900">应用监控面板</p>
              <ul className="text-gray-700 mt-2 space-y-1">
                <li>• Spring Boot 2.1 Dashboard (ID: 11378)</li>
                <li>• JVM Micrometer Dashboard (ID: 4701)</li>
                <li>• Redis Dashboard (ID: 11835)</li>
              </ul>
            </div>
            <div>
              <p className="font-semibold text-gray-900">基础设施监控</p>
              <ul className="text-gray-700 mt-2 space-y-1">
                <li>• Node Exporter Full (ID: 1860)</li>
                <li>• Kubernetes Cluster Monitoring (ID: 7249)</li>
                <li>• Prometheus Stats (ID: 2)</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-white border-2 border-slate-200 rounded-lg p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">自定义 Dashboard JSON 示例</h3>
          <CodeBlock
            language="json"
            code={`{
  "dashboard": {
    "title": "Spring Boot Microservices Monitor",
    "tags": ["spring-boot", "micrometer"],
    "timezone": "browser",
    "panels": [
      {
        "id": 1,
        "title": "QPS by Service",
        "type": "graph",
        "targets": [
          {
            "expr": "sum(rate(http_server_requests_seconds_count[1m])) by (service)",
            "legendFormat": "{{service}}"
          }
        ]
      },
      {
        "id": 2,
        "title": "P95 Latency",
        "type": "graph",
        "targets": [
          {
            "expr": "histogram_quantile(0.95, sum(rate(http_server_requests_seconds_bucket[5m])) by (service,le))",
            "legendFormat": "{{service}}"
          }
        ]
      }
    ]
  }
}`}
          />
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">五、AlertManager 告警规则</h2>

        <div className="bg-white border-2 border-slate-200 rounded-lg p-6 mb-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">告警规则 alerts.yml</h3>
          <CodeBlock
            language="yaml"
            code={`groups:
  - name: spring-boot-alerts
    interval: 30s
    rules:
      # ============================================
      # 服务可用性告警
      # ============================================
      - alert: ServiceDown
        expr: up{job="spring-boot-apps"} == 0
        for: 1m
        labels:
          severity: critical
          team: backend
        annotations:
          summary: "服务下线告警"
          description: "{{ $labels.instance }} 服务已下线超过1分钟"
          runbook_url: "https://runbooks.example.com/service-down"

      # ============================================
      # 高错误率告警
      # ============================================
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
          description: "{{ $labels.service }} 错误率超过5% (当前值: {{ $value | humanizePercentage }})"

      # ============================================
      # API 响应慢告警
      # ============================================
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
          description: "{{ $labels.service }} P95延迟超过1秒 (当前值: {{ $value }}s)"

      # ============================================
      # JVM 内存告警
      # ============================================
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
          description: "{{ $labels.service }} 堆内存使用率超过90%"

      # alert: HighMemoryUsageCritical
        expr: |
          jvm_memory_used_bytes{area="heap"}
          /
          jvm_memory_max_bytes{area="heap"}
          > 0.95
        for: 2m
        labels:
          severity: critical
        annotations:
          summary: "堆内存严重告警"
          description: "{{ $labels.service }} 堆内存使用率超过95%，即将 OOM"

      # ============================================
      # GC 频繁告警
      # ============================================
      - alert: FrequentGC
        expr: |
          rate(jvm_gc_pause_seconds_count[5m]) > 10
        for: 5m
        labels:
          severity: warning
        annotations:
          summary: "GC 过于频繁"
          description: "{{ $labels.service }} GC 次数超过10次/分钟"

      # ============================================
      # 数据库连接池告警
      # ============================================
      - alert: DatabasePoolExhausted
        expr: |
          hikaricp_connections_active
          /
          hikaricp_connections_max
          > 0.9
        for: 5m
        labels:
          severity: warning
        annotations:
          summary: "数据库连接池即将耗尽"
          description: "{{ $labels.service }} 连接池使用率超过90%"

      # ============================================
      # 业务指标告警
      # ============================================
      - alert: LowOrderRate
        expr: |
          sum(rate(order_created_total[5m])) < 10
        for: 10m
        labels:
          severity: warning
        annotations:
          summary: "订单量异常低"
          description: "订单创建速率低于10/分钟，请检查业务"

      - alert: PaymentFailureRate
        expr: |
          sum(rate(order_paid_total{status="failed"}[5m]))
          /
          sum(rate(order_paid_total[5m]))
          > 0.1
        for: 5m
        labels:
          severity: critical
        annotations:
          summary: "支付失败率过高"
          description: "支付失败率超过10%，请检查支付通道"

  - name: infrastructure-alerts
    interval: 30s
    rules:
      # ============================================
      # 主机资源告警
      # ============================================
      - alert: HighCPUUsage
        expr: |
          100 - (avg by (instance) (rate(node_cpu_seconds_total{mode="idle"}[5m])) * 100) > 90
        for: 5m
        labels:
          severity: warning
        annotations:
          summary: "主机CPU使用率过高"
          description: "{{ $labels.instance }} CPU使用率超过90%"

      - alert: HighDiskUsage
        expr: |
          (node_filesystem_size_bytes - node_filesystem_free_bytes)
          /
          node_filesystem_size_bytes
          > 0.9
        for: 10m
        labels:
          severity: warning
        annotations:
          summary: "磁盘空间不足"
          description: "{{ $labels.instance }} 磁盘使用率超过90%"

      - alert: DiskSpaceCritical
        expr: |
          (node_filesystem_size_bytes - node_filesystem_free_bytes)
          /
          node_filesystem_size_bytes
          > 0.95
        for: 5m
        labels:
          severity: critical
        annotations:
          summary: "磁盘空间严重告警"
          description: "{{ $labels.instance }} 磁盘使用率超过95%"`}
          />
        </div>

        <div className="bg-white border-2 border-slate-200 rounded-lg p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">AlertManager 路由配置</h3>
          <CodeBlock
            language="yaml"
            code={`global:
  resolve_timeout: 5m
  # SMTP 配置（邮件通知）
  smtp_smarthost: 'smtp.example.com:587'
  smtp_from: 'alertmanager@example.com'
  smtp_auth_username: 'alertmanager@example.com'
  smtp_auth_password: 'password'

# 告警路由树
route:
  # 默认接收器
  receiver: 'default'

  # 按标签分组
  group_by: ['alertname', 'cluster', 'service']

  # 等待时间，聚合同组告警
  group_wait: 10s

  # 发送前等待新告警的时间
  group_interval: 10s

  # 重复发送间隔
  repeat_interval: 1h

  # 子路由
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
      group_interval: 10m

    # 数据库相关告警
    - match:
        alertname: 'DatabasePoolExhausted'
      receiver: 'db-team'
      group_wait: 30s

    # 业务指标告警
    - match:
        alertname: 'LowOrderRate|PaymentFailureRate'
      receiver: 'business-team'
      group_wait: 1m

# 告警接收器
receivers:
  - name: 'default'
    webhook_configs:
      - url: 'http://alert-webhook:8080/webhook'

  # Critical 告警 - 钉钉 + 短信
  - name: 'critical-alerts'
    # 钉钉通知
    dingtalk_configs:
      - webhook_url: 'https://oapi.dingtalk.com/robot/send?access_token=xxx'
        message: |
          {
            "msgtype": "markdown",
            "markdown": {
              "title": "🚨 紧急告警",
              "text": "## 告警通知\\n\\n**告警名称**: {{ .GroupLabels.alertname }}\\n**严重级别**: {{ .CommonLabels.severity }}\\n**服务**: {{ .CommonLabels.service }}\\n**实例**: {{ .CommonLabels.instance }}\\n**详情**: {{ .CommonAnnotations.description }}\\n**开始时间**: {{ .StartsAt }}\\n**Runbook**: {{ .CommonAnnotations.runbook_url }}"
            }
          }
        # @all
        atMobiles: ["13800000000"]
        isAtAll: true

    # 短信通知
    webhook_configs:
      - url: 'http://sms-gateway:8080/send'
        http_config:
          bearer_token: 'your-token'

  # Warning 告警 - 邮件
  - name: 'warning-alerts'
    email_configs:
      - to: 'ops-team@example.com'
        from: 'alertmanager@example.com'
        smarthost: 'smtp.example.com:587'
        auth_username: 'alertmanager@example.com'
        auth_password: 'password'
        headers:
          Subject: '⚠️ [WARNING] {{ .GroupLabels.alertname }}'
        html: |
          <html>
          <body>
            <h2>{{ .GroupLabels.alertname }}</h2>
            <p><strong>严重级别:</strong> {{ .CommonLabels.severity }}</p>
            <p><strong>服务:</strong> {{ .CommonLabels.service }}</p>
            <p><strong>描述:</strong> {{ .CommonAnnotations.description }}</p>
            <p><strong>开始时间:</strong> {{ .StartsAt }}</p>
            {{ range .Alerts }}
            <hr>
            <p>{{ .Annotations.description }}</p>
            {{ end }}
          </body>
          </html>

  # 数据库团队
  - name: 'db-team'
    email_configs:
      - to: 'db-team@example.com'

  # 业务团队
  - name: 'business-team'
    webhook_configs:
      - url: 'http://business-webhook:8080/alert'

# 告警抑制规则（避免告警风暴）
inhibit_rules:
  # 如果服务已下线，抑制该服务的其他告警
  - source_match:
      severity: 'critical'
      alertname: 'ServiceDown'
    target_match:
      severity: 'warning'
    equal: ['service', 'instance']

  # 如果 Critical 级别告警触发，抑制 Warning 级别
  - source_match:
      severity: 'critical'
    target_match:
      severity: 'warning'
    equal: ['service']`}
          />
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">六、ELK Stack 日志聚合</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <ToolCard
            name="Elasticsearch"
            category="搜索引擎"
            description="分布式搜索和分析引擎"
            features={['全文检索', '实时分析', '水平扩展', '高可用性', 'RESTful API']}
            icon="🔍"
            color="purple"
          />
          <ToolCard
            name="Logstash"
            category="日志处理"
            description="服务端数据处理管道"
            features={['实时管道', '插件生态', '数据转换', '多种输入输出', '正则匹配']}
            icon="⚙️"
            color="green"
          />
          <ToolCard
            name="Kibana"
            category="可视化"
            description="数据可视化仪表盘"
            features={['日志查询', '仪表盘', '图表分析', '字段分析', '监控告警']}
            icon="📊"
            color="blue"
          />
        </div>

        <div className="bg-white border-2 border-slate-200 rounded-lg p-6 mb-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">1. 添加 Logstash 依赖</h3>
          <CodeBlock
            language="xml"
            code={`<!-- pom.xml -->
<dependency>
    <groupId>net.logstash.logback</groupId>
    <artifactId>logstash-logback-encoder</artifactId>
    <version>7.4</version>
</dependency>`}
          />
        </div>

        <div className="bg-white border-2 border-slate-200 rounded-lg p-6 mb-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">2. 配置 logback-spring.xml</h3>
          <CodeBlock
            language="xml"
            code={`<?xml version="1.0" encoding="UTF-8"?>
<configuration>
    <!-- 控制台输出 -->
    <appender name="CONSOLE" class="ch.qos.logback.core.ConsoleAppender">
        <encoder>
            <pattern>%d{yyyy-MM-dd HH:mm:ss.SSS} [%thread] %-5level %logger{50} - %msg%n</pattern>
        </encoder>
    </appender>

    <!-- Logstash TCP 输出 -->
    <appender name="LOGSTASH" class="net.logstash.logback.appender.LogstashTcpSocketAppender">
        <destination>localhost:5000</destination>
        <encoder class="net.logstash.logback.encoder.LogstashEncoder">
            <!-- 自定义字段 -->
            <customFields>{"service":"order-service","environment":"production"}</customFields>
            <!-- 包含堆栈跟踪 -->
            <includeStructuredArguments>true</includeStructuredArguments>
            <!-- 包含 MDC -->
            <includeMdc>true</includeMdc>
            <!-- 包含调用者信息 -->
            <includeCallerData>false</includeCallerData>
            <!-- 短字段名 -->
            <shortenedLoggerNameLength>20</shortenedLoggerNameLength>
        </encoder>
        <!-- 连接超时 -->
        <connectionTimeout>5000</connectionTimeout>
        <!-- 重连延迟 -->
        <reconnectionDelay>10 seconds</reconnectionDelay>
    </appender>

    <!-- 文件输出（按天滚动） -->
    <appender name="FILE" class="ch.qos.logback.core.rolling.RollingFileAppender">
        <file>logs/order-service.log</file>
        <encoder class="net.logstash.logback.encoder.LogstashEncoder"/>
        <rollingPolicy class="ch.qos.logback.core.rolling.TimeBasedRollingPolicy">
            <fileNamePattern>logs/order-service-%d{yyyy-MM-dd}.log</fileNamePattern>
            <maxHistory>30</maxHistory>
            <totalSizeCap>10GB</totalSizeCap>
        </rollingPolicy>
    </appender>

    <!-- 异步日志（提升性能） -->
    <appender name="ASYNC_LOGSTASH" class="ch.qos.logback.classic.AsyncAppender">
        <appender-ref ref="LOGSTASH"/>
        <queueSize>512</queueSize>
        <discardingThreshold>0</discardingThreshold>
        <neverBlock>true</neverBlock>
    </appender>

    <!-- Logger 配置 -->
    <logger name="com.example.order" level="DEBUG"/>
    <logger name="org.springframework" level="INFO"/>
    <logger name="org.apache.dubbo" level="INFO"/>

    <root level="INFO">
        <appender-ref ref="CONSOLE"/>
        <appender-ref ref="ASYNC_LOGSTASH"/>
        <appender-ref ref="FILE"/>
    </root>
</configuration>`}
          />
        </div>

        <div className="bg-white border-2 border-slate-200 rounded-lg p-6 mb-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">3. Logstash Pipeline 配置</h3>
          <CodeBlock
            language="ruby"
            code={`input {
  # TCP 输入（应用日志）
  tcp {
    port => 5000
    codec => json_lines
    type => "application"
  }

  # Filebeat 输入（可选）
  beats {
    port => 5044
    type => "filebeat"
  }
}

filter {
  # 解析 JSON 日志
  if [type] == "application" {
    json {
      source => "message"
    }

    # 提取时间戳
    date {
      match => ["@timestamp", "ISO8601"]
      target => "@timestamp"
    }

    # 提取 TraceID（如果存在）
    grok {
      match => { "message" => ".*TraceId=%{DATA:traceId}.*" }
      tag_on_failure => []
    }

    # 解析错误日志
    if [level] == "ERROR" {
      mutate {
        add_tag => ["error"]
      }

      # 提取异常类型
      grok {
        match => { "message" => "(?<exception_type>\\w+Exception):" }
        tag_on_failure => []
      }
    }

    # 解析 HTTP 状态码
    grok {
      match => { "message" => "status=%{NUMBER:http_status}" }
      tag_on_failure => []
    }

    # 添加地理位置（可选）
    if [client_ip] {
      geoip {
        source => "client_ip"
        target => "geoip"
        fields => ["city_name", "country_name", "location"]
      }
    }

    # 移除不需要的字段
    mutate {
      remove_field => ["port", "host"]
    }
  }

  # 处理 Filebeat 输入
  if [type] == "filebeat" {
    # 解析 Nginx 日志
    if [log][file][path] =~ "nginx" {
      grok {
        match => { "message" => "%{NGINXACCESS}" }
      }
    }
  }
}

output {
  # 输出到 Elasticsearch
  elasticsearch {
    hosts => ["http://localhost:9200"]
    # 索引命名
    index => "order-service-%{+YYYY.MM.dd}"
    # 文档类型
    document_type => "_doc"
    # 基于 service 标签创建子索引
    index => "%{[service]}-%{+YYYY.MM.dd}"
    # 用户名密码
    user => "elastic"
    password => "changeme"
  }

  # 错误日志单独索引
  if "error" in [tags] {
    elasticsearch {
      hosts => ["http://localhost:9200"]
      index => "order-service-error-%{+YYYY.MM.dd}"
    }
  }

  # 调试输出（开发环境）
  stdout { codec => rubydebug }
}`}
          />
        </div>

        <div className="bg-white border-2 border-slate-200 rounded-lg p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">4. Kibana 查询与分析</h3>
          <CodeBlock
            language="bash"
            code={`# 访问 http://localhost:5601

# 1. 创建索引模式
# Management > Index Patterns > Create index pattern
# 输入: order-service-*
# 时间字段: @timestamp

# 2. Kibana Dev Tools 查询
GET order-service-*/_search
{
  "size": 20,
  "sort": [
    { "@timestamp": { "order": "desc" }
  ],
  "query": {
    "bool": {
      "must": [
        { "match": { "level": "ERROR" }
      ],
      "filter": [
        { "range": {
            "@timestamp": {
              "gte": "now-1h"
            }
          }
        }
      ]
    }
  }
}

# 3. 查询特定 TraceID 的所有日志
GET order-service-*/_search
{
  "query": {
    "match": {
      "traceId": "1234567890abcdef"
    }
  },
  "sort": [
    { "@timestamp": "asc" }
  ],
  "size": 100
}

# 4. 聚合分析：错误类型统计
GET order-service-*/_search
{
  "size": 0,
  "query": {
    "match": { "level": "ERROR" }
  },
  "aggs": {
    "error_types": {
      "terms": {
        "field": "exception_type.keyword",
        "size": 10
      }
    }
  }
}

# 5. 聚合分析：慢请求 Top 10
GET order-service-*/_search
{
  "size": 0,
  "query": {
    "range": {
      "duration": {
        "gte": 1000
      }
    }
  },
  "aggs": {
    "slow_endpoints": {
      "terms": {
        "field": "uri.keyword",
        "order": { "avg_duration": "desc" },
        "size": 10
      },
      "aggs": {
        "avg_duration": {
          "avg": { "field": "duration" }
        }
      }
    }
  }
}

# 6. 创建可视化
# Visualize > Create visualization > Pie
# Aggregation: Terms
# Field: level.keyword
# 显示各日志级别的分布

# 7. 创建仪表盘
# Dashboard > Create dashboard
# 添加多个可视化面板`}
          />
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">七、SLO/SLI/SLA 设计</h2>

        <div className="bg-white border-2 border-blue-200 rounded-lg p-6 mb-6">
          <p className="text-gray-700 text-lg mb-4">
            <strong>SLO (Service Level Objective)</strong> 服务等级目标：
            定义服务的预期质量水平，如"99.9%的请求在100ms内完成"。
          </p>
          <p className="text-gray-700 text-lg mb-4">
            <strong>SLI (Service Level Indicator)</strong> 服务等级指标：
            衡量服务水平的具体指标，如延迟、错误率、可用性。
          </p>
          <p className="text-gray-700 text-lg">
            <strong>SLA (Service Level Agreement)</strong> 服务等级协议：
            与客户或内部团队约定的正式服务水平承诺。
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <SloCard
            level="🥇 金牌服务 (Gold)"
            description="核心业务，最高可用性要求"
            target="99.99% (4个9)"
            budget="52.56分钟/年"
            color="gold"
          />
          <SloCard
            level="🥈 银牌服务 (Silver)"
            description="重要业务，高可用性要求"
            target="99.9% (3个9)"
            budget="8.76小时/年"
            color="silver"
          />
          <SloCard
            level="🥉 铜牌服务 (Bronze)"
            description="一般业务，标准可用性"
            target="99% (2个9)"
            budget="3.65天/年"
            color="bronze"
          />
        </div>

        <div className="bg-white border-2 border-slate-200 rounded-lg p-6 mb-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">常见 SLI 指标定义</h3>
          <CodeBlock
            language="yaml"
            code={`# ============================================
# 1. 可用性 (Availability)
# ============================================
# 服务可用时间 / 总时间
# 目标: 99.9%
sli:
  availability:
    name: "服务可用率"
    description: "服务能够正常响应请求的时间比例"
    query: |
      sum(rate(up{job="order-service"}[5m]))
      /
      sum(count(up{job="order-service"})[5m])
    slo_target: 0.999

# ============================================
# 2. 延迟 (Latency)
# ============================================
# 请求响应时间分布
# 目标: P95 < 100ms, P99 < 500ms
sli:
  latency:
    name: "请求延迟"
    description: "请求的响应时间分布"
    query_p95: |
      histogram_quantile(0.95,
        sum(rate(http_server_requests_seconds_bucket[5m])) by (le)
      )
    query_p99: |
      histogram_quantile(0.99,
        sum(rate(http_server_requests_seconds_bucket[5m])) by (le)
      )
    slo_target_p95: 0.1  # 100ms
    slo_target_p99: 0.5  # 500ms

# ============================================
# 3. 错误率 (Error Rate)
# ============================================
# HTTP 5xx 错误率
# 目标: < 0.1%
sl_i:
  error_rate:
    name: "错误率"
    description: "HTTP 5xx 错误请求的比例"
    query: |
      sum(rate(http_server_requests_seconds_count{status=~"5.."}[5m]))
      /
      sum(rate(http_server_requests_seconds_count[5m]))
    slo_target: 0.001  # 0.1%

# ============================================
# 4. 吞吐量 (Throughput)
# ============================================
# 每秒处理的请求数
# 目标: > 1000 QPS
sl_i:
  throughput:
    name: "吞吐量"
    description: "系统每秒处理的请求数"
    query: |
      sum(rate(http_server_requests_seconds_count[1m]))
    slo_target: 1000

# ============================================
# 5. 饱和度 (Saturation)
# ============================================
# 资源使用率（CPU、内存、连接池）
# 目标: CPU < 70%, Memory < 80%
sl_i:
  saturation:
    name: "资源饱和度"
    description: "系统资源的使用程度"
    query_cpu: |
      100 - (avg(rate(node_cpu_seconds_total{mode="idle"}[5m])) * 100)
    query_memory: |
      jvm_memory_used_bytes{area="heap"}
      /
      jvm_memory_max_bytes{area="heap"}
      * 100
    slo_target_cpu: 70
    slo_target_memory: 80

# ============================================
# 6. 业务指标
# ============================================
# 订单成功率、支付成功率等
sl_i:
  order_success_rate:
    name: "订单成功率"
    description: "订单创建成功并支付成功的比例"
    query: |
      sum(rate(order_paid_total{status="success"}[5m]))
      /
      sum(rate(order_created_total[5m]))
    slo_target: 0.95  # 95%`}
          />
        </div>

        <div className="bg-white border-2 border-slate-200 rounded-lg p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Error Budget 计算</h3>
          <CodeBlock
            language="yaml"
            code={`# Error Budget = (1 - SLO) * 时间窗口

# ============================================
# 示例1: 99.9% 可用性目标
# ============================================
slo:
  availability: 0.999

# 月度 Error Budget
error_budget:
  monthly:
    # 一个月的总秒数
    total_seconds: 2592000  # 30天 * 24小时 * 60分钟 * 60秒

    # 允许的故障时间
    allowed_downtime:
      calculation: "(1 - 0.999) * 2592000"
      value: 2592  # 秒
      human_readable: "43.2分钟/月"

    # 告警阈值（使用 50% budget）
    alert_threshold:
      calculation: "2592 * 0.5"
      value: 1296  # 秒
      human_readable: "21.6分钟/月"

# ============================================
# 示例2: 99.99% 可用性目标
# ============================================
slo:
  availability: 0.9999

# 年度 Error Budget
error_budget:
  yearly:
    total_seconds: 31536000  # 365天
    allowed_downtime:
      value: 3153.6  # 秒
      human_readable: "52.56分钟/年"

    # 如果故障时间超过预算的 50%，触发告警
    alerting:
      threshold: 0.5
      action: "暂停非关键发布，专注稳定性"

# ============================================
# Error Budget 消耗监控
# ============================================
# Prometheus 告警规则
alert:
  ErrorBudgetBurn:
    expr: |
      # 计算过去 7 天的实际可用性
      1 - (
        sum(increase(up{job="order-service"}==0[7d]))
        /
        sum(count(up{job="order-service"})[7d])
      ) < 0.999
    for: 5m
    labels:
      severity: warning
    annotations:
      summary: "Error Budget 消耗过快"
      description: "过去7天可用性低于99.9%，Error Budget 剩余不足"

# ============================================
# Error Budget 策略
# ============================================
error_budget_policy:
  # 当 Error Budget 消耗 < 50%
  safe_zone:
    condition: "error_budget_consumed < 50%"
    action: "正常发布节奏，持续监控"

  # 当 Error Budget 消耗 50% - 100%
  caution_zone:
    condition: "error_budget_consumed >= 50% and < 100%"
    action: "降低发布频率，增加测试覆盖"

  # 当 Error Budget 消耗 > 100%
  danger_zone:
    condition: "error_budget_consumed >= 100%"
    action: "停止所有非紧急发布，全力修复问题"`}
          />
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">八、完整监控方案实战</h2>

        <div className="bg-white border-2 border-slate-200 rounded-lg p-6 mb-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Docker Compose 部署完整监控栈</h3>
          <CodeBlock
            language="yaml"
            code={`version: '3.8'

services:
  # ============================================
  # Prometheus
  # ============================================
  prometheus:
    image: prom/prometheus:v2.47.0
    container_name: prometheus
    ports:
      - "9090:9090"
    volumes:
      - ./prometheus/prometheus.yml:/etc/prometheus/prometheus.yml
      - ./prometheus/rules:/etc/prometheus/rules
      - prometheus-data:/prometheus
    command:
      - '--config.file=/etc/prometheus/prometheus.yml'
      - '--storage.tsdb.path=/prometheus'
      - '--storage.tsdb.retention.time=15d'
      - '--web.console.libraries=/etc/prometheus/console_libraries'
      - '--web.console.templates=/etc/prometheus/consoles'
      - '--web.enable-lifecycle'
    networks:
      - monitoring
    restart: unless-stopped

  # ============================================
  # Grafana
  # ============================================
  grafana:
    image: grafana/grafana:10.1.0
    container_name: grafana
    ports:
      - "3000:3000"
    environment:
      - GF_SECURITY_ADMIN_USER=admin
      - GF_SECURITY_ADMIN_PASSWORD=admin123
      - GF_INSTALL_PLUGINS=grafana-piechart-panel
    volumes:
      - grafana-data:/var/lib/grafana
      - ./grafana/provisioning:/etc/grafana/provisioning
      - ./grafana/dashboards:/var/lib/grafana/dashboards
    networks:
      - monitoring
    restart: unless-stopped
    depends_on:
      - prometheus

  # ============================================
  # AlertManager
  # ============================================
  alertmanager:
    image: prom/alertmanager:v0.26.0
    container_name: alertmanager
    ports:
      - "9093:9093"
    volumes:
      - ./alertmanager/alertmanager.yml:/etc/alertmanager/alertmanager.yml
      - alertmanager-data:/alertmanager
    command:
      - '--config.file=/etc/alertmanager/alertmanager.yml'
      - '--storage.path=/alertmanager'
    networks:
      - monitoring
    restart: unless-stopped

  # ============================================
  # Node Exporter (主机监控)
  # ============================================
  node-exporter:
    image: prom/node-exporter:v1.6.1
    container_name: node-exporter
    ports:
      - "9100:9100"
    volumes:
      - /proc:/host/proc:ro
      - /sys:/host/sys:ro
      - /:/rootfs:ro
    command:
      - '--path.procfs=/host/proc'
      - '--path.sysfs=/host/sys'
      - '--collector.filesystem.mount-points-exclude=^/(sys|proc|dev|host|etc)($$|/)'
    networks:
      - monitoring
    restart: unless-stopped

  # ============================================
  # cAdvisor (容器监控)
  # ============================================
  cadvisor:
    image: gcr.io/cadvisor/cadvisor:v0.47.0
    container_name: cadvisor
    ports:
      - "8080:8080"
    volumes:
      - /:/rootfs:ro
      - /var/run:/var/run:ro
      - /sys:/sys:ro
      - /var/lib/docker/:/var/lib/docker:ro
    networks:
      - monitoring
    restart: unless-stopped

  # ============================================
  # Elasticsearch
  # ============================================
  elasticsearch:
    image: docker.elastic.co/elasticsearch/elasticsearch:8.9.0
    container_name: elasticsearch
    ports:
      - "9200:9200"
      - "9300:9300"
    environment:
      - discovery.type=single-node
      - "ES_JAVA_OPTS=-Xms1g -Xmx1g"
      - xpack.security.enabled=false
    volumes:
      - elasticsearch-data:/usr/share/elasticsearch/data
    networks:
      - monitoring
    restart: unless-stopped

  # ============================================
  # Logstash
  # ============================================
  logstash:
    image: docker.elastic.co/logstash/logstash:8.9.0
    container_name: logstash
    ports:
      - "5000:5000/tcp"
      - "5000:5000/udp"
      - "9600:9600"
    volumes:
      - ./logstash/pipeline:/usr/share/logstash/pipeline
    networks:
      - monitoring
    restart: unless-stopped
    depends_on:
      - elasticsearch

  # ============================================
  # Kibana
  # ============================================
  kibana:
    image: docker.elastic.co/kibana/kibana:8.9.0
    container_name: kibana
    ports:
      - "5601:5601"
    environment:
      - ELASTICSEARCH_HOSTS=http://elasticsearch:9200
    networks:
      - monitoring
    restart: unless-stopped
    depends_on:
      - elasticsearch

volumes:
  prometheus-data:
  grafana-data:
  alertmanager-data:
  elasticsearch-data:

networks:
  monitoring:
    driver: bridge`}
          />
        </div>

        <div className="bg-white border-2 border-slate-200 rounded-lg p-6 mb-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">应用启动脚本</h3>
          <CodeBlock
            language="bash"
            code={`#!/bin/bash

# 启动监控栈
docker-compose up -d

echo "等待服务启动..."
sleep 30

echo "==================================="
echo "监控服务访问地址："
echo "==================================="
echo "Prometheus: http://localhost:9090"
echo "Grafana:     http://localhost:3000 (admin/admin123)"
echo "AlertManager: http://localhost:9093"
echo "Kibana:      http://localhost:5601"
echo "Node Exporter: http://localhost:9100/metrics"
echo "cAdvisor:    http://localhost:8080"
echo "==================================="
echo ""
echo "检查服务状态..."
docker-compose ps

echo ""
echo "查看日志..."
docker-compose logs -f prometheus`}
          />
        </div>

        <div className="bg-white border-2 border-slate-200 rounded-lg p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">应用集成示例</h3>
          <CodeBlock
            language="yaml"
            code={`# application.yml
spring:
  application:
    name: order-service

management:
  endpoints:
    web:
      exposure:
        include: '*'
  metrics:
    export:
      prometheus:
        enabled: true
    tags:
      application: $\{spring.application.name\}
      environment: production

# Logback 配置
logging:
  config: classpath:logback-spring.xml`}
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
              <li>✓ 使用 Recording Rules 优化查询</li>
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
              <li>✓ 使用 Error Budget 指导发布</li>
            </ul>
          </div>

          <div className="bg-purple-50 border-2 border-purple-200 rounded-lg p-5">
            <h3 className="text-xl font-bold text-purple-900 mb-3">日志管理</h3>
            <ul className="text-sm text-gray-700 space-y-2">
              <li>✓ 结构化日志（JSON 格式）</li>
              <li>✓ 关联 TraceID</li>
              <li>✓ 日志分级存储</li>
              <li>✓ 日志脱敏处理</li>
              <li>✓ 设置日志保留策略</li>
              <li>✓ 冷热数据分离</li>
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
            answer={"排查步骤：\n\n1. 检查 Actuator 端点\n   ```bash\n   curl http://service:8080/actuator/prometheus\n   ```\n\n2. 验证 Prometheus 配置\n   - 检查 targets 页面：http://prometheus:9090/targets\n   - 确认服务状态为 UP\n\n3. 检查网络连通性\n   ```bash\n   # 从 Prometheus 容器测试\n   docker exec prometheus curl service:8080/actuator/health\n   ```\n\n4. 查看 Prometheus 日志\n   ```bash\n   docker logs -f prometheus\n   ```\n\n5. 验证 scrape_interval 配置\n   - 默认 15s，可能采集间隔过长\n\n【常见问题】\n- 端点路径错误：/actuator/prometheus\n- K8s Service 没有正确配置 selector\n- 网络策略阻止访问\n- Pod annotations 缺失（K8s 服务发现）"}
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
