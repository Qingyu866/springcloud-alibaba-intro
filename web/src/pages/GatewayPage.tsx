import React, { useState } from 'react';
import { CodeBlock } from '../components';

export const GatewayPage: React.FC = () => {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  return (
    <div className="prose prose prose-slate max-w-none">
      {/* 页面头部 */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-700 text-white rounded-lg p-6 mb-8">
        <div className="flex items-center mb-2">
          <span className="text-3xl mr-3">🚪</span>
          <h1 className="text-3xl font-bold">Gateway 网关</h1>
        </div>
        <p className="text-lg opacity-90">
          微服务的"统一入口" - 路由转发、协议转换、安全控制
        </p>
        <div className="mt-4 flex items-center gap-4 text-sm">
          <span className="px-2 py-1 bg-white/20 rounded">🔧 需要基础</span>
          <span className="px-2 py-1 bg-white/20 rounded">⏱️ 3-4天</span>
          <span className="px-2 py-1 bg-white/20 rounded">📝 10个知识点</span>
        </div>
      </div>

      {/* 什么是 Gateway */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">什么是 Gateway?</h2>

        <div className="bg-purple-50 border-l-4 border-purple-500 p-6 rounded-lg mb-6">
          <p className="text-lg text-gray-700 mb-3">
            <strong>Spring Cloud Gateway</strong> 是 Spring Cloud 生态系统中的新一代 API 网关,
            基于 WebFlux 框架实现,提供了统一的 API 路由转发、请求过滤、负载均衡、协议转换等功能。
          </p>
          <p className="text-gray-700">
            它是 Spring Cloud Netflix Zuul 的升级替代品,性能更强、功能更丰富。
          </p>
        </div>

        <h3 className="text-2xl font-bold text-gray-800 mb-4">核心特性</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <FeatureCard icon="🚀" title="动态路由" desc="基于 Spring WebFlux" color="blue" />
          <FeatureCard icon="🔍" title="路由断言" desc="Path、Method、Header" color="green" />
          <FeatureCard icon="⚡" title="过滤器" desc="请求前后处理" color="orange" />
          <FeatureCard icon="⚖️" title="负载均衡" desc="集成 LoadBalancer" color="purple" />
          <FeatureCard icon="🛡️" title="限流熔断" desc="集成 Sentinel" color="red" />
          <FeatureCard icon="🔧" title="动态配置" desc="Nacos 配置中心" color="yellow" />
        </div>
      </section>

      {/* 为什么需要网关 */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">为什么需要网关?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <BenefitCard title="统一入口" desc="客户端只需知道网关地址" example="客户端 → 网关 → 多个微服务" />
          <BenefitCard title="协议转换" desc="HTTP、WebSocket、gRPC 等协议转换" example="HTTP前端 → gRPC后端" />
          <BenefitCard title="路由转发" desc="根据URL、Header等规则转发" example="/api/user/** → user-service" />
          <BenefitCard title="安全控制" desc="统一认证、鉴权、IP黑白名单" example="JWT Token验证" />
          <BenefitCard title="限流熔断" desc="集成 Sentinel 保护后端" example="QPS限制、熔断降级" />
          <BenefitCard title="监控日志" desc="统一监控、日志收集" example="SkyWalking追踪" />
        </div>
      </section>

      {/* 核心概念 */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">核心概念</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <ConceptCard3 title="路由 (Route)" level="beginner" desc="网关的基本构建块" example="id: user-service, uri: lb://USER-SERVICE" />
          <ConceptCard3 title="断言 (Predicate)" level="beginner" desc="匹配规则,决定是否转发" example="Path=/api/**, Method=GET" />
          <ConceptCard3 title="过滤器 (Filter)" level="intermediate" desc="请求前后的处理逻辑" example="添加请求头、鉴权" />
        </div>
      </section>

      {/* 快速开始 */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">快速开始</h2>

        <h3>步骤 1: 添加依赖</h3>
        <CodeBlock
          language="xml"
          code={`<dependencies>
    <dependency>
        <groupId>org.springframework.cloud</groupId>
        <artifactId>spring-cloud-starter-gateway</artifactId>
    </dependency>
    <dependency>
        <groupId>com.alibaba.cloud</groupId>
        <artifactId>spring-cloud-starter-alibaba-nacos-discovery</artifactId>
    </dependency>
</dependencies>`}
        />

        <h3>步骤 2: 配置文件</h3>
        <CodeBlock
          language="yaml"
          code={`server:
  port: 9090

spring:
  application:
    name: gateway-service
  cloud:
    nacos:
      discovery:
        server-addr: localhost:8848
    gateway:
      discovery:
        locator:
          enabled: true
      routes:
        - id: user-service-route
          uri: lb://user-service
          predicates:
            - Path=/api/user/**
          filters:
            - StripPrefix=2
        - id: order-service-route
          uri: lb://order-service
          predicates:
            - Path=/api/order/**
          filters:
            - StripPrefix=2`}
        />
      </section>

      {/* 路由断言详解 */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">路由断言配置示例</h2>
        <p className="text-lg text-gray-700 mb-6">
          使用YAML配置方式定义路由断言,更清晰、更易维护。
        </p>
        <CodeBlock
          language="yaml"
          code={`spring:
  cloud:
    gateway:
      routes:
        # Path断言
        - id: path-route
          uri: lb://path-service
          predicates:
            - Path=/api/path/**

        # Method断言
        - id: method-route
          uri: lb://method-service
          predicates:
            - Method=GET

        # Header断言
        - id: header-route
          uri: lb://header-service
          predicates:
            - Header=X-Request-Id, \\d+

        # Query断言
        - id: query-route
          uri: lb://query-service
          predicates:
            - Query=color

        # 组合断言
        - id: composite-route
          uri: lb://composite-service
          predicates:
            - Path=/api/composite/**
            - Method=GET
            - Header=X-Request-Id, \\d+

        # Cookie断言
        - id: cookie-route
          uri: lb://cookie-service
          predicates:
            - Cookie=sessionid, .*

        # RemoteAddr断言
        - id: ip-route
          uri: lb://ip-service
          predicates:
            - RemoteAddr=192.168.1.100/24`}
          />
      </section>

      {/* 常用断言详解 */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">常用断言详解</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="border border-gray-300 px-4 py-2 text-left">断言</th>
                <th className="border border-gray-300 px-4 py-2 text-left">说明</th>
                <th className="border border-gray-300 px-4 py-2 text-left">示例</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-mono text-sm">Path</td>
                <td className="border border-gray-300 px-4 py-2">路径匹配</td>
                <td className="border border-gray-300 px-4 py-2 font-mono text-xs">- Path=/api/user/**</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="border border-gray-300 px-4 py-2 font-mono text-sm">Method</td>
                <td className="border border-gray-300 px-4 py-2">HTTP方法</td>
                <td className="border border-gray-300 px-4 py-2 font-mono text-xs">- Method=GET,POST</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-mono text-sm">Header</td>
                <td className="border border-gray-300 px-4 py-2">请求头匹配</td>
                <td className="border border-gray-300 px-4 py-2 font-mono text-xs">- Header=X-Request-Id, \\d+</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="border border-gray-300 px-4 py-2 font-mono text-sm">Query</td>
                <td className="border border-gray-300 px-4 py-2">查询参数</td>
                <td className="border border-gray-300 px-4 py-2 font-mono text-xs">- Query=color</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-mono text-sm">Cookie</td>
                <td className="border border-gray-300 px-4 py-2">Cookie匹配</td>
                <td className="border border-gray-300 px-4 py-2 font-mono text-xs">- Cookie=sessionid, .*</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="border border-gray-300 px-4 py-2 font-mono text-sm">RemoteAddr</td>
                <td className="border border-gray-300 px-4 py-2">IP地址</td>
                <td className="border border-gray-300 px-4 py-2 font-mono text-xs">- RemoteAddr=192.168.1.0/24</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-mono text-sm">Host</td>
                <td className="border border-gray-300 px-4 py-2">主机名</td>
                <td className="border border-gray-300 px-4 py-2 font-mono text-xs">- Host=**.somehost.org</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="border border-gray-300 px-4 py-2 font-mono text-sm">Time</td>
                <td className="border border-gray-300 px-4 py-2">时间范围</td>
                <td className="border border-gray-300 px-4 py-2 font-mono text-xs">- Between=2023-01-01T00:00:00+08:00[Asia/Shanghai],2023-12-31T23:59:59+08:00[Asia/Shanghai]</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 内置过滤器详解 */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">内置过滤器详解</h2>
        <CodeBlock
          language="yaml"
          code={`spring:
  cloud:
    gateway:
      routes:
        - id: filter-example
          uri: lb://example-service
          predicates:
            - Path=/api/example/**
          filters:
            # 去除前缀
            - StripPrefix=2

            # 路径重写
            - RewritePath=/api/(?<segment>.*), /$\\{segment}

            # 添加请求头
            - AddRequestHeader=X-Request-Id, \${uuid}
            - AddRequestHeader=X-Gateway, Spring-Cloud-Gateway

            # 移除请求头
            - RemoveRequestHeader=X-Custom-Header

            # 添加响应头
            - AddResponseHeader=X-Response-Id, \${uuid}`}
          />
      </section>

      {/* 自定义过滤器 */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">自定义过滤器实战</h2>

        <h3 className="text-xl font-bold text-gray-800 mb-4">认证过滤器</h3>
        <CodeBlock
          language="java"
          code={`@Component
public class AuthFilter implements GlobalFilter, Ordered {
    @Override
    public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {
        String token = exchange.getRequest().getHeaders().getFirst("Authorization");

        // 验证JWT Token
        if (token == null || !JwtUtil.validate(token)) {
            exchange.getResponse().setStatusCode(HttpStatus.UNAUTHORIZED);
            return exchange.getResponse().setComplete();
        }

        // 添加用户信息到请求头
        return chain.filter(exchange.mutate()
            .request(r -> r.header("X-User-Id", JwtUtil.getUserId(token)))
            .build());
    }

    @Override
    public int getOrder() {
        return -100; // 优先级最高
    }
}`}
        />

        <h3 className="text-xl font-bold text-gray-800 mb-4 mt-6">日志过滤器</h3>
        <CodeBlock
          language="java"
          code={`@Component
public class LoggingFilter implements GlobalFilter, Ordered {
    private static final Logger log = LoggerFactory.getLogger(LoggingFilter.class);

    @Override
    public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {
        ServerHttpRequest request = exchange.getRequest();
        long startTime = System.currentTimeMillis();

        return chain.filter(exchange).then(Mono.fromRunnable(() -> {
            ServerHttpResponse response = exchange.getResponse();
            long duration = System.currentTimeMillis() - startTime;

            log.info("Request: {} {} - Status: {} - Duration: {}ms",
                request.getMethod(),
                request.getURI().getPath(),
                response.getStatusCode(),
                duration
            );
        }));
    }

    @Override
    public int getOrder() {
        return 0;
    }
}`}
        />
      </section>

      {/* 跨域配置 */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">跨域配置</h2>
        <CodeBlock
          language="java"
          code={`@Configuration
public class CorsConfig {
    @Bean
    public CorsWebFilter corsFilter() {
        CorsConfiguration config = new CorsConfiguration();

        config.addAllowedOrigin("*");
        config.addAllowedMethod("*");
        config.addAllowedHeader("*");
        config.setAllowCredentials(true);
        config.setMaxAge(3600L);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);

        return new CorsWebFilter(source);
    }
}`}
        />
      </section>

      {/* 动态路由 */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">动态路由配置</h2>
        <p className="text-lg text-gray-700 mb-6">
          Gateway支持从Nacos配置中心动态读取路由配置,实现无需重启服务的路由更新。
        </p>
        <CodeBlock
          language="yaml"
          code={`spring:
  cloud:
    gateway:
      discovery:
        locator:
          enabled: true
      routes:
        # 动态路由配置
        - id: dynamic-route
          uri: lb://dynamic-service
          predicates:
            - Path=/api/dynamic/**
          metadata:
            # 从Nacos配置中心读取
            config-version: 1.0.0`}
        />
      </section>

      {/* 集成 Sentinel */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">集成 Sentinel 限流</h2>
        <CodeBlock
          language="yaml"
          code={`spring:
  cloud:
    gateway:
      enabled: true
      routes:
        - id: user-service
          uri: lb://user-service
          predicates:
            - Path=/api/user/**
          filters:
            - name: SentinelGatewayFilter
              args:
                resource: user-api
                grade: 1  # QPS限流
                count: 100
                controlBehavior: 0  # 直接拒绝
                blockClass: com.example.BlockHandler
`}
          />

        <div className="mt-6 p-4 bg-green-50 border-l-4 border-green-500 rounded">
          <h4 className="font-bold text-gray-900 mb-2">网关限流的优势</h4>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start">
              <span className="text-green-600 mr-2">✓</span>
              <span>在网关层拦截,保护后端服务</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-600 mr-2">✓</span>
              <span>针对不同API设置不同限流阈值</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-600 mr-2">✓</span>
              <span>配合熔断降级,保护系统稳定</span>
            </li>
          </ul>
        </div>
      </section>

      {/* 高可用部署 */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">网关高可用部署</h2>
        <p className="text-lg text-gray-700 mb-6">
          使用Kubernetes部署多个Gateway实例,实现高可用和负载均衡。
        </p>
        <CodeBlock
          language="yaml"
          code={`# Gateway多实例部署
spec:
  replicas: 3  # 3个实例
  selector:
    matchLabels:
      app: gateway
  template:
    spec:
      containers:
      - name: gateway
        image: gateway:latest
        ports:
        - containerPort: 9090
        env:
        - name: SPRING_PROFILES_ACTIVE
          value: production
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
            port: 9090
          initialDelaySeconds: 30
          periodSeconds: 10
        readinessProbe:
          httpGet:
            path: /actuator/health
            port: 9090
          initialDelaySeconds: 10
          periodSeconds: 5`}
        />
      </section>

      {/* 性能优化 */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">性能优化配置</h2>
        <CodeBlock
          language="yaml"
          code={`spring:
  cloud:
    gateway:
      httpclient:
        # 连接池配置
        connect-timeout: 1000
        response-timeout: 30s
        pool:
          type: fixed
          max-connections: 500
          acquire-timeout: 10000

      # 全局CORS配置
      globalcors:
        cors-configurations:
          '[/**]':
            allowedOrigins: "*"
            allowedMethods:
              - GET
              - POST
              - PUT
              - DELETE
              - OPTIONS
            allowedHeaders: "*"
            allowCredentials: true
            maxAge: 3600`}
        />
      </section>

      {/* 最佳实践 */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">最佳实践</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <BestPracticeCard3 title="路由设计" practices={['按业务域划分', '命名风格一致', '避免过深嵌套', '版本号控制']} />
          <BestPracticeCard3 title="安全配置" practices={['启用HTTPS', '隐藏后端地址', 'IP白名单', '认证授权']} />
          <BestPracticeCard3 title="性能优化" practices={['HTTP2', '连接池配置', '启用缓存', '禁用不必要功能']} />
          <BestPracticeCard3 title="监控告警" practices={['健康检查', '转发延迟', '异常告警', '访问日志']} />
        </div>
      </section>

      {/* 常见问题 */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">常见问题</h2>
        <div className="space-y-3">
          <FaqCard2 number={1} question="Gateway vs Zuul?" answer="Gateway响应式、性能更高、持续维护;Zuul已停止维护" isOpen={expandedFaq === 1} onClick={() => setExpandedFaq(expandedFaq === 1 ? null : 1)} />
          <FaqCard2 number={2} question="如何实现路径重写?" answer="使用 RewritePath 过滤器或 Path 断言" isOpen={expandedFaq === 2} onClick={() => setExpandedFaq(expandedFaq === 2 ? null : 2)} />
          <FaqCard2 number={3} question="如何跨域访问?" answer="配置 CorsWebFilter 或 Gateway CORS" isOpen={expandedFaq === 3} onClick={() => setExpandedFaq(expandedFaq === 3 ? null : 3)} />
          <FaqCard2 number={4} question="支持 WebSocket?" answer="原生支持 WebSocket 协议转发" isOpen={expandedFaq === 4} onClick={() => setExpandedFaq(expandedFaq === 4 ? null : 4)} />
          <FaqCard2 number={5} question="如何实现灰度发布?" answer="Header 断言 + 权重路由" isOpen={expandedFaq === 5} onClick={() => setExpandedFaq(expandedFaq === 5 ? null : 5)} />
          <FaqCard2 number={6} question="Gateway vs Nginx?" answer="Gateway: 微服务网关,动态路由、集成服务发现; Nginx: 反向代理,高性能、负载均衡" isOpen={expandedFaq === 6} onClick={() => setExpandedFaq(expandedFaq === 6 ? null : 6)} />
          <FaqCard2 number={7} question="如何实现API聚合?" answer="使用聚合过滤器或自定义过滤器聚合多个服务响应" isOpen={expandedFaq === 7} onClick={() => setExpandedFaq(expandedFaq === 7 ? null : 7)} />
          <FaqCard2 number={8} question="如何实现服务降级?" answer="集成Hystrix或Sentinel实现熔断降级" isOpen={expandedFaq === 8} onClick={() => setExpandedFaq(expandedFaq === 8 ? null : 8)} />
          <FaqCard2 number={9} question="如何调试路由规则?" answer="启用Gateway日志: logging.level.org.springframework.cloud.gateway=DEBUG" isOpen={expandedFaq === 9} onClick={() => setExpandedFaq(expandedFaq === 9 ? null : 9)} />
          <FaqCard2 number={10} question="如何限制请求大小?" answer="配置spring.servlet.multipart.maxFileSize: 10MB" isOpen={expandedFaq === 10} onClick={() => setExpandedFaq(expandedFaq === 10 ? null : 10)} />
          <FaqCard2 number={11} question="如何实现WebSocket支持?" answer="Gateway原生支持WebSocket,只需配置路由即可: - Path=/ws/**" isOpen={expandedFaq === 11} onClick={() => setExpandedFaq(expandedFaq === 11 ? null : 11)} />
        </div>
      </section>

      {/* 下一步 */}
      <section className="bg-gradient-to-r from-purple-600 to-indigo-700 text-white p-8 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">🎯 掌握了 Gateway,下一步学习什么?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <NextStepCard2 title="OpenFeign" description="声明式服务调用" link="/feign" icon="📞" />
          <NextStepCard2 title="LoadBalancer" description="负载均衡策略" link="/loadbalancer" icon="⚖️" />
          <NextStepCard2 title="Nacos Config" description="动态配置管理" link="/nacos-config" icon="⚙️" />
          <NextStepCard2 title="监控告警" description="监控体系设计" link="/monitoring" icon="📊" />
        </div>
      </section>
    </div>
  );
};

// 辅助组件
interface FeatureCardProps {
  icon: string;
  title: string;
  desc: string;
  color: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, desc, color }) => {
  const colorClasses = {
    blue: 'bg-blue-50 border-blue-200',
    green: 'bg-green-50 border-green-200',
    orange: 'bg-orange-50 border-orange-200',
    purple: 'bg-purple-50 border-purple-200',
    red: 'bg-red-50 border-red-200',
    yellow: 'bg-yellow-50 border-yellow-200',
  };
  return (
    <div className={`p-4 border-2 ${colorClasses[color as keyof typeof colorClasses]} rounded-lg`}>
      <div className="flex items-center mb-2">
        <span className="text-2xl mr-2">{icon}</span>
        <h4 className="font-bold text-gray-900">{title}</h4>
      </div>
      <p className="text-sm text-gray-600">{desc}</p>
    </div>
  );
};

interface BenefitCardProps {
  title: string;
  desc: string;
  example: string;
}

const BenefitCard: React.FC<BenefitCardProps> = ({ title, desc, example }) => (
  <div className="p-4 bg-white border-2 border-green-200 rounded-lg">
    <h4 className="font-bold text-gray-900 mb-2">{title}</h4>
    <p className="text-sm text-gray-600 mb-2">{desc}</p>
    <p className="text-xs text-gray-500">示例: {example}</p>
  </div>
);

interface ConceptCard3Props {
  title: string;
  level: 'beginner' | 'intermediate' | 'architect';
  desc: string;
  example: string;
}

const ConceptCard3: React.FC<ConceptCard3Props> = ({ title, level, desc, example }) => {
  const levelConfig = {
    beginner: { icon: '🌱', label: '基础', color: 'bg-green-50 border-green-200' },
    intermediate: { icon: '🔧', label: '进阶', color: 'bg-blue-50 border-blue-200' },
    architect: { icon: '🏗️', label: '高级', color: 'bg-purple-50 border-purple-200' },
  };
  return (
    <div className={`p-5 border-2 rounded-lg ${levelConfig[level].color}`}>
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-xl font-bold text-gray-900">{title}</h3>
        <span className="text-xs px-2 py-1 bg-white rounded">
          {levelConfig[level].icon} {levelConfig[level].label}
        </span>
      </div>
      <p className="text-gray-700 mb-3">{desc}</p>
      <div className="text-sm">
        <span className="font-semibold text-gray-600">示例: </span>
        <code className="text-primary">{example}</code>
      </div>
    </div>
  );
};

interface BestPracticeCard3Props {
  title: string;
  practices: string[];
}

const BestPracticeCard3: React.FC<BestPracticeCard3Props> = ({ title, practices }) => {
  return (
    <div className="p-5 bg-green-50 border-2 border-green-200 rounded-lg">
      <h3 className="text-lg font-bold text-gray-900 mb-3">{title}</h3>
      <ul className="space-y-2">
        {practices.map((practice, index) => (
          <li key={index} className="flex items-start text-sm text-gray-700">
            <span className="text-green-600 mr-2">✓</span>
            <span>{practice}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

interface FaqCard2Props {
  number: number;
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
}

const FaqCard2: React.FC<FaqCard2Props> = ({ number, question, answer, isOpen, onClick }) => {
  return (
    <div className="bg-white border-2 border-gray-200 rounded-lg overflow-hidden">
      <button
        onClick={onClick}
        className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
      >
        <h3 className="text-lg font-bold text-gray-900">
          {number}. {question}
        </h3>
        <svg
          className={`w-5 h-5 text-gray-500 transition-transform flex-shrink-0 ml-4 ${
            isOpen ? 'rotate-180' : ''
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7 7" />
        </svg>
      </button>
      {isOpen && (
        <div className="px-6 pb-4 text-gray-700 text-sm">
          {answer}
        </div>
      )}
    </div>
  );
};

interface NextStepCard2Props {
  title: string;
  description: string;
  link: string;
  icon: string;
}

const NextStepCard2: React.FC<NextStepCard2Props> = ({ title, description, link, icon }) => {
  return (
    <a href={link} className="block p-4 bg-white/10 backdrop-blur rounded-lg hover:bg-white/20 transition-colors">
      <div className="flex items-start">
        <span className="text-2xl mr-3">{icon}</span>
        <div className="flex-1">
          <h4 className="font-bold mb-1">{title}</h4>
          <p className="text-sm opacity-90">{description}</p>
        </div>
        <svg className="w-5 h-5 flex-shrink-0 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </a>
  );
};
