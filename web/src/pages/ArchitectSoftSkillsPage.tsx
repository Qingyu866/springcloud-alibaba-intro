import { CodeBlock } from '../components';
import { useState } from 'react';

export const ArchitectSoftSkillsPage: React.FC = () => {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  return (
    <div className="prose prose-slate max-w-none">
      <div className="bg-gradient-to-r from-amber-600 to-orange-700 text-white rounded-lg p-6 mb-8">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-4xl font-bold mb-2">架构师软技能</h1>
            <p className="text-amber-100 text-lg">技术决策、团队协作、影响力建设</p>
          </div>
          <div className="flex gap-3 text-sm">
            <span className="px-3 py-1 bg-white/20 rounded-full">🏗️ 架构师</span>
            <span className="px-3 py-1 bg-white/20 rounded-full">⏱️ 约50分钟</span>
            <span className="px-3 py-1 bg-white/20 rounded-full">📚 9个知识点</span>
          </div>
        </div>
      </div>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">架构师角色定位</h2>
        
        <div className="bg-amber-50 border-l-4 border-amber-500 p-6 rounded-lg mb-6">
          <h4 className="font-bold text-gray-900 mb-2">🎯 核心定位</h4>
          <p className="text-gray-700 text-sm">
            架构师不仅是技术专家，更是<strong>技术决策者、团队协作者、知识传承者</strong>。
            优秀的架构师需要在技术深度和软技能之间取得平衡。
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <RoleCard
            icon="🎯"
            title="技术决策者"
            description="制定技术方向，把控技术风险"
            skills={[
              { name: '技术选型', level: 90 },
              { name: '架构设计', level: 95 },
              { name: '风险评估', level: 85 },
              { name: '技术规划', level: 88 }
            ]}
          />
          <RoleCard
            icon="🤝"
            title="团队协作者"
            description="跨团队沟通，推动方案落地"
            skills={[
              { name: '沟通协调', level: 85 },
              { name: '冲突解决', level: 80 },
              { name: '资源整合', level: 82 },
              { name: '项目管理', level: 78 }
            ]}
          />
          <RoleCard
            icon="📚"
            title="知识传承者"
            description="技术分享，培养团队技术能力"
            skills={[
              { name: '技术分享', level: 88 },
              { name: 'Code Review', level: 90 },
              { name: '新人培养', level: 85 },
              { name: '文档编写', level: 82 }
            ]}
          />
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">技术决策沟通技巧</h2>
        
        <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-lg mb-6">
          <h4 className="font-bold text-gray-900 mb-2">💡 沟通原则</h4>
          <p className="text-gray-700 text-sm">
            技术决策沟通需要<strong>数据支撑、逻辑清晰、换位思考</strong>。
            让听众理解决策背后的原因，而非仅仅知道结果。
          </p>
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-4">技术决策沟通框架</h3>
        
        <CodeBlock
          language="text"
          code={`技术决策沟通四步法：

┌─────────────────────────────────────────────────────────────┐
│ 步骤1: 问题陈述                                              │
├─────────────────────────────────────────────────────────────┤
│ • 清晰描述当前问题                                          │
│ • 量化问题影响（如：性能下降30%）                           │
│ • 说明解决问题的紧迫性                                      │
│ • 使用数据支撑，避免主观描述                                │
│                                                             │
│ 示例：                                                      │
│ "当前单体应用部署耗时长（2小时），无法满足业务快速迭代需求， │
│  每次发布影响所有功能，故障风险高。                          │
│  上季度因部署问题导致3次线上故障，影响用户10万+"            │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ 步骤2: 方案对比                                              │
├─────────────────────────────────────────────────────────────┤
│ • 列出 2-3 个备选方案                                       │
│ • 使用表格对比优劣                                          │
│ • 给出推荐方案和理由                                        │
│ • 客观呈现，避免预设立场                                    │
│                                                             │
│ 示例：                                                      │
│ ┌───────────┬──────────┬──────────┬──────────┐              │
│ │   方案    │ 部署时间 │ 故障影响 │ 开发效率 │              │
│ ├───────────┼──────────┼──────────┼──────────┤              │
│ │ 维持现状  │  2小时   │  全系统  │    低    │              │
│ │ 模块化    │  1小时   │  模块内  │    中    │              │
│ │ 微服务    │  15分钟  │  单服务  │    高    │              │
│ └───────────┴──────────┴──────────┴──────────┘              │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ 步骤3: 影响分析                                              │
├─────────────────────────────────────────────────────────────┤
│ • 对业务的影响                                              │
│ • 对团队的影响                                              │
│ • 对系统的影响                                              │
│ • 风险和应对措施                                            │
│                                                             │
│ 示例：                                                      │
│ 业务影响：部署频率提升300%，故障恢复时间降低80%             │
│ 团队影响：需要学习新技术栈，预计培训周期2周                 │
│ 系统影响：增加运维复杂度，需要引入容器平台                  │
│ 风险应对：分阶段实施，先拆分非核心服务                      │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ 步骤4: 实施计划                                              │
├─────────────────────────────────────────────────────────────┤
│ • 分阶段实施步骤                                            │
│ • 关键里程碑                                                │
│ • 资源需求                                                  │
│ • 风险应对措施                                              │
│                                                             │
│ 示例：                                                      │
│ 第一阶段（1-3月）：拆分用户、商品服务                       │
│ 第二阶段（4-6月）：拆分订单、支付服务                       │
│ 第三阶段（7-8月）：完善监控、治理体系                       │
│ 资源需求：架构师1人，开发团队10人，运维团队3人              │
└─────────────────────────────────────────────────────────────┘`}
        />

        <h3 className="text-xl font-bold text-gray-900 mb-4 mt-8">不同受众的沟通策略</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <AudienceCard
            icon="👔"
            title="向管理层汇报"
            points={[
              '聚焦业务价值和ROI',
              '使用数据和图表',
              '突出风险控制',
              '给出明确建议',
              '控制汇报时间'
            ]}
          />
          <AudienceCard
            icon="👨‍💻"
            title="向技术团队沟通"
            points={[
              '深入技术细节',
              '解释设计决策',
              '听取不同意见',
              '共同制定方案',
              '提供学习资源'
            ]}
          />
          <AudienceCard
            icon="🤝"
            title="跨部门协调"
            points={[
              '理解对方需求',
              '寻找共赢点',
              '明确责任边界',
              '建立沟通机制',
              '定期同步进度'
            ]}
          />
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Code Review 最佳实践</h2>
        
        <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-lg mb-6">
          <h4 className="font-bold text-gray-900 mb-2">🎯 Code Review 目的</h4>
          <p className="text-gray-700 text-sm">
            Code Review 不仅是发现代码问题，更是<strong>知识分享、团队成长、质量保障</strong>的重要手段。
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">🔍 Review 关注点</h3>
            <div className="space-y-4">
              <ReviewPoint
                category="代码质量"
                points={['可读性和可维护性', '命名规范', '代码复杂度', '重复代码']}
              />
              <ReviewPoint
                category="设计模式"
                points={['设计模式是否合理', 'SOLID 原则', '模块划分', '接口设计']}
              />
              <ReviewPoint
                category="安全性"
                points={['SQL 注入', 'XSS 攻击', '敏感信息泄露', '权限控制']}
              />
              <ReviewPoint
                category="性能"
                points={['算法复杂度', '数据库查询', '缓存使用', '资源释放']}
              />
            </div>
          </div>
          
          <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">💬 Review 反馈技巧</h3>
            <div className="space-y-4">
              <div className="bg-green-50 rounded-lg p-4">
                <h4 className="font-bold text-green-900 mb-2">✅ 好的反馈</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• 对事不对人，聚焦代码本身</li>
                  <li>• 提出建议而非命令</li>
                  <li>• 解释原因，帮助成长</li>
                  <li>• 肯定好的代码实践</li>
                </ul>
              </div>
              <div className="bg-red-50 rounded-lg p-4">
                <h4 className="font-bold text-red-900 mb-2">❌ 不好的反馈</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• "这代码写得太烂了"</li>
                  <li>• "你应该这样做"</li>
                  <li>• 不解释原因直接否定</li>
                  <li>• 只批评不肯定</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-4 mt-8">Code Review 模板</h3>
        
        <CodeBlock
          language="markdown"
          code={`## Code Review 检查清单

### 功能性
- [ ] 代码是否实现了需求功能？
- [ ] 边界条件是否处理正确？
- [ ] 异常情况是否有处理？

### 代码质量
- [ ] 命名是否清晰、有意义？
- [ ] 代码是否易于理解？
- [ ] 是否有重复代码？
- [ ] 注释是否必要且准确？

### 设计
- [ ] 设计模式是否合理？
- [ ] 模块划分是否清晰？
- [ ] 接口设计是否合理？

### 安全性
- [ ] 是否有安全漏洞？
- [ ] 敏感信息是否保护？
- [ ] 权限控制是否完善？

### 性能
- [ ] 是否有性能问题？
- [ ] 数据库查询是否优化？
- [ ] 是否正确使用缓存？

### 测试
- [ ] 单元测试是否覆盖？
- [ ] 测试用例是否有效？
- [ ] 边界条件是否测试？

## Review 反馈模板

### 肯定
👍 这里的错误处理做得很好，考虑到了各种边界情况。

### 建议
💡 建议将这个方法拆分成更小的函数，提高可读性。
   当前函数有50+行，职责较多，可以按功能拆分。

### 问题
❓ 这里的循环嵌套了3层，是否有性能问题？
   如果数据量大，建议考虑优化算法或使用缓存。

### 必须修改
🚨 这里存在 SQL 注入风险，必须使用参数化查询。
   当前代码：String sql = "SELECT * FROM user WHERE id = " + id;
   建议修改：PreparedStatement ps = conn.prepareStatement("SELECT * FROM user WHERE id = ?");`}
        />
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">技术分享机制建设</h2>
        
        <div className="bg-purple-50 border-l-4 border-purple-500 p-6 rounded-lg mb-6">
          <h4 className="font-bold text-gray-900 mb-2">📅 定期分享计划</h4>
          <p className="text-gray-700 text-sm mb-3">
            建立常态化的技术分享机制，促进团队知识流动和能力提升。
          </p>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>• <strong>每周技术分享</strong>：团队成员轮流分享技术主题（30-60分钟）</li>
            <li>• <strong>每月架构评审</strong>：重大架构决策评审和讨论（2小时）</li>
            <li>• <strong>每季度技术复盘</strong>：总结技术债务和改进计划（半天）</li>
          </ul>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">📝 技术分享模板</h3>
            <CodeBlock
              language="markdown"
              code={`# 技术分享：[主题名称]

## 基本信息
- 分享人：XXX
- 日期：YYYY-MM-DD
- 时长：30-60分钟
- 目标听众：XXX

## 背景
- 为什么选择这个主题？
- 解决什么问题？
- 与团队工作的关联？

## 核心内容
### 1. 基础概念
- 技术原理
- 核心概念解释

### 2. 实现方案
- 架构设计
- 关键代码示例

### 3. 最佳实践
- 推荐做法
- 常见陷阱

## 实战案例
- 项目中的应用
- 遇到的问题
- 解决方案

## 总结
- 关键收获
- 学习建议
- 参考资料

## Q&A
- 问题讨论
- 经验交流`}
            />
          </div>
          
          <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">📊 分享效果评估</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700">内容质量</span>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map(i => (
                    <span key={i} className="text-amber-400">★</span>
                  ))}
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700">讲解清晰度</span>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map(i => (
                    <span key={i} className="text-amber-400">★</span>
                  ))}
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700">实用性</span>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map(i => (
                    <span key={i} className="text-amber-400">★</span>
                  ))}
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700">互动性</span>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map(i => (
                    <span key={i} className="text-amber-400">★</span>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="mt-4 bg-gray-50 rounded-lg p-3">
              <h4 className="font-bold text-gray-900 mb-2 text-sm">💡 改进建议收集</h4>
              <ul className="text-xs text-gray-600 space-y-1">
                <li>• 哪些内容需要更详细？</li>
                <li>• 哪些内容可以精简？</li>
                <li>• 还想了解哪些相关主题？</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">技术影响力建设</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-green-50 to-emerald-100 border-2 border-green-200 rounded-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">📈 内部影响力</h3>
            <div className="space-y-4">
              <InfluenceItem
                title="主导技术规范制定"
                description="制定代码规范、架构规范、技术选型标准"
              />
              <InfluenceItem
                title="组织技术分享活动"
                description="定期组织技术分享、黑客马拉松、技术沙龙"
              />
              <InfluenceItem
                title="建立技术知识库"
                description="维护技术文档、最佳实践、踩坑记录"
              />
              <InfluenceItem
                title="培养技术骨干"
                description="指导新人成长，培养团队技术梯队"
              />
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-purple-50 to-indigo-100 border-2 border-purple-200 rounded-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">🌐 外部影响力</h3>
            <div className="space-y-4">
              <InfluenceItem
                title="参与开源项目"
                description="贡献代码、提交 Issue、参与社区讨论"
              />
              <InfluenceItem
                title="撰写技术博客"
                description="分享技术经验、架构思考、最佳实践"
              />
              <InfluenceItem
                title="技术会议演讲"
                description="参加技术大会，分享团队实践经验"
              />
              <InfluenceItem
                title="技术社区贡献"
                description="回答技术问题、参与技术讨论、帮助他人"
              />
            </div>
          </div>
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-4 mt-8">影响力建设路线图</h3>
        
        <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
          <div className="space-y-4">
            <RoadmapPhase
              phase="第一阶段（1-6个月）"
              goals={['建立团队内部技术分享机制', '整理项目技术文档', '开始撰写技术博客']}
            />
            <RoadmapPhase
              phase="第二阶段（6-12个月）"
              goals={['主导1-2个技术规范的制定', '参与开源项目贡献', '在团队内部建立技术品牌']}
            />
            <RoadmapPhase
              phase="第三阶段（12-24个月）"
              goals={['在公司内部建立技术影响力', '参加技术会议演讲', '成为某个技术领域的专家']}
            />
            <RoadmapPhase
              phase="第四阶段（24个月+）"
              goals={['在行业内有知名度', '出版技术书籍或专栏', '成为技术社区的意见领袖']}
            />
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">常见问题</h2>
        
        <div className="space-y-4">
          <FaqCard
            number={1}
            question="如何处理团队内部的技术分歧？"
            answer="处理技术分歧的原则：
              1. 倾听理解：先理解对方的观点和理由
              2. 数据驱动：用数据和事实说话，避免主观判断
              3. 换位思考：理解对方的约束和考量
              4. 寻求共识：找到双方都能接受的方案
              5. 记录决策：使用 ADR 记录决策过程和理由
              6. 尊重结果：一旦做出决策，团队统一执行"
            isOpen={expandedFaq === 1}
            onClick={() => setExpandedFaq(expandedFaq === 1 ? null : 1)}
          />
          
          <FaqCard
            number={2}
            question="如何平衡技术追求和业务需求？"
            answer="平衡原则：
              1. 业务优先：技术服务于业务，不能脱离业务谈技术
              2. 渐进改进：技术债务需要逐步偿还，不能影响业务迭代
              3. ROI 思维：评估技术投入的产出比
              4. 风险控制：技术方案要有风险预案
              5. 沟通透明：让业务方理解技术决策的影响"
            isOpen={expandedFaq === 2}
            onClick={() => setExpandedFaq(expandedFaq === 2 ? null : 2)}
          />
          
          <FaqCard
            number={3}
            question="如何培养团队的技术能力？"
            answer="培养方法：
              1. 技术分享：定期组织技术分享，鼓励团队成员轮流主讲
              2. Code Review：通过 Code Review 传授经验和最佳实践
              3. 项目实践：给团队成员挑战性任务，在实践中成长
              4. 导师制度：为新人指定导师，一对一指导
              5. 学习资源：提供技术书籍、在线课程等学习资源
              6. 技术规划：帮助团队成员制定技术成长规划"
            isOpen={expandedFaq === 3}
            onClick={() => setExpandedFaq(expandedFaq === 3 ? null : 3)}
          />
          
          <FaqCard
            number={4}
            question="如何建立技术权威？"
            answer="建立技术权威的方法：
              1. 技术深度：在某个领域有深入的研究和实践
              2. 解决问题：能够解决团队遇到的技术难题
              3. 持续学习：保持对新技术的敏感和学习
              4. 分享输出：通过分享和输出建立影响力
              5. 以身作则：在代码质量、工作态度上做表率
              6. 尊重他人：尊重团队成员的意见和贡献"
            isOpen={expandedFaq === 4}
            onClick={() => setExpandedFaq(expandedFaq === 4 ? null : 4)}
          />
        </div>
      </section>

      <section className="bg-gradient-to-r from-amber-600 to-orange-700 text-white p-8 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">🎯 掌握了软技能，下一步学习什么?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <NextStepCard title="架构决策记录" description="ADR 编写实践" link="/architecture-decisions" icon="📝" />
          <NextStepCard title="技术选型决策" description="科学选型方法论" link="/tech-selection" icon="🔬" />
          <NextStepCard title="系统设计" description="架构设计方法论" link="/system-design" icon="🏗️" />
          <NextStepCard title="面试准备" description="架构师面试指南" link="/interview-prep" icon="💼" />
        </div>
      </section>
    </div>
  );
};

