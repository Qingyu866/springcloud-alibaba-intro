import { CodeBlock } from '../components';
import React from 'react';

export const NacosDiscoveryPage: React.FC = () => {
  return (
    <div className="prose prose-slate max-w-none">
      {/* 页面头部 */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-lg p-6 mb-8">
        <div className="flex items-center mb-2">
          <span className="text-3xl mr-3">🎯</span>
          <h1 className="text-3xl font-bold">Nacos 服务注册与发现</h1>
        </div>
        <p className="text-lg opacity-90">
          微服务架构的核心基础设施 - 服务的"电话簿"
        </p>
        <div className="mt-4 flex items-center gap-4 text-sm">
          <span className="px-2 py-1 bg-white/20 rounded">🌱 新手友好</span>
          <span className="px-2 py-1 bg-white/20 rounded">⏱️ 2-3天</span>
          <span className="px-2 py-1 bg-white/20 rounded">📝 8个知识点</span>
        </div>
      </div>

      {/* 什么是 Nacos */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">什么是 Nacos?</h2>

        <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-lg mb-6">
          <p className="text-lg text-gray-700 mb-3">
            <strong>Nacos</strong> 是阿里巴巴开源的一个更易于构建云原生应用的动态服务发现、配置管理和服务管理平台。
          </p>
          <p className="text-gray-700">
            Nacos = <strong>NA</strong>ming and <strong>Co</strong>nfiguration <strong>S</strong>ervice
          </p>
        </div>

        <h3 className="text-2xl font-bold text-gray-800 mb-4">核心功能</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <FeatureCard
            icon="📝"
            title="服务注册与发现"
            description="动态服务注册与发现,支持多种注册方式"
          />
          <FeatureCard
            icon="⚙️"
            title="动态配置服务"
            description="配置中心,支持配置的版本管理和灰度发布"
          />
          <FeatureCard
            icon="🔍"
            title="动态 DNS 服务"
            description="支持权重路由,轻松实现中间件负载均衡"
          />
          <FeatureCard
            icon="🏥"
            title="服务及其元数据管理"
            description="从微服务平台视角管理服务"
          />
        </div>
      </section>

      {/* 为什么需要服务发现 */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">为什么需要服务发现?</h2>

        <p className="text-lg text-gray-700 mb-6">
          在微服务架构中,服务数量众多且动态变化,服务发现解决了"如何找到服务"这个核心问题。
        </p>

        <div className="bg-gray-50 p-6 rounded-lg mb-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">传统方式 vs 服务发现</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-bold text-red-600 mb-3">❌ 传统方式(硬编码)</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">✗</span>
                  <span>IP地址硬编码在配置文件中</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">✗</span>
                  <span>服务变更需要重启应用</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">✗</span>
                  <span>无法实现负载均衡</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">✗</span>
                  <span>运维成本高,容易出错</span>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-green-600 mb-3">✅ 服务发现</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>服务自动注册,动态发现</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>服务变更自动感知</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>轻松实现负载均衡</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>降低运维成本</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* 服务发现流程图 */}
        <div className="bg-white border-2 border-gray-200 p-6 rounded-lg">
          <h4 className="font-bold text-gray-900 mb-4">服务发现流程</h4>
          <div className="space-y-3">
            <ProcessStep
              step="1"
              title="服务提供者启动"
              description="向 Nacos 注册自己的 IP 和端口"
              color="blue"
            />
            <ProcessStep
              step="2"
              title="服务消费者启动"
              description="从 Nacos 拉取服务列表"
              color="green"
            />
            <ProcessStep
              step="3"
              title="发起调用"
              description="使用负载均衡策略选择一个实例"
              color="purple"
            />
            <ProcessStep
              step="4"
              title="健康检查"
              description="Nacos 定期检查服务健康状态"
              color="orange"
            />
          </div>
        </div>
      </section>

      {/* 快速开始 */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">快速开始</h2>

        <h3 className="text-xl font-bold text-gray-800 mb-4">步骤 1: 启动 Nacos 服务器</h3>
        <CodeBlock
          language="bash"
          code={`# 下载 Nacos
wget https://github.com/alibaba/nacos/releases/download/2.2.3/nacos-server-2.2.3.tar.gz
tar -xvf nacos-server-2.2.3.tar.gz
cd nacos/bin

# 单机模式启动
sh startup.sh -m standalone

# Windows 使用: cmd startup.cmd -m standalone

# 访问控制台
# http://localhost:8848/nacos
# 默认账号密码: nacos/nacos`}
        />

        <h3 className="text-xl font-bold text-gray-800 mb-4 mt-6">步骤 2: 添加依赖</h3>
        <CodeBlock
          language="xml"
          code={`<dependencies>
    <!-- Spring Cloud Alibaba Nacos Discovery -->
    <dependency>
        <groupId>com.alibaba.cloud</groupId>
        <artifactId>spring-cloud-starter-alibaba-nacos-discovery</artifactId>
        <version>2023.0.1.0</version>
    </dependency>

    <!-- Spring Boot Starter Web -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
    </dependency>
</dependencies>

<dependencyManagement>
    <dependencies>
        <dependency>
            <groupId>com.alibaba.cloud</groupId>
            <artifactId>spring-cloud-alibaba-dependencies</artifactId>
            <version>2023.0.1.0</version>
            <type>pom</type>
            <scope>import</scope>
        </dependency>
    </dependencies>
</dependencyManagement>`}
        />

        <h3 className="text-xl font-bold text-gray-800 mb-4 mt-6">步骤 3: 配置文件</h3>
        <CodeBlock
          language="yaml"
          filename="application.yml"
          code={`server:
  port: 8080

spring:
  application:
    name: service-provider  # 服务名称
  cloud:
    nacos:
      discovery:
        server-addr: localhost:8848  # Nacos 服务器地址
        namespace: public             # 命名空间
        group: DEFAULT_GROUP           # 分组
        metadata:
          version: 1.0.0               # 版本号
          region: beijing              # 自定义元数据`}
        />

        <h3 className="text-xl font-bold text-gray-800 mb-4 mt-6">步骤 4: 启动类</h3>
        <CodeBlock
          language="java"
          filename="ProviderApplication.java"
          code={`package com.example.provider;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@SpringBootApplication
@EnableDiscoveryClient  // 启用服务发现
public class ProviderApplication {

    public static void main(String[] args) {
        SpringApplication.run(ProviderApplication.class, args);
        System.out.println("服务提供者启动成功!");
    }
}`}
        />

        <h3 className="text-xl font-bold text-gray-800 mb-4 mt-6">步骤 5: 提供服务接口</h3>
        <CodeBlock
          language="java"
          filename="EchoController.java"
          code={`package com.example.provider;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/echo")
public class EchoController {

    @GetMapping("/{string}")
    public String echo(@PathVariable String string) {
        return "Hello Nacos Discovery: " + string;
    }

    @GetMapping("/info")
    public String info() {
        return "服务信息: " + System.getenv().getOrDefault("HOSTNAME", "localhost");
    }
}`}
        />

        <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mt-6">
          <p className="text-gray-700">
            <strong>💡 提示:</strong> 启动应用后,访问 Nacos 控制台{' '}
            <code>http://localhost:8848/nacos</code>,
            在"服务管理 → 服务列表"中可以看到已注册的服务!
          </p>
        </div>
      </section>

      {/* 服务消费 */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">服务消费</h2>

        <p className="text-lg text-gray-700 mb-6">
          服务消费者需要从 Nacos 获取服务列表,然后发起调用。有三种方式实现服务调用。
        </p>

        {/* 方式对比 */}
        <div className="overflow-x-auto mb-6">
          <table className="min-w-full divide-y divide-gray-200 border border-gray-300">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  方式
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  优点
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  缺点
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  推荐度
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 text-sm text-gray-900">RestTemplate + DiscoveryClient</td>
                <td className="px-6 py-4 text-sm text-gray-600">简单直接</td>
                <td className="px-6 py-4 text-sm text-gray-600">代码繁琐</td>
                <td className="px-6 py-4 text-sm">⭐⭐</td>
              </tr>
              <tr>
                <td className="px-6 py-4 text-sm text-gray-900 font-bold">OpenFeign (推荐)</td>
                <td className="px-6 py-4 text-sm text-gray-600">声明式,代码简洁</td>
                <td className="px-6 py-4 text-sm text-gray-600">需要学习</td>
                <td className="px-6 py-4 text-sm">⭐⭐⭐⭐⭐</td>
              </tr>
              <tr>
                <td className="px-6 py-4 text-sm text-gray-900">Dubbo</td>
                <td className="px-6 py-4 text-sm text-gray-600">RPC 调用,高性能</td>
                <td className="px-6 py-4 text-sm text-gray-600">需要接口定义</td>
                <td className="px-6 py-4 text-sm">⭐⭐⭐⭐</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className="text-xl font-bold text-gray-800 mb-4">使用 OpenFeign 调用服务</h3>
        <CodeBlock
          language="java"
          filename="ServiceConsumerApplication.java"
          code={`@SpringBootApplication
@EnableDiscoveryClient
@EnableFeignClients  // 启用 Feign 客户端
public class ServiceConsumerApplication {

    public static void main(String[] args) {
        SpringApplication.run(ServiceConsumerApplication.class, args);
    }
}`}
        />

        <CodeBlock
          language="java"
          filename="EchoServiceClient.java"
          code={`@FeignClient(name = "service-provider")  // 服务名称
public interface EchoServiceClient {

    @GetMapping("/echo/{string}")
    String echo(@PathVariable("string") String string);

    @GetMapping("/echo/info")
    String info();
}`}
        />

        <CodeBlock
          language="java"
          filename="ConsumerController.java"
          code={`@RestController
@RequestMapping("/consumer")
public class ConsumerController {

    @Autowired
    private EchoServiceClient echoServiceClient;

    @GetMapping("/echo/{string}")
    public String echo(@PathVariable String string) {
        // 像调用本地方法一样调用远程服务
        return echoServiceClient.echo(string);
    }
}`}
        />
      </section>

      {/* 核心概念 */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">核心概念</h2>

        <div className="space-y-6">
          <ConceptCard
            title="命名空间 (Namespace)"
            level="beginner"
            description="用于进行租户粒度的配置隔离,不同的命名空间下可以存在相同名称的服务"
            example="开发环境(dev)、测试环境(test)、生产环境(prod)"
          />

          <ConceptCard
            title="分组 (Group)"
            level="beginner"
            description="服务分组,不同的分组可以隔离相同的服务,用于区分不同的业务线或部门"
            example="电商业务、支付业务、用户业务"
          />

          <ConceptCard
            title="服务 (Service)"
            level="beginner"
            description="一个或多个提供相同功能的实例集合,通过服务名进行唯一标识"
            example="service-provider、order-service、payment-service"
          />

          <ConceptCard
            title="实例 (Instance)"
            level="intermediate"
            description="服务的具体提供者,包含 IP、端口、权重、健康状态等信息"
            example="192.168.1.100:8080、192.168.1.101:8080"
          />

          <ConceptCard
            title="权重 (Weight)"
            level="intermediate"
            description="实例的权重,用于负载均衡,权重越高被调用的概率越大"
            example="1.0(默认)、2.0(双倍流量)"
          />

          <ConceptCard
            title="健康检查 (Health Check)"
            level="intermediate"
            description="定期检查实例的健康状态,不健康的实例会被剔除"
            example="TCP 检查、HTTP 检查"
          />
        </div>
      </section>

      {/* 高级特性 */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">高级特性</h2>

        {/* 权重路由 */}
        <div className="bg-gray-50 p-6 rounded-lg mb-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">
            1. 权重路由 - 灰度发布利器
          </h3>
          <p className="text-gray-700 mb-4">
            通过设置不同的权重,可以将不同比例的流量导到不同版本的服务实例,实现灰度发布。
          </p>
          <CodeBlock
            language="yaml"
            code={`spring:
  cloud:
    nacos:
      discovery:
        server-addr: localhost:8848
        # 权重配置(1-100)
        weight: 20  # 该实例获得 20% 的流量`}
          />
          <div className="mt-4 p-4 bg-blue-50 rounded">
            <p className="text-sm text-gray-700">
              <strong>应用场景:</strong> 新版本灰度发布,先给10%流量,观察无问题后逐步增加
            </p>
          </div>
        </div>

        {/* 元数据路由 */}
        <div className="bg-gray-50 p-6 rounded-lg mb-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">
            2. 元数据路由 - 精细流量控制
          </h3>
          <p className="text-gray-700 mb-4">
            通过元数据实现版本控制、环境隔离等高级路由策略。
          </p>
          <CodeBlock
            language="yaml"
            code={`spring:
  cloud:
    nacos:
      discovery:
        metadata:
          version: v2          # 版本号
          env: gray           # 灰度环境
          region: beijing     # 地区`}
          />
        </div>

        {/* 集群隔离 */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-xl font-bold text-gray-900 mb-4">
            3. 集群隔离 - 故障隔离
          </h3>
          <p className="text-gray-700 mb-4">
            通过集群名称实现服务实例的逻辑隔离,一个服务可以有多个集群。
          </p>
          <CodeBlock
            language="yaml"
            code={`spring:
  cloud:
    nacos:
      discovery:
        cluster-name: beijing  # 集群名称`}
          />
          <div className="mt-4 p-4 bg-green-50 rounded">
            <p className="text-sm text-gray-700">
              <strong>应用场景:</strong> 多机房部署,北京机房、上海机房互不影响
            </p>
          </div>
        </div>
      </section>

      {/* 最佳实践 */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">最佳实践</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <BestPracticeCard
            title="命名规范"
            practices={[
              '服务名使用小写字母、数字、连字符',
              '使用有意义的业务名称',
              '避免使用特殊字符和中文',
            ]}
          />

          <BestPracticeCard
            title="环境隔离"
            practices={[
              '使用 namespace 隔离环境',
              'dev/test/prod 分别使用不同 namespace',
              '不要混用环境',
            ]}
          />

          <BestPracticeCard
            title="健康检查"
            practices={[
              '配置合理的健康检查间隔',
              '避免检查频率过高',
              '实现优雅下线',
            ]}
          />

          <BestPracticeCard
            title="监控告警"
            practices={[
              '监控服务注册数量',
              '监控服务健康状态',
              '异常情况及时告警',
            ]}
          />
        </div>
      </section>

      {/* 常见问题 */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">常见问题</h2>

        <div className="space-y-4">
          <QuestionCard
            question="服务注册失败怎么办?"
            answer={
              <div>
                <p className="mb-2">检查以下几点:</p>
                <ol className="list-decimal pl-6 space-y-1">
                  <li>Nacos 服务器是否启动</li>
                  <li>配置的 server-addr 是否正确</li>
                  <li>网络是否通畅</li>
                  <li>服务名是否配置</li>
                  <li>查看应用日志的错误信息</li>
                </ol>
              </div>
            }
          />

          <QuestionCard
            question="服务下线后还能被调用吗?"
            answer="正常情况下不会。Nacos 会及时剔除不健康的实例。但建议实现优雅下线,在应用关闭前主动注销服务。"
          />

          <QuestionCard
            question="如何实现服务版本管理?"
            answer="使用元数据标记版本号,通过元数据路由实现不同版本的流量控制。"
          />
        </div>
      </section>

      {/* 下一步学习 */}
      <section className="bg-gradient-to-r from-blue-500 to-blue-700 text-white p-8 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">
          🎯 掌握了服务注册发现,下一步学习什么?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <NextStepCard
            title="OpenFeign 服务调用"
            description="学习声明式服务调用,简化代码"
            link="/feign"
            icon="📞"
          />
          <NextStepCard
            title="Nacos 配置中心"
            description="学习动态配置管理"
            link="/nacos-config"
            icon="⚙️"
          />
          <NextStepCard
            title="Sentinel 流量控制"
            description="学习限流、熔断、降级"
            link="/sentinel"
            icon="🛡️"
          />
          <NextStepCard
            title="负载均衡策略"
            description="学习各种负载均衡算法"
            link="/loadbalancer"
            icon="⚖️"
          />
        </div>
      </section>
    </div>
  );
};

// 特性卡片
interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => {
  return (
    <div className="p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
      <div className="flex items-start">
        <span className="text-3xl mr-3">{icon}</span>
        <div>
          <h4 className="font-bold text-gray-900 mb-1">{title}</h4>
          <p className="text-sm text-gray-600">{description}</p>
        </div>
      </div>
    </div>
  );
};

// 流程步骤
interface ProcessStepProps {
  step: string;
  title: string;
  description: string;
  color: string;
}

const ProcessStep: React.FC<ProcessStepProps> = ({ step, title, description, color }) => {
  const colorClasses: Record<string, string> = {
    blue: 'bg-blue-100 border-blue-300 text-blue-700',
    green: 'bg-green-100 border-green-300 text-green-700',
    purple: 'bg-purple-100 border-purple-300 text-purple-700',
    orange: 'bg-orange-100 border-orange-300 text-orange-700',
  };

  return (
    <div className={`flex items-start p-3 border-2 ${colorClasses[color]} rounded-lg`}>
      <div className="flex-shrink-0 w-8 h-8 bg-white rounded-full flex items-center justify-center font-bold mr-3">
        {step}
      </div>
      <div>
        <h4 className="font-bold mb-1">{title}</h4>
        <p className="text-sm">{description}</p>
      </div>
    </div>
  );
};

// 概念卡片
interface ConceptCardProps {
  title: string;
  level: 'beginner' | 'intermediate' | 'architect';
  description: string;
  example: string;
}

const ConceptCard: React.FC<ConceptCardProps> = ({ title, level, description, example }) => {
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
      <p className="text-gray-700 mb-3">{description}</p>
      <div className="text-sm">
        <span className="font-semibold text-gray-600">示例: </span>
        <code className="text-primary-600">{example}</code>
      </div>
    </div>
  );
};

// 最佳实践卡片
interface BestPracticeCardProps {
  title: string;
  practices: string[];
}

const BestPracticeCard: React.FC<BestPracticeCardProps> = ({ title, practices }) => {
  return (
    <div className="p-5 bg-green-50 border-2 border-green-200 rounded-lg">
      <h3 className="text-lg font-bold text-gray-900 mb-3">{title}</h3>
      <ul className="space-y-2">
        {practices.map((practice, index) => (
          <li key={index} className="flex items-start text-sm text-gray-700">
            <span className="text-green-600 mr-2">✓</span>
            <span>{practice}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

// 问题卡片
interface QuestionCardProps {
  question: string;
  answer: string | React.ReactNode;
}

const QuestionCard: React.FC<QuestionCardProps> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="bg-white border-2 border-gray-200 rounded-lg">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
      >
        <h3 className="text-lg font-bold text-gray-900">{question}</h3>
        <svg
          className={`w-5 h-5 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {isOpen && (
        <div className="px-6 pb-4 text-gray-700">
          {answer}
        </div>
      )}
    </div>
  );
};

// 下一步卡片
interface NextStepCardProps {
  title: string;
  description: string;
  link: string;
  icon: string;
}

const NextStepCard: React.FC<NextStepCardProps> = ({ title, description, link, icon }) => {
  return (
    <a
      href={link}
      className="block p-4 bg-white/10 backdrop-blur rounded-lg hover:bg-white/20 transition-colors"
    >
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
