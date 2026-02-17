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

export const CodeStandardsPage: React.FC = () => {
  const [openSection, setOpenSection] = useState<string | null>(null);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-teal-600 to-teal-800 text-white rounded-lg p-6 mb-8">
        <h1 className="text-4xl font-bold mb-2">代码规范与最佳实践</h1>
        <p className="text-teal-100">Spring Cloud Alibaba 项目代码规范手册</p>
        <div className="flex gap-3 text-sm mt-4">
          <span className="px-3 py-1 bg-white/20 rounded-full">🔧 最佳实践</span>
          <span className="px-3 py-1 bg-white/20 rounded-full">⏱️ 约40分钟</span>
          <span className="px-3 py-1 bg-white/20 rounded-full">📋 7大规范</span>
        </div>
      </div>

      {/* Naming Conventions */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">命名规范</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white border-l-4 border-blue-500 rounded-lg p-5 shadow-md">
            <h3 className="text-lg font-bold text-gray-900 mb-3">📝 包命名</h3>
            <div className="text-sm space-y-2">
              <p className="text-gray-700"><strong>全部小写</strong>，域名倒序</p>
              <CodeBlock language="java" code={`// ✅ 正确
package com.alibaba.cloud.example;
package com.company.project.module;

// ❌ 错误
package com.Alibaba.Cloud.Example;`} />
            </div>
          </div>
          <div className="bg-white border-l-4 border-green-500 rounded-lg p-5 shadow-md">
            <h3 className="text-lg font-bold text-gray-900 mb-3">📝 类命名</h3>
            <div className="text-sm space-y-2">
              <p className="text-gray-700"><strong>帕斯卡命名法</strong>，首字母大写</p>
              <CodeBlock language="java" code={`// ✅ 正确
public class OrderService { }
public class UserController { }
public class PaymentServiceImpl { }

// ❌ 错误
public class order_service { }
public class usercontroller { }`} />
            </div>
          </div>
          <div className="bg-white border-l-4 border-yellow-500 rounded-lg p-5 shadow-md">
            <h3 className="text-lg font-bold text-gray-900 mb-3">📝 方法命名</h3>
            <div className="text-sm space-y-2">
              <p className="text-gray-700"><strong>驼峰命名法</strong>，首字母小写</p>
              <CodeBlock language="java" code={`// ✅ 正确
public void getUserById(Long userId) { }
public boolean createOrder(OrderRequest request) { }

// ❌ 错误
public void Get_User_By_Id(Long id) { }
public boolean createorder(OrderRequest req) { }`} />
            </div>
          </div>
          <div className="bg-white border-l-4 border-purple-500 rounded-lg p-5 shadow-md">
            <h3 className="text-lg font-bold text-gray-900 mb-3">📝 常量命名</h3>
            <div className="text-sm space-y-2">
              <p className="text-gray-700"><strong>全大写下划线</strong></p>
              <CodeBlock language="java" code={`// ✅ 正确
private static final String DEFAULT_PAGE_SIZE = "10";
public static final int MAX_RETRY_COUNT = 3;

// ❌ 错误
private static final String default_page_size = "10";
public static final int maxRetryCount = 3;`} />
            </div>
          </div>
        </div>
      </section>

      {/* Comment Standards */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">注释规范</h2>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="mb-6">
            <button
              onClick={() => setOpenSection(openSection === 'class-comment' ? null : 'class-comment')}
              className="w-full bg-gray-50 border border-gray-300 rounded-lg p-4 flex items-center justify-between hover:bg-gray-100 transition-colors"
            >
              <h3 className="text-lg font-bold text-gray-900">类注释</h3>
              <span className="text-gray-400">&rbrace;</span>
            </button>
            {openSection === 'class-comment' && (
              <div className="mt-4">
                <CodeBlock
                  language="java"
                  code={`/**
 * 订单服务实现类
 *
 * <p>负责订单的创建、查询、更新、删除等核心业务逻辑</p>
 * <p>支持订单状态流转、库存扣减、支付集成等功能</p>
 *
 * @author Zhang San
 * @version 1.0.0
 * @since 2024-01-01
 */
@Service
public class OrderServiceImpl implements OrderService {
    // ...
}`}
                />
              </div>
            )}
          </div>

          <div className="mb-6">
            <button
              onClick={() => setOpenSection(openSection === 'method-comment' ? null : 'method-comment')}
              className="w-full bg-gray-50 border border-gray-300 rounded-lg p-4 flex items-center justify-between hover:bg-gray-100 transition-colors"
            >
              <h3 className="text-lg font-bold text-gray-900">方法注释</h3>
              <span className="text-gray-400">&rbrace;</span>
            </button>
            {openSection === 'method-comment' && (
              <div className="mt-4">
                <CodeBlock
                  language="java"
                  code={`/**
 * 创建订单
 *
 * <p>根据订单请求创建订单，包括库存校验、优惠券使用、金额计算等</p>
 *
 * @param request 订单创建请求
 * @return 订单ID
 * @throws BusinessException 业务异常（库存不足、商品不存在等）
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

          <div>
            <button
              onClick={() => setOpenSection(openSection === 'field-comment' ? null : 'field-comment')}
              className="w-full bg-gray-50 border border-gray-300 rounded-lg p-4 flex items-center justify-between hover:bg-gray-100 transition-colors"
            >
              <h3 className="text-lg font-bold text-gray-900">字段注释</h3>
              <span className="text-gray-400">&rbrace;</span>
            </button>
            {openSection === 'field-comment' && (
              <div className="mt-4">
                <CodeBlock
                  language="java"
                  code={`public class Order {
    /**
     * 订单ID
     */
    private Long id;

    /**
     * 用户ID
     */
    private Long userId;

    /**
     * 订单总金额（单位：分）
     */
    private Integer totalAmount;

    /**
     * 订单状态
     * @see OrderStatus
     */
    private Integer status;
}`}
                />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Code Structure */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">代码结构规范</h2>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">标准三层结构</h3>
          <CodeBlock
            language="text"
            code={`src/main/java/com/example/
├── controller/          # 控制层（接收请求、返回响应）
│   └── OrderController.java
├── service/             # 服务层（业务逻辑）
│   ├── OrderService.java        # 接口
│   └── impl/
│       └── OrderServiceImpl.java  # 实现
├── mapper/              # 持久化层（数据库操作）
│   └── OrderMapper.java
├── entity/              # 实体类
│   ├── Order.java
│   └── User.java
├── dto/                 # 数据传输对象
│   ├── request/
│   │   └── OrderCreateRequest.java
│   └── response/
│       └── OrderResponse.java
├── enums/               # 枚举类
│   └── OrderStatus.java
└── exception/           # 异常类
    └── BusinessException.java`}
          />
        </div>
      </section>

      {/* Exception Handling */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">异常处理规范</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white border-l-4 border-red-500 rounded-lg p-5 shadow-md">
            <h3 className="text-lg font-bold text-gray-900 mb-3">❌ 不要捕获通用异常</h3>
            <CodeBlock
              language="java"
              code={`// ❌ 错误
try {
    doSomething();
} catch (Exception e) {
    log.error("Error", e);
}

// ✅ 正确
try {
    doSomething();
} catch (BusinessException e) {
    log.warn("Business error: {}", e.getMessage());
    throw e;
} catch (Exception e) {
    log.error("System error", e);
    throw new SystemException("操作失败", e);
}`}
            />
          </div>
          <div className="bg-white border-l-4 border-green-500 rounded-lg p-5 shadow-md">
            <h3 className="text-lg font-bold text-gray-900 mb-3">✅ 自定义业务异常</h3>
            <CodeBlock
              language="java"
              code={`@Getter
@AllArgsConstructor
public class BusinessException extends RuntimeException {
    private final String code;

    public BusinessException(String message) {
        super(message);
        this.code = "BUSINESS_ERROR";
    }

    public BusinessException(String code, String message) {
        super(message);
        this.code = code;
    }
}`}
            />
          </div>
        </div>
      </section>

      {/* Logging Standards */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">日志规范</h2>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="space-y-4">
            <div className="bg-blue-50 p-4 rounded">
              <h4 className="font-bold text-blue-800 mb-2">日志级别使用</h4>
              <CodeBlock
                language="java"
                code={`// TRACE：最详细的调试信息
log.trace("Order created: {}", order);

// DEBUG：调试信息（生产环境关闭）
log.debug("Current page: {}, size: {}", pageNum, pageSize);

// INFO：重要业务流程
log.info("Order created successfully: orderId={}, userId={}", orderId, userId);

// WARN：警告但不影响运行
log.warn("Redis connection slow, using fallback cache");

// ERROR：错误异常（必须记录）
log.error("Failed to create order", e);`}
              />
            </div>
            <div className="bg-yellow-50 p-4 rounded">
              <h4 className="font-bold text-yellow-800 mb-2">日志格式规范</h4>
              <CodeBlock
                language="java"
                code={`// ✅ 正确：包含关键信息
log.info("Order created: orderId={}, userId={}, amount={}", orderId, userId, amount);

// ❌ 错误：缺少关键信息
log.info("Order created");

// ❌ 错误：字符串拼接（性能差）
log.info("Order created: orderId=" + orderId + ", userId=" + userId);`}
              />
            </div>
            <div className="bg-red-50 p-4 rounded">
              <h4 className="font-bold text-red-800 mb-2">异常日志规范</h4>
              <CodeBlock
                language="java"
                code={`// ✅ 正确：记录堆栈和参数
log.error("Failed to deduct stock: productId={}, quantity={}", productId, quantity, e);

// ❌ 错误：只记录异常，没有参数
log.error("Failed to deduct stock", e);`}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Transaction Standards */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">事务规范</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white border-l-4 border-blue-500 rounded-lg p-5 shadow-md">
            <h3 className="text-lg font-bold text-gray-900 mb-3">✅ 事务注解规范</h3>
            <CodeBlock
              language="java"
              code={`// Service 层方法添加事务
@Service
public class OrderServiceImpl implements OrderService {
    // ✅ 正确：方法级别事务
    @Override
    @Transactional(rollbackFor = Exception.class)
    public Long createOrder(OrderCreateRequest request) {
        // 业务逻辑
    }

    // ❌ 错误：Controller 层不加事务
    @RestController
    public class OrderController {
        @Transactional  // 不要在 Controller 加事务
        public Long createOrder(@RequestBody OrderDTO dto) {
            // ...
        }
    }
}`}
            />
          </div>
          <div className="bg-white border-l-4 border-green-500 rounded-lg p-5 shadow-md">
            <h3 className="text-lg font-bold text-gray-900 mb-3">✅ 事务传播行为</h3>
            <CodeBlock
              language="java"
              code={`@Transactional(rollbackFor = Exception.class)
public Long createOrder(OrderCreateRequest request) {
    // 1. 创建订单
    Order order = buildOrder(request);

    // 2. 调用库存服务（REQUIRES_NEW 开启新事务）
    inventoryService.deduct(order.getProductId(), order.getQuantity());

    // 3. 调用优惠券服务（REQUIRES_NEW 开启新事务）
    couponService.use(order.getCouponId());

    return order.getId();
}`}
            />
          </div>
        </div>
      </section>

      {/* Best Practices Summary */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">最佳实践总结</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {[
            { title: '单一职责', desc: '每个类只负责一个功能', icon: '🎯' },
            { title: '开闭原则', desc: '对扩展开放，对修改关闭', icon: '🔓' },
            { title: '依赖倒置', desc: '依赖抽象而非具体实现', icon: '🔄' },
            { title: '接口隔离', desc: '使用小而专用的接口', icon: '📦' },
            { title: '迪米特法则', desc: '最少知道原则', icon: '🤝' },
            { title: '组合优于继承', desc: '优先使用组合', icon: '🧩' },
          ].map((practice) => (
            <div key={practice.title} className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-shadow">
              <div className="text-2xl mb-2">{practice.icon}</div>
              <h3 className="font-bold text-gray-900 mb-1">{practice.title}</h3>
              <p className="text-gray-600 text-sm">{practice.desc}</p>
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
          <a href="/testing-strategy" className="block bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg p-6 transition-colors">
            <h3 className="text-xl font-bold text-blue-900 mb-2">测试策略</h3>
            <p className="text-blue-700">单元测试与集成测试</p>
          </a>
        </div>
      </section>
    </div>
  );
};
