import { CodeBlock } from '../components';
import { useState } from 'react';

export const ArchitectureDecisionsPage: React.FC = () => {
  const [expandedAdr, setExpandedAdr] = useState<number | null>(null);

  return (
    <div className="prose prose-slate max-w-none">
      <div className="bg-gradient-to-r from-indigo-600 to-purple-700 text-white rounded-lg p-6 mb-8">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-4xl font-bold mb-2">架构决策记录 (ADR)</h1>
            <p className="text-indigo-100 text-lg">记录关键架构决策，培养架构思维</p>
          </div>
          <div className="flex gap-3 text-sm">
            <span className="px-3 py-1 bg-white/20 rounded-full">🏗️ 架构师</span>
            <span className="px-3 py-1 bg-white/20 rounded-full">⏱️ 约45分钟</span>
            <span className="px-3 py-1 bg-white/20 rounded-full">📚 8个知识点</span>
          </div>
        </div>
      </div>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">什么是 ADR?</h2>
        
        <div className="bg-indigo-50 border-l-4 border-indigo-500 p-6 rounded-lg mb-6">
          <h4 className="font-bold text-gray-900 mb-2">💡 定义</h4>
          <p className="text-gray-700 text-sm">
            架构决策记录是一种轻量级的文档形式，用于记录架构决策的<strong>背景、选项、决策结果和影响</strong>。
            它帮助团队成员理解决策背后的原因，避免重复讨论，并为未来的决策提供参考。
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-5">
            <h3 className="text-xl font-bold text-gray-900 mb-3">🎯 为什么需要 ADR?</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>• 记录决策过程，避免遗忘</li>
              <li>• 帮助新人快速了解系统</li>
              <li>• 避免重复讨论相同问题</li>
              <li>• 为未来决策提供参考</li>
            </ul>
          </div>
          
          <div className="bg-green-50 border-2 border-green-200 rounded-lg p-5">
            <h3 className="text-xl font-bold text-gray-900 mb-3">📅 何时编写 ADR?</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>• 引入新技术或框架时</li>
              <li>• 重大架构调整时</li>
              <li>• 技术选型决策时</li>
              <li>• 安全策略变更时</li>
            </ul>
          </div>
          
          <div className="bg-purple-50 border-2 border-purple-200 rounded-lg p-5">
            <h3 className="text-xl font-bold text-gray-900 mb-3">👥 谁来编写 ADR?</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>• 架构师主导编写</li>
              <li>• 技术负责人参与</li>
              <li>• 相关团队成员评审</li>
              <li>• 存档到项目文档库</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">ADR 标准模板</h2>
        
        <CodeBlock
          language="markdown"
          filename="ADR-001-template.md"
          code={`# ADR-001: [决策标题]

## 状态
[已提议 | 已采纳 | 已废弃 | 已替代]

## 背景
描述导致此决策的背景和上下文：
- 当前面临的问题是什么？
- 为什么需要做出这个决策？
- 有哪些约束条件？

## 决策
简明扼要地描述决策内容

## 备选方案
列出所有考虑过的方案及其优劣对比

| 方案 | 优势 | 劣势 | 评分 |
|-----|------|------|-----|
| 方案A | ... | ... | 8/10 |
| 方案B | ... | ... | 6/10 |
| 方案C | ... | ... | 5/10 |

## 决策依据
详细说明选择该方案的原因：
1. 技术因素
2. 业务因素
3. 团队因素
4. 成本因素

## 影响
### 正面影响
- ...

### 负面影响
- ...

### 风险
- ...

## 决策人
- 张三（架构师）
- 李四（技术总监）

## 决策日期
YYYY-MM-DD

## 相关文档
- [相关ADR链接]
- [相关技术文档链接]`}
        />
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">实际案例：电商系统 ADR 集合</h2>
        
        <div className="space-y-4">
          <AdrCard
            id="ADR-001"
            title="使用 Spring Cloud Alibaba 作为微服务框架"
            status="已采纳"
            date="2024-01-15"
            summary="选择 Spring Cloud Alibaba 而非 Spring Cloud Netflix 或 Dubbo"
            isOpen={expandedAdr === 1}
            onClick={() => setExpandedAdr(expandedAdr === 1 ? null : 1)}
            details={
              <div className="space-y-4">
                <div>
                  <h5 className="font-bold text-gray-900 mb-2">背景</h5>
                  <p className="text-sm text-gray-700">业务快速发展，单体应用已无法满足需求。团队规模扩大到 50+ 人，协作困难。需要独立部署和扩展的能力。</p>
                </div>
                <div>
                  <h5 className="font-bold text-gray-900 mb-2">备选方案对比</h5>
                  <table className="min-w-full text-sm">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-3 py-2 text-left">方案</th>
                        <th className="px-3 py-2 text-left">优势</th>
                        <th className="px-3 py-2 text-left">劣势</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      <tr>
                        <td className="px-3 py-2">Spring Cloud Alibaba</td>
                        <td className="px-3 py-2">国内生态完善、文档中文友好</td>
                        <td className="px-3 py-2">版本更新较慢</td>
                      </tr>
                      <tr>
                        <td className="px-3 py-2">Spring Cloud Netflix</td>
                        <td className="px-3 py-2">社区成熟、资料丰富</td>
                        <td className="px-3 py-2">部分组件停止维护</td>
                      </tr>
                      <tr>
                        <td className="px-3 py-2">Dubbo</td>
                        <td className="px-3 py-2">高性能、国内流行</td>
                        <td className="px-3 py-2">生态不如 Spring 丰富</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div>
                  <h5 className="font-bold text-gray-900 mb-2">决策依据</h5>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>1. 团队已有 Spring Boot 经验，学习成本低</li>
                    <li>2. Nacos 提供注册中心和配置中心一体化方案</li>
                    <li>3. Sentinel 提供完善的流量控制能力</li>
                    <li>4. 国内社区活跃，问题解决效率高</li>
                  </ul>
                </div>
              </div>
            }
          />
          
          <AdrCard
            id="ADR-002"
            title="使用 Seata AT 模式处理分布式事务"
            status="已采纳"
            date="2024-02-01"
            summary="订单、库存、支付服务间事务协调方案"
            isOpen={expandedAdr === 2}
            onClick={() => setExpandedAdr(expandedAdr === 2 ? null : 2)}
            details={
              <div className="space-y-4">
                <div>
                  <h5 className="font-bold text-gray-900 mb-2">背景</h5>
                  <p className="text-sm text-gray-700">订单创建涉及订单、库存、支付三个服务，需要保证数据一致性。传统分布式事务方案复杂度高，开发成本大。</p>
                </div>
                <div>
                  <h5 className="font-bold text-gray-900 mb-2">备选方案对比</h5>
                  <table className="min-w-full text-sm">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-3 py-2 text-left">方案</th>
                        <th className="px-3 py-2 text-left">适用场景</th>
                        <th className="px-3 py-2 text-left">复杂度</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      <tr>
                        <td className="px-3 py-2">Seata AT</td>
                        <td className="px-3 py-2">大多数业务场景</td>
                        <td className="px-3 py-2">低</td>
                      </tr>
                      <tr>
                        <td className="px-3 py-2">Seata TCC</td>
                        <td className="px-3 py-2">高性能金融场景</td>
                        <td className="px-3 py-2">高</td>
                      </tr>
                      <tr>
                        <td className="px-3 py-2">Saga</td>
                        <td className="px-3 py-2">长流程业务</td>
                        <td className="px-3 py-2">中</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div>
                  <h5 className="font-bold text-gray-900 mb-2">决策依据</h5>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>1. AT 模式无侵入，对业务代码改动最小</li>
                    <li>2. 自动补偿机制，降低开发复杂度</li>
                    <li>3. 与 Spring Cloud Alibaba 生态无缝集成</li>
                  </ul>
                </div>
              </div>
            }
          />
          
          <AdrCard
            id="ADR-003"
            title="选择 RocketMQ 作为消息中间件"
            status="已采纳"
            date="2024-02-15"
            summary="订单事件驱动、异步解耦的消息中间件选型"
            isOpen={expandedAdr === 3}
            onClick={() => setExpandedAdr(expandedAdr === 3 ? null : 3)}
            details={
              <div className="space-y-4">
                <div>
                  <h5 className="font-bold text-gray-900 mb-2">背景</h5>
                  <p className="text-sm text-gray-700">订单创建后需要通知库存、积分、通知等多个下游服务。需要可靠的消息投递机制，支持事务消息。</p>
                </div>
                <div>
                  <h5 className="font-bold text-gray-900 mb-2">决策依据</h5>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>1. 事务消息支持，保证本地事务与消息发送的原子性</li>
                    <li>2. 顺序消息支持，订单状态变更需要严格顺序</li>
                    <li>3. 阿里生态，与 Spring Cloud Alibaba 集成良好</li>
                    <li>4. 金融级可靠性，经过双十一验证</li>
                  </ul>
                </div>
              </div>
            }
          />
          
          <AdrCard
            id="ADR-004"
            title="采用多级缓存架构"
            status="已采纳"
            date="2024-03-01"
            summary="本地缓存 Caffeine + 分布式缓存 Redis 的多级缓存方案"
            isOpen={expandedAdr === 4}
            onClick={() => setExpandedAdr(expandedAdr === 4 ? null : 4)}
            details={
              <div className="space-y-4">
                <div>
                  <h5 className="font-bold text-gray-900 mb-2">背景</h5>
                  <p className="text-sm text-gray-700">商品详情页 QPS 高达 10万+，单纯 Redis 缓存无法满足性能要求，需要更快的缓存层。</p>
                </div>
                <div>
                  <h5 className="font-bold text-gray-900 mb-2">架构设计</h5>
                  <CodeBlock
                    language="text"
                    code={`请求 → Caffeine(L1) → Redis(L2) → MySQL
         ↓ 命中         ↓ 命中      ↓ 查询
       返回           返回        返回

L1: 本地缓存 Caffeine
- 容量: 10000条
- TTL: 5分钟
- 命中率目标: 80%

L2: 分布式缓存 Redis
- 容量: 无限制
- TTL: 30分钟
- 命中率目标: 95%`}
                  />
                </div>
              </div>
            }
          />
          
          <AdrCard
            id="ADR-005"
            title="API 网关统一认证授权方案"
            status="已采纳"
            date="2024-03-15"
            summary="基于 JWT + Gateway 的统一认证授权架构"
            isOpen={expandedAdr === 5}
            onClick={() => setExpandedAdr(expandedAdr === 5 ? null : 5)}
            details={
              <div className="space-y-4">
                <div>
                  <h5 className="font-bold text-gray-900 mb-2">背景</h5>
                  <p className="text-sm text-gray-700">微服务架构下，每个服务独立认证会导致代码重复、维护困难。需要统一的认证授权方案。</p>
                </div>
                <div>
                  <h5 className="font-bold text-gray-900 mb-2">架构设计</h5>
                  <CodeBlock
                    language="text"
                    code={`客户端
   ↓
API Gateway (认证过滤器)
   ↓ 验证 JWT Token
   ↓ 解析用户信息
   ↓ 传递到下游服务
微服务 (无需认证)
   ↓ 直接使用用户信息

JWT Token 结构:
{
  "sub": "user123",
  "roles": ["admin", "user"],
  "exp": 1710000000,
  "iat": 1709900000
}`}
                  />
                </div>
              </div>
            }
          />
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">ADR 编写最佳实践</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-green-50 border-2 border-green-200 rounded-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">✅ 推荐做法</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="text-green-600 mr-2">✓</span>
                <span className="text-sm text-gray-700"><strong>简洁明了</strong> - 避免冗长，聚焦核心决策</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2">✓</span>
                <span className="text-sm text-gray-700"><strong>记录过程</strong> - 记录决策过程而非仅结果</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2">✓</span>
                <span className="text-sm text-gray-700"><strong>包含对比</strong> - 列出备选方案及优劣</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2">✓</span>
                <span className="text-sm text-gray-700"><strong>明确影响</strong> - 说明决策的影响范围</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2">✓</span>
                <span className="text-sm text-gray-700"><strong>定期回顾</strong> - 定期评估决策是否仍然有效</span>
              </li>
            </ul>
          </div>
          
          <div className="bg-red-50 border-2 border-red-200 rounded-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">❌ 避免做法</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="text-red-600 mr-2">✗</span>
                <span className="text-sm text-gray-700"><strong>过于详细</strong> - 避免变成设计文档</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-600 mr-2">✗</span>
                <span className="text-sm text-gray-700"><strong>事后补录</strong> - 决策时即时记录</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-600 mr-2">✗</span>
                <span className="text-sm text-gray-700"><strong>忽略反对意见</strong> - 记录不同观点</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-600 mr-2">✗</span>
                <span className="text-sm text-gray-700"><strong>缺乏上下文</strong> - 说明决策背景</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-600 mr-2">✗</span>
                <span className="text-sm text-gray-700"><strong>从不回顾</strong> - 决策需要持续评估</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">ADR 管理流程</h2>
        
        <div className="bg-slate-50 border-l-4 border-slate-500 p-6 rounded-lg mb-6">
          <h4 className="font-bold text-gray-900 mb-3">📋 ADR 生命周期</h4>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-start">
            <span className="flex-shrink-0 w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-4">1</span>
            <div className="flex-1 bg-white border border-gray-200 rounded-lg p-4">
              <h4 className="text-lg font-bold text-gray-900">提议阶段</h4>
              <p className="text-sm text-gray-700">架构师或技术负责人发起 ADR 提议，描述问题和初步方案</p>
            </div>
          </div>
          
          <div className="flex items-start">
            <span className="flex-shrink-0 w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-4">2</span>
            <div className="flex-1 bg-white border border-gray-200 rounded-lg p-4">
              <h4 className="text-lg font-bold text-gray-900">讨论阶段</h4>
              <p className="text-sm text-gray-700">团队成员参与讨论，提出不同观点和备选方案</p>
            </div>
          </div>
          
          <div className="flex items-start">
            <span className="flex-shrink-0 w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-4">3</span>
            <div className="flex-1 bg-white border border-gray-200 rounded-lg p-4">
              <h4 className="text-lg font-bold text-gray-900">评审阶段</h4>
              <p className="text-sm text-gray-700">架构评审会议讨论，技术委员会审批</p>
            </div>
          </div>
          
          <div className="flex items-start">
            <span className="flex-shrink-0 w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-4">4</span>
            <div className="flex-1 bg-white border border-gray-200 rounded-lg p-4">
              <h4 className="text-lg font-bold text-gray-900">采纳阶段</h4>
              <p className="text-sm text-gray-700">决策被采纳，更新状态，开始实施</p>
            </div>
          </div>
          
          <div className="flex items-start">
            <span className="flex-shrink-0 w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-4">5</span>
            <div className="flex-1 bg-white border border-gray-200 rounded-lg p-4">
              <h4 className="text-lg font-bold text-gray-900">回顾阶段</h4>
              <p className="text-sm text-gray-700">定期回顾决策效果，必要时更新或废弃</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-r from-indigo-600 to-purple-700 text-white p-8 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">🎯 掌握了 ADR，下一步学习什么?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <NextStepCard title="技术选型决策" description="科学的技术选型方法论" link="/tech-selection" icon="🔬" />
          <NextStepCard title="服务拆分原则" description="DDD 战略设计实战" link="/service-decomposition" icon="📐" />
          <NextStepCard title="架构师软技能" description="沟通与影响力建设" link="/architect-soft-skills" icon="🤝" />
          <NextStepCard title="系统设计" description="架构设计方法论" link="/system-design" icon="🏗️" />
        </div>
      </section>
    </div>
  );
};

