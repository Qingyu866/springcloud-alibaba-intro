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

export const FaqBeginnerPage: React.FC = () => {
  const [openCategory, setOpenCategory] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqData = {
    basics: {
      title: "基础概念",
      icon: "📚",
      questions: [
        {
          q: "什么是 Spring Cloud Alibaba？",
          a: "Spring Cloud Alibaba 是阿里巴巴提供的微服务开发一站式解决方案，提供了服务注册发现、配置中心、消息队列、分布式事务、限流熔断等核心能力。它是 Spring Cloud 体系的国产化替代方案，更适合国内企业使用。",
          code: null
        },
        {
          q: "Spring Cloud Alibaba 和 Spring Cloud 有什么区别？",
          a: "Spring Cloud Alibaba 是 Spring Cloud 的子项目，专门针对国内企业需求优化：\n\n1. **组件差异**：Spring Cloud Netflix 使用 Eureka、Hystrix、Zuul（已停止维护），而 Spring Cloud Alibaba 使用 Nacos、Sentinel、Gateway\n\n2. **性能优势**：Sentinel 比 Hystrix 性能更好，功能更强大\n\n3. **中文支持**：完善中文文档和社区支持\n\n4. **企业级特性**：更适合国内企业场景，如阿里云集成、分布式事务等",
          code: null
        },
        {
          q: "微服务架构有什么优势？",
          a: "微服务架构的优势：\n\n1. **独立部署**：每个服务独立开发、部署、扩展\n\n2. **技术选型灵活**：不同服务可以使用不同技术栈\n\n3. **高可用性**：单个服务故障不影响整体系统\n\n4. **团队自治**：小团队负责单个服务，提高效率\n\n5. **弹性伸缩**：根据负载独立扩展服务\n\n但也有挑战：分布式系统复杂度、数据一致性、运维成本等。",
          code: null
        },
        {
          q: "学习 Spring Cloud Alibaba 需要什么基础？",
          a: "建议按以下顺序学习：\n\n1. **Java 基础**：Java SE、集合、多线程、IO\n\n2. **Spring 框架**：IoC、AOP、Spring MVC\n\n3. **Spring Boot**：自动配置、Starter、Actuator\n\n4. **微服务基础**：CAP 定理、分布式事务、服务网格\n\n5. **中间件**：MySQL、Redis、RabbitMQ/RocketMQ\n\n6. **容器化**：Docker、Kubernetes（可选）",
          code: null
        }
      ]
    },
    nacos: {
      title: "Nacos 相关",
      icon: "🔧",
      questions: [
        {
          q: "Nacos 是什么？有什么作用？",
          a: "Nacos 是阿里巴巴开源的动态服务发现、配置管理和服务管理平台。主要有两大功能：\n\n1. **服务注册与发现**：替代 Eureka，支持服务注册、健康检查\n\n2. **配置中心**：集中管理配置，支持动态刷新、灰度发布\n\n3. **服务管理**：流量管理、权重路由、服务保护",
          code: null
        },
        {
          q: "如何启动 Nacos？",
          a: "Nacos 启动步骤：\n\n1. 下载 Nacos：\nhttps://github.com/alibaba/nacos/releases\n\n2. 解压并启动（单机模式）：\n```bash\nsh startup.sh -m standalone\n```\n\n3. 访问控制台：\nhttp://localhost:8848/nacos\n用户名/密码：nacos/nacos\n\n4. 在项目中配置：\n```yaml\nspring:\n  cloud:\n    nacos:\n      discovery:\n        server-addr: localhost:8848\n```",
          code: { language: "yaml", content: `# application.yml\nspring:\n  cloud:\n    nacos:\n      discovery:\n        server-addr: localhost:8848` }
        },
        {
          q: "Nacos 服务注册失败的常见原因？",
          a: "常见原因：\n\n1. **Nacos 服务未启动**：检查 Nacos 是否正常运行\n\n2. **配置错误**：检查 server-addr、namespace 等配置\n\n3. **网络不通**：防火墙、端口（8848）是否开放\n\n4. **依赖缺失**：检查是否引入 spring-cloud-starter-alibaba-nacos-discovery\n\n5. **应用名未配置**：检查 spring.application.name\n\n调试方法：\n- 查看 Nacos 控制台的服务列表\n- 检查应用日志中的注册信息",
          code: null
        }
      ]
    },
    sentinel: {
      title: "Sentinel 相关",
      icon: "🛡️",
      questions: [
        {
          q: "Sentinel 是什么？有什么作用？",
          a: "Sentinel 是阿里巴巴开源的流量防卫兵，提供：\n\n1. **流量控制**：QPS 限流、并发线程数限流\n\n2. **熔断降级**：服务熔断、降级策略\n\n3. **系统保护**：CPU、RT、线程数等自适应保护\n\n4. **热点数据**：热点参数限流\n\n与 Hystrix 相比，Sentinel 性能更好、功能更强大、控制台更友好。",
          code: null
        },
        {
          q: "如何配置 Sentinel 限流？",
          a: "Sentinel 限流配置步骤：\n\n1. 添加依赖：\n```xml\n<dependency>\n  <groupId>com.alibaba.cloud</groupId>\n  <artifactId>spring-cloud-starter-alibaba-sentinel</artifactId>\n</dependency>\n```\n\n2. 配置 Sentinel Dashboard：\n```yaml\nspring:\n  cloud:\n    sentinel:\n      transport:\n        dashboard: localhost:8080\n```\n\n3. 在 Sentinel 控制台配置限流规则：\n- 资源名：API 路径\n- 阈值类型：QPS 或线程数\n- 单机阈值：每秒请求数\n- 流控模式：直接、关联、链路\n- 流控效果：快速失败、Warm Up、排队等待",
          code: { language: "java", content: `// 代码方式定义资源（可选）
@GetMapping("/api/order")
@SentinelResource(value = "createOrder", blockHandler = "handleBlock")
public Result<Order> createOrder(@RequestBody OrderRequest request) {
    return orderService.create(request);
}

// 限流降级方法
public Result<Order> handleBlock(OrderRequest request, BlockException ex) {
    return Result.error("系统繁忙，请稍后重试");
}` }
        },
        {
          q: "Sentinel 和 Hystrix 有什么区别？",
          a: "主要区别：\n\n| 特性 | Sentinel | Hystrix |\n|------|----------|----------|\n| **隔离策略** | 信号量隔离（并发线程限流）| 线程池隔离、信号量隔离 |\n| **熔断降级** | 支持多种策略（平均RT、异常比例、异常数）| 基于异常比例 |\n| **实时监控** | 独立控制台，实时监控 | 需要集成 Actuator |\n| **动态规则** | 支持动态配置，持久化到 Nacos | 需要重启应用 |\n| **社区状态** | 活跃维护 | 已停止维护 |\n\n建议：新项目使用 Sentinel，老项目逐步迁移。",
          code: null
        }
      ]
    },
    development: {
      title: "开发调试",
      icon: "💻",
      questions: [
        {
          q: "本地开发时如何连接多个服务？",
          a: "本地开发多服务调试方法：\n\n1. **IDEA 多模块启动**：\n- 在 IDEA 中同时启动多个服务模块\n- 确保端口不冲突\n- 使用不同的 profile（dev、test）\n\n2. **使用 Nacos**：\n- 所有服务注册到同一个 Nacos\n- 通过服务名调用，不依赖具体 IP\n\n3. **本地配置**：\n```yaml\nspring:\n  cloud:\n    nacos:\n      discovery:\n        server-addr: localhost:8848\n        namespace: dev  # 使用开发环境命名空间\n```",
          code: null
        },
        {
          q: "如何调试微服务之间的调用？",
          a: "微服务调用调试技巧：\n\n1. **使用 Feign 日志**：\n```java\n@Configuration\npublic class FeignConfig {\n    @Bean\n    Logger.Level feignLoggerLevel() {\n        return Logger.Level.FULL; // 全部日志\n    }\n}\n```\n\n2. **使用 Sleuth + Zipkin**：\n- 添加依赖：spring-cloud-starter-sleuth\n- 配置 Zipkin 地址\n- 在 Zipkin UI 查看调用链路\n\n3. **使用日志追踪**：\n- 在日志中添加 traceId\n- 通过 traceId 关联所有服务的日志\n\n4. **使用 Postman/curl**：\n- 直接测试单个服务接口\n- 排查网络问题",
          code: null
        },
        {
          q: "如何在本地环境模拟分布式事务？",
          a: "本地模拟分布式事务：\n\n1. **使用 Seata AT 模式**：\n- 本地启动 Seata Server\n- 数据库创建 undo_log 表\n- 业务方法添加 @GlobalTransactional\n\n2. **配置 Seata**：\n```yaml\nseata:\n  enabled: true\n  application-id: order-service\n  tx-service-group: my_test_tx_group\n  registry:\n    type: nacos\n    nacos:\n      server-addr: localhost:8848\n  config:\n    type: nacos\n    nacos:\n      server-addr: localhost:8848\n```\n\n3. **测试事务回滚**：\n- 在第二个服务中抛出异常\n- 观察第一个服务的数据库是否回滚",
          code: null
        }
      ]
    },
    deployment: {
      title: "部署运维",
      icon: "🚀",
      questions: [
        {
          q: "如何将 Spring Cloud Alibaba 应用打包部署？",
          a: "部署步骤：\n\n1. **打包应用**：\n```bash\nmvn clean package -DskipTests\n```\n\n2. **Docker 部署**：\n```dockerfile\nFROM openjdk:17-jdk-slim\nCOPY target/app.jar /app.jar\nENTRYPOINT [\"java\", \"-jar\", \"/app.jar\"]\n```\n\n3. **K8s 部署**：\n- 创建 Deployment YAML\n- 配置 Service 和 Ingress\n- 使用 ConfigMap 管理配置\n\n4. **生产环境配置**：\n- JVM 参数优化\n- 使用外部配置中心\n- 配置健康检查",
          code: null
        },
        {
          q: "如何监控微服务运行状态？",
          a: "监控方案：\n\n1. **应用监控**：\n- Spring Boot Actuator：/actuator/health\n- Prometheus + Grafana：指标采集和展示\n\n2. **链路追踪**：\n- SkyWalking：APM 工具\n- Zipkin：分布式追踪\n- Jaeger：Uber 开源的追踪系统\n\n3. **日志聚合**：\n- ELK Stack：Elasticsearch + Logstash + Kibana\n- EFK Stack：Elasticsearch + Fluentd + Kibana\n\n4. **告警通知**：\n- 钉钉、企业微信、邮件告警\n- Prometheus AlertManager",
          code: null
        }
      ]
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-teal-700 to-teal-900 text-white rounded-lg p-6 mb-8">
        <h1 className="text-4xl font-bold mb-2">初学者常见问题</h1>
        <p className="text-teal-100">Spring Cloud Alibaba 学习路上的常见问题解答</p>
        <div className="flex gap-3 text-sm mt-4">
          <span className="px-3 py-1 bg-white/20 rounded-full">🔰 入门指南</span>
          <span className="px-3 py-1 bg-white/20 rounded-full">⏱️ 约40分钟</span>
          <span className="px-3 py-1 bg-white/20 rounded-full">📋 5大分类</span>
        </div>
      </div>

      {/* FAQ Categories */}
      <div className="space-y-6">
        {Object.entries(faqData).map(([key, category]) => (
          <div key={key} className="bg-white rounded-lg shadow-lg overflow-hidden">
            <button
              onClick={() => setOpenCategory(openCategory === key ? null : key)}
              className="w-full bg-gray-50 hover:bg-gray-100 p-4 flex items-center justify-between transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{category.icon}</span>
                <span className="text-xl font-bold text-gray-900">{category.title}</span>
                <span className="text-sm text-gray-600">({category.questions.length} 个问题)</span>
              </div>
              <span className="text-gray-400 text-2xl">{openCategory === key ? '−' : '+'}</span>
            </button>

            {openCategory === key && (
              <div className="p-4 space-y-4">
                {category.questions.map((faq, idx) => (
                  <div key={idx} className="border border-gray-200 rounded-lg overflow-hidden">
                    <button
                      onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                      className="w-full text-left p-4 flex items-start justify-between hover:bg-gray-50 transition-colors"
                    >
                      <span className="font-medium text-gray-900 flex-1 pr-4">
                        <span className="text-teal-600 mr-2">Q:</span>
                        {faq.q}
                      </span>
                      <span className="text-gray-400 text-lg mt-1">
                        {openFaq === idx ? '−' : '+'}
                      </span>
                    </button>
                    {openFaq === idx && (
                      <div className="px-4 pb-4">
                        <div className="text-gray-700 whitespace-pre-line mb-4">
                          <span className="text-teal-600 font-medium">A:</span> {faq.a}
                        </div>
                        {faq.code && (
                          <CodeBlock language={faq.code.language} code={faq.code.content} />
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Quick Links */}
      <section className="mt-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">快速链接</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <a href="/getting-started" className="block bg-teal-50 hover:bg-teal-100 border border-teal-200 rounded-lg p-6 transition-colors">
            <h3 className="text-lg font-bold text-teal-900 mb-2">快速开始</h3>
            <p className="text-teal-700 text-sm">从零开始搭建第一个微服务</p>
          </a>
          <a href="/faq-advanced" className="block bg-green-50 hover:bg-green-100 border border-green-200 rounded-lg p-6 transition-colors">
            <h3 className="text-lg font-bold text-green-900 mb-2">进阶问题</h3>
            <p className="text-green-700 text-sm">更深入的微服务问题</p>
          </a>
          <a href="/faq-production" className="block bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg p-6 transition-colors">
            <h3 className="text-lg font-bold text-blue-900 mb-2">生产实践</h3>
            <p className="text-blue-700 text-sm">生产环境常见问题</p>
          </a>
        </div>
      </section>
    </div>
  );
};
