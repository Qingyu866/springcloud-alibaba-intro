import { useState } from 'react';
import { CodeBlock } from '../components';

export const RocketMQPage: React.FC = () => {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  return (
    <div className="prose prose prose-slate max-w-none">
      {/* 页面头部 */}
      <div className="bg-gradient-to-r from-teal-600 to-green-600 text-white rounded-lg p-6 mb-8">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-4xl font-bold mb-2">RocketMQ 消息队列</h1>
            <p className="text-teal-50 text-lg">高性能分布式消息中间件</p>
          </div>
          <div className="flex gap-3 text-sm">
            <span className="px-3 py-1 bg-white/20 rounded-full">🔧 进阶</span>
            <span className="px-3 py-1 bg-white/20 rounded-full">⏱️ 约50分钟</span>
            <span className="px-3 py-1 bg-white/20 rounded-full">📚 13个知识点</span>
          </div>
        </div>
      </div>

      {/* 什么是 RocketMQ */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">什么是 RocketMQ?</h2>
        <div className="bg-teal-50 border-l-4 border-teal-500 p-6 rounded-lg mb-6">
          <p className="text-lg text-gray-800 leading-relaxed mb-4">
            <strong>RocketMQ</strong> 是一款由阿里巴巴开源的分布式消息中间件，
            经历了多年双十一大促的考验，能够处理万亿级别的消息。
          </p>
          <p className="text-gray-700 mb-4">
            RocketMQ 基于 Java 语言开发，具有<strong>高吞吐量、高可用、支持海量堆积</strong>等特点，
            是微服务架构中不可或缺的异步通信组件。
          </p>
          <div className="bg-white p-4 rounded border border-teal-200 mt-4">
            <h4 className="font-bold text-gray-900 mb-2">💡 核心特性</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start">
                <span className="text-teal-600 mr-2">✓</span>
                <span><strong>高吞吐量</strong> - 单机可达十万级 TPS</span>
              </li>
              <li className="flex items-start">
                <span className="text-teal-600 mr-2">✓</span>
                <span><strong>高可用</strong> - 主从架构、故障自动切换</span>
              </li>
              <li className="flex items-start">
                <span className="text-teal-600 mr-2">✓</span>
                <span><strong>支持万亿级堆积</strong> - 消息持久化存储</span>
              </li>
              <li className="flex items-start">
                <span className="text-teal-600 mr-2">✓</span>
                <span><strong>丰富的消息模式</strong> - 顺序、延迟、事务消息</span>
              </li>
              <li className="flex items-start">
                <span className="text-teal-600 mr-2">✓</span>
                <span><strong>生产级稳定性</strong> - 双十一大促验证</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <FeatureCard icon="⚡" title="异步通信" desc="解耦服务" color="teal" />
          <FeatureCard icon="🔌" title="削峰填谷" desc="平滑流量" color="green" />
          <FeatureCard icon="🔀" title="顺序消息" desc="严格顺序" color="blue" />
          <FeatureCard icon="⏱️" title="延迟消息" desc="定时投递" color="purple" />
        </div>
      </section>

      {/* 为什么需要消息队列 */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">为什么需要消息队列?</h2>

        <p className="text-gray-700 mb-6">消息队列在微服务架构中主要有<strong>三大应用场景</strong>：</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-3">🚀 异步通信</h3>
            <div className="space-y-3 text-sm">
              <p className="text-gray-700 mb-2">
                将<strong>耗时操作</strong>异步处理，提升系统响应速度
              </p>
              <div className="bg-white p-3 rounded border border-blue-200">
                <h4 className="font-semibold text-gray-800 mb-2">场景示例：用户注册</h4>
                <ul className="space-y-1 text-xs text-gray-600">
                  <li>1. 保存用户信息（同步）</li>
                  <li>2. 发送欢迎邮件（异步）</li>
                  <li>3. 发送优惠券（异步）</li>
                  <li>4. 初始化用户数据（异步）</li>
                </ul>
              </div>
              <p className="text-gray-700">
                <strong>效果：</strong>响应时间从 500ms 降至 50ms
              </p>
            </div>
          </div>

          <div className="bg-green-50 border-2 border-green-200 rounded-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-3">🔌 服务解耦</h3>
            <div className="space-y-3 text-sm">
              <p className="text-gray-700 mb-2">
                降低服务之间的<strong>耦合度</strong>，提升系统可维护性
              </p>
              <div className="bg-white p-3 rounded border border-green-200">
                <h4 className="font-semibold text-gray-800 mb-2">场景示例：订单系统</h4>
                <ul className="space-y-1 text-xs text-gray-600">
                  <li>订单服务 → 发送订单消息</li>
                  <li>库存服务 → 消费消息扣库存</li>
                  <li>积分服务 → 消费消息加积分</li>
                  <li>通知服务 → 消费消息发通知</li>
                </ul>
              </div>
              <p className="text-gray-700">
                <strong>效果：</strong>新增业务无需修改订单代码
              </p>
            </div>
          </div>

          <div className="bg-purple-50 border-2 border-purple-200 rounded-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-3">📊 削峰填谷</h3>
            <div className="space-y-3 text-sm">
              <p className="text-gray-700 mb-2">
                应对<strong>流量高峰</strong>，保护后端系统不被压垮
              </p>
              <div className="bg-white p-3 rounded border border-purple-200">
                <h4 className="font-semibold text-gray-800 mb-2">场景示例：秒杀活动</h4>
                <ul className="space-y-1 text-xs text-gray-600">
                  <li>1. 用户发起秒杀请求</li>
                  <li>2. 请求进入 MQ 队列</li>
                  <li>3. 后端按能力消费</li>
                  <li>4. 超出部分直接拒绝</li>
                </ul>
              </div>
              <p className="text-gray-700">
                <strong>效果：</strong>系统承载能力提升 10 倍
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 核心概念 */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">核心概念</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ConceptCard3
            title="Topic (主题)"
            level="beginner"
            desc="消息的分类，同一类消息发送到同一个 Topic"
            example="订单主题: order-topic"
          />
          <ConceptCard3
            title="Producer (生产者)"
            level="beginner"
            desc="消息的发送方，负责将消息发送到 Broker"
            example="订单服务发送订单消息"
          />
          <ConceptCard3
            title="Consumer (消费者)"
            level="beginner"
            desc="消息的接收方，从 Broker 拉取并消费消息"
            example="库存服务消费订单消息"
          />
          <ConceptCard3
            title="Broker (代理)"
            level="intermediate"
            desc="消息中转角色，负责存储和转发消息"
            example="RocketMQ 服务器"
          />
          <ConceptCard3
            title="NameServer (名称服务器)"
            level="beginner"
            desc="路由信息中心，管理 Broker 路由信息"
            example="类似服务注册中心"
          />
          <ConceptCard3
            title="Message Queue (消息队列)"
            level="intermediate"
            desc="Topic 的物理分区，用于负载均衡"
            example="一个 Topic 可有多个 Queue"
          />
        </div>

        <div className="mt-6 p-6 bg-white border-2 border-teal-200 rounded-lg">
          <h4 className="font-bold text-gray-900 mb-4">🔄 RocketMQ 架构</h4>
          <div className="text-sm text-gray-700 space-y-2">
            <div className="flex items-center">
              <span className="font-semibold mr-2">Producer</span>
              <span>→ 发送消息 →</span>
              <span className="mx-2 font-semibold">NameServer</span>
              <span>→ 查询路由 →</span>
              <span className="mx-2 font-semibold">Broker</span>
              <span>→ 存储消息</span>
            </div>
            <div className="flex items-center">
              <span className="font-semibold mr-2">Consumer</span>
              <span>→ 从 NameServer 获取路由 →</span>
              <span className="mx-2 font-semibold">Broker</span>
              <span>→ 拉取消息 → 消费消息</span>
            </div>
          </div>
        </div>
      </section>

      {/* 快速开始 */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">快速开始</h2>
        <p className="text-gray-700 mb-6">通过一个完整的示例，学习如何使用 RocketMQ 发送和消费消息。</p>

        <h3>步骤 1: 启动 RocketMQ NameServer 和 Broker</h3>
        <CodeBlock
          language="bash"
          code={`# 下载 RocketMQ
wget https://archive.apache.org/dist/rocketmq/5.1.0/rocketmq-all-5.1.0-bin-release.zip
unzip rocketmq-all-5.1.0-bin-release.zip

# 启动 NameServer
nohup sh bin/mqnamesrv &

# 启动 Broker
nohup sh bin/mqbroker -n localhost:9876 &

# 查看日志
tail -f ~/logs/rocketmqlogs/broker.log

# 或使用 Docker 启动
docker run -d --name rmqnamesrv \\
  -p 9876:9876 \\
  apache/rocketmq:5.1.0 sh mqnamesrv

docker run -d --name rmqbroker \\
  --link rmqnamesrv:namesrv \\
  -e "NAMESRV_ADDR=namesrv:9876" \\
  -p 10909:10909 -p 10911:10911 -p 10912:10912 \\
  apache/rocketmq:5.1.0 sh mqbroker -c /opt/rocketmq/conf/broker.conf`}
        />

        <h3>步骤 2: 添加依赖</h3>
        <CodeBlock
          language="xml"
          code={`<dependency>
    <groupId>org.apache.rocketmq</groupId>
    <artifactId>rocketmq-spring-boot-starter</artifactId>
    <version>2.3.0</version>
</dependency>

<dependency>
    <groupId>org.apache.rocketmq</groupId>
    <artifactId>rocketmq-client</artifactId>
    <version>5.1.0</version>
</dependency>`}
        />

        <h3>步骤 3: 配置 RocketMQ</h3>
        <CodeBlock
          language="yaml"
          code={`# application.yml
rocketmq:
  name-server: localhost:9876  # NameServer 地址
  producer:
    group: order-producer-group  # 生产者组名
    send-message-timeout: 3000  # 发送超时时间
    retry-times-when-send-failed: 2  # 失败重试次数`}
        />

        <h3>步骤 4: 发送消息</h3>
        <CodeBlock
          language="java"
          code={`@Service
public class OrderService {

    @Autowired
    private RocketMQTemplate rocketMQTemplate;

    public void createOrder(OrderDTO orderDTO) {
        // 1. 创建订单
        Order order = buildOrder(orderDTO);
        orderMapper.insert(order);

        // 2. 发送订单消息到 MQ
        SendResult sendResult = rocketMQTemplate.syncSend(
            "order-topic",  // Topic
            MessageBuilder.withPayload(order).build()  // 消息内容
        );

        log.info("订单消息发送成功", sendResult);
    }
}`}
        />

        <h3>步骤 5: 消费消息</h3>
        <CodeBlock
          language="java"
          code={`// 消息消费者
@Service
@RocketMQMessageListener(
    topic = "order-topic",  // 订阅的 Topic
    consumerGroup = "order-consumer-group",  // 消费者组
    messageModel = MessageModel.CLUSTERING  // 集群模式
)
public class OrderConsumer implements RocketMQListener<Order> {

    @Autowired
    private InventoryService inventoryService;

    @Autowired
    private PointsService pointsService;

    @Override
    public void onMessage(Order order) {
        log.info("收到订单消息", order);

        try {
            // 扣减库存
            inventoryService.deduct(order.getProductId(), order.getCount());

            // 增加积分
            pointsService.add(order.getUserId(), order.getMoney().intValue());

            log.info("订单处理成功");
        } catch (Exception e) {
            log.error("订单处理失败", e);
            throw e;  // 抛出异常会触发重试
        }
    }
}`}
        />
      </section>

      {/* 最佳实践 */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">最佳实践</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <BestPracticeCard3
            title="消息设计"
            practices={[
              "消息体保持精简，只包含必要信息",
              "使用 JSON 格式，便于解析",
              "添加消息 ID 和时间戳",
              "敏感信息加密传输",
              "消息大小控制在 256KB 以内"
            ]}
          />
          <BestPracticeCard3
            title="消费者处理"
            practices={[
              "消费逻辑幂等性设计",
              "捕获并处理所有异常",
              "记录详细的消费日志",
              "消费失败抛出异常触发重试",
              "设置合理的超时时间"
            ]}
          />
          <BestPracticeCard3
            title="性能优化"
            practices={[
              "合理设置消费者线程数",
              "批量消费提升吞吐量",
              "使用异步发送提升性能",
              "控制消息大小",
              "避免在消费逻辑中执行耗时操作"
            ]}
          />
          <BestPracticeCard3
            title="可靠性保障"
            practices={[
              "生产环境使用集群模式",
              "Broker 配置主从架构",
              "启用消息持久化",
              "监控消息堆积情况",
              "及时处理死信队列消息"
            ]}
          />
          <BestPracticeCard3
            title="监控告警"
            practices={[
              "监控消息发送成功率",
              "监控消息消费延迟",
              "监控消息堆积量",
              "配置死信队列告警",
              "监控 Broker 运行状态"
            ]}
          />
          <BestPracticeCard3
            title="安全策略"
            practices={[
              "生产环境开启 ACL 访问控制",
              "敏感消息加密传输",
              "使用独立的 Nameserver",
              "限制客户端 IP 访问",
              "定期清理过期消息"
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
            question="消息堆积怎么办?"
            answer="消息堆积原因可能是消费速度低于生产速度。解决方案：
                 1) 增加消费者实例（注意：同一个消费者组内的实例数不能超过队列数）
                 2) 优化消费逻辑，提升处理速度
                 3) 排查是否有消费失败导致重试
                 4) 临时扩容消费者处理堆积消息
                 5) 分析消息是否都是正常业务，避免无效消息"
            isOpen={expandedFaq === 1}
            onClick={() => setExpandedFaq(expandedFaq === 1 ? null : 1)}
          />
          <FaqCard2
            number={2}
            question="如何保证消息不丢失?"
            answer="从三个环节保证消息不丢失：
                 1) 发送端：使用 syncSend 同步发送，确认发送成功
                 2) Broker：开启消息持久化（刷盘策略 sync），配置主从复制
                 3) 消费端：消费成功前不要确认，消费失败抛出异常触发重试
                 4) 开启消息轨迹，追踪消息流转
                 5) 对重要消息进行二次校验"
            isOpen={expandedFaq === 2}
            onClick={() => setExpandedFaq(expandedFaq === 2 ? null : 2)}
          />
          <FaqCard2
            number={3}
            question="如何保证消息消费幂等性?"
            answer="实现幂等性的常见方式：
                 1) 唯一业务ID（如订单号）：消费前查询是否已处理
                 2) 数据库唯一索引：利用数据库唯一约束防止重复
                 3) Redis 去重：使用 SETNX 记录已处理的消息ID
                 4) 状态机：通过状态转换防止重复操作
                 示例：订单消息，用订单号作为唯一键，处理前查询订单状态。"
            isOpen={expandedFaq === 3}
            onClick={() => setExpandedFaq(expandedFaq === 3 ? null : 3)}
          />
        </div>
      </section>

      {/* 下一步学习 */}
      <section className="bg-gradient-to-r from-teal-600 to-green-600 text-white p-8 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">🎯 掌握了 RocketMQ,下一步学习什么?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <NextStepCard2 title="Redis" description="分布式缓存实战" link="/redis" icon="💾" />
          <NextStepCard2 title="微服务拆分" description="服务拆分原则" link="/service-decomposition" icon="🔪" />
          <NextStepCard2 title="实战项目" description="电商微服务系统" link="/project-ecommerce" icon="🛒" />
          <NextStepCard2 title="可观测性" description="监控与链路追踪" link="/observability" icon="📊" />
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
    teal: 'bg-teal-50 border-teal-200',
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
    <div className="bg-white border-2 border-teal-200 rounded-lg p-5">
      <h3 className="text-xl font-bold text-gray-900 mb-4">{title}</h3>
      <ul className="space-y-2">
        {practices.map((practice, index) => (
          <li key={index} className="flex items-start">
            <span className="text-teal-600 mr-2 flex-shrink-0">✓</span>
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
