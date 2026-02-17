import { CodeBlock } from '../components';
import { useState } from 'react';

interface StrategyCardProps {
  title: string;
  description: string;
  level: string;
  rto: string;
  rpo: string;
  cost: string;
  color: string;
}

const StrategyCard: React.FC<StrategyCardProps> = ({ title, description, level, rto, rpo, cost, color }) => {
  const colorClasses = {
    red: 'bg-red-50 border-red-200',
    yellow: 'bg-yellow-50 border-yellow-200',
    green: 'bg-green-50 border-green-200',
    blue: 'bg-blue-50 border-blue-200',
  };

  return (
    <div className={`p-5 border-2 rounded-lg ${colorClasses[color as keyof typeof colorClasses]}`}>
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-xl font-bold text-gray-900">{title}</h3>
        <span className="px-2 py-1 bg-white rounded text-xs font-semibold">{level}</span>
      </div>
      <p className="text-sm text-gray-700 mb-3">{description}</p>
      <div className="grid grid-cols-3 gap-2 text-xs">
        <div className="bg-white p-2 rounded">
          <p className="font-bold text-gray-900">RTO</p>
          <p className="text-gray-600">{rto}</p>
        </div>
        <div className="bg-white p-2 rounded">
          <p className="font-bold text-gray-900">RPO</p>
          <p className="text-gray-600">{rpo}</p>
        </div>
        <div className="bg-white p-2 rounded">
          <p className="font-bold text-gray-900">成本</p>
          <p className="text-gray-600">{cost}</p>
        </div>
      </div>
    </div>
  );
};

interface SolutionCardProps {
  title: string;
  problem: string;
  solution: string;
  implementation: string;
}

const SolutionCard: React.FC<SolutionCardProps> = ({ title, problem, solution, implementation }) => {
  return (
    <div className="bg-white border-2 border-slate-200 rounded-lg p-5">
      <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>

      <div className="mb-3">
        <h4 className="font-semibold text-red-600 mb-1">❌ 问题</h4>
        <p className="text-sm text-gray-700">{problem}</p>
      </div>

      <div className="mb-3">
        <h4 className="font-semibold text-green-600 mb-1">✅ 方案</h4>
        <p className="text-sm text-gray-700">{solution}</p>
      </div>

      <div className="bg-blue-50 p-3 rounded">
        <p className="text-sm text-blue-900">
          <span className="font-bold">🔧 实现:</span> {implementation}
        </p>
      </div>
    </div>
  );
};

interface ChecklistCardProps {
  phase: string;
  items: string[];
}