interface RoleCardProps {
  icon: string;
  title: string;
  description: string;
  skills: { name: string; level: number }[];
}

const RoleCard: React.FC<RoleCardProps> = ({ icon, title, description, skills }) => {
  return (
    <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-sm text-gray-600 mb-4">{description}</p>
      <div className="space-y-2">
        {skills.map((skill, index) => (
          <div key={index}>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-700">{skill.name}</span>
              <span className="text-gray-500">{skill.level}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-amber-500 h-2 rounded-full"
                style={{ width: `${skill.level}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

interface AudienceCardProps {
  icon: string;
  title: string;
  points: string[];
}

const AudienceCard: React.FC<AudienceCardProps> = ({ icon, title, points }) => {
  return (
    <div className="bg-white border-2 border-gray-200 rounded-lg p-5">
      <div className="text-3xl mb-3">{icon}</div>
      <h4 className="font-bold text-gray-900 mb-3">{title}</h4>
      <ul className="text-sm text-gray-700 space-y-2">
        {points.map((point, index) => (
          <li key={index} className="flex items-start">
            <span className="text-amber-500 mr-2">•</span>
            {point}
          </li>
        ))}
      </ul>
    </div>
  );
};

interface ReviewPointProps {
  category: string;
  points: string[];
}

const ReviewPoint: React.FC<ReviewPointProps> = ({ category, points }) => {
  return (
    <div className="bg-gray-50 rounded-lg p-3">
      <h4 className="font-bold text-gray-900 mb-2 text-sm">{category}</h4>
      <ul className="text-xs text-gray-600 space-y-1">
        {points.map((point, index) => (
          <li key={index}>• {point}</li>
        ))}
      </ul>
    </div>
  );
};

interface InfluenceItemProps {
  title: string;
  description: string;
}

const InfluenceItem: React.FC<InfluenceItemProps> = ({ title, description }) => {
  return (
    <div className="flex items-start">
      <span className="text-amber-500 mr-2">✓</span>
      <div>
        <h4 className="font-bold text-gray-900 text-sm">{title}</h4>
        <p className="text-xs text-gray-600">{description}</p>
      </div>
    </div>
  );
};

interface RoadmapPhaseProps {
  phase: string;
  goals: string[];
}

const RoadmapPhase: React.FC<RoadmapPhaseProps> = ({ phase, goals }) => {
  return (
    <div className="flex items-start">
      <span className="flex-shrink-0 w-8 h-8 bg-amber-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-4">
        {phase.split('第')[1]?.charAt(0) || '1'}
      </span>
      <div className="flex-1">
        <h4 className="font-bold text-gray-900 mb-2">{phase}</h4>
        <ul className="text-sm text-gray-600 space-y-1">
          {goals.map((goal, index) => (
            <li key={index}>• {goal}</li>
          ))}
        </ul>
      </div>
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
        <svg
          className={`w-5 h-5 text-gray-500 transition-transform flex-shrink-0 ml-4 ${
            isOpen ? 'rotate-180' : ''
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {isOpen && (
        <div className="px-6 pb-4 text-gray-700 text-sm whitespace-pre-line">
          {answer}
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
