import { useState } from 'react';
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
        <h2 className="text-3xl font-bold text-gray-900 mb-6">路由断言详解</h2>
        <p className="text-lg text-gray-700 mb-6">
          断言(Predicate)用于匹配请求,决定是否将请求转发到目标服务。
        </p>
        <CodeBlock
          language="java"
          code={`import org.springframework.cloud.gateway.route.RouteLocatorBuilder;
import { useState } from 'react';
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;

@Configuration
public class GatewayConfig {

    @Bean
    public RouteLocatorBuilder customRouteLocator(RouteLocatorBuilder builder) {
        return builder.routes()
            // 路径匹配示例
            .route("path-route")
                .uri("lb://path-service")
                .predicate(path("/api/path/**"))
                .and()
            )

            // 方法匹配示例
            .route("method-route")
                .uri("lb://method-service")
                .predicate(method("GET"))
                .and()

            // Header 匹配示例
            .route("header-route")
                .uri("lb://header-service")
                .predicate(header("X-Request-Id", "\\d+"))
                .and()

            // Query 匹配示例
            .route("query-route")
                .uri("lb://query-service")
                .predicate(query("color"))
                .and()

            // 组合断言 (AND)
            .route("composite-route")
                .uri("lb://composite-service")
                .predicate(path("/api/composite/**"))
                .and()
                .predicate(method("GET"))
                .and()
                .predicate(header("X-Request-Id", "\\d+"))
                .and()

            // OR 断言
            .route("or-route")
                .uri("lb://or-service")
                .predicate(path("/api/or/**").and())
                .or()
                .predicate(path("/api/alt/**").and(method("GET"))
                .and()

            // Before/After 时间断言
            .route("time-route")
                .uri("lb://time-service")
                .predicate(and(
                    after("2023-01-01T00:00:00+08:00[Asia/Shanghai]"),
                    before("2023-12-31T23:59:59+08:00[Asia/Shanghai]")
                ))
                .and()

            // Cookie 断言
            .route("cookie-route")
                .uri("lb://cookie-service")
                .predicate(cookie("sessionid", ".*"))
                .and()

            // RemoteAddr 断言
            .route("ip-route")
                .uri("lb://ip-service")
                .predicate(remouteAddr("192.168.1.100/24"))
                .and()

            .build();
    }
}`}
          />
      </section>

      {/* 过滤器详解 */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">过滤器详解</h2>
        <p className="text-lg text-gray-700 mb-6">
          过滤器用于在请求转发前后对请求和响应进行处理。
        </p>

        <CodeBlock
          language="java"
          code={`// 全局过滤器示例: 添加请求头
@Component
public class AddRequestHeaderFilter implements GlobalFilter, Ordered {

    @Override
    public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {
        return chain.filter(exchange.mutate()
            .request(r -> r.mutate()
                .headers(headers -> headers.put("X-Request-Id", UUID.randomUUID()))
                .header("X-Gateway", "Spring Cloud Gateway")
                .header("X-Timestamp", String.valueOf(System.currentTimeMillis()))
            ).build()
        ).then();
    }

    @Override
    public int getOrder() {
        return 0;
    }
}`}
          />

        <div className="mt-6">
          <h4>路径过滤器示例: 去除前缀</h4>
          <CodeBlock
            language="java"
            code={`@Component
public class StripPrefixFilter implements GatewayFilterFactory {

    @Override
    public GatewayFilter apply(Config config) {
        return (exchange, chain) -> {
            ServerHttpRequest request = exchange.getRequest();
            String path = request.getURI().getRawPath();
            String newPath = path.replaceAll("^/api", "");

            ServerHttpRequest newRequest = request.mutate()
                .path(newPath)
                .build();

            return chain.filter(exchange.mutate().request(newRequest).build());
        };
    }

    @Override
    public Class<Config> getConfigClass() {
        return Config.class;
    }

    public static class Config {
        // 配置参数
    }
}`}
            />
          </div>
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
              <span className="text GUI/Game mr-2">✓</span>
              <span>针对不同API设置不同限流阈值</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-600 mr-2">✓</span>
              <span>配合熔断降级,保护系统稳定</span>
            </li>
          </ul>
        </div>
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
        <code className="text-primary-600">{example}</code>
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
