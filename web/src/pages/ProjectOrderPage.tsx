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

export const ProjectOrderPage: React.FC = () => {
  const [openModule, setOpenModule] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg p-6 mb-8">
        <h1 className="text-4xl font-bold mb-2">微服务订单系统</h1>
        <p className="text-blue-100">基于 Spring Cloud Alibaba 的分布式订单系统实战</p>
        <div className="flex gap-3 text-sm mt-4">
          <span className="px-3 py-1 bg-white/20 rounded-full">🚀 实战项目</span>
          <span className="px-3 py-1 bg-white/20 rounded-full">⏱️ 约120分钟</span>
          <span className="px-3 py-1 bg-white/20 rounded-full">📊 8个核心模块</span>
        </div>
      </div>

      {/* Why Order System */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">为什么学习订单系统？</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-r-lg">
            <h3 className="text-xl font-bold text-green-800 mb-3">✅ 核心业务系统</h3>
            <ul className="text-gray-700 space-y-2">
              <li>• 电商交易的核心环节</li>
              <li>• 连接用户、商品、支付</li>
              <li>• 数据一致性的典型场景</li>
              <li>• 高并发业务代表</li>
            </ul>
          </div>
          <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-lg">
            <h3 className="text-xl font-bold text-red-800 mb-3">❌ 技术挑战</h3>
            <ul className="text-gray-700 space-y-2">
              <li>• 分布式事务保证</li>
              <li>• 库存扣减一致性</li>
              <li>• 订单状态机管理</li>
              <li>• 高并发下的性能优化</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Core Modules */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">核心功能模块</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { icon: '🛒', title: '下单流程', desc: '购物车→订单创建→库存扣减' },
            { icon: '💰', title: '支付集成', desc: '支付宝、微信支付、退款' },
            { icon: '📦', title: '状态管理', desc: '待支付→已支付→发货→完成' },
            { icon: '🔔', title: '通知系统', desc: '订单状态变更通知' },
          ].map((module) => (
            <div key={module.title} className="bg-white border border-gray-200 rounded-lg p-5 hover:shadow-lg transition-shadow">
              <div className="text-3xl mb-3">{module.icon}</div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{module.title}</h3>
              <p className="text-gray-600 text-sm">{module.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Technical Architecture */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">技术架构设计</h2>
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">系统分层架构</h3>
          <div className="bg-gray-50 rounded-lg p-4 font-mono text-sm">
            <div className="text-purple-700 font-bold mb-2">┌─ Gateway Layer (Nacos Gateway)</div>
            <div className="text-blue-700 font-bold mb-2">├─ Business Layer</div>
            <div className="text-gray-600 ml-4">• order-service (订单服务)</div>
            <div className="text-gray-600 ml-4">• payment-service (支付服务)</div>
            <div className="text-gray-600 ml-4">• inventory-service (库存服务)</div>
            <div className="text-gray-600 ml-4">• user-service (用户服务)</div>
            <div className="text-green-700 font-bold mb-2">├─ Middleware Layer</div>
            <div className="text-gray-600 ml-4">• Nacos (服务发现+配置中心)</div>
            <div className="text-gray-600 ml-4">• Sentinel (限流降级)</div>
            <div className="text-gray-600 ml-4">• Seata (分布式事务)</div>
            <div className="text-gray-600 ml-4">• RocketMQ (消息队列)</div>
            <div className="text-orange-700 font-bold">└─ Data Layer</div>
            <div className="text-gray-600 ml-4">• MySQL + Redis + MongoDB</div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">数据库设计</h3>
          <CodeBlock
            language="sql"
            code={`-- 订单主表
CREATE TABLE \`order_main\` (
  \`id\` BIGINT PRIMARY KEY AUTO_INCREMENT,
  \`order_no\` VARCHAR(64) NOT NULL COMMENT '订单号',
  \`user_id\` BIGINT NOT NULL COMMENT '用户ID',
  \`total_amount\` DECIMAL(10,2) NOT NULL COMMENT '订单总金额',
  \`pay_amount\` DECIMAL(10,2) COMMENT '实付金额',
  \`status\` TINYINT NOT NULL DEFAULT 0 COMMENT '订单状态',
  \`pay_time\` DATETIME COMMENT '支付时间',
  \`create_time\` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY \`uk_order_no\` (\`order_no\`),
  KEY \`idx_user_id\` (\`user_id\`),
  KEY \`idx_create_time\` (\`create_time\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 订单商品表
CREATE TABLE \`order_item\` (
  \`id\` BIGINT PRIMARY KEY AUTO_INCREMENT,
  \`order_id\` BIGINT NOT NULL COMMENT '订单ID',
  \`product_id\` BIGINT NOT NULL COMMENT '商品ID',
  \`sku_id\` BIGINT NOT NULL COMMENT 'SKU ID',
  \`product_name\` VARCHAR(255) NOT NULL,
  \`quantity\` INT NOT NULL COMMENT '购买数量',
  \`price\` DECIMAL(10,2) NOT NULL COMMENT '商品单价',
  \`total_amount\` DECIMAL(10,2) NOT NULL COMMENT '小计',
  KEY \`idx_order_id\` (\`order_id\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`}
          />
        </div>
      </section>

      {/* Implementation Details */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">核心实现</h2>

        {/* Order State Machine */}
        <div className="mb-6">
          <button
            onClick={() => setOpenModule(openModule === 'statemachine' ? null : 'statemachine')}
            className="w-full bg-white border-2 border-blue-300 rounded-lg p-5 flex items-center justify-between hover:bg-blue-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">📈</span>
              <div className="text-left">
                <h3 className="text-lg font-bold text-gray-900">订单状态机</h3>
                <p className="text-gray-600 text-sm">状态流转与业务逻辑</p>
              </div>
            </div>
            <span className="text-gray-400">&rbrace;</span>
          </button>
          {openModule === 'statemachine' && (
            <div className="mt-4 bg-white border border-gray-200 rounded-lg p-6">
              <CodeBlock
                language="java"
                code={`public enum OrderStatus {
    PENDING_PAYMENT(0, "待支付"),
    PAID(1, "已支付"),
    SHIPPED(2, "已发货"),
    COMPLETED(3, "已完成"),
    CANCELLED(4, "已取消"),
    REFUNDING(5, "退款中"),
    REFUNDED(6, "已退款");

    private final Integer code;
    private final String desc;

    // 状态流转校验
    public boolean canTransitionTo(OrderStatus newStatus) {
        switch (this) {
            case PENDING_PAYMENT:
                return newStatus == PAID || newStatus == CANCELLED;
            case PAID:
                return newStatus == SHIPPED || newStatus == REFUNDING;
            case SHIPPED:
                return newStatus == COMPLETED || newStatus == REFUNDING;
            case REFUNDING:
                return newStatus == REFUNDED || newStatus == PAID;
            default:
                return false;
        }
    }
}

// 状态变更服务
@Service
public class OrderStatusService {
    @Autowired
    private OrderMapper orderMapper;

    @Transactional
    public void changeStatus(Long orderId, OrderStatus newStatus) {
        Order order = orderMapper.selectById(orderId);

        // 校验状态流转合法性
        if (!order.getStatus().canTransitionTo(newStatus)) {
            throw new BusinessException("状态流转不合法");
        }

        // 更新状态
        order.setStatus(newStatus);
        orderMapper.updateById(order);

        // 发送状态变更事件
        eventPublisher.publishEvent(new OrderStatusChangedEvent(order));
    }
}`}
              />
            </div>
          )}
        </div>

        {/* Distributed Transaction */}
        <div className="mb-6">
          <button
            onClick={() => setOpenModule(openModule === 'transaction' ? null : 'transaction')}
            className="w-full bg-white border-2 border-green-300 rounded-lg p-5 flex items-center justify-between hover:bg-green-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">💾</span>
              <div className="text-left">
                <h3 className="text-lg font-bold text-gray-900">分布式事务</h3>
                <p className="text-gray-600 text-sm">Seata AT 模式保证数据一致性</p>
              </div>
            </div>
            <span className="text-gray-400">&rbrace;</span>
          </button>
          {openModule === 'transaction' && (
            <div className="mt-4 bg-white border border-gray-200 rounded-lg p-6">
              <CodeBlock
                language="java"
                code={`@GlobalTransactional(name = "create-order", rollbackFor = Exception.class)
public Long createOrder(OrderCreateRequest request) {
    // 1. 创建订单
    Order order = buildOrder(request);
    orderMapper.insert(order);

    // 2. 远程调用扣减库存
    InventoryDTO inventory = new InventoryDTO();
    inventory.setProductId(request.getProductId());
    inventory.setQuantity(request.getQuantity());
    inventoryClient.deduct(inventory);  // Feign 调用

    // 3. 远程调用计算优惠
    CouponDTO coupon = new CouponDTO();
    coupon.setUserId(request.getUserId());
    coupon.setOrderId(order.getId());
    couponClient.useCoupon(coupon);

    return order.getId();
}

// 库存服务（被调用方）
@GlobalTransactional
public void deduct(InventoryDTO request) {
    // 乐观锁扣减库存
    int updated = inventoryMapper.deduct(
        request.getProductId(),
        request.getQuantity()
    );

    if (updated == 0) {
        throw new BusinessException("库存不足");
    }
}

// Feign 配置
@Configuration
public class FeignConfig {
    @Bean
    public RequestInterceptor requestInterceptor() {
        return template -> {
            // 传递 Seata XID
            String xid = RootContext.getXID();
            if (xid != null) {
                template.header("TX_XID", xid);
            }
        };
    }
}`}
              />
            </div>
          )}
        </div>

        {/* Payment Integration */}
        <div className="mb-6">
          <button
            onClick={() => setOpenModule(openModule === 'payment' ? null : 'payment')}
            className="w-full bg-white border-2 border-yellow-300 rounded-lg p-5 flex items-center justify-between hover:bg-yellow-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">🔐</span>
              <div className="text-left">
                <h3 className="text-lg font-bold text-gray-900">支付集成</h3>
                <p className="text-gray-600 text-sm">支付宝、微信支付对接</p>
              </div>
            </div>
            <span className="text-gray-400">&rbrace;</span>
          </button>
          {openModule === 'payment' && (
            <div className="mt-4 bg-white border border-gray-200 rounded-lg p-6">
              <CodeBlock
                language="java"
                code={`// 支付策略模式
public interface PaymentStrategy {
    PaymentResponse pay(PaymentRequest request);
    RefundResponse refund(RefundRequest request);
    PaymentNotifyResponse notify(Map<String, String> params);
}

// 支付宝实现
@Service("alipayStrategy")
public class AlipayStrategy implements PaymentStrategy {
    @Autowired
    private AlipayClient alipayClient;

    @Override
    public PaymentResponse pay(PaymentRequest request) {
        AlipayTradePagePayRequest alipayRequest = new AlipayTradePagePayRequest();
        alipayRequest.setNotifyUrl(config.getNotifyUrl());
        alipayRequest.setReturnUrl(config.getReturnUrl());

        JSONObject bizContent = new JSONObject();
        bizContent.put("out_trade_no", request.getOrderNo());
        bizContent.put("total_amount", request.getAmount());
        bizContent.put("subject", request.getSubject());
        alipayRequest.setBizContent(bizContent.toString());

        AlipayTradePagePayResponse response = alipayClient.pageExecute(alipayRequest);
        return PaymentResponse.builder()
            .payUrl(response.getBody())
            .orderNo(request.getOrderNo())
            .build();
    }
}

// 微信支付实现
@Service("wechatpayStrategy")
public class WechatPayStrategy implements PaymentStrategy {
    // 类似实现...
}

// 支付服务
@Service
public class PaymentService {
    private Map<String, PaymentStrategy> strategyMap;

    @Autowired
    public PaymentService(List<PaymentStrategy> strategies) {
        strategyMap = strategies.stream()
            .collect(Collectors.toMap(
                s -> s.getClass().getAnnotation(Service.class).value(),
                Function.identity()
            ));
    }

    public PaymentResponse pay(PaymentRequest request) {
        PaymentStrategy strategy = strategyMap.get(request.getPaymentType());
        return strategy.pay(request);
    }
}`}
              />
            </div>
          )}
        </div>

        {/* RocketMQ Message */}
        <div className="mb-6">
          <button
            onClick={() => setOpenModule(openModule === 'mq' ? null : 'mq')}
            className="w-full bg-white border-2 border-purple-300 rounded-lg p-5 flex items-center justify-between hover:bg-purple-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">📨</span>
              <div className="text-left">
                <h3 className="text-lg font-bold text-gray-900">消息驱动</h3>
                <p className="text-gray-600 text-sm">RocketMQ 解耦业务</p>
              </div>
            </div>
            <span className="text-gray-400">&rbrace;</span>
          </button>
          {openModule === 'mq' && (
            <div className="mt-4 bg-white border border-gray-200 rounded-lg p-6">
              <CodeBlock
                language="java"
                code={`// 订单支付成功后发送消息
@Service
public class OrderService {
    @Autowired
    private RocketMQTemplate rocketMQTemplate;

    public void handlePaymentSuccess(PaymentSuccessEvent event) {
        // 1. 更新订单状态
        updateOrderStatus(event.getOrderNo(), OrderStatus.PAID);

        // 2. 发送订单支付成功消息
        OrderPaidMessage message = OrderPaidMessage.builder()
            .orderNo(event.getOrderNo())
            .userId(event.getUserId())
            .paidAmount(event.getAmount())
            .payTime(event.getPayTime())
            .build();

        rocketMQTemplate.syncSend(
            "order-paid-topic",
            message
        );

        // 3. 发送延迟消息（24小时后自动收货）
        rocketMQTemplate.syncSend(
            "order-auto-complete-topic",
            message,
            3000,
            16  // 延迟等级：16 = 24小时
        );
    }
}

// 库存服务消费消息
@RocketMQMessageListener(
    topic = "order-paid-topic",
    consumerGroup = "inventory-consumer-group"
)
@Service
public class InventoryConsumer implements RocketMQListener<OrderPaidMessage> {
    @Autowired
    private InventoryService inventoryService;

    @Override
    public void onMessage(OrderPaidMessage message) {
        // 扣减真实库存（从预扣减到真实扣减）
        inventoryService.confirmDeduct(message.getOrderNo());
    }
}`}
              />
            </div>
          )}
        </div>
      </section>

      {/* Best Practices */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">最佳实践</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white border-l-4 border-blue-500 rounded-lg p-5 shadow-md">
            <h3 className="text-lg font-bold text-gray-900 mb-3">🎯 幂等性保证</h3>
            <ul className="text-gray-700 text-sm space-y-2">
              <li>• 订单号作为唯一幂等键</li>
              <li>• Redis 分布式锁防止重复提交</li>
              <li>• 支付回调幂等处理</li>
              <li>• 数据库唯一约束兜底</li>
            </ul>
          </div>
          <div className="bg-white border-l-4 border-green-500 rounded-lg p-5 shadow-md">
            <h3 className="text-lg font-bold text-gray-900 mb-3">🔒 安全防护</h3>
            <ul className="text-gray-700 text-sm space-y-2">
              <li>• 订单信息加密存储</li>
              <li>• 签名验证支付回调</li>
              <li>• 敏感操作日志记录</li>
              <li>• 风控规则引擎</li>
            </ul>
          </div>
          <div className="bg-white border-l-4 border-yellow-500 rounded-lg p-5 shadow-md">
            <h3 className="text-lg font-bold text-gray-900 mb-3">⚡ 性能优化</h3>
            <ul className="text-gray-700 text-sm space-y-2">
              <li>• Redis 缓存热门商品</li>
              <li>• MongoDB 存储订单详情</li>
              <li>• 分库分表海量订单</li>
              <li>• 异步处理非核心流程</li>
            </ul>
          </div>
          <div className="bg-white border-l-4 border-purple-500 rounded-lg p-5 shadow-md">
            <h3 className="text-lg font-bold text-gray-900 mb-3">📊 监控告警</h3>
            <ul className="text-gray-700 text-sm space-y-2">
              <li>• 订单量实时监控</li>
              <li>• 支付成功率告警</li>
              <li>• 异常订单自动检测</li>
              <li>• 业务指标大盘</li>
            </ul>
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
            <h3 className="text-lg font-bold text-gray-900">1. 如何防止订单超卖？</h3>
            <span className="text-2xl text-gray-400">&lbrace;openFaq === 1 ? '−' : '+'&rbrace;</span>
          </button>
          {openFaq === 1 && (
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
              <div className="text-gray-700 whitespace-pre-line">防超卖方案：

1. 数据库乐观锁
   ```sql
   UPDATE inventory
   SET stock = stock - 1, version = version + 1
   WHERE product_id = ? AND stock &gt; 0 AND version = ?
   ```

2. Redis 分布式锁
   ```java
   @Autowired
   private RedissonClient redisson;

   public boolean deductStock(Long productId) &lbrace;
       RLock lock = redisson.getLock("stock:" + productId);
       try &lbrace;
           if (lock.tryLock(3, 10, TimeUnit.SECONDS)) &lbrace;
               // 执行扣减逻辑
           &rbrace;
       &rbrace; finally &lbrace;
           lock.unlock();
       &rbrace;
   &rbrace;
   ```

3. 预扣减 + 异步确认
   - 下单时预扣减 Redis 库存
   - 支付成功后异步扣减数据库
   - 超时未支付回滚预扣减</div>
            </div>
          )}
        </div>

        <div className="bg-white border-2 border-gray-200 rounded-lg overflow-hidden mt-4">
          <button
            onClick={() => setOpenFaq(openFaq === 2 ? null : 2)}
            className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
          >
            <h3 className="text-lg font-bold text-gray-900">2. 如何保证支付回调的可靠性？</h3>
            <span className="text-2xl text-gray-400">&lbrace;openFaq === 2 ? '−' : '+'&rbrace;</span>
          </button>
          {openFaq === 2 && (
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
              <div className="text-gray-700 whitespace-pre-line">可靠性保证方案：

1. 签名验证
   ```java
   public boolean verifySign(Map&lt;String, String&gt; params) &lbrace;
       String sign = params.get("sign");
       params.remove("sign");

       String calculatedSign = AlipaySignature.rsa256CheckV1(
           params,
           alipayPublicKey,
           "UTF-8",
           "RSA2"
       );

       return sign.equals(calculatedSign);
   &rbrace;
   ```

2. 幂等性处理
   - 根据订单号查询订单状态
   - 已处理的订单直接返回成功
   - 使用 Redis 锁防止并发处理

3. 重试机制
   - 业务异常返回失败（支付宝会重试）
   - 记录回调日志用于排查
   - 最大重试次数限制

4. 对账机制
   - 定时任务对比订单与支付记录
   - 发现不一致立即告警
   - 人工介入修复</div>
            </div>
          )}
        </div>

        <div className="bg-white border-2 border-gray-200 rounded-lg overflow-hidden mt-4">
          <button
            onClick={() => setOpenFaq(openFaq === 3 ? null : 3)}
            className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
          >
            <h3 className="text-lg font-bold text-gray-900">3. 订单数据量太大如何优化？</h3>
            <span className="text-2xl text-gray-400">&lbrace;openFaq === 3 ? '−' : '+'&rbrace;</span>
          </button>
          {openFaq === 3 && (
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
              <div className="text-gray-700 whitespace-pre-line">海量订单优化方案：

1. 冷热数据分离
   - 热数据（3个月内）： MySQL 主库
   - 温数据（3-12月）： MySQL 从库
   - 冷数据（1年以上）：OSS + Hive

2. 分库分表
   - 按用户 ID 分库（减少跨库事务）
   - 按订单号分表（均匀分布）
   - ShardingSphere 中间件

3. 读写分离
   ```java
   @DataSource("slave")  // 读从库
   public Order getOrderById(Long orderId) &lbrace;
       return orderMapper.selectById(orderId);
   &rbrace;

   @DataSource("master")  // 写主库
   public void createOrder(Order order) &lbrace;
       orderMapper.insert(order);
   &rbrace;
   ```

4. 缓存策略
   - Redis 缓存最近订单
   - MongoDB 存储订单详情
   - Elasticsearch 支持搜索

5. 异步处理
   - 非核心流程异步化
   - MQ 削峰填谷
   - 延迟任务处理</div>
            </div>
          )}
        </div>
      </section>

      {/* Next Steps */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">下一步学习</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <a href="/project-payment" className="block bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg p-6 transition-colors">
            <h3 className="text-xl font-bold text-blue-900 mb-2">支付系统</h3>
            <p className="text-blue-700">深入支付架构设计</p>
          </a>
          <a href="/project-user-center" className="block bg-green-50 hover:bg-green-100 border border-green-200 rounded-lg p-6 transition-colors">
            <h3 className="text-xl font-bold text-green-900 mb-2">用户中心</h3>
            <p className="text-green-700">用户、账户、权限</p>
          </a>
          <a href="/project-comprehensive" className="block bg-purple-50 hover:bg-purple-100 border border-purple-200 rounded-lg p-6 transition-colors">
            <h3 className="text-xl font-bold text-purple-900 mb-2">综合项目</h3>
            <p className="text-purple-700">完整电商系统整合</p>
          </a>
        </div>
      </section>
    </div>
  );
};
