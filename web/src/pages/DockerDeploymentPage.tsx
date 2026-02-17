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