const ChecklistCard: React.FC<ChecklistCardProps> = ({ phase, items }) => {
  return (
    <div className="bg-white border-2 border-slate-200 rounded-lg p-5">
      <h3 className="text-lg font-bold text-gray-900 mb-3">{phase}</h3>
      <ul className="space-y-2">
        {items.map((item, index) => (
          <li key={index} className="flex items-start">
            <input type="checkbox" className="mt-1 mr-2" />
            <span className="text-sm text-gray-700">{item}</span>
          </li>
        ))}
      </ul>
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

export const DisasterRecoveryPage: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="bg-gradient-to-r from-slate-700 to-slate-900 text-white rounded-lg p-6 mb-8">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-4xl font-bold mb-2">容灾与高可用</h1>
            <p className="text-slate-200 text-lg">构建高可用的容灾体系</p>
          </div>
          <div className="flex gap-3 text-sm">
            <span className="px-3 py-1 bg-white/20 rounded-full">🏗️ 架构师</span>
            <span className="px-3 py-1 bg-white/20 rounded-full">⏱️ 约80分钟</span>
            <span className="px-3 py-1 bg-white/20 rounded-full">📚 14个知识点</span>
          </div>
        </div>
      </div>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">什么是容灾与高可用?</h2>

        <div className="bg-white border-2 border-blue-200 rounded-lg p-6 mb-6">
          <p className="text-gray-700 text-lg mb-4">
            <strong>容灾（Disaster Recovery）</strong>是指在遭遇灾难时，系统能够快速恢复业务的能力。
            <strong>高可用（High Availability）</strong>是指系统通过冗余设计，减少停机时间，提供持续服务的能力。
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div className="bg-blue-50 p-4 rounded">
              <h4 className="font-bold text-blue-900 mb-2">🎯 RTO (Recovery Time Objective)</h4>
              <p className="text-sm text-gray-700">恢复时间目标：从灾难发生到业务恢复正常的时间</p>
              <p className="text-xs text-gray-600 mt-1">目标: RTO &lt; 30分钟（关键业务）</p>
            </div>
            <div className="bg-blue-50 p-4 rounded">
              <h4 className="font-bold text-blue-900 mb-2">📊 RPO (Recovery Point Objective)</h4>
              <p className="text-sm text-gray-700">恢复点目标：可接受的数据丢失量</p>
              <p className="text-xs text-gray-600 mt-1">目标: RPO &lt; 5分钟（关键业务）</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-red-50 border-2 border-red-200 rounded-lg p-5">
            <h3 className="text-xl font-bold text-red-900 mb-3">⚠️ 常见灾难场景</h3>
            <ul className="text-gray-700 space-y-2">
              <li>• 数据中心断电、火灾、地震</li>
              <li>• 网络故障（光缆被挖断）</li>
              <li>• 硬件故障（服务器、存储）</li>
              <li>• 软件故障（Bug、配置错误）</li>
              <li>• 人为错误（误删数据）</li>
              <li>• 恶意攻击（DDOS、勒索病毒）</li>
            </ul>
          </div>

          <div className="bg-green-50 border-2 border-green-200 rounded-lg p-5">
            <h3 className="text-xl font-bold text-green-900 mb-3">✅ 高可用价值</h3>
            <ul className="text-gray-700 space-y-2">
              <li>• 保证业务连续性</li>
              <li>• 提升用户体验</li>
              <li>• 减少经济损失</li>
              <li>• 满足 SLA 要求</li>
              <li>• 建立用户信任</li>
              <li>• 合规要求（金融、医疗）</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">高可用架构策略</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <StrategyCard
            title="单机房"
            description="所有服务部署在一个机房"
            level="基础"
            rto="小时级"
            rpo="分钟级"
            cost="低"
            color="red"
          />
          <StrategyCard
            title="双机房"
            description="同城两个机房，数据实时同步"
            level="进阶"
            rto="分钟级"
            rpo="秒级"
            cost="中"
            color="yellow"
          />
          <StrategyCard
            title="两地三中心"
            description="同城双活 + 异地灾备"
            level="高级"
            rto="分钟级"
            rpo="秒级"
            cost="高"
            color="green"
          />
          <StrategyCard
            title="多活架构"
            description="多机房同时提供服务"
            level="专家"
            rto="秒级"
            rpo="0丢失"
            cost="极高"
            color="blue"
          />
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">高可用实战方案</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <SolutionCard
            title="1. 服务高可用"
            problem="单点故障导致服务不可用"
            solution="集群部署 + 负载均衡 + 健康检查"
            implementation="Nginx/Gateway 负载均衡，多实例部署，自动剔除不健康实例"
          />
          <SolutionCard
            title="2. 数据库高可用"
            problem="数据库单点故障，数据丢失"
            solution="主从复制 + 读写分离 + 故障自动切换"
            implementation="MySQL MHA/MGR 或 Sentinel 自动故障转移"
          />
          <SolutionCard
            title="3. 缓存高可用"
            problem="Redis 单点故障，缓存失效"
            solution="Redis 哨兵模式 / 集群模式"
            implementation="Redis Sentinel 高可用，自动故障转移"
          />
          <SolutionCard
            title="4. 消息队列高可用"
            problem="MQ 单点故障，消息丢失"
            solution="MQ 集群 + 消息持久化"
            implementation="RocketMQ 主从同步，Broker 集群部署"
          />
          <SolutionCard
            title="5. 限流熔断"
            problem="流量突增导致系统雪崩"
            solution="Sentinel 限流熔断降级"
            implementation="接口限流 + 熔断保护 + 降级兜底"
          />
          <SolutionCard
            title="6. 异地多活"
            problem="地区级灾难导致全站不可用"
            solution="多机房部署，流量分发"
            implementation="DNS 智能解析，用户就近访问"
          />
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">两地三中心架构</h2>

        <div className="bg-white border-2 border-blue-200 rounded-lg p-6 mb-6">
          <h3 className="text-2xl font-bold text-blue-900 mb-4">架构设计</h3>

          <div className="space-y-4">
            <div className="bg-blue-50 p-4 rounded">
              <h4 className="font-bold text-blue-900 mb-2">同城双活</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• 两个机房在同城（距离 &lt; 50km）</li>
                <li>• 数据库主主复制或分布式数据库</li>
                <li>• 应用服务双机房部署，流量按比例分配</li>
                <li>• 一个机房故障，另一个机房接管全部流量</li>
              </ul>
            </div>

            <div className="bg-green-50 p-4 rounded">
              <h4 className="font-bold text-green-900 mb-2">异地灾备</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• 异地机房（距离 &gt; 500km）</li>
                <li>• 数据异步复制（准实时）</li>
                <li>• 平时不承载流量，灾难时启用</li>
                <li>• 定期演练切换流程</li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-gray-900 mb-2">Nginx 配置示例</h4>
              <CodeBlock
                language="nginx"
                code={`upstream backend {
    # 双机房负载均衡
    server dc1-server1:8080 weight=5;
    server dc1-server2:8080 weight=5;
    server dc2-server1:8080 weight=5;
    server dc2-server2:8080 weight=5;

    # 健康检查
    check interval=3000 rise=2 fall=3 timeout=1000;
}

server {
    listen 80;
    server_name example.com;

    location / {
        proxy_pass http://backend;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;

        # 故障转移
        proxy_next_upstream error timeout invalid_header http_500 http_502 http_503;
        proxy_next_upstream_tries 2;
    }
}`}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">容灾演练流程</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <ChecklistCard
            phase="📋 演练准备"
            items={[
              '制定演练计划和方案',
              '确定演练范围和时间',
              '通知相关人员',
              '准备演练环境',
              '准备回滚方案',
              '准备监控告警'
            ]}
          />
          <ChecklistCard
            phase="🚀 演练执行"
            items={[
              '模拟灾难场景',
              '执行故障切换',
              '验证业务功能',
              '检查数据一致性',
              '监控系统指标',
              '记录演练过程'
            ]}
          />
          <ChecklistCard
            phase="✅ 演练总结"
            items={[
              '分析演练结果',
              '总结问题和改进',
              '更新应急预案',
              '优化系统架构',
              '培训相关人员',
              '定期演练（季度/年度）'
            ]}
          />
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">高可用最佳实践</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-300 rounded-lg p-5">
            <h3 className="text-xl font-bold text-green-900 mb-3">✅ 推荐做法</h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <span className="text-green-600 mr-2 flex-shrink-0">✓</span>
                <span>消除单点故障</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2 flex-shrink-0">✓</span>
                <span>定期进行容灾演练</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2 flex-shrink-0">✓</span>
                <span>建立完善的监控告警</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2 flex-shrink-0">✓</span>
                <span>数据定期备份</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2 flex-shrink-0">✓</span>
                <span>限流熔断降级保护</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2 flex-shrink-0">✓</span>
                <span>制定应急预案</span>
              </li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-red-50 to-red-100 border-2 border-red-300 rounded-lg p-5">
            <h3 className="text-xl font-bold text-red-900 mb-3">❌ 避免做法</h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <span className="text-red-600 mr-2 flex-shrink-0">✗</span>
                <span>单点部署，无冗余</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-600 mr-2 flex-shrink-0">✗</span>
                <span>从不进行容灾演练</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-600 mr-2 flex-shrink-0">✗</span>
                <span>监控不完善，故障发现慢</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-600 mr-2 flex-shrink-0">✗</span>
                <span>数据无备份</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-600 mr-2 flex-shrink-0">✗</span>
                <span>无限流保护，易雪崩</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-600 mr-2 flex-shrink-0">✗</span>
                <span>无应急预案</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">常见问题</h2>

        <div className="space-y-4">
          <FaqCard
            number={1}
            question="两地三中心和多活有什么区别?"
            answer={"【两地三中心】\n- 同城双活 + 异地灾备\n- 异地机房平时不承载流量\n- 灾难时手动切换到异地\n- 成本适中，适合大部分企业\n\n【多活】\n- 多个机房同时提供服务\n- 用户就近访问（DNS 智能解析）\n- 一个机房故障，自动切换流量\n- 成本高，适合大型互联网公司\n\n【选型建议】\n- 中小型企业：两地三中心\n- 大型互联网：异地多活\n- 金融行业：两地三中心 + 异地多活"}
            isOpen={openFaq === 1}
            onClick={() => toggleFaq(1)}
          />
          <FaqCard
            number={2}
            question="如何实现数据零丢失?"
            answer={"【数据零丢失方案】\n\n1. 数据库同步复制\n   - MySQL 半同步复制\n   - 分布式数据库（TiDB、OceanBase）\n   - 强一致性写入\n\n2. 消息队列事务消息\n   - RocketMQ 事务消息\n   - 本地消息表 + 定时任务\n\n3. 分布式事务\n   - TCC 模式\n   - Seata AT 模式\n\n4. 实时备份\n   - Binlog 实时同步\n   - CDC 变更数据捕获\n\n【代价】\n- 性能下降 20-30%\n- 成本增加 2-3倍\n- 架构复杂度高\n\n【建议】\n金融级别：零丢失\n一般业务：RPO &lt; 5分钟可接受"}
            isOpen={openFaq === 2}
            onClick={() => toggleFaq(2)}
          />
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">下一步学习</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <a href="/config-advanced" className="block bg-gradient-to-br from-purple-50 to-purple-100 border-2 border-purple-200 rounded-lg p-6 hover:shadow-lg transition">
            <h3 className="text-xl font-bold text-purple-900 mb-2">⚙️ 配置管理高级</h3>
            <p className="text-gray-700 text-sm">微服务配置管理进阶</p>
          </a>
          <a href="/k8s-deployment" className="block bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-200 rounded-lg p-6 hover:shadow-lg transition">
            <h3 className="text-xl font-bold text-blue-900 mb-2">☸️ Kubernetes 部署</h3>
            <p className="text-gray-700 text-sm">K8s 生产环境部署实战</p>
          </a>
        </div>
      </section>
    </div>
  );
};
