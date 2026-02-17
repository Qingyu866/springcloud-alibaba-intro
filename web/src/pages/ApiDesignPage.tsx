import { useState } from 'react';
import { CodeBlock } from '../components';

export const ApiDesignPage: React.FC = () => {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  return (
    <div className="prose prose prose-slate max-w-none">
      {/* 页面头部 */}
      <div className="bg-gradient-to-r from-blue-600 to-cyan-700 text-white rounded-lg p-6 mb-8">
        <div className="flex items-center mb-2">
          <span className="text-3xl mr-3">📡</span>
          <h1 className="text-3xl font-bold">API 设计规范</h1>
        </div>
        <p className="text-lg opacity-90">
          构建高质量、易维护、高性能的 API 接口 - RESTful、GraphQL、gRPC 全覆盖
        </p>
        <div className="mt-4 flex items-center gap-4 text-sm">
          <span className="px-2 py-1 bg-white/20 rounded">🔧 需要基础</span>
          <span className="px-2 py-1 bg-white/20 rounded">⏱️ 4-5天</span>
          <span className="px-2 py-1 bg-white/20 rounded">📝 12个知识点</span>
        </div>
      </div>

      {/* 为什么需要 API 设计规范 */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">为什么需要 API 设计规范?</h2>

        <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-lg mb-6">
          <p className="text-lg text-gray-700 mb-3">
            <strong>API 设计规范</strong> 是微服务架构中服务间通信的"语言标准",
            统一的 API 设计可以降低沟通成本、提高开发效率、增强系统可维护性。
          </p>
          <p className="text-gray-700">
            好的 API 设计应该是直观的、一致的、易于使用的,同时具备良好的扩展性和性能。
          </p>
        </div>

        <h3 className="text-2xl font-bold text-gray-800 mb-4">核心价值</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <ValueCard icon="🎯" title="一致性" desc="统一命名和结构" color="blue" />
          <ValueCard icon="📖" title="可读性" desc="自文档化设计" color="green" />
          <ValueCard icon="🔧" title="可维护性" desc="易于迭代升级" color="purple" />
          <ValueCard icon="⚡" title="性能优化" desc="减少不必要请求" color="orange" />
          <ValueCard icon="🛡️" title="安全性" desc="统一鉴权机制" color="red" />
          <ValueCard icon="🌐" title="跨平台" desc="多端通用接口" color="yellow" />
        </div>
      </section>

      {/* RESTful API 设计最佳实践 */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">RESTful API 设计最佳实践</h2>

        <h3 className="text-2xl font-bold text-gray-800 mb-4">1. URL 设计规范</h3>
        <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-lg mb-6">
          <h4 className="font-bold text-gray-900 mb-3">核心原则</h4>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-start">
              <span className="text-green-600 mr-2">✓</span>
              <span><strong>使用名词而非动词</strong>: /users 而非 /getUsers</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-600 mr-2">✓</span>
              <span><strong>使用复数形式</strong>: /users 而非 /user</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-600 mr-2">✓</span>
              <span><strong>使用小写字母</strong>: /api/users 而非 /API/Users</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-600 mr-2">✓</span>
              <span><strong>使用连字符分隔</strong>: /user-profiles 而非 /userProfiles</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-600 mr-2">✓</span>
              <span><strong>层级深度不超过3层</strong>: /api/users/123/orders/456</span>
            </li>
          </ul>
        </div>

        <CodeBlock
          language="java"
          code={`@RestController
@RequestMapping("/api/v1/users")
public class UserController {

    // GET /api/v1/users - 获取用户列表
    @GetMapping
    public Result<List<UserVO>> listUsers(
        @RequestParam(defaultValue = "1") Integer page,
        @RequestParam(defaultValue = "10") Integer size,
        @RequestParam(required = false) String keyword
    ) {
        // 查询用户列表
        return Result.success(userService.pageUsers(page, size, keyword));
    }

    // GET /api/v1/users/{id} - 获取用户详情
    @GetMapping("/{id}")
    public Result<UserVO> getUser(@PathVariable Long id) {
        return Result.success(userService.getUserById(id));
    }

    // POST /api/v1/users - 创建用户
    @PostMapping
    public Result<UserVO> createUser(@Valid @RequestBody UserCreateDTO dto) {
        return Result.success(userService.createUser(dto));
    }

    // PUT /api/v1/users/{id} - 更新用户
    @PutMapping("/{id}")
    public Result<UserVO> updateUser(
        @PathVariable Long id,
        @Valid @RequestBody UserUpdateDTO dto
    ) {
        return Result.success(userService.updateUser(id, dto));
    }

    // PATCH /api/v1/users/{id}/status - 部分更新
    @PatchMapping("/{id}/status")
    public Result<Void> updateUserStatus(
        @PathVariable Long id,
        @RequestBody Map<String, Object> updates
    ) {
        userService.updateStatus(id, updates);
        return Result.success();
    }

    // DELETE /api/v1/users/{id} - 删除用户
    @DeleteMapping("/{id}")
    public Result<Void> deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        return Result.success();
    }

    // 嵌套资源示例
    // GET /api/v1/users/{userId}/orders - 获取用户订单
    @GetMapping("/{userId}/orders")
    public Result<List<OrderVO>> getUserOrders(@PathVariable Long userId) {
        return Result.success(orderService.getOrdersByUserId(userId));
    }

    // GET /api/v1/users/{userId}/orders/{orderId} - 获取用户特定订单
    @GetMapping("/{userId}/orders/{orderId}")
    public Result<OrderVO> getUserOrder(
        @PathVariable Long userId,
        @PathVariable Long orderId
    ) {
        return Result.success(orderService.getUserOrder(userId, orderId));
    }
}`}
          filename="UserController.java"
        />

        <h3 className="text-2xl font-bold text-gray-800 mb-4 mt-8">2. HTTP 方法语义</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <HttpMethodCard method="GET" desc="查询资源" safe={true} idempotent={true} example="GET /api/users" />
          <HttpMethodCard method="POST" desc="创建资源" safe={false} idempotent={false} example="POST /api/users" />
          <HttpMethodCard method="PUT" desc="全量更新" safe={false} idempotent={true} example="PUT /api/users/1" />
          <HttpMethodCard method="PATCH" desc="部分更新" safe={false} idempotent={false} example="PATCH /api/users/1/status" />
          <HttpMethodCard method="DELETE" desc="删除资源" safe={false} idempotent={true} example="DELETE /api/users/1" />
        </div>

        <h3 className="text-2xl font-bold text-gray-800 mb-4 mt-8">3. 状态码使用规范</h3>
        <CodeBlock
          language="java"
          code={`// 统一响应结构
@Data
public class Result<T> {
    private Integer code;      // 业务状态码
    private String message;    // 提示信息
    private T data;           // 返回数据
    private Long timestamp;   // 时间戳

    public static <T> Result<T> success(T data) {
        Result<T> result = new Result<>();
        result.setCode(200);
        result.setMessage("success");
        result.setData(data);
        result.setTimestamp(System.currentTimeMillis());
        return result;
    }

    public static <T> Result<T> error(String message) {
        Result<T> result = new Result<>();
        result.setCode(500);
        result.setMessage(message);
        result.setTimestamp(System.currentTimeMillis());
        return result;
    }

    // 常用成功响应
    public static <T> Result<T> ok() {
        return success(null);
    }

    public static <T> Result<T> created(T data) {
        Result<T> result = success(data);
        result.setCode(201);
        result.setMessage("created");
        return result;
    }

    public static <T> Result<T> noContent() {
        Result<T> result = new Result<>();
        result.setCode(204);
        return result;
    }
}

// 异常处理示例
@RestControllerAdvice
public class GlobalExceptionHandler {

    // 400 Bad Request - 请求参数错误
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public Result<Void> handleValidException(MethodArgumentNotValidException ex) {
        String message = ex.getBindingResult().getAllErrors().get(0).getDefaultMessage();
        return Result.error(400, message);
    }

    // 401 Unauthorized - 未认证
    @ExceptionHandler(UnauthorizedException.class)
    public Result<Void> handleUnauthorized(UnauthorizedException ex) {
        return Result.error(401, "未认证或token已过期");
    }

    // 403 Forbidden - 无权限
    @ExceptionHandler(ForbiddenException.class)
    public Result<Void> handleForbidden(ForbiddenException ex) {
        return Result.error(403, "无权限访问该资源");
    }

    // 404 Not Found - 资源不存在
    @ExceptionHandler(NotFoundException.class)
    public Result<Void> handleNotFound(NotFoundException ex) {
        return Result.error(404, ex.getMessage());
    }

    // 409 Conflict - 资源冲突
    @ExceptionHandler(ConflictException.class)
    public Result<Void> handleConflict(ConflictException ex) {
        return Result.error(409, ex.getMessage());
    }

    // 422 Unprocessable Entity - 参数校验失败
    @ExceptionHandler(BusinessException.class)
    public Result<Void> handleBusiness(BusinessException ex) {
        return Result.error(422, ex.getMessage());
    }

    // 500 Internal Server Error - 服务器错误
    @ExceptionHandler(Exception.class)
    public Result<Void> handleException(Exception ex) {
        log.error("系统异常", ex);
        return Result.error(500, "系统内部错误");
    }
}`}
          filename="Result.java"
        />

        <div className="mt-6 p-4 bg-yellow-50 border-l-4 border-yellow-500 rounded">
          <h4 className="font-bold text-gray-900 mb-2">常用 HTTP 状态码</h4>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div><span className="font-mono bg-green-200 px-2 rounded">200</span> OK - 成功</div>
            <div><span className="font-mono bg-green-200 px-2 rounded">201</span> Created - 创建成功</div>
            <div><span className="font-mono bg-green-200 px-2 rounded">204</span> No Content - 无内容</div>
            <div><span className="font-mono bg-yellow-200 px-2 rounded">400</span> Bad Request - 参数错误</div>
            <div><span className="font-mono bg-yellow-200 px-2 rounded">401</span> Unauthorized - 未认证</div>
            <div><span className="font-mono bg-yellow-200 px-2 rounded">403</span> Forbidden - 无权限</div>
            <div><span className="font-mono bg-yellow-200 px-2 rounded">404</span> Not Found - 未找到</div>
            <div><span className="font-mono bg-yellow-200 px-2 rounded">409</span> Conflict - 冲突</div>
            <div><span className="font-mono bg-red-200 px-2 rounded">500</span> Internal Server Error - 服务器错误</div>
            <div><span className="font-mono bg-red-200 px-2 rounded">503</span> Service Unavailable - 服务不可用</div>
          </div>
        </div>
      </section>

      {/* API 版本管理策略 */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">API 版本管理策略</h2>

        <h3 className="text-2xl font-bold text-gray-800 mb-4">版本管理方案对比</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <VersionStrategyCard
            title="URL路径版本"
            example="/api/v1/users"
            pros="直观清晰、易实现"
            cons="URL变更影响缓存"
            recommended={true}
          />
          <VersionStrategyCard
            title="请求头版本"
            example="API-Version: v1"
            pros="URL不变、RESTful"
            cons="调试不便、不易发现"
            recommended={false}
          />
          <VersionStrategyCard
            title="查询参数版本"
            example="/api/users?version=v1"
            pros="简单易用"
            cons="不符合RESTful规范"
            recommended={false}
          />
        </div>

        <h3 className="text-2xl font-bold text-gray-800 mb-4 mt-8">版本管理最佳实践</h3>
        <CodeBlock
          language="java"
          code={`// 1. URL路径版本方案 (推荐)
@RestController
@RequestMapping("/api/v1/users")
public class UserV1Controller {

    @GetMapping("/{id}")
    public Result<UserVO> getUser(@PathVariable Long id) {
        // V1版本逻辑
        return Result.success(userService.getUserV1(id));
    }
}

@RestController
@RequestMapping("/api/v2/users")
public class UserV2Controller {

    @GetMapping("/{id}")
    public Result<UserVO> getUser(@PathVariable Long id) {
        // V2版本逻辑 - 返回更详细的信息
        return Result.success(userService.getUserV2(id));
    }
}

// 2. 请求头版本方案
@RestController
@RequestMapping("/api/users")
public class UserVersionController {

    @GetMapping("/{id}")
    public Result<UserVO> getUser(
        @PathVariable Long id,
        @RequestHeader(value = "API-Version", defaultValue = "v1") String version
    ) {
        if ("v2".equals(version)) {
            return Result.success(userService.getUserV2(id));
        }
        return Result.success(userService.getUserV1(id));
    }
}

// 3. 版本管理配置类
@Configuration
public class ApiVersionConfig {

    @Bean
    public WebMvcRegistrations webMvcRegistrations() {
        return new WebMvcRegistrations() {
            @Override
            public RequestMappingHandlerMapping getRequestMappingHandlerMapping() {
                return new ApiVersionRequestMappingHandlerMapping("v1");
            }
        };
    }
}

// 4. 自定义版本注解
@Target({ElementType.TYPE, ElementType.METHOD})
@Retention(RetentionPolicy.RUNTIME)
public @interface ApiVersion {
    String value() default "v1";
    boolean deprecated() default false;
}

// 5. 版本切换策略
@Component
public class UserService {

    public UserVO getUser(String version, Long id) {
        switch (version) {
            case "v2":
                return convertToV2(userRepository.findById(id));
            case "v1":
            default:
                return convertToV1(userRepository.findById(id));
        }
    }

    // V1版本 - 简单信息
    private UserVO convertToV1(User user) {
        UserVO vo = new UserVO();
        vo.setId(user.getId());
        vo.setName(user.getName());
        vo.setEmail(user.getEmail());
        return vo;
    }

    // V2版本 - 包含更多信息
    private UserVO convertToV2(User user) {
        UserVO vo = new UserVO();
        vo.setId(user.getId());
        vo.setName(user.getName());
        vo.setEmail(user.getEmail());
        vo.setPhone(user.getPhone());
        vo.setAvatar(user.getAvatar());
        vo.setCreatedAt(user.getCreatedAt());
        vo.setUpdatedAt(user.getUpdatedAt());
        return vo;
    }
}`}
          filename="ApiVersionController.java"
        />

        <div className="mt-6 p-4 bg-green-50 border-l-4 border-green-500 rounded">
          <h4 className="font-bold text-gray-900 mb-2">版本管理最佳实践</h4>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-start">
              <span className="text-green-600 mr-2">✓</span>
              <span><strong>明确版本号格式</strong>: 使用 v1, v2, v3 而非 1.0, 2.0</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-600 mr-2">✓</span>
              <span><strong>版本生命周期管理</strong>: 新版本发布后,旧版本保留6-12个月</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-600 mr-2">✓</span>
              <span><strong>废弃通知机制</strong>: 在响应头添加 Deprecated 标识</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-600 mr-2">✓</span>
              <span><strong>向后兼容</strong>: 尽量不破坏已有字段,新增字段不影响客户端</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-600 mr-2">✓</span>
              <span><strong>文档同步更新</strong>: 每个版本的API都应有对应文档</span>
            </li>
          </ul>
        </div>

        <CodeBlock
          language="java"
          code={`// 废弃版本响应示例
@GetMapping("/{id}")
@Deprecated
public Result<UserVO> getUser(@PathVariable Long id) {
    UserVO user = userService.getUser(id);

    // 添加废弃警告头
    HttpServletResponse response = ((ServletWebRequest)
        RequestContextHolder.getRequestAttributes()).getResponse();
    if (response != null) {
        response.setHeader("X-API-Deprecated", "true");
        response.setHeader("X-API-Sunset", "2025-12-31");
        response.setHeader("X-API-Alternative", "/api/v2/users/" + id);
        response.setHeader("Warning", '299 - "This API is deprecated, use v2 instead"');
    }

    return Result.success(user);
}`}
          filename="DeprecatedApiExample.java"
        />
      </section>

      {/* GraphQL 基础 */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">GraphQL 基础</h2>

        <div className="bg-purple-50 border-l-4 border-purple-500 p-6 rounded-lg mb-6">
          <h4 className="font-bold text-gray-900 mb-3">什么是 GraphQL?</h4>
          <p className="text-gray-700 mb-3">
            <strong>GraphQL</strong> 是一种用于 API 的查询语言,由 Facebook 开发。
            与 RESTful 不同,GraphQL 允许客户端精确指定需要的数据,避免了过度获取(over-fetching)和获取不足(under-fetching)的问题。
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="bg-white p-4 rounded">
              <h5 className="font-bold mb-2">GraphQL 优势</h5>
              <ul className="text-sm space-y-1">
                <li>✓ 按需获取数据</li>
                <li>✓ 单次请求多个资源</li>
                <li>✓ 强类型Schema</li>
                <li>✓ 自文档化</li>
                <li>✓ 版本无需变更</li>
              </ul>
            </div>
            <div className="bg-white p-4 rounded">
              <h5 className="font-bold mb-2">适用场景</h5>
              <ul className="text-sm space-y-1">
                <li>✓ 复杂的数据关联</li>
                <li>✓ 移动端API</li>
                <li>✓ 多端差异化需求</li>
                <li>✓ 微服务聚合</li>
                <li>✓ 实时数据订阅</li>
              </ul>
            </div>
          </div>
        </div>

        <h3 className="text-2xl font-bold text-gray-800 mb-4">GraphQL Schema 定义</h3>
        <CodeBlock
          language="graphql"
          code={`# 定义用户类型
type User {
  id: ID!
  username: String!
  email: String!
  age: Int
  avatar: String
  status: UserStatus!
  createdAt: DateTime!
  updatedAt: DateTime!

  # 关联查询
  orders: [Order!]!
  profile: Profile
}

enum UserStatus {
  ACTIVE
  INACTIVE
  BANNED
}

type Order {
  id: ID!
  orderNo: String!
  amount: Float!
  status: OrderStatus!
  createdAt: DateTime!

  # 关联用户
  user: User!
}

enum OrderStatus {
  PENDING
  PAID
  SHIPPED
  DELIVERED
  CANCELLED
}

type Profile {
  id: ID!
  userId: ID!
  nickname: String
  bio: String
  location: String
  website: String
}

# 查询定义
type Query {
  # 获取用户列表
  users(limit: Int, offset: Int, status: UserStatus): [User!]!

  # 获取单个用户
  user(id: ID!): User

  # 搜索用户
  searchUsers(keyword: String!, limit: Int): [User!]!

  # 当前登录用户
  me: User
}

# 变更定义
type Mutation {
  # 创建用户
  createUser(input: CreateUserInput!): User!

  # 更新用户
  updateUser(id: ID!, input: UpdateUserInput!): User!

  # 删除用户
  deleteUser(id: ID!): Boolean!

  # 修改密码
  changePassword(oldPassword: String!, newPassword: String!): Boolean!
}

# 订阅定义
type Subscription {
  # 用户状态变更通知
  userStatusChanged(userId: ID!): User!
}

# 输入类型
input CreateUserInput {
  username: String!
  email: String!
  password: String!
  age: Int
}

input UpdateUserInput {
  username: String
  email: String
  age: Int
  avatar: String
}`}
          filename="schema.graphqls"
        />

        <h3 className="text-2xl font-bold text-gray-800 mb-4 mt-8">GraphQL 查询示例</h3>
        <CodeBlock
          language="graphql"
          code={`# 查询1: 基础查询 - 只获取需要的字段
query {
  user(id: "1") {
    id
    username
    email
  }
}

# 响应:
{
  "data": {
    "user": {
      "id": "1",
      "username": "alice",
      "email": "alice@example.com"
    }
  }
}

# 查询2: 嵌套查询 - 关联数据
query {
  user(id: "1") {
    id
    username
    orders {
      id
      orderNo
      amount
      status
    }
  }
}

# 查询3: 别名和参数
query {
  activeUsers: users(status: ACTIVE, limit: 10) {
    id
    username
  }
  inactiveUsers: users(status: INACTIVE, limit: 5) {
    id
    username
  }
}

# 查询4: 片段(Fragments)
query {
  user(id: "1") {
    ...userFields
    orders {
      ...orderFields
    }
  }
}

fragment userFields on User {
  id
  username
  email
}

fragment orderFields on Order {
  id
  orderNo
  amount
}

# 变更1: 创建用户
mutation {
  createUser(input: {
    username: "bob"
    email: "bob@example.com"
    password: "123456"
    age: 25
  }) {
    id
    username
    email
  }
}

# 变更2: 更新用户
mutation {
  updateUser(id: "1", input: {
    age: 26
    avatar: "https://example.com/avatar.jpg"
  }) {
    id
    username
    age
    avatar
  }
}

# 订阅: 用户状态变更
subscription {
  userStatusChanged(userId: "1") {
    id
    username
    status
  }
}`}
          filename="queries.graphql"
        />

        <h3 className="text-2xl font-bold text-gray-800 mb-4 mt-8">Spring Boot 集成 GraphQL</h3>
        <CodeBlock
          language="java"
          code={`// 1. 添加依赖
/*
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-graphql</artifactId>
</dependency>
*/

// 2. 定义数据获取器
@Controller
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private OrderService orderService;

    // Query resolver
    @QueryMapping
    public User user(@Argument String id) {
        return userService.getUserById(id);
    }

    @QueryMapping
    public List<User> users(
        @Argument Integer limit,
        @Argument Integer offset,
        @Argument UserStatus status
    ) {
        return userService.listUsers(limit, offset, status);
    }

    @QueryMapping
    public User me() {
        SecurityContext context = SecurityContextHolder.getContext();
        String userId = context.getAuthentication().getName();
        return userService.getUserById(userId);
    }

    // Mutation resolver
    @MutationMapping
    public User createUser(@Argument CreateUserInput input) {
        return userService.createUser(input);
    }

    @MutationMapping
    public User updateUser(
        @Argument String id,
        @Argument UpdateUserInput input
    ) {
        return userService.updateUser(id, input);
    }

    @MutationMapping
    public Boolean deleteUser(@Argument String id) {
        return userService.deleteUser(id);
    }

    // Field resolver - 处理关联查询
    @SchemaMapping(typeName = "User", field = "orders")
    public List<Order> orders(User user) {
        return orderService.getOrdersByUserId(user.getId());
    }

    @SchemaMapping(typeName = "User", field = "profile")
    public Profile profile(User user) {
        return userService.getProfileByUserId(user.getId());
    }
}

// 3. 自定义 Scalar 类型
@Configuration
public class GraphQLConfig {

    @Bean
    public CustomScalarFactory dateTimeScalar() {
        return new CustomScalarFactory(
            "DateTime",
            // 序列化: Java对象 -> JSON
            CoercingSerialize.of(value -> {
                if (value instanceof LocalDateTime) {
                    return ((LocalDateTime) value).toString();
                }
                return null;
            }),
            // 反序列化: JSON -> Java对象
            CoercingParseValue.of(value -> {
                if (value instanceof String) {
                    return LocalDateTime.parse((String) value);
                }
                return null;
            })
        );
    }
}

// 4. DataFetcher - 自定义查询逻辑
@Component
public class UserDataFetcher implements DataFetcher<User> {

    @Autowired
    private UserRepository userRepository;

    @Override
    public User get(DataFetchingEnvironment environment) {
        String userId = environment.getArgument("id");
        return userRepository.findById(userId)
            .orElseThrow(() -> new NotFoundException("User not found"));
    }
}

// 5. 异常处理
@Component
public class GraphQLExceptionHandler {

    @ExceptionHandler(NotFoundException.class)
    public GraphQLError handleNotFound(NotFoundException ex) {
        return GraphqlErrorBuilder.newError()
            .message(ex.getMessage())
            .errorType(ErrorType.NotFound)
            .build();
    }

    @ExceptionHandler(BusinessException.class)
    public GraphQLError handleBusiness(BusinessException ex) {
        return GraphqlErrorBuilder.newError()
            .message(ex.getMessage())
            .errorType(ErrorType.BadRequest)
            .build();
    }
}`}
          filename="GraphQLController.java"
        />
      </section>

      {/* gRPC 实战 */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">gRPC 实战</h2>

        <div className="bg-orange-50 border-l-4 border-orange-500 p-6 rounded-lg mb-6">
          <h4 className="font-bold text-gray-900 mb-3">什么是 gRPC?</h4>
          <p className="text-gray-700 mb-3">
            <strong>gRPC (Google Remote Procedure Call)</strong> 是 Google 开源的高性能、通用的 RPC 框架。
            基于 Protocol Buffers (protobuf) 进行数据序列化,比 JSON 更小、更快。
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="bg-white p-4 rounded">
              <h5 className="font-bold mb-2">gRPC 优势</h5>
              <ul className="text-sm space-y-1">
                <li>✓ 高性能二进制传输</li>
                <li>✓ 强类型接口定义</li>
                <li>✓ 支持多语言</li>
                <li>✓ 双向流式传输</li>
                <li>✓ 内置负载均衡</li>
              </ul>
            </div>
            <div className="bg-white p-4 rounded">
              <h5 className="font-bold mb-2">适用场景</h5>
              <ul className="text-sm space-y-1">
                <li>✓ 微服务间通信</li>
                <li>✓ 高性能要求场景</li>
                <li>✓ 实时流式数据</li>
                <li>✓ 多语言环境</li>
                <li>✓ 内网服务调用</li>
              </ul>
            </div>
          </div>
        </div>

        <h3 className="text-2xl font-bold text-gray-800 mb-4">Protocol Buffers 定义</h3>
        <CodeBlock
          language="proto"
          code={`// syntax 版本
syntax = "proto3";

// 包名
package user;

// Java 选项
option java_package = "com.example.grpc.user";
option java_outer_classname = "UserProto";
option java_multiple_files = true;

// 服务定义
service UserService {
  // 一元RPC (Unary)
  rpc GetUser(GetUserRequest) returns (GetUserResponse);

  // 服务端流式RPC (Server Streaming)
  rpc ListUsers(ListUsersRequest) returns (stream User);

  // 客户端流式RPC (Client Streaming)
  rpc CreateUsers(stream CreateUserRequest) returns (CreateUsersResponse);

  // 双向流式RPC (Bidirectional Streaming)
  rpc UserChat(stream UserChatRequest) returns (stream UserChatResponse);
}

// 消息定义
message GetUserRequest {
  string user_id = 1;
}

message GetUserResponse {
  User user = 1;
}

message ListUsersRequest {
  int32 page = 1;
  int32 size = 2;
  string keyword = 3;
}

message User {
  string id = 1;
  string username = 2;
  string email = 3;
  int32 age = 4;
  string avatar = 5;
  UserStatus status = 6;
  int64 created_at = 7;
  int64 updated_at = 8;
}

enum UserStatus {
  UNKNOWN = 0;
  ACTIVE = 1;
  INACTIVE = 2;
  BANNED = 3;
}

message CreateUserRequest {
  string username = 1;
  string email = 2;
  string password = 3;
  int32 age = 4;
}

message CreateUsersResponse {
  repeated User users = 1;
  int32 count = 2;
}

message UserChatRequest {
  string user_id = 1;
  string message = 2;
}

message UserChatResponse {
  string user_id = 1;
  string message = 2;
  int64 timestamp = 3;
}`}
          filename="user.proto"
        />

        <h3 className="text-2xl font-bold text-gray-800 mb-4 mt-8">gRPC Server 实现</h3>
        <CodeBlock
          language="java"
          code={`@GrpcService
public class UserGrpcService extends UserServiceGrpc.UserServiceImplBase {

    @Autowired
    private UserService userService;

    // 1. 一元RPC - 普通请求响应
    @Override
    public void getUser(
        UserProto.GetUserRequest request,
        StreamObserver<UserProto.GetUserResponse> responseObserver
    ) {
        try {
            String userId = request.getUserId();
            UserDO userDO = userService.getUserById(userId);

            UserProto.User user = UserProto.User.newBuilder()
                .setId(userDO.getId())
                .setUsername(userDO.getUsername())
                .setEmail(userDO.getEmail())
                .setAge(userDO.getAge())
                .setAvatar(userDO.getAvatar())
                .setStatus(UserProto.UserStatus.valueOf(userDO.getStatus()))
                .setCreatedAt(userDO.getCreatedAt().getTime())
                .setUpdatedAt(userDO.getUpdatedAt().getTime())
                .build();

            UserProto.GetUserResponse response = UserProto.GetUserResponse.newBuilder()
                .setUser(user)
                .build();

            responseObserver.onNext(response);
            responseObserver.onCompleted();
        } catch (Exception e) {
            responseObserver.onError(Status.INVALID_ARGUMENT
                .withDescription(e.getMessage())
                .asRuntimeException());
        }
    }

    // 2. 服务端流式RPC - 返回流
    @Override
    public void listUsers(
        UserProto.ListUsersRequest request,
        StreamObserver<UserProto.User> responseObserver
    ) {
        try {
            int page = request.getPage();
            int size = request.getSize();
            String keyword = request.getKeyword();

            List<UserDO> users = userService.listUsers(page, size, keyword);

            // 流式返回每个用户
            for (UserDO userDO : users) {
                UserProto.User user = convertToProto(userDO);
                responseObserver.onNext(user);
            }

            responseObserver.onCompleted();
        } catch (Exception e) {
            responseObserver.onError(Status.INTERNAL
                .withDescription(e.getMessage())
                .asRuntimeException());
        }
    }

    // 3. 客户端流式RPC - 接收流
    @Override
    public StreamObserver<UserProto.CreateUserRequest> createUsers(
        StreamObserver<UserProto.CreateUsersResponse> responseObserver
    ) {
        return new StreamObserver<UserProto.CreateUserRequest>() {
            private final List<UserDO> users = new ArrayList<>();

            @Override
            public void onNext(UserProto.CreateUserRequest request) {
                // 接收每个请求并添加到列表
                UserDO userDO = new UserDO();
                userDO.setUsername(request.getUsername());
                userDO.setEmail(request.getEmail());
                userDO.setPassword(request.getPassword());
                userDO.setAge(request.getAge());
                users.add(userDO);
            }

            @Override
            public void onError(Throwable t) {
                // 错误处理
                log.error("Error creating users", t);
            }

            @Override
            public void onCompleted() {
                // 批量创建用户
                List<UserDO> createdUsers = userService.batchCreateUsers(users);

                List<UserProto.User> protoUsers = createdUsers.stream()
                    .map(UserGrpcService.this::convertToProto)
                    .collect(Collectors.toList());

                UserProto.CreateUsersResponse response =
                    UserProto.CreateUsersResponse.newBuilder()
                        .addAllUsers(protoUsers)
                        .setCount(protoUsers.size())
                        .build();

                responseObserver.onNext(response);
                responseObserver.onCompleted();
            }
        };
    }

    // 4. 双向流式RPC
    @Override
    public StreamObserver<UserProto.UserChatRequest> userChat(
        StreamObserver<UserProto.UserChatResponse> responseObserver
    ) {
        return new StreamObserver<UserProto.UserChatRequest>() {
            @Override
            public void onNext(UserProto.UserChatRequest request) {
                // 收到消息,立即回复
                UserProto.UserChatResponse response =
                    UserProto.UserChatResponse.newBuilder()
                        .setUserId(request.getUserId())
                        .setMessage("Echo: " + request.getMessage())
                        .setTimestamp(System.currentTimeMillis())
                        .build();

                responseObserver.onNext(response);
            }

            @Override
            public void onError(Throwable t) {
                log.error("Chat error", t);
            }

            @Override
            public void onCompleted() {
                responseObserver.onCompleted();
            }
        };
    }

    private UserProto.User convertToProto(UserDO userDO) {
        return UserProto.User.newBuilder()
            .setId(userDO.getId())
            .setUsername(userDO.getUsername())
            .setEmail(userDO.getEmail())
            .setAge(userDO.getAge())
            .setAvatar(userDO.getAvatar())
            .setStatus(UserProto.UserStatus.valueOf(userDO.getStatus()))
            .setCreatedAt(userDO.getCreatedAt().getTime())
            .setUpdatedAt(userDO.getUpdatedAt().getTime())
            .build();
    }
}`}
          filename="UserGrpcService.java"
        />

        <h3 className="text-2xl font-bold text-gray-800 mb-4 mt-8">gRPC Client 实现</h3>
        <CodeBlock
          language="java"
          code={`@Component
public class UserGrpcClient {

    private final UserServiceGrpc.UserServiceBlockingStub blockingStub;
    private final UserServiceGrpc.UserServiceStub asyncStub;

    @Autowired
    public UserGrpcClient(
        UserServiceGrpc.UserServiceBlockingStub blockingStub,
        UserServiceGrpc.UserServiceStub asyncStub
    ) {
        this.blockingStub = blockingStub;
        this.asyncStub = asyncStub;
    }

    // 1. 同步调用
    public UserProto.User getUser(String userId) {
        UserProto.GetUserRequest request = UserProto.GetUserRequest.newBuilder()
            .setUserId(userId)
            .build();

        UserProto.GetUserResponse response = blockingStub.getUser(request);
        return response.getUser();
    }

    // 2. 服务端流式调用
    public List<UserProto.User> listUsers(int page, int size, String keyword) {
        UserProto.ListUsersRequest request = UserProto.ListUsersRequest.newBuilder()
            .setPage(page)
            .setSize(size)
            .setKeyword(keyword)
            .build();

        List<UserProto.User> users = new ArrayList<>();
        Iterator<UserProto.User> iterator = blockingStub.listUsers(request);

        while (iterator.hasNext()) {
            users.add(iterator.next());
        }

        return users;
    }

    // 3. 异步调用
    public CompletableFuture<UserProto.User> getUserAsync(String userId) {
        UserProto.GetUserRequest request = UserProto.GetUserRequest.newBuilder()
            .setUserId(userId)
            .build();

        CompletableFuture<UserProto.User> future = new CompletableFuture<>();

        asyncStub.getUser(request, new StreamObserver<UserProto.GetUserResponse>() {
            @Override
            public void onNext(UserProto.GetUserResponse response) {
                future.complete(response.getUser());
            }

            @Override
            public void onError(Throwable t) {
                future.completeExceptionally(t);
            }

            @Override
            public void onCompleted() {
                // 完成
            }
        });

        return future;
    }

    // 4. 客户端流式调用
    public List<UserProto.User> createUsers(List<UserProto.CreateUserRequest> requests) {
        return ClientResponseObserver.<UserProto.CreateUsersResponse>newObserver()
            .forEach(response -> {
                // 处理响应
            })
            .waitForCompletion()
            .call(observer -> {
                // 发送流式请求
                for (UserProto.CreateUserRequest request : requests) {
                    observer.onNext(request);
                }
                observer.onCompleted();
            })
            .getResponses();
    }
}`}
          filename="UserGrpcClient.java"
        />
      </section>

      {/* API 文档自动化 */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">API 文档自动化</h2>

        <h3 className="text-2xl font-bold text-gray-800 mb-4">Swagger/OpenAPI 集成</h3>
        <CodeBlock
          language="java"
          code={`// 1. 添加依赖
/*
<dependency>
    <groupId>org.springdoc</groupId>
    <artifactId>springdoc-openapi-starter-webmvc-ui</artifactId>
    <version>2.3.0</version>
</dependency>
*/

// 2. Swagger 配置
@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI openAPI() {
        return new OpenAPI()
            .info(new Info()
                .title("微服务系统 API 文档")
                .description("基于 Spring Cloud Alibaba 的微服务系统接口文档")
                .version("v1.0.0")
                .contact(new Contact()
                    .name("开发团队")
                    .email("dev@example.com"))
                .license(new License()
                    .name("Apache 2.0")
                    .url("https://www.apache.org/licenses/LICENSE-2.0.html")))
            .externalDocs(new ExternalDocumentation()
                .description("项目Wiki")
                .url("https://wiki.example.com"))
            .addSecurityItem(new SecurityRequirement()
                .addList("bearer-jwt"))
            .components(new Components()
                .addSecuritySchemes("bearer-jwt",
                    new SecurityScheme()
                        .type(SecurityScheme.Type.HTTP)
                        .scheme("bearer")
                        .bearerFormat("JWT")))
            .addServersItem(new Server()
                .url("http://localhost:8080")
                .description("开发环境"))
            .addServersItem(new Server()
                .url("https://api-dev.example.com")
                .description("测试环境"))
            .addServersItem(new Server()
                .url("https://api.example.com")
                .description("生产环境"));
    }

    @Bean
    public GroupedOpenApi publicApi() {
        return GroupedOpenApi.builder()
            .group("public")
            .pathsToMatch("/api/public/**")
            .build();
    }

    @Bean
    public GroupedOpenApi userApi() {
        return GroupedOpenApi.builder()
            .group("user")
            .pathsToMatch("/api/v1/users/**")
            .addOpenApiMethodFilter(method -> method.isAnnotationPresent(Operation.class))
            .build();
    }

    @Bean
    public GroupedOpenApi adminApi() {
        return GroupedOpenApi.builder()
            .group("admin")
            .pathsToMatch("/api/v1/admin/**")
            .addOpenApiMethodFilter(method ->
                method.isAnnotationPresent(PreAuthorize.class))
            .build();
    }
}

// 3. Controller 文档注解
@RestController
@RequestMapping("/api/v1/users")
@Tag(name = "用户管理", description = "用户CRUD操作接口")
public class UserController {

    @Operation(
        summary = "获取用户列表",
        description = "分页查询用户列表,支持关键词搜索",
        tags = {"用户管理"}
    )
    @ApiResponses({
        @ApiResponse(
            responseCode = "200",
            description = "成功",
            content = @Content(
                schema = @Schema(implementation = PageResult.class)
            )
        ),
        @ApiResponse(
            responseCode = "400",
            description = "参数错误",
            content = @Content(
                schema = @Schema(implementation = ErrorResponse.class)
            )
        ),
        @ApiResponse(
            responseCode = "401",
            description = "未认证"
        )
    })
    @GetMapping
    public Result<PageResult<UserVO>> listUsers(
        @Parameter(description = "页码", example = "1")
        @RequestParam(defaultValue = "1") Integer page,

        @Parameter(description = "每页大小", example = "10")
        @RequestParam(defaultValue = "10") Integer size,

        @Parameter(description = "搜索关键词")
        @RequestParam(required = false) String keyword
    ) {
        return Result.success(userService.pageUsers(page, size, keyword));
    }

    @Operation(summary = "获取用户详情", description = "根据用户ID查询用户详细信息")
    @GetMapping("/{id}")
    public Result<UserVO> getUser(
        @Parameter(description = "用户ID", required = true, example = "1")
        @PathVariable Long id
    ) {
        return Result.success(userService.getUserById(id));
    }

    @Operation(summary = "创建用户", description = "创建新用户账号")
    @PostMapping
    public Result<UserVO> createUser(
        @io.swagger.v3.oas.annotations.parameters.RequestBody(
            description = "用户创建信息",
            required = true,
            content = @Content(
                schema = @Schema(implementation = UserCreateDTO.class)
            )
        )
        @Valid @RequestBody UserCreateDTO dto
    ) {
        return Result.success(userService.createUser(dto));
    }
}

// 4. Model 文档注解
@Schema(description = "用户创建DTO")
public class UserCreateDTO {

    @Schema(
        description = "用户名",
        example = "alice",
        required = true,
        minLength = 3,
        maxLength = 20
    )
    @NotBlank(message = "用户名不能为空")
    @Size(min = 3, max = 20, message = "用户名长度3-20字符")
    private String username;

    @Schema(
        description = "邮箱",
        example = "alice@example.com",
        format = "email",
        required = true
    )
    @NotBlank(message = "邮箱不能为空")
    @Email(message = "邮箱格式不正确")
    private String email;

    @Schema(
        description = "密码",
        example = "123456",
        required = true,
        minLength = 6
    )
    @NotBlank(message = "密码不能为空")
    @Size(min = 6, message = "密码至少6位")
    private String password;

    @Schema(description = "年龄", example = "25", minimum = "1", maximum = "150")
    @Min(value = 1, message = "年龄必须大于0")
    @Max(value = 150, message = "年龄不能超过150")
    private Integer age;
}

@Schema(description = "统一响应结果")
public class Result<T> {
    @Schema(description = "业务状态码", example = "200")
    private Integer code;

    @Schema(description = "提示信息", example = "success")
    private String message;

    @Schema(description = "返回数据")
    private T data;

    @Schema(description = "时间戳", example = "1699999999999")
    private Long timestamp;
}`}
          filename="OpenApiConfig.java"
        />

        <h3 className="text-2xl font-bold text-gray-800 mb-4 mt-8">API 文档最佳实践</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <BestPracticeCard title="文档完整性" practices={[
            '所有接口必须添加 @Operation 注解',
            '明确描述参数和返回值',
            '提供示例数据',
            '标注可能的状态码'
          ]} />
          <BestPracticeCard title="文档维护" practices={[
            '代码变更同步更新文档',
            '定期review文档准确性',
            '废弃接口添加 Deprecated 标识',
            '保持文档版本一致性'
          ]} />
          <BestPracticeCard title="示例丰富" practices={[
            '提供真实可用的示例',
            '包含正常和异常场景',
            '说明参数取值范围',
            '标注必填和可选参数'
          ]} />
          <BestPracticeCard title="自动化测试" practices={[
            '集成 Swagger UI 测试',
            '使用代码生成客户端 SDK',
            'API 变更自动检测',
            '文档与代码一致性检查'
          ]} />
        </div>

        <h3 className="text-2xl font-bold text-gray-800 mb-4 mt-8"> Knife4j 增强</h3>
        <CodeBlock
          language="xml"
          code={`<!-- Knife4j 增强 Swagger UI -->
<dependency>
    <groupId>com.github.xiaoymin</groupId>
    <artifactId>knife4j-openapi3-jakarta-spring-boot-starter</artifactId>
    <version>4.3.0</version>
</dependency>`}
          filename="pom.xml"
        />

        <div className="mt-6 p-4 bg-blue-50 border-l-4 border-blue-500 rounded">
          <h4 className="font-bold text-gray-900 mb-2">Knife4j 访问地址</h4>
          <ul className="space-y-1 text-sm text-gray-700">
            <li>开发环境: http://localhost:8080/doc.html</li>
            <li>测试环境: https://api-dev.example.com/doc.html</li>
            <li>生产环境: 根据安全策略决定是否开放</li>
          </ul>
        </div>
      </section>

      {/* 常见问题 */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">常见问题</h2>
        <div className="space-y-3">
          <FaqCard
            number={1}
            question="RESTful vs GraphQL vs gRPC 如何选择?"
            answer="RESTful: 通用场景、简单资源操作; GraphQL: 复杂数据关联、前端灵活查询; gRPC: 高性能要求、微服务内部通信"
            isOpen={expandedFaq === 1}
            onClick={() => setExpandedFaq(expandedFaq === 1 ? null : 1)}
          />
          <FaqCard
            number={2}
            question="API 版本应该多久更新一次?"
            answer="只在必须破坏向后兼容时才升级大版本,小版本可随时迭代。建议每个API版本维护6-12个月"
            isOpen={expandedFaq === 2}
            onClick={() => setExpandedFaq(expandedFaq === 2 ? null : 2)}
          />
          <FaqCard
            number={3}
            question="如何保证 API 文档与代码一致?"
            answer="使用注解驱动的文档工具(Swagger),结合自动化测试验证,建立代码review机制确保文档同步更新"
            isOpen={expandedFaq === 3}
            onClick={() => setExpandedFaq(expandedFaq === 3 ? null : 3)}
          />
          <FaqCard
            number={4}
            question="gRPC 能否用于浏览器调用?"
            answer="不能直接调用,需要使用 gRPC-Web 或通过网关转换(gRPC-HTTP转码)"
            isOpen={expandedFaq === 4}
            onClick={() => setExpandedFaq(expandedFaq === 4 ? null : 4)}
          />
          <FaqCard
            number={5}
            question="如何设计友好的错误响应?"
            answer="使用标准HTTP状态码,返回统一的错误格式,包含错误码、错误信息、错误详情和帮助链接"
            isOpen={expandedFaq === 5}
            onClick={() => setExpandedFaq(expandedFaq === 5 ? null : 5)}
          />
        </div>
      </section>

      {/* 下一步 */}
      <section className="bg-gradient-to-r from-blue-600 to-cyan-700 text-white p-8 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">🎯 掌握了 API 设计,下一步学习什么?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <NextStepCard title="Gateway 网关" description="统一 API 入口" link="/gateway" icon="🚪" />
          <NextStepCard title="安全设计" description="API 鉴权与加密" link="/security-design" icon="🔒" />
          <NextStepCard title="性能优化" description="API 性能调优" link="/performance-tuning" icon="⚡" />
          <NextStepCard title="监控告警" description="API 监控体系" link="/monitoring" icon="📊" />
        </div>
      </section>
    </div>
  );
};

// 辅助组件
interface ValueCardProps {
  icon: string;
  title: string;
  desc: string;
  color: string;
}

const ValueCard: React.FC<ValueCardProps> = ({ icon, title, desc, color }) => {
  const colorClasses: Record<string, string> = {
    blue: 'bg-blue-50 border-blue-200',
    green: 'bg-green-50 border-green-200',
    purple: 'bg-purple-50 border-purple-200',
    orange: 'bg-orange-50 border-orange-200',
    red: 'bg-red-50 border-red-200',
    yellow: 'bg-yellow-50 border-yellow-200',
  };
  return (
    <div className={`p-4 border-2 ${colorClasses[color]} rounded-lg`}>
      <div className="flex items-center mb-2">
        <span className="text-2xl mr-2">{icon}</span>
        <h4 className="font-bold text-gray-900">{title}</h4>
      </div>
      <p className="text-sm text-gray-600">{desc}</p>
    </div>
  );
};

interface HttpMethodCardProps {
  method: string;
  desc: string;
  safe: boolean;
  idempotent: boolean;
  example: string;
}

const HttpMethodCard: React.FC<HttpMethodCardProps> = ({
  method,
  desc,
  safe,
  idempotent,
  example,
}) => {
  const methodColors: Record<string, string> = {
    GET: 'bg-green-100 text-green-800 border-green-300',
    POST: 'bg-blue-100 text-blue-800 border-blue-300',
    PUT: 'bg-yellow-100 text-yellow-800 border-yellow-300',
    PATCH: 'bg-orange-100 text-orange-800 border-orange-300',
    DELETE: 'bg-red-100 text-red-800 border-red-300',
  };

  return (
    <div className={`p-4 border-2 ${methodColors[method]} rounded-lg`}>
      <div className="flex items-center justify-between mb-2">
        <h4 className="font-bold text-lg">{method}</h4>
        <div className="flex gap-1 text-xs">
          {safe && <span className="px-2 py-1 bg-green-200 rounded">安全</span>}
          {idempotent && <span className="px-2 py-1 bg-purple-200 rounded">幂等</span>}
        </div>
      </div>
      <p className="text-sm text-gray-700 mb-2">{desc}</p>
      <code className="text-xs font-mono">{example}</code>
    </div>
  );
};

interface VersionStrategyCardProps {
  title: string;
  example: string;
  pros: string;
  cons: string;
  recommended: boolean;
}

const VersionStrategyCard: React.FC<VersionStrategyCardProps> = ({
  title,
  example,
  pros,
  cons,
  recommended,
}) => (
  <div className={`p-5 border-2 rounded-lg ${recommended ? 'border-green-400 bg-green-50' : 'border-gray-200 bg-white'}`}>
    <div className="flex items-center justify-between mb-3">
      <h4 className="font-bold text-gray-900">{title}</h4>
      {recommended && (
        <span className="text-xs px-2 py-1 bg-green-600 text-white rounded">推荐</span>
      )}
    </div>
    <p className="text-sm font-mono bg-gray-100 p-2 rounded mb-3">{example}</p>
    <div className="text-sm">
      <p className="text-green-700">✓ {pros}</p>
      <p className="text-red-700">✗ {cons}</p>
    </div>
  </div>
);

interface BestPracticeCardProps {
  title: string;
  practices: string[];
}

const BestPracticeCard: React.FC<BestPracticeCardProps> = ({ title, practices }) => {
  return (
    <div className="p-5 bg-green-50 border-2 border-green-200 rounded-lg">
      <h3 className="text-lg font-bold text-gray-900 mb-3">{title}</h3>
      <ul className="space-y-2">
        {practices.map((practice, index) => (
          <li key={index} className="flex items-start text-sm text-gray-700">
            <span className="text-green-600 mr-2">✓</span>
            <span>{practice}</span>
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

const FaqCard: React.FC<FaqCardProps> = ({ number, question, answer, isOpen, onClick }) => {
  return (
    <div className="bg-white border-2 border-gray-200 rounded-lg overflow-hidden">
      <button
        onClick={onClick}
        className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
      >
        <h3 className="text-lg font-bold text-gray-900">
          {number}. {question}
        </h3>
        <svg
          className={`w-5 h-5 text-gray-500 transition-transform flex-shrink-0 ml-4 ${
            isOpen ? 'rotate-180' : ''
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7 7" />
        </svg>
      </button>
      {isOpen && (
        <div className="px-6 pb-4 text-gray-700 text-sm">
          {answer}
        </div>
      )}
    </div>
  );
};

interface NextStepCardProps {
  title: string;
  description: string;
  link: string;
  icon: string;
}

const NextStepCard: React.FC<NextStepCardProps> = ({ title, description, link, icon }) => {
  return (
    <a href={link} className="block p-4 bg-white/10 backdrop-blur rounded-lg hover:bg-white/20 transition-colors">
      <div className="flex items-start">
        <span className="text-2xl mr-3">{icon}</span>
        <div className="flex-1">
          <h4 className="font-bold mb-1">{title}</h4>
          <p className="text-sm opacity-90">{description}</p>
        </div>
        <svg className="w-5 h-5 flex-shrink-0 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </a>
  );
};
