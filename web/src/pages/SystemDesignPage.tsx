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

export const SystemDesignPage: React.FC = () => {
  const [openSection, setOpenSection] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-700 to-indigo-900 text-white rounded-lg p-6 mb-8">
        <h1 className="text-4xl font-bold mb-2">微服务系统设计</h1>
        <p className="text-indigo-100">分布式系统架构设计完整指南</p>
        <div className="flex gap-3 text-sm mt-4">
          <span className="px-3 py-1 bg-white/20 rounded-full">📚 面试准备</span>
          <span className="px-3 py-1 bg-white/20 rounded-full">⏱️ 约60分钟</span>
          <span className="px-3 py-1 bg-white/20 rounded-full">📋 8大核心模块</span>
        </div>
      </div>

      {/* Fundamentals */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">系统设计基础</h2>
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div className="bg-white border-l-4 border-blue-500 rounded-lg p-5 shadow-md">
            <h3 className="text-lg font-bold text-gray-900 mb-3">📐 设计目标</h3>
            <ul className="text-sm text-gray-700 space-y-2">
              <li>• <strong>可扩展性</strong>：支持业务增长</li>
              <li>• <strong>高可用性</strong>：保证服务连续性</li>
              <li>• <strong>高性能</strong>：低延迟、高吞吐</li>
              <li>• <strong>安全性</strong>：保护数据和资源</li>
              <li>• <strong>可维护性</strong>：便于开发和运维</li>
            </ul>
          </div>
          <div className="bg-white border-l-4 border-green-500 rounded-lg p-5 shadow-md">
            <h3 className="text-lg font-bold text-gray-900 mb-3">🔄 设计原则</h3>
            <ul className="text-sm text-gray-700 space-y-2">
              <li>• <strong>服务拆分</strong>：按业务领域划分</li>
              <li>• <strong>无状态设计</strong>：便于水平扩展</li>
              <li>• <strong>异步通信</strong>：提高系统响应</li>
              <li>• <strong>数据分区</strong>：分散数据压力</li>
              <li>• <strong>故障隔离</strong>：防止级联失败</li>
            </ul>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">系统设计流程</h3>
          <div className="grid md:grid-cols-4 gap-4">
            {[
              { step: '1', title: '需求分析', desc: '明确功能需求和非功能需求' },
              { step: '2', title: '容量估算', desc: '计算 QPS、存储、带宽' },
              { step: '3', title: '架构设计', desc: '选择合适的技术架构' },
              { step: '4', title: '瓶颈优化', desc: '识别并解决性能瓶颈' },
            ].map((item) => (
              <div key={item.step} className="bg-indigo-50 p-4 rounded-lg text-center">
                <div className="text-3xl font-bold text-indigo-700 mb-2">{item.step}</div>
                <h4 className="font-bold text-indigo-900 mb-1">{item.title}</h4>
                <p className="text-indigo-700 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CAP Theorem */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">CAP 定理</h2>
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <p className="text-gray-700 mb-6">
            CAP 定理指出，分布式系统不能同时满足以下三个属性，最多只能同时满足两个：
          </p>
          <div className="grid md:grid-cols-3 gap-6 mb-6">
            <div className="bg-blue-50 p-5 rounded-lg">
              <h3 className="text-xl font-bold text-blue-900 mb-3">C - Consistency</h3>
              <p className="text-blue-700 text-sm mb-2">一致性</p>
              <p className="text-blue-600 text-sm">
                所有节点在同一时间看到相同的数据
              </p>
            </div>
            <div className="bg-green-50 p-5 rounded-lg">
              <h3 className="text-xl font-bold text-green-900 mb-3">A - Availability</h3>
              <p className="text-green-700 text-sm mb-2">可用性</p>
              <p className="text-green-600 text-sm">
                每个请求都能得到响应（成功或失败）
              </p>
            </div>
            <div className="bg-purple-50 p-5 rounded-lg">
              <h3 className="text-xl font-bold text-purple-900 mb-3">P - Partition Tolerance</h3>
              <p className="text-purple-700 text-sm mb-2">分区容错性</p>
              <p className="text-purple-600 text-sm">
                系统在网络分区时仍能继续运行
              </p>
            </div>
          </div>

          <h4 className="font-bold text-gray-900 mb-3">权衡组合</h4>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-red-50 p-4 rounded-lg border-2 border-red-200">
              <h5 className="font-bold text-red-900 mb-2">CP - 一致性 + 分区容错</h5>
              <ul className="text-red-800 text-sm space-y-1">
                <li>• 放弃可用性</li>
                <li>• Redis Cluster、MongoDB</li>
                <li>• 适合：金融系统、库存系统</li>
              </ul>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg border-2 border-yellow-200">
              <h5 className="font-bold text-yellow-900 mb-2">AP - 可用性 + 分区容错</h5>
              <ul className="text-yellow-800 text-sm space-y-1">
                <li>• 放弃强一致性</li>
                <li>• Cassandra、DynamoDB</li>
                <li>• 适合：社交网络、内容分发</li>
              </ul>
            </div>
            <div className="bg-green-50 p-4 rounded-lg border-2 border-green-200">
              <h5 className="font-bold text-green-900 mb-2">CA - 一致性 + 可用性</h5>
              <ul className="text-green-800 text-sm space-y-1">
                <li>• 理论上存在（单机系统）</li>
                <li>• 分布式系统无法实现</li>
                <li>• 网络分区必然发生</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Scalability */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">可扩展性设计</h2>
        <div className="space-y-4">
          <div className="mb-4">
            <button
              onClick={() => setOpenSection(openSection === 'vertical-scale' ? null : 'vertical-scale')}
              className="w-full bg-white border-2 border-blue-300 rounded-lg p-4 flex items-center justify-between hover:bg-blue-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">⬆️</span>
                <div className="text-left">
                  <h3 className="text-lg font-bold text-gray-900">垂直扩展（Scale Up）</h3>
                  <p className="text-sm text-gray-600">升级硬件配置</p>
                </div>
              </div>
              <span className="text-gray-400">&rbrace;</span>
            </button>
            {openSection === 'vertical-scale' && (
              <div className="mt-4 bg-white border border-gray-200 rounded-lg p-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-bold text-gray-900 mb-2">优点</h4>
                    <ul className="text-gray-700 text-sm space-y-1">
                      <li>• 实现简单，无需修改代码</li>
                      <li>• 无分布式事务问题</li>
                      <li>• 数据一致性容易保证</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-2">缺点</h4>
                    <ul className="text-gray-700 text-sm space-y-1">
                      <li>• 成本高昂（高端服务器）</li>
                      <li>• 有物理上限（单机性能）</li>
                      <li>• 单点故障风险</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="mb-4">
            <button
              onClick={() => setOpenSection(openSection === 'horizontal-scale' ? null : 'horizontal-scale')}
              className="w-full bg-white border-2 border-green-300 rounded-lg p-4 flex items-center justify-between hover:bg-green-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">↔️</span>
                <div className="text-left">
                  <h3 className="text-lg font-bold text-gray-900">水平扩展（Scale Out）</h3>
                  <p className="text-sm text-gray-600">增加服务器数量</p>
                </div>
              </div>
              <span className="text-gray-400">&rbrace;</span>
            </button>
            {openSection === 'horizontal-scale' && (
              <div className="mt-4 bg-white border border-gray-200 rounded-lg p-6">
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <h4 className="font-bold text-gray-900 mb-2">优点</h4>
                    <ul className="text-gray-700 text-sm space-y-1">
                      <li>• 成本相对较低（普通服务器）</li>
                      <li>• 理论上无限扩展</li>
                      <li>• 高可用性（无单点）</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-2">缺点</h4>
                    <ul className="text-gray-700 text-sm space-y-1">
                      <li>• 架构复杂度高</li>
                      <li>• 数据一致性难保证</li>
                      <li>• 运维成本增加</li>
                    </ul>
                  </div>
                </div>

                <h4 className="font-bold text-gray-900 mb-2">技术实现</h4>
                <CodeBlock
                  language="java"
                  code={`// 负载均衡配置
@Configuration
public class LoadBalancerConfig {

    @Bean
    @LoadBalanced
    public RestTemplate restTemplate() {
        return new RestTemplate();
    }

    @Bean
    public ReactorLoadBalancer<ServiceInstance> reactiveLoadBalancer(
            Environment environment,
            LoadBalancerClientFactory loadBalancerClientFactory) {
        String name = environment.getProperty(LoadBalancerClientFactory.PROPERTY_NAME);
        return new RoundRobinLoadBalancer(
            loadBalancerClientFactory.getLazyProvider(name, ServiceInstanceListSupplier.class),
            name
        );
    }
}`}
                />
              </div>
            )}
          </div>

          <div className="mb-4">
            <button
              onClick={() => setOpenSection(openSection === 'data-partition' ? null : 'data-partition')}
              className="w-full bg-white border-2 border-purple-300 rounded-lg p-4 flex items-center justify-between hover:bg-purple-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">🗂️</span>
                <div className="text-left">
                  <h3 className="text-lg font-bold text-gray-900">数据分区（Sharding）</h3>
                  <p className="text-sm text-gray-600">分散数据压力</p>
                </div>
              </div>
              <span className="text-gray-400">&rbrace;</span>
            </button>
            {openSection === 'data-partition' && (
              <div className="mt-4 bg-white border border-gray-200 rounded-lg p-6">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-bold text-gray-900 mb-2">分片策略</h4>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="bg-blue-50 p-3 rounded">
                        <h5 className="font-bold text-blue-900 mb-1">水平分片</h5>
                        <p className="text-blue-700 text-sm">按行拆分（如：按用户 ID 取模）</p>
                      </div>
                      <div className="bg-green-50 p-3 rounded">
                        <h5 className="font-bold text-green-900 mb-1">垂直分片</h5>
                        <p className="text-green-700 text-sm">按列拆分（如：订单表、用户表）</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-bold text-gray-900 mb-2">ShardingSphere 配置示例</h4>
                    <CodeBlock
                      language="yaml"
                      code={`# sharding配置
spring:
  shardingsphere:
    datasource:
      names: ds0,ds1
      ds0:
        type: com.zaxxer.hikari.HikariDataSource
        jdbc-url: jdbc:mysql://localhost:3306/db0
      ds1:
        type: com.zaxxer.hikari.HikariDataSource
        jdbc-url: jdbc:mysql://localhost:3306/db1
    rules:
      sharding:
        tables:
          t_order:
            actual-data-nodes: ds\$->{0..1}.t_order\$->{0..1}
            database-strategy:
              standard:
                sharding-column: user_id
                sharding-algorithm-name: db_mod
            table-strategy:
              standard:
                sharding-column: order_id
                sharding-algorithm-name: table_mod
        sharding-algorithms:
          db_mod:
            type: MOD
            props:
              sharding-count: 2
          table_mod:
            type: MOD
            props:
              sharding-count: 2`}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* High Availability */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">高可用设计</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white border-l-4 border-red-500 rounded-lg p-5 shadow-md">
            <h3 className="text-lg font-bold text-gray-900 mb-3">🔁 冗余设计</h3>
            <ul className="text-sm text-gray-700 space-y-2">
              <li>• <strong>服务冗余</strong>：多实例部署</li>
              <li>• <strong>数据冗余</strong>：主从复制、多副本</li>
              <li>• <strong>机房冗余</strong>：多机房部署</li>
              <li>• <strong>区域冗余</strong>：跨地域容灾</li>
            </ul>
          </div>
          <div className="bg-white border-l-4 border-orange-500 rounded-lg p-5 shadow-md">
            <h3 className="text-lg font-bold text-gray-900 mb-3">⚡ 故障转移</h3>
            <ul className="text-sm text-gray-700 space-y-2">
              <li>• <strong>健康检查</strong>：定期检测服务状态</li>
              <li>• <strong>自动切换</strong>：故障实例自动摘除</li>
              <li>• <strong>熔断降级</strong>：防止雪崩效应</li>
              <li>• <strong>限流保护</strong>：防止系统过载</li>
            </ul>
          </div>
          <div className="bg-white border-l-4 border-green-500 rounded-lg p-5 shadow-md">
            <h3 className="text-lg font-bold text-gray-900 mb-3">💾 数据备份</h3>
            <ul className="text-sm text-gray-700 space-y-2">
              <li>• <strong>主从复制</strong>：读写分离</li>
              <li>• <strong>定时备份</strong>：冷备份、热备份</li>
              <li>• <strong>异地容灾</strong>：异地多活</li>
              <li>• <strong>快照恢复</strong>：快速恢复服务</li>
            </ul>
          </div>
          <div className="bg-white border-l-4 border-blue-500 rounded-lg p-5 shadow-md">
            <h3 className="text-lg font-bold text-gray-900 mb-3">📊 监控告警</h3>
            <ul className="text-sm text-gray-700 space-y-2">
              <li>• <strong>指标监控</strong>：CPU、内存、QPS</li>
              <li>• <strong>日志聚合</strong>：ELK、Loki</li>
              <li>• <strong>链路追踪</strong>：SkyWalking、Zipkin</li>
              <li>• <strong>告警通知</strong>：钉钉、邮件、短信</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Performance Optimization */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">性能优化</h2>
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">多级缓存架构</h3>
          <div className="space-y-3 mb-6">
            {[
              { level: 'L1', name: '本地缓存', tech: 'Caffeine、Guava Cache', ttl: '秒级', desc: 'JVM 内存，最快' },
              { level: 'L2', name: '分布式缓存', tech: 'Redis、Memcached', ttl: '分钟级', desc: '跨服务共享' },
              { level: 'L3', name: 'CDN 缓存', tech: '阿里云 CDN、Cloudflare', ttl: '小时级', desc: '静态资源' },
              { level: 'L4', name: '数据库缓存', tech: 'MySQL Buffer Pool', ttl: '自动管理', desc: '数据页缓存' },
            ].map((cache) => (
              <div key={cache.level} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                <div className="bg-indigo-600 text-white font-bold px-3 py-1 rounded">
                  {cache.level}
                </div>
                <div className="flex-1">
                  <div className="font-bold text-gray-900">{cache.name} - {cache.tech}</div>
                  <div className="text-sm text-gray-600">TTL: {cache.ttl} | {cache.desc}</div>
                </div>
              </div>
            ))}
          </div>

          <h4 className="font-bold text-gray-900 mb-2">缓存实现示例</h4>
          <CodeBlock
            language="java"
            code={`@Service
@RequiredArgsConstructor
public class ProductServiceImpl {

    private final ProductMapper productMapper;
    private final RedisTemplate<String, Object> redisTemplate;

    // L1: 本地缓存
    private final Cache<Long, Product> localCache =
        Caffeine.newBuilder()
            .maximumSize(10_000)
            .expireAfterWrite(5, TimeUnit.MINUTES)
            .build();

    @Cacheable(value = "product", key = "#id")
    public Product getById(Long id) {
        // L1: 本地缓存
        Product product = localCache.getIfPresent(id);
        if (product != null) {
            return product;
        }

        // L2: Redis 缓存
        String key = "product:" + id;
        product = (Product) redisTemplate.opsForValue().get(key);
        if (product != null) {
            localCache.put(id, product);
            return product;
        }

        // L3: 数据库
        product = productMapper.selectById(id);
        if (product != null) {
            redisTemplate.opsForValue().set(key, product, 30, TimeUnit.MINUTES);
            localCache.put(id, product);
        }

        return product;
    }
}`}
          />
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white border-l-4 border-teal-500 rounded-lg p-5 shadow-md">
            <h3 className="text-lg font-bold text-gray-900 mb-3">🚀 异步处理</h3>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• 线程池异步执行</li>
              <li>• 消息队列解耦</li>
              <li>• 事件驱动架构</li>
              <li>• CompletableFuture</li>
            </ul>
          </div>
          <div className="bg-white border-l-4 border-cyan-500 rounded-lg p-5 shadow-md">
            <h3 className="text-lg font-bold text-gray-900 mb-3">📦 批量处理</h3>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• 批量查询</li>
              <li>• 批量插入</li>
              <li>• Pipeline 操作</li>
              <li>• 合并请求</li>
            </ul>
          </div>
          <div className="bg-white border-l-4 border-lime-500 rounded-lg p-5 shadow-md">
            <h3 className="text-lg font-bold text-gray-900 mb-3">🗜️ 数据压缩</h3>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• Gzip 压缩</li>
              <li>• Protocol Buffers</li>
              <li>• Snappy 压缩</li>
              <li>• 图片优化（WebP）</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Security Design */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">安全设计</h2>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">认证与授权</h3>
              <CodeBlock
                language="java"
                code={`// Spring Security 配置
@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        return http
            .csrf().disable()
            .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            .and()
            .authorizeHttpRequests()
                .requestMatchers("/api/auth/**").permitAll()
                .anyRequest().authenticated()
            .and()
            .addFilterBefore(jwtAuthenticationFilter,
                UsernamePasswordAuthenticationFilter.class)
            .build();
    }
}`}
              />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">数据加密</h3>
              <CodeBlock
                language="java"
                code={`// 敏感数据加密
@Component
public class DataEncryptor {

    private final AESUtil aesUtil;

    // 数据库字段加密
    public void encryptSensitiveData(User user) {
        user.setPhone(aesUtil.encrypt(user.getPhone()));
        user.setIdCard(aesUtil.encrypt(user.getIdCard()));
    }

    // 接口响应脱敏
    public User maskSensitiveInfo(User user) {
        user.setPhone(maskPhone(user.getPhone()));
        user.setIdCard(maskIdCard(user.getIdCard()));
        return user;
    }

    private String maskPhone(String phone) {
        return phone.replaceAll("(\\d{3})\\d{4}(\\d{4})", "$1****$2");
    }
}`}
              />
            </div>
          </div>

          <div className="mt-6 grid md:grid-cols-3 gap-4">
            <div className="bg-red-50 p-4 rounded-lg">
              <h4 className="font-bold text-red-900 mb-2">🔐 API 安全</h4>
              <ul className="text-red-800 text-sm space-y-1">
                <li>• HTTPS 加密传输</li>
                <li>• API 签名验证</li>
                <li>• 限流防刷</li>
                <li>• 参数校验</li>
              </ul>
            </div>
            <div className="bg-orange-50 p-4 rounded-lg">
              <h4 className="font-bold text-orange-900 mb-2">🛡️ 防护措施</h4>
              <ul className="text-orange-800 text-sm space-y-1">
                <li>• SQL 注入防护</li>
                <li>• XSS 攻击防护</li>
                <li>• CSRF 令牌</li>
                <li>• 敏感词过滤</li>
              </ul>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg">
              <h4 className="font-bold text-yellow-900 mb-2">📝 审计日志</h4>
              <ul className="text-yellow-800 text-sm space-y-1">
                <li>• 操作日志记录</li>
                <li>• 访问日志审计</li>
                <li>• 异常行为告警</li>
                <li>• 数据变更追踪</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Real-world Example */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">实战案例：秒杀系统设计</h2>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">系统架构</h3>
          <div className="bg-gray-900 text-white p-4 rounded-lg mb-6 font-mono text-sm">
            <pre>
{`┌─────────────┐
│   用户端    │
└──────┬──────┘
       │
┌──────▼──────────────────────┐
│   CDN 缓存（静态资源）       │
└──────┬──────────────────────┘
       │
┌──────▼──────────────────────┐
│   API 网关（限流、鉴权）     │
└──────┬──────────────────────┘
       │
┌──────▼──────────────────────┐
│   秒杀服务                   │
│   - 本地缓存（库存）         │
│   - Redis 预扣库存           │
│   - RocketMQ 削峰填谷        │
└──────┬──────────────────────┘
       │
┌──────▼──────────────────────┐
│   订单服务                   │
│   - 创建订单                 │
│   - 扣减库存（DB）           │
└──────┬──────────────────────┘
       │
┌──────▼──────────────────────┐
│   数据库（主从分离）         │
└─────────────────────────────┘`}
            </pre>
          </div>

          <h4 className="font-bold text-gray-900 mb-3">关键技术</h4>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h5 className="font-bold text-blue-900 mb-2">🚀 高并发处理</h5>
              <ul className="text-blue-800 text-sm space-y-1">
                <li>• Redis 预扣库存（原子操作）</li>
                <li>• MQ 异步下单（削峰）</li>
                <li>• 限流（令牌桶、漏桶）</li>
                <li>• 本地缓存（减少 Redis 压力）</li>
              </ul>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <h5 className="font-bold text-green-900 mb-2">🔒 防超卖机制</h5>
              <ul className="text-green-800 text-sm space-y-1">
                <li>• Redis Lua 脚本（原子性）</li>
                <li>• 数据库乐观锁（版本号）</li>
                <li>• 分布式锁（Redisson）</li>
                <li>• 库存回滚机制</li>
              </ul>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <h5 className="font-bold text-purple-900 mb-2">⚡ 性能优化</h5>
              <ul className="text-purple-800 text-sm space-y-1">
                <li>• 静态资源 CDN 加速</li>
                <li>• 页面静态化（按钮置灰）</li>
                <li>• 连接池优化</li>
                <li>• SQL 索引优化</li>
              </ul>
            </div>
            <div className="bg-orange-50 p-4 rounded-lg">
              <h5 className="font-bold text-orange-900 mb-2">🛡️ 容错机制</h5>
              <ul className="text-orange-800 text-sm space-y-1">
                <li>• 熔断降级（Sentinel）</li>
                <li>• 服务隔离（线程池隔离）</li>
                <li>• 限流保护（QPS 限制）</li>
                <li>• 实时监控告警</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">常见问题</h2>
        <div className="space-y-4">
          {[
            {
              q: "如何选择一致性还是可用性？",
              a: "根据业务场景选择：金融系统（如支付、库存）选择 CP（一致性优先），社交网络（如点赞、评论）选择 AP（可用性优先）。微服务架构中，通常通过 BASE 理论实现最终一致性。"
            },
            {
              q: "什么时候需要分库分表？",
              a: "1) 单表数据量超过 1000 万；2) 单库 QPS 超过 2000；3) 数据库连接数不足；4) 查询性能明显下降。分库分表会带来复杂度，应该先考虑索引优化、读写分离、缓存等方案。"
            },
            {
              q: "如何保证高可用？",
              a: "多层保障：1) 服务层多实例部署 + 负载均衡；2) 数据层主从复制 + 自动故障转移；3) 异地多活机房部署；4) 熔断降级保护；5) 完善的监控告警体系。"
            },
            {
              q: "系统设计中如何权衡？",
              a: "没有银弹，需要根据业务场景权衡：1) 明确业务需求（功能需求 + 非功能需求）；2) 计算容量指标（QPS、存储量、用户量）；3) 识别性能瓶颈；4) 选择合适的技术栈；5) 分阶段演进，不要过度设计。"
            }
          ].map((faq, idx) => (
            <div key={idx} className="bg-white rounded-lg shadow">
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full text-left p-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <span className="font-medium text-gray-900">{faq.q}</span>
                <span className="text-gray-400">
                  {openFaq === idx ? '−' : '+'}
                </span>
              </button>
              {openFaq === idx && (
                <div className="px-4 pb-4 text-gray-700">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Next Steps */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">下一步学习</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <a href="/interview-prep" className="block bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 rounded-lg p-6 transition-colors">
            <h3 className="text-xl font-bold text-indigo-900 mb-2">面试准备</h3>
            <p className="text-indigo-700">技术面试完整攻略</p>
          </a>
          <a href="/design-questions" className="block bg-purple-50 hover:bg-purple-100 border border-purple-200 rounded-lg p-6 transition-colors">
            <h3 className="text-xl font-bold text-purple-900 mb-2">设计题</h3>
            <p className="text-purple-700">高频系统设计题解析</p>
          </a>
          <a href="/interview-questions" className="block bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg p-6 transition-colors">
            <h3 className="text-xl font-bold text-blue-900 mb-2">面试题库</h3>
            <p className="text-blue-700">历年真题精选</p>
          </a>
        </div>
      </section>
    </div>
  );
};
