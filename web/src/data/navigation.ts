export interface NavItem {
  label: string;
  path: string;
  pageId: string;
  level?: 'beginner' | 'intermediate' | 'architect'; // 🌱 新手友好 / 🔧 需要基础 / 🏗️ 架构师向
}

export interface NavGroup {
  title: string;
  description?: string;
  items: NavItem[];
}

/**
 * Spring Cloud Alibaba 完整指南 - 三层洋葱模型导航结构
 *
 * 学习路径:
 * - 路径A (新人): 快速入门 → 核心组件 → 实战项目 → 最佳实践 → 面试准备
 * - 路径B (架构师速通): 快速入门 → 架构师进阶 → 生产实践 → 实战项目
 */
export const navigationData: NavGroup[] = [
  {
    title: '🌱 快速入门',
    description: '30分钟跑通第一个微服务,零基础友好',
    items: [
      { label: '项目概述', path: '/', pageId: 'index', level: 'beginner' },
      { label: '学习路线图', path: '/learning-path', pageId: 'learning-path', level: 'beginner' },
      { label: '30分钟快速上手', path: '/quickstart', pageId: 'quickstart', level: 'beginner' },
      { label: '微服务技术栈全景', path: '/tech-stack', pageId: 'tech-stack', level: 'beginner' },
    ],
  },
  {
    title: '📦 核心组件',
    description: 'Spring Cloud Alibaba 核心组件详解',
    items: [
      { label: 'Nacos 服务发现', path: '/nacos-discovery', pageId: 'nacos-discovery', level: 'beginner' },
      { label: 'Nacos 配置中心', path: '/nacos-config', pageId: 'nacos-config', level: 'intermediate' },
      { label: 'Sentinel 流量控制', path: '/sentinel', pageId: 'sentinel', level: 'intermediate' },
      { label: 'Gateway 网关', path: '/gateway', pageId: 'gateway', level: 'intermediate' },
      { label: 'OpenFeign 服务调用', path: '/feign', pageId: 'feign', level: 'beginner' },
      { label: 'LoadBalancer 负载均衡', path: '/loadbalancer', pageId: 'loadbalancer', level: 'intermediate' },
      { label: 'Seata 分布式事务', path: '/seata', pageId: 'seata', level: 'intermediate' },
      { label: 'RocketMQ 消息队列', path: '/rocketmq', pageId: 'rocketmq', level: 'intermediate' },
      { label: 'Redis 分布式缓存', path: '/redis', pageId: 'redis', level: 'beginner' },
      { label: 'SkyWalking 链路追踪', path: '/skywalking', pageId: 'skywalking', level: 'intermediate' },
    ],
  },
  {
    title: '🏗️ 架构师进阶',
    description: '培养架构思维,深入系统设计',
    items: [
      { label: '微服务拆分原则', path: '/service-decomposition', pageId: 'service-decomposition', level: 'architect' },
      { label: '服务治理策略', path: '/service-governance', pageId: 'service-governance', level: 'architect' },
      { label: '分布式事务选型', path: '/transaction-selection', pageId: 'transaction-selection', level: 'architect' },
      { label: '配置管理高级', path: '/config-advanced', pageId: 'config-advanced', level: 'architect' },
      { label: '可观测性体系', path: '/observability', pageId: 'observability', level: 'architect' },
      { label: '性能调优实战', path: '/performance-tuning', pageId: 'performance-tuning', level: 'architect' },
      { label: '安全架构设计', path: '/security-design', pageId: 'security-design', level: 'architect' },
      { label: '容灾与高可用', path: '/disaster-recovery', pageId: 'disaster-recovery', level: 'architect' },
    ],
  },
  {
    title: '🚀 实战项目',
    description: '从0到1构建完整微服务系统',
    items: [
      { label: '电商微服务系统', path: '/project-ecommerce', pageId: 'project-ecommerce', level: 'intermediate' },
      { label: '秒杀系统设计', path: '/project-flash-sale', pageId: 'project-flash-sale', level: 'architect' },
      { label: '订单系统实战', path: '/project-order', pageId: 'project-order', level: 'intermediate' },
      { label: '支付系统设计', path: '/project-payment', pageId: 'project-payment', level: 'architect' },
      { label: '用户中心设计', path: '/project-user-center', pageId: 'project-user-center', level: 'intermediate' },
      { label: '综合项目实战', path: '/project-comprehensive', pageId: 'project-comprehensive', level: 'architect' },
    ],
  },
  {
    title: '⚙️ 生产实践',
    description: '生产环境部署与运维',
    items: [
      { label: 'Docker 部署', path: '/docker-deployment', pageId: 'docker-deployment', level: 'intermediate' },
      { label: 'Kubernetes 部署', path: '/k8s-deployment', pageId: 'k8s-deployment', level: 'architect' },
      { label: 'CI/CD 流水线', path: '/cicd', pageId: 'cicd', level: 'intermediate' },
      { label: '监控告警体系', path: '/monitoring', pageId: 'monitoring', level: 'architect' },
      { label: '日志聚合分析', path: '/logging', pageId: 'logging', level: 'intermediate' },
      { label: '故障排查手册', path: '/troubleshooting', pageId: 'troubleshooting', level: 'intermediate' },
    ],
  },
  {
    title: '📚 面试准备',
    description: '高频面试题与架构设计',
    items: [
      { label: '面试准备指南', path: '/interview-prep', pageId: 'interview-prep', level: 'beginner' },
      { label: '高频面试题100+', path: '/interview-questions', pageId: 'interview-questions', level: 'intermediate' },
      { label: '架构设计题', path: '/design-questions', pageId: 'design-questions', level: 'architect' },
      { label: '系统设计思路', path: '/system-design', pageId: 'system-design', level: 'architect' },
    ],
  },
  {
    title: '🔧 最佳实践',
    description: '代码规范与开发经验',
    items: [
      { label: '代码规范', path: '/code-standards', pageId: 'code-standards', level: 'beginner' },
      { label: '配置管理', path: '/config-management', pageId: 'config-management', level: 'intermediate' },
      { label: '异常处理', path: '/exception-handling', pageId: 'exception-handling', level: 'intermediate' },
      { label: '测试策略', path: '/testing-strategy', pageId: 'testing-strategy', level: 'intermediate' },
      { label: '文档规范', path: '/doc-standards', pageId: 'doc-standards', level: 'beginner' },
    ],
  },
  {
    title: '❓ 常见问题',
    description: '新手问题、进阶问题、生产问题',
    items: [
      { label: '新手常见问题', path: '/faq-beginner', pageId: 'faq-beginner', level: 'beginner' },
      { label: '进阶常见问题', path: '/faq-advanced', pageId: 'faq-advanced', level: 'intermediate' },
      { label: '生产环境问题', path: '/faq-production', pageId: 'faq-production', level: 'architect' },
    ],
  },
];

