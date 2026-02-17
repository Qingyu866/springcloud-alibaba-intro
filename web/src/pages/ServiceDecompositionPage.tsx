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

      {/* 微服务架构图 */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">6. 微服务架构演进</h2>

        <div className="space-y-6">
          <div className="bg-white border-2 border-slate-200 rounded-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">单体应用架构（拆分前）</h3>
            <div className="bg-gray-900 text-gray-100 rounded-lg p-6 font-mono text-sm overflow-x-auto">
<pre>
┌─────────────────────────────────────────────────────────────┐
│                     单体应用 (Monolith)                       │
│  ┌────────────────────────────────────────────────────────┐ │
│  │  用户界面 (Web/Mobile)                                 │ │
│  └──────────────────┬─────────────────────────────────────┘ │
│                      │                                          │
│  ┌──────────────────▼─────────────────────────────────────┐ │
│  │              API 网关 / 负载均衡                        │ │
│  └──────────────────┬─────────────────────────────────────┘ │
│                      │                                          │
│  ┌──────────────────▼─────────────────────────────────────┐ │
│  │               业务逻辑层 (Spring Boot)                   │ │
│  │  ┌─────────┬─────────┬─────────┬─────────┬─────────┐  │ │
│  │  │用户模块  │订单模块  │商品模块  │库存模块  │支付模块  │  │ │
│  │  └─────────┴─────────┴─────────┴─────────┴─────────┘  │ │
│  └──────────────────┬─────────────────────────────────────┘ │
│                      │                                          │
│  ┌──────────────────▼─────────────────────────────────────┐ │
│  │              数据访问层 (DAO/Repository)                 │ │
│  │  ┌────────────────────────────────────────────────────┐ │ │
│  │  │           MyBatis / JPA / JDBC                     │ │ │
│  │  └────────────────────────────────────────────────────┘ │ │
│  └──────────────────┬─────────────────────────────────────┘ │
│                      │                                          │
│  ┌──────────────────▼─────────────────────────────────────┐ │
│  │              数据库层 (MySQL Cluster)                    │ │
│  │  ┌────────────────────────────────────────────────────┐ │ │
│  │  │    用户表 | 订单表 | 商品表 | 库存表 | 支付表      │ │ │
│  │  └────────────────────────────────────────────────────┘ │ │
│  └─────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘

特点：
✓ 部署简单（一个 WAR/JAR）
✓ 调用方便（本地方法调用）
✓ 事务管理简单（ACID）
✗ 代码耦合严重
✗ 部署风险高（牵一发而动全身）
✗ 扩展性差（只能整体扩容）
✗ 技术栈绑定
</pre>
            </div>
          </div>

          <div className="bg-white border-2 border-slate-200 rounded-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">微服务架构（拆分后）</h3>
            <div className="bg-gray-900 text-gray-100 rounded-lg p-6 font-mono text-xs overflow-x-auto">
<pre>
┌────────────────────────────────────────────────────────────────────────────┐
│                      微服务架构 (Microservices)                               │
│                                                                                 │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │  客户端 (Web/Mobile)                                                    │   │
│  └──────────────────────────────┬──────────────────────────────────────┘   │
│                                 │                                          │
│  ┌──────────────────────────────▼──────────────────────────────────────┐   │
│  │                  API 网关 (Spring Cloud Gateway)                       │   │
│  │                  路由、限流、熔断、鉴权、日志                                │   │
│  └──────┬─────────────┬─────────────┬─────────────┬────────────────────┘   │
│         │             │             │             │                          │
│  ┌──────▼──────┐  ┌──▼──────┐  ┌──▼──────┐  ┌──▼──────┐  ┌─────────────┐   │
│  │ 用户服务     │  │ 订单服务 │  │ 商品服务 │  │ 库存服务 │  │ 支付服务     │   │
│  │ (User Svc)   │  │(Order   │  │(Product │  │(Stock   │  │(Payment     │   │
│  │              │  │ Svc)    │  │ Svc)    │  │ Svc)    │  │ Svc)        │   │
│  │ 5个实例      │  │ 10个实例 │  │ 8个实例 │  │ 15个实例 │  │ 3个实例      │   │
│  │              │  │         │  │         │  │         │  │             │   │
│  │ ┌─────────┐ │  │┌───────┐│  │┌───────┐│  │┌───────┐│  │┌─────────┐│   │
│  │ │ Nacos   │ │  ││ Nacos ││  ││ Nacos ││  ││ Nacos ││  ││ Nacos   ││   │
│  │ │ Client  │ │  ││Client ││  ││Client ││  ││Client ││  ││ Client  ││   │
│  │ └─────────┘ │  │└───────┘│  │└───────┘│  │└───────┘│  │└─────────┘│   │
│  └──────┬───────┘  └──┬──────┘  └──┬──────┘  └──┬──────┘  └──────┬───────┘   │
│         │             │             │             │             │          │
│  ┌──────▼─────────────▼─────────────▼─────────────▼─────────────▼──────────┐│
│  │                Nacos 注册与发现中心 (8848)                              ││
│  │                服务注册、健康检查、配置管理                                   ││
│  └────────────────────────────────────────────────────────────────────────┘│
│                                                                                 │
│  ┌─────────────────────────────────────────────────────────────────────────┐│
│  │                    配置中心 (Nacos Config)                                ││
│  │                    动态配置、配置推送、灰度发布                               ││
│  └─────────────────────────────────────────────────────────────────────────┘│
│                                                                                 │
│  ┌─────────────────────────────────────────────────────────────────────────┐│
│  │                    消息队列 (RocketMQ/Kafka)                             ││
│  │                    异步解耦、削峰填谷、事件驱动                               ││
│  └─────────────────────────────────────────────────────────────────────────┘│
│                                                                                 │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐         │
│  │  用户数据库  │  │  订单数据库  │  │  商品数据库  │  │  库存数据库  │  ...      │
│  │  (MySQL)    │  │  (MySQL)    │  │  (MySQL)    │  │  (Redis)    │          │
│  │  主从复制    │  │  分库分表    │  │  读写分离    │  │  集群模式    │          │
│  └─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘         │
│                                                                                 │
│  ┌─────────────────────────────────────────────────────────────────────────┐│
│  │                     可观测性平台                                        ││
│  │  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐                     ││
│  │  │ SkyWalk │  │Prometheus│  │ Grafana │  │ ELK Stack│                     ││
│  │  │   ing   │  │         │  │         │  │         │                     ││
│  │  │ 链路追踪  │  │  指标采集 │  │  监控面板 │  │  日志聚合 │                     ││
│  │  └─────────┘  └─────────┘  └─────────┘  └─────────┘                     ││
│  └─────────────────────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────────────────────┘

特点：
✗ 部署复杂（多个服务）
✗ 调用复杂（网络通信）
✗ 分布式事务难处理
✓ 独立部署、扩展
✓ 技术栈灵活
✓ 故障隔离
✓ 团队自治
</pre>
            </div>
          </div>

          <div className="bg-white border-2 border-slate-200 rounded-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">服务调用关系图</h3>
            <CodeBlock
              language="bash"
              code={`# 电商系统微服务调用关系图

                    ┌──────────────┐
                    │   客户端      │
                    └──────┬───────┘
                           │ HTTP/HTTPS
                    ┌──────▼─────────┐
                    │   API 网关     │
                    │  (Gateway)     │
                    └──┬─────────┬───┘
                       │         │
        ┌───────────┘         └───────────┐
        │                              │
   ┌────▼─────┐              ┌───────▼──────┐
   │ 认证服务 │              │   商品服务    │
   │ (Auth)   │              │  (Product)   │
   └────┬─────┘              └───┬───────┬──┘
        │                         │        │
   ┌────▼─────┐              ┌───▼──────┐  │
   │ 用户服务 │              │ 库存服务 │  │
   │ (User)   │              │ (Stock)  │  │
   └─────────┘              └──────────┘  │
        ┌────────────────────────────────┐
        │                                │
   ┌────▼─────────┐              ┌──────▼──────┐
   │   订单服务    │              │   购物车    │
   │  (Order)     │◄────────────►│ (Cart)      │
   └──┬───────────┘              └─────────────┘
      │
      │ 调用其他服务
      ├─────────┬──────────┬────────────┐
      │         │          │            │
   ┌──▼────┐ ┌─▼────┐  ┌──▼──────┐  ┌───▼───────┐
   │库存   │ │促销   │  │优惠券   │  │  支付    │
   │服务   │ │服务   │  │服务     │  │  服务    │
   └───────┘ └───────┘  └─────────┘  └──────────┘

调用方式：
• 同步调用: OpenFeign (HTTP/REST)
• 异步调用: RocketMQ (事件驱动)
• 服务发现: Nacos
• 负载均衡: LoadBalancer
• 熔断降级: Sentinel
• 链路追踪: SkyWalking`}
            />
          </div>
        </div>
      </section>

      {/* 渐进式迁移策略 */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">7. 渐进式迁移策略</h2>

        <div className="space-y-6">
          <div className="bg-white border-2 border-slate-200 rounded-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">绞杀者模式（Strangler Pattern）</h3>
            <div className="bg-blue-50 border border-blue-200 rounded p-4 mb-4">
              <h4 className="font-bold text-blue-900 mb-2">💡 核心思想</h4>
              <p className="text-sm text-gray-700">
                像一棵树绞杀另一个植物一样，逐步用新的微服务替代旧的单体应用，最终完全替换。
              </p>
            </div>
            <CodeBlock
              language="bash"
              code={`# 绞杀者模式迁移步骤

阶段1: 建立旁路（Bypass）
┌─────────────────────────────────────────────────────────────┐
│  客户端                                                            │
│    │                                                              │
│    ├──────────────────────┬─────────────────────────────────┤
│    │                      │                                 │
│    ▼                      ▼                                 │
│  单体应用          新微服务（用户服务）                         │
│    │                      │                                 │
│    └──────────────────────┴─────────────────────────────────┤
│                       │                                         │
│  ┌──────────────────────▼─────────────────────────────────┤
│  │  数据库                                            │
│  └──────────────────────────────────────────────────────────┘
│                                                                 │
│  迁移方式：API 网关根据 URL 路由                           │
│  - /api/users/*  → 新的 User Service                       │
│  - /*           → 单体应用                                  │
└─────────────────────────────────────────────────────────────┘

阶段2: 逐步替换功能
┌─────────────────────────────────────────────────────────────┐
│  客户端                                                            │
│    │                                                              │
│    ├─────────────────────────────────────────────────────────┤
│    │                                                             │
│    ▼                                                             │
│  API 网关                                                        │
│    ├──────────┬──────────┬──────────┬──────────┐                │
│    │          │          │          │          │                │
│    ▼          ▼          ▼          ▼          ▼                │
│  用户服务   订单服务   商品服务   库存服务   支付服务                │
│    │          │          │          │          │                │
│    └──────────┴──────────┴──────────┴──────────┘                │
│                       │                                         │
│  ┌──────────────────────▼─────────────────────────────────┤
│  │  单体应用（残留功能）                                   │
│  │  - 报表                                                │
│  │  - 后台管理                                            │
│  └──────────────────────────────────────────────────────────┘
│                                                                 │
│  逐步迁移：每个功能模块独立开发和部署                        │
└─────────────────────────────────────────────────────────────┘

阶段3: 完全替换
┌─────────────────────────────────────────────────────────────┐
│  客户端                                                            │
│    │                                                              │
│    ├─────────────────────────────────────────────────────────┤
│    │                                                             │
│    ▼                                                             │
│  API 网关                                                        │
│    ├──────────┬──────────┬──────────┬──────────┐                │
│    │          │          │          │          │                │
│    ▼          ▼          ▼          ▼          ▼                │
│  用户服务   订单服务   商品服务   库存服务   支付服务                │
│    │          │          │          │          │                │
│    └──────────┴──────────┴──────────┴──────────┘                │
│                                                                 │
│  ┌──────────────────────▼─────────────────────────────────┤
│  │  报表服务（独立微服务）                                   │
│  └──────────────────────────────────────────────────────────┘
│                                                                 │
│  单体应用下线 ✓                                               │
└─────────────────────────────────────────────────────────────┘

关键要点：
1. 功能路由：API 网关根据 URL 或 Header 路由到新服务
2. 双写并存：新功能和旧系统同时运行
3. 数据同步：通过 MQ 或 CDC 同步数据
4. 灰度切换：5% → 20% → 50% → 100% 流量切换
5. 旧系统下线：所有功能迁移完成后下线`}
            />
          </div>

          <div className="bg-white border-2 border-slate-200 rounded-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">兰伯特策略（Lamport's strategy）</h3>
            <div className="bg-green-50 border border-green-200 rounded p-4 mb-4">
              <h4 className="font-bold text-green-900 mb-2">✅ 优势</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• 零停机迁移</li>
                <li>• 数据一致性保障</li>
                <li>• 可随时回滚</li>
                <li>• 适合大规模迁移</li>
              </ul>
            </div>
            <CodeBlock
              language="bash"
              code={`# 兰伯特策略实施步骤

步骤1: 双写阶段（Dual Write）
┌─────────────────────────────────────────────────────────────┐
│                                                                 │
│  客户端                                                          │
│    │                                                              │
│    ├─────────┬──────────────────────────────┐                   │
│    │         │                              │                   │
│    ▼         ▼                              ▼                   │
│  单体      新微服务                       │                   │
│    │         │                              │                   │
│    ├─────────┴──────────┬───────────────────┤                   │
│    │                │                   │                       │
│    ▼                ▼                   ▼                       │
│  数据库（主）      数据库（副本）    MQ（事件同步）         │
│                                                                 │
│  写入流程：                                                          │
│  1. 写入主库（单体应用）                                          │
│  2. 同步写入副本（微服务）                                       │
│  3. 通过 MQ 同步数据变更事件                                   │
│                                                                 │
│  注意事项：                                                          │
│  - 主库和副本最终一致性                                          │
│  - 双写可能失败，需要重试机制                                    │
│  - MQ 消息幂等处理                                               │
└─────────────────────────────────────────────────────────────┘

步骤2: 读切换（Read Switch）
┌─────────────────────────────────────────────────────────────┐
│                                                                 │
│  客户端                                                          │
│    │                                                              │
│    ├──────────────────────────────────┐                        │
│    │                                 │                        │
│    ▼                                 ▼                        │
│  读主库                            读副本                     │
│  (单体)                           (新服务)                   │
│    │                                 │                        │
│    └──────────────┬──────────────────┘                        │
│                   │                                           │
│                   ▼                                           │
│              数据比对层                                       │
│                   │                                           │
│              验证数据一致性                                 │
│                                                                 │
│  切换策略：                                                          │
│  - 先切换 10% 读流量到新服务                                   │
│  - 验证数据一致性                                               │
│  - 逐步增加读流量：10% → 50% → 100%                          │
└─────────────────────────────────────────────────────────────┘

步骤3: 写切换（Write Switch）
┌─────────────────────────────────────────────────────────────┐
│                                                                 │
│  客户端                                                          │
│    │                                                              │
│    ├──────────────────────────────────┐                        │
│    │                                 │                        │
│    ▼                                 ▼                        │
│  写主库                           写副本                    │
│  (旧)                            (新)                       │
│    │                                 │                        │
│    └──────────────┬──────────────────┘                        │
│                   │                                           │
│                   ▼                                           │
│            数据同步层（CDC）                                 │
│                   │                                           │
│         Canal / Debezium 实时同步                             │
│                                                                 │
│  切换策略：                                                          │
│  - 先切换 10% 写流量到新服务                                   │
│  - CDC 实时同步副本 → 主库                                      │
│  - 逐步增加写流量：10% → 50% → 100%                          │
└─────────────────────────────────────────────────────────────┘

步骤4: 下线旧系统
┌─────────────────────────────────────────────────────────────┐
│                                                                 │
│  所有流量已切换到新服务 ✓                                       │
│                                                                 │
│  数据同步已完成 ✓                                               │
│                                                                 │
│  旧系统（单体应用）下线                                         │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  回顾要点：                                               │   │
│  │  1. 双写阶段：主库 + 副本                                │   │
│  │  2. 读切换：逐步切换读流量                               │   │
│  │  3. 写切换：逐步切换写流量                               │   │
│  │  4. 下线旧系统                                            │   │
│  │                                                         │   │
│  │  关键技术：                                              │   │
│  │  - 双写保证数据不丢失                                    │   │
│  │  - CDC（Canal/Debezium）实时同步                        │   │
│  │  - 灰度流量切换                                          │   │
│  │  - 数据一致性验证                                        │   │
│  └─────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘`}
            />
          </div>
        </div>
      </section>

      {/* 服务治理体系 */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">8. 微服务治理体系</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white border-2 border-slate-200 rounded-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">服务注册与发现</h3>
            <CodeBlock
              language="yaml"
              code={`spring:
  cloud:
    nacos:
      discovery:
        server-addr: localhost:8848
        namespace: production
        group: PROD_GROUP
        # 服务元数据
        metadata:
          version: 1.0.0
          region: cn-beijing
          zone: cn-beijing-1
        # 实例元数据
        instance:
          # 是否注册为临时实例（下线自动删除）
          ephemeral: true
          # 权重（1-100）
          weight: 1
          # 健康检查
        heart-beat:
          enabled: true
        naming:
          # 负载均衡策略
          loadbalance: random
          # 集群名称
          cluster-name: DEFAULT
          # 元数据配置
          metadata:
            preserved.register.source: SPRING_CLOUD`}
            />
            <div className="mt-4 bg-blue-50 border border-blue-200 rounded p-3">
              <h4 className="font-bold text-blue-900 mb-2">💡 治理能力</h4>
              <ul className="text-xs text-gray-700 space-y-1">
                <li>• <strong>健康检查</strong>: 自动剔除不健康实例</li>
                <li>• <strong>权重路由</strong>: 灰度发布支持</li>
                <li>• <strong>元数据管理</strong>: 版本控制、环境隔离</li>
              </ul>
            </div>
          </div>

          <div className="bg-white border-2 border-slate-200 rounded-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">配置管理</h3>
            <CodeBlock
              language="yaml"
              code={`spring:
  cloud:
    nacos:
      config:
        server-addr: localhost:8848
        namespace: production
        group: PROD_GROUP
        # 配置文件格式
        file-extension: yaml
        # 配置刷新（自动）
        refresh-enabled: true
        # 共享配置
        shared-configs:
          - data-id: common.yaml
            group: COMMON_GROUP
            refresh: true
        # 扩展配置
        extension-configs:
          - data-id: redis.yaml
            group: EXT_GROUP
            refresh: true

# 动态刷新示例
@RefreshScope
@RestController
@RequestMapping("/api/config")
public class ConfigController {

    @Value("\${app.timeout:3000}")
    private int timeout;

    @GetMapping("/timeout")
    public int getTimeout() {
        return timeout;
    }

    @RefreshScope
    @Bean
    @ConfigurationProperties(prefix = "app")
    public AppProperties appProperties() {
        return new AppProperties();
    }
{'}'}`}
            />
            <div className="mt-4 bg-green-50 border border-green-200 rounded p-3">
              <h4 className="font-bold text-green-900 mb-2">✅ 动态配置</h4>
              <ul className="text-xs text-gray-700 space-y-1">
                <li>• <strong>灰度发布</strong>: 不同环境不同配置</li>
                <li>• <strong>配置监听</strong>: @RefreshScope 自动刷新</li>
                <li>• <strong>版本管理</strong>: 配置历史、回滚</li>
              </ul>
            </div>
          </div>

          <div className="bg-white border-2 border-slate-200 rounded-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">熔断降级</h3>
            <CodeBlock
              language="java"
              code={`@SentinelResource(value = "createOrder",
    blockHandler = "handleBlock",
    fallback = "handleFallback")
public Result<Long> createOrder(@RequestBody OrderRequest request) {

    // 业务逻辑
    Long orderId = orderService.create(request);
    return Result.success(orderId);
}

// 限流降级
public Result<Long> handleBlock(OrderRequest request, BlockException ex) {
    log.warn("服务限流，返回降级数据");
    return Result.error("系统繁忙，请稍后重试");
}

// 异常降级
public Result<Long> handleFallback(OrderRequest request, Throwable ex) {
    log.error("服务异常，执行降级", ex);

    // 降级逻辑
    // 1. 返回缓存数据
    // 2. 返回默认值
    // 3. 调用备用服务
    return Result.success(-1L); // 默认订单ID
}

# Sentinel 配置
spring:
  cloud:
    sentinel:
      transport:
        dashboard: localhost:8080
      # 限流规则
      datasource:
        flow:
          nacos:
            server-addr: localhost:8848
            data-id: \${spring.application.name}-flow-rules
            group-id: SENTINEL_GROUP
            data-type: json
        degrade:
          nacos:
            server-addr: localhost:8848
            data-id: \${spring.application.name}-degrade-rules
            group-id: SENTINEL_GROUP
            data-type: json`}
            />
            <div className="mt-4 bg-red-50 border border-red-200 rounded p-3">
              <h4 className="font-bold text-red-900 mb-2">⚠️ 治理策略</h4>
              <ul className="text-xs text-gray-700 space-y-1">
                <li>• <strong>慢调用比例</strong>: RT {'>='} 阈值触发熔断</li>
                <li>• <strong>异常比例</strong>: 异常数 / 总数 {'>='} 阈值</li>
                <li>• <strong>异常数</strong>: 异常数 {'>='} 阈值</li>
                <li>• <strong>熔断恢复</strong>: 半开状态试探</li>
              </ul>
            </div>
          </div>

          <div className="bg-white border-2 border-slate-200 rounded-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">负载均衡</h3>
            <CodeBlock
              language="yaml"
              code={`spring:
  cloud:
    loadbalancer:
      # 负载均衡策略
      ribbon:
        # 随机（默认）
        NFLoadBalancerRuleClassName: com.netflix.loadbalancer.RandomRule
        # 轮询
        # NFLoadBalancerRuleClassName: com.netflix.loadbalancer.RoundRobinRule
        # 重试
        NFLoadBalancerRuleClassName: com.netflix.loadbalancer.RetryRule
        # 权重响应时间
        NFLoadBalancerRuleClassName: com.netflix.loadbalancer.WeightedResponseTimeRule
        # 最小并发
        NFLoadBalancerRuleClassName: com.netflix.loadbalancer.BestAvailableRule

# 自定义负载均衡
@Configuration
public class LoadBalancerConfig {

    @Bean
    public ReactorServiceLoadBalancer reactiveLoadBalancer(
        LoadBalancerClientFactory factory) {
        return new CustomLoadBalancer(factory);
    }
}

# 灰度发布配置（基于权重的路由）
spring:
  cloud:
    nacos:
      discovery:
        server-addr: localhost:8848
        # 实例权重
        instance:
          weight: 10  # 新版本权重
        metadata:
          version: v2  # 版本号`}
            />
            <div className="mt-4 bg-purple-50 border border-purple-200 rounded p-3">
              <h4 className="font-bold text-purple-900 mb-2">🎯 负载策略</h4>
              <ul className="text-xs text-gray-700 space-y-1">
                <li>• <strong>随机</strong>: 性能最优</li>
                <li>• <strong>轮询</strong>: 分布均匀</li>
                <li>• <strong>权重</strong>: 灰度发布</li>
                <li>• <strong>最少并发</strong>: 性能最优</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">链路追踪</h3>
          <CodeBlock
            language="yaml"
            code={`# SkyWalking Agent 配置
# agent/config/agent.config
agent.service_name=\${spring.application.name}
agent.authentication=\${SW_AUTHENTICATION:}
agent.namespace=\${SW_NAMESPACE:}
agent.sample_n_per_3_spans=\${SW_SAMPLE_N_PER_3_SPANS:4}
agent.meter_package_enabled=\${SW_METER_PACKAGE_ENABLED:true}
agent.cool_down_threshold=\${SW_COOL_DOWN_THRESHOLD:}

# JVM 参数
java -javaagent:/path/to/skywalking-agent.jar \\
     -Dskywalking.agent.service_name=order-service \\
     -Dskywalking.collector.backend_service=skywalking-oap:11800 \\
     -jar order-service.jar

# TraceId 传递（OpenFeign + Sentinel）
feign:
  client:
    config:
      default:
        connectTimeout: 5000
        readTimeout: 10000

spring:
  cloud:
    sentinel:
      datasource:
        ds:
          nacos:
            server-addr: localhost:8848
            dataId: \${spring.application.name}-sentinel-flow
            groupId: SENTINEL_GROUP

# TraceId 在日志中打印
logging:
  pattern:
    console: "%d{yyyy-MM-dd HH:mm:ss} [%thread] %-5level [%X{traceId}] %logger{50} - %msg%n"
    file: "%d{yyyy-MM-dd HH:mm:ss} [%thread] %-5level [%X{traceId}] %logger{50} - %msg%n"
  file:
    name: /logs/\${spring.application.name}.log

# 链路追踪能力：
# 1. 完整调用链路：Gateway → Service A → Service B → Service C
# 2. 性能分析：每个节点的 RT、QPS、错误率
# 3. 依赖拓扑：服务间依赖关系
# 4. 日志关联：通过 TraceId 关联所有服务的日志`}
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <div className="bg-blue-50 border border-blue-200 rounded p-3">
              <h4 className="font-bold text-blue-900 mb-2">📊 指标采集</h4>
              <ul className="text-xs text-gray-700 space-y-1">
                <li>• RT（响应时间）</li>
                <li>• QPS（吞吐量）</li>
                <li>• 错误率</li>
                <li>• 慢查询</li>
              </ul>
            </div>
            <div className="bg-green-50 border border-green-200 rounded p-3">
              <h4 className="font-bold text-green-900 mb-2">🔍 故障定位</h4>
              <ul className="text-xs text-gray-700 space-y-1">
                <li>• TraceId 关联日志</li>
                <li>• 调用链路分析</li>
                <li>• 异常栈追踪</li>
                <li>• 根因分析</li>
              </ul>
            </div>
            <div className="bg-yellow-50 border border-yellow-200 rounded p-3">
              <h4 className="font-bold text-yellow-900 mb-2">📈 性能优化</h4>
              <ul className="text-xs text-gray-700 space-y-1">
                <li>• 慢服务识别</li>
                <li>• 瓶颈定位</li>
                <li>• 调用优化</li>
                <li>• 容量规划</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 性能优化策略 */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">9. 拆分后的性能优化</h2>

        <div className="space-y-6">
          <div className="bg-white border-2 border-slate-200 rounded-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">分布式缓存策略</h3>
            <CodeBlock
              language="yaml"
              code={`# Redis 多级缓存配置
spring:
  redis:
    host: redis-cluster
    port: 6379
    password: \${REDIS_PASSWORD}
    timeout: 3000
    lettuce:
      pool:
        max-active: 50
        max-idle: 20
        min-idle: 10
      cluster:
        max-redirects: 3

# 缓存注解配置
@Configuration
@EnableCaching
public class CacheConfig {

    @Bean
    public CacheManager cacheManager(RedisConnectionFactory factory) {

        // 多级缓存配置
        RedisCacheConfiguration config = RedisCacheConfiguration.defaultCacheConfig()
            .entryTtl(Duration.ofMinutes(30))  // 缓存30分钟
            .serializeKeysWith(RedisSerializationContext.SerializationPair.fromSerializer(
                new StringRedisSerializer()))
            .serializeValuesWith(RedisSerializationContext.SerializationPair.fromSerializer(
                new GenericJackson2JsonRedisSerializer<>(ObjectMapper())));

        // L1: 本地缓存（Caffeine）
        // L2: Redis 缓存
        return RedisCacheManager.builder(factory)
            .cacheDefaults(config)
            .build();
    }
}

# 缓存策略
@Component
public class CacheService {

    @Cacheable(value = "product", key = "#id", unless = "#result == null")
    public Product getProductById(Long id) {
        return productMapper.selectById(id);
    }

    @CacheEvict(value = "product", key = "#id")
    public void updateProduct(Product product) {
        productMapper.updateById(product);
    }

    @CacheEvict(value = "product", allEntries = true)
    public void refreshCache() {
        // 清空所有缓存
    }

# 缓存问题解决方案：
# 1. 缓存穿透：布隆过滤器 + 缓存空对象
# 2. 缓存击穿：互斥锁 + 永不过期
# 3. 缓存雪崩：TTL 加随机值 + 多级缓存`}
            />
          </div>

          <div className="bg-white border-2 border-slate-200 rounded-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">异步通信优化</h3>
            <CodeBlock
              language="java"
              code={`// CompletableFuture 并行调用
@Service
public class OrderService {

    @Autowired
    private UserService userService;

    @Autowired
    private ProductService productService;

    @Autowired
    private InventoryService inventoryService;

    public OrderDetailDTO getOrderDetail(Long orderId) {

        // 查询订单信息
        CompletableFuture<Order> orderFuture =
            CompletableFuture.supplyAsync(() -> orderMapper.selectById(orderId));

        // 并发查询用户、商品、库存信息
        CompletableFuture<User> userFuture =
            CompletableFuture.supplyAsync(() -> userService.getById(orderUserId));

        CompletableFuture<List<OrderItem>> itemsFuture =
            CompletableFuture.supplyAsync(() -> orderItemService.listByOrderId(orderId));

        // 等待所有任务完成
        CompletableFuture.allOf(orderFuture, userFuture, itemsFuture).join();

        // 组装结果
        Order order = orderFuture.get();
        User user = userFuture.get();
        List<OrderItem> items = itemsFuture.get();

        return new OrderDetailDTO(order, user, items);
    }
}

// RocketMQ 异步解耦
@Component
public class OrderPublisher {

    @Autowired
    private RocketMQTemplate rocketMQTemplate;

    // 创建订单后发送消息
    public void sendOrderCreatedEvent(Order order) {
        OrderCreatedEvent event = new OrderCreatedEvent();
        event.setOrderId(order.getId());
        event.setUserId(order.getUserId());
        event.setTotalAmount(order.getTotalAmount());

        rocketMQTemplate.asyncSend("order-created-topic", event, new SendCallback() {
            @Override
            public void onSuccess(SendResult sendResult) {
                log.info("订单事件发送成功: {}", order.getId());
            }

            @Override
            public void onException(Throwable e) {
                log.error("订单事件发送失败: {}", order.getId(), e);
                // 重试或补偿
            }
        });
    }
}

// 消息监听器（异步处理）
@RocketMQMessageListener(
    topic = "order-created-topic",
    consumerGroup = "inventory-consumer-group"
)
public class InventoryConsumer implements RocketMQListener<OrderCreatedEvent> {

    @Autowired
    private InventoryService inventoryService;

    @Override
    public void onMessage(OrderCreatedEvent event) {
        log.info("收到订单创建事件: {}", event.getOrderId());

        // 异步扣减库存
        inventoryService.deduct(event.getProductId(), event.getQuantity());
    }
}

# 异步优化收益：
# - RT: 150ms → 45ms（并行调用）
# - QPS: 2,000 → 6,000（异步解耦）
# - 系统吞吐量提升 3倍`}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-green-50 border border-green-200 rounded-lg p-5">
              <h3 className="text-xl font-bold text-green-900 mb-3">✅ 性能优化收益</h3>
              <ul className="text-sm text-gray-700 space-y-2">
                <li><strong>分布式缓存</strong>: RT 降低 70%</li>
                <li><strong>异步通信</strong>: QPS 提升 200%</li>
                <li><strong>数据库优化</strong>: 慢查询减少 80%</li>
                <li><strong>负载均衡</strong>: 请求分发更均匀</li>
              </ul>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-5">
              <h3 className="text-xl font-bold text-yellow-900 mb-3">⚠️ 性能挑战</h3>
              <ul className="text-sm text-gray-700 space-y-2">
                <li><strong>网络开销</strong>: RPC 调用增加延迟</li>
                <li><strong>数据一致性</strong>: 分布式事务复杂</li>
                <li><strong>缓存一致性</strong>: 多级缓存同步</li>
                <li><strong>运维复杂度</strong>: 服务数量增多</li>
              </ul>
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
