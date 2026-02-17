import { useState } from 'react';
import { CodeBlock } from '../components';

export const RedisPage: React.FC = () => {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  return (
    <div className="prose prose prose-slate max-w-none">
      {/* 页面头部 */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg p-6 mb-8">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-4xl font-bold mb-2">Redis 分布式缓存</h1>
            <p className="text-blue-50 text-lg">高性能内存数据库，秒级响应</p>
          </div>
          <div className="flex gap-3 text-sm">
            <span className="px-3 py-1 bg-white/20 rounded-full">🔧 进阶</span>
            <span className="px-3 py-1 bg-white/20 rounded-full">⏱️ 约45分钟</span>
            <span className="px-3 py-1 bg-white/20 rounded-full">📚 11个知识点</span>
          </div>
        </div>
      </div>

      {/* 什么是 Redis */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">什么是 Redis?</h2>
        <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-lg mb-6">
          <p className="text-lg text-gray-800 leading-relaxed mb-4">
            <strong>Redis</strong> (Remote Dictionary Server) 是一款开源的内存数据库，
            也可用作缓存、消息代理和队列引擎。
          </p>
          <p className="text-gray-700 mb-4">
            Redis 支持多种数据结构（String、Hash、List、Set、Sorted Set 等），
            具有<strong>高性能、高可用、数据持久化</strong>等特点，
            是微服务架构中不可或缺的缓存组件。
          </p>
          <div className="bg-white p-4 rounded border border-blue-200 mt-4">
            <h4 className="font-bold text-gray-900 mb-2">💡 核心特性</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">✓</span>
                <span><strong>极高的性能</strong> - 读写速度可达 10万次/秒</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">✓</span>
                <span><strong>丰富的数据类型</strong> - String、Hash、List、Set、ZSet 等</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">✓</span>
                <span><strong>数据持久化</strong> - RDB 和 AOF 两种方式</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">✓</span>
                <span><strong>高可用</strong> - 主从复制、哨兵、集群模式</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">✓</span>
                <span><strong>原子操作</strong> - 所有操作都是原子的</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <FeatureCard icon="⚡" title="高速缓存" desc="内存操作" color="blue" />
          <FeatureCard icon="💾" title="数据持久化" desc="磁盘保存" color="indigo" />
          <FeatureCard icon="🔒" title="分布式锁" desc="互斥访问" color="purple" />
          <FeatureCard icon="📊" title="多种数据结构" desc="灵活应用" color="green" />
        </div>
      </section>

      {/* 为什么需要缓存 */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">为什么需要缓存?</h2>

        <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-lg mb-6">
          <h4 className="font-bold text-gray-900 mb-3">💡 缓存的核心价值</h4>
          <p className="text-gray-700 text-sm">
            数据库（MySQL）的 I/O 操作相对较慢，通常在几十到几百毫秒。
            而内存操作（Redis）通常在 1 毫秒以内。
            通过将热点数据放入缓存，可以<strong>大幅提升系统性能</strong>。
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-green-50 border-2 border-green-200 rounded-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-3">⚡ 提升性能</h3>
            <div className="space-y-3 text-sm">
              <p className="text-gray-700 mb-2">
                <strong>性能对比：</strong>
              </p>
              <ul className="space-y-1 text-xs text-gray-600">
                <li>• MySQL: 50-200ms</li>
                <li>• Redis: 0.1-1ms</li>
                <li>• 提升 100-1000 倍</li>
              </ul>
              <p className="text-gray-700 mt-3">
                <strong>典型场景：</strong>
              </p>
              <ul className="space-y-1 text-xs text-gray-600">
                <li>• 商品详情查询</li>
                <li>• 用户信息读取</li>
                <li>• 配置信息缓存</li>
              </ul>
            </div>
          </div>

          <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-3">📉 减轻数据库压力</h3>
            <div className="space-y-3 text-sm">
              <p className="text-gray-700 mb-2">
                大部分请求直接命中缓存，不需要访问数据库
              </p>
              <div className="bg-white p-3 rounded border border-blue-200">
                <p className="text-xs text-gray-600">
                  <strong>示例：</strong>1万次请求
                </p>
                <p className="text-xs text-gray-600 mt-1">
                  • 无缓存: 1万次数据库查询
                </p>
                <p className="text-xs text-gray-600 mt-1">
                  • 有缓存(90%命中率): 1000次查询
                </p>
              </div>
              <p className="text-gray-700 text-xs mt-2">
                <strong>效果：</strong>数据库压力降低 90%
              </p>
            </div>
          </div>

          <div className="bg-purple-50 border-2 border-purple-200 rounded-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-3">💰 降低成本</h3>
            <div className="space-y-3 text-sm">
              <p className="text-gray-700 mb-2">
                通过缓存减少数据库服务器数量
              </p>
              <div className="bg-white p-3 rounded border border-purple-200">
                <p className="text-xs text-gray-600 mb-2">
                  <strong>成本对比：</strong>
                </p>
                <p className="text-xs text-gray-600">
                  • 数据库服务器: 数万元/台
                </p>
                <p className="text-xs text-gray-600">
                  • Redis 服务器: 数千元/台
                </p>
              </div>
              <p className="text-gray-700 text-xs mt-2">
                <strong>效果：</strong>显著降低硬件成本
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 核心概念 */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Redis 核心概念</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ConceptCard3
            title="String (字符串)"
            level="beginner"
            desc="最基本的数据类型，可以存储任何类型的数据"
            example="SET user:1001 '张三'"
          />
          <ConceptCard3
            title="Hash (哈希)"
            level="beginner"
            desc="键值对集合，适合存储对象"
            example="HSET user:1001 name '张三' age 25"
          />
          <ConceptCard3
            title="List (列表)"
            level="beginner"
            desc="有序集合，可以重复"
            example="LPUSH messages '消息1' '消息2'"
          />
          <ConceptCard3
            title="Set (集合)"
            level="beginner"
            desc="无序集合，不能重复"
            example="SADD tags 'java' 'spring' 'redis'"
          />
          <ConceptCard3
            title="Sorted Set (有序集合)"
            level="intermediate"
            desc="有序集合，通过分数排序"
            example="ZADD rank 100 '用户A' 90 '用户B'"
          />
          <ConceptCard3
            title="持久化"
            level="intermediate"
            desc="RDB 快照和 AOF 日志两种方式"
            example="SAVE 生成 RDB 快照"
          />
        </div>
      </section>

      {/* 快速开始 */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">快速开始</h2>
        <p className="text-gray-700 mb-6">通过一个完整的示例，学习如何使用 Redis 进行数据缓存。</p>

        <h3>步骤 1: 安装 Redis</h3>
        <CodeBlock
          language="bash"
          code={`# Docker 方式安装（推荐）
docker run -d -p 6379:6379 --name redis redis:7

# 或使用 Homebrew 安装（macOS）
brew install redis
brew services start redis

# 或下载安装包（Linux）
wget http://download.redis.io/releases/redis-7.0.0.tar.gz
tar xzf redis-7.0.0.tar.gz
cd redis-7.0.0
make
src/redis-server`}
        />

        <h3>步骤 2: 添加依赖</h3>
        <CodeBlock
          language="xml"
          code={`<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-redis</artifactId>
</dependency>

<!-- 如果使用连接池（推荐） -->
<dependency>
    <groupId>org.apache.commons</groupId>
    <artifactId>commons-pool2</artifactId>
</dependency>`}
        />

        <h3>步骤 3: 配置 Redis</h3>
        <CodeBlock
          language="yaml"
          code={`# application.yml
spring:
  redis:
    host: localhost
    port: 6379
    password:  # 如果设置了密码
    database: 0  # 使用的数据库编号（0-15）
    lettuce:
      pool:
        max-active: 8  # 最大连接数
        max-idle: 8   # 最大空闲连接数
        min-idle: 0   # 最小空闲连接数
        max-wait: -1ms  # 获取连接的最大等待时间`}
        />

        <h3>步骤 4: 使用 RedisTemplate 操作</h3>
        <CodeBlock
          language="java"
          code={`@Service
public class UserService {

    @Autowired
    private RedisTemplate<String, Object> redisTemplate;

    private static final String USER_KEY_PREFIX = "user:";

    // 缓存用户信息
    public void cacheUser(User user) {
        String key = USER_KEY_PREFIX + user.getId();
        redisTemplate.opsForValue().set(key, user, 30, TimeUnit.MINUTES);
        log.info("用户信息已缓存，key: {}", key);
    }

    // 获取缓存的用户信息
    public User getUserFromCache(Long userId) {
        String key = USER_KEY_PREFIX + userId;
        User user = (User) redisTemplate.opsForValue().get(key);
        if (user != null) {
            log.info("从缓存获取用户，key: {}", key);
        }
        return user;
    }

    // 删除缓存
    public void deleteUserCache(Long userId) {
        String key = USER_KEY_PREFIX + userId;
        redisTemplate.delete(key);
        log.info("删除用户缓存，key: {}", key);
    }
}`}
        />

        <h3>步骤 5: 缓存注解使用</h3>
        <CodeBlock
          language="java"
          code={`// 启用缓存注解
@Configuration
@EnableCaching
public class CacheConfig {

    @Bean
    public RedisCacheManager redisCacheManager(RedisConnectionFactory factory) {
        RedisCacheConfiguration config = RedisCacheConfiguration.defaultCacheConfig()
            .entryTtl(Duration.ofMinutes(30))  // 默认过期时间30分钟
            .serializeKeysWith(RedisSerializationContext.SerializationPair
                .fromSerializer(new StringRedisSerializer()))
            .serializeValuesWith(RedisSerializationContext.SerializationPair
                .fromSerializer(new GenericJackson2JsonRedisSerializer()));

        return RedisCacheManager.builder(factory)
            .cacheDefaults(config)
            .build();
    }
}

// 使用缓存注解
@Service
public class ProductService {

    @Autowired
    private ProductMapper productMapper;

    // 查询时使用缓存
    @Cacheable(value = "product", key = "#id")
    public Product getProductById(Long id) {
        log.info("从数据库查询商品，id: {}", id);
        return productMapper.selectById(id);
    }

    // 更新时删除缓存
    @CacheEvict(value = "product", key = "#product.id")
    public void updateProduct(Product product) {
        productMapper.updateById(product);
        log.info("商品已更新，缓存已删除");
    }

    // 删除时清除缓存
    @CacheEvict(value = "product", key = "#id")
    public void deleteProduct(Long id) {
        productMapper.deleteById(id);
        log.info("商品已删除，缓存已清除");
    }
}`}
        />
      </section>

      {/* 缓存问题解决方案 */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">缓存三大问题及解决方案</h2>

        <div className="space-y-6">
          {/* 缓存穿透 */}
          <div className="bg-red-50 border-2 border-red-200 rounded-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-3">💥 缓存穿透</h3>
            <p className="text-sm text-gray-700 mb-3">
              <strong>问题：</strong>查询一个不存在的数据，缓存中没有，数据库中也没有，
              导致每次请求都直接访问数据库。
            </p>
            <CodeBlock
              language="java"
              code={`// 解决方案1：缓存空对象
public Product getProductById(Long id) {
    String key = "product:" + id;
    Product product = (Product) redisTemplate.opsForValue().get(key);

    if (product == null) {
        // 查询数据库
        product = productMapper.selectById(id);

        if (product == null) {
            // 缓存空对象，过期时间设置短一些（如5分钟）
            redisTemplate.opsForValue().set(key, "", 5, TimeUnit.MINUTES);
        } else {
            redisTemplate.opsForValue().set(key, product, 30, TimeUnit.MINUTES);
        }
    }

    return product;
}

// 解决方案2：布隆过滤器
@Component
public class BloomFilterService {

    private BloomFilter<Long> bloomFilter;

    @PostConstruct
    public void init() {
        // 预计插入100万条数据，误判率0.01%
        bloomFilter = BloomFilter.create(Funnels.longFunnel(), 1000000, 0.0001);

        // 初始化时将所有有效ID加载到布隆过滤器
        List<Long> allIds = productMapper.selectAllIds();
        for (Long id : allIds) {
            bloomFilter.put(id);
        }
    }

    public boolean mightContain(Long id) {
        return bloomFilter.mightContain(id);
    }
}

// 查询前先检查布隆过滤器
public Product getProductById(Long id) {
    // 如果布隆过滤器说不存在，直接返回
    if (!bloomFilterService.mightContain(id)) {
        return null;
    }

    // 继续正常的缓存查询流程
    // ...
}`}
            />
          </div>

          {/* 缓存击穿 */}
          <div className="bg-orange-50 border-2 border-orange-200 rounded-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-3">⚡ 缓存击穿</h3>
            <p className="text-sm text-gray-700 mb-3">
              <strong>问题：</strong>某个<strong>热点 key</strong>过期，大量请求同时访问这个 key，
              导致瞬间大量请求直接访问数据库。
            </p>
            <CodeBlock
              language="java"
              code={`// 解决方案：互斥锁（Mutex Lock）
public Product getProductById(Long id) {
    String key = "product:" + id;
    Product product = (Product) redisTemplate.opsForValue().get(key);

    if (product == null) {
        // 获取分布式锁
        String lockKey = "lock:" + key;
        Boolean locked = redisTemplate.opsForValue()
            .setIfAbsent(lockKey, "1", 10, TimeUnit.SECONDS);

        if (locked != null && locked) {
            try {
                // 双重检查：获取锁后再次检查缓存
                product = (Product) redisTemplate.opsForValue().get(key);
                if (product == null) {
                    // 从数据库查询
                    product = productMapper.selectById(id);

                    // 写入缓存
                    redisTemplate.opsForValue().set(key, product, 30, TimeUnit.MINUTES);
                }
            } finally {
                // 释放锁
                redisTemplate.delete(lockKey);
            }
        }
    }

    return product;
}`}
            />
          </div>

          {/* 缓存雪崩 */}
          <div className="bg-purple-50 border-2 border-purple-200 rounded-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-3">❄️ 缓存雪崩</h3>
            <p className="text-sm text-gray-700 mb-3">
              <strong>问题：</strong>大量 key 在同一时间过期，或者 Redis 宕机，
              导致大量请求直接访问数据库，压垮数据库。
            </p>
            <CodeBlock
              language="java"
              code={`// 解决方案1：设置随机过期时间
public void cacheProduct(Product product) {
    String key = "product:" + product.getId();

    // 基础过期时间30分钟，加上随机时间0-5分钟
    int expireTime = 30 + new Random().nextInt(5);

    redisTemplate.opsForValue().set(key, product, expireTime, TimeUnit.MINUTES);
}

// 解决方案2：缓存预热
@Component
public class CacheWarmupService {

    @Autowired
    private ProductService productService;

    @Autowired
    private RedisTemplate<String, Object> redisTemplate;

    // 应用启动时预热缓存
    @PostConstruct
    public void warmUpCache() {
        log.info("开始缓存预热...");

        // 查询热点数据
        List<Product> hotProducts = productService.selectHotProducts();

        // 提前加载到缓存
        for (Product product : hotProducts) {
            String key = "product:" + product.getId();
            redisTemplate.opsForValue().set(key, product, 30, TimeUnit.MINUTES);
        }

        log.info("缓存预热完成，共加载{}个商品", hotProducts.size());
    }
}

// 解决方案3：高可用（哨兵/集群）
# 通过配置哨兵模式，保证Redis高可用
spring:
  redis:
    sentinel:
      master: mymaster
      nodes:
        - localhost:26379
        - localhost:26380
        - localhost:26381`}
            />
          </div>
        </div>
      </section>

      {/* 分布式锁 */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">分布式锁实现</h2>

        <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-lg mb-6">
          <h4 className="font-bold text-gray-900 mb-2">🔒 为什么需要分布式锁?</h4>
          <p className="text-gray-700 text-sm">
            在分布式系统中，多个服务实例同时操作同一资源时，需要通过分布式锁
            保证<strong>同一时间只有一个实例</strong>能够执行操作。
          </p>
        </div>

        <CodeBlock
          language="java"
          code={`@Component
public class RedisDistributedLock {

    @Autowired
    private RedisTemplate<String, String> redisTemplate;

    private static final String LOCK_PREFIX = "lock:";
    private static final long DEFAULT_EXPIRE_TIME = 30;  // 默认锁过期时间30秒

    /**
     * 获取锁
     * @param lockKey 锁的key
     * @param requestId 请求ID（唯一标识）
     * @param expireTime 过期时间（秒）
     * @return 是否获取成功
     */
    public boolean tryLock(String lockKey, String requestId, long expireTime) {
        String key = LOCK_PREFIX + lockKey;

        // SETNX：如果key不存在则设置，返回true
        Boolean success = redisTemplate.opsForValue().setIfAbsent(
            key,
            requestId,
            expireTime,
            TimeUnit.SECONDS
        );

        return success != null && success;
    }

    /**
     * 释放锁
     * @param lockKey 锁的key
     * @param requestId 请求ID
     */
    public void unlock(String lockKey, String requestId) {
        String key = LOCK_PREFIX + lockKey;

        // Lua脚本：确保只有持有锁的客户端才能释放锁
        String script =
            "if redis.call('get', KEYS[1]) == ARGV[1] then " +
            "    return redis.call('del', KEYS[1]) " +
            "else " +
            "    return 0 " +
            "end";

        redisTemplate.execute(
            new DefaultRedisScript<>(script, Long.class),
            Collections.singletonList(key),
            requestId
        );
    }
}

// 使用分布式锁
@Service
public class InventoryService {

    @Autowired
    private RedisDistributedLock lock;

    @Autowired
    private InventoryMapper inventoryMapper;

    public void deductStock(Long productId, int count) {
        String lockKey = "deduct:" + productId;
        String requestId = UUID.randomUUID().toString();

        try {
            // 尝试获取锁
            boolean isLocked = lock.tryLock(lockKey, requestId, 30);

            if (!isLocked) {
                throw new RuntimeException("系统繁忙，请稍后重试");
            }

            // 执行业务逻辑
            Inventory inventory = inventoryMapper.selectByProductId(productId);
            if (inventory.getCount() < count) {
                throw new RuntimeException("库存不足");
            }

            inventory.setCount(inventory.getCount() - count);
            inventoryMapper.updateById(inventory);

            log.info("扣减库存成功");

        } finally {
            // 释放锁
            lock.unlock(lockKey, requestId);
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
            title="缓存使用"
            practices={[
              "热点数据才缓存，不常访问的数据不要缓存",
              "缓存数据要设置合理的过期时间",
              "缓存对象大小要控制，不要超过1MB",
              "大对象考虑压缩后再缓存",
              "避免在循环中大量操作Redis"
            ]}
          />
          <BestPracticeCard3
            title="缓存更新"
            practices={[
              "更新数据库后先删除缓存",
              "避免直接更新缓存（容易不一致）",
              "使用过期时间兜底",
              "重要数据考虑设置版本号",
              "缓存更新失败要有重试机制"
            ]}
          />
          <BestPracticeCard3
            title="性能优化"
            practices={[
              "使用连接池减少连接开销",
              "批量操作使用Pipeline",
              "避免大key和大value",
              "监控慢查询",
              "合理使用Hash结构减少key数量"
            ]}
          />
          <BestPracticeCard3
            title="高可用"
            practices={[
              "生产环境使用哨兵或集群模式",
              "配置合理的内存淘汰策略",
              "开启持久化保证数据安全",
              "监控Redis的内存使用",
              "制定Redis宕机的应急方案"
            ]}
          />
          <BestPracticeCard3
            title="监控告警"
            practices={[
              "监控缓存命中率（目标90%以上）",
              "监控Redis响应时间",
              "监控内存使用率",
              "监控连接数",
              "配置告警通知"
            ]}
          />
          <BestPracticeCard3
            title="安全策略"
            practices={[
              "生产环境必须设置密码",
              "禁用危险命令（FLUSHALL等）",
              "限制Redis的访问IP",
              "不要在key中存储敏感信息",
              "定期备份Redis数据"
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
            question="缓存和数据库如何保持一致性?"
            answer="常用的策略： Cache-Aside Pattern
                 1) 读：先读缓存，没有再读数据库，然后写入缓存
                 2) 写：先更新数据库，再删除缓存
                 3) 延迟双删：更新数据库后删除缓存，隔一段时间再删除一次
                 4) 监听 binlog：通过 Canal 等工具监听数据库变更，自动更新缓存"
            isOpen={expandedFaq === 1}
            onClick={() => setExpandedFaq(expandedFaq === 1 ? null : 1)}
          />
          <FaqCard2
            number={2}
            question="Redis 集群模式有哪些?"
            answer="Redis 有三种集群模式：
                 1) 主从模式：读写分离，主节点写入，从节点读取
                 2) 哨兵模式：自动故障转移，高可用
                 3) Cluster 模式：数据分片，支持大规模数据
                 推荐：生产环境使用哨兵或Cluster模式"
            isOpen={expandedFaq === 2}
            onClick={() => setExpandedFaq(expandedFaq === 2 ? null : 2)}
          />
          <FaqCard2
            number={3}
            question="如何设置合理的过期时间?"
            answer="过期时间设置需要权衡：
                 1) 热点数据：5-30分钟
                 2) 普通数据：1-6小时
                 3) 不变数据：24小时或更长
                 4) 避免所有key同时过期，使用随机偏移
                 5) 根据业务容忍度调整，数据变更频率高的过期时间短"
            isOpen={expandedFaq === 3}
            onClick={() => setExpandedFaq(expandedFaq === 3 ? null : 3)}
          />
        </div>
      </section>

      {/* 下一步学习 */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-8 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">🎯 掌握了 Redis,下一步学习什么?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <NextStepCard2 title="微服务拆分" description="服务拆分原则" link="/service-decomposition" icon="🔪" />
          <NextStepCard2 title="可观测性" description="监控与链路追踪" link="/observability" icon="📊" />
          <NextStepCard2 title="实战项目" description="电商微服务系统" link="/project-ecommerce" icon="🛒" />
          <NextStepCard2 title="面试准备" description="高频面试题" link="/interview-questions" icon="💼" />
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
    indigo: 'bg-indigo-50 border-indigo-200',
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
    <div className="bg-white border-2 border-blue-200 rounded-lg p-5">
      <h3 className="text-xl font-bold text-gray-900 mb-4">{title}</h3>
      <ul className="space-y-2">
        {practices.map((practice, index) => (
          <li key={index} className="flex items-start">
            <span className="text-blue-600 mr-2 flex-shrink-0">✓</span>
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
