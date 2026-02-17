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

export const TestingStrategyPage: React.FC = () => {
  const [openSection, setOpenSection] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-teal-700 to-teal-900 text-white rounded-lg p-6 mb-8">
        <h1 className="text-4xl font-bold mb-2">测试策略与最佳实践</h1>
        <p className="text-teal-100">Spring Cloud Alibaba 微服务测试完整指南</p>
        <div className="flex gap-3 text-sm mt-4">
          <span className="px-3 py-1 bg-white/20 rounded-full">🔧 最佳实践</span>
          <span className="px-3 py-1 bg-white/20 rounded-full">⏱️ 约50分钟</span>
          <span className="px-3 py-1 bg-white/20 rounded-full">📋 5大测试类型</span>
        </div>
      </div>

      {/* Why Testing */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">为什么需要测试策略？</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white border-l-4 border-blue-500 rounded-lg p-5 shadow-md">
            <h3 className="text-lg font-bold text-gray-900 mb-3">🎯 质量保障</h3>
            <ul className="text-sm text-gray-700 space-y-2">
              <li>• 发现并修复缺陷，提升代码质量</li>
              <li>• 验证业务逻辑正确性</li>
              <li>• 防止回归问题</li>
              <li>• 提高系统稳定性</li>
            </ul>
          </div>
          <div className="bg-white border-l-4 border-green-500 rounded-lg p-5 shadow-md">
            <h3 className="text-lg font-bold text-gray-900 mb-3">💰 成本控制</h3>
            <ul className="text-sm text-gray-700 space-y-2">
              <li>• 早期发现问题，修复成本更低</li>
              <li>• 减少生产故障损失</li>
              <li>• 降低维护成本</li>
              <li>• 提高重构信心</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Unit Testing */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">单元测试</h2>
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">核心原则</h3>
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="text-2xl mb-2">🔬</div>
              <h4 className="font-bold text-blue-900 mb-1">隔离性</h4>
              <p className="text-blue-700 text-sm">独立测试，不依赖外部服务</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="text-2xl mb-2">⚡</div>
              <h4 className="font-bold text-green-900 mb-1">快速执行</h4>
              <p className="text-green-700 text-sm">毫秒级响应，频繁运行</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <div className="text-2xl mb-2">📊</div>
              <h4 className="font-bold text-purple-900 mb-1">高覆盖率</h4>
              <p className="text-purple-700 text-sm">核心逻辑覆盖率 &gt;80%</p>
            </div>
          </div>

          <h4 className="font-bold text-gray-900 mb-3">技术栈</h4>
          <div className="bg-gray-50 p-4 rounded-lg mb-4">
            <CodeBlock
              language="xml"
              code={`<!-- pom.xml 依赖 -->
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
        </div>

        {/* Unit Test Examples */}
        <div className="space-y-4">
          <div className="mb-4">
            <button
              onClick={() => setOpenSection(openSection === 'service-test' ? null : 'service-test')}
              className="w-full bg-white border-2 border-blue-300 rounded-lg p-4 flex items-center justify-between hover:bg-blue-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">🎯</span>
                <div className="text-left">
                  <h3 className="text-lg font-bold text-gray-900">Service 层单元测试</h3>
                  <p className="text-sm text-gray-600">使用 Mockito 模拟依赖</p>
                </div>
              </div>
              <span className="text-gray-400">&rbrace;</span>
            </button>
            {openSection === 'service-test' && (
              <div className="mt-4 bg-white border border-gray-200 rounded-lg p-6">
                <CodeBlock
                  language="java"
                  code={`@ExtendWith(MockitoExtension.class)
class OrderServiceTest {

    @Mock
    private OrderMapper orderMapper;

    @Mock
    private InventoryService inventoryService;

    @InjectMocks
    private OrderServiceImpl orderService;

    @Test
    @DisplayName("创建订单 - 成功")
    void createOrder_Success() {
        // Given
        OrderCreateRequest request = new OrderCreateRequest();
        request.setUserId(1L);
        request.setProductId(100L);
        request.setQuantity(2);

        Order savedOrder = new Order();
        savedOrder.setId(1L);

        when(orderMapper.insert(any(Order.class)))
            .thenReturn(1);
        when(inventoryService.deduct(100L, 2))
            .thenReturn(true);

        // When
        Long orderId = orderService.createOrder(request);

        // Then
        assertThat(orderId).isEqualTo(1L);
        verify(inventoryService, times(1))
            .deduct(100L, 2);
        verify(orderMapper, times(1))
            .insert(any(Order.class));
    }

    @Test
    @DisplayName("创建订单 - 库存不足")
    void createOrder_InsufficientInventory() {
        // Given
        OrderCreateRequest request = new OrderCreateRequest();
        request.setQuantity(100);

        when(inventoryService.deduct(anyLong(), anyInt()))
            .thenReturn(false);

        // When & Then
        assertThatThrownBy(() ->
            orderService.createOrder(request)
        ).isInstanceOf(BusinessException.class)
         .hasMessage("库存不足");
    }
}`}
                />
              </div>
            )}
          </div>

          <div className="mb-4">
            <button
              onClick={() => setOpenSection(openSection === 'controller-test' ? null : 'controller-test')}
              className="w-full bg-white border-2 border-green-300 rounded-lg p-4 flex items-center justify-between hover:bg-green-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">🌐</span>
                <div className="text-left">
                  <h3 className="text-lg font-bold text-gray-900">Controller 层单元测试</h3>
                  <p className="text-sm text-gray-600">使用 MockMvc 测试 API</p>
                </div>
              </div>
              <span className="text-gray-400">&rbrace;</span>
            </button>
            {openSection === 'controller-test' && (
              <div className="mt-4 bg-white border border-gray-200 rounded-lg p-6">
                <CodeBlock
                  language="java"
                  code={`@WebMvcTest(OrderController.class)
class OrderControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private OrderService orderService;

    @Test
    @DisplayName("查询订单 - 成功")
    void getOrder_Success() throws Exception {
        // Given
        OrderResponse response = new OrderResponse();
        response.setId(1L);
        response.setUserId(100L);

        when(orderService.getOrderById(1L))
            .thenReturn(response);

        // When & Then
        mockMvc.perform(get("/api/orders/1")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.userId").value(100))
                .andExpect(jsonPath("$.code")
                    .value("SUCCESS"));
    }

    @Test
    @DisplayName("创建订单 - 参数校验失败")
    void createOrder_ValidationFailed() throws Exception {
        // Given
        String invalidJson = """
            {"userId": null, "productId": 100}
            """;

        // When & Then
        mockMvc.perform(post("/api/orders")
                .contentType(MediaType.APPLICATION_JSON)
                .content(invalidJson))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.message")
                    .value(containsString("userId")));
    }
}`}
                />
              </div>
            )}
          </div>

          <div className="mb-4">
            <button
              onClick={() => setOpenSection(openSection === 'repository-test' ? null : 'repository-test')}
              className="w-full bg-white border-2 border-yellow-300 rounded-lg p-4 flex items-center justify-between hover:bg-yellow-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">💾</span>
                <div className="text-left">
                  <h3 className="text-lg font-bold text-gray-900">Repository 层单元测试</h3>
                  <p className="text-sm text-gray-600">使用 @DataJpaTest</p>
                </div>
              </div>
              <span className="text-gray-400">&rbrace;</span>
            </button>
            {openSection === 'repository-test' && (
              <div className="mt-4 bg-white border border-gray-200 rounded-lg p-6">
                <CodeBlock
                  language="java"
                  code={`@DataJpaTest
@AutoConfigureTestDatabase(replace = NONE)
class OrderMapperTest {

    @Autowired
    private TestEntityManager entityManager;

    @Autowired
    private OrderMapper orderMapper;

    @Test
    @DisplayName("根据ID查询订单")
    void findById_Success() {
        // Given
        Order order = new Order();
        order.setUserId(1L);
        order.setTotalAmount(10000);
        entityManager.persist(order);
        entityManager.flush();

        // When
        Order found = orderMapper.findById(order.getId());

        // Then
        assertThat(found).isNotNull();
        assertThat(found.getUserId()).isEqualTo(1L);
        assertThat(found.getTotalAmount()).isEqualTo(10000);
    }

    @Test
    @DisplayName("根据用户ID分页查询")
    void findByUserId_WithPageable() {
        // Given
        for (int i = 0; i < 25; i++) {
            Order order = new Order();
            order.setUserId(1L);
            entityManager.persist(order);
        }

        // When
        Page<Order> page = orderMapper
            .findByUserId(1L, PageRequest.of(0, 10));

        // Then
        assertThat(page.getTotalElements())
            .isEqualTo(25);
        assertThat(page.getContent())
            .hasSize(10);
    }
}`}
                />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Integration Testing */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">集成测试</h2>
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">TestContainers 集成测试</h3>
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div className="bg-orange-50 p-4 rounded-lg">
              <div className="text-2xl mb-2">🐳</div>
              <h4 className="font-bold text-orange-900 mb-1">真实环境</h4>
              <p className="text-orange-700 text-sm">使用 Docker 容器运行真实数据库</p>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="text-2xl mb-2">🔄</div>
              <h4 className="font-bold text-blue-900 mb-1">端到端测试</h4>
              <p className="text-blue-700 text-sm">验证多个组件协作</p>
            </div>
          </div>

          <h4 className="font-bold text-gray-900 mb-3">依赖配置</h4>
          <CodeBlock
            language="xml"
            code={`<!-- TestContainers 依赖 -->
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
</dependency>
<dependency>
    <groupId>org.testcontainers</groupId>
    <artifactId>junit-jupiter</artifactId>
    <version>1.19.0</version>
    <scope>test</scope>
</dependency>`}
          />
        </div>

        <div className="mb-4">
          <button
            onClick={() => setOpenSection(openSection === 'integration-test' ? null : 'integration-test')}
            className="w-full bg-white border-2 border-orange-300 rounded-lg p-4 flex items-center justify-between hover:bg-orange-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">🧪</span>
              <div className="text-left">
                <h3 className="text-lg font-bold text-gray-900">集成测试示例</h3>
                <p className="text-sm text-gray-600">完整业务流程测试</p>
              </div>
            </div>
            <span className="text-gray-400">&rbrace;</span>
          </button>
          {openSection === 'integration-test' && (
            <div className="mt-4 bg-white border border-gray-200 rounded-lg p-6">
              <CodeBlock
                language="java"
                code={`@SpringBootTest
@Testcontainers
class OrderIntegrationTest {

    @Container
    static MySQLContainer<?> mysql =
        new MySQLContainer<>("mysql:8.0")
            .withDatabaseName("testdb")
            .withUsername("test")
            .withPassword("test");

    @DynamicPropertySource
    static void mysqlProperties(DynamicPropertyRegistry registry) {
        registry.add("spring.datasource.url",
            mysql::getJdbcUrl);
        registry.add("spring.datasource.username",
            mysql::getUsername);
        registry.add("spring.datasource.password",
            mysql::getPassword);
    }

    @Autowired
    private OrderService orderService;

    @Autowired
    private OrderMapper orderMapper;

    @Test
    @DisplayName("创建订单完整流程")
    void createOrder_FullFlow() {
        // Given
        OrderCreateRequest request =
            new OrderCreateRequest();
        request.setUserId(1L);
        request.setProductId(100L);
        request.setQuantity(2);

        // When
        Long orderId = orderService.createOrder(request);

        // Then
        Order order = orderMapper
            .findById(orderId);
        assertThat(order).isNotNull();
        assertThat(order.getUserId())
            .isEqualTo(1L);
        assertThat(order.getStatus())
            .isEqualTo(OrderStatus.PENDING);
    }

    @Test
    @DisplayName("事务回滚测试")
    void transaction_Rollback() {
        // Given
        OrderCreateRequest request =
            new OrderCreateRequest();
        request.setQuantity(-1); // 无效数量

        // When & Then
        assertThatThrownBy(() ->
            orderService.createOrder(request)
        ).isInstanceOf(BusinessException.class);

        // 验证数据库没有插入
        List<Order> orders =
            orderMapper.findByUserId(1L);
        assertThat(orders).isEmpty();
    }
}`}
              />
            </div>
          )}
        </div>
      </section>

      {/* Contract Testing */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">契约测试</h2>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Spring Cloud Contract</h3>
          <p className="text-gray-700 mb-4">
            契约测试确保服务提供者和服务消费者之间的 API 契约一致性，防止接口变更导致的问题。
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-bold text-blue-900 mb-2">📝 定义契约</h4>
              <CodeBlock
                language="groovy"
                code={`// src/test/resources/contracts/
// get_order_contract.groovy
org.springframework.cloud.contract.spec.Contract.make {
    request {
        method 'GET'
        url '/api/orders/1'
        headers {
            header('Content-Type', 'application/json')
        }
    }
    response {
        status 200
        body([
            id: 1,
            userId: 100,
            totalAmount: 10000,
            status: "PAID"
        ])
        headers {
            header('Content-Type', 'application/json')
        }
    }
}`}
              />
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <h4 className="font-bold text-green-900 mb-2">✅ 生产端测试</h4>
              <CodeBlock
                language="groovy"
                code={`// build.gradle (生产者)
contracts {
    testMode = 'MockMvc'
    baseClassForTests =
        'com.example.BaseContractTest'
}

dependencies {
    testImplementation 'org.springframework.cloud:spring-cloud-starter-contract-verifier'
}

// 自动生成测试
// generated-test-sources/contracts/...`}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Performance Testing */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">性能测试</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white border-l-4 border-purple-500 rounded-lg p-5 shadow-md">
            <h3 className="text-lg font-bold text-gray-900 mb-3">🚀 JMeter</h3>
            <div className="text-sm space-y-2">
              <p className="text-gray-700">Apache JMeter 是主流的性能测试工具</p>
              <ul className="text-gray-600 space-y-1">
                <li>• 支持多种协议 (HTTP, JDBC, JMS)</li>
                <li>• 分布式压测</li>
                <li>• 丰富的结果分析</li>
              </ul>
            </div>
          </div>
          <div className="bg-white border-l-4 border-indigo-500 rounded-lg p-5 shadow-md">
            <h3 className="text-lg font-bold text-gray-900 mb-3">⚡ Gatling</h3>
            <div className="text-sm space-y-2">
              <p className="text-gray-700">Gatling 是高性能的压测工具（Scala DSL）</p>
              <ul className="text-gray-600 space-y-1">
                <li>• 基于 Scala，性能更强</li>
                <li>• 优雅的 DSL</li>
                <li>• 实时监控报告</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Testing Best Practices */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">测试最佳实践</h2>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-bold text-green-900 mb-2">✅ 应该做</h4>
                <ul className="text-green-800 text-sm space-y-1">
                  <li>• 遵循 AAA 模式（Arrange-Act-Assert）</li>
                  <li>• 使用 @DisplayName 描述测试意图</li>
                  <li>• 一个测试只验证一个行为</li>
                  <li>• 测试方法命名清晰（given_when_then）</li>
                  <li>• 使用 AssertJ 断言库，提高可读性</li>
                  <li>• 保持测试独立性</li>
                  <li>• 边界条件必须测试</li>
                </ul>
              </div>
            </div>
            <div className="space-y-4">
              <div className="bg-red-50 p-4 rounded-lg">
                <h4 className="font-bold text-red-900 mb-2">❌ 不应该做</h4>
                <ul className="text-red-800 text-sm space-y-1">
                  <li>• 避免测试私有方法</li>
                  <li>• 不要在测试中写业务逻辑</li>
                  <li>• 不要使用随机数据（不可复现）</li>
                  <li>• 避免测试依赖执行顺序</li>
                  <li>• 不要忽略测试失败</li>
                  <li>• 避免过度使用 Mock</li>
                  <li>• 不要在测试中访问外部服务</li>
                </ul>
              </div>
            </div>
          </div>

          <h4 className="font-bold text-gray-900 mt-6 mb-3">测试命名规范</h4>
          <CodeBlock
            language="java"
            code={`// ✅ 好的测试命名
@Test
@DisplayName("创建订单 - 库存不足时抛出异常")
void createOrder_InsufficientInventory_ThrowsException() { }

@Test
@DisplayName("查询订单 - 订单不存在返回null")
void getOrder_NotFound_ReturnsNull() { }

// ❌ 不好的测试命名
@Test
void test1() { }
@Test
void testOrder() { }
@Test
void testOrderSuccess() { }`}
          />
        </div>
      </section>

      {/* Test Coverage */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">测试覆盖率</h2>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">JaCoCo 配置</h3>
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

<!-- 运行测试并生成报告 -->
<!-- mvn clean test jacoco:report -->`}
          />
        </div>
      </section>

      {/* FAQ */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">常见问题</h2>
          <div className="space-y-4">
            {[
              {
                q: "单元测试和集成测试的比例应该是多少？",
                a: "建议采用测试金字塔原则：70% 单元测试 + 20% 集成测试 + 10% 端到端测试。单元测试运行快、维护成本低，应该是测试的主体。"
              },
              {
                q: "如何测试私有方法？",
                a: "不应该直接测试私有方法。私有方法是实现细节，应该通过测试公共方法来间接验证私有方法的正确性。如果需要测试，考虑重构为独立的类或包级私有方法。"
              },
              {
                q: "Mock 什么时候使用？",
                a: "Mock 适用于：1) 外部依赖（数据库、第三方 API）；2) 尚未实现的模块；3) 难以触发的场景（异常、超时）。不要过度 Mock，会导致测试脱离真实场景。"
              },
              {
                q: "测试覆盖率要达到多少？",
                a: "建议核心业务逻辑覆盖率 ≥80%，工具类、辅助类可以适当降低。覆盖率是质量保障的手段，不是目标，不要为了数字写无效测试。"
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
          <a href="/config-management" className="block bg-teal-50 hover:bg-teal-100 border border-teal-200 rounded-lg p-6 transition-colors">
            <h3 className="text-xl font-bold text-teal-900 mb-2">配置管理</h3>
            <p className="text-teal-700">Nacos 配置最佳实践</p>
          </a>
          <a href="/exception-handling" className="block bg-green-50 hover:bg-green-100 border border-green-200 rounded-lg p-6 transition-colors">
            <h3 className="text-xl font-bold text-green-900 mb-2">异常处理</h3>
            <p className="text-green-700">统一异常处理机制</p>
          </a>
          <a href="/doc-standards" className="block bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg p-6 transition-colors">
            <h3 className="text-xl font-bold text-blue-900 mb-2">文档规范</h3>
            <p className="text-blue-700">项目文档编写规范</p>
          </a>
        </div>
      </section>
    </div>
  );
};
