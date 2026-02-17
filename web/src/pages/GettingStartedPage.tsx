import { InlineCode } from '../components';
import { CodeBlock } from '../components';
import React from 'react';

export const GettingStartedPage: React.FC = () => {
  return (
    <div className="prose prose-slate max-w-none">
      <h1 className="text-4xl font-bold text-gray-900 mb-6">
        环境准备
      </h1>

      <p className="text-xl text-gray-700 mb-8">
        在开始学习 Spring Cloud Alibaba 之前,需要准备以下开发环境。
      </p>

      {/* JDK */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">1. 安装 JDK</h2>
        <p className="text-lg text-gray-700 mb-4">
          Spring Cloud Alibaba 需要 JDK 8 或更高版本。推荐使用 JDK 17 或 JDK 21。
        </p>

        <h3 className="text-xl font-bold text-gray-800 mb-3">检查 JDK 版本</h3>
        <CodeBlock
          language="bash"
          code={`java -version`}
        />

        <h3 className="text-xl font-bold text-gray-800 mb-3 mt-6">推荐版本</h3>
        <ul className="list-disc pl-6 space-y-2">
          <li>JDK 17 LTS (推荐)</li>
          <li>JDK 21 LTS (最新)</li>
        </ul>

        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mt-4">
          <p className="text-gray-700">
            <strong>下载地址:</strong>{' '}
            <a href="https://www.oracle.com/java/technologies/downloads/" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">
              Oracle JDK
            </a>
            {' '}或{' '}
            <a href="https://adoptium.net/" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">
              Eclipse Temurin (OpenJDK)
            </a>
          </p>
        </div>
      </section>

      {/* Maven */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">2. 安装 Maven</h2>
        <p className="text-lg text-gray-700 mb-4">
          Maven 3.6 或更高版本
        </p>

        <h3 className="text-xl font-bold text-gray-800 mb-3">检查 Maven 版本</h3>
        <CodeBlock
          language="bash"
          code={`mvn -version`}
        />

        <h3 className="text-xl font-bold text-gray-800 mb-3 mt-6">配置 settings.xml</h3>
        <p className="text-gray-700 mb-3">
          在 <InlineCode>~/.m2/settings.xml</InlineCode> 中配置阿里云镜像加速:
        </p>
        <CodeBlock
          language="xml"
          code={`<mirrors>
  <mirror>
    <id>aliyunmaven</id>
    <mirrorOf>*</mirrorOf>
    <name>阿里云公共仓库</name>
    <url>https://maven.aliyun.com/repository/public</url>
  </mirror>
</mirrors>`}
        />
      </section>

      {/* IDE */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">3. 安装 IDE</h2>
        <p className="text-lg text-gray-700 mb-4">
          推荐使用以下 IDE 进行开发:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <IDERecord
            name="IntelliJ IDEA"
            description="推荐,功能强大"
            url="https://www.jetbrains.com/idea/"
          />
          <IDERecord
            name="VS Code"
            description="轻量级,插件丰富"
            url="https://code.visualstudio.com/"
          />
          <IDERecord
            name="Eclipse"
            description="免费开源"
            url="https://www.eclipse.org/"
          />
          <IDERecord
            name="Spring Tools Suite"
            description="Spring 官方工具"
            url="https://spring.io/tools"
          />
        </div>
      </section>

      {/* Nacos */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">4. 安装 Nacos</h2>
        <p className="text-lg text-gray-700 mb-4">
          Nacos 是服务注册发现和配置中心,需要提前安装。
        </p>

        <h3 className="text-xl font-bold text-gray-800 mb-3">下载 Nacos</h3>
        <CodeBlock
          language="bash"
          code={`# 下载 Nacos 2.x 版本
wget https://github.com/alibaba/nacos/releases/download/2.2.3/nacos-server-2.2.3.tar.gz

# 解压
tar -xvf nacos-server-2.2.3.tar.gz
cd nacos/bin`}
        />

        <h3 className="text-xl font-bold text-gray-800 mb-3 mt-6">启动 Nacos</h3>
        <CodeBlock
          language="bash"
          code={`# 单机模式启动
sh startup.sh -m standalone

# Windows 系统
cmd startup.cmd -m standalone`}
        />

        <p className="text-gray-700 mt-3">
          访问 <InlineCode>http://localhost:8848/nacos</InlineCode>,默认账号密码都是 <InlineCode>nacos</InlineCode>
        </p>
      </section>

      {/* 创建项目 */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">5. 创建 Spring Cloud Alibaba 项目</h2>

        <h3 className="text-xl font-bold text-gray-800 mb-3">使用 Spring Initializr</h3>
        <ol className="list-decimal pl-6 space-y-2 mb-4">
          <li>访问 <a href="https://start.aliyun.com" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">https://start.aliyun.com</a></li>
          <li>选择项目类型:Maven Project</li>
          <li>选择语言:Java</li>
          <li>选择 Spring Boot 版本:3.x</li>
          <li>添加依赖:Nacos Discovery</li>
          <li>生成项目并下载</li>
        </ol>

        <h3 className="text-xl font-bold text-gray-800 mb-3 mt-6">手动添加依赖</h3>
        <p className="text-gray-700 mb-3">
          在 <InlineCode>pom.xml</InlineCode> 中添加 Spring Cloud Alibaba 依赖管理:
        </p>
        <CodeBlock
          language="xml"
          code={`<dependencyManagement>
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

        <p className="text-gray-700 mb-3 mt-6">
          添加 Nacos 服务发现依赖:
        </p>
        <CodeBlock
          language="xml"
          code={`<dependency>
    <groupId>com.alibaba.cloud</groupId>
    <artifactId>spring-cloud-starter-alibaba-nacos-discovery</artifactId>
</dependency>`}
        />
      </section>

      {/* 第一个应用 */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">6. 创建第一个微服务应用</h2>

        <h3 className="text-xl font-bold text-gray-800 mb-3">启动类</h3>
        <CodeBlock
          language="java"
          filename="ProviderApplication.java"
          code={`@SpringBootApplication
@EnableDiscoveryClient
public class ProviderApplication {

    public static void main(String[] args) {
        SpringApplication.run(ProviderApplication.class, args);
    }

    @RestController
    public class EchoController {

        @Value("$\{server.port\}")
        private String port;

        @GetMapping("/echo/{string}")
        public String echo(@PathVariable String string) {
            return "Hello Nacos Discovery: " + string + ", port: " + port;
        }
    }
}`}
        />

        <h3 className="text-xl font-bold text-gray-800 mb-3 mt-6">配置文件</h3>
        <CodeBlock
          language="yaml"
          filename="application.yml"
          code={`server:
  port: 8080

spring:
  application:
    name: service-provider
  cloud:
    nacos:
      discovery:
        server-addr: localhost:8848`}
        />

        <h3 className="text-xl font-bold text-gray-800 mb-3 mt-6">运行应用</h3>
        <CodeBlock
          language="bash"
          code={`mvn spring-boot:run`}
        />

        <p className="text-gray-700 mt-3">
          访问 <InlineCode>http://localhost:8080/echo/test</InlineCode> 测试服务
        </p>
        <p className="text-gray-700">
          在 Nacos 控制台可以看到服务已注册成功
        </p>
      </section>

      {/* 版本对应 */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">7. 版本对应关系</h2>
        <p className="text-lg text-gray-700 mb-4">
          Spring Cloud Alibaba 与 Spring Boot/Cloud 的版本对应关系:
        </p>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 border border-gray-300">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Spring Cloud Alibaba
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Spring Cloud
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Spring Boot
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">2023.0.1.0</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">2023.0.1</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">3.2.1</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">2023.0.0.0</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">2023.0.0</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">3.2.0</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">2022.0.0.0</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">2022.0.4</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">3.0.2</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mt-6">
          <p className="text-gray-700">
            <strong>注意:</strong> 请确保版本匹配,否则可能出现兼容性问题。
            查看完整版本对应关系请访问{' '}
            <a href="https://sca.aliyun.com/docs/2023/overview/version-explain/" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">
              官方文档
            </a>
          </p>
        </div>
      </section>

      {/* 下一步 */}
      <section className="bg-primary-50 border-l-4 border-primary-500 p-6 rounded-lg">
        <h3 className="text-2xl font-bold text-gray-900 mb-3">
          环境准备完成!
        </h3>
        <p className="text-lg text-gray-700 mb-4">
          恭喜!您已经完成了环境准备。接下来,让我们学习核心概念。
        </p>
        <a
          href="/core-concepts"
          className="inline-block bg-primary-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-700 transition-colors"
        >
          学习核心概念 →
        </a>
      </section>
    </div>
  );
};

// IDE 记录卡片
interface IDERecordProps {
  name: string;
  description: string;
  url: string;
}

const IDERecord: React.FC<IDERecordProps> = ({ name, description, url }) => {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="block p-4 bg-white border-2 border-gray-200 rounded-lg hover:border-primary-500 hover:shadow-md transition-all"
    >
      <h4 className="text-lg font-bold text-gray-900 mb-1">{name}</h4>
      <p className="text-gray-600">{description}</p>
    </a>
  );
};
