import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components';
import { IndexPage } from './pages/IndexPage';
import { GettingStartedPage } from './pages/GettingStartedPage';
import { LearningPathPage } from './pages/LearningPathPage';
import { TechStackPage } from './pages/TechStackPage';
import { NacosDiscoveryPage } from './pages/NacosDiscoveryPage';
import { NacosConfigPage } from './pages/NacosConfigPage';
import { SentinelPage } from './pages/SentinelPage';
import { GatewayPage } from './pages/GatewayPage';
import { OpenFeignPage } from './pages/OpenFeignPage';
import { LoadBalancerPage } from './pages/LoadBalancerPage';
import { SeataPage } from './pages/SeataPage';
import { RocketMQPage } from './pages/RocketMQPage';
import { RedisPage } from './pages/RedisPage';
import { SkyWalkingPage } from './pages/SkyWalkingPage';
import { ServiceDecompositionPage } from './pages/ServiceDecompositionPage';
import { ServiceGovernancePage } from './pages/ServiceGovernancePage';
import { TransactionSelectionPage } from './pages/TransactionSelectionPage';
import { ObservabilityPage } from './pages/ObservabilityPage';
import { PerformanceTuningPage } from './pages/PerformanceTuningPage';
import { SecurityDesignPage } from './pages/SecurityDesignPage';
import { DisasterRecoveryPage } from './pages/DisasterRecoveryPage';
import { ConfigAdvancedPage } from './pages/ConfigAdvancedPage';
import { DockerDeploymentPage } from './pages/DockerDeploymentPage';
import { K8sDeploymentPage } from './pages/K8sDeploymentPage';
import { ServiceMeshPage } from './pages/ServiceMeshPage';
import { CicdPage } from './pages/CicdPage';
import { MonitoringPage } from './pages/MonitoringPage';
import { LoggingPage } from './pages/LoggingPage';
import { TroubleshootingPage } from './pages/TroubleshootingPage';
import { ProjectEcommercePage } from './pages/ProjectEcommercePage';
import { ProjectFlashSalePage } from './pages/ProjectFlashSalePage';
import { ProjectOrderPage } from './pages/ProjectOrderPage';
import { ProjectPaymentPage } from './pages/ProjectPaymentPage';
import { ProjectUserCenterPage } from './pages/ProjectUserCenterPage';
import { ProjectComprehensivePage } from './pages/ProjectComprehensivePage';
import { InterviewPrepPage } from './pages/InterviewPrepPage';
import { InterviewQuestionsPage } from './pages/InterviewQuestionsPage';
import { DesignQuestionsPage } from './pages/DesignQuestionsPage';
import { SystemDesignPage } from './pages/SystemDesignPage';
import { CodeStandardsPage } from './pages/CodeStandardsPage';
import { ApiDesignPage } from './pages/ApiDesignPage';
import { ConfigManagementPage } from './pages/ConfigManagementPage';
import { ExceptionHandlingPage } from './pages/ExceptionHandlingPage';
import { TestingStrategyPage } from './pages/TestingStrategyPage';
import { DocStandardsPage } from './pages/DocStandardsPage';
import { FaqBeginnerPage } from './pages/FaqBeginnerPage';
import { FaqAdvancedPage } from './pages/FaqAdvancedPage';
import { FaqProductionPage } from './pages/FaqProductionPage';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<IndexPage />} />
          <Route path="/learning-path" element={<LearningPathPage />} />
          <Route path="/tech-stack" element={<TechStackPage />} />
          <Route path="/quickstart" element={<GettingStartedPage />} />
          <Route path="/getting-started" element={<GettingStartedPage />} />

          {/* 核心组件 */}
          <Route path="/nacos-discovery" element={<NacosDiscoveryPage />} />
          <Route path="/nacos-config" element={<NacosConfigPage />} />
          <Route path="/sentinel" element={<SentinelPage />} />
          <Route path="/gateway" element={<GatewayPage />} />
          <Route path="/feign" element={<OpenFeignPage />} />
          <Route path="/loadbalancer" element={<LoadBalancerPage />} />
          <Route path="/seata" element={<SeataPage />} />
          <Route path="/rocketmq" element={<RocketMQPage />} />
          <Route path="/skywalking" element={<SkyWalkingPage />} />
          <Route path="/redis" element={<RedisPage />} />

          {/* 架构师进阶 */}
          <Route path="/service-decomposition" element={<ServiceDecompositionPage />} />
          <Route path="/service-governance" element={<ServiceGovernancePage />} />
          <Route path="/transaction-selection" element={<TransactionSelectionPage />} />
          <Route path="/observability" element={<ObservabilityPage />} />
          <Route path="/performance-tuning" element={<PerformanceTuningPage />} />
          <Route path="/security-design" element={<SecurityDesignPage />} />
          <Route path="/disaster-recovery" element={<DisasterRecoveryPage />} />
          <Route path="/config-advanced" element={<ConfigAdvancedPage />} />

          {/* 生产实践 */}
          <Route path="/docker-deployment" element={<DockerDeploymentPage />} />
          <Route path="/k8s-deployment" element={<K8sDeploymentPage />} />
          <Route path="/service-mesh" element={<ServiceMeshPage />} />
          <Route path="/cicd" element={<CicdPage />} />
          <Route path="/monitoring" element={<MonitoringPage />} />
          <Route path="/logging" element={<LoggingPage />} />
          <Route path="/troubleshooting" element={<TroubleshootingPage />} />

          {/* 实战项目 */}
          <Route path="/project-ecommerce" element={<ProjectEcommercePage />} />
          <Route path="/project-flash-sale" element={<ProjectFlashSalePage />} />
          <Route path="/project-order" element={<ProjectOrderPage />} />
          <Route path="/project-payment" element={<ProjectPaymentPage />} />
          <Route path="/project-user-center" element={<ProjectUserCenterPage />} />
          <Route path="/project-comprehensive" element={<ProjectComprehensivePage />} />

          {/* 面试准备 */}
          <Route path="/interview-prep" element={<InterviewPrepPage />} />
          <Route path="/interview-questions" element={<InterviewQuestionsPage />} />
          <Route path="/design-questions" element={<DesignQuestionsPage />} />
          <Route path="/system-design" element={<SystemDesignPage />} />

          {/* 最佳实践 */}
          <Route path="/code-standards" element={<CodeStandardsPage />} />
          <Route path="/api-design" element={<ApiDesignPage />} />
          <Route path="/config-management" element={<ConfigManagementPage />} />
          <Route path="/exception-handling" element={<ExceptionHandlingPage />} />
          <Route path="/testing-strategy" element={<TestingStrategyPage />} />
          <Route path="/doc-standards" element={<DocStandardsPage />} />

          {/* 常见问题 */}
          <Route path="/faq-beginner" element={<FaqBeginnerPage />} />
          <Route path="/faq-advanced" element={<FaqAdvancedPage />} />
          <Route path="/faq-production" element={<FaqProductionPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
