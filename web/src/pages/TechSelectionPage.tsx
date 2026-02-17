import { CodeBlock } from '../components';
import { useState } from 'react';

export const TechSelectionPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'registry' | 'mq' | 'transaction' | 'cache'>('registry');

  return (
    <div className="prose prose-slate max-w-none">
      <div className="bg-gradient-to-r from-emerald-600 to-teal-700 text-white rounded-lg p-6 mb-8">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-4xl font-bold mb-2">技术选型决策指南</h1>
            <p className="text-emerald-100 text-lg">科学的技术选型方法论与决策框架</p>
          </div>
          <div className="flex gap-3 text-sm">
            <span className="px-3 py-1 bg-white/20 rounded-full">🏗️ 架构师</span>
            <span className="px-3 py-1 bg-white/20 rounded-full">⏱️ 约60分钟</span>
            <span className="px-3 py-1 bg-white/20 rounded-full">📚 10个知识点</span>
          </div>
        </div>
      </div>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">技术选型六步法</h2>
        
        <div className="bg-emerald-50 border-l-4 border-emerald-500 p-6 rounded-lg mb-6">
          <h4 className="font-bold text-gray-900 mb-2">🎯 核心原则</h4>
          <p className="text-gray-700 text-sm">
            技术选型不是选择"最好"的技术，而是选择"最适合"的技术。
            需要综合考虑<strong>业务需求、团队能力、成本预算、技术生态</strong>等多个维度。
          </p>
        </div>

        <div className="space-y-4">
          <SelectionStep
            step="1"
            title="明确需求"
            description="清晰定义业务需求、技术需求、团队能力和预算约束"
            details={[
              '业务需求：性能指标、可用性要求、扩展性需求',
              '技术需求：技术栈限制、集成要求、安全合规',
              '团队能力：现有技能、学习曲线、培训成本',
              '预算约束：开发成本、运维成本、许可费用'
            ]}
          />
          
          <SelectionStep
            step="2"
            title="调研候选方案"
            description="广泛调研开源项目、商业产品和自研方案"
            details={[
              '开源项目：GitHub Stars、社区活跃度、版本更新频率',
              '商业产品：功能完整性、技术支持、价格策略',
              '自研方案：技术可行性、开发周期、维护成本',
              '行业案例：同类公司的选择、踩坑经验'
            ]}
          />
          
          <SelectionStep
            step="3"
            title="建立评估维度"
            description="确定评估维度和权重，建立量化评分体系"
            details={[
              '功能性：功能完整性、扩展性、兼容性',
              '性能：吞吐量、延迟、资源消耗',
              '可靠性：稳定性、容错能力、数据一致性',
              '生态：社区活跃度、文档质量、周边工具',
              '成本：学习成本、开发成本、运维成本'
            ]}
          />
          
          <SelectionStep
            step="4"
            title="POC 验证"
            description="进行概念验证，验证核心假设"
            details={[
              '核心功能验证：验证关键功能是否满足需求',
              '性能测试：压测验证性能指标',
              '集成测试：验证与现有系统的兼容性',
              '团队试用：小范围试用收集反馈'
            ]}
          />
          
          <SelectionStep
            step="5"
            title="决策与记录"
            description="做出决策并使用 ADR 记录决策过程"
            details={[
              '量化评分：根据评估维度打分',
              '团队讨论：充分讨论不同观点',
              '决策记录：使用 ADR 记录决策过程',
              '风险预案：制定风险应对措施'
            ]}
          />
          
          <SelectionStep
            step="6"
            title="持续评估"
            description="定期回顾决策效果，必要时调整"
            details={[
              '效果评估：评估技术选型的实际效果',
              '问题收集：收集团队使用中的问题',
              '持续优化：根据反馈持续优化',
              '定期回顾：每季度回顾决策是否仍然有效'
            ]}
          />
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">微服务技术栈选型对比</h2>
        
        <div className="bg-slate-50 rounded-lg p-4 mb-6">
          <div className="flex gap-2 flex-wrap">
            <TabButton active={activeTab === 'registry'} onClick={() => setActiveTab('registry')}>注册中心</TabButton>
            <TabButton active={activeTab === 'mq'} onClick={() => setActiveTab('mq')}>消息队列</TabButton>
            <TabButton active={activeTab === 'transaction'} onClick={() => setActiveTab('transaction')}>分布式事务</TabButton>
            <TabButton active={activeTab === 'cache'} onClick={() => setActiveTab('cache')}>缓存方案</TabButton>
          </div>
        </div>

        {activeTab === 'registry' && (
          <div className="space-y-6">
            <TechComparisonCard
              name="Nacos"
              score={92}
              recommendation="推荐"
              pros={[
                '服务发现 + 配置中心一体化',
                'AP/CP 模式可切换',
                '控制台完善，可视化管理',
                '国内生态完善，中文文档友好',
                '支持 DNS 协议发现'
              ]}
              cons={[
                '版本更新相对较慢',
                '集群部署配置较复杂',
                '大规模场景性能优化需要经验'
              ]}
              suitable={['Spring Cloud Alibaba 项目', '需要配置中心的场景', '国内团队']}
              code={`spring:
  cloud:
    nacos:
      discovery:
        server-addr: localhost:8848
        namespace: production
      config:
        server-addr: localhost:8848
        file-extension: yaml`}
            />
            
            <TechComparisonCard
              name="Consul"
              score={85}
              recommendation="备选"
              pros={[
                '服务发现 + 配置 + KV 存储',
                'Raft 协议，强一致性',
                '多数据中心支持',
                'HashiCorp 生态完善',
                '健康检查机制完善'
              ]}
              cons={[
                '配置中心功能较弱',
                '国内社区相对较小',
                '学习曲线较陡'
              ]}
              suitable={['多数据中心场景', 'HashiCorp 技术栈', '强一致性要求']}
              code={`spring:
  cloud:
    consul:
      host: localhost
      port: 8500
      discovery:
        service-name: \${spring.application.name}`}
            />
            
            <TechComparisonCard
              name="Eureka"
              score={70}
              recommendation="不推荐"
              pros={[
                'Netflix 成熟方案',
                'Spring Cloud 原生支持',
                '学习资料丰富'
              ]}
              cons={[
                '2.x 版本停止维护',
                '仅支持 AP 模式',
                '无配置中心功能',
                '性能不如 Nacos'
              ]}
              suitable={['遗留系统维护', '已有 Eureka 基础设施']}
              code={`spring:
  cloud:
    eureka:
      client:
        service-url:
          defaultZone: http://localhost:8761/eureka/`}
            />
            
            <TechComparisonCard
              name="Zookeeper"
              score={65}
              recommendation="不推荐"
              pros={[
                'CP 架构，强一致性',
                '成熟稳定',
                '支持多种协调场景'
              ]}
              cons={[
                '配置复杂，运维成本高',
                '无控制台界面',
                '性能不如 Nacos',
                '仅服务发现，无配置中心'
              ]}
              suitable={['已有 Zookeeper 集群', '强一致性要求']}
              code={`spring:
  cloud:
    zookeeper:
      connect-string: localhost:2181`}
            />
          </div>
        )}

        {activeTab === 'mq' && (
          <div className="space-y-6">
            <TechComparisonCard
              name="RocketMQ"
              score={90}
              recommendation="推荐"
              pros={[
                '事务消息支持完善',
                '顺序消息、延迟消息',
                '阿里生态，金融级可靠',
                '经过双十一验证',
                '消息轨迹追踪'
              ]}
              cons={[
                '不支持 AMQP 协议',
                '管理界面相对简单',
                '社区国际化程度较低'
              ]}
              suitable={['金融交易场景', '事务消息需求', 'Spring Cloud Alibaba 项目']}
              code={`spring:
  cloud:
    stream:
      rocketmq:
        binder:
          name-server: localhost:9876
      bindings:
        output:
          destination: order-topic
          content-type: application/json`}
            />
            
            <TechComparisonCard
              name="Kafka"
              score={88}
              recommendation="推荐"
              pros={[
                '高吞吐量，百万级 QPS',
                '持久化存储，消息回溯',
                '流处理生态',
                '社区活跃，生态丰富'
              ]}
              cons={[
                '不支持事务消息',
                '延迟消息支持有限',
                '消费模型相对复杂'
              ]}
              suitable={['日志采集场景', '大数据流处理', '高吞吐量需求']}
              code={`spring:
  kafka:
    bootstrap-servers: localhost:9092
    producer:
      key-serializer: org.apache.kafka.common.serialization.StringSerializer
      value-serializer: org.apache.kafka.common.serialization.StringSerializer`}
            />
            
            <TechComparisonCard
              name="RabbitMQ"
              score={82}
              recommendation="备选"
              pros={[
                '灵活的路由机制',
                '延迟队列支持',
                'AMQP 协议标准',
                '管理界面友好'
              ]}
              cons={[
                '吞吐量相对较低',
                '集群扩展性有限',
                '消息堆积能力较弱'
              ]}
              suitable={['复杂路由场景', '延迟队列需求', '中小规模应用']}
              code={`spring:
  rabbitmq:
    host: localhost
    port: 5672
    username: guest
    password: guest`}
            />
            
            <TechComparisonCard
              name="Pulsar"
              score={78}
              recommendation="观望"
              pros={[
                '存算分离架构',
                '多租户支持',
                '云原生设计',
                '统一消息和流处理'
              ]}
              cons={[
                '学习曲线陡峭',
                '社区相对较小',
                '运维复杂度高'
              ]}
              suitable={['云原生场景', '多租户需求', '长期技术储备']}
              code={`spring:
  pulsar:
    client:
      service-url: pulsar://localhost:6650`}
            />
          </div>
        )}

        {activeTab === 'transaction' && (
          <div className="space-y-6">
            <TechComparisonCard
              name="Seata AT"
              score={88}
              recommendation="推荐"
              pros={[
                '无侵入，对业务代码改动小',
                '自动补偿，开发简单',
                '与 Spring Cloud 集成好',
                '支持多种数据库'
              ]}
              cons={[
                '性能相对较低',
                '全局锁可能导致死锁',
                '不适合高并发场景'
              ]}
              suitable={['大多数业务场景', '快速接入分布式事务', '对性能要求不高']}
              code={`@GlobalTransactional
public void createOrder(OrderRequest request) {
    orderService.create(request);
    inventoryService.deduct(request.getProductId(), request.getQuantity());
    paymentService.pay(request.getOrderId());
}`}
            />
            
            <TechComparisonCard
              name="Seata TCC"
              score={85}
              recommendation="推荐"
              pros={[
                '高性能，无全局锁',
                '手动控制，灵活性强',
                '适合金融场景'
              ]}
              cons={[
                '开发复杂度高',
                '需要实现三个接口',
                '幂等性需要自行保证'
              ]}
              suitable={['金融交易场景', '高并发场景', '对性能要求高']}
              code={`@LocalTCC
public interface InventoryTccAction {
    @TwoPhaseBusinessAction(name = "prepareDeduct", commitMethod = "commit", rollbackMethod = "rollback")
    boolean prepareDeduct(@BusinessActionContextParameter(paramName = "productId") Long productId, int count);
    
    boolean commit(BusinessActionContext context);
    
    boolean rollback(BusinessActionContext context);
}`}
            />
            
            <TechComparisonCard
              name="Saga"
              score={80}
              recommendation="备选"
              pros={[
                '适合长事务流程',
                '编排灵活',
                '无全局锁'
              ]}
              cons={[
                '补偿逻辑复杂',
                '缺乏框架支持',
                '调试困难'
              ]}
              suitable={['长流程业务', '跨系统编排', '复杂业务流程']}
              code={`// Seata Saga 模式
{
  "Name": "createOrder",
  "Steps": [
    {"Service": "orderService", "Method": "create", "Compensate": "cancel"},
    {"Service": "inventoryService", "Method": "deduct", "Compensate": "restore"},
    {"Service": "paymentService", "Method": "pay", "Compensate": "refund"}
  ]
}`}
            />
            
            <TechComparisonCard
              name="本地消息表"
              score={75}
              recommendation="备选"
              pros={[
                '最终一致性',
                '实现简单',
                '无框架依赖'
              ]}
              cons={[
                '需要定时任务轮询',
                '消息表需要维护',
                '不适合实时性要求高的场景'
              ]}
              suitable={['对一致性要求不高', '无分布式事务框架', '简单业务场景']}
              code={`// 本地消息表方案
@Transactional
public void createOrder(OrderRequest request) {
    Order order = orderMapper.insert(request);
    messageMapper.insert(new Message(order.getId(), "ORDER_CREATED"));
}

@Scheduled(fixedDelay = 5000)
public void sendPendingMessages() {
    List<Message> messages = messageMapper.selectPending();
    messages.forEach(msg -> {
        rocketMQTemplate.send("order-topic", msg);
        messageMapper.markSent(msg.getId());
    });
}`}
            />
          </div>
        )}

        {activeTab === 'cache' && (
          <div className="space-y-6">
            <TechComparisonCard
              name="Redis"
              score={95}
              recommendation="推荐"
              pros={[
                '丰富的数据结构',
                '高性能，单机 10万+ QPS',
                '持久化支持',
                '集群模式支持',
                '生态完善'
              ]}
              cons={[
                '单线程模型',
                '内存成本较高',
                '大 Key 影响性能'
              ]}
              suitable={['分布式缓存', '会话存储', '排行榜', '分布式锁']}
              code={`spring:
  redis:
    host: localhost
    port: 6379
    password: \${REDIS_PASSWORD}
    lettuce:
      pool:
        max-active: 50
        max-idle: 20`}
            />
            
            <TechComparisonCard
              name="Caffeine + Redis"
              score={92}
              recommendation="推荐"
              pros={[
                '多级缓存，性能最优',
                '本地缓存减少网络开销',
                '分布式缓存保证一致性'
              ]}
              cons={[
                '缓存一致性处理复杂',
                '需要考虑缓存失效策略'
              ]}
              suitable={['高并发读场景', '商品详情页', '热点数据缓存']}
              code={`@Configuration
public class CacheConfig {
    @Bean
    public CacheManager cacheManager(RedisConnectionFactory factory) {
        return RedisCacheManager.builder(factory)
            .cacheDefaults(RedisCacheConfiguration.defaultCacheConfig()
                .entryTtl(Duration.ofMinutes(30)))
            .build();
    }
}

// Caffeine 本地缓存
@Bean
public Cache<String, Object> localCache() {
    return Caffeine.newBuilder()
        .maximumSize(10000)
        .expireAfterWrite(5, TimeUnit.MINUTES)
        .build();
}`}
            />
            
            <TechComparisonCard
              name="Memcached"
              score={70}
              recommendation="不推荐"
              pros={[
                '多线程模型',
                '内存利用率高',
                '简单易用'
              ]}
              cons={[
                '数据结构单一',
                '不支持持久化',
                '社区活跃度下降'
              ]}
              suitable={['简单 KV 缓存', '已有 Memcached 基础设施']}
              code={`// Memcached 配置
memcached:
  servers: localhost:11211
  pool-size: 10`}
            />
          </div>
        )}
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">技术选型决策树</h2>
        
        <CodeBlock
          language="text"
          code={`微服务框架选型决策树：

                    ┌─────────────────────────────────────┐
                    │      是否需要微服务架构？             │
                    └─────────────────┬───────────────────┘
                                      │
              ┌───────────────────────┼───────────────────────┐
              │                       │                       │
              ▼                       ▼                       ▼
          团队<10人              团队10-50人              团队>50人
              │                       │                       │
              ▼                       ▼                       ▼
        ┌─────────┐           ┌─────────────┐         ┌─────────────┐
        │ 单体架构 │           │ 模块化单体   │         │  微服务架构  │
        │ Spring  │           │ + 模块拆分   │         │ Spring Cloud│
        │ Boot    │           │             │         │ Alibaba    │
        └─────────┘           └─────────────┘         └─────────────┘

注册中心选型决策树：

                    ┌─────────────────────────────────────┐
                    │      是否需要配置中心？              │
                    └─────────────────┬───────────────────┘
                                      │
              ┌───────────────────────┼───────────────────────┐
              │                       │                       │
              ▼                       ▼                       ▼
            需要                   不需要                 可选
              │                       │                       │
              ▼                       ▼                       ▼
        ┌─────────┐           ┌─────────────┐         ┌─────────────┐
        │  Nacos  │           │  Eureka     │         │  Consul     │
        │ (推荐)   │           │ (不推荐)    │         │ (备选)      │
        └─────────┘           └─────────────┘         └─────────────┘

消息队列选型决策树：

                    ┌─────────────────────────────────────┐
                    │      主要使用场景是什么？            │
                    └─────────────────┬───────────────────┘
                                      │
       ┌──────────────────────────────┼──────────────────────────────┐
       │                              │                              │
       ▼                              ▼                              ▼
   金融交易                        日志采集                      业务解耦
       │                              │                              │
       ▼                              ▼                              ▼
 ┌───────────┐                ┌─────────────┐              ┌─────────────┐
 │ RocketMQ  │                │   Kafka     │              │ RabbitMQ    │
 │ (事务消息) │                │ (高吞吐)    │              │ (灵活路由)  │
 └───────────┘                └─────────────┘              └─────────────┘

分布式事务选型决策树：

                    ┌─────────────────────────────────────┐
                    │      性能要求如何？                  │
                    └─────────────────┬───────────────────┘
                                      │
              ┌───────────────────────┼───────────────────────┐
              │                       │                       │
              ▼                       ▼                       ▼
          高性能                   中等性能                  低要求
              │                       │                       │
              ▼                       ▼                       ▼
        ┌─────────┐           ┌─────────────┐         ┌─────────────┐
        │ Seata   │           │  Seata AT   │         │ 本地消息表  │
        │ TCC     │           │  (推荐)     │         │             │
        └─────────┘           └─────────────┘         └─────────────┘`}
        />
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">技术选型评估矩阵</h2>
        
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-bold text-gray-900">评估维度</th>
                <th className="px-4 py-3 text-left text-sm font-bold text-gray-900">权重</th>
                <th className="px-4 py-3 text-left text-sm font-bold text-gray-900">评分标准</th>
                <th className="px-4 py-3 text-left text-sm font-bold text-gray-900">说明</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr>
                <td className="px-4 py-3 text-sm text-gray-700 font-medium">功能完整性</td>
                <td className="px-4 py-3 text-sm text-gray-700">25%</td>
                <td className="px-4 py-3 text-sm text-gray-700">1-10分</td>
                <td className="px-4 py-3 text-sm text-gray-700">是否满足所有功能需求</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm text-gray-700 font-medium">性能指标</td>
                <td className="px-4 py-3 text-sm text-gray-700">20%</td>
                <td className="px-4 py-3 text-sm text-gray-700">1-10分</td>
                <td className="px-4 py-3 text-sm text-gray-700">吞吐量、延迟、资源消耗</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm text-gray-700 font-medium">可靠性</td>
                <td className="px-4 py-3 text-sm text-gray-700">15%</td>
                <td className="px-4 py-3 text-sm text-gray-700">1-10分</td>
                <td className="px-4 py-3 text-sm text-gray-700">稳定性、容错能力</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm text-gray-700 font-medium">生态成熟度</td>
                <td className="px-4 py-3 text-sm text-gray-700">15%</td>
                <td className="px-4 py-3 text-sm text-gray-700">1-10分</td>
                <td className="px-4 py-3 text-sm text-gray-700">社区活跃度、文档质量</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm text-gray-700 font-medium">学习成本</td>
                <td className="px-4 py-3 text-sm text-gray-700">10%</td>
                <td className="px-4 py-3 text-sm text-gray-700">1-10分</td>
                <td className="px-4 py-3 text-sm text-gray-700">团队学习曲线</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm text-gray-700 font-medium">运维成本</td>
                <td className="px-4 py-3 text-sm text-gray-700">10%</td>
                <td className="px-4 py-3 text-sm text-gray-700">1-10分</td>
                <td className="px-4 py-3 text-sm text-gray-700">部署、监控、维护难度</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm text-gray-700 font-medium">成本预算</td>
                <td className="px-4 py-3 text-sm text-gray-700">5%</td>
                <td className="px-4 py-3 text-sm text-gray-700">1-10分</td>
                <td className="px-4 py-3 text-sm text-gray-700">许可费用、硬件成本</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mt-6 bg-green-50 border border-green-200 rounded-lg p-4">
          <h4 className="font-bold text-green-900 mb-2">✅ 决策规则</h4>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>• <strong>加权总分 ≥ 8.0</strong>：强烈推荐采用</li>
            <li>• <strong>加权总分 6.0-8.0</strong>：可以考虑，需进一步评估</li>
            <li>• <strong>加权总分 &lt; 6.0</strong>：不推荐采用</li>
          </ul>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">技术选型最佳实践</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-green-50 border-2 border-green-200 rounded-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">✅ 推荐做法</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="text-green-600 mr-2">✓</span>
                <span className="text-sm text-gray-700">优先选择成熟稳定的技术</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2">✓</span>
                <span className="text-sm text-gray-700">考虑团队技术栈和学习成本</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2">✓</span>
                <span className="text-sm text-gray-700">进行充分的 POC 验证</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2">✓</span>
                <span className="text-sm text-gray-700">关注社区活跃度和生态</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2">✓</span>
                <span className="text-sm text-gray-700">记录决策过程（ADR）</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2">✓</span>
                <span className="text-sm text-gray-700">制定备选方案和回滚计划</span>
              </li>
            </ul>
          </div>
          
          <div className="bg-red-50 border-2 border-red-200 rounded-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">❌ 避免做法</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="text-red-600 mr-2">✗</span>
                <span className="text-sm text-gray-700">盲目追新，选择不成熟技术</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-600 mr-2">✗</span>
                <span className="text-sm text-gray-700">忽视团队能力，选择学习曲线陡的技术</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-600 mr-2">✗</span>
                <span className="text-sm text-gray-700">过度设计，引入不必要的复杂性</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-600 mr-2">✗</span>
                <span className="text-sm text-gray-700">忽略运维成本和监控能力</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-600 mr-2">✗</span>
                <span className="text-sm text-gray-700">没有备选方案和回滚计划</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-600 mr-2">✗</span>
                <span className="text-sm text-gray-700">仅凭个人喜好做决策</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-r from-emerald-600 to-teal-700 text-white p-8 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">🎯 掌握了技术选型，下一步学习什么?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <NextStepCard title="架构决策记录" description="ADR 编写实践" link="/architecture-decisions" icon="📝" />
          <NextStepCard title="服务拆分原则" description="DDD 战略设计" link="/service-decomposition" icon="📐" />
          <NextStepCard title="系统设计" description="架构设计方法论" link="/system-design" icon="🏗️" />
          <NextStepCard title="架构师软技能" description="沟通与影响力" link="/architect-soft-skills" icon="🤝" />
        </div>
      </section>
    </div>
  );
};

