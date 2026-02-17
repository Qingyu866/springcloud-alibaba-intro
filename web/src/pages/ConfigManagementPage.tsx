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

export const ConfigManagementPage: React.FC = () => {
  const [openSection, setOpenSection] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-teal-700 to-teal-900 text-white rounded-lg p-6 mb-8">
        <h1 className="text-4xl font-bold mb-2">配置管理最佳实践</h1>
        <p className="text-teal-100">Nacos 配置中心完整指南</p>
        <div className="flex gap-3 text-sm mt-4">
          <span className="px-3 py-1 bg-white/20 rounded-full">🔧 最佳实践</span>
          <span className="px-3 py-1 bg-white/20 rounded-full">⏱️ 约45分钟</span>
          <span className="px-3 py-1 bg-white/20 rounded-full">📋 7大核心模块</span>
        </div>
      </div>

      {/* Why Config Management */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">为什么需要配置中心？</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white border-l-4 border-blue-500 rounded-lg p-5 shadow-md">
            <h3 className="text-lg font-bold text-gray-900 mb-3">传统配置的问题</h3>
            <ul className="text-sm text-gray-700 space-y-2">
              <li>• <strong>配置分散</strong>：配置文件散落在各个服务</li>
              <li>• <strong>修改困难</strong>：需要重新打包、部署</li>
              <li>• <strong>版本管理</strong>：缺乏配置版本控制</li>
              <li>• <strong>安全隐患</strong>：敏感信息硬编码</li>
              <li>• <strong>环境差异</strong>：开发、测试、生产配置混乱</li>
            </ul>
          </div>
          <div className="bg-white border-l-4 border-green-500 rounded-lg p-5 shadow-md">
            <h3 className="text-lg font-bold text-gray-900 mb-3">配置中心的优势</h3>
            <ul className="text-sm text-gray-700 space-y-2">
              <li>• <strong>集中管理</strong>：统一管理所有配置</li>
              <li>• <strong>动态刷新</strong>：配置变更实时生效</li>
              <li>• <strong>版本控制</strong>：配置历史可追溯</li>
              <li>• <strong>权限控制</strong>：细粒度的访问权限</li>
              <li>• <strong>环境隔离</strong>：多环境配置管理</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Nacos Config Basics */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Nacos 配置中心基础</h2>
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">快速开始</h3>

          <h4 className="font-bold text-gray-900 mb-2">1. 添加依赖</h4>
          <CodeBlock
            language="xml"
            code={`<!-- pom.xml -->
<dependency>
    <groupId>com.alibaba.cloud</groupId>
    <artifactId>spring-cloud-starter-alibaba-nacos-config</artifactId>
</dependency>
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-bootstrap</artifactId>
</dependency>`}
          />

          <h4 className="font-bold text-gray-900 mb-2 mt-6">2. 创建 bootstrap.yml</h4>
          <CodeBlock
            language="yaml"
            code={`spring:
  application:
    name: order-service
  cloud:
    nacos:
      config:
        server-addr: localhost:8848
        namespace: dev  # 开发环境
        group: DEFAULT_GROUP
        file-extension: yaml
        # 共享配置
        shared-configs:
          - dataId: mysql.yaml
            group: DEFAULT_GROUP
            refresh: true
          - dataId: redis.yaml
            group: DEFAULT_GROUP
            refresh: true
        # 扩展配置
        extension-configs:
          - dataId: logback.yaml
            group: DEFAULT_GROUP
            refresh: true`}
          />

          <h4 className="font-bold text-gray-900 mb-2 mt-6">3. 使用配置</h4>
          <CodeBlock
            language="java"
            code={`@RestController
@RefreshScope  // 支持配置动态刷新
public class OrderController {

    @Value("\${order.max-amount:10000}")
    private Integer maxAmount;

    @Value("\${order.timeout:30}")
    private Integer timeout;

    @GetMapping("/config")
    public Map<String, Object> getConfig() {
        Map<String, Object> config = new HashMap<>();
        config.put("maxAmount", maxAmount);
        config.put("timeout", timeout);
        return config;
    }
}`}
          />
        </div>
      </section>

      {/* Configuration Models */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">配置模型</h2>
        <div className="space-y-4">
          <div className="mb-4">
            <button
              onClick={() => setOpenSection(openSection === 'namespace' ? null : 'namespace')}
              className="w-full bg-white border-2 border-blue-300 rounded-lg p-4 flex items-center justify-between hover:bg-blue-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">🏢</span>
                <div className="text-left">
                  <h3 className="text-lg font-bold text-gray-900">命名空间（Namespace）</h3>
                  <p className="text-sm text-gray-600">环境隔离</p>
                </div>
              </div>
              <span className="text-gray-400">&rbrace;</span>
            </button>
            {openSection === 'namespace' && (
              <div className="mt-4 bg-white border border-gray-200 rounded-lg p-6">
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-bold text-blue-900 mb-2">默认命名空间（public）</h4>
                    <p className="text-blue-700 text-sm">所有未指定命名空间的配置都归入 public</p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-bold text-green-900 mb-2">自定义命名空间</h4>
                    <p className="text-green-700 text-sm">用于环境隔离：dev、test、prod</p>
                  </div>
                </div>
                <CodeBlock
                  language="yaml"
                  code={`# 命名空间配置
spring:
  cloud:
    nacos:
      config:
        server-addr: localhost:8848
        # 开发环境
        namespace: dev
        # 或者使用命名空间 ID
        # namespace: a1b2c3d4-e5f6-7890-abcd-ef1234567890`}
                />
              </div>
            )}
          </div>

          <div className="mb-4">
            <button
              onClick={() => setOpenSection(openSection === 'group' ? null : 'group')}
              className="w-full bg-white border-2 border-green-300 rounded-lg p-4 flex items-center justify-between hover:bg-green-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">📁</span>
                <div className="text-left">
                  <h3 className="text-lg font-bold text-gray-900">分组（Group）</h3>
                  <p className="text-sm text-gray-600">业务隔离</p>
                </div>
              </div>
              <span className="text-gray-400">&rbrace;</span>
            </button>
            {openSection === 'group' && (
              <div className="mt-4 bg-white border border-gray-200 rounded-lg p-6">
                <div className="mb-4">
                  <h4 className="font-bold text-gray-900 mb-2">分组使用场景</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-green-50 p-3 rounded">
                      <h5 className="font-bold text-green-900 mb-1">按业务分组</h5>
                      <p className="text-green-700 text-sm">order-group、user-group、payment-group</p>
                    </div>
                    <div className="bg-blue-50 p-3 rounded">
                      <h5 className="font-bold text-blue-900 mb-1">按功能分组</h5>
                      <p className="text-blue-700 text-sm">database-group、cache-group、mq-group</p>
                    </div>
                  </div>
                </div>
                <CodeBlock
                  language="yaml"
                  code={`# 分组配置
spring:
  cloud:
    nacos:
      config:
        server-addr: localhost:8848
        namespace: dev
        group: order-group  # 订单服务分组`}
                />
              </div>
            )}
          </div>

          <div className="mb-4">
            <button
              onClick={() => setOpenSection(openSection === 'dataid' ? null : 'dataid')}
              className="w-full bg-white border-2 border-purple-300 rounded-lg p-4 flex items-center justify-between hover:bg-purple-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">📄</span>
                <div className="text-left">
                  <h3 className="text-lg font-bold text-gray-900">Data ID</h3>
                  <p className="text-sm text-gray-600">配置标识</p>
                </div>
              </div>
              <span className="text-gray-400">&rbrace;</span>
            </button>
            {openSection === 'dataid' && (
              <div className="mt-4 bg-white border border-gray-200 rounded-lg p-6">
                <div className="mb-4">
                  <h4 className="font-bold text-gray-900 mb-2">Data ID 命名规范</h4>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <p className="text-purple-800 font-mono text-sm mb-2">
                      &lt;spring.application.name&gt;-&lt;profile&gt;.&lt;file-extension&gt;
                    </p>
                    <p className="text-purple-700 text-sm">
                      例如：order-service-dev.yaml
                    </p>
                  </div>
                </div>
                <CodeBlock
                  language="yaml"
                  code={`# 常见的 Data ID 示例
# 1. 应用配置
order-service.yaml           # 默认配置
order-service-dev.yaml       # 开发环境
order-service-test.yaml      # 测试环境
order-service-prod.yaml      # 生产环境

# 2. 公共配置
mysql.yaml                   # 数据库配置
redis.yaml                   # 缓存配置
rabbitmq.yaml                # 消息队列配置

# 3. 功能模块配置
logback-spring.xml           # 日志配置
swagger.yaml                 # API 文档配置`}
                />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Dynamic Refresh */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">动态配置刷新</h2>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">@RefreshScope 注解</h3>
          <p className="text-gray-700 mb-6">
            使用 @RefreshScope 注解标记的 Bean，在配置变更时会自动刷新，无需重启服务。
          </p>

          <h4 className="font-bold text-gray-900 mb-2">基础用法</h4>
          <CodeBlock
            language="java"
            code={`@RestController
@RefreshScope  // 核心注解：启用配置动态刷新
public class ConfigController {

    @Value("\${app.title:Default Title}")
    private String appTitle;

    @Value("\${app.version:1.0.0}")
    private String appVersion;

    @GetMapping("/app-info")
    public Map<String, String> getAppInfo() {
        Map<String, String> info = new HashMap<>();
        info.put("title", appTitle);
        info.put("version", appVersion);
        info.put("timestamp", Instant.now().toString());
        return info;
    }
}`}
          />

          <h4 className="font-bold text-gray-900 mb-2 mt-6">配置类动态刷新</h4>
          <CodeBlock
            language="java"
            code={`@Component
@RefreshScope
@ConfigurationProperties(prefix = "order")
@Data
public class OrderProperties {

    private Integer maxAmount = 10000;
    private Integer timeout = 30;
    private List<String> whitelist = new ArrayList<>();
    private Map<String, String> features = new HashMap<>();
}

// 使用
@Service
@RequiredArgsConstructor
public class OrderService {

    private final OrderProperties orderProperties;

    public void createOrder(OrderRequest request) {
        // 配置会自动刷新，无需重启
        if (request.getAmount() &gt; orderProperties.getMaxAmount()) {
            throw new BusinessException("订单金额超限");
        }

        // 使用其他配置
        List<String&gt; whitelist = orderProperties.getWhitelist();
        String feature = orderProperties.getFeatures().get("new-order");
    }
}`}
          />

          <div className="mt-6 bg-yellow-50 p-4 rounded-lg">
            <h4 className="font-bold text-yellow-900 mb-2">⚠️ 注意事项</h4>
            <ul className="text-yellow-800 text-sm space-y-1">
              <li>• @RefreshScope 会创建代理对象，有一定性能开销</li>
              <li>• 不要在 @Configuration 类中使用 @RefreshScope</li>
              <li>• 静态变量不会被自动刷新</li>
              <li>• 刷新后，原有 Bean 会被销毁并重新创建</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Configuration Encryption */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">配置加密</h2>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">敏感数据加密</h3>
          <p className="text-gray-700 mb-6">
            数据库密码、API Key 等敏感信息需要加密存储，Nacos 支持配置加密。
          </p>

          <h4 className="font-bold text-gray-900 mb-2">使用 Jasypt 加密</h4>
          <CodeBlock
            language="xml"
            code={`<!-- pom.xml -->
<dependency>
    <groupId>com.github.ulisesbocchio</groupId>
    <artifactId>jasypt-spring-boot-starter</artifactId>
    <version>3.0.5</version>
</dependency>`}
          />

          <h4 className="font-bold text-gray-900 mb-2 mt-4">配置文件</h4>
          <CodeBlock
            language="yaml"
            code={`# application.yml
jasypt:
  encryptor:
    password: my-secret-key  # 加密密钥（生产环境建议通过环境变量或启动参数传入）
    algorithm: PBEWithMD5AndDES
    iv-generator-classname: org.jasypt.iv.NoIvGenerator

# Nacos 配置（加密后的值）
spring:
  datasource:
    password: ENC(xG8fN2q4xH7wK9mP3sT6vY1zA5bC8dF)  # 加密后的密码
  redis:
    password: ENC(yH7jK9mN2pQ4rS6tU8vW1xY3zA5bC7d)`}
          />

          <h4 className="font-bold text-gray-900 mb-2 mt-4">加密工具类</h4>
          <CodeBlock
            language="java"
            code={`@RunWith(SpringRunner.class)
@SpringBootTest
public class JasyptEncryptorTest {

    @Autowired
    private StringEncryptor stringEncryptor;

    @Test
    public void encryptPassword() {
        String plainText = "MyDatabasePassword123";
        String encrypted = stringEncryptor.encrypt(plainText);
        System.out.println("Encrypted: " + encrypted);

        // 解密验证
        String decrypted = stringEncryptor.decrypt(encrypted);
        System.out.println("Decrypted: " + decrypted);
        assertThat(decrypted).isEqualTo(plainText);
    }
}`}
          />

          <div className="mt-6 bg-red-50 p-4 rounded-lg">
            <h4 className="font-bold text-red-900 mb-2">🔐 安全建议</h4>
            <ul className="text-red-800 text-sm space-y-1">
              <li>• 加密密钥通过环境变量传入，不要硬编码</li>
              <li>• 生产环境使用独立的密钥管理服务（如 KMS）</li>
              <li>• 定期轮换密钥和敏感密码</li>
              <li>• 使用高强度的加密算法（如 AES-256）</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Best Practices */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">最佳实践</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white border-l-4 border-blue-500 rounded-lg p-5 shadow-md">
            <h3 className="text-lg font-bold text-gray-900 mb-3">✅ 应该做</h3>
            <ul className="text-sm text-gray-700 space-y-2">
              <li>• <strong>命名空间隔离</strong>：不同环境使用不同命名空间</li>
              <li>• <strong>合理分组</strong>：按业务或功能模块分组</li>
              <li>• <strong>版本管理</strong>：重要配置变更前先备份</li>
              <li>• <strong>配置校验</strong>：配置变更后进行验证</li>
              <li>• <strong>灰度发布</strong>：配置变更逐步发布</li>
              <li>• <strong>敏感信息加密</strong>：密码、Key 必须加密</li>
              <li>• <strong>文档维护</strong>：保持配置文档与代码同步</li>
            </ul>
          </div>
          <div className="bg-white border-l-4 border-red-500 rounded-lg p-5 shadow-md">
            <h3 className="text-lg font-bold text-gray-900 mb-3">❌ 不应该做</h3>
            <ul className="text-sm text-gray-700 space-y-2">
              <li>• <strong>不要硬编码配置</strong>：所有配置应外部化</li>
              <li>• <strong>避免配置泄漏</strong>：不要在日志中打印敏感配置</li>
              <li>• <strong>不要频繁修改</strong>：减少配置变更频率</li>
              <li>• <strong>避免配置冲突</strong>：注意共享配置的优先级</li>
              <li>• <strong>不要忽视版本</strong>：重要配置要有版本记录</li>
              <li>• <strong>避免生产直接修改</strong>：生产环境配置变更要有审批</li>
              <li>• <strong>不要忽视回滚</strong>：配置变更后要有回滚预案</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Configuration Priority */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">配置优先级</h2>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Nacos 配置加载优先级</h3>
          <p className="text-gray-700 mb-6">
            当多个配置文件中存在相同配置时，优先级从高到低如下：
          </p>

          <div className="space-y-3">
            {[
              { level: '1', desc: '主配置（spring.cloud.nacos.config.server-addr 指定的 Data ID）', priority: '最高' },
              { level: '2', desc: '扩展配置（extension-configs，索引越大优先级越高）', priority: '高' },
              { level: '3', desc: '共享配置（shared-configs，索引越大优先级越高）', priority: '中' },
              { level: '4', desc: '本地配置文件（application.yml、bootstrap.yml）', priority: '低' },
            ].map((item) => (
              <div key={item.level} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                <div className="bg-indigo-600 text-white font-bold px-3 py-1 rounded">
                  {item.level}
                </div>
                <div className="flex-1">
                  <div className="text-sm text-gray-900">{item.desc}</div>
                  <div className="text-xs text-gray-600">优先级：{item.priority}</div>
                </div>
              </div>
            ))}
          </div>

          <h4 className="font-bold text-gray-900 mb-2 mt-6">配置示例</h4>
          <CodeBlock
            language="yaml"
            code={`spring:
  cloud:
    nacos:
      config:
        server-addr: localhost:8848
        # 1. 主配置（优先级最高）
        file-extension: yaml

        # 2. 扩展配置（优先级：logback &gt; mysql &gt; redis）
        extension-configs:
          - dataId: redis.yaml
            group: DEFAULT_GROUP
            refresh: true
          - dataId: mysql.yaml
            group: DEFAULT_GROUP
            refresh: true
          - dataId: logback.yaml
            group: DEFAULT_GROUP
            refresh: true

        # 3. 共享配置（优先级：common2 &gt; common1）
        shared-configs:
          - dataId: common1.yaml
            group: DEFAULT_GROUP
            refresh: true
          - dataId: common2.yaml
            group: DEFAULT_GROUP
            refresh: true

# 4. 本地配置（优先级最低）
app:
  name: order-service`}
          />
        </div>
      </section>

      {/* FAQ */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">常见问题</h2>
        <div className="space-y-4">
          {[
            {
              q: "配置修改后多久生效？",
              a: "Nacos 默认配置刷新间隔为 30 秒，可以通过 spring.cloud.nacos.config.refresh-enabled=false 关闭自动刷新。使用 @RefreshScope 注解的 Bean 会在配置变更后自动刷新。"
            },
            {
              q: "如何回滚配置？",
              a: "Nacos 支持配置版本管理，在 Nacos 控制台可以查看历史版本并回滚到任意版本。建议重要配置变更前先备份，或者使用 Nacos 的配置历史功能。"
            },
            {
              q: "配置中心挂了怎么办？",
              a: "Nacos 客户端会缓存配置到本地，即使 Nacos 服务端不可用，应用仍可使用缓存配置启动。但此时无法获取配置更新，需等待 Nacos 恢复。"
            },
            {
              q: "如何实现配置的灰度发布？",
              a: "可以使用 Nacos 的 Beta 功能，或者创建多个配置（如 order-service.yaml、order-service-beta.yaml），通过灰度规则控制哪些服务实例使用新配置。"
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
          <a href="/nacos-config" className="block bg-teal-50 hover:bg-teal-100 border border-teal-200 rounded-lg p-6 transition-colors">
            <h3 className="text-xl font-bold text-teal-900 mb-2">Nacos 配置中心</h3>
            <p className="text-teal-700">深入理解 Nacos 配置管理</p>
          </a>
          <a href="/exception-handling" className="block bg-green-50 hover:bg-green-100 border border-green-200 rounded-lg p-6 transition-colors">
            <h3 className="text-xl font-bold text-green-900 mb-2">异常处理</h3>
            <p className="text-green-700">统一异常处理机制</p>
          </a>
          <a href="/testing-strategy" className="block bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg p-6 transition-colors">
            <h3 className="text-xl font-bold text-blue-900 mb-2">测试策略</h3>
            <p className="text-blue-700">微服务测试最佳实践</p>
          </a>
        </div>
      </section>
    </div>
  );
};
