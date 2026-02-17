import { CodeBlock } from '../components';
import { useState } from 'react';

interface GovernanceCardProps {
  title: string;
  description: string;
  practices: string[];
  color: string;
}

const GovernanceCard: React.FC<GovernanceCardProps> = ({ title, description, practices, color }) => {
  const colorClasses = {
    blue: 'bg-blue-50 border-blue-200',
    green: 'bg-green-50 border-green-200',
    red: 'bg-red-50 border-red-200',
    purple: 'bg-purple-50 border-purple-200',
    orange: 'bg-orange-50 border-orange-200',
  };

  return (
    <div className={`p-6 border-2 rounded-lg ${colorClasses[color as keyof typeof colorClasses]}`}>
      <h3 className="text-2xl font-bold text-gray-900 mb-3">{title}</h3>
      <p className="text-gray-700 mb-4">{description}</p>
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
};

interface PracticeCardProps {
  title: string;
  level: 'beginner' | 'intermediate' | 'architect';
  description: string;
  example: string;
}

const PracticeCard: React.FC<PracticeCardProps> = ({ title, level, description, example }) => {
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
        <span className="font-semibold text-gray-600">示例:</span>
        <code className="ml-2 bg-white px-2 py-1 rounded text-xs">{example}</code>
      </div>
    </div>
  );
};

interface ScenarioCardProps {
  title: string;
  problem: string;
  solution: string;
  code: string;
}

const ScenarioCard: React.FC<ScenarioCardProps> = ({ title, problem, solution, code }) => {
  return (
    <div className="bg-white border-2 border-slate-200 rounded-lg p-5">
      <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
      <div className="mb-3">
        <h4 className="font-semibold text-red-600 mb-1">问题:</h4>
        <p className="text-sm text-gray-700">{problem}</p>
      </div>
      <div className="mb-3">
        <h4 className="font-semibold text-green-600 mb-1">方案:</h4>
        <p className="text-sm text-gray-700">{solution}</p>
      </div>
      <CodeBlock language="yaml" code={code} />
    </div>
  );
};

interface FaqCardProps {
  number: number;
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
}

