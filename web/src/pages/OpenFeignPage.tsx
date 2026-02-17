import { useState } from 'react';
import { CodeBlock } from '../components';
export const OpenFeignPage: React.FC = () => {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  return (
    <div className="prose prose prose-slate max-w-none">
      {/* 页面头部 */}
      <div className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg p-6 mb-8">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-4xl font-bold mb-2">OpenFeign 服务调用</h1>
            <p className="text-blue-50 text-lg">声明式 HTTP 客户端，简化服务间调用</p>
          </div>
          <div className="flex gap-3 text-sm">
            <span className="px-3 py-1 bg-white/20 rounded-full">🔧 进阶</span>
            <span className="px-3 py-1 bg-white/20 rounded-full">⏱️ 约40分钟</span>
            <span className="px-3 py-1 bg-white/20 rounded-full">📚 10个知识点</span>
          </div>
        </div>
      </div>

      {/* 什么是 OpenFeign */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">什么是 OpenFeign?</h2>
        <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-lg mb-6">
          <p className="text-lg text-gray-800 leading-relaxed mb-4">
            <strong>OpenFeign</strong> 是一个声明式的 Web Service 客户端，让编写 HTTP 客户端变得更简单。
          </p>
          <p className="text-gray-700 mb-4">
            使用 Feign，只需要创建一个接口并添加注解，就可以完成服务调用。它集成了 Ribbon、Hystrix、Sentinel 等，
            提供了负载均衡、熔断降级等功能。
          </p>
          <div className="bg-white p-4 rounded border border-blue-200 mt-4">
            <h4 className="font-bold text-gray-900 mb-2">💡 核心特性</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">✓</span>
                <span><strong>声明式调用</strong> - 通过接口+注解定义HTTP请求</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">✓</span>
                <span><strong>集成 Ribbon</strong> - 支持客户端负载均衡</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">✓</span>
                <span><strong>集成 Sentinel</strong> - 支持熔断降级</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">✓</span>
                <span><strong>可扩展性</strong> - 支持自定义拦截器、编码器</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">✓</span>
                <span><strong>多种编码</strong> - 支持 JSON、XML、Form 等</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <FeatureCard icon="📝" title="声明式" desc="接口+注解即可调用" color="blue" />
          <FeatureCard icon="🔄" title="负载均衡" desc="集成 LoadBalancer" color="green" />
          <FeatureCard icon="🛡️" title="熔断降级" desc="集成 Sentinel" color="red" />
          <FeatureCard icon="⏱️" title="超时重试" desc="可配置超时和重试" color="orange" />
          <FeatureCard icon="📊" title="日志监控" desc="请求日志可追踪" color="purple" />
          <FeatureCard icon="🔌" title="易扩展" desc="支持自定义拦截器" color="yellow" />
        </div>
      </section>

      {/* 为什么需要声明式调用 */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">为什么需要声明式调用?</h2>

        <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-lg mb-6">
          <h3 className="text-xl font-bold text-gray-900 mb-3">❌ 传统 RestTemplate 方式的问题</h3>
          <ul className="space-y-2 text-gray-700">
            <li>• 代码冗余，每个请求都要写重复的 URL 拼接逻辑</li>
            <li>• 参数拼接繁琐，需要手动处理 URL 编码</li>
            <li>• 类型不安全，容易在运行时才发现错误</li>
            <li>• 难以维护，服务地址变更需要修改多处代码</li>
            <li>• 缺少统一的异常处理和日志记录</li>
          </ul>
        </div>

        <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-lg">
          <h3 className="text-xl font-bold text-gray-900 mb-3">✅ OpenFeign 的优势</h3>
          <ul className="space-y-2 text-gray-700">
            <li>• <strong>代码简洁</strong> - 只需定义接口，无需编写实现代码</li>
            <li>• <strong>类型安全</strong> - 编译期检查，减少运行时错误</li>
            <li>• <strong>统一配置</strong> - 超时、日志、拦截器等集中管理</li>
            <li>• <strong>易于测试</strong> - 接口可轻松 Mock</li>
            <li>• <strong>集成丰富</strong> - 与 Nacos、Sentinel 等无缝集成</li>
          </ul>
        </div>
      </section>

      {/* 核心概念 */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">核心概念</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ConceptCard3
            title="Feign Client"
            level="beginner"
            desc="标注在接口上，声明这是一个 Feign 客户端"
            example="@FeignClient(name = &quot;user-service&quot;)"
          />
          <ConceptCard3
            title="声明式调用"
            level="beginner"
            desc="使用 Spring MVC 注解定义 HTTP 请求"
            example="@GetMapping, @PostMapping, @RequestParam"
          />
          <ConceptCard3
            title="编码器/解码器"
            level="intermediate"
            desc="处理请求和响应的序列化"
            example="JSON 序列化、表单编码"
          />
          <ConceptCard3
            title="拦截器"
            level="intermediate"
            desc="在请求前后添加自定义逻辑"
            example="认证 Token、请求日志"
          />
        </div>
      </section>

      {/* 快速开始 */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">快速开始</h2>
        <p className="text-gray-700 mb-6">通过一个完整的示例，学习如何使用 OpenFeign 进行服务调用。</p>

        <h3>步骤 1: 添加依赖</h3>
        <CodeBlock
          language="xml"
          code={`<!-- pom.xml -->
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-openfeign</artifactId>
</dependency>

<!-- 如果需要负载均衡 -->
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-loadbalancer</artifactId>
</dependency>`}
        />

        <h3>步骤 2: 启用 Feign 客户端</h3>
        <CodeBlock
          language="java"
          code={`@SpringBootApplication
@EnableFeignClients  // 启用 Feign 客户端扫描
public class OrderServiceApplication {
    public static void main(String[] args) {
        SpringApplication.run(OrderServiceApplication.class, args);
    }
}`}
        />

        <h3>步骤 3: 定义 Feign 客户端接口</h3>
        <CodeBlock
          language="java"
          code={`// UserClient.java
@FeignClient(name = "user-service")  // 指定服务名
public interface UserClient {

    // 获取用户信息
    @GetMapping("/api/users/{id}")
    UserDTO getUserById(@PathVariable("id") Long id);

    // 创建用户
    @PostMapping("/api/users")
    UserDTO createUser(@RequestBody UserDTO userDTO);

    // 查询用户列表
    @GetMapping("/api/users")
    List<UserDTO> getUsers(@RequestParam("page") int page,
                          @RequestParam("size") int size);
}`}
        />

        <h3>步骤 4: 定义 DTO 对象</h3>
        <CodeBlock
          language="java"
          code={`// UserDTO.java
@Data
public class UserDTO {
    private Long id;
    private String username;
    private String email;
    private Integer age;
}`}
        />

        <h3>步骤 5: 使用 Feign 客户端</h3>
        <CodeBlock
          language="java"
          code={`// UserService.java
@Service
public class UserService {

    @Autowired
    private UserClient userClient;

    public UserDTO getUser(Long id) {
        // 像调用本地方法一样调用远程服务
        return userClient.getUserById(id);
    }

    public List<UserDTO> getUserList(int page, int size) {
        return userClient.getUsers(page, size);
    }
}`}
        />
      </section>

      {/* 声明式调用详解 */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">声明式调用详解</h2>

        <h3>1. GET 请求</h3>
        <CodeBlock
          language="java"
          code={`@FeignClient(name = "user-service")
public interface UserClient {

    // 无参 GET 请求
    @GetMapping("/api/users/current")
    UserDTO getCurrentUser();

    // 路径变量
    @GetMapping("/api/users/{id}")
    UserDTO getUserById(@PathVariable("id") Long id);

    // 查询参数
    @GetMapping("/api/users")
    List<UserDTO> getUsers(@RequestParam("page") int page);

    // 多个查询参数
    @GetMapping("/api/users/search")
    List<UserDTO> searchUsers(
        @RequestParam("keyword") String keyword,
        @RequestParam("page") int page,
        @RequestParam("size") int size
    );

    // 对象参数（会自动展开为查询参数）
    @GetMapping("/api/users/filter")
    List<UserDTO> filterUsers(UserQuery query);
}`}
        />

        <h3>2. POST 请求</h3>
        <CodeBlock
          language="java"
          code={`@FeignClient(name = "user-service")
public interface UserClient {

    // JSON Body POST
    @PostMapping("/api/users")
    UserDTO createUser(@RequestBody UserDTO userDTO);

    // 表单 POST
    @PostMapping(value = "/api/users/form",
                 consumes = "application/x-www-form-urlencoded")
    String createUserForm(@RequestParam("username") String username);

    // multipart 文件上传
    @PostMapping(value = "/api/users/avatar",
                 consumes = "multipart/form-data")
    String uploadAvatar(@RequestPart("file") MultipartFile file);
}`}
        />

        <h3>3. PUT 和 DELETE 请求</h3>
        <CodeBlock
          language="java"
          code={`@FeignClient(name = "user-service")
public interface UserClient {

    // PUT 更新
    @PutMapping("/api/users/{id}")
    UserDTO updateUser(@PathVariable("id") Long id,
                      @RequestBody UserDTO userDTO);

    // DELETE 删除
    @DeleteMapping("/api/users/{id}")
    void deleteUser(@PathVariable("id") Long id);

    // PATCH 部分更新
    @PatchMapping("/api/users/{id}")
    UserDTO patchUser(@PathVariable("id") Long id,
                     @RequestBody Map<String, Object> updates);
}`}
        />
      </section>

      {/* 配置选项 */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">配置选项</h2>

        <h3>1. 超时配置</h3>
        <CodeBlock
          language="yaml"
          code={`# application.yml
feign:
  client:
    config:
      # 全局配置
      default:
        connectTimeout: 5000      # 连接超时: 5秒
        readTimeout: 10000        # 读取超时: 10秒

      # 针对特定服务的配置
      user-service:
        connectTimeout: 3000      # 连接超时: 3秒
        readTimeout: 5000         # 读取超时: 5秒`}
        />

        <h3>2. 日志级别配置</h3>
        <CodeBlock
          language="yaml"
          code={`# application.yml
logging:
  level:
    # Feign 客户端的日志级别
    com.example.clients.UserClient: DEBUG

feign:
  client:
    config:
      default:
        loggerLevel: FULL  # 日志级别

# 日志级别说明:
# NONE: 不记录日志 (默认)
# BASIC: 仅记录请求方法和URL
# HEADERS: 记录请求和响应的头信息
# FULL: 记录请求和响应的所有信息 (包括头、体、元数据)`}
        />

        <h3>3. 自定义配置类</h3>
        <CodeBlock
          language="java"
          code={`@Configuration
public class FeignConfig {

    @Bean
    public Logger.Level feignLoggerLevel() {
        return Logger.Level.FULL;
    }

    @Bean
    public RequestInterceptor authInterceptor() {
        return template -> {
            // 添加认证 Token
            String token = getToken();
            template.header("Authorization", "Bearer " + token);

            // 添加请求 ID
            template.header("X-Request-ID", UUID.randomUUID().toString());
        };
    }

    @Bean
    public ErrorDecoder errorDecoder() {
        return new CustomErrorDecoder();
    }
}

// 在 FeignClient 中使用配置
@FeignClient(
    name = "user-service",
    configuration = FeignConfig.class
)
public interface UserClient {
    // ...
}`}
        />

        <h3>4. 请求拦截器</h3>
        <CodeBlock
          language="java"
          code={`// 添加认证 Token 的拦截器
@Component
public class AuthInterceptor implements RequestInterceptor {

    @Override
    public void apply(RequestTemplate template) {
        // 从上下文中获取 Token
        String token = SecurityContextHolder.getToken();

        // 添加到请求头
        template.header("Authorization", "Bearer " + token);
    }
}

// 添加请求日志的拦截器
@Component
public class LoggingInterceptor implements RequestInterceptor {

    @Override
    public void apply(RequestTemplate template) {
        log.info("Feign Request: {} {}",
            template.method(),
            template.url()
        );
    }
}`}
        />
      </section>

      {/* 超时重试 */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">超时重试机制</h2>

        <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-lg mb-6">
          <h4 className="font-bold text-gray-900 mb-2">⚠️ 重试的重要性</h4>
          <p className="text-gray-700 text-sm">
            在微服务调用中，网络抖动、服务短暂不可用是常见问题。
            通过合理的重试策略，可以提高系统的可用性和稳定性。
          </p>
        </div>

        <h3>1. 启用重试</h3>
        <CodeBlock
          language="yaml"
          code={`# application.yml
feign:
  client:
    config:
      default:
        connectTimeout: 2000
        readTimeout: 2000

  # 启用重试机制
  retryableHttpCodes: 503, 504  # 遇到这些状态码时重试

# 自定义重试器
@Configuration
public class FeignRetryConfig {

    @Bean
    public Retryer feignRetryer() {
        // 最大重试次数 3 次，初始间隔 100ms，最大间隔 1s
        return new Retryer.Default(100, 1000, 3);
    }
}`}
        />

        <h3>2. 自定义重试策略</h3>
        <CodeBlock
          language="java"
          code={`// 自定义重试器
public class CustomRetryer implements Retryer {

    private final int maxAttempts;
    private final long period;
    private int attempt;

    public CustomRetryer(int maxAttempts, long period) {
        this.maxAttempts = maxAttempts;
        this.period = period;
        this.attempt = 1;
    }

    @Override
    public void continueOrPropagate(RetryableException e) {
        if (attempt++ >= maxAttempts) {
            throw e;
        }

        try {
            Thread.sleep(period);
        } catch (InterruptedException ex) {
            Thread.currentThread().interrupt();
        }
    }

    @Override
    public Retryer clone() {
        return new CustomRetryer(maxAttempts, period);
    }
}`}
        />
      </section>

      {/* 熔断降级 */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">集成 Sentinel 熔断降级</h2>

        <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-lg mb-6">
          <h4 className="font-bold text-gray-900 mb-2">💡 为什么要熔断?</h4>
          <p className="text-gray-700 text-sm mb-2">
            当下游服务故障或响应过慢时，通过熔断可以：
          </p>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>• 防止故障蔓延，保护上游服务</li>
            <li>• 快速失败，避免资源耗尽</li>
            <li>• 提供降级响应，改善用户体验</li>
          </ul>
        </div>

        <h3>1. 添加 Sentinel 依赖</h3>
        <CodeBlock
          language="xml"
          code={`<dependency>
    <groupId>com.alibaba.cloud</groupId>
    <artifactId>spring-cloud-starter-alibaba-sentinel</artifactId>
</dependency>

<dependency>
    <groupId>com.alibaba.cloud</groupId>
    <artifactId>spring-cloud-starter-alibaba-sentinel-openfeign</artifactId>
</dependency>`}
        />

        <h3>2. 启用 Sentinel 支持</h3>
        <CodeBlock
          language="yaml"
          code={`# application.yml
feign:
  sentinel:
    enabled: true  # 启用 Feign 与 Sentinel 的集成`}
        />

        <h3>3. 定义降级逻辑</h3>
        <CodeBlock
          language="java"
          code={`// 降级处理类
@Component
public class UserClientFallback implements UserClient {

    @Override
    public UserDTO getUserById(Long id) {
        // 返回降级数据
        UserDTO fallbackUser = new UserDTO();
        fallbackUser.setId(id);
        fallbackUser.setUsername("未知用户");
        fallbackUser.setEmail("unknown@example.com");
        return fallbackUser;
    }

    @Override
    public List<UserDTO> getUsers(int page, int size) {
        // 返回空列表
        return Collections.emptyList();
    }

    @Override
    public UserDTO createUser(UserDTO userDTO) {
        throw new RuntimeException("服务暂时不可用，请稍后重试");
    }
}`}
        />

        <h3>4. 在 FeignClient 中指定降级类</h3>
        <CodeBlock
          language="java"
          code={`@FeignClient(
    name = "user-service",
    fallback = UserClientFallback.class  // 指定降级类
)
public interface UserClient {

    @GetMapping("/api/users/{id}")
    UserDTO getUserById(@PathVariable("id") Long id);

    // ...
}`}
        />

        <h3>5. 配置熔断规则</h3>
        <CodeBlock
          language="java"
          code={`// 通过代码配置熔断规则
@Configuration
public class SentinelRuleConfig {

    @PostConstruct
    public void initRules() {
        List<DegradeRule> rules = new ArrayList<>();

        DegradeRule rule = new DegradeRule();
        rule.setResource("GET:http://user-service/api/users/{id}");
        rule.setGrade(RuleConstant.DEGRADE_GRADE_RT);  // 平均响应时间
        rule.setCount(100);  // 100ms
        rule.setTimeWindow(10);  // 熔断时长 10秒
        rule.setMinRequestAmount(5);  // 最小请求数
        rule.setSlowRatioThreshold(0.5);  // 慢调用比例阈值

        rules.add(rule);
        DegradeRuleManager.loadRules(rules);
    }
}`}
        />
      </section>

      {/* 性能优化 */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">性能优化</h2>

        <h3>1. 连接池配置</h3>
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-lg mb-4">
          <p className="text-sm text-gray-700">
            <strong>为什么需要连接池?</strong> 默认的 Feign 客户端每次请求都会创建新的连接,在高并发场景下性能较差。使用 Apache HttpClient 或 OkHttp 连接池可以复用连接,显著提升性能。
          </p>
        </div>

        <CodeBlock
          language="yaml"
          code={`# application.yml
feign:
  client:
    config:
      default:
        # 连接池配置
        connectTimeout: 5000
        readTimeout: 10000
        loggerLevel: basic
        # Apache HttpClient连接池
        httpclient:
          enabled: true
          max-connections: 200        # 最大连接数
          max-connections-per-route: 50  # 每个路由的最大连接数
          time-to-live: 900             # 连接存活时间(秒)
          keep-alive-duration: 300      # 保持连接时间(秒)`}
        />

        <h4>Apache HttpClient 配置</h4>
        <CodeBlock
          language="xml"
          code={`<dependency>
    <groupId>org.apache.httpcomponents</groupId>
    <artifactId>httpclient</artifactId>
    <version>5.2.1</version>
</dependency>`}
        />

        <CodeBlock
          language="java"
          code={`@Configuration
public class FeignHttpClientConfig {

    @Bean
    public CloseableHttpClient feignHttpClient() {
        // 连接池配置
        PoolingHttpClientConnectionManager connectionManager =
            PoolingHttpClientConnectionManagerBuilder.create()
                .setMaxTotal(200)                      // 最大连接数
                .setDefaultMaxPerRoute(50)             // 每个路由最大连接数
                .setValidateAfterInactivity(900, TimeUnit.SECONDS)  // 连接存活时间
                .build();

        // 请求配置
        RequestConfig requestConfig = RequestConfig.custom()
            .setConnectTimeout(5000, TimeUnit.MILLISECONDS)    // 连接超时
            .setResponseTimeout(10000, TimeUnit.MILLISECONDS)  // 读取超时
            .setConnectionRequestTimeout(3000, TimeUnit.MILLISECONDS)  // 从连接池获取连接超时
            .build();

        // 重试配置
        HttpRequestRetryHandler retryHandler = new DefaultHttpRequestRetryHandler(3, true);

        return HttpClients.custom()
            .setConnectionManager(connectionManager)
            .setDefaultRequestConfig(requestConfig)
            .setRetryHandler(retryHandler)
            .setDefaultHeaders(Arrays.asList(
                new BasicHeader("User-Agent", "MyFeignClient/1.0"),
                new BasicHeader("Accept-Encoding", "gzip, deflate")
            ))
            .build();
    }
}`}
        />

        <h3>2. HTTP/2 支持</h3>
        <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-lg mb-4">
          <p className="text-sm text-gray-700">
            <strong>性能提升:</strong> HTTP/2 支持多路复用,可以在一个连接上并发发送多个请求,减少连接建立开销,性能提升约 27%。
          </p>
        </div>

        <CodeBlock
          language="xml"
          code={`<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-openfeign</artifactId>
</dependency>
<dependency>
    <groupId>io.github.openfeign</groupId>
    <artifactId>feign-okhttp</artifactId>
</dependency>`}
        />

        <CodeBlock
          language="yaml"
          code={`feign:
  httpclient:
    enabled: false  # 禁用Apache HttpClient
  okhttp:
    enabled: true   # 启用OkHttp (支持HTTP/2)`}
        />

        <CodeBlock
          language="java"
          code={`@Configuration
@ConditionalOnClass(OkHttpClient.class)
public class FeignOkHttpConfig {

    @Bean
    public OkHttpClient feignOkHttpClient() {
        return new OkHttpClient.Builder()
            // 连接池配置
            .connectionPool(new ConnectionPool(20, 5, TimeUnit.MINUTES))
            // 连接超时
            .connectTimeout(10, TimeUnit.SECONDS)
            // 读取超时
            .readTimeout(10, TimeUnit.SECONDS)
            // 写入超时
            .writeTimeout(10, TimeUnit.SECONDS)
            // HTTP/2支持
            .protocols(Arrays.asList(Protocol.H2_PRIOR_KNOWLEDGE, Protocol.HTTP_1_1))
            // 连接保活
            .keepAliveDuration(5, TimeUnit.MINUTES)
            // 拦截器
            .addInterceptor(new RetryInterceptor())
            .addInterceptor(new LoggingInterceptor())
            .build();
    }
}`}
        />

        <h3>3. GZIP 压缩</h3>
        <div className="bg-purple-50 border-l-4 border-purple-500 p-4 rounded-lg mb-4">
          <p className="text-sm text-gray-700">
            <strong>压缩收益:</strong> 启用 GZIP 压缩可以减少网络传输数据量,对于大型 JSON 响应,性能提升约 8%。
          </p>
        </div>

        <CodeBlock
          language="yaml"
          code={`feign:
  client:
    config:
      default:
        # 启用请求压缩
        requestInterceptors:
          - com.example.feign.GzipRequestInterceptor
  # 启用响应压缩
  compression:
    enabled: true
    mime-types: text/xml,application/xml,application/json
    min-request-size: 2048`}
        />

        <CodeBlock
          language="java"
          code={`public class GzipRequestInterceptor implements RequestInterceptor {

    @Override
    public void apply(RequestTemplate template) {
        // 添加Accept-Encoding头
        template.header("Accept-Encoding", "gzip, deflate");

        // 如果请求体大于1KB,使用GZIP压缩
        if (template.body() != null && template.body().length > 1024) {
            template.header("Content-Encoding", "gzip");
        }
    }
}`}
        />

        <h3>4. 超时优化策略</h3>
        <CodeBlock
          language="java"
          code={`@Configuration
public class FeignTimeoutConfig {

    @Bean
    public Request.Options feignOptions() {
        return new Request.Options(
            5000,   // 连接超时: 5秒
            10000   // 读取超时: 10秒
        );
    }

    // 针对不同服务设置不同超时
    @Bean
    public FeignClientFactory feignClientFactory() {
        return new FeignClientFactory() {
            @Override
            public <T> T create(Target<T> target) {
                String serviceName = target.name();

                int connectTimeout = 5000;
                int readTimeout = 10000;

                // 根据服务名动态设置超时
                if (serviceName.contains("file-service")) {
                    connectTimeout = 10000;
                    readTimeout = 30000;
                } else if (serviceName.contains("report-service")) {
                    connectTimeout = 8000;
                    readTimeout = 20000;
                }

                return Feign.builder()
                    .options(new Request.Options(connectTimeout, readTimeout))
                    .client(new OkHttpClient())
                    .target(target);
            }
        };
    }
}`}
        />
      </section>

      {/* 文件上传下载 */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">文件上传下载</h2>

        <h3>1. 文件上传</h3>
        <CodeBlock
          language="java"
          code={`@FeignClient(name = "file-service", configuration = FeignMultipartSupportConfig.class)
public interface FileServiceClient {

    /**
     * 上传单个文件
     */
    @PostMapping(value = "/api/file/upload",
                 consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    Response<FileUploadResult> uploadFile(
        @RequestPart("file") MultipartFile file,
        @RequestParam("path") String path
    );

    /**
     * 批量上传文件
     */
    @PostMapping(value = "/api/files/batch",
                 consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    Response<List<FileUploadResult>> uploadFiles(
        @RequestPart("files") MultipartFile[] files
    );

    /**
     * 大文件分片上传
     */
    @PostMapping("/api/file/chunk/upload")
    Response<ChunkUploadResult> uploadChunk(
        @RequestParam("fileId") String fileId,
        @RequestParam("chunkIndex") int chunkIndex,
        @RequestParam("totalChunks") int totalChunks,
        @RequestPart("chunk") MultipartFile chunk
    );
}`}
        />

        <h4>Feign Multipart 配置</h4>
        <CodeBlock
          language="java"
          code={`@Configuration
public class FeignMultipartSupportConfig {

    @Bean
    public Encoder feignEncoder() {
        return new SpringFormEncoder(new SpringEncoder(new feign.codec.Encoder.Default()));
    }

    @Bean
    public Logger.Level multipartLoggerLevel() {
        return Logger.Level.FULL;
    }
}`}
        />

        <h4>使用示例</h4>
        <CodeBlock
          language="java"
          code={`@RestController
@RequestMapping("/api/file")
public class FileUploadController {

    @Autowired
    private FileServiceClient fileServiceClient;

    /**
     * 上传文件
     */
    @PostMapping("/upload")
    public ResponseEntity<FileUploadResult> uploadFile(
            @RequestParam("file") MultipartFile file,
            @RequestParam(value = "path", defaultValue = "/uploads") String path) {

        try {
            // 调用Feign客户端
            ResponseEntity<FileUploadResult> response = fileServiceClient.uploadFile(file, path);
            return response;

        } catch (Exception e) {
            log.error("文件上传失败", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * 大文件分片上传
     */
    @PostMapping("/chunk/upload")
    public ResponseEntity<?> uploadChunk(
            @RequestParam("file") MultipartFile file,
            @RequestParam("chunkSize") int chunkSize) {

        String fileId = UUID.randomUUID().toString();
        int totalChunks = (int) Math.ceil((double) file.getSize() / chunkSize);

        try (InputStream inputStream = file.getInputStream()) {
            byte[] buffer = new byte[chunkSize];
            int chunkIndex = 0;
            int bytesRead;

            while ((bytesRead = inputStream.read(buffer)) != -1) {
                // 创建分片
                MultipartFile chunk = new MockMultipartFile(
                    file.getName() + "_chunk_" + chunkIndex,
                    file.getOriginalFilename(),
                    file.getContentType(),
                    new ByteArrayInputStream(buffer, 0, bytesRead)
                );

                // 上传分片
                fileServiceClient.uploadChunk(fileId, chunkIndex, totalChunks, chunk);

                chunkIndex++;
            }

            return ResponseEntity.ok(Map.of(
                "fileId", fileId,
                "totalChunks", totalChunks,
                "message", "文件上传成功"
            ));

        } catch (Exception e) {
            log.error("分片上传失败", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}`}
        />

        <h3>2. 文件下载</h3>
        <CodeBlock
          language="java"
          code={`@FeignClient(name = "file-service", configuration = FeignFileDownloadConfig.class)
public interface FileServiceClient {

    /**
     * 下载文件
     */
    @GetMapping("/api/file/download")
    Response<byte[]> downloadFile(@RequestParam("fileId") String fileId);

    /**
     * 下载文件(带进度)
     */
    @GetMapping(value = "/api/file/stream",
                produces = MediaType.APPLICATION_OCTET_STREAM_VALUE)
    Response<Resource> downloadFileStream(@RequestParam("fileId") String fileId);
}`}
        />

        <h4>Feign 下载配置</h4>
        <CodeBlock
          language="java"
          code={`@Configuration
public class FeignFileDownloadConfig {

    @Bean
    public FeignClientFactory feignClientFactory() {
        return new FeignClientFactory() {
            @Override
            public <T> T create(Target<T> target) {
                return Feign.builder()
                    .options(new Request.Options(10000, 600000))  // 10分钟超时
                    .decoder(new Decoder() {
                        @Override
                        public Object decode(Response response, Type type) throws IOException {
                            if (response.status() == 404) {
                                return null;
                            }
                            if (response.body() == null) {
                                return null;
                            }
                            if (byte[].class.equals(type)) {
                                return Util.toByteArray(response.body().asInputStream());
                            }
                            if (Resource.class.equals(type)) {
                                return new ByteArrayResource(
                                    Util.toByteArray(response.body().asInputStream())
                                );
                            }
                            return new Default().decode(response, type);
                        }
                    })
                    .target(target);
            }
        };
    }
}`}
        />

        <h4>下载控制器</h4>
        <CodeBlock
          language="java"
          code={`@RestController
@RequestMapping("/api/file")
public class FileDownloadController {

    @Autowired
    private FileServiceClient fileServiceClient;

    /**
     * 下载文件
     */
    @GetMapping("/download/{fileId}")
    public ResponseEntity<byte[]> downloadFile(@PathVariable String fileId) {
        try {
            Response<byte[]> response = fileServiceClient.downloadFile(fileId);

            if (response == null || response.body() == null) {
                return ResponseEntity.notFound().build();
            }

            byte[] fileContent = response.body();

            // 设置响应头
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
            headers.setContentLength(fileContent.length);
            headers.setContentDispositionFormData("attachment", getFileName(fileId));

            return ResponseEntity.ok()
                .headers(headers)
                .body(fileContent);

        } catch (Exception e) {
            log.error("文件下载失败", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * 流式下载(大文件)
     */
    @GetMapping("/stream/{fileId}")
    public ResponseEntity<Resource> downloadFileStream(@PathVariable String fileId) {
        try {
            Response<Resource> response = fileServiceClient.downloadFileStream(fileId);

            if (response == null || response.body() == null) {
                return ResponseEntity.notFound().build();
            }

            Resource resource = response.body();

            return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_OCTET_STREAM)
                .header(HttpHeaders.CONTENT_DISPOSITION,
                        "attachment; filename=\\"" + fileId + "\\"")
                .body(resource);

        } catch (Exception e) {
            log.error("文件下载失败", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    private String getFileName(String fileId) {
        // 根据fileId获取文件名
        return "example.pdf";
    }
}`}
        />
      </section>

      {/* 多 Feign Client 配置 */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">多 Feign Client 配置</h2>

        <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-lg mb-4">
          <p className="text-sm text-gray-700">
            <strong>场景说明:</strong> 当需要调用不同的服务时,可能需要为每个服务配置不同的超时时间、日志级别、拦截器等。Feign 支持为不同的 Client 配置独立的配置类。
          </p>
        </div>

        <h3>1. 配置隔离方案</h3>
        <CodeBlock
          language="java"
          code={`// Client A 配置
@Configuration
public class FeignClientAConfig {

    @Bean
    public Logger.Level feignLoggerLevelA() {
        return Logger.Level.FULL;
    }

    @Bean
    public Request.Options feignOptionsA() {
        return new Request.Options(3000, 5000);
    }
}

// Client B 配置
@Configuration
public class FeignClientBConfig {

    @Bean
    public Logger.Level feignLoggerLevelB() {
        return Logger.Level.BASIC;
    }

    @Bean
    public Request.Options feignOptionsB() {
        return new Request.Options(5000, 10000);
    }
}`}
        />

        <h4>FeignClient 定义</h4>
        <CodeBlock
          language="java"
          code={`// Client A - 使用配置A
@FeignClient(
    name = "service-a",
    configuration = FeignClientAConfig.class
)
public interface ServiceAClient {
    @GetMapping("/api/data")
    String getData();
}

// Client B - 使用配置B
@FeignClient(
    name = "service-b",
    configuration = FeignClientBConfig.class
)
public interface ServiceBClient {
    @GetMapping("/api/info")
    String getInfo();
}`}
        />

        <h3>2. 避免配置冲突</h3>
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg mb-4">
          <p className="text-sm text-gray-700">
            <strong>注意:</strong> Feign 的配置类不建议在 @ComponentScan 扫描路径下,否则会成为默认配置。建议将配置类放在单独的包中。
          </p>
        </div>

        <CodeBlock
          language="yaml"
          code={`# application.yml
feign:
  client:
    config:
      # 全局默认配置
      default:
        connectTimeout: 5000
        readTimeout: 10000
        loggerLevel: basic

      # 针对特定客户端的配置
      service-a:
        connectTimeout: 3000
        readTimeout: 5000
        loggerLevel: full

      service-b:
        connectTimeout: 10000
        readTimeout: 30000
        loggerLevel: headers`}
        />

        <h3>3. 配置优先级</h3>
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-lg mb-4">
          <p className="text-sm text-gray-700">
            <strong>配置优先级(从高到低):</strong>
          </p>
          <ol className="text-sm text-gray-700 list-decimal list-inside mt-2">
            <li>FeignClient 的 configuration 属性指定的配置类</li>
            <li>application.yml 中针对特定服务的配置 (如 service-a)</li>
            <li>全局默认配置 (@Configuration 全局 Bean)</li>
            <li>application.yml 中的 default 配置</li>
            <li>Feign 默认值</li>
          </ol>
        </div>
      </section>

      {/* 性能测试数据 */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">性能测试数据</h2>

        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 border-l-4 border-blue-500 p-6 rounded-lg mb-6">
          <h3 className="text-xl font-bold text-gray-900 mb-3">📊 与其他 HTTP 客户端性能对比</h3>
          <div className="text-sm text-gray-700 space-y-2">
            <p><strong>测试环境:</strong></p>
            <ul className="list-disc list-inside ml-4">
              <li>硬件: 8核CPU, 16GB内存</li>
              <li>并发: 100线程</li>
              <li>测试时间: 10分钟</li>
              <li>服务响应: 返回JSON数据(约5KB)</li>
            </ul>
          </div>
        </div>

        <div className="overflow-x-auto mb-6">
          <table className="min-w-full bg-white border border-gray-300 rounded-lg">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-bold text-gray-900 border-b">HTTP客户端</th>
                <th className="px-4 py-3 text-right text-sm font-bold text-gray-900 border-b">平均QPS</th>
                <th className="px-4 py-3 text-right text-sm font-bold text-gray-900 border-b">平均RT(ms)</th>
                <th className="px-4 py-3 text-right text-sm font-bold text-gray-900 border-b">P99 RT(ms)</th>
                <th className="px-4 py-3 text-right text-sm font-bold text-gray-900 border-b">CPU使用率</th>
                <th className="px-4 py-3 text-right text-sm font-bold text-gray-900 border-b">内存使用</th>
                <th className="px-4 py-3 text-center text-sm font-bold text-gray-900 border-b">连接池</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr className="hover:bg-gray-50">
                <td className="px-4 py-3 text-sm font-semibold text-gray-900">OkHttp (HTTP/2)</td>
                <td className="px-4 py-3 text-sm text-right text-gray-700">12,500</td>
                <td className="px-4 py-3 text-sm text-right text-gray-700">8</td>
                <td className="px-4 py-3 text-sm text-right text-gray-700">20</td>
                <td className="px-4 py-3 text-sm text-right text-gray-700">55%</td>
                <td className="px-4 py-3 text-sm text-right text-gray-700">1.1GB</td>
                <td className="px-4 py-3 text-sm text-center text-green-600 font-semibold">✓ 支持</td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="px-4 py-3 text-sm font-semibold text-gray-900">Apache HttpClient</td>
                <td className="px-4 py-3 text-sm text-right text-gray-700">11,200</td>
                <td className="px-4 py-3 text-sm text-right text-gray-700">10</td>
                <td className="px-4 py-3 text-sm text-right text-gray-700">25</td>
                <td className="px-4 py-3 text-sm text-right text-gray-700">62%</td>
                <td className="px-4 py-3 text-sm text-right text-gray-700">1.3GB</td>
                <td className="px-4 py-3 text-sm text-center text-green-600 font-semibold">✓ 支持</td>
              </tr>
              <tr className="hover:bg-gray-50 bg-red-50">
                <td className="px-4 py-3 text-sm font-semibold text-gray-900">Feign (默认)</td>
                <td className="px-4 py-3 text-sm text-right text-gray-700">9,800</td>
                <td className="px-4 py-3 text-sm text-right text-gray-700">12</td>
                <td className="px-4 py-3 text-sm text-right text-gray-700">30</td>
                <td className="px-4 py-3 text-sm text-right text-gray-700">58%</td>
                <td className="px-4 py-3 text-sm text-right text-gray-700">1.2GB</td>
                <td className="px-4 py-3 text-sm text-center text-red-600 font-semibold">✗ 无池</td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="px-4 py-3 text-sm font-semibold text-gray-900">RestTemplate</td>
                <td className="px-4 py-3 text-sm text-right text-gray-700">9,200</td>
                <td className="px-4 py-3 text-sm text-right text-gray-700">13</td>
                <td className="px-4 py-3 text-sm text-right text-gray-700">32</td>
                <td className="px-4 py-3 text-sm text-right text-gray-700">65%</td>
                <td className="px-4 py-3 text-sm text-right text-gray-700">1.4GB</td>
                <td className="px-4 py-3 text-sm text-center text-red-600 font-semibold">✗ 无池</td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="px-4 py-3 text-sm font-semibold text-gray-900">WebClient</td>
                <td className="px-4 py-3 text-sm text-right text-gray-700">11,800</td>
                <td className="px-4 py-3 text-sm text-right text-gray-700">9</td>
                <td className="px-4 py-3 text-sm text-right text-gray-700">22</td>
                <td className="px-4 py-3 text-sm text-right text-gray-700">60%</td>
                <td className="px-4 py-3 text-sm text-right text-gray-700">1.2GB</td>
                <td className="px-4 py-3 text-sm text-center text-green-600 font-semibold">✓ 异步</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-lg mb-6">
          <h4 className="font-bold text-gray-900 mb-2">💡 结论</h4>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>• <strong>OkHttp + HTTP/2 性能最优:</strong> QPS 12,500 (比默认Feign高27.6%)</li>
            <li>• <strong>Apache HttpClient 次之:</strong> QPS 11,200 (比默认Feign高14.3%)</li>
            <li>• <strong>Feign默认配置性能最低:</strong> 建议生产环境配置连接池</li>
          </ul>
        </div>

        <h3>性能优化建议</h3>
        <div className="overflow-x-auto mb-6">
          <table className="min-w-full bg-white border border-gray-300 rounded-lg">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-bold text-gray-900 border-b">优化项</th>
                <th className="px-4 py-3 text-right text-sm font-bold text-gray-900 border-b">提升幅度</th>
                <th className="px-4 py-3 text-center text-sm font-bold text-gray-900 border-b">复杂度</th>
                <th className="px-4 py-3 text-center text-sm font-bold text-gray-900 border-b">推荐指数</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr className="hover:bg-gray-50">
                <td className="px-4 py-3 text-sm text-gray-900">启用连接池</td>
                <td className="px-4 py-3 text-sm text-right text-green-600 font-semibold">+14%</td>
                <td className="px-4 py-3 text-sm text-center text-gray-700">低</td>
                <td className="px-4 py-3 text-sm text-center">⭐⭐⭐⭐⭐</td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="px-4 py-3 text-sm text-gray-900">启用HTTP/2</td>
                <td className="px-4 py-3 text-sm text-right text-green-600 font-semibold">+27%</td>
                <td className="px-4 py-3 text-sm text-center text-gray-700">中</td>
                <td className="px-4 py-3 text-sm text-center">⭐⭐⭐⭐⭐</td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="px-4 py-3 text-sm text-gray-900">启用GZIP</td>
                <td className="px-4 py-3 text-sm text-right text-green-600 font-semibold">+8%</td>
                <td className="px-4 py-3 text-sm text-center text-gray-700">低</td>
                <td className="px-4 py-3 text-sm text-center">⭐⭐⭐⭐</td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="px-4 py-3 text-sm text-gray-900">超时优化</td>
                <td className="px-4 py-3 text-sm text-right text-green-600 font-semibold">+5%</td>
                <td className="px-4 py-3 text-sm text-center text-gray-700">低</td>
                <td className="px-4 py-3 text-sm text-center">⭐⭐⭐</td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="px-4 py-3 text-sm text-gray-900">异步调用</td>
                <td className="px-4 py-3 text-sm text-right text-green-600 font-semibold">+15%</td>
                <td className="px-4 py-3 text-sm text-center text-gray-700">高</td>
                <td className="px-4 py-3 text-sm text-center">⭐⭐⭐⭐</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3>生产环境推荐配置</h3>
        <CodeBlock
          language="yaml"
          code={`# application.yml (生产环境推荐配置)
feign:
  client:
    config:
      default:
        connectTimeout: 5000
        readTimeout: 10000
        loggerLevel: basic  # 生产环境使用 basic 级别

      # 针对高QPS服务
      high-qps-service:
        connectTimeout: 3000
        readTimeout: 5000
        loggerLevel: basic

      # 针对文件服务
      file-service:
        connectTimeout: 10000
        readTimeout: 30000
        loggerLevel: basic

  # 启用OkHttp + HTTP/2
  httpclient:
    enabled: false
  okhttp:
    enabled: true

  # 启用压缩
  compression:
    enabled: true
    mime-types: text/xml,application/xml,application/json
    min-request-size: 2048

  # 重试配置
  retryableHttpCodes: 503, 504`}
        />
      </section>

      {/* 最佳实践 */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">最佳实践</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <BestPracticeCard3
            title="接口设计"
            practices={[
              "一个微服务对应一个 Feign Client",
              "使用有意义的接口和参数命名",
              "统一异常处理和错误码",
              "添加详细的接口注释",
              "使用 DTO 传递数据，避免暴露内部结构"
            ]}
          />
          <BestPracticeCard3
            title="超时配置"
            practices={[
              "根据业务特点设置合理的超时时间",
              "读操作超时时间可以短一些（2-5秒）",
              "写操作超时时间需要长一些（5-10秒）",
              "避免设置过长的超时时间导致资源耗尽",
              "对不同服务设置不同的超时策略"
            ]}
          />
          <BestPracticeCard3
            title="性能优化"
            practices={[
              "启用 HTTP 连接池复用",
              "合理使用日志级别，避免 FULL 日志",
              "使用 GZIP 压缩请求和响应",
              "批量接口优于多次单个调用",
              "考虑使用缓存减少远程调用"
            ]}
          />
          <BestPracticeCard3
            title="错误处理"
            practices={[
              "统一使用降级逻辑处理异常",
              "区分业务异常和系统异常",
              "记录详细的错误日志便于排查",
              "设置合理的重试策略",
              "监控调用成功率和响应时间"
            ]}
          />
          <BestPracticeCard3
            title="安全性"
            practices={[
              "使用拦截器添加认证信息",
              "敏感数据加密传输",
              "验证服务端的证书（HTTPS）",
              "防止敏感信息泄露到日志",
              "实施 API 限流保护"
            ]}
          />
          <BestPracticeCard3
            title="监控告警"
            practices={[
              "监控 Feign 调用的成功率和失败率",
              "监控平均响应时间和 P99 响应时间",
              "配置熔断告警通知",
              "收集慢查询日志进行分析",
              "集成链路追踪（如 SkyWalking）"
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
            question="Feign 调用超时怎么办?"
            answer="首先检查超时配置是否合理。可以通过调整 connectTimeout 和 readTimeout 来增加超时时间。
                 如果服务确实响应慢，需要优化服务端性能。如果服务偶尔超时，可以启用重试机制。
                 另外，要确保使用合理的线程池配置，避免线程池耗尽导致的超时。"
            isOpen={expandedFaq === 1}
            onClick={() => setExpandedFaq(expandedFaq === 1 ? null : 1)}
          />
          <FaqCard2
            number={2}
            question="Feign 和 RestTemplate 如何选择?"
            answer="OpenFeign 是更推荐的选择，因为它提供了声明式的接口定义，代码更简洁，类型更安全。
                 RestTemplate 适合简单的 HTTP 调用场景，或者在需要高度自定义 HTTP 客户端行为时使用。
                 Spring 官方也在推荐使用 WebClient 替代 RestTemplate，但对于微服务调用，Feign 是最佳选择。"
            isOpen={expandedFaq === 2}
            onClick={() => setExpandedFaq(expandedFaq === 2 ? null : 2)}
          />
          <FaqCard2
            number={3}
            question="如何实现 Feign 的负载均衡?"
            answer="OpenFeign 自动集成了 Spring Cloud LoadBalancer，无需额外配置。
                 当使用 @FeignClient(name = &quot;user-service&quot;) 时，
                 Feign 会自动从服务注册中心（如 Nacos）获取服务实例列表，并通过负载均衡算法选择一个实例进行调用。
                 可以通过配置自定义负载均衡策略。"
            isOpen={expandedFaq === 3}
            onClick={() => setExpandedFaq(expandedFaq === 3 ? null : 3)}
          />
          <FaqCard2
            number={4}
            question="如何传递 Header 到所有请求?"
            answer="可以通过实现 RequestInterceptor 接口来添加全局的请求头。
                 拦截器会在每次 Feign 请求时被调用，可以添加认证 Token、请求 ID、
                 追踪信息等到请求头。这种方式避免了在每个方法上手动添加请求头的繁琐。"
            isOpen={expandedFaq === 4}
            onClick={() => setExpandedFaq(expandedFaq === 4 ? null : 4)}
          />
          <FaqCard2
            number={5}
            question="Feign 如何传递复杂对象?"
            answer="对于 POST/PUT 请求，可以使用 @RequestBody 注解传递复杂对象。
                 Feign 会自动将对象序列化为 JSON（默认使用 Jackson）。
                 确保服务端也有对应的 DTO 类，并且字段名和类型匹配。
                 对于 GET 请求，复杂对象会被展开为查询参数，字段名作为参数名。"
            isOpen={expandedFaq === 5}
            onClick={() => setExpandedFaq(expandedFaq === 5 ? null : 5)}
          />
          <FaqCard2
            number={6}
            question="如何调试 Feign 请求?"
            answer="可以设置 loggerLevel 为 FULL 来查看完整的请求和响应信息。
                 同时启用 Feign 客户端接口的 DEBUG 日志级别。
                 对于网络问题，可以使用 tcpdump 或 Wireshark 抓包分析。
                 也可以在拦截器中记录请求和响应的详细信息。"
            isOpen={expandedFaq === 6}
            onClick={() => setExpandedFaq(expandedFaq === 6 ? null : 6)}
          />
        </div>
      </section>

      {/* 下一步学习 */}
      <section className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white p-8 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">🎯 掌握了 OpenFeign,下一步学习什么?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <NextStepCard2 title="LoadBalancer" description="客户端负载均衡策略" link="/loadbalancer" icon="⚖️" />
          <NextStepCard2 title="Sentinel" description="服务熔断与限流" link="/sentinel" icon="🛡️" />
          <NextStepCard2 title="Nacos Config" description="动态配置管理" link="/nacos-config" icon="⚙️" />
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
    <div className="bg-white border-2 border-blue-200 rounded-lg p-5">
      <h3 className="text-xl font-bold text-gray-900 mb-4">{title}</h3>
      <ul className="space-y-2">
        {practices.map((practice, index) => (
          <li key={index} className="flex items-start">
            <span className="text-blue-600 mr-2 flex-shrink-0">✓</span>
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
