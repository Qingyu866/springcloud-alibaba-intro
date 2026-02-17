import { useState } from 'react';
import { CodeBlock } from '../components';

interface BestPracticeCardProps {
  title: string;
  level: 'beginner' | 'intermediate' | 'architect';
  practices: string[];
}

const BestPracticeCard: React.FC<BestPracticeCardProps> = ({ title, level, practices }) => {
  const levelConfig = {
    beginner: { icon: '🌱', label: '基础', color: 'bg-green-50 border-green-200' },
    intermediate: { icon: '🔧', label: '进阶', color: 'bg-blue-50 border-blue-200' },
    architect: { icon: '🏗️', label: '高级', color: 'bg-purple-50 border-purple-200' },
  };

  return (
    <div className={`p-5 border-2 rounded-lg ${levelConfig[level].color}`}>
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-xl font-bold text-gray-900">{title}</h3>
        <span className="text-xs px-2 py-1 bg-white rounded">
          {levelConfig[level].icon} {levelConfig[level].label}
        </span>
      </div>
      <ul className="space-y-2">
        {practices.map((practice, index) => (
          <li key={index} className="flex items-start">
            <span className="text-green-600 mr-2 flex-shrink-0">✓</span>
            <span className="text-sm text-gray-700">{practice}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

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

export const DockerDeploymentPage: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="bg-gradient-to-r from-blue-700 to-blue-900 text-white rounded-lg p-6 mb-8">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-4xl font-bold mb-2">Docker 部署</h1>
            <p className="text-blue-100 text-lg">微服务容器化部署实战</p>
          </div>
          <div className="flex gap-3 text-sm">
            <span className="px-3 py-1 bg-white/20 rounded-full">🔧 中级</span>
            <span className="px-3 py-1 bg-white/20 rounded-full">⏱️ 约70分钟</span>
            <span className="px-3 py-1 bg-white/20 rounded-full">📚 11个知识点</span>
          </div>
        </div>
      </div>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">为什么使用 Docker?</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-red-50 border-2 border-red-200 rounded-lg p-5">
            <h3 className="text-xl font-bold text-red-900 mb-3">❌ 传统部署痛点</h3>
            <ul className="text-gray-700 space-y-2">
              <li>• "在我的机器上能跑"问题</li>
              <li>• 环境配置复杂，依赖冲突</li>
              <li>• 部署耗时长，扩展困难</li>
              <li>• 资源利用率低</li>
              <li>• 难以实现自动化</li>
            </ul>
          </div>

          <div className="bg-green-50 border-2 border-green-200 rounded-lg p-5">
            <h3 className="text-xl font-bold text-green-900 mb-3">✅ Docker 部署优势</h3>
            <ul className="text-gray-700 space-y-2">
              <li>• 环境一致性：开发测试生产环境一致</li>
              <li>• 快速部署：秒级启动服务</li>
              <li>• 资源隔离：高效利用服务器资源</li>
              <li>• 易扩展：快速横向扩展</li>
              <li>• DevOps 友好：支持 CI/CD</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">1. Dockerfile 编写最佳实践</h2>

        <div className="space-y-6">
          <div className="bg-white border-2 border-blue-200 rounded-lg p-6">
            <h3 className="text-2xl font-bold text-blue-900 mb-4">多阶段构建优化镜像大小</h3>

            <CodeBlock
              language="dockerfile"
              code={`# 阶段1: Maven 构建阶段
FROM maven:3.8-openjdk-17 AS builder
WORKDIR /app

# 只复制依赖文件，利用 Docker 缓存
COPY pom.xml .
RUN mvn dependency:go-offline -B

# 复制源代码并构建
COPY src ./src
RUN mvn clean package -DskipTests -o

# 阶段2: 运行阶段（使用更小的基础镜像）
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app

# 从构建阶段复制 JAR 文件
COPY --from=builder /app/target/*.jar app.jar

# 非root 用户运行（安全）
RUN addgroup -S spring && adduser -S spring -G spring
USER spring:root

# 暴露端口
EXPOSE 8080

# 健康检查
HEALTHCHECK --interval=30s --timeout=3s \
  CMD curl -f http://localhost:8080/actuator/health || exit 1

# JVM 参数优化
ENV JAVA_OPTS="-Xmx512m -Xms512m -XX:+UseG1GC"

# 启动应用
ENTRYPOINT ["sh", "-c", "java $JAVA_OPTS -jar /app/app.jar"]`}
            />
          </div>

          <div className="bg-white border-2 border-green-200 rounded-lg p-6">
            <h3 className="text-2xl font-bold text-green-900 mb-4">镜像优化技巧</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-green-50 p-4 rounded">
                <h4 className="font-bold text-green-900 mb-2">使用 .dockerignore</h4>
                <CodeBlock
                  language="dockerfile"
                  code={`# .dockerignore
target/
*.jar
*.class
.git/
.gitignore
README.md
.DS_Store
node_modules/
.vscode/`}
                />
              </div>

              <div className="bg-green-50 p-4 rounded">
                <h4 className="font-bold text-green-900 mb-2">合并 RUN 指令</h4>
                <CodeBlock
                  language="dockerfile"
                  code={`# 不好的做法
RUN apt-get update
RUN apt-get install -y curl
RUN apt-get install -y wget

# 好的做法
RUN apt-get update && \
    apt-get install -y curl wget && \
    apt-get clean && rm -rf /var/lib/apt/lists/*`}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">2. Docker Compose 微服务编排</h2>

        <div className="bg-white border-2 border-purple-200 rounded-lg p-6 mb-6">
          <h3 className="text-2xl font-bold text-purple-900 mb-4">微服务编排示例</h3>

          <CodeBlock
            language="yaml"
            code={`version: '3.8'

services:
  # Nacos 服务发现与配置中心
  nacos:
    image: nacos/nacos-server:v2.2.3
    container_name: nacos
    environment:
      - MODE=standalone
      - SPRING_DATASOURCE_PLATFORM=mysql
      - MYSQL_SERVICE_HOST=mysql
      - MYSQL_SERVICE_DB_NAME=nacos_config
      - MYSQL_SERVICE_USER=root
      - MYSQL_SERVICE_PASSWORD=root
    ports:
      - "8848:8848"
      - "9848:9848"
    depends_on:
      - mysql
    networks:
      - spring-cloud
    restart: unless-stopped

  # MySQL 数据库
  mysql:
    image: mysql:8.0
    container_name: mysql
    environment:
      - MYSQL_ROOT_PASSWORD=root
      - MYSQL_DATABASE=nacos_config
      - MYSQL_USER=nacos
      - MYSQL_PASSWORD=nacos
    volumes:
      - mysql-data:/var/lib/mysql
    ports:
      - "3306:3306"
    networks:
      - spring-cloud
    restart: unless-stopped

  # Redis 缓存
  redis:
    image: redis:7-alpine
    container_name: redis
    ports:
      - "6379:6379"
    volumes:
      - redis-data:/data
    command: redis-server --appendonly yes
    networks:
      - spring-cloud
    restart: unless-stopped

  # 订单服务
  order-service:
    build:
      context: ./order-service
      dockerfile: Dockerfile
    container_name: order-service
    environment:
      - SPRING_PROFILES_ACTIVE=prod
      - SPRING_CLOUD_NACOS_SERVER_ADDR=nacos:8848
      - SPRING_DATASOURCE_URL=jdbc:mysql://mysql:3306/order_db?useSSL=false
      - SPRING_DATASOURCE_USERNAME=root
      - SPRING_DATASOURCE_PASSWORD=root
      - SPRING_REDIS_HOST=redis
      - SPRING_REDIS_PORT=6379
    ports:
      - "8081:8080"
    depends_on:
      - nacos
      - mysql
      - redis
    networks:
      - spring-cloud
    restart: unless-stopped

  # 库存服务
  inventory-service:
    build:
      context: ./inventory-service
      dockerfile: Dockerfile
    container_name: inventory-service
    environment:
      - SPRING_PROFILES_ACTIVE=prod
      - SPRING_CLOUD_NACOS_SERVER_ADDR=nacos:8848
    ports:
      - "8082:8080"
    depends_on:
      - nacos
    networks:
      - spring-cloud
    restart: unless-stopped

  # Sentinel Dashboard
  sentinel:
    image: bladex/sentinel-dashboard:1.8.6
    container_name: sentinel
    ports:
      - "8858:8858"
    networks:
      - spring-cloud
    restart: unless-stopped

  # SkyWalking APM
  skywalking-oap:
    image: apache/skywalking-oap-server:8.9.1
    container_name: skywalking-oap
    environment:
      - SW_STORAGE=elasticsearch
      - SW_ES_CLUSTER_NODES=elasticsearch:9200
    ports:
      - "11800:11800"
      - "12800:12800"
    depends_on:
      - elasticsearch
    networks:
      - spring-cloud
    restart: unless-stopped

  skywalking-ui:
    image: apache/skywalking-ui:8.9.1
    container_name: skywalking-ui
    environment:
      - SW_OAP_ADDRESS=http://skywalking-oap:12800
    ports:
      - "8080:8080"
    depends_on:
      - skywalking-oap
    networks:
      - spring-cloud
    restart: unless-stopped

networks:
  spring-cloud:
    driver: bridge

volumes:
  mysql-data:
  redis-data:
  es-data:`}
          />
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">3. 容器网络与存储</h2>

        <div className="space-y-6">
          <div className="bg-white border-2 border-blue-200 rounded-lg p-6">
            <h3 className="text-2xl font-bold text-blue-900 mb-4">Docker 网络模式</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-blue-50 p-4 rounded">
                <h4 className="font-bold text-blue-900 mb-2">Bridge 模式（默认）</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• 容器独立网络命名空间</li>
                  <li>• 通过端口映射访问</li>
                  <li>• 适合单主机部署</li>
                </ul>
              </div>

              <div className="bg-blue-50 p-4 rounded">
                <h4 className="font-bold text-blue-900 mb-2">Host 模式</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• 容器共享主机网络</li>
                  <li>• 网络性能最好</li>
                  <li>• 端口不能冲突</li>
                </ul>
              </div>

              <div className="bg-blue-50 p-4 rounded">
                <h4 className="font-bold text-blue-900 mb-2">Overlay 网络</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• 跨主机容器通信</li>
                  <li>• 使用 VXLAN 技术</li>
                  <li>• 适合 Swarm/K8s</li>
                </ul>
              </div>

              <div className="bg-blue-50 p-4 rounded">
                <h4 className="font-bold text-blue-900 mb-2">自定义网络</h4>
                <CodeBlock
                  language="bash"
                  code={`# 创建自定义网络
docker network create --driver bridge spring-cloud

# 容器加入网络
docker run -d --network spring-cloud --name app1 app:latest
docker run -d --network spring-cloud --name app2 app:latest

# 容器间可以通过容器名访问
# app1 可以 ping 通 app2`}
                />
              </div>
            </div>
          </div>

          <div className="bg-white border-2 border-green-200 rounded-lg p-6">
            <h3 className="text-2xl font-bold text-green-900 mb-4">数据持久化</h3>

            <CodeBlock
              language="bash"
              code={`# 1. 创建数据卷
docker volume create mysql-data

# 2. 挂载到容器
docker run -d \
  --name mysql \
  -v mysql-data:/var/lib/mysql \
  mysql:8.0

# 3. 查看数据卷
docker volume inspect mysql-data

# 4. 备份数据卷
docker run --rm -v mysql-data:/data -v $(pwd):/backup alpine tar czf /backup/backup.tar.gz /data

# 5. 删除数据卷（慎用）
docker volume rm mysql-data`}
            />
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">4. 容器管理命令</h2>

        <div className="bg-white border-2 border-slate-200 rounded-lg p-6">
          <CodeBlock
            language="bash"
            code={`# 镜像管理
docker images                          # 查看镜像
docker build -t myapp:1.0 .               # 构建镜像
docker tag myapp:1.0 myapp:latest       # 打标签
docker push registry/myapp:1.0            # 推送镜像
docker rmi myapp:1.0                      # 删除镜像

# 容器管理
docker ps                                # 查看运行中容器
docker ps -a                             # 查看所有容器
docker run -d myapp:1.0                  # 后台运行容器
docker exec -it myapp sh                   # 进入容器
docker logs myapp                       # 查看日志
docker stop myapp                       # 停止容器
docker start myapp                      # 启动容器
docker rm myapp                          # 删除容器

# 资源监控
docker stats                              # 容器资源使用
docker top myapp                        # 容器进程

# 清理
docker system prune -a                   # 清理所有未使用的资源
docker volume prune                      # 清理未使用的数据卷`}
          />
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">5. 生产环境部署实战案例</h2>
        <p className="text-gray-600 mb-6">完整的生产级电商微服务 Docker Compose 配置示例，包含健康检查、资源限制、网络隔离和日志管理。</p>

        <div className="bg-white border-2 border-blue-200 rounded-lg p-6">
          <h3 className="text-2xl font-bold text-blue-900 mb-4">电商微服务完整配置</h3>

          <CodeBlock
            language="yaml"
            code={`version: '3.8'

services:
  # Gateway网关
  gateway:
    image: your-registry/gateway:latest
    container_name: gateway
    ports:
      - "9090:9090"
    environment:
      - SPRING_PROFILES_ACTIVE=prod
      - SPRING_CLOUD_NACOS_SERVER_ADDR=nacos:8848
      - JAVA_OPTS=-Xmx512m -Xms512m
    networks:
      - microservices
    depends_on:
      - nacos
      - redis
    restart: always
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:9090/actuator/health"]
      interval: 30s
      timeout: 10s
      retries: 3

  # 用户服务
  user-service:
    image: your-registry/user-service:latest
    container_name: user-service
    ports:
      - "8081:8081"
    environment:
      - SPRING_PROFILES_ACTIVE=prod
      - SPRING_DATASOURCE_URL=jdbc:mysql://mysql:3306/user_db?useSSL=false
      - SPRING_DATASOURCE_USERNAME=root
      - SPRING_DATASOURCE_PASSWORD=\${MYSQL_PASSWORD}
      - JAVA_OPTS=-Xmx512m -Xms512m
    volumes:
      - user-service-logs:/var/log
    networks:
      - microservices
    depends_on:
      - nacos
      - mysql
      - redis
    restart: always
    deploy:
      replicas: 3
      resources:
        limits:
          memory: 1G
          cpus: '0.5'
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:8081/actuator/health"]
      interval: 30s
      timeout: 10s
      retries: 3

  # 订单服务
  order-service:
    image: your-registry/order-service:latest
    container_name: order-service
    ports:
      - "8082:8082"
    environment:
      - SPRING_PROFILES_ACTIVE=prod
      - JAVA_OPTS=-Xmx768m -Xms768m
    networks:
      - microservices
    depends_on:
      - nacos
      - mysql
      - redis
      - user-service
    restart: always
    deploy:
      replicas: 3
      resources:
        limits:
          memory: 1.5G
          cpus: '1'
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:8082/actuator/health"]
      interval: 30s
      timeout: 10s
      retries: 3

  # 支付服务
  payment-service:
    image: your-registry/payment-service:latest
    container_name: payment-service
    ports:
      - "8083:8083"
    environment:
      - SPRING_PROFILES_ACTIVE=prod
      - JAVA_OPTS=-Xmx512m -Xms512m
    networks:
      - microservices
    depends_on:
      - nacos
      - mysql
      - redis
    restart: always
    deploy:
      replicas: 2
      resources:
        limits:
          memory: 1G
          cpus: '0.5'
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:8083/actuator/health"]
      interval: 30s
      timeout: 10s
      retries: 3

  # Nacos服务发现
  nacos:
    image: nacos/nacos-server:v2.2.3
    container_name: nacos
    ports:
      - "8848:8848"
      - "9848:9848"
    environment:
      - MODE=standalone
      - SPRING_DATASOURCE_PLATFORM=mysql
      - MYSQL_SERVICE_HOST=mysql
      - MYSQL_SERVICE_DB_NAME=nacos_config
      - MYSQL_SERVICE_USER=root
      - MYSQL_SERVICE_PASSWORD=\${NACOS_MYSQL_PASSWORD}
    volumes:
      - nacos-logs:/home/nacos/logs
    networks:
      - microservices
    depends_on:
      - mysql
    restart: always

  # MySQL数据库
  mysql:
    image: mysql:8.0
    container_name: mysql
    ports:
      - "3306:3306"
    environment:
      - MYSQL_ROOT_PASSWORD=\${MYSQL_ROOT_PASSWORD}
      - MYSQL_DATABASE=ecommerce
      - MYSQL_USER=app
      - MYSQL_PASSWORD=\${MYSQL_PASSWORD}
    volumes:
      - mysql-data:/var/lib/mysql
      - ./init-sql:/docker-entrypoint-initdb.d
    networks:
      - microservices
    command:
      - --default-authentication-plugin=mysql_native_password
      - --character-set-server=utf8mb4
      - --collation-server=utf8mb4_unicode_ci
    restart: always
    healthcheck:
      test: ["CMD", "mysqladmin", "ping", "-h", "localhost", "-u", "root", "-p\${MYSQL_ROOT_PASSWORD}"]
      interval: 10s
      timeout: 5s
      retries: 5

  # Redis缓存
  redis:
    image: redis:7-alpine
    container_name: redis
    ports:
      - "6379:6379"
    volumes:
      - redis-data:/data
      - ./redis.conf:/usr/local/etc/redis/redis.conf
    command: redis-server /usr/local/etc/redis/redis.conf
    networks:
      - microservices
    restart: always
    healthcheck:
      test: ["CMD", "redis", "ping"]
      interval: 10s
      timeout: 5s
      retries: 5

networks:
  microservices:
    driver: bridge
    ipam:
      driver: default
      config:
        - subnet: 172.20.0.0/16

volumes:
  user-service-logs:
  mysql-data:
  nacos-logs:
  redis-data:`}
          />
        </div>

        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h4 className="font-bold text-blue-900 mb-2">核心配置说明</h4>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>• <strong>健康检查</strong>: 所有服务配置 healthcheck,自动重启失败容器</li>
            <li>• <strong>资源限制</strong>: 通过 deploy.resources 限制 CPU 和内存</li>
            <li>• <strong>高可用</strong>: 核心服务配置 replicas 实现多副本部署</li>
            <li>• <strong>数据持久化</strong>: 使用 volumes 管理数据和日志</li>
            <li>• <strong>网络隔离</strong>: 自定义网络隔离微服务通信</li>
          </ul>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">6. Docker 安全扫描与加固</h2>
        <p className="text-gray-600 mb-6">使用专业工具进行镜像安全扫描和基线检查,确保容器环境的安全性。</p>

        <div className="space-y-6">
          <div className="bg-white border-2 border-red-200 rounded-lg p-6">
            <h3 className="text-2xl font-bold text-red-900 mb-4">Trivy 镜像漏洞扫描</h3>

            <CodeBlock
              language="bash"
              code={`# 安装Trivy
curl -sfL https://raw.githubusercontent.com/aquasecurity/trivy/main/install.sh | sh -s -- -b /usr/local/bin/trivy

# 扫描镜像
trivy image your-registry/user-service:latest

# 扫描并生成报告
trivy image --format json -o report.json your-registry/user-service:latest

# 只扫描高危和严重漏洞
trivy image --severity HIGH,CRITICAL your-registry/user-service:latest

# 扫描不生成报告,直接输出
trivy image --no-progress your-registry/user-service:latest

# 扫描文件系统
trivy fs /path/to/project`}
            />
          </div>

          <div className="bg-white border-2 border-orange-200 rounded-lg p-6">
            <h3 className="text-2xl font-bold text-orange-900 mb-4">Docker Bench 安全基线检查</h3>

            <CodeBlock
              language="bash"
              code={`# 运行Docker Bench Security检查
docker run --rm --net host \\
  -v /var/run/docker.sock:/var/run/docker.sock \\
  -v /usr/lib/docker/plugins:/usr/lib/docker/plugins \\
  docker/docker-bench-security

# 只运行特定测试
docker run --rm --net host \\
  -v /var/run/docker.sock:/var/run/docker.sock \\
  docker/docker-bench-security \\
  -check 1,2,3

# 生成JSON报告
docker run --rm --net host \\
  -v /var/run/docker.sock:/var/run/docker.sock \\
  -v /tmp:/output \\
  docker/docker-bench-security \\
  -format json \\
  -output /tmp/report.json`}
            />
          </div>

          <div className="bg-white border-2 border-green-200 rounded-lg p-6">
            <h3 className="text-2xl font-bold text-green-900 mb-4">Dockerfile 安全加固最佳实践</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-green-50 p-4 rounded">
                <h4 className="font-bold text-green-900 mb-2">使用非root用户</h4>
                <CodeBlock
                  language="dockerfile"
                  code={`FROM eclipse-temurin:17-jre-alpine

# 创建非root用户
RUN addgroup -S spring && adduser -S spring -G spring
USER spring:root

# 其他配置...
USER spring`}
                />
              </div>

              <div className="bg-green-50 p-4 rounded">
                <h4 className="font-bold text-green-900 mb-2">最小化镜像</h4>
                <CodeBlock
                  language="dockerfile"
                  code={`# 使用alpine基础镜像
FROM eclipse-temurin:17-jre-alpine

# 只安装必要的包
RUN apk add --no-cache curl

# 清理缓存
RUN rm -rf /tmp/* /var/cache/*`}
                />
              </div>

              <div className="bg-green-50 p-4 rounded">
                <h4 className="font-bold text-green-900 mb-2">启用Content Trust</h4>
                <CodeBlock
                  language="bash"
                  code={`# 启用Docker Content Trust
export DOCKER_CONTENT_TRUST=1

# 推送签名镜像
docker push your-registry/app:signed`}
                />
              </div>

              <div className="bg-green-50 p-4 rounded">
                <h4 className="font-bold text-green-900 mb-2">安全扫描集成CI/CD</h4>
                <CodeBlock
                  language="yaml"
                  code={`# .github/workflows/docker-scan.yml
- name: Build image
  run: docker build -t myapp:latest .

- name: Run Trivy
  uses: aquasecurity/trivy-action@master
  with:
    image-ref: myapp:latest
    format: 'sarif'
    output: 'trivy-results.sarif'

- name: Upload results
  uses: github/codeql-action/upload-sarif@v2
  with:
    sarif_file: 'trivy-results.sarif'`}
                />
              </div>
            </div>

            <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <h4 className="font-bold text-yellow-900 mb-2">安全加固建议清单</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>✓ 使用非root用户运行容器</li>
                <li>✓ 选择最小化的基础镜像(alpine/distroless)</li>
                <li>✓ 定期更新基础镜像和依赖</li>
                <li>✓ 扫描镜像漏洞并修复高危CVE</li>
                <li>✓ 启用Docker Content Trust</li>
                <li>✓ 限制容器capabilities(PID、NET等)</li>
                <li>✓ 使用read-only文件系统(如果可能)</li>
                <li>✓ 避免在镜像中硬编码敏感信息</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">7. 镜像优化进阶技巧</h2>
        <p className="text-gray-600 mb-6">通过多阶段构建、Layer缓存优化和瘦身技巧,将镜像体积从600MB降至200MB以下。</p>

        <div className="space-y-6">
          <div className="bg-white border-2 border-purple-200 rounded-lg p-6">
            <h3 className="text-2xl font-bold text-purple-900 mb-4">多阶段构建优化</h3>

            <CodeBlock
              language="dockerfile"
              code={`# 构建阶段
FROM maven:3.8-openjdk-17 AS builder

WORKDIR /build

# 只复制依赖文件,利用缓存
COPY pom.xml .
RUN mvn dependency:go-offline -B

# 复制源代码
COPY src ./src

# 构建
RUN mvn clean package -DskipTests -o && \\
    mv target/*.jar app.jar

# 分析jar包依赖
RUN jdeps --ignore-missing-deps --print-jar app.jar > deps.txt

# 运行阶段(最小化镜像)
FROM eclipse-temurin:17-jre-alpine

# 安装必要的库(根据deps.txt)
RUN apk add --no-cache \\
    $(grep -E '^(lib|libc|gcc)' deps.txt | tr '\\\\n' ' ')

# 创建非root用户
RUN addgroup -S spring && adduser -S spring -G spring

WORKDIR /app

# 复制jar包
COPY --from=builder /build/app.jar app.jar

# 暴露端口
EXPOSE 8080

# 健康检查
HEALTHCHECK --interval=30s --timeout=3s \\
  CMD curl -f http://localhost:8080/actuator/health || exit 1

# JVM参数优化
ENV JAVA_OPTS="-Xmx512m -Xms512m -XX:+UseG1GC -XX:MaxGCPauseMillis=200"

# 运行
ENTRYPOINT ["sh", "-c", "java $JAVA_OPTS -Djava.security.egd=file:/dev/./urandom -jar /app/app.jar"]

# 非root用户
USER spring`}
            />

            <div className="mt-4 p-4 bg-purple-50 border border-purple-200 rounded-lg">
              <h4 className="font-bold text-purple-900 mb-2">优化要点</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• <strong>分层缓存</strong>: 依赖层(pom.xml)在前,源码层在后</li>
                <li>• <strong>依赖分析</strong>: jdeps分析依赖,只安装必要库</li>
                <li>• <strong>阶段隔离</strong>: 构建工具(Maven)不会进入最终镜像</li>
                <li>• <strong>用户隔离</strong>: 使用非root用户提升安全性</li>
              </ul>
            </div>
          </div>

          <div className="bg-white border-2 border-blue-200 rounded-lg p-6">
            <h3 className="text-2xl font-bold text-blue-900 mb-4">Layer 缓存优化策略</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-blue-50 p-4 rounded">
                <h4 className="font-bold text-blue-900 mb-2">正确做法(利用缓存)</h4>
                <CodeBlock
                  language="dockerfile"
                  code={`# 依赖层(很少变化)
COPY pom.xml .
RUN mvn dependency:go-offline -B

# 源代码层(经常变化)
COPY src ./src
RUN mvn clean package -DskipTests -o`}
                />
              </div>

              <div className="bg-red-50 p-4 rounded">
                <h4 className="font-bold text-red-900 mb-2">错误做法(缓存失效)</h4>
                <CodeBlock
                  language="dockerfile"
                  code={`# 一次性复制所有文件
COPY . .

# 每次代码变化都会重新下载依赖
RUN mvn clean package`}
                />
              </div>
            </div>

            <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h4 className="font-bold text-blue-900 mb-2">缓存命中率优化技巧</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• 将变化频率低的指令放在前面(如依赖安装)</li>
                <li>• 将变化频率高的指令放在后面(如源码复制)</li>
                <li>• 合并RUN指令减少Layer数量</li>
                <li>• 使用.dockerignore排除不必要文件</li>
                <li>• 在CI/CD中构建时使用--cache-from</li>
              </ul>
            </div>
          </div>

          <div className="bg-white border-2 border-green-200 rounded-lg p-6">
            <h3 className="text-2xl font-bold text-green-900 mb-4">镜像瘦身技巧对比</h3>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300 text-sm">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 px-4 py-2 text-left">优化技巧</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">效果</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">示例</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">使用alpine基础镜像</td>
                    <td className="border border-gray-300 px-4 py-2 text-green-600">减少400MB</td>
                    <td className="border border-gray-300 px-4 py-2">eclipse-temurin:17-jre-alpine (~200MB)</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-2">多阶段构建</td>
                    <td className="border border-gray-300 px-4 py-2 text-green-600">减少300MB</td>
                    <td className="border border-gray-300 px-4 py-2">只复制运行时jar包</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">合并RUN指令</td>
                    <td className="border border-gray-300 px-4 py-2 text-green-600">减少50MB</td>
                    <td className="border border-gray-300 px-4 py-2">清理apt/yum缓存</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-2">.dockerignore</td>
                    <td className="border border-gray-300 px-4 py-2 text-green-600">减少构建上下文</td>
                    <td className="border border-gray-300 px-4 py-2">排除target/,.git等</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">使用jre而非jdk</td>
                    <td className="border border-gray-300 px-4 py-2 text-green-600">减少100MB</td>
                    <td className="border border-gray-300 px-4 py-2">eclipse-temurin:17-jre</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-green-50 p-4 rounded">
                <h4 className="font-bold text-green-900 mb-2">.dockerignore 示例</h4>
                <CodeBlock
                  language="dockerfile"
                  code={`# .dockerignore
target/
*.jar
*.class
.git/
.gitignore
README.md
.DS_Store
node_modules/
.vscode/
*.md
*.txt
!target/*.jar`}
                />
              </div>

              <div className="bg-green-50 p-4 rounded">
                <h4 className="font-bold text-green-900 mb-2">镜像大小对比</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-red-600">优化前:</span>
                    <span className="font-bold text-red-600">~600MB</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-red-500 h-2 rounded-full" style={{width: '100%'}}></div>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-green-600">优化后:</span>
                    <span className="font-bold text-green-600">~180MB</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{width: '30%'}}></div>
                  </div>
                  <div className="text-center text-gray-600 pt-2">
                    减少 70% 体积
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">8. 容器编排进阶</h2>
        <p className="text-gray-600 mb-6">Docker Swarm vs Kubernetes 对比分析,以及生产环境容器编排实践。</p>

        <div className="space-y-6">
          <div className="bg-white border-2 border-indigo-200 rounded-lg p-6">
            <h3 className="text-2xl font-bold text-indigo-900 mb-4">Swarm vs Kubernetes 对比</h3>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300 text-sm">
                <thead>
                  <tr className="bg-indigo-50">
                    <th className="border border-gray-300 px-4 py-3 text-left">特性维度</th>
                    <th className="border border-gray-300 px-4 py-3 text-center">Docker Swarm</th>
                    <th className="border border-gray-300 px-4 py-3 text-center">Kubernetes</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2 font-semibold">复杂度</td>
                    <td className="border border-gray-300 px-4 py-2 text-center text-green-600">简单</td>
                    <td className="border border-gray-300 px-4 py-2 text-center text-orange-600">复杂</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-2 font-semibold">学习曲线</td>
                    <td className="border border-gray-300 px-4 py-2 text-center">平缓</td>
                    <td className="border border-gray-300 px-4 py-2 text-center">陡峭</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2 font-semibold">服务发现</td>
                    <td className="border border-gray-300 px-4 py-2 text-center">内置DNS</td>
                    <td className="border border-gray-300 px-4 py-2 text-center">CoreDNS</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-2 font-semibold">负载均衡</td>
                    <td className="border border-gray-300 px-4 py-2 text-center">内置</td>
                    <td className="border border-gray-300 px-4 py-2 text-center">Service/Ingress</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2 font-semibold">自动扩缩容</td>
                    <td className="border border-gray-300 px-4 py-2 text-center text-orange-600">基础</td>
                    <td className="border border-gray-300 px-4 py-2 text-center text-green-600">HPA强大</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-2 font-semibold">滚动更新</td>
                    <td className="border border-gray-300 px-4 py-2 text-center">支持</td>
                    <td className="border border-gray-300 px-4 py-2 text-center text-green-600">高级策略</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2 font-semibold">存储管理</td>
                    <td className="border border-gray-300 px-4 py-2 text-center text-orange-600">简单</td>
                    <td className="border border-gray-300 px-4 py-2 text-center text-green-600">PV/PVC完善</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-2 font-semibold">生态系统</td>
                    <td className="border border-gray-300 px-4 py-2 text-center text-orange-600">官方</td>
                    <td className="border border-gray-300 px-4 py-2 text-center text-green-600">CNCF庞大</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2 font-semibold">适用规模</td>
                    <td className="border border-gray-300 px-4 py-2 text-center">小型集群</td>
                    <td className="border border-gray-300 px-4 py-2 text-center">大规模生产</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-2 font-semibold">社区活跃度</td>
                    <td className="border border-gray-300 px-4 py-2 text-center text-orange-600">下降</td>
                    <td className="border border-gray-300 px-4 py-2 text-center text-green-600">非常高</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-green-50 p-4 rounded">
                <h4 className="font-bold text-green-900 mb-2">Docker Swarm 适用场景</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• 团队规模小,学习资源有限</li>
                  <li>• 集群规模小(少于20个节点)</li>
                  <li>• 已使用Docker Compose,平滑升级</li>
                  <li>• 快速验证微服务架构</li>
                  <li>• 不需要复杂的编排功能</li>
                </ul>
              </div>

              <div className="bg-blue-50 p-4 rounded">
                <h4 className="font-bold text-blue-900 mb-2">Kubernetes 适用场景</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• 大规模生产环境(100+节点)</li>
                  <li>• 需要高级功能(HPA、StatefulSet)</li>
                  <li>• 多租户、多集群管理</li>
                  <li>• 云原生转型战略</li>
                  <li>• 长期技术投资</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-white border-2 border-orange-200 rounded-lg p-6">
            <h3 className="text-2xl font-bold text-orange-900 mb-4">Docker Swarm 生产配置</h3>

            <CodeBlock
              language="yaml"
              code={`version: '3.8'

services:
  gateway:
    image: your-registry/gateway:latest
    deploy:
      mode: replicated
      replicas: 3
      update_config:
        parallelism: 1
        delay: 10s
        order: start-first
        failure_action: rollback
      rollback_config:
        parallelism: 1
        delay: 5s
      restart_policy:
        condition: on-failure
        delay: 5s
        max_attempts: 3
        window: 120s
      resources:
        limits:
          memory: 1G
        reservations:
          memory: 512M
      labels:
        - "traefik.enable=true"
        - "traefik.http.routers.gateway.rule=Host(\`api.example.com\`)"
        - "traefik.http.services.gateway.loadbalancer.server.port=9090"
    networks:
      - microservices
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:9090/actuator/health"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 40s

networks:
  microservices:
    driver: overlay
    attachable: true`}
            />

            <div className="mt-4 p-4 bg-orange-50 border border-orange-200 rounded-lg">
              <h4 className="font-bold text-orange-900 mb-2">Swarm 集群管理命令</h4>
              <CodeBlock
                language="bash"
                code={`# 初始化Swarm集群
docker swarm init --advertise-addr <MANAGER-IP>

# 添加Worker节点
docker swarm join --token <WORKER-TOKEN> <MANAGER-IP>:2377

# 部署Stack
docker stack deploy -c docker-compose.yml myapp

# 查看服务状态
docker service ls
docker service ps myapp_gateway

# 扩缩容服务
docker service scale myapp_gateway=5

# 滚动更新服务
docker service update --image myapp:v2 myapp_gateway

# 回滚服务
docker service rollback myapp_gateway

# 查看服务日志
docker service logs -f myapp_gateway

# 删除Stack
docker stack rm myapp

# 查看集群节点
docker node ls`}
              />
            </div>
          </div>

          <div className="bg-white border-2 border-blue-200 rounded-lg p-6">
            <h3 className="text-2xl font-bold text-blue-900 mb-4">Swarm 高级特性</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-blue-50 p-4 rounded">
                <h4 className="font-bold text-blue-900 mb-2">服务发现与负载均衡</h4>
                <CodeBlock
                  language="yaml"
                  code={`services:
  web:
    image: nginx:alpine
    deploy:
      replicas: 3
    networks:
      - frontend

  api:
    image: myapi:latest
    deploy:
      replicas: 3
    networks:
      - frontend
      - backend

networks:
  frontend:
  backend:`}
                />
                <p className="text-xs text-gray-600 mt-2">
                  同一网络内的服务通过服务名自动DNS解析,实现负载均衡
                </p>
              </div>

              <div className="bg-blue-50 p-4 rounded">
                <h4 className="font-bold text-blue-900 mb-2">配置与密钥管理</h4>
                <CodeBlock
                  language="bash"
                  code={`# 创建配置
echo "production.yml" | docker config create app_config -

# 创建密钥
echo "db_password" | docker secret create db_password -

# 在服务中使用
docker service create \\
  --name app \\
  --config source=app_config,target=/app/config.yml \\
  --secret source=db_password,target=/app/.dbpassword \\
  myapp:latest`}
                />
                <p className="text-xs text-gray-600 mt-2">
                  Config存储非敏感配置,Secret存储敏感数据(加密)
                </p>
              </div>

              <div className="bg-blue-50 p-4 rounded">
                <h4 className="font-bold text-blue-900 mb-2">滚动更新策略</h4>
                <CodeBlock
                  language="yaml"
                  code={`update_config:
  parallelism: 2          # 每次更新2个副本
  delay: 10s              # 更新间隔
  failure_action: rollback # 失败回滚
  order: start-first      # 先启动新容器再停止旧容器
monitor: 30s              # 监控30秒确认健康
max_failure_ratio: 0.1    # 最多10%失败率`}
                />
                <p className="text-xs text-gray-600 mt-2">
                  实现零停机部署,失败自动回滚
                </p>
              </div>

              <div className="bg-blue-50 p-4 rounded">
                <h4 className="font-bold text-blue-900 mb-2">健康检查与重启</h4>
                <CodeBlock
                  language="yaml"
                  code={`healthcheck:
  test: ["CMD", "curl", "-f", "http://localhost:8080/actuator/health"]
  interval: 30s
  timeout: 10s
  retries: 3
  start_period: 40s

restart_policy:
  condition: on-failure  # 失败时重启
  delay: 5s              # 重启延迟
  max_attempts: 3        # 最多尝试3次
  window: 120s           # 120秒内统计`}
                />
                <p className="text-xs text-gray-600 mt-2">
                  健康检查失败触发重启策略,保证服务可用性
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">9. 监控与日志收集</h2>
        <p className="text-gray-600 mb-6">构建完整的容器监控体系和集中式日志收集方案,实现生产环境可观测性。</p>

        <div className="space-y-6">
          <div className="bg-white border-2 border-cyan-200 rounded-lg p-6">
            <h3 className="text-2xl font-bold text-cyan-900 mb-4">容器监控配置</h3>

            <CodeBlock
              language="yaml"
              code={`services:
  # 应用服务
  gateway:
    image: your-registry/gateway:latest
    deploy:
      resources:
        limits:
          cpus: '0.5'
          memory: 1G
        reservations:
          cpus: '0.25'
          memory: 512M
    labels:
      - "prometheus.enable=true"
      - "prometheus.port=9090"
      - "prometheus.path=/actuator/prometheus"

  # Prometheus监控
  prometheus:
    image: prom/prometheus:latest
    container_name: prometheus
    ports:
      - "9091:9090"
    volumes:
      - ./prometheus.yml:/etc/prometheus/prometheus.yml
      - prometheus-data:/prometheus
    command:
      - '--config.file=/etc/prometheus/prometheus.yml'
      - '--storage.tsdb.path=/prometheus'
      - '--web.console.libraries=/usr/share/prometheus/console_libraries'
      - '--web.console.templates=/usr/share/prometheus/consoles'
    networks:
      - monitoring
    restart: always

  # Grafana可视化
  grafana:
    image: grafana/grafana:latest
    container_name: grafana
    ports:
      - "3000:3000"
    environment:
      - GF_SECURITY_ADMIN_PASSWORD=admin123
      - GF_INSTALL_PLUGINS=
    volumes:
      - grafana-data:/var/lib/grafana
      - ./grafana/provisioning:/etc/grafana/provisioning
    networks:
      - monitoring
    depends_on:
      - prometheus
    restart: always

  # cAdvisor容器指标
  cadvisor:
    image: gcr.io/cadvisor/cadvisor:latest
    container_name: cadvisor
    ports:
      - "8080:8080"
    volumes:
      - /:/rootfs:ro
      - /var/run:/var/run:ro
      - /sys:/sys:ro
      - /var/lib/docker/:/var/lib/docker:ro
    networks:
      - monitoring
    restart: always

  # Node Exporter主机指标
  node-exporter:
    image: prom/node-exporter:latest
    container_name: node-exporter
    ports:
      - "9100:9100"
    volumes:
      - /proc:/host/proc:ro
      - /sys:/host/sys:ro
      - /:/rootfs:ro
    command:
      - '--path.procfs=/host/proc'
      - '--path.sysfs=/host/sys'
    networks:
      - monitoring
    restart: always

networks:
  monitoring:
    driver: bridge

volumes:
  prometheus-data:
  grafana-data:`}
            />

            <div className="mt-4 p-4 bg-cyan-50 border border-cyan-200 rounded-lg">
              <h4 className="font-bold text-cyan-900 mb-2">Prometheus 配置文件示例</h4>
              <CodeBlock
                language="yaml"
                code={`# prometheus.yml
global:
  scrape_interval: 15s
  evaluation_interval: 15s

scrape_configs:
  - job_name: 'gateway'
    metrics_path: '/actuator/prometheus'
    static_configs:
      - targets: ['gateway:9090']

  - job_name: 'cadvisor'
    static_configs:
      - targets: ['cadvisor:8080']

  - job_name: 'node-exporter'
    static_configs:
      - targets: ['node-exporter:9100']

alerting:
  alertmanagers:
    - static_configs:
        - targets: ['alertmanager:9093']`}
              />
            </div>
          </div>

          <div className="bg-white border-2 border-amber-200 rounded-lg p-6">
            <h3 className="text-2xl font-bold text-amber-900 mb-4">日志收集配置</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-amber-50 p-4 rounded">
                <h4 className="font-bold text-amber-900 mb-2">方案1: ELK Stack</h4>
                <CodeBlock
                  language="yaml"
                  code={`services:
  # Elasticsearch
  elasticsearch:
    image: docker.elastic.co/elasticsearch/elasticsearch:8.11.0
    environment:
      - discovery.type=single-node
      - "ES_JAVA_OPTS=-Xms512m -Xmx512m"
    volumes:
      - es-data:/usr/share/elasticsearch/data
    ports:
      - "9200:9200"
    networks:
      - logging

  # Logstash
  logstash:
    image: docker.elastic.co/logstash/logstash:8.11.0
    volumes:
      - ./logstash/pipeline:/usr/share/logstash/pipeline
    ports:
      - "5044:5044"
    networks:
      - logging
    depends_on:
      - elasticsearch

  # Kibana
  kibana:
    image: docker.elastic.co/kibana/kibana:8.11.0
    ports:
      - "5601:5601"
    environment:
      - ELASTICSEARCH_HOSTS=http://elasticsearch:9200
    networks:
      - logging
    depends_on:
      - elasticsearch

networks:
  logging:

volumes:
  es-data:`}
                />
              </div>

              <div className="bg-amber-50 p-4 rounded">
                <h4 className="font-bold text-amber-900 mb-2">方案2: Loki + Promtail</h4>
                <CodeBlock
                  language="yaml"
                  code={`services:
  # Loki日志存储
  loki:
    image: grafana/loki:latest
    ports:
      - "3100:3100"
    command: -config.file=/etc/loki/local-config.yaml
    networks:
      - logging
    volumes:
      - ./loki-config.yml:/etc/loki/local-config.yaml

  # Promtail日志采集
  promtail:
    image: grafana/promtail:latest
    volumes:
      - /var/log:/var/log:ro
      - /var/lib/docker/containers:/var/lib/docker/containers:ro
      - ./promtail-config.yml:/etc/promtail/config.yml
    command: -config.file=/etc/promtail/config.yml
    networks:
      - logging
    depends_on:
      - loki

networks:
  logging:`}
                />
              </div>
            </div>

            <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-lg">
              <h4 className="font-bold text-amber-900 mb-2">Docker 日志驱动配置</h4>
              <CodeBlock
                language="yaml"
                code={`services:
  gateway:
    image: your-registry/gateway:latest
    logging:
      driver: "json-file"
      options:
        max-size: "10m"      # 单个日志文件最大10MB
        max-file: "3"        # 保留3个日志文件
        labels: "service"    # 添加容器标签
        tag: "{{.Name}}/{{.ID}}"  # 日志标签格式

  # 或者使用Fluentd驱动
  api:
    image: your-registry/api:latest
    logging:
      driver: "fluentd"
      options:
        fluentd-address: "fluentd:24224"
        fluentd-async-connect: "true"
        tag: "docker.{{.Name}}"`}
              />
            </div>
          </div>

          <div className="bg-white border-2 border-teal-200 rounded-lg p-6">
            <h3 className="text-2xl font-bold text-teal-900 mb-4">监控告警配置</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-teal-50 p-4 rounded">
                <h4 className="font-bold text-teal-900 mb-2">常用监控指标</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• <strong>容器指标</strong>: CPU、内存、网络、磁盘IO</li>
                  <li>• <strong>应用指标</strong>: QPS、响应时间、错误率</li>
                  <li>• <strong>JVM指标</strong>: 堆内存、GC次数、线程数</li>
                  <li>• <strong>业务指标</strong>: 订单量、支付成功率等</li>
                  <li>• <strong>基础设施</strong>: 主机负载、磁盘使用率</li>
                </ul>
              </div>

              <div className="bg-teal-50 p-4 rounded">
                <h4 className="font-bold text-teal-900 mb-2">告警规则示例</h4>
                <CodeBlock
                  language="yaml"
                  code={`groups:
  - name: docker_alerts
    rules:
      # 容器CPU使用率告警
      - alert: ContainerHighCPU
        expr: rate(container_cpu_usage_seconds_total[5m]) > 0.8
        for: 5m
        annotations:
          summary: "容器 {{ $labels.name }} CPU过高"

      # 容器OOM告警
      - alert: ContainerOOMKilled
        expr: increase(container_oom_events_total[1h]) > 0
        annotations:
          summary: "容器 {{ $labels.name }} 发生OOM"

      # 服务下线告警
      - alert: ServiceDown
        expr: up{job="gateway"} == 0
        for: 1m
        annotations:
          summary: "服务 {{ $labels.job }} 已下线"`}
                />
              </div>
            </div>

            <div className="mt-4 p-4 bg-teal-50 border border-teal-200 rounded-lg">
              <h4 className="font-bold text-teal-900 mb-2">Grafana Dashboard 配置</h4>
              <p className="text-sm text-gray-700 mb-2">
                推荐使用官方或社区贡献的Dashboard模板:
              </p>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Docker Dashboard (ID: 179)</li>
                <li>• Prometheus Node Exporter (ID: 1860)</li>
                <li>• Spring Boot Statistics (ID: 12900)</li>
                <li>• JVM Micrometer (ID: 4701)</li>
                <li>• cAdvisor (ID: 893)</li>
              </ul>
              <div className="mt-2 text-xs text-gray-600">
                导入Dashboard: Grafana UI → Dashboards → Import → 输入ID
              </div>
            </div>
          </div>

          <div className="bg-white border-2 border-emerald-200 rounded-lg p-6">
            <h3 className="text-2xl font-bold text-emerald-900 mb-4">可观测性最佳实践</h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-emerald-50 p-4 rounded">
                <h4 className="font-bold text-emerald-900 mb-2">🔍 Logs(日志)</h4>
                <ul className="text-xs text-gray-700 space-y-1">
                  <li>• 结构化日志(JSON格式)</li>
                  <li>• 统一日志级别规范</li>
                  <li>• 记录关键业务操作</li>
                  <li>• 关联Trace ID</li>
                  <li>• 避免敏感信息</li>
                </ul>
              </div>

              <div className="bg-emerald-50 p-4 rounded">
                <h4 className="font-bold text-emerald-900 mb-2">📊 Metrics(指标)</h4>
                <ul className="text-xs text-gray-700 space-y-1">
                  <li>• 使用Prometheus格式</li>
                  <li>• 四大指标类型: Counter/Gauge/Histogram/Summary</li>
                  <li>• 业务指标 + 技术指标</li>
                  <li>• 合理的标签维度</li>
                  <li>• 避免高基数标签</li>
                </ul>
              </div>

              <div className="bg-emerald-50 p-4 rounded">
                <h4 className="font-bold text-emerald-900 mb-2">🔗 Traces(链路)</h4>
                <ul className="text-xs text-gray-700 space-y-1">
                  <li>• 分布式追踪(SkyWalking/Zipkin)</li>
                  <li>• 跨服务调用链路</li>
                  <li>• 性能瓶颈定位</li>
                  <li>• Trace ID + Span ID</li>
                  <li>• 采样策略配置</li>
                </ul>
              </div>
            </div>

            <div className="mt-4 p-4 bg-emerald-50 border border-emerald-200 rounded-lg">
              <h4 className="font-bold text-emerald-900 mb-2">Spring Boot Actuator 集成</h4>
              <CodeBlock
                language="xml"
                code={`<!-- pom.xml -->
<dependency>
  <groupId>org.springframework.boot</groupId>
  <artifactId>spring-boot-starter-actuator</artifactId>
</dependency>
<dependency>
  <groupId>io.micrometer</groupId>
  <artifactId>micrometer-registry-prometheus</artifactId>
</dependency>

# application.yml
management:
  endpoints:
    web:
      exposure:
        include: health,info,prometheus,metrics,loggers
  metrics:
    export:
      prometheus:
        enabled: true
    tags:
      application: \${spring.application.name}`}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Docker 部署最佳实践</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <BestPracticeCard
            title="镜像构建"
            level="intermediate"
            practices={[
              '使用多阶段构建减小镜像体积',
              '选择合适的基础镜像（alpine优先）',
              '利用 Docker 缓存加速构建',
              '.dockerignore 排除不必要文件',
              '定期更新基础镜像'
            ]}
          />
          <BestPracticeCard
            title="运行安全"
            level="architect"
            practices={[
              '非 root 用户运行容器',
              '最小化容器权限',
              '扫描镜像安全漏洞',
              '使用私有镜像仓库',
              '定期更新依赖'
            ]}
          />
          <BestPracticeCard
            title="资源优化"
            level="intermediate"
            practices={[
              '限制容器资源（CPU/内存）',
              '健康检查保证可用性',
              '日志驱动收集日志',
              '优雅关闭处理',
              '监控容器性能'
            ]}
          />
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">常见问题</h2>

        <div className="space-y-4">
          <FaqCard
            number={1}
            question="Docker 容器如何持久化数据？"
            answer={"Docker 容器是临时的，删除后数据会丢失。需要使用数据卷（Volume）持久化数据：\n\n【方式1: 数据卷】\ndocker volume create mydata\ndocker run -v mydata:/app myapp\n\n【方式2: 绑定挂载】\ndocker run -v /host/path:/container/path myapp\n\n【方式3: 数据卷容器】\ndocker run -v /data --name data-container busybox\ndocker run --volumes-from data-container myapp\n\n【最佳实践】\n- 数据卷独立于容器生命周期\n- 生产数据必须使用持久化存储\n- 定期备份数据卷"}
            isOpen={openFaq === 1}
            onClick={() => toggleFaq(1)}
          />
          <FaqCard
            number={2}
            question="如何减小 Docker 镜像大小？"
            answer={"镜像优化技巧：\n\n1. 多阶段构建\n   - 构建阶段使用完整镜像\n   - 运行阶段使用精简镜像（alpine）\n\n2. 清理构建产物\n   - 删除不需要的文件\n   - 使用 .dockerignore\n\n3. 选择小的基础镜像\n   - alpine (~5MB) vs debian (~100MB)\n   - jre-alpine vs full JDK\n\n4. 合并 RUN 指令\n   - 减少镜像层数\n   - 清理包管理器缓存\n\n【优化效果】\n优化前: 600MB\n优化后: 200MB"}
            isOpen={openFaq === 2}
            onClick={() => toggleFaq(2)}
          />
          <FaqCard
            number={3}
            question="容器间如何通信？"
            answer={"Docker 容器间通信方式：\n\n1. 桥接网络\n   - 同一 bridge 网络的容器可以通过容器名访问\n   - 通过 --link 连接容器（已废弃）\n\n2. 端口映射\n   - 映射到主机端口，通过主机访问\n   - docker run -p 8080:8080 myapp\n\n3. Overlay 网络（跨主机）\n   - Swarm 集群容器间通信\n   - K8s Pod 内容器间通信\n\n4. 服务发现\n   - Nacos 服务发现\n   - DNS 解析\n\n【推荐】\n单机：Bridge 网络 + 端口映射\n集群：Overlay 网络 + K8s Service"}
            isOpen={openFaq === 3}
            onClick={() => toggleFaq(3)}
          />
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">下一步学习</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <a href="/k8s-deployment" className="block bg-gradient-to-br from-purple-50 to-purple-100 border-2 border-purple-200 rounded-lg p-6 hover:shadow-lg transition">
            <h3 className="text-xl font-bold text-purple-900 mb-2">☸️ Kubernetes 部署</h3>
            <p className="text-gray-700 text-sm">K8s 生产环境部署</p>
          </a>
          <a href="/cicd" className="block bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-200 rounded-lg p-6 hover:shadow-lg transition">
            <h3 className="text-xl font-bold text-blue-900 mb-2">🚀 CI/CD 流水线</h3>
            <p className="text-gray-700 text-sm">自动化部署流程</p>
          </a>
        </div>
      </section>
    </div>
  );
};
