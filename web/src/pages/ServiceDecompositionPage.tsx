import { CodeBlock } from '../components';
import { useState } from 'react';

export const ServiceDecompositionPage: React.FC = () => {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  return (
    <div className="prose prose prose prose-slate max-w-none">
      {/* 页面头部 */}
      <div className="bg-gradient-to-r from-slate-700 to-slate-900 text-white rounded-lg p-6 mb-8">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-4xl font-bold mb-2">微服务拆分原则</h1>
            <p className="text-slate-200 text-lg">从单体到微服务的架构演进</p>
          </div>
          <div className="flex gap-3 text-sm">
            <span className="px-3 py-1 bg-white/20 rounded-full">🏗️ 架构师</span>
            <span className="px-3 py-1 bg-white/20 rounded-full">⏱️ 约60分钟</span>
            <span className="px-3 py-1 bg-white/20 rounded-full">📚 12个知识点</span>
          </div>
        </div>
      </div>

      {/* 为什么需要拆分 */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">为什么需要微服务拆分?</h2>

        <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-lg mb-6">
          <h4 className="font-bold text-gray-900 mb-3">❌ 单体应用的痛点</h4>
          <ul className="space-y-2 text-sm text-gray-700">
            <li>• <strong>代码耦合严重</strong> - 所有功能在一个项目中</li>
            <li>• <strong>部署困难</strong> - 牵一发而动全身</li>
            <li>• <strong>扩展受限</strong> - 无法针对性扩展</li>
            <li>• <strong>技术栈单一</strong> - 被困在早期选择</li>
            <li>• <strong>团队协作困难</strong> - 几百人维护一个项目</li>
          </ul>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-green-50 border-2 border-green-200 rounded-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-3">✅ 微服务的优势</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start">
                <span className="text-green-600 mr-2">✓</span>
                <span><strong>独立部署</strong> - 每个服务独立发布</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2">✓</span>
                <span><strong>弹性扩展</strong> - 按需扩容</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2">✓</span>
                <span><strong>技术异构</strong> - 服务可使用不同技术</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2">✓</span>
                <span><strong>团队自治</strong> - 小团队负责一个服务</span>
              </li>
            </ul>
          </div>

          <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-3">⚠️ 微服务的挑战</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start">
                <span className="text-yellow-600 mr-2">•</span>
                <span><strong>架构复杂</strong> - 分布式系统复杂度高</span>
              </li>
              <li className="flex items-start">
                <span className="text-yellow-600 mr-2">•</span>
                <span><strong>数据一致性</strong> - 跨服务事务难处理</span>
              </li>
              <li className="flex items-start">
                <span className="text-yellow-600 mr-2">•</span>
                <span><strong>运维成本高</strong> - 需要容器编排平台</span>
              </li>
              <li className="flex items-start">
                <span className="text-yellow-600 mr-2">•</span>
                <span><strong>测试困难</strong> - 集成测试复杂</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* 拆分的时机 */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">什么时候需要拆分?</h2>

        <div className="bg-slate-50 border-l-4 border-slate-500 p-6 rounded-lg mb-6">
          <h4 className="font-bold text-gray-900 mb-3">⚖️ 判断标准</h4>
          <p className="text-gray-700 text-sm mb-4">
            不要为了拆分而拆分，以下情况<strong>建议</strong>考虑微服务化：
          </p>
          <ul className="space-y-2 text-sm text-gray-700">
            <li>• <strong>代码规模大</strong> - 项目超过 10 万行代码，编译耗时</li>
            <li>• <strong>团队规模大</strong> - 超过 20 人协作困难</li>
            <li>• <strong>业务模块独立</strong> - 不同业务变化频率差异大</li>
            <li>• <strong>扩展需求不同</strong> - 某些模块需要高并发</li>
            <li>• <strong>技术栈需求不同</strong> - 不同模块适合不同技术</li>
          </ul>
        </div>

        <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-lg">
          <h4 className="font-bold text-gray-900 mb-3">🚫 不建议拆分的情况</h4>
          <ul className="space-y-2 text-sm text-gray-700">
            <li>• <strong>早期项目</strong> - 业务还在探索阶段</li>
            <li>• <strong>小团队</strong> - 10 人以下可以维护单体</li>
            <li>• <strong>业务紧密耦合</strong> - 模块间交互频繁</li>
            <li>• <strong>数据强依赖</strong> - 大量跨库事务</li>
            <li>• <strong>运维能力不足</strong> - 缺乏容器平台经验</li>
          </ul>
        </div>
      </section>

      {/* 拆分原则 */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">微服务拆分原则</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-3">🎯 单一职责原则 (SRP)</h3>
            <p className="text-sm text-gray-700 mb-3">
              每个服务只做一件事，职责清晰
            </p>
            <div className="bg-white p-3 rounded border border-blue-200">
              <p className="text-xs text-gray-600 mb-2">
                <strong>反例：</strong>订单服务同时负责订单和支付
              </p>
              <p className="text-xs text-gray-600">
                <strong>正例：</strong>订单服务、支付服务分离
              </p>
            </div>
          </div>

          <div className="bg-green-50 border-2 border-green-200 rounded-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-3">🔗 业务边界清晰</h3>
            <p className="text-sm text-gray-700 mb-3">
              服务间的耦合度低，通过 API 通信
            </p>
            <div className="bg-white p-3 rounded border border-green-200">
              <p className="text-xs text-gray-600 mb-2">
                <strong>判断：</strong>能否独立部署和扩展？
              </p>
              <p className="text-xs text-gray-600">
                <strong>验证：</strong>服务间接口是否稳定？
              </p>
            </div>
          </div>

          <div className="bg-purple-50 border-2 border-purple-200 rounded-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-3">📦 数据独立</h3>
            <p className="text-sm text-gray-700 mb-3">
              每个服务拥有独立的数据库
            </p>
            <div className="bg-white p-3 rounded border border-purple-200">
              <p className="text-xs text-gray-600 mb-2">
                <strong>好处：</strong>避免跨库join，提高性能
              </p>
              <p className="text-xs text-gray-600 mb-2">
                <strong>挑战：</strong>需要处理分布式事务
              </p>
            </div>
          </div>

          <div className="bg-orange-50 border-2 border-orange-200 rounded-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-3">🔄 业务可组合</h3>
            <p className="text-sm text-gray-700 mb-3">
              服务间通过组合实现复杂业务
            </p>
            <div className="bg-white p-3 rounded border border-orange-200">
              <p className="text-xs text-gray-600 mb-2">
                <strong>示例：</strong>
              </p>
              <p className="text-xs text-gray-600">
                电商下单 = 订单 + 库存 + 支付 + 物流
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* DDD 领域驱动设计 */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">DDD 领域驱动设计基础</h2>

        <div className="bg-indigo-50 border-l-4 border-indigo-500 p-6 rounded-lg mb-6">
          <h4 className="font-bold text-gray-900 mb-2">💡 DDD 核心思想</h4>
          <p className="text-gray-700 text-sm">
            以业务领域为中心，将复杂业务划分为多个<strong>限界上下文（Bounded Context）</strong>，
            每个上下文有自己的领域模型和业务规则。
          </p>
        </div>

        <h3>核心概念</h3>
        <CodeBlock
          language="text"
          code={`DDD 核心概念：

1. 领域
   - 业务领域的核心问题空间
   - 如：电商、支付、物流

2. 限界上下文
   - 领域的边界，子问题空间
   - 如：订单上下文、库存上下文、支付上下文

3. 实体
   - 具有唯一标识的领域对象
   - 如：用户、订单、商品

4. 值对象
   - 通过属性值标识的对象，无唯一标识
   - 如：地址、金额

5. 聚合根
   - 生命周期管理的一致性边界
   - 如：订单聚合根（订单+订单项）

6. 领域事件
   - 领域内发生的重要事件
   - 如：订单创建、支付成功`}
        />

        <h3>实战案例：电商系统拆分</h3>
        <CodeBlock
          language="text"
          code={`电商系统限界上下文划分：

┌─────────────────────────────────────────────────────┐
│                      电商领域                              │
└─────────────────────────────────────────────────────┘
  │         │         │         │         │
  ↓         ↓         ↓         ↓         ↓
用户上下文  商品上下文  订单上下文  库存上下文  支付上下文
  │         │         │         │         │
 用户管理   商品管理   订单管理   库存管理   支付管理
 登录注册   类目管理   下单流程   入库出库   退款结算
 收货地址   品牌管理   订单状态   库存预警   对账结算
 积分体系   搜索服务   退款流程   库存锁定   支付网关

技术选型：
- 用户上下文：Spring Cloud (推荐 Spring Security)
- 商品上下文：搜索 (推荐 Elasticsearch)
- 订单上下文：核心业务 (Spring Boot + MySQl)
- 库存上下文：高性能 (Spring Boot + Redis)
- 支付上下文：事务要求高 (Seata)`}
        />
      </section>

      {/* 拆分步骤 */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">微服务拆分步骤</h2>

        <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-lg mb-6">
          <h4 className="font-bold text-gray-900 mb-3">📋 拆分流程</h4>
          <p className="text-gray-700 text-sm">
            微服务拆分是一个<strong>渐进式</strong>的过程，不能一蹴而就。
          </p>
        </div>

        <div className="space-y-6">
          <div className="flex items-start">
            <span className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-4">1</span>
            <div className="flex-1">
              <h4 className="text-lg font-bold text-gray-900">业务分析</h4>
              <p className="text-sm text-gray-700 mb-2">梳理业务流程，识别业务能力和边界</p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• 列出所有业务功能</li>
                <li>• 识别业务能力</li>
                <li>• 分析业务依赖关系</li>
                <li>• 确定业务边界</li>
              </ul>
            </div>
          </div>

          <div className="flex items-start">
            <span className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-4">2</span>
            <div className="flex-1">
              <h4 className="text-lg font-bold text-gray-900">领域建模</h4>
              <p className="text-sm text-gray-700 mb-2">使用 DDD 方法进行领域建模</p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• 划分限界上下文</li>
                <li>• 识别领域实体</li>
                <li>• 设计聚合根</li>
                <li>• 定义领域事件</li>
              </ul>
            </div>
          </div>

          <div className="flex items-start">
            <span className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-4">3</span>
            <div className="flex-1">
              <h4 className="text-lg font-bold text-gray-900">技术选型</h4>
              <p className="text-sm text-gray-700 mb-2">根据业务特点选择技术栈</p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• 评估团队技术能力</li>
                <li>• 考虑服务特性要求</li>
                <li>• 统一技术栈降低成本</li>
                <li>• 预留技术演进空间</li>
              </ul>
            </div>
          </div>

          <div className="flex items-start">
            <span className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-4">4</span>
            <div className="flex-1">
              <h4 className="text-lg font-bold text-gray-900">接口设计</h4>
              <p className="text-sm text-gray-700 mb-2">定义服务间通信接口</p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• 定义 API 接口</li>
                <li>• 设计数据传输对象 (DTO)</li>
                <li>• 定义 API 版本策略</li>
                <li>• 设计异步通信机制</li>
              </ul>
            </div>
          </div>

          <div className="flex items-start">
            <span className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-4">5</span>
            <div className="flex-1">
              <h4 className="text-lg font-bold text-gray-900">渐进式迁移</h4>
              <p className="text-sm text-gray-700 mb-2">逐步拆分，避免大爆炸式重构</p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• 优先拆分独立模块</li>
                <li>• 保持新旧系统并行运行</li>
                <li>• 使用网关实现路由切换</li>
                <li>• 逐步迁移数据和功能</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 最佳实践 */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">最佳实践</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <BestPracticeCard3
            title="服务粒度"
            practices={[
              "不要拆得太细，避免过度设计",
              "服务粒度以小团队能管理为标准（5-10人）",
              "一个服务对应一个数据库",
              "避免循环依赖，确保单向依赖",
              "服务粒度要适当，不要太粗也不要太细"
            ]}
          />
          <BestPracticeCard3
            title="数据库设计"
            practices={[
              "每个服务独立数据库",
              "禁止跨库 join",
              "使用分布式事务处理跨服务事务",
              "重要字段建立唯一索引",
              "设计数据同步机制"
            ]}
          />
          <BestPracticeCard3
            title="接口设计"
            practices={[
              "RESTful API 设计规范",
              "使用 DTO 对象传输数据",
              "接口版本管理（如 v1/v2）",
              "统一返回格式",
              "完善的错误码体系"
            ]}
          />
          <BestPracticeCard3
            title="服务治理"
            practices={[
              "服务注册与发现",
              "配置管理",
              "API 网关统一入口",
              "统一认证授权",
              "全链路追踪监控"
            ]}
          />
          <BestPracticeCard3
            title="数据一致性"
            practices={[
              "使用 Saga 或 TCC 处理分布式事务",
              "最终一致性优于强一致性",
              "设计幂等性接口",
              "使用消息队列解耦",
              "定期数据对账"
            ]}
          />
          <BestPracticeCard3
            title="团队协作"
            practices={[
              "跨团队协作机制",
              "接口文档先行",
              "契约测试",
              "定期技术分享",
              "统一代码规范"
            ]}
          />
        </div>
      </section>

      {/* 常见错误 */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">拆分的常见错误</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-red-50 border-2 border-red-200 rounded-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-3">❌ 错误1：拆分过细</h3>
            <p className="text-sm text-gray-700 mb-2">
              将一个简单的功能拆分成多个服务
            </p>
            <div className="bg-white p-3 rounded border border-red-200">
              <p className="text-xs text-gray-600">
                <strong>示例：</strong>订单服务拆分成订单查询、订单创建、订单更新等独立服务
              </p>
              <p className="text-xs text-gray-600 mt-1">
                <strong>后果：</strong>服务间通信频繁，分布式事务复杂，性能反而下降
              </p>
            </div>
          </div>

          <div className="bg-red-50 border-2 border-red-200 rounded-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-3">❌ 错误2：共享数据库</h3>
            <p className="text-sm text-gray-700 mb-2">
              多个服务共用同一个数据库的不同表
            </p>
            <div className="bg-white p-3 rounded border border-red-200">
              <p className="text-xs text-gray-600">
                <strong>示例：</strong>订单服务和库存服务都访问同一个 MySQL 实例
              </p>
              <p className="text-xs text-gray-600 mt-1">
                <strong>后果：</strong>无法独立扩展，存在数据安全风险
              </p>
            </div>
          </div>

          <div className="bg-red-50 border-2 border-red-200 rounded-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-3">❌ 错误3：同步调用</h3>
            <p className="text-sm text-gray-700 mb-2">
              服务间直接同步调用
            </p>
            <div className="bg-white p-3 rounded border border-red-200">
              <p className="text-xs text-gray-600">
                <strong>示例：</strong>订单服务同步调用库存服务扣减库存
              </p>
              <p className="text-xs text-gray-600 mt-1">
                <strong>后果：</strong>耦合度高，级联故障，性能差
              </p>
            </div>
          </div>

          <div className="bg-red-50 border-2 border-red-200 rounded-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-3">❌ 错误4：缺少网关</h3>
            <p className="text-sm text-gray-700 mb-2">
              客户端直接调用各个微服务
            </p>
            <div className="bg-white p-3 rounded border border-red-200">
              <p className="text-xs text-gray-600">
                <strong>后果：</strong>客户端需要知道所有服务地址，认证分散
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 常见问题 */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">常见问题</h2>

        <div className="space-y-4">
          <FaqCard2
            number={1}
            question="如何确定服务粒度?"
            answer="服务粒度没有标准答案，建议原则：
                 1) 小团队原则：一个 5-10 人团队负责一个服务
                 2) 业务内聚：一个服务包含一个完整的业务能力
                 3) 独立部署：服务可以独立部署和扩展
                 4) 数据独立：每个服务有自己的数据库
                 5) 经验法则：服务可以在 2 周内重写
                 避免拆分过细，宁大勿小"
            isOpen={expandedFaq === 1}
            onClick={() => setExpandedFaq(expandedFaq === 1 ? null : 1)}
          />
          <FaqCard2
            number={2}
            question="如何处理分布式事务?"
            answer="分布式事务解决方案：
                 1) Seata AT 模式：自动补偿，使用简单
                 2) Saga 模式：长事务，手动补偿
                 3) TCC 模式：高性能，手动控制
                 4) 本地消息表：最终一致性
                 5) 事件驱动：异步解耦
                 推荐：优先使用 Seata，性能要求高用 TCC"
            isOpen={expandedFaq === 2}
            onClick={() => setExpandedFaq(expandedFaq === 2 ? null : 2)}
          />
          <FaqCard2
            number={3}
            question="老项目如何迁移?"
            answer="渐进式迁移策略：
                 1) 绞 hue 入门：在单体应用中引入微服务治理组件
                 2) 拆分绞索：识别边界清晰的模块先拆分
                 3）并行运行：新服务与老服务并行
                 4. 逐步迁移：数据和功能逐步迁移到新服务
                 5. 完全替换：老服务下线
                 核心原则：不停止业务，渐进式演进"
            isOpen={expandedFaq === 3}
            onClick={() => setExpandedFaq(expandedFaq === 3 ? null : 3)}
          />
        </div>
      </section>

      {/* 下一步学习 */}
      <section className="bg-gradient-to-r from-slate-700 to-slate-900 text-white p-8 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">🎯 掌握了微服务拆分，下一步学习什么?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <NextStepCard2 title="服务治理" description="治理策略实战" link="/service-governance" icon="🛠️" />
          <NextStepCard2 title="可观测性" description="监控体系设计" link="/observability" icon="📊" />
          <NextStepCard2 title="性能调优" description="性能优化实战" link="/performance-tuning" icon="⚡" />
          <NextStepCard2 title="实战项目" description="电商微服务系统" link="/project-ecommerce" icon="🛒" />
        </div>
      </section>
    </div>
  );
};

// 辅助组件

interface BestPracticeCard3Props {
  title: string;
  practices: string[];
}

const BestPracticeCard3: React.FC<BestPracticeCard3Props> = ({ title, practices }) => {
  return (
    <div className="bg-white border-2 border-slate-200 rounded-lg p-5">
      <h3 className="text-xl font-bold text-gray-900 mb-4">{title}</h3>
      <ul className="space-y-2">
        {practices.map((practice, index) => (
          <li key={index} className="flex items-start">
            <span className="text-slate-600 mr-2 flex-shrink-0">✓</span>
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
