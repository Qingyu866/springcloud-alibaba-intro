import React from 'react';
import { Link } from 'react-router-dom';

export const TechStackPage: React.FC = () => {
  return (
    <div className="prose prose-slate max-w-none">
      <h1 className="text-4xl font-bold text-gray-900 mb-6">
        微服务技术栈全景 🗺️
      </h1>

      <p className="text-xl text-gray-700 mb-8">
        完整的微服务技术栈,从开发到部署,全方位掌握。
      </p>

      {/* 架构全景图 */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">
          架构全景图
        </h2>
        <div className="bg-gray-50 p-6 rounded-lg border-2 border-gray-200">
          <ArchitectureDiagram />
        </div>
      </section>

      {/* 技术栈分层 */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">
          技术栈分层
        </h2>

        {/* 应用层 */}
        <TechLayer
          title="应用层"
          description="业务应用和 API 网关"
          color="blue"
          technologies={[
            { name: 'Spring Cloud Gateway', desc: 'API 网关,路由转发', link: '/gateway' },
            { name: 'Spring WebMVC', desc: 'Web 框架', link: '' },
            { name: 'Spring Security', desc: '安全认证', link: '' },
          ]}
        />

        {/* 业务服务层 */}
        <TechLayer
          title="业务服务层"
          description="微服务业务逻辑"
          color="green"
          technologies={[
            { name: 'Spring Cloud Alibaba', desc: '微服务套件', link: '/nacos-discovery' },
            { name: 'Spring Boot', desc: '应用框架', link: '' },
            { name: 'MyBatis-Plus', desc: 'ORM 框架', link: '' },
          ]}
        />

        {/* 中间件层 */}
        <TechLayer
          title="中间件层"
          description="基础设施和中间件"
          color="purple"
          technologies={[
            { name: 'Nacos', desc: '服务发现、配置中心', link: '/nacos-discovery' },
            { name: 'Sentinel', desc: '流量控制、熔断降级', link: '/sentinel' },
            { name: 'RocketMQ', desc: '消息队列', link: '/rocketmq' },
            { name: 'Redis', desc: '分布式缓存', link: '/redis' },
            { name: 'Seata', desc: '分布式事务', link: '/seata' },
          ]}
        />

        {/* 数据层 */}
        <TechLayer
          title="数据层"
          description="数据存储"
          color="orange"
          technologies={[
            { name: 'MySQL', desc: '关系型数据库', link: '' },
            { name: 'PostgreSQL', desc: '关系型数据库', link: '' },
            { name: 'MongoDB', desc: '文档数据库', link: '' },
            { name: 'Elasticsearch', desc: '搜索引擎', link: '' },
          ]}
        />

        {/* 可观测性 */}
        <TechLayer
          title="可观测性"
          description="监控、链路追踪、日志"
          color="red"
          technologies={[
            { name: 'SkyWalking', desc: '链路追踪', link: '/skywalking' },
            { name: 'Prometheus', desc: '监控指标', link: '/monitoring' },
            { name: 'Grafana', desc: '监控可视化', link: '/monitoring' },
            { name: 'ELK Stack', desc: '日志分析', link: '/logging' },
          ]}
        />

        {/* DevOps 层 */}
        <TechLayer
          title="DevOps 层"
          description="容器化和持续集成"
          color="yellow"
          technologies={[
            { name: 'Docker', desc: '容器化', link: '/docker-deployment' },
            { name: 'Kubernetes', desc: '容器编排', link: '/k8s-deployment' },
            { name: 'GitLab CI', desc: '持续集成', link: '/cicd' },
            { name: 'Jenkins', desc: '持续集成', link: '/cicd' },
          ]}
        />
      </section>

      {/* 核心组件详解 */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">
          核心组件详解
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ComponentCard
            name="Nacos"
            icon="🎯"
            description="服务注册发现与配置中心"
            features={['服务注册与发现', '动态配置管理', '动态 DNS 服务', '服务健康检查']}
            link="/nacos-discovery"
            level="beginner"
          />
          <ComponentCard
            name="Sentinel"
            icon="🛡️"
            description="流量防卫与熔断降级"
            features={['流量控制', '熔断降级', '系统负载保护', '实时监控']}
            link="/sentinel"
            level="intermediate"
          />
          <ComponentCard
            name="Gateway"
            icon="🚪"
            description="API 网关"
            features={['智能路由', '负载均衡', '请求过滤', '限流熔断']}
            link="/gateway"
            level="intermediate"
          />
          <ComponentCard
            name="Seata"
            icon="🔗"
            description="分布式事务"
            features={['AT 模式', 'TCC 模式', 'Saga 模式', 'XA 模式']}
            link="/seata"
            level="architect"
          />
          <ComponentCard
            name="RocketMQ"
            icon="📨"
            description="消息队列"
            features={['异步消息', '顺序消息', '事务消息', '定时消息']}
            link="/rocketmq"
            level="intermediate"
          />
          <ComponentCard
            name="SkyWalking"
            icon="🔍"
            description="链路追踪"
            features={['分布式追踪', '性能分析', '服务拓扑图', '告警功能']}
            link="/skywalking"
            level="intermediate"
          />
        </div>
      </section>

      {/* 技术选型建议 */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">
          技术选型建议
        </h2>

        <div className="space-y-6">
          <SelectionCard
            scenario="小型团队/快速启动"
            recommendations={['Spring Cloud Alibaba 核心组件', 'MySQL', 'Redis', 'Nacos', 'Sentinel']}
            description="适合初创团队,快速搭建微服务体系"
          />
          <SelectionCard
            scenario="中型团队/业务增长"
            recommendations={['完整 Spring Cloud Alibaba', 'RocketMQ', 'SkyWalking', 'Prometheus + Grafana']}
            description="业务增长期,需要更完善的监控和消息系统"
          />
          <SelectionCard
            scenario="大型团队/高并发"
            recommendations={['Kubernetes', 'Service Mesh (可选)', '完整可观测性', '多级缓存']}
            description="大规模系统,需要容器化和完善的可观测性"
          />
        </div>
      </section>

      {/* 学习建议 */}
      <section className="bg-primary-50 border-l-4 border-primary-500 p-6 rounded-lg">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          💡 学习建议
        </h2>
        <div className="space-y-3">
          <p className="text-gray-700">
            <strong>1. 从基础开始:</strong> 先掌握 Spring Boot 和微服务基础概念
          </p>
          <p className="text-gray-700">
            <strong>2. 逐层深入:</strong> 从服务发现开始,逐步学习其他组件
          </p>
          <p className="text-gray-700">
            <strong>3. 动手实践:</strong> 每个组件都要亲自搭建和测试
          </p>
          <p className="text-gray-700">
            <strong>4. 关注架构:</strong> 理解组件在系统中的作用和相互关系
          </p>
          <p className="text-gray-700">
            <strong>5. 生产思维:</strong> 学习监控、日志、部署等生产实践
          </p>
        </div>
        <div className="mt-6">
          <Link
            to="/learning-path"
            className="inline-block bg-primary-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-700 transition-colors"
          >
            查看学习路径 →
          </Link>
        </div>
      </section>
    </div>
  );
};

// 架构图组件
const ArchitectureDiagram: React.FC = () => {
  return (
    <div className="space-y-4">
      {/* 客户端层 */}
      <div className="bg-blue-100 p-4 rounded-lg text-center">
        <div className="font-bold text-gray-900 mb-2">客户端层</div>
        <div className="text-sm text-gray-700">Web / Mobile / 第三方应用</div>
      </div>

      {/* 网关层 */}
      <div className="flex justify-center">
        <div className="w-3/4 bg-green-100 p-4 rounded-lg text-center">
          <div className="font-bold text-gray-900 mb-2">网关层</div>
          <div className="text-sm text-gray-700">Gateway (路由、限流、认证)</div>
        </div>
      </div>

      {/* 服务层 */}
      <div className="flex justify-center gap-4">
        <div className="flex-1 bg-purple-100 p-4 rounded-lg text-center">
          <div className="font-bold text-gray-900 mb-1">用户服务</div>
          <div className="text-xs text-gray-700">User Service</div>
        </div>
        <div className="flex-1 bg-purple-100 p-4 rounded-lg text-center">
          <div className="font-bold text-gray-900 mb-1">订单服务</div>
          <div className="text-xs text-gray-700">Order Service</div>
        </div>
        <div className="flex-1 bg-purple-100 p-4 rounded-lg text-center">
          <div className="font-bold text-gray-900 mb-1">商品服务</div>
          <div className="text-xs text-gray-700">Product Service</div>
        </div>
        <div className="flex-1 bg-purple-100 p-4 rounded-lg text-center">
          <div className="font-bold text-gray-900 mb-1">支付服务</div>
          <div className="text-xs text-gray-700">Payment Service</div>
        </div>
      </div>

      {/* 中间件层 */}
      <div className="flex justify-center gap-4">
        <div className="flex-1 bg-orange-100 p-3 rounded-lg text-center text-sm">
          <div className="font-bold">Nacos</div>
          <div className="text-xs">注册/配置</div>
        </div>
        <div className="flex-1 bg-orange-100 p-3 rounded-lg text-center text-sm">
          <div className="font-bold">Sentinel</div>
          <div className="text-xs">限流熔断</div>
        </div>
        <div className="flex-1 bg-orange-100 p-3 rounded-lg text-center text-sm">
          <div className="font-bold">RocketMQ</div>
          <div className="text-xs">消息队列</div>
        </div>
        <div className="flex-1 bg-orange-100 p-3 rounded-lg text-center text-sm">
          <div className="font-bold">Redis</div>
          <div className="text-xs">缓存</div>
        </div>
        <div className="flex-1 bg-orange-100 p-3 rounded-lg text-center text-sm">
          <div className="font-bold">Seata</div>
          <div className="text-xs">分布式事务</div>
        </div>
      </div>

      {/* 数据层 */}
      <div className="flex justify-center gap-4">
        <div className="flex-1 bg-red-100 p-3 rounded-lg text-center text-sm">
          <div className="font-bold">MySQL</div>
        </div>
        <div className="flex-1 bg-red-100 p-3 rounded-lg text-center text-sm">
          <div className="font-bold">MongoDB</div>
        </div>
        <div className="flex-1 bg-red-100 p-3 rounded-lg text-center text-sm">
          <div className="font-bold">Elasticsearch</div>
        </div>
      </div>

      {/* 可观测性 */}
      <div className="flex justify-center gap-4">
        <div className="flex-1 bg-yellow-100 p-3 rounded-lg text-center text-sm">
          <div className="font-bold">SkyWalking</div>
          <div className="text-xs">链路追踪</div>
        </div>
        <div className="flex-1 bg-yellow-100 p-3 rounded-lg text-center text-sm">
          <div className="font-bold">Prometheus</div>
          <div className="text-xs">监控</div>
        </div>
        <div className="flex-1 bg-yellow-100 p-3 rounded-lg text-center text-sm">
          <div className="font-bold">ELK</div>
          <div className="text-xs">日志</div>
        </div>
      </div>
    </div>
  );
};

// 技术层组件
interface TechLayerProps {
  title: string;
  description: string;
  color: string;
  technologies: Array<{
    name: string;
    desc: string;
    link: string;
  }>;
}

const TechLayer: React.FC<TechLayerProps> = ({ title, description, color, technologies }) => {
  const colorClasses: Record<string, string> = {
    blue: 'bg-blue-50 border-blue-200',
    green: 'bg-green-50 border-green-200',
    purple: 'bg-purple-50 border-purple-200',
    orange: 'bg-orange-50 border-orange-200',
    red: 'bg-red-50 border-red-200',
    yellow: 'bg-yellow-50 border-yellow-200',
  };

  return (
    <div className={`p-6 border-2 rounded-lg mb-4 ${colorClasses[color]}`}>
      <div className="flex items-center mb-4">
        <h3 className="text-2xl font-bold text-gray-900">{title}</h3>
        <span className="ml-3 text-sm text-gray-600">{description}</span>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {technologies.map((tech) => (
          <TechBadge key={tech.name} name={tech.name} desc={tech.desc} link={tech.link} />
        ))}
      </div>
    </div>
  );
};

// 技术标签
interface TechBadgeProps {
  name: string;
  desc: string;
  link: string;
}

const TechBadge: React.FC<TechBadgeProps> = ({ name, desc, link }) => {
  const content = (
    <div className="bg-white px-3 py-2 rounded border hover:shadow-md transition-shadow cursor-pointer">
      <div className="font-semibold text-gray-900 text-sm">{name}</div>
      <div className="text-xs text-gray-500">{desc}</div>
    </div>
  );

  if (link) {
    return <Link to={link}>{content}</Link>;
  }
  return <div>{content}</div>;
};

// 组件卡片
interface ComponentCardProps {
  name: string;
  icon: string;
  description: string;
  features: string[];
  link: string;
  level: 'beginner' | 'intermediate' | 'architect';
}

const ComponentCard: React.FC<ComponentCardProps> = ({ name, icon, description, features, link, level }) => {
  const levelConfig = {
    beginner: { label: '🌱 新手', color: 'bg-green-50 text-green-700 border-green-200' },
    intermediate: { label: '🔧 进阶', color: 'bg-blue-50 text-blue-700 border-blue-200' },
    architect: { label: '🏗️ 架构师', color: 'bg-purple-50 text-purple-700 border-purple-200' },
  };

  return (
    <Link to={link} className="block">
      <div className="p-6 bg-white border-2 rounded-lg hover:border-primary-500 hover:shadow-md transition-all">
        <div className="flex items-start mb-4">
          <span className="text-3xl mr-3">{icon}</span>
          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xl font-bold text-gray-900">{name}</h3>
              <span className={`text-xs px-2 py-1 rounded ${levelConfig[level].color}`}>
                {levelConfig[level].label}
              </span>
            </div>
            <p className="text-gray-700 text-sm mb-4">{description}</p>
            <ul className="space-y-1">
              {features.map((feature, index) => (
                <li key={index} className="text-xs text-gray-600 flex items-center">
                  <span className="text-primary-600 mr-1">•</span>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Link>
  );
};

// 选型建议卡片
interface SelectionCardProps {
  scenario: string;
  recommendations: string[];
  description: string;
}

const SelectionCard: React.FC<SelectionCardProps> = ({ scenario, recommendations, description }) => {
  return (
    <div className="p-5 bg-white border-2 border-gray-200 rounded-lg">
      <h3 className="text-lg font-bold text-gray-900 mb-2">{scenario}</h3>
      <p className="text-sm text-gray-600 mb-3">{description}</p>
      <div className="flex flex-wrap gap-2">
        {recommendations.map((rec, index) => (
          <span
            key={index}
            className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
          >
            {rec}
          </span>
        ))}
      </div>
    </div>
  );
};
