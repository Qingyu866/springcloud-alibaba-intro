import { useState } from 'react';
import { CodeBlock } from '../components';

interface MethodCardProps {
  title: string;
  description: string;
  icon: string;
  color: string;
}

const MethodCard: React.FC<MethodCardProps> = ({ title, description, icon, color }) => (
  <div className={`${color} border-2 rounded-lg p-5`}>
    <div className="flex items-center gap-3 mb-3">
      <span className="text-3xl">{icon}</span>
      <h3 className="text-xl font-bold text-gray-900">{title}</h3>
    </div>
    <p className="text-sm text-gray-700">{description}</p>
  </div>
);

interface CaseCardProps {
  title: string;
  symptoms: string[];
  icon: string;
  color: string;
}

const CaseCard: React.FC<CaseCardProps> = ({ title, symptoms, icon, color }) => (
  <div className={`${color} border-2 rounded-lg p-5`}>
    <div className="flex items-center gap-3 mb-3">
      <span className="text-3xl">{icon}</span>
      <h3 className="text-xl font-bold text-gray-900">{title}</h3>
    </div>
    <ul className="text-sm text-gray-700 space-y-1">
      {symptoms.map((symptom, idx) => (
        <li key={idx} className="flex items-start">
          <span className="text-red-600 mr-2">•</span>
          <span>{symptom}</span>
        </li>
      ))}
    </ul>
  </div>
);

interface ProcessStepProps {
  step: number;
  title: string;
  description: string;
  color: string;
}

const ProcessStep: React.FC<ProcessStepProps> = ({ step, title, description, color }) => (
  <div className="flex items-start gap-4">
    <div className={`${color} text-white rounded-full w-10 h-10 flex items-center justify-center font-bold flex-shrink-0 text-lg`}>
      {step}
    </div>
    <div className="flex-1">
      <h4 className="font-bold text-gray-900 text-lg mb-1">{title}</h4>
      <p className="text-sm text-gray-700">{description}</p>
    </div>
  </div>
);

interface FaqCardProps {
  number: number;
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
}

const FaqCard: React.FC<FaqCardProps> = ({ number, question, answer, isOpen, onClick }) => (
  <div className="bg-white border-2 border-gray-200 rounded-lg overflow-hidden">
    <button
      onClick={onClick}
      className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
    >
      <h3 className="text-lg font-bold text-gray-900">
        {number}. {question}
      </h3>
      <span className="text-2xl text-gray-400">{isOpen ? '−' : '+'}</span>
    </button>
    {isOpen && (
      <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
        <div className="text-gray-700 whitespace-pre-line">{answer}</div>
      </div>
    )}
  </div>
);