/**
 * 学习路径推荐
 */
export const learningPaths = {
  beginner: {
    name: '新人学习路径',
    description: '适合没有微服务经验的开发者',
    path: [
      '/quickstart',                    // 1. 快速上手
      '/nacos-discovery',              // 2. 服务发现
      '/feign',                        // 3. 服务调用
      '/redis',                        // 4. 缓存
      '/sentinel',                     // 5. 流量控制
      '/project-ecommerce',            // 6. 实战项目
      '/code-standards',               // 7. 代码规范
      '/interview-questions',          // 8. 面试准备
    ],
  },
  architect: {
    name: '架构师速通路径',
    description: '适合有经验,想快速提升架构能力的开发者',
    path: [
      '/quickstart',                   // 1. 快速了解
      '/service-decomposition',        // 2. 服务拆分
      '/transaction-selection',        // 3. 事务选型
      '/observability',                // 4. 可观测性
      '/performance-tuning',           // 5. 性能调优
      '/security-design',              // 6. 安全设计
      '/k8s-deployment',               // 7. K8s部署
      '/design-questions',             // 8. 设计题
    ],
  },
};

export const footerLinks = {
  learning: [
    { label: '快速入门', path: '/quickstart' },
    { label: '核心组件', path: '/nacos-discovery' },
    { label: '架构师进阶', path: '/service-decomposition' },
    { label: '实战项目', path: '/project-ecommerce' },
    { label: '生产实践', path: '/docker-deployment' },
    { label: '面试准备', path: '/interview-questions' },
    { label: '最佳实践', path: '/code-standards' },
  ],
  official: [
    { label: '官方文档', href: 'https://sca.aliyun.com', external: true },
    { label: 'GitHub 仓库', href: 'https://github.com/alibaba/spring-cloud-alibaba', external: true },
    { label: '示例代码', href: 'https://github.com/alibaba/spring-cloud-alibaba/tree/master/spring-cloud-alibaba-examples', external: true },
  ],
  community: [
    { label: '钉钉交流群', href: 'https://h.qrurl.cn/C6y2IOGz', external: true },
    { label: 'Gitee 镜像', href: 'https://gitee.com/dromara/spring-cloud-alibaba', external: true },
    { label: 'Stack Overflow', href: 'https://stackoverflow.com/questions/tagged/spring-cloud-alibaba', external: true },
  ],
};
