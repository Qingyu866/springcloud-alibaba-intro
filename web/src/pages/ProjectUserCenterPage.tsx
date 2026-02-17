import React, { useState } from 'react';
import { K8sDeploymentCard } from '../components/K8sDeploymentCard';

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

export const ProjectUserCenterPage: React.FC = () => {
  const [openModule, setOpenModule] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-indigo-800 text-white rounded-lg p-6 mb-8">
        <h1 className="text-4xl font-bold mb-2">微服务用户中心</h1>
        <p className="text-indigo-100">基于 Spring Cloud Alibaba 的分布式用户系统实战</p>
        <div className="flex gap-3 text-sm mt-4">
          <span className="px-3 py-1 bg-white/20 rounded-full">🚀 实战项目</span>
          <span className="px-3 py-1 bg-white/20 rounded-full">⏱️ 约120分钟</span>
          <span className="px-3 py-1 bg-white/20 rounded-full">👤 5个核心模块</span>
        </div>
      </div>

      {/* Why User Center */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">为什么学习用户中心？</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-r-lg">
            <h3 className="text-xl font-bold text-green-800 mb-3">✅ 业务基础</h3>
            <ul className="text-gray-700 space-y-2">
              <li>• 所有系统都离不开用户</li>
              <li>• 统一身份认证的核心</li>
              <li>• 微服务架构的入口</li>
              <li>• 安全防护的第一道防线</li>
            </ul>
          </div>
          <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-lg">
            <h3 className="text-xl font-bold text-red-800 mb-3">❌ 技术挑战</h3>
            <ul className="text-gray-700 space-y-2">
              <li>• 单点登录（SSO）实现</li>
              <li>• 分布式会话管理</li>
              <li>• 细粒度权限控制</li>
              <li>• 高并发登录处理</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Core Modules */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">核心功能模块</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
          {[
            { icon: '👤', title: '用户管理', desc: '注册、登录、资料' },
            { icon: '🔑', title: '认证授权', desc: 'OAuth2、JWT、SSO' },
            { icon: '🛡️', title: '权限控制', desc: 'RBAC、ABAC' },
            { icon: '🔐', title: '安全防护', desc: '加密、风控、审计' },
            { icon: '📊', title: '用户画像', desc: '标签、行为分析' },
          ].map((module) => (
            <div key={module.title} className="bg-white border border-gray-200 rounded-lg p-5 hover:shadow-lg transition-shadow">
              <div className="text-3xl mb-3">{module.icon}</div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{module.title}</h3>
              <p className="text-gray-600 text-sm">{module.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Technical Architecture */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">技术架构设计</h2>
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">系统分层架构</h3>
          <div className="bg-gray-50 rounded-lg p-4 font-mono text-sm">
            <div className="text-purple-700 font-bold mb-2">┌─ Gateway Layer (API Gateway + SSO)</div>
            <div className="text-blue-700 font-bold mb-2">├─ Business Layer</div>
            <div className="text-gray-600 ml-4">• user-service (用户服务)</div>
            <div className="text-gray-600 ml-4">• auth-service (认证服务)</div>
            <div className="text-gray-600 ml-4">• permission-service (权限服务)</div>
            <div className="text-green-700 font-bold mb-2">├─ Security Layer</div>
            <div className="text-gray-600 ml-4">• Spring Security</div>
            <div className="text-gray-600 ml-4">• OAuth2 Server</div>
            <div className="text-gray-600 ml-4">• JWT Token</div>
            <div className="text-orange-700 font-bold">└─ Data Layer</div>
            <div className="text-gray-600 ml-4">• MySQL + Redis + MongoDB</div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">数据库设计</h3>
          <CodeBlock
            language="sql"
            code={`-- 用户主表
CREATE TABLE \`user_main\` (
  \`id\` BIGINT PRIMARY KEY AUTO_INCREMENT,
  \`username\` VARCHAR(64) NOT NULL UNIQUE COMMENT '用户名',
  \`password\` VARCHAR(255) NOT NULL COMMENT '密码(加密)',
  \`mobile\` VARCHAR(20) UNIQUE COMMENT '手机号',
  \`email\` VARCHAR(128) UNIQUE COMMENT '邮箱',
  \`nickname\` VARCHAR(64) COMMENT '昵称',
  \`avatar\` VARCHAR(512) COMMENT '头像URL',
  \`status\` TINYINT NOT NULL DEFAULT 1 COMMENT '状态:1正常,0禁用',
  \`create_time\` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  \`update_time\` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  KEY \`idx_mobile\` (\`mobile\`),
  KEY \`idx_email\` (\`email\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 角色表
CREATE TABLE \`role\` (
  \`id\` BIGINT PRIMARY KEY AUTO_INCREMENT,
  \`role_code\` VARCHAR(64) NOT NULL UNIQUE COMMENT '角色编码',
  \`role_name\` VARCHAR(64) NOT NULL COMMENT '角色名称',
  \`description\` VARCHAR(255) COMMENT '角色描述',
  \`status\` TINYINT NOT NULL DEFAULT 1,
  \`create_time\` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 权限表
CREATE TABLE \`permission\` (
  \`id\` BIGINT PRIMARY KEY AUTO_INCREMENT,
  \`permission_code\` VARCHAR(128) NOT NULL UNIQUE COMMENT '权限编码',
  \`permission_name\` VARCHAR(64) NOT NULL COMMENT '权限名称',
  \`resource_type\` TINYINT NOT NULL COMMENT '资源类型:1菜单,2按钮,3接口',
  \`resource_url\` VARCHAR(255) COMMENT '资源URL',
  \`parent_id\` BIGINT DEFAULT 0 COMMENT '父权限ID'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`}
          />
        </div>
      </section>

      {/* Implementation Details */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">核心实现</h2>

        {/* User Registration */}
        <div className="mb-6">
          <button
            onClick={() => setOpenModule(openModule === 'register' ? null : 'register')}
            className="w-full bg-white border-2 border-indigo-300 rounded-lg p-5 flex items-center justify-between hover:bg-indigo-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">📝</span>
              <div className="text-left">
                <h3 className="text-lg font-bold text-gray-900">用户注册</h3>
                <p className="text-gray-600 text-sm">多渠道注册与安全验证</p>
              </div>
            </div>
            <span className="text-gray-400">&rbrace;</span>
          </button>
          {openModule === 'register' && (
            <div className="mt-4 bg-white border border-gray-200 rounded-lg p-6">
              <CodeBlock
                language="java"
                code={`@Service
public class UserRegisterService {
    @Autowired
    private UserMapper userMapper;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private RedisTemplate<String, String> redisTemplate;

    /**
     * 手机号注册
     */
    @Transactional
    public Long registerByMobile(RegisterMobileRequest request) {
        // 1. 验证短信验证码
        String cacheKey = "sms:code:" + request.getMobile();
        String cachedCode = redisTemplate.opsForValue().get(cacheKey);

        if (!request.getSmsCode().equals(cachedCode)) {
            throw new BusinessException("验证码错误");
        }

        // 2. 检查手机号是否已注册
        User existUser = userMapper.selectByMobile(request.getMobile());
        if (existUser != null) {
            throw new BusinessException("手机号已注册");
        }

        // 3. 创建用户
        User user = new User();
        user.setUsername(generateUsername());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setMobile(request.getMobile());
        user.setNickname(request.getMobile().substring(0, 3) + "****" + request.getMobile().substring(7));
        user.setStatus(UserStatus.NORMAL);

        userMapper.insert(user);

        // 4. 初始化用户角色（默认普通用户）
        initUserRole(user.getId());

        // 5. 发送注册成功消息
        eventPublisher.publishEvent(new UserRegisteredEvent(user));

        return user.getId();
    }

    /**
     * 邮箱注册
     */
    public Long registerByEmail(RegisterEmailRequest request) {
        // 1. 验证邮箱验证码
        String cacheKey = "email:code:" + request.getEmail();
        String cachedCode = redisTemplate.opsForValue().get(cacheKey);

        if (!request.getVerifyCode().equals(cachedCode)) {
            throw new BusinessException("验证码错误");
        }

        // 2. 检查邮箱是否已注册
        User existUser = userMapper.selectByEmail(request.getEmail());
        if (existUser != null) {
            throw new BusinessException("邮箱已注册");
        }

        // 3. 创建用户
        User user = new User();
        user.setUsername(generateUsername());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setEmail(request.getEmail());
        user.setNickname(request.getEmail().split("@")[0]);
        user.setStatus(UserStatus.NORMAL);

        userMapper.insert(user);

        return user.getId();
    }
}`}
              />
            </div>
          )}
        </div>

        {/* OAuth2 SSO */}
        <div className="mb-6">
          <button
            onClick={() => setOpenModule(openModule === 'oauth' ? null : 'oauth')}
            className="w-full bg-white border-2 border-blue-300 rounded-lg p-5 flex items-center justify-between hover:bg-blue-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">🔑</span>
              <div className="text-left">
                <h3 className="text-lg font-bold text-gray-900">单点登录（SSO）</h3>
                <p className="text-gray-600 text-sm">OAuth2 统一认证</p>
              </div>
            </div>
            <span className="text-gray-400">&rbrace;</span>
          </button>
          {openModule === 'oauth' && (
            <div className="mt-4 bg-white border border-gray-200 rounded-lg p-6">
              <CodeBlock
                language="java"
                code={`@Configuration
@EnableAuthorizationServer
public class OAuth2AuthorizationServerConfig extends AuthorizationServerConfigurerAdapter {
    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    private TokenStore tokenStore;

    @Override
    public void configure(ClientDetailsServiceConfigurer clients) throws Exception {
        clients.inMemory()
            .withClient("web-app")
            .secret(passwordEncoder.encode("web-secret"))
            .authorizedGrantTypes("password", "refresh_token", "authorization_code")
            .scopes("read", "write")
            .accessTokenValiditySeconds(7200)  // 2小时
            .refreshTokenValiditySeconds(2592000)  // 30天
            .and()
            .withClient("mobile-app")
            .secret(passwordEncoder.encode("mobile-secret"))
            .authorizedGrantTypes("password", "refresh_token")
            .scopes("read", "write")
            .accessTokenValiditySeconds(86400)  // 24小时
            .refreshTokenValiditySeconds(2592000);
    }

    @Override
    public void configure(AuthorizationServerEndpointsConfigurer endpoints) throws Exception {
        endpoints
            .authenticationManager(authenticationManager)
            .userDetailsService(userDetailsService)
            .tokenStore(tokenStore)
            .tokenEnhancer(jwtAccessTokenConverter())
            .reuseRefreshTokens(false);
    }

    @Bean
    public JwtAccessTokenConverter jwtAccessTokenConverter() {
        JwtAccessTokenConverter converter = new JwtAccessTokenConverter();
        converter.setSigningKey("oauth2-signing-key");
        return converter;
    }
}

// 登录控制器
@RestController
@RequestMapping("/oauth")
public class OAuth2Controller {
    @Autowired
    private TokenEndpoint tokenEndpoint;

    @PostMapping("/token")
    public ResponseEntity<OAuth2AccessToken> login(
            @RequestParam String username,
            @RequestParam String password,
            @RequestParam String grant_type,
            @RequestParam String client_id,
            @RequestParam String client_secret) throws HttpRequestMethodNotSupportedException {
        Map<String, String> parameters = new HashMap<>();
        parameters.put("username", username);
        parameters.put("password", password);
        parameters.put("grant_type", grant_type);
        parameters.put("client_id", client_id);
        parameters.put("client_secret", client_secret);

        Principal principal = () -> client_id;

        return tokenEndpoint.postAccessToken(principal, parameters);
    }
}`}
              />
            </div>
          )}
        </div>

        {/* RBAC Permission */}
        <div className="mb-6">
          <button
            onClick={() => setOpenModule(openModule === 'rbac' ? null : 'rbac')}
            className="w-full bg-white border-2 border-green-300 rounded-lg p-5 flex items-center justify-between hover:bg-green-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">🛡️</span>
              <div className="text-left">
                <h3 className="text-lg font-bold text-gray-900">RBAC 权限控制</h3>
                <p className="text-gray-600 text-sm">基于角色的访问控制</p>
              </div>
            </div>
            <span className="text-gray-400">&rbrace;</span>
          </button>
          {openModule === 'rbac' && (
            <div className="mt-4 bg-white border border-gray-200 rounded-lg p-6">
              <CodeBlock
                language="java"
                code={`@Service
public class PermissionService {
    @Autowired
    private UserMapper userMapper;

    @Autowired
    private RoleMapper roleMapper;

    @Autowired
    private PermissionMapper permissionMapper;

    @Autowired
    private RedisTemplate<String, Object> redisTemplate;

    /**
     * 检查用户是否有某权限
     */
    public boolean hasPermission(Long userId, String permissionCode) {
        // 1. 从缓存获取用户权限
        String cacheKey = "user:permission:" + userId;
        Set<String> permissions = (Set<String>) redisTemplate.opsForValue().get(cacheKey);

        if (permissions == null) {
            // 2. 查询数据库
            permissions = getUserPermissionsFromDB(userId);
            // 3. 写入缓存（30分钟）
            redisTemplate.opsForValue().set(cacheKey, permissions, 30, TimeUnit.MINUTES);
        }

        return permissions.contains(permissionCode);
    }

    /**
     * 获取用户所有权限
     */
    private Set<String> getUserPermissionsFromDB(Long userId) {
        Set<String> permissions = new HashSet<>();

        // 1. 查询用户角色
        List<Role> roles = roleMapper.selectByUserId(userId);

        // 2. 查询角色权限
        for (Role role : roles) {
            List<Permission> rolePermissions = permissionMapper.selectByRoleId(role.getId());
            for (Permission permission : rolePermissions) {
                permissions.add(permission.getPermissionCode());
            }
        }

        return permissions;
    }

    /**
     * 刷新用户权限缓存
     */
    public void refreshUserPermissionCache(Long userId) {
        String cacheKey = "user:permission:" + userId;
        redisTemplate.delete(cacheKey);
        getUserPermissionsFromDB(userId);  // 重新加载
    }
}

// 自定义权限注解
@Target({ElementType.METHOD, ElementType.TYPE})
@Retention(RetentionPolicy.RUNTIME)
@PreAuthorize("@permissionService.hasPermission(#userId, 'user:edit')")
public @interface RequirePermission {
    String value();
}

// 使用示例
@RestController
@RequestMapping("/user")
public class UserController {
    @Autowired
    private PermissionService permissionService;

    @GetMapping("/{id}")
    @RequirePermission("user:view")
    public User getUser(@PathVariable Long id) {
        return userService.getById(id);
    }

    @PutMapping("/{id}")
    @RequirePermission("user:edit")
    public User updateUser(@PathVariable Long id, @RequestBody User user) {
        return userService.update(id, user);
    }
}`}
              />
            </div>
          )}
        </div>

        {/* JWT Token */}
        <div className="mb-6">
          <button
            onClick={() => setOpenModule(openModule === 'jwt' ? null : 'jwt')}
            className="w-full bg-white border-2 border-yellow-300 rounded-lg p-5 flex items-center justify-between hover:bg-yellow-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">🎫</span>
              <div className="text-left">
                <h3 className="text-lg font-bold text-gray-900">JWT Token</h3>
                <p className="text-gray-600 text-sm">无状态认证与令牌管理</p>
              </div>
            </div>
            <span className="text-gray-400">&rbrace;</span>
          </button>
          {openModule === 'jwt' && (
            <div className="mt-4 bg-white border border-gray-200 rounded-lg p-6">
              <CodeBlock
                language="java"
                code={`@Component
public class JwtTokenProvider {
    private static final String SECRET_KEY = "jwt-secret-key-2024";
    private static final long TOKEN_VALIDITY = 2 * 60 * 60 * 1000;  // 2小时

    /**
     * 生成 Token
     */
    public String generateToken(UserDetails userDetails) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("userId", ((CustomUserDetails) userDetails).getUserId());
        claims.put("username", userDetails.getUsername());
        claims.put("roles", userDetails.getAuthorities());

        return Jwts.builder()
            .setClaims(claims)
            .setSubject(userDetails.getUsername())
            .setIssuedAt(new Date())
            .setExpiration(new Date(System.currentTimeMillis() + TOKEN_VALIDITY))
            .signWith(SignatureAlgorithm.HS512, SECRET_KEY)
            .compact();
    }

    /**
     * 验证 Token
     */
    public boolean validateToken(String token) {
        try {
            Jwts.parser()
                .setSigningKey(SECRET_KEY)
                .parseClaimsJws(token);
            return true;
        } catch (SignatureException e) {
            log.error("Invalid JWT signature: {}", e.getMessage());
        } catch (MalformedJwtException e) {
            log.error("Invalid JWT token: {}", e.getMessage());
        } catch (ExpiredJwtException e) {
            log.error("JWT token is expired: {}", e.getMessage());
        } catch (UnsupportedJwtException e) {
            log.error("JWT token is unsupported: {}", e.getMessage());
        } catch (IllegalArgumentException e) {
            log.error("JWT claims string is empty: {}", e.getMessage());
        }
        return false;
    }

    /**
     * 从 Token 获取用户名
     */
    public String getUsernameFromToken(String token) {
        Claims claims = Jwts.parser()
            .setSigningKey(SECRET_KEY)
            .parseClaimsJws(token)
            .getBody();
        return claims.getSubject();
    }

    /**
     * 从 Token 获取用户ID
     */
    public Long getUserIdFromToken(String token) {
        Claims claims = Jwts.parser()
            .setSigningKey(SECRET_KEY)
            .parseClaimsJws(token)
            .getBody();
        return claims.get("userId", Long.class);
    }
}

// JWT 认证过滤器
@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {
    @Autowired
    private JwtTokenProvider tokenProvider;

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain) throws ServletException, IOException {

        // 1. 从请求头获取 Token
        String token = request.getHeader("Authorization");
        if (token != null && token.startsWith("Bearer ")) {
            token = token.substring(7);
        }

        // 2. 验证 Token
        if (token != null && tokenProvider.validateToken(token)) {
            // 3. 获取用户信息
            String username = tokenProvider.getUsernameFromToken(token);
            Long userId = tokenProvider.getUserIdFromToken(token);

            // 4. 构建认证信息
            CustomUserDetails userDetails = new CustomUserDetails(userId, username);
            UsernamePasswordAuthenticationToken authentication =
                new UsernamePasswordAuthenticationToken(
                    userDetails,
                    null,
                    userDetails.getAuthorities()
                );

            // 5. 设置到 Security Context
            SecurityContextHolder.getContext().setAuthentication(authentication);
        }

        filterChain.doFilter(request, response);
    }
}`}
              />
            </div>
          )}
        </div>

        {/* Third-party Login */}
        <div className="mb-6">
          <button
            onClick={() => setOpenModule(openModule === 'thirdparty' ? null : 'thirdparty')}
            className="w-full bg-white border-2 border-purple-300 rounded-lg p-5 flex items-center justify-between hover:bg-purple-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">🔗</span>
              <div className="text-left">
                <h3 className="text-lg font-bold text-gray-900">第三方登录</h3>
                <p className="text-gray-600 text-sm">微信、QQ、支付宝登录</p>
              </div>
            </div>
            <span className="text-gray-400">&rbrace;</span>
          </button>
          {openModule === 'thirdparty' && (
            <div className="mt-4 bg-white border border-gray-200 rounded-lg p-6">
              <CodeBlock
                language="java"
                code={`@Service
public class ThirdPartyLoginService {
    @Autowired
    private UserMapper userMapper;

    @Autowired
    private UserThirdPartyMapper userThirdPartyMapper;

    /**
     * 微信登录
     */
    @Transactional
    public LoginResponse loginByWechat(String code) {
        // 1. 通过 code 获取 access_token
        WechatAccessTokenResponse tokenResponse = getWechatAccessToken(code);

        // 2. 获取用户信息
        WechatUserInfo userInfo = getWechatUserInfo(
            tokenResponse.getAccess_token(),
            tokenResponse.getOpenid()
        );

        // 3. 查询是否已绑定
        UserThirdParty thirdParty = userThirdPartyMapper.selectByOpenidAndType(
            userInfo.getOpenid(),
            ThirdPartyType.WECHAT
        );

        User user;
        if (thirdParty == null) {
            // 首次登录，自动注册
            user = autoRegisterByWechat(userInfo);
        } else {
            // 已绑定，查询用户
            user = userMapper.selectById(thirdParty.getUserId());
        }

        // 4. 生成 Token
        String token = generateToken(user);

        return LoginResponse.builder()
            .token(token)
            .user(buildUserInfo(user))
            .build();
    }

    /**
     * 自动注册
     */
    private User autoRegisterByWechat(WechatUserInfo wechatUserInfo) {
        // 1. 创建用户
        User user = new User();
        user.setUsername("wx_" + wechatUserInfo.getOpenid().substring(0, 8));
        user.setPassword(passwordEncoder.encode(UUID.randomUUID().toString()));
        user.setNickname(wechatUserInfo.getNickname());
        user.setAvatar(wechatUserInfo.getHeadimgurl());
        user.setStatus(UserStatus.NORMAL);

        userMapper.insert(user);

        // 2. 绑定第三方账号
        UserThirdParty thirdParty = new UserThirdParty();
        thirdParty.setUserId(user.getId());
        thirdParty.setThirdPartyType(ThirdPartyType.WECHAT);
        thirdParty.setOpenid(wechatUserInfo.getOpenid());
        thirdParty.setUnionid(wechatUserInfo.getUnionid());

        userThirdPartyMapper.insert(thirdParty);

        // 3. 初始化用户角色
        initUserRole(user.getId());

        return user;
    }

    /**
     * 绑定第三方账号
     */
    public void bindThirdParty(Long userId, String type, String openid, String accessToken) {
        // 1. 验证 accessToken
        if (!validateThirdPartyToken(type, accessToken, openid)) {
            throw new BusinessException("第三方账号验证失败");
        }

        // 2. 检查是否已被绑定
        UserThirdParty exist = userThirdPartyMapper.selectByOpenidAndType(openid, type);
        if (exist != null) {
            throw new BusinessException("该账号已被绑定");
        }

        // 3. 绑定
        UserThirdParty thirdParty = new UserThirdParty();
        thirdParty.setUserId(userId);
        thirdParty.setThirdPartyType(type);
        thirdParty.setOpenid(openid);

        userThirdPartyMapper.insert(thirdParty);
    }
}`}
              />
            </div>
          )}
        </div>
      </section>

      {/* Best Practices */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">最佳实践</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white border-l-4 border-blue-500 rounded-lg p-5 shadow-md">
            <h3 className="text-lg font-bold text-gray-900 mb-3">🔐 密码安全</h3>
            <ul className="text-gray-700 text-sm space-y-2">
              <li>• BCrypt 加密存储</li>
              <li>• 强度校验（大小写+数字+符号）</li>
              <li>• 加盐哈希</li>
              <li>• 定期强制修改</li>
            </ul>
          </div>
          <div className="bg-white border-l-4 border-green-500 rounded-lg p-5 shadow-md">
            <h3 className="text-lg font-bold text-gray-900 mb-3">🚀 性能优化</h3>
            <ul className="text-gray-700 text-sm space-y-2">
              <li>• Redis 缓存用户信息</li>
              <li>• Session 无状态化</li>
              <li>• 权限本地缓存</li>
              <li>• 分布式会话</li>
            </ul>
          </div>
          <div className="bg-white border-l-4 border-yellow-500 rounded-lg p-5 shadow-md">
            <h3 className="text-lg font-bold text-gray-900 mb-3">🛡️ 安全防护</h3>
            <ul className="text-gray-700 text-sm space-y-2">
              <li>• 登录失败次数限制</li>
              <li>• IP 黑名单</li>
              <li>• 设备指纹识别</li>
              <li>• 异地登录提醒</li>
            </ul>
          </div>
          <div className="bg-white border-l-4 border-purple-500 rounded-lg p-5 shadow-md">
            <h3 className="text-lg font-bold text-gray-900 mb-3">📊 监控告警</h3>
            <ul className="text-gray-700 text-sm space-y-2">
              <li>• 登录成功率监控</li>
              <li>• 异常登录告警</li>
              <li>• Token 刷新统计</li>
              <li>• 权限变更审计</li>
            </ul>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">常见问题</h2>

        <div className="bg-white border-2 border-gray-200 rounded-lg overflow-hidden">
          <button
            onClick={() => setOpenFaq(openFaq === 1 ? null : 1)}
            className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
          >
            <h3 className="text-lg font-bold text-gray-900">1. 如何实现单点登录（SSO）？</h3>
            <span className="text-2xl text-gray-400">&lbrace;openFaq === 1 ? '−' : '+'&rbrace;</span>
          </button>
          {openFaq === 1 && (
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
              <div className="text-gray-700 whitespace-pre-line">SSO 实现方案：

1. OAuth2 授权码模式
   - 用户访问系统A，未登录跳转认证中心
   - 认证中心登录成功后生成 code
   - 系统 A 用 code 换取 token
   - 系统 A 用 token 获取用户信息

2. CAS 协议
   - 统一认证中心
   - Ticket 验证机制
   - 单点登出

3. JWT 无状态方案
   ```java
   // 统一认证中心签发 JWT
   String jwt = jwtTokenProvider.generateToken(userDetails);

   // 各子系统验证 JWT
   if (jwtTokenProvider.validateToken(jwt)) &lbrace;
       Long userId = jwtTokenProvider.getUserIdFromToken(jwt);
       // 本地登录
   &rbrace;
   ```

4. 会话同步
   - Redis 存储全局会话
   - 各系统同步会话状态
   - 广播登出消息</div>
            </div>
          )}
        </div>

        <div className="bg-white border-2 border-gray-200 rounded-lg overflow-hidden mt-4">
          <button
            onClick={() => setOpenFaq(openFaq === 2 ? null : 2)}
            className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
          >
            <h3 className="text-lg font-bold text-gray-900">2. Token 过期如何处理？</h3>
            <span className="text-2xl text-gray-400">&lbrace;openFaq === 2 ? '−' : '+'&rbrace;</span>
          </button>
          {openFaq === 2 && (
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
              <div className="text-gray-700 whitespace-pre-line">Token 过期处理方案：

1. Refresh Token 机制
   - Access Token 短期有效（2小时）
   - Refresh Token 长期有效（30天）
   - Access Token 过期后用 Refresh Token 换新的

2. 双 Token 实现
   ```java
   public TokenResponse login(String username, String password) &lbrace;
       // 1. 认证成功
       UserDetails userDetails = loadUserByUsername(username);

       // 2. 生成 Access Token
       String accessToken = jwtTokenProvider.generateToken(userDetails);

       // 3. 生成 Refresh Token
       String refreshToken = UUID.randomUUID().toString();
       redisTemplate.opsForValue().set(
           "refresh:" + refreshToken,
           username,
           30,
           TimeUnit.DAYS
       );

       return TokenResponse.builder()
           .accessToken(accessToken)
           .refreshToken(refreshToken)
           .build();
   &rbrace;
   ```

3. 自动刷新
   - 前端检测 401 响应
   - 自动调用刷新接口
   - 刷新成功后重试原请求

4. 优雅降级
   - 刷新失败跳转登录页
   - 保存当前操作状态
   - 登录后恢复</div>
            </div>
          )}
        </div>

        <div className="bg-white border-2 border-gray-200 rounded-lg overflow-hidden mt-4">
          <button
            onClick={() => setOpenFaq(openFaq === 3 ? null : 3)}
            className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
          >
            <h3 className="text-lg font-bold text-gray-900">3. 如何防止暴力破解？</h3>
            <span className="text-2xl text-gray-400">&lbrace;openFaq === 3 ? '−' : '+'&rbrace;</span>
          </button>
          {openFaq === 3 && (
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
              <div className="text-gray-700 whitespace-pre-line">防暴力破解方案：

1. 登录失败次数限制
   ```java
   public LoginResponse login(String username, String password) &lbrace;
       String key = "login:fail:" + username;
       Integer failCount = (Integer) redisTemplate.opsForValue().get(key);

       if (failCount != null && failCount &gt;= 5) &lbrace;
           throw new BusinessException("账号已被锁定，请30分钟后再试");
       &rbrace;

       // 验证密码
       if (!passwordEncoder.matches(password, user.getPassword())) &lbrace;
           failCount = failCount == null ? 1 : failCount + 1;
           redisTemplate.opsForValue().set(key, failCount, 30, TimeUnit.MINUTES);
           throw new BusinessException("密码错误");
       &rbrace;

       // 登录成功清除计数
       redisTemplate.delete(key);
   &rbrace;
   ```

2. 图形验证码
   - 失败3次后要求输入验证码
   - 防止自动化攻击

3. IP 限流
   - 单 IP 每分钟最多尝试10次
   - Sentinel 实现限流

4. 异地登录检测
   - 记录常用登录 IP
   - 异地登录要求验证码
   - 发送安全提醒</div>
            </div>
          )}
        </div>
      </section>

      <K8sDeploymentCard projectType="user-center" />

      {/* Next Steps */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">下一步学习</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <a href="/project-comprehensive" className="block bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 rounded-lg p-6 transition-colors">
            <h3 className="text-xl font-bold text-indigo-900 mb-2">综合项目</h3>
            <p className="text-indigo-700">完整电商系统整合</p>
          </a>
          <a href="/security-deep-dive" className="block bg-green-50 hover:bg-green-100 border border-green-200 rounded-lg p-6 transition-colors">
            <h3 className="text-xl font-bold text-green-900 mb-2">安全深度</h3>
            <p className="text-green-700">系统安全防护体系</p>
          </a>
          <a href="/production-config" className="block bg-purple-50 hover:bg-purple-100 border border-purple-200 rounded-lg p-6 transition-colors">
            <h3 className="text-xl font-bold text-purple-900 mb-2">生产配置</h3>
            <p className="text-purple-700">生产环境最佳实践</p>
          </a>
        </div>
      </section>
    </div>
  );
};
