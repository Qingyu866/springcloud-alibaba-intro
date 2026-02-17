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

export const DesignQuestionsPage: React.FC = () => {
  const [openCategory, setOpenCategory] = useState<string | null>(null);
  const [openQuestion, setOpenQuestion] = useState<number | null>(null);

  const designData = {
    ecommerce: {
      title: "电商系统设计",
      icon: "🛒",
      questions: [
        {
          q: "设计一个秒杀系统",
          a: "秒杀系统核心挑战：\n\n1. **超高并发**：百万级用户同时抢购\n2. **库存一致性**：防止超卖\n3. **防刷**：防止机器刷单\n\n**系统设计**：\n\n**架构分层**：\n```\n用户 → CDN → WAF → Gateway → 秒杀服务 → 库存服务\n                                      ↓\n                                   MQ → 订单服务 → MySQL\n```",
          code: { language: "java", content: `@Service
public class SeckillService {

    @Autowired
    private RedisTemplate<String, Object> redisTemplate;

    @Autowired
    private RocketMQTemplate rocketMQTemplate;

    /**
     * 秒杀下单
     * 1. Redis 预减库存（原子操作）
     * 2. MQ 异步下单
     */
    @SentinelResource(value = "seckill", blockHandler = "handleBlock")
    public Result seckill(Long userId, Long productId) {
        // 1. 校验用户是否已购买
        String userKey = "seckill:order:" + userId + ":" + productId;
        if (Boolean.TRUE.equals(redisTemplate.hasKey(userKey))) {
            return Result.error("重复购买");
        }

        // 2. Redis 原子扣减库存（Lua脚本）
        String script = "local stock = redis.call('get', KEYS[1]) " +
                        "if tonumber(stock) > 0 then " +
                        "  redis.call('decr', KEYS[1]) " +
                        "  redis.call('set', KEYS[2], '1') " +
                        "  return 1 " +
                        "else " +
                        "  return 0 " +
                        "end";
        DefaultRedisScript<Long> redisScript = new DefaultRedisScript<>(script, Long.class);
        Long result = redisTemplate.execute(
            redisScript,
            Arrays.asList("seckill:stock:" + productId, userKey)
        );

        if (result == 0) {
            return Result.error("库存不足");
        }

        // 3. 发送 MQ 消息异步创建订单
        SeckillMessage message = new SeckillMessage(userId, productId);
        rocketMQTemplate.asyncSend("seckill-topic", message, new SendCallback() {
            @Override
            public void onSuccess(SendResult sendResult) {
                log.info("MQ消息发送成功");
            }

            @Override
            public void onException(Throwable e) {
                // 失败则回滚库存
                redisTemplate.opsForValue().increment("seckill:stock:" + productId);
                redisTemplate.delete(userKey);
            }
        });

        return Result.success("抢购成功，请等待下单");
    }
}` }
        },
        {
          q: "设计一个分布式订单系统",
          a: "订单系统设计要点：\n\n**核心功能**：\n1. 订单创建、支付、发货、完成、取消\n2. 订单状态机管理\n3. 分布式事务保证\n\n**技术架构**：\n- **服务拆分**：订单服务、支付服务、库存服务、物流服务\n- **数据库设计**：订单表、订单商品表、订单状态日志表\n- **分布式事务**：Seata AT 模式\n- **最终一致性**：本地消息表 + MQ",
          code: { language: "java", content: `@Service
public class OrderService {

    @GlobalTransactional(name = "create-order", rollbackFor = Exception.class)
    public Order createOrder(OrderRequest request) {
        // 1. 创建订单（本地事务）
        Order order = buildOrder(request);
        orderMapper.insert(order);

        // 2. 调用库存服务扣减库存（远程事务）
        InventoryDTO inventory = new InventoryDTO();
        inventory.setProductId(request.getProductId());
        inventory.setCount(request.getCount());
        inventoryClient.deduct(inventory);

        // 3. 调用优惠券服务扣减优惠券（远程事务）
        if (request.getCouponId() != null) {
            CouponDTO coupon = new CouponDTO();
            coupon.setId(request.getCouponId());
            coupon.setUserId(request.getUserId());
            couponClient.use(coupon);
        }

        return order;
    }

    /**
     * 订单状态机
     * 待支付 → 已支付 → 已发货 → 已完成
     *    ↓        ↓
     *  已取消   已取消
     */
    public void changeStatus(Long orderId, OrderStatus from, OrderStatus to) {
        Order order = orderMapper.selectById(orderId);
        if (order.getStatus() != from) {
            throw new BusinessException("订单状态不正确");
        }

        // 状态流转规则
        if (!canTransition(from, to)) {
            throw new BusinessException("不允许的状态转换");
        }

        order.setStatus(to);
        orderMapper.updateById(order);

        // 记录状态变更日志
        OrderStatusLog log = new OrderStatusLog(orderId, from, to);
        statusLogMapper.insert(log);

        // 触发后续动作
        if (to == OrderStatus.PAID) {
            // 支付成功，通知发货
            notifyDelivery(orderId);
        }
    }
}` }
        },
        {
          q: "设计一个商品搜索系统",
          a: "商品搜索系统设计：\n\n**技术选型**：\n- **搜索引擎**：Elasticsearch\n- **数据同步**：Canal 监听 MySQL binlog\n- **搜索服务**：独立微服务\n\n**核心功能**：\n1. 全文检索\n2. 聚合筛选（品牌、价格、分类）\n3. 搜索建议\n4. 热词统计",
          code: { language: "java", content: `@Service
public class SearchService {

    @Autowired
    private RestHighLevelClient esClient;

    /**
     * 商品搜索
     */
    public SearchResult search(SearchRequest request) {
        // 1. 构建查询条件
        BoolQueryBuilder query = QueryBuilders.boolQuery();

        // 关键词搜索
        if (StringUtils.isNotBlank(request.getKeyword())) {
            query.must(QueryBuilders.multiMatchQuery(request.getKeyword(),
                "productName", "description", "brand")
                .field("productName", 2.0f));  // 商品名权重更高
        }

        // 价格范围
        if (request.getMinPrice() != null || request.getMaxPrice() != null) {
            RangeQueryBuilder rangeQuery = QueryBuilders.rangeQuery("price");
            if (request.getMinPrice() != null) {
                rangeQuery.gte(request.getMinPrice());
            }
            if (request.getMaxPrice() != null) {
                rangeQuery.lte(request.getMaxPrice());
            }
            query.filter(rangeQuery);
        }

        // 分类筛选
        if (request.getCategoryId() != null) {
            query.filter(QueryBuilders.termQuery("categoryId", request.getCategoryId()));
        }

        // 2. 构建聚合
        NativeSearchQueryBuilder searchQuery = new NativeSearchQueryBuilder()
            .withQuery(query)
            .withPageable(PageRequest.of(request.getPageNum(), request.getPageSize()))
            .withSort(SortBuilders.fieldSort(request.getSortField())
                .order(request.getSortOrder()))
            .addAggregation(AggregationBuilders.terms("brand_agg").field("brand"))
            .addAggregation(AggregationBuilders.range("price_range")
                .addField("price")
                .addRange(0, 100)
                .addRange(100, 500)
                .addRange(500, 1000)
                .addRange(1000, null));

        // 3. 执行搜索
        SearchHits<ProductDoc> hits = esClient.search(searchQuery.build(), ProductDoc.class);

        // 4. 构建结果
        SearchResult result = new SearchResult();
        result.setProducts(hits.getSearchHits().stream()
            .map(SearchHit::getContent)
            .collect(Collectors.toList()));
        result.setTotal(hits.getTotalHits());

        // 聚合结果
        Aggregations aggregations = hits.getAggregations();
        result.setBrandAgg(((Terms) aggregations.get("brand_agg")).getBuckets());
        result.setPriceRangeAgg(((Range) aggregations.get("price_range")).getBuckets());

        return result;
    }
}` }
        }
      ]
    },
    payment: {
      title: "支付系统设计",
      icon: "💳",
      questions: [
        {
          q: "设计一个支付系统",
          a: "支付系统核心要点：\n\n**设计目标**：\n1. **高可用性**：支付服务不能中断\n2. **数据一致性**：支付状态与订单状态一致\n3. **安全性**：防重放、防篡改\n4. **幂等性**：重复请求只处理一次\n\n**核心流程**：\n1. 用户发起支付\n2. 创建支付订单（本地消息表）\n3. 调用第三方支付\n4. 支付回调\n5. 更新支付状态\n6. 通知业务方",
          code: { language: "java", content: `@Service
public class PaymentService {

    @Autowired
    private PaymentOrderMapper paymentOrderMapper;

    @Autowired
    private LocalMessageMapper localMessageMapper;

    @Autowired
    private RocketMQTemplate rocketMQTemplate;

    /**
     * 创建支付订单
     */
    @Transactional
    public PaymentOrder createPayment(PaymentRequest request) {
        // 1. 幂等性检查
        PaymentOrder existing = paymentOrderMapper.selectByBizNo(request.getBizNo());
        if (existing != null) {
            return existing;
        }

        // 2. 创建支付订单
        PaymentOrder paymentOrder = new PaymentOrder();
        paymentOrder.setBizNo(request.getBizNo());
        paymentOrder.setAmount(request.getAmount());
        paymentOrder.setUserId(request.getUserId());
        paymentOrder.setStatus(PaymentStatus.PENDING);
        paymentOrderMapper.insert(paymentOrder);

        // 3. 写入本地消息表（保证消息可靠发送）
        LocalMessage message = new LocalMessage();
        message.setTopic("payment-topic");
        message.setContent(JSON.toJSONString(paymentOrder));
        message.setStatus(MessageStatus.SENDING);
        localMessageMapper.insert(message);

        // 4. 发送 MQ 消息
        rocketMQTemplate.asyncSend("payment-topic", paymentOrder);

        return paymentOrder;
    }

    /**
     * 支付回调（第三方支付平台回调）
     */
    @Transactional
    public void handleCallback(PaymentCallback callback) {
        // 1. 验签（防止伪造回调）
        if (!verifySign(callback)) {
            throw new SecurityException("签名验证失败");
        }

        // 2. 查询支付订单
        PaymentOrder paymentOrder = paymentOrderMapper.selectByOrderNo(callback.getOrderNo());
        if (paymentOrder == null) {
            throw new BusinessException("支付订单不存在");
        }

        // 3. 幂等性检查（防止重复回调）
        if (paymentOrder.getStatus() == PaymentStatus.SUCCESS) {
            log.info("支付订单已处理，orderNo={}", callback.getOrderNo());
            return;
        }

        // 4. 更新支付状态
        paymentOrder.setStatus(PaymentStatus.SUCCESS);
        paymentOrder.setChannelOrderNo(callback.getChannelOrderNo());
        paymentOrder.setPaidTime(callback.getPaidTime());
        paymentOrderMapper.updateById(paymentOrder);

        // 5. 发送支付成功消息
        PaymentSuccessMessage successMsg = new PaymentSuccessMessage(paymentOrder);
        rocketMQTemplate.asyncSend("payment-success-topic", successMsg);
    }
}` }
        },
        {
          q: "如何保证支付系统的幂等性？",
          a: "支付系统幂等性保证：\n\n**1. 创建支付订单幂等**\n- 使用业务订单号作为唯一索引\n- 重复请求返回已创建的支付订单\n\n**2. 支付回调幂等**\n- 检查支付状态，已成功则直接返回\n- 使用分布式锁防止并发\n\n**3. 支付请求幂等**\n- 前端生成唯一 requestId\n- 后端缓存 requestId，重复请求直接返回",
          code: { language: "java", content: `@Component
public class PaymentIdempotentChecker {

    @Autowired
    private RedisTemplate<String, String> redisTemplate;

    /**
     * 检查并设置幂等标识
     * @return true 表示首次请求，false 表示重复请求
     */
    public boolean checkAndSet(String idempotentKey, long expireSeconds) {
        String key = "payment:idempotent:" + idempotentKey;

        // setIfAbsent 是原子操作，保证并发安全
        Boolean success = redisTemplate.opsForValue()
            .setIfAbsent(key, "1", expireSeconds, TimeUnit.SECONDS);

        return Boolean.TRUE.equals(success);
    }

    /**
     * 释放幂等标识（用于失败场景）
     */
    public void release(String idempotentKey) {
        String key = "payment:idempotent:" + idempotentKey;
        redisTemplate.delete(key);
    }
}

// 使用示例
@Service
public class PaymentService {

    public PaymentOrder pay(PayRequest request) {
        // 1. 幂等性检查
        String idempotentKey = request.getUserId() + ":" + request.getBizNo();
        if (!idempotentChecker.checkAndSet(idempotentKey, 300)) {
            // 重复请求，查询已存在的支付订单
            return paymentOrderMapper.selectByBizNo(request.getBizNo());
        }

        try {
            // 2. 处理支付逻辑
            return doPay(request);
        } catch (Exception e) {
            // 3. 失败则释放幂等标识，允许重试
            idempotentChecker.release(idempotentKey);
            throw e;
        }
    }
}` }
        }
      ]
    },
    notification: {
      title: "通知系统设计",
      icon: "📢",
      questions: [
        {
          q: "设计一个消息通知系统",
          a: "消息通知系统设计：\n\n**通知类型**：\n1. 短信通知\n2. 邮件通知\n3. 站内信\n4. App 推送\n5. 微信/钉钉消息\n\n**核心设计**：\n- **异步解耦**：MQ 削峰解耦\n- **模板管理**：动态配置消息模板\n- **限流防刷**：防止短信轰炸\n- **重试机制**：失败自动重试\n- **发送记录**：可追溯",
          code: { language: "java", content: `@Service
public class NotificationService {

    @Autowired
    private RocketMQTemplate rocketMQTemplate;

    @Autowired
    private NotificationTemplateMapper templateMapper;

    @Autowired
    private NotificationRecordMapper recordMapper;

    /**
     * 发送通知（异步）
     */
    public void send(NotificationRequest request) {
        // 1. 查询模板
        NotificationTemplate template = templateMapper.selectByCode(request.getTemplateCode());
        if (template == null) {
            throw new BusinessException("模板不存在");
        }

        // 2. 渲染消息内容
        String content = renderTemplate(template.getContent(), request.getParams());

        // 3. 构建消息
        NotificationMessage message = new NotificationMessage();
        message.setType(request.getType());  // SMS, EMAIL, PUSH
        message.setReceiver(request.getReceiver());
        message.setContent(content);
        message.setBizId(request.getBizId());

        // 4. 发送到 MQ
        rocketMQTemplate.asyncSend("notification-topic", message);

        // 5. 记录发送记录
        NotificationRecord record = new NotificationRecord();
        record.setBizId(request.getBizId());
        record.setType(request.getType());
        record.setReceiver(request.getReceiver());
        record.setStatus(NotificationStatus.SENDING);
        recordMapper.insert(record);
    }
}

/**
 * 消息消费者
 */
@Service
public class NotificationConsumer {

    @RocketMQMessageListener(
        topic = "notification-topic",
        consumerGroup = "notification-group"
    )
    public class SmsConsumer implements RocketMQListener<NotificationMessage> {

        @Autowired
        private SmsService smsService;

        @Override
        public void onMessage(NotificationMessage message) {
            try {
                // 发送短信
                smsService.send(message.getReceiver(), message.getContent());

                // 更新发送记录
                recordMapper.updateStatus(message.getBizId(), NotificationStatus.SUCCESS);
            } catch (Exception e) {
                log.error("短信发送失败", e);

                // 更新为失败状态
                recordMapper.updateStatus(message.getBizId(), NotificationStatus.FAILED);

                // 抛出异常触发重试
                throw e;
            }
        }
    }
}` }
        },
        {
          q: "如何防止短信轰炸？",
          a: "短信轰炸防护策略：\n\n**1. 频率限制**\n- 同一手机号 1 分钟内只能发送 1 条\n- 同一手机号 1 小时内只能发送 5 条\n- 同一手机号 1 天内只能发送 10 条\n\n**2. IP 限流**\n- 同一 IP 1 分钟内最多发送 10 条\n\n**3. 验证码**\n- 发送验证码前要求图形验证码\n- 防止机器刷接口\n\n**4. 黑名单**\n- 恶意用户加入黑名单",
          code: { language: "java", content: `@Component
public class SmsRateLimiter {

    @Autowired
    private RedisTemplate<String, String> redisTemplate;

    /**
     * 检查是否允许发送短信（基于手机号限流）
     * @return true 表示允许发送，false 表示超过限流
     */
    public boolean checkAllowed(String phone) {
        // 1. 1分钟内只能发送1条
        String key1m = "sms:limit:1m:" + phone;
        if (Boolean.TRUE.equals(redisTemplate.hasKey(key1m))) {
            return false;
        }
        redisTemplate.opsForValue().set(key1m, "1", 1, TimeUnit.MINUTES);

        // 2. 1小时内只能发送5条
        String key1h = "sms:limit:1h:" + phone;
        Long count1h = redisTemplate.opsForValue().increment(key1h);
        if (count1h == 1) {
            redisTemplate.expire(key1h, 1, TimeUnit.HOURS);
        }
        if (count1h > 5) {
            return false;
        }

        // 3. 1天内只能发送10条
        String key1d = "sms:limit:1d:" + phone;
        Long count1d = redisTemplate.opsForValue().increment(key1d);
        if (count1d == 1) {
            redisTemplate.expire(key1d, 1, TimeUnit.DAYS);
        }
        if (count1d > 10) {
            return false;
        }

        return true;
    }

    /**
     * 基于 IP 的限流
     */
    public boolean checkIpAllowed(String ip) {
        String key = "sms:limit:ip:" + ip;
        Long count = redisTemplate.opsForValue().increment(key);
        if (count == 1) {
            redisTemplate.expire(key, 1, TimeUnit.MINUTES);
        }
        return count &lt;= 10;  // 1分钟内最多10条
    }
}` }
        }
      ]
    },
    social: {
      title: "社交系统设计",
      icon: "👥",
      questions: [
        {
          q: "设计一个朋友圈系统",
          a: "朋友圈系统设计：\n\n**核心功能**：\n1. 发布动态（文字、图片、视频）\n2. 查看好友动态\n3. 点赞、评论\n4. Feed 流优化\n\n**技术架构**：\n- **存储**：MySQL + Redis + OSS\n- **Feed 流**：推模式（写扩散）或拉模式（读扩散）\n- **缓存策略**：热点数据缓存",
          code: { language: "java", content: `@Service
public class MomentsService {

    @Autowired
    private MomentsMapper momentsMapper;

    @Autowired
    private FollowService followService;

    @Autowired
    private RedisTemplate<String, String> redisTemplate;

    /**
     * 发布朋友圈（推模式）
     * 1. 保存动态到数据库
     * 2. 推送到所有粉丝的收件箱
     */
    @Transactional
    public void publish(MomentsRequest request) {
        // 1. 保存动态
        Moments moments = new Moments();
        moments.setUserId(request.getUserId());
        moments.setContent(request.getContent());
        moments.setImages(request.getImages());
        momentsMapper.insert(moments);

        // 2. 查询粉丝列表
        List<Long> followerIds = followService.getFollowers(request.getUserId());

        // 3. 推送到粉丝收件箱（使用 Redis SortedSet，按时间排序）
        String key = "moments:inbox:";
        Long timestamp = System.currentTimeMillis();
        for (Long followerId : followerIds) {
            redisTemplate.opsForZSet().add(key + followerId,
                moments.getId().toString(), timestamp);
        }

        // 4. 设置过期时间（30天）
        for (Long followerId : followerIds) {
            redisTemplate.expire(key + followerId, 30, TimeUnit.DAYS);
        }
    }

    /**
     * 拉取朋友圈动态（拉模式）
     */
    public List&lt;Moments&gt; pullMoments(Long userId, long lastId, int limit) {
        // 1. 查询关注的人
        List&lt;Long&gt; followeeIds = followService.getFollowees(userId);

        // 2. 查询这些人的动态（分页）
        return momentsMapper.selectByFolloweesWithPaging(
            followeeIds, lastId, limit);
    }
}` }
        },
        {
          q: "设计一个点赞系统",
          a: "点赞系统设计要点：\n\n**数据结构**：\n- 使用 Redis Set 存储点赞关系\n- 使用 Redis String 缓存点赞数\n- 异步同步到 MySQL\n\n**核心功能**：\n1. 点赞/取消点赞\n2. 查询点赞状态\n3. 查询点赞数\n4. 点赞用户列表",
          code: { language: "java", content: `@Service
public class LikeService {

    @Autowired
    private RedisTemplate<String, String> redisTemplate;

    private static final String LIKE_KEY_PREFIX = "like:";      // 点赞关系
    private static final String COUNT_KEY_PREFIX = "like:count:"; // 点赞数

    /**
     * 点赞
     */
    public void like(Long userId, String targetType, Long targetId) {
        String key = LIKE_KEY_PREFIX + targetType + ":" + targetId;
        String countKey = COUNT_KEY_PREFIX + targetType + ":" + targetId;

        // 1. 检查是否已点赞
        Boolean isMember = redisTemplate.opsForSet().isMember(key, userId.toString());
        if (Boolean.TRUE.equals(isMember)) {
            return;  // 已点赞，直接返回
        }

        // 2. 添加点赞关系
        redisTemplate.opsForSet().add(key, userId.toString());

        // 3. 增加点赞数
        redisTemplate.opsForValue().increment(countKey);

        // 4. 异步同步到 MySQL（MQ）
        LikeMessage message = new LikeMessage(userId, targetType, targetId, "LIKE");
        rocketMQTemplate.asyncSend("like-topic", message);
    }

    /**
     * 取消点赞
     */
    public void unlike(Long userId, String targetType, Long targetId) {
        String key = LIKE_KEY_PREFIX + targetType + ":" + targetId;
        String countKey = COUNT_KEY_PREFIX + targetType + ":" + targetId;

        // 1. 移除点赞关系
        redisTemplate.opsForSet().remove(key, userId.toString());

        // 2. 减少点赞数
        redisTemplate.opsForValue().decrement(countKey);

        // 3. 异步同步到 MySQL
        LikeMessage message = new LikeMessage(userId, targetType, targetId, "UNLIKE");
        rocketMQTemplate.asyncSend("like-topic", message);
    }

    /**
     * 查询点赞数
     */
    public Long getLikeCount(String targetType, Long targetId) {
        String countKey = COUNT_KEY_PREFIX + targetType + ":" + targetId;
        String count = redisTemplate.opsForValue().get(countKey);
        if (count != null) {
            return Long.parseLong(count);
        }

        // 缓存未命中，从数据库加载
        Long dbCount = likeMapper.selectCount(targetType, targetId);
        redisTemplate.opsForValue().set(countKey, dbCount.toString());
        return dbCount;
    }
}` }
        }
      ]
    },
    im: {
      title: "即时通讯设计",
      icon: "💬",
      questions: [
        {
          q: "设计一个即时通讯系统",
          a: "IM 系统核心设计：\n\n**技术选型**：\n- **协议**：WebSocket\n- **消息存储**：MySQL + Redis\n- **消息同步**：拉取 + 推送\n\n**核心功能**：\n1. 单聊、群聊\n2. 在线状态\n3. 消息已读/未读\n4. 历史消息",
          code: { language: "java", content: `@ServerEndpoint("/ws/{userId}")
public class ChatWebSocket {

    private static ConcurrentHashMap&lt;String, ChatWebSocket&gt; clients = new ConcurrentHashMap&lt;&gt;();

    private Session session;
    private String userId;

    @OnOpen
    public void onOpen(Session session, @PathParam("userId") String userId) {
        this.session = session;
        this.userId = userId;
        clients.put(userId, this);

        // 更新在线状态
        redisTemplate.opsForValue().set("online:" + userId, "1");

        log.info("用户上线，userId={}", userId);
    }

    @OnClose
    public void onClose() {
        clients.remove(userId);
        redisTemplate.delete("online:" + userId);
        log.info("用户下线，userId={}", userId);
    }

    @OnMessage
    public void onMessage(String message) {
        ChatMessage chatMessage = JSON.parseObject(message, ChatMessage.class);

        // 1. 保存消息到数据库
        messageMapper.insert(chatMessage);

        // 2. 更新会话列表
        updateConversation(chatMessage);

        // 3. 推送给接收方
        ChatWebSocket receiver = clients.get(chatMessage.getReceiverId());
        if (receiver != null) {
            receiver.sendMessage(chatMessage);
        } else {
            // 接收方不在线，标记离线消息
            markOfflineMessage(chatMessage);
        }
    }

    private void sendMessage(ChatMessage message) {
        try {
            session.getBasicRemote().sendText(JSON.toJSONString(message));
        } catch (IOException e) {
            log.error("发送消息失败", e);
        }
    }
}` }
        },
        {
          q: "如何保证消息不丢失？",
          a: "IM 消息不丢失方案：\n\n**1. 发送确认（ACK）**\n- 客户端发送消息后，等待服务器确认\n- 超时未收到确认，重新发送\n\n**2. 消息重试**\n- 发送失败自动重试\n- 指数退避策略\n\n**3. 离线消息**\n- 用户离线时，消息存储在离线消息表\n- 用户上线后拉取离线消息\n\n**4. 消息去重**\n- 每条消息唯一 ID\n- 客户端本地去重",
          code: { language: "java", content: `@Service
public class MessageReliabilityService {

    @Autowired
    private MessageMapper messageMapper;

    @Autowired
    private OfflineMessageMapper offlineMessageMapper;

    /**
     * 发送消息（带重试）
     */
    public void sendWithRetry(ChatMessage message, int maxRetries) {
        int retryCount = 0;
        while (retryCount &lt; maxRetries) {
            try {
                // 1. 保存到数据库
                messageMapper.insert(message);

                // 2. 尝试推送给接收方
                boolean sent = pushToReceiver(message);
                if (sent) {
                    return;  // 推送成功
                }

                // 3. 接收方离线，保存离线消息
                offlineMessageMapper.insert(message);
                return;

            } catch (Exception e) {
                retryCount++;
                if (retryCount &gt;= maxRetries) {
                    log.error("消息发送失败，已达最大重试次数");
                    throw e;
                }

                // 指数退避
                long waitTime = (long) Math.pow(2, retryCount) * 100;
                Thread.sleep(waitTime);
            }
        }
    }

    /**
     * 拉取离线消息
     */
    public List&lt;ChatMessage&gt; pullOfflineMessages(String userId) {
        List&lt;ChatMessage&gt; messages = offlineMessageMapper.selectByUserId(userId);

        // 删除已拉取的离线消息
        offlineMessageMapper.deleteByUserId(userId);

        return messages;
    }
}` }
        }
      ]
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-700 to-purple-900 text-white rounded-lg p-6 mb-8">
        <h1 className="text-4xl font-bold mb-2">系统设计面试题集</h1>
        <p className="text-purple-100">实战化系统设计问题，考察架构能力</p>
        <div className="flex gap-3 text-sm mt-4">
          <span className="px-3 py-1 bg-white/20 rounded-full">🎯 设计题</span>
          <span className="px-3 py-1 bg-white/20 rounded-full">⏱️ 约90分钟</span>
          <span className="px-3 py-1 bg-white/20 rounded-full">📋 6大分类</span>
          <span className="px-3 py-1 bg-white/20 rounded-full">💡 15道精选题</span>
        </div>
      </div>

      {/* Design Tips */}
      <section className="bg-blue-50 border-l-4 border-blue-400 p-6 mb-8 rounded-r-lg">
        <h2 className="text-xl font-bold text-blue-900 mb-3">💡 系统设计方法论</h2>
        <div className="grid md:grid-cols-2 gap-4 text-blue-800">
          <div>
            <h3 className="font-bold mb-2">设计步骤</h3>
            <ol className="list-decimal list-inside space-y-1">
              <li>明确需求（功能、非功能）</li>
              <li>容量估算（QPS、存储量）</li>
              <li>系统架构设计</li>
              <li>数据模型设计</li>
              <li>核心流程设计</li>
              <li>可扩展性、可用性分析</li>
            </ol>
          </div>
          <div>
            <h3 className="font-bold mb-2">常见问题</h3>
            <ul className="list-disc list-inside space-y-1">
              <li>如何保证数据一致性？</li>
              <li>如何提高系统可用性？</li>
              <li>如何进行水平扩展？</li>
              <li>如何处理系统瓶颈？</li>
              <li>如何保证系统安全？</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Design Questions */}
      <div className="space-y-6">
        {Object.entries(designData).map(([key, category]) => (
          <div key={key} className="bg-white rounded-lg shadow-lg overflow-hidden">
            <button
              onClick={() => setOpenCategory(openCategory === key ? null : key)}
              className="w-full bg-gray-50 hover:bg-gray-100 p-4 flex items-center justify-between transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{category.icon}</span>
                <span className="text-xl font-bold text-gray-900">{category.title}</span>
                <span className="text-sm text-gray-600">({category.questions.length} 道题)</span>
              </div>
              <span className="text-gray-400 text-2xl">{openCategory === key ? '−' : '+'}</span>
            </button>

            {openCategory === key && (
              <div className="p-4 space-y-4">
                {category.questions.map((faq, idx) => (
                  <div key={idx} className="border border-gray-200 rounded-lg overflow-hidden">
                    <button
                      onClick={() => setOpenQuestion(openQuestion === idx ? null : idx)}
                      className="w-full text-left p-4 flex items-start justify-between hover:bg-gray-50 transition-colors"
                    >
                      <span className="font-medium text-gray-900 flex-1 pr-4">
                        <span className="text-purple-600 mr-2">Q:</span>
                        {faq.q}
                      </span>
                      <span className="text-gray-400 text-lg mt-1">
                        {openQuestion === idx ? '−' : '+'}
                      </span>
                    </button>
                    {openQuestion === idx && (
                      <div className="px-4 pb-4">
                        <div className="text-gray-700 whitespace-pre-line mb-4">
                          <span className="text-purple-600 font-medium">A:</span> {faq.a}
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
          <a href="/interview-questions" className="block bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 rounded-lg p-6 transition-colors">
            <h3 className="text-lg font-bold text-indigo-900 mb-2">面试题集</h3>
            <p className="text-indigo-700 text-sm">Spring Cloud Alibaba 面试题</p>
          </a>
          <a href="/system-design" className="block bg-purple-50 hover:bg-purple-100 border border-purple-200 rounded-lg p-6 transition-colors">
            <h3 className="text-lg font-bold text-purple-900 mb-2">系统设计</h3>
            <p className="text-purple-700 text-sm">微服务架构设计指南</p>
          </a>
          <a href="/performance-benchmark" className="block bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg p-6 transition-colors">
            <h3 className="text-lg font-bold text-blue-900 mb-2">性能优化</h3>
            <p className="text-blue-700 text-sm">系统性能调优实践</p>
          </a>
        </div>
      </section>
    </div>
  );
};
