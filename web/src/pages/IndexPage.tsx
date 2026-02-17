import { CodeBlock } from '../components';
import React from 'react';
import { Link } from 'react-router-dom';

export const IndexPage: React.FC = () => {
  return (
    <div className="prose prose-slate max-w-none">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary-500 to-primary-700 text-white rounded-lg p-8 mb-8">
        <h1 className="text-4xl font-bold mb-4">
          Spring Cloud Alibaba 完整指南
        </h1>
        <p className="text-xl mb-6">
          从入门到精通的 Spring Cloud Alibaba 学习路径
        </p>
        <div className="flex gap-4">
          <Link
            to="/getting-started"
            className="bg-white text-primary-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors"
          >
            快速开始 →
          </Link>
          <Link
            to="/core-concepts"
            className="bg-primary-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-800 transition-colors"
          >
            核心概念
          </Link>
        </div>
      </div>

      {/* 简介 */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">什么是 Spring Cloud Alibaba?</h2>
        <p className="text-lg text-gray-700 mb-4">
          Spring Cloud Alibaba 是阿里巴巴提供的微服务开发一站式解决方案,
          是 Spring Cloud Alibaba 社区与阿里巴巴中间件团队共同打造的开源项目。
        </p>
        <p className="text-lg text-gray-700">
          本指南旨在帮助开发者从零开始学习 Spring Cloud Alibaba,
          掌握微服务架构设计和实现,最终成为技术大佬。
        </p>
      </section>

      {/* 核心组件 */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">核心组件</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ComponentCard
            title="Nacos"
            description="服务注册发现与配置中心"
            path="/nacos"
            color="blue"
          />
          <ComponentCard
            title="Sentinel"
            description="流量防卫与熔断降级"
            path="/sentinel"
            color="red"
          />
          <ComponentCard
            title="Gateway"
            description="API 网关"
            path="/gateway"
            color="green"
          />
          <ComponentCard
            title="Seata"
            description="分布式事务"
            path="/seata"
            color="purple"
          />
          <ComponentCard
            title="RocketMQ"
            description="消息队列"
            path="/rocketmq"
            color="orange"
          />
          <ComponentCard
            title="OpenFeign"
            description="声明式服务调用"
            path="/feign"
            color="indigo"
          />
        </div>
      </section>

      {/* 学习路径 */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">学习路径</h2>
        <div className="space-y-4">
          <LearningStep
            step="1"
            title="快速开始"
            description="环境准备、核心概念、微服务架构基础"
            path="/getting-started"
          />
          <LearningStep
            step="2"
            title="核心组件"
            description="学习 Nacos、Sentinel、Gateway 等核心组件"
            path="/nacos"
          />
          <LearningStep
            step="3"
            title="深入理解"
            description="深入理解各组件原理和高级特性"
            path="/nacos-deep-dive"
          />
          <LearningStep
            step="4"
            title="实战项目"
            description="通过电商系统等项目实战练习"
            path="/project-ecommerce"
          />
          <LearningStep
            step="5"
            title="最佳实践"
            description="性能优化、监控、安全、部署"
            path="/best-practices"
          />
          <LearningStep
            step="6"
            title="面试准备"
            description="高频面试题和架构设计题"
            path="/interview-prep"
          />
        </div>
      </section>

      {/* 代码示例 */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">快速示例</h2>
        <p className="text-lg text-gray-700 mb-4">
          以下是一个简单的 Spring Cloud Alibaba 服务注册示例:
        </p>

        <CodeBlock
          language="java"
          filename="Application.java"
          code={`@SpringBootApplication
@EnableDiscoveryClient
public class ProviderApplication {

    public static void main(String[] args) {
        SpringApplication.run(ProviderApplication.class, args);
    }

    @RestController
    public class EchoController {

        @GetMapping("/echo/{string}")
        public String echo(@PathVariable String string) {
            return "Hello Nacos: " + string;
        }
    }
}`}
        />

        <CodeBlock
          language="yaml"
          filename="application.yml"
          code={`server:
  port: 8080

spring:
  application:
    name: service-provider
  cloud:
    nacos:
      discovery:
        server-addr: localhost:8848`}
        />
      </section>

      {/* 开始学习 */}
      <section className="bg-primary-50 border-l-4 border-primary-500 p-6 rounded-lg">
        <h3 className="text-2xl font-bold text-gray-900 mb-3">
          准备好开始学习了吗?
        </h3>
        <p className="text-lg text-gray-700 mb-4">
          从快速开始指南开始您的 Spring Cloud Alibaba 之旅!
        </p>
        <Link
          to="/getting-started"
          className="inline-block bg-primary-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-700 transition-colors"
        >
          开始学习 →
        </Link>
      </section>
    </div>
  );
};

// 组件卡片
interface ComponentCardProps {
  title: string;
  description: string;
  path: string;
  color: string;
}

const ComponentCard: React.FC<ComponentCardProps> = ({ title, description, path, color }) => {
  const colorClasses = {
    blue: 'bg-blue-50 border-blue-200 hover:bg-blue-100',
    red: 'bg-red-50 border-red-200 hover:bg-red-100',
    green: 'bg-green-50 border-green-200 hover:bg-green-100',
    purple: 'bg-purple-50 border-purple-200 hover:bg-purple-100',
    orange: 'bg-orange-50 border-orange-200 hover:bg-orange-100',
    indigo: 'bg-indigo-50 border-indigo-200 hover:bg-indigo-100',
  };

  return (
    <Link
      to={path}
      className={`block p-6 rounded-lg border-2 ${colorClasses[color as keyof typeof colorClasses]} transition-colors`}
    >
      <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-700">{description}</p>
    </Link>
  );
};

// 学习步骤
interface LearningStepProps {
  step: string;
  title: string;
  description: string;
  path: string;
}

const LearningStep: React.FC<LearningStepProps> = ({ step, title, description, path }) => {
  return (
    <Link to={path} className="block">
      <div className="flex items-start space-x-4 p-4 rounded-lg hover:bg-gray-50 transition-colors">
        <div className="flex-shrink-0 w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold text-xl">
          {step}
        </div>
        <div className="flex-1">
          <h4 className="text-xl font-bold text-gray-900 mb-1">{title}</h4>
          <p className="text-gray-700">{description}</p>
        </div>
        <div className="flex-shrink-0">
          <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </Link>
  );
};