const FaqCard: React.FC<FaqCardProps> = ({ number, question, answer, isOpen, onClick }) => {
  return (
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
};

export const ServiceGovernancePage: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* 页头 */}
      <div className="bg-gradient-to-r from-slate-700 to-slate-900 text-white rounded-lg p-6 mb-8">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-4xl font-bold mb-2">服务治理策略</h1>
            <p className="text-slate-200 text-lg">微服务架构的治理体系与最佳实践</p>
          </div>
          <div className="flex gap-3 text-sm">
            <span className="px-3 py-1 bg-white/20 rounded-full">🏗️ 架构师</span>
            <span className="px-3 py-1 bg-white/20 rounded-full">⏱️ 约70分钟</span>
            <span className="px-3 py-1 bg-white/20 rounded-full">📚 15个知识点</span>
          </div>
        </div>
      </div>

      {/* 什么是服务治理 */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">什么是服务治理?</h2>

        <div className="bg-white border-2 border-blue-200 rounded-lg p-6 mb-6">
          <p className="text-gray-700 text-lg mb-4">
            <strong>服务治理 (Service Governance)</strong> 是指在微服务架构中，对服务的整个生命周期进行管理的一套机制和策略。
            目标是确保微服务系统的<strong className="text-blue-600">可靠性、可扩展性、可观测性和安全性</strong>。
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="bg-blue-50 p-4 rounded">
              <h4 className="font-bold text-blue-900 mb-2">🎯 核心目标</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• 保证服务可用性 (99.9%+)</li>
                <li>• 控制服务间依赖</li>
                <li>• 快速定位问题</li>
                <li>• 支持水平扩展</li>
              </ul>
            </div>
            <div className="bg-green-50 p-4 rounded">
              <h4 className="font-bold text-green-900 mb-2">🔧 治理手段</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• 服务注册与发现</li>
                <li>• 配置管理</li>
                <li>• 流量控制</li>
                <li>• 熔断降级</li>
              </ul>
            </div>
          </div>
        </div>

        <h3 className="text-2xl font-bold text-gray-900 mb-4">为什么需要服务治理?</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-red-50 border-2 border-red-200 rounded-lg p-5">
            <h4 className="text-xl font-bold text-red-900 mb-3">❌ 没有服务治理的痛点</h4>
            <ul className="text-gray-700 space-y-2">
              <li>• 服务地址硬编码，无法动态扩展</li>
              <li>• 配置散落各处，修改困难</li>
              <li>• 雪崩效应，一个服务故障导致全系统崩溃</li>
              <li>• 无法控制流量，系统过载</li>
              <li>• 问题定位困难，排查耗时</li>
            </ul>
          </div>
          <div className="bg-green-50 border-2 border-green-200 rounded-lg p-5">
            <h4 className="text-xl font-bold text-green-900 mb-3">✅ 服务治理的价值</h4>
            <ul className="text-gray-700 space-y-2">
              <li>• 自动服务发现，支持弹性伸缩</li>
              <li>• 集中配置管理，支持动态刷新</li>
              <li>• 熔断降级，防止雪崩</li>
              <li>• 限流保护，系统稳定性高</li>
              <li>• 全链路追踪，快速定位问题</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 服务治理核心领域 */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">服务治理八大核心领域</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <GovernanceCard
            title="1. 服务注册与发现"
            description="服务的动态注册与自动发现机制"
            color="blue"
            practices={[
              'Nacos 作为注册中心',
              '健康检查机制',
              '服务元数据管理',
              '权重与实例隔离',
              '平滑上下线'
            ]}
          />
          <GovernanceCard
            title="2. 配置管理"
            description="集中式配置与动态刷新"
            color="green"
            practices={[
              'Nacos 配置中心',
              '命名空间隔离',
              '配置版本管理',
              '@RefreshScope 动态刷新',
              '灰度发布配置'
            ]}
          />
          <GovernanceCard
            title="3. 负载均衡"
            description="客户端负载均衡策略"
            color="purple"
            practices={[
              'LoadBalancer 客户端负载',
              '多种负载策略',
              '健康检查与故障隔离',
              '权重配置',
              '平滑权重调整'
            ]}
          />
          <GovernanceCard
            title="4. 流量控制"
            description="保护系统不被流量压垮"
            color="red"
            practices={[
              'Sentinel 限流规则',
              'QPS 并发限流',
              '线程池隔离',
              'Warm-up 预热',
              '匀速排队'
            ]}
          />
          <GovernanceCard
            title="5. 熔断降级"
            description="防止故障扩散，保护核心业务"
            color="orange"
            practices={[
              'Sentinel 熔断规则',
              '慢调用比例熔断',
              '异常比例熔断',
              'Fallback 降级策略',
              '自动恢复机制'
            ]}
          />
          <GovernanceCard
            title="6. 服务鉴权"
            description="保护 API 安全，防止未授权访问"
            color="blue"
            practices={[
              'Gateway 统一鉴权',
              'JWT Token 令牌',
              'RBAC 角色权限',
              'API 签名验证',
              '黑名单机制'
            ]}
          />
          <GovernanceCard
            title="7. 全链路追踪"
            description="可视化调用链路，快速定位问题"
            color="green"
            practices={[
              'SkyWalking APM',
              'Trace ID 透传',
              '慢查询分析',
              '服务拓扑图',
              '异常告警'
            ]}
          />
          <GovernanceCard
            title="8. 服务监控"
            description="实时监控服务健康状态"
            color="purple"
            practices={[
              'Prometheus 指标采集',
              'Grafana 可视化',
              'SLA 监控告警',
              '业务指标监控',
              '日志聚合分析'
            ]}
          />
        </div>
      </section>

      {/* 服务治理实战场景 */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">常见治理场景实战</h2>

        <div className="space-y-6">
          <ScenarioCard
            title="场景1: 秒杀系统流量保护"
            problem="秒杀活动开始，瞬间涌入百万级请求，导致系统崩溃"
            solution="通过 Sentinel 限流保护，只放行系统能处理的流量"
            code={`# Sentinel 限流规则
resources:
  - id: seckill_limit
    resource: POST:/api/seckill/order
    grade: 1  # QPS限流
    count: 1000  # 最多1000 QPS
    strategy: 0  # 直接拒绝
    controlBehavior: 0  # 快速失败

# 预热限流（防止冷启动）
  - id: seckill_warmup
    resource: GET:/api/seckill/goods
    grade: 1
    count: 500
    controlBehavior: 1  # Warm-up预热
    warmUpPeriodSec: 10  # 预热10秒`}
          />

          <ScenarioCard
            title="场景2: 依赖服务故障降级"
            problem="库存服务故障，导致订单服务大量线程阻塞，整个系统不可用"
            solution="通过 Sentinel 熔断降级，快速失败并返回默认值"
            code={`# Sentinel 熔断规则
resources:
  - id: inventory_circuit_breaker
    resource: GET:/api/inventory/check
    grade: 0  # 慢调用比例
    count: 1000  # 慢调用阈值 1000ms
    timeWindow: 10  # 熔断时长10秒
    minRequestAmount: 5  # 最小请求数
    statIntervalMs: 1000  # 统计时长1秒
    slowRatioThreshold: 0.5  # 慢调用比例50%

# Feign 配置
feign:
  sentinel:
    enabled: true
  client:
    config:
      default:
        connectTimeout: 2000
        readTimeout: 2000`}
          />

          <ScenarioCard
            title="场景3: 配置动态更新"
            problem="修改限流阈值需要重启服务，影响业务"
            solution="使用 Nacos 配置中心 + @RefreshScope 实现动态刷新"
            code={`# Nacos 配置（Data ID: seckill-service.yaml）
spring:
  cloud:
    nacos:
      config:
        refresh-enabled: true

# 限流配置
seckill:
 限流:
    qps: 1000
    warmup: 10
  商品:
    库存阈值: 1000

# 服务配置
@RefreshScope
@RestController
public class SeckillConfigController {

    @Value("$\{seckill.限流.qps}")
    private Integer qps;

    @GetMapping("/api/config/qps")
    public Integer getQps() {
        return qps;  // 动态刷新后立即生效
    }
}`}
          />
        </div>
      </section>

      {/* 服务治理最佳实践 */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">服务治理最佳实践</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <PracticeCard
            title="1. 服务注册健康检查"
            level="intermediate"
            description="合理配置健康检查，及时发现不健康实例"
            example="spring.cloud.nacos.discovery.heart-beat-interval=5000"
          />
          <PracticeCard
            title="2. 配置分级管理"
            level="architect"
            description="使用命名空间和分组隔离不同环境配置"
            example="dev/test/prod 命名空间隔离"
          />
          <PracticeCard
            title="3. 限流降级预案"
            level="architect"
            description="提前制定限流降级预案，保护核心业务"
            example="核心业务 QPS 1000，非核心业务 QPS 100"
          />
          <PracticeCard
            title="4. 服务分级治理"
            level="architect"
            description="根据业务重要性分级治理"
            example="核心业务 P0 > 重要业务 P1 > 一般业务 P2"
          />
          <PracticeCard
            title="5. 全链路压测"
            level="architect"
            description="定期进行全链路压测，发现系统瓶颈"
            example="模拟 10倍流量进行压测"
          />
          <PracticeCard
            title="6. 监控告警及时"
            level="intermediate"
            description="设置合理告警阈值，快速响应"
            example="错误率 > 1% 立即告警"
          />
        </div>
      </section>

      {/* 服务治理成熟度模型 */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">服务治理成熟度模型</h2>

        <div className="bg-white border-2 border-slate-200 rounded-lg p-6">
          <div className="space-y-6">
            <div className="border-l-4 border-red-500 pl-4">
              <h3 className="text-xl font-bold text-red-700 mb-2">Level 1: 基础治理 (入门)</h3>
              <ul className="text-gray-700 space-y-1">
                <li>✓ 服务注册与发现</li>
                <li>✓ 基础配置管理</li>
                <li>✓ 简单限流保护</li>
              </ul>
              <p className="text-sm text-gray-500 mt-2">适用场景：小型项目，团队规模 &lt; 10人</p>
            </div>

            <div className="border-l-4 border-yellow-500 pl-4">
              <h3 className="text-xl font-bold text-yellow-700 mb-2">Level 2: 进阶治理 (中级)</h3>
              <ul className="text-gray-700 space-y-1">
                <li>✓ 动态配置刷新</li>
                <li>✓ 熔断降级机制</li>
                <li>✓ 负载均衡策略</li>
                <li>✓ 基础监控告警</li>
              </ul>
              <p className="text-sm text-gray-500 mt-2">适用场景：中型项目，团队规模 10-50人</p>
            </div>

            <div className="border-l-4 border-blue-500 pl-4">
              <h3 className="text-xl font-bold text-blue-700 mb-2">Level 3: 高级治理 (高级)</h3>
              <ul className="text-gray-700 space-y-1">
                <li>✓ 服务分级治理</li>
                <li>✓ 全链路追踪</li>
                <li>✓ 服务鉴权与安全</li>
                <li>✓ 自动化运维</li>
              </ul>
              <p className="text-sm text-gray-500 mt-2">适用场景：大型项目，团队规模 50-200人</p>
            </div>

            <div className="border-l-4 border-green-500 pl-4">
              <h3 className="text-xl font-bold text-green-700 mb-2">Level 4: 智能治理 (专家)</h3>
              <ul className="text-gray-700 space-y-1">
                <li>✓ 自动弹性伸缩</li>
                <li>✓ 智能路由与灰度</li>
                <li>✓ 故障自愈</li>
                <li>✓ AI辅助决策</li>
              </ul>
              <p className="text-sm text-gray-500 mt-2">适用场景：超大规模系统，团队规模 &gt; 200人</p>
            </div>
          </div>
        </div>
      </section>

      {/* 常见问题 FAQ */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">常见问题</h2>

        <div className="space-y-4">
          <FaqCard
            number={1}
            question="Nacos 和 Eureka 有什么区别？"
            answer={`Nacos 相比 Eureka 的优势：

1. 功能更全面：
   - Nacos = 注册中心 + 配置中心
   - Eureka 仅作为注册中心

2. 性能更好：
   - Nacos 支持百万级实例注册
   - 采用 Distro 协议，性能优于 Eureka 的 AP 模型

3. 动态 DNS：
   - Nacos 支持 DNS 协议
   - 可与 Kubernetes 无缝集成

4. 控制台更强大：
   - Nacos 提供可视化配置管理
   - 支持配置版本管理和回滚

5. 国内生态：
   - Nacos 由阿里开源，国内社区活跃
   - 中文文档完善

结论：新项目优先选择 Nacos，老项目 Eureka 可逐步迁移。`}
            isOpen={openFaq === 1}
            onClick={() => toggleFaq(1)}
          />

          <FaqCard
            number={2}
            question="限流、熔断、降级有什么区别？"
            answer={"三者都是为了保护系统，但作用点和方式不同：\n\n【限流】限流是保护自己\n- 目的：防止系统被流量压垮\n- 场景：秒杀、大促等流量突增场景\n- 策略：QPS限流、并发限流、Warm-up预热\n- 配置：单机QPS 1000，超过直接拒绝\n\n【熔断】熔断是保护下游\n- 目的：防止故障扩散，保护系统稳定\n- 场景：依赖服务故障或响应过慢\n- 策略：慢调用熔断、异常比例熔断、异常数熔断\n- 配置：慢调用比例 > 50% 且持续10秒，熔断10秒\n\n【降级】降级是兜底方案\n- 目的：保证核心业务可用\n- 场景：非核心服务故障或资源不足\n- 策略：返回默认值、返回缓存、快速失败\n- 配置：推荐服务降级为静态页面\n\n实战组合：\n1. 限流保护：防止流量过载\n2. 熔断保护：防止故障扩散\n3. 降级兜底：保证核心业务\n\n示例：秒杀场景\n- 限流：只放行1000 QPS\n- 熔断：库存服务超时，自动熔断\n- 降级：返回\"排队中\"，避免大量请求打到库存服务"}
            isOpen={openFaq === 2}
            onClick={() => toggleFaq(2)}
          />

          <FaqCard
            number={3}
            question="如何设计服务治理的告警规则？"
            answer={`告警规则设计原则：合理设置阈值，避免告警风暴

【基础告警规则】

1. 服务可用性：
   - P0 服务：不可用立即告警（电话 + 短信）
   - P1 服务：不可用5分钟告警（短信）
   - P2 服务：不可用30分钟告警（邮件）

2. 错误率：
   - 错误率 > 1%：告警
   - 错误率 > 5%：严重告警
   - 错误率 > 10%：紧急告警

3. 响应时间：
   - P99 > 1s：告警
   - P99 > 3s：严重告警
   - P99 > 5s：紧急告警

4. QPS异常：
   - QPS 突增 > 3倍：告警（可能被攻击）
   - QPS 突降 > 50%：告警（服务异常）

5. 资源使用：
   - CPU > 80%：告警
   - 内存 > 80%：告警
   - 磁盘 > 85%：严重告警

【告警升级机制】

- L1告警：钉钉/企业微信通知
- L2告警：短信通知
- L3告警：电话通知

【告警降噪】

- 相同告警10分钟内只发送1次
- 非核心时间段（23:00-7:00）降低告警级别
- 维护窗口期暂停告警

【实战建议】

1. 先设置宽松阈值，观察一周
2. 根据实际情况调整阈值
3. 定期review告警规则，删除无效告警
4. 告警要可操作，附上处理手册`}
            isOpen={openFaq === 3}
            onClick={() => toggleFaq(3)}
          />
        </div>
      </section>

      {/* 下一步学习 */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">下一步学习</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <a href="/transaction-selection" className="block bg-gradient-to-br from-purple-50 to-purple-100 border-2 border-purple-200 rounded-lg p-6 hover:shadow-lg transition">
            <h3 className="text-xl font-bold text-purple-900 mb-2">📊 分布式事务选型</h3>
            <p className="text-gray-700 text-sm">掌握 AT、TCC、SAGA、XA 四种事务模式的选择</p>
          </a>
          <a href="/observability" className="block bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-200 rounded-lg p-6 hover:shadow-lg transition">
            <h3 className="text-xl font-bold text-green-900 mb-2">🔍 可观测性体系</h3>
            <p className="text-gray-700 text-sm">构建完整的监控、追踪、日志体系</p>
          </a>
        </div>
      </section>
    </div>
  );
};
