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
        <h2 className="text-3xl font-bold text-gray-900 mb-6">6. ELK Stack 完整部署实战案例</h2>

        <div className="bg-gradient-to-r from-green-50 to-blue-50 border-2 border-green-200 rounded-lg p-6 mb-6">
          <h3 className="text-xl font-bold text-gray-900 mb-3">🎯 案例场景：电商微服务系统日志聚合</h3>
          <p className="text-gray-700 mb-4">
            某电商公司使用 Spring Cloud Alibaba 构建微服务系统，包含订单服务、用户服务、商品服务等 10+ 个服务。
            面临日志分散、故障排查困难的挑战，通过 ELK Stack 实现集中式日志管理。
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="text-2xl mb-2">📊</div>
              <div className="font-bold text-gray-900">10+</div>
              <div className="text-sm text-gray-600">微服务实例</div>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="text-2xl mb-2">📝</div>
              <div className="font-bold text-gray-900">50GB/天</div>
              <div className="text-sm text-gray-600">日志数据量</div>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="text-2xl mb-2">⚡</div>
              <div className="font-bold text-gray-900">秒级</div>
              <div className="text-sm text-gray-600">故障定位</div>
            </div>
          </div>
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-4">Docker Compose 完整配置</h3>
        <div className="bg-white border-2 border-slate-200 rounded-lg p-6 mb-6">
          <CodeBlock
            language="yaml"
            code={`version: '3.8'

services:
  # Elasticsearch 集群
  elasticsearch:
    image: docker.elastic.co/elasticsearch/elasticsearch:8.11.0
    container_name: elasticsearch
    environment:
      - discovery.type=single-node
      - "ES_JAVA_OPTS=-Xms1g -Xmx1g"
      - xpack.security.enabled=false
      - xpack.security.http.ssl.enabled=false
      - xpack.security.transport.ssl.enabled=false
    ports:
      - "9200:9200"
      - "9300:9300"
    volumes:
      - es-data:/usr/share/elasticsearch/data
    networks:
      - elk
    healthcheck:
      test: ["CMD-SHELL", "curl -f http://localhost:9200/_cluster/health || exit 1"]
      interval: 30s
      timeout: 10s
      retries: 5

  # Logstash 数据处理管道
  logstash:
    image: docker.elastic.co/logstash/logstash:8.11.0
    container_name: logstash
    volumes:
      - ./logstash/pipeline:/usr/share/logstash/pipeline
      - ./logstash/config/logstash.yml:/usr/share/logstash/config/logstash.yml
    ports:
      - "5044:5044"
      - "9600:9600"
    networks:
      - elk
    depends_on:
      - elasticsearch

  # Kibana 可视化平台
  kibana:
    image: docker.elastic.co/kibana/kibana:8.11.0
    container_name: kibana
    environment:
      - ELASTICSEARCH_HOSTS=http://elasticsearch:9200
      - i18n.locale=zh_CN
    ports:
      - "5601:5601"
    networks:
      - elk
    depends_on:
      - elasticsearch
    healthcheck:
      test: ["CMD-SHELL", "curl -f http://localhost:5601/api/status || exit 1"]
      interval: 30s
      timeout: 10s
      retries: 5

volumes:
  es-data:
    driver: local

networks:
  elk:
    driver: bridge`}
          />
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-4">Logstash Pipeline 配置</h3>
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
  json {
    source => "message"
  }

  # 添加时间戳
  date {
    match => ["timestamp", "ISO8601"]
    target => "@timestamp"
  }

  # 提取 Spring Boot 字段
  if [app_name] {
    mutate {
      add_field => {
        "service" => "%{[app_name]}"
      }
    }
  }

  # 提取日志级别
  if [level] {
    mutate {
      uppercase => ["level"]
    }
  }

  # 提取 TraceId（用于分布式追踪）
  if [trace_id] {
    mutate {
      add_field => {
        "trace_id" => "%{[trace_id]}"
      }
    }
  }

  # 错误日志标记
  if [level] == "ERROR" {
    mutate {
      add_tag => ["error"]
    }
  }
}

output {
  elasticsearch {
    hosts => ["elasticsearch:9200"]
    index => "spring-cloud-alibaba-%{[service]}-%{+YYYY.MM.dd}"
    codec => json
  }
}`}
          />
        </div>

        <div className="mt-6 bg-blue-50 border-2 border-blue-200 rounded-lg p-5">
          <h4 className="font-bold text-blue-900 mb-2">🚀 部署步骤</h4>
          <CodeBlock
            language="bash"
            code={`# 1. 创建配置目录
mkdir -p logstash/pipeline logstash/config

