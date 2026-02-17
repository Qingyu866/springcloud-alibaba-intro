import { CodeBlock } from '../components';
import { useState } from 'react';

interface PillarCardProps {
  title: string;
  description: string;
  icon: string;
  color: string;
  tools: string[];
  metrics: string[];
}

const PillarCard: React.FC<PillarCardProps> = ({ title, description, icon, color, tools, metrics }) => {
  const colorClasses = {
    blue: 'bg-blue-50 border-blue-200',
    green: 'bg-green-50 border-green-200',
    purple: 'bg-purple-50 border-purple-200',
    orange: 'bg-orange-50 border-orange-200',
    red: 'bg-red-50 border-red-200',
  };

  return (
    <div className={`p-6 border-2 rounded-lg ${colorClasses[color as keyof typeof colorClasses]}`}>
      <div className="flex items-center mb-4">
        <span className="text-4xl mr-3">{icon}</span>
        <h3 className="text-2xl font-bold text-gray-900">{title}</h3>
      </div>
      <p className="text-gray-700 mb-4">{description}</p>

      <div className="mb-4">
        <h4 className="font-bold text-gray-900 mb-2">🔧 常用工具</h4>
        <div className="flex flex-wrap gap-2">
          {tools.map((tool, index) => (
            <span key={index} className="px-3 py-1 bg-white rounded-full text-sm border border-gray-300">
              {tool}
            </span>
          ))}
        </div>
      </div>

      <div>
        <h4 className="font-bold text-gray-900 mb-2">📊 关键指标</h4>
        <ul className="text-sm text-gray-700 space-y-1">
          {metrics.map((metric, index) => (
            <li key={index}>• {metric}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

interface ToolCardProps {
  name: string;
  category: string;
  description: string;
  features: string[];
  useCase: string;
  color: string;
}

const ToolCard: React.FC<ToolCardProps> = ({ name, category, description, features, useCase, color }) => {
  const colorClasses = {
    blue: 'border-blue-300',
    green: 'border-green-300',
    purple: 'border-purple-300',
  };

  return (
    <div className={`bg-white border-2 ${colorClasses[color as keyof typeof colorClasses]} rounded-lg p-5`}>
      <div className="mb-3">
        <span className="text-xs px-2 py-1 bg-gray-100 rounded">{category}</span>
        <h3 className="text-xl font-bold text-gray-900 mt-2">{name}</h3>
      </div>
      <p className="text-gray-700 text-sm mb-3">{description}</p>

      <div className="mb-3">
        <h4 className="font-semibold text-gray-900 text-sm mb-1">核心特性</h4>
        <ul className="text-xs text-gray-600 space-y-1">
          {features.map((feature, index) => (
            <li key={index}>• {feature}</li>
          ))}
        </ul>
      </div>

      <div className="bg-gray-50 p-2 rounded">
        <p className="text-xs text-gray-600">
          <span className="font-semibold">适用场景:</span> {useCase}
        </p>
      </div>
    </div>
  );
};

interface LevelCardProps {
  level: string;
  description: string;
  capabilities: string[];
  color: string;
}

const LevelCard: React.FC<LevelCardProps> = ({ level, description, capabilities, color }) => {
  const colorClasses = {
    red: 'bg-red-50 border-red-200',
    yellow: 'bg-yellow-50 border-yellow-200',
    green: 'bg-green-50 border-green-200',
    blue: 'bg-blue-50 border-blue-200',
  };

  return (
    <div className={`p-5 border-2 rounded-lg ${colorClasses[color as keyof typeof colorClasses]}`}>
      <h3 className="text-xl font-bold text-gray-900 mb-2">{level}</h3>
      <p className="text-sm text-gray-700 mb-3">{description}</p>
      <ul className="text-sm text-gray-700 space-y-1">
        {capabilities.map((capability, index) => (
          <li key={index}>✓ {capability}</li>
        ))}
      </ul>
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

const FaqCard: React.FC<FaqCardProps> = ({ number, question, answer, isOpen, onClick }) => {
  return (
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
};

export const ObservabilityPage: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* 页头 */}
      <div className="bg-gradient-to-r from-slate-700 to-slate-900 text-white rounded-lg p-6 mb-8">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-4xl font-bold mb-2">可观测性体系</h1>
            <p className="text-slate-200 text-lg">构建完整的监控、追踪、日志体系</p>
          </div>
          <div className="flex gap-3 text-sm">
            <span className="px-3 py-1 bg-white/20 rounded-full">🏗️ 架构师</span>
            <span className="px-3 py-1 bg-white/20 rounded-full">⏱️ 约90分钟</span>
            <span className="px-3 py-1 bg-white/20 rounded-full">📚 18个知识点</span>
          </div>
        </div>
      </div>

      {/* 什么是可观测性 */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">什么是可观测性?</h2>

        <div className="bg-white border-2 border-blue-200 rounded-lg p-6 mb-6">
          <p className="text-gray-700 text-lg mb-4">
            <strong>可观测性 (Observability)</strong> 是指通过系统的外部输出（日志、指标、链路追踪）来理解系统内部状态的能力。
            它是微服务架构中<strong className="text-blue-600">快速定位问题、优化性能、保障稳定性</strong>的关键能力。
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="bg-green-50 p-4 rounded border border-green-200">
              <h4 className="font-bold text-green-900 mb-2">📊 Metrics 指标</h4>
              <p className="text-sm text-gray-700">数值型时间序列数据，回答"发生了什么"</p>
            </div>
            <div className="bg-blue-50 p-4 rounded border border-blue-200">
              <h4 className="font-bold text-blue-900 mb-2">🔍 Traces 链路</h4>
              <p className="text-sm text-gray-700">请求的完整调用路径，回答"在哪里发生"</p>
            </div>
            <div className="bg-purple-50 p-4 rounded border border-purple-200">
              <h4 className="font-bold text-purple-900 mb-2">📝 Logs 日志</h4>
              <p className="text-sm text-gray-700">离散的文本记录，回答"为什么发生"</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-red-50 border-2 border-red-200 rounded-lg p-5">
            <h3 className="text-xl font-bold text-red-900 mb-3">❌ 没有可观测性的痛点</h3>
            <ul className="text-gray-700 space-y-2">
              <li>• 用户报错但不知道哪里出了问题</li>
              <li>• 性能下降但找不到瓶颈</li>
              <li>• 故障排查耗时数小时甚至数天</li>
              <li>• 无法量化系统健康度</li>
              <li>• 优化缺乏数据支撑</li>
            </ul>
          </div>
          <div className="bg-green-50 border-2 border-green-200 rounded-lg p-5">
            <h3 className="text-xl font-bold text-green-900 mb-3">✅ 可观测性的价值</h3>
            <ul className="text-gray-700 space-y-2">
              <li>• 快速定位故障（分钟级）</li>
              <li>• 实时了解系统状态</li>
              <li>• 数据驱动的性能优化</li>
              <li>• 预警潜在问题</li>
              <li>• 提升用户体验</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 可观测性三大支柱 */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">可观测性三大支柱</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <PillarCard
            title="Metrics 指标监控"
            description="通过数值型数据监控系统的运行状态，是最基础的可观测性能力"
            icon="📊"
            color="blue"
            tools={['Prometheus', 'Grafana', 'InfluxDB', 'Datadog']}
            metrics={[
              'RED 方法：Rate (请求率), Errors (错误率), Duration (延迟)',
              'USE 方法：Utilization (利用率), Saturation (饱和度), Errors (错误)',
              '业务指标：订单量、GMV、DAU',
              '资源指标：CPU、内存、磁盘、网络'
            ]}
          />
          <PillarCard
            title="Traces 链路追踪"
            description="追踪一个请求在微服务间的完整调用路径，定位性能瓶颈"
            icon="🔍"
            color="green"
            tools={['SkyWalking', 'Zipkin', 'Jaeger', 'Sleuth']}
            metrics={[
              'TraceID：全局唯一的请求标识',
              'SpanID：每个服务的调用标识',
              'ParentID：调用关系标识',
              'Tags：自定义标签（用户ID、订单ID）',
              'Logs：链路日志'
            ]}
          />
          <PillarCard
            title="Logs 日志聚合"
            description="集中收集、存储、分析所有服务的日志，快速定位问题根因"
            icon="📝"
            color="purple"
            tools={['ELK', 'Loki', 'Fluentd', 'Filebeat']}
            metrics={[
              '结构化日志：JSON 格式',
              '日志级别：ERROR、WARN、INFO、DEBUG',
              '关联 TraceID：链路日志关联',
              '上下文信息：用户、时间、请求参数',
              '异常堆栈：完整错误信息'
            ]}
          />
        </div>
      </section>

      {/* 可观测性工具栈 */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">可观测性工具栈</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <ToolCard
            name="SkyWalking"
            category="APM 平台"
            description="国产开源 APM 平台，支持指标、链路、日志三位一体"
            features={[
              '无代码侵入，Java Agent 自动埋点',
              '服务拓扑图自动生成',
              '慢查询、异常自动检测',
              '支持多种语言（Java、Go、Node.js）',
              'UI 友好，中文支持好'
            ]}
            useCase="生产环境 APM，微服务监控"
            color="green"
          />
          <ToolCard
            name="Prometheus + Grafana"
            category="指标监控"
            description="云原生监控事实标准，Prometheus 采集 + Grafana 展示"
            features={[
              'Pull 模式采集，性能开销小',
              'PromQL 强大的查询语言',
              'Grafana 灵活的仪表盘',
              '告警规则配置',
              '生态丰富，集成简单'
            ]}
            useCase="K8s 集群监控，资源监控"
            color="blue"
          />
          <ToolCard
            name="ELK Stack"
            category="日志聚合"
            description="Elasticsearch + Logstash + Kibana，日志分析标准方案"
            features={[
              '全文检索能力强',
              'Kibana 可视化分析',
              '实时日志流处理',
              '支持海量日志存储',
              '生态成熟'
            ]}
            useCase="日志聚合分析，故障排查"
            color="purple"
          />
          <ToolCard
            name="Grafana Loki"
            category="轻量日志"
            description="类似 Prometheus 的日志系统，轻量级日志聚合方案"
            features={[
              '轻量级，资源占用少',
              '与 Grafana 无缝集成',
              '标签索引，查询高效',
              '成本低于 ELK',
              '适合云原生环境'
            ]}
            useCase="中小规模日志系统"
            color="blue"
          />
          <ToolCard
            name="Zipkin"
            category="链路追踪"
            description="Google Dapper 论文的开源实现，分布式追踪鼻祖"
            features={[
              '轻量级，易部署',
              '多种语言支持',
              '与 Spring Cloud 集成',
              'Web UI 可视化',
              '社区活跃'
            ]}
            useCase="简单链路追踪场景"
            color="green"
          />
          <ToolCard
            name="Jaeger"
            category="链路追踪"
            description="Uber 开源的分布式追踪系统，兼容 OpenTracing"
            features={[
              '高性能，支持大规模',
              '多种存储后端',
              '采样策略灵活',
              '与 Kubernetes 集成',
              '支持云原生部署'
            ]}
            useCase="大规模微服务追踪"
            color="purple"
          />
        </div>
      </section>

      {/* Spring Cloud Alibaba 可观测性实战 */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Spring Cloud Alibaba 可观测性实战</h2>

        <div className="space-y-6">
          {/* SkyWalking 集成 */}
          <div className="bg-white border-2 border-green-200 rounded-lg p-6">
            <h3 className="text-2xl font-bold text-green-900 mb-4">1. SkyWalking APM 集成</h3>

            <div className="space-y-4">
              <div>
                <h4 className="font-bold text-gray-900 mb-2">步骤1: 启动 SkyWalking OAP Server</h4>
                <CodeBlock
                  language="bash"
                  code={`# 下载 SkyWalking
wget https://dlcdn.apache.org/skywalking/8.16.0/apache-skywalking-apm-8.16.0.tar.gz

# 解压
tar -xzf apache-skywalking-apm-8.16.0.tar.gz

# 启动 OAP Server
cd apache-skywalking-apm-bin/bin
./oapService.sh

# 启动 Web UI
./webappService.sh

# 访问 UI: http://localhost:8080`}
                />
              </div>

              <div>
                <h4 className="font-bold text-gray-900 mb-2">步骤2: 应用添加 Java Agent</h4>
                <CodeBlock
                  language="bash"
                  code={`# 启动应用时添加 JVM 参数
java -javaagent:/path/to/skywalking-agent.jar \\
     -Dskywalking.agent.service_name=order-service \\
     -Dskywalking.collector.backend_service=localhost:11800 \\
     -jar order-service.jar

# Docker 部署
ENV JAVA_OPTS="-javaagent:/skywalking/skywalking-agent.jar"
ENV SW_AGENT_NAME="order-service"
ENV SW_AGENT_COLLECTOR_BACKEND_SERVICES="oap:11800"
ENV SW_AGENT_NAMESPACE="production"
`}
                />
              </div>

              <div>
                <h4 className="font-bold text-gray-900 mb-2">步骤3: 配置 application.yml</h4>
                <CodeBlock
                  language="yaml"
                  code={`spring:
  application:
    name: order-service

# SkyWalking 配置（可选，更多通过 JVM 参数配置）
skywalking:
  agent:
    service_name: $\{spring.application.name\}
    namespace: production
    collector:
      backend_service: localhost:11800`}
                />
              </div>
            </div>
          </div>

          {/* Prometheus + Grafana 集成 */}
          <div className="bg-white border-2 border-blue-200 rounded-lg p-6">
            <h3 className="text-2xl font-bold text-blue-900 mb-4">2. Prometheus + Grafana 集成</h3>

            <div className="space-y-4">
              <div>
                <h4 className="font-bold text-gray-900 mb-2">步骤1: 添加 Actuator 依赖</h4>
                <CodeBlock
                  language="xml"
                  code={`<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-actuator</artifactId>
</dependency>
<dependency>
    <groupId>io.micrometer</groupId>
    <artifactId>micrometer-registry-prometheus</artifactId>
</dependency>`}
                />
              </div>

              <div>
                <h4 className="font-bold text-gray-900 mb-2">步骤2: 配置 application.yml</h4>
                <CodeBlock
                  language="yaml"
                  code={`spring:
  application:
    name: order-service

management:
  endpoints:
    web:
      exposure:
        include: '*'
  metrics:
    tags:
      application: $\{spring.application.name\}
    export:
      prometheus:
        enabled: true

# Prometheus 暴露端口
server:
  port: 8080`}
                />
              </div>

              <div>
                <h4 className="font-bold text-gray-900 mb-2">步骤3: 配置 Prometheus 采集</h4>
                <CodeBlock
                  language="yaml"
                  code={`# prometheus.yml
global:
  scrape_interval: 15s

scrape_configs:
  - job_name: 'spring-cloud-apps'
    metrics_path: '/actuator/prometheus'
    static_configs:
      - targets:
        - 'order-service:8080'
        - 'payment-service:8080'
        - 'inventory-service:8080'
        labels:
          env: production`}
                />
              </div>

              <div>
                <h4 className="font-bold text-gray-900 mb-2">步骤4: 导入 Grafana 仪表盘</h4>
                <CodeBlock
                  language="bash"
                  code={`# 启动 Grafana
docker run -d -p 3000:3000 \\
  --name=grafana \\
  grafana/grafana

# 访问 http://localhost:3000 (admin/admin)
# 添加 Prometheus 数据源
# 导入 JVM Micrometer 仪表盘 (ID: 4701)
# 导入 Spring Boot 2.1 仪表盘 (ID: 11378)`}
                />
              </div>
            </div>
          </div>

          {/* ELK 日志集成 */}
          <div className="bg-white border-2 border-purple-200 rounded-lg p-6">
            <h3 className="text-2xl font-bold text-purple-900 mb-4">3. ELK 日志聚合集成</h3>

            <div className="space-y-4">
              <div>
                <h4 className="font-bold text-gray-900 mb-2">步骤1: 添加 Logstash 依赖</h4>
                <CodeBlock
                  language="xml"
                  code={`<dependency>
    <groupId>net.logstash.logback</groupId>
    <artifactId>logstash-logback-encoder</artifactId>
    <version>7.4</version>
</dependency>`}
                />
              </div>

              <div>
                <h4 className="font-bold text-gray-900 mb-2">步骤2: 配置 logback-spring.xml</h4>
                <CodeBlock
                  language="xml"
                  code={`<?xml version="1.0" encoding="UTF-8"?>
<configuration>
    <appender name="LOGSTASH" class="net.logstash.logback.appender.LogstashTcpSocketAppender">
        <destination>localhost:5000</destination>
        <encoder class="net.logstash.logback.encoder.LogstashEncoder">
            <customFields>{"service":"order-service"}</customFields>
        </encoder>
    </appender>

    <root level="INFO">
        <appender-ref ref="LOGSTASH" />
        <appender-ref ref="CONSOLE" />
    </root>
</configuration>`}
                />
              </div>

              <div>
                <h4 className="font-bold text-gray-900 mb-2">步骤3: 配置 Logstash Pipeline</h4>
                <CodeBlock
                  language="ruby"
                  code={`input {
  tcp {
    port => 5000
    codec => json_lines
  }
}

filter {
  # 解析 JSON 日志
  if [message] =~ /^\{.*\}$/ {
    json {
      source => "message"
    }
  }

  # 添加时间戳
  date {
    match => ["timestamp", "ISO8601"]
  }

  # 提取 TraceID
  grok {
    match => { "message" => ".*TraceId=%{DATA:traceId}.*" }
  }
}

output {
  elasticsearch {
    hosts => ["http://localhost:9200"]
    index => "order-service-%{+YYYY.MM.dd}"
  }
  stdout { codec => rubydebug }
}`}
                />
              </div>

              <div>
                <h4 className="font-bold text-gray-900 mb-2">步骤4: Kibana 查询日志</h4>
                <CodeBlock
                  language="bash"
                  code={`# 访问 http://localhost:5601
# 1. 创建索引模式: order-service-*
# 2. Kibana Dev Tools 查询

# 查询特定 TraceID 的所有日志
GET order-service-*/_search
{
  "query": {
    "match": {
      "traceId": "1234567890abcdef"
    }
  }
}

# 查询 ERROR 级别日志
GET order-service-*/_search
{
  "query": {
    "match": {
      "level": "ERROR"
    }
  }
}`}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 可观测性成熟度模型 */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">可观测性成熟度模型</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <LevelCard
            level="Level 1: 基础监控 (初级)"
            description="仅关注系统是否可用，出问题后被动响应"
            color="red"
            capabilities={[
              '基础资源监控（CPU、内存）',
              '简单日志文件',
              '手动查看日志',
              '用户反馈发现问题'
            ]}
          />
          <LevelCard
            level="Level 2: 指标告警 (中级)"
            description="主动监控关键指标，异常时告警"
            color="yellow"
            capabilities={[
              '应用指标监控（QPS、RT）',
              '集中日志收集',
              '可视化仪表盘',
              '阈值告警通知'
            ]}
          />
          <LevelCard
            level="Level 3: 链路追踪 (高级)"
            description="完整追踪请求路径，快速定位问题"
            color="green"
            capabilities={[
              '分布式链路追踪',
              '服务拓扑图',
              '慢查询分析',
              '日志关联 TraceID'
            ]}
          />
          <LevelCard
            level="Level 4: 智能运维 (专家)"
            description="AI 驱动，预测性分析，自动根因分析"
            color="blue"
            capabilities={[
              'AI 异常检测',
              '预测性告警',
              '自动根因分析',
              '智能容量规划'
            ]}
          />
        </div>
      </section>

      {/* 最佳实践 */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">可观测性最佳实践</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-300 rounded-lg p-5">
            <h3 className="text-xl font-bold text-green-900 mb-3">✅ 推荐做法</h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <span className="text-green-600 mr-2 flex-shrink-0">✓</span>
                <span>三大支柱联动：Metrics 告警 → Traces 定位 → Logs 分析</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2 flex-shrink-0">✓</span>
                <span>日志必须包含 TraceID，支持链路关联</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2 flex-shrink-0">✓</span>
                <span>结构化日志，使用 JSON 格式</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2 flex-shrink-0">✓</span>
                <span>设置合理告警阈值，避免告警风暴</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2 flex-shrink-0">✓</span>
                <span>RED 方法监控：Rate、Errors、Duration</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2 flex-shrink-0">✓</span>
                <span>保留 TraceID、SpanID、UserID 等关键字段</span>
              </li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-red-50 to-red-100 border-2 border-red-300 rounded-lg p-5">
            <h3 className="text-xl font-bold text-red-900 mb-3">❌ 避免做法</h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <span className="text-red-600 mr-2 flex-shrink-0">✗</span>
                <span>只关注 Metrics，忽略 Traces 和 Logs</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-600 mr-2 flex-shrink-0">✗</span>
                <span>日志无结构，难以检索分析</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-600 mr-2 flex-shrink-0">✗</span>
                <span>过度采样，链路追踪性能开销大</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-600 mr-2 flex-shrink-0">✗</span>
                <span>告警阈值过低，频繁误报</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-600 mr-2 flex-shrink-0">✗</span>
                <span>只监控技术指标，忽略业务指标</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-600 mr-2 flex-shrink-0">✗</span>
                <span>日志保留时间过短，无法追溯历史</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-6 bg-white border-2 border-blue-200 rounded-lg p-6">
          <h3 className="text-xl font-bold text-blue-900 mb-3">🔗 三大支柱联动示例</h3>
          <div className="text-gray-700 space-y-2">
            <p><strong>场景:</strong> 用户反馈下单失败</p>
            <p><strong>1. Metrics (Grafana):</strong> 发现订单服务错误率突然从 0.1% 上升到 5%</p>
            <p><strong>2. Traces (SkyWalking):</strong> 点击错误率图表，定位到慢 Trace，发现库存服务响应超时</p>
            <p><strong>3. Logs (Kibana):</strong> 使用 TraceID 查询日志，发现库存服务日志显示 "Connection timeout"</p>
            <p><strong>结论:</strong> 库存服务数据库连接池耗尽，需要扩容或优化连接池配置</p>
          </div>
        </div>
      </section>

      {/* 常见问题 FAQ */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">常见问题</h2>

        <div className="space-y-4">
          <FaqCard
            number={1}
            question="SkyWalking 和 Zipkin/Jaeger 如何选择?"
            answer={"【SkyWalking 优势】\n- 无代码侵入，Java Agent 自动埋点\n- UI 友好，中文支持好\n- 集成 Metrics、Traces、Logs 三位一体\n- 服务拓扑图自动生成\n- 国产开源，国内社区活跃\n\n【Zipkin/Jaeger 优势】\n- 轻量级，资源占用少\n- 兼容 OpenTracing 标准\n- 灵活性高，可定制性强\n- 国际通用，社区大\n\n【选型建议】\n- 生产环境、国内项目：优先选 SkyWalking\n- 国际项目、需要兼容标准：选 Jaeger\n- 简单场景、资源受限：选 Zipkin"}
            isOpen={openFaq === 1}
            onClick={() => toggleFaq(1)}
          />

          <FaqCard
            number={2}
            question="如何降低链路追踪的性能开销?"
            answer={"链路追踪的性能开销主要来自：\n\n1. 采样策略\n   - 默认采样率：10-20%\n   - 高并发场景：5% 或更低\n   - 重要接口：100% 采样\n\n2. 异步上报\n   - 使用异步发送 Span 数据\n   - 批量上报，减少网络开销\n\n3. 本地缓存\n   - 缓存部分 Span 数据，定期 flush\n\n【实战配置】\n# SkyWalking 采样配置\nagent.sample_n_per_3_secs=3  # 每3秒最多3个Span\n\n# Jaeger 采样配置\nsampler:\n  type: probabilistic\n  param: 0.1  # 10% 采样率\n\n【最佳实践】\n- 生产环境采样率 10-20%\n- 开发测试环境 100%\n- 根据实际流量调整采样率"}
            isOpen={openFaq === 2}
            onClick={() => toggleFaq(2)}
          />

          <FaqCard
            number={3}
            question="日志量太大怎么办？"
            answer={"日志量过大会导致存储成本高、检索慢。解决方案：\n\n1. 日志分级\n   - ERROR 级别：保留 90 天\n   - WARN 级别：保留 30 天\n   - INFO 级别：保留 7 天\n   - DEBUG 级别：不存储或只保留 1 天\n\n2. 日志脱敏\n   - 不记录敏感信息（密码、手机号）\n   - 身份证号脱敏：320***********1234\n\n3. 冷热分离\n   - 热数据（7天）：SSD 存储\n   - 冷数据（30天+）：对象存储（S3/OSS）\n\n4. 日志采样\n   - 正常请求：采样 50%\n   - 异常请求：100% 采样\n\n5. 压缩归档\n   - 超过 30 天的日志压缩归档\n   - 需要时再解压\n\n【实战建议】\n- ELK 集群规划：冷热分离\n- 设置索引生命周期管理（ILM）\n- 定期清理过期日志"}
            isOpen={openFaq === 3}
            onClick={() => toggleFaq(3)}
          />
        </div>
      </section>

      {/* 下一步学习 */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">下一步学习</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <a href="/performance-tuning" className="block bg-gradient-to-br from-orange-50 to-orange-100 border-2 border-orange-200 rounded-lg p-6 hover:shadow-lg transition">
            <h3 className="text-xl font-bold text-orange-900 mb-2">⚡ 性能调优实战</h3>
            <p className="text-gray-700 text-sm">从 JVM 到架构的全链路性能优化</p>
          </a>
          <a href="/security-design" className="block bg-gradient-to-br from-red-50 to-red-100 border-2 border-red-200 rounded-lg p-6 hover:shadow-lg transition">
            <h3 className="text-xl font-bold text-red-900 mb-2">🔒 安全架构设计</h3>
            <p className="text-gray-700 text-sm">微服务安全架构与最佳实践</p>
          </a>
        </div>
      </section>
    </div>
  );
};
