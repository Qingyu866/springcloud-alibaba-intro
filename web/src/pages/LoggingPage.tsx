import { useState } from 'react';
import { CodeBlock } from '../components';

interface LogCardProps {
  level: string;
  description: string;
  color: string;
  icon: string;
}

const LogCard: React.FC<LogCardProps> = ({ level, description, color, icon }) => (
  <div className={`${color} border-2 rounded-lg p-5`}>
    <div className="flex items-center gap-3 mb-3">
      <span className="text-3xl">{icon}</span>
      <h3 className="text-xl font-bold text-gray-900">{level}</h3>
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

export const LoggingPage: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="bg-gradient-to-r from-green-700 to-green-900 text-white rounded-lg p-6 mb-8">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-4xl font-bold mb-2">日志聚合</h1>
            <p className="text-green-100 text-lg">ELK Stack 日志收集与分析</p>
          </div>
          <div className="flex gap-3 text-sm">
            <span className="px-3 py-1 bg-white/20 rounded-full">🔧 中级</span>
            <span className="px-3 py-1 bg-white/20 rounded-full">⏱️ 约60分钟</span>
            <span className="px-3 py-1 bg-white/20 rounded-full">📚 10个知识点</span>
          </div>
        </div>
      </div>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">为什么需要日志聚合?</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-red-50 border-2 border-red-200 rounded-lg p-5">
            <h3 className="text-xl font-bold text-red-900 mb-3">❌ 分散日志的痛点</h3>
            <ul className="text-gray-700 space-y-2">
              <li>• 日志分散在各个服务器</li>
              <li>• 故障排查需要逐台登录</li>
              <li>• 无法快速检索日志</li>
              <li>• 缺乏统一的日志格式</li>
              <li>• 日志容易丢失，难以追溯</li>
            </ul>
          </div>

          <div className="bg-green-50 border-2 border-green-200 rounded-lg p-5">
            <h3 className="text-xl font-bold text-green-900 mb-3">✅ 日志聚合价值</h3>
            <ul className="text-gray-700 space-y-2">
              <li>• 集中存储，统一管理</li>
              <li>• 快速检索，秒级响应</li>
              <li>• 关联分析，全链路追踪</li>
              <li>• 可视化仪表盘，直观展示</li>
              <li>• 日志告警，异常实时通知</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">ELK 架构</h2>

        <div className="bg-gradient-to-r from-green-50 to-blue-50 border-2 border-green-200 rounded-lg p-6 mb-6">
          <div className="flex flex-wrap items-center justify-center gap-4 text-center">
            <div className="bg-white rounded-lg p-4 shadow-md">
              <div className="text-3xl mb-2">📦</div>
              <div className="font-bold text-gray-900">Filebeat</div>
              <div className="text-xs text-gray-600">日志采集</div>
            </div>
            <div className="text-2xl text-gray-400">→</div>
            <div className="bg-white rounded-lg p-4 shadow-md">
              <div className="text-3xl mb-2">⚙️</div>
              <div className="font-bold text-gray-900">Logstash</div>
              <div className="text-xs text-gray-600">日志处理</div>
            </div>
            <div className="text-2xl text-gray-400">→</div>
            <div className="bg-white rounded-lg p-4 shadow-md">
              <div className="text-3xl mb-2">📊</div>
              <div className="font-bold text-gray-900">Elasticsearch</div>
              <div className="text-xs text-gray-600">存储与搜索</div>
            </div>
            <div className="text-2xl text-gray-400">→</div>
            <div className="bg-white rounded-lg p-4 shadow-md">
              <div className="text-3xl mb-2">📈</div>
              <div className="font-bold text-gray-900">Kibana</div>
              <div className="text-xs text-gray-600">可视化</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <LogCard
            level="Filebeat"
            description="轻量级日志采集器，从各服务器收集日志"
            color="bg-blue-50 border-blue-200"
            icon="📦"
          />
          <LogCard
            level="Logstash"
            description="数据处理管道，过滤、转换日志"
            color="bg-purple-50 border-purple-200"
            icon="⚙️"
          />
          <LogCard
            level="Elasticsearch"
            description="分布式搜索引擎，存储和索引日志"
            color="bg-green-50 border-green-200"
            icon="📊"
          />
          <LogCard
            level="Kibana"
            description="数据可视化平台，查询和分析日志"
            color="bg-orange-50 border-orange-200"
            icon="📈"
          />
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">1. Logback 日志配置</h2>

        <div className="bg-white border-2 border-slate-200 rounded-lg p-6">
          <CodeBlock
            language="xml"
            code={`<?xml version="1.0" encoding="UTF-8"?>
<configuration>
    <!-- 引入 Spring Boot 默认配置 -->
    <include resource="org/springframework/boot/logging/logback/defaults.xml"/>

    <!-- 日志输出格式 -->
    <property name="LOG_PATTERN"
              value="%d{yyyy-MM-dd HH:mm:ss.SSS} [%thread] %-5level %logger{36} [%X{traceId}] - %msg%n"/>

    <!-- 应用名称 -->
    <springProperty scope="context" name="APP_NAME" source="spring.application.name" defaultValue="application"/>
    <springProperty scope="context" name="ACTIVE_PROFILE" source="spring.profiles.active" defaultValue="dev"/>

    <!-- 控制台输出 -->
    <appender name="CONSOLE" class="ch.qos.logback.core.ConsoleAppender">
        <encoder>
            <pattern>\${LOG_PATTERN}</pattern>
            <charset>UTF-8</charset>
        </encoder>
    </appender>

    <!-- 文件输出 - 所有日志 -->
    <appender name="FILE_ALL" class="ch.qos.logback.core.rolling.RollingFileAppender">
        <file>/var/log/apps/\${APP_NAME}/all.log</file>
        <encoder>
            <pattern>\${LOG_PATTERN}</pattern>
            <charset>UTF-8</charset>
        </encoder>
        <rollingPolicy class="ch.qos.logback.core.rolling.SizeAndTimeBasedRollingPolicy">
            <fileNamePattern>/var/log/apps/\${APP_NAME}/all-%d{yyyy-MM-dd}.%i.log</fileNamePattern>
            <maxFileSize>100MB</maxFileSize>
            <maxHistory>30</maxHistory>
            <totalSizeCap>10GB</totalSizeCap>
        </rollingPolicy>
    </appender>

    <!-- 文件输出 - 错误日志 -->
    <appender name="FILE_ERROR" class="ch.qos.logback.core.rolling.RollingFileAppender">
        <file>/var/log/apps/\${APP_NAME}/error.log</file>
        <filter class="ch.qos.logback.classic.filter.LevelFilter">
            <level>ERROR</level>
            <onMatch>ACCEPT</onMatch>
            <onMismatch>DENY</onMismatch>
        </filter>
        <encoder>
            <pattern>\${LOG_PATTERN}</pattern>
            <charset>UTF-8</charset>
        </encoder>
        <rollingPolicy class="ch.qos.logback.core.rolling.SizeAndTimeBasedRollingPolicy">
            <fileNamePattern>/var/log/apps/\${APP_NAME}/error-%d{yyyy-MM-dd}.%i.log</fileNamePattern>
            <maxFileSize>100MB</maxFileSize>
            <maxHistory>60</maxHistory>
        </rollingPolicy>
    </appender>

    <!-- JSON 格式输出（用于 ELK） -->
    <appender name="JSON_FILE" class="ch.qos.logback.core.rolling.RollingFileAppender">
        <file>/var/log/apps/\${APP_NAME}/app.json</file>
        <encoder class="net.logstash.logback.encoder.LogstashEncoder">
            <includeContext>true</includeContext>
            <includeMdc>true</includeMdc>
            <includeStructuredArguments>true</includeStructuredArguments>
            <includeTags>true</includeTags>
            <customFields>{"app":"\${APP_NAME}","profile":"\${ACTIVE_PROFILE}"}</customFields>
        </encoder>
        <rollingPolicy class="ch.qos.logback.core.rolling.SizeAndTimeBasedRollingPolicy">
            <fileNamePattern>/var/log/apps/\${APP_NAME}/app-%d{yyyy-MM-dd}.%i.json</fileNamePattern>
            <maxFileSize>100MB</maxFileSize>
            <maxHistory>7</maxHistory>
        </rollingPolicy>
    </appender>

    <!-- 异步日志 -->
    <appender name="ASYNC_FILE" class="ch.qos.logback.classic.AsyncAppender">
        <appender-ref ref="FILE_ALL"/>
        <appender-ref ref="FILE_ERROR"/>
        <queueSize>512</queueSize>
        <discardingThreshold>0</discardingThreshold>
    </appender>

    <!-- Logger 配置 -->
    <logger name="com.alibaba.cloud.nacos" level="INFO"/>
    <logger name="org.springframework.cloud" level="INFO"/>
    <logger name="org.springframework.web" level="INFO"/>
    <logger name="sql" level="DEBUG"/>

    <!-- 开发环境 -->
    <springProfile name="dev">
        <root level="DEBUG">
            <appender-ref ref="CONSOLE"/>
            <appender-ref ref="ASYNC_FILE"/>
        </root>
    </springProfile>

    <!-- 生产环境 -->
    <springProfile name="prod">
        <root level="INFO">
            <appender-ref ref="CONSOLE"/>
            <appender-ref ref="ASYNC_FILE"/>
            <appender-ref ref="JSON_FILE"/>
        </root>
    </springProfile>
</configuration>`}
          />
        </div>

        <div className="mt-6 bg-yellow-50 border-2 border-yellow-200 rounded-lg p-5">
          <h4 className="font-bold text-yellow-900 mb-2">💡 依赖配置</h4>
          <CodeBlock
            language="xml"
            code={`<dependency>
    <groupId>net.logstash.logback</groupId>
    <artifactId>logstash-logback-encoder</artifactId>
    <version>7.4</version>
</dependency>`}
          />
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">2. 结构化日志</h2>

        <div className="bg-white border-2 border-slate-200 rounded-lg p-6">
          <CodeBlock
            language="java"
            code={`import lombok.extern.slf4j.Slf4j;
import org.slf4j.MDC;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.UUID;

@Slf4j
@Component
public class LoggingFilter extends OncePerRequestFilter {

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain) throws ServletException, IOException {

        // 生成 TraceId
        String traceId = request.getHeader("X-Trace-Id");
        if (traceId == null) {
            traceId = UUID.randomUUID().toString().replace("-", "");
        }

        // 设置 MDC
        MDC.put("traceId", traceId);
        MDC.put("userId", getCurrentUserId(request));
        MDC.put("clientIp", getClientIp(request));

        try {
            log.info("Request started: {} {}", request.getMethod(), request.getRequestURI());

            long startTime = System.currentTimeMillis();
            filterChain.doFilter(request, response);
            long duration = System.currentTimeMillis() - startTime;

            log.info("Request completed: {} {} - Status: {}, Duration: {}ms",
                    request.getMethod(), request.getRequestURI(),
                    response.getStatus(), duration);

        } finally {
            MDC.clear();
        }
    }

    private String getCurrentUserId(HttpServletRequest request) {
        // 从 JWT 或 Session 获取用户 ID
        return request.getHeader("X-User-Id");
    }

    private String getClientIp(HttpServletRequest request) {
        String ip = request.getHeader("X-Forwarded-For");
        if (ip == null) {
            ip = request.getRemoteAddr();
        }
        return ip;
    }
}

---
// 业务日志示例
@Slf4j
@Service
public class OrderService {

    public Order createOrder(OrderRequest request) {
        log.info("Creating order for product: {}, quantity: {}",
                request.getProductId(), request.getQuantity());

        try {
            Order order = processOrder(request);

            // 结构化日志
            log.info("Order created successfully: orderId={}, userId={}, amount={}",
                    order.getId(), order.getUserId(), order.getAmount());

            return order;

        } catch (Exception e) {
            // 错误日志包含完整上下文
            log.error("Failed to create order: productId={}, userId={}, error={}",
                    request.getProductId(), request.getUserId(), e.getMessage(), e);
            throw new OrderCreationException("Failed to create order", e);
        }
    }

    // 使用 MDC 记录业务字段
    public void processPayment(Order order) {
        MDC.put("orderId", order.getId());
        MDC.put("amount", order.getAmount().toString());

        try {
            // 业务逻辑
            paymentGateway.charge(order);

            log.info("Payment processed successfully");

        } catch (PaymentException e) {
            log.error("Payment failed: reason={}, declineCode={}",
                    e.getReason(), e.getDeclineCode(), e);
            throw e;
        } finally {
            MDC.remove("orderId");
            MDC.remove("amount");
        }
    }
}`}
          />
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">3. Filebeat 配置</h2>

        <div className="bg-white border-2 border-slate-200 rounded-lg p-6">
          <CodeBlock
            language="yaml"
            code={`filebeat.inputs:
  # 收集 Spring Boot JSON 日志
  - type: log
    enabled: true
    paths:
      - /var/log/apps/*/app.json
    json.keys_under_root: true
    json.add_error_key: true
    fields:
      service: $\{app.hostname}
      env: production
    fields_under_root: true

  # 收集错误日志
  - type: log
    enabled: true
    paths:
      - /var/log/apps/*/error.log
    multiline:
      pattern: '^\\d{4}-\\d{2}-\\d{2}'
      negate: true
      match: after
    fields:
      level: error

# 输出到 Logstash
output.logstash:
  hosts: ["logstash:5044"]
  loadbalance: true
  bulk_max_size: 2048

# 或直接输出到 Elasticsearch
# output.elasticsearch:
#   hosts: ["elasticsearch:9200"]
#   indices:
#     - index: "app-logs-%{+yyyy.MM.dd}"
#       when.contains:
#         app: "order-service"

# 日志处理队列
queue.mem:
  events: 4096
  flush.min_events: 512
  flush.timeout: 1s

# 日志采集模块
filebeat.config.modules:
  path: $\{path.config}/modules.d/*.yml
  reload.enabled: false

# Kibana 配置
setup.kibana:
  host: "kibana:5601"

# 日志模板
setup.template.name: "app-logs"
setup.template.pattern: "app-logs-*"
setup.template.enabled: true
setup.template.overwrite: true`}
          />
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">4. Logstash 配置</h2>

        <div className="bg-white border-2 border-slate-200 rounded-lg p-6">
          <CodeBlock
            language="ruby"
            code={`input {
  # 从 Filebeat 接收日志
  beats {
    port => 5044
  }
}

filter {
  # 解析 JSON 日志
  if [format] == "json" {
    json {
      source => "message"
    }
  }

  # 解析 Logback 格式
  grok {
    match => {
      "message" => "(?<timestamp>%{TIMESTAMP_ISO8601}) \\[%{DATA:thread}\\] %{LOGLEVEL:level} %{DATA:logger} \\[%{DATA:traceId}\\] - %{GREEDYDATA:msg}"
    }
  }

  # 解析时间戳
  date {
    match => ["timestamp", "yyyy-MM-dd HH:mm:ss.SSS"]
    target => "@timestamp"
  }

  # 添加地理位置
  if [clientIp] {
    geoip {
      source => "clientIp"
      target => "geoip"
      fields => ["city_name", "country_name", "location"]
    }
  }

  # 移除不需要的字段
  mutate {
    remove_field => ["message", "host", "agent"]
    add_field => {
      "env" => "production"
      "cluster" => "us-west-1"
    }
  }

  # 错误日志额外处理
  if [level] == "ERROR" {
    # 提取异常堆栈
    grok {
      match => {
        "msg" => "(?<exception_type>%{JAVAEXCEPTION})(?:\\s+)(?<exception_msg>.*)"
      }
    }

    # 发送告警
    http {
      url => "http://alert-webhook:8080/log-alert"
      http_method => "post"
      map_fields => true
      format => "json"
    }
  }

  # 慢查询日志
  if [duration] and [duration] > 3000 {
    mutate {
      add_tag => ["slow_query"]
      add_field => {
        "alert_level" => "warning"
        "alert_message" => "Slow request detected"
      }
    }
  }
}

output {
  # 输出到 Elasticsearch
  elasticsearch {
    hosts => ["elasticsearch:9200"]
    index => "app-logs-%{+YYYY.MM.dd}"

    # 根据 service 创建索引
    # index => "app-%{[app]}-%{+YYYY.MM.dd}"

    user => "elastic"
    password => "changeme"
  }

  # 调试输出（开发环境）
  # stdout { codec => rubydebug }

  # 错误日志单独索引
  if [level] == "ERROR" {
    elasticsearch {
      hosts => ["elasticsearch:9200"]
      index => "app-errors-%{+YYYY.MM.dd}"
    }
  }
}`}
          />
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">5. Kibana 日志查询</h2>

        <div className="bg-white border-2 border-slate-200 rounded-lg p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">常用查询示例</h3>
          <CodeBlock
            language="javascript"
            code={`// 1. 查询特定服务的所有日志
app: "order-service"

// 2. 查询错误日志
level: "ERROR"

// 3. 查询特定 TraceId 的全链路日志
traceId: "a1b2c3d4e5f6"

// 4. 查询特定用户的操作日志
userId: "12345"

// 5. 查询慢请求（耗时 > 3秒）
duration: > 3000

// 6. 查询特定时间范围
@timestamp: >= "2024-01-01" AND @timestamp: <= "2024-01-31"

// 7. 组合查询：特定服务的错误日志
app: "order-service" AND level: "ERROR"

// 8. 通配符查询
message: "*NullPointerException*"

// 9. 正则表达式查询
logger: /^com\\.example\\..*Service$/

// 10. 范围查询
http.status: [400 TO 599]

// 11. 聚合统计：按服务统计错误数量
// Kibana Visualize -> Pie Chart
{
  "size": 0,
  "aggs": {
    "by_service": {
      "terms": {
        "field": "app.keyword",
        "size": 10
      }
    }
  }
}

// 12. 时间序列：QPS 趋势
// Kibana Visualize -> Line Chart
{
  "size": 0,
  "aggs": {
    "requests_over_time": {
      "date_histogram": {
        "field": "@timestamp",
        "interval": "1m"
      }
    }
  }
}`}
          />
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">日志最佳实践</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-green-50 border-2 border-green-200 rounded-lg p-5">
            <h3 className="text-xl font-bold text-green-900 mb-3">日志规范</h3>
            <ul className="text-sm text-gray-700 space-y-2">
              <li>✓ 统一日志格式（JSON）</li>
              <li>✓ 包含 TraceId 全链路追踪</li>
              <li>✓ 分级记录（ERROR/WARN/INFO/DEBUG）</li>
              <li>✓ 敏感信息脱敏</li>
              <li>✓ 生产环境使用 INFO 级别</li>
            </ul>
          </div>

          <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-5">
            <h3 className="text-xl font-bold text-blue-900 mb-3">性能优化</h3>
            <ul className="text-sm text-gray-700 space-y-2">
              <li>✓ 使用异步日志（AsyncAppender）</li>
              <li>✓ 合理设置日志滚动策略</li>
              <li>✓ 日志文件定期清理</li>
              <li>✓ 避免循环内打印日志</li>
              <li>✓ 使用占位符而非字符串拼接</li>
            </ul>
          </div>

          <div className="bg-red-50 border-2 border-red-200 rounded-lg p-5">
            <h3 className="text-xl font-bold text-red-900 mb-3">安全合规</h3>
            <ul className="text-sm text-gray-700 space-y-2">
              <li>✓ 密码、token 不记录</li>
              <li>✓ 手机号、身份证脱敏</li>
              <li>✓ 日志访问权限控制</li>
              <li>✓ 日志保留期限合规</li>
              <li>✓ 敏感操作审计日志</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">常见问题</h2>

        <div className="space-y-4">
          <FaqCard
            number={1}
            question="日志量太大怎么办？"
            answer={"日志量优化策略：\n\n1. 调整日志级别\n   ```xml\n   <root level=\"WARN\">  <!-- 生产环境使用 WARN -->\n   ```\n\n2. 过滤无用日志\n   ```xml\n   <logger name=\"org.apache.kafka\" level=\"ERROR\"/>\n   <logger name=\"org.apache.zookeeper\" level=\"ERROR\"/>\n   ```\n\n3. 日志采样\n   ```java\n   // 每100次只记录1次\n   if (Random.nextInt(100) == 0) {\n       log.info(\"Frequent operation\");\n   }\n   ```\n\n4. 压缩历史日志\n   ```bash\n   # 使用 gzip 压缩旧日志\n   find /var/log -name \"*.log\" -mtime +7 -exec gzip {} \\;\n   ```\n\n5. Elasticsearch 索引优化\n   - 设置 ILM（索引生命周期管理）\n   - 热数据保留 7 天\n   - 冷数据迁移到对象存储"}
            isOpen={openFaq === 1}
            onClick={() => toggleFaq(1)}
          />
          <FaqCard
            number={2}
            question="如何实现全链路日志追踪？"
            answer={"全链路日志追踪方案：\n\n1. 集成 Sleuth + Zipkin\n   ```xml\n   <dependency>\n       <groupId>org.springframework.cloud</groupId>\n       <artifactId>spring-cloud-starter-sleuth</artifactId>\n   </dependency>\n   ```\n\n2. 传递 TraceId\n   ```java\n   // Filter 中生成 TraceId\n   String traceId = UUID.randomUUID().toString();\n   MDC.put(\"traceId\", traceId);\n   \n   // HTTP 头传递\n   httpClient.setHeader(\"X-Trace-Id\", traceId);\n   ```\n\n3. 关联日志查询\n   ```javascript\n   // Kibana 查询\n   traceId: \"a1b2c3d4\" \n   // 查看该请求经过的所有服务日志\n   ```\n\n4. 分布式追踪\n   - Zipkin/Jaeger 记录调用链路\n   - Kibana 联合 SkyWalking\n\n【效果】\n一个 TraceId 关联所有微服务日志"}
            isOpen={openFaq === 2}
            onClick={() => toggleFaq(2)}
          />
          <FaqCard
            number={3}
            question="Kibana 查询很慢如何优化？"
            answer={"Kibana 查询优化：\n\n1. 优化索引策略\n   ```yaml\n   # 按服务 + 日期分索引\n   index => \"app-order-service-2024-01-15\"\n   ```\n\n2. 索引生命周期管理（ILM）\n   - Hot: 3天，高频查询\n   - Warm: 30天，降冷存储\n   - Cold: 90天，归档或删除\n\n3. 优化查询条件\n   ```javascript\n   // 差：模糊查询\n   message: *error*\n   \n   // 好：精确匹配\n   level: \"ERROR\" AND app: \"order-service\"\n   ```\n\n4. 缩小时间范围\n   - 默认查询最近 15 分钟\n   - 避免跨月查询\n\n5. 使用索引别名\n   ```bash\n   # 按日期查询\n   GET app-logs-2024-01-*/_search\n   ```\n\n6. 调整 Elasticsearch 配置\n   - 增加内存 heap size\n   - 优化分片数量（每个分片 20-50GB）"}
            isOpen={openFaq === 3}
            onClick={() => toggleFaq(3)}
          />
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">下一步学习</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <a href="/monitoring" className="block bg-gradient-to-br from-purple-50 to-purple-100 border-2 border-purple-200 rounded-lg p-6 hover:shadow-lg transition">
            <h3 className="text-xl font-bold text-purple-900 mb-2">📊 监控告警</h3>
            <p className="text-gray-700 text-sm">Prometheus + Grafana 全链路监控</p>
          </a>
          <a href="/skywalking" className="block bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-200 rounded-lg p-6 hover:shadow-lg transition">
            <h3 className="text-xl font-bold text-blue-900 mb-2">🔍 链路追踪</h3>
            <p className="text-gray-700 text-sm">SkyWalking 分布式追踪</p>
          </a>
        </div>
      </section>
    </div>
  );
};
