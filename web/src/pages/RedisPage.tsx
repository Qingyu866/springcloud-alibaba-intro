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

      {/* 多级缓存架构 */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">多级缓存架构</h2>

        <div className="bg-gradient-to-r from-purple-50 to-indigo-50 border-l-4 border-purple-500 p-6 rounded-lg mb-6">
          <h4 className="font-bold text-gray-900 mb-2">🏗️ 什么是多级缓存?</h4>
          <p className="text-gray-700 text-sm mb-3">
            多级缓存是指在应用中同时使用<strong>本地缓存（L1）</strong>和<strong>分布式缓存（L2）</strong>，
            通过两级缓存组合，进一步提升性能，减轻 Redis 压力。
          </p>
          <div className="bg-white p-4 rounded border border-purple-200 mt-3">
            <h5 className="font-semibold text-gray-900 mb-2">📊 性能对比</h5>
            <ul className="space-y-1 text-xs text-gray-700">
              <li>• <strong>本地缓存（Caffeine）</strong>: 0.01-0.1ms（最快）</li>
              <li>• <strong>Redis 缓存</strong>: 0.1-1ms</li>
              <li>• <strong>数据库查询</strong>: 50-200ms</li>
            </ul>
          </div>
        </div>

        <h3 className="text-2xl font-bold text-gray-900 mb-4">1. Caffeine 本地缓存配置</h3>
        <p className="text-gray-700 mb-4">
          Caffeine 是 Java 8 的高性能缓存库，基于 Google Guava 改进，提供了更好的性能和更丰富的API。
        </p>

        <CodeBlock
          language="xml"
          code={`<!-- pom.xml -->
<dependency>
    <groupId>com.github.ben-manes.caffeine</groupId>
    <artifactId>caffeine</artifactId>
</dependency>

<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-cache</artifactId>
</dependency>`}
        />

        <CodeBlock
          language="java"
          code={`@Configuration
@EnableCaching
public class CaffeineConfig {

    @Bean
    public Cache<String, Object> caffeineCache() {
        return Caffeine.newBuilder()
            // 设置初始容量
            .initialCapacity(100)
            // 最大缓存条目数
            .maximumSize(1000)
            // 写入后过期时间（5分钟）
            .expireAfterWrite(5, TimeUnit.MINUTES)
            // 访问后过期时间（3分钟）
            .expireAfterAccess(3, TimeUnit.MINUTES)
            // 开启统计
            .recordStats()
            // 移除监听器
            .removalListener((key, value, cause) -> {
                log.info("本地缓存移除 - key: {}, cause: {}", key, cause);
            })
            .build();
    }

    @Bean
    public CacheManager cacheManager() {
        CaffeineCacheManager cacheManager = new CaffeineCacheManager();
        cacheManager.setCaffeine(Caffeine.newBuilder()
            .initialCapacity(100)
            .maximumSize(1000)
            .expireAfterWrite(5, TimeUnit.MINUTES)
            .recordStats());
        return cacheManager;
    }
}`}
        />

        <h3 className="text-2xl font-bold text-gray-900 mb-4 mt-8">2. L1 + L2 缓存实现</h3>
        <p className="text-gray-700 mb-4">
          实现 L1（本地缓存）+ L2（Redis）两级缓存架构，查询时先查 L1，未命中再查 L2，最后查数据库。
        </p>

        <CodeBlock
          language="java"
          code={`/**
 * 两级缓存服务
 */
@Component
public class TwoLevelCacheService {

    @Autowired
    private Cache<String, Object> caffeineCache;  // L1: 本地缓存

    @Autowired
    private RedisTemplate<String, Object> redisTemplate;  // L2: Redis

    private static final String L1_CACHE_PREFIX = "l1:";
    private static final String L2_CACHE_PREFIX = "l2:";

    /**
     * 获取缓存（L1 -> L2 -> DB）
     */
    public <T> T get(String key, Class<T> type, Supplier<T> dbLoader) {
        // 1. 先查 L1 本地缓存
        Object l1Value = caffeineCache.getIfPresent(L1_CACHE_PREFIX + key);
        if (l1Value != null) {
            log.info("L1 命中 - key: {}", key);
            return type.cast(l1Value);
        }

        // 2. 再查 L2 Redis
        String l2Key = L2_CACHE_PREFIX + key;
        Object l2Value = redisTemplate.opsForValue().get(l2Key);
        if (l2Value != null) {
            log.info("L2 命中，回写 L1 - key: {}", key);
            // 回写到 L1 本地缓存
            caffeineCache.put(L1_CACHE_PREFIX + key, l2Value);
            return type.cast(l2Value);
        }

        // 3. 查询数据库
        log.info("缓存未命中，查询数据库 - key: {}", key);
        T dbValue = dbLoader.get();

        if (dbValue != null) {
            // 写入 L2
            redisTemplate.opsForValue().set(l2Key, dbValue, 30, TimeUnit.MINUTES);
            // 写入 L1
            caffeineCache.put(L1_CACHE_PREFIX + key, dbValue);
        }

        return dbValue;
    }

    /**
     * 删除缓存（同时删除 L1 和 L2）
     */
    public void delete(String key) {
        // 删除 L1
        caffeineCache.invalidate(L1_CACHE_PREFIX + key);
        // 删除 L2
        redisTemplate.delete(L2_CACHE_PREFIX + key);
        log.info("两级缓存已删除 - key: {}", key);
    }

    /**
     * 更新缓存
     */
    public void put(String key, Object value) {
        // 更新 L1
        caffeineCache.put(L1_CACHE_PREFIX + key, value);
        // 更新 L2
        redisTemplate.opsForValue().set(L2_CACHE_PREFIX + key, value, 30, TimeUnit.MINUTES);
        log.info("两级缓存已更新 - key: {}", key);
    }
}

/**
 * 使用两级缓存
 */
@Service
public class ProductService {

    @Autowired
    private TwoLevelCacheService twoLevelCache;

    @Autowired
    private ProductMapper productMapper;

    public Product getProductById(Long id) {
        String key = "product:" + id;

        return twoLevelCache.get(key, Product.class, () -> {
            // 缓存未命中时从数据库加载
            return productMapper.selectById(id);
        });
    }

    public void updateProduct(Product product) {
        // 更新数据库
        productMapper.updateById(product);

        // 删除两级缓存
        String key = "product:" + product.getId();
        twoLevelCache.delete(key);
    }
}`}
        />

        <h3 className="text-2xl font-bold text-gray-900 mb-4 mt-8">3. 缓存预热</h3>
        <p className="text-gray-700 mb-4">
          应用启动时，提前将热点数据加载到缓存中，避免冷启动时的缓存击穿问题。
        </p>

        <CodeBlock
          language="java"
          code={`/**
 * 缓存预热服务
 */
@Component
public class CacheWarmupService {

    @Autowired
    private ProductMapper productMapper;

    @Autowired
    private TwoLevelCacheService twoLevelCache;

    @Autowired
    private RedisTemplate<String, Object> redisTemplate;

    /**
     * 应用启动时预热
     */
    @PostConstruct
    public void warmUpOnStartup() {
        log.info("开始缓存预热...");

        // 1. 预热商品数据
        warmUpProductCache();

        // 2. 预热配置数据
        warmUpConfigCache();

        // 3. 预热用户数据
        warmUpUserCache();

        log.info("缓存预热完成");
    }

    /**
     * 预热商品缓存
     */
    private void warmUpProductCache() {
        // 查询热点商品（例如：销量前1000的商品）
        List<Product> hotProducts = productMapper.selectHotProducts(1000);

        for (Product product : hotProducts) {
            String key = "product:" + product.getId();
            twoLevelCache.put(key, product);
        }

        log.info("商品缓存预热完成，数量: {}", hotProducts.size());
    }

    /**
     * 预热配置缓存
     */
    private void warmUpConfigCache() {
        // 查询所有配置
        List<Config> configs = configMapper.selectAll();

        for (Config config : configs) {
            String key = "config:" + config.getKey();
            redisTemplate.opsForValue().set(key, config, 1, TimeUnit.HOURS);
        }

        log.info("配置缓存预热完成，数量: {}", configs.size());
    }

    /**
     * 预热用户缓存
     */
    private void warmUpUserCache() {
        // 查询活跃用户（最近7天有登录的用户）
        List<User> activeUsers = userMapper.selectActiveUsers(7);

        for (User user : activeUsers) {
            String key = "user:" + user.getId();
            twoLevelCache.put(key, user);
        }

        log.info("用户缓存预热完成，数量: {}", activeUsers.size());
    }

    /**
     * 定时预热（每小时执行一次）
     */
    @Scheduled(cron = "0 0 * * * ?")
    public void scheduledWarmup() {
        log.info("执行定时缓存预热");
        warmUpProductCache();
    }
}

/**
 * 手动触发预热接口
 */
@RestController
@RequestMapping("/admin/cache")
public class CacheController {

    @Autowired
    private CacheWarmupService cacheWarmupService;

    /**
     * 手动触发缓存预热
     */
    @PostMapping("/warmup")
    public Result<String> warmupCache() {
        cacheWarmupService.warmUpOnStartup();
        return Result.success("缓存预热完成");
    }

    /**
     * 预热指定商品
     */
    @PostMapping("/warmup/product/{productId}")
    public Result<String> warmupProduct(@PathVariable Long productId) {
        Product product = productMapper.selectById(productId);
        if (product != null) {
            String key = "product:" + productId;
            twoLevelCache.put(key, product);
            return Result.success("商品缓存预热成功");
        }
        return Result.error("商品不存在");
    }
}`}
        />

        <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-lg mb-6 mt-8">
          <h4 className="font-bold text-gray-900 mb-2">💡 多级缓存注意事项</h4>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">•</span>
              <span><strong>本地缓存容量限制</strong>：不要在本地缓存中存储大量数据，避免 OOM</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">•</span>
              <span><strong>分布式环境下的一致性</strong>：本地缓存在多实例间不同步，适合读多写少的场景</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">•</span>
              <span><strong>缓存更新策略</strong>：更新数据时，需要通知所有实例清除本地缓存</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">•</span>
              <span><strong>监控 L1 命中率</strong>：如果 L1 命中率过低，说明缓存配置不合理</span>
            </li>
          </ul>
        </div>
      </section>

      {/* 缓存一致性 */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">缓存一致性解决方案</h2>

        <div className="bg-gradient-to-r from-orange-50 to-red-50 border-l-4 border-orange-500 p-6 rounded-lg mb-6">
          <h4 className="font-bold text-gray-900 mb-2">⚖️ 什么是缓存一致性问题?</h4>
          <p className="text-gray-700 text-sm mb-3">
            当数据库和缓存同时存在时，如何保证两者数据的<strong>一致性</strong>是核心难点。
            更新数据库成功但缓存更新失败、或者并发读写导致数据不一致，都是常见问题。
          </p>
          <div className="bg-white p-4 rounded border border-orange-200 mt-3">
            <h5 className="font-semibold text-gray-900 mb-2">🚨 常见不一致场景</h5>
            <ul className="space-y-1 text-xs text-gray-700">
              <li>• 更新数据库成功，但删除缓存失败</li>
              <li>• 线程A读缓存，线程B同时更新数据库和缓存</li>
              <li>• 缓存过期时间过长，导致读取到旧数据</li>
            </ul>
          </div>
        </div>

        <h3 className="text-2xl font-bold text-gray-900 mb-4">1. 延时双删策略</h3>
        <p className="text-gray-700 mb-4">
          更新数据库前后各删除一次缓存，第二次删除延时执行，确保删除在更新之前未完成查询的缓存。
        </p>

        <CodeBlock
          language="java"
          code={`/**
 * 延时双删策略
 */
@Service
public class DelayedDoubleDeleteService {

    @Autowired
    private RedisTemplate<String, Object> redisTemplate;

    @Autowired
    private ProductMapper productMapper;

    @Autowired
    private ThreadPoolExecutor executor;

    private static final long DELAY_MILLIS = 500;  // 延时500ms

    /**
     * 更新商品（延时双删）
     */
    @Transactional
    public void updateProduct(Product product) {
        String key = "product:" + product.getId();

        // 1. 第一次删除缓存
        redisTemplate.delete(key);
        log.info("第一次删除缓存 - key: {}", key);

        // 2. 更新数据库
        productMapper.updateById(product);
        log.info("数据库已更新 - id: {}", product.getId());

        // 3. 第二次删除缓存（延时执行）
        executor.execute(() -> {
            try {
                Thread.sleep(DELAY_MILLIS);
                redisTemplate.delete(key);
                log.info("第二次删除缓存（延时） - key: {}", key);
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
                log.error("延时删除失败", e);
            }
        });
    }
}

/**
 * 读写分离策略（Write-Through）
 */
@Service
public class WriteThroughCacheService {

    @Autowired
    private RedisTemplate<String, Object> redisTemplate;

    @Autowired
    private ProductMapper productMapper;

    /**
     * 更新数据（先更新数据库，再删除缓存）
     * 适用场景：对一致性要求高的场景
     */
    @Transactional
    public void updateWithCacheDelete(Product product) {
        String key = "product:" + product.getId();

        // 1. 更新数据库
        productMapper.updateById(product);

        // 2. 删除缓存（而非更新缓存）
        redisTemplate.delete(key);

        log.info("数据已更新，缓存已删除");
    }

    /**
     * 更新数据（先删除缓存，再更新数据库，再延时删除）
     * 适用场景：高并发读写场景
     */
    @Transactional
    public void updateWithDelayedDelete(Product product) {
        String key = "product:" + product.getId();

        // 1. 删除缓存
        redisTemplate.delete(key);

        // 2. 更新数据库
        productMapper.updateById(product);

        // 3. 延时再删除一次
        try {
            Thread.sleep(500);
            redisTemplate.delete(key);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }

        log.info("延时双删完成");
    }
}

/**
 * 分布式锁 + 缓存删除（最强一致性）
 */
@Service
public class StrongConsistencyCacheService {

    @Autowired
    private RedisTemplate<String, Object> redisTemplate;

    @Autowired
    private ProductMapper productMapper;

    @Autowired
    private RedisDistributedLock distributedLock;

    /**
     * 更新数据（保证强一致性）
     */
    public void updateWithStrongConsistency(Product product) {
        String key = "product:" + product.getId();
        String lockKey = "lock:update:" + product.getId();
        String requestId = UUID.randomUUID().toString();

        try {
            // 1. 获取分布式锁
            boolean locked = distributedLock.tryLock(lockKey, requestId, 10);

            if (!locked) {
                throw new RuntimeException("系统繁忙，请稍后重试");
            }

            // 2. 删除缓存
            redisTemplate.delete(key);

            // 3. 更新数据库
            productMapper.updateById(product);

            // 4. 再次删除缓存（兜底）
            redisTemplate.delete(key);

            log.info("强一致性更新完成");

        } finally {
            // 5. 释放锁
            distributedLock.unlock(lockKey, requestId);
        }
    }
}`}
        />

        <h3 className="text-2xl font-bold text-gray-900 mb-4 mt-8">2. Canal binlog 订阅方案</h3>
        <p className="text-gray-700 mb-4">
          通过 Canal 监听 MySQL binlog，当数据库数据变更时，自动更新缓存，解耦业务代码。
        </p>

        <CodeBlock
          language="xml"
          code={`<!-- Canal 客户端依赖 -->
<dependency>
    <groupId>com.alibaba.otter</groupId>
    <artifactId>canal.client</artifactId>
    <version>1.1.6</version>
</dependency>`}
        />

        <CodeBlock
          language="java"
          code={`/**
 * Canal 监听器 - 监听 MySQL binlog 变更
 */
@Component
@Slf4j
public class CanalClient {

    private static final String REDIS_PRODUCT_PREFIX = "product:";

    @Autowired
    private RedisTemplate<String, Object> redisTemplate;

    @Autowired
    private ProductMapper productMapper;

    /**
     * 启动 Canal 客户端
     */
    @PostConstruct
    public void start() {
        // 创建连接
        CanalConnector connector = CanalConnectors.newSingleConnector(
            new InetSocketAddress("canal-server", 11111),
            "example",
            "",
            ""
        );

        try {
            // 连接
            connector.connect();
            // 订阅所有表
            connector.subscribe(".*\\..*");
            // 回滚到最后一次提交的位置
            connector.rollback();

            log.info("Canal 客户端启动成功");

            while (true) {
                // 获取数据（每次获取 1000 条，不等待）
                Message message = connector.getWithoutAck(1000);
                long batchId = message.getId();
                int size = message.getEntries().size();

                if (batchId != -1 && size > 0) {
                    // 处理 binlog 变更
                    processEntry(message.getEntries());
                }

                // 确认提交
                connector.ack(batchId);
            }

        } catch (Exception e) {
            log.error("Canal 客户端异常", e);
        } finally {
            connector.disconnect();
        }
    }

    /**
     * 处理 binlog 条目
     */
    private void processEntry(List<CanalEntry.Entry> entries) {
        for (CanalEntry.Entry entry : entries) {
            if (entry.getEntryType() == CanalEntry.EntryType.ROWDATA) {
                try {
                    CanalEntry.RowChange rowChange =
                        CanalEntry.RowChange.parseFrom(entry.getStoreValue());

                    // 只处理数据变更
                    if (rowChange.getEventType() == CanalEntry.EventType.UPDATE ||
                        rowChange.getEventType() == CanalEntry.EventType.DELETE ||
                        rowChange.getEventType() == CanalEntry.EventType.INSERT) {

                        handleRowChange(rowChange);
                    }
                } catch (Exception e) {
                    log.error("解析 binlog 失败", e);
                }
            }
        }
    }

    /**
     * 处理行变更
     */
    private void handleRowChange(CanalEntry.RowChange rowChange) {
        for (CanalEntry.RowData rowData : rowChange.getRowDatasList()) {
            // 获取表名
            String tableName = rowChange.getTableName();

            // 根据表名处理不同的缓存
            switch (tableName) {
                case "product":
                    handleProductChange(rowData);
                    break;
                case "user":
                    handleUserChange(rowData);
                    break;
                // 更多表...
            }
        }
    }

    /**
     * 处理商品表变更
     */
    private void handleProductChange(CanalEntry.RowData rowData) {
        // 获取 ID
        Long productId = extractId(rowData);

        if (productId != null) {
            String key = REDIS_PRODUCT_PREFIX + productId;

            // 删除缓存
            redisTemplate.delete(key);

            log.info("商品变更，已删除缓存 - productId: {}", productId);
        }
    }

    /**
     * 从行数据中提取 ID
     */
    private Long extractId(CanalEntry.RowData rowData) {
        for (CanalEntry.Column column : rowData.getAfterColumnsList()) {
            if ("id".equals(column.getName())) {
                return Long.parseLong(column.getValue());
            }
        }
        return null;
    }
}

/**
 * Canal 消息队列集成（推荐）
 *
 * 使用 Canal 将 binlog 变更发送到消息队列（如 RocketMQ），
 * 然后消费者处理缓存更新，实现解耦和削峰填谷。
 */
@Component
@Slf4j
public class CanalCacheConsumer {

    @Autowired
    private RedisTemplate<String, Object> redisTemplate;

    /**
     * 消费 Canal 发送的消息
     */
    @RocketMQMessageListener(
        topic = "canal-binlog",
        consumerGroup = "cache-update-group"
    )
    public void onMessage(CanalMessage message) {
        try {
            String table = message.getTable();
            String type = message.getType();  // INSERT, UPDATE, DELETE
            Map<String, Object> data = message.getData();

            // 根据表名处理
            switch (table) {
                case "product":
                    handleProductChange(type, data);
                    break;
                case "user":
                    handleUserChange(type, data);
                    break;
            }

        } catch (Exception e) {
            log.error("处理 Canal 消息失败", e);
            // 重试或记录到死信队列
        }
    }

    /**
     * 处理商品变更
     */
    private void handleProductChange(String type, Map<String, Object> data) {
        Long productId = (Long) data.get("id");
        String key = "product:" + productId;

        if ("DELETE".equals(type)) {
            // 删除操作：直接删除缓存
            redisTemplate.delete(key);
        } else if ("UPDATE".equals(type)) {
            // 更新操作：删除缓存，下次查询时重新加载
            redisTemplate.delete(key);
        } else if ("INSERT".equals(type)) {
            // 插入操作：可以预加载缓存（可选）
            // Product product = productMapper.selectById(productId);
            // redisTemplate.opsForValue().set(key, product, 30, TimeUnit.MINUTES);
        }

        log.info("商品缓存已更新 - productId: {}, type: {}", productId, type);
    }
}`}
        />

        <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-lg mb-6 mt-8">
          <h4 className="font-bold text-gray-900 mb-2">✅ 缓存一致性方案对比</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <div className="bg-white p-4 rounded border border-green-200">
              <h5 className="font-bold text-gray-900 mb-2">延时双删</h5>
              <ul className="text-xs text-gray-700 space-y-1">
                <li>✓ 实现简单</li>
                <li>✓ 性能影响小</li>
                <li>✗ 仍有短暂不一致</li>
              </ul>
            </div>
            <div className="bg-white p-4 rounded border border-green-200">
              <h5 className="font-bold text-gray-900 mb-2">分布式锁</h5>
              <ul className="text-xs text-gray-700 space-y-1">
                <li>✓ 强一致性</li>
                <li>✗ 性能较差</li>
                <li>✗ 实现复杂</li>
              </ul>
            </div>
            <div className="bg-white p-4 rounded border border-green-200">
              <h5 className="font-bold text-gray-900 mb-2">Canal binlog</h5>
              <ul className="text-xs text-gray-700 space-y-1">
                <li>✓ 业务解耦</li>
                <li>✓ 最终一致性好</li>
                <li>✗ 需要额外组件</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 缓存穿透/击穿/雪崩深入 */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">缓存三大问题深入解决方案</h2>

        <div className="space-y-6">
          {/* 布隆过滤器深入 */}
          <div className="bg-red-50 border-2 border-red-200 rounded-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-3">💥 缓存穿透 - 布隆过滤器深入</h3>
            <p className="text-sm text-gray-700 mb-3">
              布隆过滤器是一种<strong>空间效率极高的概率型数据结构</strong>，用于判断一个元素是否在集合中。
              优点是空间效率和查询时间都远超一般算法，缺点是有一定的误判率。
            </p>

            <CodeBlock
              language="java"
              code={`/**
 * 布隆过滤器配置
 */
@Configuration
public class BloomFilterConfig {

    /**
     * 初始化布隆过滤器
     */
    @Bean
    public BloomFilter<Long> productIdBloomFilter() {
        // 预计插入100万条数据
        long expectedInsertions = 1000000;
        // 误判率 0.01%
        double fpp = 0.0001;

        return BloomFilter.create(
            Funnels.longFunnel(),
            expectedInsertions,
            fpp
        );
    }
}

/**
 * 布隆过滤器服务
 */
@Component
@Slf4j
public class BloomFilterService {

    @Autowired
    private BloomFilter<Long> productIdBloomFilter;

    @Autowired
    private ProductMapper productMapper;

    /**
     * 初始化布隆过滤器（应用启动时执行）
     */
    @PostConstruct
    public void initBloomFilter() {
        log.info("开始初始化布隆过滤器...");

        // 查询所有商品ID
        List<Long> allIds = productMapper.selectAllIds();

        // 添加到布隆过滤器
        for (Long id : allIds) {
            productIdBloomFilter.put(id);
        }

        log.info("布隆过滤器初始化完成，数量: {}", allIds.size());
    }

    /**
     * 检查ID是否存在
     */
    public boolean mightContain(Long id) {
        return productIdBloomFilter.mightContain(id);
    }

    /**
     * 添加新ID到布隆过滤器
     */
    public void addId(Long id) {
        productIdBloomFilter.put(id);
    }
}

/**
 * 商品服务（使用布隆过滤器）
 */
@Service
@Slf4j
public class ProductService {

    @Autowired
    private BloomFilterService bloomFilterService;

    @Autowired
    private ProductMapper productMapper;

    @Autowired
    private RedisTemplate<String, Object> redisTemplate;

    /**
     * 查询商品（布隆过滤器 + 缓存）
     */
    public Product getProductById(Long id) {
        // 1. 布隆过滤器检查
        if (!bloomFilterService.mightContain(id)) {
            log.warn("商品不存在（布隆过滤器拦截） - id: {}", id);
            return null;
        }

        // 2. 查询缓存
        String key = "product:" + id;
        Object cached = redisTemplate.opsForValue().get(key);

        if (cached != null) {
            if (cached instanceof String && ((String) cached).isEmpty()) {
                // 缓存空对象
                return null;
            }
            return (Product) cached;
        }

        // 3. 查询数据库
        Product product = productMapper.selectById(id);

        if (product != null) {
            // 写入缓存
            redisTemplate.opsForValue().set(key, product, 30, TimeUnit.MINUTES);
        } else {
            // 缓存空对象
            redisTemplate.opsForValue().set(key, "", 5, TimeUnit.MINUTES);
        }

        return product;
    }

    /**
     * 添加商品（同步更新布隆过滤器）
     */
    public void addProduct(Product product) {
        // 插入数据库
        productMapper.insert(product);

        // 添加到布隆过滤器
        bloomFilterService.addId(product.getId());

        log.info("商品已添加，布隆过滤器已更新 - id: {}", product.getId());
    }
}`}
            />

            <div className="bg-white p-4 rounded border border-red-200 mt-4">
              <h5 className="font-semibold text-gray-900 mb-2">📊 布隆过滤器参数说明</h5>
              <ul className="text-xs text-gray-700 space-y-1">
                <li><strong>expectedInsertions</strong>: 预计插入数量，建议设置为实际数量的1.2-1.5倍</li>
                <li><strong>fpp (False Positive Probability)</strong>: 误判率，越小越准确但占用空间越大</li>
                <li><strong>推荐值</strong>: 误判率 0.01% 或 0.001%</li>
                <li><strong>空间占用</strong>: 100万条数据，误判率0.01%，约占用1.2MB</li>
              </ul>
            </div>
          </div>

          {/* 缓存击穿深入 */}
          <div className="bg-orange-50 border-2 border-orange-200 rounded-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-3">⚡ 缓存击穿 - 分布式锁深入</h3>
            <p className="text-sm text-gray-700 mb-3">
              缓存击穿是指<strong>热点 key</strong>过期瞬间，大量请求直接访问数据库。
              除了分布式锁，还可以使用<strong>热点数据永不过期</strong>策略。
            </p>

            <CodeBlock
              language="java"
              code={`/**
 * 热点数据永不过期策略
 */
@Service
@Slf4j
public class HotspotCacheService {

    @Autowired
    private RedisTemplate<String, Object> redisTemplate;

    @Autowired
    private ProductMapper productMapper;

    /**
     * 缓存热点数据（逻辑过期）
     */
    public void cacheHotspotProduct(Product product) {
        String key = "product:" + product.getId();
        String expireKey = "product:expire:" + product.getId();

        // 实际数据
        redisTemplate.opsForValue().set(key, product);

        // 过期时间标记（30分钟后过期）
        long expireTime = System.currentTimeMillis() + 30 * 60 * 1000;
        redisTemplate.opsForValue().set(expireKey, expireTime, 1, TimeUnit.DAYS);

        log.info("热点数据已缓存 - id: {}", product.getId());
    }

    /**
     * 获取热点数据（异步刷新）
     */
    public Product getHotspotProduct(Long id) {
        String key = "product:" + id;
        String expireKey = "product:expire:" + id;

        // 获取缓存数据
        Product product = (Product) redisTemplate.opsForValue().get(key);

        // 获取过期时间
        Object expireTimeObj = redisTemplate.opsForValue().get(expireKey);

        if (product != null && expireTimeObj != null) {
            long expireTime = Long.parseLong(expireTimeObj.toString());

            // 如果已过期，异步刷新
            if (System.currentTimeMillis() > expireTime) {
                // 使用线程池异步刷新
                CompletableFuture.runAsync(() -> {
                    refreshProductCache(id);
                });
            }

            // 返回旧数据（即使过期也返回）
            return product;
        }

        // 缓存不存在，从数据库加载
        return loadProductFromDb(id);
    }

    /**
     * 刷新商品缓存
     */
    private void refreshProductCache(Long id) {
        String lockKey = "lock:refresh:" + id;
        Boolean locked = redisTemplate.opsForValue().setIfAbsent(lockKey, "1", 10, TimeUnit.SECONDS);

        if (locked != null && locked) {
            try {
                // 从数据库加载最新数据
                Product product = productMapper.selectById(id);

                if (product != null) {
                    cacheHotspotProduct(product);
                    log.info("热点数据已刷新 - id: {}", id);
                }
            } finally {
                redisTemplate.delete(lockKey);
            }
        }
    }

    /**
     * 从数据库加载商品
     */
    private Product loadProductFromDb(Long id) {
        Product product = productMapper.selectById(id);

        if (product != null) {
            cacheHotspotProduct(product);
        }

        return product;
    }
}

/**
 * 多级互斥锁（防止缓存击穿）
 */
@Service
@Slf4j
public class MultiLevelLockCacheService {

    @Autowired
    private RedisTemplate<String, Object> redisTemplate;

    @Autowired
    private ProductMapper productMapper;

    private final Map<Long, Object> localLocks = new ConcurrentHashMap<>();

    /**
     * 获取商品（两级锁）
     */
    public Product getProductWithDoubleLock(Long id) {
        String key = "product:" + id;
        Object cached = redisTemplate.opsForValue().get(key);

        if (cached != null) {
            return (Product) cached;
        }

        // 第一级：本地锁（JVM 锁）
        synchronized (this) {
            // 双重检查
            cached = redisTemplate.opsForValue().get(key);
            if (cached != null) {
                return (Product) cached;
            }

            // 第二级：分布式锁（Redis 锁）
            String lockKey = "lock:query:" + id;
            Boolean locked = redisTemplate.opsForValue().setIfAbsent(lockKey, "1", 10, TimeUnit.SECONDS);

            if (locked != null && locked) {
                try {
                    // 第三重检查
                    cached = redisTemplate.opsForValue().get(key);
                    if (cached != null) {
                        return (Product) cached;
                    }

                    // 从数据库查询
                    Product product = productMapper.selectById(id);

                    if (product != null) {
                        redisTemplate.opsForValue().set(key, product, 30, TimeUnit.MINUTES);
                    }

                    return product;

                } finally {
                    redisTemplate.delete(lockKey);
                }
            } else {
                // 未获取到分布式锁，稍后重试
                try {
                    Thread.sleep(50);
                    return getProductWithDoubleLock(id);
                } catch (InterruptedException e) {
                    Thread.currentThread().interrupt();
                    return null;
                }
            }
        }
    }
}`}
            />
          </div>

          {/* 缓存雪崩深入 */}
          <div className="bg-purple-50 border-2 border-purple-200 rounded-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-3">❄️ 缓存雪崩 - 多重防护</h3>
            <p className="text-sm text-gray-700 mb-3">
              缓存雪崩是指大量 key 同时过期或 Redis 宕机，导致大量请求直接访问数据库。
              需要通过<strong>过期时间随机化、熔断降级、限流</strong>等多重手段防护。
            </p>

            <CodeBlock
              language="java"
              code={`/**
 * 缓存雪崩防护服务
 */
@Service
@Slf4j
public class CacheAvalancheProtectionService {

    @Autowired
    private RedisTemplate<String, Object> redisTemplate;

    @Autowired
    private ProductMapper productMapper;

    private final Random random = new Random();

    /**
     * 设置缓存（带随机过期时间）
     */
    public void setWithRandomExpire(String key, Object value, int baseMinutes) {
        // 基础过期时间 + 随机时间（0-5分钟）
        int expireTime = baseMinutes + random.nextInt(5);

        redisTemplate.opsForValue().set(key, value, expireTime, TimeUnit.MINUTES);

        log.info("缓存已设置 - key: {}, expire: {}分钟", key, expireTime);
    }

    /**
     * 查询商品（带熔断降级）
     */
    @CircuitBreaker(name = "redisBackend", fallbackMethod = "getProductFallback")
    public Product getProductWithCircuitBreaker(Long id) {
        String key = "product:" + id;
        Object cached = redisTemplate.opsForValue().get(key);

        if (cached != null) {
            return (Product) cached;
        }

        // 查询数据库
        Product product = productMapper.selectById(id);

        if (product != null) {
            setWithRandomExpire(key, product, 30);
        }

        return product;
    }

    /**
     * 降级方法（返回默认值或缓存数据）
     */
    public Product getProductFallback(Long id, Exception ex) {
        log.error("Redis 服务异常，执行降级 - id: {}", id, ex);

        // 返回默认商品或从本地缓存读取
        Product defaultProduct = new Product();
        defaultProduct.setId(id);
        defaultProduct.setName("商品暂时不可用");

        return defaultProduct;
    }

    /**
     * 限流查询商品
     */
    @RateLimiter(name = "queryProduct", fallbackMethod = "getProductFallback")
    public Product getProductWithRateLimit(Long id) {
        return getProductWithCircuitBreaker(id);
    }
}

/**
 * Sentinel 限流配置
 */
@Configuration
public class SentinelConfig {

    @PostConstruct
    public void initFlowRules() {
        List<FlowRule> rules = new ArrayList<>();

        // 商品查询限流：每秒最多 100 次
        FlowRule rule = new FlowRule();
        rule.setResource("queryProduct");
        rule.setGrade(RuleConstant.FLOW_GRADE_QPS);
        rule.setCount(100);
        rules.add(rule);

        FlowRuleManager.loadRules(rules);

        log.info("Sentinel 限流规则已加载");
    }
}

/**
 * 缓存预热 + 随机过期时间
 */
@Component
@Slf4j
public class CacheWarmupWithRandomExpire {

    @Autowired
    private ProductMapper productMapper;

    @Autowired
    private RedisTemplate<String, Object> redisTemplate;

    private final Random random = new Random();

    /**
     * 应用启动时预热
     */
    @PostConstruct
    public void warmUpCache() {
        log.info("开始缓存预热（随机过期时间）...");

        // 查询热点商品
        List<Product> hotProducts = productMapper.selectHotProducts(1000);

        for (Product product : hotProducts) {
            String key = "product:" + product.getId();

            // 随机过期时间：30-35分钟
            int expireTime = 30 + random.nextInt(5);

            redisTemplate.opsForValue().set(key, product, expireTime, TimeUnit.MINUTES);
        }

        log.info("缓存预热完成，数量: {}", hotProducts.size());
    }
}

/**
 * Redis 高可用配置（哨兵模式）
 */
@Configuration
public class RedisSentinelConfig {

    @Bean
    public RedisConnectionFactory redisConnectionFactory() {
        RedisSentinelConfiguration config = new RedisSentinelConfiguration()
            .master("mymaster")
            .sentinel("localhost", 26379)
            .sentinel("localhost", 26380)
            .sentinel("localhost", 26381);

        config.setPassword("your-password");

        return new LettuceConnectionFactory(config);
    }

    @Bean
    public RedisTemplate<String, Object> redisTemplate(RedisConnectionFactory factory) {
        RedisTemplate<String, Object> template = new RedisTemplate<>();
        template.setConnectionFactory(factory);
        template.setKeySerializer(new StringRedisSerializer());
        template.setValueSerializer(new GenericJackson2JsonRedisSerializer());
        return template;
    }
}`}
            />

            <div className="bg-white p-4 rounded border border-purple-200 mt-4">
              <h5 className="font-semibold text-gray-900 mb-2">🛡️ 缓存雪崩防护策略</h5>
              <ul className="text-xs text-gray-700 space-y-1">
                <li>✓ <strong>过期时间随机化</strong>: 基础时间 + 随机时间，避免同时过期</li>
                <li>✓ <strong>缓存预热</strong>: 应用启动时加载热点数据</li>
                <li>✓ <strong>熔断降级</strong>: Redis 异常时返回默认值</li>
                <li>✓ <strong>限流保护</strong>: 限制请求访问数据库的速率</li>
                <li>✓ <strong>高可用架构</strong>: 使用哨兵或集群模式</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 热点数据处理 */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">热点数据处理</h2>

        <div className="bg-gradient-to-r from-red-50 to-orange-50 border-l-4 border-red-500 p-6 rounded-lg mb-6">
          <h4 className="font-bold text-gray-900 mb-2">🔥 什么是热点数据?</h4>
          <p className="text-gray-700 text-sm mb-3">
            热点数据是指<strong>访问频率极高</strong>的数据，如秒杀商品、热门新闻、热搜话题等。
            热点数据会导致<strong>缓存倾斜</strong>（大量请求集中在少数 key）和<strong>数据库压力</strong>。
          </p>
          <div className="bg-white p-4 rounded border border-red-200 mt-3">
            <h5 className="font-semibold text-gray-900 mb-2">📊 热点数据特征</h5>
            <ul className="space-y-1 text-xs text-gray-700">
              <li>• 访问频率远高于平均水平</li>
              <li>• 集中在特定时间段（如秒杀活动）</li>
              <li>• 可能导致单节点压力过大</li>
            </ul>
          </div>
        </div>

        <h3 className="text-2xl font-bold text-gray-900 mb-4">1. 热点发现</h3>
        <p className="text-gray-700 mb-4">
          通过<strong>访问计数</strong>、<strong>Redis ZSet</strong>、<strong>日志分析</strong>等方式识别热点数据。
        </p>

        <CodeBlock
          language="java"
          code={`/**
 * 热点数据识别服务
 */
@Component
@Slf4j
public class HotspotDetectionService {

    @Autowired
    private RedisTemplate<String, Object> redisTemplate;

    private static final String HOT_KEY_PREFIX = "hot:key:";
    private static final int HOT_THRESHOLD = 100;  // 热点阈值：100次/分钟

    /**
     * 记录访问（使用 ZSet 计数）
     */
    public void recordAccess(String key) {
        String zkey = HOT_KEY_PREFIX + getCurrentMinute();

        // 使用当前时间戳作为 score，确保同一 key 多次访问都能记录
        long score = System.currentTimeMillis();

        // 添加到 ZSet
        redisTemplate.opsForZSet().add(zkey, key, score);

        // 设置过期时间（5分钟）
        redisTemplate.expire(zkey, 5, TimeUnit.MINUTES);
    }

    /**
     * 检查是否是热点 key
     */
    public boolean isHotKey(String key) {
        String zkey = HOT_KEY_PREFIX + getCurrentMinute();

        // 统计访问次数
        Long count = redisTemplate.opsForZSet().count(zkey, 0, System.currentTimeMillis());

        return count != null && count >= HOT_THRESHOLD;
    }

    /**
     * 获取当前分钟数
     */
    private String getCurrentMinute() {
        LocalDateTime now = LocalDateTime.now();
        return now.format(DateTimeFormatter.ofPattern("yyyyMMddHHmm"));
    }

    /**
     * 获取热点 key 列表
     */
    public List<String> getHotKeys(int limit) {
        String zkey = HOT_KEY_PREFIX + getCurrentMinute();

        // 获取访问次数最多的 key
        Set<Object> keys = redisTemplate.opsForZSet().reverseRange(zkey, 0, limit - 1);

        if (keys == null) {
            return Collections.emptyList();
        }

        return keys.stream()
            .map(Object::toString)
            .collect(Collectors.toList());
    }
}

/**
 * 热点数据拦截器（AOP 实现）
 */
@Aspect
@Component
@Slf4j
public class HotspotInterceptor {

    @Autowired
    private HotspotDetectionService hotspotDetectionService;

    @Autowired
    private HotspotCacheService hotspotCacheService;

    /**
     * 拦截商品查询方法
     */
    @Around("execution(* com.example.service.ProductService.getProductById(..))")
    public Object interceptGetProduct(ProceedingJoinPoint joinPoint) throws Throwable {
        Long productId = (Long) joinPoint.getArgs()[0];
        String key = "product:" + productId;

        // 记录访问
        hotspotDetectionService.recordAccess(key);

        // 检查是否是热点
        if (hotspotDetectionService.isHotKey(key)) {
            log.info("检测到热点数据 - key: {}", key);

            // 使用热点缓存策略
            return hotspotCacheService.getHotspotProduct(productId);
        }

        // 正常查询流程
        return joinPoint.proceed();
    }
}`}
        />

        <h3 className="text-2xl font-bold text-gray-900 mb-4 mt-8">2. 热点处理策略</h3>
        <p className="text-gray-700 mb-4">
          对于识别出的热点数据，采用<strong>本地缓存、永不过期、限流</strong>等策略处理。
        </p>

        <CodeBlock
          language="java"
          code={`/**
 * 热点数据缓存服务
 */
@Component
@Slf4j
public class HotspotCacheService {

    @Autowired
    private RedisTemplate<String, Object> redisTemplate;

    @Autowired
    private ProductMapper productMapper;

    // 本地缓存（Guava Cache）
    private final Cache<Long, Product> localCache = Caffeine.newBuilder()
        .maximumSize(100)  // 最多缓存100个热点商品
        .expireAfterWrite(1, TimeUnit.HOURS)  // 1小时过期
        .recordStats()
        .build();

    /**
     * 获取热点商品（本地缓存 + Redis）
     */
    public Product getHotspotProduct(Long id) {
        // 1. 先查本地缓存
        Product product = localCache.getIfPresent(id);

        if (product != null) {
            log.info("本地缓存命中 - id: {}", id);
            return product;
        }

        // 2. 查询 Redis
        String key = "product:" + id;
        Object cached = redisTemplate.opsForValue().get(key);

        if (cached != null) {
            product = (Product) cached;
            // 回写到本地缓存
            localCache.put(id, product);
            log.info("Redis 缓存命中，回写本地缓存 - id: {}", id);
            return product;
        }

        // 3. 查询数据库
        product = productMapper.selectById(id);

        if (product != null) {
            // 写入 Redis（永不过期）
            redisTemplate.opsForValue().set(key, product);
            // 写入本地缓存
            localCache.put(id, product);
            log.info("热点数据已加载 - id: {}", id);
        }

        return product;
    }

    /**
     * 获取本地缓存统计信息
     */
    public CacheStats getCacheStats() {
        return localCache.stats();
    }
}

/**
 * 热点数据限流
 */
@RestController
@RequestMapping("/product")
@Slf4j
public class ProductController {

    @Autowired
    private ProductService productService;

    @Autowired
    private HotspotDetectionService hotspotDetectionService;

    /**
     * 查询商品（带热点限流）
     */
    @GetMapping("/{id}")
    @RateLimiter(name = "getProduct", fallbackMethod = "getProductFallback")
    public Result<Product> getProduct(@PathVariable Long id) {
        String key = "product:" + id;

        // 记录访问
        hotspotDetectionService.recordAccess(key);

        // 检查是否是热点
        if (hotspotDetectionService.isHotKey(key)) {
            // 热点数据：使用更严格的限流
            // 这里可以降级或返回缓存数据
        }

        Product product = productService.getProductById(id);

        return Result.success(product);
    }

    /**
     * 降级方法
     */
    public Result<Product> getProductFallback(Long id, Exception ex) {
        log.error("查询商品失败，触发降级 - id: {}", id, ex);

        // 返回默认商品或从本地缓存读取
        return Result.error("系统繁忙，请稍后重试");
    }
}

/**
 * 热点数据自动过期时间延长
 */
@Service
@Slf4j
public class HotspotExpireExtensionService {

    @Autowired
    private RedisTemplate<String, Object> redisTemplate;

    private final ScheduledExecutorService scheduler = Executors.newScheduledThreadPool(1);

    /**
     * 定期检查热点数据并延长过期时间
     */
    @PostConstruct
    public void startHotspotMonitor() {
        scheduler.scheduleAtFixedRate(() -> {
            try {
                extendHotspotExpire();
            } catch (Exception e) {
                log.error("延长热点数据过期时间失败", e);
            }
        }, 1, 1, TimeUnit.MINUTES);

        log.info("热点数据监控已启动");
    }

    /**
     * 延长热点数据的过期时间
     */
    private void extendHotspotExpire() {
        // 获取所有热点 key
        List<String> hotKeys = hotspotDetectionService.getHotKeys(100);

        for (String key : hotKeys) {
            // 获取剩余过期时间
            Long ttl = redisTemplate.getExpire(key, TimeUnit.SECONDS);

            // 如果剩余时间小于 10 分钟，延长到 1 小时
            if (ttl != null && ttl < 600) {
                redisTemplate.expire(key, 1, TimeUnit.HOURS);
                log.info("热点数据过期时间已延长 - key: {}", key);
            }
        }
    }
}

/**
 * 秒杀场景热点处理
 */
@Service
@Slf4j
public class SeckillHotspotService {

    @Autowired
    private RedisTemplate<String, Object> redisTemplate;

    @Autowired
    private ProductMapper productMapper;

    private static final String SECKILL_STOCK_PREFIX = "seckill:stock:";

    /**
     * 秒杀商品预热
     */
    @CacheWarmup
    public void warmUpSeckillProduct(Long productId, int stock) {
        String key = SECKILL_STOCK_PREFIX + productId;

        // 预热库存到 Redis
        redisTemplate.opsForValue().set(key, stock);

        log.info("秒杀商品已预热 - productId: {}, stock: {}", productId, stock);
    }

    /**
     * 秒杀（使用 Lua 脚本保证原子性）
     */
    public boolean seckill(Long productId, Long userId) {
        String script =
            "local stock = redis.call('get', KEYS[1]) " +
            "if tonumber(stock) > 0 then " +
            "    redis.call('decr', KEYS[1]) " +
            "    return 1 " +
            "else " +
            "    return 0 " +
            "end";

        String key = SECKILL_STOCK_PREFIX + productId;

        Long result = redisTemplate.execute(
            new DefaultRedisScript<>(script, Long.class),
            Collections.singletonList(key)
        );

        if (result != null && result == 1) {
            log.info("秒杀成功 - productId: {}, userId: {}", productId, userId);
            return true;
        } else {
            log.warn("秒杀失败，库存不足 - productId: {}, userId: {}", productId, userId);
            return false;
        }
    }
}`}
        />

        <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-lg mb-6 mt-8">
          <h4 className="font-bold text-gray-900 mb-2">⚠️ 热点数据处理总结</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="bg-white p-4 rounded border border-yellow-200">
              <h5 className="font-bold text-gray-900 mb-2">🔍 发现阶段</h5>
              <ul className="text-xs text-gray-700 space-y-1">
                <li>• ZSet 访问计数</li>
                <li>• AOP 拦截统计</li>
                <li>• 日志分析</li>
                <li>• 监控告警</li>
              </ul>
            </div>
            <div className="bg-white p-4 rounded border border-yellow-200">
              <h5 className="font-bold text-gray-900 mb-2">🛡️ 处理阶段</h5>
              <ul className="text-xs text-gray-700 space-y-1">
                <li>• 本地缓存（Caffeine）</li>
                <li>• 永不过期策略</li>
                <li>• 限流降级</li>
                <li>• 过期时间自动延长</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 下一步学习 */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-8 rounded-lg">
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
