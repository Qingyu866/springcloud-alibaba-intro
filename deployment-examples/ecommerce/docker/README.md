# Docker 镜像构建指南

## Gateway Service Dockerfile

```dockerfile
FROM maven:3.8-openjdk-17 AS builder
WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN mvn clean package -DskipTests

FROM openjdk:17-jdk-slim
WORKDIR /app
COPY --from=builder /app/target/gateway-service.jar app.jar

# 创建非 root 用户
RUN groupadd -r appuser && useradd -r -g appuser appuser
RUN chown -R appuser:appuser /app
USER appuser

EXPOSE 8080 8081
ENTRYPOINT ["java", "-jar", "app.jar"]
```

## Order Service Dockerfile

```dockerfile
FROM maven:3.8-openjdk-17 AS builder
WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN mvn clean package -DskipTests

FROM openjdk:17-jdk-slim
WORKDIR /app
COPY --from=builder /app/target/order-service.jar app.jar

RUN groupadd -r appuser && useradd -r -g appuser appuser
RUN chown -R appuser:appuser /app
USER appuser

EXPOSE 8082 8083
ENTRYPOINT ["java", "-jar", "app.jar"]
```

## User Service Dockerfile

```dockerfile
FROM maven:3.8-openjdk-17 AS builder
WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN mvn clean package -DskipTests

FROM openjdk:17-jdk-slim
WORKDIR /app
COPY --from=builder /app/target/user-service.jar app.jar

RUN groupadd -r appuser && useradd -r -g appuser appuser
RUN chown -R appuser:appuser /app
USER appuser

EXPOSE 8084 8085
ENTRYPOINT ["java", "-jar", "app.jar"]
```

## Payment Service Dockerfile

```dockerfile
FROM maven:3.8-openjdk-17 AS builder
WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN mvn clean package -DskipTests

FROM openjdk:17-jdk-slim
WORKDIR /app
COPY --from=builder /app/target/payment-service.jar app.jar

RUN groupadd -r appuser && useradd -r -g appuser appuser
RUN chown -R appuser:appuser /app
USER appuser

EXPOSE 8086 8087
ENTRYPOINT ["java", "-jar", "app.jar"]
```

## 构建脚本

### build-images.sh

```bash
#!/bin/bash

set -e

REGISTRY="your-registry.com"
VERSION="${1:-latest}"

services=("gateway-service" "order-service" "user-service" "payment-service")

echo "Building Docker images..."
echo "Registry: $REGISTRY"
echo "Version: $VERSION"
echo ""

for service in "${services[@]}"; do
    echo "Building $service..."

    cd "$service"

    # 构建
    docker build -t "$REGISTRY/$service:$VERSION" .
    docker tag "$REGISTRY/$service:$VERSION" "$REGISTRY/$service:latest"

    # 推送
    echo "Pushing $service..."
    docker push "$REGISTRY/$service:$VERSION"
    docker push "$REGISTRY/$service:latest"

    cd ..
done

echo ""
echo "All images built and pushed successfully!"
```

### 使用方法

```bash
# 赋予执行权限
chmod +x build-images.sh

# 构建 latest 版本
./build-images.sh

# 构建指定版本
./build-images.sh v1.0.0

# 构建并使用 Git commit hash
VERSION=$(git rev-parse --short HEAD) ./build-images.sh
```

## 优化建议

### 1. 多阶段构建优化

```dockerfile
# 第一阶段: 依赖下载
FROM maven:3.8-openjdk-17 AS deps
WORKDIR /app
COPY pom.xml .
RUN mvn dependency:go-offline -B

# 第二阶段: 构建
FROM maven:3.8-openjdk-17 AS builder
WORKDIR /app
COPY --from=deps /root/.m2 /root/.m2
COPY pom.xml .
COPY src ./src
RUN mvn clean package -DskipTests -Ddependency-check.skip=true

# 第三阶段: 运行
FROM openjdk:17-jdk-slim
WORKDIR /app
COPY --from=builder /app/target/*.jar app.jar

# 优化 JVM 参数
ENV JAVA_OPTS="-Xms512m -Xmx1g -XX:+UseG1GC -XX:MaxRAMPercentage=75.0"

EXPOSE 8080
ENTRYPOINT ["sh", "-c", "java $JAVA_OPTS -jar app.jar"]
```

