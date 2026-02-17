import React, { useState } from 'react';
import { CodeBlock } from '../components';

export const MicroservicesPatternsPage: React.FC = () => {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  return (
    <div className="prose prose prose-slate max-w-none">
      {/* 页面头部 */}
      <div className="bg-gradient-to-r from-purple-700 to-indigo-900 text-white rounded-lg p-6 mb-8">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-4xl font-bold mb-2">微服务架构设计模式</h1>
            <p className="text-purple-100 text-lg">企业级微服务架构设计完整指南</p>
          </div>
          <div className="flex gap-3 text-sm">
            <span className="px-3 py-1 bg-white/20 rounded-full">架构师</span>
            <span className="px-3 py-1 bg-white/20 rounded-full">约90分钟</span>
            <span className="px-3 py-1 bg-white/20 rounded-full">15个核心模式</span>
          </div>
        </div>
      </div>

      {/* 微服务设计模式概述 */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">微服务设计模式概述</h2>

        <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-lg mb-6">
          <h4 className="font-bold text-gray-900 mb-3">什么是微服务设计模式?</h4>
          <p className="text-gray-700 text-sm mb-4">
            微服务设计模式是在构建微服务架构时，经过验证的可重复使用的解决方案。
            这些模式帮助开发者解决微服务架构中的常见挑战，如服务通信、数据管理、可观测性等。
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <div className="bg-white p-4 rounded-lg">
              <h5 className="font-bold text-blue-900 mb-2">通信模式</h5>
              <p className="text-sm text-gray-600">服务间如何交互和协作</p>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <h5 className="font-bold text-blue-900 mb-2">数据模式</h5>
              <p className="text-sm text-gray-600">数据如何分布和管理</p>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <h5 className="font-bold text-blue-900 mb-2">可观测性模式</h5>
              <p className="text-sm text-gray-600">如何监控和追踪系统</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-green-50 border-2 border-green-200 rounded-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-3">使用设计模式的优点</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start">
                <span className="text-green-600 mr-2">✓</span>
                <span><strong>避免重复造轮子</strong> - 复用已验证的方案</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2">✓</span>
                <span><strong>统一团队认知</strong> - 形成共同语言</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2">✓</span>
                <span><strong>降低复杂度</strong> - 系统化解决问题</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2">✓</span>
                <span><strong>提高可维护性</strong> - 标准化的架构</span>
              </li>
            </ul>
          </div>

          <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-3">模式选择原则</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start">
                <span className="text-yellow-600 mr-2">•</span>
                <span><strong>问题导向</strong> - 针对具体问题选择模式</span>
              </li>
              <li className="flex items-start">
                <span className="text-yellow-600 mr-2">•</span>
                <span><strong>循序渐进</strong> - 不要过度设计</span>
              </li>
              <li className="flex items-start">
                <span className="text-yellow-600 mr-2">•</span>
                <span><strong>因地制宜</strong> - 结合业务场景</span>
              </li>
              <li className="flex items-start">
                <span className="text-yellow-600 mr-2">•</span>
                <span><strong>持续优化</strong> - 根据反馈调整</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* 通信模式 */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">通信模式</h2>

        {/* 聚合器模式 */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">1. 聚合器模式</h3>

          <div className="bg-blue-50 p-4 rounded-lg mb-4">
            <p className="text-gray-700 text-sm">
              <strong>场景：</strong>客户端需要调用多个服务才能完成一个业务操作
            </p>
            <p className="text-gray-700 text-sm">
              <strong>解决方案：</strong>创建一个聚合服务，组合多个服务的调用结果
            </p>
          </div>

          <div className="mb-4">
            <h4 className="font-bold text-gray-800 mb-2">实现示例</h4>
            <CodeBlock
              language="java"
              code={`/**
 * 订单聚合服务
 * 组合用户、商品、支付服务的数据
 */
@Service
@RequiredArgsConstructor
public class OrderAggregatorService {

    private final UserServiceClient userServiceClient;
    private final ProductServiceClient productServiceClient;
    private final PaymentServiceClient paymentServiceClient;

    /**
     * 获取订单完整信息
     * 聚合用户、商品、支付等多个服务的数据
     */
    public OrderDetailDTO getOrderDetail(Long orderId) {
        // 1. 获取订单基本信息
        Order order = orderRepository.findById(orderId)
            .orElseThrow(() -> new OrderNotFoundException(orderId));

        // 2. 并行调用多个服务获取关联数据
        CompletableFuture<UserDTO> userFuture = CompletableFuture.supplyAsync(
            () -> userServiceClient.getUser(order.getUserId())
        );

        CompletableFuture<List<ProductDTO>> productsFuture = CompletableFuture.supplyAsync(
            () -> productServiceClient.getProducts(order.getProductIds())
        );

        CompletableFuture<PaymentDTO> paymentFuture = CompletableFuture.supplyAsync(
            () -> paymentServiceClient.getPayment(order.getPaymentId())
        );

        // 3. 等待所有服务调用完成
        CompletableFuture.allOf(userFuture, productsFuture, paymentFuture).join();

        // 4. 组装完整订单详情
        try {
            UserDTO user = userFuture.get();
            List<ProductDTO> products = productsFuture.get();
            PaymentDTO payment = paymentFuture.get();

            return OrderDetailDTO.builder()
                .orderId(order.getId())
                .orderNo(order.getOrderNo())
                .status(order.getStatus())
                .totalAmount(order.getTotalAmount())
                .user(user)
                .products(products)
                .payment(payment)
                .createTime(order.getCreateTime())
                .build();

        } catch (InterruptedException | ExecutionException e) {
            throw new AggregationException("Failed to aggregate order details", e);
        }
    }
}`}
            />
          </div>
        </div>

        {/* 代理模式 */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">2. API网关代理模式</h3>

          <div className="bg-blue-50 p-4 rounded-lg mb-4">
            <p className="text-gray-700 text-sm">
              <strong>场景：</strong>客户端只需要访问一个服务接口，但实际需要路由到多个后端服务
            </p>
            <p className="text-gray-700 text-sm">
              <strong>解决方案：</strong>使用API网关作为代理，根据请求路由到不同的服务
            </p>
          </div>

          <div className="mb-4">
            <h4 className="font-bold text-gray-800 mb-2">Spring Cloud Gateway 配置</h4>
            <CodeBlock
              language="yaml"
              code={`spring:
  cloud:
    gateway:
      routes:
        # 用户服务路由
        - id: user-service
          uri: lb://user-service
          predicates:
            - Path=/api/users/**
          filters:
            - StripPrefix=2
            - name: RequestRateLimiter
              args:
                redis-rate-limiter.replenishRate: 100
                redis-rate-limiter.burstCapacity: 200

        # 订单服务路由
        - id: order-service
          uri: lb://order-service
          predicates:
            - Path=/api/orders/**
          filters:
            - StripPrefix=2
            - name: CircuitBreaker
              args:
                name: orderServiceCircuitBreaker
                fallbackUri: forward:/fallback/orders`}
            />
          </div>
        </div>

        {/* 链式模式 */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">3. 责任链模式</h3>

          <div className="bg-blue-50 p-4 rounded-lg mb-4">
            <p className="text-gray-700 text-sm">
              <strong>场景：</strong>一个请求需要经过多个服务的依次处理
            </p>
            <p className="text-gray-700 text-sm">
              <strong>解决方案：</strong>将请求按照预定义的顺序传递给一系列处理者
            </p>
          </div>

          <div className="mb-4">
            <h4 className="font-bold text-gray-800 mb-2">订单处理链实现</h4>
            <CodeBlock
              language="java"
              code={`/**
 * 订单处理链接口
 */
public interface OrderHandler {
    boolean handle(OrderContext context);
    void setNext(OrderHandler handler);
}

/**
 * 库存检查处理器
 */
@Component
public class StockCheckHandler implements OrderHandler {

    @Override
    public boolean handle(OrderContext context) {
        log.info("检查库存");
        // 检查库存逻辑
        if (context.getStock() < context.getQuantity()) {
            context.setError("库存不足");
            return false;
        }
        return true;
    }
}

/**
 * 风险检查处理器
 */
@Component
public class RiskCheckHandler implements OrderHandler {

    @Override
    public boolean handle(OrderContext context) {
        log.info("风险检查");
        // 风险检查逻辑
        if (isHighRisk(context)) {
            context.setError("风险过高");
            return false;
        }
        return true;
    }
}`}
            />
          </div>
        </div>

        {/* 异步消息模式 */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">4. 异步消息模式</h3>

          <div className="bg-blue-50 p-4 rounded-lg mb-4">
            <p className="text-gray-700 text-sm">
              <strong>场景：</strong>服务间需要解耦，不需要立即响应，或需要保证最终一致性
            </p>
            <p className="text-gray-700 text-sm">
              <strong>解决方案：</strong>使用消息队列实现异步通信
            </p>
          </div>

          <div className="mb-4">
            <h4 className="font-bold text-gray-800 mb-2">RocketMQ 实现</h4>
            <CodeBlock
              language="java"
              code={`/**
 * 订单事件生产者
 */
@Component
@Slf4j
@RequiredArgsConstructor
public class OrderEventProducer {

    private final RocketMQTemplate rocketMQTemplate;

    /**
     * 发送订单创建事件
     */
    public void sendOrderCreatedEvent(Order order) {
        OrderCreatedEvent event = OrderCreatedEvent.builder()
            .orderId(order.getId())
            .userId(order.getUserId())
            .amount(order.getAmount())
            .build();

        rocketMQTemplate.asyncSend(
            "order-created-topic",
            event,
            new SendCallback() {
                @Override
                public void onSuccess(SendResult sendResult) {
                    log.info("订单事件发送成功: orderId={}", order.getId());
                }

                @Override
                public void onException(Throwable e) {
                    log.error("订单事件发送失败: orderId={}", order.getId(), e);
                }
            }
        );
    }
}

/**
 * 库存服务消费者
 */
@Component
@RocketMQMessageListener(
    topic = "order-created-topic",
    consumerGroup = "stock-consumer-group"
)
@Slf4j
public class StockConsumer implements RocketMQListener<OrderCreatedEvent> {

    @Override
    public void onMessage(OrderCreatedEvent event) {
        log.info("收到订单创建事件，预扣库存: orderId={}", event.getOrderId());
        // 处理库存逻辑
    }
}`}
            />
          </div>
        </div>
      </section>

      {/* 数据模式 */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">数据模式</h2>

        {/* Database per Service */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">1. Database per Service 模式</h3>

          <div className="bg-blue-50 p-4 rounded-lg mb-4">
            <p className="text-gray-700 text-sm">
              <strong>场景：</strong>每个服务需要独立的数据库，避免数据耦合
            </p>
            <p className="text-gray-700 text-sm">
              <strong>解决方案：</strong>每个服务拥有自己的数据库，服务只能访问自己的数据库
            </p>
          </div>

          <div className="mb-4">
            <h4 className="font-bold text-gray-800 mb-2">多数据源配置</h4>
            <CodeBlock
              language="yaml"
              code={`spring:
  datasource:
    # 用户服务数据源
    user:
      jdbc-url: jdbc:mysql://localhost:3306/user_db
      username: root
      password: password

    # 订单服务数据源
    order:
      jdbc-url: jdbc:mysql://localhost:3306/order_db
      username: root
      password: password

    # 商品服务数据源
    product:
      jdbc-url: jdbc:mysql://localhost:3306/product_db
      username: root
      password: password`}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
              <h5 className="font-bold text-gray-900 mb-2">优点</h5>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• 服务解耦，独立开发和部署</li>
                <li>• 选择适合的数据库技术</li>
                <li>• 数据隔离，提高安全性</li>
              </ul>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
              <h5 className="font-bold text-gray-900 mb-2">挑战</h5>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• 跨服务查询困难</li>
                <li>• 分布式事务复杂</li>
                <li>• 数据一致性难保证</li>
              </ul>
            </div>
          </div>
        </div>

        {/* API 组合模式 */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">2. API 组合模式</h3>

          <div className="bg-blue-50 p-4 rounded-lg mb-4">
            <p className="text-gray-700 text-sm">
              <strong>场景：</strong>需要查询分散在多个服务中的数据
            </p>
            <p className="text-gray-700 text-sm">
              <strong>解决方案：</strong>通过API调用组合数据，在应用层实现查询
            </p>
          </div>

          <div className="mb-4">
            <h4 className="font-bold text-gray-800 mb-2">实现示例</h4>
            <CodeBlock
              language="java"
              code={`/**
 * API 组合查询服务
 */
@Service
@Slf4j
@RequiredArgsConstructor
public class ProductCompositionService {

    private final ProductServiceClient productServiceClient;
    private final InventoryServiceClient inventoryServiceClient;
    private final ReviewServiceClient reviewServiceClient;

    /**
     * 获取商品详情（组合多个服务的数据）
     */
    public ProductDetailView getProductDetailView(Long productId) {
        // 并行调用多个服务
        CompletableFuture<ProductDTO> productFuture = CompletableFuture.supplyAsync(
            () -> productServiceClient.getProduct(productId)
        );

        CompletableFuture<InventoryDTO> inventoryFuture = CompletableFuture.supplyAsync(
            () -> inventoryServiceClient.getInventory(productId)
        );

        CompletableFuture<List<ReviewDTO>> reviewsFuture = CompletableFuture.supplyAsync(
            () -> reviewServiceClient.getReviews(productId)
        );

        // 等待所有调用完成
        CompletableFuture.allOf(productFuture, inventoryFuture, reviewsFuture).join();

        // 组合数据
        return ProductDetailView.builder()
            .product(productFuture.join())
            .inventory(inventoryFuture.join())
            .reviews(reviewsFuture.join())
            .build();
    }
}`}
            />
          </div>
        </div>

        {/* CQRS 模式 */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">3. CQRS 模式</h3>

          <div className="bg-blue-50 p-4 rounded-lg mb-4">
            <p className="text-gray-700 text-sm">
              <strong>场景：</strong>读写操作差异大，需要不同的优化策略
            </p>
            <p className="text-gray-700 text-sm">
              <strong>解决方案：</strong>将读写操作分离，使用不同的模型和数据存储
            </p>
          </div>

          <div className="mb-4">
            <h4 className="font-bold text-gray-800 mb-2">CQRS 实现</h4>
            <CodeBlock
              language="java"
              code={`/**
 * CQRS: 命令端（写操作）
 */
@Service
@Slf4j
@RequiredArgsConstructor
public class OrderCommandService {

    private final OrderRepository orderRepository;
    private final OrderEventPublisher eventPublisher;

    /**
     * 创建订单（命令）
     */
    @Transactional
    public OrderId createOrder(CreateOrderCommand command) {
        // 创建订单实体
        Order order = Order.builder()
            .id(OrderId.generate())
            .userId(command.getUserId())
            .items(command.getItems())
            .build();

        // 持久化
        orderRepository.save(order);

        // 发布事件
        eventPublisher.publish(new OrderCreatedEvent(order));

        return order.getId();
    }
}

/**
 * CQRS: 查询端（读操作）
 */
@Service
@Slf4j
@RequiredArgsConstructor
public class OrderQueryService {

    private final OrderViewRepository orderViewRepository;

    /**
     * 获取订单详情（查询）
     */
    public OrderDetailView getOrderView(Long orderId) {
        return orderViewRepository.findById(orderId)
            .orElseThrow(() -> new OrderNotFoundException(orderId));
    }

    /**
     * 查询用户订单列表
     */
    public Page<OrderListView> getUserOrders(Long userId, Pageable pageable) {
        return orderViewRepository.findByUserId(userId, pageable);
    }
}`}
            />
          </div>
        </div>

        {/* 事件溯源模式 */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">4. 事件溯源模式</h3>

          <div className="bg-blue-50 p-4 rounded-lg mb-4">
            <p className="text-gray-700 text-sm">
              <strong>场景：</strong>需要完整的状态变更历史，或审计要求高的系统
            </p>
            <p className="text-gray-700 text-sm">
              <strong>解决方案：</strong>存储状态变更的事件序列，而非当前状态
            </p>
          </div>

          <div className="mb-4">
            <h4 className="font-bold text-gray-800 mb-2">事件溯源实现</h4>
            <CodeBlock
              language="java"
              code={`/**
 * 订单事件
 */
@Data
@Builder
public class OrderCreatedEvent implements DomainEvent {
    private final Long orderId;
    private final Long userId;
    private final List<OrderItem> items;
    private final Instant occurredOn;
}

/**
 * 事件存储
 */
@Service
@Slf4j
public class EventStore {

    private final EventRepository eventRepository;

    public void save(String aggregateId, List<DomainEvent> events) {
        events.forEach(event -> {
            EventEntity entity = EventEntity.builder()
                .aggregateId(aggregateId)
                .eventType(event.getClass().getSimpleName())
                .eventData(JsonUtils.toJson(event))
                .createdAt(Instant.now())
                .build();
            eventRepository.save(entity);
        });
    }

    public List<DomainEvent> getEvents(String aggregateId) {
        return eventRepository.findByAggregateId(aggregateId).stream()
            .map(this::deserialize)
            .collect(Collectors.toList());
    }
}

/**
 * 订单聚合（通过重放事件重建状态）
 */
@Service
@Slf4j
public class OrderAggregate {

    private final EventStore eventStore;

    public Order getOrder(Long orderId) {
        // 获取所有事件
        List<DomainEvent> events = eventStore.getEvents(String.valueOf(orderId));

        // 重放事件重建状态
        Order order = new Order();
        events.forEach(event -> {
            if (event instanceof OrderCreatedEvent) {
                order.apply((OrderCreatedEvent) event);
            }
        });

        return order;
    }
}`}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
              <h5 className="font-bold text-gray-900 mb-2">优点</h5>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• 完整的审计日志</li>
                <li>• 可以重放到任意时间点</li>
                <li>• 事件驱动的架构</li>
              </ul>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
              <h5 className="font-bold text-gray-900 mb-2">挑战</h5>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• 架构复杂度高</li>
                <li>• 需要快照机制优化</li>
                <li>• 事件Schema变更困难</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 可观测性模式 */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">可观测性模式</h2>

        {/* 日志聚合 */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">1. 日志聚合</h3>

          <div className="bg-blue-50 p-4 rounded-lg mb-4">
            <p className="text-gray-700 text-sm">
              <strong>场景：</strong>微服务产生大量日志，分散在不同节点，难以排查问题
            </p>
            <p className="text-gray-700 text-sm">
              <strong>解决方案：</strong>集中收集、存储和分析日志
            </p>
          </div>

          <div className="mb-4">
            <h4 className="font-bold text-gray-800 mb-2">日志配置</h4>
            <CodeBlock
              language="java"
              code={`/**
 * Logback 配置
 */
@Configuration
public class LoggingConfig {

    /**
     * 配置日志输出格式
     * 包含 TraceId 便于追踪
     */
    @PostConstruct
    public void configureLogging() {
        LoggerContext context = (LoggerContext) LoggerFactory.getILoggerFactory();

        // 配置控制台输出
        ConsoleAppender<ILoggingEvent> consoleAppender = new ConsoleAppender<>();
        consoleAppender.setContext(context);

        // 设置编码器
        PatternLayoutEncoder encoder = new PatternLayoutEncoder();
        encoder.setContext(context);
        encoder.setPattern("%d{yyyy-MM-dd HH:mm:ss.SSS} [%thread] %-5level %logger{36} [%X{traceId}] - %msg%n");
        encoder.start();

        consoleAppender.setEncoder(encoder);
        consoleAppender.start();

        // 获取根 Logger
        ch.qos.logback.classic.Logger rootLogger = context.getLogger(Logger.ROOT_LOGGER_NAME);
        rootLogger.addAppender(consoleAppender);
    }
}

/**
 * MDC 工具类
 */
public class MdcUtils {

    private static final String TRACE_ID = "traceId";

    public static void setTraceId(String traceId) {
        if (StringUtils.hasText(traceId)) {
            MDC.put(TRACE_ID, traceId);
        }
    }

    public static String getTraceId() {
        return MDC.get(TRACE_ID);
    }

    public static void clear() {
        MDC.clear();
    }
}`}
            />
          </div>
        </div>

        {/* 分布式追踪 */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">2. 分布式追踪</h3>

          <div className="bg-blue-50 p-4 rounded-lg mb-4">
            <p className="text-gray-700 text-sm">
              <strong>场景：</strong>一个请求跨越多个服务，需要追踪完整的调用链
            </p>
            <p className="text-gray-700 text-sm">
              <strong>解决方案：</strong>使用 TraceId 串联所有调用
            </p>
          </div>

          <div className="mb-4">
            <h4 className="font-bold text-gray-800 mb-2">SkyWalking 集成</h4>
            <CodeBlock
              language="java"
              code={`/**
 * SkyWalking 配置
 */
/*
# application.yml
skywalking:
  agent:
    service_name: order-service
    collector:
      backend_service: localhost:11800
    sampling:
      sample_rate: 0.5
*/

/**
 * 自定义追踪
 */
@Service
@Slf4j
public class OrderService {

    /**
     * 创建订单（自动追踪）
     */
    public Order createOrder(CreateOrderRequest request) {
        log.info("创建订单: userId={}", request.getUserId());
        // 业务逻辑...
        return order;
    }

    /**
     * 手动创建 Span（细粒度追踪）
     */
    @Trace
    public void processOrder(Long orderId) {
        // 创建子 Span
        try (Scope scope = ContextManager.createLocalSpan("processOrder:validate")) {
            validateOrder(orderId);
        }

        try (Scope scope = ContextManager.createLocalSpan("processOrder:payment")) {
            processPayment(orderId);
        }
    }

    /**
     * 添加自定义标签
     */
    @Trace
    public void customTrace(Long orderId) {
        // 添加自定义标签
        AbstractSpan span = ContextManager.getOrCreateTraceSpan();
        span.tag("order.id", String.valueOf(orderId));
        span.tag("business.type", "custom");

        // 业务逻辑...
    }
}`}
            />
          </div>
        </div>

        {/* 指标收集 */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">3. 指标收集</h3>

          <div className="bg-blue-50 p-4 rounded-lg mb-4">
            <p className="text-gray-700 text-sm">
              <strong>场景：</strong>需要监控服务的运行状态和性能指标
            </p>
            <p className="text-gray-700 text-sm">
              <strong>解决方案：</strong>收集和可视化关键指标
            </p>
          </div>

          <div className="mb-4">
            <h4 className="font-bold text-gray-800 mb-2">Micrometer + Prometheus 实现</h4>
            <CodeBlock
              language="java"
              code={`/**
 * 自定义 Metrics
 */
@Component
@Slf4j
@RequiredArgsConstructor
public class OrderMetrics {

    private final MeterRegistry meterRegistry;

    /**
     * 订单创建计数器
     */
    public void recordOrderCreated(String paymentMethod) {
        Counter.builder("order.created")
            .tag("payment_method", paymentMethod)
            .description("订单创建总数")
            .register(meterRegistry)
            .increment();
    }

    /**
     * 订单金额汇总
     */
    public void recordOrderAmount(BigDecimal amount, String category) {
        DistributionSummary.builder("order.amount")
            .tag("category", category)
            .description("订单金额分布")
            .register(meterRegistry)
            .record(amount.doubleValue());
    }

    /**
     * 订单处理时间
     */
    public <T> T recordOrderProcessingTime(String operation, Supplier<T> supplier) {
        return Timer.Sample.start(meterRegistry)
            .stop(Timer.builder("order.processing.time")
                .tag("operation", operation)
                .description("订单处理时间")
                .register(meterRegistry))
            .recordCallable(supplier::get);
    }
}

/**
 * 使用 Metrics
 */
@Service
@Slf4j
@RequiredArgsConstructor
public class OrderService {

    private final OrderMetrics orderMetrics;

    /**
     * 创建订单（记录指标）
     */
    public Order createOrder(CreateOrderRequest request) {
        // 记录处理时间
        return orderMetrics.recordOrderProcessingTime("create", () -> {
            // 业务逻辑...
            orderMetrics.recordOrderCreated(request.getPaymentMethod());
            return order;
        });
    }
}`}
            />
          </div>
        </div>
      </section>

      {/* 完整实战案例 */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">完整实战案例：电商订单系统</h2>

        <div className="bg-purple-50 border-l-4 border-purple-500 p-6 rounded-lg mb-6">
          <h4 className="font-bold text-gray-900 mb-3">案例背景</h4>
          <p className="text-gray-700 text-sm">
            构建一个完整的电商订单系统，包含订单创建、支付、库存、物流等功能，
            综合运用多种微服务设计模式。
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">系统架构</h3>

          <div className="mb-4">
            <CodeBlock
              language="markdown"
              code={`┌─────────────────────────────────────────────┐
│              API Gateway                  │
│         (Spring Cloud Gateway)            │
└──────────────────┬────────────────────────┘
                   │
     ┌─────────────┼─────────────┬────────────┐
     │             │             │            │
┌────▼───┐   ┌────▼───┐   ┌────▼───┐   ┌───▼────┐
│ 订单服务 │   │ 商品服务 │   │ 用户服务 │   │ 支付服务 │
└────┬───┘   └────┬───┘   └────┬───┘   └───┬────┘
     │            │             │            │
     └────────────┴─────────────┴────────────┘
                        │
          ┌─────────────▼──────────────┐
          │    RocketMQ 消息队列        │
          └─────────────┬──────────────┘
                        │
          ┌─────────────┼─────────────┐
          │             │             │
     ┌────▼───┐   ┌────▼───┐   ┌────▼───┐
     │ 库存服务 │   │ 物流服务 │   │ 积分服务 │
     └────────┘   └────────┘   └────────┘`}
            />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">订单创建完整流程</h3>

          <div className="mb-4">
            <h4 className="font-bold text-gray-800 mb-2">综合运用多种模式</h4>
            <CodeBlock
              language="java"
              code={`/**
 * 订单创建完整流程
 * 综合运用聚合器、链式、异步消息等模式
 */
@Service
@Slf4j
@RequiredArgsConstructor
public class OrderCreationService {

    private final UserServiceClient userServiceClient;
    private final ProductServiceClient productServiceClient;
    private final OrderCommandService orderCommandService;
    private final OrderEventPublisher eventPublisher;
    private final OrderMetrics orderMetrics;

    /**
     * 创建订单（完整流程）
     */
    @Transactional(rollbackFor = Exception.class)
    public OrderResult createOrder(CreateOrderRequest request) {
        long startTime = System.currentTimeMillis();

        try {
            // 阶段1: 数据聚合（聚合器模式）
            OrderAggregatedData data = aggregateOrderData(request);

            // 阶段2: 处理链执行（链式模式）
            OrderContext context = executeProcessingChain(data);

            // 阶段3: 创建订单（Database per Service）
            Order order = createOrderEntity(context);

            // 阶段4: 发布事件（异步消息模式）
            publishOrderCreatedEvent(order);

            // 阶段5: 记录指标（可观测性模式）
            recordMetrics(order, startTime);

            return OrderResult.success(order);

        } catch (OrderProcessingException e) {
            log.error("订单创建失败: {}", e.getMessage());
            return OrderResult.failure(e.getMessage());
        }
    }

    /**
     * 阶段1: 数据聚合
     */
    private OrderAggregatedData aggregateOrderData(CreateOrderRequest request) {
        // 并行调用多个服务
        CompletableFuture<UserDTO> userFuture = CompletableFuture.supplyAsync(() ->
            userServiceClient.getUser(request.getUserId())
        );

        CompletableFuture<List<ProductDTO>> productsFuture = CompletableFuture.supplyAsync(() ->
            productServiceClient.getProducts(request.getProductIds())
        );

        CompletableFuture.allOf(userFuture, productsFuture).join();

        return OrderAggregatedData.builder()
            .user(userFuture.join())
            .products(productsFuture.join())
            .build();
    }

    /**
     * 阶段2: 处理链执行
     */
    private OrderContext executeProcessingChain(OrderAggregatedData data) {
        OrderHandler chain = buildProcessingChain();
        OrderContext context = OrderContext.builder()
            .userData(data.getUser())
            .products(data.getProducts())
            .build();

        boolean success = chain.handle(context);

        if (!success) {
            throw new OrderProcessingException(context.getError());
        }

        return context;
    }

    /**
     * 阶段3: 创建订单实体
     */
    private Order createOrderEntity(OrderContext context) {
        CreateOrderCommand command = CreateOrderCommand.builder()
            .userId(context.getUserId())
            .items(context.getItems())
            .build();

        OrderId orderId = orderCommandService.createOrder(command);
        return orderCommandService.getOrder(orderId);
    }

    /**
     * 阶段4: 发布事件
     */
    private void publishOrderCreatedEvent(Order order) {
        OrderCreatedEvent event = OrderCreatedEvent.builder()
            .orderId(order.getId())
            .userId(order.getUserId())
            .items(order.getItems())
            .build();

        eventPublisher.publish(event);
    }

    /**
     * 阶段5: 记录指标
     */
    private void recordMetrics(Order order, long startTime) {
        orderMetrics.recordOrderCreated("all");
        long processingTime = System.currentTimeMillis() - startTime;
        Timer.builder("order.creation.time")
            .register(meterRegistry)
            .record(processingTime, TimeUnit.MILLISECONDS);
    }
}`}
            />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">常见问题</h2>

        <div className="space-y-4">
          {[
            {
              q: "聚合器模式和API组合模式有什么区别?",
              a: "聚合器模式主要组合多个服务的调用来完成一个操作，通常有明确的业务流程；API组合模式更侧重于查询场景，从多个服务获取数据组合成视图。聚合器关注写操作，API组合关注读操作。"
            },
            {
              q: "什么时候使用CQRS?",
              a: "当读写操作的访问模式、性能需求、数据结构差异很大时考虑使用CQRS。典型场景：高并发查询系统、复杂报表系统、需要多读模型支持的系统。注意CQRS会增加系统复杂度，需要权衡。"
            },
            {
              q: "事件溯源和传统数据库有什么区别?",
              a: "传统数据库存储当前状态，更新会覆盖旧数据；事件溯源存储状态变更的事件序列，可以通过重放事件重建任意时间点的状态。事件溯源提供了完整的审计日志和时序查询能力，但架构更复杂。"
            },
            {
              q: "如何保证异步消息的可靠性?",
              a: "1) 使用事务消息确保发送和业务操作的原子性；2) 实现幂等性处理，避免重复消费；3) 设置合理的重试策略；4) 记录消息处理日志；5) 使用死信队列处理无法消费的消息。"
            },
            {
              q: "Database per Service 模式下如何实现跨服务查询?",
              a: "1) 使用API组合模式在应用层聚合数据；2) 实现CQRS，通过事件同步构建读模型；3) 使用数据复制服务定期同步数据；4) 对于复杂查询，考虑引入OLAP数据库。避免直接跨库JOIN。"
            }
          ].map((faq, index) => (
            <div key={index} className="bg-white rounded-lg shadow p-4">
              <button
                onClick={() => toggleFaq(index)}
                className="w-full text-left flex items-center justify-between"
              >
                <span className="font-bold text-gray-900">Q: {faq.q}</span>
                <span className="text-gray-500">
                  {expandedFaq === index ? '▼' : '▶'}
                </span>
              </button>
              {expandedFaq === index && (
                <div className="mt-3 text-gray-700 pl-4 border-l-4 border-blue-500">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 总结 */}
      <section className="mb-12">
        <div className="bg-gradient-to-r from-purple-600 to-indigo-700 text-white rounded-lg p-6">
          <h2 className="text-3xl font-bold mb-4">总结</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-bold mb-3">核心要点</h3>
              <ul className="space-y-2 text-sm">
                <li>• 微服务模式是解决特定问题的标准化方案</li>
                <li>• 根据实际场景选择合适的模式，不要过度设计</li>
                <li>• 通信模式解决服务间协作问题</li>
                <li>• 数据模式解决数据一致性和查询问题</li>
                <li>• 可观测性模式帮助监控和调试系统</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-3">实践建议</h3>
              <ul className="space-y-2 text-sm">
                <li>• 从简单模式开始，逐步演进</li>
                <li>• 优先使用Database per Service数据模式</li>
                <li>• 通过异步消息解耦服务</li>
                <li>• 重视可观测性建设</li>
                <li>• 保持架构简洁，避免为了模式而模式</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
