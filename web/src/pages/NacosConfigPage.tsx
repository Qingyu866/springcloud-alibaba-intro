import { useState } from 'react';
import { CodeBlock } from '../components';
export const NacosConfigPage: React.FC = () => {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  return (
    <div className="prose prose prose-slate max-w-none">
      {/* 页面头部 */}
      <div className="bg-gradient-to-r from-orange-600 to-amber-600 text-white rounded-lg p-6 mb-8">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-4xl font-bold mb-2">Nacos 配置中心</h1>
            <p className="text-orange-50 text-lg">动态配置管理，配置热更新无需重启</p>
          </div>
          <div className="flex gap-3 text-sm">
            <span className="px-3 py-1 bg-white/20 rounded-full">🔧 进阶</span>
            <span className="px-3 py-1 bg-white/20 rounded-full">⏱️ 约40分钟</span>
            <span className="px-3 py-1 bg-white/20 rounded-full">📚 11个知识点</span>
          </div>
        </div>
      </div>

      {/* 什么是 Nacos Config */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">什么是 Nacos 配置中心?</h2>
        <div className="bg-orange-50 border-l-4 border-orange-500 p-6 rounded-lg mb-6">
          <p className="text-lg text-gray-800 leading-relaxed mb-4">
            <strong>Nacos 配置中心</strong> 是一个动态配置管理平台，支持配置的集中管理、
            实时推送和版本控制，让配置变更无需重启服务即可生效。
          </p>
          <p className="text-gray-700 mb-4">
            它解决了传统配置管理方式中的痛点：配置分散在各个项目中、修改配置需要重启服务、
            无法灵活切换不同环境、配置版本无法追溯等问题。
          </p>
          <div className="bg-white p-4 rounded border border-orange-200 mt-4">
            <h4 className="font-bold text-gray-900 mb-2">💡 核心特性</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start">
                <span className="text-orange-600 mr-2">✓</span>
                <span><strong>动态配置</strong> - 配置变更实时推送，无需重启</span>
              </li>
              <li className="flex items-start">
                <span className="text-orange-600 mr-2">✓</span>
                <span><strong>集中管理</strong> - 统一管理所有微服务的配置</span>
              </li>
              <li className="flex items-start">
                <span className="text-orange-600 mr-2">✓</span>
                <span><strong>命名空间</strong> - 支持多环境、多租户隔离</span>
              </li>
              <li className="flex items-start">
                <span className="text-orange-600 mr-2">✓</span>
                <span><strong>配置回滚</strong> - 历史版本管理，一键回滚</span>
              </li>
              <li className="flex items-start">
                <span className="text-orange-600 mr-2">✓</span>
                <span><strong>灰度发布</strong> - 支持 Beta 发布和灰度验证</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <FeatureCard icon="🔄" title="动态更新" desc="配置变更实时生效" color="orange" />
          <FeatureCard icon="🌍" title="多环境" desc="命名空间隔离" color="green" />
          <FeatureCard icon="📦" title="集中管理" desc="统一配置平台" color="blue" />
          <FeatureCard icon="⏮️" title="版本管理" desc="配置历史回滚" color="purple" />
          <FeatureCard icon="🎯" title="灰度发布" desc="平滑配置升级" color="red" />
          <FeatureCard icon="🔐" title="权限控制" desc="配置加密与鉴权" color="yellow" />
        </div>
      </section>

      {/* 为什么需要配置中心 */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">为什么需要配置中心?</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-lg">
            <h3 className="text-xl font-bold text-gray-900 mb-3">❌ 传统配置方式的问题</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>• 配置文件分散在各个项目中</li>
              <li>• 修改配置需要重新打包部署</li>
              <li>• 不同环境配置管理混乱</li>
              <li>• 配置变更无法追溯历史</li>
              <li>• 敏感配置明文存储</li>
              <li>• 配置格式不统一（properties/yml）</li>
            </ul>
          </div>

          <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-lg">
            <h3 className="text-xl font-bold text-gray-900 mb-3">✅ 配置中心的优势</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>• <strong>集中管理</strong> - 统一管理所有服务配置</li>
              <li>• <strong>动态更新</strong> - 配置变更实时生效</li>
              <li>• <strong>环境隔离</strong> - 命名空间隔离多环境</li>
              <li>• <strong>版本控制</strong> - 配置历史可追溯回滚</li>
              <li>• <strong>权限管理</strong> - 配置加密和访问控制</li>
              <li>• <strong>统一格式</strong> - 支持 YAML/Properties/JSON</li>
            </ul>
          </div>
        </div>

        <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-lg mt-6">
          <h4 className="font-bold text-gray-900 mb-2">💡 典型应用场景</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h5 className="font-semibold text-gray-800 mb-2">业务配置</h5>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• 功能开关（Feature Toggle）</li>
                <li>• 业务参数调整</li>
                <li>• 限流阈值配置</li>
                <li>• 灰度发布策略</li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold text-gray-800 mb-2">基础设施配置</h5>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• 数据库连接信息</li>
                <li>• 缓存配置</li>
                <li>• 消息队列地址</li>
                <li>• 第三方服务密钥</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 核心概念 */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">核心概念</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ConceptCard3
            title="命名空间 (Namespace)"
            level="beginner"
            desc="用于隔离不同环境的配置，如 dev、test、prod"
            example="Namespace: dev, test, prod"
          />
          <ConceptCard3
            title="分组 (Group)"
            level="beginner"
            desc="用于区分不同的应用或业务模块"
            example="Group: user-service, order-service"
          />
          <ConceptCard3
            title="Data ID"
            level="beginner"
            desc="配置的唯一标识，格式：$\{spring.application.name\}-\{profile\}.\{file-extension\}"
            example="user-service-dev.yml"
          />
          <ConceptCard3
            title="配置内容"
            level="intermediate"
            desc="具体的配置内容，支持 YAML、Properties、JSON 等格式"
            example="spring.datasource.url=jdbc:mysql://..."
          />
        </div>
      </section>

      {/* 快速开始 */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">快速开始</h2>
        <p className="text-gray-700 mb-6">通过一个完整的示例，学习如何使用 Nacos 配置中心进行动态配置管理。</p>

        <h3>步骤 1: 添加依赖</h3>
        <CodeBlock
          language="xml"
          code={`<!-- pom.xml -->
<dependency>
    <groupId>com.alibaba.cloud</groupId>
    <artifactId>spring-cloud-starter-alibaba-nacos-config</artifactId>
</dependency>`}
        />

        <h3>步骤 2: 创建 bootstrap.yml</h3>
        <CodeBlock
          language="yaml"
          code={`# bootstrap.yml (优先级高于 application.yml)
spring:
  application:
    name: user-service  # 服务名称

  cloud:
    nacos:
      config:
        server-addr: localhost:8848  # Nacos 配置中心地址
        namespace: dev  # 命名空间ID (dev环境)
        group: DEFAULT_GROUP  # 分组名称
        file-extension: yaml  # 配置文件格式

        # 配置刷新 (自动刷新)
        refresh-enabled: true

        # 共享配置
        shared-configs:
          - data-id: common-$\{spring.profiles.active\}.yaml
            group: DEFAULT_GROUP
            refresh: true

        # 扩展配置
        extension-configs:
          - data-id: datasource.yaml
            group: DEFAULT_GROUP
            refresh: true`}
        />

        <h3>步骤 3: 在 Nacos 控制台创建配置</h3>
        <div className="bg-gray-50 border-l-4 border-gray-500 p-6 rounded-lg mb-6">
          <h4 className="font-bold text-gray-900 mb-3">📝 配置信息</h4>
          <ul className="space-y-2 text-sm">
            <li><strong>Data ID:</strong> user-service-dev.yaml</li>
            <li><strong>Group:</strong> DEFAULT_GROUP</li>
            <li><strong>配置格式:</strong> YAML</li>
            <li><strong>配置内容:</strong> 见下方示例</li>
          </ul>
        </div>

        <CodeBlock
          language="yaml"
          code={`# user-service-dev.yaml
app:
  name: 用户服务
  version: 1.0.0

# 功能开关
feature:
  enable-cache: true
  enable-mq: false

# 业务配置
business:
  max-order-count: 100
  timeout: 5000

# 数据源配置
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/user_db_dev
    username: root
    password: dev123456
    driver-class-name: com.mysql.cj.jdbc.Driver

# Redis 配置
  redis:
    host: localhost
    port: 6379
    database: 0`}
        />

        <h3>步骤 4: 使用配置</h3>
        <CodeBlock
          language="java"
          code={`// 使用 @Value 注入配置
@RestController
public class UserController {

    @Value("$\{app.name\}")
    private String appName;

    @Value("$\{feature.enable-cache\}")
    private Boolean enableCache;

    @Value("$\{business.max-order-count\}")
    private Integer maxOrderCount;

    @GetMapping("/config")
    public Map<String, Object> getConfig() {
        Map<String, Object> config = new HashMap<>();
        config.put("appName", appName);
        config.put("enableCache", enableCache);
        config.put("maxOrderCount", maxOrderCount);
        return config;
    }
}

// 使用 @ConfigurationProperties
@Component
@ConfigurationProperties(prefix = "business")
@Data
public class BusinessConfig {

    private Integer maxOrderCount;
    private Integer timeout;

    // 配置变更时自动刷新 (需要 @RefreshScope)
}`}
        />

        <h3>步骤 5: 测试配置热更新</h3>
        <CodeBlock
          language="java"
          code={`// 1. 启动应用，访问 http://localhost:8080/config
// 2. 在 Nacos 控制台修改配置：business.max-order-count=200
// 3. 点击"发布"按钮
// 4. 再次访问 /config 接口，观察值是否变为 200

// 注意：@Value 默认不会自动刷新，需要配合 @RefreshScope
@RefreshScope  // 关键注解：配置变更时自动刷新 Bean
@RestController
public class UserController {

    @Value("$\{business.max-order-count\}")
    private Integer maxOrderCount;

    // ...
}

// @ConfigurationProperties 默认支持自动刷新
@Component
@ConfigurationProperties(prefix = "business")
@Data
public class BusinessConfig {
    private Integer maxOrderCount;
    // 配置变更会自动更新此值
}`}
        />
      </section>

      {/* 配置热更新 */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">配置热更新机制</h2>

        <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-lg mb-6">
          <h4 className="font-bold text-gray-900 mb-2">⚠️ 热更新注意事项</h4>
          <p className="text-gray-700 text-sm mb-2">
            配置热更新并不是所有配置项都支持，需要根据实际情况评估：
          </p>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>• <strong>支持热更新：</strong>业务参数、开关、阈值等</li>
            <li>• <strong>不支持热更新：</strong>数据源连接、线程池大小、端口等</li>
          </ul>
        </div>

        <h3>1. @RefreshScope 注解</h3>
        <CodeBlock
          language="java"
          code={`// @RefreshScope 原理：
// 配置变更时，Spring Cloud 会销毁旧的 Bean，使用新配置重新创建 Bean
// 这样可以确保使用 @Value 注入的配置能够获取最新值

@RefreshScope
@Component
public class UserService {

    @Value("$\{business.max-order-count\}")
    private Integer maxOrderCount;

    public void processOrder() {
        log.info("当前最大订单数: {}", maxOrderCount);
        // 配置变更后，这个值会自动更新
    }
}

// 注意事项：
// 1. @RefreshScope 会创建代理对象，有一定性能开销
// 2. 单例 Bean 会变更为原型模式（每次配置变更重新创建）
// 3. 不要在 @PostConstruct 方法中依赖可刷新的配置`}
        />

        <h3>2. 自动刷新 vs 手动刷新</h3>
        <CodeBlock
          language="java"
          code={`// 方式1：自动刷新 (推荐)
// 在 bootstrap.yml 中配置
spring:
  cloud:
    nacos:
      config:
        refresh-enabled: true  // 默认即为 true

// 方式2：手动触发刷新
@Autowired
private ContextRefresher contextRefresher;

@PostMapping("/refresh")
public String refresh() {
    contextRefresher.refresh();
    return "配置已刷新";
}

// 方式3：监听配置变更事件
@Component
public class ConfigChangeListener {

    @EventListener
    public void onRefresh(RefreshScopeRefreshedEvent event) {
        log.info("配置已刷新，刷新的 Bean: {}", event.getName());
        // 执行自定义逻辑，如清理缓存等
    }
}`}
        />

        <h3>3. 配置监听器</h3>
        <CodeBlock
          language="java"
          code={`// 监听特定配置的变更
@Component
public class ConfigChangeListener {

    @NacosConfigListener(dataId = "user-service-dev.yaml")
    public void onConfigChange(String newContent) {
        log.info("配置已变更，新内容: {}", newContent);
        // 执行自定义逻辑
    }

    // 监听特定配置项
    @NacosConfigListener(dataId = "user-service-dev.yaml", groupId = "DEFAULT_GROUP")
    public void onConfigItemChange(String newContent) {
        // 解析新配置
        Properties props = new Properties();
        // ... 解析逻辑

        // 更新业务逻辑
        updateBusinessLogic(props);
    }
}`}
        />
      </section>

      {/* 多环境配置 */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">多环境配置管理</h2>

        <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-lg mb-6">
          <h4 className="font-bold text-gray-900 mb-2">💡 命名空间隔离策略</h4>
          <p className="text-gray-700 text-sm">
            通过 Nacos 的命名空间（Namespace）功能，可以完美实现多环境配置隔离。
            每个环境使用独立的命名空间，配置互不影响。
          </p>
        </div>

        <h3>1. 创建命名空间</h3>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <h4 className="font-semibold text-gray-900 mb-2">在 Nacos 控制台操作：</h4>
          <ol className="list-decimal list-inside space-y-1 text-sm text-gray-700">
            <li>进入"命名空间"菜单</li>
            <li>点击"新建命名空间"</li>
            <li>输入命名空间 ID：dev、test、prod</li>
            <li>输入命名空间名称：开发环境、测试环境、生产环境</li>
            <li>点击"确定"</li>
          </ol>
        </div>

        <h3>2. 配置多环境</h3>
        <CodeBlock
          language="yaml"
          code={`# bootstrap-dev.yml (开发环境)
spring:
  profiles:
    active: dev
  cloud:
    nacos:
      config:
        server-addr: nacos-dev.example.com:8848
        namespace: dev  # 开发环境命名空间ID
        group: DEFAULT_GROUP
        file-extension: yaml

# bootstrap-test.yml (测试环境)
spring:
  profiles:
    active: test
  cloud:
    nacos:
      config:
        server-addr: nacos-test.example.com:8848
        namespace: test  # 测试环境命名空间ID
        group: DEFAULT_GROUP
        file-extension: yaml

# bootstrap-prod.yml (生产环境)
spring:
  profiles:
    active: prod
  cloud:
    nacos:
      config:
        server-addr: nacos-prod.example.com:8848
        namespace: prod  # 生产环境命名空间ID
        group: DEFAULT_GROUP
        file-extension: yaml`}
        />

        <h3>3. Data ID 命名规范</h3>
        <CodeBlock
          language="text"
          code={`# 标准格式：$\{spring.application.name\}-\{profile\}.\{file-extension\}

# 示例：
user-service-dev.yaml    # 用户服务开发环境配置
user-service-test.yaml   # 用户服务测试环境配置
user-service-prod.yaml   # 用户服务生产环境配置

# 优点：
# 1. 清晰明确，一眼就知道是哪个服务的哪个环境
# 2. Spring Cloud Alibaba 会自动匹配
# 3. 便于配置管理`}
        />
      </section>

      {/* 共享配置与扩展配置 */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">共享配置与扩展配置</h2>

        <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-lg mb-6">
          <h4 className="font-bold text-gray-900 mb-2">💡 为什么需要共享配置?</h4>
          <p className="text-gray-700 text-sm">
            多个微服务可能需要共享某些配置，如 Redis 连接、通用日志配置、
            公共业务参数等。通过共享配置，避免重复配置，便于统一管理。
          </p>
        </div>

        <h3>1. 共享配置 (shared-configs)</h3>
        <CodeBlock
          language="yaml"
          code={`# bootstrap.yml
spring:
  cloud:
    nacos:
      config:
        server-addr: localhost:8848
        namespace: dev

        # 共享配置 (优先级最低)
        shared-configs:
          # 公共配置
          - data-id: common.yaml
            group: COMMON_GROUP
            refresh: true  # 支持自动刷新

          # Redis 配置
          - data-id: redis-dev.yaml
            group: MIDDLEWARE_GROUP
            refresh: true

          # 日志配置
          - data-id: logback.yaml
            group: COMMON_GROUP
            refresh: false  # 日志配置通常不需要动态刷新`}
        />

        <h3>2. 扩展配置 (extension-configs)</h3>
        <CodeBlock
          language="yaml"
          code={`# bootstrap.yml
spring:
  cloud:
    nacos:
      config:
        # 扩展配置 (优先级介于主配置和共享配置之间)
        extension-configs:
          # 数据源配置
          - data-id: datasource-dev.yaml
            group: INFRA_GROUP
            refresh: true

          # 消息队列配置
          - data-id: rocketmq-dev.yaml
            group: MIDDLEWARE_GROUP
            refresh: true

          # 监控配置
          - data-id: actuator.yaml
            group: COMMON_GROUP
            refresh: true`}
        />

        <h3>3. 配置优先级</h3>
        <div className="bg-purple-50 border-l-4 border-purple-500 p-6 rounded-lg">
          <h4 className="font-bold text-gray-900 mb-3">📊 配置优先级（从高到低）</h4>
          <ol className="list-decimal list-inside space-y-2 text-sm text-gray-700">
            <li><strong>主配置</strong> - user-service-dev.yaml</li>
            <li><strong>扩展配置</strong> - extension-configs（按配置顺序）</li>
            <li><strong>共享配置</strong> - shared-configs（按配置顺序）</li>
            <li><strong>本地配置</strong> - application.yml</li>
          </ol>
          <p className="text-sm text-gray-600 mt-3">
            当多个配置文件中存在相同的配置项时，优先级高的会覆盖优先级低的。
          </p>
        </div>
      </section>

      {/* 配置加密与鉴权 */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">配置加密与鉴权</h2>

        <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-lg mb-6">
          <h4 className="font-bold text-gray-900 mb-2">⚠️ 安全注意事项</h4>
          <p className="text-gray-700 text-sm">
            敏感配置（数据库密码、API 密钥等）不能明文存储在 Nacos 中。
            需要使用加密方案保护敏感信息。
          </p>
        </div>

        <h3>1. 使用 Jasypt 加密</h3>
        <CodeBlock
          language="xml"
          code={`<!-- 添加 Jasypt 依赖 -->
<dependency>
    <groupId>com.github.ulisesbocchio</groupId>
    <artifactId>jasypt-spring-boot-starter</artifactId>
    <version>3.0.5</version>
</dependency>`}
        />

        <CodeBlock
          language="yaml"
          code={`# application.yml
jasypt:
  encryptor:
    password: my-secret-key  # 加密密钥 (建议从环境变量或密钥管理服务获取)
    algorithm: PBEWithMD5AndDES

# Nacos 配置中的加密内容
datasource:
  password: ENC(encrypted_password_here)

# 启动时通过环境变量传入密钥
java -jar user-service.jar --jasypt.encryptor.password=$\{ENCRYPT_PASSWORD\}`}
        />

        <h3>2. Nacos 权限控制</h3>
        <CodeBlock
          language="yaml"
          code={`# 开启 Nacos 认证
# 在 nacos/conf/application.properties 中配置

nacos.core.auth.enabled=true
nacos.core.auth.server.identity.key=nacos
nacos.core.auth.server.identity.value=nacos
nacos.core.auth.plugin.nacos.token.secret.key=YourSecretKey

# 客户端配置
spring:
  cloud:
    nacos:
      config:
        username: nacos  # 认证用户名
        password: nacos  # 认证密码`}
        />
      </section>

      {/* 最佳实践 */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">最佳实践</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <BestPracticeCard3
            title="配置管理"
            practices={[
              "使用命名空间隔离不同环境",
              "Data ID 遵循命名规范",
              "配置项分组管理，按模块划分",
              "定期清理无用的配置版本",
              "重要配置变更前先备份"
            ]}
          />
          <BestPracticeCard3
            title="热更新使用"
            practices={[
              "业务配置优先使用热更新",
              "基础设施配置需要重启服务",
              "使用 @RefreshScope 标记热更新Bean",
              "配置变更后验证服务稳定性",
              "避免频繁变更配置"
            ]}
          />
          <BestPracticeCard3
            title="安全策略"
            practices={[
              "敏感配置必须加密存储",
              "使用 Nacos 权限控制",
              "密钥从环境变量或 KMS 获取",
              "定期更换密钥和密码",
              "配置变更记录审计日志"
            ]}
          />
          <BestPracticeCard3
            title="版本管理"
            practices={[
              "重要配置变更前创建快照",
              "保留最近 10-20 个历史版本",
              "配置回滚前评估影响范围",
              "灰度发布新配置",
              "配置变更通知相关团队"
            ]}
          />
          <BestPracticeCard3
            title="性能优化"
            practices={[
              "合理配置刷新间隔",
              "避免配置文件过大",
              "共享配置按需加载",
              "使用本地缓存减少请求",
              "监控配置推送性能"
            ]}
          />
          <BestPracticeCard3
            title="监控告警"
            practices={[
              "监控配置变更频率",
              "配置变更失败告警",
              "监控配置拉取延迟",
              "记录配置推送日志",
              "设置配置容量告警"
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
            question="配置更新后应用没有生效?"
            answer="可能原因：1) 未添加 @RefreshScope 注解；2) refresh-enabled 配置为 false；
                 3) 配置格式错误导致无法解析；4) 网络问题导致配置未推送成功。
                 检查 bootstrap.yml 中的 refresh-enabled 配置，确保为 true。
                 使用 @Value 注入的配置必须配合 @RefreshScope 才能自动刷新。
                 @ConfigurationProperties 默认支持自动刷新。"
            isOpen={expandedFaq === 1}
            onClick={() => setExpandedFaq(expandedFaq === 1 ? null : 1)}
          />
          <FaqCard2
            number={2}
            question="配置文件加载顺序是什么?"
            answer="Spring Cloud Alibaba Nacos Config 的加载顺序：
                 1) bootstrap.yml (优先级最高，在 application.yml 之前加载)
                 2) Nacos 主配置 (根据 Data ID 匹配)
                 3) Nacos 扩展配置 (extension-configs，按配置顺序)
                 4) Nacos 共享配置 (shared-configs，按配置顺序)
                 5) application.yml (优先级最低)
                 当存在相同配置项时，优先级高的会覆盖优先级低的。"
            isOpen={expandedFaq === 2}
            onClick={() => setExpandedFaq(expandedFaq === 2 ? null : 2)}
          />
          <FaqCard2
            number={3}
            question="如何实现配置的灰度发布?"
            answer="Nacos 支持 Beta 发布功能实现灰度：
                 1) 在配置编辑页面点击&quot;Beta&quot;按钮
                 2) 配置灰度规则（如 IP、标签）
                 3) 发布灰度配置
                 4) 观察灰度效果，逐步扩大灰度范围
                 5) 确认无问题后，正式发布
                 这样可以实现平滑的配置升级，降低风险。"
            isOpen={expandedFaq === 3}
            onClick={() => setExpandedFaq(expandedFaq === 3 ? null : 3)}
          />
          <FaqCard2
            number={4}
            question="配置文件太大怎么办?"
            answer="配置文件过大会影响加载性能，建议：
                 1) 拆分配置文件，按模块或功能划分
                 2) 使用共享配置和扩展配置
                 3) 移除无用的配置项
                 4) 考虑使用配置分组
                 5) 定期清理历史版本
                 单个配置文件建议不超过 100KB。"
            isOpen={expandedFaq === 4}
            onClick={() => setExpandedFaq(expandedFaq === 4 ? null : 4)}
          />
          <FaqCard2
            number={5}
            question="如何实现配置的本地缓存?"
            answer="Nacos 客户端默认会缓存配置到本地，当 Nacos 不可用时使用本地缓存。
                 可以配置缓存策略：
                 spring.cloud.nacos.config.cache-dir=自定义缓存目录
                 spring.cloud.nacos.config.max-retry=重试次数
                 spring.cloud.nacos.config.config-long-poll-timeout=长轮询超时
                 本地缓存可以确保在 Nacos 宕机时服务仍然可以正常运行。"
            isOpen={expandedFaq === 5}
            onClick={() => setExpandedFaq(expandedFaq === 5 ? null : 5)}
          />
          <FaqCard2
            number={6}
            question="如何回滚到历史配置?"
            answer="Nacos 控制台支持配置版本管理：
                 1) 进入配置详情页面
                 2) 点击&quot;历史版本&quot;标签
                 3) 选择要回滚的版本
                 4) 点击&quot;回滚&quot;按钮
                 5) 确认回滚操作
                 建议重要配置变更前先创建快照，便于快速回滚。
                 同时保留合理数量的历史版本（如 10-20 个）。"
            isOpen={expandedFaq === 6}
            onClick={() => setExpandedFaq(expandedFaq === 6 ? null : 6)}
          />
        </div>
      </section>

      {/* 下一步学习 */}
      <section className="bg-gradient-to-r from-orange-600 to-amber-600 text-white p-8 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">🎯 掌握了 Nacos 配置中心,下一步学习什么?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <NextStepCard2 title="Seata" description="分布式事务解决方案" link="/seata" icon="🔗" />
          <NextStepCard2 title="RocketMQ" description="消息队列实战" link="/rocketmq" icon="📨" />
          <NextStepCard2 title="Redis" description="分布式缓存" link="/redis" icon="💾" />
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
    emerald: 'bg-emerald-50 border-emerald-200',
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
    <div className="bg-white border-2 border-orange-200 rounded-lg p-5">
      <h3 className="text-xl font-bold text-gray-900 mb-4">{title}</h3>
      <ul className="space-y-2">
        {practices.map((practice, index) => (
          <li key={index} className="flex items-start">
            <span className="text-orange-600 mr-2 flex-shrink-0">✓</span>
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
