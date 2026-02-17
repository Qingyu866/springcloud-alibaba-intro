import React from 'react';

interface K8sDeploymentCardProps {
  projectType: 'ecommerce' | 'flash-sale' | 'payment' | 'user-center' | 'comprehensive';
  className?: string;
}

const deploymentInfo = {
  ecommerce: {
    title: '电商微服务系统 K8s 部署',
    difficulty: '⭐⭐ 新手友好',
    features: ['4个业务服务', '标准微服务架构', 'HPA自动扩缩容', '完整监控告警'],
    path: 'deployment-examples/ecommerce',
  },
  'flash-sale': {
    title: '秒杀系统 K8s 部署',
    difficulty: '⭐⭐⭐⭐ 高并发优化',
    features: ['10,000+ QPS', 'Redis Lua原子扣减', 'RocketMQ异步处理', '快速扩容15秒'],
    path: 'deployment-examples/flash-sale',
  },
  payment: {
    title: '支付系统 K8s 部署',
    difficulty: '⭐⭐⭐ 分布式事务',
    features: ['Seata分布式事务', '幂等性保证', '自动对账', '支付回调'],
    path: 'deployment-examples/payment',
  },
  'user-center': {
    title: '用户中心系统 K8s 部署',
    difficulty: '⭐⭐⭐⭐ 安全认证',
    features: ['SSO单点登录', '多租户隔离', 'RBAC权限', 'OAuth2集成'],
    path: 'deployment-examples/user-center',
  },
  comprehensive: {
    title: '综合项目 K8s 部署',
    difficulty: '⭐⭐⭐⭐⭐ 架构师级',
    features: ['15+业务服务', '完整微服务生态', '全链路监控', 'ELK日志聚合'],
    path: 'deployment-examples/comprehensive',
  },
};

export const K8sDeploymentCard: React.FC<K8sDeploymentCardProps> = ({ projectType, className = '' }) => {
  const info = deploymentInfo[projectType];

  return (
    <div className={`mt-12 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900 rounded-xl p-8 border border-blue-200 dark:border-gray-700 ${className}`}>
      <div className="flex items-start justify-between mb-6">
        <div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            🚀 生产级 K8s 部署方案
          </h3>
          <p className="text-gray-600 dark:text-gray-300">
            {info.title}
          </p>
        </div>
        <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm font-medium">
          {info.difficulty}
        </span>
      </div>

      <div className="mb-6">
        <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">核心特性:</h4>
        <div className="grid grid-cols-2 gap-3">
          {info.features.map((feature, index) => (
            <div key={index} className="flex items-center space-x-2">
              <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-sm text-gray-600 dark:text-gray-400">{feature}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 mb-6">
        <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">包含内容:</h4>
        <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
          <li>✓ 完整的 Kubernetes 配置文件 (YAML)</li>
          <li>✓ 一键部署脚本 (deploy.sh)</li>
          <li>✓ GitLab CI/CD 流水线</li>
          <li>✓ Prometheus + Grafana 监控</li>
          <li>✓ 详细部署文档和检查清单</li>
        </ul>
      </div>

      <div className="flex flex-wrap gap-3">
        <a
          href={`https://github.com/yourusername/springcloud-alibaba-intro/tree/main/${info.path}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
        >
          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
          </svg>
          查看部署方案
        </a>
        <a
          href={`https://github.com/yourusername/springcloud-alibaba-intro/tree/main/${info.path}/README.md`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center px-4 py-2 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 rounded-lg font-medium transition-colors border border-gray-300 dark:border-gray-600"
        >
          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
          </svg>
          部署文档
        </a>
      </div>

      <div className="mt-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
        <div className="flex items-start space-x-3">
          <svg className="w-5 h-5 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          <div className="text-sm text-yellow-800 dark:text-yellow-200">
            <p className="font-medium mb-1">学习提示</p>
            <p>建议先理解本页面的架构设计，再参考部署方案进行实践。部署前请务必阅读 README.md 中的检查清单。</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default K8sDeploymentCard;
