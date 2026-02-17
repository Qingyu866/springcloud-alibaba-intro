import { CodeBlock } from '../components';
import { useState } from 'react';

export const SkyWalkingPage: React.FC = () => {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  return (
    <div className="prose prose prose-slate max-w-none">
      {/* 页面头部 */}
      <div className="bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white rounded-lg p-6 mb-8">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-4xl font-bold mb-2">SkyWalking 链路追踪</h1>
            <p className="text-purple-50 text-lg">应用性能监控与分布式追踪</p>
          </div>
          <div className="flex gap-3 text-sm">
            <span className="px-3 py-1 bg-white/20 rounded-full">🔧 进阶</span>
            <span className="px-3 py-1 bg-white/20 rounded-full">⏱️ 约40分钟</span>
            <span className="px-3 py-1 bg-white/20 rounded-full">📚 9个知识点</span>
          </div>
        </div>
      </div>

      {/* 什么是 SkyWalking */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">什么是 SkyWalking?</h2>
        <div className="bg-purple-50 border-l-4 border-purple-500 p-6 rounded-lg mb-6">
          <p className="text-lg text-gray-800 leading-relaxed mb-4">
            <strong>SkyWalking</strong> 是一款开源的应用性能监控（APM）系统，
            专为微服务、云原生架构而设计。
          </p>
          <p className="text-gray-700 mb-4">
            SkyWalking 提供了<strong>分布式追踪、服务拓扑图、性能指标分析</strong>等功能，
            帮助开发者快速定位和解决性能问题。
          </p>
          <div className="bg-white p-4 rounded border border-purple-200 mt-4">
            <h4 className="font-bold text-gray-900 mb-2">💡 核心特性</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start">
                <span className="text-purple-600 mr-2">✓</span>
                <span><strong>分布式追踪</strong> - 可视化完整调用链路</span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-600 mr-2">✓</span>
                <span><strong>服务拓扑图</strong> - 自动生成服务依赖关系图</span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-600 mr-2">✓</span>
                <span><strong>性能分析</strong> - 慢查询、异常统计</span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-600 mr-2">✓</span>
                <span><strong>零侵入</strong> - Java Agent 字节码注入</span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-600 mr-2">✓</span>
                <span><strong>国产开源</strong> - 华为主导开源</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <FeatureCard icon="🔍" title="链路追踪" desc="可视化调用链" color="purple" />
          <FeatureCard icon="📊" title="服务拓扑" desc="依赖关系图" color="fuchsia" />
          <FeatureCard icon="📈" title="性能监控" desc="实时指标" color="pink" />
          <FeatureCard icon="⚠️" title="告警通知" desc="异常告警" color="red" />
        </div>
      </section>

      {/* 为什么需要链路追踪 */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">为什么需要链路追踪?</h2>

        <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-lg mb-6">
          <h4 className="font-bold text-gray-900 mb-3">❌ 微服务定位问题的痛点</h4>
          <p className="text-gray-700 text-sm mb-2">
            在微服务架构中，一个请求可能经过多个服务：
          </p>
          <div className="bg-white p-3 rounded border border-red-200 mb-3">
            <code className="text-xs">
              用户请求 → Gateway → Order Service → Inventory Service → Payment Service
            </code>
          </div>
          <p className="text-gray-700 text-sm">
            <strong>问题：</strong>如果用户响应慢，如何定位是哪个服务的问题？
          </p>
          <ul className="text-sm text-gray-700 mt-2 space-y-1">
            <li>• 无法看到完整的调用链路</li>
            <li>• 难以定位性能瓶颈</li>
            <li>• 异常排查困难</li>
            <li>• 缺乏全局视图</li>
          </ul>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-green-50 border-2 border-green-200 rounded-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-3">✅ 链路追踪的价值</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start">
                <span className="text-green-600 mr-2">✓</span>
                <span><strong>可视化调用链</strong> - 清晰展示请求经过的所有服务</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2">✓</span>
                <span><strong>性能分析</strong> - 快速定位慢查询和瓶颈</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2">✓</span>
                <span><strong>异常追踪</strong> - 自动捕获和记录异常</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2">✓</span>
                <span><strong>根因分析</strong> - 找到问题的根本原因</span>
              </li>
            </ul>
          </div>

          <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-3">📊 典型应用场景</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span><strong>慢查询定位</strong> - 快速找到响应慢的服务</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span><strong>故障排查</strong> - 异常快速定位</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span><strong>容量规划</strong> - 了解各服务负载</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span><strong>性能优化</strong> - 基于数据优化</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* 核心概念 */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">核心概念</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ConceptCard3
            title="Trace (链路)"
            level="beginner"
            desc="一个请求在系统中的完整调用路径"
            example="用户下单 → 订单 → 库存 → 支付"
          />
          <ConceptCard3
            title="Segment (片段)"
            level="beginner"
            desc="单个服务内的调用信息"
            example="订单服务内的方法调用"
          />
          <ConceptCard3
            title="Span (跨度)"
            level="beginner"
            desc="最小的工作单元，一个方法或一次数据库调用"
            example="updateOrder() 方法"
          />
          <ConceptCard3
            title="Service (服务)"
            level="beginner"
            desc="一个应用或服务的实例"
            example="order-service-1"
          />
        </div>
      </section>

      {/* 快速开始 */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">快速开始</h2>
        <p className="text-gray-700 mb-6">通过一个完整的示例，学习如何使用 SkyWalking 进行应用监控。</p>

        <h3>步骤 1: 下载 SkyWalking</h3>
        <CodeBlock
          language="bash"
          code={`# 下载 SkyWalking OAP Server
wget https://archive.apache.org/dist/skywalking/10.0.0/apache-skywalking-apm-10.0.0.tar.gz
tar -xzf apache-skywalking-apm-10.0.0.tar.gz

# 或使用 Docker 启动（推荐）
docker run -d --name skywalking \\
  -p 11800:11800 \\
  -p 12800:12800 \\
  -e SW_STORAGE=elasticsearch \\
  -e SW_ES_URL=localhost:9200 \\
  apache/skywalking-oap-server:10.0.0

# 11800: UI 端口
# 12800: gRPC 端口（Agent 上报数据）`}
        />

        <h3>步骤 2: 配置 Agent</h3>
        <CodeBlock
          language="bash"
          code={`# 在应用启动参数中添加 Agent
java -javaagent:/path/to/skywalking-agent.jar \\
     -Dskywalking.agent.service_name=order-service \\
     -Dskywalking.collector.backend_service=localhost:11800 \\
     -jar order-service.jar

# 或在环境变量中配置
export SW_AGENT_NAME=order-service
export SW_AGENT_COLLECTOR_BACKEND_SERVICE=localhost:11800
export JAVA_AGENT=-javaagent:/path/to/skywalking-agent.jar

java $JAVA_AGENT -jar order-service.jar`}
        />

        <h3>步骤 3: 访问 SkyWalking UI</h3>
        <p className="text-gray-700 mb-4">打开浏览器访问：http://localhost:11800</p>

        <div className="bg-gray-50 p-4 rounded border border-gray-300">
          <h4 className="font-semibold text-gray-900 mb-3">SkyWalking 主要功能模块：</h4>
          <ul className="space-y-2 text-sm text-gray-700">
            <li>• <strong>仪表盘</strong> - 全局概览和关键指标</li>
            <li>• <strong>拓扑图</strong> - 服务依赖关系可视化</li>
            <li>• <strong>追踪</strong> - 链路追踪查询和分析</li>
            <li>• <strong>性能分析</strong> - 慢查询、异常统计</li>
            <li>• <strong>告警</strong> - 告警规则和通知</li>
          </ul>
        </div>
      </section>

      {/* 服务拓扑图 */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">服务拓扑图</h2>

        <div className="bg-purple-50 border-l-4 border-purple-500 p-6 rounded-lg mb-6">
          <h4 className="font-bold text-gray-900 mb-2">🕸️ 拓扑图的价值</h4>
          <p className="text-gray-700 text-sm">
            SkyWalking 会自动采集服务间的调用关系，生成<strong>实时的服务拓扑图</strong>，
            直观展示服务依赖、流量大小、响应时间等信息。
          </p>
        </div>

        <div className="space-y-4">
          <div className="bg-white border-2 border-purple-200 rounded-lg p-6">
            <h4 className="font-semibold text-gray-900 mb-3">拓扑图功能特性</h4>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
              <li className="flex items-start">
                <span className="text-purple-600 mr-2">✓</span>
                <span><strong>自动发现</strong> - 自动发现服务依赖关系</span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-600 mr-2">✓</span>
                <span><strong>实时更新</strong> - 动态展示调用关系变化</span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-600 mr-2">✓</span>
                <span><strong>流量展示</strong> - 线条粗细代表流量大小</span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-600 mr-2">✓</span>
                <span><strong>状态标识</strong> - 健康、慢、异常状态标识</span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-600 mr-2">✓</span>
                <span><strong>点击钻取</strong> - 点击服务查看详细指标</span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-600 mr-2">✓</span>
                <span><strong>调用链追踪</strong> - 从拓扑图直接追踪</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* 慢查询分析 */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">慢查询分析</h2>

        <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-lg mb-6">
          <h4 className="font-bold text-gray-900 mb-2">⚡ 慢查询的危害</h4>
          <p className="text-gray-700 text-sm">
            慢查询直接影响用户体验和系统性能。通过 SkyWalking 的慢查询分析功能，
            可以快速定位响应慢的服务、接口和数据库操作。
          </p>
        </div>

        <h3>慢查询分析功能</h3>
        <CodeBlock
          language="text"
          code={`SkyWalking 提供的慢查询分析功能：

1. 端点慢查询排行
   - 列出响应时间最慢的接口
   - 支持按服务、时间范围筛选
   - 可视化展示耗时分布

2. 数据库慢查询
   - 自动捕获 SQL 语句执行时间
   - 慢 SQL 排行和分析
   - 支持查看执行计划和参数

3. 调用链路分析
   - 从慢查询直接跳转到调用链
   - 查看完整的调用树
   - 定位耗时的环节

4. 性能指标统计
   - 百分位统计（P50、P90、P99）
   - 响应时间趋势图
   - 吞吐量（TPS）监控`}
        />
      </section>

      {/* 最佳实践 */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">最佳实践</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <BestPracticeCard3
            title="Agent 配置"
            practices={[
              "生产环境使用采样策略（如50%）",
              "合理配置采样率降低性能损耗",
              "开启慢查询阈值捕获",
              "配置告警规则及时发现问题",
              "定期清理历史数据"
            ]}
          />
          <BestPracticeCard3
            title="命名规范"
            practices={[
              "服务名统一规范（如 service-name）",
              "端点名称清晰易懂",
              "使用 TracingContext 传递自定义标签",
              "关键业务添加 Tag",
              "规范 TraceID 传递"
            ]}
          />
          <BestPracticeCard3
            title="性能优化"
            practices={[
              "Agent 采样降低性能损耗",
              "OAP 服务使用集群模式",
              "Elasticsearch 存储优化",
              "定期清理过期数据",
              "合理配置数据保留天数"
            ]}
          />
          <BestPracticeCard3
            title="告警配置"
            practices={[
              "配置响应时间告警",
              "配置成功率告警",
              "配置慢查询告警",
              "配置异常告警",
              "集成钉钉/企业微信通知"
            ]}
          />
          <BestPracticeCard3
            title="数据分析"
            practices={[
              "定期查看慢查询排行",
              "分析性能趋势",
              "对比性能基线",
              "关注异常监控",
              "记录性能优化记录"
            ]}
          />
          <BestPracticeCard3
            title="团队协作"
            practices={[
              "统一 SkyWalking 平台",
              "共享仪表盘和配置",
              "制定性能基线",
              "建立问题响应流程",
              "定期性能总结"
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
            question="SkyWalking 对性能有多大影响?"
            answer="SkyWalking Agent 的影响极小：
                 1) 字节码注入，无代码侵入
                 2) 性能损耗通常在 5-10%
                 3) 可通过采样降低损耗
                 4) 生产环境建议 50% 采样率
                 总体来说，带来的价值远超过性能损耗"
            isOpen={expandedFaq === 1}
            onClick={() => setExpandedFaq(expandedFaq === 1 ? null : 1)}
          />
          <FaqCard2
            number={2}
            question="如何实现跨 Trace 传递?"
            answer="SkyWalking 自动集成主流框架：
                 1) HTTP 调用自动传递（通过 Http Header）
                 2) Spring Cloud Alibaba 集成 Nacos、Feign
                 3) 数据库调用自动追踪
                 4) 消息队列自动追踪
                 5) 异步线程需要手动传递 Context"
            isOpen={expandedFaq === 2}
            onClick={() => setExpandedFaq(expandedFaq === 2 ? null : 2)}
          />
          <FaqCard2
            number={3}
            question="SkyWalking 如何存储数据?"
            answer="SkyWalking 支持多种存储方案：
                 1) H2 - 轻量级，适合演示和测试
                 2) MySQL - 关系型数据库
                 3) Elasticsearch - 推荐生产环境，性能好
                 4) TiDB - 分布式数据库
                 推荐：生产环境使用 Elasticsearch"
            isOpen={expandedFaq === 3}
            onClick={() => setExpandedFaq(expandedFaq === 3 ? null : 3)}
          />
        </div>
      </section>

      {/* 下一步学习 */}
      <section className="bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white p-8 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">🎉 恭喜！核心组件全部完成</h2>
        <p className="text-lg mb-4">您已掌握所有核心组件，下一步进入架构师进阶阶段！</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <NextStepCard2 title="微服务拆分" description="服务拆分原则" link="/service-decomposition" icon="🔪" />
          <NextStepCard2 title="服务治理" description="治理策略实战" link="/service-governance" icon="🛠️" />
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
    fuchsia: 'bg-fuchsia-50 border-fuchsia-200',
    pink: 'bg-pink-50 border-pink-200',
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
    <div className="bg-white border-2 border-purple-200 rounded-lg p-5">
      <h3 className="text-xl font-bold text-gray-900 mb-4">{title}</h3>
      <ul className="space-y-2">
        {practices.map((practice, index) => (
          <li key={index} className="flex items-start">
            <span className="text-purple-600 mr-2 flex-shrink-0">✓</span>
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