# 2. 创建 pipeline 配置文件
cat > logstash/pipeline/logstash.conf << 'EOF'
# (复制上面的 Logstash 配置)
EOF

# 3. 启动 ELK Stack
docker-compose up -d

# 4. 检查服务状态
docker-compose ps

# 5. 验证 Elasticsearch
curl http://localhost:9200/_cluster/health

# 6. 访问 Kibana
open http://localhost:5601

# 7. 创建索引模式
# Kibana -> Stack Management -> Index Patterns
# 输入: spring-cloud-alibaba-*
# 选择时间字段: @timestamp`}
          />
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">7. 生产级 Logback 配置</h2>

        <div className="bg-white border-2 border-slate-200 rounded-lg p-6 mb-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">完整的 logback-spring.xml</h3>
          <CodeBlock
            language="xml"
            code={`<?xml version="1.0" encoding="UTF-8"?>
<configuration>
    <!-- 引入 Spring Boot 默认配置 -->
    <include resource="org/springframework/boot/logging/logback/defaults.xml"/>

    <!-- 控制台输出 (开发环境) -->
    <springProfile name="dev">
        <appender name="CONSOLE" class="ch.qos.logback.core.ConsoleAppender">
            <encoder>
                <pattern>%d{yyyy-MM-dd HH:mm:ss.SSS} [%thread] %-5level %logger{36} - %msg%n</pattern>
                <charset>UTF-8</charset>
            </encoder>
        </appender>

        <root level="INFO">
            <appender-ref ref="CONSOLE"/>
        </root>
    </springProfile>

    <!-- 生产环境配置 -->
    <springProfile name="prod">
        <!-- 文件输出 -->
        <appender name="FILE" class="ch.qos.logback.core.rolling.RollingFileAppender">
            <file>/var/log/app/application.log</file>
            <rollingPolicy class="ch.qos.logback.core.rolling.TimeBasedRollingPolicy">
                <fileNamePattern>/var/log/app/application-%d{yyyy-MM-dd}.log</fileNamePattern>
                <maxHistory>30</maxHistory>
                <totalSizeCap>10GB</totalSizeCap>
            </rollingPolicy>

            <encoder class="ch.qos.logback.core.encoder.LayoutWrappingEncoder">
                <layout class="ch.qos.logback.classic.PatternLayout">
                    <pattern>%d{yyyy-MM-dd HH:mm:ss.SSS} [%thread] %-5level %logger{36} - %msg%n</pattern>
                </layout>
            </encoder>
        </appender>

        <!-- JSON 格式输出 (用于 ELK) -->
        <appender name="JSON_FILE" class="ch.qos.logback.core.rolling.RollingFileAppender">
            <file>/var/log/app/application-json.log</file>
            <rollingPolicy class="ch.qos.logback.core.rolling.TimeBasedRollingPolicy">
                <fileNamePattern>/var/log/app/application-json-%d{yyyy-MM-dd}.log</fileNamePattern>
                <maxHistory>30</maxHistory>
                <totalSizeCap>10GB</totalSizeCap>
            </rollingPolicy>

            <encoder class="net.logstash.logback.encoder.LogstashEncoder">
                <providers>
                    <provider class="net.logstash.logback.composite.loggingevent.composite.JsonProvider"/>
                </providers>
            </encoder>
        </appender>

        <!-- 异步输出 -->
        <appender name="ASYNC_FILE" class="ch.qos.logback.classic.AsyncAppender">
            <queueSize>512</queueSize>
            <discardingThreshold>0</discardingThreshold>
            <appender-ref ref="JSON_FILE"/>
        </appender>

        <root level="INFO">
            <appender-ref ref="ASYNC_FILE"/>
        </root>
    </springProfile>

    <!-- 敏感信息脱敏 -->
    <conversionRule conversionWord="mask">
        <converter class="com.example.log.MaskingConverter"/>
    </conversionRule>
</configuration>`}
          />
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-4">自定义脱敏转换器</h3>
        <div className="bg-white border-2 border-slate-200 rounded-lg p-6 mb-6">
          <CodeBlock
            language="java"
            code={`package com.example.log;

import ch.qos.logback.classic.pattern.MessageConverter;
import ch.qos.logback.classic.spi.ILoggingEvent;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * 日志脱敏转换器
 * 自动脱敏 password、token、secret 等敏感信息
 */
public class MaskingConverter extends MessageConverter {

    private static final Pattern MASK_PATTERN = Pattern.compile(
        "(password|token|secret|key|auth)\\\\s*[=:]\\\\s*([^\\\\s,}]+)",
        Pattern.CASE_INSENSITIVE
    );

    @Override
    public String convert(ILoggingEvent event) {
        String message = event.getFormattedMessage();
        Matcher matcher = MASK_PATTERN.matcher(message);

        // 将敏感信息替换为 ***
        return matcher.replaceAll("$1=***");
    }
}

// 使用示例
// log.info("User login: username=admin, password=123456");
// 输出: User login: username=admin, password=***`}
          />
        </div>

        <div className="mt-6 bg-yellow-50 border-2 border-yellow-200 rounded-lg p-5">
          <h4 className="font-bold text-yellow-900 mb-2">💡 Maven 依赖</h4>
          <CodeBlock
            language="xml"
            code={`<dependency>
    <groupId>net.logstash.logback</groupId>
    <artifactId>logstash-logback-encoder</artifactId>
    <version>7.4</version>
</dependency>

<!-- application.yml 配置 -->
logging:
  config: classpath:logback-spring.xml
  file:
    name: /var/log/app/application.log`}
          />
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">8. Filebeat 完整配置</h2>

        <div className="bg-white border-2 border-slate-200 rounded-lg p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">filebeat.yml 完整配置</h3>
          <CodeBlock
            language="yaml"
            code={`filebeat.inputs:
  - type: log
    enabled: true
    paths:
      - /var/log/app/application-json.log
    fields:
      app_name: \${APP_NAME:user-service}
      env: \${ENVIRONMENT:production}
    fields_under_root: true
    multiline:
      pattern: '^\\\\d{4}-\\\\d{2}-\\\\d{2}'  # 匹配日期开头的行
      negate: true
      match: after
    tail_files: true
    harvester_buffer_size: 16384
    scan_frequency: 10s

# 输出到 Logstash
output.logstash:
  hosts: ["logstash:5044"]
  compression_level: 3
  bulk_max_size: 50
  template:
    settings:
      index.number_of_shards: 3
      index.number_of_replicas: 1

# Kibana Dashboard 配置
setup.kibana:
  host: "http://kibana:5601"

# 日志处理
processors:
  - drop_event:
      when:
        not:
          or:
            - equals:
                message: ""
            - regexp:
                message: "^\\\\s*$"
  - add_docker_metadata: ~
  - add_cloud_metadata: ~`}
          />
        </div>

        <div className="mt-6 bg-green-50 border-2 border-green-200 rounded-lg p-5">
          <h4 className="font-bold text-green-900 mb-2">🔧 Filebeat 启动命令</h4>
          <CodeBlock
            language="bash"
            code={`# 1. 下载安装 Filebeat
curl -L -O https://artifacts.elastic.co/downloads/beats/filebeat/filebeat-8.11.0-linux-x86_64.tar.gz
tar xzvf filebeat-8.11.0-linux-x86_64.tar.gz
cd filebeat-8.11.0-linux-x86_64

# 2. 配置 filebeat.yml
# (复制上面的配置)

# 3. 测试配置
./filebeat test config

# 4. 测试输出
./filebeat test output

# 5. 启动 Filebeat
./filebeat -e

# 6. 设置为系统服务（可选）
sudo ./filebeat install
sudo systemctl start filebeat
sudo systemctl enable filebeat`}
          />
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">9. Kibana 高级查询实战</h2>

        <div className="bg-white border-2 border-slate-200 rounded-lg p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">常用查询场景</h3>
          <CodeBlock
            language="javascript"
            code={`// 1. 查询特定服务的 ERROR 日志
GET /_search
{
  "query": {
    "bool": {
      "must": [
        { "term": { "service": "user-service" } },
        { "term": { "level": "ERROR" } }
      ]
    }
  },
  "size": 100
}

// 2. 查询包含特定关键词的日志
GET /_search
{
  "query": {
    "query_string": {
      "query": "NullPointerException"
    }
  }
}

// 3. 按时间范围查询
GET /_search
{
  "query": {
    "range": {
      "@timestamp": {
        "gte": "now-1h"
      }
    }
  }
}

// 4. 聚合查询：按服务统计 ERROR 数量
GET /_search
{
  "size": 0,
  "aggs": {
    "by_service": {
      "terms": {
        "field": "service.keyword"
      },
      "aggs": {
        "error_count": {
          "filter": {
            "term": { "level": "ERROR" }
          }
        }
      }
    }
  }
}

// 5. 查询特定 TraceId 的所有日志
GET /_search
{
  "query": {
    "term": { "trace_id": "abc123-def456" }
  }
}

// 6. 统计每分钟请求数
GET /_search
{
  "size": 0,
  "aggs": {
    "requests_per_minute": {
      "date_histogram": {
        "field": "@timestamp",
        "calendar_interval": "1m"
      }
    }
  }
}

// 7. 查询慢请求（耗时 > 3秒）
GET /_search
{
  "query": {
    "range": {
      "duration": {
        "gt": 3000
      }
    }
  }
}

// 8. 统计错误类型分布
GET /_search
{
  "size": 0,
  "aggs": {
    "error_types": {
      "terms": {
        "field": "exception_type.keyword",
        "size": 20
      }
    }
  }
}`}
          />
        </div>

        <div className="mt-6 bg-purple-50 border-2 border-purple-200 rounded-lg p-5">
          <h4 className="font-bold text-purple-900 mb-2">📊 Kibana 可视化配置</h4>
          <CodeBlock
            language="markdown"
            code={`# 创建 Dashboard 步骤

1. 创建索引模式
   - Stack Management -> Index Patterns
   - 输入: spring-cloud-alibaba-*
   - 时间字段: @timestamp

2. 创建可视化图表
   a. 错误日志趋势（Line Chart）
      - Visualize -> Line Chart
      - Y轴: Count
      - X轴: @timestamp (1分钟间隔)
      - Filter: level: ERROR

   b. 服务错误分布（Pie Chart）
      - Visualize -> Pie Chart
      - Slice by: service.keyword
      - Filter: level: ERROR

   c. 响应时间分布（Histogram）
      - Visualize -> Vertical Bar Chart
      - Y轴: Average duration
      - X轴: service.keyword

   d. 慢请求 Top10（Table）
      - Visualize -> Data Table
      - Buckets: Terms -> logger.keyword
      - Metrics: Max duration

3. 创建 Dashboard
   - Dashboard -> Create new dashboard
   - 添加上面创建的可视化图表
   - 保存为 "微服务监控 Dashboard"`}
          />
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">10. 日志告警规则（ElastAlert）</h2>

        <div className="bg-gradient-to-r from-red-50 to-orange-50 border-2 border-red-200 rounded-lg p-6 mb-6">
          <h3 className="text-xl font-bold text-gray-900 mb-3">🚨 告警场景</h3>
          <ul className="text-gray-700 space-y-2">
            <li>• <strong>ERROR 日志告警</strong>：5分钟内出现10次 ERROR</li>
            <li>• <strong>日志缺失告警</strong>：15分钟内日志流中断</li>
            <li>• <strong>慢查询告警</strong>：响应时间超过3秒</li>
            <li>• <strong>异常关键词</strong>：出现 "NullPointerException"</li>
          </ul>
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-4">ElastAlert 配置文件</h3>
        <div className="bg-white border-2 border-slate-200 rounded-lg p-6 mb-6">
          <CodeBlock
            language="yaml"
            code={`# elastalert/rules/error_log_alert.yml

name: ERROR日志告警
type: frequency
index: spring-cloud-alibaba-*
num_events: 10
timeframe:
  minutes: 5
filter:
- query:
    query_string:
      query: "level:ERROR"
alert:
  - "debug"
alert_text: "检测到大量ERROR日志"
alert_subject: "[ERROR] {{ service }} 服务异常"
alert:
  - "dingtalk"
dingtalk:
  webhook_url: "https://oapi.dingtalk.com/robot/send?access_token=YOUR_TOKEN"
  message: |
    服务: {{ service }}
    环境: {{ env }}
    错误日志数: {{ num_hits }}
    时间范围: {{ time_start }} - {{ time_end }}
  at_mobiles:
    - "138****1234"

---
# 日志缺失告警
name: 日志缺失告警
type: flatline
index: spring-cloud-alibaba-*
threshold: 5
timeframe:
  minutes: 15
alert:
  - "dingtalk"
alert_text: "检测到日志缺失"
alert_subject: "[ALERT] 日志流中断"
dingtalk:
  webhook_url: "https://oapi.dingtalk.com/robot/send?access_token=YOUR_TOKEN"
  message: |
    可能原因：服务崩溃、Filebeat停止、网络问题
    请立即检查！`}
          />
        </div>

        <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-5">
          <h4 className="font-bold text-blue-900 mb-2">🔧 ElastAlert 安装配置</h4>
          <CodeBlock
            language="bash"
            code={`# 1. 安装 ElastAlert
git clone https://github.com/Yelp/elastalert.git
cd elastalert
pip install -r requirements.txt
python setup.py install

# 2. 创建配置文件
cp config.yaml.example config.yaml

# 3. 修改 config.yaml
# rules_folder: rules
# run_every:
#   minutes: 1
# buffer_time:
#   minutes: 15
# es_host: elasticsearch
# es_port: 9200

# 4. 创建告警规则目录
mkdir rules
# 将上面的 YAML 配置保存到 rules/ 目录

# 5. 测试规则
elastalert-test-rule rules/error_log_alert.yml

# 6. 启动 ElastAlert
elastalert --verbose

# 7. 设置为系统服务
sudo systemctl enable elastalert
sudo systemctl start elastalert`}
          />
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">11. 分布式追踪集成</h2>

        <div className="bg-white border-2 border-slate-200 rounded-lg p-6 mb-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">MDC Filter 配置</h3>
          <CodeBlock
            language="java"
            code={`package com.example.filter;

import org.slf4j.MDC;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.UUID;

/**
 * MDC 过滤器
 * 为每个请求设置 TraceId，实现全链路追踪
 */
@Component
public class MdcFilter extends OncePerRequestFilter {

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain chain) throws IOException, ServletException {

        try {
            // 设置 TraceId
            String traceId = request.getHeader("X-Trace-Id");
            if (traceId == null || traceId.isEmpty()) {
                traceId = UUID.randomUUID().toString().replace("-", "");
            }

            MDC.put("traceId", traceId);
            MDC.put("userId", getCurrentUserId(request));
            MDC.put("clientIp", getClientIp(request));

            // 将 TraceId 添加到响应头
            response.setHeader("X-Trace-Id", traceId);

            chain.doFilter(request, response);

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
}`}
          />
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-4">Logback 配置（集成 TraceId）</h3>
        <div className="bg-white border-2 border-slate-200 rounded-lg p-6 mb-6">
          <CodeBlock
            language="xml"
            code={`<!-- logback-spring.xml -->
<configuration>
    <!-- 日志格式包含 TraceId -->
    <property name="LOG_PATTERN"
              value="%d{yyyy-MM-dd HH:mm:ss.SSS} [%X{traceId}] [%thread] %-5level %logger{36} - %msg%n"/>

    <!-- JSON 格式输出 -->
    <appender name="JSON_FILE" class="ch.qos.logback.core.rolling.RollingFileAppender">
        <file>/var/log/app/application-json.log</file>
        <encoder class="net.logstash.logback.encoder.LogstashEncoder">
            <includeContext>true</includeContext>
            <includeMdc>true</includeMdc>
            <customFields>{"app":"user-service","profile":"prod"}</customFields>
        </encoder>
        <rollingPolicy class="ch.qos.logback.core.rolling.TimeBasedRollingPolicy">
            <fileNamePattern>/var/log/app/application-json-%d{yyyy-MM-dd}.log</fileNamePattern>
            <maxHistory>30</maxHistory>
        </rollingPolicy>
    </appender>
</configuration>`}
          />
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-4">Kibana 查询（按 TraceId）</h3>
        <div className="bg-white border-2 border-slate-200 rounded-lg p-6 mb-6">
          <CodeBlock
            language="javascript"
            code={`// 查询特定 TraceId 的完整调用链
GET /_search
{
  "query": {
    "term": { "trace_id": "abc123def456" }
  },
  "sort": [
    { "@timestamp": { "order": "asc" } }
  ],
  "size": 100
}

// 返回结果示例
{
  "hits": {
    "hits": [
      {
        "_source": {
          "@timestamp": "2024-01-15T10:30:00.000Z",
          "trace_id": "abc123def456",
          "service": "gateway",
          "level": "INFO",
          "message": "Request started: GET /api/users/123"
        }
      },
      {
        "_source": {
          "@timestamp": "2024-01-15T10:30:00.050Z",
          "trace_id": "abc123def456",
          "service": "user-service",
          "level": "INFO",
          "message": "Loading user by id: 123"
        }
      },
      {
        "_source": {
          "@timestamp": "2024-01-15T10:30:00.100Z",
          "trace_id": "abc123def456",
          "service": "user-service",
          "level": "ERROR",
          "message": "User not found: 123"
        }
      }
    ]
  }
}`}
          />
        </div>

        <div className="bg-green-50 border-2 border-green-200 rounded-lg p-5">
          <h4 className="font-bold text-green-900 mb-2">✨ 效果演示</h4>
          <p className="text-gray-700 mb-3">
            通过 TraceId 可以追踪一个请求在整个微服务系统中的完整调用链路：
          </p>
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <div className="text-sm font-mono text-gray-800">
              Gateway → User Service → Order Service → Payment Service
            </div>
            <div className="mt-2 text-sm text-gray-600">
              使用同一个 TraceId 查询，即可看到所有服务的日志
            </div>
          </div>
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
