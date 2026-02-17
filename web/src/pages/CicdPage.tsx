import { useState } from 'react';
import { CodeBlock } from '../components';

interface ToolCardProps {
  name: string;
  description: string;
  icon: string;
  color: string;
  features: string[];
}

const ToolCard: React.FC<ToolCardProps> = ({ name, description, icon, color, features }) => (
  <div className={`${color} border-2 rounded-lg p-5`}>
    <div className="flex items-center gap-3 mb-3">
      <span className="text-3xl">{icon}</span>
      <h3 className="text-xl font-bold text-gray-900">{name}</h3>
    </div>
    <p className="text-gray-700 text-sm mb-3">{description}</p>
    <ul className="text-sm text-gray-600 space-y-1">
      {features.map((feature, index) => (
        <li key={index} className="flex items-start">
          <span className="text-blue-600 mr-2">✓</span>
          <span>{feature}</span>
        </li>
      ))}
    </ul>
  </div>
);

interface StrategyCardProps {
  name: string;
  icon: string;
  description: string;
  pros: string[];
  cons: string[];
  useCase: string;
}

const StrategyCard: React.FC<StrategyCardProps> = ({ name, icon, description, pros, cons, useCase }) => (
  <div className="bg-white border-2 border-blue-200 rounded-lg p-5">
    <div className="flex items-center gap-3 mb-3">
      <span className="text-3xl">{icon}</span>
      <h3 className="text-xl font-bold text-gray-900">{name}</h3>
    </div>
    <p className="text-gray-700 text-sm mb-4">{description}</p>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <h4 className="font-bold text-green-700 text-sm mb-2">✅ 优势</h4>
        <ul className="text-sm text-gray-600 space-y-1">
          {pros.map((pro, index) => (
            <li key={index}>• {pro}</li>
          ))}
        </ul>
      </div>
      <div>
        <h4 className="font-bold text-red-700 text-sm mb-2">⚠️ 劣势</h4>
        <ul className="text-sm text-gray-600 space-y-1">
          {cons.map((con, index) => (
            <li key={index}>• {con}</li>
          ))}
        </ul>
      </div>
    </div>
    <div className="mt-3 bg-blue-50 p-3 rounded">
      <h4 className="font-bold text-blue-900 text-sm mb-1">🎯 适用场景</h4>
      <p className="text-sm text-gray-700">{useCase}</p>
    </div>
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
            <h1 className="text-4xl font-bold mb-2">CI/CD 流水线实战</h1>
            <p className="text-purple-100 text-lg">Jenkins + GitLab CI + SonarQube 完整指南</p>
          </div>
          <div className="flex gap-3 text-sm">
            <span className="px-3 py-1 bg-white/20 rounded-full">🔧 进阶</span>
            <span className="px-3 py-1 bg-white/20 rounded-full">⏱️ 约90分钟</span>
            <span className="px-3 py-1 bg-white/20 rounded-full">📚 12个知识点</span>
          </div>
        </div>
      </div>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">为什么需要 CI/CD?</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-red-50 border-2 border-red-200 rounded-lg p-5">
            <h3 className="text-xl font-bold text-red-900 mb-3">❌ 手动部署痛点</h3>
            <ul className="text-gray-700 space-y-2">
              <li>• 重复性工作多，容易出错</li>
              <li>• 发布周期长，响应慢</li>
              <li>• 测试不充分，Bug 频发</li>
              <li>• 回滚困难，恢复慢</li>
              <li>• 环境不一致，问题难复现</li>
              <li>• 缺乏审计记录</li>
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
              <li>• 完整的审计日志</li>
            </ul>
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200 rounded-lg p-6">
          <h3 className="text-2xl font-bold text-blue-900 mb-4">CI/CD 流水线架构</h3>
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
              <div className="text-2xl mb-2">🔍</div>
              <div className="font-bold text-gray-900">质量检查</div>
              <div className="text-xs text-gray-600">SonarQube</div>
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
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">1. CI/CD 基础概念与工具选型</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          <ToolCard
            name="Jenkins"
            description="开源持续集成工具，插件生态丰富"
            icon="🔧"
            color="bg-blue-50 border-blue-200"
            features={[
              '插件生态最丰富',
              '高度可定制',
              '分布式构建',
              '社区活跃'
            ]}
          />
          <ToolCard
            name="GitLab CI"
            description="GitLab 内置 CI/CD，配置简单"
            icon="🦊"
            color="bg-orange-50 border-orange-200"
            features={[
              '与 Git 仓库集成',
              'YAML 配置简单',
              '内置 Docker 支持',
              '免费版功能丰富'
            ]}
          />
          <ToolCard
            name="SonarQube"
            description="代码质量分析与安全扫描"
            icon="🔍"
            color="bg-purple-50 border-purple-200"
            features={[
              '代码质量检测',
              '安全漏洞扫描',
              '代码覆盖率',
              '技术债务分析'
            ]}
          />
        </div>

        <div className="bg-white border-2 border-slate-200 rounded-lg p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">工具选型对比</h3>
          <CodeBlock
            language="markdown"
            code={`| 维度           | Jenkins           | GitLab CI          | GitHub Actions    |
|--------------|-------------------|--------------------|-------------------|
| 学习曲线     | 陡峭              | 平缓               | 平缓              |
| 配置方式     | GUI + Pipeline    | YAML               | YAML              |
| 插件生态     | 最丰富            | 有限               | 丰富              |
| 自托管       | 支持              | 支持               | 支持              |
| 云原生       | 一般              | 优秀               | 优秀              |
| 成本         | 免费（自托管）    | 免费（自托管）     | 免费额度有限      |
| 适用场景     | 复杂流水线        | GitLab 用户        | GitHub 项目       |

【推荐方案】
- 小型团队: GitLab CI / GitHub Actions
- 中大型团队: Jenkins
- DevOps 成熟团队: Jenkins + GitLab CI 混合`}
          />
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">2. GitLab CI/CD 实战</h2>

        <div className="bg-white border-2 border-slate-200 rounded-lg p-6 mb-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">.gitlab-ci.yml 完整配置</h3>
          <CodeBlock
            language="yaml"
            code={`# 全局变量
variables:
  MAVEN_OPTS: "-Dmaven.repo.local=.m2/repository"
  DOCKER_DRIVER: overlay2
  DOCKER_TLS_CERTDIR: "/certs"
  IMAGE_TAG: $CI_COMMIT_SHORT_SHA

# 定义阶段
stages:
  - build
  - test
  - quality
  - docker
  - deploy-staging
  - deploy-production

# 缓存 Maven 依赖
cache:
  key: \${CI_COMMIT_REF_SLUG}
  paths:
    - .m2/repository/

# ============================================
# 阶段 1: 构建
# ============================================
build:jdk17:
  stage: build
  image: maven:3.8.6-eclipse-temurin-17
  script:
    - echo "开始构建项目..."
    - mvn clean compile
    - mvn package -DskipTests
  artifacts:
    paths:
      - target/*.jar
    expire_in: 1 hour
  only:
    - main
    - develop
    - merge_requests
  tags:
    - docker

# ============================================
# 阶段 2: 单元测试
# ============================================
test:unit:
  stage: test
  image: maven:3.8.6-eclipse-temurin-17
  dependencies:
    - build:jdk17
  script:
    - echo "运行单元测试..."
    - mvn test
  coverage: '/Total.*?([0-9]{1,3})%/'
  artifacts:
    reports:
      junit: target/surefire-reports/TEST-*.xml
    coverage_report:
      coverage_format: cobertura
      path: target/site/jacoco/jacoco.xml
  only:
    - main
    - develop
    - merge_requests

# ============================================
# 阶段 3: 集成测试
# ============================================
test:integration:
  stage: test
  image: maven:3.8.6-eclipse-temurin-17
  services:
    - mysql:8.0
    - redis:7-alpine
  variables:
    MYSQL_DATABASE: testdb
    MYSQL_ROOT_PASSWORD: root
  dependencies:
    - build:jdk17
  script:
    - echo "运行集成测试..."
    - mvn verify -Pintegration-test
  artifacts:
    reports:
      junit: target/failsafe-reports/TEST-*.xml
  only:
    - main
    - develop

# ============================================
# 阶段 4: 代码质量检查
# ============================================
quality:sonarqube:
  stage: quality
  image: maven:3.8.6-eclipse-temurin-17
  dependencies:
    - build:jdk17
  script:
    - echo "SonarQube 代码质量分析..."
    - mvn sonar:sonar \\
      -Dsonar.host.url=$SONAR_HOST_URL \\
      -Dsonar.login=$SONAR_TOKEN \\
      -Dsonar.projectKey=$CI_PROJECT_NAME \\
      -Dsonar.coverage.jacoco.xmlReportPaths=target/site/jacoco/jacoco.xml
  allow_failure: true
  only:
    - main
    - develop

# ============================================
# 阶段 5: 构建 Docker 镜像
# ============================================
docker:build:
  stage: docker
  image: docker:24-dind
  services:
    - docker:24-dind
  before_script:
    - echo $CI_REGISTRY_PASSWORD | docker login -u $CI_REGISTRY_USER --password-stdin $CI_REGISTRY
  script:
    - echo "构建 Docker 镜像..."
    - docker build -t $CI_REGISTRY_IMAGE:$IMAGE_TAG .
    - docker push $CI_REGISTRY_IMAGE:$IMAGE_TAG
    - |
      if [ "$CI_COMMIT_BRANCH" == "main" ]; then
        docker tag $CI_REGISTRY_IMAGE:$IMAGE_TAG $CI_REGISTRY_IMAGE:latest
        docker push $CI_REGISTRY_IMAGE:latest
      fi
    - |
      if [ "$CI_COMMIT_BRANCH" == "develop" ]; then
        docker tag $CI_REGISTRY_IMAGE:$IMAGE_TAG $CI_REGISTRY_IMAGE:dev
        docker push $CI_REGISTRY_IMAGE:dev
      fi
  only:
    - main
    - develop

# ============================================
# 阶段 6: 部署到测试环境
# ============================================
deploy:staging:
  stage: deploy-staging
  image: bitnami/kubectl:latest
  environment:
    name: staging
    url: https://staging.example.com
  script:
    - echo "部署到测试环境..."
    - kubectl set image deployment/order-service \\
      order-service=$CI_REGISTRY_IMAGE:$IMAGE_TAG -n staging
    - kubectl rollout status deployment/order-service -n staging
  only:
    - develop
  when: manual

# ============================================
# 阶段 7: 部署到生产环境
# ============================================
deploy:production:
  stage: deploy-production
  image: bitnami/kubectl:latest
  environment:
    name: production
    url: https://api.example.com
  script:
    - echo "部署到生产环境..."
    - kubectl set image deployment/order-service \\
      order-service=$CI_REGISTRY_IMAGE:$IMAGE_TAG -n production
    - kubectl rollout status deployment/order-service -n production
  only:
    - main
  when: manual`}
          />
        </div>

        <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-5">
          <h4 className="font-bold text-blue-900 mb-2">💡 GitLab CI 最佳实践</h4>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>• 使用 cache 缓存依赖，减少构建时间</li>
            <li>• artifacts 在阶段间传递，避免重复构建</li>
            <li>• only/except 控制作业触发条件</li>
            <li>• when: manual 生产环境部署需要手动触发</li>
            <li>• services 定义测试所需的辅助服务</li>
            <li>• environment 管理部署环境</li>
          </ul>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">3. Jenkins Pipeline 进阶</h2>

        <div className="bg-white border-2 border-slate-200 rounded-lg p-6 mb-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Jenkinsfile 声明式流水线</h3>
          <CodeBlock
            language="groovy"
            code={`pipeline {
    agent any

    // ============================================
    // 构建参数
    // ============================================
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
        booleanParam(
            defaultValue: false,
            description: '是否跳过 SonarQube',
            name: 'SKIP_SONAR'
        )
        string(
            defaultValue: 'main',
            description: 'Git 分支',
            name: 'GIT_BRANCH',
            trim: true
        )
    }

    // ============================================
    // 环境变量
    // ============================================
    environment {
        DOCKER_REGISTRY = 'harbor.example.com'
        IMAGE_NAME = 'order-service'
        IMAGE_TAG = "\$\{env.BUILD_NUMBER}"
        SONAR_HOST = 'http://sonarqube:9000'
        KUBECONFIG = credentials('kubeconfig')
    }

    // ============================================
    // 构建触发器
    // ============================================
    triggers {
        // GitLab Webhook 触发
        gitlab(
            triggerOnPush: true,
            triggerOnMergeRequest: true,
            branchFilterType: 'NameBasedFilter',
            includeBranches: 'main,develop'
        )
        // 定时构建 (每天凌晨 2 点)
        cron('H 2 * * *')
    }

    // ============================================
    // 构建选项
    // ============================================
    options {
        // 保留最近 30 次构建记录
        buildDiscarder(logRotator(numToKeepStr: '30'))
        // 禁止并发构建
        disableConcurrentBuilds()
        // 构建超时时间 (1 小时)
        timeout(time: 1, unit: 'HOURS')
        // 时间戳
        timestamps()
    }

    stages {
        // ============================================
        // 阶段 1: 拉取代码
        // ============================================
        stage('Checkout') {
            steps {
                echo '📥 拉取代码...'
                checkout scm
                sh 'git rev-parse HEAD > GIT_COMMIT'
                script {
                    GIT_COMMIT = readFile('GIT_COMMIT').trim()
                    echo "当前 Git Commit: \${GIT_COMMIT}"
                }
            }
        }

        // ============================================
        // 阶段 2: 构建项目
        // ============================================
        stage('Build') {
            steps {
                echo '🔨 构建 Maven 项目...'
                sh 'mvn clean package -DskipTests'
            }
            post {
                success {
                    archiveArtifacts artifacts: 'target/*.jar', fingerprint: true
                }
            }
        }

        // ============================================
        // 阶段 3: 运行测试
        // ============================================
        stage('Test') {
            when {
                expression { !params.SKIP_TESTS }
            }
            steps {
                echo '🧪 运行单元测试...'
                sh 'mvn test'
            }
            post {
                always {
                    // 发布 JUnit 测试报告
                    junit 'target/surefire-reports/*.xml'
                    // 发布代码覆盖率报告
                    jacoco execPattern: 'target/jacoco.exec',
                           classPattern: 'target/classes',
                           sourcePattern: 'src/main/java'
                }
            }
        }

        // ============================================
        // 阶段 4: 代码质量检查
        // ============================================
        stage('SonarQube Analysis') {
            when {
                expression { !params.SKIP_SONAR }
            }
            steps {
                echo '🔍 SonarQube 代码质量分析...'
                withSonarQubeEnv('SonarQube') {
                    sh """
                        mvn sonar:sonar \\
                          -Dsonar.host.url=\${SONAR_HOST} \\
                          -Dsonar.projectKey=\${JOB_NAME} \\
                          -Dsonar.projectName=\${JOB_NAME} \\
                          -Dsonar.projectVersion=\${BUILD_NUMBER}
                    """
                }
            }
        }

        // ============================================
        // 阶段 5: 等待质量门禁
        // ============================================
        stage('Quality Gate') {
            when {
                expression { !params.SKIP_SONAR }
            }
            steps {
                script {
                    timeout(time: 5, unit: 'MINUTES') {
                        waitForQualityGate abortPipeline: true
                    }
                }
            }
        }

        // ============================================
        // 阶段 6: 构建 Docker 镜像
        // ============================================
        stage('Build Docker Image') {
            steps {
                echo '🐳 构建 Docker 镜像...'
                script {
                    docker.build("\$\{DOCKER_REGISTRY}/\${IMAGE_NAME}:\${IMAGE_TAG}")
                }
            }
        }

        // ============================================
        // 阶段 7: 推送镜像
        // ============================================
        stage('Push Image') {
            steps {
                echo '📤 推送镜像到 Harbor...'
                script {
                    docker.withRegistry("https://\$\{DOCKER_REGISTRY}", 'docker-credentials') {
                        docker.image("\$\{DOCKER_REGISTRY}/\${IMAGE_NAME}:\${IMAGE_TAG}").push()
                        docker.image("\$\{DOCKER_REGISTRY}/\${IMAGE_NAME}:\${IMAGE_TAG}").push('latest')
                    }
                }
            }
        }

        // ============================================
        // 阶段 8: 部署到 Kubernetes
        // ============================================
        stage('Deploy to K8s') {
            steps {
                echo '🚀 部署到 Kubernetes...'
                sh """
                    kubectl set image deployment/\\\${IMAGE_NAME} \\
                      \\\${IMAGE_NAME}=\\\${DOCKER_REGISTRY}/\\\${IMAGE_NAME}:\\\${IMAGE_TAG} \\
                      -n \\\${params.ENV}

                    kubectl rollout status deployment/\\\${IMAGE_NAME} -n \\\${params.ENV}
                """
            }
        }

        // ============================================
        // 阶段 9: 健康检查
        // ============================================
        stage('Health Check') {
            steps {
                echo '✅ 健康检查...'
                script {
                    // 等待 deployment 就绪
                    sh """
                        kubectl wait --for=condition=available \\
                          deployment/\\\${IMAGE_NAME} -n \\\${params.ENV} \\
                          --timeout=300s
                    """
                }
            }
        }
    }

    // ============================================
    // 构建后操作
    // ============================================
    post {
        success {
            echo '✅ 构建成功！'
            // 发送成功通知
            emailext(
                subject: "构建成功: \${env.JOB_NAME} - \${env.BUILD_NUMBER}",
                body: "构建成功！\\n\\n查看详情: \${env.BUILD_URL}",
                to: 'team@example.com'
            )
        }
        failure {
            echo '❌ 构建失败！'
            // 发送失败通知
            emailext(
                subject: "构建失败: \${env.JOB_NAME} - \${env.BUILD_NUMBER}",
                body: "构建失败！\\n\\n查看详情: \${env.BUILD_URL}",
                to: 'team@example.com'
            )
        }
        always {
            echo '🧹 清理工作空间...'
            cleanWs()
        }
    }
}`}
          />
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">4. 自动化测试集成</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-5">
            <h3 className="text-xl font-bold text-blue-900 mb-3">单元测试 (JUnit)</h3>
            <CodeBlock
              language="xml"
              code={`<!-- pom.xml -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-test</artifactId>
    <scope>test</scope>
</dependency>
<dependency>
    <groupId>org.mockito</groupId>
    <artifactId>mockito-inline</artifactId>
    <scope>test</scope>
</dependency>`}
            />
          </div>

          <div className="bg-purple-50 border-2 border-purple-200 rounded-lg p-5">
            <h3 className="text-xl font-bold text-purple-900 mb-3">集成测试 (TestContainers)</h3>
            <CodeBlock
              language="xml"
              code={`<!-- pom.xml -->
<dependency>
    <groupId>org.testcontainers</groupId>
    <artifactId>testcontainers</artifactId>
    <version>1.19.0</version>
    <scope>test</scope>
</dependency>
<dependency>
    <groupId>org.testcontainers</groupId>
    <artifactId>mysql</artifactId>
    <version>1.19.0</version>
    <scope>test</scope>
</dependency>`}
            />
          </div>

          <div className="bg-green-50 border-2 border-green-200 rounded-lg p-5">
            <h3 className="text-xl font-bold text-green-900 mb-3">覆盖率 (JaCoCo)</h3>
            <CodeBlock
              language="xml"
              code={`<!-- pom.xml -->
<plugin>
    <groupId>org.jacoco</groupId>
    <artifactId>jacoco-maven-plugin</artifactId>
    <version>0.8.10</version>
    <executions>
        <execution>
            <goals>
                <goal>prepare-agent</goal>
            </goals>
        </execution>
    </executions>
</plugin>`}
            />
          </div>
        </div>

        <div className="bg-white border-2 border-slate-200 rounded-lg p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">GitLab CI 测试配置</h3>
          <CodeBlock
            language="yaml"
            code={`# ============================================
# 单元测试
# ============================================
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
  rules:
    - if: '$CI_PIPELINE_SOURCE == "merge_request_event"'
    - if: '$CI_COMMIT_BRANCH == "main" || $CI_COMMIT_BRANCH == "develop"'

# ============================================
# 集成测试 (使用 TestContainers)
# ============================================
test:integration:
  stage: test
  image: maven:3.8.6-eclipse-temurin-17
  services:
    - name: mysql:8.0
      alias: mysql
      variables:
        MYSQL_ROOT_PASSWORD: test
        MYSQL_DATABASE: testdb
    - name: redis:7-alpine
      alias: redis
  variables:
    SPRING_DATASOURCE_URL: jdbc:mysql://mysql:3306/testdb?useSSL=false
    SPRING_DATASOURCE_USERNAME: root
    SPRAY_DATASOURCE_PASSWORD: test
    SPRING_REDIS_HOST: redis
    SPRING_REDIS_PORT: 6379
  script:
    - mvn verify -Pintegration-test
  artifacts:
    reports:
      junit: target/failsafe-reports/TEST-*.xml
  only:
    - main
    - develop

# ============================================
# 代码覆盖率检查
# ============================================
quality:coverage:
  stage: quality
  image: maven:3.8.6-eclipse-temurin-17
  script:
    - mvn jacoco:check
  allow_failure: false
  only:
    - merge_requests
    - main
    - develop`}
          />
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">5. SonarQube 代码质量检查</h2>

        <div className="bg-white border-2 border-slate-200 rounded-lg p-6 mb-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Maven 配置</h3>
          <CodeBlock
            language="xml"
            code={`<!-- pom.xml -->
<properties>
    <sonar.host.url>http://sonarqube:9000</sonar.host.url>
    <sonar.login>$\{env.SONAR_TOKEN}</sonar.login>
    <sonar.projectKey>$\{project.artifactId}</sonar.projectKey>
    <sonar.qualitygate.wait>true</sonar.qualitygate.wait>
    <sonar.coverage.jacoco.xmlReportPaths>
        target/site/jacoco/jacoco.xml
    </sonar.coverage.jacoco.xmlReportPaths>
</properties>

<build>
    <plugins>
        <!-- JaCoCo 代码覆盖率插件 -->
        <plugin>
            <groupId>org.jacoco</groupId>
            <artifactId>jacoco-maven-plugin</artifactId>
            <version>0.8.10</version>
            <executions>
                <execution>
                    <id>prepare-agent</id>
                    <goals>
                        <goal>prepare-agent</goal>
                    </goals>
                </execution>
                <execution>
                    <id>report</id>
                    <phase>test</phase>
                    <goals>
                        <goal>report</goal>
                    </goals>
                </execution>
                <execution>
                    <id>check</id>
                    <goals>
                        <goal>check</goal>
                    </goals>
                    <configuration>
                        <rules>
                            <rule>
                                <element>PACKAGE</element>
                                <limits>
                                    <limit>
                                        <counter>LINE</counter>
                                        <value>COVEREDRATIO</value>
                                        <minimum>0.80</minimum>
                                    </limit>
                                </limits>
                            </rule>
                        </rules>
                    </configuration>
                </execution>
            </executions>
        </plugin>

        <!-- SonarQube Scanner 插件 -->
        <plugin>
            <groupId>org.sonarsource.scanner.maven</groupId>
            <artifactId>sonar-maven-plugin</artifactId>
            <version>3.9.1.2184</version>
        </plugin>
    </plugins>
</build>`}
          />
        </div>

        <div className="bg-white border-2 border-slate-200 rounded-lg p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">SonarQube 质量配置</h3>
          <CodeBlock
            language="yaml"
            code={`# sonar-project.properties
sonar.projectKey=order-service
sonar.projectName=Order Service
sonar.projectVersion=1.0.0

# 源代码位置
sonar.sources=src/main/java
sonar.tests=src/test/java

# 排除文件
sonar.exclusions=**/dto/**,**/entity/**,**/config/**

# 代码覆盖率
sonar.coverage.jacoco.xmlReportPaths=target/site/jacoco/jacoco.xml
sonar.junit.reportPaths=target/surefire-reports

# 编码规则
sonar.java.source=17
sonar.java.target=17

# 质量配置文件
sonar.profile=Spring Cloud

# ============================================
# GitLab CI 集成
# ============================================
sonarqube-check:
  stage: quality
  image: maven:3.8.6-eclipse-temurin-17
  script:
    - mvn clean verify sonar:sonar \\
      -Dsonar.host.url=$SONAR_HOST_URL \\
      -Dsonar.login=$SONAR_TOKEN \\
      -Dsonar.qualitygate.wait=true
  allow_failure: true
  only:
    - merge_requests
    - main
    - develop`}
          />
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-green-50 border-2 border-green-200 rounded-lg p-5">
            <h4 className="font-bold text-green-900 mb-2">✅ 质量门禁配置</h4>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• 代码覆盖率 ≥ 80%</li>
              <li>• 新代码覆盖率 ≥ 85%</li>
              <li>• 代码重复率 ≤ 5%</li>
              <li>• Bug 密度 ≤ 3%</li>
              <li>• 漏洞密度 = 0</li>
              <li>• 安全热点 = 0</li>
            </ul>
          </div>

          <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-5">
            <h4 className="font-bold text-blue-900 mb-2">📊 质量报告指标</h4>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• 可靠性评级: A</li>
              <li>• 安全性评级: A</li>
              <li>• 可维护性评级: A</li>
              <li>• 覆盖率评级: A</li>
              <li>• 技术债务比率: &lt; 5%</li>
              <li>• 代码规范遵守率: 100%</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">6. 部署策略实战</h2>

        <div className="space-y-6">
          <StrategyCard
            name="滚动更新"
            icon="🔄"
            description="逐步替换旧版本 Pod，确保始终有实例运行"
            pros={[
              '零停机时间',
              '配置简单',
              '自动回滚',
              '资源利用率高'
            ]}
            cons={[
              '回滚较慢',
              '新旧版本共存',
              '测试窗口短'
            ]}
            useCase="适合大多数场景，推荐作为默认部署方式"
          />

          <StrategyCard
            name="蓝绿部署"
            icon="🔵🟢"
            description="准备两套完整环境，测试后切换流量"
            pros={[
              '快速回滚',
              '完整测试环境',
              '风险低',
              '切换瞬间完成'
            ]}
            cons={[
              '资源消耗大（2倍）',
              '成本高',
              '需要两套基础设施'
            ]}
            useCase="关键业务、大促活动、需要快速回滚的场景"
          />

          <StrategyCard
            name="金丝雀发布"
            icon="🐤"
            description="新版本接收部分流量，逐步扩大比例"
            pros={[
              '风险可控',
              '渐进式发布',
              '快速发现问题',
              '真实流量测试'
            ]}
            cons={[
              '需要流量控制',
              '配置复杂',
              '发布周期长'
            ]}
            useCase="重大版本更新、不确定稳定性的场景"
          />
        </div>

        <div className="bg-white border-2 border-slate-200 rounded-lg p-6 mt-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">K8s 滚动更新配置</h3>
          <CodeBlock
            language="yaml"
            code={`apiVersion: apps/v1
kind: Deployment
metadata:
  name: order-service
spec:
  replicas: 3
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxSurge: 1        # 升级过程中最多可以多出 1 个 Pod
      maxUnavailable: 0  # 升级过程中最多允许 0 个 Pod 不可用
  selector:
    matchLabels:
      app: order-service
  template:
    metadata:
      labels:
        app: order-service
    spec:
      containers:
      - name: order-service
        image: harbor.example.com/order-service:1.0.0
        ports:
        - containerPort: 8080

        # 存活探针
        livenessProbe:
          httpGet:
            path: /actuator/health/liveness
            port: 8080
          initialDelaySeconds: 60
          periodSeconds: 10
          failureThreshold: 3

        # 就绪探针
        readinessProbe:
          httpGet:
            path: /actuator/health/readiness
            port: 8080
          initialDelaySeconds: 30
          periodSeconds: 5
          failureThreshold: 3

        # 优雅关闭
        lifecycle:
          preStop:
            exec:
              command: ["sh", "-c", "sleep 10"]

      # 优雅终止宽限期
      terminationGracePeriodSeconds: 30`}
          />
        </div>

        <div className="bg-white border-2 border-slate-200 rounded-lg p-6 mt-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Istio 金丝雀配置</h3>
          <CodeBlock
            language="yaml"
            code={`# VirtualService - 流量路由
apiVersion: networking.istio.io/v1beta1
kind: VirtualService
metadata:
  name: order-service
spec:
  hosts:
  - order-service
  http:
  # 金丝雀流量 (5%)
  - match:
    - headers:
        canary:
          exact: "true"
    route:
    - destination:
        host: order-service
        subset: v2  # 金丝雀版本
      weight: 100
  # 主流量 (95% 稳定版本 + 5% 金丝雀版本)
  - route:
    - destination:
        host: order-service
        subset: v1  # 稳定版本
      weight: 95
    - destination:
        host: order-service
        subset: v2  # 金丝雀版本
      weight: 5

---
# DestinationRule - 版本定义
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
      version: v1.1

---
# 金丝雀发布流程
# 1. 部署 v2 版本 (version: v1.1)
# 2. 创建 subset v2 (接收 0% 流量)
# 3. 调整 VirtualService 权重: v1 100%, v2 0%
# 4. 逐步增加 v2 权重: 5% -> 10% -> 25% -> 50% -> 100%
# 5. 监控指标 (错误率、延迟、流量)
# 6. 发现异常立即回滚 (v2 0%)
# 7. 稳定后删除 v1 subset`}
          />
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">7. GitOps 实战 (ArgoCD)</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-green-50 border-2 border-green-200 rounded-lg p-5">
            <h3 className="text-xl font-bold text-green-900 mb-3">✅ GitOps 优势</h3>
            <ul className="text-sm text-gray-700 space-y-2">
              <li>• 声明式配置，版本可控</li>
              <li>• 自动同步状态</li>
              <li>• 易于回滚 (git revert)</li>
              <li>• 审计日志完整</li>
              <li>• 权限控制清晰 (Git PR)</li>
              <li>• 防止配置漂移</li>
            </ul>
          </div>

          <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-5">
            <h3 className="text-xl font-bold text-blue-900 mb-3">🔄 GitOps 工作流程</h3>
            <ol className="text-sm text-gray-700 space-y-2">
              <li>1. 开发提交代码到 Git</li>
              <li>2. CI 构建 Docker 镜像</li>
              <li>3. 更新 K8s manifest 中的镜像版本</li>
              <li>4. 提交 manifest 到 Git 仓库</li>
              <li>5. ArgoCD 检测到变化</li>
              <li>6. 自动同步到 K8s 集群</li>
            </ol>
          </div>
        </div>

        <div className="bg-white border-2 border-slate-200 rounded-lg p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">ArgoCD Application 配置</h3>
          <CodeBlock
            language="yaml"
            code={`apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: order-service
  namespace: argocd
  finalizers:
    - resources-finalizer.argocd.argoproj.io
spec:
  # 项目
  project: default

  # 源 (Git 仓库)
  source:
    repoURL: https://github.com/Qingyu866/springcloud-alibaba-k8s
    targetRevision: main
    path: manifests/order-service
    helm:
      valueFiles:
        - values-prod.yaml
      parameters:
        - name: image.tag
          value: "1.0.0"

  # 目标 (K8s 集群)
  destination:
    server: https://kubernetes.default.svc
    namespace: production

  # 同步策略
  syncPolicy:
    automated:
      prune: true      # 自动删除 Git 中不存在的资源
      selfHeal: true   # 自动修复配置漂移
      allowEmpty: false
    syncOptions:
      - CreateNamespace=true
      - PrunePropagationPolicy=foreground
    retry:
      limit: 5
      backoff:
        duration: 5s
        factor: 2
        maxDuration: 3m

  # 保留历史版本
  revisionHistoryLimit: 10

---
# GitOps 工作流程脚本
#!/bin/bash
# gitops-deploy.sh

set -e

APP_NAME="order-service"
GIT_REPO="git@github.com:Qingyu866/springcloud-alibaba-k8s.git"
MANIFEST_DIR="manifests/order-service"
IMAGE_TAG=$1

if [ -z "$IMAGE_TAG" ]; then
    echo "Usage: $0 <image-tag>"
    exit 1
fi

echo "🚀 开始 GitOps 部署..."

# 1. Clone Git 仓库
git clone $GIT_REPO /tmp/k8s-manifests
cd /tmp/k8s-manifests

# 2. 更新镜像版本
cd $MANIFEST_DIR
yq eval '.spec.template.spec.containers[0].image = "harbor.example.com/'$APP_NAME':'$IMAGE_TAG'"' -i deployment.yaml

# 3. 提交变更
git config user.name "CI/CD Pipeline"
git config user.email "ci@example.com"
git add deployment.yaml
git commit -m "chore: update $APP_NAME image to $IMAGE_TAG"

# 4. 推送到远程仓库
git push origin main

echo "✅ GitOps 部署完成！"
echo "📊 查看同步状态: argocd app get $APP_NAME"`}
          />
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">8. 完整 CI/CD 流水线实战案例</h2>

        <div className="bg-white border-2 border-slate-200 rounded-lg p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">完整 GitLab CI 配置</h3>
          <CodeBlock
            language="yaml"
            code={`# .gitlab-ci.yml - 完整 CI/CD 流水线
# Spring Cloud Alibaba 微服务项目

variables:
  MAVEN_OPTS: "-Dmaven.repo.local=.m2/repository"
  DOCKER_DRIVER: overlay2
  DOCKER_TLS_CERTDIR: "/certs"
  IMAGE_REGISTRY: harbor.example.com
  PROJECT_NAME: order-service

# 定义所有阶段
stages:
  - build
  - test
  - quality
  - security
  - docker
  - deploy-staging
  - test-staging
  - deploy-production

# ============================================
# 全局配置
# ============================================
default:
  tags:
    - docker
  retry:
    max: 2
    when:
      - runner_system_failure

# ============================================
# 阶段 1: 构建
# ============================================
build:
  stage: build
  image: maven:3.8.6-eclipse-temurin-17
  cache:
    key: \${CI_COMMIT_REF_SLUG}
    paths:
      - .m2/repository/
  script:
    - echo "🔨 构建项目..."
    - mvn clean compile
    - mvn package -DskipTests -Dmaven.test.failure.ignore=false
  artifacts:
    paths:
      - target/*.jar
    reports:
      junit: target/surefire-reports/TEST-*.xml
    expire_in: 1 hour
  only:
    - main
    - develop
    - merge_requests

# ============================================
# 阶段 2: 单元测试
# ============================================
test:unit:
  stage: test
  image: maven:3.8.6-eclipse-temurin-17
  dependencies:
    - build
  cache:
    key: \${CI_COMMIT_REF_SLUG}
    paths:
      - .m2/repository/
    policy: pull
  script:
    - echo "🧪 运行单元测试..."
    - mvn test
  coverage: '/Total.*?([0-9]{1,3})%/'
  artifacts:
    reports:
      junit: target/surefire-reports/TEST-*.xml
    coverage_report:
      coverage_format: cobertura
      path: target/site/jacoco/jacoco.xml
  only:
    - main
    - develop
    - merge_requests

# ============================================
# 阶段 3: 集成测试
# ============================================
test:integration:
  stage: test
  image: maven:3.8.6-eclipse-temurin-17
  services:
    - name: mysql:8.0
      alias: mysql
      variables:
        MYSQL_ROOT_PASSWORD: test
        MYSQL_DATABASE: testdb
    - name: redis:7-alpine
      alias: redis
  variables:
    SPRING_DATASOURCE_URL: jdbc:mysql://mysql:3306/testdb?useSSL=false
    SPRING_DATASOURCE_USERNAME: root
    SPRING_DATASOURCE_PASSWORD: test
    SPRING_REDIS_HOST: redis
    SPRING_REDIS_PORT: 6379
  dependencies:
    - build
  script:
    - echo "🔧 运行集成测试..."
    - mvn verify -Pintegration-test
  artifacts:
    reports:
      junit: target/failsafe-reports/TEST-*.xml
  only:
    - main
    - develop

# ============================================
# 阶段 4: 代码质量检查
# ============================================
quality:sonarqube:
  stage: quality
  image: maven:3.8.6-eclipse-temurin-17
  dependencies:
    - build
  script:
    - echo "🔍 SonarQube 代码质量分析..."
    - mvn sonar:sonar \\
      -Dsonar.host.url=$SONAR_HOST_URL \\
      -Dsonar.login=$SONAR_TOKEN \\
      -Dsonar.projectKey=$PROJECT_NAME \\
      -Dsonar.coverage.jacoco.xmlReportPaths=target/site/jacoco/jacoco.xml
  allow_failure: true
  only:
    - main
    - develop

# ============================================
# 阶段 5: 安全扫描
# ============================================
security:sast:
  stage: security
  image: sonarsource/sonar-scanner-cli:latest
  script:
    - echo "🔒 SAST 代码安全扫描..."
    - sonar-scanner \\
      -Dsonar.host.url=$SONAR_HOST_URL \\
      -Dsonar.login=$SONAR_TOKEN \\
      -Dsonar.projectKey=$PROJECT_NAME
  allow_failure: true
  only:
    - main
    - develop

security:dependency-scan:
  stage: security
  image: maven:3.8.6-eclipse-temurin-17
  script:
    - echo "📦 依赖安全扫描..."
    - mvn org.owasp:dependency-check-maven:check
  allow_failure: true
  artifacts:
    reports:
      sast: target/dependency-check-report.xml
  only:
    - main
    - develop

security:container-scan:
  stage: security
  image: aquasec/trivy:latest
  script:
    - echo "🐳 容器镜像安全扫描..."
    - trivy image --severity HIGH,CRITICAL $IMAGE_REGISTRY/$PROJECT_NAME:$CI_COMMIT_SHORT_SHA
  allow_failure: true
  only:
    - main
    - develop

# ============================================
# 阶段 6: 构建 Docker 镜像
# ============================================
docker:build:
  stage: docker
  image: docker:24-dind
  services:
    - docker:24-dind
  before_script:
    - echo $HARBOR_PASSWORD | docker login -u $HARBOR_USERNAME --password-stdin $IMAGE_REGISTRY
  script:
    - echo "🐳 构建 Docker 镜像..."
    - docker build -t $IMAGE_REGISTRY/$PROJECT_NAME:$CI_COMMIT_SHORT_SHA .
    - docker push $IMAGE_REGISTRY/$PROJECT_NAME:$CI_COMMIT_SHORT_SHA
    - |
      if [ "$CI_COMMIT_BRANCH" == "main" ]; then
        docker tag $IMAGE_REGISTRY/$PROJECT_NAME:$CI_COMMIT_SHORT_SHA $IMAGE_REGISTRY/$PROJECT_NAME:latest
        docker push $IMAGE_REGISTRY/$PROJECT_NAME:latest
      fi
    - |
      if [ "$CI_COMMIT_BRANCH" == "develop" ]; then
        docker tag $IMAGE_REGISTRY/$PROJECT_NAME:$CI_COMMIT_SHORT_SHA $IMAGE_REGISTRY/$PROJECT_NAME:dev
        docker push $IMAGE_REGISTRY/$PROJECT_NAME:dev
      fi
  only:
    - main
    - develop

# ============================================
# 阶段 7: 部署到测试环境
# ============================================
deploy:staging:
  stage: deploy-staging
  image: bitnami/kubectl:latest
  environment:
    name: staging
    url: https://staging-api.example.com
  script:
    - echo "🚀 部署到测试环境..."
    - kubectl set image deployment/$PROJECT_NAME \\
      $PROJECT_NAME=$IMAGE_REGISTRY/$PROJECT_NAME:$CI_COMMIT_SHORT_SHA -n staging
    - kubectl rollout status deployment/$PROJECT_NAME -n staging
    - echo "⏳ 等待应用就绪..."
    - kubectl wait --for=condition=available deployment/$PROJECT_NAME -n staging --timeout=300s
  only:
    - develop
  when: manual

# ============================================
# 阶段 8: 测试环境 E2E 测试
# ============================================
test:e2e-staging:
  stage: test-staging
  image: node:18
  dependencies:
    - deploy:staging
  script:
    - echo "🌐 运行 E2E 测试..."
    - npm install
    - npm run test:e2e
  artifacts:
    when: always
    paths:
      - cypress/videos/
      - cypress/screenshots/
    expire_in: 1 day
  only:
    - develop

# ============================================
# 阶段 9: 部署到生产环境
# ============================================
deploy:production:
  stage: deploy-production
  image: bitnami/kubectl:latest
  environment:
    name: production
    url: https://api.example.com
  script:
    - echo "🚀 部署到生产环境..."
    - kubectl set image deployment/$PROJECT_NAME \\
      $PROJECT_NAME=$IMAGE_REGISTRY/$PROJECT_NAME:$CI_COMMIT_SHORT_SHA -n production
    - kubectl rollout status deployment/$PROJECT_NAME -n production
    - echo "⏳ 等待应用就绪..."
    - kubectl wait --for=condition=available deployment/$PROJECT_NAME -n production --timeout=600s
    - echo "✅ 生产环境部署完成！"
  only:
    - main
  when: manual`}
          />
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
              <li>✓ 使用 artifacts 共享构建产物</li>
            </ul>
          </div>

          <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-5">
            <h3 className="text-xl font-bold text-blue-900 mb-3">安全加固</h3>
            <ul className="text-sm text-gray-700 space-y-2">
              <li>✓ 扫描镜像漏洞 (Trivy)</li>
              <li>✓ SAST 代码安全扫描</li>
              <li>✓ SCA 依赖检查 (OWASP)</li>
              <li>✓ 密钥使用 Secret 管理</li>
              <li>✓ 最小权限原则</li>
              <li>✓ 定期更新基础镜像</li>
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
              <li>✓ 集成 Prometheus 监控</li>
            </ul>
          </div>
        </div>

        <div className="bg-white border-2 border-slate-200 rounded-lg p-6 mt-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">性能优化配置示例</h3>
          <CodeBlock
            language="yaml"
            code={`# ============================================
# Docker 多阶段构建优化
# ============================================
# Dockerfile
FROM maven:3.8.6-eclipse-temurin-17 AS build
WORKDIR /app
COPY pom.xml .
RUN mvn dependency:go-offline
COPY src ./src
RUN mvn clean package -DskipTests

FROM eclipse-temurin:17-jre-alpine
RUN addgroup -S spring && adduser -S spring -G spring
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar
RUN chown -R spring:spring /app
USER spring
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]

---
# .dockerignore
target/
.git/
.gitignore
*.md
Dockerfile
.dockerignore

---
# ============================================
# Maven 依赖缓存
# ============================================
# .gitlab-ci.yml
build:
  cache:
    key: \${CI_COMMIT_REF_SLUG}
    paths:
      - .m2/repository/
      - target/

---
# ============================================
# 并行执行测试
# ============================================
# pom.xml
<plugin>
    <groupId>org.apache.maven.plugins</groupId>
    <artifactId>maven-surefire-plugin</artifactId>
    <configuration>
        <parallel>methods</parallel>
        <threadCount>4</threadCount>
        <perCoreThreadCount>true</perCoreThreadCount>
    </configuration>
</plugin>`}
          />
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
          <FaqCard
            number={4}
            question="如何在 CI/CD 中实现数据库迁移？"
            answer={"数据库迁移方案：\n\n1. Flyway 版本控制\n   ```sql\n   # V1__Create_orders_table.sql\n   CREATE TABLE orders (...);\n   \n   # V2__Add_status_column.sql\n   ALTER TABLE orders ADD COLUMN status VARCHAR(20);\n   ```\n\n2. GitLab CI 集成\n   ```yaml\n   migrate:database:\n     stage: migrate\n     image: maven:3.8.6-eclipse-temurin-17\n     script:\n       - mvn flyway:migrate\n     environment:\n       name: production\n     when: manual\n   ```\n\n3. 零停机迁移策略\n   - 先扩展字段（非破坏性）\n   - 双写新旧字段\n   - 回填数据\n   - 切换应用读取新字段\n   - 下一个版本删除旧字段\n\n4. 回滚方案\n   - 每个迁移脚本提供 rollback 脚本\n   - GitLab CI 失败自动执行 rollback"}
            isOpen={openFaq === 4}
            onClick={() => toggleFaq(4)}
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
