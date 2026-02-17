import React, { useState } from 'react';

const CodeBlock: React.FC<{ language: string; code: string }> = ({ language, code }) => (
  <div className="bg-gray-900 rounded-lg overflow-hidden my-4">
    <div className="bg-gray-800 px-4 py-2 flex items-center gap-2">
      <span className="text-gray-300 text-sm font-mono">{language}</span>
    </div>
    <pre className="p-4 overflow-x-auto text-gray-100 text-sm font-mono whitespace-pre">
      {code}
    </pre>
  </div>
);

export const DocStandardsPage: React.FC = () => {
  const [openSection, setOpenSection] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-teal-700 to-teal-900 text-white rounded-lg p-6 mb-8">
        <h1 className="text-4xl font-bold mb-2">项目文档规范</h1>
        <p className="text-teal-100">Spring Cloud Alibaba 项目文档编写规范</p>
        <div className="flex gap-3 text-sm mt-4">
          <span className="px-3 py-1 bg-white/20 rounded-full">🔧 最佳实践</span>
          <span className="px-3 py-1 bg-white/20 rounded-full">⏱️ 约30分钟</span>
          <span className="px-3 py-1 bg-white/20 rounded-full">📋 5大核心模块</span>
        </div>
      </div>

      {/* Why Documentation */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">为什么需要文档规范？</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white border-l-4 border-blue-500 rounded-lg p-5 shadow-md">
            <h3 className="text-lg font-bold text-gray-900 mb-3">📚 文档的价值</h3>
            <ul className="text-sm text-gray-700 space-y-2">
              <li>• <strong>降低沟通成本</strong>：减少重复解释</li>
              <li>• <strong>加速新员工上手</strong>：清晰的入门指南</li>
              <li>• <strong>沉淀知识资产</strong>：避免知识流失</li>
              <li>• <strong>提升协作效率</strong>：统一规范便于维护</li>
              <li>• <strong>减少错误率</strong>：明确的使用说明</li>
            </ul>
          </div>
          <div className="bg-white border-l-4 border-green-500 rounded-lg p-5 shadow-md">
            <h3 className="text-lg font-bold text-gray-900 mb-3">✅ 文档规范的好处</h3>
            <ul className="text-sm text-gray-700 space-y-2">
              <li>• <strong>格式统一</strong>：风格一致，易于阅读</li>
              <li>• <strong>结构清晰</strong>：快速定位所需信息</li>
              <li>• <strong>内容完整</strong>：覆盖所有关键点</li>
              <li>• <strong>便于维护</strong>：版本管理和更新</li>
              <li>• <strong>自动化生成</strong>：减少手工编写</li>
            </ul>
          </div>
        </div>
      </section>

      {/* API Documentation */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">API 文档规范</h2>
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Swagger/Knife4j 注解规范</h3>

          <CodeBlock
            language="java"
            code={`/**
 * 订单 Controller
 */
@RestController
@RequestMapping("/api/orders")
@Tag(name = "订单管理", description = "订单相关接口")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;

    /**
     * 创建订单
     */
    @PostMapping
    @Operation(summary = "创建订单", description = "创建新订单并返回订单ID")
    @Parameters({
        @Parameter(name = "request", description = "订单创建请求",
                  required = true, schema = @Schema(implementation = OrderCreateRequest.class))
    })
    public Result<Long> createOrder(
            @Parameter(description = "订单创建请求", required = true)
            @Valid @RequestBody OrderCreateRequest request) {
        Long orderId = orderService.createOrder(request);
        return Result.success(orderId);
    }

    /**
     * 查询订单
     */
    @GetMapping("/{id}")
    @Operation(summary = "查询订单", description = "根据订单ID查询订单详情")
    @Parameters({
        @Parameter(name = "id", description = "订单ID", example = "12345", required = true)
    })
    public Result<OrderResponse> getOrder(
            @PathVariable Long id) {
        OrderResponse order = orderService.getOrderById(id);
        return Result.success(order);
    }

    /**
     * 订单列表
     */
    @GetMapping
    @Operation(summary = "订单列表", description = "分页查询订单列表")
    @Parameters({
        @Parameter(name = "pageNum", description = "页码", example = "1"),
        @Parameter(name = "pageSize", description = "每页数量", example = "10"),
        @Parameter(name = "status", description = "订单状态", example = "PAID")
    })
    public Result<PageInfo<OrderResponse>> listOrders(
            @Parameter(description = "页码") @RequestParam(defaultValue = "1") Integer pageNum,
            @Parameter(description = "每页数量") @RequestParam(defaultValue = "10") Integer pageSize,
            @Parameter(description = "订单状态") @RequestParam(required = false) String status) {
        PageInfo<OrderResponse> page = orderService.listOrders(pageNum, pageSize, status);
        return Result.success(page);
    }
}`}
          />
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">DTO 注解规范</h3>

          <CodeBlock
            language="java"
            code={`/**
 * 订单创建请求
 */
@Data
@Schema(description = "订单创建请求")
public class OrderCreateRequest {

    @Schema(description = "用户ID", example = "10001", requiredMode = Schema.RequiredMode.REQUIRED)
    @NotNull(message = "用户ID不能为空")
    private Long userId;

    @Schema(description = "商品ID", example = "20001", requiredMode = Schema.RequiredMode.REQUIRED)
    @NotNull(message = "商品ID不能为空")
    private Long productId;

    @Schema(description = "购买数量", example = "2", minimum = "1", maximum = "9999")
    @Min(value = 1, message = "数量不能小于1")
    @Max(value = 9999, message = "数量不能大于9999")
    private Integer quantity;

    @Schema(description = "订单备注", example = "请尽快发货")
    private String remark;
}

/**
 * 订单响应
 */
@Data
@Schema(description = "订单响应")
public class OrderResponse {

    @Schema(description = "订单ID", example = "12345")
    private Long id;

    @Schema(description = "用户ID", example = "10001")
    private Long userId;

    @Schema(description = "订单状态", example = "PAID",
            allowableValues = {"PENDING", "PAID", "SHIPPED", "COMPLETED", "CANCELLED"})
    private String status;

    @Schema(description = "订单总金额（单位：分）", example = "10000")
    private Integer totalAmount;

    @Schema(description = "创建时间", example = "2024-01-01T12:00:00")
    private LocalDateTime createTime;

    @Schema(description = "更新时间", example = "2024-01-01T12:00:00")
    private LocalDateTime updateTime;
}`}
          />
        </div>
      </section>

      {/* Code Documentation */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">代码注释规范</h2>
        <div className="space-y-4">
          <div className="mb-4">
            <button
              onClick={() => setOpenSection(openSection === 'class-comment' ? null : 'class-comment')}
              className="w-full bg-white border-2 border-blue-300 rounded-lg p-4 flex items-center justify-between hover:bg-blue-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">📄</span>
                <div className="text-left">
                  <h3 className="text-lg font-bold text-gray-900">类注释</h3>
                  <p className="text-sm text-gray-600">描述类的功能、职责和使用场景</p>
                </div>
              </div>
              <span className="text-gray-400">&rbrace;</span>
            </button>
            {openSection === 'class-comment' && (
              <div className="mt-4 bg-white border border-gray-200 rounded-lg p-6">
                <CodeBlock
                  language="java"
                  code={`/**
 * 订单服务实现类
 *
 * &lt;p&gt;负责订单的核心业务逻辑处理，包括订单创建、查询、更新、取消等功能&lt;/p&gt;
 *
 * &lt;ul&gt;
 *   &lt;li&gt;订单创建：校验库存、扣减库存、创建订单记录&lt;/li&gt;
 *   &lt;li&gt;订单查询：支持按ID、用户ID、状态等多维度查询&lt;/li&gt;
 *   &lt;li&gt;订单更新：更新订单状态、物流信息等&lt;/li&gt;
 *   &lt;li&gt;订单取消：取消订单并恢复库存&lt;/li&gt;
 * &lt;/ul&gt;
 *
 * &lt;p&gt;事务处理：所有写操作使用事务保证数据一致性&lt;/p&gt;
 *
 * @author Zhang San
 * @version 1.0.0
 * @since 2024-01-01
 * @see OrderService
 * @see OrderMapper
 */
@Service
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService {

    // ...
}`}
                />
              </div>
            )}
          </div>

          <div className="mb-4">
            <button
              onClick={() => setOpenSection(openSection === 'method-comment' ? null : 'method-comment')}
              className="w-full bg-white border-2 border-green-300 rounded-lg p-4 flex items-center justify-between hover:bg-green-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">🔧</span>
                <div className="text-left">
                  <h3 className="text-lg font-bold text-gray-900">方法注释</h3>
                  <p className="text-sm text-gray-600">描述方法功能、参数、返回值和异常</p>
                </div>
              </div>
              <span className="text-gray-400">&rbrace;</span>
            </button>
            {openSection === 'method-comment' && (
              <div className="mt-4 bg-white border border-gray-200 rounded-lg p-6">
                <CodeBlock
                  language="java"
                  code={`/**
 * 创建订单
 *
 * &lt;p&gt;创建订单的完整流程：&lt;/p&gt;
 * &lt;ol&gt;
 *   &lt;li&gt;参数校验（用户ID、商品ID、数量）&lt;/li&gt;
 *   &lt;li&gt;库存校验（调用库存服务扣减库存）&lt;/li&gt;
 *   &lt;li&gt;创建订单记录（数据库插入）&lt;/li&gt;
 *   &lt;li&gt;发送订单创建事件（异步处理）&lt;/li&gt;
 * &lt;/ol&gt;
 *
 * @param request 订单创建请求，包含用户ID、商品ID、数量等信息
 * @return 订单ID
 * @throws BusinessException 当库存不足、参数错误时抛出
 * @throws SystemException 当数据库操作失败时抛出
 * @see OrderCreateRequest
 * @see InventoryService#deduct(Long, int)
 */
@Override
@Transactional(rollbackFor = Exception.class)
public Long createOrder(OrderCreateRequest request) {
    // 业务逻辑
}`}
                />
              </div>
            )}
          </div>

          <div className="mb-4">
            <button
              onClick={() => setOpenSection(openSection === 'field-comment' ? null : 'field-comment')}
              className="w-full bg-white border-2 border-yellow-300 rounded-lg p-4 flex items-center justify-between hover:bg-yellow-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">📝</span>
                <div className="text-left">
                  <h3 className="text-lg font-bold text-gray-900">字段注释</h3>
                  <p className="text-sm text-gray-600">说明字段的用途和约束</p>
                </div>
              </div>
              <span className="text-gray-400">&rbrace;</span>
            </button>
            {openSection === 'field-comment' && (
              <div className="mt-4 bg-white border border-gray-200 rounded-lg p-6">
                <CodeBlock
                  language="java"
                  code={`/**
 * 订单实体
 */
@Data
@Table(name = "t_order")
public class Order {

    /**
     * 订单ID（主键）
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * 用户ID（外键）
     */
    @Column(name = "user_id", nullable = false)
    private Long userId;

    /**
     * 商品ID（外键）
     */
    @Column(name = "product_id", nullable = false)
    private Long productId;

    /**
     * 购买数量
     */
    @Column(name = "quantity", nullable = false)
    private Integer quantity;

    /**
     * 订单总金额（单位：分）
     */
    @Column(name = "total_amount", nullable = false)
    private Integer totalAmount;

    /**
     * 订单状态
     * @see OrderStatus
     */
    @Column(name = "status", nullable = false)
    private Integer status;

    /**
     * 创建时间
     */
    @Column(name = "create_time", nullable = false, updatable = false)
    private LocalDateTime createTime;

    /**
     * 更新时间
     */
    @Column(name = "update_time", nullable = false)
    private LocalDateTime updateTime;
}`}
                />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* README Documentation */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">README 文档规范</h2>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">README 模板</h3>

          <CodeBlock
            language="markdown"
            code={`# 项目名称

## 项目简介

简要描述项目的背景、目标和主要功能。

## 技术栈

- Spring Cloud Alibaba 2022.x
- Spring Boot 3.x
- Nacos（服务注册发现、配置中心）
- Sentinel（限流熔断）
- Seata（分布式事务）
- RocketMQ（消息队列）
- MySQL 8.0（数据库）
- Redis 7.0（缓存）

## 项目结构

\`\`\`
project-name/
├── src/main/java/
│   ├── controller/      # 控制层
│   ├── service/         # 服务层
│   ├── mapper/          # 持久化层
│   ├── entity/          # 实体类
│   ├── dto/             # 数据传输对象
│   └── config/          # 配置类
├── src/main/resources/
│   ├── mapper/          # MyBatis XML
│   ├── application.yml  # 配置文件
│   └── bootstrap.yml    # 启动配置
└── docs/                # 文档目录
\`\`\`

## 快速开始

### 环境要求

- JDK 17+
- Maven 3.6+
- MySQL 8.0+
- Redis 7.0+
- Nacos 2.x

### 启动步骤

1. 克隆项目
\`\`\`bash
git clone https://github.com/xxx/project-name.git
cd project-name
\`\`\`

2. 修改配置
\`\`\`bash
# 修改 src/main/resources/application.yml
# 配置数据库、Redis、Nacos 等连接信息
\`\`\`

3. 启动项目
\`\`\`bash
mvn clean install
mvn spring-boot:run
\`\`\`

4. 访问项目
\`\`\`
http://localhost:8080
\`\`\`

## 开发指南

### 代码规范

遵循 [阿里巴巴 Java 开发手册](https://github.com/alibaba/p3c)

### API 文档

访问 Swagger 文档：http://localhost:8080/doc.html

### 提交规范

\`\`\`
feat: 新功能
fix: 修复bug
docs: 文档更新
style: 代码格式调整
refactor: 重构代码
perf: 性能优化
test: 测试相关
chore: 构建/工具链相关
\`\`\`

## 部署指南

### Docker 部署

\`\`\`bash
docker build -t project-name:latest .
docker run -p 8080:8080 project-name:latest
\`\`\`

### K8s 部署

\`\`\`bash
kubectl apply -f k8s/deployment.yaml
\`\`\`

## 常见问题

### Q1: 如何连接 Nacos？

修改 \`bootstrap.yml\` 中的 \`spring.cloud.nacos.server-addr\` 配置。

### Q2: 如何配置数据源？

修改 \`application.yml\` 中的 \`spring.datasource\` 配置。

## 联系方式

- 邮箱：dev@example.com
- 文档：https://docs.example.com
- Issues：https://github.com/xxx/project-name/issues

## 许可证

[Apache License 2.0](LICENSE)}`}
          />
        </div>
      </section>

      {/* Database Documentation */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">数据库文档规范</h2>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">数据库设计文档</h3>

          <CodeBlock
            language="markdown"
            code={`# 数据库设计文档

## 订单表（t_order）

| 字段名 | 类型 | 长度 | 可空 | 默认值 | 说明 |
|--------|------|------|------|--------|------|
| id | BIGINT | - | 否 | AUTO | 主键ID |
| user_id | BIGINT | - | 否 | - | 用户ID |
| product_id | BIGINT | - | 否 | - | 商品ID |
| quantity | INT | - | 否 | - | 购买数量 |
| total_amount | INT | - | 否 | - | 订单总金额（分） |
| status | TINYINT | - | 否 | - | 订单状态 |
| create_time | DATETIME | - | 否 | CURRENT_TIMESTAMP | 创建时间 |
| update_time | DATETIME | - | 否 | CURRENT_TIMESTAMP ON UPDATE | 更新时间 |

### 索引

| 索引名 | 字段 | 类型 | 说明 |
|--------|------|------|------|
| PRIMARY | id | PRIMARY | 主键索引 |
| idx_user_id | user_id | INDEX | 用户ID索引 |
| idx_status | status | INDEX | 状态索引 |
| idx_create_time | create_time | INDEX | 创建时间索引 |

### 外键

| 外键名 | 字段 | 关联表 | 关联字段 |
|--------|------|--------|----------|
| fk_user | user_id | t_user | id |
| fk_product | product_id | t_product | id |

## 数据字典

### 订单状态（order_status）

| 值 | 说明 |
|----|------|
| 0 | 待支付 |
| 1 | 已支付 |
| 2 | 已发货 |
| 3 | 已完成 |
| 4 | 已取消 |`}
          />
        </div>
      </section>

      {/* Best Practices */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">文档最佳实践</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white border-l-4 border-blue-500 rounded-lg p-5 shadow-md">
            <h3 className="text-lg font-bold text-gray-900 mb-3">✅ 应该做</h3>
            <ul className="text-sm text-gray-700 space-y-2">
              <li>• <strong>及时更新</strong>：代码变更时同步更新文档</li>
              <li>• <strong>简洁明了</strong>：避免冗余，直击要点</li>
              <li>• <strong>图文并茂</strong>：适当使用图表提升可读性</li>
              <li>• <strong>版本管理</strong>：文档与代码版本同步</li>
              <li>• <strong>持续维护</strong>：定期review和更新</li>
            </ul>
          </div>
          <div className="bg-white border-l-4 border-red-500 rounded-lg p-5 shadow-md">
            <h3 className="text-lg font-bold text-gray-900 mb-3">❌ 不应该做</h3>
            <ul className="text-sm text-gray-700 space-y-2">
              <li>• <strong>不要过时</strong>：避免文档与代码不一致</li>
              <li>• <strong>不要冗长</strong>：避免无关紧要的描述</li>
              <li>• <strong>不要模糊</strong>：使用精确的语言和示例</li>
              <li>• <strong>不要遗漏</strong>：覆盖所有关键信息</li>
              <li>• <strong>不要忽视格式</strong>：保持格式一致性</li>
            </ul>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">常见问题</h2>
        <div className="space-y-4">
          {[
            {
              q: "文档应该写多详细？",
              a: "文档应该详略得当：公共接口需要详细文档，内部工具类可以简化。原则是让新人能够快速理解和使用，避免过度文档化。"
            },
            {
              q: "如何保持文档与代码同步？",
              a: "1) 将文档作为代码review的一部分；2) 使用代码生成工具（如Swagger）自动生成API文档；3) 重要变更必须更新文档；4) 定期审查文档的准确性。"
            },
            {
              q: "README 应该包含哪些内容？",
              a: "1) 项目简介和功能；2) 技术栈和架构；3) 快速开始指南；4) 开发和部署说明；5) 贡献指南；6) 许可证和联系方式。"
            }
          ].map((faq, idx) => (
            <div key={idx} className="bg-white rounded-lg shadow">
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full text-left p-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <span className="font-medium text-gray-900">{faq.q}</span>
                <span className="text-gray-400">
                  {openFaq === idx ? '−' : '+'}
                </span>
              </button>
              {openFaq === idx && (
                <div className="px-4 pb-4 text-gray-700">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Next Steps */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">下一步学习</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <a href="/code-standards" className="block bg-teal-50 hover:bg-teal-100 border border-teal-200 rounded-lg p-6 transition-colors">
            <h3 className="text-xl font-bold text-teal-900 mb-2">代码规范</h3>
            <p className="text-teal-700">Java 代码编写规范</p>
          </a>
          <a href="/config-management" className="block bg-green-50 hover:bg-green-100 border border-green-200 rounded-lg p-6 transition-colors">
            <h3 className="text-xl font-bold text-green-900 mb-2">配置管理</h3>
            <p className="text-green-700">Nacos 配置最佳实践</p>
          </a>
          <a href="/testing-strategy" className="block bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg p-6 transition-colors">
            <h3 className="text-xl font-bold text-blue-900 mb-2">测试策略</h3>
            <p className="text-blue-700">微服务测试最佳实践</p>
          </a>
        </div>
      </section>
    </div>
  );
};