interface AdrCardProps {
  id: string;
  title: string;
  status: string;
  date: string;
  summary: string;
  isOpen: boolean;
  onClick: () => void;
  details: React.ReactNode;
}

const AdrCard: React.FC<AdrCardProps> = ({ id, title, status, date, summary, isOpen, onClick, details }) => {
  const statusColors: Record<string, string> = {
    '已采纳': 'bg-green-100 text-green-800',
    '已提议': 'bg-yellow-100 text-yellow-800',
    '已废弃': 'bg-red-100 text-red-800',
    '已替代': 'bg-gray-100 text-gray-800',
  };

  return (
    <div className="bg-white border-2 border-gray-200 rounded-lg overflow-hidden">
      <button
        onClick={onClick}
        className="w-full px-6 py-4 text-left hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="text-sm font-mono text-indigo-600">{id}</span>
            <h3 className="text-lg font-bold text-gray-900">{title}</h3>
          </div>
          <div className="flex items-center gap-3">
            <span className={`px-2 py-1 text-xs rounded-full ${statusColors[status] || 'bg-gray-100'}`}>
              {status}
            </span>
            <span className="text-sm text-gray-500">{date}</span>
            <svg
              className={`w-5 h-5 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
        <p className="text-sm text-gray-600 mt-2">{summary}</p>
      </button>
      {isOpen && (
        <div className="px-6 pb-4 border-t border-gray-100 pt-4">
          {details}
        </div>
      )}
    </div>
  );
};

interface NextStepCardProps {
  title: string;
  description: string;
  link: string;
  icon: string;
}

const NextStepCard: React.FC<NextStepCardProps> = ({ title, description, link, icon }) => {
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
