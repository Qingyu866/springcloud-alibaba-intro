import { CodeBlock } from '../components';

interface ModuleCardProps {
  name: string;
  description: string;
  tech: string[];
  icon: string;
  color: string;
}

const ModuleCard: React.FC<ModuleCardProps> = ({ name, description, tech, icon, color }) => (
  <div className={`${color} border-2 rounded-lg p-5`}>
    <div className="flex items-center gap-3 mb-3">
      <span className="text-3xl">{icon}</span>
      <h3 className="text-xl font-bold text-gray-900">{name}</h3>
    </div>
    <p className="text-gray-700 text-sm mb-3">{description}</p>
    <div className="flex flex-wrap gap-2">
      {tech.map((t, idx) => (
        <span key={idx} className="text-xs bg-white/80 px-2 py-1 rounded">{t}</span>
      ))}
    </div>
  </div>
);

interface StepCardProps {
  step: number;
  title: string;
  content: string[];
}

const StepCard: React.FC<StepCardProps> = ({ step, title, content }) => (
  <div className="bg-white border-2 border-slate-200 rounded-lg p-6">
    <div className="flex items-start gap-4">
      <div className="bg-orange-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold flex-shrink-0 text-lg">
        {step}
      </div>
      <div className="flex-1">
        <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
        <ul className="text-sm text-gray-700 space-y-2">
          {content.map((item, idx) => (
            <li key={idx} className="flex items-start">
              <span className="text-orange-600 mr-2">✓</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </div>
);

export const ProjectEcommercePage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="bg-gradient-to-r from-orange-700 to-orange-900 text-white rounded-lg p-6 mb-8">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-4xl font-bold mb-2">电商微服务项目</h1>
            <p className="text-orange-100 text-lg">从零构建企业级电商系统</p>
          </div>
          <div className="flex gap-3 text-sm">
            <span className="px-3 py-1 bg-white/20 rounded-full">🚀 实战项目</span>
            <span className="px-3 py-1 bg-white/20 rounded-full">⏱️ 约120分钟</span>
            <span className="px-3 py-1 bg-white/20 rounded-full">📚 8个模块</span>
          </div>
        </div>
      </div>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">项目概述</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-orange-50 border-2 border-orange-200 rounded-lg p-5">
            <h3 className="text-xl font-bold text-orange-900 mb-3">🎯 项目目标</h3>
            <ul className="text-gray-700 space-y-2">
              <li>• 掌握微服务架构设计</li>
              <li>• 熟悉 Spring Cloud Alibaba 全套组件</li>
              <li>• 实践前后端分离开发模式</li>
              <li>• 学习分布式系统开发技能</li>
              <li>• 完成一个可上线的电商系统</li>
            </ul>
          </div>

          <div className="bg-green-50 border-2 border-green-200 rounded-lg p-5">
            <h3 className="text-xl font-bold text-green-900 mb-3">✨ 核心功能</h3>
            <ul className="text-gray-700 space-y-2">
              <li>• 商品浏览与搜索</li>
              <li>• 购物车与订单系统</li>
              <li>• 支付集成与发货</li>
              <li>• 用户权限与优惠券</li>
              <li>• 秒杀与库存管理</li>
            </ul>
          </div>
        </div>

        <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-5">
          <h3 className="text-xl font-bold text-blue-900 mb-3">🏗️ 技术栈</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <p className="font-semibold text-gray-900 mb-2">后端框架</p>
              <p className="text-gray-700">Spring Boot 3.x<br/>Spring Cloud Alibaba 2022<br/>MyBatis-Plus 3.5</p>
            </div>
            <div>
              <p className="font-semibold text-gray-900 mb-2">微服务组件</p>
              <p className="text-gray-700">Nacos (注册/配置)<br/>Sentinel (熔断限流)<br/>Gateway (网关)</p>
            </div>
            <div>
              <p className="font-semibold text-gray-900 mb-2">数据存储</p>
              <p className="text-gray-700">MySQL 8.0<br/>Redis 7.0<br/>RocketMQ 5.0</p>
            </div>
            <div>
              <p className="font-semibold text-gray-900 mb-2">前端技术</p>
              <p className="text-gray-700">Vue 3 + TS<br/>Element Plus<br/>Vite 4.x</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">微服务架构设计</h2>

        <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200 rounded-lg p-6 mb-6">
          <div className="flex flex-wrap items-center justify-center gap-4 text-center">
            <div className="bg-white rounded-lg p-4 shadow-md">
              <div className="text-2xl mb-2">🌐</div>
              <div className="font-bold text-gray-900">Gateway</div>
              <div className="text-xs text-gray-600">API 网关</div>
            </div>
            <div className="text-2xl text-gray-400">→</div>
            <div className="bg-white rounded-lg p-4 shadow-md">
              <div className="text-2xl mb-2">👤</div>
              <div className="font-bold text-gray-900">User</div>
              <div className="text-xs text-gray-600">用户服务</div>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-md">
              <div className="text-2xl mb-2">🛍️</div>
              <div className="font-bold text-gray-900">Product</div>
              <div className="text-xs text-gray-600">商品服务</div>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-md">
              <div className="text-2xl mb-2">📦</div>
              <div className="font-bold text-gray-900">Order</div>
              <div className="text-xs text-gray-600">订单服务</div>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-md">
              <div className="text-2xl mb-2">💳</div>
              <div className="font-bold text-gray-900">Payment</div>
              <div className="text-xs text-gray-600">支付服务</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <ModuleCard
            name="User 服务"
            description="用户注册、登录、权限管理、个人信息"
            tech={["Spring Security", "JWT", "OAuth2"]}
            icon="👤"
            color="bg-blue-50 border-blue-200"
          />
          <ModuleCard
            name="Product 服务"
            description="商品管理、分类、搜索、库存"
            tech={["MyBatis-Plus", "ES", "Redis"]}
            icon="🛍️"
            color="bg-green-50 border-green-200"
          />
          <ModuleCard
            name="Order 服务"
            description="购物车、下单、订单状态、物流"
            tech={["Seata", "RocketMQ", "Redis"]}
            icon="📦"
            color="bg-purple-50 border-purple-200"
          />
          <ModuleCard
            name="Payment 服务"
            description="支付集成、退款、对账"
            tech={["支付宝", "微信支付", "RocketMQ"]}
            icon="💳"
            color="bg-yellow-50 border-yellow-200"
          />
          <ModuleCard
            name="Cart 服务"
            description="购物车管理、数量计算"
            tech={["Redis", "Spring Cache"]}
            icon="🛒"
            color="bg-red-50 border-red-200"
          />
          <ModuleCard
            name="Coupon 服务"
            description="优惠券、满减、折扣"
            tech={["Redis", "规则引擎"]}
            icon="🎫"
            color="bg-pink-50 border-pink-200"
          />
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">数据库设计</h2>

        <div className="bg-white border-2 border-slate-200 rounded-lg p-6 mb-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">核心表结构</h3>
          <CodeBlock
            language="sql"
            code={`-- 用户表
CREATE TABLE user (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL,
    mobile VARCHAR(20) UNIQUE,
    email VARCHAR(100),
    nickname VARCHAR(50),
    avatar VARCHAR(255),
    status TINYINT DEFAULT 1 COMMENT '1正常 0禁用',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_mobile (mobile),
    INDEX idx_username (username)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 商品表
CREATE TABLE product (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    product_name VARCHAR(200) NOT NULL,
    product_desc TEXT,
    category_id BIGINT NOT NULL,
    brand_id BIGINT,
    price DECIMAL(10,2) NOT NULL,
    stock INT DEFAULT 0,
    sales INT DEFAULT 0,
    image_url VARCHAR(255),
    status TINYINT DEFAULT 1 COMMENT '1上架 0下架',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_category (category_id),
    INDEX idx_brand (brand_id),
    INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 订单表
CREATE TABLE \`order\` (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    order_no VARCHAR(50) NOT NULL UNIQUE,
    user_id BIGINT NOT NULL,
    total_amount DECIMAL(10,2) NOT NULL,
    pay_amount DECIMAL(10,2) NOT NULL,
    status TINYINT DEFAULT 0 COMMENT '0待支付 1已支付 2已发货 3已完成 4已取消',
    pay_type TINYINT COMMENT '1支付宝 2微信',
    pay_time DATETIME,
    consignee VARCHAR(50),
    mobile VARCHAR(20),
    address VARCHAR(500),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_user (user_id),
    INDEX idx_order_no (order_no),
    INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 订单明细表
CREATE TABLE order_item (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    order_id BIGINT NOT NULL,
    product_id BIGINT NOT NULL,
    product_name VARCHAR(200),
    product_price DECIMAL(10,2),
    quantity INT DEFAULT 1,
    total_amount DECIMAL(10,2),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_order (order_id),
    INDEX idx_product (product_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 购物车表
CREATE TABLE cart_item (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    product_id BIGINT NOT NULL,
    quantity INT DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE KEY uk_user_product (user_id, product_id),
    INDEX idx_user (user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`}
          />
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">核心业务流程</h2>

        <div className="space-y-6">
          <div className="bg-white border-2 border-slate-200 rounded-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">1. 用户注册登录</h3>
            <CodeBlock
              language="java"
              code={`@RestController
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public Result<User> register(@Valid @RequestBody RegisterRequest request) {
        // 1. 校验验证码
        String cacheKey = "sms:code:" + request.getMobile();
        String cachedCode = redisTemplate.opsForValue().get(cacheKey);
        if (!request.getSmsCode().equals(cachedCode)) {
            return Result.error("验证码错误");
        }

        // 2. 检查用户是否存在
        if (userService.existsByMobile(request.getMobile())) {
            return Result.error("手机号已注册");
        }

        // 3. 密码加密
        String encodedPassword = passwordEncoder.encode(request.getPassword());

        // 4. 创建用户
        User user = new User();
        user.setMobile(request.getMobile());
        user.setPassword(encodedPassword);
        user.setUsername("user" + request.getMobile().substring(7));
        userService.save(user);

        // 5. 生成 JWT Token
        String token = JwtUtil.generateToken(user.getId());

        return Result.success(Map.of("token", token, "user", user));
    }

    @PostMapping("/login")
    public Result<User> login(@RequestBody LoginRequest request) {
        // 1. 查询用户
        User user = userService.getByMobile(request.getMobile());
        if (user == null) {
            return Result.error("用户不存在");
        }

        // 2. 验证密码
        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            return Result.error("密码错误");
        }

        // 3. 检查状态
        if (user.getStatus() == 0) {
            return Result.error("账号已被禁用");
        }

        // 4. 生成 Token
        String token = JwtUtil.generateToken(user.getId());

        // 5. 记录登录日志
        loginLogService.record(user.getId(), request.getIp());

        return Result.success(Map.of("token", token, "user", user));
    }
}`}
            />
          </div>

          <div className="bg-white border-2 border-slate-200 rounded-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">2. 下单流程（分布式事务）</h3>
            <CodeBlock
              language="java"
              code={`@GlobalTransactional(name = "create-order", rollbackFor = Exception.class)
@Service
public class OrderService {

    @Autowired
    private ProductMapper productMapper;
    @Autowired
    private OrderMapper orderMapper;
    @Autowired
    private CartMapper cartMapper;
    @Autowired
    private RocketMQTemplate rocketMQTemplate;

    public Order createOrder(Long userId, List<Long> cartItemIds) {
        // 1. 查询购物车商品
        List<CartItem> cartItems = cartMapper.selectBatchIds(cartItemIds);

        // 2. 校验库存
        for (CartItem item : cartItems) {
            Product product = productMapper.selectById(item.getProductId());
            if (product.getStock() < item.getQuantity()) {
                throw new BusinessException(product.getProductName() + " 库存不足");
            }
        }

        // 3. 创建订单
        Order order = new Order();
        order.setOrderNo(generateOrderNo());
        order.setUserId(userId);
        order.setTotalAmount(calculateTotal(cartItems));
        order.setStatus(0); // 待支付
        orderMapper.insert(order);

        // 4. 扣减库存（本地事务）
        for (CartItem item : cartItems) {
            productMapper.updateStock(item.getProductId(), item.getQuantity());
        }

        // 5. 创建订单明细
        List<OrderItem> orderItems = new ArrayList<>();
        for (CartItem item : cartItems) {
            OrderItem orderItem = new OrderItem();
            orderItem.setOrderId(order.getId());
            orderItem.setProductId(item.getProductId());
            orderItem.setQuantity(item.getQuantity());
            orderItem.setTotalAmount(item.getProductPrice().multiply(new BigDecimal(item.getQuantity())));
            orderItems.add(orderItem);
        }
        orderItemMapper.batchInsert(orderItems);

        // 6. 清空购物车
        cartMapper.deleteBatchIds(cartItemIds);

        // 7. 发送订单创建消息（异步处理）
        OrderCreatedEvent event = new OrderCreatedEvent(order.getId(), order.getOrderNo());
        rocketMQTemplate.syncSend("order-created-topic", event);

        return order;
    }

    // 订单超时取消（延时消息）
    @PostMapping("/cancel/{orderId}")
    public Result<Void> cancelOrder(@PathVariable Long orderId) {
        Order order = orderMapper.selectById(orderId);

        if (order.getStatus() != 0) {
            return Result.error("订单状态不允许取消");
        }

        order.setStatus(4); // 已取消
        orderMapper.updateById(order);

        // 恢复库存
        restoreStock(order.getId());

        return Result.success();
    }
}`}
            />
          </div>

          <div className="bg-white border-2 border-slate-200 rounded-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">3. 支付回调处理</h3>
            <CodeBlock
              language="java"
              code={`@RestController
@RequestMapping("/api/payment")
public class PaymentController {

    @Autowired
    private OrderService orderService;
    @Autowired
    private RocketMQTemplate rocketMQTemplate;

    /**
     * 支付宝异步回调
     */
    @PostMapping("/alipay/notify")
    public String alipayNotify(HttpServletRequest request) {
        // 1. 验证签名
        boolean signVerified = AlipaySignature.rsaCheckV1(
            request.getParameterMap(),
            AlipayConfig.alipay_public_key,
            AlipayConfig.charset,
            AlipayConfig.sign_type
        );

        if (!signVerified) {
            return "fail";
        }

        // 2. 获取订单号
        String orderNo = request.getParameter("out_trade_no");
        String tradeNo = request.getParameter("trade_no");
        String totalAmount = request.getParameter("total_amount");

        // 3. 查询订单
        Order order = orderService.getByOrderNo(orderNo);
        if (order == null) {
            return "fail";
        }

        // 4. 验证金额
        if (order.getPayAmount().compareTo(new BigDecimal(totalAmount)) != 0) {
            return "fail";
        }

        // 5. 更新订单状态（幂等性处理）
        if (order.getStatus() == 0) {
            order.setStatus(1); // 已支付
            order.setPayTime(new Date());
            order.setTradeNo(tradeNo);
            orderService.updateById(order);

            // 6. 发送支付成功消息
            PaymentSuccessEvent event = new PaymentSuccessEvent(
                order.getId(),
                order.getOrderNo(),
                order.getUserId()
            );
            rocketMQTemplate.syncSend("payment-success-topic", event);
        }

        return "success";
    }

    /**
     * 支付成功消费者（更新库存、发货）
     */
    @RocketMQMessageListener(
        topic = "payment-success-topic",
        consumerGroup = "payment-consumer-group"
    )
    public class PaymentSuccessConsumer implements RocketMQListener<PaymentSuccessEvent> {

        @Override
        public void onMessage(PaymentSuccessEvent event) {
            Long orderId = event.getOrderId();

            // 1. 更新商品销量
            orderService.updateSales(orderId);

            // 2. 通知商家发货
            // ...

            // 3. 发送支付成功通知
            // ...
        }
    }
}`}
            />
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">项目实施步骤</h2>

        <div className="space-y-4">
          <StepCard
            step={1}
            title="环境搭建"
            content={[
              "安装 JDK 17、Maven 3.8、Node.js 18",
              "安装 MySQL 8.0、Redis 7.0、RocketMQ 5.0",
              "安装 Nacos 2.x（注册中心 + 配置中心）",
              "配置开发环境 IDE（IDEA + VSCode）",
              "创建父工程 POM 配置依赖管理"
            ]}
          />
          <StepCard
            step={2}
            title="公共模块开发"
            content={[
              "创建 common 模块（实体类、工具类）",
              "统一返回结果 Result<T>",
              "全局异常处理器 @RestControllerAdvice",
              "统一日志切面（TraceId 传递）",
              "通用枚举和常量定义"
            ]}
          />
          <StepCard
            step={3}
            title="用户服务开发"
            content={[
              "用户注册、登录、密码加密",
              "JWT Token 生成与验证",
              "Spring Security 权限配置",
              "OAuth2 第三方登录（微信、QQ）",
              "用户信息修改与头像上传"
            ]}
          />
          <StepCard
            step={4}
            title="商品服务开发"
            content={[
              "商品 CRUD 接口开发",
              "商品分类树形结构",
              "Elasticsearch 商品搜索集成",
              "Redis 商品详情缓存",
              "商品库存扣减与回滚"
            ]}
          />
          <StepCard
            step={5}
            title="订单服务开发"
            content={[
              "购物车 Redis 实现",
              "Seata 分布式事务配置",
              "订单创建与状态流转",
              "RocketMQ 订单延时消息（超时取消）",
              "订单支付回调处理"
            ]}
          />
          <StepCard
            step={6}
            title="支付服务开发"
            content={[
              "支付宝 SDK 集成",
              "微信支付 SDK 集成",
              "支付统一接口封装",
              "支付回调异步处理",
              "退款对账功能"
            ]}
          />
          <StepCard
            step={7}
            title="前端开发"
            content={[
              "Vue 3 + TypeScript 项目初始化",
              "Element Plus 组件库集成",
              "Axios 请求封装与拦截器",
              "Vuex/Pinia 状态管理",
              "路由守卫与权限控制"
            ]}
          />
          <StepCard
            step={8}
            title="部署上线"
            content={[
              "Docker 镜像构建",
              "Kubernetes 部署配置",
              "Nginx 前端部署",
              "CI/CD 流水线配置",
              "监控告警配置"
            ]}
          />
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">技术难点与解决方案</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white border-2 border-red-200 rounded-lg p-5">
            <h3 className="text-lg font-bold text-red-900 mb-3">库存超卖</h3>
            <CodeBlock
              language="java"
              code={`// 方案1: Redis 分布式锁
public void updateStock(Long productId, int quantity) {
    String key = "lock:product:" + productId;
    try {
        // 获取锁
        Boolean locked = redisTemplate.opsForValue()
            .setIfAbsent(key, "1", 30, TimeUnit.SECONDS);

        if (Boolean.TRUE.equals(locked)) {
            // 扣减库存
            productMapper.updateStock(productId, quantity);
        } else {
            throw new BusinessException("系统繁忙，请稍后重试");
        }
    } finally {
        // 释放锁
        redisTemplate.delete(key);
    }
}

// 方案2: 数据库乐观锁
UPDATE product
SET stock = stock - 1, version = version + 1
WHERE id = ? AND version = ? AND stock > 0`}
            />
          </div>

          <div className="bg-white border-2 border-blue-200 rounded-lg p-5">
            <h3 className="text-lg font-bold text-blue-900 mb-3">订单幂等性</h3>
            <CodeBlock
              language="java"
              code={`@Component
public class IdempotentHelper {

    @Autowired
    private RedisTemplate<String, String> redisTemplate;

    public <T> T execute(String key, Supplier<T> action) {
        // 检查是否已执行
        String redisKey = "idempotent:" + key;
        Boolean isNew = redisTemplate.opsForValue()
            .setIfAbsent(redisKey, "1", 5, TimeUnit.MINUTES);

        if (Boolean.FALSE.equals(isNew)) {
            throw new BusinessException("请勿重复提交");
        }

        // 执行业务逻辑
        return action.get();
    }
}

// 使用
@PostMapping("/order")
public Result<Order> createOrder(@RequestBody OrderRequest request) {
    return idempotentHelper.execute(
        "order:" + request.getUserId() + ":" + request.getProductIds(),
        () -> orderService.createOrder(request)
    );
}`}
            />
          </div>

          <div className="bg-white border-2 border-green-200 rounded-lg p-5">
            <h3 className="text-lg font-bold text-green-900 mb-3">购物车并发</h3>
            <CodeBlock
              language="java"
              code={`// Redis Hash 存储购物车
public void addCartItem(Long userId, Long productId, int quantity) {
    String key = "cart:" + userId;

    // 使用 Hash 原子操作
    redisTemplate.opsForHash().put(key,
        String.valueOf(productId),
        String.valueOf(quantity));
}

// Lua 脚本批量获取购物车
public List<CartItem> getCartItems(Long userId) {
    String script =
        "local items = redis.call('HGETALL', KEYS[1]) " +
        "local result = {} " +
        "for i = 1, #items, 2 do " +
        "  table.insert(result, items[i]) " +
        "  table.insert(result, items[i+1]) " +
        "end " +
        "return result";

    return (List<CartItem>) redisTemplate.execute(
        new DefaultRedisScript<>(script, List.class),
        Collections.singletonList("cart:" + userId)
    );
}`}
            />
          </div>

          <div className="bg-white border-2 border-purple-200 rounded-lg p-5">
            <h3 className="text-lg font-bold text-purple-900 mb-3">秒杀系统</h3>
            <CodeBlock
              language="java"
              code={`// 秒杀预热
@PostConstruct
public void initSeckillStock() {
    // 将秒杀库存加载到 Redis
    List<SeckillProduct> products = seckillMapper.selectList(null);
    for (SeckillProduct product : products) {
        String key = "seckill:stock:" + product.getId();
        redisTemplate.opsForValue().set(
            key,
            String.valueOf(product.getStock()),
            1,
            TimeUnit.HOURS
        );
    }
}

// 秒杀下单
public Result<Order> seckill(Long userId, Long productId) {
    // 1. 验证是否已购买
    String purchasedKey = "seckill:purchased:" + userId + ":" + productId;
    if (Boolean.TRUE.equals(redisTemplate.hasKey(purchasedKey))) {
        return Result.error("每人限购一件");
    }

    // 2. 原子扣减库存
    String stockKey = "seckill:stock:" + productId;
    Long stock = redisTemplate.opsForValue().decrement(stockKey);

    if (stock == null || stock < 0) {
        redisTemplate.opsForValue().increment(stockKey); // 回滚
        return Result.error("库存不足");
    }

    // 3. 创建订单（异步）
    Order order = createOrderAsync(userId, productId);

    // 4. 标记已购买
    redisTemplate.opsForValue().set(purchasedKey, "1", 24, TimeUnit.HOURS);

    return Result.success(order);
}`}
            />
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">下一步学习</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <a href="/project-flash-sale" className="block bg-gradient-to-br from-red-50 to-red-100 border-2 border-red-200 rounded-lg p-6 hover:shadow-lg transition">
            <h3 className="text-xl font-bold text-red-900 mb-2">⚡ 秒杀系统</h3>
            <p className="text-gray-700 text-sm">高并发秒杀系统设计与实现</p>
          </a>
          <a href="/project-order" className="block bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-200 rounded-lg p-6 hover:shadow-lg transition">
            <h3 className="text-xl font-bold text-blue-900 mb-2">📦 订单系统</h3>
            <p className="text-gray-700 text-sm">分布式订单系统深度剖析</p>
          </a>
        </div>
      </section>
    </div>
  );
};
