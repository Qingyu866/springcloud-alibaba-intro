import { useState } from 'react';
import { CodeBlock } from '../components';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: string;
  color: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, icon, color }) => {
  const colorClasses = {
    blue: 'bg-blue-50 border-blue-200',
    green: 'bg-green-50 border-green-200',
    purple: 'bg-purple-50 border-purple-200',
    red: 'bg-red-50 border-red-200',
  };

  return (
    <div className={`p-5 border-2 rounded-lg ${colorClasses[color as keyof typeof colorClasses]}`}>
      <div className="flex items-center mb-3">
        <span className="text-3xl mr-3">{icon}</span>
        <h3 className="text-xl font-bold text-gray-900">{title}</h3>
      </div>
      <p className="text-gray-700">{description}</p>
    </div>
  );
};

interface PracticeCardProps {
  title: string;
  practices: string[];
}

const PracticeCard: React.FC<PracticeCardProps> = ({ title, practices }) => (
  <div className="bg-white border-2 border-slate-200 rounded-lg p-5">
    <h3 className="text-lg font-bold text-gray-900 mb-3">{title}</h3>
    <ul className="space-y-2">
      {practices.map((practice, index) => (
        <li key={index} className="flex items-start">
          <span className="text-green-600 mr-2 flex-shrink-0">✓</span>
          <span className="text-sm text-gray-700">{practice}</span>
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

export const ConfigAdvancedPage: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="bg-gradient-to-r from-slate-700 to-slate-900 text-white rounded-lg p-6 mb-8">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-4xl font-bold mb-2">配置管理高级</h1>
            <p className="text-slate-200 text-lg">微服务配置管理进阶与实践</p>
          </div>
          <div className="flex gap-3 text-sm">
            <span className="px-3 py-1 bg-white/20 rounded-full">🏗️ 架构师</span>
            <span className="px-3 py-1 bg-white/20 rounded-full">⏱️ 约70分钟</span>
            <span className="px-3 py-1 bg-white/20 rounded-full">📚 12个知识点</span>
          </div>
        </div>
      </div>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">配置管理高级特性</h2>

        <div className="bg-white border-2 border-blue-200 rounded-lg p-6 mb-6">
          <p className="text-gray-700 text-lg mb-4">
            微服务架构中，<strong>配置管理</strong>是核心基础设施之一。
            高级配置管理不仅需要集中化管理，还需要考虑<strong className="text-blue-600">安全性、版本控制、灰度发布、动态刷新</strong>等企业级特性。
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <FeatureCard
              title="配置加密"
              description="敏感配置加密存储，运行时解密"
              icon="🔒"
              color="red"
            />
            <FeatureCard
              title="版本控制"
              description="配置变更历史追溯和一键回滚"
              icon="📝"
              color="blue"
            />
            <FeatureCard
              title="灰度发布"
              description="按用户/地域/标签灰度推送配置"
              icon="🚀"
              color="green"
            />
            <FeatureCard
              title="配置监听"
              description="配置变更自动推送，应用热更新"
              icon="👂"
              color="purple"
            />
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">1. 配置加密</h2>

        <div className="space-y-6">
          <div className="bg-white border-2 border-red-200 rounded-lg p-6">
            <h3 className="text-2xl font-bold text-red-900 mb-4">为什么需要配置加密？</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-red-50 p-4 rounded">
                <h4 className="font-bold text-red-700 mb-2">⚠️ 安全风险</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• 数据库密码明文存储</li>
                  <li>• API Key 泄露</li>
                  <li>• 第三方密钥暴露</li>
                  <li>• Git 历史记录泄露</li>
                </ul>
              </div>

              <div className="bg-green-50 p-4 rounded">
                <h4 className="font-bold text-green-700 mb-2">✅ 加密方案</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Jasypt 加密</li>
                  <li>• Nacos 配置加密</li>
                  <li>• Vault 密钥管理</li>
                  <li>• KMS 云密钥服务</li>
                </ul>
              </div>
            </div>

            <h4 className="font-bold text-gray-900 mb-2">方案1: Jasypt 加密</h4>
            <CodeBlock
              language="xml"
              code={`<!-- pom.xml -->
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
    password: $\{JASYPT_ENCRYPTOR_PASSWORD} # 从环境变量读取
    algorithm: PBEWithMD5AndDES
    iv-generator-classname: org.jasypt.iv.NoIvGenerator

# 加密配置
datasource:
  password: ENC(encrypted_password_here)

# 命令行生成加密字符串
# java -cp jasypt-1.9.3.jar org.jasypt.intf.cli.JasyptPBEStringEncryptionCLI \
#   input="my_secret_password" password=secret_key algorithm=PBEWithMD5AndDES`}
            />
          </div>

          <div className="bg-white border-2 border-blue-200 rounded-lg p-6">
            <h3 className="text-2xl font-bold text-blue-900 mb-4">方案2: Nacos 配置加密</h3>

            <CodeBlock
              language="yaml"
              code={`# Nacos Console 配置加密
# 1. 创建配置时选择"加密"类型
# 2. 配置内容自动加密存储
# 3. 客户端自动解密

# bootstrap.yml
spring:
  cloud:
    nacos:
      config:
        server-addr: localhost:8848
        namespace: prod
        group: DEFAULT_GROUP
        # 启用配置加密
        cipher: true
        cipher-key: $\{NACOS_CIPHER_KEY} # 密钥从环境变量读取

# 加密配置示例
datasource:
  password: cipher(AQIDBAUGBwgJCgsMDQ4OD==)`}
            />

            <div className="mt-4 bg-yellow-50 p-4 rounded border border-yellow-200">
              <h4 className="font-bold text-yellow-900 mb-2">💡 最佳实践</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• 密钥从环境变量读取，不写入配置文件</li>
                <li>• 不同环境使用不同密钥</li>
                <li>• 定期轮换密钥</li>
                <li>• 使用云 KMS 服务管理密钥</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">2. 配置版本控制</h2>

        <div className="bg-white border-2 border-green-200 rounded-lg p-6 mb-6">
          <h3 className="text-2xl font-bold text-green-900 mb-4">Git + Nacos 配置管理</h3>

          <p className="text-gray-700 mb-4">
            将配置文件纳入 Git 版本控制，通过 CI/CD 自动部署到 Nacos，实现配置的<strong>版本追溯、审计、回滚</strong>。
          </p>

          <CodeBlock
            language="bash"
            code={`# 项目结构
config/
├── dev/
│   ├── application.yaml
│   ├── datasource.yaml
│   └── redis.yaml
├── test/
│   └── ...
└── prod/
    └── ...

# 部署脚本 deploy-config.sh
#!/bin/bash

ENV=$1
CONFIG_DIR="config/$\{ENV\}"

# 遍历配置文件
for config_file in $\{CONFIG_DIR\}/*.yaml; do
  filename=$(basename "$config_file")
  data_id="$\{filename%.*\}"

  # 发布到 Nacos
  curl -X POST "http://nacos:8848/nacos/v1/cs/configs" \
    -d "dataId=$\{data_id\}" \
    -d "group=DEFAULT_GROUP" \
    -d "content=$(cat $\{config_file\} | base64)" \
    -d "type=yaml"
done

echo "✓ Config deployed to $\{ENV\}"`}
          />
        </div>

        <div className="bg-white border-2 border-blue-200 rounded-lg p-6">
          <h3 className="text-2xl font-bold text-blue-900 mb-4">Nacos 配置历史与回滚</h3>

          <div className="space-y-4">
            <div>
              <h4 className="font-bold text-gray-900 mb-2">查看配置历史</h4>
              <CodeBlock
                language="bash"
                code={`# 获取配置历史
curl -X GET "http://nacos:8848/nacos/v1/cs/historys" \
  -d "dataId=application.yaml" \
  -d "group=DEFAULT_GROUP" \
  -d "tenant=prod"

# 响应示例
{
  "pageItems": [
    {
      "id": 123,
      "dataId": "application.yaml",
      "group": "DEFAULT_GROUP",
      "content": "spring:...",
      "md5": "abc123",
      "createdTime": "2024-01-01T00:00:00"
    }
  ]
}`}
              />
            </div>

            <div>
              <h4 className="font-bold text-gray-900 mb-2">配置回滚</h4>
              <CodeBlock
                language="bash"
                code={`# 回滚到指定版本
curl -X POST "http://nacos:8848/nacos/v1/cs/configs" \
  -d "dataId=application.yaml" \
  -d "group=DEFAULT_GROUP" \
  -d "tenant=prod" \
  -d "casMd5=abc123"  # 目标版本的 MD5
  -d "content=spring:..." # 历史配置内容`}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">3. 灰度发布配置</h2>

        <div className="bg-white border-2 border-purple-200 rounded-lg p-6 mb-6">
          <h3 className="text-2xl font-bold text-purple-900 mb-4">灰度发布策略</h3>

          <p className="text-gray-700 mb-4">
            灰度发布允许部分用户使用新配置，验证无问题后全量发布，降低配置变更风险。
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="bg-purple-50 p-4 rounded">
              <h4 className="font-bold text-purple-900 mb-2">按标签灰度</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• user.tag = beta</li>
                <li>• user.region = us-east</li>
                <li>• user.version = v2</li>
              </ul>
            </div>
            <div className="bg-purple-50 p-4 rounded">
              <h4 className="font-bold text-purple-900 mb-2">按 IP 灰度</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• 指定 IP 列表</li>
                <li>• IP 段匹配</li>
                <li>• 机房灰度</li>
              </ul>
            </div>
          </div>

          <CodeBlock
            language="yaml"
            code={`# Nacos 灰度配置

# 主配置 (全量)
Data ID: application.yaml
Group: DEFAULT_GROUP
Content:
  feature:
    new_ui: false
    cache_strategy: redis

# 灰度配置 (beta 用户)
Data ID: application.yaml
Group: DEFAULT_GROUP
Tag: beta
Content:
  feature:
    new_ui: true
    cache_strategy: redis

# 客户端使用
@SpringBootApplication
public class Application {
    public static void main(String[] args) {
        // 根据用户标签选择配置
        System.setProperty("spring.cloud.nacos.config.tag", "beta");
        SpringApplication.run(Application.class, args);
    }
}`}
          />
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">4. 配置热更新</h2>

        <div className="space-y-6">
          <div className="bg-white border-2 border-orange-200 rounded-lg p-6">
            <h3 className="text-2xl font-bold text-orange-900 mb-4">@RefreshScope 原理</h3>

            <p className="text-gray-700 mb-4">
              <code>@RefreshScope</code> 注解的 Bean 会在配置变更时销毁并重新创建，从而实现配置热更新。
            </p>

            <CodeBlock
              language="java"
              code={`@RefreshScope
@RestController
@RequestMapping("/api/config")
public class ConfigController {

    @Value("$\{app.feature.enabled:false}")
    private Boolean featureEnabled;

    @Value("$\{app.limit.max:100}")
    private Integer maxLimit;

    /**
     * 配置变更时：
     * 1. Nacos 推送变更事件
     * 2. @RefreshScope Bean 销毁
     * 3. 重新创建 Bean，注入新值
     * 4. 下次请求使用新配置
     */
    @GetMapping("/feature")
    public Result getFeatureStatus() {
        return Result.success(featureEnabled);
    }

    @GetMapping("/limit")
    public Result getMaxLimit() {
        return Result.success(maxLimit);
    }
}`}
            />
          </div>

          <div className="bg-white border-2 border-blue-200 rounded-lg p-6">
            <h3 className="text-2xl font-bold text-blue-900 mb-4">配置监听器</h3>

            <CodeBlock
              language="java"
              code={`@Component
public class ConfigChangeListener {

    @NacosConfigListener(dataId = "application.yaml", groupId = "DEFAULT_GROUP")
    public void onConfigChange(String newContent) {
        log.info("配置已变更: {}", newContent);

        // 自定义处理逻辑
        // 1. 验证配置格式
        // 2. 通知相关组件
        // 3. 更新缓存
        // 4. 发送告警

        // 示例：动态更新线程池大小
        updateThreadPoolSize(newContent);
    }

    private void updateThreadPoolSize(String config) {
        YAMLParser parser = new YAMLParser();
        Map<String, Object> configMap = parser.load(config);

        int coreSize = (int) configMap.get("thread.pool.core.size");
        int maxSize = (int) configMap.get("thread.pool.max.size");

        threadPool.setCorePoolSize(coreSize);
        threadPool.setMaximumPoolSize(maxSize);

        log.info("线程池已更新: core={}, max={}", coreSize, maxSize);
    }
}`}
            />
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">配置管理最佳实践</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <PracticeCard
            title="✅ 推荐做法"
            practices={[
              '敏感配置加密存储',
              '配置文件纳入版本控制',
              '使用环境变量区分环境',
              '配置变更走 CR 审批',
              '定期回滚演练',
              '配置变更监控告警',
              '密钥定期轮换',
              '使用配置中心统一管理'
            ]}
          />
          <PracticeCard
            title="❌ 避免做法"
            practices={[
              '密码明文写入配置文件',
              '配置文件提交到 Git',
              '直接修改生产配置',
              '配置与代码耦合',
              '忽略配置版本管理',
              '密钥硬编码',
              '所有环境共享配置',
              '配置变更不测试直接上生产'
            ]}
          />
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">常见问题</h2>

        <div className="space-y-4">
          <FaqCard
            number={1}
            question="如何安全地管理生产环境配置？"
            answer={"生产环境配置管理策略：\n\n1. 配置加密\n   - 使用 Jasypt 或 Nacos 加密\n   - 密钥从环境变量读取\n   - 不将密钥写入代码\n\n2. 访问控制\n   - Nacos 开启认证\n   - RBAC 权限控制\n   - 操作审计日志\n\n3. 环境隔离\n   - dev/test/prod 命名空间隔离\n   - 不同环境不同密钥\n   - 配置文件不混用\n\n4. 应急预案\n   - 配置备份\n   - 快速回滚机制\n   - 配置锁保护"}
            isOpen={openFaq === 1}
            onClick={() => toggleFaq(1)}
          />

          <FaqCard
            number={2}
            question="配置热更新会不会影响正在运行的请求？"
            answer={"@RefreshScope 的热更新机制：\n\n【不影响正在运行的请求】\n- Bean 的销毁和重建在配置变更时异步执行\n- 正在处理的请求会继续使用旧 Bean 直到完成\n- 新请求会使用新配置的 Bean\n\n【注意事项】\n1. 状态丢失：Bean 重建时实例变量会丢失\n   - 避免：将状态存放在 Bean 实例变量中\n   - 推荐：使用 Redis 或数据库存储状态\n\n2. 性能影响：频繁更新会增加 GC 压力\n   - 避免：频繁的配置变更\n   - 推荐：批量更新配置\n\n3. 并发问题：重建期间可能出现短暂数据不一致\n   - 使用版本号控制\n   - 实现幂等性"}
            isOpen={openFaq === 2}
            onClick={() => toggleFaq(2)}
          />

          <FaqCard
            number={3}
            question="如何实现配置的蓝绿发布？"
            answer={"蓝绿发布配置方案：\n\n【方案1: 基于 Nacos 命名空间】\n- blue 命名空间：当前生产配置\n- green 命名空间：新版本配置\n- 一次性切换流量\n\n【方案2: 基于标签】\n- 80% 流量使用 tag=stable\n- 20% 流量使用 tag=canary\n- 验证后调整流量比例\n\n【实施步骤】\n1. 部署绿色环境（新配置）\n2. 灰度 10% 流量验证\n3. 逐步放量到 100%\n4. 蓝色环境下线\n\n【回滚方案】\n- 一键切换标签流量\n- Nacos 配置快速回滚\n\n【实战案例】\nSpring Cloud Gateway 路由配置蓝绿发布：\n- 绿色环境：新路由规则\n- 验证无问题后全量切换"}
            isOpen={openFaq === 3}
            onClick={() => toggleFaq(3)}
          />
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">下一步学习</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <a href="/docker-deployment" className="block bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-200 rounded-lg p-6 hover:shadow-lg transition">
            <h3 className="text-xl font-bold text-blue-900 mb-2">🐳 Docker 部署</h3>
            <p className="text-gray-700 text-sm">容器化部署实战</p>
          </a>
          <a href="/k8s-deployment" className="block bg-gradient-to-br from-purple-50 to-purple-100 border-2 border-purple-200 rounded-lg p-6 hover:shadow-lg transition">
            <h3 className="text-xl font-bold text-purple-900 mb-2">☸️ Kubernetes 部署</h3>
            <p className="text-gray-700 text-sm">K8s 生产环境部署</p>
          </a>
        </div>
      </section>
    </div>
  );
};