### 2. 使用 Alpine 镜像 (更小)

```dockerfile
FROM eclipse-temurin:17-jre-alpine AS runtime
WORKDIR /app
COPY --from=builder /app/target/*.jar app.jar

RUN addgroup -S appuser && adduser -S appuser -G appuser
RUN chown -R appuser:appuser /app
USER appuser

EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
```

### 3. 添加健康检查

```dockerfile
HEALTHCHECK --interval=30s --timeout=3s --start-period=60s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:8081/actuator/health || exit 1
```

### 4. 使用 BuildKit (更快的构建)

```bash
# 启用 BuildKit
export DOCKER_BUILDKIT=1

# 使用缓存挂载
docker build \
  --cache-from "$REGISTRY/service:latest" \
  --build-arg BUILDKIT_INLINE_CACHE=1 \
  -t "$REGISTRY/service:$VERSION" .
```

## 镜像扫描

### 使用 Trivy 扫描漏洞

```bash
# 安装 Trivy
brew install trivy  # macOS
# 或
curl -sfL https://raw.githubusercontent.com/aquasecurity/trivy/main/contrib/install.sh | sh -s -- -b /usr/local/bin

# 扫描镜像
trivy image your-registry.com/gateway-service:latest

# 扫描并生成报告
trivy image --format json --output report.json your-registry.com/gateway-service:latest
```

### 在 CI/CD 中集成

```yaml
# .gitlab-ci.yml
image_scan:
  stage: test
  image: aquasec/trivy:latest
  script:
    - trivy image --exit-code 1 --severity HIGH,CRITICAL your-registry.com/gateway-service:$CI_COMMIT_SHORT_SHA
  allow_failure: false
```

## 最佳实践

### 1. 使用 .dockerignore

```
# .dockerignore
target/
!target/*.jar
**/target/
.git
.gitignore
*.md
Dockerfile
.dockerignore
.idea/
*.iml
.vscode/
node_modules/
npm-debug.log
.env.local
.env.*.local
```

### 2. 标签规范

```bash
# 使用语义化版本
docker tag myapp:1.0.0 myapp:1
docker tag myapp:1.0.0 myapp:1.0
docker tag myapp:1.0.0 myapp:latest

# 使用 Git commit hash
docker tag myapp:latest myapp:$(git rev-parse --short HEAD)

# 使用 Git branch
docker tag myapp:latest myapp:$(git rev-parse --abbrev-ref HEAD)
```

### 3. 安全加固

```dockerfile
# 使用非 root 用户
USER appuser

# 只读文件系统
RUN chmod -R 555 /app
# 如果需要写入特定目录
RUN mkdir -p /app/logs && chmod 777 /app/logs

# 移除不必要的工具
RUN apt-get purge -y --auto-remove && rm -rf /var/lib/apt/lists/*
```

### 4. 多架构支持

```bash
# 使用 buildx 构建多架构镜像
docker buildx create --use
docker buildx build \
  --platform linux/amd64,linux/arm64 \
  -t your-registry.com/service:latest \
  --push .
```

## 故障排查

### 1. 查看镜像层

```bash
docker history your-registry.com/gateway-service:latest
```

### 2. 检查镜像大小

```bash
docker images your-registry.com/gateway-service --format "table {{.Repository}}\t{{.Size}}"
```

### 3. 交互式调试

```bash
# 运行容器并进入 shell
docker run -it --rm your-registry.com/gateway-service:latest sh

# 或使用 bash
docker run -it --rm --entrypoint bash your-registry.com/gateway-service:latest
```

### 4. 查看日志

```bash
# 查看容器日志
docker logs <container-id>

# 实时查看
docker logs -f <container-id>

# 查看最后 100 行
docker logs --tail 100 <container-id>
```

## 相关资源

- [Docker 最佳实践](https://docs.docker.com/develop/dev-best-practices/)
- [多阶段构建](https://docs.docker.com/build/building/multi-stage/)
- [Spring Boot Docker 指南](https://spring.io/guides/topicals/spring-boot-docker/)
- [JVM 容器化最佳实践](https://developers.redhat.com/blog/2017/03/14/java-inside-docker/)
