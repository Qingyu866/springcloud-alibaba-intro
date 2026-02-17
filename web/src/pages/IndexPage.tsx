import { CodeBlock } from '../components';
import React from 'react';
import { Link } from 'react-router-dom';

export const IndexPage: React.FC = () => {
  return (
    <>
      <div className="page-tags">
        <span className="page-tag indigo">📚 完整学习指南</span>
        <span className="page-tag purple">🚀 从入门到精通</span>
        <span className="page-tag green">💡 最佳实践</span>
      </div>

      <h1 className="page-title">
        掌握 <span className="text-primary-600">Spring Cloud Alibaba</span><br />微服务开发框架
      </h1>
      <p className="page-description">
        为开发者打造的完整学习路径，从基础概念到高级特性，帮助你快速上手并发挥出 Spring Cloud Alibaba 的全部潜力。
      </p>

      <section className="content-section">
        <div className="section-header">
          <span className="circular-number">1</span>
          <h2>什么是 Spring Cloud Alibaba?</h2>
        </div>
        <p className="section-intro">
          Spring Cloud Alibaba 是阿里巴巴提供的微服务开发一站式解决方案，是 Spring Cloud Alibaba 社区与阿里巴巴中间件团队共同打造的开源项目。
        </p>
        <p className="paragraph">
          本指南旨在帮助开发者从零开始学习 Spring Cloud Alibaba，掌握微服务架构设计和实现，最终成为技术大佬。
        </p>
      </section>

      <section className="content-section">
        <div className="section-header">
          <span className="circular-number">2</span>
          <h2>核心组件</h2>
        </div>
        <div className="cards-grid">
          <ComponentCard
            title="Nacos"
            description="服务注册发现与配置中心，支持动态服务发现、配置管理和服务管理平台"
            path="/nacos-discovery"
            icon="🔧"
          />
          <ComponentCard
            title="Sentinel"
            description="流量防卫与熔断降级，提供流量控制、熔断降级、系统负载保护等功能"
            path="/sentinel"
            icon="🛡️"
          />
          <ComponentCard
            title="Gateway"
            description="API 网关，提供路由转发、请求过滤、限流熔断等核心能力"
            path="/gateway"
            icon="🚪"
          />
          <ComponentCard
            title="Seata"
            description="分布式事务解决方案，提供高性能且易于使用的分布式事务服务"
            path="/seata"
            icon="🔗"
          />
          <ComponentCard
            title="RocketMQ"
            description="消息队列，提供高可靠、高吞吐量的分布式消息服务"
            path="/rocketmq"
            icon="📨"
          />
          <ComponentCard
            title="OpenFeign"
            description="声明式服务调用，简化 HTTP API 调用，支持负载均衡和服务降级"
            path="/feign"
            icon="🌐"
          />
        </div>
      </section>

      <section className="content-section">
        <div className="section-header">
          <span className="circular-number">3</span>
          <h2>学习路径</h2>
        </div>
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
            path="/nacos-discovery"
          />
          <LearningStep
            step="3"
            title="深入理解"
            description="深入理解各组件原理和高级特性"
            path="/nacos-config"
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
            path="/code-standards"
          />
          <LearningStep
            step="6"
            title="面试准备"
            description="高频面试题和架构设计题"
            path="/interview-prep"
          />
        </div>
      </section>

      <section className="content-section">
        <div className="section-header">
          <span className="circular-number">4</span>
          <h2>快速预览</h2>
        </div>
        <p className="section-intro">以下是一个简单的 Spring Cloud Alibaba 服务注册示例:</p>

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

        <div className="text-center">
          <Link to="/getting-started" className="btn btn-primary btn-lg">
            📖 查看完整入门教程
          </Link>
        </div>
      </section>

      <div className="summary-section">
        <h3>开始你的学习之旅</h3>
        <p>本指南提供了 Spring Cloud Alibaba 的完整学习路径：</p>
        <ul className="list-disc pl-5 mb-4">
          <li><strong>核心组件</strong>：Nacos、Sentinel、Gateway、Seata、RocketMQ 等核心组件详解</li>
          <li><strong>学习路径</strong>：从入门到精通的完整学习路线</li>
          <li><strong>实战项目</strong>：电商、秒杀、支付等真实项目案例</li>
        </ul>
        <div className="border-t pt-4 mt-4">
          <p className="text-gray-800 dark:text-gray-200">🎉 准备好开始学习了吗？从「快速开始」开始你的 Spring Cloud Alibaba 之旅！</p>
        </div>
      </div>
    </>
  );
};

interface ComponentCardProps {
  title: string;
  description: string;
  path: string;
  icon: string;
}

const ComponentCard: React.FC<ComponentCardProps> = ({ title, description, path, icon }) => {
  return (
    <Link to={path} className="learning-path-card">
      <div className="learning-path-card-icon">{icon}</div>
      <h3 className="learning-path-card-title">{title}</h3>
      <p className="learning-path-card-description">{description}</p>
    </Link>
  );
};

interface LearningStepProps {
  step: string;
  title: string;
  description: string;
  path: string;
}

const LearningStep: React.FC<LearningStepProps> = ({ step, title, description, path }) => {
  return (
    <Link to={path} className="block">
      <div className="flex items-start gap-4 p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
        <span className="step-marker">{step}</span>
        <div className="flex-1">
          <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">{title}</h4>
          <p className="text-sm text-gray-600 dark:text-gray-400">{description}</p>
        </div>
        <svg className="w-5 h-5 text-gray-400 dark:text-gray-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </Link>
  );
};