export const TroubleshootingPage: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="bg-gradient-to-r from-red-700 to-red-900 text-white rounded-lg p-6 mb-8">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-4xl font-bold mb-2">故障排查实战</h1>
            <p className="text-red-100 text-lg">生产环境故障诊断与应急响应指南</p>
          </div>
          <div className="flex gap-3 text-sm">
            <span className="px-3 py-1 bg-white/20 rounded-full">🔧 高级</span>
            <span className="px-3 py-1 bg-white/20 rounded-full">⏱️ 约90分钟</span>
            <span className="px-3 py-1 bg-white/20 rounded-full">📚 实战导向</span>
          </div>
        </div>
      </div>

      {/* Chapter 1: 故障排查方法论 */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
          <span className="bg-red-600 text-white rounded-full w-10 h-10 flex items-center justify-center">1</span>
          故障排查方法论
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <MethodCard
            title="5 Why 分析法"
            description="通过连续追问5个为什么，找到问题的根本原因"
            icon="❓"
            color="bg-blue-50 border-blue-200"
          />
          <MethodCard
            title="鱼骨图分析"
            description="从人机料法环六个维度系统分析问题"
            icon="🐟"
            color="bg-green-50 border-green-200"
          />
          <MethodCard
            title="根因分析 RCA"
            description="系统化的因果分析，识别根本原因"
            icon="🔍"
            color="bg-purple-50 border-purple-200"
          />
          <MethodCard
            title="故障时间线"
            description="按时间轴还原故障发生过程"
            icon="📅"
            color="bg-yellow-50 border-yellow-200"
          />
        </div>

        <div className="bg-white border-2 border-slate-200 rounded-lg p-6 mb-6">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">5 Why 分析法实战案例</h3>
          <CodeBlock
            language="bash"
            code={`【问题场景】订单服务突然崩溃，大量 500 错误

【第1个Why】为什么订单服务崩溃？
→ 因为发生了 OutOfMemoryError

【第2个Why】为什么会内存溢出？
→ 因为 JVM 堆内存被占满，无法分配新对象

【第3个Why】为什么堆内存被占满？
→ 因为有一个 Map 对象持续增长，包含数百万条记录

【第4个Why】为什么 Map 会持续增长？
→ 因为代码中使用了静态 Map 缓存订单数据，但没有清理过期条目

【第5个Why】为什么没有清理机制？
→ 因为开发时为了快速上线，直接使用本地缓存，未考虑容量限制

【根本原因】
缺少缓存淘汰策略，使用无限增长的本地缓存

【解决方案】
1. 立即修复：切换到 Redis 等带过期策略的缓存
2. 长期优化：引入 Caffeine 并配置 maximumSize 和 expireAfterWrite
3. 流程改进：代码审查增加缓存方案检查项`}
          />
        </div>

        <div className="bg-white border-2 border-slate-200 rounded-lg p-6 mb-6">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">鱼骨图分析法（人机料法环）</h3>
          <CodeBlock
            language="bash"
            code={`【问题】数据库查询响应时间从 100ms 慢到 5s

【人 - 人员因素】
✓ 新人入职未进行性能优化培训
✓ 缺少 SQL 审核流程
✓ 开发人员对索引理解不足

【机 - 工具因素】
✓ 数据库服务器 CPU 使用率 90%
✓ 磁盘 I/O 瓶颈（HDD 而非 SSD）
✓ 连接池配置过小（最大 10 个连接）

【料 - 数据因素】
✓ 数据量从 10 万增长到 500 万
✓ 单表超过 1000 万行
✓ 历史数据未归档

【法 - 方法因素】
✓ 全表扫描 SELECT *
✓ 未使用索引字段
✓ N+1 查询问题

【环 - 环境因素】
✓ 测试环境数据量小，问题未暴露
✓ 高峰期流量集中
✓ 网络延迟增加

【分析结论】
主要原因：数据量增长 + 未建索引 + 查询不当
次要原因：硬件性能不足 + 缺少审核流程

【改进措施】
1. 紧急：添加索引，优化慢查询
2. 短期：数据归档，升级硬件
3. 长期：建立 SQL 审核规范，性能测试流程`}
          />
        </div>

        <div className="bg-white border-2 border-slate-200 rounded-lg p-6">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">根因分析（RCA）报告模板</h3>
          <CodeBlock
            language="bash"
            code={`【故障时间线】
2024-01-15 10:23:15  监控告警：订单服务错误率超过 5%
2024-01-15 10:23:30  确认：所有订单查询接口返回 500
2024-01-15 10:24:00  初步定位：数据库连接池耗尽
2024-01-15 10:25:30  根因分析：慢查询导致连接长时间占用
2024-01-15 10:26:00  临时措施：重启应用服务
2024-01-15 10:26:30  服务恢复
2024-01-15 11:00:00  根本修复：添加索引，优化查询

【故障影响】
- 影响：订单查询、订单列表、订单详情功能
- 用户：约 2000 名用户受影响
- 时长：3 分钟服务不可用，2 分钟部分功能异常
- 损失：约 50 笔订单流失

【根本原因】
技术层面：
- orders 表新增字段 status，未添加索引
- 查询条件 WHERE status = 'pending' 全表扫描
- 500 万数据量，单次查询 3-5 秒

管理层面：
- 变更缺少代码审查
- 未进行性能测试
- 缺少慢查询监控

【改进措施】
技术改进：
1. 添加索引：CREATE INDEX idx_status ON orders(status)
2. 优化查询：SELECT * 改为 SELECT 具体字段
3. 连接池配置：增加最大连接数到 50
4. 监控告警：添加慢查询告警（>1秒）

流程改进：
1. 建立代码审查 Checklist
2. SQL 变更必须通过 EXPLAIN 分析
3. 性能测试环境数据量与生产一致
4. 数据库变更必须 DBA 审批

【经验教训】
✓ 小改动也可能引发大问题
✓ 数据量增长需要定期索引优化
✓ 必须有完整的变更流程和审核机制`}
          />
        </div>
      </section>

      {/* Chapter 2: 常见故障案例 */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
          <span className="bg-red-600 text-white rounded-full w-10 h-10 flex items-center justify-center">2</span>
          常见故障案例
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <CaseCard
            title="内存溢出 OOM"
            symptoms={[
              "java.lang.OutOfMemoryError",
              "频繁 Full GC",
              "服务突然崩溃",
              "响应越来越慢"
            ]}
            icon="💾"
            color="bg-red-50 border-red-200"
          />
          <CaseCard
            title="死锁问题"
            symptoms={[
              "数据库 deadlock",
              "事务超时",
              "请求hang住",
              "CPU 正常但无响应"
            ]}
            icon="🔒"
            color="bg-yellow-50 border-yellow-200"
          />
          <CaseCard
            title="慢查询"
            symptoms={[
              "接口响应慢",
              "数据库 CPU 高",
              "连接池耗尽",
              "用户体验差"
            ]}
            icon="🐌"
            color="bg-blue-50 border-blue-200"
          />
        </div>

        {/* 案例1: OOM 分析 */}
        <div className="bg-white border-2 border-slate-200 rounded-lg p-6 mb-6">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">案例1：OOM 内存溢出排查</h3>
          <CodeBlock
            language="bash"
            code={`【故障现象】
订单服务运行 2 小时后崩溃，日志显示：
java.lang.OutOfMemoryError: Java heap space

【诊断步骤】

1. 启用 JVM 内存参数
java -Xms2g -Xmx4g \\
     -XX:+HeapDumpOnOutOfMemoryError \\
     -XX:HeapDumpPath=/var/log/heap/ \\
     -XX:+UseG1GC \\
     -jar order-service.jar

2. 分析 heap dump 文件
# 使用 Eclipse MAT 打开 heap.hprof

# 查看 Leak Suspects（疑似内存泄漏）
MAT 自动分析报告：
- Problem Suspect 1: 类 OrderCache 占用 75% 堆内存
- 占用对象: 3,500,000 个 Order 对象
- 保留大小: 2.8 GB

3. 查看对象引用链
Dominator Tree -> OrderCache -> ConcurrentHashMap
  -> 保留大小 2.8GB
  -> 被 com.company.OrderManager 静态变量引用

【根因定位】
public class OrderManager {
    // 问题：静态 Map 永不回收，无上限
    private static final Map<String, Order> cache = new ConcurrentHashMap<>();

    public void cacheOrder(Order order) {
        cache.put(order.getId(), order);  // 只增不减
    }
}

【解决方案】

方案1：使用 Caffeine 带过期策略
@Configuration
public class CacheConfig {
    @Bean
    public Cache<String, Order> orderCache() {
        return Caffeine.newBuilder()
            .maximumSize(10000)              // 最大 10000 条
            .expireAfterWrite(10, TimeUnit.MINUTES)  // 10分钟过期
            .weakKeys()                      // 弱引用键
            .recordStats()                   // 统计信息
            .build();
    }
}

方案2：使用 Redis 分布式缓存
@Autowired
private RedisTemplate<String, Order> redisTemplate;

public void cacheOrder(Order order) {
    redisTemplate.opsForValue().set(
        "order:" + order.getId(),
        order,
        10,
        TimeUnit.MINUTES
    );
}

方案3：Guava LoadingCache
LoadingCache<String, Order> cache = CacheBuilder.newBuilder()
    .maximumSize(10000)
    .expireAfterWrite(10, TimeUnit.MINUTES)
    .removalListener(notification -> {
        logger.info("Cache evicted: {}", notification.getKey());
    })
    .build(new CacheLoader<String, Order>() {
        public Order load(String id) {
            return orderRepository.findById(id);
        }
    });

【预防措施】
1. 代码审查检查缓存策略
2. 监控 JVM 内存使用率
3. 设置堆内存告警（>80%）
4. 定期分析 heap dump（每周）
5. 使用 MAT 工具自动化分析`}
          />
        </div>

        {/* 案例2: 死锁排查 */}
        <div className="bg-white border-2 border-slate-200 rounded-lg p-6 mb-6">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">案例2：数据库死锁排查</h3>
          <CodeBlock
            language="bash"
            code={`【故障现象】
日志显示大量 deadlock 异常：
MySQLTransactionRollbackException: Deadlock found when trying to get lock

【诊断步骤】

1. 查看死锁日志
# MySQL 命令
SHOW ENGINE INNODB STATUS;

# 输出示例
------------------------
LATEST DETECTED DEADLOCK
------------------------
2024-01-15 14:23:15
*** (1) TRANSACTION:
TRANSACTION 12345, ACTIVE 5 sec starting index read
mysql tables in use 1, locked 1
LOCK WAIT 2 lock struct(s), heap size 1136
MySQL thread id 100, OS thread handle 1234567
*** (1) WAITING FOR THIS LOCK TO BE GRANTED:
RECORD LOCKS space id 100 page no 500 n bits 72
PRIMARY of table \`orders\`
*** (2) TRANSACTION:
TRANSACTION 12346, ACTIVE 3 sec starting index read
mysql tables in use 1, locked 1
2 lock struct(s), heap size 1136
*** (2) HOLDING THE LOCK(S):
RECORD LOCKS space id 100 page no 500 n bits 72
PRIMARY of table \`orders\`

2. 分析死锁场景
事务 A:
START TRANSACTION;
UPDATE orders SET status = 'PAID' WHERE id = 100;  -- 持有锁 A
-- 等待锁 B
UPDATE orders SET status = 'SHIPPED' WHERE id = 200;

事务 B:
START TRANSACTION;
UPDATE orders SET status = 'SHIPPED' WHERE id = 200;  -- 持有锁 B
-- 等待锁 A
UPDATE orders SET status = 'PAID' WHERE id = 100;

结果：A 等 B，B 等 A → 死锁

【根因定位】
问题代码：
@Transactional
public void updateOrderBatch(List<Long> orderIds) {
    for (Long id : orderIds) {
        // 问题：顺序不一致可能导致死锁
        Order order = orderRepository.findById(id).orElseThrow();
        order.setStatus(status);
        orderRepository.save(order);
    }
}

调用方：
线程1: updateOrderBatch(Arrays.asList(100L, 200L));  // 100 -> 200
线程2: updateOrderBatch(Arrays.asList(200L, 100L));  // 200 -> 100
→ 可能死锁！

【解决方案】

方案1：统一加锁顺序
@Transactional
public void updateOrderBatch(List<Long> orderIds) {
    // 关键：排序确保顺序一致
    List<Long> sortedIds = orderIds.stream()
        .sorted()
        .collect(Collectors.toList());

    for (Long id : sortedIds) {
        Order order = orderRepository.findById(id).orElseThrow();
        order.setStatus(status);
        orderRepository.save(order);
    }
}

方案2：使用悲观锁
@Transactional
public void updateOrder(Long id) {
    // SELECT ... FOR UPDATE 加行锁
    Order order = orderRepository.findByIdWithLock(id)
        .orElseThrow();
    order.setStatus(status);
    orderRepository.save(order);
}

Repository:
@Lock(LockModeType.PESSIMISTIC_WRITE)
@Query("SELECT o FROM Order o WHERE o.id = :id")
Optional<Order> findByIdWithLock(@Param("id") Long id);

方案3：乐观锁（推荐）
@Entity
public class Order {
    @Id
    private Long id;

    @Version  // JPA 乐观锁版本号
    private Integer version;

    private String status;
}

@Service
public class OrderService {
    @Transactional
    public void updateOrder(Long id, String newStatus) {
        Order order = orderRepository.findById(id).orElseThrow();
        order.setStatus(newStatus);
        // JPA 自动检查 version，冲突抛出 OptimisticLockException
        orderRepository.save(order);
    }
}

方案4：使用队列串行化
@Component
public class OrderUpdateQueue {
    private final BlockingQueue<OrderUpdateTask> queue =
        new LinkedBlockingQueue<>();

    @Async
    public void processUpdates() {
        while (true) {
            try {
                OrderUpdateTask task = queue.take();
                updateOrder(task);
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
                break;
            }
        }
    }

    @Transactional
    private void updateOrder(OrderUpdateTask task) {
        // 单线程顺序执行，避免死锁
        orderRepository.updateStatus(
            task.getOrderId(),
            task.getStatus()
        );
    }
}

【预防措施】
1. 数据库操作保持顺序一致
2. 事务尽可能小，快速提交
3. 避免长时间事务
4. 使用乐观锁代替悲观锁
5. 监控死锁告警
6. 死锁重试机制（注意幂等性）`}
          />
        </div>

        {/* 案例3: 慢查询优化 */}
        <div className="bg-white border-2 border-slate-200 rounded-lg p-6">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">案例3：慢查询优化实战</h3>
          <CodeBlock
            language="bash"
            code={`【故障现象】
订单列表接口响应时间：3-5 秒
用户投诉：页面加载太慢

【诊断步骤】

1. 开启慢查询日志
-- MySQL 配置
SET GLOBAL slow_query_log = 'ON';
SET GLOBAL long_query_time = 1;  -- 1秒以上记录
SET GLOBAL log_queries_not_using_indexes = 'ON';

2. 查看慢查询日志
# /var/log/mysql/mysql-slow.log

# Time: 2024-01-15T10:23:15.123456Z
# User@Host: app[app] @  [10.0.0.5]
# Query_time: 4.567890  Lock_time: 0.000123 Rows_sent: 20  Rows_examined: 5000000
SET timestamp=1705310595;
SELECT * FROM orders WHERE user_id = 12345 ORDER BY create_time DESC LIMIT 20;

关键信息：
- Query_time: 4.57 秒
- Rows_examined: 扫描 500 万行！
- Rows_sent: 返回 20 行

3. 使用 EXPLAIN 分析执行计划
EXPLAIN SELECT * FROM orders WHERE user_id = 12345;

结果：
+----+-------------+--------+------+---------------+------+---------+------+---------+-------------+
| id | select_type | table  | type | possible_keys | key  | key_len | ref  | rows    | Extra       |
+----+-------------+--------+------+---------------+------+---------+------+---------+-------------+
|  1 | SIMPLE      | orders | ALL  | NULL          | NULL | NULL    | NULL | 5000000 | Using where |
+----+-------------+--------+------+---------------+------+---------+------+---------+-------------+
问题：type=ALL（全表扫描），key=NULL（未用索引）

【问题分析】
1. user_id 字段没有索引
2. SELECT * 返回所有列（包括大字段）
3. 数据量 500 万，全表扫描慢

【解决方案】

方案1：添加索引
CREATE INDEX idx_user_id ON orders(user_id);
CREATE INDEX idx_user_create ON orders(user_id, create_time);  -- 联合索引

验证：
EXPLAIN SELECT * FROM orders WHERE user_id = 12345;
+----+-------------+--------+-------+------------------+------------------+---------+-------+------+-------------+
| id | select_type | table  | type  | possible_keys    | key              | key_len | ref   | rows | Extra       |
+----+-------------+--------+-------+------------------+------------------+---------+-------+------+-------------+
|  1 | SIMPLE      | orders | ref   | idx_user_create  | idx_user_create  | 8       | const |  50  | Using where |
+----+-------------+--------+-------+------------------+------------------+---------+-------+------+-------------+
优化：从扫描 500 万行 → 50 行！

方案2：优化查询（只查询需要的列）
-- 错误
SELECT * FROM orders WHERE user_id = ? LIMIT 20;

-- 正确
SELECT id, order_no, status, total_amount, create_time
FROM orders
WHERE user_id = ?
ORDER BY create_time DESC
LIMIT 20;

方案3：使用分页（避免大偏移量）
-- 错误：深分页慢
SELECT * FROM orders
WHERE user_id = ?
ORDER BY create_time DESC
LIMIT 10000, 20;  -- 偏移 10000 行

-- 正确：使用游标分页
SELECT * FROM orders
WHERE user_id = ? AND create_time < ?
ORDER BY create_time DESC
LIMIT 20;

方案4：使用覆盖索引
CREATE INDEX idx_user_cover ON orders(user_id, create_time, id, status, total_amount);

-- 查询只需要索引包含的列，无需回表
SELECT id, create_time, status, total_amount
FROM orders
WHERE user_id = 12345
ORDER BY create_time DESC
LIMIT 20;

【优化效果】
优化前：4.57 秒
优化后：0.02 秒
提升：228 倍！

【预防措施】
1. 所有 WHERE/JOIN/ORDER BY 字段建立索引
2. 避免 SELECT *，明确列出字段
3. 使用 EXPLAIN 分析慢查询
4. 定期检查慢查询日志
5. 使用分页避免大结果集
6. 考虑使用 ES 处理复杂搜索`}
          />
        </div>
      </section>

      {/* Chapter 3: 混沌工程 */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
          <span className="bg-red-600 text-white rounded-full w-10 h-10 flex items-center justify-center">3</span>
          混沌工程（Chaos Engineering）
        </h2>

        <div className="bg-gradient-to-r from-purple-50 to-blue-50 border-2 border-purple-200 rounded-lg p-6 mb-6">
          <h3 className="text-2xl font-bold text-gray-900 mb-3">什么是混沌工程？</h3>
          <p className="text-gray-700 mb-4">
            混沌工程是在分布式系统中进行实验的学科，目的是建立对系统抵御生产环境中失控条件能力的信心。
            通过主动注入故障（如延迟、错误、资源耗尽），验证系统的自愈能力和容错性。
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-lg border border-purple-200">
              <h4 className="font-bold text-purple-900 mb-2">🎯 目标</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• 发现系统弱点</li>
                <li>• 验证容错机制</li>
                <li>• 提升系统韧性</li>
              </ul>
            </div>
            <div className="bg-white p-4 rounded-lg border border-purple-200">
              <h4 className="font-bold text-purple-900 mb-2">⚡ 实验</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• 注入故障</li>
                <li>• 观察行为</li>
                <li>• 改进系统</li>
              </ul>
            </div>
            <div className="bg-white p-4 rounded-lg border border-purple-200">
              <h4 className="font-bold text-purple-900 mb-2">🛡️ 价值</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• 减少生产事故</li>
                <li>• 提升恢复速度</li>
                <li>• 增强团队信心</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-white border-2 border-slate-200 rounded-lg p-6 mb-6">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Chaos Mesh 实战演示</h3>
          <CodeBlock
            language="yaml"
            code={`# 安装 Chaos Mesh（Kubernetes 故障注入平台）
kubectl apply -f https://mirrors.chaos-mesh.org/v0.20.0/install.yaml

# 验证安装
kubectl get pods -n chaos-mesh

---
# 实验1：Pod 故障注入（模拟服务崩溃）
apiVersion: chaos-mesh.org/v1alpha1
kind: PodChaos
metadata:
  name: pod-kill-test
  namespace: production
spec:
  action: pod-kill           # 杀死 Pod
  mode: one                  # 随机选择一个 Pod
  selector:
    namespaces:
      - production
    labelSelectors:
      app: order-service     # 选择 order-service
  scheduler:                 # 在工作时间执行
    cron: "@every 10min"

---
# 实验2：网络延迟注入（模拟网络慢）
apiVersion: chaos-mesh.org/v1alpha1
kind: NetworkChaos
metadata:
  name: network-delay-test
spec:
  action: delay              # 延迟
  mode: all                  # 所有 Pod
  selector:
    namespaces:
      - production
    labelSelectors:
      app: payment-service
  delay:
    latency: "2s"            # 延迟 2 秒
    jitter: "100ms"          # 抖动 100ms
    correlation: "50"        # 50% 相关性
  direction: to              # 出方向延迟

---
# 实验3：模拟网络分区
apiVersion: chaos-mesh.org/v1alpha1
kind: NetworkChaos
metadata:
  name: network-partition-test
spec:
  action: partition          # 网络分区
  mode: all
  selector:
    namespaces:
      - production
    labelSelectors:
      app: order-service
  direction: both            # 双向隔离
  target:
    selector:
      namespaces:
        - production
      labelSelectors:
        app: inventory-service
    mode: all

---
# 实验4：磁盘压力（模拟 I/O 瓶颈）
apiVersion: chaos-mesh.org/v1alpha1
kind: StressChaos
metadata:
  name: disk-stress-test
spec:
  mode: one
  selector:
    namespaces:
      - production
    labelSelectors:
      app: database-service
  stressors:
    disk:
      workers: 4             # 4 个工作线程
      size: "1GB"            # 每个线程写入 1GB 数据
  duration: "5m"             # 持续 5 分钟

---
# 实验5：CPU 压力（模拟负载高）
apiVersion: chaos-mesh.org/v1alpha1
kind: StressChaos
metadata:
  name: cpu-stress-test
spec:
  mode: all
  selector:
    labelSelectors:
      app: order-service
  stressors:
    cpu:
      workers: 4             # 4 个 CPU 密集任务
      load: 90               # CPU 负载 90%
  duration: "3m"

---
# 实验6：模拟数据库故障
apiVersion: chaos-mesh.org/v1alpha1
kind: PodChaos
metadata:
  name: database-fault-test
spec:
  action: pod-failure        # Pod 失败（不重启）
  mode: one
  selector:
    namespaces:
      - production
    labelSelectors:
      app: mysql
  duration: "1m"             # 持续 1 分钟

---
# 实验7：HTTP 故障注入（模拟 API 错误）
apiVersion: chaos-mesh.org/v1alpha1
kind: HTTPChaos
metadata:
  name: http-fault-test
spec:
  mode: all
  selector:
    labelSelectors:
      app: payment-service
  port: 8080
  target: Request
  abort: true                # 中止请求
  duration: "30s"`}
          />
        </div>

        <div className="bg-white border-2 border-slate-200 rounded-lg p-6">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">混沌工程实验流程</h3>
          <CodeBlock
            language="bash"
            code={`【混沌工程五步法】

步骤1：定义稳态假设
- 假设：当 payment-service 故障时，order-service 应降级返回
- 指标：订单创建成功率 > 95%
- 监控：订单创建 QPS、错误率、响应时间

步骤2：设计实验
# 选择 Chaos Mesh 实验
apiVersion: chaos-mesh.org/v1alpha1
kind: PodChaos
metadata:
  name: payment-chaos
spec:
  action: pod-kill
  mode: all
  selector:
    labelSelectors:
      app: payment-service

步骤3：运行实验
kubectl apply -f payment-chaos.yaml

# 观察系统行为
kubectl get pods -w
kubectl logs -f deployment/order-service

步骤4：验证假设
# 检查订单服务
curl http://order-service/actuator/health
curl http://order-service/api/orders \\
  -X POST \\
  -H "Content-Type: application/json" \\
  -d '{"userId": 123, "items": [...]}'

# 查看监控
- Grafana 订单创建成功率：98%（满足 >95%）
- Sentinel 降级日志：降级生效
- 日志显示："Payment service unavailable, using fallback"

步骤5：改进系统
如果实验失败（如成功率 < 95%）：
1. 分析原因：降级逻辑未生效
2. 改进代码：添加 @SentinelResource fallback
3. 重新实验：验证改进有效

【混沌工程最佳实践】

1. 从小规模开始
   - 先在测试环境验证
   - 再在生产环境小流量实验
   - 逐步扩大范围

2. 周期性实验
   - 每周固定时间（如周五下午）
   - 避开业务高峰期
   - 自动化实验流程

3. 建立熔断机制
   - 实验导致严重问题时立即停止
   - 设置健康检查阈值
   - 自动回滚实验配置

4. 记录实验结果
   - 实验时间、故障类型
   - 系统表现、监控数据
   - 发现的问题、改进措施

5. 文化建设
   - 不责怪实验发现的问题
   - 鼓励主动发现隐患
   - 建立故障复盘机制`}
          />
        </div>
      </section>

      {/* Chapter 4: 应急响应流程 */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
          <span className="bg-red-600 text-white rounded-full w-10 h-10 flex items-center justify-center">4</span>
          应急响应流程
        </h2>

        <div className="bg-gradient-to-r from-red-50 to-orange-50 border-2 border-red-200 rounded-lg p-6 mb-6">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">应急响应标准流程（SOP）</h3>

          <div className="space-y-4">
            <ProcessStep
              step={1}
              title="故障发现与报告"
              description="监控告警触发，值班人员确认故障，评估影响范围"
              color="bg-red-600"
            />
            <ProcessStep
              step={2}
              title="故障定级与响应"
              description="根据影响范围定级（P0-P3），拉起应急响应团队"
              color="bg-orange-600"
            />
            <ProcessStep
              step={3}
              title="快速止损与恢复"
              description="优先恢复服务，再排查根因（重启、降级、回滚、扩容）"
              color="bg-yellow-600"
            />
            <ProcessStep
              step={4}
              title="根因分析与修复"
              description="定位根本原因，实施永久性修复方案"
              color="bg-blue-600"
            />
            <ProcessStep
              step={5}
              title="复盘与改进"
              description="总结教训，更新文档，优化流程，预防再次发生"
              color="bg-green-600"
            />
          </div>
        </div>

        <div className="bg-white border-2 border-slate-200 rounded-lg p-6 mb-6">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">故障定级标准</h3>
          <CodeBlock
            language="bash"
            code={`【P0 级：核心业务完全不可用】

定义：
- 核心业务完全中断
- 影响所有用户
- 造成直接经济损失

示例：
- 所有用户无法下单
- 支付服务完全不可用
- 数据库不可访问

响应要求：
- 响应时间：< 5 分钟
- 恢复时间：< 30 分钟
- 响应级别：CTO + 技术总监 + 业务负责人

处理优先级：
1. 立即上报 CTO
2. 拉起紧急响应群
3. 每隔 5 分钟同步进展
4. 优先恢复，后查原因
5. 必要时回滚上一版本

---

【P1 级：核心功能部分不可用】

定义：
- 核心功能受影响，但可用降级方案
- 影响大部分用户（>50%）
- 造成用户体验严重受损

示例：
- 订单创建慢（响应 > 5秒）
- 搜索功能不可用
- 部分用户无法登录

响应要求：
- 响应时间：< 15 分钟
- 恢复时间：< 2 小时
- 响应级别：技术总监 + 团队 Leader

处理优先级：
1. 上报技术总监
2. 评估影响范围
3. 确定恢复方案
4. 每隔 15 分钟同步进展

---

【P2 级：非核心功能不可用】

定义：
- 非核心功能异常
- 影响少量用户（<20%）
- 不影响核心业务流程

示例：
- 统计报表生成失败
- 图片上传偶尔失败
- 非关键接口超时

响应要求：
- 响应时间：< 30 分钟
- 恢复时间：< 1 天
- 响应级别：团队 Leader

处理优先级：
1. 工作时间正常处理
2. 记录问题工单
3. 下个工作日解决

---

【P3 级：轻微问题】

定义：
- 边缘功能问题
- 不影响用户使用
- 用户体验轻微影响

示例：
- 文案错误
- 样式显示问题
- 日志报错但不影响功能

响应要求：
- 响应时间：< 2 小时
- 恢复时间：< 1 周
- 响应级别：值班工程师

处理优先级：
1. 记录问题池
2. 适当时机修复`}
          />
        </div>

        <div className="bg-white border-2 border-slate-200 rounded-lg p-6 mb-6">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">应急响应工具箱</h3>
          <CodeBlock
            language="bash"
            code={`【快速诊断命令】

# 1. 检查服务健康状态
curl http://order-service:8080/actuator/health
curl http://payment-service:8080/actuator/health

# 2. 查看服务日志（实时）
kubectl logs -f deployment/order-service -n production
kubectl logs -f deployment/payment-service --since=5m

# 3. 查看错误日志
kubectl logs deployment/order-service | grep -i "error"
kubectl logs deployment/order-service | grep -i "exception"

# 4. 检查 Pod 状态
kubectl get pods -n production
kubectl describe pod order-service-xxx -n production

# 5. 查看资源使用
kubectl top pods -n production
kubectl top nodes

# 6. 查看事件
kubectl get events -n production --sort-by='.lastTimestamp'

# 7. 查看数据库连接
SHOW PROCESSLIST;
SHOW STATUS LIKE 'Threads_connected';
SHOW STATUS LIKE 'Max_used_connections';

# 8. 查看慢查询
SHOW FULL PROCESSLIST;
SELECT * FROM mysql.slow_log ORDER BY start_time DESC LIMIT 10;

# 9. JVM 诊断
jps -l                          # 找到 Java 进程
jstack -l <pid>                 # 查看线程堆栈
jmap -heap <pid>                # 查看堆内存
jstat -gcutil <pid> 1000 10     # 监控 GC

# 10. 网络诊断
ping order-service
telnet order-service 8080
curl -v http://order-service:8080/actuator/health

---

【快速恢复操作】

# 1. 重启服务
kubectl rollout restart deployment/order-service -n production

# 2. 回滚到上一版本
kubectl rollout undo deployment/order-service -n production

# 3. 回滚到指定版本
kubectl rollout history deployment/order-service -n production
kubectl rollout undo deployment/order-service --to-revision=3 -n production

# 4. 扩容（增加副本数）
kubectl scale deployment/order-service --replicas=10 -n production

# 5. 临时下线故障服务
kubectl scale deployment/payment-service --replicas=0 -n production

# 6. 修改配置（热更新）
kubectl edit configmap app-config -n production
# 触发 Pod 重启生效
kubectl rollout restart deployment/order-service -n production

# 7. 数据库重启（谨慎）
systemctl restart mysql
# 或
kubectl rollout restart statefulset/mysql -n production

# 8. 清理缓存
redis-cli FLUSHALL
# 或
redis-cli FLUSHDB

# 9. 强制杀死 Pod
kubectl delete pod order-service-xxx -n production --force --grace-period=0

# 10. 查看最近变更
kubectl rollout history deployment/order-service -n production
git log --oneline -10`}
          />
        </div>

        <div className="bg-white border-2 border-slate-200 rounded-lg p-6 mb-6">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">故障复盘报告模板</h3>
          <CodeBlock
            language="bash"
            code={`【故障复盘报告】

基本信息
--------
故障时间：2024-01-15 10:23:15 - 10:35:40（持续 12.5 分钟）
故障级别：P0（核心业务不可用）
影响范围：所有用户无法创建订单
影响用户：约 15,000 人
损失估算：约 500 笔订单流失

故障时间线
----------
10:23:15  监控告警：订单服务错误率 > 5%
10:23:30  值班工程师确认故障
10:24:00  定位：支付服务不可用导致订单创建失败
10:24:30  尝试重启支付服务 Pod，失败
10:25:00  发现数据库连接池耗尽
10:26:00  执行临时方案：回滚支付服务到上一版本
10:27:00  服务恢复，错误率下降到 0.1%
10:35:40  彻底恢复，错误率 0%

根因分析
----------
直接原因：
支付服务新版本存在 SQL 慢查询，导致连接池耗尽

SQL 问题：
SELECT * FROM payments WHERE user_id IN (?, ?, ..., ?)
-- IN 查询包含 5000 个 user_id

根本原因：
1. 代码变更缺少性能测试
2. PR Review 未发现性能问题
3. 缺少数据库慢查询监控告警

处理过程
----------
✅ 做得好的地方：
- 5 分钟内确认故障并上报
- 快速定位到支付服务问题
- 12.5 分钟完成恢复

❌ 需要改进的地方：
- 初期尝试重启无效，浪费 2 分钟
- 数据库问题发现较晚（6 分钟后才定位）
- 缺少自动回滚机制

改进措施
----------
技术改进：
1. 添加数据库慢查询告警（>1 秒）
2. PR Review 增加 SQL 性能检查
3. 实现自动化回滚机制（异常时自动回滚）
4. 支付服务分批发布（金丝雀发布）

流程改进：
1. 建立性能测试 Checklist
2. 变更前必须压测验证
3. 完善 On-call 值班手册
4. 定期故障演练（每周）

经验教训
---------
1. 大批次查询必须分页
2. 变更必须经过性能测试
3. 监控告警必须覆盖关键路径
4. 自动化回滚比手动操作更可靠

复盘会议
---------
时间：2024-01-16 14:00
参与：CTO、技术总监、后端团队、DBA、运维团队
议程：
1. 回顾故障时间线（10 分钟）
2. 根因分析（20 分钟）
3. 讨论改进措施（20 分钟）
4. 分配任务和责任人（10 分钟）
5. 总结发言（5 分钟）

行动项
------
□ 添加慢查询告警（DBA 负责，本周完成）
□ SQL 性能检查工具（后端负责，下周完成）
□ 自动回滚机制（运维负责，下周完成）
□ 性能测试规范（QA 负责，月底完成）
□ 故障演练计划（TL 负责，下月启动）

复盘报告编写：张三
审核：技术总监
发布：2024-01-17`}
          />
        </div>
      </section>

      {/* FAQ Section */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">常见问题 FAQ</h2>

        <div className="space-y-4">
          <FaqCard
            number={1}
            question="如何判断是否需要重启服务？"
            answer={"重启服务的判断标准：\n\n【需要立即重启的情况】\n1. 服务无响应（假死）\n2. 内存泄漏导致 OOM\n3. 线程死锁\n4. 未知错误且无法快速定位\n\n【重启前准备】\n1. 保存现场信息\n   ```bash\n   # 保存日志\n   kubectl logs deployment/app > app-before-restart.log\n   \n   # 保存 JVM 信息\n   jmap -heap <pid> > heap-info.txt\n   jstack <pid> > thread-dump.txt\n   ```\n\n2. 确认回滚方案\n   ```bash\n   # 查看历史版本\n   kubectl rollout history deployment/app\n   ```\n\n【重启命令】\n```bash\n# 滚动重启（推荐，零停机）\nkubectl rollout restart deployment/app\n\n# 快速扩缩容重启\nkubectl scale deployment/app --replicas=0\nkubectl scale deployment/app --replicas=3\n```\n\n【重启后验证】\n1. 检查 Pod 状态：kubectl get pods\n2. 检查健康：curl /actuator/health\n3. 检查日志：kubectl logs -f\n4. 检查监控：Grafana 面板"}
            isOpen={openFaq === 1}
            onClick={() => toggleFaq(1)}
          />
          <FaqCard
            number={2}
            question="故障处理时如何快速定位问题？"
            answer={"快速定位问题的五步法：\n\n【步骤1：确认故障范围】\n- 单个服务 vs 整个系统\n- 核心功能 vs 边缘功能\n- 所有用户 vs 部分用户\n\n```bash\n# 检查所有服务状态\nkubectl get pods -A\n# 检查所有服务健康\ncurl $(minikube ip):8080/actuator/health\n```\n\n【步骤2：查看监控指标】\n- CPU、内存、磁盘使用率\n- 请求 QPS、错误率、响应时间\n- 数据库连接数、慢查询\n\n【步骤3：分析日志】\n```bash\n# 实时日志\nkubectl logs -f deployment/app --since=5m\n\n# 错误日志\nkubectl logs deployment/app | grep -i error\n\n# 特定异常\nkubectl logs deployment/app | grep -i \"NullPointerException\"\n```\n\n【步骤4：链路追踪】\n- SkyWalking / Zipkin 查看调用链\n- 找出耗时最长的服务\n- 定位异常传播路径\n\n【步骤5：资源诊断】\n```bash\n# JVM 信息\njmap -heap <pid>\njstat -gcutil <pid> 1000\n\n# 网络连接\nnetstat -tlnp | grep 8080\n\n# 磁盘 I/O\niostat -x 1\n```"}
            isOpen={openFaq === 2}
            onClick={() => toggleFaq(2)}
          />
          <FaqCard
            number={3}
            question="如何避免生产环境故障？"
            answer={"故障预防的十个最佳实践：\n\n【1. 完善的监控告警】\n- CPU、内存、磁盘告警（>80%）\n- 接口错误率告警（>1%）\n- 响应时间告警（>1秒）\n- 数据库慢查询告警\n\n【2. 多环境测试】\n- 开发环境 → 测试环境 → 预发布 → 生产\n- 每个环境数据量与生产一致\n- 性能测试必须通过\n\n【3. 代码审查机制】\n- 所有代码必须经过 Review\n- 使用 PR Checklist\n- 关注 SQL 性能、并发安全\n\n【4. 灰度发布】\n- 金丝雀发布：先 1% 流量\n- 观察监控指标\n- 逐步放量：1% → 10% → 50% → 100%\n\n【5. 自动回滚】\n- 异常时自动回滚到上一版本\n- 设置健康检查阈值\n- 失败立即停止发布\n\n【6. 熔断降级】\n- @SentinelResource 配置降级\n- 核心功能与非核心功能隔离\n- 依赖服务故障时降级\n\n【7. 限流保护】\n- 接口级别限流\n- 用户维度限流\n- 防止雪崩效应\n\n【8. 定期备份】\n- 数据库每日备份\n- 配置文件版本管理\n- 关键数据异地备份\n\n【9. 故障演练】\n- 使用 Chaos Mesh 注入故障\n- 验证容错机制\n- 每周定期演练\n\n【10. 知识沉淀】\n- 每次故障必须复盘\n- 更新故障知识库\n- 编写 On-call 手册"}
            isOpen={openFaq === 3}
            onClick={() => toggleFaq(3)}
          />
        </div>
      </section>

      {/* Next Steps */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">下一步学习</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <a href="/monitoring" className="block bg-gradient-to-br from-purple-50 to-purple-100 border-2 border-purple-200 rounded-lg p-6 hover:shadow-lg transition">
            <h3 className="text-xl font-bold text-purple-900 mb-2">📊 监控告警</h3>
            <p className="text-gray-700 text-sm">Prometheus + Grafana 全链路监控体系</p>
          </a>
          <a href="/logging" className="block bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-200 rounded-lg p-6 hover:shadow-lg transition">
            <h3 className="text-xl font-bold text-green-900 mb-2">📝 日志聚合</h3>
            <p className="text-gray-700 text-sm">ELK Stack 日志收集、存储、分析</p>
          </a>
          <a href="/skywalking" className="block bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-200 rounded-lg p-6 hover:shadow-lg transition">
            <h3 className="text-xl font-bold text-blue-900 mb-2">🔍 链路追踪</h3>
            <p className="text-gray-700 text-sm">SkyWalking 分布式追踪实战</p>
          </a>
        </div>
      </section>
    </div>
  );
};
