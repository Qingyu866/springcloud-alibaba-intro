import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components';
import { ThemeProvider } from './hooks/useTheme';

const PageLoader = () => (
  <div className="flex items-center justify-center min-h-[400px]">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4" />
      <p className="text-gray-500 dark:text-gray-400">加载中...</p>
    </div>
  </div>
);

const IndexPage = lazy(() => import('./pages/IndexPage').then(m => ({ default: m.IndexPage })));
const GettingStartedPage = lazy(() => import('./pages/GettingStartedPage').then(m => ({ default: m.GettingStartedPage })));
const LearningPathPage = lazy(() => import('./pages/LearningPathPage').then(m => ({ default: m.LearningPathPage })));
const TechStackPage = lazy(() => import('./pages/TechStackPage').then(m => ({ default: m.TechStackPage })));
const NacosDiscoveryPage = lazy(() => import('./pages/NacosDiscoveryPage').then(m => ({ default: m.NacosDiscoveryPage })));
const NacosConfigPage = lazy(() => import('./pages/NacosConfigPage').then(m => ({ default: m.NacosConfigPage })));
const SentinelPage = lazy(() => import('./pages/SentinelPage').then(m => ({ default: m.SentinelPage })));
const GatewayPage = lazy(() => import('./pages/GatewayPage').then(m => ({ default: m.GatewayPage })));
const OpenFeignPage = lazy(() => import('./pages/OpenFeignPage').then(m => ({ default: m.OpenFeignPage })));
const LoadBalancerPage = lazy(() => import('./pages/LoadBalancerPage').then(m => ({ default: m.LoadBalancerPage })));
const SeataPage = lazy(() => import('./pages/SeataPage').then(m => ({ default: m.SeataPage })));
const RocketMQPage = lazy(() => import('./pages/RocketMQPage').then(m => ({ default: m.RocketMQPage })));
const RedisPage = lazy(() => import('./pages/RedisPage').then(m => ({ default: m.RedisPage })));
const SkyWalkingPage = lazy(() => import('./pages/SkyWalkingPage').then(m => ({ default: m.SkyWalkingPage })));
const ArchitectureDecisionsPage = lazy(() => import('./pages/ArchitectureDecisionsPage').then(m => ({ default: m.ArchitectureDecisionsPage })));
const TechSelectionPage = lazy(() => import('./pages/TechSelectionPage').then(m => ({ default: m.TechSelectionPage })));
const ArchitectSoftSkillsPage = lazy(() => import('./pages/ArchitectSoftSkillsPage').then(m => ({ default: m.ArchitectSoftSkillsPage })));
const ServiceDecompositionPage = lazy(() => import('./pages/ServiceDecompositionPage').then(m => ({ default: m.ServiceDecompositionPage })));
const ServiceGovernancePage = lazy(() => import('./pages/ServiceGovernancePage').then(m => ({ default: m.ServiceGovernancePage })));
const TransactionSelectionPage = lazy(() => import('./pages/TransactionSelectionPage').then(m => ({ default: m.TransactionSelectionPage })));
const ObservabilityPage = lazy(() => import('./pages/ObservabilityPage').then(m => ({ default: m.ObservabilityPage })));
const PerformanceTuningPage = lazy(() => import('./pages/PerformanceTuningPage').then(m => ({ default: m.PerformanceTuningPage })));
const SecurityDesignPage = lazy(() => import('./pages/SecurityDesignPage').then(m => ({ default: m.SecurityDesignPage })));
const DisasterRecoveryPage = lazy(() => import('./pages/DisasterRecoveryPage').then(m => ({ default: m.DisasterRecoveryPage })));
const ConfigAdvancedPage = lazy(() => import('./pages/ConfigAdvancedPage').then(m => ({ default: m.ConfigAdvancedPage })));
const DockerDeploymentPage = lazy(() => import('./pages/DockerDeploymentPage').then(m => ({ default: m.DockerDeploymentPage })));
const K8sDeploymentPage = lazy(() => import('./pages/K8sDeploymentPage').then(m => ({ default: m.K8sDeploymentPage })));
const ServiceMeshPage = lazy(() => import('./pages/ServiceMeshPage').then(m => ({ default: m.ServiceMeshPage })));
const CicdPage = lazy(() => import('./pages/CicdPage').then(m => ({ default: m.CicdPage })));
const MonitoringPage = lazy(() => import('./pages/MonitoringPage').then(m => ({ default: m.MonitoringPage })));
const LoggingPage = lazy(() => import('./pages/LoggingPage').then(m => ({ default: m.LoggingPage })));
const TroubleshootingPage = lazy(() => import('./pages/TroubleshootingPage').then(m => ({ default: m.TroubleshootingPage })));
const ProjectEcommercePage = lazy(() => import('./pages/ProjectEcommercePage').then(m => ({ default: m.ProjectEcommercePage })));
const ProjectFlashSalePage = lazy(() => import('./pages/ProjectFlashSalePage').then(m => ({ default: m.ProjectFlashSalePage })));
const ProjectOrderPage = lazy(() => import('./pages/ProjectOrderPage').then(m => ({ default: m.ProjectOrderPage })));
const ProjectPaymentPage = lazy(() => import('./pages/ProjectPaymentPage').then(m => ({ default: m.ProjectPaymentPage })));
const ProjectUserCenterPage = lazy(() => import('./pages/ProjectUserCenterPage').then(m => ({ default: m.ProjectUserCenterPage })));
const ProjectComprehensivePage = lazy(() => import('./pages/ProjectComprehensivePage').then(m => ({ default: m.ProjectComprehensivePage })));
const InterviewPrepPage = lazy(() => import('./pages/InterviewPrepPage').then(m => ({ default: m.InterviewPrepPage })));
const InterviewQuestionsPage = lazy(() => import('./pages/InterviewQuestionsPage').then(m => ({ default: m.InterviewQuestionsPage })));
const DesignQuestionsPage = lazy(() => import('./pages/DesignQuestionsPage').then(m => ({ default: m.DesignQuestionsPage })));
const SystemDesignPage = lazy(() => import('./pages/SystemDesignPage').then(m => ({ default: m.SystemDesignPage })));
const CodeStandardsPage = lazy(() => import('./pages/CodeStandardsPage').then(m => ({ default: m.CodeStandardsPage })));
const ApiDesignPage = lazy(() => import('./pages/ApiDesignPage').then(m => ({ default: m.ApiDesignPage })));
const ConfigManagementPage = lazy(() => import('./pages/ConfigManagementPage').then(m => ({ default: m.ConfigManagementPage })));
const ExceptionHandlingPage = lazy(() => import('./pages/ExceptionHandlingPage').then(m => ({ default: m.ExceptionHandlingPage })));
const TestingStrategyPage = lazy(() => import('./pages/TestingStrategyPage').then(m => ({ default: m.TestingStrategyPage })));
const DocStandardsPage = lazy(() => import('./pages/DocStandardsPage').then(m => ({ default: m.DocStandardsPage })));
const FaqBeginnerPage = lazy(() => import('./pages/FaqBeginnerPage').then(m => ({ default: m.FaqBeginnerPage })));
const FaqAdvancedPage = lazy(() => import('./pages/FaqAdvancedPage').then(m => ({ default: m.FaqAdvancedPage })));
const FaqProductionPage = lazy(() => import('./pages/FaqProductionPage').then(m => ({ default: m.FaqProductionPage })));

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Layout>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<IndexPage />} />
              <Route path="/learning-path" element={<LearningPathPage />} />
              <Route path="/tech-stack" element={<TechStackPage />} />
              <Route path="/quickstart" element={<Navigate to="/getting-started" replace />} />
              <Route path="/getting-started" element={<GettingStartedPage />} />
              <Route path="/core-concepts" element={<Navigate to="/getting-started" replace />} />

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

            <Route path="/architecture-decisions" element={<ArchitectureDecisionsPage />} />
            <Route path="/tech-selection" element={<TechSelectionPage />} />
            <Route path="/architect-soft-skills" element={<ArchitectSoftSkillsPage />} />
            <Route path="/service-decomposition" element={<ServiceDecompositionPage />} />
            <Route path="/service-governance" element={<ServiceGovernancePage />} />
            <Route path="/transaction-selection" element={<TransactionSelectionPage />} />
            <Route path="/observability" element={<ObservabilityPage />} />
            <Route path="/performance-tuning" element={<PerformanceTuningPage />} />
            <Route path="/security-design" element={<SecurityDesignPage />} />
            <Route path="/disaster-recovery" element={<DisasterRecoveryPage />} />
            <Route path="/config-advanced" element={<ConfigAdvancedPage />} />

            <Route path="/docker-deployment" element={<DockerDeploymentPage />} />
            <Route path="/k8s-deployment" element={<K8sDeploymentPage />} />
            <Route path="/service-mesh" element={<ServiceMeshPage />} />
            <Route path="/cicd" element={<CicdPage />} />
            <Route path="/monitoring" element={<MonitoringPage />} />
            <Route path="/logging" element={<LoggingPage />} />
            <Route path="/troubleshooting" element={<TroubleshootingPage />} />

            <Route path="/project-ecommerce" element={<ProjectEcommercePage />} />
            <Route path="/project-flash-sale" element={<ProjectFlashSalePage />} />
            <Route path="/project-order" element={<ProjectOrderPage />} />
            <Route path="/project-payment" element={<ProjectPaymentPage />} />
            <Route path="/project-user-center" element={<ProjectUserCenterPage />} />
            <Route path="/project-comprehensive" element={<ProjectComprehensivePage />} />

            <Route path="/interview-prep" element={<InterviewPrepPage />} />
            <Route path="/interview-questions" element={<InterviewQuestionsPage />} />
            <Route path="/design-questions" element={<DesignQuestionsPage />} />
            <Route path="/system-design" element={<SystemDesignPage />} />

            <Route path="/code-standards" element={<CodeStandardsPage />} />
            <Route path="/api-design" element={<ApiDesignPage />} />
            <Route path="/config-management" element={<ConfigManagementPage />} />
            <Route path="/exception-handling" element={<ExceptionHandlingPage />} />
            <Route path="/testing-strategy" element={<TestingStrategyPage />} />
            <Route path="/doc-standards" element={<DocStandardsPage />} />

            <Route path="/faq-beginner" element={<FaqBeginnerPage />} />
            <Route path="/faq-advanced" element={<FaqAdvancedPage />} />
            <Route path="/faq-production" element={<FaqProductionPage />} />
          </Routes>
        </Suspense>
      </Layout>
    </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
