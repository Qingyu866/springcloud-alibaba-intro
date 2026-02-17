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

export const FaqProductionPage: React.FC = () => {
  const [openCategory, setOpenCategory] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqData = {
    deployment: {
      title: "部署运维",
      icon: "🚀",
      questions: [
        {
          q: "生产环境部署有哪些最佳实践？",
          a: "生产环境部署最佳实践：\n\n1. **环境隔离**：\n- 开发、测试、生产环境完全隔离\n- 独立的 Nacos 命名空间\n- 独立的数据库实例\n- 不同的配置文件\n\n2. **容器化部署**：\n- Docker 镜像标准化\n- Kubernetes 集群管理\n- 自动化 CI/CD 流水线\n- 滚动更新和灰度发布\n\n3. **配置管理**：\n- 使用 Nacos 配置中心\n- 敏感信息使用环境变量\n- 配置版本管理和回滚\n\n4. **监控告警**：\n- Prometheus + Grafana 监控\n- 链路追踪（SkyWalking）\n- 日志聚合（ELK）\n- 多渠道告警\n\n5. **安全加固**：\n- HTTPS 强制跳转\n- SQL 注入防护\n- XSS 防护\n- 接口签名验证",
          code: null
        },
        {
          q: "如何实现应用的灰度发布？",
          a: "灰度发布方案：\n\n1. **K8s 滚动更新**：\n- Deployment 更新策略：RollingUpdate\n- 设置 maxSurge 和 maxUnavailable\n- 健康检查确保服务可用\n\n2. **流量路由**：\n- Nacos 权重路由\n- 网关灰度规则\n- 按百分比灰度（5% -> 20% -> 50% -> 100%）\n\n3. **特性开关**：\n- 使用配置中心控制功能开关\n- Feature Toggle 模式\n- A/B 测试支持",
          code: { language: "java", content: `# K8s 滚动更新配置
apiVersion: apps/v1
kind: Deployment
metadata:
  name: order-service
spec:
  replicas: 3
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxSurge: 25%          # 最多额外25% Pod
      maxUnavailable: 25%  # 最多25% Pod 不可用
  template:
    spec:
      containers:
      - name: app
        image: order-service:v1.0.0
        livenessProbe:
          httpGet:
            path: /actuator/health
            port: 8080
          initialDelaySeconds: 30
          periodSeconds: 10
        readinessProbe:
          httpGet:
            path: /actuator/health/readiness
            port: 8080
          initialDelaySeconds: 10
          periodSeconds: 5` }
        },
        {
          q: "生产环境的 JVM 参数如何配置？",
          a: "JVM 参数调优：\n\n1. **堆内存设置**：\n``\n-Xms4g          # 初始堆大小\n-Xmx4g          # 最大堆大小\n-Xmn2g          # 年轻代大小\n```\n\n2. **GC 选择**：\n- 推荐 G1GC（JDK9+）：平衡吞吐和延迟\n- 大堆内存用 ZGC（JDK17+）\n- 避免使用 Serial GC\n\n3. **GC 日志**：\n``\n-Xlog:gc*logfile.log\n-XX:+PrintGCDetails\n-XX:+PrintGCDateStamps\n-XX:+UseGCLogFileRotation\n```\n\n4. **性能优化**：\n- -XX:+UseG1GC（G1 垃圾回收器）\n- -XX:MaxGCPauseMillis=200（最大GC停顿）\n- -XX:+HeapDumpOnOutOfMemoryError\n- -XX:HeapDumpPath=/logs/heapdump.hprof",
          code: { language: "java", content: `# 生产环境 JVM 参数
JAVA_OPTS="-Xms4g -Xmx4g -Xmn2g \\
-XX:+UseG1GC \\
-XX:MaxGCPauseMillis=200 \\
-XX:+HeapDumpOnOutOfMemoryError \\
-XX:HeapDumpPath=/logs/heapdump.hprof \\
-Xlog:gc*logfile.log:filecount=10,filesize=10M \\
-XX:+PrintGCDetails \\n-XX:+PrintGCDateStamps"` }
        },
        {
          q: "如何设计生产环境的备份策略？",
          a: "备份策略设计：\n\n1. **数据库备份**：\n- 全量备份：每天凌晨\n- 增量备份：每小时一次\n- binlog 实时备份（Point-In-Time Recovery）\n- 异地备份：跨机房容灾\n\n2. **Redis 备份**：\n- RDB 持久化：定期快照\n- AOF 持久化：实时追加\n- 主从复制：实时同步\n\n3. **应用备份**：\n- 代码仓库 Git 备份\n- 配置文件版本管理\n- Docker 镜像仓库备份\n\n4. **验证恢复**：\n- 定期进行恢复演练\n- 验证备份文件完整性\n- 制定灾难恢复预案",
          code: null
        }
      ]
    },
    performance: {
      title: "性能优化",
      icon: "⚡",
      questions: [
        {
          q: "生产环境如何进行容量规划？",
          a: "容量规划步骤：\n\n1. **业务评估**：\n- 预期用户量和增长率\n- QPS 峰值和平均值\n- 数据量预估\n\n2. **性能测试**：\n- 压力测试：找出系统瓶颈\n- 稳定性测试：长时间运行\n- 峰值测试：极限负载\n\n3. **容量计算**：\n- 应用服务器：根据 QPS 计算实例数\n- 数据库：连接数、TPS、存储空间\n- 缓存：内存大小、过期策略\n- 消息队列：吞吐量、堆积量\n\n4. **预留余量**：\n- 通常预留 30-50% 余量\n- 应对突发流量\n- 节假日、活动高峰",
          code: null
        },
        {
          q: "如何处理生产环境的性能瓶颈？",
          a: "性能瓶颈排查：\n\n1. **监控定位**：\n- APM 工具（SkyWalking、Pinpoint）\n- 慢查询日志：记录超过阈值的请求\n- 系统监控：CPU、内存、磁盘 IO\n\n2. **常见瓶颈**：\n- 数据库慢查询：优化 SQL、添加索引\n- 网络调用：减少调用次数、批量处理\n- 缓存穿透：增加缓存预热\n- 锁竞争：优化锁粒度\n\n3. **优化策略**：\n- 数据库：SQL 优化、索引优化\n- 应用：异步处理、并发优化\n- 缓存：多级缓存、缓存预热\n- 架构：服务拆分、读写分离",
          code: null
        },
        {
          q: "生产环境的连接池如何配置？",
          a: "连接池配置：\n\n1. **数据库连接池（HikariCP）**：\n```yaml\nspring:\n  datasource:\n    hikari:\n      maximum-pool-size: 20        # 最大连接数\n      minimum-idle: 5              # 最小空闲连接\n      connection-timeout: 30000     # 连接超时30s\n      idle-timeout: 600000         # 空闲超时10分钟\n      max-lifetime: 1800000        # 连接最大存活30分钟\n```\n\n2. **Redis 连接池（Lettuce）**：\n```yaml\nspring:\n  redis:\n    lettuce:\n      pool:\n        max-active: 50            # 最大活跃连接\n        max-idle: 20               # 最大空闲连接\n        min-idle: 10               # 最小空闲连接\n```\n\n3. **HTTP 连接池**：\n- Feign 连接池配置\n- HttpClient 连接池\n\n4. **线程池配置**：\n- Tomcat 线程池\n- 异步任务线程池",
          code: { language: "java", content: `# HikariCP 配置
spring:
  datasource:
    hikari:
      maximum-pool-size: 20
      minimum-idle: 5
      connection-timeout: 30000
      idle-timeout: 600000
      max-lifetime: 1800000
      connection-test-query: SELECT 1` }
        }
      ]
    },
    monitoring: {
      title: "监控告警",
      icon: "📊",
      questions: [
        {
          q: "生产环境需要监控哪些指标？",
          a: "监控指标体系：\n\n1. **应用指标**：\n- QPS、响应时间（RT、P99、P999）\n- 错误率、异常数\n- JVM：堆内存、GC 频率、线程数\n\n2. **系统指标**：\n- CPU 使用率、内存使用率\n- 磁盘 IO、网络 IO\n- 文件句柄数\n\n3. **中间件指标**：\n- 数据库：QPS、慢查询、连接数、锁等待\n- Redis：内存使用、命中率、连接数\n- MQ：消息堆积、消费延迟\n\n4. **业务指标**：\n- 订单量、交易额、注册用户数\n- 支付成功率、订单转化率\n\n5. **告警策略**：\n- P0 级（电话）：服务宕机、数据库故障\n- P1 级（短信）：错误率 &gt; 5%\n- P2 级（邮件）：性能下降",
          code: null
        },
        {
          q: "如何搭建生产环境的监控体系？",
          a: "监控体系搭建：\n\n1. **指标采集**：\n- Micrometer：应用指标采集\n- Prometheus：指标存储和查询\n- Exporter：中间件指标暴露\n\n2. **可视化展示**：\n- Grafana：仪表盘和告警\n- 自定义 Dashboard\n\n3. **日志聚合**：\n- ELK Stack：Elasticsearch + Logstash + Kibana\n- EFK：Elasticsearch + Fluentd + Kibana\n- 日志分类和检索\n\n4. **链路追踪**：\n- SkyWalking：分布式追踪和性能分析\n- Zipkin：调用链可视化\n\n5. **告警通知**：\n- AlertManager：告警路由\n- 钉钉、企业微信、邮件、短信",
          code: { language: "java", content: `# Prometheus 监控配置
management:
  endpoints:
    web:
      exposure:
        include: '*'
  metrics:
    export:
      prometheus:
        enabled: true
    tags:
      application: $\{spring.application.name\}` }
        },
        {
          q: "如何排查生产环境的问题？",
          a: "问题排查流程：\n\n1. **信息收集**：\n- 错误时间、受影响用户\n- 错误日志和堆栈\n- 监控指标和调用链\n\n2. **快速定位**：\n- 查看监控：异常时间段指标变化\n- 查看日志：异常堆栈和上下文\n- 查看链路追踪：哪个服务出问题\n\n3. **常见问题**：\n- 内存泄漏：老年代增长、频繁 Full GC\n- CPU 飙高：死循环、频繁 GC\n- OOM：内存溢出、堆内存不足\n- 死锁：线程阻塞、数据库锁\n\n4. **排查工具**：\n- Arthas：线上诊断工具\n- jmap：堆内存快照\n- jstack：线程堆栈",
          code: { language: "java", content: `# Arthas 诊断命令
# 1. 类加载器
sc -d *OrderService\n\n# 2. 查看 JVM 线程\nthread -n 5\n\n# 3. 监控方法调用\nwatch com.example.service.OrderService createOrder\n\n# 4. 查看环境变量\nsysenv\n\n# 5. 类方法反编译\njad com.example.service.OrderService` }
        }
      ]
    },
    security: {
      title: "安全防护",
      icon: "🔒",
      questions: [
        {
          q: "生产环境如何做安全加固？",
          a: "安全加固措施：\n\n1. **网络安全**：\n- VPC 隔离：内网访问\n- 安全组：白名单 IP 访问\n- WAF 防火墙：Web 应用防火墙\n\n2. **应用安全**：\n- 去除调试端点：/actuator 线上关闭\n- 关闭 Swagger 文档：生产环境隐藏\n- 敏感信息脱敏：手机号、身份证\n\n3. **数据安全**：\n- 数据库加密：TDE 透明加密\n- 备份加密：加密存储\n- 传输加密：HTTPS、mTLS\n\n4. **访问控制**：\n- VPN 专有网络访问\n-堡垒机：跳板机访问\n- 多因素认证（MFA）",
          code: { language: "java", content: `# 生产环境安全配置
management:
  endpoints:
    web:
      exposure:
        include: health,info,metrics  # 只暴露必要的端点
  endpoint:
    health:
      show-details: when-authorized  # 认证后显示详情

# 关闭 Swagger（生产环境）
springfox:
  enabled: false` }
        },
        {
          q: "如何防止生产环境的数据泄露？",
          a: "数据泄露防护：\n\n1. **日志脱敏**：\n- 手机号：138****1234\n- 身份证：110***********123X\n- 地址：详细地址只显示省市\n\n2. **接口返回脱敏**：\n- 敏感字段使用 DTO 转换\n- 直接查询返回脱敏对象\n\n3. **数据访问控制**：\n- 数据库权限最小化\n- 读写分离：应用只能读\n- 审计日志：记录数据访问\n\n4. **传输加密**：\n- HTTPS 强制加密\n- 内网使用 mTLS\n- 数据库连接 SSL\n\n5. **安全审计**：\n- 定期安全扫描\n- 渗透测试\n- 合规性检查",
          code: { language: "java", content: `// 日志脱敏配置
<configuration>
    <appender name="CONSOLE" class="ch.qos.logback.core.ConsoleAppender">
        <encoder>
            <pattern>%d{yyyy-MM-dd HH:mm:ss} [%thread] %-5level %logger{50} - %msg%n</pattern>
        </encoder>
    </encoder>
    <filter class="com.example.log.mask.SensitiveDataFilter">
        <mask>phone</mask>
        <mask>idCard</mask>
    </filter>
</appender>
</configuration>` }
        }
      ]
    },
    troubleshooting: {
      title: "故障处理",
      icon: "🔧",
      questions: [
        {
          q: "生产环境服务宕机如何快速恢复？",
          a: "快速恢复流程：\n\n1. **故障确认**：\n- 监控告警确认服务异常\n- 检查服务实例状态\n- 区分服务崩溃还是不可用\n\n2. **紧急处理**：\n- 查看日志：快速定位问题\n- 重启服务：临时恢复（临时方案）\n- 流量切换：切换到备用服务\n\n3. **根因分析**：\n- 内存溢出：增加堆内存\n- CPU 飙高：死循环或算法问题\n- 数据库连接：连接池耗尽\n\n4. **长期优化**：\n- 修复代码 bug\n- 优化资源配置\n- 增加监控和预案\n\n5. **事后复盘**：\n- 故障报告编写\n- 改进措施制定\n- 预案更新",
          code: null
        },
        {
          q: "如何处理生产数据库的性能问题？",
         a: "数据库性能优化：\n\n1. **慢查询优化**：\n- 开启慢查询日志：long_query_time=2\n- 分析 EXPLAIN 执行计划\n- 优化 SQL：避免全表扫描、使用索引\n\n2. **索引优化**：\n- 为常用查询字段添加索引\n- 复合索引遵循最左前缀原则\n- 定期清理冗余索引\n\n3. **连接池优化**：\n- 增加连接池大小\n- 检查连接泄漏：及时释放\n- 连接超时设置合理\n\n4. **架构优化**：\n- 读写分离：主库写、从库读\n- 分库分表：水平拆分\n- 引入缓存：减少数据库压力\n\n5. **备份优化**：\n- 从库备份数据库\n- 避免备份影响主库性能",
          code: { language: "java", content: `# MySQL 慢查询配置
[mysqld]
slow_query_log = 1
long_query_time = 2  # 慢查询阈值2秒
log_queries_not_using_indexes = 1

# 分析慢查询
# 1. 查看慢查询日志
tail -f /var/log/mysql/slow-query.log

# 2. 使用 EXPLAIN 分析
EXPLAIN SELECT * FROM orders WHERE user_id = 123;

# 3. 添加索引
CREATE INDEX idx_user_id ON orders(user_id);` }
        }
      ]
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-700 to-orange-900 text-white rounded-lg p-6 mb-8">
        <h1 className="text-4xl font-bold mb-2">生产环境常见问题</h1>
        <p className="text-orange-100">Spring Cloud Alibaba 生产实践 FAQ</p>
        <div className="flex gap-3 text-sm mt-4">
          <span className="px-3 py-1 bg-white/20 rounded-full">🏭 生产实践</span>
          <span className="px-3 py-1 bg-white/20 rounded-full">⏱️ 约45分钟</span>
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
                        <span className="text-orange-600 mr-2">Q:</span>
                        {faq.q}
                      </span>
                      <span className="text-gray-400 text-lg mt-1">
                        {openFaq === idx ? '−' : '+'}
                      </span>
                    </button>
                    {openFaq === idx && (
                      <div className="px-4 pb-4">
                        <div className="text-gray-700 whitespace-pre-line mb-4">
                          <span className="text-orange-600 font-medium">A:</span> {faq.a}
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
        <h2 className="text-2xl font-bold text-gray-900 mb-6">相关资源</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <a href="/faq-beginner" className="block bg-teal-50 hover:bg-teal-100 border border-teal-200 rounded-lg p-6 transition-colors">
            <h3 className="text-lg font-bold text-teal-900 mb-2">初学者问题</h3>
            <p className="text-teal-700 text-sm">基础概念和入门问题</p>
          </a>
          <a href="/faq-advanced" className="block bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg p-6 transition-colors">
            <h3 className="text-lg font-bold text-gray-900 mb-2">进阶问题</h3>
            <p className="text-gray-700 text-sm">深入技术问题</p>
          </a>
          <a href="/troubleshooting" className="block bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg p-6 transition-colors">
            <h3 className="text-lg font-bold text-blue-900 mb-2">故障排查</h3>
            <p className="text-blue-700 text-sm">常见问题排查</p>
          </a>
        </div>
      </section>
    </div>
  );
};
