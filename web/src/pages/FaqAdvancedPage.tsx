import React, { useState } from 'react';

const CodeBlock: React.FC<{ language: string; code: string }> = ({ language, code }) => (
  <div className="bg-gray-900 rounded-lg overflow-hidden my-4">
    <div className="bg-gray-800 px-4 py-2 flex items-center gap-2">
      <span className="text-gray-300 text-sm font-mono">{language}</span>
    </div>
    <pre className="p-4 overflow-x-auto text-gray-100 text-sm font-mono whitespace-pre">
      {code}
    </pre>
  </div>
);

export const FaqAdvancedPage: React.FC = () => {
  const [openCategory, setOpenCategory] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqData = {
    architecture: {
      title: "架构设计",
      icon: "🏗️",
      questions: [
        {
          q: "如何设计微服务的拆分边界？",
          a: "微服务拆分原则：\n\n1. **领域驱动设计（DDD）**：\n- 识别领域模型和限界上下文\n- 按业务领域边界拆分服务\n- 每个服务对应一个或多个聚合根\n\n2. **单一职责原则**：\n- 每个服务只负责一个业务领域\n- 避免服务过大或过小\n- 服务间通过 API 通信\n\n3. **数据独立性**：\n- 每个服务拥有独立的数据库\n- 避免跨服务 joins\n- 使用事件或应用服务协调\n\n4. **团队康威定律**：\n- 服务边界与团队结构对应\n- 2-Pizza Team 原则（6-10人）\n\n拆分示例：\n- 订单服务：订单创建、查询、取消\n- 库存服务：库存管理、扣减、回滚\n- 支付服务：支付创建、回调、退款\n- 用户服务：用户信息、认证授权",
          code: null
        },
        {
          q: "如何实现分布式事务的一致性？",
          a: "分布式事务解决方案：\n\n1. **2PC/XA**：强一致性，性能差，不适合高并发\n\n2. **TCC（Try-Confirm-Cancel）**：\n- Try：预留资源\n- Confirm：确认执行\n- Cancel：取消执行\n- 适用于核心业务（支付、库存）\n\n3. **Saga 模式**：\n- 编排式：中央协调器负责\n- 编排式：服务间事件驱动\n- 最终一致性，性能好\n\n4. **Seata AT 模式**（推荐）：\n- 自动化补偿机制\n- 对业务零侵入\n- 支持主流数据库\n\n**最佳实践**：\n- 核心业务使用 TCC 或 Seata AT\n- 非核心业务使用 Saga 或最终一致性\n- 避免分布式事务：尽量在单服务内完成",
          code: { language: "java", content: `@GlobalTransactional(name = "create-order", rollbackFor = Exception.class)
public void createOrder(OrderRequest request) {
    // 1. 扣减库存
    inventoryService.deduct(request.getProductId(), request.getQuantity());

    // 2. 创建订单
    orderService.create(request);

    // 3. 扣减余额
    accountService.debit(request.getUserId(), request.getAmount());
}` }
        },
        {
          q: "如何设计服务间的通信方式？",
          a: "服务通信模式：\n\n1. **同步调用（OpenFeign）**：\n- 优点：简单直观、实时返回结果\n- 缺点：耦合度高、性能差\n- 适用：查询类操作、强一致性场景\n\n2. **异步消息（RocketMQ）**：\n- 优点：解耦、削峰填谷、高可用\n- 缺点：最终一致性、复杂度高\n- 适用：事件驱动、异步处理\n\n3. **混合模式**（推荐）：\n- 查询：同步调用\n- 写操作：异步消息\n\n**消息设计原则**：\n- 幂等性：消息去重\n- 顺序性：单分区单消费者\n- 可靠性：确认机制 + 重试\n- 监控：消息堆积告警",
          code: { language: "java", content: `// 同步调用
@FeignClient(name = "inventory-service")
public interface InventoryService {
    @PostMapping("/api/inventory/deduct")
    Result<Boolean> deduct(@RequestBody DeductRequest request);
}

// 异步消息
@RocketMQMessageListener(topic = "order-created")
public class OrderCreatedListener implements RocketMQListener<OrderCreatedEvent> {
    @Override
    public void onMessage(OrderCreatedEvent event) {
        // 处理订单创建事件
    }
}` }
        }
      ]
    },
    performance: {
      title: "性能优化",
      icon: "⚡",
      questions: [
        {
          q: "如何优化微服务的性能？",
          a: "性能优化策略：\n\n1. **缓存优化**：\n- 多级缓存（本地 + 分布式）\n- 缓存预热\n- 缓存穿透/击穿/雪崩防护\n\n2. **异步处理**：\n- 使用线程池异步执行\n- MQ 解耦和削峰\n- CompletableFuture 并行调用\n\n3. **数据库优化**：\n- 读写分离\n- 分库分表\n- SQL 优化和索引\n- 连接池优化（HikariCP）\n\n4. **网络优化**：\n- 服务内网通信\n- 连接池复用\n- HTTP/2 或 gRPC\n- 数据压缩\n\n5. **JVM 优化**：\n- 堆内存调优\n- GC 参数优化\n- JIT 优化",
          code: { language: "java", content: `// 并行调用示例
public OrderDetail getOrderDetail(Long orderId) {
    CompletableFuture<Order> orderFuture =
        CompletableFuture.supplyAsync(() -> orderMapper.selectById(orderId));

    CompletableFuture<User> userFuture =
        CompletableFuture.supplyAsync(() -> userService.getUser(order.getUserId()));

    CompletableFuture<List<OrderItem>> itemsFuture =
        CompletableFuture.supplyAsync(() -> orderItemService.listByOrderId(orderId));

    // 等待所有任务完成
    CompletableFuture.allOf(orderFuture, userFuture, itemsFuture).join();

    return new OrderDetail(orderFuture.get(), userFuture.get(), itemsFuture.get());
}` }
        },
        {
          q: "如何处理缓存穿透、击穿、雪崩？",
          a: "缓存问题解决方案：\n\n1. **缓存穿透**（查询不存在的数据）：\n- 布隆过滤器（Bloom Filter）\n- 缓存空对象（设置短 TTL）\n- 请求参数校验\n\n2. **缓存击穿**（热点 Key 过期）：\n- 互斥锁（Redis SETNX）\n- 永不过期（异步刷新）\n- 热点数据预热\n\n3. **缓存雪崩**（大量 Key 同时过期）：\n- TTL 加随机值\n- 多级缓存\n- 服务降级限流\n- Redis 高可用（集群、哨兵）",
          code: { language: "java", content: `// 缓存穿透：布隆过滤器
public Product getProductById(Long id) {
    // 1. 布隆过滤器判断是否存在
    if (!bloomFilter.mightContain(id)) {
        return null; // 一定不存在
    }

    // 2. 查询缓存
    Product product = redisTemplate.opsForValue().get("product:" + id);
    if (product != null) {
        return "NULL".equals(product) ? null : product;
    }

    // 3. 查询数据库
    product = productMapper.selectById(id);

    // 4. 写入缓存
    if (product == null) {
        redisTemplate.opsForValue().set("product:" + id, "NULL", 5, TimeUnit.MINUTES);
    } else {
        redisTemplate.opsForValue().set("product:" + id, product, 30, TimeUnit.MINUTES);
    }

    return product;
}` }
        },
        {
          q: "如何设计高并发秒杀系统？",
          a: "秒杀系统设计要点：\n\n1. **架构设计**：\n- CDN 缓存静态资源\n- API 网关限流\n- Redis 预扣库存\n- MQ 异步下单\n\n2. **Redis 设计**：\n- 原子操作扣库存（Lua 脚本）\n- 库存预热\n- 分布式锁防止超卖\n\n3. **防超卖机制**：\n- Redis Lua 原子性\n- 数据库乐观锁\n- 分布式锁\n\n4. **削峰策略**：\n- 限流（令牌桶、漏桶）\n- 队列缓冲\n- 异步处理",
          code: { language: "java", content: `// Redis Lua 脚本扣库存（原子操作）
String luaScript = \"""
    local stock = redis.call('get', KEYS[1])
    if tonumber(stock) >= tonumber(ARGV[1]) then
        return redis.call('decrby', KEYS[1], ARGV[1])
    else
        return -1
    end
    """;

Long result = redisTemplate.execute(
    RedisScript.of(luaScript),
    keys.asList("stock:" + productId),
    Collections.singletonList(quantity)
);

if (result == -1) {
    throw new BusinessException("库存不足");
}` }
        }
      ]
    },
    security: {
      title: "安全防护",
      icon: "🔒",
      questions: [
        {
          q: "如何保证微服务的安全性？",
          a: "微服务安全体系：\n\n1. **认证授权**：\n- JWT + Spring Security\n- OAuth2.0 + SSO\n- RBAC 权限模型\n\n2. **接口安全**：\n- HTTPS 加密传输\n- API 签名验证\n- 请求参数校验\n\n3. **数据安全**：\n- 敏感数据加密（AES、RSA）\n- 数据脱敏\n- SQL 注入防护\n- XSS 防护\n\n4. **服务安全**：\n- 服务间认证（mTLS）\n- 网络隔离（VPC、安全组）\n- DDoS 防护（限流、黑洞）\n\n5. **审计日志**：\n- 操作日志记录\n- 异常行为检测\n- 安全事件告警",
          code: { language: "java", content: `// JWT + Spring Security 配置
@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        return http
            .csrf().disable()
            .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            .and()
            .authorizeHttpRequests()
                .requestMatchers("/api/auth/**").permitAll()
                .anyRequest().authenticated()
            .and()
            .addFilterBefore(jwtAuthenticationFilter,
                UsernamePasswordAuthenticationFilter.class)
            .build();
    }
}` }
        },
        {
          q: "如何防止接口被恶意刷？",
          a: "接口防护措施：\n\n1. **限流防护**：\n- IP 限流\n- 用户限流\n- 接口限流（QPS）\n- Sentinel 规则配置\n\n2. **验证码**：\n- 图形验证码\n- 短信验证码\n- 滑动验证\n\n3. **黑名单机制**：\n- IP 黑名单\n- 用户黑名单\n- 自动封禁规则\n\n4. **参数校验**：\n- 请求参数合法性校验\n- 防止 SQL 注入\n- 防止 XSS 攻击",
          code: { language: "java", content: `// Sentinel 限流配置
@SentinelResource(value = "createOrder",
    blockHandler = "handleBlock",
    fallback = "handleFallback")
public Result<Long> createOrder(@RequestBody OrderRequest request) {
    return orderService.createOrder(request);
}

// IP 限流（自定义规则）
@GetMapping("/api/sms/send")
public Result<Void> sendSms(@RequestParam String phone) {
    // 限制：1分钟1次，1小时10次
    String ip = getClientIp();
    if (!rateLimitService.tryAcquire(ip, 1, 60)) {
        return Result.error("发送过于频繁");
    }
    return smsService.sendSms(phone);
}` }
        }
      ]
    },
    reliability: {
      title: "高可用设计",
      icon: "🔧",
      questions: [
        {
          q: "如何实现微服务的高可用？",
          a: "高可用设计方案：\n\n1. **服务高可用**：\n- 多实例部署（集群）\n- 健康检查和摘除\n- 负载均衡（轮询、权重）\n- 故障自动切换\n\n2. **数据高可用**：\n- 主从复制\n- 读写分离\n- 故障自动转移\n- 定时备份\n\n3. **跨地域容灾**：\n- 多机房部署\n- 异地多活\n- 数据同步\n\n4. **容错机制**：\n- 熔断降级（Sentinel）\n- 超时重试（指数退避）\n- 限流保护\n\n5. **监控告警**：\n- 实时监控（Prometheus + Grafana）\n- 日志聚合（ELK）\n- 链路追踪（SkyWalking）\n- 告警通知（钉钉、邮件）",
          code: null
        },
        {
          q: "如何设计合理的重试机制？",
          a: "重试机制设计：\n\n1. **重试策略**：\n- 最大重试次数：3-5次\n- 重试间隔：指数退避（1s, 2s, 4s, 8s）\n- 超时时间：根据业务配置（如 3s）\n\n2. **适用场景**：\n- 网络抖动、超时\n- 服务临时不可用\n- 幂等性操作\n\n3. **不适用场景**：\n- 非幂等操作\n- 业务异常（如库存不足）\n- 参数错误\n\n4. **实现方式**：\n- Spring Retry\n- Feign Retry\n- 自定义重试拦截器",
          code: { language: "java", content: `// Feign 重试配置
@FeignClient(
    name = "inventory-service",
    configuration = FeignConfig.class
)
public interface InventoryService {
    @PostMapping("/api/inventory/deduct")
    Result<Boolean> deduct(@RequestBody DeductRequest request);
}

@Configuration
public class FeignConfig {
    @Bean
    public Retryer feignRetryer() {
        // 最大重试次数：3次
        // 重试间隔：100ms，指数递增
        return new Retryer.Default(100, 1000, 3);
    }
}` }
        },
        {
          q: "如何设计熔断降级策略？",
          a: "熔断降级策略：\n\n1. **熔断策略**：\n- 慢调用比例：RT > 阈值\n- 异常比例：异常数 / 总数 > 阈值\n- 异常数：异常数 > 阈值\n\n2. **降级策略**：\n- 返回默认值\n- 返回缓存数据\n- 返回友好提示\n- 调用备用服务\n\n3. **熔断状态**：\n- 关闭（Closed）：正常请求\n- 开启（Open）：熔断请求\n- 半开（Half-Open）：试探恢复\n\n4. **Sentinel 配置**：\n- 熔断规则：RT 阈值、比例阈值\n- 降级规则：资源不足时降级",
          code: { language: "java", content: `// Sentinel 降级处理
@SentinelResource(
    value = "getProductDetail",
    blockHandler = "handleBlock",
    fallback = "handleFallback"
)
public Product getProductDetail(Long productId) {
    return productService.getById(productId);
}

// 限流降级
public Product handleBlock(Long productId, BlockException ex) {
    // 返回缓存或默认数据
    return productCache.get(productId);
}

// 异常降级
public Product handleFallback(Long productId, Throwable ex) {
    // 返回降级数据
    return new Product(productId, "服务降级中");
}` }
        }
      ]
    },
    troubleshooting: {
      title: "故障排查",
      icon: "🔍",
      questions: [
        {
          q: "服务启动失败如何排查？",
          a: "服务启动失败排查步骤：\n\n1. **检查依赖服务**：\n- Nacos 是否启动\n- MySQL、Redis 是否连接\n- 端口是否被占用\n\n2. **检查配置文件**：\n- application.yml 格式\n- bootstrap.yml 配置\n- 环境变量是否正确\n\n3. **检查依赖冲突**：\n- Maven 依赖版本\n- Jar 包冲突\n- ClassNotFound 异常\n\n4. **查看启动日志**：\n- 异常堆栈信息\n- Bean 创建失败原因\n- 配置加载错误\n\n5. **常见错误**：\n- \"Could not resolve placeholder\"：配置缺失\n- \"BeanCreationException\"：依赖注入失败\n- \"ConnectException\"：网络连接失败",
          code: null
        },
        {
          q: "服务调用超时如何处理？",
          a: "超时问题排查：\n\n1. **检查网络**：\n- 服务间网络是否通畅\n- 防火墙规则是否正确\n- DNS 解析是否正常\n\n2. **检查性能**：\n- 服务负载是否过高\n- 数据库慢查询\n- 是否死锁\n\n3. **优化超时配置**：\n- Feign 超时时间\n- Ribbon 连接和读取超时\n- Hystrix/Sentinel 超时\n\n4. **增加监控**：\n- 记录慢请求日志\n- 设置超时告警",
          code: { language: "java", content: `// Feign 超时配置
@FeignClient(
    name = "inventory-service",
    configuration = FeignConfig.class
)
public interface InventoryService {
    @PostMapping("/api/inventory/deduct")
    Result<Boolean> deduct(@RequestBody DeductRequest request);
}

@Configuration
public class FeignConfig {
    @Bean
    public Request.Options feignOptions() {
        // 连接超时：5秒\n        // 读取超时：30秒
        return new Request.Options(5_000, 30_000);
    }
}` }
        },
        {
          q: "如何排查内存泄漏问题？",
          a: "内存泄漏排查：\n\n1. **监控指标**：\n- JVM 内存使用率\n- GC 频率和耗时\n- Old Gen 持续增长\n\n2. **分析工具**：\n- jmap：堆内存快照\n- jstat：GC 统计\n- VisualVM：内存分析\n- MAT：内存分析器\n\n3. **常见原因**：\n- 未关闭的连接（IO、DB）\n- 静态集合无限增长\n- 缓存未设置过期\n- ThreadLocal 未清理\n- 闭包引用\n\n4. **排查步骤**：\n1. 导出堆内存快照：jmap -dump:format=b,file=heap.hprof <pid>\n2. MAT 分析大对象\n3. 查找 GC Root\n4. 修复代码并验证",
          code: null
        }
      ]
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-700 to-gray-900 text-white rounded-lg p-6 mb-8">
        <h1 className="text-4xl font-bold mb-2">进阶常见问题</h1>
        <p className="text-gray-200">Spring Cloud Alibaba 深入技术问题解答</p>
        <div className="flex gap-3 text-sm mt-4">
          <span className="px-3 py-1 bg-white/20 rounded-full">💡 深入理解</span>
          <span className="px-3 py-1 bg-white/20 rounded-full">⏱️ 约50分钟</span>
          <span className="px-3 py-1 bg-white/20 rounded-full">📋 5大分类</span>
        </div>
      </div>

      {/* FAQ Categories */}
      <div className="space-y-6">
        {Object.entries(faqData).map(([key, category]) => (
          <div key={key} className="bg-white rounded-lg shadow-lg overflow-hidden">
            <button
              onClick={() => setOpenCategory(openCategory === key ? null : key)}
              className="w-full bg-gray-50 hover:bg-gray-100 p-4 flex items-center justify-between transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{category.icon}</span>
                <span className="text-xl font-bold text-gray-900">{category.title}</span>
                <span className="text-sm text-gray-600">({category.questions.length} 个问题)</span>
              </div>
              <span className="text-gray-400 text-2xl">{openCategory === key ? '−' : '+'}</span>
            </button>

            {openCategory === key && (
              <div className="p-4 space-y-4">
                {category.questions.map((faq, idx) => (
                  <div key={idx} className="border border-gray-200 rounded-lg overflow-hidden">
                    <button
                      onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                      className="w-full text-left p-4 flex items-start justify-between hover:bg-gray-50 transition-colors"
                    >
                      <span className="font-medium text-gray-900 flex-1 pr-4">
                        <span className="text-teal-600 mr-2">Q:</span>
                        {faq.q}
                      </span>
                      <span className="text-gray-400 text-lg mt-1">
                        {openFaq === idx ? '−' : '+'}
                      </span>
                    </button>
                    {openFaq === idx && (
                      <div className="px-4 pb-4">
                        <div className="text-gray-700 whitespace-pre-line mb-4">
                          <span className="text-teal-600 font-medium">A:</span> {faq.a}
                        </div>
                        {faq.code && (
                          <CodeBlock language={faq.code.language} code={faq.code.content} />
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Quick Links */}
      <section className="mt-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">相关资源</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <a href="/faq-beginner" className="block bg-teal-50 hover:bg-teal-100 border border-teal-200 rounded-lg p-6 transition-colors">
            <h3 className="text-lg font-bold text-teal-900 mb-2">初学者问题</h3>
            <p className="text-teal-700 text-sm">基础概念和入门问题</p>
          </a>
          <a href="/faq-production" className="block bg-green-50 hover:bg-green-100 border border-green-200 rounded-lg p-6 transition-colors">
            <h3 className="text-lg font-bold text-green-900 mb-2">生产实践</h3>
            <p className="text-green-700 text-sm">生产环境常见问题</p>
          </a>
          <a href="/system-design" className="block bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg p-6 transition-colors">
            <h3 className="text-lg font-bold text-blue-900 mb-2">系统设计</h3>
            <p className="text-blue-700 text-sm">分布式系统设计</p>
          </a>
        </div>
      </section>
    </div>
  );
};
