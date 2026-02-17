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

export const InterviewQuestionsPage: React.FC = () => {
  const [openCategory, setOpenCategory] = useState<string | null>(null);
  const [openQuestion, setOpenQuestion] = useState<number | null>(null);

  const interviewData = {
    basic: {
      title: "基础理论题",
      icon: "📖",
      questions: [
        {
          q: "什么是微服务架构？它和单体架构有什么区别？",
          a: "微服务架构是一种将单一应用程序拆分成多个小型服务的架构风格。每个服务运行在自己的进程中，使用轻量级机制通信（通常是 HTTP API）。\n\n**与单体架构的区别**：\n\n| 维度 | 单体架构 | 微服务架构 |\n|------|---------|------------|\n| **部署** | 整体部署 | 独立部署 |\n| **技术栈** | 统一技术栈 | 技术异构 |\n| **扩展性** | 整体扩展 | 独立扩展 |\n| **复杂度** | 开发简单，后期维护难 | 开发复杂，维护相对简单 |\n| **故障隔离** | 一个模块故障影响全局 | 服务隔离，影响有限 |",
          code: null
        },
        {
          q: "Spring Cloud Alibaba 核心组件有哪些？",
          a: "Spring Cloud Alibaba 核心组件：\n\n1. **Nacos**：服务注册发现、配置中心\n2. **Sentinel**：流量控制、熔断降级\n3. **Gateway**：API 网关\n4. **Seata**：分布式事务\n5. **RocketMQ**：消息队列\n6. **Dubbo**：RPC 框架\n\n这些组件共同构成了完整的微服务解决方案。",
          code: null
        },
        {
          q: "什么是 CAP 定理？在分布式系统中如何权衡？",
          a: "CAP 定理指出分布式系统不可能同时满足以下三点：\n\n- **C (Consistency)** 一致性：所有节点同时看到相同数据\n- **A (Availability)** 可用性：每次请求都能得到响应\n- **P (Partition Tolerance)** 分区容错性：系统在网络分区时仍能运行\n\n**常见权衡**：\n\n1. **CP**（一致性+分区容错）：牺牲可用性\n   - 典型：Zookeeper、HBase\n   - 场景：金融交易、库存扣减\n\n2. **AP**（可用性+分区容错）：牺牲强一致性\n   - 典型：Nacos（AP 模式）、Cassandra\n   - 场景：社交网络、内容分发\n\n3. **CA**：在分布式系统中几乎不存在（网络分区必然发生）\n\n**Nacos 支持 AP 和 CP 切换**：\n```java\n// Nacos AP 模式（默认）\nSpring Cloud Alibaba Discovery\n\n// Nacos CP 模式\n@Switch(mode = \"CP\")\n```",
          code: null
        },
        {
          q: "什么是服务雪崩？如何防止？",
          a: "服务雪崩是指一个服务故障导致级联故障，最终导致整个系统崩溃。\n\n**防止措施**：\n\n1. **服务熔断**（Circuit Breaker）\n   - 故障率达到阈值时，快速失败\n   - Sentinel 实现：@SentinelResource\n\n2. **服务降级**（Fallback）\n   - 返回默认值或缓存数据\n   - 保证核心功能可用\n\n3. **限流**（Rate Limiting）\n   - 限制请求 QPS\n   - Sentinel：QPS 限流、线程数限流\n\n4. **超时控制**\n   - 设置合理超时时间\n   - 避免长时间阻塞\n\n5. **线程隔离**\n   - 不同业务使用不同线程池\n   - Sentinel 信号量隔离",
          code: { language: "java", content: `@SentinelResource(
    value = "getOrder",
    blockHandler = "handleBlock",
    fallback = "handleFallback"
)
public Order getOrder(Long id) {
    return orderService.getById(id);
}

// 限流降级
public Order handleBlock(Long id, BlockException ex) {
    return Order.getCachedOrder(id);
}

// 异常降级
public Order handleFallback(Long id, Throwable ex) {
    return Order.getDefaultOrder();
}` }
        }
      ]
    },
    nacos: {
      title: "Nacos 相关",
      icon: "🔧",
      questions: [
        {
          q: "Nacos 的服务注册原理是什么？",
          a: "Nacos 服务注册流程：\n\n1. **服务启动**：微服务启动时向 Nacos Server 发送注册请求\n2. **心跳维持**：每 5 秒发送心跳包\n3. **健康检查**：Nacos Server 检测服务是否在线\n4. **服务剔除**：超过 15 秒未收到心跳，标记为不健康；超过 30 秒，剔除服务\n\n**服务发现**：\n- 客户端从 Nacos 拉取服务列表\n- 定时更新服务列表（默认 10 秒）\n- 支持订阅变更推送\n\n**临时实例 vs 持久化实例**：\n- 临时实例：心跳机制（默认）\n- 持久化实例：Nacos 主动探测",
          code: { language: "yaml", content: `# 服务注册配置
spring:
  cloud:
    nacos:
      discovery:
        server-addr: localhost:8848
        namespace: prod
        group: DEFAULT_GROUP
        ephemeral: true  # 临时实例
        metadata:
          version: 1.0.0
          region: cn-hangzhou` }
        },
        {
          q: "Nacos 配置中心的工作原理？",
          a: "Nacos 配置中心原理：\n\n1. **配置发布**：在 Nacos 控制台发布配置\n2. **配置拉取**：应用启动时从 Nacos 拉取配置\n3. **动态刷新**：配置变更时，Nacos 推送变更\n4. **配置更新**：应用监听到变更，刷新上下文\n\n**配置优先级**（从高到低）：\n1. 动态配置（Nacos）\n2. 本地配置文件\n3. 环境变量\n4. 命令行参数\n\n**灰度发布**：\n- 使用 Beta 配置\n- 指定 IP 或配置版本",
          code: { language: "java", content: `// 动态刷新配置
@RestController
@RefreshScope  // 关键注解
public class ConfigController {

    @Value("$\{app.config.timeout:3000}")
    private Integer timeout;

    @GetMapping("/config")
    public Integer getConfig() {
        return timeout;  // 配置变更自动刷新
    }
}` }
        },
        {
          q: "Nacos AP 和 CP 模式有什么区别？如何选择？",
          a: "Nacos 支持两种模式：\n\n**AP 模式**（默认）：\n- 优先保证可用性和分区容错\n- 牺牲强一致性，保证最终一致性\n- 适合服务注册场景\n- 使用 Distro 协议（类似 Gossip）\n- 性能更高\n\n**CP 模式**：\n- 保证强一致性和分区容错\n- 使用 Raft 协议\n- 适合配置管理场景\n- 性能相对较低\n\n**选择建议**：\n- 服务注册：使用 AP 模式\n- 配置中心：使用 CP 模式",
          code: { language: "yaml", content: `spring:
  cloud:
    nacos:
      discovery:
        server-addr: localhost:8848
        ephemeral: true

# Switch to CP mode
spring:
  cloud:
    nacos:
      discovery:
        ephemeral: false` }
        }
      ]
    },
    sentinel: {
      title: "Sentinel 相关",
      icon: "🛡️",
      questions: [
        {
          q: "Sentinel 的限流原理是什么？",
          a: "Sentinel 限流原理：\n\n**核心概念**：\n- **资源**：被保护的对象（API、方法）\n- **规则**：限流、熔断、热点等规则\n- **统计**：滑动窗口统计实时指标\n\n**限流算法**：\n\n1. **默认：快速失败**\n   - QPS 超过阈值，直接拒绝\n   - 使用滑动窗口统计\n\n2. **Warm Up**（预热）\n   - 冷启动缓慢增加阈值\n   - 避免瞬间流量冲击\n   - 场景：缓存预热、秒杀系统\n\n3. **排队等待**\n   - 请求排队匀速通过\n   - 场景：削峰填谷\n\n4. **并发线程数限流**\n   - 限制并发线程数\n   - 适用于长时间业务",
          code: { language: "java", content: `// 限流规则配置（代码方式）
@PostConstruct
public void initFlowRules() {
    List<FlowRule> rules = new ArrayList<>();
    FlowRule rule = new FlowRule();
    rule.setResource("getOrder");
    rule.setGrade(RuleConstant.FLOW_GRADE_QPS);  // QPS限流
    rule.setCount(100);  // 阈值100
    rule.setStrategy(RuleConstant.STRATEGY_DIRECT);  // 直接流控
    rule.setControlBehavior(RuleConstant.CONTROL_BEHAVIOR_DEFAULT);  // 快速失败
    rules.add(rule);
    FlowRuleManager.loadRules(rules);
}` }
        },
        {
          q: "Sentinel 熔断降级策略有哪些？",
          a: "Sentinel 熔断降级策略：\n\n1. **慢调用比例**（Slow Request Ratio）\n   - RT 超过最大 RT 的调用为慢调用\n   - 慢调用比例超过阈值触发熔断\n   - 场景：第三方接口超时\n\n2. **异常比例**（Exception Ratio）\n   - 异常比例超过阈值触发熔断\n   - 最小请求数（默认 5）\n   - 场景：依赖服务异常\n\n3. **异常数**（Exception Count）\n   - 异常数超过阈值触发熔断\n   - 统计时长 1 分钟\n   - 场景：数据库连接失败\n\n**熔断状态**：\n- Closed（关闭）：正常状态\n- Open（打开）：熔断状态，直接降级\n- Half-Open（半开）：尝试恢复，探测是否恢复",
          code: { language: "java", content: `// 慢调用比例熔断规则
DegradeRule rule = new DegradeRule();
rule.setResource("thirdPartyAPI");
rule.setGrade(RuleConstant.DEGRADE_GRADE_SLOW_REQUEST_RATIO);  // 慢调用比例
rule.setCount(100);  // 最大RT 100ms
rule.setSlowRatioThreshold(0.5);  // 慢调用比例50%
rule.setTimeWindow(10);  // 熔断时长10秒
rule.setMinRequestAmount(5);  // 最小请求数
rule.setStatIntervalMs(1000);  // 统计时长1秒` }
        },
        {
          q: "Sentinel 和 Hystrix 的区别？",
          a: "核心区别：\n\n| 对比项 | Sentinel | Hystrix |\n|--------|----------|---------|\n| **隔离策略** | 信号量隔离 | 线程池隔离、信号量隔离 |\n| **熔断降级** | 慢调用比例、异常比例、异常数 | 基于异常比例 |\n| **限流** | 支持 QPS、线程数限流 | 不支持 |\n| **热点限流** | 支持 | 不支持 |\n| **实时监控** | 独立控制台，实时性强 | 需要集成 Actuator |\n| **动态规则** | 支持持久化到 Nacos、Apollo | 需要重启 |\n| **扩展性** | 插件式扩展 | 较弱 |\n| **社区状态** | 活跃维护 | 已停止维护 |\n\n**建议**：新项目直接使用 Sentinel。",
          code: null
        }
      ]
    },
    gateway: {
      title: "Gateway 相关",
      icon: "🚪",
      questions: [
        {
          q: "什么是 API 网关？它的作用是什么？",
          a: "API 网关是微服务架构的入口，统一管理所有外部请求。\n\n**核心作用**：\n\n1. **路由转发**：根据路径、Header、参数等路由到不同服务\n2. **统一鉴权**：在网关层完成认证授权\n3. **限流熔断**：保护后端服务\n4. **日志监控**：统一记录访问日志\n5. **协议转换**：HTTP → WebSocket、gRPC 等\n6. **灰度发布**：按权重或规则分流\n\n**优势**：\n- 简化客户端调用\n- 统一处理横切关注点\n- 隐藏后端服务细节\n- 提高安全性",
          code: null
        },
        {
          q: "Spring Cloud Gateway 工作原理？",
          a: "Gateway 核心概念：\n\n1. **Route（路由）**\n   - ID、目标 URI、断言、过滤器\n\n2. **Predicate（断言）\n   - 匹配请求条件\n   - Path、Method、Header、Query 等\n\n3. **Filter（过滤器）**\n   - Pre Filter：请求前处理\n   - Post Filter：响应后处理\n\n**工作流程**：\n1. 客户端请求到达 Gateway\n2. Handler Mapping 匹配路由\n3. Web Handler 执行过滤器链\n4. Pre Filter 处理请求\n5. 代理到后端服务\n6. 后端服务返回响应\n7. Post Filter 处理响应\n8. 返回客户端",
          code: { language: "yaml", content: `spring:
  cloud:
    gateway:
      routes:
        - id: order-service
          uri: lb://order-service  # lb:// 服务名
          predicates:
            - Path=/api/order/**
            - Method=GET,POST
            - Header=Authorization,.*
          filters:
            - StripPrefix=1  # 去掉前缀 /api
            - AddRequestHeader=X-Request-Id, $\{random.value}
            - name: RequestRateLimiter
              args:
                redis-rate-limiter.replenishRate: 100
                redis-rate-limiter.burstCapacity: 200` }
        },
        {
          q: "如何实现 Gateway 的统一鉴权？",
          a: "统一鉴权实现：\n\n**方案 1：全局过滤器**\n```java\n@Component\npublic class AuthFilter implements GlobalFilter {\n    @Override\n    public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {\n        String token = exchange.getRequest().getHeaders().getFirst(\"Authorization\");\n        if (StringUtils.isEmpty(token)) {\n            exchange.getResponse().setStatusCode(HttpStatus.UNAUTHORIZED);\n            return exchange.getResponse().setComplete();\n        }\n        // JWT 校验...\n        return chain.filter(exchange);\n    }\n}\n```\n\n**方案 2：集成鉴权服务**\n- 网关只负责 token 校验\n- 权限判断在业务服务\n- 使用 @PreAuthorize 注解",
          code: { language: "java", content: `@Component
@Order(-1)  // 优先级
public class AuthGlobalFilter implements GlobalFilter, Ordered {

    @Override
    public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {
        String token = exchange.getRequest().getHeaders().getFirst("Authorization");
        String path = exchange.getRequest().getPath().value();

        // 白名单放行
        if (isWhiteList(path)) {
            return chain.filter(exchange);
        }

        // Token 校验
        if (StringUtils.isEmpty(token) || !validateToken(token)) {
            return unauthorized(exchange.getResponse());
        }

        // 解析用户信息并传递给下游
        addUserHeader(exchange, token);
        return chain.filter(exchange);
    }
}` }
        }
      ]
    },
    distributed: {
      title: "分布式事务",
      icon: "🔄",
      questions: [
        {
          q: "什么是分布式事务？有哪些解决方案？",
          a: "分布式事务涉及多个数据库或服务的事务一致性。\n\n**常见解决方案**：\n\n1. **2PC / 3PC**（两阶段提交）\n   - 强一致性\n   - 性能差，有阻塞\n   - Seata 实现了优化的 2PC\n\n2. **TCC**（Try-Confirm-Cancel）\n   - 最终一致性\n   - 需要编写三个方法\n   - 性能较好\n\n3. **Saga**\n   - 长事务拆分为本地事务\n   - 补偿机制\n   - 适合长流程业务\n\n4. **本地消息表**\n   - 最终一致性\n   - 可靠性强\n   - 实现简单\n\n5. **事务消息**（RocketMQ）\n   - 半消息机制\n   - 最终一致性\n   - 需要消息队列支持",
          code: null
        },
        {
          q: "Seata AT 模式的原理？",
          a: "Seata AT 模式是对 2PC 的优化，增强性能：\n\n**核心阶段**：\n\n1. **一阶段**：\n   - 解析 SQL 语义，找到要更新的数据\n   - 查询前镜像（Before Image）\n   - 执行业务 SQL\n   - 查询后镜像（After Image）\n   - 保存行锁\n   - 提交本地事务\n   - 上报 undo_log 到 TC\n\n2. **二阶段提交**：\n   - TC 通知所有分支提交\n   - 删除 undo_log\n   - 释放锁\n\n3. **二阶段回滚**：\n   - TC 通知所有分支回滚\n   - 通过 undo_log 生成反向 SQL\n   - 执行回滚\n   - 删除 undo_log\n   - 释放锁\n\n**优点**：\n- 无侵入（只需一个注解）\n- 性能较好（一阶段本地提交）\n- 适合大多数场景",
          code: { language: "java", content: `@GlobalTransactional(name = "create-order", rollbackFor = Exception.class)
public void createOrder(OrderRequest request) {
    // 1. 扣减库存
    inventoryService.deduct(request.getProductId(), request.getCount());

    // 2. 创建订单
    orderService.create(request);

    // 3. 扣减余额
    accountService.deduct(request.getUserId(), request.getAmount());
}

// Seata 自动处理分布式事务
// 任一步骤失败，所有操作回滚` }
        },
        {
          q: "Seata TCC 模式如何实现？",
          a: "TCC 模式需要业务实现三个方法：\n\n**1. Try 阶段**（尝试执行）\n- 完成业务检查\n- 预留必须资源\n- 状态为中间态\n\n**2. Confirm 阶段**（确认执行）\n- 真正执行业务\n- 使用 Try 阶段预留的资源\n- 状态改为成功\n\n**3. Cancel 阶段**（取消执行）\n- 释放 Try 阶段预留的资源\n- 状态改为取消\n\n**实现示例**：",
          code: { language: "java", content: `@LocalTCC
public interface InventoryTccService {

    // Try 阶段：预扣减库存
    @TwoPhaseBusinessAction(
        name = "deductTcc",
        commitMethod = "confirm",
        rollbackMethod = "cancel"
    )
    boolean deduct(
        @BusinessActionContextParameter(paramName = "productId") Long productId,
        @BusinessActionContextParameter(paramName = "count") Integer count
    );

    // Confirm 阶段：确认扣减
    boolean confirm(BusinessActionContext context);

    // Cancel 阶段：释放库存
    boolean cancel(BusinessActionContext context);
}

// 实现
@Service
public class InventoryTccServiceImpl implements InventoryTccService {

    @Override
    @Transactional
    public boolean deduct(Long productId, Integer count) {
        // 冻结库存
        inventoryMapper.freeze(productId, count);
        return true;
    }

    @Override
    @Transactional
    public boolean confirm(BusinessActionContext context) {
        // 扣减冻结库存
        Long productId = (Long) context.getActionContext(\"productId\");
        Integer count = (Integer) context.getActionContext(\"count\");
        inventoryMapper.deductFrozen(productId, count);
        return true;
    }

    @Override
    @Transactional
    public boolean cancel(BusinessActionContext context) {
        // 释放冻结库存
        Long productId = (Long) context.getActionContext(\"productId\");
        Integer count = (Integer) context.getActionContext(\"count\");
        inventoryMapper.unfreeze(productId, count);
        return true;
    }
}` }
        }
      ]
    },
    mq: {
      title: "消息队列",
      icon: "📨",
      questions: [
        {
          q: "消息队列的作用是什么？",
          a: "消息队列的三大核心作用：\n\n1. **异步处理**\n   - 耗时操作异步执行\n   - 提高响应速度\n   - 场景：注册后发送邮件、短信\n\n2. **流量削峰**\n   - 缓冲突发流量\n   - 保护后端服务\n   - 场景：秒杀、抢购\n\n3. **服务解耦**\n   - 降低服务间依赖\n   - 提高系统扩展性\n   - 场景：订单完成后通知积分、物流\n\n**其他作用**：\n- 数据分发\n- 顺序保证\n- 可靠传输",
          code: null
        },
        {
          q: "如何保证消息不丢失？",
          a: "消息丢失的三个环节及解决方案：\n\n**1. 生产者不丢失**\n- 使用同步发送\n- 开启重试机制\n- 发送前记录日志\n\n**2. MQ 不丢失**\n- RocketMQ：同步刷盘、同步复制\n- Broker 集群部署\n- 开启事务消息\n\n**3. 消费者不丢失**\n- 手动提交 offset\n- 业务处理成功后再确认\n- 消费幂等性保证",
          code: { language: "java", content: `// 生产者：同步发送
Message message = new Message("TopicTest", "TagA", "Hello MQ".getBytes());
SendResult sendResult = producer.send(message, 10000);  // 超时时间10秒
if (sendResult.getSendStatus() == SendStatus.SEND_OK) {
    log.info("消息发送成功");
}

// 消费者：手动提交
@RocketMQMessageListener(
    topic = "TopicTest",
    consumerGroup = "consumer-group",
    messageModel = MessageModel.CLUSTERING
)
public class Consumer implements RocketMQListener<String> {

    @Override
    public void onMessage(String message) {
        try {
            // 处理业务
            processMessage(message);
            // 业务成功，手动提交（自动模式默认提交）
        } catch (Exception e) {
            log.error("消费失败", e);
            // 抛出异常，触发重试
            throw e;
        }
    }
}` }
        },
        {
          q: "如何保证消息幂等性？",
          a: "消息幂等性：同一消息多次消费，结果一致。\n\n**实现方案**：\n\n**1. 唯一 ID + 数据库唯一索引**\n```java\n// 生产端\nString messageId = UUID.randomUUID().toString();\nmessage.setKeys(messageId);\n\n// 消费端\nString messageId = message.getKeys();\nif (messageMapper.exists(messageId)) {\n    return;  // 已处理，直接返回\n}\n// 处理业务...\nmessageMapper.insert(messageId);  // 插入记录，唯一索引保证幂等\n```\n\n**2. Redis 分布式锁**\n```java\nString lockKey = \"lock:msg:\" + messageId;\nif (redisTemplate.opsForValue().setIfAbsent(lockKey, \"1\", 10, TimeUnit.SECONDS)) {\n    try {\n        processMessage(message);\n    } finally {\n        redisTemplate.delete(lockKey);\n    }\n}\n```\n\n**3. 状态机**\n- 订单状态：待支付 → 已支付 → 已发货\n- 状态流转不可逆",
          code: { language: "java", content: `@Service
public class OrderConsumer {

    @Autowired
    private MessageLogMapper messageLogMapper;

    public void process(String message) {
        String msgId = JSON.parseObject(message).getString("msgId");

        // 幂等性检查
        MessageLog log = messageLogMapper.selectByMsgId(msgId);
        if (log != null && log.getStatus() == 1) {
            log.info("消息已处理，msgId={}", msgId);
            return;
        }

        // 开启事务
        transactionTemplate.execute(status -> {
            try {
                // 处理业务
                doBusiness(message);
                // 标记消息已处理
                messageLogMapper.insertOrUpdate(msgId, 1);
                return true;
            } catch (Exception e) {
                status.setRollbackOnly();
                throw e;
            }
        });
    }
}` }
        }
      ]
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-700 to-indigo-900 text-white rounded-lg p-6 mb-8">
        <h1 className="text-4xl font-bold mb-2">Spring Cloud Alibaba 面试题集</h1>
        <p className="text-indigo-100">高频面试问题精讲，助你成功拿下 offer</p>
        <div className="flex gap-3 text-sm mt-4">
          <span className="px-3 py-1 bg-white/20 rounded-full">📚 面试准备</span>
          <span className="px-3 py-1 bg-white/20 rounded-full">⏱️ 约60分钟</span>
          <span className="px-3 py-1 bg-white/20 rounded-full">📋 6大分类</span>
          <span className="px-3 py-1 bg-white/20 rounded-full">🎯 25道精选题</span>
        </div>
      </div>

      {/* Tips */}
      <section className="bg-yellow-50 border-l-4 border-yellow-400 p-6 mb-8 rounded-r-lg">
        <h2 className="text-xl font-bold text-yellow-900 mb-3">💡 面试技巧</h2>
        <ul className="space-y-2 text-yellow-800">
          <li>• <strong>STAR 原则</strong>：Situation（情境）→ Task（任务）→ Action（行动）→ Result（结果）</li>
          <li>• <strong>层次化回答</strong>：先说核心概念，再展开细节，最后举实例</li>
          <li>• <strong>结合项目</strong>：用实际项目经验佐证理论理解</li>
          <li>• <strong>承认不足</strong>：不会的问题诚实说明，表达学习意愿</li>
        </ul>
      </section>

      {/* Interview Questions */}
      <div className="space-y-6">
        {Object.entries(interviewData).map(([key, category]) => (
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
                        <span className="text-indigo-600 mr-2">Q:</span>
                        {faq.q}
                      </span>
                      <span className="text-gray-400 text-lg mt-1">
                        {openQuestion === idx ? '−' : '+'}
                      </span>
                    </button>
                    {openQuestion === idx && (
                      <div className="px-4 pb-4">
                        <div className="text-gray-700 whitespace-pre-line mb-4">
                          <span className="text-indigo-600 font-medium">A:</span> {faq.a}
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
          <a href="/faq-beginner" className="block bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 rounded-lg p-6 transition-colors">
            <h3 className="text-lg font-bold text-indigo-900 mb-2">初学者 FAQ</h3>
            <p className="text-indigo-700 text-sm">快速入门常见问题</p>
          </a>
          <a href="/faq-advanced" className="block bg-purple-50 hover:bg-purple-100 border border-purple-200 rounded-lg p-6 transition-colors">
            <h3 className="text-lg font-bold text-purple-900 mb-2">进阶 FAQ</h3>
            <p className="text-purple-700 text-sm">深入技术问题</p>
          </a>
          <a href="/faq-production" className="block bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg p-6 transition-colors">
            <h3 className="text-lg font-bold text-blue-900 mb-2">生产实践</h3>
            <p className="text-blue-700 text-sm">生产环境问题解答</p>
          </a>
        </div>
      </section>
    </div>
  );
};
