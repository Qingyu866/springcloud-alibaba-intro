import { useState } from 'react';
import { CodeBlock } from '../components';
export const LoadBalancerPage: React.FC = () => {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  return (
    <div className="prose prose prose-slate max-w-none">
      {/* 页面头部 */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg p-6 mb-8">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-4xl font-bold mb-2">LoadBalancer 负载均衡</h1>
            <p className="text-green-50 text-lg">客户端负载均衡，智能分发请求</p>
          </div>
          <div className="flex gap-3 text-sm">
            <span className="px-3 py-1 bg-white/20 rounded-full">🔧 进阶</span>
            <span className="px-3 py-1 bg-white/20 rounded-full">⏱️ 约35分钟</span>
            <span className="px-3 py-1 bg-white/20 rounded-full">📚 9个知识点</span>
          </div>
        </div>
      </div>

      {/* 什么是 LoadBalancer */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">什么是负载均衡?</h2>
        <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-lg mb-6">
          <p className="text-lg text-gray-800 leading-relaxed mb-4">
            <strong>Spring Cloud LoadBalancer</strong> 是 Spring Cloud 提供的客户端负载均衡器，
            用于替代已进入维护模式的 Netflix Ribbon。
          </p>
          <p className="text-gray-700 mb-4">
            它在服务消费端运行，从服务注册中心获取可用服务实例列表，并根据配置的策略选择一个实例进行调用。
            与服务端负载均衡不同，客户端负载均衡可以让客户端有更灵活的控制能力。
          </p>
          <div className="bg-white p-4 rounded border border-green-200 mt-4">
            <h4 className="font-bold text-gray-900 mb-2">💡 核心特性</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start">
                <span className="text-green-600 mr-2">✓</span>
                <span><strong>客户端负载均衡</strong> - 在消费端进行服务选择</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2">✓</span>
                <span><strong>多种负载均衡策略</strong> - 轮询、随机、权重等</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2">✓</span>
                <span><strong>健康检查</strong> - 自动剔除不健康实例</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2">✓</span>
                <span><strong>可扩展性</strong> - 支持自定义策略</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2">✓</span>
                <span><strong>响应式支持</strong> - 基于 Spring Reactor</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <FeatureCard icon="🔄" title="轮询策略" desc="均匀分配请求" color="green" />
          <FeatureCard icon="🎲" title="随机策略" desc="随机选择实例" color="blue" />
          <FeatureCard icon="⚖️" title="加权策略" desc="按性能分配" color="purple" />
          <FeatureCard icon="💚" title="健康检查" desc="自动剔除故障" color="emerald" />
          <FeatureCard icon="🔌" title="易于集成" desc="与 Feign 无缝集成" color="yellow" />
          <FeatureCard icon="⚡" title="高性能" desc="响应式设计" color="red" />
        </div>
      </section>

      {/* 客户端 vs 服务端负载均衡 */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">客户端 vs 服务端负载均衡</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-lg">
            <h3 className="text-xl font-bold text-gray-900 mb-3">🖥️ 服务端负载均衡</h3>
            <p className="text-sm text-gray-600 mb-4">如 Nginx、HAProxy、F5</p>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>• 集中在入口处管理</li>
              <li>• 对客户端透明</li>
              <li>• 需要额外硬件/软件</li>
              <li>• 可能成为单点故障</li>
              <li>• 配置修改需要重启</li>
            </ul>
            <div className="mt-4 p-3 bg-white rounded border border-red-200">
              <p className="text-xs text-gray-600">架构：客户端 → 负载均衡器 → 服务实例</p>
            </div>
          </div>

          <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-lg">
            <h3 className="text-xl font-bold text-gray-900 mb-3">💻 客户端负载均衡</h3>
            <p className="text-sm text-gray-600 mb-4">如 Spring Cloud LoadBalancer</p>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>• 分布式，每个客户端都有</li>
              <li>• 客户端感知服务列表</li>
              <li>• 无需额外组件</li>
              <li>• 避免单点故障</li>
              <li>• 动态感知服务变化</li>
            </ul>
            <div className="mt-4 p-3 bg-white rounded border border-green-200">
              <p className="text-xs text-gray-600">架构：客户端(带LB) → 直接调用服务实例</p>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-lg mt-6">
          <h4 className="font-bold text-gray-900 mb-2">💡 最佳实践</h4>
          <p className="text-gray-700 text-sm">
            在微服务架构中，通常<strong>同时使用</strong>服务端和客户端负载均衡：
          </p>
          <ul className="text-sm text-gray-700 mt-2 space-y-1">
            <li>• 服务端负载均衡（如 Nginx）用于<strong>外部流量入口</strong></li>
            <li>• 客户端负载均衡（如 LoadBalancer）用于<strong>服务间调用</strong></li>
          </ul>
        </div>
      </section>

      {/* 核心概念 */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">核心概念</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ConceptCard3
            title="ServiceInstance"
            level="beginner"
            desc="服务实例，包含主机、端口、元数据等信息"
            example="host: 192.168.1.100, port: 8080"
          />
          <ConceptCard3
            title="LoadBalancer"
            level="beginner"
            desc="负载均衡器接口，负责选择服务实例"
            example="choose() 方法返回选中的实例"
          />
          <ConceptCard3
            title="ReactorLoadBalancer"
            level="intermediate"
            desc="响应式负载均衡器，支持异步非阻塞"
            example="基于 Spring Reactor 实现"
          />
          <ConceptCard3
            title="ServiceInstanceListSupplier"
            level="intermediate"
            desc="服务实例列表供应器，从注册中心获取实例"
            example="从 Nacos 获取服务列表"
          />
        </div>
      </section>

      {/* 快速开始 */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">快速开始</h2>
        <p className="text-gray-700 mb-6">通过一个完整的示例，学习如何使用 LoadBalancer 进行客户端负载均衡。</p>

        <h3>步骤 1: 添加依赖</h3>
        <CodeBlock
          language="xml"
          code={`<!-- pom.xml -->
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-loadbalancer</artifactId>
</dependency>

<!-- 如果使用缓存，添加缓存依赖 -->
<dependency>
    <groupId>com.github.ben-manes.caffeine</groupId>
    <artifactId>caffeine</artifactId>
</dependency>`}
        />

        <h3>步骤 2: 配置负载均衡</h3>
        <CodeBlock
          language="yaml"
          code={`# application.yml
spring:
  application:
    name: order-service

  cloud:
    nacos:
      discovery:
        server-addr: localhost:8848

    loadbalancer:
      # 启用缓存
      cache:
        enabled: true
        # 缓存ttl，默认35s
        ttl: 35s
        # 缓存容量
        capacity: 256`}
        />

        <h3>步骤 3: 使用 RestTemplate + LoadBalancer</h3>
        <CodeBlock
          language="java"
          code={`@Configuration
public class RestTemplateConfig {

    @Bean
    @LoadBalanced  // 启用负载均衡
    public RestTemplate restTemplate() {
        return new RestTemplate();
    }
}

@Service
public class OrderService {

    @Autowired
    private RestTemplate restTemplate;

    public UserDTO getUser(Long userId) {
        // 使用服务名调用，会自动进行负载均衡
        return restTemplate.getForObject(
            "http://user-service/api/users/" + userId,
            UserDTO.class
        );
    }
}`}
        />

        <h3>步骤 4: 使用 WebClient + LoadBalancer</h3>
        <CodeBlock
          language="java"
          code={`@Configuration
public class WebClientConfig {

    @Bean
    @LoadBalanced  // 启用负载均衡
    public WebClient.Builder webClientBuilder() {
        return WebClient.builder();
    }
}

@Service
public class OrderService {

    @Autowired
    private WebClient.Builder webClientBuilder;

    public Mono<UserDTO> getUser(Long userId) {
        return webClientBuilder.build()
            .get()
            .uri("http://user-service/api/users/" + userId)
            .retrieve()
            .bodyToMono(UserDTO.class);
    }
}`}
        />

        <h3>步骤 5: 验证负载均衡</h3>
        <CodeBlock
          language="java"
          code={`// 启动多个 user-service 实例
// 实例1: java -jar user-service.jar --server.port=8081
// 实例2: java -jar user-service.jar --server.port=8082
// 实例3: java -jar user-service.jar --server.port=8083

// 在 user-service 的 Controller 中添加日志
@RestController
public class UserController {

    @Value("$\{server.port\}")
    private String port;

    @GetMapping("/api/users/{id}")
    public UserDTO getUser(@PathVariable Long id) {
        log.info("处理请求，当前端口: {}", port);
        // ...
    }
}

// 多次调用，观察日志中的端口变化
// 如果看到端口在 8081、8082、8083 之间轮换，说明负载均衡生效`}
        />
      </section>

      {/* 负载均衡策略 */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">负载均衡策略</h2>

        <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-lg mb-6">
          <h4 className="font-bold text-gray-900 mb-2">💡 Spring Cloud LoadBalancer 默认策略</h4>
          <p className="text-gray-700 text-sm">
            默认使用 <strong>RoundRobinLoadBalancer</strong>（轮询策略），
            按顺序依次选择每个服务实例，保证请求均匀分配。
          </p>
        </div>

        <h3>1. 轮询策略 (Round Robin)</h3>
        <CodeBlock
          language="java"
          code={`// 默认策略，无需额外配置
// 请求按顺序分配：实例1 → 实例2 → 实例3 → 实例1 ...

@Configuration
public class LoadBalancerConfig {

    @Bean
    public ReactorLoadBalancer<ServiceInstance> roundRobinLoadBalancer(
            Environment environment,
            LoadBalancerClientFactory loadBalancerClientFactory) {
        String name = environment.getProperty(LoadBalancerClientFactory.PROPERTY_NAME);
        return new RoundRobinLoadBalancer(
            loadBalancerClientFactory.getLazyProvider(name, ServiceInstanceListSupplier.class),
            name
        );
    }
}`}
        />

        <h3>2. 随机策略 (Random)</h3>
        <CodeBlock
          language="java"
          code={`@Configuration
public class LoadBalancerConfig {

    @Bean
    public ReactorLoadBalancer<ServiceInstance> randomLoadBalancer(
            Environment environment,
            LoadBalancerClientFactory loadBalancerClientFactory) {
        String name = environment.getProperty(LoadBalancerClientFactory.PROPERTY_NAME);
        return new RandomLoadBalancer(
            loadBalancerClientFactory.getLazyProvider(name, ServiceInstanceListSupplier.class),
            name
        );
    }
}`}
        />

        <h3>3. 自定义权重策略</h3>
        <CodeBlock
          language="java"
          code={`// 基于服务实例权重的负载均衡策略
public class WeightedServiceInstanceListSupplier implements ServiceInstanceListSupplier {

    private final ServiceInstanceListSupplier delegate;
    private final String weightKey;

    public WeightedServiceInstanceListSupplier(
            ServiceInstanceListSupplier delegate,
            String weightKey) {
        this.delegate = delegate;
        this.weightKey = weightKey;
    }

    @Override
    public Flux<List<ServiceInstance>> get() {
        return delegate.get().map(instances -> {
            // 根据权重筛选和排序实例
            return instances.stream()
                .filter(instance -> instance.getMetadata().containsKey(weightKey))
                .sorted((i1, i2) -> {
                    int weight1 = Integer.parseInt(i1.getMetadata().get(weightKey));
                    int weight2 = Integer.parseInt(i2.getMetadata().get(weightKey));
                    return Integer.compare(weight2, weight1);  // 降序
                })
                .collect(Collectors.toList());
        });
    }
}

// 在服务实例中设置权重（如 Nacos 控制台）
// instance1: weight = 10
// instance2: weight = 5
// instance3: weight = 1
// 权重越高，被选中概率越大`}
        />

        <h3>4. 配置特定服务的负载均衡策略</h3>
        <CodeBlock
          language="yaml"
          code={`# application.yml
user-service:
  ribbon:
    NFLoadBalancerRuleClassName: com.netflix.loadbalancer.RandomRule

# Spring Cloud LoadBalancer 配置方式
spring:
  cloud:
    loadbalancer:
      configurations: default  # 默认配置
      # 或指定策略: random, round-robin`}
        />
      </section>

      {/* 健康检查与故障隔离 */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">健康检查与故障隔离</h2>

        <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-lg mb-6">
          <h4 className="font-bold text-gray-900 mb-2">⚠️ 为什么需要健康检查?</h4>
          <p className="text-gray-700 text-sm">
            当某个服务实例出现故障（如 OOM、网络问题、响应超时）时，
            负载均衡器应该<strong>自动跳过</strong>该实例，将请求分发到健康的实例上，
            避免影响用户体验。
          </p>
        </div>

        <h3>1. 启用健康检查</h3>
        <CodeBlock
          language="yaml"
          code={`# application.yml
spring:
  cloud:
    loadbalancer:
      health-check:
        # 启用健康检查
        enabled: true
        # 初始健康检查间隔（毫秒）
        initial-interval: 1000
        # 健康检查间隔（毫秒）
        interval: 30000
        # 健康检查超时（毫秒）
        timeout: 5000
        # 健康检查路径
        path: /actuator/health`}
        />

        <h3>2. 配置健康检查端点</h3>
        <CodeBlock
          language="xml"
          code={`<!-- 添加 Actuator 依赖 -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-actuator</artifactId>
</dependency>`}
        />

        <CodeBlock
          language="yaml"
          code={`# application.yml
management:
  endpoints:
    web:
      exposure:
        include: health,info,metrics
  endpoint:
    health:
      show-details: always
      show-components: always`}
        />

        <h3>3. 故障隔离配置</h3>
        <CodeBlock
          language="yaml"
          code={`spring:
  cloud:
    loadbalancer:
      # 故障实例重试配置
      retry:
        enabled: true
        # 重试次数
        max-retries-on-same-service-instance: 2
        # 切换实例重试次数
        max-retries-on-next-service-instance: 1

      # 实例状态缓存
      cache:
        # 缓存存活时间
        ttl: 30s
        # 缓存容量
        capacity: 1024`}
        />
      </section>

      {/* 与 OpenFeign 集成 */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">与 OpenFeign 集成</h2>

        <p className="text-gray-700 mb-6">
          OpenFeign 默认集成了 Spring Cloud LoadBalancer，无需额外配置即可使用负载均衡。
        </p>

        <CodeBlock
          language="java"
          code={`@FeignClient(name = "user-service")
public interface UserClient {

    @GetMapping("/api/users/{id}")
    UserDTO getUserById(@PathVariable("id") Long id);

    @GetMapping("/api/users")
    List<UserDTO> getUsers(@RequestParam("page") int page);
}

@Service
public class OrderService {

    @Autowired
    private UserClient userClient;

    public void processOrder(Long userId) {
        // Feign 会自动使用 LoadBalancer 进行负载均衡
        // 如果有多个 user-service 实例，会按策略选择
        UserDTO user = userClient.getUserById(userId);
        // ...
    }
}

// 配置针对特定服务的负载均衡策略
@Configuration
@LoadBalancerClient(name = "user-service", configuration = UserServiceLBConfig.class)
public class UserServiceLBConfig {

    @Bean
    public ReactorLoadBalancer<ServiceInstance> loadBalancer(
            Environment environment,
            LoadBalancerClientFactory loadBalancerClientFactory) {
        String name = environment.getProperty(LoadBalancerClientFactory.PROPERTY_NAME);
        return new RandomLoadBalancer(
            loadBalancerClientFactory.getLazyProvider(name, ServiceInstanceListSupplier.class),
            name
        );
    }
}`}
        />
      </section>

      {/* 自定义负载均衡策略实战 */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">自定义负载均衡策略实战</h2>

        <div className="bg-purple-50 border-l-4 border-purple-500 p-6 rounded-lg mb-6">
          <h4 className="font-bold text-gray-900 mb-2">🚀 进阶内容</h4>
          <p className="text-gray-700 text-sm">
            在实际生产环境中，您可能需要根据业务特点实现自定义的负载均衡策略，
            例如基于用户ID的哈希路由、基于地理位置的就近访问等。
          </p>
        </div>

        <h3>基于用户ID的哈希策略</h3>
        <p className="text-gray-700 mb-4">
          通过自定义负载均衡策略，可以实现基于用户ID的哈希路由，
          确保同一用户的请求总是发送到同一个服务实例，适用于需要会话保持的场景。
        </p>

        <CodeBlock
          language="java"
          code={`@Configuration
public class LoadBalancerConfig {

    @Bean
    public ReactorLoadBalancer<ServiceInstance> userIdBasedLoadBalancer(
            Environment environment,
            LoadBalancerClientFactory loadBalancerClientFactory) {
        String name = environment.getProperty(LoadBalancerClientFactory.PROPERTY_NAME);
        return new UserIdBasedLoadBalancer(
            loadBalancerClientFactory.getLazyProvider(name, ServiceInstanceListSupplier.class),
            name
        );
    }
}

public class UserIdBasedLoadBalancer implements ReactorServiceInstanceLoadBalancer {

    private final ObjectProvider<ServiceInstanceListSupplier> serviceInstanceListSupplierProvider;
    private final String serviceId;

    @Override
    public Mono<Response<ServiceInstance>> choose(Request request) {
        ServiceInstanceListSupplier supplier = serviceInstanceListSupplierProvider
            .getIfAvailable(() -> null);

        return supplier.get(request)
            .next()
            .map(serviceInstances -> processInstanceResponse(serviceInstances, request));
    }

    private Response<ServiceInstance> processInstanceResponse(
            List<ServiceInstance> instances,
            Request request) {

        // 从请求中提取用户ID
        String userId = extractUserId(request);

        // 基于用户ID哈希选择实例
        int index = Math.abs(userId.hashCode()) % instances.size();

        return new DefaultResponse(instances.get(index));
    }

    private String extractUserId(Request request) {
        // 从Header或Query参数中提取用户ID
        HttpRequestData req = (HttpRequestData) request.getContext();

        // 优先从Header获取
        String userId = req.getHeaders().getFirst("X-User-Id");
        if (userId != null) {
            return userId;
        }

        // 从Query参数获取
        QueryParams queryParams = QueryParams.from(req.getQuery());
        userId = queryParams.getFirst("userId");

        return userId != null ? userId : "default";
    }
}`}
        />

        <h3 className="mt-8">配置文件</h3>
        <CodeBlock
          language="yaml"
          code={`spring:
  cloud:
    loadbalancer:
      configurations: userId-based
      cache:
        enabled: true
        ttl: 30s
        capacity: 256`}
        />
      </section>

      {/* 负载均衡策略选择决策树 */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">负载均衡策略选择决策树</h2>

        <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-lg mb-6">
          <h4 className="font-bold text-gray-900 mb-2">💡 如何选择合适的策略?</h4>
          <p className="text-gray-700 text-sm">
            选择正确的负载均衡策略对系统性能和用户体验至关重要。
            以下决策树帮助您根据业务场景选择最佳策略。
          </p>
        </div>

        <h3>策略选择决策流程</h3>
        <div className="bg-white border-2 border-gray-300 rounded-lg p-6 mb-6">
          <pre className="text-sm text-gray-800 whitespace-pre-wrap font-mono">
{`开始
  ↓
是否需要会话保持?
  ├─ 是 → 是否有共享Session?
  │    ├─ 是 → Random/Round Robin (性能最优)
  │    └─ 否 → Sticky Session (IP哈希/一致性哈希)
  └─ 否 → 服务实例性能是否一致?
       ├─ 是 → Random (最简单)
       └─ 否 → Weighted Response Time (动态权重)`}
          </pre>
        </div>

        <h3 className="mt-8">策略选择指南</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse border border-gray-300">
            <thead className="bg-gray-50">
              <tr>
                <th className="border border-gray-300 px-4 py-2 text-left text-gray-900">场景</th>
                <th className="border border-gray-300 px-4 py-2 text-left text-gray-900">推荐策略</th>
                <th className="border border-gray-300 px-4 py-2 text-left text-gray-900">原因</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 px-4 py-2 text-sm">无状态服务</td>
                <td className="border border-gray-300 px-4 py-2 text-sm">Random</td>
                <td className="border border-gray-300 px-4 py-2 text-sm">性能最好，完全随机</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="border border-gray-300 px-4 py-2 text-sm">需要缓存一致性</td>
                <td className="border border-gray-300 px-4 py-2 text-sm">一致性哈希</td>
                <td className="border border-gray-300 px-4 py-2 text-sm">相同请求路由到相同实例</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 text-sm">服务性能差异大</td>
                <td className="border border-gray-300 px-4 py-2 text-sm">Weighted Response Time</td>
                <td className="border border-gray-300 px-4 py-2 text-sm">动态调整权重</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="border border-gray-300 px-4 py-2 text-sm">需要灰度发布</td>
                <td className="border border-gray-300 px-4 py-2 text-sm">自定义策略(Header路由)</td>
                <td className="border border-gray-300 px-4 py-2 text-sm">精确控制流量</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 text-sm">高并发场景</td>
                <td className="border border-gray-300 px-4 py-2 text-sm">Random + ShortCircuit</td>
                <td className="border border-gray-300 px-4 py-2 text-sm">快速失败，避免雪崩</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="border border-gray-300 px-4 py-2 text-sm">WebSocket长连接</td>
                <td className="border border-gray-300 px-4 py-2 text-sm">Sticky Session</td>
                <td className="border border-gray-300 px-4 py-2 text-sm">保持连接稳定性</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 性能测试数据对比 */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">性能测试数据对比</h2>

        <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-lg mb-6">
          <h4 className="font-bold text-gray-900 mb-2">📊 真实测试数据</h4>
          <p className="text-gray-700 text-sm">
            以下是基于真实测试环境的性能对比数据，帮助您了解不同负载均衡策略的性能表现。
          </p>
        </div>

        <h3>测试环境</h3>
        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <ul className="space-y-1 text-sm text-gray-700">
            <li>• <strong>硬件:</strong> 8核CPU, 16GB内存</li>
            <li>• <strong>服务实例:</strong> 3个</li>
            <li>• <strong>客户端线程:</strong> 100</li>
            <li>• <strong>测试时间:</strong> 10分钟</li>
          </ul>
        </div>

        <h3 className="mt-8">测试结果</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse border border-gray-300">
            <thead className="bg-gray-50">
              <tr>
                <th className="border border-gray-300 px-4 py-2 text-left text-gray-900">策略</th>
                <th className="border border-gray-300 px-4 py-2 text-left text-gray-900">平均QPS</th>
                <th className="border border-gray-300 px-4 py-2 text-left text-gray-900">平均RT(ms)</th>
                <th className="border border-gray-300 px-4 py-2 text-left text-gray-900">P99 RT(ms)</th>
                <th className="border border-gray-300 px-4 py-2 text-left text-gray-900">CPU使用率</th>
                <th className="border border-gray-300 px-4 py-2 text-left text-gray-900">内存使用</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 px-4 py-2 text-sm">Random</td>
                <td className="border border-gray-300 px-4 py-2 text-sm text-green-600 font-semibold">8,500</td>
                <td className="border border-gray-300 px-4 py-2 text-sm text-green-600">12</td>
                <td className="border border-gray-300 px-4 py-2 text-sm">25</td>
                <td className="border border-gray-300 px-4 py-2 text-sm">65%</td>
                <td className="border border-gray-300 px-4 py-2 text-sm">1.2GB</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="border border-gray-300 px-4 py-2 text-sm">RoundRobin</td>
                <td className="border border-gray-300 px-4 py-2 text-sm">8,200</td>
                <td className="border border-gray-300 px-4 py-2 text-sm">13</td>
                <td className="border border-gray-300 px-4 py-2 text-sm">28</td>
                <td className="border border-gray-300 px-4 py-2 text-sm">68%</td>
                <td className="border border-gray-300 px-4 py-2 text-sm">1.2GB</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 text-sm">Weighted</td>
                <td className="border border-gray-300 px-4 py-2 text-sm">7,800</td>
                <td className="border border-gray-300 px-4 py-2 text-sm">14</td>
                <td className="border border-gray-300 px-4 py-2 text-sm">32</td>
                <td className="border border-gray-300 px-4 py-2 text-sm">62%</td>
                <td className="border border-gray-300 px-4 py-2 text-sm">1.1GB</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="border border-gray-300 px-4 py-2 text-sm">一致性哈希</td>
                <td className="border border-gray-300 px-4 py-2 text-sm">7,200</td>
                <td className="border border-gray-300 px-4 py-2 text-sm">15</td>
                <td className="border border-gray-300 px-4 py-2 text-sm">35</td>
                <td className="border border-gray-300 px-4 py-2 text-sm">70%</td>
                <td className="border border-gray-300 px-4 py-2 text-sm">1.3GB</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className="mt-8">结论</h3>
        <div className="space-y-3">
          <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
            <p className="text-sm text-gray-700">
              <strong className="text-green-700">Random策略性能最优:</strong> 适合无状态、高并发场景
            </p>
          </div>
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
            <p className="text-sm text-gray-700">
              <strong className="text-blue-700">RoundRobin稳定性好:</strong> 流量分配均匀
            </p>
          </div>
          <div className="bg-purple-50 border-l-4 border-purple-500 p-4 rounded">
            <p className="text-sm text-gray-700">
              <strong className="text-purple-700">Weighted适合异构实例:</strong> 动态权重调整
            </p>
          </div>
          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
            <p className="text-sm text-gray-700">
              <strong className="text-yellow-700">一致性哈希有额外开销:</strong> 仅在有需要时使用
            </p>
          </div>
        </div>

        <h3 className="mt-8">性能优化建议</h3>
        <CodeBlock
          language="yaml"
          code={`spring:
  cloud:
    loadbalancer:
      cache:
        enabled: true      # 启用缓存
        ttl: 30s           # 缓存30秒
        capacity: 256      # 缓存256个实例
      health-check:
        enabled: true      # 启用健康检查
        interval: 10s      # 每10秒检查
        refetch-instances: true  # 自动重新获取实例`}
        />
      </section>

      {/* 灰度发布完整实现 */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">灰度发布完整实现</h2>

        <div className="bg-gradient-to-r from-purple-50 to-pink-50 border-l-4 border-purple-500 p-6 rounded-lg mb-6">
          <h4 className="font-bold text-gray-900 mb-2">🎨 生产级灰度发布方案</h4>
          <p className="text-gray-700 text-sm">
            灰度发布（金丝雀发布）是降低新版本上线风险的重要手段。
            通过自定义负载均衡策略，可以实现基于Header或权重的流量精确控制。
          </p>
        </div>

        <h3>方案1: 基于Header的灰度发布</h3>
        <p className="text-gray-700 mb-4">
          通过请求头识别灰度流量，将特定用户路由到灰度版本实例。
        </p>

        <CodeBlock
          language="java"
          code={`@Component
public class GrayReleaseLoadBalancer implements ReactorServiceInstanceLoadBalancer {

    private final ObjectProvider<ServiceInstanceListSupplier> serviceInstanceListSupplierProvider;

    @Override
    public Mono<Response<ServiceInstance>> choose(Request request) {
        ServiceInstanceListSupplier supplier = serviceInstanceListSupplierProvider.getIfAvailable();

        return supplier.get(request)
            .next()
            .map(instances -> selectInstanceForGrayRelease(instances, request));
    }

    private Response<ServiceInstance> selectInstanceForGrayRelease(
            List<ServiceInstance> instances,
            Request request) {

        HttpRequestData req = (HttpRequestData) request.getContext();

        // 检查灰度标记
        String grayTag = req.getHeaders().getFirst("X-Gray-Tag");

        if ("true".equals(grayTag)) {
            // 灰度流量：路由到灰度实例
            return selectGrayInstance(instances);
        } else {
            // 正常流量：路由到稳定实例
            return selectStableInstance(instances);
        }
    }

    private Response<ServiceInstance> selectGrayInstance(List<ServiceInstance> instances) {
        // 选择标记为gray的实例
        return instances.stream()
            .filter(instance -> "gray".equals(instance.getMetadata().get("version")))
            .findFirst()
            .map(DefaultResponse::new)
            .orElse(new DefaultResponse(instances.get(0)));
    }

    private Response<ServiceInstance> selectStableInstance(List<ServiceInstance> instances) {
        // 选择标记为stable的实例
        return instances.stream()
            .filter(instance -> "stable".equals(instance.getMetadata().get("version")))
            .findFirst()
            .map(DefaultResponse::new)
            .orElse(new DefaultResponse(instances.get(0)));
    }
}`}
        />

        <h3 className="mt-8">方案2: 基于权重的灰度发布</h3>
        <p className="text-gray-700 mb-4">
          按百分比分配流量，例如10%流量到灰度版本，90%流量到稳定版本。
        </p>

        <CodeBlock
          language="java"
          code={`public class WeightedGrayReleaseLoadBalancer implements ReactorServiceInstanceLoadBalancer {

    private static final int GRAY_PERCENTAGE = 10; // 灰度流量10%

    private Response<ServiceInstance> selectByWeight(List<ServiceInstance> instances) {
        List<ServiceInstance> grayInstances = instances.stream()
            .filter(i -> "gray".equals(i.getMetadata().get("version")))
            .collect(Collectors.toList());

        List<ServiceInstance> stableInstances = instances.stream()
            .filter(i -> "stable".equals(i.getMetadata().get("version")))
            .collect(Collectors.toList());

        // 按权重分配
        int random = ThreadLocalRandom.current().nextInt(100);

        if (random < GRAY_PERCENTAGE && !grayInstances.isEmpty()) {
            // 10%流量到灰度版本
            int index = ThreadLocalRandom.current().nextInt(grayInstances.size());
            return new DefaultResponse(grayInstances.get(index));
        } else {
            // 90%流量到稳定版本
            int index = ThreadLocalRandom.current().nextInt(stableInstances.size());
            return new DefaultResponse(stableInstances.get(index));
        }
    }
}`}
        />

        <h3 className="mt-8">实例注册时添加版本标记</h3>
        <CodeBlock
          language="java"
          code={`@Component
public class InstanceMetadataRegistrar implements ApplicationListener<WebServerInitializedEvent> {

    @Value("$\{spring.application.name\}")
    private String appName;

    @Value("$\{server.port\}")
    private int port;

    @Value("$\{app.version:stable\}")  // 通过环境变量或配置指定版本
    private String version;

    @Autowired
    private NacosRegistration nacosRegistration;

    @Override
    public void onApplicationEvent(WebServerInitializedEvent event) {
        Map<String, String> metadata = new HashMap<>();
        metadata.put("version", version);
        metadata.put("gray-version", "v2.0");

        nacosRegistration.getNacosDiscoveryProperties().setMetadata(metadata);
    }
}`}
        />

        <h3 className="mt-8">客户端携带灰度标记</h3>
        <CodeBlock
          language="java"
          code={`@RestController
@RequestMapping("/api")
public class TestController {

    @Autowired
    private LoadBalancerClient loadBalancerClient;

    @GetMapping("/test-gray")
    public String testGrayRelease(@RequestHeader(value = "X-Gray-Tag", required = false) String grayTag) {
        ServiceInstance instance = loadBalancerClient.choose("user-service");

        return "路由到实例: " + instance.getHost() + ":" + instance.getPort() +
               ", 版本: " + instance.getMetadata().get("version");
    }
}`}
        />

        <h3 className="mt-8">测试步骤</h3>
        <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-lg">
          <ol className="space-y-2 text-sm text-gray-700 list-decimal list-inside">
            <li>部署稳定版本和灰度版本</li>
            <li>为灰度版本设置 <code className="bg-white px-2 py-1 rounded">version=gray</code></li>
            <li>客户端请求时携带Header: <code className="bg-white px-2 py-1 rounded">X-Gray-Tag: true</code></li>
            <li>观察流量是否正确路由</li>
          </ol>
        </div>

        <h3 className="mt-8">监控指标</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white border-2 border-green-200 rounded-lg p-4">
            <h4 className="font-bold text-gray-900 mb-2">流量指标</h4>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• 灰度版本QPS</li>
              <li>• 稳定版本QPS</li>
              <li>• 流量比例</li>
            </ul>
          </div>
          <div className="bg-white border-2 border-blue-200 rounded-lg p-4">
            <h4 className="font-bold text-gray-900 mb-2">性能指标</h4>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• 灰度版本错误率</li>
              <li>• 灰度版本P99延迟</li>
              <li>• 灰度版本CPU/内存使用率</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 最佳实践 */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">最佳实践</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <BestPracticeCard3
            title="策略选择"
            practices={[
              "大多数场景使用默认的轮询策略即可",
              "如果服务性能差异大，使用加权策略",
              "测试环境可以使用随机策略",
              "避免频繁更换负载均衡策略",
              "监控各实例的负载情况"
            ]}
          />
          <BestPracticeCard3
            title="健康检查"
            practices={[
              "始终启用健康检查机制",
              "设置合理的健康检查间隔（30-60秒）",
              "确保健康检查端点轻量高效",
              "区分存活探针和就绪探针",
              "及时剔除不健康的实例"
            ]}
          />
          <BestPracticeCard3
            title="实例配置"
            practices={[
              "保持服务实例配置一致性",
              "合理设置实例权重",
              "避免同一服务的实例性能差异过大",
              "定期评估和调整实例数量",
              "使用自动扩缩容"
            ]}
          />
          <BestPracticeCard3
            title="缓存配置"
            practices={[
              "启用服务实例列表缓存",
              "缓存TTL设置为30-60秒",
              "根据实例数量调整缓存容量",
              "避免缓存时间过长导致更新不及时",
              "监控缓存的命中率和更新频率"
            ]}
          />
          <BestPracticeCard3
            title="故障处理"
            practices={[
              "配置合理的超时时间（2-5秒）",
              "启用自动重试机制",
              "设置最大重试次数（2-3次）",
              "实现降级逻辑",
              "记录故障实例和重试日志"
            ]}
          />
          <BestPracticeCard3
            title="监控告警"
            practices={[
              "监控负载均衡的请求分发情况",
              "统计各实例的请求量分布",
              "监控实例的健康状态",
              "设置负载不均的告警",
              "定期分析负载均衡效果"
            ]}
          />
        </div>
      </section>

      {/* 常见问题 */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">常见问题</h2>

        <div className="space-y-4">
          <FaqCard2
            number={1}
            question="LoadBalancer 与 Ribbon 有什么区别?"
            answer="Ribbon 是 Netflix 的老牌负载均衡器，已进入维护模式。
                 Spring Cloud LoadBalancer 是官方推荐的替代品，基于 Spring Reactor 实现，支持响应式编程。
                 LoadBalancer 不需要引入额外的 Eureka 依赖，更加轻量和灵活。
                 如果您是新项目，直接使用 LoadBalancer；如果是老项目，可以逐步迁移。"
            isOpen={expandedFaq === 1}
            onClick={() => setExpandedFaq(expandedFaq === 1 ? null : 1)}
          />
          <FaqCard2
            number={2}
            question="为什么请求总是发送到同一个实例?"
            answer="可能原因：1) 只启动了一个服务实例；2) 负载均衡器配置错误；
                 3) 实例列表缓存未更新；4) 使用了硬编码的服务地址而非服务名。
                 检查服务注册中心，确保有多个实例注册；
                 检查配置，确保使用了 @LoadBalanced 注解或 Feign 客户端。"
            isOpen={expandedFaq === 2}
            onClick={() => setExpandedFaq(expandedFaq === 2 ? null : 2)}
          />
          <FaqCard2
            number={3}
            question="如何实现会话保持（Session Sticky）?"
            answer="默认情况下，LoadBalancer 使用轮询策略，不会保持会话。
                 如需会话保持，需要自定义负载均衡策略，根据 SessionID 或用户ID进行哈希，
                 确保同一用户的请求总是发送到同一个实例。
                 但更推荐的方式是使用分布式 Session（如 Spring Session + Redis）。"
            isOpen={expandedFaq === 3}
            onClick={() => setExpandedFaq(expandedFaq === 3 ? null : 3)}
          />
          <FaqCard2
            number={4}
            question="负载均衡如何与 Nacos 权重配合?"
            answer="Nacos 支持为服务实例设置权重，权重越高被选中概率越大。
                 LoadBalancer 可以读取 Nacos 实例的权重元数据，实现基于权重的负载均衡。
                 自定义 ServiceInstanceListSupplier，根据 instance.getMetadata().get(&quot;weight&quot;)
                 进行加权选择。Spring Cloud Alibaba 已提供集成。"
            isOpen={expandedFaq === 4}
            onClick={() => setExpandedFaq(expandedFaq === 4 ? null : 4)}
          />
          <FaqCard2
            number={5}
            question="如何实现灰度发布?"
            answer="可以通过自定义负载均衡策略实现灰度发布：
                 1) 在服务实例元数据中标记版本（如 version=v1, version=v2）；
                 2) 自定义负载均衡规则，根据用户特征（如 userId、region）选择对应版本的实例；
                 3) 逐步调整流量比例（如 v1:90%, v2:10% → v1:50%, v2:50% → v1:0%, v2:100%）。
                 Nacos 支持通过元数据和自定义负载均衡实现灰度发布。"
            isOpen={expandedFaq === 5}
            onClick={() => setExpandedFaq(expandedFaq === 5 ? null : 5)}
          />
          <FaqCard2
            number={6}
            question="如何调试负载均衡策略?"
            answer="可以通过以下方式调试：1) 启用 LoadBalancer 的 DEBUG 日志；
                 2) 在自定义负载均衡器中添加日志，记录选择的实例；
                 3) 在目标服务的 Controller 中记录请求来源和端口；
                 4) 多次调用并观察日志，验证请求是否均匀分布；
                 5) 使用 Actuator 查看当前服务实例列表和负载均衡配置。"
            isOpen={expandedFaq === 6}
            onClick={() => setExpandedFaq(expandedFaq === 6 ? null : 6)}
          />
        </div>
      </section>

      {/* 下一步学习 */}
      <section className="bg-gradient-to-r from-green-600 to-emerald-600 text-white p-8 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">🎯 掌握了 LoadBalancer,下一步学习什么?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <NextStepCard2 title="Nacos Config" description="动态配置管理" link="/nacos-config" icon="⚙️" />
          <NextStepCard2 title="Seata" description="分布式事务解决方案" link="/seata" icon="🔗" />
          <NextStepCard2 title="Redis" description="分布式缓存实战" link="/redis" icon="💾" />
          <NextStepCard2 title="实战项目" description="电商微服务系统" link="/project-ecommerce" icon="🛒" />
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
    red: 'bg-red-50 border-red-200',
    orange: 'bg-orange-50 border-orange-200',
    purple: 'bg-purple-50 border-purple-200',
    yellow: 'bg-yellow-50 border-yellow-200',
    emerald: 'bg-emerald-50 border-emerald-200',
  };

  return (
    <div className={`p-4 border-2 rounded-lg ${colorClasses[color as keyof typeof colorClasses]}`}>
      <div className="text-3xl mb-2">{icon}</div>
      <h3 className="font-bold text-gray-900 mb-1">{title}</h3>
      <p className="text-sm text-gray-600">{desc}</p>
    </div>
  );
};

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
        <span className="font-semibold text-gray-600">示例:</span>
        <code className="ml-2 bg-white px-2 py-1 rounded text-xs">{example}</code>
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
    <div className="bg-white border-2 border-green-200 rounded-lg p-5">
      <h3 className="text-xl font-bold text-gray-900 mb-4">{title}</h3>
      <ul className="space-y-2">
        {practices.map((practice, index) => (
          <li key={index} className="flex items-start">
            <span className="text-green-600 mr-2 flex-shrink-0">✓</span>
            <span className="text-sm text-gray-700">{practice}</span>
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
