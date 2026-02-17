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

export const ExceptionHandlingPage: React.FC = () => {
  const [openSection, setOpenSection] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-teal-700 to-teal-900 text-white rounded-lg p-6 mb-8">
        <h1 className="text-4xl font-bold mb-2">统一异常处理机制</h1>
        <p className="text-teal-100">Spring Cloud Alibaba 异常处理最佳实践</p>
        <div className="flex gap-3 text-sm mt-4">
          <span className="px-3 py-1 bg-white/20 rounded-full">🔧 最佳实践</span>
          <span className="px-3 py-1 bg-white/20 rounded-full">⏱️ 约35分钟</span>
          <span className="px-3 py-1 bg-white/20 rounded-full">📋 6大核心模块</span>
        </div>
      </div>

      {/* Why Exception Handling */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">为什么需要统一异常处理？</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white border-l-4 border-blue-500 rounded-lg p-5 shadow-md">
            <h3 className="text-lg font-bold text-gray-900 mb-3">❌ 没有统一处理的问题</h3>
            <ul className="text-sm text-gray-700 space-y-2">
              <li>• <strong>代码重复</strong>：每个接口都要处理异常</li>
              <li>• <strong>格式不统一</strong>：错误响应格式不一致</li>
              <li>• <strong>信息泄漏</strong>：堆栈信息暴露给前端</li>
              <li>• <strong>难以维护</strong>：异常处理逻辑分散</li>
              <li>• <strong>体验差</strong>：用户看不到友好提示</li>
            </ul>
          </div>
          <div className="bg-white border-l-4 border-green-500 rounded-lg p-5 shadow-md">
            <h3 className="text-lg font-bold text-gray-900 mb-3">✅ 统一处理的优势</h3>
            <ul className="text-sm text-gray-700 space-y-2">
              <li>• <strong>集中管理</strong>：全局统一处理异常</li>
              <li>• <strong>格式统一</strong>：标准化错误响应</li>
              <li>• <strong>安全性高</strong>：避免敏感信息泄漏</li>
              <li>• <strong>易于维护</strong>：异常处理逻辑集中</li>
              <li>• <strong>用户友好</strong>：清晰的错误提示</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Custom Exceptions */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">自定义异常</h2>
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">异常设计</h3>

          <h4 className="font-bold text-gray-900 mb-2">1. 基础异常类</h4>
          <CodeBlock
            language="java"
            code={`/**
 * 基础异常类
 */
@Getter
@AllArgsConstructor
public class BaseException extends RuntimeException {

    private final String code;
    private final String message;

    public BaseException(ErrorCode errorCode) {
        super(errorCode.getMessage());
        this.code = errorCode.getCode();
        this.message = errorCode.getMessage();
    }

    public BaseException(ErrorCode errorCode, String message) {
        super(message);
        this.code = errorCode.getCode();
        this.message = message;
    }

    public BaseException(ErrorCode errorCode, Throwable cause) {
        super(errorCode.getMessage(), cause);
        this.code = errorCode.getCode();
        this.message = errorCode.getMessage();
    }
}`}
          />

          <h4 className="font-bold text-gray-900 mb-2 mt-6">2. 业务异常</h4>
          <CodeBlock
            language="java"
            code={`/**
 * 业务异常
 */
public class BusinessException extends BaseException {

    public BusinessException(ErrorCode errorCode) {
        super(errorCode);
    }

    public BusinessException(String code, String message) {
        super(code, message);
    }

    public BusinessException(ErrorCode errorCode, String message) {
        super(errorCode, message);
    }

    public static void throwIf(boolean condition, ErrorCode errorCode) {
        if (condition) {
            throw new BusinessException(errorCode);
        }
    }

    public static void throwIf(boolean condition, String code, String message) {
        if (condition) {
            throw new BusinessException(code, message);
        }
    }
}`}
          />

          <h4 className="font-bold text-gray-900 mb-2 mt-6">3. 系统异常</h4>
          <CodeBlock
            language="java"
            code={`/**
 * 系统异常
 */
public class SystemException extends BaseException {

    public SystemException(ErrorCode errorCode) {
        super(errorCode);
    }

    public SystemException(ErrorCode errorCode, Throwable cause) {
        super(errorCode, cause);
    }

    public SystemException(String code, String message, Throwable cause) {
        super(code, message, cause);
    }
}`}
          />

          <h4 className="font-bold text-gray-900 mb-2 mt-6">4. 错误码枚举</h4>
          <CodeBlock
            language="java"
            code={`/**
 * 错误码枚举
 */
@Getter
@AllArgsConstructor
public enum ErrorCode {

    // 通用错误码 1xxx
    SUCCESS("0000", "成功"),
    SYSTEM_ERROR("1000", "系统错误"),
    PARAM_ERROR("1001", "参数错误"),
    NOT_FOUND("1002", "资源不存在"),
    UNAUTHORIZED("1003", "未授权"),
    FORBIDDEN("1004", "无权限"),

    // 用户相关 2xxx
    USER_NOT_FOUND("2001", "用户不存在"),
    USER_DISABLED("2002", "用户已禁用"),
    PASSWORD_ERROR("2003", "密码错误"),

    // 订单相关 3xxx
    ORDER_NOT_FOUND("3001", "订单不存在"),
    ORDER_STATUS_ERROR("3002", "订单状态错误"),
    STOCK_INSUFFICIENT("3003", "库存不足"),

    // 支付相关 4xxx
    PAYMENT_FAILED("4001", "支付失败"),
    PAYMENT_TIMEOUT("4002", "支付超时");

    private final String code;
    private final String message;
}`}
          />
        </div>
      </section>

      {/* Global Exception Handler */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">全局异常处理器</h2>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">@ControllerAdvice</h3>
          <p className="text-gray-700 mb-6">
            使用 @ControllerAdvice + @ExceptionHandler 实现全局异常处理，统一异常响应格式。
          </p>

          <CodeBlock
            language="java"
            code={`/**
 * 全局异常处理器
 */
@RestControllerAdvice
@Slf4j
public class GlobalExceptionHandler {

    /**
     * 业务异常处理
     */
    @ExceptionHandler(BusinessException.class)
    public ResponseEntity<Result<Void>> handleBusinessException(
            BusinessException ex, WebRequest request) {
        log.warn("Business exception: {} - {}", ex.getCode(), ex.getMessage());
        return ResponseEntity
            .status(HttpStatus.BAD_REQUEST)
            .body(Result.error(ex.getCode(), ex.getMessage()));
    }

    /**
     * 系统异常处理
     */
    @ExceptionHandler(SystemException.class)
    public ResponseEntity<Result<Void>> handleSystemException(
            SystemException ex, WebRequest request) {
        log.error("System exception: {} - {}", ex.getCode(), ex.getMessage(), ex);
        return ResponseEntity
            .status(HttpStatus.INTERNAL_SERVER_ERROR)
            .body(Result.error(ex.getCode(), "系统错误，请稍后重试"));
    }

    /**
     * 参数校验异常
     */
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Result<Void>> handleValidationException(
            MethodArgumentNotValidException ex) {
        String message = ex.getBindingResult()
            .getFieldErrors()
            .stream()
            .map(error -> error.getField() + ": " + error.getDefaultMessage())
            .collect(Collectors.joining(", "));
        log.warn("Validation exception: {}", message);
        return ResponseEntity
            .status(HttpStatus.BAD_REQUEST)
            .body(Result.error(ErrorCode.PARAM_ERROR.getCode(), message));
    }

    /**
     * 缺少请求参数异常
     */
    @ExceptionHandler(MissingServletRequestParameterException.class)
    public ResponseEntity<Result<Void>> handleMissingParams(
            MissingServletRequestParameterException ex) {
        String message = "缺少必需参数: " + ex.getParameterName();
        log.warn("Missing parameter: {}", message);
        return ResponseEntity
            .status(HttpStatus.BAD_REQUEST)
            .body(Result.error(ErrorCode.PARAM_ERROR.getCode(), message));
    }

    /**
     * HTTP 方法不支持
     */
    @ExceptionHandler(HttpRequestMethodNotSupportedException.class)
    public ResponseEntity<Result<Void>> handleMethodNotSupported(
            HttpRequestMethodNotSupportedException ex) {
        String message = "不支持 " + ex.getMethod() + " 请求方法";
        log.warn("Method not supported: {}", message);
        return ResponseEntity
            .status(HttpStatus.METHOD_NOT_ALLOWED)
            .body(Result.error(ErrorCode.PARAM_ERROR.getCode(), message));
    }

    /**
     * 媒体类型不支持
     */
    @ExceptionHandler(HttpMediaTypeNotSupportedException.class)
    public ResponseEntity<Result<Void>> handleMediaTypeNotSupported(
            HttpMediaTypeNotSupportedException ex) {
        String message = "不支持的内容类型: " + ex.getContentType();
        log.warn("Media type not supported: {}", message);
        return ResponseEntity
            .status(HttpStatus.UNSUPPORTED_MEDIA_TYPE)
            .body(Result.error(ErrorCode.PARAM_ERROR.getCode(), message));
    }

    /**
     * 认证异常
     */
    @ExceptionHandler(AuthenticationException.class)
    public ResponseEntity<Result<Void>> handleAuthenticationException(
            AuthenticationException ex) {
        log.warn("Authentication exception: {}", ex.getMessage());
        return ResponseEntity
            .status(HttpStatus.UNAUTHORIZED)
            .body(Result.error(ErrorCode.UNAUTHORIZED));
    }

    /**
     * 授权异常
     */
    @ExceptionHandler(AccessDeniedException.class)
    public ResponseEntity<Result<Void>> handleAccessDeniedException(
            AccessDeniedException ex) {
        log.warn("Access denied: {}", ex.getMessage());
        return ResponseEntity
            .status(HttpStatus.FORBIDDEN)
            .body(Result.error(ErrorCode.FORBIDDEN));
    }

    /**
     * 兜底异常处理
     */
    @ExceptionHandler(Exception.class)
    public ResponseEntity<Result<Void>> handleException(
            Exception ex, WebRequest request) {
        log.error("Unhandled exception: {}", ex.getMessage(), ex);
        return ResponseEntity
            .status(HttpStatus.INTERNAL_SERVER_ERROR)
            .body(Result.error(ErrorCode.SYSTEM_ERROR));
    }
}`}
          />
        </div>
      </section>

      {/* Standard Response */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">标准响应格式</h2>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Result 类</h3>

          <CodeBlock
            language="java"
            code={`/**
 * 统一响应结果
 */
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Result<T> {

    private String code;
    private String message;
    private T data;
    private Long timestamp;

    /**
     * 成功响应（带数据）
     */
    public static <T> Result<T> success(T data) {
        return new Result<>(
            ErrorCode.SUCCESS.getCode(),
            ErrorCode.SUCCESS.getMessage(),
            data,
            System.currentTimeMillis()
        );
    }

    /**
     * 成功响应（无数据）
     */
    public static <T> Result<T> success() {
        return success(null);
    }

    /**
     * 失败响应
     */
    public static <T> Result<T> error(String code, String message) {
        return new Result<>(
            code,
            message,
            null,
            System.currentTimeMillis()
        );
    }

    /**
     * 失败响应（使用错误码）
     */
    public static <T> Result<T> error(ErrorCode errorCode) {
        return error(errorCode.getCode(), errorCode.getMessage());
    }

    /**
     * 判断是否成功
     */
    public boolean isSuccess() {
        return ErrorCode.SUCCESS.getCode().equals(this.code);
    }
}`}
          />

          <div className="mt-6 bg-gray-50 p-4 rounded-lg">
            <h4 className="font-bold text-gray-900 mb-2">响应示例</h4>
            <div className="space-y-2">
              <div>
                <p className="text-sm text-gray-600 mb-1">成功响应：</p>
                <pre className="bg-white p-3 rounded text-sm overflow-x-auto">
{`{
  "code": "0000",
  "message": "成功",
  "data": {
    "orderId": 12345,
    "status": "PAID"
  },
  "timestamp": 1704067200000
}`}
                </pre>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">失败响应：</p>
                <pre className="bg-white p-3 rounded text-sm overflow-x-auto">
{`{
  "code": "3003",
  "message": "库存不足",
  "data": null,
  "timestamp": 1704067200000
}`}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Exception Handling in Layers */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">分层异常处理</h2>
        <div className="space-y-4">
          <div className="mb-4">
            <button
              onClick={() => setOpenSection(openSection === 'controller-layer' ? null : 'controller-layer')}
              className="w-full bg-white border-2 border-blue-300 rounded-lg p-4 flex items-center justify-between hover:bg-blue-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">🌐</span>
                <div className="text-left">
                  <h3 className="text-lg font-bold text-gray-900">Controller 层</h3>
                  <p className="text-sm text-gray-600">参数校验、异常转换</p>
                </div>
              </div>
              <span className="text-gray-400">&rbrace;</span>
            </button>
            {openSection === 'controller-layer' && (
              <div className="mt-4 bg-white border border-gray-200 rounded-lg p-6">
                <CodeBlock
                  language="java"
                  code={`@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
@Slf4j
public class OrderController {

    private final OrderService orderService;

    /**
     * 参数校验：使用 @Valid
     */
    @PostMapping
    public Result<Long> createOrder(@Valid @RequestBody OrderCreateRequest request) {
        // 业务逻辑（异常会被全局处理器捕获）
        Long orderId = orderService.createOrder(request);
        return Result.success(orderId);
    }

    /**
     * 路径参数校验
     */
    @GetMapping("/{id}")
    public Result<OrderResponse> getOrder(
            @PathVariable @Min(1) Long id) {
        OrderResponse order = orderService.getOrderById(id);
        return Result.success(order);
    }

    /**
     * 手动抛出业务异常
     */
    @DeleteMapping("/{id}")
    public Result<Void> cancelOrder(@PathVariable Long id) {
        orderService.cancelOrder(id);
        return Result.success();
    }
}`}
                />
              </div>
            )}
          </div>

          <div className="mb-4">
            <button
              onClick={() => setOpenSection(openSection === 'service-layer' ? null : 'service-layer')}
              className="w-full bg-white border-2 border-green-300 rounded-lg p-4 flex items-center justify-between hover:bg-green-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">🔧</span>
                <div className="text-left">
                  <h3 className="text-lg font-bold text-gray-900">Service 层</h3>
                  <p className="text-sm text-gray-600">业务异常抛出</p>
                </div>
              </div>
              <span className="text-gray-400">&rbrace;</span>
            </button>
            {openSection === 'service-layer' && (
              <div className="mt-4 bg-white border border-gray-200 rounded-lg p-6">
                <CodeBlock
                  language="java"
                  code={`@Service
@RequiredArgsConstructor
@Slf4j
public class OrderServiceImpl implements OrderService {

    private final OrderMapper orderMapper;
    private final InventoryService inventoryService;

    @Override
    @Transactional(rollbackFor = Exception.class)
    public Long createOrder(OrderCreateRequest request) {
        // 1. 参数校验
        validateRequest(request);

        // 2. 业务校验
        Order existingOrder = orderMapper.findByUserIdAndProductId(
            request.getUserId(), request.getProductId()
        );
        if (existingOrder != null
            && OrderStatus.PENDING.equals(existingOrder.getStatus())) {
            throw new BusinessException(
                ErrorCode.ORDER_STATUS_ERROR,
                "存在未完成的订单"
            );
        }

        // 3. 库存校验
        boolean stockAvailable = inventoryService.deduct(
            request.getProductId(),
            request.getQuantity()
        );
        if (!stockAvailable) {
            throw new BusinessException(ErrorCode.STOCK_INSUFFICIENT);
        }

        // 4. 创建订单
        Order order = buildOrder(request);
        try {
            orderMapper.insert(order);
        } catch (Exception e) {
            log.error("Failed to create order", e);
            throw new SystemException(ErrorCode.SYSTEM_ERROR, e);
        }

        return order.getId();
    }

    /**
     * 使用工具方法简化异常抛出
     */
    private void validateRequest(OrderCreateRequest request) {
        BusinessException.throwIf(
            request.getUserId() == null,
            ErrorCode.PARAM_ERROR,
            "用户ID不能为空"
        );
        BusinessException.throwIf(
            request.getProductId() == null,
            ErrorCode.PARAM_ERROR,
            "商品ID不能为空"
        );
        BusinessException.throwIf(
            request.getQuantity() == null || request.getQuantity() &lt;= 0,
            ErrorCode.PARAM_ERROR,
            "数量必须大于0"
        );
    }
}`}
                />
              </div>
            )}
          </div>

          <div className="mb-4">
            <button
              onClick={() => setOpenSection(openSection === 'repository-layer' ? null : 'repository-layer')}
              className="w-full bg-white border-2 border-yellow-300 rounded-lg p-4 flex items-center justify-between hover:bg-yellow-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">💾</span>
                <div className="text-left">
                  <h3 className="text-lg font-bold text-gray-900">Repository 层</h3>
                  <p className="text-sm text-gray-600">数据异常处理</p>
                </div>
              </div>
              <span className="text-gray-400">&rbrace;</span>
            </button>
            {openSection === 'repository-layer' && (
              <div className="mt-4 bg-white border border-gray-200 rounded-lg p-6">
                <CodeBlock
                  language="java"
                  code={`@Repository
@RequiredArgsConstructor
@Slf4j
public class OrderMapper {

    private final SqlSession sqlSession;

    /**
     * 查询订单
     */
    public Order findById(Long id) {
        try {
            return sqlSession.selectOne(
                "com.example.mapper.OrderMapper.findById",
                id
            );
        } catch (Exception e) {
            log.error("Failed to find order by id: {}", id, e);
            // 这里不抛异常，返回 null
            return null;
        }
    }

    /**
     * 插入订单
     */
    public int insert(Order order) {
        try {
            return sqlSession.insert(
                "com.example.mapper.OrderMapper.insert",
                order
            );
        } catch (DuplicateKeyException e) {
            log.error("Duplicate order: {}", order.getId());
            throw new BusinessException(
                ErrorCode.ORDER_STATUS_ERROR,
                "订单已存在"
            );
        } catch (Exception e) {
            log.error("Failed to insert order", e);
            throw new SystemException(ErrorCode.SYSTEM_ERROR, e);
        }
    }

    /**
     * 更新订单
     */
    public int update(Order order) {
        try {
            int rows = sqlSession.update(
                "com.example.mapper.OrderMapper.update",
                order
            );
            if (rows == 0) {
                throw new BusinessException(
                    ErrorCode.ORDER_NOT_FOUND,
                    "订单不存在或已更新"
                );
            }
            return rows;
        } catch (BusinessException e) {
            throw e;
        } catch (Exception e) {
            log.error("Failed to update order", e);
            throw new SystemException(ErrorCode.SYSTEM_ERROR, e);
        }
    }
}`}
                />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Distributed Transaction Exceptions */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">分布式事务异常处理</h2>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Seata 事务异常</h3>

          <CodeBlock
            language="java"
            code={`@Service
@RequiredArgsConstructor
@Slf4j
public class OrderServiceImpl {

    private final OrderMapper orderMapper;
    private final InventoryService inventoryService;
    private final AccountService accountService;

    /**
     * Seata 全局事务
     */
    @GlobalTransactional(name = "create-order", rollbackFor = Exception.class)
    public void createOrder(OrderCreateRequest request) {
        try {
            // 1. 扣减库存
            inventoryService.deduct(
                request.getProductId(),
                request.getQuantity()
            );

            // 2. 扣减余额
            accountService.debit(
                request.getUserId(),
                request.getAmount()
            );

            // 3. 创建订单
            Order order = buildOrder(request);
            orderMapper.insert(order);

        } catch (BusinessException e) {
            // 业务异常：回滚事务
            log.error("Business error in global transaction", e);
            throw e;
        } catch (Exception e) {
            // 系统异常：Seata 会自动回滚
            log.error("System error in global transaction", e);
            throw new SystemException(ErrorCode.SYSTEM_ERROR, e);
        }
    }
}

/**
 * 库存服务（Seata参与者）
 */
@Service
@Slf4j
public class InventoryServiceImpl {

    @GlobalLock
    @Transactional(rollbackFor = Exception.class)
    public boolean deduct(Long productId, Integer quantity) {
        // 检查库存
        Integer stock = getStock(productId);
        if (stock &lt; quantity) {
            throw new BusinessException(ErrorCode.STOCK_INSUFFICIENT);
        }

        // 扣减库存
        int rows = inventoryMapper.deduct(productId, quantity);
        if (rows == 0) {
            throw new BusinessException(
                ErrorCode.SYSTEM_ERROR,
                "库存扣减失败"
            );
        }

        return true;
    }
}`}
          />
        </div>
      </section>

      {/* Best Practices */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">最佳实践</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white border-l-4 border-blue-500 rounded-lg p-5 shadow-md">
            <h3 className="text-lg font-bold text-gray-900 mb-3">✅ 应该做</h3>
            <ul className="text-sm text-gray-700 space-y-2">
              <li>• <strong>分类清晰</strong>：业务异常和系统异常分开</li>
              <li>• <strong>错误码规范</strong>：统一错误码定义</li>
              <li>• <strong>日志记录</strong>：记录异常堆栈和关键参数</li>
              <li>• <strong>用户友好</strong>：提供清晰的错误提示</li>
              <li>• <strong>安全第一</strong>：避免暴露敏感信息</li>
              <li>• <strong>事务回滚</strong>：异常后正确回滚事务</li>
              <li>• <strong>监控告警</strong>：异常率监控</li>
            </ul>
          </div>
          <div className="bg-white border-l-4 border-red-500 rounded-lg p-5 shadow-md">
            <h3 className="text-lg font-bold text-gray-900 mb-3">❌ 不应该做</h3>
            <ul className="text-sm text-gray-700 space-y-2">
              <li>• <strong>不要吞异常</strong>：catch 后不做任何处理</li>
              <li>• <strong>不要捕获 Throwable</strong>：应该捕获具体异常</li>
              <li>• <strong>不要返回错误码</strong>：使用异常代替错误码</li>
              <li>• <strong>不要暴露堆栈</strong>：避免泄漏实现细节</li>
              <li>• <strong>不要用 Exception</strong>：定义明确的异常类型</li>
              <li>• <strong>不要在循环中抛异常</strong>：影响性能</li>
              <li>• <strong>不要忽视异常</strong>：每个异常都要处理</li>
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
              q: "如何区分业务异常和系统异常？",
              a: "业务异常是预期的异常，如参数错误、库存不足等，返回 400 状态码；系统异常是未预期的异常，如数据库连接失败、NPE 等，返回 500 状态码。业务异常由用户修正，系统异常需要运维处理。"
            },
            {
              q: "异常需要记录日志吗？",
              a: "所有异常都应该记录日志。业务异常记录 WARN 级别（包含关键参数），系统异常记录 ERROR 级别（包含完整堆栈）。日志应包含：异常类型、错误码、错误信息、关键参数、请求 ID。"
            },
            {
              q: "如何处理第三方服务异常？",
              a: "第三方服务异常应该转换为系统异常，避免将第三方错误信息直接暴露给前端。可以通过自定义异常类封装第三方异常，返回友好的错误提示。"
            },
            {
              q: "异常处理后事务会回滚吗？",
              a: "@Transactional 默认只在 RuntimeException 和 Error 时回滚。建议指定 rollbackFor = Exception.class，确保所有异常都回滚。对于不需要回滚的异常，可以使用 @Transactional(noRollbackFor = BusinessException.class)。"
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
          <a href="/testing-strategy" className="block bg-green-50 hover:bg-green-100 border border-green-200 rounded-lg p-6 transition-colors">
            <h3 className="text-xl font-bold text-green-900 mb-2">测试策略</h3>
            <p className="text-green-700">微服务测试最佳实践</p>
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
