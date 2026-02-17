import { CodeBlock } from '../components';
import { useState } from 'react';

interface SecurityCardProps {
  title: string;
  level: string;
  description: string;
  risks: string[];
  solutions: string[];
  color: string;
}

const SecurityCard: React.FC<SecurityCardProps> = ({ title, level, description, risks, solutions, color }) => {
  const colorClasses = {
    red: 'bg-red-50 border-red-200',
    yellow: 'bg-yellow-50 border-yellow-200',
    green: 'bg-green-50 border-green-200',
    blue: 'bg-blue-50 border-blue-200',
  };

  return (
    <div className={`p-6 border-2 rounded-lg ${colorClasses[color as keyof typeof colorClasses]}`}>
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-2xl font-bold text-gray-900">{title}</h3>
        <span className="px-3 py-1 bg-white rounded-full text-sm font-semibold">{level}</span>
      </div>
      <p className="text-gray-700 mb-4">{description}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h4 className="font-bold text-red-700 mb-2">⚠️ 安全风险</h4>
          <ul className="text-sm text-gray-700 space-y-1">
            {risks.map((risk, index) => (
              <li key={index}>• {risk}</li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-green-700 mb-2">✅ 防护方案</h4>
          <ul className="text-sm text-gray-700 space-y-1">
            {solutions.map((solution, index) => (
              <li key={index}>• {solution}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

interface MechanismCardProps {
  name: string;
  description: string;
  implementation: string;
  code?: string;
}

const MechanismCard: React.FC<MechanismCardProps> = ({ name, description, implementation, code }) => {
  return (
    <div className="bg-white border-2 border-slate-200 rounded-lg p-5">
      <h3 className="text-xl font-bold text-gray-900 mb-2">{name}</h3>
      <p className="text-gray-700 text-sm mb-3">{description}</p>

      <div className="bg-blue-50 p-3 rounded mb-3">
        <p className="text-sm text-blue-900">
          <span className="font-bold">🔧 实现方案:</span> {implementation}
        </p>
      </div>

      {code && <CodeBlock language="java" code={code} />}
    </div>
  );
};

interface ChecklistCardProps {
  category: string;
  items: string[];
  color: string;
}

const ChecklistCard: React.FC<ChecklistCardProps> = ({ category, items, color }) => {
  const colorClasses = {
    red: 'border-red-300',
    yellow: 'border-yellow-300',
    green: 'border-green-300',
  };

  return (
    <div className={`bg-white border-2 ${colorClasses[color as keyof typeof colorClasses]} rounded-lg p-5`}>
      <h3 className="text-lg font-bold text-gray-900 mb-3">{category}</h3>
      <ul className="space-y-2">
        {items.map((item, index) => (
          <li key={index} className="flex items-start">
            <input type="checkbox" className="mt-1 mr-2" />
            <span className="text-sm text-gray-700">{item}</span>
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
        <span className="text-2xl text-gray-400">{isOpen ? '−' : '+'}</span>
      </button>
      {isOpen && (
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
          <div className="text-gray-700 whitespace-pre-line">{answer}</div>
        </div>
      )}
    </div>
  );
};

export const SecurityDesignPage: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* 页头 */}
      <div className="bg-gradient-to-r from-slate-700 to-slate-900 text-white rounded-lg p-6 mb-8">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-4xl font-bold mb-2">安全架构设计</h1>
            <p className="text-slate-200 text-lg">微服务安全架构与最佳实践</p>
          </div>
          <div className="flex gap-3 text-sm">
            <span className="px-3 py-1 bg-white/20 rounded-full">🏗️ 架构师</span>
            <span className="px-3 py-1 bg-white/20 rounded-full">⏱️ 约90分钟</span>
            <span className="px-3 py-1 bg-white/20 rounded-full">📚 16个知识点</span>
          </div>
        </div>
      </div>

      {/* 为什么需要安全架构 */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">为什么需要安全架构?</h2>

        <div className="bg-white border-2 border-blue-200 rounded-lg p-6 mb-6">
          <p className="text-gray-700 text-lg mb-4">
            <strong>微服务安全架构</strong>是指在微服务架构中，通过多层次的安全机制保护系统免受各种安全威胁。
            微服务的<strong className="text-blue-600">分布式特性</strong>带来了更多的攻击面，需要建立<strong className="text-blue-600">纵深防御</strong>体系。
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div className="bg-red-50 border-2 border-red-200 rounded-lg p-5">
              <h3 className="text-xl font-bold text-red-900 mb-3">⚠️ 微服务安全挑战</h3>
              <ul className="text-gray-700 space-y-2">
                <li>• 服务数量多，攻击面大</li>
                <li>• 服务间通信需要加密</li>
                <li>• 分布式会话管理复杂</li>
                <li>• 配置管理分散</li>
                <li>• 第三方依赖风险</li>
              </ul>
            </div>

            <div className="bg-green-50 border-2 border-green-200 rounded-lg p-5">
              <h3 className="text-xl font-bold text-green-900 mb-3">✅ 安全架构价值</h3>
              <ul className="text-gray-700 space-y-2">
                <li>• 防止数据泄露和篡改</li>
                <li>• 保障用户隐私</li>
                <li>• 满足合规要求（等保、GDPR）</li>
                <li>• 建立安全防护体系</li>
                <li>• 提升用户信任度</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-6">
          <h3 className="text-xl font-bold text-yellow-900 mb-3">📊 2024年安全威胁统计</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded">
              <p className="text-3xl font-bold text-red-600">45%</p>
              <p className="text-sm text-gray-700">攻击来自内部</p>
            </div>
            <div className="bg-white p-4 rounded">
              <p className="text-3xl font-bold text-red-600">$4.45M</p>
              <p className="text-sm text-gray-700">数据泄露平均损失</p>
            </div>
            <div className="bg-white p-4 rounded">
              <p className="text-3xl font-bold text-red-600">287天</p>
              <p className="text-sm text-gray-700">平均发现时间</p>
            </div>
          </div>
        </div>
      </section>

      {/* 微服务安全十大威胁 */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">微服务安全十大威胁</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <SecurityCard
            title="1. 认证与授权漏洞"
            level="高危"
            description="身份认证和权限控制不当，导致未授权访问"
            color="red"
            risks={[
              '弱密码策略',
              'Token 泄露',
              '会话固定攻击',
              '权限提升',
              '越权访问'
            ]}
            solutions={[
              'JWT + Spring Security',
              'OAuth2.0 统一认证',
              'RBAC 角色权限控制',
              'Token 过期机制',
              '单点登录 (SSO)'
            ]}
          />
          <SecurityCard
            title="2. API 接口安全"
            level="高危"
            description="API 接口缺乏安全防护，容易被攻击"
            color="red"
            risks={[
              'SQL 注入',
              'XSS 跨站脚本',
              'CSRF 跨站请求伪造',
              '参数篡改',
              '重放攻击'
            ]}
            solutions={[
              '参数校验与过滤',
              'SQL 预编译',
              '接口签名验证',
              '时间戳 + Nonce',
              'HTTPS 加密传输'
            ]}
          />
          <SecurityCard
            title="3. 数据泄露"
            level="严重"
            description="敏感数据被窃取或泄露，造成重大损失"
            color="red"
            risks={[
              '数据库被拖库',
              '日志泄露敏感信息',
              '明文传输密码',
              '配置文件包含密码',
              '第三方 API 泄露'
            ]}
            solutions={[
              '敏感数据加密存储',
              '日志脱敏处理',
              '配置中心加密',
              '数据库字段加密',
              'DLP 数据防泄露'
            ]}
          />
          <SecurityCard
            title="4. 服务间通信安全"
            level="高危"
            description="微服务间通信被监听或篡改"
            color="yellow"
            risks={[
              '明文通信被窃听',
              '中间人攻击',
              '服务冒充',
              '重放攻击',
              '流量分析'
            ]}
            solutions={[
              'mTLS 双向认证',
              'Service Mesh 加密',
              'RPC 框架加密',
              '服务间鉴权',
              '网络隔离'
            ]}
          />
          <SecurityCard
            title="5. 依赖组件漏洞"
            level="高危"
            description="第三方依赖包存在安全漏洞"
            color="yellow"
            risks={[
              'Log4j2 远程代码执行',
              'Fastjson 反序列化',
              'Spring4Shell',
              '供应链攻击',
              '恶意依赖'
            ]}
            solutions={[
              '依赖扫描 (OWASP)',
              '定期升级依赖',
              '依赖管理工具',
              '私有 Maven 仓库',
              '组件白名单'
            ]}
          />
          <SecurityCard
            title="6. 配置安全"
            level="中危"
            description="配置不当导致的安全问题"
            color="yellow"
            risks={[
              '配置文件包含明文密码',
              '默认凭证未修改',
              '调试接口开放',
              '配置泄露到 Git',
              '环境变量泄露'
            ]}
            solutions={[
              '配置中心加密',
              '配置文件分离',
              '.gitignore 敏感配置',
              '密钥管理服务 (KMS)',
              '定期审计配置'
            ]}
          />
          <SecurityCard
            title="7. 容器与编排安全"
            level="中危"
            description="Docker/K8s 配置不当导致的安全风险"
            color="green"
            risks={[
              '容器逃逸',
              '特权容器滥用',
              'K8s API 未授权访问',
              '镜像漏洞',
              '资源未限制'
            ]}
            solutions={[
              '最小化镜像',
              '镜像扫描',
              'Runtime 安全',
              '网络策略隔离',
              'RBAC 权限控制'
            ]}
          />
          <SecurityCard
            title="8. 日志与监控安全"
            level="中危"
            description="日志泄露或监控被绕过"
            color="green"
            risks={[
              '日志包含敏感信息',
              '日志被篡改',
              '安全事件未监控',
              '日志未审计',
              '监控盲区'
            ]}
            solutions={[
              '日志脱敏',
              '日志完整性校验',
              '安全事件告警',
              '日志审计追踪',
              '异常行为检测'
            ]}
          />
          <SecurityCard
            title="9. DDOS 攻击"
            level="高危"
            description="分布式拒绝服务攻击"
            color="yellow"
            risks={[
              '流量攻击',
              '连接耗尽',
              '应用层攻击',
              '反射放大攻击',
              '慢连接攻击'
            ]}
            solutions={[
              'CDN 流量清洗',
              '限流熔断',
              'WAF 防火墙',
              '黑名单 IP',
              '弹性扩容'
            ]}
          />
          <SecurityCard
            title="10. 内部威胁"
            level="严重"
            description="内部人员恶意行为或误操作"
            color="red"
            risks={[
              '权限滥用',
              '数据窃取',
              '恶意破坏',
              '误操作',
              '社会工程学'
            ]}
            solutions={[
              '最小权限原则',
              '操作审计',
              '敏感操作二次认证',
              '数据水印',
              '安全意识培训'
            ]}
          />
        </div>
      </section>

      {/* 核心安全机制 */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">核心安全机制实现</h2>

        <div className="space-y-6">
          <MechanismCard
            name="1. JWT 认证 + Spring Security"
            description="无状态认证，适合微服务架构"
            implementation="使用 JWT Token，Gateway 统一鉴权，内部服务透传用户信息"
            code={`@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        return http
            .csrf().disable()
            .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            .authorizeRequests()
                .antMatchers("/api/public/**").permitAll()
                .anyRequest().authenticated()
            .and()
            .addFilterBefore(jwtAuthenticationFilter(), UsernamePasswordAuthenticationFilter.class)
            .build();
    }

    @Bean
    public JwtAuthenticationFilter jwtAuthenticationFilter() {
        return new JwtAuthenticationFilter();
    }
}

// JWT 工具类
@Component
public class JwtUtil {

    @Value("$\{jwt.secret}")
    private String secret;

    @Value("$\{jwt.expiration}")
    private Long expiration;

    public String generateToken(UserDetails userDetails) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("username", userDetails.getUsername());
        claims.put("roles", userDetails.getAuthorities());
        return Jwts.builder()
            .setClaims(claims)
            .setSubject(userDetails.getUsername())
            .setIssuedAt(new Date())
            .setExpiration(new Date(System.currentTimeMillis() + expiration))
            .signWith(SignatureAlgorithm.HS512, secret)
            .compact();
    }

    public boolean validateToken(String token) {
        try {
            Jwts.parser().setSigningKey(secret).parseClaimsJws(token);
            return true;
        } catch (JwtException | IllegalArgumentException e) {
            return false;
        }
    }
}`}
          />

          <MechanismCard
            name="2. Gateway 统一鉴权"
            description="在网关层进行统一认证和鉴权"
            implementation="使用 Gateway 全局过滤器，验证 JWT Token，提取用户信息放入 Header"
            code={`@Component
public class AuthGlobalFilter implements GlobalFilter, Ordered {

    @Autowired
    private JwtUtil jwtUtil;

    @Override
    public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {
        String token = exchange.getRequest().getHeaders().getFirst("Authorization");

        // 白名单放行
        if (isWhiteList(exchange.getRequest().getPath().value())) {
            return chain.filter(exchange);
        }

        // 验证 Token
        if (StringUtils.isEmpty(token) || !jwtUtil.validateToken(token)) {
            exchange.getResponse().setStatusCode(HttpStatus.UNAUTHORIZED);
            return exchange.getResponse().setComplete();
        }

        // 提取用户信息
        String username = jwtUtil.getUsernameFromToken(token);

        // 将用户信息放入 Header，传递给下游服务
        ServerHttpRequest request = exchange.getRequest().mutate()
            .header("X-User-Id", jwtUtil.getUserIdFromToken(token))
            .header("X-Username", username)
            .header("X-User-Roles", String.join(",", jwtUtil.getRolesFromToken(token)))
            .build();

        return chain.filter(exchange.mutate().request(request).build());
    }

    @Override
    public int getOrder() {
        return -100; // 优先级最高
    }
}`}
          />

          <MechanismCard
            name="3. API 接口签名验证"
            description="防止参数篡改和重放攻击"
            implementation="使用时间戳 + Nonce + 参数签名，MD5 或 SHA256 算法"
            code={`@Component
public class ApiSignatureUtil {

    @Value("$\{api.secret}")
    private String apiSecret;

    /**
     * 生成签名
     * 签名算法: MD5(secret + timestamp + nonce + params)
     */
    public String generateSign(Long timestamp, String nonce, Map<String, String> params) {
        // 1. 参数排序
        TreeMap<String, String> sortedParams = new TreeMap<>(params);

        // 2. 拼接参数
        StringBuilder sb = new StringBuilder();
        sb.append(apiSecret);
        sb.append(timestamp);
        sb.append(nonce);
        sortedParams.forEach((k, v) -> sb.append(k).append(v));

        // 3. MD5 签名
        return DigestUtils.md5Hex(sb.toString());
    }

    /**
     * 验证签名
     */
    public boolean verifySign(String sign, Long timestamp, String nonce, Map<String, String> params) {
        // 1. 检查时间戳（5分钟内有效）
        long now = System.currentTimeMillis();
        if (Math.abs(now - timestamp) > 300000) {
            return false;
        }

        // 2. 检查 Nonce 是否重复（Redis 存储已使用的 Nonce）
        if (redisTemplate.hasKey("nonce:" + nonce)) {
            return false; // 重放攻击
        }

        // 3. 验证签名
        String expectedSign = generateSign(timestamp, nonce, params);
        if (!expectedSign.equals(sign)) {
            return false;
        }

        // 4. 记录 Nonce（5分钟过期）
        redisTemplate.opsForValue().set("nonce:" + nonce, "1", 5, TimeUnit.MINUTES);

        return true;
    }
}

// 接口使用示例
@RestController
public class OrderController {

    @Autowired
    private ApiSignatureUtil signatureUtil;

    @PostMapping("/api/orders")
    public Result createOrder(
        @RequestHeader("X-Timestamp") Long timestamp,
        @RequestHeader("X-Nonce") String nonce,
        @RequestHeader("X-Sign") String sign,
        @RequestBody OrderDTO orderDTO
    ) {
        // 收集参数
        Map<String, String> params = new HashMap<>();
        params.put("productId", orderDTO.getProductId().toString());
        params.put("amount", orderDTO.getAmount().toString());

        // 验证签名
        if (!signatureUtil.verifySign(sign, timestamp, nonce, params)) {
            return Result.error("签名验证失败");
        }

        // 业务逻辑
        return orderService.create(orderDTO);
    }
}`}
          />

          <MechanismCard
            name="4. 敏感数据加密存储"
            description="对数据库中的敏感字段进行加密"
            implementation="使用 AES 加密算法，MyBatis TypeHandler 自动加解密"
            code={`/**
 * AES 加密工具类
 */
@Component
public class AesUtil {

    @Value("$\{encrypt.key}")
    private String encryptKey;

    @Value("$\{encrypt.iv}")
    private String encryptIv;

    /**
     * 加密
     */
    public String encrypt(String data) {
        try {
            Cipher cipher = Cipher.getInstance("AES/CBC/PKCS5Padding");
            SecretKeySpec keySpec = new SecretKeySpec(encryptKey.getBytes(), "AES");
            IvParameterSpec ivSpec = new IvParameterSpec(encryptIv.getBytes());
            cipher.init(Cipher.ENCRYPT_MODE, keySpec, ivSpec);
            byte[] encrypted = cipher.doFinal(data.getBytes());
            return Base64.getEncoder().encodeToString(encrypted);
        } catch (Exception e) {
            throw new RuntimeException("加密失败", e);
        }
    }

    /**
     * 解密
     */
    public String decrypt(String encryptedData) {
        try {
            Cipher cipher = Cipher.getInstance("AES/CBC/PKCS5Padding");
            SecretKeySpec keySpec = new SecretKeySpec(encryptKey.getBytes(), "AES");
            IvParameterSpec ivSpec = new IvParameterSpec(encryptIv.getBytes());
            cipher.init(Cipher.DECRYPT_MODE, keySpec, ivSpec);
            byte[] decrypted = cipher.doFinal(Base64.getDecoder().decode(encryptedData));
            return new String(decrypted);
        } catch (Exception e) {
            throw new RuntimeException("解密失败", e);
        }
    }
}

/**
 * MyBatis TypeHandler - 自动加解密
 */
@Component
public class EncryptTypeHandler extends BaseTypeHandler<String> {

    @Autowired
    private AesUtil aesUtil;

    @Override
    public void setNonNullParameter(PreparedStatement ps, int i, String parameter, JdbcType jdbcType) throws SQLException {
        // 写入数据库时自动加密
        ps.setString(i, aesUtil.encrypt(parameter));
    }

    @Override
    public String getNullableResult(ResultSet rs, String columnName) throws SQLException {
        // 从数据库读取时自动解密
        String encrypted = rs.getString(columnName);
        return encrypted != null ? aesUtil.decrypt(encrypted) : null;
    }

    @Override
    public String getNullableResult(ResultSet rs, int columnIndex) throws SQLException {
        String encrypted = rs.getString(columnIndex);
        return encrypted != null ? aesUtil.decrypt(encrypted) : null;
    }

    @Override
    public String getNullableResult(CallableStatement cs, int columnIndex) throws SQLException {
        String encrypted = cs.getString(columnIndex);
        return encrypted != null ? aesUtil.decrypt(encrypted) : null;
    }
}

// 实体类使用
@Table(name = "users")
public class User {
    private Long id;
    private String username;

    // 手机号自动加密存储
    @TableField(typeHandler = EncryptTypeHandler.class)
    private String phone;

    // 身份证号自动加密存储
    @TableField(typeHandler = EncryptTypeHandler.class)
    private String idCard;
}`}
          />
        </div>
      </section>

      {/* OAuth2.0 认证架构 */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">OAuth2.0 认证架构</h2>

        <div className="bg-white border-2 border-blue-200 rounded-lg p-6 mb-6">
          <h3 className="text-2xl font-bold text-blue-900 mb-4">认证授权流程</h3>

          <div className="space-y-4">
            <div className="bg-blue-50 p-4 rounded">
              <h4 className="font-bold text-blue-900 mb-2">OAuth2.0 四种授权模式</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="bg-white p-3 rounded">
                  <h5 className="font-semibold">1. 授权码模式 (Authorization Code)</h5>
                  <p className="text-sm text-gray-600">最安全，适用于有后端的 Web 应用</p>
                </div>
                <div className="bg-white p-3 rounded">
                  <h5 className="font-semibold">2. 密码模式 (Password)</h5>
                  <p className="text-sm text-gray-600">适用于自有应用，高度信任</p>
                </div>
                <div className="bg-white p-3 rounded">
                  <h5 className="font-semibold">3. 客户端模式 (Client Credentials)</h5>
                  <p className="text-sm text-gray-600">适用于无用户参与的机器认证</p>
                </div>
                <div className="bg-white p-3 rounded">
                  <h5 className="font-semibold">4. 简化模式 (Implicit)</h5>
                  <p className="text-sm text-gray-600">适用于纯前端应用，已不推荐</p>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-bold text-gray-900 mb-2">Spring Security OAuth2 实现</h4>
              <CodeBlock
                language="java"
                code={`@Configuration
@EnableAuthorizationServer
public class AuthorizationServerConfig extends AuthorizationServerConfigurerAdapter {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserService userService;

    @Override
    public void configure(ClientDetailsServiceConfigurer clients) throws Exception {
        clients.inMemory()
            .withClient("client-app")
            .secret("$\{2a$10$bcrypt-secret}")
            .authorizedGrantTypes("password", "authorization_code", "refresh_token")
            .scopes("read", "write")
            .accessTokenValiditySeconds(7200)
            .refreshTokenValiditySeconds(2592000);
    }

    @Override
    public void configure(AuthorizationServerEndpointsConfigurer endpoints) throws Exception {
        endpoints
            .authenticationManager(authenticationManager)
            .userDetailsService(userService)
            .tokenStore(tokenStore())
            .tokenEnhancer(jwtAccessTokenConverter());
    }

    @Bean
    public TokenStore tokenStore() {
        return new JwtTokenStore(jwtAccessTokenConverter());
    }

    @Bean
    public JwtAccessTokenConverter jwtAccessTokenConverter() {
        JwtAccessTokenConverter converter = new JwtAccessTokenConverter();
        converter.setSigningKey("jwt-secret-key");
        return converter;
    }
}`}
              />
            </div>
          </div>
        </div>
      </section>

      {/* 安全开发检查清单 */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">安全开发检查清单</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <ChecklistCard
            category="🔐 认证与授权"
            color="red"
            items={[
              '使用 JWT 或 Session 管理会话',
              'Token 设置过期时间',
              '密码加密存储（BCrypt）',
              '实现 RBAC 权限控制',
              '敏感操作二次认证',
              '登录失败次数限制',
              '支持单点登录 (SSO)'
            ]}
          />
          <ChecklistCard
            category="🛡️ 输入验证与输出编码"
            color="yellow"
            items={[
              '所有输入参数校验',
              'SQL 预编译防止注入',
              'XSS 防护（输出转义）',
              'CSRF Token 验证',
              '文件上传类型限制',
              'URL 重定向检查',
              '命令注入防护'
            ]}
          />
          <ChecklistCard
            category="🔒 数据保护"
            color="green"
            items={[
              '敏感数据加密存储',
              'HTTPS 加密传输',
              '配置文件不包含明文密码',
              '日志脱敏处理',
              '数据库连接加密',
              '备份加密',
              '敏感数据标记与分类'
            ]}
          />
          <ChecklistCard
            category="📡 通信安全"
            color="yellow"
            items={[
              '全站 HTTPS',
              'API 接口签名验证',
              '时间戳 + Nonce 防重放',
              'mTLS 双向认证',
              '服务间通信加密',
              '证书有效期检查',
              '禁用不安全的加密算法'
            ]}
          />
          <ChecklistCard
            category="🐛 依赖与配置安全"
            color="green"
            items={[
              '依赖漏洞扫描',
              '定期升级依赖版本',
              '默认密码修改',
              '关闭调试接口',
              '配置文件不提交 Git',
              '环境变量管理',
              '密钥轮换机制'
            ]}
          />
          <ChecklistCard
            category="📊 监控与审计"
            color="red"
            items={[
              '登录日志记录',
              '操作日志审计',
              '异常登录告警',
              '安全事件监控',
              '定期安全审计',
              '渗透测试',
              '漏洞扫描'
            ]}
          />
        </div>
      </section>

      {/* 安全最佳实践 */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">安全最佳实践</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-300 rounded-lg p-5">
            <h3 className="text-xl font-bold text-green-900 mb-3">✅ 推荐做法</h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <span className="text-green-600 mr-2 flex-shrink-0">✓</span>
                <span>纵深防御：多层安全机制</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2 flex-shrink-0">✓</span>
                <span>最小权限原则：只给必需权限</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2 flex-shrink-0">✓</span>
                <span>默认拒绝：白名单策略</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2 flex-shrink-0">✓</span>
                <span>安全左移：开发阶段考虑安全</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2 flex-shrink-0">✓</span>
                <span>定期安全审计和渗透测试</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2 flex-shrink-0">✓</span>
                <span>建立安全应急响应机制</span>
              </li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-red-50 to-red-100 border-2 border-red-300 rounded-lg p-5">
            <h3 className="text-xl font-bold text-red-900 mb-3">❌ 避免做法</h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <span className="text-red-600 mr-2 flex-shrink-0">✗</span>
                <span>硬编码密钥和密码</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-600 mr-2 flex-shrink-0">✗</span>
                <span>自己实现加密算法</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-600 mr-2 flex-shrink-0">✗</span>
                <span>信任客户端输入</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-600 mr-2 flex-shrink-0">✗</span>
                <span>错误信息泄露敏感数据</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-600 mr-2 flex-shrink-0">✗</span>
                <span>忽略安全日志</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-600 mr-2 flex-shrink-0">✗</span>
                <span>过度信任内部网络</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* 常见问题 FAQ */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">常见问题</h2>

        <div className="space-y-4">
          <FaqCard
            number={1}
            question="JWT 和 Session 有什么区别？如何选择？"
            answer={"【JWT 优势】\n- 无状态，易于扩展\n- 跨域支持好\n- 移动端友好\n- 减少服务器存储压力\n\n【JWT 劣势】\n- Token 无法主动失效（需要黑名单）\n- Payload 不能存储敏感信息\n- Token 体积较大\n- 续签机制复杂\n\n【Session 优势】\n- 服务器可控，易于失效\n- 安全性高\n- 传统的 Cookie-Session 模式\n\n【Session 劣势】\n- 有状态，服务器压力大\n- 分布式需要 Session 共享\n- 跨域支持差\n\n【选型建议】\n- 微服务架构：优先选 JWT\n- 单体应用：Session 足够\n- 移动端 API：JWT\n- Web 应用：JWT + RefreshToken\n\n【实战方案】\nJWT + RefreshToken 组合：\n- Access Token (JWT): 短期有效（2小时）\n- Refresh Token: 长期有效（30天），存储在 Redis\n- Access Token 过期后用 Refresh Token 换新的"}
            isOpen={openFaq === 1}
            onClick={() => toggleFaq(1)}
          />

          <FaqCard
            number={2}
            question="如何防止 API 接口被恶意调用？"
            answer={"【防护措施】\n\n1. 限流防护\n   - 单用户限流：每个用户每分钟最多 100 次\n   - 单 IP 限流：每个 IP 每分钟最多 200 次\n   - 全局限流：全站 QPS 限制\n\n2. 签名验证\n   - 时间戳：防止重放攻击\n   - Nonce：随机数，防止重放\n   - 参数签名：防止参数篡改\n\n3. 黑名单机制\n   - 恶意 IP 黑名单\n   - 恶意用户黑名单\n   - 自动识别异常行为\n\n4. 验证码\n   - 图形验证码：防止机器刷接口\n   - 滑动验证：人机识别\n   - 短信验证码：敏感操作\n\n5. WAF 防火墙\n   - SQL 注入防护\n   - XSS 攻击防护\n   - CC 攻击防护\n\n【实战方案】\nSentinel + Gateway + Redis：\n- Gateway 层限流\n- Redis 存储调用计数\n- 自动拉黑恶意 IP\n- 短信通知管理员"}
            isOpen={openFaq === 2}
            onClick={() => toggleFaq(2)}
          />

          <FaqCard
            number={3}
            question="微服务间如何安全通信？"
            answer={"【微服务间通信安全方案】\n\n1. mTLS 双向认证\n   - 服务间通信使用 HTTPS + mTLS\n   - 每个服务都有证书\n   - Service Mesh 自动管理证书（Istio）\n\n2. 服务间鉴权\n   - 基于 Token 的服务认证\n   - 服务身份标识（Service Account）\n   - RPC 框架内置鉴权（Dubbo、gRPC）\n\n3. 网络隔离\n   - VPC 隔离\n   - 子网隔离\n   - Network Policy（K8s）\n\n4. API 网关统一入口\n   - 所有外部流量经过网关\n   - 网关统一鉴权\n   - 服务间内部调用不走网关\n\n【实战方案】\nSpring Cloud Gateway + mTLS：\n- Gateway：TLS 终止，验证服务身份\n- 服务间：使用 Dubbo 或 gRPC 内置鉴权\n- Service Mesh：Istio 自动 mTLS\n\n【推荐方案】\n- 中小规模：Gateway + Token 鉴权\n- 大规模：Service Mesh (Istio) + mTLS"}
            isOpen={openFaq === 3}
            onClick={() => toggleFaq(3)}
          />
        </div>
      </section>

      {/* 下一步学习 */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">下一步学习</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <a href="/disaster-recovery" className="block bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-200 rounded-lg p-6 hover:shadow-lg transition">
            <h3 className="text-xl font-bold text-blue-900 mb-2">🛡️ 容灾与高可用</h3>
            <p className="text-gray-700 text-sm">构建高可用的容灾体系</p>
          </a>
          <a href="/k8s-deployment" className="block bg-gradient-to-br from-purple-50 to-purple-100 border-2 border-purple-200 rounded-lg p-6 hover:shadow-lg transition">
            <h3 className="text-xl font-bold text-purple-900 mb-2">☸️ Kubernetes 部署</h3>
            <p className="text-gray-700 text-sm">K8s 生产环境部署实战</p>
          </a>
        </div>
      </section>
    </div>
  );
};
