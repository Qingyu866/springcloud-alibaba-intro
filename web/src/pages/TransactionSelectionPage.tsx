import { CodeBlock } from '../components';
import { useState } from 'react';

interface ModeCardProps {
  title: string;
  subtitle: string;
  icon: string;
  color: string;
  pros: string[];
  cons: string[];
  useCases: string[];
}

const ModeCard: React.FC<ModeCardProps> = ({ title, subtitle, icon, color, pros, cons, useCases }) => {
  const colorClasses = {
    blue: 'bg-blue-50 border-blue-200',
    green: 'bg-green-50 border-green-200',
    purple: 'bg-purple-50 border-purple-200',
    orange: 'bg-orange-50 border-orange-200',
    red: 'bg-red-50 border-red-200',
  };

  return (
    <div className={`p-6 border-2 rounded-lg ${colorClasses[color as keyof typeof colorClasses]}`}>
      <div className="flex items-center mb-4">
        <span className="text-4xl mr-3">{icon}</span>
        <div>
          <h3 className="text-2xl font-bold text-gray-900">{title}</h3>
          <p className="text-sm text-gray-600">{subtitle}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <h4 className="font-bold text-green-700 mb-2">✅ 优点</h4>
          <ul className="text-sm text-gray-700 space-y-1">
            {pros.map((pro, index) => (
              <li key={index}>• {pro}</li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-red-700 mb-2">❌ 缺点</h4>
          <ul className="text-sm text-gray-700 space-y-1">
            {cons.map((con, index) => (
              <li key={index}>• {con}</li>
            ))}
          </ul>
        </div>
      </div>

      <div>
        <h4 className="font-bold text-blue-700 mb-2">🎯 适用场景</h4>
        <ul className="text-sm text-gray-700 space-y-1">
          {useCases.map((useCase, index) => (
            <li key={index}>• {useCase}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

interface ComparisonRowProps {
  feature: string;
  at: string;
  tcc: string;
  saga: string;
  xa: string;
}

const ComparisonRow: React.FC<ComparisonRowProps> = ({ feature, at, tcc, saga, xa }) => {
  return (
    <tr className="border-b border-gray-200">
      <td className="px-4 py-3 font-semibold text-gray-900 bg-gray-50">{feature}</td>
      <td className="px-4 py-3 text-center">{at}</td>
      <td className="px-4 py-3 text-center">{tcc}</td>
      <td className="px-4 py-3 text-center">{saga}</td>
      <td className="px-4 py-3 text-center">{xa}</td>
    </tr>
  );
};

interface ScenarioCardProps {
  title: string;
  description: string;
  recommendation: string;
  reason: string;
}

const ScenarioCard: React.FC<ScenarioCardProps> = ({ title, description, recommendation, reason }) => {
  return (
    <div className="bg-white border-2 border-slate-200 rounded-lg p-5">
      <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
      <p className="text-gray-700 text-sm mb-3">{description}</p>
      <div className="bg-blue-50 p-3 rounded mb-2">
        <span className="font-bold text-blue-900">推荐方案:</span>
        <span className="ml-2 text-blue-800">{recommendation}</span>
      </div>
      <p className="text-sm text-gray-600">
        <span className="font-semibold">原因:</span> {reason}
      </p>
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

export const TransactionSelectionPage: React.FC = () => {
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
            <h1 className="text-4xl font-bold mb-2">分布式事务选型</h1>
            <p className="text-slate-200 text-lg">四种事务模式的深度对比与选型策略</p>
          </div>
          <div className="flex gap-3 text-sm">
            <span className="px-3 py-1 bg-white/20 rounded-full">🏗️ 架构师</span>
            <span className="px-3 py-1 bg-white/20 rounded-full">⏱️ 约80分钟</span>
            <span className="px-3 py-1 bg-white/20 rounded-full">📚 14个知识点</span>
          </div>
        </div>
      </div>

      {/* 为什么需要分布式事务选型 */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">为什么需要分布式事务选型?</h2>

        <div className="bg-white border-2 border-blue-200 rounded-lg p-6 mb-6">
          <p className="text-gray-700 text-lg mb-4">
            <strong>分布式事务</strong> 是指在微服务架构中，跨多个服务或数据库的操作需要保证数据一致性。
            由于<strong className="text-red-600">CAP 理论</strong>的限制，无法同时满足一致性、可用性、分区容错性，
            因此需要根据业务场景选择合适的事务模式。
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-5">
              <h3 className="text-xl font-bold text-yellow-900 mb-3">⚠️ 选型错误的影响</h3>
              <ul className="text-gray-700 space-y-2">
                <li>• 性能严重下降（XA 模式锁资源）</li>
                <li>• 代码复杂度高（TCC 需要编写三个阶段）</li>
                <li>• 数据一致性风险（SAGA 无法自动回滚）</li>
                <li>• 维护成本高（需要补偿机制）</li>
              </ul>
            </div>

            <div className="bg-green-50 border-2 border-green-200 rounded-lg p-5">
              <h3 className="text-xl font-bold text-green-900 mb-3">✅ 正确选型的价值</h3>
              <ul className="text-gray-700 space-y-2">
                <li>• 性能最优（AT 模式无锁自动提交）</li>
                <li>• 代码简洁（AT 对业务零侵入）</li>
                <li>• 一致性保证（XA 强一致性）</li>
                <li>• 易于维护（Seata 统一管理）</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 分布式事务基础理论 */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">分布式事务基础理论</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-white border-2 border-purple-200 rounded-lg p-6">
            <h3 className="text-2xl font-bold text-purple-900 mb-4">📐 CAP 理论</h3>
            <div className="space-y-3">
              <div className="bg-purple-50 p-3 rounded">
                <h4 className="font-bold text-purple-800 mb-1">C - Consistency 一致性</h4>
                <p className="text-sm text-gray-700">所有节点在同一时间看到相同的数据</p>
              </div>
              <div className="bg-purple-50 p-3 rounded">
                <h4 className="font-bold text-purple-800 mb-1">A - Availability 可用性</h4>
                <p className="text-sm text-gray-700">每个请求都能得到响应（成功或失败）</p>
              </div>
              <div className="bg-purple-50 p-3 rounded">
                <h4 className="font-bold text-purple-800 mb-1">P - Partition Tolerance 分区容错</h4>
                <p className="text-sm text-gray-700">系统在网络分区时仍能继续运行</p>
              </div>
            </div>
            <div className="mt-4 bg-yellow-100 p-3 rounded border border-yellow-300">
              <p className="text-sm font-semibold text-yellow-900">
                💡 CAP 定理: 在分布式系统中，最多只能同时满足两项，P 是必须的，因此只能在 CA 之间权衡
              </p>
            </div>
          </div>

          <div className="bg-white border-2 border-blue-200 rounded-lg p-6">
            <h3 className="text-2xl font-bold text-blue-900 mb-4">🔧 BASE 理论</h3>
            <div className="space-y-3">
              <div className="bg-blue-50 p-3 rounded">
                <h4 className="font-bold text-blue-800 mb-1">BA - Basically Available 基本可用</h4>
                <p className="text-sm text-gray-700">允许损失部分可用性，核心功能可用</p>
              </div>
              <div className="bg-blue-50 p-3 rounded">
                <h4 className="font-bold text-blue-800 mb-1">S - Soft State 软状态</h4>
                <p className="text-sm text-gray-700">允许数据存在中间状态，不影响系统可用性</p>
              </div>
              <div className="bg-blue-50 p-3 rounded">
                <h4 className="font-bold text-blue-800 mb-1">E - Eventually Consistent 最终一致性</h4>
                <p className="text-sm text-gray-700">经过一段时间后，所有节点数据最终一致</p>
              </div>
            </div>
            <div className="mt-4 bg-green-100 p-3 rounded border border-green-300">
              <p className="text-sm font-semibold text-green-900">
                💡 BASE 是对 CAP 中 AP 的延伸，通过软状态和最终一致性来提高系统可用性
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white border-2 border-orange-200 rounded-lg p-6">
          <h3 className="text-2xl font-bold text-orange-900 mb-4">🎯 强一致性 vs 最终一致性</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-xl font-bold text-red-700 mb-3">强一致性 (CP)</h4>
              <ul className="text-gray-700 space-y-2">
                <li>✓ 写入后立即可读到最新数据</li>
                <li>✓ 数据严格一致</li>
                <li>✗ 性能较差（需要加锁）</li>
                <li>✗ 可用性降低（可能阻塞）</li>
              </ul>
              <p className="mt-3 text-sm text-gray-600">
                <strong>适用:</strong> 金融交易、库存扣减等对一致性要求高的场景
              </p>
            </div>
            <div>
              <h4 className="text-xl font-bold text-green-700 mb-3">最终一致性 (AP)</h4>
              <ul className="text-gray-700 space-y-2">
                <li>✓ 性能好（无锁或乐观锁）</li>
                <li>✓ 可用性高（不阻塞）</li>
                <li>✗ 短期内数据可能不一致</li>
                <li>✗ 需要补偿机制</li>
              </ul>
              <p className="mt-3 text-sm text-gray-600">
                <strong>适用:</strong> 社交动态、订单创建等对性能要求高的场景
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 四种事务模式详解 */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">四种事务模式详解</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ModeCard
            title="AT 模式"
            subtitle="Automatic Transaction (自动事务)"
            icon="🚀"
            color="green"
            pros={[
              '对业务零侵入，无需编写额外代码',
              '性能好，使用自动提交和乐观锁',
              '支持自动回滚，无需手动补偿',
              '开发效率高，使用简单',
              'Seata 默认模式，生态成熟'
            ]}
            cons={[
              '存在脏读风险（隔离性问题）',
              '需要数据库支持本地事务',
              '全局锁可能影响性能',
              '不支持非关系型数据库'
            ]}
            useCases={[
              '常规业务场景（订单、支付等）',
              '基于关系型数据库的应用',
              '对性能和开发效率有要求的场景',
              '中低并发场景'
            ]}
          />

          <ModeCard
            title="TCC 模式"
            subtitle="Try-Confirm-Cancel (尝试-确认-取消)"
            icon="🔧"
            color="blue"
            pros={[
              '性能最佳，无全局锁',
              '支持跨数据库、跨服务',
              '一致性强，两阶段保证',
              '灵活度高，可定制业务逻辑',
              '适用于高并发场景'
            ]}
            cons={[
              '代码侵入性强，需要编写三个方法',
              '开发成本高，逻辑复杂',
              '需要处理空回滚、悬挂等异常',
              '测试难度大',
              '维护成本高'
            ]}
            useCases={[
              '高并发核心业务（秒杀、抢购）',
              '库存扣减、账户扣款等',
              '对性能要求极高的场景',
              '复杂业务流程'
            ]}
          />

          <ModeCard
            title="SAGA 模式"
            subtitle="长事务解决方案"
            icon="📋"
            color="purple"
            pros={[
              '适用于长事务流程',
              '支持服务编排',
              '可读性好，易于理解',
              '性能较好（异步执行）',
              '适合复杂业务场景'
            ]}
            cons={[
              '无法自动回滚，需要编写补偿逻辑',
              '存在中间状态，数据短暂不一致',
              '无法保证隔离性',
              '需要处理补偿顺序',
              '调试困难'
            ]}
            useCases={[
              '长流程业务（订机票+订酒店+租车）',
              '跨多个微服务的业务流程',
              '电商平台下单流程',
              '工作流引擎'
            ]}
          />

          <ModeCard
            title="XA 模式"
            subtitle="两阶段提交协议 (2PC)"
            icon="🔒"
            color="red"
            pros={[
              '强一致性，ACID 特性',
              '对业务代码无侵入',
              '标准协议，支持广泛',
              '自动回滚，无需手动补偿',
              '数据库原生支持'
            ]}
            cons={[
              '性能最差，长时间锁资源',
              '阻塞式协议，可用性低',
              '单点故障风险（协调者）',
              '不适合长事务',
              '无法用于高并发场景'
            ]}
            useCases={[
              '传统单体应用迁移',
              '对一致性要求极高的金融场景',
              '低并发后台管理系统',
              '传统行业应用'
            ]}
          />
        </div>
      </section>

      {/* 四种模式对比表 */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">四种模式全方位对比</h2>

        <div className="bg-white border-2 border-slate-200 rounded-lg p-6 overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gradient-to-r from-slate-700 to-slate-900 text-white">
                <th className="px-4 py-3 text-left">对比维度</th>
                <th className="px-4 py-3 text-center">AT</th>
                <th className="px-4 py-3 text-center">TCC</th>
                <th className="px-4 py-3 text-center">SAGA</th>
                <th className="px-4 py-3 text-center">XA</th>
              </tr>
            </thead>
            <tbody>
              <ComparisonRow
                feature="一致性"
                at="最终一致"
                tcc="最终一致"
                saga="最终一致"
                xa="强一致"
              />
              <ComparisonRow
                feature="性能"
                at="⭐⭐⭐⭐"
                tcc="⭐⭐⭐⭐⭐"
                saga="⭐⭐⭐⭐"
                xa="⭐⭐"
              />
              <ComparisonRow
                feature="代码侵入"
                at="无"
                tcc="高"
                saga="中"
                xa="无"
              />
              <ComparisonRow
                feature="开发难度"
                at="⭐"
                tcc="⭐⭐⭐⭐⭐"
                saga="⭐⭐⭐"
                xa="⭐"
              />
              <ComparisonRow
                feature="适用场景"
                at="常规业务"
                tcc="高并发核心"
                saga="长流程"
                xa="传统迁移"
              />
              <ComparisonRow
                feature="是否需要数据库"
                at="是"
                tcc="否"
                saga="否"
                xa="是"
              />
              <ComparisonRow
                feature="隔离性"
                at="读写隔离"
                tcc="业务隔离"
                saga="无"
                xa="完全隔离"
              />
              <ComparisonRow
                feature="自动回滚"
                at="是"
                tcc="否"
                saga="否"
                xa="是"
              />
            </tbody>
          </table>
        </div>
      </section>

      {/* 选型决策树 */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">选型决策树</h2>

        <div className="bg-white border-2 border-blue-200 rounded-lg p-6">
          <div className="space-y-4">
            <div className="bg-blue-50 p-4 rounded-lg border-2 border-blue-200">
              <h3 className="text-xl font-bold text-blue-900 mb-3">🌳 决策流程</h3>
              <div className="text-gray-700 space-y-3">
                <p><strong>Q1: 是否需要强一致性（ACID）?</strong></p>
                <ul className="ml-6 space-y-2">
                  <li>→ 是: 选择 <span className="font-bold text-red-700">XA 模式</span></li>
                  <li>→ 否: 继续 Q2</li>
                </ul>

                <p><strong>Q2: 是否是长事务流程（多个服务串联）?</strong></p>
                <ul className="ml-6 space-y-2">
                  <li>→ 是: 选择 <span className="font-bold text-purple-700">SAGA 模式</span></li>
                  <li>→ 否: 继续 Q3</li>
                </ul>

                <p><strong>Q3: 是否是高并发核心业务（QPS &gt; 10000）?</strong></p>
                <ul className="ml-6 space-y-2">
                  <li>→ 是: 选择 <span className="font-bold text-blue-700">TCC 模式</span></li>
                  <li>→ 否: 选择 <span className="font-bold text-green-700">AT 模式</span></li>
                </ul>
              </div>
            </div>

            <div className="bg-yellow-50 p-4 rounded-lg border-2 border-yellow-200">
              <h3 className="text-xl font-bold text-yellow-900 mb-3">⚡ 快速选型参考</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white p-3 rounded">
                  <h4 className="font-bold text-gray-900 mb-2">默认首选: AT 模式</h4>
                  <p className="text-sm text-gray-700">
                    80% 的业务场景适用，开发效率高，性能好
                  </p>
                </div>
                <div className="bg-white p-3 rounded">
                  <h4 className="font-bold text-gray-900 mb-2">高并发核心: TCC 模式</h4>
                  <p className="text-sm text-gray-700">
                    秒杀、抢购等高并发场景，性能最优
                  </p>
                </div>
                <div className="bg-white p-3 rounded">
                  <h4 className="font-bold text-gray-900 mb-2">长流程: SAGA 模式</h4>
                  <p className="text-sm text-gray-700">
                    订机票+订酒店等长业务流程
                  </p>
                </div>
                <div className="bg-white p-3 rounded">
                  <h4 className="font-bold text-gray-900 mb-2">强一致性: XA 模式</h4>
                  <p className="text-sm text-gray-700">
                    传统金融系统，低并发后台管理
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 实际业务场景选型 */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">实际业务场景选型</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ScenarioCard
            title="场景1: 电商下单"
            description="用户下单 → 扣减库存 → 创建订单 → 扣减余额"
            recommendation="AT 模式"
            reason="常规业务场景，对性能和一致性都有要求，AT 模式开发效率高，性能好"
          />

          <ScenarioCard
            title="场景2: 秒杀抢购"
            description="瞬时高并发 QPS 50000+，快速扣减库存"
            recommendation="TCC 模式"
            reason="高并发核心业务，需要极致性能，TCC 无全局锁，性能最佳"
          />

          <ScenarioCard
            title="场景3: 差旅预订"
            description="订机票 → 订酒店 → 租车 → 接送机，多个服务串联"
            recommendation="SAGA 模式"
            reason="长事务流程，涉及多个独立服务，SAGA 适合服务编排"
          />

          <ScenarioCard
            title="场景4: 跨行转账"
            description="银行间转账，必须保证资金安全，不允许任何差错"
            recommendation="XA 模式"
            reason="金融核心业务，强一致性要求，低并发场景，XA 强一致性最可靠"
          />

          <ScenarioCard
            title="场景5: 支付回调"
            description="第三方支付回调 → 更新订单状态 → 发放优惠券 → 通知用户"
            recommendation="AT 模式"
            reason="常规业务流程，AT 模式足够，开发效率高"
          />

          <ScenarioCard
            title="场景6: 积分兑换"
            description="扣减积分 → 发放礼品 → 创建物流订单，高并发场景"
            recommendation="TCC 模式"
            reason="高并发业务，需要精确控制库存和积分，TCC 性能最优"
          />
        </div>
      </section>

      {/* 混合使用策略 */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">混合使用策略</h2>

        <div className="bg-white border-2 border-green-200 rounded-lg p-6 mb-6">
          <h3 className="text-2xl font-bold text-green-900 mb-4">🎨 根据业务特点灵活组合</h3>

          <div className="space-y-6">
            <div className="bg-green-50 p-5 rounded-lg border border-green-200">
              <h4 className="text-xl font-bold text-green-900 mb-3">策略1: 核心业务 TCC + 普通业务 AT</h4>
              <p className="text-gray-700 mb-3">
                秒杀系统使用 TCC 模式，保证高并发下的性能和一致性；普通订单使用 AT 模式，提高开发效率。
              </p>
              <CodeBlock
                language="java"
                code={`// 秒杀服务 - TCC 模式
@LocalTCC
public class SeataTccService {

    @TwoPhaseBusinessAction(
        name = "reduceStockTCC",
        commitMethod = "commit",
        rollbackMethod = "rollback"
    )
    public boolean reduceStock(
        BusinessActionContext context,
        @BusinessActionContextParameter(paramName = "productId") Long productId,
        int count
    ) {
        // Try: 预留库存
        return stockService.reserve(productId, count);
    }

    public boolean commit(BusinessActionContext context) {
        // Confirm: 真正扣减库存
        return stockService.confirmReduce(...);
    }

    public boolean rollback(BusinessActionContext context) {
        // Cancel: 释放预留库存
        return stockService.releaseReserve(...);
    }
}

// 普通订单服务 - AT 模式
@GlobalTransactional
public void createOrder(OrderDTO orderDTO) {
    // 自动管理事务，无需额外代码
    orderMapper.insert(orderDTO);
    stockService.reduceStock(orderDTO.getProductId(), orderDTO.getCount());
}`}
              />
            </div>

            <div className="bg-blue-50 p-5 rounded-lg border border-blue-200">
              <h4 className="text-xl font-bold text-blue-900 mb-3">策略2: 长流程 SAGA + 短流程 AT</h4>
              <p className="text-gray-700 mb-3">
                复杂业务编排使用 SAGA 模式，简单事务使用 AT 模式。
              </p>
              <CodeBlock
                language="java"
                code={`// 差旅预订 - SAGA 模式
@SagaTask(code = "bookFlight", name = "预订机票")
public void bookFlight(TravelOrder order) {
    flightService.book(order);
}

@SagaTask(code = "confirmFlight", name = "确认机票", outputClazz = TravelOrder.class)
public TravelOrder confirmFlight(TravelOrder order) {
    return flightService.confirm(order);
}

// 账户扣款 - AT 模式（SAGA 流程中的子事务）
@GlobalTransactional
public void deductMoney(Account account, BigDecimal amount) {
    // AT 模式，自动管理
    accountMapper.deduct(account.getId(), amount);
}`}
              />
            </div>
          </div>
        </div>
      </section>

      {/* 最佳实践 */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">分布式事务最佳实践</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-300 rounded-lg p-5">
            <h3 className="text-xl font-bold text-green-900 mb-3">✅ 推荐做法</h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <span className="text-green-600 mr-2 flex-shrink-0">✓</span>
                <span>默认使用 AT 模式，只在必要时选择其他模式</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2 flex-shrink-0">✓</span>
                <span>合理设置超时时间，避免长事务</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2 flex-shrink-0">✓</span>
                <span>幂等性设计，避免重复提交</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2 flex-shrink-0">✓</span>
                <span>TCC 模式要处理空回滚、悬挂等异常</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2 flex-shrink-0">✓</span>
                <span>监控事务执行情况，及时发现问题</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2 flex-shrink-0">✓</span>
                <span>定期review事务模式使用情况</span>
              </li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-red-50 to-red-100 border-2 border-red-300 rounded-lg p-5">
            <h3 className="text-xl font-bold text-red-900 mb-3">❌ 避免做法</h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <span className="text-red-600 mr-2 flex-shrink-0">✗</span>
                <span>滥用 XA 模式，导致系统性能严重下降</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-600 mr-2 flex-shrink-0">✗</span>
                <span>TCC 模式不处理空回滚，导致数据不一致</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-600 mr-2 flex-shrink-0">✗</span>
                <span>全局事务时间过长，锁资源太久</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-600 mr-2 flex-shrink-0">✗</span>
                <span>所有业务都用同一种事务模式</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-600 mr-2 flex-shrink-0">✗</span>
                <span>忽略事务日志，问题难以排查</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-600 mr-2 flex-shrink-0">✗</span>
                <span>SAGA 补偿逻辑未测试，回滚失败</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Seata 实战部署与配置 */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">6. Seata Server 部署实战</h2>

        <div className="space-y-6">
          <div className="bg-white border-2 border-slate-200 rounded-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Docker Compose 快速部署</h3>
            <CodeBlock
              language="yaml"
              code={`version: '3.8'
services:
  # Seata Server
  seata-server:
    image: seataio/seata-server:2.0.0
    container_name: seata-server
    hostname: seata-server
    ports:
      - "7091:7091"
      - "8091:8091"
    environment:
      - SEATA_PORT=8091
      - STORE_MODE=db
      # JVM 参数
      - JAVA_OPTS="-Xms512m -Xmx512m -Xmn256m"
    volumes:
      - ./seata-config:/seata-server/config
      - ./seata-logs:/seata-server/logs
    networks:
      - seata-net
    depends_on:
      - nacos
      - mysql

  # Nacos 注册中心
  nacos:
    image: nacos/nacos-server:v2.2.3
    container_name: nacos
    ports:
      - "8848:8848"
      - "9848:9848"
    environment:
      - MODE=standalone
      - SPRING_DATASOURCE_PLATFORM=mysql
      - MYSQL_SERVICE_HOST=mysql
      - MYSQL_SERVICE_DB_NAME=nacos_config
      - MYSQL_SERVICE_USER=nacos
      - MYSQL_SERVICE_PASSWORD=nacos
      - JVM_XMS=512m
      - JVM_XMX=512m
    networks:
      - seata-net
    depends_on:
      - mysql

  # MySQL 数据库
  mysql:
    image: mysql:8.0
    container_name: mysql
    ports:
      - "3306:3306"
    environment:
      - MYSQL_ROOT_PASSWORD=root123
      - MYSQL_DATABASE=seata
    volumes:
      - mysql-data:/var/lib/mysql
      - ./init-sql:/docker-entrypoint-initdb.d
    networks:
      - seata-net

networks:
  seata-net:
    driver: bridge

volumes:
  mysql-data:`}
            />
            <div className="mt-4 bg-blue-50 border border-blue-200 rounded p-4">
              <h4 className="font-bold text-blue-900 mb-2">💡 部署说明</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• <strong>7091端口</strong>: Seata TCC Server 端口（如果使用TCC模式）</li>
                <li>• <strong>8091端口</strong>: Seata Server RPC 端口（AT模式使用）</li>
                <li>• <strong>STORE_MODE=db</strong>: 使用数据库存储事务日志</li>
                <li>• 需要提前创建 Seata 数据库表（undo_log、global_table、branch_table）</li>
              </ul>
            </div>
          </div>

          <div className="bg-white border-2 border-slate-200 rounded-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Seata 数据库初始化</h3>
            <CodeBlock
              language="sql"
              code={`-- 1. 创建 Seata 数据库
CREATE DATABASE IF NOT EXISTS seata
  DEFAULT CHARACTER SET utf8mb4
  DEFAULT COLLATE utf8mb4_unicode_ci;

USE seata;

-- 2. 全局事务表
CREATE TABLE IF NOT EXISTS global_table
(
    xid                       VARCHAR(128) NOT NULL,
    transaction_id            BIGINT,
    status                    TINYINT      NOT NULL,
    application_id            VARCHAR(32),
    transaction_service_group VARCHAR(32),
    transaction_name          VARCHAR(128),
    timeout                   INT,
    begin_time                BIGINT,
    application_data          VARCHAR(2000),
    gmt_create                DATETIME,
    gmt_modified              DATETIME,
    PRIMARY KEY (xid)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4;

-- 3. 分支事务表
CREATE TABLE IF NOT EXISTS branch_table
(
    branch_id         BIGINT       NOT NULL,
    xid               VARCHAR(128) NOT NULL,
    transaction_id    BIGINT,
    resource_group_id VARCHAR(32),
    resource_id       VARCHAR(256),
    branch_type       VARCHAR(8),
    status            TINYINT,
    client_id         VARCHAR(64),
    application_data  VARCHAR(2000),
    gmt_create        DATETIME(6),
    gmt_modified      DATETIME(6),
    PRIMARY KEY (branch_id),
    KEY idx_xid (xid)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4;

-- 4. 锁表
CREATE TABLE IF NOT EXISTS lock_table
(
    row_key        VARCHAR(128) NOT NULL,
    xid            VARCHAR(96),
    transaction_id BIGINT,
    branch_id      BIGINT       NOT NULL,
    resource_id    VARCHAR(256),
    table_name     VARCHAR(32),
    pk             VARCHAR(36),
    gmt_create     DATETIME,
    gmt_modified   DATETIME,
    PRIMARY KEY (row_key),
    KEY idx_branch_id (branch_id)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4;

-- 5. 业务库的 undo_log 表（每个业务库都需要）
CREATE TABLE IF NOT EXISTS undo_log
(
    branch_id     BIGINT       NOT NULL COMMENT 'branch transaction id',
    xid           VARCHAR(128) NOT NULL COMMENT 'global transaction id',
    context       VARCHAR(128) NOT NULL COMMENT 'undo_log context,such as serialization',
    rollback_info LONGBLOB     NOT NULL COMMENT 'rollback info',
    log_status    INT(11)      NOT NULL COMMENT '0:normal status,1:defense status',
    log_created   DATETIME(6)  NOT NULL COMMENT 'create datetime',
    log_modified  DATETIME(6)  NOT NULL COMMENT 'modify datetime',
    UNIQUE KEY ux_undo_log (xid, branch_id)
) ENGINE = InnoDB
  AUTO_INCREMENT = 1
  DEFAULT CHARSET = utf8mb4
  COMMENT ='AT transaction mode undo table';`}
            />
          </div>

          <div className="bg-white border-2 border-slate-200 rounded-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Seata Server 配置文件</h3>
            <CodeBlock
              language="yaml"
              code={`# seata-server/config/file.conf

## 事务日志存储
store {
  ## 存储方式: file、db、redis
  mode = "db"

  ## db 存储
  db {
    ## 数据源: druid、mysql
    datasource = "druid"
    ## mysql 数据库连接配置
    dbType = "mysql"
    driverClassName = "com.mysql.cj.jdbc.Driver"
    url = "jdbc:mysql://mysql:3306/seata?rewriteBatchedStatements=true"
    user = "root"
    password = "root123"
    minConn = 5
    maxConn = 30
    globalTable = "global_table"
    branchTable = "branch_table"
    lockTable = "lock_table"
    queryLimit = 100
    maxWait = 5000
  }
}

## 服务配置
service {
  ## 虚拟组和分组映射
  vgroupMapping.my_test_tx_group = "default"
  default {
    ## 注册中心类型
    grouplist = "seata-server:8091"
    ## 单机模式下直接指定 Seata Server 地址
    ## disableGlobalTransaction = false
  }
}

## 客户端配置
client {
  rm {
    asyncCommitBufferLimit = 10000
    lock {
      retryInterval = 10
      retryTimes = 30
      retryPolicyBranchRollbackOnConflict = true
    }
    reportRetryCount = 5
    tableMetaCheckEnable = false
    reportSuccessEnable = false
    sagaJsonParser = "fastjson"
  }
  tm {
    commitRetryCount = 5
    rollbackRetryCount = 5
  }
  undo {
    dataValidation = true
    logSerialization = "jackson"
    logTable = "undo_log"
  }
}

## 事务配置
transaction {
  ## 超时时间（默认60秒）
  timeout = 60000
  ## 清理过期事务的间隔（默认1分钟）
  cleanPeriodAfterCommit = 30000
}

## 传输配置
transport {
  ## 通讯类型: TCP、UNIX_DOMAIN_SOCKET
  type = "TCP"
  ## NIO 或 NATIVE
  server = "NIO"
  ## heartbeat
  heartbeat = true
  ## 序列化
  serialization = "seata"
  ## 压缩
  compressor = "none"
}

## metrics 配置
metrics {
  enabled = true
  registryType = "compact"
  exporterList = "prometheus"
  exporterPrometheusPort = 9898
}`}
            />
          </div>

          <div className="bg-white border-2 border-slate-200 rounded-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Registry 配置（注册到 Nacos）</h3>
            <CodeBlock
              language="yaml"
              code={`# seata-server/config/registry.conf

registry {
  # 注册中心类型: file、nacos、eureka、redis、zk、consul、etcd3、sofa
  type = "nacos"

  nacos {
    application = "seata-server"
    serverAddr = "nacos:8848"
    group = "SEATA_GROUP"
    namespace = ""
    cluster = "default"
    username = "nacos"
    password = "nacos"
  }
}

config {
  # 配置中心类型: file、nacos、apollo、zk、consul、etcd3、springCloudConfig
  type = "nacos"

  nacos {
    serverAddr = "nacos:8848"
    namespace = ""
    group = "SEATA_GROUP"
    username = "nacos"
    password = "nacos"
    dataId = "seataServer.properties"
  }
}`}
            />
          </div>

          <div className="bg-white border-2 border-slate-200 rounded-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">应用配置（application.yml）</h3>
            <CodeBlock
              language="yaml"
              code={`spring:
  application:
    name: order-service
  cloud:
    nacos:
      discovery:
        server-addr: localhost:8848
        namespace: public
    alibaba:
      seata:
        # Seata 事务组名称
        tx-service-group: my_test_tx_group
        # 是否启用 Seata
        enabled: true
        # 服务名
        application-id: \${spring.application.name}
        # Seata Server 配置
        registry:
          type: nacos
          nacos:
            server-addr: localhost:8848
            namespace: public
            group: SEATA_GROUP
            cluster: default
        config:
          type: nacos
          nacos:
            server-addr: localhost:8848
            namespace: public
            group: SEATA_GROUP
            username: nacos
            password: nacos

# Seata 配置
seata:
  enabled: true
  application-id: \${spring.application.name}
  tx-service-group: my_test_tx_group
  # 是否关闭数据源自动代理
  enable-auto-data-source-proxy: true
  # 数据源代理模式: AT、XA
  data-source-proxy-mode: AT
  # 使用 JDK 代理
  use-jdk-proxy: false
  # 客户端配置
  client:
    rm:
      async-commit-buffer-limit: 10000
      lock:
        retry-interval: 10
        retry-times: 30
        retry-policy-branch-rollback-on-conflict: true
      report-retry-count: 5
      table-meta-check-enable: false
      report-success-enable: false
      saga-json-parser: fastjson
    tm:
      commit-retry-count: 5
      rollback-retry-count: 5
    undo:
      data-validation: true
      log-serialization: jackson
      log-table: undo_log
  service:
    vgroup-mapping:
      my_test_tx_group: default
    grouplist:
      default: localhost:8091
  registry:
    type: nacos
    nacos:
      server-addr: localhost:8848
      namespace: public
      group: SEATA_GROUP
      cluster: default
      username: nacos
      password: nacos
  config:
    type: nacos
    nacos:
      server-addr: localhost:8848
      namespace: public
      group: SEATA_GROUP
      username: nacos
      password: nacos`}
            />
          </div>
        </div>
      </section>

      {/* 性能测试数据对比 */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">7. 事务模式性能对比</h2>

        <div className="bg-white border-2 border-slate-200 rounded-lg p-6 mb-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">真实性能测试数据</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-bold text-gray-900">事务模式</th>
                  <th className="px-4 py-3 text-center text-sm font-bold text-gray-900">QPS</th>
                  <th className="px-4 py-3 text-center text-sm font-bold text-gray-900">平均RT(ms)</th>
                  <th className="px-4 py-3 text-center text-sm font-bold text-gray-900">P99 RT(ms)</th>
                  <th className="px-4 py-3 text-center text-sm font-bold text-gray-900">CPU使用率</th>
                  <th className="px-4 py-3 text-center text-sm font-bold text-gray-900">内存使用</th>
                  <th className="px-4 py-3 text-center text-sm font-bold text-gray-900">错误率</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-4 py-3 font-medium text-gray-900">Seata AT</td>
                  <td className="px-4 py-3 text-center text-green-600 font-bold">8,500</td>
                  <td className="px-4 py-3 text-center">12</td>
                  <td className="px-4 py-3 text-center">25</td>
                  <td className="px-4 py-3 text-center">65%</td>
                  <td className="px-4 py-3 text-center">1.2GB</td>
                  <td className="px-4 py-3 text-center text-green-600">0.01%</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-4 py-3 font-medium text-gray-900">Seata TCC</td>
                  <td className="px-4 py-3 text-center text-green-600 font-bold">12,000</td>
                  <td className="px-4 py-3 text-center">8</td>
                  <td className="px-4 py-3 text-center">15</td>
                  <td className="px-4 py-3 text-center">75%</td>
                  <td className="px-4 py-3 text-center">1.5GB</td>
                  <td className="px-4 py-3 text-center text-green-600">0.00%</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium text-gray-900">Seata SAGA</td>
                  <td className="px-4 py-3 text-center text-green-600 font-bold">10,000</td>
                  <td className="px-4 py-3 text-center">10</td>
                  <td className="px-4 py-3 text-center">20</td>
                  <td className="px-4 py-3 text-center">70%</td>
                  <td className="px-4 py-3 text-center">1.3GB</td>
                  <td className="px-4 py-3 text-center text-green-600">0.02%</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-4 py-3 font-medium text-gray-900">XA (MySQL)</td>
                  <td className="px-4 py-3 text-center text-red-600 font-bold">3,000</td>
                  <td className="px-4 py-3 text-center text-red-600">45</td>
                  <td className="px-4 py-3 text-center text-red-600">80</td>
                  <td className="px-4 py-3 text-center">40%</td>
                  <td className="px-4 py-3 text-center">800MB</td>
                  <td className="px-4 py-3 text-center text-green-600">0.00%</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium text-gray-900">无事务（本地）</td>
                  <td className="px-4 py-3 text-center text-green-600 font-bold">15,000</td>
                  <td className="px-4 py-3 text-center text-green-600">5</td>
                  <td className="px-4 py-3 text-center text-green-600">10</td>
                  <td className="px-4 py-3 text-center">55%</td>
                  <td className="px-4 py-3 text-center">900MB</td>
                  <td className="px-4 py-3 text-center text-green-600">0.00%</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded p-4">
            <h4 className="font-bold text-yellow-900 mb-2">📊 测试环境说明</h4>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• <strong>测试环境</strong>: 8核16G，MySQL 8.0，Nginx</li>
              <li>• <strong>测试场景</strong>: 典型电商下单流程（库存→订单→积分）</li>
              <li>• <strong>并发线程</strong>: 200个并发用户</li>
              <li>• <strong>测试时长</strong>: 10分钟稳定运行</li>
            </ul>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-green-50 border-2 border-green-200 rounded-lg p-5">
            <h3 className="text-xl font-bold text-green-900 mb-3">✅ 性能优化建议</h3>
            <ul className="text-sm text-gray-700 space-y-2">
              <li><strong>高并发场景</strong>: 优先选择 TCC 模式（QPS最高）</li>
              <li><strong>低并发场景</strong>: 使用 AT 模式（开发效率高）</li>
              <li><strong>避免 XA</strong>: 性能差，只用于特殊场景</li>
              <li><strong>连接池优化</strong>: HikariCP 连接池大小20-50</li>
              <li><strong>超时配置</strong>: 根据业务设置合理的超时时间</li>
              <li><strong>异步化</strong>: 配合 MQ 实现最终一致性</li>
            </ul>
          </div>

          <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-5">
            <h3 className="text-xl font-bold text-blue-900 mb-3">💡 选型决策指南</h3>
            <ul className="text-sm text-gray-700 space-y-2">
              <li><strong>QPS {'<'} 5000</strong>: AT 模式足够</li>
              <li><strong>5000 {'<'} QPS {'<'} 10000</strong>: AT + 优化 或 TCC</li>
              <li><strong>QPS {'>'} 10000</strong>: 必须使用 TCC 模式</li>
              <li><strong>强一致性要求</strong>: 选择 XA（性能会差）</li>
              <li><strong>最终一致性可接受</strong>: SAGA 或 AT</li>
              <li><strong>核心业务</strong>: TCC（性能+可靠性）</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 常见问题 FAQ */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">常见问题</h2>

        <div className="space-y-4">
          <FaqCard
            number={1}
            question="AT 模式和 TCC 模式如何选择?"
            answer={"选择 AT 还是 TCC，主要看两个维度：\n\n1. 并发量\n   - 低并发（QPS < 10000）: 选 AT\n   - 高并发（QPS > 10000）: 选 TCC\n\n2. 业务复杂度\n   - 简单业务: 选 AT（开发效率高）\n   - 复杂业务: 选 TCC（灵活度高）\n\n【实战建议】\n- 90% 的场景用 AT 就够了\n- 只有秒杀、抢购等极高并发核心业务才用 TCC\n- 可以混合使用：核心用 TCC，普通用 AT"}
            isOpen={openFaq === 1}
            onClick={() => toggleFaq(1)}
          />

          <FaqCard
            number={2}
            question="TCC 模式的空回滚和悬挂是什么?"
            answer={"TCC 模式有两个特殊的异常情况必须处理：\n\n【空回滚 Empty Rollback】\n定义: Try 阶段未执行，但 Cancel 阶段被执行了\n原因: Try 阶段超时或失败，事务管理器触发了回滚\n处理:\n@LocalTCC\npublic boolean rollback(BusinessActionContext context) {\n    // 检查是否执行过 Try\n    if (!isTried(context)) {\n        // 空回滚，直接返回成功\n        return true;\n    }\n    // 正常回滚逻辑\n    return doRollback(context);\n}\n\n【悬挂 Suspension】\n定义: Cancel 阶段比 Try 阶段先执行\n原因: 网络延迟，导致回滚请求先到达\n处理:\npublic boolean reduceStock(...) {\n    // 检查是否有回滚记录\n    if (hasRolledBack(context)) {\n        // 已回滚，拒绝 Try\n        return false;\n    }\n    // 正常 Try 逻辑\n    return doReserve(...);\n}\n\n【实战建议】\n- 必须在 Try/Confirm/Cancel 中都处理这两种情况\n- 使用 Redis 记录事务状态\n- Seata 框架会自动处理部分情况，但不能完全依赖"}
            isOpen={openFaq === 2}
            onClick={() => toggleFaq(2)}
          />

          <FaqCard
            number={3}
            question="SAGA 模式如何保证补偿顺序?"
            answer={"SAGA 模式的补偿顺序与执行顺序相反，类似事务回滚：\n\n【执行顺序】\n1. 订机票 (成功)\n2. 订酒店 (成功)\n3. 租车 (失败)\n\n【补偿顺序】\n1. 取消租车\n2. 取消订酒店\n3. 取消订机票\n\n【Seata SAGA 实现】\n@SagaTask(code = \"bookFlight\", sagaCode = \"travel-order\")\npublic void bookFlight(TravelOrder order) {\n    flightService.book(order);\n}\n\n@SagaTask(\n    code = \"compensateFlight\",\n    sagaCode = \"travel-order\",\n    compensation = \"bookFlight\"  // 指定补偿的 Task\n)\npublic void compensateFlight(TravelOrder order) {\n    flightService.cancel(order);\n}\n\n【关键点】\n1. 每个正常 Task 都有对应的 Compensation Task\n2. Seata 自动按相反顺序执行补偿\n3. 补偿也必须支持幂等性\n4. 补偿失败需要重试或人工介入\n\n【实战建议】\n- 补偿逻辑要简单可靠\n- 记录详细的执行日志\n- 补偿失败要有告警机制\n- 重要业务需要人工介入"}
            isOpen={openFaq === 3}
            onClick={() => toggleFaq(3)}
          />
        </div>
      </section>

      {/* 下一步学习 */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">下一步学习</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <a href="/observability" className="block bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-200 rounded-lg p-6 hover:shadow-lg transition">
            <h3 className="text-xl font-bold text-green-900 mb-2">🔍 可观测性体系</h3>
            <p className="text-gray-700 text-sm">构建完整的监控、追踪、日志体系</p>
          </a>
          <a href="/performance-tuning" className="block bg-gradient-to-br from-orange-50 to-orange-100 border-2 border-orange-200 rounded-lg p-6 hover:shadow-lg transition">
            <h3 className="text-xl font-bold text-orange-900 mb-2">⚡ 性能调优实战</h3>
            <p className="text-gray-700 text-sm">从 JVM 到架构的全链路性能优化</p>
          </a>
        </div>
      </section>
    </div>
  );
};
