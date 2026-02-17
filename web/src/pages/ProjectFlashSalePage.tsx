import { useState } from 'react';
import { CodeBlock } from '../components';
import { K8sDeploymentCard } from '../components/K8sDeploymentCard';

interface ChallengeCardProps {
  title: string;
  description: string;
  solution: string;
  icon: string;
  color: string;
}

const ChallengeCard: React.FC<ChallengeCardProps> = ({ title, description, solution, icon, color }) => (
  <div className={`${color} border-2 rounded-lg p-5`}>
    <div className="flex items-center gap-3 mb-3">
      <span className="text-3xl">{icon}</span>
      <h3 className="text-xl font-bold text-gray-900">{title}</h3>
    </div>
    <p className="text-gray-700 text-sm mb-3">{description}</p>
    <div className="bg-white/80 rounded p-2">
      <p className="text-xs font-semibold text-gray-900">解决方案：{solution}</p>
    </div>
  </div>
);

interface PhaseCardProps {
  phase: string;
  title: string;
  items: string[];
}

const PhaseCard: React.FC<PhaseCardProps> = ({ phase, title, items }) => (
  <div className="bg-white border-2 border-slate-200 rounded-lg p-6">
    <div className="flex items-start gap-4">
      <div className="bg-red-600 text-white rounded-lg px-3 py-1 font-bold flex-shrink-0">{phase}</div>
      <div className="flex-1">
        <h3 className="text-lg font-bold text-gray-900 mb-3">{title}</h3>
        <ul className="text-sm text-gray-700 space-y-2">
          {items.map((item, idx) => (
            <li key={idx} className="flex items-start">
              <span className="text-green-600 mr-2">✓</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </div>
);

export const ProjectFlashSalePage: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="bg-gradient-to-r from-red-700 to-red-900 text-white rounded-lg p-6 mb-8">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-4xl font-bold mb-2">秒杀系统</h1>
            <p className="text-red-100 text-lg">高并发秒杀系统设计与实现</p>
          </div>
          <div className="flex gap-3 text-sm">
            <span className="px-3 py-1 bg-white/20 rounded-full">🚀 实战项目</span>
            <span className="px-3 py-1 bg-white/20 rounded-full">⏱️ 约90分钟</span>
            <span className="px-3 py-1 bg-white/20 rounded-full">📚 7个模块</span>
          </div>
        </div>
      </div>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">秒杀业务特点</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-red-50 border-2 border-red-200 rounded-lg p-5">
            <h3 className="text-xl font-bold text-red-900 mb-3">⚡ 极高并发</h3>
            <ul className="text-gray-700 space-y-2">
              <li>• 短时间内百万级请求</li>
              <li>• 库存有限，竞争激烈</li>
              <li>• 需要水平扩展能力</li>
            </ul>
          </div>

          <div className="bg-green-50 border-2 border-green-200 rounded-lg p-5">
            <h3 className="text-xl font-bold text-green-900 mb-3">🎯 精准时效</h3>
            <ul className="text-gray-700 space-y-2">
              <li>• 固定时间点开始</li>
              <li>• 持续时间短（几分钟）</li>
              <li>• 需要精确的时间同步</li>
            </ul>
          </div>
        </div>

        <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-5">
          <h3 className="text-xl font-bold text-blue-900 mb-3">📊 典型数据指标</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <p className="font-semibold text-gray-900">QPS</p>
              <p className="text-2xl font-bold text-blue-600">100,000+</p>
            </div>
            <div>
              <p className="font-semibold text-gray-900">用户数</p>
              <p className="text-2xl font-bold text-green-600">1,000,000+</p>
            </div>
            <div>
              <p className="font-semibold text-gray-900">商品库存</p>
              <p className="text-2xl font-bold text-orange-600">1,000</p>
            </div>
            <div>
              <p className="font-semibold text-gray-900">成功率</p>
              <p className="text-2xl font-bold text-purple-600">1%</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">技术难点与解决方案</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ChallengeCard
            title="超卖问题"
            description="库存扣减超出实际库存"
            solution="Redis 原子操作 + Lua 脚本 + 数据库乐观锁"
            icon="📦"
            color="bg-red-50 border-red-200"
          />
          <ChallengeCard
            title="热点数据"
            description="大量请求访问同一商品"
            solution="Redis 缓存 + 本地缓存 + CDN 静态化"
            icon="🔥"
            color="bg-orange-50 border-orange-200"
          />
          <ChallengeCard
            title="恶意刷单"
            description="脚本机器人抢购"
            solution="图形验证码 + 限流 + 黑名单"
            icon="🤖"
            color="bg-yellow-50 border-yellow-200"
          />
          <ChallengeCard
            title="链接暴露"
            description="秒杀 URL 提前泄露"
            solution="动态 URL + 加密 + 签名验证"
            icon="🔒"
            color="bg-green-50 border-green-200"
          />
          <ChallengeCard
            title="数据库崩溃"
            description="瞬间大量写请求"
            solution="Redis 预扣减 + MQ 异步写入"
            icon="💾"
            color="bg-blue-50 border-blue-200"
          />
          <ChallengeCard
            title="消息丢失"
            description="MQ 消息处理失败"
            solution="消息确认机制 + 重试队列 + 死信队列"
            icon="📨"
            color="bg-purple-50 border-purple-200"
          />
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">系统架构设计</h2>

        <div className="bg-gradient-to-r from-red-50 to-orange-50 border-2 border-red-200 rounded-lg p-6 mb-6">
          <div className="flex flex-wrap items-center justify-center gap-4 text-center">
            <div className="bg-white rounded-lg p-3 shadow-md">
              <div className="text-xl mb-1">📱</div>
              <div className="font-bold text-gray-900 text-sm">客户端</div>
            </div>
            <div className="text-2xl text-gray-400">→</div>
            <div className="bg-white rounded-lg p-3 shadow-md">
              <div className="text-xl mb-1">🌐</div>
              <div className="font-bold text-gray-900 text-sm">CDN</div>
            </div>
            <div className="text-2xl text-gray-400">→</div>
            <div className="bg-white rounded-lg p-3 shadow-md">
              <div className="text-xl mb-1">⚖️</div>
              <div className="font-bold text-gray-900 text-sm">负载均衡</div>
            </div>
            <div className="text-2xl text-gray-400">→</div>
            <div className="bg-white rounded-lg p-3 shadow-md">
              <div className="text-xl mb-1">🚪</div>
              <div className="font-bold text-gray-900 text-sm">Gateway</div>
            </div>
            <div className="text-2xl text-gray-400">→</div>
            <div className="bg-white rounded-lg p-3 shadow-md">
              <div className="text-xl mb-1">⚡</div>
              <div className="font-bold text-gray-900 text-sm">秒杀服务</div>
            </div>
            <div className="text-2xl text-gray-400">→</div>
            <div className="bg-white rounded-lg p-3 shadow-md">
              <div className="text-xl mb-1">📦</div>
              <div className="font-bold text-gray-900 text-sm">Redis</div>
            </div>
            <div className="text-2xl text-gray-400">→</div>
            <div className="bg-white rounded-lg p-3 shadow-md">
              <div className="text-xl mb-1">📨</div>
              <div className="font-bold text-gray-900 text-sm">RocketMQ</div>
            </div>
            <div className="text-2xl text-gray-400">→</div>
            <div className="bg-white rounded-lg p-3 shadow-md">
              <div className="text-xl mb-1">🛒</div>
              <div className="font-bold text-gray-900 text-sm">订单服务</div>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">核心代码实现</h2>

        <div className="space-y-6">
          <div className="bg-white border-2 border-slate-200 rounded-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">1. 秒杀商品预热</h3>
            <CodeBlock
              language="java"
              code={`@Component
public class SeckillPreheatService {

    @Autowired
    private RedisTemplate<String, Object> redisTemplate;
    @Autowired
    private SeckillProductMapper productMapper;

    /**
     * 秒杀开始前预热缓存
     */
    @Scheduled(cron = "0 */10 * * * ?") // 每10分钟执行一次
    public void preloadSeckillProducts() {
        // 1. 查询即将开始的秒杀活动
        List<SeckillProduct> products = productMapper.selectUpcomingProducts();

        for (SeckillProduct product : products) {
            String productKey = "seckill:product:" + product.getId();
            String stockKey = "seckill:stock:" + product.getId();

            // 2. 缓存商品信息
            Map<String, Object> productInfo = new HashMap<>();
            productInfo.put("id", product.getId());
            productInfo.put("name", product.getProductName());
            productInfo.put("price", product.getSeckillPrice());
            productInfo.put("startTime", product.getStartTime());
            productInfo.put("endTime", product.getEndTime());
            productInfo.put("stock", product.getStock());

            redisTemplate.opsForHash().putAll(productKey, productInfo);

            // 3. 初始化库存（使用 Redis 计数器）
            redisTemplate.opsForValue().set(stockKey, product.getStock().toString());

            // 4. 设置过期时间
            long duration = ChronoUnit.MILLIS.between(
                LocalDateTime.now(),
                product.getEndTime()
            );
            redisTemplate.expire(productKey, duration, TimeUnit.MILLISECONDS);
            redisTemplate.expire(stockKey, duration, TimeUnit.MILLISECONDS);

            log.info("预热秒杀商品: {}", product.getProductName());
        }
    }

    /**
     * 本地缓存加速（减少 Redis 访问）
     */
    @Component
    public class SeckillLocalCache {

        private final LoadingCache<String, SeckillProduct> localCache =
            Caffeine.newBuilder()
                .maximumSize(1000)
                .expireAfterWrite(1, TimeUnit.MINUTES)
                .build(new CacheLoader<String, SeckillProduct>() {
                    @Override
                    public SeckillProduct load(String key) {
                        // 从 Redis 加载
                        return redisTemplate.opsForHash()
                            .entries("seckill:product:" + key);
                    }
                });

        public SeckillProduct getProduct(Long productId) {
            try {
                return localCache.get(productId.toString());
            } catch (Exception e) {
                log.error("获取秒杀商品失败", e);
                return null;
            }
        }
    }
}`}
            />
          </div>

          <div className="bg-white border-2 border-slate-200 rounded-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">2. Redis 原子扣减库存（Lua 脚本）</h3>
            <CodeBlock
              language="java"
              code={`@Service
public class SeckillService {

    @Autowired
    private StringRedisTemplate redisTemplate;

    // Lua 脚本：原子性检查并扣减库存
    private static final String STOCK_DEDUCT_SCRIPT =
        "local key = KEYS[1] " +
        "local userId = ARGV[1] " +
        "local purchasedKey = 'seckill:purchased:' .. key .. ':' .. userId " +
        "-- 检查是否重复购买 " +
        "if redis.call('exists', purchasedKey) == 1 then " +
        "  return -1 " +
        "end " +
        "-- 原子扣减库存 " +
        "local stock = redis.call('get', key) " +
        "if tonumber(stock) <= 0 then " +
        "  return 0 " +
        "end " +
        "redis.call('decr', key) " +
        "-- 标记已购买 " +
        "redis.call('set', purchasedKey, '1', 'EX', 3600) " +
        "return 1 ";

    /**
     * 秒杀下单
     * @return -1: 重复购买, 0: 库存不足, 1: 成功
     */
    public int doSeckill(Long userId, Long productId) {
        String script =
            "local key = KEYS[1] " +
            "local userId = ARGV[1] " +
            "local purchasedKey = 'seckill:purchased:' .. key .. ':' .. userId " +
            "if redis.call('exists', purchasedKey) == 1 then " +
            "  return -1 " +
            "end " +
            "local stock = redis.call('get', key) " +
            "if tonumber(stock) <= 0 then " +
            "  return 0 " +
            "end " +
            "redis.call('decr', key) " +
            "redis.call('set', purchasedKey, '1', 'EX', 3600) " +
            "return 1";

        DefaultRedisScript<Long> redisScript =
            new DefaultRedisScript<>(script, Long.class);
        redisScript.setKeys(Collections.singletonList("seckill:stock:" + productId));
        redisScript.setArgs(Collections.singletonList(userId.toString()));

        Long result = redisTemplate.execute(redisScript);

        // 异步创建订单
        if (result == 1) {
            createOrderAsync(userId, productId);
        }

        return result.intValue();
    }

    /**
     * 异步创建订单（使用 MQ）
     */
    @Async
    public void createOrderAsync(Long userId, Long productId) {
        SeckillOrder order = new SeckillOrder();
        order.setUserId(userId);
        order.setProductId(productId);
        order.setOrderNo(generateOrderNo());
        order.setStatus(0); // 待支付

        // 发送到 MQ
        rocketMQTemplate.syncSend("seckill-order-topic", order);
    }
}`}
            />
          </div>

          <div className="bg-white border-2 border-slate-200 rounded-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">3. 接口限流保护</h3>
            <CodeBlock
              language="java"
              code={`@RestController
@RequestMapping("/api/seckill")
public class SeckillController {

    /**
     * Sentinel 限流配置
     */
    @Init
    public void initFlowRules() {
        List<FlowRule> rules = new ArrayList<>();
        FlowRule rule = new FlowRule();
        rule.setResource("doSeckill");
        rule.setGrade(RuleConstant.FLOW_GRADE_QPS);
        rule.setCount(10000); // 每秒最多 10000 个请求
        rule.setControlBehavior(CONTROL_BEHAVIOR_DEFAULT);
        rules.add(rule);
        FlowRuleManager.loadRules(rules);
    }

    /**
     * 秒杀接口
     */
    @PostMapping("/{productId}/do-seckill")
    @SentinelResource(
        value = "doSeckill",
        blockHandler = "handleBlock",
        fallback = "handleFallback"
    )
    public Result<SeckillResult> doSeckill(
            @PathVariable Long productId,
            @RequestHeader("X-User-Id") Long userId) {

        // 1. 参数校验
        if (userId == null) {
            return Result.error("请先登录");
        }

        // 2. 验证秒杀活动时间
        SeckillProduct product = seckillService.getProduct(productId);
        if (product == null) {
            return Result.error("商品不存在");
        }

        LocalDateTime now = LocalDateTime.now();
        if (now.isBefore(product.getStartTime())) {
            return Result.error("秒杀未开始");
        }
        if (now.isAfter(product.getEndTime())) {
            return Result.error("秒杀已结束");
        }

        // 3. 执行秒杀
        int result = seckillService.doSeckill(userId, productId);

        if (result == -1) {
            return Result.error("每人限购一件，请勿重复购买");
        } else if (result == 0) {
            return Result.error("库存不足");
        } else {
            SeckillResult seckillResult = new SeckillResult();
            seckillResult.setOrderNo(generateOrderNo(userId, productId));
            seckillResult.setMessage("秒杀成功，请在 5 分钟内完成支付");
            return Result.success(seckillResult);
        }
    }

    /**
     * 限流降级处理
     */
    public Result<SeckillResult> handleBlock(Long userId, Long productId, BlockException ex) {
        return Result.error("系统繁忙，请稍后重试");
    }

    /**
     * 异常降级处理
     */
    public Result<SeckillResult> handleFallback(Long userId, Long productId, Throwable ex) {
        log.error("秒杀异常: userId={}, productId={}", userId, productId, ex);
        return Result.error("服务异常，请稍后重试");
    }
}`}
            />
          </div>

          <div className="bg-white border-2 border-slate-200 rounded-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">4. 动态秒杀 URL（防刷）</h3>
            <CodeBlock
              language="java"
              code={`@Component
public class SeckillUrlService {

    @Value("\${seckill.secret}")
    private String secret;

    /**
     * 生成动态秒杀 URL
     */
    public String generateSeckillUrl(Long userId, Long productId) {
        // 1. 生成随机路径
        String randomPath = UUID.randomUUID().toString().replace("-", "");

        // 2. 生成签名
        String timestamp = String.valueOf(System.currentTimeMillis());
        String sign = DigestUtils.md5Hex(userId + productId + timestamp + secret);

        // 3. 加密参数
        String params = Base64.getUrlEncoder().encodeToString(
            (userId + ":" + productId + ":" + timestamp + ":" + sign).getBytes()
        );

        return "/seckill/" + randomPath + "/" + params + ".html";
    }

    /**
     * 验证秒杀 URL
     */
    public boolean validateSeckillUrl(String path, String encodedParams) {
        try {
            // 1. 解码参数
            String params = new String(Base64.getUrlDecoder().decode(encodedParams));
            String[] parts = params.split(":");

            if (parts.length != 4) {
                return false;
            }

            Long userId = Long.parseLong(parts[0]);
            Long productId = Long.parseLong(parts[1]);
            Long timestamp = Long.parseLong(parts[2]);
            String sign = parts[3];

            // 2. 验证时效性（5分钟有效期）
            long elapsed = System.currentTimeMillis() - timestamp;
            if (elapsed > 300000) {
                return false;
            }

            // 3. 验证签名
            String expectedSign = DigestUtils.md5Hex(
                userId + productId + timestamp + secret
            );

            return expectedSign.equals(sign);

        } catch (Exception e) {
            log.error("验证秒杀 URL 失败", e);
            return false;
        }
    }
}

/**
 * 前端获取秒杀链接
 */
@GetMapping("/{productId}/seckill-url")
public Result<String> getSeckillUrl(
        @PathVariable Long productId,
        @RequestHeader("X-User-Id") Long userId) {

    // 1. 验证用户资格
    if (!seckillService.checkQualified(userId, productId)) {
        return Result.error("不符合秒杀条件");
    }

    // 2. 生成动态 URL
    String seckillUrl = seckillUrlService.generateSeckillUrl(userId, productId);

    return Result.success(seckillUrl);
}`}
            />
          </div>

          <div className="bg-white border-2 border-slate-200 rounded-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">5. 订单消息消费（RocketMQ）</h3>
            <CodeBlock
              language="java"
              code={`/**
 * 订单创建消费者
 */
@RocketMQMessageListener(
    topic = "seckill-order-topic",
    consumerGroup = "seckill-order-consumer-group",
    consumeMode = ConsumeMode.CONCURRENTLY // 并发消费
)
public class SeckillOrderConsumer implements RocketMQListener<SeckillOrder> {

    @Autowired
    private SeckillOrderMapper orderMapper;
    @Autowired
    private SeckillProductMapper productMapper;
    @Autowired
    private AlipayService alipayService;

    @Override
    public void onMessage(SeckillOrder message) {
        try {
            log.info("收到秒杀订单: {}", message);

            // 1. 创建订单
            createOrder(message);

            // 2. 扣减数据库库存（异步）
            deductDbStock(message.getProductId());

            // 3. 发送支付消息
            sendPaymentMessage(message);

        } catch (Exception e) {
            log.error("处理秒杀订单失败: {}", message, e);

            // 失败重试（最多 3 次）
            throw e; // RocketMQ 会自动重试
        }
    }

    /**
     * 创建订单记录
     */
    @Transactional
    public void createOrder(SeckillOrder seckillOrder) {
        // 查询商品价格
        SeckillProduct product = productMapper.selectById(seckillOrder.getProductId());

        // 创建订单
        Order order = new Order();
        order.setOrderNo(seckillOrder.getOrderNo());
        order.setUserId(seckillOrder.getUserId());
        order.setProductId(seckillOrder.getProductId());
        order.setTotalAmount(product.getSeckillPrice());
        order.setStatus(0); // 待支付
        order.setOrderType(2); // 秒杀订单
        order.setCreateTime(LocalDateTime.now());

        orderMapper.insert(order);

        log.info("创建秒杀订单成功: orderNo={}", order.getOrderNo());
    }

    /**
     * 扣减数据库库存（最终一致性）
     */
    private void deductDbStock(Long productId) {
        // 使用乐观锁扣减
        int updated = productMapper.updateStockWithVersion(
            productId,
            1
        );

        if (updated == 0) {
            log.error("扣减数据库库存失败: productId={}", productId);
            // 发送告警
            sendAlert("库存扣减失败，需要人工介入");
        }
    }

    /**
     * 发送支付消息
     */
    private void sendPaymentMessage(SeckillOrder order) {
        PaymentMessage message = new PaymentMessage();
        message.setOrderNo(order.getOrderNo());
        message.setAmount(order.getTotalAmount());
        message.setExpireTime(5); // 5 分钟未支付自动取消

        rocketMQTemplate.syncSend("payment-topic", message);
    }
}

/**
 * 死信队列处理（消费失败的消息）
 */
@RocketMQMessageListener(
    topic = "%DLQ%seckill-order-topic",
    consumerGroup = "seckill-order-dlq-group"
)
public class SeckillOrderDlqConsumer implements RocketMQListener<SeckillOrderExt> {

    @Autowired
    private AlertService alertService;

    @Override
    public void onMessage(SeckillOrderExt message) {
        log.error("死信队列消息: {}", message);

        // 1. 记录失败日志
        logRepository.saveFailedLog(message);

        // 2. 发送告警通知
        alertService.sendAlert("秒杀订单处理失败，需要人工介入: " + message);

        // 3. 可以选择人工处理或自动重试
    }
}`}
            />
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">前端优化策略</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white border-2 border-blue-200 rounded-lg p-5">
            <h3 className="text-lg font-bold text-blue-900 mb-3">CDN 加速</h3>
            <CodeBlock
              language="javascript"
              code={`// 静态资源 CDN
module.exports = {
  output: {
    publicPath: 'https://cdn.example.com/static/',
  },
  chainWebpack: config => {
    config.plugin('html').tap(args => {
      args[0].cdn = true;
    });
  }
};

// HTML 使用 CDN
<link href="https://cdn.example.com/static/css/app.css" rel="stylesheet">
<script src="https://cdn.example.com/static/js/app.js"></script>`}
            />
          </div>

          <div className="bg-white border-2 border-green-200 rounded-lg p-5">
            <h3 className="text-lg font-bold text-green-900 mb-3">页面静态化</h3>
            <CodeBlock
              language="javascript"
              code={`// 秒杀详情页静态化
const express = require('express');
const app = express();

// 生成静态 HTML
app.get('/seckill/:productId.html', async (req, res) => {
  const productId = req.params.productId;

  // 从 Redis 或数据库获取商品信息
  const product = await getProduct(productId);

  // 渲染静态 HTML
  const html = renderSeckillPage(product);

  // 设置缓存
  res.set('Cache-Control', 'public, max-age=10');
  res.send(html);
});`}
            />
          </div>

          <div className="bg-white border-2 border-orange-200 rounded-lg p-5">
            <h3 className="text-lg font-bold text-orange-900 mb-3">时间同步</h3>
            <CodeBlock
              language="javascript"
              code={`// 服务器时间同步
async function getServerTime() {
  const response = await fetch('/api/server-time');
  const serverTime = await response.json();

  // 计算本地与服务器时间差
  const timeDiff = new Date(serverTime).getTime() - Date.now();

  // 保存时间差
  localStorage.setItem('timeDiff', timeDiff);

  return serverTime;
}

// 显示倒计时
function startCountdown(serverStartTime) {
  const serverTime = getServerTime();
  const startTime = new Date(serverStartTime).getTime();

  setInterval(() => {
    const now = Date.now() + parseInt(localStorage.getItem('timeDiff'));
    const remaining = startTime - now;
    // 显示倒计时...
  }, 1000);
}`}
            />
          </div>

          <div className="bg-white border-2 border-purple-200 rounded-lg p-5">
            <h3 className="text-lg font-bold text-purple-900 mb-3">按钮置灰</h3>
            <CodeBlock
              language="vue"
              code={`<template>
  <button
    :disabled="!canSeckill"
    @click="doSeckill"
    :class="{ 'opacity-50': !canSeckill }"
  >
    {{ buttonText }}
  </button>
</template>

<script setup>
import { ref, computed } from 'vue';

const canSeckill = ref(false);
const buttonText = ref('即将开始');

const checkSeckillStatus = () => {
  const now = Date.now();
  const startTime = new Date(product.startTime).getTime();
  const endTime = new Date(product.endTime).getTime();

  if (now < startTime) {
    canSeckill.value = false;
    buttonText.value = '即将开始';
  } else if (now > endTime) {
    canSeckill.value = false;
    buttonText.value = '已结束';
  } else {
    canSeckill.value = true;
    buttonText.value = '立即抢购';
  }
};

// 每秒检查状态
setInterval(checkSeckillStatus, 1000);
</script>`}
            />
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">秒杀流程详解</h2>

        <div className="space-y-4">
          <PhaseCard
            phase="阶段1"
            title="秒杀前（准备阶段）"
            items={[
              "数据库创建秒杀商品和库存",
              "Redis 预热商品信息和库存",
              "配置限流规则（Sentinel）",
              "部署服务，准备扩容",
              "前端静态资源上传 CDN"
            ]}
          />
          <PhaseCard
            phase="阶段2"
            title="秒杀中（执行阶段）"
            items={[
              "用户点击秒杀按钮",
              "动态 URL 验证签名",
              "Sentinel 限流过滤",
              "Redis Lua 脚本原子扣减库存",
              "发送 MQ 消息异步创建订单"
            ]}
          />
          <PhaseCard
            phase="阶段3"
            title="秒杀后（处理阶段）"
            items={[
              "MQ 消费者处理订单消息",
              "创建订单记录",
              "扣减数据库库存",
              "发送支付消息",
              "超时未支付自动取消订单"
            ]}
          />
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">常见问题 FAQ</h2>

        <div className="space-y-4">
          <div className="bg-white border-2 border-gray-200 rounded-lg overflow-hidden">
            <button
              onClick={() => toggleFaq(1)}
              className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
            >
              <h3 className="text-lg font-bold text-gray-900">
                1. 如何防止用户通过脚本抢购？
              </h3>
              <span className="text-2xl text-gray-400">{openFaq === 1 ? '−' : '+'}</span>
            </button>
            {openFaq === 1 && (
              <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                <div className="text-gray-700 whitespace-pre-line">防脚本抢购方案：

1. 图形验证码
   - 秒杀前显示滑块拼图验证码
   - 验证通过后才显示秒杀按钮
   - 防止自动化脚本

2. 限流策略
   ```java
   @SentinelResource(value = "seckill")
   public Result doSeckill() {
       // 单用户限流：每秒最多 1 次请求
       // IP 限流：每个 IP 每秒最多 10 次请求
   }
   ```

3. 黑名单机制
   - 识别异常行为（高频请求、固定模式）
   - 自动加入黑名单
   - 黑名单用户禁止参与秒杀

4. 动态 URL
   - 每次请求生成不同的 URL
   - URL 包含时间戳和签名
   - 防止脚本提前知道 URL

5. 行为分析
   - 收集用户点击行为数据
   - 机器学习识别机器人
   - 实时拦截异常流量</div>
              </div>
            )}
          </div>

          <div className="bg-white border-2 border-gray-200 rounded-lg overflow-hidden">
            <button
              onClick={() => toggleFaq(2)}
              className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
            >
              <h3 className="text-lg font-bold text-gray-900">
                2. Redis 挂了怎么办？
              </h3>
              <span className="text-2xl text-gray-400">{openFaq === 2 ? '−' : '+'}</span>
            </button>
            {openFaq === 2 && (
              <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                <div className="text-gray-700 whitespace-pre-line">Redis 高可用方案：

1. Redis 集群
   ```yaml
   spring:
     redis:
       sentinel:
         master: mymaster
         nodes:
           - host: redis-sentinel-1:26379
           - host: redis-sentinel-2:26379
           - host: redis-sentinel-3:26379
   ```

2. 多级缓存降级
   ```java
   // L1: 本地缓存
   Product product = localCache.get(productId);
   if (product != null) return product;

   // L2: Redis 缓存
   product = redisTemplate.opsForHash().get("seckill:product:" + productId);
   if (product != null) &lbrace;
       localCache.put(productId, product);
       return product;
   &rbrace;

   // L3: 数据库查询
   product = productMapper.selectById(productId);
   ```

3. 限流降级
   - Redis 故障时自动降级到数据库
   - 降低 QPS，保护数据库
   - 提示用户"系统繁忙，请稍后重试"

4. 数据持久化
   - 秒杀订单先写入数据库
   - Redis 恢复后异步同步
   - 保证数据不丢失</div>
              </div>
            )}
          </div>

          <div className="bg-white border-2 border-gray-200 rounded-lg overflow-hidden">
            <button
              onClick={() => toggleFaq(3)}
              className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
            >
              <h3 className="text-lg font-bold text-gray-900">
                3. 如何保证库存数据一致性？
              </h3>
              <span className="text-2xl text-gray-400">{openFaq === 3 ? '−' : '+'}</span>
            </button>
            {openFaq === 3 && (
              <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                <div className="text-gray-700 whitespace-pre-line">库存一致性保证：

1. Redis 预扣减（高性能）
   - Lua 脚本保证原子性
   - 内存操作，毫秒级响应
   - 支撑百万级 QPS

2. 异步扣减数据库（最终一致性）
   - MQ 消息异步处理
   - 乐观锁防止超卖
   ```sql
   UPDATE seckill_product
   SET stock = stock - 1, version = version + 1
   WHERE id = ? AND version = ? AND stock &gt; 0
   ```

3. 定时对账（纠错机制）
   - 每小时对比 Redis 和数据库库存
   - 发现不一致立即告警
   - 人工介入修复

4. 库存回滚
   - 订单超时未支付，回滚库存
   - 支付失败，回滚库存
   - 退款成功，回滚库存

5. 监控告警
   - Redis 库存与数据库库存差异告警
   - 订单量与库存扣减量对比
   - 异常订单实时告警</div>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">性能优化建议</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-red-50 border-2 border-red-200 rounded-lg p-5">
            <h3 className="text-lg font-bold text-red-900 mb-3">应用层优化</h3>
            <ul className="text-sm text-gray-700 space-y-2">
              <li>✓ 使用多级缓存（本地 + Redis）</li>
              <li>✓ Lua 脚本减少 Redis 网络往返</li>
              <li>✓ 异步处理非核心逻辑</li>
              <li>✓ 连接池预热与合理配置</li>
              <li>✓ JVM 参数调优（G1GC）</li>
            </ul>
          </div>

          <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-5">
            <h3 className="text-lg font-bold text-blue-900 mb-3">架构层优化</h3>
            <ul className="text-sm text-gray-700 space-y-2">
              <li>✓ CDN 加速静态资源</li>
              <li>✓ 页面静态化减少服务器压力</li>
              <li>✓ 负载均衡（Nginx + LVS）</li>
              <li>✓ 服务熔断降级（Sentinel）</li>
              <li>✓ 水平扩展（K8s HPA）</li>
            </ul>
          </div>
        </div>
      </section>

      <K8sDeploymentCard projectType="flash-sale" />

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">下一步学习</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <a href="/project-order" className="block bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-200 rounded-lg p-6 hover:shadow-lg transition">
            <h3 className="text-xl font-bold text-blue-900 mb-2">📦 订单系统</h3>
            <p className="text-gray-700 text-sm">分布式订单系统深度剖析</p>
          </a>
          <a href="/project-payment" className="block bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-200 rounded-lg p-6 hover:shadow-lg transition">
            <h3 className="text-xl font-bold text-green-900 mb-2">💳 支付系统</h3>
            <p className="text-gray-700 text-sm">支付集成与对账系统</p>
          </a>
        </div>
      </section>
    </div>
  );
};
