import React from 'react';
import { Link } from 'react-router-dom';
import { learningPaths } from '../data/navigation';

export const LearningPathPage: React.FC = () => {
  return (
    <div className="prose prose-slate max-w-none">
      <h1 className="text-4xl font-bold text-gray-900 mb-6">
        学习路线图 🗺️
      </h1>

      <p className="text-xl text-gray-700 mb-8">
        本指南提供两条学习路径,根据您的经验和目标选择合适的路线。
      </p>

      {/* 路径选择提示 */}
      <div className="bg-primary-50 border-l-4 border-primary-500 p-6 rounded-lg mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          选择您的学习路径
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <PathChoiceCard
            icon="🌱"
            title="新人学习路径"
            description="适合没有微服务经验的开发者"
            features={[
              '循序渐进,从零开始',
              '注重基础知识和实践',
              '8个核心步骤',
              '预计2-3个月完成',
            ]}
            color="green"
          />
          <PathChoiceCard
            icon="🏗️"
            title="架构师速通路径"
            description="适合有经验,想快速提升架构能力的开发者"
            features={[
              '聚焦架构设计和系统思维',
              '深入原理和最佳实践',
              '8个高级主题',
              '预计1-2个月完成',
            ]}
            color="purple"
          />
        </div>
      </div>

      {/* 新人学习路径 */}
      <section className="mb-16">
        <div className="flex items-center mb-8">
          <span className="text-4xl mr-3">🌱</span>
          <div>
            <h2 className="text-3xl font-bold text-gray-900">新人学习路径</h2>
            <p className="text-gray-600">从零基础到微服务开发者</p>
          </div>
        </div>

        <div className="space-y-4">
          {learningPaths.beginner.path.map((path, index) => {
            const stepInfo = beginnerSteps[index];
            return (
              <LearningStepCard
                key={path}
                stepNumber={index + 1}
                title={stepInfo.title}
                description={stepInfo.description}
                path={path}
                duration={stepInfo.duration}
                level={stepInfo.level}
                topics={stepInfo.topics}
              />
            );
          })}
        </div>

        <div className="mt-8 p-6 bg-green-50 border border-green-200 rounded-lg">
          <h3 className="text-xl font-bold text-gray-900 mb-3">
            🎯 完成后将掌握:
          </h3>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <li className="flex items-start">
              <span className="text-green-600 mr-2">✓</span>
              <span>微服务基础概念和架构</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-600 mr-2">✓</span>
              <span>Spring Cloud Alibaba核心组件</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-600 mr-2">✓</span>
              <span>服务注册、调用、限流、缓存</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-600 mr-2">✓</span>
              <span>电商微服务项目实战经验</span>
            </li>
          </ul>
        </div>
      </section>

      {/* 架构师速通路径 */}
      <section className="mb-16">
        <div className="flex items-center mb-8">
          <span className="text-4xl mr-3">🏗️</span>
          <div>
            <h2 className="text-3xl font-bold text-gray-900">架构师速通路径</h2>
            <p className="text-gray-600">快速提升架构设计能力</p>
          </div>
        </div>

        <div className="space-y-4">
          {learningPaths.architect.path.map((path, index) => {
            const stepInfo = architectSteps[index];
            return (
              <LearningStepCard
                key={path}
                stepNumber={index + 1}
                title={stepInfo.title}
                description={stepInfo.description}
                path={path}
                duration={stepInfo.duration}
                level={stepInfo.level}
                topics={stepInfo.topics}
              />
            );
          })}
        </div>

        <div className="mt-8 p-6 bg-purple-50 border border-purple-200 rounded-lg">
          <h3 className="text-xl font-bold text-gray-900 mb-3">
            🎯 完成后将掌握:
          </h3>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <li className="flex items-start">
              <span className="text-purple-600 mr-2">✓</span>
              <span>微服务拆分和领域驱动设计</span>
            </li>
            <li className="flex items-start">
              <span className="text-purple-600 mr-2">✓</span>
              <span>分布式事务选型和设计</span>
            </li>
            <li className="flex items-start">
              <span className="text-purple-600 mr-2">✓</span>
              <span>可观测性体系设计</span>
            </li>
            <li className="flex items-start">
              <span className="text-purple-600 mr-2">✓</span>
              <span>Kubernetes生产部署</span>
            </li>
            <li className="flex items-start">
              <span className="text-purple-600 mr-2">✓</span>
              <span>性能调优和系统设计</span>
            </li>
            <li className="flex items-start">
              <span className="text-purple-600 mr-2">✓</span>
              <span>安全架构和容灾设计</span>
            </li>
          </ul>
        </div>
      </section>

      {/* 架构师能力模型 */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">
          🏗️ 架构师能力模型
        </h2>
        <p className="text-lg text-gray-700 mb-6">
          本指南将帮助您从初级开发者成长为高级架构师,以下是各阶段应具备的核心能力:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <CapabilityCard
            level="初级架构师"
            icon="🌱"
            color="green"
            description="能够独立设计和实现微服务模块"
            capabilities={[
              '掌握 Spring Cloud Alibaba 核心组件使用',
              '能够设计简单的微服务架构',
              '具备基础性能调优能力',
              '能够处理常见生产问题',
              '理解分布式系统基本概念'
            ]}
          />
          <CapabilityCard
            level="中级架构师"
            icon="🔧"
            color="blue"
            description="能够主导中型系统的架构设计"
            capabilities={[
              '精通分布式系统设计模式',
              '能够进行服务拆分和领域建模',
              '具备完整的可观测性设计能力',
              '能够处理复杂的生产故障',
              '掌握高并发、高可用设计'
            ]}
          />
          <CapabilityCard
            level="高级架构师"
            icon="🏗️"
            color="purple"
            description="能够规划企业级技术架构"
            capabilities={[
              '具备全局架构规划能力',
              '能够设计高可用、高并发系统',
              '具备技术选型和团队指导能力',
              '能够推动技术创新和最佳实践',
              '具备跨团队协作和沟通能力'
            ]}
          />
        </div>
      </section>

      {/* 前置知识 */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">
          📚 前置知识检查
        </h2>
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-xl font-bold text-gray-900 mb-4">开始学习前,您应该具备:</h3>
          <ul className="space-y-2">
            <li className="flex items-start">
              <span className="text-green-600 mr-2">✓</span>
              <span>
                <strong>Java 基础</strong>: 熟悉 Java 语法、集合、多线程
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-green-600 mr-2">✓</span>
              <span>
                <strong>Spring Boot</strong>: 了解依赖注入、自动配置、Spring MVC
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-green-600 mr-2">✓</span>
              <span>
                <strong>Maven/Gradle</strong>: 会使用构建工具
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-yellow-600 mr-2">!</span>
              <span>
                <strong>微服务基础(可选)</strong>: 了解什么是微服务更好,但不是必需的
              </span>
            </li>
          </ul>

          <div className="mt-6 p-4 bg-yellow-50 border-l-4 border-yellow-500">
            <p className="text-gray-700">
              <strong>💡 提示:</strong> 如果您还不熟悉 Spring Boot,
              建议先花1-2周时间学习 Spring Boot 基础。
              可以参考{' '}
              <a href="https://spring.io/guides" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                Spring 官方指南
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* 学习建议 */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">
          💡 学习建议
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <TipCard
            icon="🎯"
            title="循序渐进"
            description="按顺序学习,不要跳跃。每个知识点都建立在前面的基础上。"
          />
          <TipCard
            icon="💻"
            title="动手实践"
            description="跟着文档敲代码,运行每个示例。只有动手才能真正理解。"
          />
          <TipCard
            icon="🤔"
            title="思考原理"
            description="不仅要知道怎么用,还要理解为什么这样设计。"
          />
          <TipCard
            icon="📝"
            title="做好笔记"
            description="记录学习过程中的心得和遇到的问题,形成自己的知识体系。"
          />
        </div>
      </section>

      {/* 开始学习 */}
      <section className="bg-gradient-to-r from-primary-500 to-primary-700 text-white p-8 rounded-lg">
        <h2 className="text-3xl font-bold mb-4">
          准备好开始学习了吗?
        </h2>
        <p className="text-xl mb-6">
          从快速开始页面开始您的 Spring Cloud Alibaba 之旅!
        </p>
        <div className="flex gap-4">
          <Link
            to="/quickstart"
            className="inline-block bg-white text-primary-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors"
          >
            开始学习 (新人路径) →
          </Link>
          <Link
            to="/service-decomposition"
            className="inline-block bg-primary-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-800 transition-colors border-2 border-white"
          >
            架构师速通 →
          </Link>
        </div>
      </section>
    </div>
  );
};

// 路径选择卡片
interface PathChoiceCardProps {
  icon: string;
  title: string;
  description: string;
  features: string[];
  color: 'green' | 'purple';
}

const PathChoiceCard: React.FC<PathChoiceCardProps> = ({
  icon,
  title,
  description,
  features,
  color,
}) => {
  const colorClasses = {
    green: 'bg-green-50 border-green-200 hover:border-green-400',
    purple: 'bg-purple-50 border-purple-200 hover:border-purple-400',
  };

  return (
    <div className={`p-4 border-2 rounded-lg ${colorClasses[color]} transition-colors`}>
      <div className="flex items-center mb-2">
        <span className="text-3xl mr-2">{icon}</span>
        <h3 className="text-lg font-bold text-gray-900">{title}</h3>
      </div>
      <p className="text-gray-700 text-sm mb-3">{description}</p>
      <ul className="space-y-1">
        {features.map((feature, index) => (
          <li key={index} className="text-xs text-gray-600">
            • {feature}
          </li>
        ))}
      </ul>
    </div>
  );
};

// 学习步骤卡片
interface LearningStepCardProps {
  stepNumber: number;
  title: string;
  description: string;
  path: string;
  duration: string;
  level: string;
  topics: string[] | number;
}

const LearningStepCard: React.FC<LearningStepCardProps> = ({
  stepNumber,
  title,
  description,
  path,
  duration,
  level,
  topics,
}) => {
  return (
    <Link to={path} className="block">
      <div className="p-6 bg-white border-2 border-gray-200 rounded-lg hover:border-primary-500 hover:shadow-md transition-all">
        <div className="flex items-start">
          <div className="flex-shrink-0 w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold text-xl mr-4">
            {stepNumber}
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xl font-bold text-gray-900">{title}</h3>
              <span className="text-sm text-gray-500">{duration}</span>
            </div>
            <p className="text-gray-700 mb-3">{description}</p>
            <div className="flex items-center justify-between">
              <span className="text-xs px-2 py-1 bg-blue-50 text-blue-700 rounded">
                {level}
              </span>
              <span className="text-sm text-gray-500">
                {Array.isArray(topics) ? topics.length : topics} 个知识点
              </span>
            </div>
          </div>
          <div className="flex-shrink-0 ml-4">
            <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  );
};

// 提示卡片
interface TipCardProps {
  icon: string;
  title: string;
  description: string;
}

const TipCard: React.FC<TipCardProps> = ({ icon, title, description }) => {
  return (
    <div className="p-4 bg-white border border-gray-200 rounded-lg">
      <div className="flex items-start">
        <span className="text-2xl mr-3">{icon}</span>
        <div>
          <h4 className="font-bold text-gray-900 mb-1">{title}</h4>
          <p className="text-sm text-gray-600">{description}</p>
        </div>
      </div>
    </div>
  );
};

// 能力卡片
interface CapabilityCardProps {
  level: string;
  icon: string;
  color: 'green' | 'blue' | 'purple';
  description: string;
  capabilities: string[];
}

const CapabilityCard: React.FC<CapabilityCardProps> = ({
  level,
  icon,
  color,
  description,
  capabilities,
}) => {
  const colorClasses = {
    green: 'bg-green-50 border-green-300',
    blue: 'bg-blue-50 border-blue-300',
    purple: 'bg-purple-50 border-purple-300',
  };

  const iconBgClasses = {
    green: 'bg-green-100',
    blue: 'bg-blue-100',
    purple: 'bg-purple-100',
  };

  return (
    <div className={`p-6 border-2 rounded-lg ${colorClasses[color]}`}>
      <div className="flex items-center mb-3">
        <span className={`text-3xl mr-3 p-2 rounded-lg ${iconBgClasses[color]}`}>{icon}</span>
        <h3 className="text-xl font-bold text-gray-900">{level}</h3>
      </div>
      <p className="text-gray-700 text-sm mb-4">{description}</p>
      <ul className="space-y-2">
        {capabilities.map((capability, index) => (
          <li key={index} className="flex items-start text-sm text-gray-700">
            <span className="text-primary mr-2 flex-shrink-0">✓</span>
            <span>{capability}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

// 新人路径步骤详情
const beginnerSteps = [
  {
    title: '30分钟快速上手',
    description: '快速了解 Spring Cloud Alibaba,跑通第一个微服务 Demo',
    duration: '30分钟',
    level: '🌱 新手',
    topics: 5,
  },
  {
    title: 'Nacos 服务发现',
    description: '学习服务注册与发现的核心概念和使用',
    duration: '2-3天',
    level: '🌱 新手',
    topics: 8,
  },
  {
    title: 'OpenFeign 服务调用',
    description: '掌握声明式 HTTP 客户端,实现服务间通信',
    duration: '1-2天',
    level: '🌱 新手',
    topics: 6,
  },
  {
    title: 'Redis 分布式缓存',
    description: '学习缓存使用场景和最佳实践',
    duration: '2-3天',
    level: '🌱 新手',
    topics: 7,
  },
  {
    title: 'Sentinel 流量控制',
    description: '掌握限流、熔断、降级等流量防护手段',
    duration: '3-4天',
    level: '🔧 进阶',
    topics: 10,
  },
  {
    title: '电商微服务项目',
    description: '通过完整的电商系统实战,综合运用所学知识',
    duration: '1-2周',
    level: '🔧 进阶',
    topics: 15,
  },
  {
    title: '代码规范',
    description: '学习微服务项目的代码规范和最佳实践',
    duration: '1天',
    level: '🌱 新手',
    topics: 5,
  },
  {
    title: '核心面试题精选',
    description: '巩固知识,准备面试',
    duration: '持续',
    level: '🔧 进阶',
    topics: 25,
  },
];

// 架构师路径步骤详情
const architectSteps = [
  {
    title: '30分钟快速了解',
    description: '快速浏览 Spring Cloud Alibaba 核心组件',
    duration: '30分钟',
    level: '🌱 新手',
    topics: 5,
  },
  {
    title: '微服务拆分原则',
    description: '学习领域驱动设计,掌握服务拆分的方法和反模式',
    duration: '3-5天',
    level: '🏗️ 架构师',
    topics: 12,
  },
  {
    title: '分布式事务选型',
    description: '深入理解 Saga、TCC、2PC 等事务模式',
    duration: '3-5天',
    level: '🏗️ 架构师',
    topics: 10,
  },
  {
    title: '可观测性体系',
    description: '设计 Metrics、Tracing、Logging 三位一体的监控体系',
    duration: '3-4天',
    level: '🏗️ 架构师',
    topics: 8,
  },
  {
    title: '性能调优实战',
    description: 'JVM、数据库、缓存全方位性能优化',
    duration: '3-5天',
    level: '🏗️ 架构师',
    topics: 11,
  },
  {
    title: '安全架构设计',
    description: 'OAuth2、JWT、零信任等安全架构设计',
    duration: '2-3天',
    level: '🏗️ 架构师',
    topics: 7,
  },
  {
    title: 'Kubernetes 部署',
    description: '生产级 K8s 部署和服务治理',
    duration: '3-4天',
    level: '🏗️ 架构师',
    topics: 9,
  },
  {
    title: '架构设计题',
    description: '通过真实架构设计案例,提升系统设计能力',
    duration: '持续',
    level: '🏗️ 架构师',
    topics: 20,
  },
];
