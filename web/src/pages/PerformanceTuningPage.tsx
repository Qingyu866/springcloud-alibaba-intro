import { CodeBlock } from '../components';
import { useState } from 'react';

interface LevelCardProps {
  title: string;
  description: string;
  levels: string[];
  color: string;
}

const LevelCard: React.FC<LevelCardProps> = ({ title, description, levels, color }) => {
  const colorClasses = {
    red: 'bg-red-50 border-red-200',
    yellow: 'bg-yellow-50 border-yellow-200',
    green: 'bg-green-50 border-green-200',
    blue: 'bg-blue-50 border-blue-200',
  };

  return (
    <div className={`p-6 border-2 rounded-lg ${colorClasses[color as keyof typeof colorClasses]}`}>
      <h3 className="text-2xl font-bold text-gray-900 mb-3">{title}</h3>
      <p className="text-gray-700 mb-4">{description}</p>
      <ul className="space-y-2">
        {levels.map((level, index) => (
          <li key={index} className="flex items-start">
            <span className="text-green-600 mr-2 flex-shrink-0">✓</span>
            <span className="text-sm text-gray-700">{level}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

interface OptimizationCardProps {
  title: string;
  before: string;
  after: string;
  improvement: string;
  code?: string;
}

const OptimizationCard: React.FC<OptimizationCardProps> = ({ title, before, after, improvement, code }) => {
  return (
    <div className="bg-white border-2 border-slate-200 rounded-lg p-5">
      <h3 className="text-xl font-bold text-gray-900 mb-4">{title}</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div className="bg-red-50 p-3 rounded border border-red-200">
          <h4 className="font-bold text-red-700 mb-2">❌ 优化前</h4>
          <p className="text-sm text-gray-700">{before}</p>
        </div>
        <div className="bg-green-50 p-3 rounded border border-green-200">
          <h4 className="font-bold text-green-700 mb-2">✅ 优化后</h4>
          <p className="text-sm text-gray-700">{after}</p>
        </div>
      </div>

      {code && (
        <div className="mb-3">
          <CodeBlock language="java" code={code} />
        </div>
      )}

      <div className="bg-blue-50 p-3 rounded border border-blue-200">
        <p className="text-sm text-blue-900">
          <span className="font-bold">📈 提升:</span> {improvement}
        </p>
      </div>
    </div>
  );
};

interface ToolCardProps {
  name: string;
  category: string;
  description: string;
  usage: string;
}

const ToolCard: React.FC<ToolCardProps> = ({ name, category, description, usage }) => {
  return (
    <div className="bg-white border-2 border-slate-200 rounded-lg p-5">
      <span className="text-xs px-2 py-1 bg-gray-100 rounded">{category}</span>
      <h3 className="text-lg font-bold text-gray-900 mt-2 mb-2">{name}</h3>
      <p className="text-sm text-gray-700 mb-3">{description}</p>
      <div className="bg-gray-50 p-3 rounded">
        <p className="text-xs text-gray-600">
          <span className="font-semibold">使用场景:</span> {usage}
        </p>
      </div>
    </div>
  );
};

interface FaqCardProps {
  number: number;
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
}

const FaqCard: React.FC<FaqCardProps> = ({ number, question, answer, isOpen, onClick }) => {
  return (
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
};

export const PerformanceTuningPage: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* 页头 */}
      <div className="bg-gradient-to-r from-slate-700 to-slate-900 text-white rounded-lg p-6 mb-8">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-4xl font-bold mb-2">性能调优实战</h1>
            <p className="text-slate-200 text-lg">从 JVM 到架构的全链路性能优化</p>
          </div>
          <div className="flex gap-3 text-sm">
            <span className="px-3 py-1 bg-white/20 rounded-full">🏗️ 架构师</span>
            <span className="px-3 py-1 bg-white/20 rounded-full">⏱️ 约100分钟</span>
            <span className="px-3 py-1 bg-white/20 rounded-full">📚 20个知识点</span>
          </div>
        </div>
      </div>

      {/* 性能调优体系 */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">性能调优体系</h2>

        <div className="bg-white border-2 border-blue-200 rounded-lg p-6 mb-6">
          <p className="text-gray-700 text-lg mb-4">
            <strong>性能调优</strong> 是一个系统工程，需要从<strong className="text-blue-600">架构设计、代码实现、JVM 调优、数据库优化、缓存策略、网络优化</strong>等多个层面综合考虑。
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="bg-gradient-to-br from-red-50 to-red-100 p-4 rounded-lg border border-red-200">
              <h4 className="font-bold text-red-900 mb-2">🎯 调优目标</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• 响应时间 (RT): P99 &lt; 200ms</li>
                <li>• 吞吐量 (TPS): 提升 3-5倍</li>
                <li>• 资源利用率: CPU &lt; 70%</li>
                <li>• 错误率: &lt; 0.1%</li>
              </ul>
            </div>
            <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-4 rounded-lg border border-yellow-200">
              <h4 className="font-bold text-yellow-900 mb-2">📊 调优方法论</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• 监控发现瓶颈</li>
                <li>• 分析根因</li>
                <li>• 制定优化方案</li>
                <li>• 验证效果</li>
              </ul>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg border border-green-200">
              <h4 className="font-bold text-green-900 mb-2">🔧 调优原则</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• 先监控后优化</li>
                <li>• 先架构后代码</li>
                <li>• 先数据库后应用</li>
                <li>• 先外后内</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <LevelCard
            title="Level 1: 架构层优化"
            description="通过架构设计提升系统性能上限"
            color="blue"
            levels={[
              '微服务拆分：提升并发能力',
              '异步处理：解耦提升吞吐',
              '负载均衡：水平扩展',
              '缓存策略：减少数据库压力',
              'CDN 加速：静态资源优化'
            ]}
          />
          <LevelCard
            title="Level 2: 代码层优化"
            description="优化代码实现，减少资源消耗"
            color="green"
            levels={[
              '算法优化：降低时间复杂度',
              '避免 N+1 查询',
              '批处理操作',
              '连接池配置',
              '线程池调优'
            ]}
          />
          <LevelCard
            title="Level 3: JVM 层优化"
            description="JVM 参数调优，降低 GC 停顿"
            color="yellow"
            levels={[
              '选择合适的 GC 算法',
              '调整堆内存大小',
              '优化 GC 参数',
              '分析内存泄漏',
              '线程堆栈分析'
            ]}
          />
          <LevelCard
            title="Level 4: 数据库层优化"
            description="数据库 SQL 和索引优化"
            color="red"
            levels={[
              '索引优化：加速查询',
              'SQL 优化：减少全表扫描',
              '分库分表：分散压力',
              '读写分离：提升读性能',
              '连接池调优'
            ]}
          />
        </div>
      </section>

      {/* JVM 调优实战 */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">JVM 调优实战</h2>

        <div className="space-y-6">
          <div className="bg-white border-2 border-blue-200 rounded-lg p-6">
            <h3 className="text-2xl font-bold text-blue-900 mb-4">1. JVM 内存模型与 GC 算法</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="bg-blue-50 p-4 rounded">
                <h4 className="font-bold text-blue-900 mb-2">堆内存结构</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• 新生代 (Young Gen): Eden + Survivor × 2</li>
                  <li>• 老年代 (Old Gen): 长期存活对象</li>
                  <li>• 元空间 (Metaspace): 类元数据</li>
                  <li>• 比例: New : Old = 1 : 2</li>
                </ul>
              </div>
              <div className="bg-blue-50 p-4 rounded">
                <h4 className="font-bold text-blue-900 mb-2">GC 算法选择</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Serial: 小内存、单核 CPU</li>
                  <li>• Parallel: 吞吐量优先</li>
                  <li>• G1: 大内存、低延迟</li>
                  <li>• ZGC: 超大内存、&lt; 10ms GC</li>
                </ul>
              </div>
            </div>

            <div>
              <h4 className="font-bold text-gray-900 mb-2">JVM 参数配置示例</h4>
              <CodeBlock
                language="bash"
                code={`# 8G 堆内存，使用 G1 GC（推荐生产环境）
java -Xms8g -Xmx8g \\
     -XX:+UseG1GC \\
     -XX:MaxGCPauseMillis=200 \\
     -XX:G1HeapRegionSize=16m \\
     -XX:InitiatingHeapOccupancyPercent=45 \\
     -XX:+HeapDumpOnOutOfMemoryError \\
     -XX:HeapDumpPath=/logs/heapdump.hprof \\
     -jar app.jar

# 4G 堆内存，使用 Parallel GC（吞吐量优先）
java -Xms4g -Xmx4g \\
     -XX:+UseParallelGC \\
     -XX:MaxGCPauseMillis=300 \\
     -XX:GCTimeRatio=99 \\
     -jar app.jar

# 16G+ 堆内存，使用 ZGC（超低延迟）
java -Xms16g -Xmx16g \\
     -XX:+UseZGC \\
     -XX:+UnlockExperimentalVMOptions \\
     -jar app.jar`}
              />
            </div>
          </div>

          <div className="bg-white border-2 border-green-200 rounded-lg p-6">
            <h3 className="text-2xl font-bold text-green-900 mb-4">2. GC 日志分析与问题定位</h3>

            <div>
              <h4 className="font-bold text-gray-900 mb-2">开启 GC 日志</h4>
              <CodeBlock
                language="bash"
                code={`# JDK 8
java -Xloggc:/logs/gc.log \\
     -XX:+PrintGCDetails \\
     -XX:+PrintGCDateStamps \\
     -XX:+PrintGCTimeStamps \\
     -jar app.jar

# JDK 11+
java -Xlog:gc*:file=/logs/gc.log:time,uptime:filecount=5,filesize=10m \\
     -jar app.jar

# 使用 GCViewer 分析 GC 日志
# 下载: https://github.com/chewiebug/GCViewer
# 查看: GC 次数、GC 时间、堆内存变化`}
              />
            </div>

            <div className="mt-4">
              <h4 className="font-bold text-gray-900 mb-2">常见 GC 问题与解决方案</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-red-50 p-3 rounded border border-red-200">
                  <h5 className="font-bold text-red-700 mb-1">频繁 Full GC</h5>
                  <p className="text-sm text-gray-700 mb-2">原因: 老年代空间不足</p>
                  <p className="text-sm text-green-700">解决: 增大堆内存、优化对象生命周期</p>
                </div>
                <div className="bg-red-50 p-3 rounded border border-red-200">
                  <h5 className="font-bold text-red-700 mb-1">GC 停顿时间长</h5>
                  <p className="text-sm text-gray-700 mb-2">原因: G1 混合回收耗时</p>
                  <p className="text-sm text-green-700">解决: 调整 MaxGCPauseMillis</p>
                </div>
                <div className="bg-red-50 p-3 rounded border border-red-200">
                  <h5 className="font-bold text-red-700 mb-1">内存泄漏</h5>
                  <p className="text-sm text-gray-700 mb-2">原因: 对象无法回收</p>
                  <p className="text-sm text-green-700">解决: MAT 分析 Heap Dump</p>
                </div>
                <div className="bg-red-50 p-3 rounded border border-red-200">
                  <h5 className="font-bold text-red-700 mb-1">OOM 内存溢出</h5>
                  <p className="text-sm text-gray-700 mb-2">原因: 内存不足或泄漏</p>
                  <p className="text-sm text-green-700">解决: Heap Dump + MAT 分析</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white border-2 border-purple-200 rounded-lg p-6">
            <h3 className="text-2xl font-bold text-purple-900 mb-4">3. MAT 内存分析实战</h3>

            <div className="space-y-4">
              <div>
                <h4 className="font-bold text-gray-900 mb-2">步骤1: 获取 Heap Dump</h4>
                <CodeBlock
                  language="bash"
                  code={`# 方法1: JVM 参数自动 Dump（OOM 时）
java -XX:+HeapDumpOnOutOfMemoryError \\
     -XX:HeapDumpPath=/logs/heapdump.hprof \\
     -jar app.jar

# 方法2: 手动 Dump
jmap -dump:format=b,file=heapdump.hprof <pid>

# 方法3: jcmd 命令
jcmd <pid> GC.heap_dump /tmp/heapdump.hprof`}
                />
              </div>

              <div>
                <h4 className="font-bold text-gray-900 mb-2">步骤2: 使用 MAT 分析</h4>
                <CodeBlock
                  language="bash"
                  code={`# 下载 MAT (Memory Analyzer Tool)
# https://www.eclipse.org/mat/

# 打开 Heap Dump 文件
# File -> Open Heap Dump -> 选择 heapdump.hprof

# 自动生成报告
# Leak Suspects Report（疑似内存泄漏报告）

# 手动分析
# 1. Dominator Tree（支配树）: 查看最大对象
# 2. Histogram（直方图）: 按类统计实例数量
# 3. Thread Overview（线程概览）: 查看线程栈
# 4. Path to GC Roots: 查看对象引用链`}
                />
              </div>

              <div className="bg-yellow-50 p-4 rounded border border-yellow-200">
                <h4 className="font-bold text-yellow-900 mb-2">💡 内存泄漏常见原因</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• 静态集合持有大量对象</li>
                  <li>• 未关闭的连接（IO、数据库、网络）</li>
                  <li>• ThreadLocal 未 remove</li>
                  <li>• 缓存无过期策略</li>
                  <li>• 匿名内部类持有外部类引用</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 数据库性能优化 */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">数据库性能优化</h2>

        <div className="space-y-6">
          <OptimizationCard
            title="优化1: 索引优化"
            before="全表扫描，查询 100万条数据耗时 2.5s"
            after="使用索引，查询耗时 15ms"
            improvement="性能提升 166倍"
            code={`-- 优化前：全表扫描
SELECT * FROM orders WHERE user_id = 123;

-- 优化后：添加索引
CREATE INDEX idx_user_id ON orders(user_id);

-- 验证索引是否生效
EXPLAIN SELECT * FROM orders WHERE user_id = 123;
-- type: ref（使用了索引）`}
          />

          <OptimizationCard
            title="优化2: 避免 SELECT *"
            before="SELECT * 查询所有字段，返回 50 列数据"
            after="只查询需要的 3 列"
            improvement="减少网络传输 94%"
            code={`-- 优化前：查询所有字段
SELECT * FROM orders WHERE id = 123;

-- 优化后：只查询需要的字段
SELECT id, user_id, status FROM orders WHERE id = 123;

-- 优势：
-- 1. 减少网络传输
-- 2. 可使用覆盖索引（Covering Index）
-- 3. 节省内存占用`}
          />

          <OptimizationCard
            title="优化3: 批量插入"
            before="逐条插入 1000 条数据，耗时 15s"
            after="批量插入，耗时 0.8s"
            improvement="性能提升 18倍"
            code={`-- 优化前：逐条插入（慢）
for (Order order : orders) {
    INSERT INTO orders (user_id, amount) VALUES (?, ?);
}

-- 优化后：批量插入（快）
INSERT INTO orders (user_id, amount) VALUES
  (1, 100),
  (2, 200),
  (3, 300),
  ...
  (1000, 1000);

-- Spring JDBC Batch
jdbcTemplate.batchUpdate(
    "INSERT INTO orders (user_id, amount) VALUES (?, ?)",
    orders.stream()
        .map(o -> new Object[]{o.getUserId(), o.getAmount()})
        .collect(Collectors.toList())
);

-- 注意：batch_size 建议 100-1000`}
          />

          <OptimizationCard
            title="优化4: 分页查询优化"
            before="深分页 OFFSET 100000 耗时 8s"
            after="使用 ID 范围查询，耗时 50ms"
            improvement="性能提升 160倍"
            code={`-- 优化前：深分页性能差
SELECT * FROM orders
ORDER BY id
LIMIT 20 OFFSET 100000;

-- 优化后：使用 ID 范围（性能最优）
SELECT * FROM orders
WHERE id > 100000
ORDER BY id
LIMIT 20;

-- 优化后：使用子查询（适用于无连续 ID 场景）
SELECT * FROM orders o
INNER JOIN (
    SELECT id FROM orders
    ORDER BY id
    LIMIT 20 OFFSET 100000
) t ON o.id = t.id;

-- 实战：记录上次查询的最大 ID
-- SELECT * FROM orders WHERE id > last_max_id LIMIT 20;`}
          />
        </div>
      </section>

      {/* 缓存性能优化 */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">缓存性能优化</h2>

        <div className="space-y-6">
          <div className="bg-white border-2 border-orange-200 rounded-lg p-6">
            <h3 className="text-2xl font-bold text-orange-900 mb-4">缓存优化策略</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-orange-50 p-4 rounded border border-orange-200">
                <h4 className="font-bold text-orange-900 mb-2">1. 多级缓存</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>L1 本地缓存 (Caffeine): 毫秒级</li>
                  <li>L2 分布式缓存 (Redis): 10-50ms</li>
                  <li>L3 数据库: 50-200ms</li>
                </ul>
                <p className="text-xs text-gray-600 mt-2">
                  命中率: L1 80% → L2 15% → DB 5%
                </p>
              </div>

              <div className="bg-orange-50 p-4 rounded border border-orange-200">
                <h4 className="font-bold text-orange-900 mb-2">2. 缓存预热</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>应用启动时加载热点数据</li>
                  <li>定时任务刷新缓存</li>
                  <li>使用 @PostConstruct 初始化</li>
                </ul>
                <p className="text-xs text-gray-600 mt-2">
                  避免冷启动缓存穿透
                </p>
              </div>

              <div className="bg-orange-50 p-4 rounded border border-orange-200">
                <h4 className="font-bold text-orange-900 mb-2">3. 缓存更新策略</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>Cache Aside: 先更库，再删缓存</li>
                  <li>Write Through: 同步更新缓存</li>
                  <li>Write Behind: 异步批量更新</li>
                </ul>
                <p className="text-xs text-gray-600 mt-2">
                  推荐 Cache Aside 模式
                </p>
              </div>

              <div className="bg-orange-50 p-4 rounded border border-orange-200">
                <h4 className="font-bold text-orange-900 mb-2">4. 大 key 分拆</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>单个 key 不超过 1MB</li>
                  <li>大对象分片存储</li>
                  <li>使用 Hash 结构存储</li>
                </ul>
                <p className="text-xs text-gray-600 mt-2">
                  避免 Big Key 阻塞 Redis
                </p>
              </div>
            </div>

            <div className="mt-4">
              <h4 className="font-bold text-gray-900 mb-2">多级缓存实现</h4>
              <CodeBlock
                language="java"
                code={`@Component
public class MultiLevelCacheService {

    @Autowired
    private RedisTemplate<String, Object> redisTemplate;

    private Cache<String, Object> localCache =
        Caffeine.newBuilder()
            .maximumSize(10000)
            .expireAfterWrite(5, TimeUnit.MINUTES)
            .build();

    public Object getData(String key) {
        // L1: 本地缓存
        Object value = localCache.getIfPresent(key);
        if (value != null) {
            return value;
        }

        // L2: Redis 缓存
        value = redisTemplate.opsForValue().get(key);
        if (value != null) {
            localCache.put(key, value);
            return value;
        }

        // L3: 数据库
        value = database.query(key);
        if (value != null) {
            // 回写缓存
            redisTemplate.opsForValue().set(key, value, 30, TimeUnit.MINUTES);
            localCache.put(key, value);
        }

        return value;
    }
}`}
              />
            </div>
          </div>

          <div className="bg-white border-2 border-red-200 rounded-lg p-6">
            <h3 className="text-2xl font-bold text-red-900 mb-4">缓存常见问题与解决方案</h3>

            <div className="space-y-4">
              <div className="bg-red-50 p-4 rounded border border-red-200">
                <h4 className="font-bold text-red-700 mb-2">问题1: 缓存穿透</h4>
                <p className="text-sm text-gray-700 mb-2">
                  <strong>现象:</strong> 查询不存在的 key，每次都打到数据库
                </p>
                <p className="text-sm text-green-700">
                  <strong>解决:</strong> 布隆过滤器 (Bloom Filter) + 空值缓存
                </p>
                <CodeBlock
                  language="java"
                  code={`// 布隆过滤器判断 key 是否可能存在
if (bloomFilter.mightContain(key)) {
    return cache.get(key);
} else {
    return null; // key 不存在，直接返回
}

// 空值缓存
if (value == null) {
    redisTemplate.set(key, NULL_VALUE, 5, TimeUnit.MINUTES);
}`}
                />
              </div>

              <div className="bg-red-50 p-4 rounded border border-red-200">
                <h4 className="font-bold text-red-700 mb-2">问题2: 缓存击穿</h4>
                <p className="text-sm text-gray-700 mb-2">
                  <strong>现象:</strong> 热点 key 过期瞬间，大量请求打到数据库
                </p>
                <p className="text-sm text-green-700">
                  <strong>解决:</strong> 互斥锁 (Mutex Lock) + 热点数据永不过期
                </p>
                <CodeBlock
                  language="java"
                  code={`// 互斥锁防止缓存击穿
public Object getData(String key) {
    Object value = redisTemplate.get(key);
    if (value != null) {
        return value;
    }

    // 获取分布式锁
    String lockKey = "lock:" + key;
    try {
        if (redisTemplate.setIfAbsent(lockKey, "1", 10, TimeUnit.SECONDS)) {
            // 双重检查
            value = redisTemplate.get(key);
            if (value != null) {
                return value;
            }

            // 查询数据库
            value = database.query(key);
            redisTemplate.set(key, value, 30, TimeUnit.MINUTES);
            return value;
        } else {
            // 未获取锁，等待后重试
            Thread.sleep(100);
            return getData(key);
        }
    } finally {
        redisTemplate.delete(lockKey);
    }
}`}
                />
              </div>

              <div className="bg-red-50 p-4 rounded border border-red-200">
                <h4 className="font-bold text-red-700 mb-2">问题3: 缓存雪崩</h4>
                <p className="text-sm text-gray-700 mb-2">
                  <strong>现象:</strong> 大量 key 同时过期，数据库压力骤增
                </p>
                <p className="text-sm text-green-700">
                  <strong>解决:</strong> 过期时间加随机值 + 熔断降级
                </p>
                <CodeBlock
                  language="java"
                  code={`// 过期时间加随机值，防止同时过期
int expireTime = 30 + RandomUtils.nextInt(0, 5); // 30-35分钟
redisTemplate.set(key, value, expireTime, TimeUnit.MINUTES);

// 多级缓存 + 限流保护
// L1: 本地缓存不过期
// L2: Redis 随机过期
// 限流: 单机 QPS 限制`}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 性能测试工具 */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">性能测试工具</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <ToolCard
            name="JMeter"
            category="压力测试"
            description="Apache 开源的性能测试工具，支持多种协议"
            usage="接口压力测试、并发测试、性能基准测试"
          />
          <ToolCard
            name="Arthas"
            category="线上诊断"
            description="阿里开源的 Java 诊断工具，无需重启"
            usage="线上问题排查、CPU/内存分析、方法执行统计"
          />
          <ToolCard
            name="JProfiler"
            category="性能分析"
            description="商业级 Java 性能分析工具"
            usage="CPU 采样、内存分析、线程分析、数据库分析"
          />
          <ToolCard
            name="VisualVM"
            category="监控工具"
            description="JDK 自带的监控工具，免费轻量"
            usage="JVM 监控、线程分析、内存分析、GC 分析"
          />
          <ToolCard
            name="wrk"
            category="HTTP 压测"
            description="轻量级 HTTP 压测工具"
            usage="接口性能测试、QPS 测试"
          />
          <ToolCard
            name="Prometheus + Grafana"
            category="监控告警"
            description="云原生监控方案"
            usage="系统监控、性能指标可视化、告警"
          />
        </div>
      </section>

      {/* 性能调优最佳实践 */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">性能调优最佳实践</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-300 rounded-lg p-5">
            <h3 className="text-xl font-bold text-green-900 mb-3">✅ 推荐做法</h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <span className="text-green-600 mr-2 flex-shrink-0">✓</span>
                <span>先监控后优化，避免盲目优化</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2 flex-shrink-0">✓</span>
                <span>建立性能基准，量化优化效果</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2 flex-shrink-0">✓</span>
                <span>从架构层面优化，提升上限</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2 flex-shrink-0">✓</span>
                <span>定期压测，提前发现瓶颈</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2 flex-shrink-0">✓</span>
                <span>使用多级缓存，减少数据库压力</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2 flex-shrink-0">✓</span>
                <span>异步处理解耦，提升吞吐量</span>
              </li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-red-50 to-red-100 border-2 border-red-300 rounded-lg p-5">
            <h3 className="text-xl font-bold text-red-900 mb-3">❌ 避免做法</h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <span className="text-red-600 mr-2 flex-shrink-0">✗</span>
                <span>过早优化，浪费开发时间</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-600 mr-2 flex-shrink-0">✗</span>
                <span>盲目调优 JVM，忽略架构问题</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-600 mr-2 flex-shrink-0">✗</span>
                <span>过度优化，代码可读性差</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-600 mr-2 flex-shrink-0">✗</span>
                <span>N+1 查询，性能杀手</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-600 mr-2 flex-shrink-0">✗</span>
                <span>大事务，锁资源太久</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-600 mr-2 flex-shrink-0">✗</span>
                <span>忽略监控，无法量化效果</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* 常见问题 FAQ */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">常见问题</h2>

        <div className="space-y-4">
          <FaqCard
            number={1}
            question="JVM 堆内存设置多大合适?"
            answer={"堆内存大小设置需要综合考虑：\n\n1. 系统内存\n   - 留 30-40% 给操作系统和其他进程\n   - 示例：16G 服务器，堆内存设置 8-10G\n\n2. 业务特点\n   - 对象生命周期短（大量临时对象）：新生代占比大\n   - 对象生命周期长（缓存多）：老年代占比大\n\n3. GC 停顿时间要求\n   - 低延迟（&lt; 50ms）：堆内存不宜过大，使用 ZGC\n   - 高吞吐：堆内存可适当增大，使用 Parallel GC\n\n【推荐配置】\n- 小型应用（2-4G 核心数）：-Xms2g -Xmx2g\n- 中型应用（4-8G 核心数）：-Xms4g -Xmx4g\n- 大型应用（8-16G 核心数）：-Xms8g -Xmx8g\n- 超大应用（16G+）：-Xms16g -Xmx16g + ZGC\n\n【关键原则】\n- Xms = Xmx（避免动态扩容）\n- 堆内存不超过物理内存的 60%"}
            isOpen={openFaq === 1}
            onClick={() => toggleFaq(1)}
          />

          <FaqCard
            number={2}
            question="如何判断是否需要分库分表?"
            answer={"分库分表是最后的优化手段，需要满足以下条件：\n\n【数据量指标】\n- 单表数据量 &gt; 1000万\n- 单库数据量 &gt; 5000万\n- 磁盘空间占用 &gt; 500GB\n\n【性能指标】\n- 查询响应时间 &gt; 1s\n- 写入 QPS 接近数据库瓶颈（MySQL 单机 5000-10000）\n- 主从延迟 &gt; 5s\n\n【其他方案优先】\n1. 读写分离：解决读性能问题\n2. 索引优化：解决查询慢问题\n3. 历史数据归档：减少单表数据量\n4. 分区表：MySQL 分区表替代分表\n\n【分库分表策略】\n- 垂直分库：按业务拆分\n- 垂直分表：大表拆小表（字段拆分）\n- 水平分库：数据均匀分布\n- 水平分表：解决单表数据量大\n\n【实战建议】\n- 优先考虑读写分离 + 索引优化\n- 数据量 &lt; 5000万不建议分库分表\n- 使用 ShardingSphere 或 MyCAT 实现"}
            isOpen={openFaq === 2}
            onClick={() => toggleFaq(2)}
          />

          <FaqCard
            number={3}
            question="如何定位 CPU 使用率高的问题?"
            answer={"CPU 使用率高排查步骤：\n\n1. 确认是系统 CPU 还是用户 CPU\n   top -p &lt;pid&gt;\n   - us 高：用户态 CPU 高（业务代码问题）\n   - sy 高：内核态 CPU 高（系统调用频繁）\n\n2. 定位占用 CPU 的线程\n   top -Hp &lt;pid&gt;\n   找到 CPU 最高的线程 ID（十进制）\n\n3. 转换线程 ID 为十六进制\n   printf \"%x\\n\" &lt;tid&gt;\n\n4. 查看线程堆栈\n   jstack &lt;pid&gt; | grep -A 20 &lt;hex_tid&gt;\n\n5. 分析堆栈，定位问题代码\n   - 死循环\n   - 正则表达式引擎（回溯问题）\n   - 频繁 GC\n   - 序列化/反序列化\n\n【实战案例】\n# Arthas 快速定位 CPU 高线程\nthread -n 3  # 查看 CPU 最高的 3 个线程\nthread &lt;thread-id&gt;  # 查看线程堆栈\n\n【常见原因】\n1. 死循环代码\n2. 正则表达式性能差\n3. 频繁 Full GC\n4. 密集计算（加密、压缩）"}
            isOpen={openFaq === 3}
            onClick={() => toggleFaq(3)}
          />
        </div>
      </section>

      {/* 下一步学习 */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">下一步学习</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <a href="/security-design" className="block bg-gradient-to-br from-red-50 to-red-100 border-2 border-red-200 rounded-lg p-6 hover:shadow-lg transition">
            <h3 className="text-xl font-bold text-red-900 mb-2">🔒 安全架构设计</h3>
            <p className="text-gray-700 text-sm">微服务安全架构与最佳实践</p>
          </a>
          <a href="/disaster-recovery" className="block bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-200 rounded-lg p-6 hover:shadow-lg transition">
            <h3 className="text-xl font-bold text-blue-900 mb-2">🛡️ 容灾与高可用</h3>
            <p className="text-gray-700 text-sm">构建高可用的容灾体系</p>
          </a>
        </div>
      </section>
    </div>
  );
};