interface SelectionStepProps {
  step: string;
  title: string;
  description: string;
  details: string[];
}

const SelectionStep: React.FC<SelectionStepProps> = ({ step, title, description, details }) => {
  return (
    <div className="flex items-start">
      <span className="flex-shrink-0 w-8 h-8 bg-emerald-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-4">
        {step}
      </span>
      <div className="flex-1 bg-white border border-gray-200 rounded-lg p-4">
        <h4 className="text-lg font-bold text-gray-900 mb-1">{title}</h4>
        <p className="text-sm text-gray-700 mb-3">{description}</p>
        <ul className="text-sm text-gray-600 space-y-1">
          {details.map((detail, index) => (
            <li key={index}>• {detail}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

interface TabButtonProps {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

const TabButton: React.FC<TabButtonProps> = ({ active, onClick, children }) => {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
        active
          ? 'bg-emerald-600 text-white'
          : 'bg-white text-gray-700 hover:bg-gray-100'
      }`}
    >
      {children}
    </button>
  );
};

interface TechComparisonCardProps {
  name: string;
  score: number;
  recommendation: string;
  pros: string[];
  cons: string[];
  suitable: string[];
  code: string;
}

const TechComparisonCard: React.FC<TechComparisonCardProps> = ({
  name,
  score,
  recommendation,
  pros,
  cons,
  suitable,
  code
}) => {
  const recommendationColors: Record<string, string> = {
    '推荐': 'bg-green-100 text-green-800',
    '备选': 'bg-yellow-100 text-yellow-800',
    '不推荐': 'bg-red-100 text-red-800',
    '观望': 'bg-gray-100 text-gray-800',
  };

  return (
    <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          <h3 className="text-xl font-bold text-gray-900">{name}</h3>
          <span className={`px-2 py-1 text-xs rounded-full ${recommendationColors[recommendation]}`}>
            {recommendation}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">综合评分</span>
          <span className="text-2xl font-bold text-emerald-600">{score}</span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div className="bg-green-50 rounded-lg p-3">
          <h4 className="font-bold text-green-900 mb-2 text-sm">✅ 优势</h4>
          <ul className="text-xs text-gray-700 space-y-1">
            {pros.map((pro, index) => (
              <li key={index}>• {pro}</li>
            ))}
          </ul>
        </div>
        <div className="bg-red-50 rounded-lg p-3">
          <h4 className="font-bold text-red-900 mb-2 text-sm">⚠️ 劣势</h4>
          <ul className="text-xs text-gray-700 space-y-1">
            {cons.map((con, index) => (
              <li key={index}>• {con}</li>
            ))}
          </ul>
        </div>
        <div className="bg-blue-50 rounded-lg p-3">
          <h4 className="font-bold text-blue-900 mb-2 text-sm">🎯 适用场景</h4>
          <ul className="text-xs text-gray-700 space-y-1">
            {suitable.map((s, index) => (
              <li key={index}>• {s}</li>
            ))}
          </ul>
        </div>
      </div>
      
      <CodeBlock language="yaml" code={code} />
    </div>
  );
};

interface NextStepCardProps {
  title: string;
  description: string;
  link: string;
  icon: string;
}

const NextStepCard: React.FC<NextStepCardProps> = ({ title, description, link, icon }) => {
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
