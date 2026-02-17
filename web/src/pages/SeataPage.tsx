import { useState } from 'react';
import { CodeBlock } from '../components';

export const SeataPage: React.FC = () => {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  return (
    <div className="prose prose prose-slate max-w-none">
      {/* 页面头部 */}
      <div className="bg-gradient-to-r from-red-600 to-pink-600 text-white rounded-lg p-6 mb-8">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-4xl font-bold mb-2">Seata 分布式事务</h1>
            <p className="text-red-50 text-lg">高性能微服务分布式事务解决方案</p>
          </div>
          <div className="flex gap-3 text-sm">
            <span className="px-3 py-1 bg-white/20 rounded-full">🏗️ 架构师</span>
            <span className="px-3 py-1 bg-white/20 rounded-full">⏱️ 约50分钟</span>
            <span className="px-3 py-1 bg-white/20 rounded-full">📚 12个知识点</span>
          </div>
        </div>
      </div>

      {/* 什么是分布式事务 */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">什么是分布式事务?</h2>
        <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-lg mb-6">
          <p className="text-lg text-gray-800 leading-relaxed mb-4">
            <strong>Seata</strong> (Simple Extensible Autonomous Transaction Architecture) 是一款开源的分布式事务解决方案，
            旨在提供高性能且简单易用的分布式事务服务。
          </p>
          <p className="text-gray-700 mb-4">
            Seata 将为用户提供了 <strong>AT、TCC、SAGA 和 XA</strong> 等事务模式，
            帮助用户解决微服务架构下的数据一致性问题。
          </p>
          <div className="bg-white p-4 rounded border border-red-200 mt-4">
            <h4 className="font-bold text-gray-900 mb-2">💡 核心特性</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start">
                <span className="text-red-600 mr-2">✓</span>
                <span><strong>多种事务模式</strong> - AT、TCC、SAGA、XA 满足不同场景</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-600 mr-2">✓</span>
                <span><strong>高性能</strong> - 零侵入自动补偿，支持高并发</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-600 mr-2">✓</span>
                <span><strong>易集成</strong> - 与 Spring Cloud、Dubbo 等框架无缝集成</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-600 mr-2">✓</span>
                <span><strong>可扩展</strong> - 支持多种存储模式（file、db、redis）</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-600 mr-2">✓</span>
                <span><strong>生产级</strong> - 阿里巴巴大规模生产验证</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <FeatureCard icon="🔄" title="AT模式" desc="自动事务模式" color="red" />
          <FeatureCard icon="✅" title="TCC模式" desc=" try-confirm-cancel" color="blue" />
          <FeatureCard icon="📜" title="SAGA模式" desc="长事务解决方案" color="green" />
          <FeatureCard icon="🔗" title="XA模式" desc="强一致性事务" color="purple" />
        </div>
      </section>

      {/* 为什么需要分布式事务 */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">为什么需要分布式事务?</h2>

        <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-lg mb-6">
          <h4 className="font-bold text-gray-900 mb-3">🛒 电商下单场景示例</h4>
          <div className="space-y-3">
            <p className="text-gray-700 text-sm">
              当用户下单购买商品时，系统需要执行多个操作：
            </p>
            <ol className="list-decimal list-inside space-y-2 text-sm text-gray-700">
              <li><strong>订单服务</strong> - 创建订单（订单状态：待支付）</li>
              <li><strong>库存服务</strong> - 扣减商品库存</li>
              <li><strong>账户服务</strong> - 扣减用户余额</li>
              <li><strong>积分服务</strong> - 增加用户积分</li>
            </ol>
            <div className="mt-4 p-4 bg-white rounded border border-red-200">
              <p className="text-sm text-gray-700">
                <strong>问题：</strong>如果库存扣减成功但余额扣减失败，会导致数据不一致。
                这就需要分布式事务来保证<strong>要么全部成功，要么全部失败</strong>。
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-lg">
            <h3 className="text-xl font-bold text-gray-900 mb-3">❌ 本地事务的局限</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>• 只能保证单个数据库的一致性</li>
              <li>• 无法跨微服务边界</li>
              <li>• 网络故障无法回滚</li>
              <li>• 分布式环境下力不从心</li>
            </ul>
          </div>

          <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-lg">
            <h3 className="text-xl font-bold text-gray-900 mb-3">✅ 分布式事务的价值</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>• <strong>数据一致性</strong> - 保证跨服务数据一致</li>
              <li>• <strong>业务完整性</strong> - 保证业务逻辑完整</li>
              <li>• <strong>故障恢复</strong> - 自动补偿和重试</li>
              <li>• <strong>开发简单</strong> - 注解式编程模型</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 分布式事务理论基础 */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">分布式事务理论基础</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">📐 CAP 定理</h3>
            <p className="text-sm text-gray-700 mb-3">
              CAP 定理指出，一个分布式系统不可能同时满足以下三点：
            </p>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start">
                <span className="font-bold text-blue-600 mr-2">C</span>
                <span><strong>Consistency</strong> - 一致性</span>
                <p className="text-xs text-gray-600 mt-1 ml-6">所有节点在同一时间看到相同的数据</p>
              </li>
              <li className="flex items-start">
                <span className="font-bold text-blue-600 mr-2">A</span>
                <span><strong>Availability</strong> - 可用性</span>
                <p className="text-xs text-gray-600 mt-1 ml-6">每次请求都能得到响应</p>
              </li>
              <li className="flex items-start">
                <span className="font-bold text-blue-600 mr-2">P</span>
                <span><strong>Partition Tolerance</strong> - 分区容错性</span>
                <p className="text-xs text-gray-600 mt-1 ml-6">系统在网络分区时仍能运行</p>
              </li>
            </ul>
            <div className="mt-4 p-3 bg-white rounded border border-blue-200">
              <p className="text-xs text-gray-700">
                <strong>结论：</strong>在分布式系统中，P（分区容错）是必须的，
                因此只能在 C 和 A 之间权衡。Seata 提供了不同的一致性级别。
              </p>
            </div>
          </div>

          <div className="bg-purple-50 border-2 border-purple-200 rounded-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">🔐 BASE 理论</h3>
            <p className="text-sm text-gray-700 mb-3">
              BASE 理论是对 CAP 中 AP 的扩展，通过<strong>最终一致性</strong>来保证可用性：
            </p>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start">
                <span className="font-bold text-purple-600 mr-2">BA</span>
                <span><strong>Basically Available</strong> - 基本可用</span>
                <p className="text-xs text-gray-600 mt-1 ml-6">允许损失部分可用性</p>
              </li>
              <li className="flex items-start">
                <span className="font-bold text-purple-600 mr-2">S</span>
                <span><strong>Soft State</strong> - 软状态</span>
                <p className="text-xs text-gray-600 mt-1 ml-6">允许数据存在中间状态</p>
              </li>
              <li className="flex items-start">
                <span className="font-bold text-purple-600 mr-2">E</span>
                <span><strong>Eventually Consistent</strong> - 最终一致性</span>
                <p className="text-xs text-gray-600 mt-1 ml-6">经过一段时间后最终达到一致</p>
              </li>
            </ul>
            <div className="mt-4 p-3 bg-white rounded border border-purple-200">
              <p className="text-xs text-gray-700">
                <strong>Seata 的设计理念：</strong>BASE 理论，通过 AT 模式的自动补偿
                和 TCC 模式的手动补偿，实现最终一致性。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Seata 核心概念 */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Seata 核心概念</h2>

        <div className="bg-gray-50 border-l-4 border-gray-500 p-6 rounded-lg mb-6">
          <h4 className="font-bold text-gray-900 mb-3">🏗️ Seata 三大组件</h4>
          <p className="text-gray-700 text-sm mb-4">
            Seata 通过将一个全局事务拆分为多个分支事务，协调多个资源管理器来完成分布式事务。
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <ConceptCard3
            title="TC (Transaction Coordinator)"
            level="beginner"
            desc="事务协调器，维护全局事务状态，协调分支事务的提交或回滚"
            example="Seata Server"
          />
          <ConceptCard3
            title="TM (Transaction Manager)"
            level="beginner"
            desc="事务管理器，定义全局事务范围，开始全局事务、提交或回滚全局事务"
            example="@GlobalTransactional"
          />
          <ConceptCard3
            title="RM (Resource Manager)"
            level="beginner"
            desc="资源管理器，管理分支事务，向 TC 注册分支事务、汇报分支事务状态"
            example="数据库、Redis"
          />
        </div>

        <div className="mt-6 p-6 bg-white border-2 border-red-200 rounded-lg">
          <h4 className="font-bold text-gray-900 mb-4">🔄 分布式事务执行流程</h4>
          <div className="space-y-3 text-sm">
            <div className="flex items-start">
              <span className="flex-shrink-0 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs mr-3">1</span>
              <div>
                <p className="font-semibold text-gray-900">TM 向 TC 申请开启全局事务</p>
                <p className="text-gray-600 text-xs">TC 生成全局事务 ID (XID)</p>
              </div>
            </div>
            <div className="flex items-start">
              <span className="flex-shrink-0 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs mr-3">2</span>
              <div>
                <p className="font-semibold text-gray-900">TM 调用各微服务（分支事务）</p>
                <p className="text-gray-600 text-xs">XID 通过服务调用链传播</p>
              </div>
            </div>
            <div className="flex items-start">
              <span className="flex-shrink-0 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs mr-3">3</span>
              <div>
                <p className="font-semibold text-gray-900">RM 向 TC 注册分支事务</p>
                <p className="text-gray-600 text-xs">将其纳入全局事务管辖</p>
              </div>
            </div>
            <div className="flex items-start">
              <span className="flex-shrink-0 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs mr-3">4</span>
              <div>
                <p className="font-semibold text-gray-900">TM 结束全局事务（提交或回滚）</p>
                <p className="text-gray-600 text-xs">根据执行结果决定</p>
              </div>
            </div>
            <div className="flex items-start">
              <span className="flex-shrink-0 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs mr-3">5</span>
              <div>
                <p className="font-semibold text-gray-900">TC 驱动所有分支事务提交或回滚</p>
                <p className="text-gray-600 text-xs">保证最终一致性</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 快速开始 */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">快速开始</h2>
        <p className="text-gray-700 mb-6">通过一个电商下单示例，学习如何使用 Seata 解决分布式事务问题。</p>

        <h3>步骤 1: 启动 Seata Server</h3>
        <CodeBlock
          language="bash"
          code={`# 下载 Seata Server
wget https://github.com/seata/seata/releases/download/v2.0.0/seata-server-2.0.0.zip
unzip seata-server-2.0.0.zip

# 修改配置文件 conf/file.conf
# 修改存储模式为数据库
store {
  mode = "db"
  db {
    datasource = "druid"
    db-type = "mysql"
    driver-class-name = "com.mysql.jdbc.Driver"
    url = "jdbc:mysql://127.0.0.1:3306/seata"
    user = "root"
    password = "123456"
  }
}

# 启动 Seata Server
cd seata/bin
./seata-server.sh -p 8091 -h 127.0.0.1

# 或使用 Docker 启动
docker run --name seata-server \\
  -p 8091:8091 \\
  -e SEATA_PORT=8091 \\
  -d seataio/seata-server:2.0.0`}
        />

        <h3>步骤 2: 添加依赖</h3>
        <CodeBlock
          language="xml"
          code={`<dependency>
    <groupId>com.alibaba.cloud</groupId>
    <artifactId>spring-cloud-starter-alibaba-seata</artifactId>
</dependency>

<dependency>
    <groupId>io.seata</groupId>
    <artifactId>seata-spring-boot-starter</artifactId>
    <version>2.0.0</version>
</dependency>

<dependency>
    <groupId>com.alibaba.cloud</groupId>
    <artifactId>spring-cloud-starter-alibaba-nacos-discovery</artifactId>
</dependency>`}
        />

        <h3>步骤 3: 配置 Seata</h3>
        <CodeBlock
          language="yaml"
          code={`# application.yml
seata:
  enabled: true
  application-id: order-service
  tx-service-group: my_test_tx_group  # 事务组名称
  service:
    vgroup-mapping:
      my_test_tx_group: default  # 事务组映射到集群
    grouplist:
      default: 127.0.0.1:8091  # Seata Server 地址
  registry:
    type: nacos
    nacos:
      server-addr: localhost:8848
      namespace:
      group: SEATA_GROUP
      application: seata-server
  config:
    type: nacos
    nacos:
      server-addr: localhost:8848
      namespace:
      group: SEATA_GROUP`}
        />

        <h3>步骤 4: 创建数据库表（undo_log）</h3>
        <CodeBlock
          language="sql"
          code={`-- 每个参与分布式事务的数据库都需要创建 undo_log 表
CREATE TABLE IF NOT EXISTS \`undo_log\`
(
    \`branch_id\`     BIGINT       NOT NULL COMMENT 'branch transaction id',
    \`xid\`           VARCHAR(128) NOT NULL COMMENT 'global transaction id',
    \`context\`       VARCHAR(128) NOT NULL COMMENT 'undo_log context,such as serialization',
    \`rollback_info\` LONGBLOB     NOT NULL COMMENT 'rollback info',
    \`log_status\`    INT(11)      NOT NULL COMMENT '0:normal status,1:defense status',
    \`log_created\`   DATETIME     NOT NULL COMMENT 'create datetime',
    \`log_modified\`  DATETIME     NOT NULL COMMENT 'modify datetime',
    UNIQUE KEY \`ux_undo_log\` (\`xid\`, \`branch_id\`)
) ENGINE = InnoDB
  AUTO_INCREMENT = 1
  DEFAULT CHARSET = utf8mb4 COMMENT ='AT transaction undo log';`}
        />

        <h3>步骤 5: 使用 @GlobalTransactional 注解</h3>
        <CodeBlock
          language="java"
          code={`// OrderService.java
@Service
public class OrderService {

    @Autowired
    private OrderMapper orderMapper;

    @Autowired
    private StorageClient storageClient;  // 库存服务 Feign 客户端

    @Autowired
    private AccountClient accountClient;  // 账户服务 Feign 客户端

    // @GlobalTransactional 开启全局事务
    @GlobalTransactional(name = "create-order", rollbackFor = Exception.class)
    public void createOrder(OrderDTO orderDTO) {
        log.info("开始创建订单: {}", orderDTO);

        // 1. 创建订单
        Order order = new Order();
        order.setUserId(orderDTO.getUserId());
        order.setProductId(orderDTO.getProductId());
        order.setCount(orderDTO.getCount());
        order.setMoney(orderDTO.getMoney());
        order.setStatus(OrderStatus.INIT.getValue());
        orderMapper.insert(order);

        // 2. 扣减库存
        storageClient.deduct(orderDTO.getProductId(), orderDTO.getCount());

        // 3. 扣减账户余额
        accountClient.debit(orderDTO.getUserId(), orderDTO.getMoney());

        // 4. 更新订单状态
        order.setStatus(OrderStatus.SUCCESS.getValue());
        orderMapper.updateById(order);

        log.info("订单创建成功");
    }
}

// 如果任何步骤失败，Seata 会自动回滚所有已执行的分支事务`}
        />
      </section>

      {/* 四种事务模式 */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Seata 四种事务模式</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-red-50 border-2 border-red-200 rounded-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-3">🔄 AT 模式（默认）</h3>
            <p className="text-sm text-gray-700 mb-3">
              <strong>Auto Transaction</strong> - 自动事务模式
            </p>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>• <strong>无侵入</strong>：无需修改业务代码</li>
              <li>• <strong>自动补偿</strong>：自动生成回滚 SQL</li>
              <li>• <strong>两阶段提交</strong>：</li>
              <li className="ml-4">- 第一阶段：提交本地事务，记录 undo log</li>
              <li className="ml-4">- 第二阶段：异步提交或回滚</li>
              <li>• <strong>适用场景</strong>：基于 SQL 的常规业务</li>
            </ul>
          </div>

          <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-3">✅ TCC 模式</h3>
            <p className="text-sm text-gray-700 mb-3">
              <strong>Try-Confirm-Cancel</strong> - 应用层两阶段提交
            </p>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>• <strong>强控制</strong>：完全由业务控制</li>
              <li>• <strong>高性能</strong>：锁粒度小，性能高</li>
              <li>• <strong>两阶段</strong>：</li>
              <li className="ml-4">- Try：资源检查和预留</li>
              <li className="ml-4">- Confirm：确认执行业务操作</li>
              <li className="ml-4">- Cancel：取消执行，释放资源</li>
              <li>• <strong>适用场景</strong>：性能要求高、资源敏感</li>
            </ul>
          </div>

          <div className="bg-green-50 border-2 border-green-200 rounded-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-3">📜 SAGA 模式</h3>
            <p className="text-sm text-gray-700 mb-3">
              <strong>长事务解决方案</strong> - 状态机模式
            </p>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>• <strong>长事务</strong>：适用于业务流程长</li>
              <li>• <strong>状态机</strong>：通过状态机定义流程</li>
              <li>• <strong>补偿机制</strong>：正向操作 + 补偿操作</li>
              <li>• <strong>优点</strong>：不依赖事务性数据库</li>
              <li>• <strong>适用场景</strong>：
              <br/>- 跨系统事务
              <br/>- 长时间运行的业务
              <br/>- 无法使用数据库事务的场景</li>
            </ul>
          </div>

          <div className="bg-purple-50 border-2 border-purple-200 rounded-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-3">🔗 XA 模式</h3>
            <p className="text-sm text-gray-700 mb-3">
              <strong>强一致性</strong> - 基于 XA 协议
            </p>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>• <strong>强一致性</strong>：保证 ACID</li>
              <li>• <strong>两阶段</strong>：
              <br/>- Prepare：准备阶段，资源锁定
              <br/>- Commit/Rollback：提交或回滚</li>
              <li>• <strong>缺点</strong>：性能较差，锁资源时间长</li>
              <li>• <strong>适用场景</strong>：
              <br/>- 对一致性要求高的场景
              <br/>- 短事务
              <br/>- 性能要求不高的场景</li>
            </ul>
          </div>
        </div>

        <div className="bg-gray-50 border-l-4 border-gray-500 p-6 rounded-lg">
          <h4 className="font-bold text-gray-900 mb-3">💡 模式选择建议</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <h5 className="font-semibold text-gray-800 mb-2">优先使用 AT 模式</h5>
              <p className="text-gray-700">
                大多数基于 SQL 的业务场景，使用 AT 模式即可满足需求，
                开发简单、性能良好。
              </p>
            </div>
            <div>
              <h5 className="font-semibold text-gray-800 mb-2">特殊场景选择其他模式</h5>
              <p className="text-gray-700">
                性能要求高用 TCC，长事务用 SAGA，
                强一致性要求用 XA。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* AT 模式详解 */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">AT 模式详解</h2>

        <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-lg mb-6">
          <h4 className="font-bold text-gray-900 mb-2">🔄 AT 模式两阶段提交</h4>
          <p className="text-gray-700 text-sm">
            AT 模式是目前<strong>最常用</strong>的分布式事务模式，它通过<strong>自动代理数据源</strong>，
            在不修改业务代码的情况下实现分布式事务。
          </p>
        </div>

        <h3>第一阶段：Prepare 阶段</h3>
        <CodeBlock
          language="java"
          code={`// 业务 SQL：UPDATE product_stock SET count = count - 10 WHERE id = 1

// AT 模式第一阶段执行流程：

// 1. 解析 SQL
//    识别表名、条件、更新字段

// 2. 查询前镜像（修改前的数据）
// SELECT id, count FROM product_stock WHERE id = 1;
// 前镜像：{id: 1, count: 100}

// 3. 执行业务 SQL
// UPDATE product_stock SET count = count - 10 WHERE id = 1;

// 4. 查询后镜像（修改后的数据）
// SELECT id, count FROM product_stock WHERE id = 1;
// 后镜像：{id: 1, count: 90}

// 5. 插入 undo_log
// INSERT INTO undo_log (branch_id, xid, context, rollback_info, ...)
// VALUES (..., '...', 前后镜像JSON, ...);

// 6. 提交本地事务
// 业务数据和 undo_log 在同一本地事务中提交

// 7. 向 TC 注册分支事务
// 上报分支事务状态，纳入全局事务管理`}
        />

        <h3>第二阶段：Commit 或 Rollback</h3>
        <CodeBlock
          language="java"
          code={`// 第二阶段由 TC 协调，异步执行

// 场景1：全局事务提交（所有分支都成功）

// 1. TC 收到 TM 的提交指令
// 2. TC 通知所有分支异步提交
// 3. RM 收到提交指令：
//    - 删除 undo_log
//    - 释放资源
//    - 完成提交

// 场景2：全局事务回滚（某个分支失败）

// 1. TC 收到 TM 的回滚指令
// 2. TC 通知所有分支回滚
// 3. RM 收到回滚指令：
//    - 查询 undo_log
//    - 生成反向 SQL（使用后镜像生成前镜像）
//    UPDATE product_stock SET count = 90 + 10 WHERE id = 1;
//    - 执行反向 SQL
//    - 删除 undo_log
//    - 完成回滚`}
        />

        <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-lg">
          <h4 className="font-bold text-gray-900 mb-2">⚡ AT 模式优势</h4>
          <ul className="space-y-1 text-sm text-gray-700">
            <li>• <strong>零侵入</strong>：业务代码无需任何修改</li>
            <li>• <strong>高性能</strong>：第一阶段本地提交，不长时间锁资源</li>
            <li>• <strong>自动化</strong>：自动生成回滚 SQL，无需手动编写</li>
            <li>• <strong>简单</strong>：只需添加 @GlobalTransactional 注解</li>
          </ul>
        </div>
      </section>

      {/* TCC 模式详解 */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">TCC 模式详解</h2>

        <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-lg mb-6">
          <h4 className="font-bold text-gray-900 mb-2">✅ Try-Confirm-Cancel 三阶段</h4>
          <p className="text-gray-700 text-sm">
            TCC 模式要求业务实现<strong>三个接口</strong>，完全由业务控制事务的边界，
            适用于<strong>性能要求高</strong>或<strong>无法使用 SQL</strong>的场景。
          </p>
        </div>

        <h3>TCC 接口定义</h3>
        <CodeBlock
          language="java"
          code={`// TCC 接口示例
@LocalTCC
public interface TccAccountService {

    // Try 阶段：资源检查和预留
    @TwoPhaseBusinessAction(
        name = "deductTcc",
        commitMethod = "confirm",
        rollbackMethod = "cancel"
    )
    boolean tryDeduct(
        BusinessActionContext context,
        @BusinessActionContextParameter(paramName = "userId") String userId,
        @BusinessActionContextParameter(paramName = "amount") BigDecimal amount
    );

    // Confirm 阶段：确认执行业务操作
    boolean confirm(BusinessActionContext context);

    // Cancel 阶段：取消执行，释放资源
    boolean cancel(BusinessActionContext context);
}

// TCC 实现示例
@Service
public class TccAccountServiceImpl implements TccAccountService {

    @Autowired
    private AccountMapper accountMapper;

    @Autowired
    private AccountFreezeMapper accountFreezeMapper;

    @Override
    @Transactional
    public boolean tryDeduct(BusinessActionContext context, String userId, BigDecimal amount) {
        log.info("Try 阶段：冻结资金, userId={}, amount={}", userId, amount);

        // 1. 检查余额是否充足
        Account account = accountMapper.selectById(userId);
        if (account.getBalance().compareTo(amount) < 0) {
            throw new RuntimeException("余额不足");
        }

        // 2. 冻结资金
        AccountFreeze freeze = new AccountFreeze();
        freeze.setUserId(userId);
        freeze.setAmount(amount);
        freeze.setTransactionId(context.getXid());
        accountFreezeMapper.insert(freeze);

        // 3. 扣减余额（预扣）
        account.setBalance(account.getBalance().subtract(amount));
        accountMapper.updateById(account);

        return true;
    }

    @Override
    @Transactional
    public boolean confirm(BusinessActionContext context) {
        String userId = context.getActionContext("userId", String.class);
        BigDecimal amount = context.getActionContext("amount", BigDecimal.class);

        log.info("Confirm 阶段：确认扣款, userId={}, amount={}", userId, amount);

        // 1. 删除冻结记录
        accountFreezeMapper.deleteByTransactionId(context.getXid());

        // 2. 资金已经被扣减，无需其他操作

        return true;
    }

    @Override
    @Transactional
    public boolean cancel(BusinessActionContext context) {
        String userId = context.getActionContext("userId", String.class);
        BigDecimal amount = context.getActionContext("amount", BigDecimal.class);

        log.info("Cancel 阶段：取消扣款, userId={}, amount={}", userId, amount);

        // 1. 查询冻结记录
        AccountFreeze freeze = accountFreezeMapper.selectByTransactionId(context.getXid());
        if (freeze == null) {
            return true;  // 已确认，无需回滚
        }

        // 2. 恢复余额
        Account account = accountMapper.selectById(userId);
        account.setBalance(account.getBalance().add(freeze.getAmount()));
        accountMapper.updateById(account);

        // 3. 删除冻结记录
        accountFreezeMapper.deleteByTransactionId(context.getXid());

        return true;
    }
}`}
        />

        <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-lg">
          <h4 className="font-bold text-gray-900 mb-2">⚠️ TCC 模式注意事项</h4>
          <ul className="space-y-1 text-sm text-gray-700">
            <li>• <strong>幂等性</strong>：Confirm 和 Cancel 接口必须幂等</li>
            <li>• <strong>悬挂</strong>：Cancel 比 Try 先执行的情况</li>
            <li>• <strong>空回滚</strong>：Try 未执行，Cancel 先执行</li>
            <li>• <strong>资源预留</strong>：Try 阶段要预留资源</li>
            <li>• <strong>事务隔离</strong>：防止并发问题</li>
          </ul>
        </div>
      </section>

      {/* 最佳实践 */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">最佳实践</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <BestPracticeCard3
            title="模式选择"
            practices={[
              "大多数场景使用 AT 模式（默认）",
              "性能要求高用 TCC 模式",
              "长事务流程用 SAGA 模式",
              "强一致性用 XA 模式",
              "不要混用多种模式"
            ]}
          />
          <BestPracticeCard3
            title="事务范围"
            practices={[
              "全局事务尽可能短小",
              "避免在循环中使用分布式事务",
              "远程调用超时时间要合理设置",
              "不要在事务中进行耗时操作",
              "考虑异步补偿方案"
            ]}
          />
          <BestPracticeCard3
            title="性能优化"
            practices={[
              "减少全局事务的覆盖范围",
              "使用异步提交提升性能",
              "合理设置超时时间",
              "优化数据库表结构和索引",
              "监控事务执行时间"
            ]}
          />
          <BestPracticeCard3
            title="异常处理"
            practices={[
              "明确指定 rollbackFor 类型",
              "区分业务异常和系统异常",
              "自定义异常要继承 RuntimeException",
              "捕获异常后要重新抛出",
              "记录详细的异常日志"
            ]}
          />
          <BestPracticeCard3
            title="测试验证"
            practices={[
              "测试正常流程提交",
              "测试异常流程回滚",
              "测试网络超时场景",
              "测试并发场景",
              "进行性能压测"
            ]}
          />
          <BestPracticeCard3
            title="监控告警"
            practices={[
              "监控全局事务成功率",
              "监控事务执行时长",
              "监控事务回滚率",
              "配置告警规则",
              "定期清理历史数据"
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
            question="Seata 性能如何?会影响业务性能吗?"
            answer="Seata AT 模式性能损耗主要在第一阶段的 undo_log 记录，
                 通常在 5%-15% 左右。通过以下优化可降低损耗：
                 1) undo_log 表单独存储到高速存储设备
                 2) 异步删除 undo_log（默认异步）
                 3) 使用 TCC 模式可进一步降低锁竞争
                 4) 合理设置全局事务超时时间
                 对于大多数业务场景，这个性能损耗是可以接受的。"
            isOpen={expandedFaq === 1}
            onClick={() => setExpandedFaq(expandedFaq === 1 ? null : 1)}
          />
          <FaqCard2
            number={2}
            question="全局事务超时时间如何设置?"
            answer="全局事务超时时间默认 60 秒，可通过 @GlobalTransactional(timeoutMills = 30000) 设置。
                 超时时间的设置需要考虑：
                 1) 所有分支事务的执行时间总和
                 2) 网络延迟和可能的重试
                 3) 业务容忍度
                 建议：根据实际测试结果设置，一般 30-60 秒比较合理。
                 注意：超时会触发回滚，不要设置过短导致正常业务被回滚。"
            isOpen={expandedFaq === 2}
            onClick={() => setExpandedFaq(expandedFaq === 2 ? null : 2)}
          />
          <FaqCard2
            number={3}
            question="AT 模式支持哪些数据库?"
            answer="Seata AT 模式支持主流关系型数据库：
                 1) MySQL 5.x, 8.x
                 2) PostgreSQL 9.x+
                 3) Oracle 10g+
                 4) SQL Server 2012+
                 5) TiDB 3.0+
                 6) 达梦、人大金仓等国产数据库
                 注意：需要数据库支持本地事务（ACID），
                 不支持 MongoDB、Redis 等非关系型数据库。"
            isOpen={expandedFaq === 3}
            onClick={() => setExpandedFaq(expandedFaq === 3 ? null : 3)}
          />
          <FaqCard2
            number={4}
            question="如何处理分布式事务中的并发问题?"
            answer="Seata AT 模式通过全局锁机制解决并发问题：
                 1) 第一阶段提交前获取全局锁
                 2) 如果全局锁被占用，等待并重试
                 3) 提交成功后释放全局锁
                 这个机制保证了：
                 - 两个全局事务不会同时修改同一行数据
                 - 读隔离通过 SELECT FOR UPDATE 实现
                 注意：高并发场景下可能因锁等待导致性能下降。"
            isOpen={expandedFaq === 4}
            onClick={() => setExpandedFaq(expandedFaq === 4 ? null : 4)}
          />
          <FaqCard2
            number={5}
            question="TCC 模式的空回滚和悬挂如何解决?"
            answer="空回滚：Try 未执行，Cancel 先执行
                 解决：Cancel 先检查是否存在冻结记录，没有则直接返回成功

                 悬挂：Cancel 比 Try 先执行
                 解决：Cancel 检查冻结记录，如果不存在，插入记录标记已取消
                       Try 执行时检查该标记，如果已取消则不再执行

                 幂等性：Confirm/Cancel 可能重复调用
                 解决：使用事务 XID 作为唯一键，先查询再插入/更新"
            isOpen={expandedFaq === 5}
            onClick={() => setExpandedFaq(expandedFaq === 5 ? null : 5)}
          />
          <FaqCard2
            number={6}
            question="Seata Server 需要集群部署吗?"
            answer="生产环境强烈建议集群部署：
                 1) 单点故障风险：Seata Server 挂掉会导致事务无法完成
                 2) 高可用：通过集群部署实现高可用
                 3) 负载均衡：多台 Server 分担请求压力

                 部署方式：
                 - 使用 Nacos 作为注册中心和配置中心
                 - 部署多个 Seata Server 节点
                 - 数据库存储模式（db 或 redis）
                 - 前端使用 Nginx 或 SLB 做负载均衡"
            isOpen={expandedFaq === 6}
            onClick={() => setExpandedFaq(expandedFaq === 6 ? null : 6)}
          />
        </div>
      </section>

      {/* 下一步学习 */}
      <section className="bg-gradient-to-r from-red-600 to-pink-600 text-white p-8 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">🎯 掌握了 Seata,下一步学习什么?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <NextStepCard2 title="RocketMQ" description="消息队列与最终一致性" link="/rocketmq" icon="📨" />
          <NextStepCard2 title="Redis" description="分布式缓存实战" link="/redis" icon="💾" />
          <NextStepCard2 title="微服务拆分" description="服务拆分原则" link="/service-decomposition" icon="🔪" />
          <NextStepCard2 title="实战项目" description="电商微服务系统" link="/project-ecommerce" icon="🛒" />
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
    <div className="bg-white border-2 border-red-200 rounded-lg p-5">
      <h3 className="text-xl font-bold text-gray-900 mb-4">{title}</h3>
      <ul className="space-y-2">
        {practices.map((practice, index) => (
          <li key={index} className="flex items-start">
            <span className="text-red-600 mr-2 flex-shrink-0">✓</span>
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
