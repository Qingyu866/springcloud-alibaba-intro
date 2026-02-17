import React, { useState } from 'react';
import { K8sDeploymentCard } from '../components/K8sDeploymentCard';

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

export const ProjectComprehensivePage: React.FC = () => {
  const [openModule, setOpenModule] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-600 to-red-800 text-white rounded-lg p-6 mb-8">
        <h1 className="text-4xl font-bold mb-2">综合电商系统</h1>
        <p className="text-red-100">基于 Spring Cloud Alibaba 的完整微服务电商系统</p>
        <div className="flex gap-3 text-sm mt-4">
          <span className="px-3 py-1 bg-white/20 rounded-full">🚀 终极项目</span>
          <span className="px-3 py-1 bg-white/20 rounded-full">⏱️ 约180分钟</span>
          <span className="px-3 py-1 bg-white/20 rounded-full">🎯 整合8大子系统</span>
        </div>
      </div>

      {/* Why Comprehensive System */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">为什么学习综合系统？</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-r-lg">
            <h3 className="text-xl font-bold text-green-800 mb-3">✅ 完整业务闭环</h3>
            <ul className="text-gray-700 space-y-2">
              <li>• 从商品浏览到支付完成</li>
              <li>• 整合所有技术栈</li>
              <li>• 真实生产级架构</li>
              <li>• 可直接商用参考</li>
            </ul>
          </div>
          <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-lg">
            <h3 className="text-xl font-bold text-red-800 mb-3">❌ 系统复杂度</h3>
            <ul className="text-gray-700 space-y-2">
              <li>• 多服务协作复杂</li>
              <li>• 分布式事务难处理</li>
              <li>• 性能瓶颈定位难</li>
              <li>• 运维成本高</li>
            </ul>
          </div>
        </div>
      </section>

      {/* System Architecture Overview */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">系统架构全景</h2>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="grid md:grid-cols-4 gap-4 text-center">
            {[
              { icon: '👤', name: '用户中心', color: 'bg-indigo-100 border-indigo-300' },
              { icon: '🛍️', name: '商品中心', color: 'bg-blue-100 border-blue-300' },
              { icon: '🛒', name: '订单中心', color: 'bg-green-100 border-green-300' },
              { icon: '💰', name: '支付中心', color: 'bg-yellow-100 border-yellow-300' },
              { icon: '📦', name: '库存中心', color: 'bg-purple-100 border-purple-300' },
              { icon: '🚀', name: '营销中心', color: 'bg-red-100 border-red-300' },
              { icon: '🔔', name: '消息中心', color: 'bg-orange-100 border-orange-300' },
              { icon: '📊', name: '数据中心', color: 'bg-teal-100 border-teal-300' },
            ].map((system) => (
              <div key={system.name} className={`border-2 rounded-lg p-4 ${system.color}`}>
                <div className="text-3xl mb-2">{system.icon}</div>
                <div className="font-bold text-gray-900">{system.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Business Flows */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">核心业务流程</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white border-l-4 border-blue-500 rounded-lg p-5 shadow-md">
            <h3 className="text-lg font-bold text-gray-900 mb-3">🛒 购物流程</h3>
            <div className="text-gray-700 text-sm space-y-1">
              <p>1. 用户登录 → 浏览商品</p>
              <p>2. 加入购物车 → 下单</p>
              <p>3. 库存预扣减 → 创建订单</p>
              <p>4. 发起支付 → 支付回调</p>
              <p>5. 确认扣减 → 发货通知</p>
            </div>
          </div>
          <div className="bg-white border-l-4 border-green-500 rounded-lg p-5 shadow-md">
            <h3 className="text-lg font-bold text-gray-900 mb-3">💸 退款流程</h3>
            <div className="text-gray-700 text-sm space-y-1">
              <p>1. 用户申请退款</p>
              <p>2. 商家审核通过/拒绝</p>
              <p>3. 调用支付退款</p>
              <p>4. 库存回滚</p>
              <p>5. 退款完成通知</p>
            </div>
          </div>
          <div className="bg-white border-l-4 border-yellow-500 rounded-lg p-5 shadow-md">
            <h3 className="text-lg font-bold text-gray-900 mb-3">🎫 秒杀流程</h3>
            <div className="text-gray-700 text-sm space-y-1">
              <p>1. 活动预热 → 缓存商品</p>
              <p>2. 用户抢购 → 限流校验</p>
              <p>3. Redis 扣减库存</p>
              <p>4. 创建秒杀订单</p>
              <p>5. 异步扣减真实库存</p>
            </div>
          </div>
          <div className="bg-white border-l-4 border-purple-500 rounded-lg p-5 shadow-md">
            <h3 className="text-lg font-bold text-gray-900 mb-3">📦 物流流程</h3>
            <div className="text-gray-700 text-sm space-y-1">
              <p>1. 商家发货 → 创建物流单</p>
              <p>2. 物流轨迹更新</p>
              <p>3. 用户签收 → 确认收货</p>
              <p>4. 自动完成订单</p>
              <p>5. 评价通知</p>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Implementation */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">技术实现细节</h2>

        {/* Distributed Transaction */}
        <div className="mb-6">
          <button
            onClick={() => setOpenModule(openModule === 'transaction' ? null : 'transaction')}
            className="w-full bg-white border-2 border-blue-300 rounded-lg p-5 flex items-center justify-between hover:bg-blue-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">🔗</span>
              <div className="text-left">
                <h3 className="text-lg font-bold text-gray-900">分布式事务编排</h3>
                <p className="text-gray-600 text-sm">Seata + Saga 模式</p>
              </div>
            </div>
            <span className="text-gray-400">&rbrace;</span>
          </button>
          {openModule === 'transaction' && (
            <div className="mt-4 bg-white border border-gray-200 rounded-lg p-6">
              <CodeBlock
                language="java"
                code={`@SagaOrchestrationStart
public class OrderSagaOrchestrator {
    @Autowired
    private InventoryService inventoryService;

    @Autowired
    private PaymentService paymentService;

    @Autowired
    private LogisticsService logisticsService;

    /**
     * 下单 Saga 编排
     */
    @SagaStep(compensationMethod = "cancelOrder")
    public void createOrder(OrderCreateRequest request, SagaContext context) {
        // 1. 创建订单
        Order order = orderService.create(request);
        context.setVariable("orderId", order.getId());
        context.setVariable("orderAmount", order.getTotalAmount());
    }

    public void cancelOrder(SagaContext context) {
        Long orderId = context.getVariable("orderId");
        orderService.cancel(orderId);
    }

    /**
     * 扣减库存
     */
    @SagaStep(compensationMethod = "restoreInventory")
    public void deductInventory(SagaContext context) {
        Long orderId = context.getVariable("orderId");
        Order order = orderService.getById(orderId);

        inventoryService.deduct(order.getProductId(), order.getQuantity());
        context.setVariable("productId", order.getProductId());
    }

    public void restoreInventory(SagaContext context) {
        Long productId = context.getVariable("productId");
        Order order = orderService.getById(context.getVariable("orderId"));
        inventoryService.restore(productId, order.getQuantity());
    }

    /**
     * 扣减优惠券
     */
    @SagaStep(compensationMethod = "restoreCoupon")
    public void useCoupon(SagaContext context) {
        Long orderId = context.getVariable("orderId");
        Order order = orderService.getById(orderId);

        if (order.getCouponId() != null) {
            couponService.use(order.getCouponId(), orderId);
            context.setVariable("couponId", order.getCouponId());
        }
    }

    public void restoreCoupon(SagaContext context) {
        Long couponId = context.getVariable("couponId");
        if (couponId != null) {
            couponService.restore(couponId);
        }
    }

    /**
     * 发起支付
     */
    @SagaStep(compensationMethod = "refundPayment")
    public void initiatePayment(SagaContext context) {
        Long orderId = context.getVariable("orderId");
        Order order = orderService.getById(orderId);

        PaymentResponse response = paymentService.pay(order);
        context.setVariable("paymentNo", response.getPaymentNo());

        if (!response.isSuccess()) {
            throw new SagaException("支付失败");
        }
    }

    public void refundPayment(SagaContext context) {
        String paymentNo = context.getVariable("paymentNo");
        paymentService.refund(paymentNo);
    }
}`}
              />
            </div>
          )}
        </div>

        {/* Service Mesh */}
        <div className="mb-6">
          <button
            onClick={() => setOpenModule(openModule === 'mesh' ? null : 'mesh')}
            className="w-full bg-white border-2 border-green-300 rounded-lg p-5 flex items-center justify-between hover:bg-green-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">🕸️</span>
              <div className="text-left">
                <h3 className="text-lg font-bold text-gray-900">服务网格配置</h3>
                <p className="text-gray-600 text-sm">Istio 流量管理与治理</p>
              </div>
            </div>
            <span className="text-gray-400">&rbrace;</span>
          </button>
          {openModule === 'mesh' && (
            <div className="mt-4 bg-white border border-gray-200 rounded-lg p-6">
              <CodeBlock
                language="yaml"
                code={`apiVersion: networking.istio.io/v1beta1
kind: VirtualService
metadata:
  name: order-service
spec:
  hosts:
  - order-service
  http:
  # 灰度发布：10%流量到v2版本
  - match:
    - headers:
        x-user-group:
          exact: canary
    route:
    - destination:
        host: order-service
        subset: v2
      weight: 100
  - route:
    - destination:
        host: order-service
        subset: v1
      weight: 90
    - destination:
        host: order-service
        subset: v2
      weight: 10
---
# 故障注入
apiVersion: networking.istio.io/v1beta1
kind: VirtualService
metadata:
  name: payment-service
spec:
  hosts:
  - payment-service
  http:
  - fault:
      delay:
        percentage:
          value: 0.1
        fixedDelay: 5s
    route:
    - destination:
        host: payment-service
        subset: v1
---
# 超时与重试
apiVersion: networking.istio.io/v1beta1
kind: VirtualService
metadata:
  name: inventory-service
spec:
  hosts:
  - inventory-service
  http:
  - route:
    - destination:
        host: inventory-service
        subset: v1
    timeout: 3s
    retries:
      attempts: 3
      perTryTimeout: 2s
      retryOn: 5xx,connect-failure,refused-stream`}
              />
            </div>
          )}
        </div>

        {/* Full Link Tracing */}
        <div className="mb-6">
          <button
            onClick={() => setOpenModule(openModule === 'tracing' ? null : 'tracing')}
            className="w-full bg-white border-2 border-yellow-300 rounded-lg p-5 flex items-center justify-between hover:bg-yellow-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">🔍</span>
              <div className="text-left">
                <h3 className="text-lg font-bold text-gray-900">全链路追踪</h3>
                <p className="text-gray-600 text-sm">SkyWalking + Sleuth</p>
              </div>
            </div>
            <span className="text-gray-400">&rbrace;</span>
          </button>
          {openModule === 'tracing' && (
            <div className="mt-4 bg-white border border-gray-200 rounded-lg p-6">
              <CodeBlock
                language="java"
                code={`@RestController
@RequestMapping("/order")
public class OrderController {
    @Autowired
    private OrderService orderService;

    @Autowired
    private InventoryService inventoryService;

    @Autowired
    private PaymentService paymentService;

    /**
     * 创建订单（自动生成 TraceId）
     */
    @PostMapping("/create")
    @NewSpan(name = "createOrder")  // SkyWalking 注解
    public Result<Long> createOrder(@RequestBody OrderCreateRequest request) {
        // TraceId 会自动传递到所有下游服务
        Long orderId = orderService.create(request);
        return Result.success(orderId);
    }
}

// Service 层
@Service
public class OrderService {
    @NewSpan(name = "doCreateOrder")
    public Long create(OrderCreateRequest request) {
        // 1. 创建订单
        Order order = buildOrder(request);
        orderMapper.insert(order);

        // 2. 调用库存服务（TraceId 自动传递）
        inventoryService.deduct(order.getProductId(), order.getQuantity());

        // 3. 调用支付服务（TraceId 自动传递）
        paymentService.createPayment(order);

        return order.getId();
    }
}

// 配置 Sleuth
@Configuration
public class SleuthConfig {
    @Bean
    public Sampler alwaysSampler() {
        return Sampler.create(1.0f);  // 100% 采样
    }

    @Bean
    public Sender sender() {
        // 发送 Trace 数据到 SkyWalking OAP
        return new OkHttpSender(
            "http://skywalking-oap:12800/segments"
        );
    }
}

// application.yml
spring:
  sleuth:
    zipkin:
      base-url: http://skywalking-oap:9411
    sender:
      type: web
  application:
    name: order-service

# 链路追踪示例：
# TraceId: 1234567890abcdef1234567890abcdef
# Span[1]: order-service -> createOrder (start)
#   Span[2]: order-service -> orderService.create (start)
#     Span[3]: order-service -> inventoryService.deduct (remote)
#       Span[4]: inventory-service -> deductService (start)
#     Span[3]: inventory-service -> deductService (end)
#     Span[5]: order-service -> paymentService.create (remote)
#       Span[6]: payment-service -> createPayment (start)
#     Span[5]: payment-service -> createPayment (end)
#   Span[2]: orderService.create (end)
# Span[1]: createOrder (end)`}
              />
            </div>
          )}
        </div>

        {/* Event-Driven Architecture */}
        <div className="mb-6">
          <button
            onClick={() => setOpenModule(openModule === 'event' ? null : 'event')}
            className="w-full bg-white border-2 border-purple-300 rounded-lg p-5 flex items-center justify-between hover:bg-purple-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">⚡</span>
              <div className="text-left">
                <h3 className="text-lg font-bold text-gray-900">事件驱动架构</h3>
                <p className="text-gray-600 text-sm">RocketMQ 事件总线</p>
              </div>
            </div>
            <span className="text-gray-400">&rbrace;</span>
          </button>
          {openModule === 'event' && (
            <div className="mt-4 bg-white border border-gray-200 rounded-lg p-6">
              <CodeBlock
                language="java"
                code={`// 事件定义
@Data
public class OrderCreatedEvent extends BaseEvent {
    private Long orderId;
    private Long userId;
    private BigDecimal totalAmount;
    private List<OrderItem> items;
    private LocalDateTime createTime;
}

// 事件发布者
@Service
public class OrderEventPublisher {
    @Autowired
    private RocketMQTemplate rocketMQTemplate;

    public void publishOrderCreated(Order order) {
        OrderCreatedEvent event = OrderCreatedEvent.builder()
            .orderId(order.getId())
            .userId(order.getUserId())
            .totalAmount(order.getTotalAmount())
            .items(order.getItems())
            .createTime(LocalDateTime.now())
            .build();

        // 发送到订单创建主题
        rocketMQTemplate.syncSend(
            "order-created-topic",
            event
        );

        log.info("订单创建事件已发布：orderId={}", order.getId());
    }
}

// 事件消费者 - 库存服务
@RocketMQMessageListener(
    topic = "order-created-topic",
    consumerGroup = "inventory-order-created-group"
)
@Service
public class InventoryOrderCreatedConsumer implements RocketMQListener<OrderCreatedEvent> {
    @Autowired
    private InventoryService inventoryService;

    @Override
    public void onMessage(OrderCreatedEvent event) {
        log.info("收到订单创建事件：orderId={}", event.getOrderId());

        // 异步扣减库存
        for (OrderItem item : event.getItems()) {
            inventoryService.confirmDeduct(
                event.getOrderId(),
                item.getProductId(),
                item.getQuantity()
            );
        }
    }
}

// 事件消费者 - 积分服务
@RocketMQMessageListener(
    topic = "order-created-topic",
    consumerGroup = "points-order-created-group"
)
@Service
public class PointsOrderCreatedConsumer implements RocketMQListener<OrderCreatedEvent> {
    @Autowired
    private PointsService pointsService;

    @Override
    public void onMessage(OrderCreatedEvent event) {
        log.info("收到订单创建事件：orderId={}", event.getOrderId());

        // 增加积分
        pointsService.add(
            event.getUserId(),
            event.getTotalAmount().multiply(new BigDecimal("0.01")).longValue()
        );
    }
}

// 事件消费者 - 数据服务
@RocketMQMessageListener(
    topic = "order-created-topic",
    consumerGroup = "data-order-created-group"
)
@Service
public class DataOrderCreatedConsumer implements RocketMQListener<OrderCreatedEvent> {
    @Autowired
    private DataService dataService;

    @Override
    public void onMessage(OrderCreatedEvent event) {
        // 数据统计与分析
        dataService.recordOrder(event);
    }
}`}
              />
            </div>
          )}
        </div>

        {/* Caching Strategy */}
        <div className="mb-6">
          <button
            onClick={() => setOpenModule(openModule === 'cache' ? null : 'cache')}
            className="w-full bg-white border-2 border-orange-300 rounded-lg p-5 flex items-center justify-between hover:bg-orange-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">💾</span>
              <div className="text-left">
                <h3 className="text-lg font-bold text-gray-900">多级缓存架构</h3>
                <p className="text-gray-600 text-sm">Caffeine + Redis</p>
              </div>
            </div>
            <span className="text-gray-400">&rbrace;</span>
          </button>
          {openModule === 'cache' && (
            <div className="mt-4 bg-white border border-gray-200 rounded-lg p-6">
              <CodeBlock
                language="java"
                code={`@Service
public class ProductQueryService {
    @Autowired
    private ProductMapper productMapper;

    @Autowired
    private RedisTemplate<String, Product> redisTemplate;

    // L1: 本地缓存（Caffeine）
    private Cache<Long, Product> localCache = Caffeine.newBuilder()
        .maximumSize(10000)
        .expireAfterWrite(5, TimeUnit.MINUTES)
        .build();

    /**
     * 查询商品（多级缓存）
     */
    public Product getProductById(Long productId) {
        // L1: 本地缓存
        Product product = localCache.getIfPresent(productId);
        if (product != null) {
            return product;
        }

        // L2: Redis 缓存
        String redisKey = "product:" + productId;
        product = redisTemplate.opsForValue().get(redisKey);
        if (product != null) {
            // 回写本地缓存
            localCache.put(productId, product);
            return product;
        }

        // L3: 数据库
        product = productMapper.selectById(productId);
        if (product != null) {
            // 写入 Redis（30分钟）
            redisTemplate.opsForValue().set(
                redisKey,
                product,
                30,
                TimeUnit.MINUTES
            );
            // 写入本地缓存
            localCache.put(productId, product);
        }

        return product;
    }

    /**
     * 更新商品（缓存更新）
     */
    @Transactional
    public void updateProduct(Product product) {
        // 1. 更新数据库
        productMapper.updateById(product);

        // 2. 删除缓存（而非更新，避免并发问题）
        localCache.invalidate(product.getId());
        redisTemplate.delete("product:" + product.getId());

        // 3. 发送缓存失效消息
        CacheInvalidateMessage message = CacheInvalidateMessage.builder()
            .cacheKey("product:" + product.getId())
            .build();

        rocketMQTemplate.syncSend("cache-invalidate-topic", message);
    }

    /**
     * 缓存预热
     */
    @PostConstruct
    public void warmUpCache() {
        // 查询热门商品
        List<Product> hotProducts = productMapper.selectHotProducts(1000);

        for (Product product : hotProducts) {
            // 提前加载到缓存
            localCache.put(product.getId(), product);
            redisTemplate.opsForValue().set(
                "product:" + product.getId(),
                product,
                30,
                TimeUnit.MINUTES
            );
        }

        log.info("缓存预热完成，加载商品数：{}", hotProducts.size());
    }
}`}
              />
            </div>
          )}
        </div>
      </section>

      {/* Deployment Architecture */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">部署架构</h2>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="bg-gray-50 rounded-lg p-6 font-mono text-sm">
            <div className="text-purple-700 font-bold mb-4">┌─ 客户端层 (CDN + SLB)</div>
            <div className="text-blue-700 font-bold mb-4">├─ 网关层 (Spring Cloud Gateway Cluster)</div>
            <div className="text-gray-600 ml-4">• Gateway-1, Gateway-2, Gateway-3</div>
            <div className="text-green-700 font-bold mb-4">├─ 应用层 (微服务集群)</div>
            <div className="text-gray-600 ml-4">• User Service (3实例)</div>
            <div className="text-gray-600 ml-4">• Product Service (3实例)</div>
            <div className="text-gray-600 ml-4">• Order Service (5实例)</div>
            <div className="text-gray-600 ml-4">• Payment Service (3实例)</div>
            <div className="text-gray-600 ml-4">• Inventory Service (3实例)</div>
            <div className="text-yellow-700 font-bold mb-4">├─ 中间件层</div>
            <div className="text-gray-600 ml-4">• Nacos Cluster (3节点)</div>
            <div className="text-gray-600 ml-4">• Sentinel Dashboard</div>
            <div className="text-gray-600 ml-4">• RocketMQ Cluster (2主2从)</div>
            <div className="text-gray-600 ml-4">• Redis Cluster (3主3从)</div>
            <div className="text-gray-600 ml-4">• MySQL Cluster (1主2从)</div>
            <div className="text-orange-700 font-bold">└─ 基础设施层</div>
            <div className="text-gray-600 ml-4">• Kubernetes Cluster</div>
            <div className="text-gray-600 ml-4">• Prometheus + Grafana</div>
            <div className="text-gray-600 ml-4">• ELK Stack</div>
            <div className="text-gray-600 ml-4">• SkyWalking</div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">常见问题</h2>

        <div className="bg-white border-2 border-gray-200 rounded-lg overflow-hidden">
          <button
            onClick={() => setOpenFaq(openFaq === 1 ? null : 1)}
            className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
          >
            <h3 className="text-lg font-bold text-gray-900">1. 如何保证系统高可用？</h3>
            <span className="text-2xl text-gray-400">&lbrace;openFaq === 1 ? '−' : '+'&rbrace;</span>
          </button>
          {openFaq === 1 && (
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
              <div className="text-gray-700 whitespace-pre-line">高可用保障方案：

1. 服务多副本部署
   - 关键服务至少3个实例
   - K8s 自动扩缩容
   - 健康检查与自愈

2. 多级容灾
   - 同城双活
   - 异地灾备
   - 数据实时同步

3. 限流降级
   ```java
   @SentinelResource(
       value = "createOrder",
       blockHandler = "createOrderBlockHandler"
   )
   public Long createOrder(OrderCreateRequest request) &lbrace;
       // 业务逻辑
   &rbrace;

   public Long createOrderBlockHandler(OrderCreateRequest request, BlockException e) &lbrace;
       // 降级逻辑：返回友好提示或简化处理
       throw new BusinessException("系统繁忙，请稍后重试");
   &rbrace;
   ```

4. 熔断器
   - Hystrix/Resilience4j
   - 失败率达到阈值自动熔断
   - 半开状态探测恢复</div>
            </div>
          )}
        </div>

        <div className="bg-white border-2 border-gray-200 rounded-lg overflow-hidden mt-4">
          <button
            onClick={() => setOpenFaq(openFaq === 2 ? null : 2)}
            className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
          >
            <h3 className="text-lg font-bold text-gray-900">2. 如何处理大促流量？</h3>
            <span className="text-2xl text-gray-400">&lbrace;openFaq === 2 ? '−' : '+'&rbrace;</span>
          </button>
          {openFaq === 2 && (
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
              <div className="text-gray-700 whitespace-pre-line">大促流量应对方案：

1. 流量漏斗
   - CDN 静态资源加速
   - API Gateway 限流
   - 服务层隔离
   - 数据层保护

2. 弹性扩容
   ```yaml
   # K8s HPA 自动扩容
   apiVersion: autoscaling/v2
   kind: HorizontalPodAutoscaler
   metadata:
     name: order-service-hpa
   spec:
     scaleTargetRef:
       apiVersion: apps/v1
       kind: Deployment
       name: order-service
     minReplicas: 5
     maxReplicas: 50
     metrics:
     - type: Resource
       resource:
         name: cpu
         target:
           type: Utilization
           averageUtilization: 70
   ```

3. 削峰填谷
   - Redis 队列缓冲
   - MQ 异步处理
   - 定时任务批量处理

4. 读写分离
   - 主库承担写流量
   - 多个从库分担读流量
   - ShardingSphere 读写分离

5. 缓存预热
   - 大促前预加载热点数据
   - 本地缓存 + Redis
   - 缓存穿透保护</div>
            </div>
          )}
        </div>

        <div className="bg-white border-2 border-gray-200 rounded-lg overflow-hidden mt-4">
          <button
            onClick={() => setOpenFaq(openFaq === 3 ? null : 3)}
            className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
          >
            <h3 className="text-lg font-bold text-gray-900">3. 如何监控全链路性能？</h3>
            <span className="text-2xl text-gray-400">&lbrace;openFaq === 3 ? '−' : '+'&rbrace;</span>
          </button>
          {openFaq === 3 && (
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
              <div className="text-gray-700 whitespace-pre-line">全链路性能监控：

1. APM 监控
   - SkyWalking Agent 埋点
   - 自动生成调用链路
   - 性能瓶颈可视化

2. 业务指标
   ```java
   @MetricsTag(
       name = "order.create",
       description = "订单创建"
   )
   @Counted(
       name = "order.create.count",
       description = "订单创建次数"
   )
   @Timed(
       name = "order.create.time",
       description = "订单创建耗时"
   )
   public Long createOrder(OrderCreateRequest request) &lbrace;
       // 业务逻辑
   &rbrace;
   ```

3. 告警规则
   - 订单量异常下降
   - 接口响应时间超过阈值
   - 错误率超标
   - 系统资源告警

4. 监控大盘
   - Grafana 实时展示
   - 多维度数据分析
   - 趋势预测</div>
            </div>
          )}
        </div>
      </section>

      {/* Summary */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">项目总结</h2>
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-8 border-2 border-blue-200">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">🎯 学习成果</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-lg font-bold text-gray-900 mb-3">✅ 掌握的技术</h4>
              <ul className="text-gray-700 space-y-2">
                <li>• Spring Cloud Alibaba 全套技术栈</li>
                <li>• 微服务架构设计能力</li>
                <li>• 分布式事务解决方案</li>
                <li>• 高并发系统设计</li>
                <li>• 容器化部署（Docker + K8s）</li>
                <li>• DevOps 实践（CI/CD）</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-bold text-gray-900 mb-3">🚀 可以做什么</h4>
              <ul className="text-gray-700 space-y-2">
                <li>• 独立设计微服务架构</li>
                <li>• 开发生产级电商系统</li>
                <li>• 解决分布式系统常见问题</li>
                <li>• 性能优化与故障排查</li>
                <li>• 技术选型与架构决策</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <K8sDeploymentCard projectType="comprehensive" />

      {/* Next Steps */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">继续进阶</h2>
        <div className="grid md:grid-cols-4 gap-6">
          <a href="/interview-prep" className="block bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg p-6 transition-colors">
            <h3 className="text-xl font-bold text-blue-900 mb-2">面试准备</h3>
            <p className="text-blue-700">高频面试题</p>
          </a>
          <a href="/security-deep-dive" className="block bg-green-50 hover:bg-green-100 border border-green-200 rounded-lg p-6 transition-colors">
            <h3 className="text-xl font-bold text-green-900 mb-2">安全深度</h3>
            <p className="text-green-700">安全防护体系</p>
          </a>
          <a href="/performance-benchmark" className="block bg-yellow-50 hover:bg-yellow-100 border border-yellow-200 rounded-lg p-6 transition-colors">
            <h3 className="text-xl font-bold text-yellow-900 mb-2">性能基准</h3>
            <p className="text-yellow-700">性能测试与调优</p>
          </a>
          <a href="/production-config" className="block bg-purple-50 hover:bg-purple-100 border border-purple-200 rounded-lg p-6 transition-colors">
            <h3 className="text-xl font-bold text-purple-900 mb-2">生产配置</h3>
            <p className="text-purple-700">生产最佳实践</p>
          </a>
        </div>
      </section>
    </div>
  );
};
