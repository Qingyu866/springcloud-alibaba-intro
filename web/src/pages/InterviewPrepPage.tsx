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

export const InterviewPrepPage: React.FC = () => {
  const [openSection, setOpenSection] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-indigo-800 text-white rounded-lg p-6 mb-8">
        <h1 className="text-4xl font-bold mb-2">Spring Cloud Alibaba 面试准备</h1>
        <p className="text-indigo-100">系统化备战微服务架构师面试</p>
        <div className="flex gap-3 text-sm mt-4">
          <span className="px-3 py-1 bg-white/20 rounded-full">📚 面试准备</span>
          <span className="px-3 py-1 bg-white/20 rounded-full">⏱️ 约60分钟</span>
          <span className="px-3 py-1 bg-white/20 rounded-full">🎯 5大准备维度</span>
        </div>
      </div>

      {/* Why Interview Prep */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">为什么系统化准备？</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-r-lg">
            <h3 className="text-xl font-bold text-green-800 mb-3">✅ 提升成功率</h3>
            <ul className="text-gray-700 space-y-2">
              <li>• 知识体系化梳理</li>
              <li>• 重点难点提前攻克</li>
              <li>• 项目经验深度挖掘</li>
              <li>• 模拟面试查漏补缺</li>
            </ul>
          </div>
          <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-lg">
            <h3 className="text-xl font-bold text-red-800 mb-3">❌ 常见误区</h3>
            <ul className="text-gray-700 space-y-2">
              <li>• 只背答案不理解原理</li>
              <li>• 项目经验一问就倒</li>
              <li>• 缺乏系统设计能力</li>
              <li>• 简历与能力不匹配</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Tech Stack Review */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">核心技术栈梳理</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              category: '注册中心',
              technologies: ['Nacos 服务发现', '健康检查机制', 'CP/AP 架构选择', '集群部署'],
              icon: '🔍'
            },
            {
              category: '配置中心',
              technologies: ['Nacos Config', '动态配置刷新', '灰度发布', '配置回滚'],
              icon: '⚙️'
            },
            {
              category: '服务调用',
              technologies: ['OpenFeign', 'LoadBalancer', '服务熔断降级', '超时重试'],
              icon: '🔗'
            },
            {
              category: '服务网关',
              technologies: ['Gateway 路由', '过滤器链', '限流策略', '统一认证'],
              icon: '🚪'
            },
            {
              category: '分布式事务',
              technologies: ['Seata AT模式', 'Saga模式', 'TCC模式', '最终一致性'],
              icon: '🔄'
            },
            {
              category: '消息驱动',
              technologies: ['RocketMQ', '消息顺序', '消息可靠性', '死信队列'],
              icon: '📨'
            },
          ].map((tech, index) => (
            <div key={index} className="bg-white border border-gray-200 rounded-lg p-5 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">{tech.icon}</span>
                <h3 className="text-lg font-bold text-gray-900">{tech.category}</h3>
              </div>
              <ul className="text-gray-600 text-sm space-y-1">
                {tech.technologies.map((item, i) => (
                  <li key={i}>• {item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Interview Topics */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">高频面试专题</h2>

        {/* Microservices Basics */}
        <div className="mb-6">
          <button
            onClick={() => setOpenSection(openSection === 'basics' ? null : 'basics')}
            className="w-full bg-white border-2 border-blue-300 rounded-lg p-5 flex items-center justify-between hover:bg-blue-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">📖</span>
              <div className="text-left">
                <h3 className="text-lg font-bold text-gray-900">微服务基础</h3>
                <p className="text-gray-600 text-sm">核心概念与原理</p>
              </div>
            </div>
            <span className="text-gray-400">&rbrace;</span>
          </button>
          {openSection === 'basics' && (
            <div className="mt-4 bg-white border border-gray-200 rounded-lg p-6">
              <div className="space-y-4">
                <div>
                  <h4 className="font-bold text-gray-900 mb-2">1. 什么是微服务？</h4>
                  <p className="text-gray-700 text-sm">微服务架构是一种将单一应用程序开发为一套小型服务的方法，每个服务运行在自己的进程中，并使用轻量级机制（通常是HTTP API）进行通信。</p>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-2">2. 微服务优缺点？</h4>
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div className="bg-green-50 p-3 rounded">
                      <p className="font-bold text-green-800 mb-2">优点：</p>
                      <ul className="text-gray-700 space-y-1">
                        <li>• 易于开发和维护</li>
                        <li>• 技术栈灵活</li>
                        <li>• 部署独立</li>
                        <li>• 扩展性强</li>
                      </ul>
                    </div>
                    <div className="bg-red-50 p-3 rounded">
                      <p className="font-bold text-red-800 mb-2">缺点：</p>
                      <ul className="text-gray-700 space-y-1">
                        <li>• 运维复杂度高</li>
                        <li>• 分布式事务难处理</li>
                        <li>• 服务间通信成本</li>
                        <li>• 调试困难</li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-2">3. CAP 定理与 BASE 理论？</h4>
                  <div className="text-gray-700 text-sm">
                    <p className="mb-2"><strong>CAP 定理：</strong>分布式系统不可能同时满足一致性（C）、可用性（A）、分区容错性（P）。通常只能满足其中两个。</p>
                    <p><strong>BASE 理论：</strong>基本可用（Basically Available）、软状态（Soft state）、最终一致性（Eventually consistent）。是对 CAP 中 AP 方案的延伸。</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Nacos Deep Dive */}
        <div className="mb-6">
          <button
            onClick={() => setOpenSection(openSection === 'nacos' ? null : 'nacos')}
            className="w-full bg-white border-2 border-green-300 rounded-lg p-5 flex items-center justify-between hover:bg-green-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">🔍</span>
              <div className="text-left">
                <h3 className="text-lg font-bold text-gray-900">Nacos 深度</h3>
                <p className="text-gray-600 text-sm">注册中心与配置中心</p>
              </div>
            </div>
            <span className="text-gray-400">&rbrace;</span>
          </button>
          {openSection === 'nacos' && (
            <div className="mt-4 bg-white border border-gray-200 rounded-lg p-6">
              <div className="space-y-3 text-sm">
                <div>
                  <h4 className="font-bold text-gray-900 mb-2">1. Nacos 服务注册流程？</h4>
                  <CodeBlock
                    language="text"
                    code={`1. 服务启动时向 Nacos 发送注册请求
2. Nacos 将服务信息存储到内存（双Map结构）
3. Nacos 定时检查服务健康状态（心跳）
4. 服务下线时主动调用注销接口
5. Nacos 异步推送变更给订阅者（UDP推送）`}
                  />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-2">2. Nacos AP 和 CP 模式区别？</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-blue-50 p-3 rounded">
                      <p className="font-bold text-blue-800 mb-2">AP 模式（可用性优先）</p>
                      <ul className="text-gray-700 space-y-1">
                        <li>• 使用 Distro 协议</li>
                        <li>• 允许数据不一致</li>
                        <li>• 适合临时实例</li>
                        <li>• 性能更好</li>
                      </ul>
                    </div>
                    <div className="bg-purple-50 p-3 rounded">
                      <p className="font-bold text-purple-800 mb-2">CP 模式（一致性优先）</p>
                      <ul className="text-gray-700 space-y-1">
                        <li>• 使用 Raft 协议</li>
                        <li>• 强一致性保证</li>
                        <li>• 适合持久化实例</li>
                        <li>• 牺牲部分可用性</li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-2">3. Nacos 配置动态刷新原理？</h4>
                  <CodeBlock
                    language="java"
                    code={`@RefreshScope  // 关键注解
@RestController
public class ConfigController {
    @Value("$\{app.config\}")
    private String config;

    // 配置变更时，Nacos 会推送变更
    // @RefreshScope 会重建 Bean
    // @Value 会重新注入新值
    @GetMapping("/config")
    public String getConfig() {
        return config;
    }
}`}
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Sentinel */}
        <div className="mb-6">
          <button
            onClick={() => setOpenSection(openSection === 'sentinel' ? null : 'sentinel')}
            className="w-full bg-white border-2 border-yellow-300 rounded-lg p-5 flex items-center justify-between hover:bg-yellow-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">🛡️</span>
              <div className="text-left">
                <h3 className="text-lg font-bold text-gray-900">Sentinel 限流降级</h3>
                <p className="text-gray-600 text-sm">流量控制与熔断降级</p>
              </div>
            </div>
            <span className="text-gray-400">&rbrace;</span>
          </button>
          {openSection === 'sentinel' && (
            <div className="mt-4 bg-white border border-gray-200 rounded-lg p-6">
              <div className="space-y-3 text-sm">
                <div>
                  <h4 className="font-bold text-gray-900 mb-2">1. 限流算法对比？</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-blue-50 p-3 rounded">
                      <p className="font-bold text-blue-800 mb-2">滑动窗口</p>
                      <ul className="text-gray-700 space-y-1">
                        <li>• 时间片滑动</li>
                        <li>• 精确统计</li>
                        <li>• 内存占用适中</li>
                      </ul>
                    </div>
                    <div className="bg-green-50 p-3 rounded">
                      <p className="font-bold text-green-800 mb-2">漏桶算法</p>
                      <ul className="text-gray-700 space-y-1">
                        <li>• 匀速流出</li>
                        <li>• 削峰填谷</li>
                        <li>• 延迟较高</li>
                      </ul>
                    </div>
                    <div className="bg-orange-50 p-3 rounded">
                      <p className="font-bold text-orange-800 mb-2">令牌桶</p>
                      <ul className="text-gray-700 space-y-1">
                        <li>• 允许突发流量</li>
                        <li>• 应用广泛</li>
                        <li>• 参数易调整</li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-2">2. Sentinel 熔断降级策略？</h4>
                  <CodeBlock
                    language="java"
                    code={`@SentinelResource(
    value = "getUserInfo",
    blockHandler = "handleBlock",      // 限流/降级处理
    fallback = "handleFallback"        // 异常处理
)
public User getUserInfo(Long id) {
    return userService.getById(id);
}

// 降级处理
public User handleBlock(Long id, BlockException e) {
    // 返回默认值或缓存数据
    return User.getDefault();
}

// 异常处理
public User handleFallback(Long id, Throwable e) {
    // 记录日志，返回降级数据
    log.error("获取用户失败", e);
    return User.getFallback();
}`}
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Distributed Transaction */}
        <div className="mb-6">
          <button
            onClick={() => setOpenSection(openSection === 'transaction' ? null : 'transaction')}
            className="w-full bg-white border-2 border-red-300 rounded-lg p-5 flex items-center justify-between hover:bg-red-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">🔄</span>
              <div className="text-left">
                <h3 className="text-lg font-bold text-gray-900">分布式事务</h3>
                <p className="text-gray-600 text-sm">Seata 原理与实战</p>
              </div>
            </div>
            <span className="text-gray-400">&rbrace;</span>
          </button>
          {openSection === 'transaction' && (
            <div className="mt-4 bg-white border border-gray-200 rounded-lg p-6">
              <div className="space-y-3 text-sm">
                <div>
                  <h4 className="font-bold text-gray-900 mb-2">1. Seata AT 模式原理？</h4>
                  <div className="text-gray-700 space-y-2">
                    <p><strong>一阶段：</strong>业务SQL执行 + 解析SQL语义 + 查询前镜像（before image）+ 执行业务SQL + 查询后镜像（after image）+ 提交行锁 + 生成undo log</p>
                    <p><strong>二阶段回滚：</strong>通过undo log反向生成SQL并执行，释放锁</p>
                    <p><strong>二阶段提交：</strong>异步删除undo log，释放锁</p>
                  </div>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-2">2. Saga 模式适用场景？</h4>
                  <div className="bg-gray-50 p-3 rounded">
                    <ul className="text-gray-700 space-y-1">
                      <li>• 长事务场景（业务流程长）</li>
                      <li>• 跨系统调用（无法使用XA）</li>
                      <li>• 性能要求高（不需要锁资源）</li>
                      <li>• 业务可补偿（每个操作都有回滚）</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Project Experience Prep */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">项目经验准备</h2>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">STAR 法则介绍</h3>
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="space-y-4">
              <div className="bg-blue-50 p-4 rounded">
                <h4 className="font-bold text-blue-800 mb-2">S - Situation（情境）</h4>
                <p className="text-gray-700 text-sm">描述项目背景、团队规模、你的角色</p>
              </div>
              <div className="bg-green-50 p-4 rounded">
                <h4 className="font-bold text-green-800 mb-2">T - Task（任务）</h4>
                <p className="text-gray-700 text-sm">具体负责的模块，面临的挑战</p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="bg-yellow-50 p-4 rounded">
                <h4 className="font-bold text-yellow-800 mb-2">A - Action（行动）</h4>
                <p className="text-gray-700 text-sm">采取的技术方案、具体实施过程</p>
              </div>
              <div className="bg-purple-50 p-4 rounded">
                <h4 className="font-bold text-purple-800 mb-2">R - Result（结果）</h4>
                <p className="text-gray-700 text-sm">项目成果、数据指标、个人收获</p>
              </div>
            </div>
          </div>

          <h3 className="text-xl font-bold text-gray-900 mb-4">常见项目问题</h3>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { q: "项目技术栈是什么？为什么这样选型？", a: "Nacos注册中心 + Gateway网关 + Feign调用 + Seata事务 + RocketMQ消息" },
              { q: "你负责的模块？遇到的最大挑战？", a: "订单模块，分布式事务一致性、高并发库存扣减" },
              { q: "如何保证数据一致性？", a: "Seata AT模式 + 本地消息表 + 定时对账 + 幂等设计" },
              { q: "系统QPS是多少？如何优化？", a: "峰值5000 QPS，Redis缓存 + 异步MQ + 读写分离 + 分库分表" },
            ].map((item, index) => (
              <div key={index} className="bg-gray-50 p-4 rounded">
                <p className="font-bold text-gray-900 mb-2">{item.q}</p>
                <p className="text-gray-700 text-sm">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Algorithm Prep */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">算法与基础知识</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              title: '数据结构',
              items: ['数组与链表', '栈与队列', '二叉树', '哈希表', '堆与优先队列'],
              icon: '🏗️'
            },
            {
              title: '常见算法',
              items: ['双指针', '滑动窗口', '二分查找', 'DFS/BFS', '动态规划'],
              icon: '🧮'
            },
            {
              title: 'Java基础',
              items: ['HashMap源码', '线程池参数', 'JVM内存模型', 'GC算法', '锁机制'],
              icon: '☕'
            },
          ].map((topic, index) => (
            <div key={index} className="bg-white border border-gray-200 rounded-lg p-5">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">{topic.icon}</span>
                <h3 className="text-lg font-bold text-gray-900">{topic.title}</h3>
              </div>
              <ul className="text-gray-600 text-sm space-y-1">
                {topic.items.map((item, i) => (
                  <li key={i}>• {item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Mock Interview */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">模拟面试流程</h2>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="space-y-4">
            {[
              { stage: '自我介绍', duration: '2-3分钟', key: '个人背景、技术栈、项目经验、求职意向' },
              { stage: '项目深挖', duration: '10-15分钟', key: 'STAR法则、技术难点、团队协作、成长收获' },
              { stage: '基础考察', duration: '5-10分钟', key: 'Java基础、并发编程、JVM调优' },
              { stage: '架构设计', duration: '15-20分钟', key: '系统设计、方案对比、画图讲解' },
              { stage: '算法题', duration: '10-15分钟', key: 'LeetCode medium、思路讲解、复杂度分析' },
              { stage: '反问环节', duration: '3-5分钟', key: '团队情况、技术挑战、培养体系' },
            ].map((item, index) => (
              <div key={index} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-bold text-gray-900">{item.stage}</h4>
                    <span className="text-sm text-gray-500">{item.duration}</span>
                  </div>
                  <p className="text-gray-700 text-sm">{item.key}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">常见问题</h2>

        <div className="bg-white border-2 border-gray-200 rounded-lg overflow-hidden">
          <button
            onClick={() => setOpenFaq(openFaq === 1 ? null : 1)}
            className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
          >
            <h3 className="text-lg font-bold text-gray-900">1. 如何准备项目经验？</h3>
            <span className="text-2xl text-gray-400">&lbrace;openFaq === 1 ? '−' : '+'&rbrace;</span>
          </button>
          {openFaq === 1 && (
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
              <div className="text-gray-700 whitespace-pre-line">项目经验准备要点：

1. 梳理项目架构
   - 画出系统架构图
   - 明确各模块职责
   - 标注技术选型理由

2. 提炼技术亮点
   - 难点问题解决方案
   - 性能优化手段
   - 可靠性保障措施

3. 准备数据指标
   - QPS、响应时间
   - 用户规模、数据量
   - 优化前后对比

4. 模拟问答
   - 为什么用微服务？
   - 最大技术挑战？
   - 如果重来怎么改进？</div>
            </div>
          )}
        </div>

        <div className="bg-white border-2 border-gray-200 rounded-lg overflow-hidden mt-4">
          <button
            onClick={() => setOpenFaq(openFaq === 2 ? null : 2)}
            className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
          >
            <h3 className="text-lg font-bold text-gray-900">2. 系统设计题如何入手？</h3>
            <span className="text-2xl text-gray-400">&lbrace;openFaq === 2 ? '−' : '+'&rbrace;</span>
          </button>
          {openFaq === 2 && (
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
              <div className="text-gray-700 whitespace-pre-line">系统设计答题思路：

1. 明确需求（5分钟）
   - 功能性需求
   - 非功能性需求（QPS、延迟、一致性）
   - 约束条件

2. 容量估算（5分钟）
   - 读写QPS评估
   - 存储容量估算
   - 带宽需求计算

3. 架构设计（15分钟）
   - 整体架构图
   - 核心组件设计
   - 数据模型设计

4. 深入讨论（10分钟）
   - 瓶颈分析
   - 优化方案
   - 扩展性讨论

5. 总结（5分钟）
   - 回顾要点
   - 主动提及trade-off</div>
            </div>
          )}
        </div>

        <div className="bg-white border-2 border-gray-200 rounded-lg overflow-hidden mt-4">
          <button
            onClick={() => setOpenFaq(openFaq === 3 ? null : 3)}
            className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
          >
            <h3 className="text-lg font-bold text-gray-900">3. 算法题不会做怎么办？</h3>
            <span className="text-2xl text-gray-400">&lbrace;openFaq === 3 ? '−' : '+'&rbrace;</span>
          </button>
          {openFaq === 3 && (
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
              <div className="text-gray-700 whitespace-pre-line">应对策略：

1. 说出思路
   - 暴力解法
   - 优化思路
   - 复杂度分析

2. 主动沟通
   - 询问提示
   - 讨论边界情况
   - 表达思考过程

3. 学习曲线
   - LeetCode 刷题（200+）
   - 按题型分类
   - 限时模拟训练

4. 备选方案
   - 先做简单题
   - 争取部分分数
   - 态度决定下限</div>
            </div>
          )}
        </div>
      </section>

      {/* Next Steps */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">下一步学习</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <a href="/interview-questions" className="block bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 rounded-lg p-6 transition-colors">
            <h3 className="text-xl font-bold text-indigo-900 mb-2">面试题库</h3>
            <p className="text-indigo-700">高频面试真题</p>
          </a>
          <a href="/design-questions" className="block bg-green-50 hover:bg-green-100 border border-green-200 rounded-lg p-6 transition-colors">
            <h3 className="text-xl font-bold text-green-900 mb-2">设计题</h3>
            <p className="text-green-700">系统设计专题</p>
          </a>
          <a href="/system-design" className="block bg-purple-50 hover:bg-purple-100 border border-purple-200 rounded-lg p-6 transition-colors">
            <h3 className="text-xl font-bold text-purple-900 mb-2">系统设计</h3>
            <p className="text-purple-700">大型系统架构</p>
          </a>
        </div>
      </section>
    </div>
  );
};
