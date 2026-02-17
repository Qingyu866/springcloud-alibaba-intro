import { useState } from 'react';
import { CodeBlock } from '../components';

interface PipelineCardProps {
  name: string;
  description: string;
  icon: string;
  color: string;
}

const PipelineCard: React.FC<PipelineCardProps> = ({ name, description, icon, color }) => (
  <div className={`${color} border-2 rounded-lg p-5`}>
    <div className="flex items-center gap-3 mb-3">
      <span className="text-3xl">{icon}</span>
      <h3 className="text-xl font-bold text-gray-900">{name}</h3>
    </div>
    <p className="text-gray-700 text-sm">{description}</p>
  </div>
);

interface FaqCardProps {
  number: number;
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
}

const FaqCard: React.FC<FaqCardProps> = ({ number, question, answer, isOpen, onClick }) => (
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

export const CicdPage: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="bg-gradient-to-r from-purple-700 to-purple-900 text-white rounded-lg p-6 mb-8">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-4xl font-bold mb-2">CI/CD 流水线</h1>
            <p className="text-purple-100 text-lg">持续集成与持续部署实战</p>
          </div>
          <div className="flex gap-3 text-sm">
            <span className="px-3 py-1 bg-white/20 rounded-full">🔧 中级</span>
            <span className="px-3 py-1 bg-white/20 rounded-full">⏱️ 约60分钟</span>
            <span className="px-3 py-1 bg-white/20 rounded-full">📚 10个知识点</span>
          </div>
        </div>
      </div>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">为什么需要 CI/CD?</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-red-50 border-2 border-red-200 rounded-lg p-5">
            <h3 className="text-xl font-bold text-red-900 mb-3">❌ 手动部署痛点</h3>
            <ul className="text-gray-700 space-y-2">
              <li>• 重复性工作多，容易出错</li>
              <li>• 发布周期长，响应慢</li>
              <li>• 测试不充分，Bug 频发</li>
              <li>• 回滚困难，恢复慢</li>
              <li>• 环境不一致，问题难复现</li>
            </ul>
          </div>

          <div className="bg-green-50 border-2 border-green-200 rounded-lg p-5">
            <h3 className="text-xl font-bold text-green-900 mb-3">✅ CI/CD 核心价值</h3>
            <ul className="text-gray-700 space-y-2">
              <li>• 自动化构建测试，减少人为错误</li>
              <li>• 快速交付，缩短发布周期</li>
              <li>• 持续集成，及早发现问题</li>
              <li>• 一键回滚，降低风险</li>
              <li>• 环境标准化，提高稳定性</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">CI/CD 流水线架构</h2>

        <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200 rounded-lg p-6 mb-6">
          <div className="flex flex-wrap items-center justify-center gap-4 text-center">
            <div className="bg-white rounded-lg p-4 shadow-md">
              <div className="text-2xl mb-2">📝</div>
              <div className="font-bold text-gray-900">代码提交</div>
              <div className="text-xs text-gray-600">Git Push</div>
            </div>
            <div className="text-2xl text-gray-400">→</div>
            <div className="bg-white rounded-lg p-4 shadow-md">
              <div className="text-2xl mb-2">🔨</div>
              <div className="font-bold text-gray-900">构建</div>
              <div className="text-xs text-gray-600">Maven Build</div>
            </div>
            <div className="text-2xl text-gray-400">→</div>
            <div className="bg-white rounded-lg p-4 shadow-md">
              <div className="text-2xl mb-2">🧪</div>
              <div className="font-bold text-gray-900">测试</div>
              <div className="text-xs text-gray-600">Unit + Integration</div>
            </div>
            <div className="text-2xl text-gray-400">→</div>
            <div className="bg-white rounded-lg p-4 shadow-md">
              <div className="text-2xl mb-2">🐳</div>
              <div className="font-bold text-gray-900">镜像</div>
              <div className="text-xs text-gray-600">Docker Build</div>
            </div>
            <div className="text-2xl text-gray-400">→</div>
            <div className="bg-white rounded-lg p-4 shadow-md">
              <div className="text-2xl mb-2">🚀</div>
              <div className="font-bold text-gray-900">部署</div>
              <div className="text-xs text-gray-600">K8s Apply</div>
            </div>
            <div className="text-2xl text-gray-400">→</div>
            <div className="bg-white rounded-lg p-4 shadow-md">
              <div className="text-2xl mb-2">✅</div>
              <div className="font-bold text-gray-900">验证</div>
              <div className="text-xs text-gray-600">Health Check</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <PipelineCard
            name="持续集成 (CI)"
            description="代码提交后自动构建、测试、打包，确保代码质量"
            icon="🔨"
            color="bg-blue-50 border-blue-200"
          />
          <PipelineCard
            name="持续交付 (CD)"
            description="通过自动化流水线将应用部署到生产环境"
            icon="🚀"
            color="bg-green-50 border-green-200"
          />
          <PipelineCard
            name="GitOps"
            description="Git 仓库作为单一事实来源，声明式配置管理"
            icon="📦"
            color="bg-purple-50 border-purple-200"
          />
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">1. GitLab CI 配置</h2>

        <div className="bg-white border-2 border-slate-200 rounded-lg p-6 mb-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">.gitlab-ci.yml 完整配置</h3>
          <CodeBlock
            language="yaml"
            code={`variables:
  MAVEN_OPTS: "-Dmaven.repo.local=.m2/repository"
  DOCKER_DRIVER: overlay2
  DOCKER_TLS_CERTDIR: "/certs"

stages:
  - build
  - test
  - docker
  - deploy

# 缓存 Maven 依赖
cache:
  key: $\{CI_COMMIT_REF_SLUG}
  paths:
    - .m2/repository/

# 1. 构建阶段
build:jdk17:
  stage: build
  image: maven:3.8.6-eclipse-temurin-17
  script:
    - mvn clean package -DskipTests
  artifacts:
    paths:
      - target/*.jar
    expire_in: 1 hour
  only:
    - main
    - develop
    - merge_requests

# 2. 单元测试
test:unit:
  stage: test
  image: maven:3.8.6-eclipse-temurin-17
  script:
    - mvn test
  coverage: '/Total.*?([0-9]{1,3})%/'
  artifacts:
    reports:
      junit: target/surefire-reports/TEST-*.xml
    coverage_report:
      coverage_format: cobertura
      path: target/site/jacoco/jacoco.xml

# 3. 构建镜像
docker:build:
  stage: docker
  image: docker:24-dind
  services:
    - docker:24-dind
  before_script:
    - echo $CI_REGISTRY_PASSWORD | docker login -u $CI_REGISTRY_USER --password-stdin $CI_REGISTRY
  script:
    - docker build -t $CI_REGISTRY_IMAGE:$CI_COMMIT_SHORT_SHA .
    - docker push $CI_REGISTRY_IMAGE:$CI_COMMIT_SHORT_SHA
    - |
      if [ "$CI_COMMIT_BRANCH" == "main" ]; then
        docker tag $CI_REGISTRY_IMAGE:$CI_COMMIT_SHORT_SHA $CI_REGISTRY_IMAGE:latest
        docker push $CI_REGISTRY_IMAGE:latest
      fi
  only:
    - main
    - develop

# 4. 部署到 K8s
deploy:production:
  stage: deploy
  image: bitnami/kubectl:latest
  environment:
    name: production
    url: https://api.example.com
  script:
    - kubectl set image deployment/order-service \\
      order-service=$CI_REGISTRY_IMAGE:$CI_COMMIT_SHORT_SHA -n production
    - kubectl rollout status deployment/order-service -n production
  when: manual
  only:
    - main`}
          />
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">2. Jenkins Pipeline</h2>

        <div className="bg-white border-2 border-slate-200 rounded-lg p-6 mb-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Jenkinsfile 声明式流水线</h3>
          <CodeBlock
            language="groovy"
            code={`pipeline {
    agent any

    parameters {
        choice(
            choices: ['dev', 'staging', 'production'],
            description: '选择部署环境',
            name: 'ENV'
        )
        booleanParam(
            defaultValue: false,
            description: '是否跳过测试',
            name: 'SKIP_TESTS'
        )
    }

    environment {
        DOCKER_REGISTRY = 'harbor.example.com'
        IMAGE_NAME = 'order-service'
        IMAGE_TAG = "\$\{env.BUILD_NUMBER}"
    }

    stages {
        stage('Checkout') {
            steps {
                echo 'Checking out source code...'
                checkout scm
            }
        }

        stage('Build') {
            steps {
                echo 'Building Maven project...'
                sh 'mvn clean package -DskipTests'
            }
        }

        stage('Test') {
            when {
                expression { !params.SKIP_TESTS }
            }
            steps {
                echo 'Running tests...'
                sh 'mvn test'
                junit 'target/surefire-reports/*.xml'
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    docker.build("\$\{DOCKER_REGISTRY}/\$\{IMAGE_NAME}:\$\{IMAGE_TAG}")
                }
            }
        }

        stage('Push Image') {
            steps {
                script {
                    docker.withRegistry("https://\$\{DOCKER_REGISTRY}", 'docker-credentials') {
                        docker.image("\$\{DOCKER_REGISTRY}/\$\{IMAGE_NAME}:\$\{IMAGE_TAG}").push()
                        docker.image("\$\{DOCKER_REGISTRY}/\$\{IMAGE_NAME}:\$\{IMAGE_TAG}").push('latest')
                    }
                }
            }
        }

        stage('Deploy to K8s') {
            steps {
                sh """
                    kubectl set image deployment/\\\${IMAGE_NAME} \\\${IMAGE_NAME}=\\\${DOCKER_REGISTRY}/\\\${IMAGE_NAME}:\\\${IMAGE_TAG} -n \\\${ENV}
                    kubectl rollout status deployment/\\\${IMAGE_NAME} -n \\\${ENV}
                """
            }
        }
    }

    post {
        success {
            echo 'Pipeline succeeded! 🎉'
        }
        failure {
            echo 'Pipeline failed! ❌'
        }
        always {
            cleanWs()
        }
    }
}`}
          />
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">3. ArgoCD GitOps</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-green-50 border-2 border-green-200 rounded-lg p-5">
            <h3 className="text-xl font-bold text-green-900 mb-3">✅ GitOps 优势</h3>
            <ul className="text-sm text-gray-700 space-y-2">
              <li>• 声明式配置，版本可控</li>
              <li>• 自动同步状态</li>
              <li>• 易于回滚</li>
              <li>• 审计日志完整</li>
              <li>• 权限控制清晰</li>
            </ul>
          </div>

          <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-5">
            <h3 className="text-xl font-bold text-blue-900 mb-3">🔄 工作流程</h3>
            <ol className="text-sm text-gray-700 space-y-2">
              <li>1. 开发提交代码到 Git</li>
              <li>2. CI 构建 Docker 镜像</li>
              <li>3. 更新 K8s manifest 版本</li>
              <li>4. ArgoCD 检测到变化</li>
              <li>5. 自动同步到集群</li>
            </ol>
          </div>
        </div>

        <div className="bg-white border-2 border-slate-200 rounded-lg p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">ArgoCD Application</h3>
          <CodeBlock
            language="yaml"
            code={`apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: order-service
  namespace: argocd
spec:
  project: default

  source:
    repoURL: https://github.com/Qingyu866/springcloud-alibaba-k8s
    targetRevision: main
    path: manifests/order-service
    helm:
      valueFiles:
        - values-prod.yaml

  destination:
    server: https://kubernetes.default.svc
    namespace: production

  syncPolicy:
    automated:
      prune: true
      selfHeal: true
      allowEmpty: false
    syncOptions:
      - CreateNamespace=true
      - PrunePropagationPolicy=foreground

  revisionHistoryLimit: 10`}
          />
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">4. 蓝绿部署</h2>

        <div className="bg-white border-2 border-slate-200 rounded-lg p-6">
          <CodeBlock
            language="yaml"
            code={`# 蓝绿部署策略
apiVersion: v1
kind: Service
metadata:
  name: order-service-blue
spec:
  selector:
    app: order-service
    version: blue  # 蓝环境
  ports:
  - port: 80
    targetPort: 8080
---
apiVersion: v1
kind: Service
metadata:
  name: order-service-green
spec:
  selector:
    app: order-service
    version: green  # 绿环境
  ports:
  - port: 80
    targetPort: 8080
---
apiVersion: v1
kind: Service
metadata:
  name: order-service
spec:
  selector:
    app: order-service
    version: blue  # 默认指向蓝环境
  ports:
  - port: 80
    targetPort: 8080

# 部署流程:
# 1. 部署新版本到绿环境 (version: green)
# 2. 测试验证绿环境
# 3. 切换 Service selector 到 green
# 4. 验证成功后删除蓝环境`}
          />
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">5. 金丝雀发布</h2>

        <div className="bg-white border-2 border-slate-200 rounded-lg p-6 mb-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Istio 金丝雀配置</h3>
          <CodeBlock
            language="yaml"
            code={`apiVersion: networking.istio.io/v1beta1
kind: VirtualService
metadata:
  name: order-service
spec:
  hosts:
  - order-service
  http:
  - match:
    - headers:
        canary:
          exact: "true"
    route:
    - destination:
        host: order-service
        subset: v2  # 金丝雀版本
      weight: 100
  - route:
    - destination:
        host: order-service
        subset: v1  # 稳定版本
      weight: 90
    - destination:
        host: order-service
        subset: v2
      weight: 10  # 10% 流量到金丝雀版本

---
apiVersion: networking.istio.io/v1beta1
kind: DestinationRule
metadata:
  name: order-service
spec:
  host: order-service
  subsets:
  - name: v1
    labels:
      version: v1.0
  - name: v2
    labels:
      version: v1.1`}
          />
        </div>

        <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-5">
          <h4 className="font-bold text-yellow-900 mb-2">💡 金丝雀发布最佳实践</h4>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>• 初期 5-10% 流量，观察指标</li>
            <li>• 逐步增加流量比例：10% → 25% → 50% → 100%</li>
            <li>• 监控错误率、延迟、流量分布</li>
            <li>• 发现异常立即回滚</li>
            <li>• 使用 Feature Flag 控制功能开关</li>
          </ul>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">6. 自动化测试集成</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-5">
            <h3 className="text-xl font-bold text-blue-900 mb-3">单元测试</h3>
            <CodeBlock
              language="yaml"
              code={`test:unit:
  script:
    - mvn test
  coverage: '/Total.*?([0-9]{1,3})%/'
  artifacts:
    reports:
      junit: target/surefire-reports/*.xml`}
            />
          </div>

          <div className="bg-purple-50 border-2 border-purple-200 rounded-lg p-5">
            <h3 className="text-xl font-bold text-purple-900 mb-3">集成测试</h3>
            <CodeBlock
              language="yaml"
              code={`test:integration:
  services:
    - mysql:latest
    - redis:latest
  script:
    - mvn verify -Pintegration-test
  only:
    - merge_requests`}
            />
          </div>

          <div className="bg-green-50 border-2 border-green-200 rounded-lg p-5">
            <h3 className="text-xl font-bold text-green-900 mb-3">E2E 测试</h3>
            <CodeBlock
              language="yaml"
              code={`test:e2e:
  image: node:18
  script:
    - npm install
    - npm run test:e2e
  artifacts:
    paths:
      - cypress/videos/
      - cypress/screenshots/`}
            />
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">CI/CD 最佳实践</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-green-50 border-2 border-green-200 rounded-lg p-5">
            <h3 className="text-xl font-bold text-green-900 mb-3">流水线优化</h3>
            <ul className="text-sm text-gray-700 space-y-2">
              <li>✓ 并行执行独立任务</li>
              <li>✓ 缓存依赖减少构建时间</li>
              <li>✓ 分阶段构建 Docker 镜像</li>
              <li>✓ 使用 .dockerignore 优化上下文</li>
              <li>✓ 仅在必要时运行完整测试</li>
            </ul>
          </div>

          <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-5">
            <h3 className="text-xl font-bold text-blue-900 mb-3">安全加固</h3>
            <ul className="text-sm text-gray-700 space-y-2">
              <li>✓ 扫描镜像漏洞</li>
              <li>✓ SAST 代码安全扫描</li>
              <li>✓ SCA 依赖检查</li>
              <li>✓ 密钥使用 Secret 管理</li>
              <li>✓ 最小权限原则</li>
            </ul>
          </div>

          <div className="bg-red-50 border-2 border-red-200 rounded-lg p-5">
            <h3 className="text-xl font-bold text-red-900 mb-3">监控告警</h3>
            <ul className="text-sm text-gray-700 space-y-2">
              <li>✓ 构建失败立即通知</li>
              <li>✓ 部署状态可视化</li>
              <li>✓ 关键指标监控（成功率、耗时）</li>
              <li>✓ 部署回滚自动化</li>
              <li>✓ 变更审计日志</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">常见问题</h2>

        <div className="space-y-4">
          <FaqCard
            number={1}
            question="CI/CD 流水线构建太慢怎么办？"
            answer={"构建优化策略：\n\n1. 依赖缓存\n   - Maven/Gradle 缓存本地仓库\n   - Docker 多阶段构建\n   - 缓存 npm/node_modules\n\n2. 并行执行\n   - 单元测试并行运行\n   - 多服务同时构建\n   - 使用分布式构建节点\n\n3. 增量构建\n   - 仅构建变更模块\n   - 跳过未修改的测试\n   - 使用 Build Cache\n\n4. 镜像优化\n   - 使用 Alpine 基础镜像\n   - 多阶段构建减少层数\n   - 提前拉取基础镜像\n\n【效果】\n优化前: 15分钟\n优化后: 3-5分钟"}
            isOpen={openFaq === 1}
            onClick={() => toggleFaq(1)}
          />
          <FaqCard
            number={2}
            question="如何实现零停机部署？"
            answer={"零停机部署方案：\n\n1. 滚动更新\n   ```yaml\n   maxSurge: 1\n   maxUnavailable: 0\n   ```\n   逐步替换 Pod，确保始终有实例运行\n\n2. 蓝绿部署\n   - 准备两套完整环境\n   - 测试绿环境\n   - 切换流量\n\n3. 金丝雀发布\n   - 新版本接收部分流量\n   - 监控指标正常后全量切换\n\n4. ReadinessProbe 配置\n   ```yaml\n   readinessProbe:\n     initialDelaySeconds: 30\n     periodSeconds: 5\n   ```\n   确保应用就绪后才接收流量\n\n5. 优雅关闭\n   ```yaml\n   lifecycle:\n     preStop:\n       exec:\n         command: [\"sh\", \"-c\", \"sleep 15\"]\n   ```\n\n【推荐】\n生产环境：滚动更新 + 金丝雀\n关键服务：蓝绿部署"}
            isOpen={openFaq === 2}
            onClick={() => toggleFaq(2)}
          />
          <FaqCard
            number={3}
            question="GitOps 和传统 CI/CD 有什么区别？"
            answer={"GitOps vs 传统 CI/CD：\n\n| 维度 | 传统 CI/CD | GitOps |\n|------|-----------|---------|\n| 配置管理 | 命令式 | 声明式 |\n| 状态同步 | 手动触发 | 自动同步 |\n| 单一事实源 | 分散 | Git 仓库 |\n| 回滚 | 手动执行 | Git revert |\n| 权限控制 | 平台级 | Git 权限 |\n| 审计日志 | 不完整 | Git 提交历史 |\n\n【GitOps 优势】\n1. 配置即代码，版本可控\n2. 自动同步状态，自动修复漂移\n3. 易于回滚，git revert 即可\n4. 权限控制清晰，PR 流程\n5. 审计日志完整，可追溯\n\n【适合场景】\n- K8s 环境管理\n- 多环境部署\n- 需要严格审计\n- 团队协作开发"}
            isOpen={openFaq === 3}
            onClick={() => toggleFaq(3)}
          />
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">下一步学习</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <a href="/monitoring" className="block bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-200 rounded-lg p-6 hover:shadow-lg transition">
            <h3 className="text-xl font-bold text-blue-900 mb-2">📊 监控告警</h3>
            <p className="text-gray-700 text-sm">Prometheus + Grafana 全链路监控</p>
          </a>
          <a href="/logging" className="block bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-200 rounded-lg p-6 hover:shadow-lg transition">
            <h3 className="text-xl font-bold text-green-900 mb-2">📝 日志聚合</h3>
            <p className="text-gray-700 text-sm">ELK Stack 日志收集与分析</p>
          </a>
        </div>
      </section>
    </div>
  );
};
