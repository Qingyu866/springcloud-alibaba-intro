import { useState } from 'react';
import { CodeBlock } from '../components';

interface IssueCardProps {
  title: string;
  symptoms: string[];
  icon: string;
  color: string;
}

const IssueCard: React.FC<IssueCardProps> = ({ title, symptoms, icon, color }) => (
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
            <h1 className="text-4xl font-bold mb-2">故障排查</h1>
            <p className="text-red-100 text-lg">生产环境常见问题诊断与解决</p>
          </div>
          <div className="flex gap-3 text-sm">
            <span className="px-3 py-1 bg-white/20 rounded-full">🔧 中级</span>
            <span className="px-3 py-1 bg-white/20 rounded-full">⏱️ 约50分钟</span>
            <span className="px-3 py-1 bg-white/20 rounded-full">📚 9个知识点</span>
          </div>
        </div>
      </div>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">常见故障类型</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <IssueCard
            title="服务启动失败"
            symptoms={[
              "服务无法启动，端口冲突",
              "依赖服务连接失败",
              "配置文件错误"
            ]}
            icon="🚫"
            color="bg-red-50 border-red-200"
          />
          <IssueCard
            title="服务响应超时"
            symptoms={[
              "API 调用超时",
              "数据库查询慢",
              "网络延迟高"
            ]}
            icon="⏱️"
            color="bg-yellow-50 border-yellow-200"
          />
          <IssueCard
            title="内存溢出 OOM"
            symptoms={[
              "OutOfMemoryError",
              "频繁 Full GC",
              "服务重启或崩溃"
            ]}
            icon="💾"
            color="bg-purple-50 border-purple-200"
          />
          <IssueCard
            title="CPU 100%"
            symptoms={[
              "CPU 使用率持续高位",
              "响应缓慢",
              "线程死锁"
            ]}
            icon="🖥️"
            color="bg-blue-50 border-blue-200"
          />
          <IssueCard
            title="数据库连接池耗尽"
            symptoms={[
              "获取连接超时",
              "ConnectionPool Exhausted",
              "大量等待连接的请求"
            ]}
            icon="🗄️"
            color="bg-green-50 border-green-200"
          />
          <IssueCard
            title="消息队列积压"
            symptoms={[
              "消息消费延迟",
              "消费者异常",
              "队列消息堆积"
            ]}
            icon="📨"
            color="bg-orange-50 border-orange-200"
          />
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">1. 服务注册发现问题</h2>

        <div className="bg-white border-2 border-slate-200 rounded-lg p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">问题：服务无法注册到 Nacos</h3>
          <CodeBlock
            language="yaml"
            code={`【症状】
- Nacos 控制台看不到服务实例
- 服务调用时报错 "No instances available"
- 日志显示 "register failed"

【排查步骤】

1. 检查 Nacos 地址配置
   spring:
     cloud:
       nacos:
         discovery:
           server-addr: nacos-server:8848  # 确认地址正确

2. 检查网络连通性
   curl http://nacos-server:8848/nacos/v1/ns/instance/list?serviceName=order-service

3. 查看服务日志
   tail -f /var/log/apps/order-service/all.log | grep -i nacos

4. 验证命名空间配置
   spring:
     cloud:
       nacos:
         discovery:
           namespace: production  # 确保命名空间一致

【解决方案】

方案1: 检查 Nacos 服务器状态
# 查看集群健康状态
curl http://nacos-server:8848/nacos/v1/console/health/readiness

方案2: 增加重试次数和超时时间
spring:
  cloud:
    nacos:
      discovery:
        heart-beat-interval: 5000      # 心跳间隔5秒
        heart-beat-timeout: 15000      # 心跳超时15秒
        ip-delete-timeout: 30000       # IP删除超时30秒

方案3: 关闭安全认证（开发环境）
nacos:
  discovery:
    username: nacos
    password: nacos

【预防措施】
✓ 配置健康检查端点
✓ 设置合理的超时和重试参数
✓ 监控 Nacos 集群状态
✓ 定期检查服务注册状态`}
          />
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">2. 配置中心问题</h2>

        <div className="bg-white border-2 border-slate-200 rounded-lg p-6">
          <CodeBlock
            language="yaml"
            code={`【问题】配置无法从 Nacos Config 获取

【症状】
- 应用启动失败，提示 "config data not found"
- 配置更新不生效
- 获取到旧配置

【排查步骤】

1. 检查 DataId 格式
   # 格式: $\{spring.application.name\}-$\{profile\}.yaml
   # 示例: order-service-prod.yaml

2. 验证命名空间和 Group
   spring:
     cloud:
       nacos:
         config:
           server-addr: nacos-server:8848
           namespace: production
           group: DEFAULT_GROUP
           file-extension: yaml

3. 查看 Nacos 配置列表
   # 登录 Nacos 控制台
   # 配置管理 -> 配置列表 -> 检查 DataId 是否存在

【解决方案】

方案1: 自动刷新配置
@RefreshScope  // 添加该注解使配置热更新
@RestController
public class ConfigController {
    @Value("\${app.config}")
    private String config;
}

方案2: 配置文件导入
# Nacos 控制台 -> 导入配置
# 支持 ZIP 批量导入

方案3: 共享配置
spring:
  cloud:
    nacos:
      config:
        shared-configs:
          - data-id: common-db.yaml
            group: DEFAULT_GROUP
            refresh: true

【配置最佳实践】
✓ DataId 命名规范：\$\{name\}-\$\{profile\}.\${extension}
✓ 使用命名空间隔离环境
✓ 敏感配置使用加密
✓ 关键配置添加备份`}
          />
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">3. 调用链路超时</h2>

        <div className="bg-white border-2 border-slate-200 rounded-lg p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">OpenFeign 调用超时配置</h3>
          <CodeBlock
            language="yaml"
            code={`【问题】Feign 调用超时 ReadTimedOut

【症状】
- feign.RetryableException: Read timed out
- 间歇性超时，不稳定
- 负载高时更容易超时

【排查步骤】

1. 查看调用链路耗时
   # SkyWalking / Zipkin 追踪链路
   # 找出耗时最长的服务

2. 检查下游服务响应时间
   curl -w "@curl-format.txt" http://order-service/api/orders/123

3. 分析网络延迟
   ping order-service
   traceroute order-service

【解决方案】

方案1: 调整超时配置
feign:
  client:
    config:
      default:
        connectTimeout: 5000    # 连接超时5秒
        readTimeout: 10000      # 读取超时10秒
        loggerLevel: basic

  # 特定服务配置
      order-service:
        connectTimeout: 3000
        readTimeout: 30000      # 复杂查询允许更长

方案2: 启用 Hystrix/Sentinel 熔断
# Sentinel 配置
spring:
  cloud:
    sentinel:
      transport:
        dashboard: sentinel-dashboard:8080

# 降级规则
@SentinelResource(
    value = "getOrder",
    blockHandler = "handleBlock",
    fallback = "handleFallback"
)

方案3: 优化下游服务
- 添加数据库索引
- 使用 Redis 缓存
- 异步处理非核心逻辑
- 分页查询避免大结果集

【性能优化】
✓ 使用连接池（HttpClient）
✓ 启用请求/响应压缩
✓ 合理设置超时时间
✓ 实现幂等性支持重试`}
          />
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">4. 内存溢出诊断</h2>

        <div className="bg-white border-2 border-slate-200 rounded-lg p-6">
          <CodeBlock
            language="bash"
            code={`【问题】java.lang.OutOfMemoryError: Java heap space

【症状】
- 服务频繁重启
- 日志显示 OutOfMemoryError
- 响应越来越慢

【诊断步骤】

1. 查看内存使用情况
   jps -l                          # 找到 Java 进程 PID
   jmap -heap <pid>                # 查看 heap 使用情况
   jstat -gcutil <pid> 1000        # 实时监控 GC

2. 导出堆转储文件
   jmap -dump:format=b,file=heap.hprof <pid>
   # 或配置 OOM 时自动导出
   -XX:+HeapDumpOnOutOfMemoryError
   -XX:HeapDumpPath=/var/log/heap/

3. 使用 MAT 分析 heap.hprof
   # Eclipse Memory Analyzer Tool
   # 查找大对象、内存泄漏

【常见原因】

1. 内存泄漏
   - 静态集合不断增长
   - 未关闭的资源（连接、流）
   - 缓存无限增长

2. 大对象分配
   - 一次性加载大数据
   - 不合理的查询结果

3. 内存配置不足
   - -Xmx 太小

【解决方案】

方案1: 增加 JVM 内存
java -Xms2g -Xmx4g -XX:MetaspaceSize=256m -XX:MaxMetaspaceSize=512m

方案2: 优化缓存策略
@Configuration
public class CacheConfig {
    @Bean
    public CacheManager cacheManager() {
        CaffeineCacheManager manager = new CaffeineCacheManager();
        manager.setCaffeine(Caffeine.newBuilder()
            .maximumSize(10000)         // 最大缓存数
            .expireAfterWrite(10, TimeUnit.MINUTES)  // 10分钟过期
            .weakKeys()                 // 弱引用键
            .recordStats());
        return manager;
    }
}

方案3: 分页查询
// 错误：一次性加载所有数据
List<Order> orders = orderMapper.selectAll();

// 正确：分页查询
Page<Order> page = new Page<>(currentPage, pageSize);
List<Order> orders = orderMapper.selectPage(page, null);

【GC 优化】
-XX:+UseG1GC                     # 使用 G1 垃圾回收器
-XX:MaxGCPauseMillis=200         # 最大 GC 暂停时间
-XX:G1ReservePercent=10          # 保留堆内存百分比`}
          />
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">5. 数据库连接池问题</h2>

        <div className="bg-white border-2 border-slate-200 rounded-lg p-6">
          <CodeBlock
            language="yaml"
            code={`【问题】数据库连接池耗尽

【症状】
- java.sql.SQLTransientConnectionException:
  HikariPool-1 - Connection is not available
- 大量请求等待获取连接
- 数据库响应慢

【诊断步骤】

1. 查看连接池状态
   # actuator 端点
   curl http://order-service/actuator/hikaricp

2. 查看数据库连接数
   SHOW PROCESSLIST;
   SHOW STATUS LIKE 'Threads_connected';

3. 检查慢查询
   SHOW FULL PROCESSLIST;
   # 查看 Time 和 State 列

【常见原因】

1. 连接未释放
   - 忘记关闭 Connection/Statement
   - 异常时未释放资源

2. 连接池配置不当
   - maximumPoolSize 太小
   - connectionTimeout 太短

3. 慢查询占用连接
   - 缺少索引
   - 全表扫描

【解决方案】

方案1: 优化连接池配置
spring:
  datasource:
    hikari:
      maximum-pool-size: 20           # 最大连接数
      minimum-idle: 5                 # 最小空闲连接
      connection-timeout: 30000       # 连接超时30秒
      idle-timeout: 600000            # 空闲超时10分钟
      max-lifetime: 1800000           # 连接最大生命周期30分钟
      leak-detection-threshold: 60000 # 连接泄漏检测（60秒）

方案2: 使用 try-with-resources
// 确保资源自动关闭
try (Connection conn = dataSource.getConnection();
     PreparedStatement ps = conn.prepareStatement(sql)) {
    // 执行查询
}

方案3: 优化 SQL
-- 添加索引
CREATE INDEX idx_user_id ON orders(user_id);

-- 优化查询
SELECT * FROM orders WHERE user_id = ? LIMIT 100;

-- 使用 EXPLAIN 分析
EXPLAIN SELECT * FROM orders WHERE ...

【监控告警】
✓ 监控 active 连接数
✓ 监控等待获取连接的线程数
✓ 慢查询告警
✓ 连接泄漏检测`}
          />
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">故障排查工具箱</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-5">
            <h3 className="text-xl font-bold text-blue-900 mb-3">系统诊断命令</h3>
            <CodeBlock
              language="bash"
              code={`# CPU 和内存
top -p <pid>
htop

# JVM 信息
jinfo -flags <pid>
jstack -l <pid>          # 线程堆栈
jmap -histo:live <pid>    # 对象统计

# 网络诊断
netstat -tlnp             # 监听端口
ss -tlnp                  # 连接统计
tcpdump -i eth0 port 8080 # 抓包

# 磁盘 I/O
iostat -x 1
iotop

# 文件描述符
lsof -p <pid>             # 打开文件
ulimit -n                 # 文件描述符限制`}
            />
          </div>

          <div className="bg-green-50 border-2 border-green-200 rounded-lg p-5">
            <h3 className="text-xl font-bold text-green-900 mb-3">日志查询技巧</h3>
            <CodeBlock
              language="bash"
              code={`# Kibana 查询
level: "ERROR" AND app: "order-service"

# 全链路追踪
traceId: "a1b2c3d4"

# 特定异常
message: "NullPointerException"

# 时间范围
@timestamp: >= "2024-01-01" AND @timestamp: <= "2024-01-31"

# Linux 日志分析
grep "ERROR" /var/log/app.log
tail -f /var/log/app.log | grep --line-buffered "ERROR"
grep "order-id-123" app.log

# 统计 ERROR 数量
grep -c "ERROR" app.log

# 查找异常堆栈
grep -A 20 "Exception" app.log`}
            />
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">常见问题 FAQ</h2>

        <div className="space-y-4">
          <FaqCard
            number={1}
            question="服务启动后无法被调用？"
            answer={"排查步骤：\n\n1. 检查服务注册状态\n   ```bash\n   # Nacos 控制台查看\n   # 服务列表 -> order-service\n   # 查看实例数量和健康状态\n   ```\n\n2. 验证服务名配置\n   ```yaml\n   spring:\n     application:\n       name: order-service  # 确保名称一致\n   ```\n\n3. 检查负载均衡器\n   ```java\n   @LoadBalanced  // 确保添加该注解\n   @Bean\n   public RestTemplate restTemplate() {\n       return new RestTemplate();\n   }\n   ```\n\n4. 测试直接调用\n   ```bash\n   curl http://order-service:8080/actuator/health\n   ```\n\n【解决方案】\n- 确保服务名一致\n- 添加 @LoadBalanced 注解\n- 检查 Nacos 命名空间配置"}
            isOpen={openFaq === 1}
            onClick={() => toggleFaq(1)}
          />
          <FaqCard
            number={2}
            question="配置更新后不生效？"
            answer={"配置热更新排查：\n\n1. 检查 @RefreshScope\n   ```java\n   @RefreshScope  // 必须添加\n   @RestController\n   public class ConfigController {\n       @Value(\"$\{app.config}\")\n       private String config;\n   }\n   ```\n\n2. 验证 Nacos 配置\n   - 检查 DataId 是否正确\n   - 确认配置已发布\n   - 查看配置历史版本\n\n3. 查看刷新日志\n   ```bash\n   grep \"Refresh\" /var/log/app.log\n   ```\n\n4. 手动触发刷新\n   ```bash\n   curl -X POST http://order-service/actuator/refresh\n   ```\n\n【注意事项】\n- @Value 配置支持动态更新\n- @ConfigurationProperties 需要配合 @RefreshScope\n- 某些配置需要重启才能生效"}
            isOpen={openFaq === 2}
            onClick={() => toggleFaq(2)}
          />
          <FaqCard
            number={3}
            question="服务间调用报 500 错误？"
            answer={"500 错误排查：\n\n1. 查看下游服务日志\n   ```bash\n   # Kibana 查询\n   app: \"order-service\" AND status: 500\n   ```\n\n2. 分析错误堆栈\n   ```java\n   // 常见原因\n   - NullPointerException\n   - SQLException\n   - TimeoutException\n   ```\n\n3. 检查参数传递\n   ```bash\n   # 查看请求日志\n   logger.info(\"Request: {}\", request);\n   ```\n\n4. 查看链路追踪\n   ```bash\n   # SkyWalking / Zipkin\n   # 查看调用链路和耗时\n   ```\n\n【解决方案】\n- 添加参数校验 @Valid\n- 实现全局异常处理\n- 添加详细日志\n- 使用链路追踪定位问题"}
            isOpen={openFaq === 3}
            onClick={() => toggleFaq(3)}
          />
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">排查流程总结</h2>

        <div className="bg-gradient-to-r from-red-50 to-yellow-50 border-2 border-red-200 rounded-lg p-6">
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">1</div>
              <div>
                <h4 className="font-bold text-gray-900">确认故障范围</h4>
                <p className="text-sm text-gray-700">单个服务 vs 整个系统 | 核心功能 vs 边缘功能</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">2</div>
              <div>
                <h4 className="font-bold text-gray-900">收集关键信息</h4>
                <p className="text-sm text-gray-700">日志、监控指标、错误码、TraceId、时间范围</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">3</div>
              <div>
                <h4 className="font-bold text-gray-900">定位故障点</h4>
                <p className="text-sm text-gray-700">链路追踪、依赖分析、资源监控</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">4</div>
              <div>
                <h4 className="font-bold text-gray-900">制定解决方案</h4>
                <p className="text-sm text-gray-700">临时恢复 + 根本修复</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">5</div>
              <div>
                <h4 className="font-bold text-gray-900">验证与复盘</h4>
                <p className="text-sm text-gray-700">功能验证 + 性能验证 + 复盘总结</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">下一步学习</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <a href="/monitoring" className="block bg-gradient-to-br from-purple-50 to-purple-100 border-2 border-purple-200 rounded-lg p-6 hover:shadow-lg transition">
            <h3 className="text-xl font-bold text-purple-900 mb-2">📊 监控告警</h3>
            <p className="text-gray-700 text-sm">Prometheus + Grafana 全链路监控</p>
          </a>
          <a href="/logging" className="block bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-200 rounded-lg p-6 hover:shadow-lg transition">
            <h3 className="text-xl font-bold text-green-900 mb-2">📝 日志聚合</h3>
            <p className="text-gray-700 text-sm">ELK Stack 日志收集与分析</p>
          </a>
        </div>
      </section>
    </div>
  );
};
