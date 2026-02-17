import { CodeBlock } from '../components';
export const DockerDeploymentPage: React.FC = () => (
  <div className="max-w-7xl mx-auto px-4 py-8">
    <div className="bg-gradient-to-r from-blue-700 to-blue-900 text-white rounded-lg p-6 mb-8">
      <h1 className="text-4xl font-bold mb-2">Docker 部署</h1>
      <p className="text-blue-100">微服务容器化部署实战</p>
      <div className="flex gap-3 text-sm mt-4">
        <span className="px-3 py-1 bg-white/20 rounded-full">🔧 中级</span>
        <span className="px-3 py-1 bg-white/20 rounded-full">⏱️ 约60分钟</span>
      </div>
    </div>

    <section className="mb-12">
      <h2 className="text-3xl font-bold text-gray-900 mb-6">Dockerfile 编写</h2>
      <CodeBlock language="dockerfile" code={`# 多阶段构建
FROM maven:3.8-openjdk-17 AS builder
WORKDIR /app
COPY pom.xml .
RUN mvn dependency:go-offline

COPY src ./src
RUN mvn clean package -DskipTests

# 运行阶段
FROM openjdk:17-slim
WORKDIR /app
COPY --from=builder /app/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]`} />
    </section>

    <section className="mb-12">
      <h2 className="text-3xl font-bold text-gray-900 mb-6">Docker Compose 编排</h2>
      <CodeBlock language="yaml" code={`version: '3.8'
services:
  nacos:
    image: nacos/nacos-server:latest
    environment:
      - MODE=standalone
    ports:
      - "8848:8848"

  order-service:
    build: ./order-service
    ports:
      - "8081:8080"
    environment:
      - SPRING_CLOUD_NACOS_SERVER_ADDR=nacos:8848
    depends_on:
      - nacos`} />
    </section>
  </div>
);
