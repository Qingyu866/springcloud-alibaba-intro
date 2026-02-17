import { CodeBlock } from '../components';
import { useState } from 'react';

export const SentinelPage: React.FC = () => {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  return (
    <div className="prose prose-slate max-w-none">
      {/* 页面头部 */}
      <div className="bg-gradient-to-r from-red-500 to-orange-600 text-white rounded-lg p-6 mb-8">
        <div className="flex items-center mb-2">
          <span className="text-3xl mr-3">🛡️</span>
          <h1 className="text-3xl font-bold">Sentinel 流量防卫</h1>
        </div>
        <p className="text-lg opacity-90">
          微服务的"安全卫士" - 流量控制、熔断降级、系统保护一体化解决方案
        </p>
        <div className="mt-4 flex items-center gap-4 text-sm">
          <span className="px-2 py-1 bg-white/20 rounded">🔧 需要基础</span>
          <span className="px-2 py-1 bg-white/20 rounded">⏱️ 3-4天</span>
          <span className="px-2 py-1 bg-white/20 rounded">📝 10个知识点</span>
        </div>
      </div>

      {/* 什么是 Sentinel */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">什么是 Sentinel?</h2>

        <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-lg mb-6">
          <p className="text-lg text-gray-700 mb-3">
            <strong>Sentinel</strong> 是阿里巴巴开源的一套流量控制、熔断降级组件保护框架。
            <strong>Sentinel</strong> 以流量为切入点,从流量控制、熔断降级、系统负载保护等多个维度来帮助您保障微服务的稳定性。
          </p>
          <p className="text-gray-700">
            Sentinel = "哨兵" - 守护您的微服务
          </p>
        </div>

        <h3 className="text-2xl font-bold text-gray-800 mb-4">核心功能</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <FeatureCard
            icon="🚦"
            title="流量控制"
            description="QPS流量控制、并发线程数控制"
            color="blue"
          />
          <FeatureCard
            icon="⚡"
            title="熔断降级"
            description="服务降级、熔断恢复"
            color="orange"
          />
          <FeatureCard
            icon="🖥️"
            title="系统保护"
            description="CPU、RT、线程数等自适应保护"
            color="purple"
          />
        </div>

        {/* 特性对比 */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h4 className="font-bold text-gray-900 mb-4">Sentinel vs Hystrix</h4>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">特性</th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Sentinel</th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Hystrix</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr>
                <td className="px-4 py-2 text-sm">社区活跃度</td>
                <td className="px-4 py-2 text-sm text-green-600">✅ 活跃(阿里维护)</td>
                <td className="px-4 py-2 text-sm text-red-600">❌ 停止维护</td>
              </tr>
              <tr>
                <td className="px-4 py-2 text-sm">中文文档</td>
                <td className="px-4 py-2 text-sm text-green-600">✅ 完善</td>
                <td className="px-4 py-2 text-sm text-orange-600">⚠️ 一般</td>
              </tr>
              <tr>
                <td className="px-4 py-2 text-sm">控制台</td>
                <td className="px-4 py-2 text-sm text-green-600">✅ 实时配置</td>
                <td className="px-4 py-2 text-sm text-red-600">❌ 配置复杂</td>
              </tr>
              <tr>
                <td className="px-4 py-2 text-sm">扩展性</td>
                <td className="px-4 py-2 text-sm text-green-600">✅ 插件化</td>
                <td className="px-4 py-2 text-sm text-orange-600">⚠️ 有限</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 为什么需要流量控制 */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">为什么需要流量控制?</h2>

        <p className="text-lg text-gray-700 mb-6">
          在微服务架构中,流量波动、依赖故障、资源限制等问题可能导致系统雪崩。
          Sentinel 提供了全方位的保护机制。
        </p>

        {/* 真实案例 */}
        <div className="bg-red-50 border-2 border-red-200 p-6 rounded-lg mb-6">
          <h3 className="text-xl font-bold text-red-900 mb-4">🚨 典型故障场景</h3>
          <div className="space-y-3">
            <ScenarioCard
              title="秒杀活动"
              problem="流量激增10倍"
              result="系统崩溃,所有用户无法访问"
              solution="Sentinel 限流保护"
            />
            <ScenarioCard
              title="依赖服务故障"
              problem="下游响应慢"
              result="线程池耗尽,级联故障"
              solution="Sentinel 熔断降级"
            />
            <ScenarioCard
              title="突发热点"
              problem="某个商品被疯狂抢购"
              result="数据库被打死"
              solution="Sentinel 热点限流"
            />
          </div>
        </div>

        {/* Sentinel 解决方案 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <SolutionCard
            icon="🚦"
            title="流量控制"
            desc="限制QPS,避免系统过载"
            example="单机QPS限制100"
          />
          <SolutionCard
            icon="⚡"
            title="熔断降级"
            desc="快速失败,防止雪崩"
            example="失败率达到50%时熔断"
          />
          <SolutionCard
            icon="🔥"
            title="热点防护"
            desc="针对热点数据特殊处理"
            example="商品ID限流"
          />
        </div>
      </section>

      {/* 核心概念 */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">核心概念</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ConceptCard2
            title="资源 (Resource)"
            level="beginner"
            description="Sentinel 要保护的目标,可以是代码中的任何内容"
            example="Java 方法、HTTP接口、代码片段"
          />
          <ConceptCard2
            title="规则 (Rule)"
            level="beginner"
            description="围绕资源设定的规则,包括流控、熔断、系统保护等"
            example="QPS限制、并发线程限制"
          />
          <ConceptCard2
            title="流控效果 (Flow Control)"
            level="intermediate"
            description="流量控制后的处理方式"
            example="直接拒绝、Warm Up、匀速排队"
          />
          <ConceptCard2
            title="熔断策略 (Circuit Breaker)"
            level="intermediate"
            description="当检测到服务异常时,快速失败"
            example="异常比例、异常数、慢调用比例"
          />
        </div>
      </section>

      {/* 快速开始 */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">快速开始</h2>

        <h3 className="text-xl font-bold text-gray-800 mb-4">步骤 1: 添加依赖</h3>
        <CodeBlock
          language="xml"
          code={`<dependencies>
    <!-- Sentinel 流量控制 -->
    <dependency>
        <groupId>com.alibaba.cloud</groupId>
        <artifactId>spring-cloud-starter-alibaba-sentinel</artifactId>
    </dependency>

    <!-- Spring Boot Actuator (可选,用于端点暴露) -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-actuator</artifactId>
    </dependency>
</dependencies>

<dependencyManagement>
    <dependencies>
        <dependency>
            <groupId>com.alibaba.cloud</groupId>
            <artifactId>spring-cloud-alibaba-dependencies</artifactId>
            <version>2023.0.1.0</version>
            <type>pom</type>
            <scope>import</scope>
        </dependency>
    </dependencies>
</dependencyManagement>`}
        />

        <h3 className="text-xl font-bold text-gray-800 mb-4 mt-6">步骤 2: 配置文件</h3>
        <CodeBlock
          language="yaml"
          filename="application.yml"
          code={`server:
  port: 8080

spring:
  application:
    name: service-provider
  cloud:
    sentinel:
      transport:
        dashboard: localhost:8080  # Sentinel 控制台地址
        port: 8719                   # 应用与控制台通信端口
      eager: true                   # 启动时立即初始化
      # 流控规则持久化到 Nacos
      datasource:
        flow:
          nacos:
            server-addr: localhost:8848
            namespace: public
            group-id: SENTINEL_GROUP
            data-id: \${spring.application.name}-flow-rules
            rule-type: flow`}
        />

        <h3 className="text-xl font-bold text-gray-800 mb-4 mt-6">步骤 3: 启动 Sentinel 控制台</h3>
        <CodeBlock
          language="bash"
          code={`# 下载 Sentinel 控制台
wget https://github.com/alibaba/Sentinel/releases/download/1.8.6/sentinel-dashboard-1.8.6.jar

# 启动控制台
java -Dserver.port=8080 -Dcsp.sentinel.app.auth.login=false \\
     -jar sentinel-dashboard-1.8.6.jar

# 访问控制台
# http://localhost:8080
# 默认账号密码: sentinel/sentinel`}
        />

        <h3 className="text-xl font-bold text-gray-800 mb-4 mt-6">步骤 4: 定义资源和限流</h3>
        <CodeBlock
          language="java"
          filename="EchoController.java"
          code={`package com.example.controller;

import org.springframework.web.bind.annotation.*;
import com.alibaba.csp.sentinel.annotation.SentinelResource;
import com.alibaba.csp.sentinel.slots.block.BlockException;

@RestController
@RequestMapping("/api")
public class EchoController {

    @GetMapping("/echo/{string}")
    @SentinelResource(
        value = "echoResource",           // 资源名
        blockHandler = "handleBlock"       // 限流处理方法
    )
    public String echo(@PathVariable String string) {
        return "Hello: " + string;
    }

    // 限流降级处理
    public String handleBlock(String string, BlockException e) {
        return "系统繁忙,请稍后再试";
    }

    @GetMapping("/hello")
    @SentinelResource(value = "helloResource", blockHandler = "handleBlock")
    public String hello(@RequestParam String name) {
        return "Hello " + name;
    }
}`}
        />

        <h3 className="text-xl font-bold text-gray-800 mb-4 mt-6">步骤 5: 测试限流效果</h3>
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
          <ol className="list-decimal pl-6 space-y-2">
            <li>启动应用,访问接口 <code>http://localhost:8080/api/echo/test</code></li>
            <li>访问 Sentinel 控制台 <code>http://localhost:8080</code></li>
            <li>在"实时监控"可以看到接口的实时QPS</li>
            <li>在"流控规则"中新增规则:QPS单机阈值为1</li>
            <li>快速刷新接口,第二次请求将返回"系统繁忙,请稍后再试"</li>
          </ol>
        </div>
      </section>

      {/* 流量控制规则 */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">流量控制规则</h2>

        <p className="text-lg text-gray-700 mb-6">
          流量控制(Flow Control)是 Sentinel 的核心功能,通过限制访问频率来保护系统。
        </p>

        {/* 流控模式 */}
        <h3 className="text-2xl font-bold text-gray-800 mb-4">流控模式</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <FlowModeCard
            title="直接拒绝"
            icon="🚫"
            desc="超过阈值直接拒绝"
            scenario="默认模式,简单直接"
            example="QPS > 100,第101个请求被拒绝"
          />
          <FlowModeCard
            title="Warm Up"
            icon="🔥"
            desc="预热,慢慢增加流量"
            scenario="秒杀活动,系统需要预热"
            example="QPS从10慢慢增加到100"
          />
          <FlowModeCard
            title="匀速排队"
            icon="⏳"
            desc="请求排队匀速通过"
            scenario="削峰填谷"
            example="请求间隔200ms均匀通过"
          />
        </div>

        {/* 流控效果 */}
        <h3 className="text-2xl font-bold text-gray-800 mb-4">流控效果配置</h3>
        <CodeBlock
          language="java"
          code={`import com.alibaba.csp.sentinel.slots.block.BlockException;
import com.alibaba.csp.sentinel.annotation.SentinelResource;

@RestController
public class FlowController {

    @GetMapping("/test")
    @SentinelResource(
        value = "testResource",
        blockHandler = "handleBlock",        // 限流后执行的方法
        fallback = "handleFallback"          // 降级方法
    )
    public String test() {
        return "正常响应";
    }

    // 限流处理
    public String handleBlock(BlockException e) {
        return "限流了";
    }

    // 降级处理
    public String handleFallback(Throwable e) {
        return "降级了";
    }
}`}
        />

        {/* 编码式限流 */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h4 className="font-bold text-gray-900 mb-4">编码方式定义规则</h4>
          <CodeBlock
            language="java"
            code={`import com.alibaba.csp.sentinel.*;
import com.alibaba.csp.sentinel.slots.*;

@Configuration
public class SentinelConfig {

    @PostConstruct
    public void initFlowRules() {
        List<FlowRule> rules = new ArrayList<>();

        FlowRule rule = new FlowRule();
        rule.setResource("helloResource");  // 资源名
        rule.setGrade(RuleConstant.FLOW_GRADE_QPS);  // 限流阈值类型
        rule.setCount(10);  // QPS阈值
        rule.setStrategy(RuleConstant.STRATEGY_DIRECT);  // 直接拒绝
        rule.setControlBehavior(RuleConstant.CONTROL_BEHAVIOR_DEFAULT);  // 快速失败

        rules.add(rule);

        FlowRuleManager.loadRules(rules);
    }
}`}
          />
          <div className="mt-4 p-3 bg-yellow-50 rounded">
            <p className="text-sm text-gray-700">
              <strong>💡 注意:</strong> 生产环境建议使用控制台配置,编码方式主要用于测试
            </p>
          </div>
        </div>
      </section>

      {/* 熔断降级 */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">熔断降级</h2>

        <p className="text-lg text-gray-700 mb-6">
          当检测到服务依赖出现不稳定时(响应时间变长、异常率上升),通过熔断该服务来防止级联故障。
        </p>

        {/* 熔断状态机 */}
        <div className="bg-orange-50 border-2 border-orange-200 p-6 rounded-lg mb-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">熔断状态机</h3>
          <div className="flex items-center justify-between flex-wrap gap-4">
            <StateBox
              state="关闭"
              desc="正常请求"
              color="green"
              action="失败率未达阈值"
            />
            <div className="text-2xl">→</div>
            <StateBox
              state="开启"
              desc="熔断,快速失败"
              color="red"
              action="失败率超过阈值"
            />
            <div className="text-2xl">→</div>
            <StateBox
              state="半开"
              desc="尝试恢复"
              color="yellow"
              action="熔断一段时间后"
            />
            <div className="text-2xl">→</div>
            <StateBox
              state="关闭"
              desc="恢复正常"
              color="green"
              action="请求成功"
            />
          </div>
        </div>

        {/* 熔断策略 */}
        <h3 className="text-xl font-bold text-gray-800 mb-4">熔断策略配置</h3>
        <CodeBlock
          language="java"
          code={`import com.alibaba.csp.sentinel.*;
import com.alibaba.csp.sentinel.slots.*;
import com.alibaba.csp.sentinel.slots.block.degrade.*;

@Configuration
public class DegradeConfig {

    @PostConstruct
    public void initDegradeRules() {
        List<DegradeRule> rules = new ArrayList<>();

        DegradeRule rule = new DegradeRule();
        rule.setResource("helloResource");

        // 熔断策略: 异常比例
        rule.setGrade(RuleConstant.DEGRADE_GRADE_EXCEPTION_RATIO);
        rule.setCount(50);           // 异常比例阈值: 50%
        rule.setTimeWindow(10);       // 熔断时长: 10秒
        rule.setMinRequestAmount(10); // 最小请求数: 10个
        rule.setStatIntervalMs(1000);// 统计时长: 1秒

        // 其他熔断策略:
        // DEGRADE_GRADE_EXCEPTION_COUNT: 异常数
        // DEGRADE_GRADE_RT: 慢调用比例

        rules.add(rule);

        DegradeRuleManager.loadRules(rules);
    }
}`}
        />
      </section>

      {/* 热点参数限流 */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">热点参数限流</h2>

        <div className="bg-purple-50 border-l-4 border-purple-500 p-6 rounded-lg mb-6">
          <p className="text-gray-700">
            <strong>热点参数限流</strong> 是 Sentinel 对比其他流控工具的特色功能。
            可以针对请求中的某个参数进行精细化限流,常用于"秒杀"、"抢购"等场景。
          </p>
        </div>

        <CodeBlock
          language="java"
          code={`@RestController
@RequestMapping("/product")
public class ProductController {

    @GetMapping("/buy")
    @SentinelResource(
        value = "buyProduct",
        blockHandler = "handleBlock",
        paramsBlockHandler = "paramsBlockHandler"  // 参数限流处理
    )
    public String buy(
        @RequestParam Long productId,
        @RequestParam Long userId
    ) {
        // 业务逻辑
        return "购买成功";
    }

    // 热点参数限流处理
    public BlockResponse paramsBlockHandler(Long productId, Long userId, BlockException e) {
        if (productId == 100L) {
            // 热门商品特殊限流
            return new BlockResponse("商品抢购太火爆,请稍后再试");
        }
        return new BlockResponse("系统繁忙");
    }
}`}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          <FeatureBox
            title="精确识别热点"
            desc="自动识别热点参数,无需手动配置"
          />
          <FeatureBox
            title="灵活配置"
            desc="支持多种限流策略"
          />
          <FeatureBox
            title="实时生效"
            desc="规则变更立即生效"
          />
          <FeatureBox
            title="监控展示"
            desc="控制台实时展示热点数据"
          />
        </div>
      </section>

      {/* 系统自适应保护 */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">系统自适应保护</h2>

        <p className="text-lg text-gray-700 mb-6">
          系统保护规则是从应用级别的入口流量进行控制,从单机到集群,从CPU到RT,多维度保护系统。
        </p>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <SystemProtectCard
            icon="⚡"
            title="CPU 使用率"
            desc="系统CPU使用率过高时触发"
          />
          <SystemProtectCard
            icon="📊"
            title="平均 RT"
            desc="响应时间过长时触发"
          />
          <SystemProtectCard
            icon="🧵"
            title="并发线程数"
            desc="线程数过多时触发"
          />
          <SystemProtectCard
            icon="📈"
            title="入口 QPS"
            desc="系统总QPS过高时触发"
          />
        </div>

        <CodeBlock
          language="yaml"
          code={`spring:
  cloud:
    sentinel:
      # 系统保护规则
      system:
        # CPU使用率阈值
        highestSystemLoad: 0.8
        # 平均RT阈值
        avgRt: 1000
        # 最大并发线程数
        maxThread: 500`}
        />
      </section>

      {/* 监控控制台 */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Sentinel 控制台</h2>

        <p className="text-lg text-gray-700 mb-6">
          Sentinel 提供了强大的控制台,可以实时监控流量、配置规则、查看调用链路。
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <ConsoleFeatureCard
            icon="📊"
            title="实时监控"
            desc="查看实时QPS、响应时间"
          />
          <ConsoleFeatureCard
            icon="⚙️"
            title="规则配置"
            desc="可视化配置流控、熔断规则"
          />
          <ConsoleFeatureCard
            icon="🔥"
            title="热点识别"
            desc="自动识别热点参数"
          />
          <ConsoleFeatureCard
            icon="🔗"
            title="簇点链路"
            desc="查看调用链路关系"
          />
          <ConsoleFeatureCard
            icon="📝"
            title="机器列表"
            desc="查看应用实例列表"
          />
          <ConsoleFeatureCard
            icon="🚨"
            title="日志查询"
            desc="查看限流日志"
          />
        </div>

        <div className="mt-6 p-4 bg-blue-50 rounded">
          <h4 className="font-bold text-gray-900 mb-2">控制台使用技巧</h4>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">•</span>
              <span>簇点链路: 查看资源调用关系,帮助理解系统拓扑</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">•</span>
              <span>实时监控: 观察流量变化,验证规则效果</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">•</span>
              <span>规则配置: 修改规则后实时生效,无需重启</span>
            </li>
          </ul>
        </div>
      </section>

      {/* Gateway集成Sentinel */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Gateway 集成 Sentinel</h2>

        <p className="text-lg text-gray-700 mb-6">
          Sentinel 提供了对 Spring Cloud Gateway 的完美支持,可以在网关层面实现统一的流量控制。
        </p>

        <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-lg mb-6">
          <h3 className="text-xl font-bold text-gray-900 mb-3">为什么在网关层集成 Sentinel?</h3>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">•</span>
              <span><strong>统一流量入口:</strong> 在网关层统一控制所有后端服务的流量</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">•</span>
              <span><strong>细粒度控制:</strong> 基于 Route 和 API 的精细化流控</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">•</span>
              <span><strong>保护后端服务:</strong> 在流量到达后端服务前就进行拦截</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">•</span>
              <span><strong>降低响应延迟:</strong> 快速拒绝请求,避免向后转发</span>
            </li>
          </ul>
        </div>

        <h3 className="text-xl font-bold text-gray-800 mb-4">步骤 1: 添加依赖</h3>
        <CodeBlock
          language="xml"
          code={`<dependencies>
    <!-- Sentinel 流量控制 -->
    <dependency>
        <groupId>com.alibaba.cloud</groupId>
        <artifactId>spring-cloud-starter-alibaba-sentinel</artifactId>
    </dependency>

    <!-- Sentinel Gateway 适配器 -->
    <dependency>
        <groupId>com.alibaba.cloud</groupId>
        <artifactId>spring-cloud-alibaba-sentinel-gateway</artifactId>
    </dependency>

    <!-- Spring Cloud Gateway -->
    <dependency>
        <groupId>org.springframework.cloud</groupId>
        <artifactId>spring-cloud-starter-gateway</artifactId>
    </dependency>
</dependencies>`}
        />

        <h3 className="text-xl font-bold text-gray-800 mb-4 mt-6">步骤 2: 配置 Gateway 路由和流控</h3>
        <CodeBlock
          language="yaml"
          filename="application.yml"
          code={`server:
  port: 9090

spring:
  application:
    name: gateway-service
  cloud:
    sentinel:
      transport:
        dashboard: localhost:8080
        port: 8719
      eager: true
      # Gateway 流控配置
      filter:
        enabled: true  # 开启 Gateway 流控
      # 数据源配置
      datasource:
        flow:
          nacos:
            server-addr: localhost:8848
            dataId: \${spring.application.name}-flow-rules
            groupId: SENTINEL_GROUP
            rule-type: flow
    gateway:
      enabled: true
      routes:
        # 用户服务路由
        - id: user-service
          uri: lb://user-service
          predicates:
            - Path=/api/user/**
          filters:
            - name: RequestRateLimiter
              args:
                # 每秒允许100个请求
                redis-rate-limiter.replenishRate: 100
                # 允许突发200个请求
                redis-rate-limiter.burstCapacity: 200
                # 每个请求消耗1个令牌
                redis-rate-limiter.requestedTokens: 1

        # 订单服务路由
        - id: order-service
          uri: lb://order-service
          predicates:
            - Path=/api/order/**
          filters:
            - StripPrefix=2`}
        />

        <h3 className="text-xl font-bold text-gray-800 mb-4 mt-6">步骤 3: 自定义限流处理器</h3>
        <CodeBlock
          language="java"
          filename="GatewayBlockHandler.java"
          code={`package com.example.gateway.handler;

import org.springframework.web.reactive.function.server.ServerResponse;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

/**
 * Gateway 限流异常处理器
 */
@Component
public class GatewayBlockHandler {

    /**
     * 处理限流异常
     */
    public static Mono<ServerResponse> blockHandler(ServerWebExchange exchange, Throwable ex) {
        return ServerResponse
            .status(HttpStatus.TOO_MANY_REQUESTS)
            .bodyValue(Mono.just("{\"code\":429,\"message\":\"系统繁忙,请稍后再试\"}"));
    }

    /**
     * 处理降级异常
     */
    public static Mono<ServerResponse> fallbackHandler(ServerWebExchange exchange, Throwable ex) {
        return ServerResponse
            .status(HttpStatus.SERVICE_UNAVAILABLE)
            .bodyValue(Mono.just("{\"code\":503,\"message\":\"服务暂不可用\"}"));
    }
}`}
        />

        <h3 className="text-xl font-bold text-gray-800 mb-4 mt-6">步骤 4: 配置 Gateway Filter</h3>
        <CodeBlock
          language="java"
          filename="GatewayConfig.java"
          code={`package com.example.gateway.config;

import com.alibaba.csp.sentinel.adapter.gateway.common.SentinelGatewayConstants;
import com.alibaba.csp.sentinel.adapter.gateway.common.api.ApiDefinition;
import com.alibaba.csp.sentinel.adapter.gateway.common.api.GatewayApiDefinitionManager;
import com.alibaba.csp.sentinel.adapter.gateway.common.rule.GatewayFlowRule;
import com.alibaba.csp.sentinel.adapter.gateway.common.rule.GatewayParamFlowItem;
import com.alibaba.csp.sentinel.adapter.gateway.common.SentinelGatewayFilter;
import com.alibaba.csp.sentinel.adapter.gateway.scg.SentinelSCGAutoConfiguration;
import org.springframework.cloud.gateway.filter.GlobalFilter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;

import javax.annotation.PostConstruct;
import java.util.HashSet;
import java.util.Set;

@Configuration
public class GatewayConfig {

    private final SentinelSCGAutoConfiguration sentinelSCGAutoConfiguration;

    public GatewayConfig(SentinelSCGAutoConfiguration sentinelSCGAutoConfiguration) {
        this.sentinelSCGAutoConfiguration = sentinelSCGAutoConfiguration;
    }

    @Bean
    @Order(Ordered.HIGHEST_PRECEDENCE)
    public GlobalFilter sentinelGatewayFilter() {
        return new SentinelGatewayFilter();
    }

    @PostConstruct
    public void doInit() {
        // 加载网关流控规则
        initGatewayRules();
    }

    /**
     * 配置网关流控规则
     */
    private void initGatewayRules() {
        Set<GatewayFlowRule> rules = new HashSet<>();

        // 用户服务 API 限流
        rules.add(new GatewayFlowRule("user-service")  // 资源名,对应 route ID
            .setCount(100)                              // 限流阈值
            .setIntervalSec(1)                          // 统计时间窗口,单位是秒
            .setGrade(RuleConstant.FLOW_GRADE_QPS)      // QPS限流
        );

        // 订单服务 API 限流
        rules.add(new GatewayFlowRule("order-service")
            .setCount(50)                               // 限流阈值
            .setIntervalSec(1)
        );

        // 自定义 API 分组限流
        Set<ApiDefinition> definitions = new HashSet<>();
        ApiDefinition api = new ApiDefinition("user_api")
            .setPredicateItems(new HashSet<ApiPredicateItem>() {{
                // 匹配 /api/user/** 的路径
                add(new ApiPathPredicateItem()
                    .setPattern("/api/user/**")
                    .setMatchStrategy(SentinelGatewayConstants.URL_MATCH_STRATEGY_PREFIX));
            }});
        definitions.add(api);

        // 为自定义 API 配置限流规则
        rules.add(new GatewayFlowRule("user_api")
            .setCount(200)
            .setIntervalSec(1)
        );

        GatewayRuleManager.loadRules(rules);
        GatewayApiDefinitionManager.loadApiDefinitions(definitions);
    }
}`}
        />

        <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded mt-6">
          <p className="text-sm text-gray-700">
            <strong>💡 生产建议:</strong> 在生产环境中,建议通过 Sentinel 控制台动态配置 Gateway 流控规则,
            并将规则持久化到 Nacos。这样可以实现规则的实时更新和版本管理。
          </p>
        </div>
      </section>

      {/* 集群流控 */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">集群流控</h2>

        <p className="text-lg text-gray-700 mb-6">
          集群流控可以实现对集群总体流量的控制,适用于多实例部署场景,精确控制整个集群的总流量。
        </p>

        <div className="bg-purple-50 border-l-4 border-purple-500 p-6 rounded-lg mb-6">
          <h3 className="text-xl font-bold text-gray-900 mb-3">集群流控 vs 单机流控</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded">
              <h4 className="font-bold text-gray-900 mb-2">单机流控</h4>
              <p className="text-sm text-gray-700 mb-2">每个实例独立控制流量</p>
              <p className="text-xs text-gray-600">示例: 3个实例,每个限流100 QPS,总共300 QPS</p>
            </div>
            <div className="bg-white p-4 rounded">
              <h4 className="font-bold text-gray-900 mb-2">集群流控</h4>
              <p className="text-sm text-gray-700 mb-2">整个集群统一控制流量</p>
              <p className="text-xs text-gray-600">示例: 3个实例,总共限流100 QPS</p>
            </div>
          </div>
        </div>

        <h3 className="text-xl font-bold text-gray-800 mb-4">集群流控原理</h3>
        <div className="bg-gray-50 p-6 rounded-lg mb-6">
          <div className="flex items-center justify-center flex-wrap gap-4 text-center">
            <div className="p-4 bg-blue-100 rounded-lg">
              <div className="font-bold mb-2">Token Server</div>
              <div className="text-sm text-gray-600">集群限流服务器</div>
            </div>
            <div className="text-2xl">↓ 分发Token</div>
            <div className="p-4 bg-green-100 rounded-lg">
              <div className="font-bold mb-2">Token Client</div>
              <div className="text-sm text-gray-600">网关/应用实例</div>
            </div>
            <div className="text-2xl">↓ 请求Token</div>
            <div className="p-4 bg-orange-100 rounded-lg">
              <div className="font-bold mb-2">业务请求</div>
              <div className="text-sm text-gray-600">实际流量</div>
            </div>
          </div>
        </div>

        <h3 className="text-xl font-bold text-gray-800 mb-4">Token Server 配置</h3>
        <CodeBlock
          language="yaml"
          filename="application-server.yml"
          code={`server:
  port: 8080

spring:
  application:
    name: sentinel-server
  cloud:
    sentinel:
      transport:
        dashboard: localhost:8080
        port: 8719
      # 集群流控配置
      cluster:
        enabled: true
        mode: server           # server 模式
        port: 18730            # 集群流控端口
        client-port: 18729     # 客户端连接端口
      # 流控规则
      datasource:
        flow:
          nacos:
            server-addr: localhost:8848
            dataId: \${spring.application.name}-cluster-flow-rules
            groupId: SENTINEL_GROUP
            rule-type: flow
            # 集群流控配置
            cluster-mode: true`}
        />

        <h3 className="text-xl font-bold text-gray-800 mb-4 mt-6">Token Client 配置</h3>
        <CodeBlock
          language="yaml"
          filename="application-client.yml"
          code={`server:
  port: 8081

spring:
  application:
    name: sentinel-client
  cloud:
    sentinel:
      transport:
        dashboard: localhost:8080
        port: 8720
      # 集群流控配置
      cluster:
        enabled: true
        mode: client           # client 模式
        server-host: localhost # Token Server 地址
        server-port: 18730     # Token Server 端口
        client-port: 18729     # 客户端端口
      # 流控规则
      flow:
        cluster: true          # 启用集群流控
        cluster-mode: true     # 集群模式`}
        />

        <h3 className="text-xl font-bold text-gray-800 mb-4 mt-6">集群流控规则配置</h3>
        <CodeBlock
          language="java"
          filename="ClusterFlowConfig.java"
          code={`package com.example.config;

import com.alibaba.csp.sentinel.*;
import com.alibaba.csp.sentinel.slots.*;
import com.alibaba.csp.sentinel.cluster.flow.*;
import org.springframework.context.annotation.Configuration;

import javax.annotation.PostConstruct;
import java.util.ArrayList;
import java.util.List;

@Configuration
public class ClusterFlowConfig {

    @PostConstruct
    public void initClusterFlowRules() {
        List<FlowRule> rules = new ArrayList<>();

        FlowRule rule = new FlowRule();
        rule.setResource("user-api");
        rule.setGrade(RuleConstant.FLOW_GRADE_QPS);
        rule.setCount(1000);                  // 集群总 QPS 阈值
        rule.setClusterMode(true);            // 启用集群模式

        // 集群流控配置
        ClusterFlowConfig clusterConfig = new ClusterFlowConfig();
        clusterConfig.setFallbackToLocalWhenFail(true);  // 失败时降级到本地限流
        clusterConfig.setStrategy(0);                    // 阈值类型: 0-全局阈值,1-单机阈值
        clusterConfig.setThreshold(100);                 // 单机阈值(当strategy=1时使用)
        clusterConfig.setClientOffline(false);           // 客户端离线时不从集群移除

        rule.setClusterConfig(clusterConfig);

        rules.add(rule);

        FlowRuleManager.loadRules(rules);
    }
}`}
        />

        <h3 className="text-xl font-bold text-gray-800 mb-4 mt-6">通过控制台配置集群规则</h3>
        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <p className="text-sm text-gray-700 mb-3">
            <strong>配置步骤:</strong>
          </p>
          <ol className="list-decimal pl-6 space-y-2 text-sm text-gray-700">
            <li>在 Sentinel 控制台的"集群流控"页面,选择 Token Server</li>
            <li>配置 Token Server 的地址和端口</li>
            <li>在"流控规则"中勾选"集群模式"</li>
            <li>设置集群阈值(总QPS或单机QPS)</li>
            <li>选择失败策略(快速失败或降级到本地限流)</li>
          </ol>
        </div>

        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded mt-6">
          <p className="text-sm text-gray-700">
            <strong>⚠️ 注意事项:</strong>
            集群流控要求 Token Server 必须高可用。建议部署多个 Token Server 实例,
            并使用 Nacos 进行服务发现和自动切换。
          </p>
        </div>
      </section>

      {/* 规则持久化到Nacos */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">规则持久化到 Nacos</h2>

        <p className="text-lg text-gray-700 mb-6">
          将 Sentinel 规则持久化到 Nacos,可以实现规则的集中管理、版本控制和动态更新。
        </p>

        <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-lg mb-6">
          <h3 className="text-xl font-bold text-gray-900 mb-3">持久化的优势</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start">
              <span className="text-green-600 mr-2">✓</span>
              <div>
                <div className="font-bold">集中管理</div>
                <div className="text-sm text-gray-600">统一管理所有服务的规则</div>
              </div>
            </div>
            <div className="flex items-start">
              <span className="text-green-600 mr-2">✓</span>
              <div>
                <div className="font-bold">动态更新</div>
                <div className="text-sm text-gray-600">修改后实时生效,无需重启</div>
              </div>
            </div>
            <div className="flex items-start">
              <span className="text-green-600 mr-2">✓</span>
              <div>
                <div className="font-bold">版本控制</div>
                <div className="text-sm text-gray-600">支持历史版本回滚</div>
              </div>
            </div>
            <div className="flex items-start">
              <span className="text-green-600 mr-2">✓</span>
              <div>
                <div className="font-bold">环境隔离</div>
                <div className="text-sm text-gray-600">支持多环境配置(dev/test/prod)</div>
              </div>
            </div>
          </div>
        </div>

        <h3 className="text-xl font-bold text-gray-800 mb-4">步骤 1: 配置数据源</h3>
        <CodeBlock
          language="yaml"
          filename="application.yml"
          code={`spring:
  application:
    name: user-service
  cloud:
    sentinel:
      transport:
        dashboard: localhost:8080
        port: 8719
      eager: true
      # 配置数据源
      datasource:
        # 流控规则
        flow:
          nacos:
            server-addr: localhost:8848
            namespace: public
            group-id: SENTINEL_GROUP
            data-id: \${spring.application.name}-flow-rules
            rule-type: flow

        # 降级规则
        degrade:
          nacos:
            server-addr: localhost:8848
            namespace: public
            group-id: SENTINEL_GROUP
            data-id: \${spring.application.name}-degrade-rules
            rule-type: degrade

        # 热点规则
        param-flow:
          nacos:
            server-addr: localhost:8848
            namespace: public
            group-id: SENTINEL_GROUP
            data-id: \${spring.application.name}-param-flow-rules
            rule-type: param-flow

        # 系统规则
        system:
          nacos:
            server-addr: localhost:8848
            namespace: public
            group-id: SENTINEL_GROUP
            data-id: \${spring.application.name}-system-rules
            rule-type: system

        # 授权规则
        authority:
          nacos:
            server-addr: localhost:8848
            namespace: public
            group-id: SENTINEL_GROUP
            data-id: \${spring.application.name}-authority-rules
            rule-type: authority`}
        />

        <h3 className="text-xl font-bold text-gray-800 mb-4 mt-6">步骤 2: 在 Nacos 创建配置</h3>
        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <p className="text-sm text-gray-700 mb-3">
            <strong>在 Nacos 控制台创建配置:</strong>
          </p>
          <ul className="space-y-2 text-sm text-gray-700">
            <li><strong>Data ID:</strong> user-service-flow-rules</li>
            <li><strong>Group:</strong> SENTINEL_GROUP</li>
            <li><strong>配置格式:</strong> JSON</li>
          </ul>
        </div>

        <h3 className="text-xl font-bold text-gray-800 mb-4">步骤 3: 配置流控规则</h3>
        <CodeBlock
          language="json"
          filename="user-service-flow-rules (Nacos配置)"
          code={`[
    {
        "resource": "/api/user/getUserInfo",
        "limitApp": "default",
        "grade": 1,
        "count": 100,
        "strategy": 0,
        "controlBehavior": 0,
        "clusterMode": false
    },
    {
        "resource": "/api/user/list",
        "limitApp": "default",
        "grade": 1,
        "count": 50,
        "strategy": 0,
        "controlBehavior": 0,
        "clusterMode": false
    },
    {
        "resource": "/api/user/create",
        "limitApp": "default",
        "grade": 1,
        "count": 20,
        "strategy": 0,
        "controlBehavior": 2,
        "maxQueueingTimeMs": 500,
        "clusterMode": false
    }
]`}
        />

        <h3 className="text-xl font-bold text-gray-800 mb-4 mt-6">步骤 4: 配置降级规则</h3>
        <CodeBlock
          language="json"
          filename="user-service-degrade-rules (Nacos配置)"
          code={`[
    {
        "resource": "/api/user/getUserInfo",
        "grade": 0,
        "count": 50,
        "timeWindow": 10,
        "minRequestAmount": 10,
        "statIntervalMs": 1000
    },
    {
        "resource": "/api/user/list",
        "grade": 1,
        "count": 1000,
        "timeWindow": 10,
        "minRequestAmount": 5,
        "statIntervalMs": 1000
    }
]`}
        />

        <h3 className="text-xl font-bold text-gray-800 mb-4 mt-6">步骤 5: 规则推送工具类</h3>
        <CodeBlock
          language="java"
          filename="SentinelRulePublisher.java"
          code={`package com.example.util;

import com.alibaba.csp.sentinel.slots.block.RuleConstant;
import com.alibaba.csp.sentinel.slots.block.flow.FlowRule;
import com.alibaba.nacos.api.config.ConfigService;
import com.alibaba.fastjson.JSON;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

/**
 * Sentinel 规则发布工具
 */
@Component
public class SentinelRulePublisher {

    @Autowired
    private ConfigService nacosConfigService;

    /**
     * 推送流控规则到 Nacos
     *
     * @param appName 应用名称
     * @param rules   规则列表
     */
    public void publishFlowRules(String appName, List<FlowRule> rules) throws Exception {
        String dataId = appName + "-flow-rules";
        String groupId = "SENTINEL_GROUP";

        // 转换为 JSON
        String rulesJson = JSON.toJSONString(rules);

        // 推送到 Nacos
        boolean success = nacosConfigService.publishConfig(
            dataId,
            groupId,
            rulesJson
        );

        if (!success) {
            throw new RuntimeException("发布流控规则失败");
        }
    }

    /**
     * 创建示例流控规则
     */
    public List<FlowRule> createSampleFlowRules() {
        List<FlowRule> rules = new ArrayList<>();

        // 创建流控规则
        FlowRule rule = new FlowRule();
        rule.setResource("user-api");
        rule.setLimitApp("default");
        rule.setGrade(RuleConstant.FLOW_GRADE_QPS);
        rule.setCount(100);
        rule.setStrategy(RuleConstant.STRATEGY_DIRECT);
        rule.setControlBehavior(RuleConstant.CONTROL_BEHAVIOR_DEFAULT);
        rule.setClusterMode(false);

        rules.add(rule);

        return rules;
    }
}`}
        />

        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded mt-6">
          <p className="text-sm text-gray-700">
            <strong>💡 工作流程:</strong>
            1. 在 Nacos 创建配置 → 2. 应用启动时自动拉取规则 → 3. 规则变更时 Nacos 推送更新 → 4. 应用实时加载新规则
          </p>
        </div>
      </section>

      {/* 生产环境监控告警 */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">生产环境监控告警</h2>

        <p className="text-lg text-gray-700 mb-6">
          在生产环境中,需要建立完善的监控告警体系,及时发现和处理异常。
        </p>

        <div className="bg-orange-50 border-l-4 border-orange-500 p-6 rounded-lg mb-6">
          <h3 className="text-xl font-bold text-gray-900 mb-3">监控体系架构</h3>
          <div className="flex items-center justify-center flex-wrap gap-4 text-center">
            <div className="p-3 bg-white rounded-lg shadow">
              <div className="font-bold text-sm mb-1">应用</div>
              <div className="text-xs text-gray-600">Sentinel Metrics</div>
            </div>
            <div className="text-xl">→</div>
            <div className="p-3 bg-white rounded-lg shadow">
              <div className="font-bold text-sm mb-1">Prometheus</div>
              <div className="text-xs text-gray-600">指标采集</div>
            </div>
            <div className="text-xl">→</div>
            <div className="p-3 bg-white rounded-lg shadow">
              <div className="font-bold text-sm mb-1">Grafana</div>
              <div className="text-xs text-gray-600">可视化监控</div>
            </div>
            <div className="text-xl">→</div>
            <div className="p-3 bg-white rounded-lg shadow">
              <div className="font-bold text-sm mb-1">AlertManager</div>
              <div className="text-xs text-gray-600">告警通知</div>
            </div>
          </div>
        </div>

        <h3 className="text-xl font-bold text-gray-800 mb-4">步骤 1: 添加依赖</h3>
        <CodeBlock
          language="xml"
          code={`<dependencies>
    <!-- Sentinel 流量控制 -->
    <dependency>
        <groupId>com.alibaba.cloud</groupId>
        <artifactId>spring-cloud-starter-alibaba-sentinel</artifactId>
    </dependency>

    <!-- Spring Boot Actuator (暴露监控端点) -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-actuator</artifactId>
    </dependency>

    <!-- Micrometer Prometheus (指标导出) -->
    <dependency>
        <groupId>io.micrometer</groupId>
        <artifactId>micrometer-registry-prometheus</artifactId>
    </dependency>
</dependencies>`}
        />

        <h3 className="text-xl font-bold text-gray-800 mb-4 mt-6">步骤 2: 配置 Actuator 和 Prometheus</h3>
        <CodeBlock
          language="yaml"
          filename="application.yml"
          code={`management:
  endpoints:
    web:
      exposure:
        include: '*'  # 暴露所有端点
  metrics:
    export:
      prometheus:
        enabled: true  # 启用 Prometheus 导出
    tags:
      application: \${spring.application.name}  # 添加应用标签

spring:
  application:
    name: user-service
  cloud:
    sentinel:
      transport:
        dashboard: localhost:8080
        port: 8719
      # 启用 Sentinel 指标采集
      metric:
        enabled: true
        file-single-size: 10485760  # 单个文件大小
        file-total-count: 10        # 文件总数`}
        />

        <h3 className="text-xl font-bold text-gray-800 mb-4 mt-6">步骤 3: Prometheus 采集配置</h3>
        <CodeBlock
          language="yaml"
          filename="prometheus.yml"
          code={`global:
  scrape_interval: 15s  # 采集间隔
  evaluation_interval: 15s  # 规则评估间隔

scrape_configs:
  - job_name: 'sentinel'
    metrics_path: '/actuator/prometheus'
    static_configs:
      - targets:
        - 'localhost:8080'
    scrape_interval: 15s
    # 添加标签
    labels:
      service: 'user-service'
      env: 'prod'`}
        />

        <h3 className="text-xl font-bold text-gray-800 mb-4 mt-6">步骤 4: Grafana Dashboard 配置</h3>
        <CodeBlock
          language="json"
          filename="grafana-dashboard.json"
          code={`{
    "dashboard": {
        "title": "Sentinel 监控大屏",
        "panels": [
            {
                "title": "QPS 监控",
                "type": "graph",
                "targets": [
                    {
                        "expr": "sum(rate(sentinel_resource_pass_qps[1m])) by (resource)",
                        "legendFormat": "{{resource}}"
                    }
                ]
            },
            {
                "title": "拒绝 QPS",
                "type": "graph",
                "targets": [
                    {
                        "expr": "sum(rate(sentinel_resource_block_qps[1m])) by (resource)",
                        "legendFormat": "{{resource}}"
                    }
                ]
            },
            {
                "title": "响应时间(RT)",
                "type": "graph",
                "targets": [
                    {
                        "expr": "avg(sentinel_resource_rt) by (resource)",
                        "legendFormat": "{{resource}}"
                    }
                ]
            },
            {
                "title": "异常比例",
                "type": "graph",
                "targets": [
                    {
                        "expr": "sum(rate(sentinel_resource_exception_qps[1m])) by (resource) / sum(rate(sentinel_resource_pass_qps[1m])) by (resource)",
                        "legendFormat": "{{resource}}"
                    }
                ]
            }
        ]
    }
}`}
        />

        <h3 className="text-xl font-bold text-gray-800 mb-4 mt-6">步骤 5: 告警规则配置</h3>
        <CodeBlock
          language="yaml"
          filename="alert-rules.yml"
          code={`groups:
- name: sentinel_alerts
  interval: 30s
  rules:
  # 高拒绝率告警
  - alert: HighBlockRate
    expr: |
      rate(sentinel_resource_block_qps[1m])
      / rate(sentinel_resource_pass_qps[1m]) > 0.1
    for: 5m
    labels:
      severity: warning
      service: user-service
    annotations:
      summary: "Sentinel 拒绝率过高"
      description: "资源 {{ $labels.resource }} 拒绝率超过10%,当前值: {{ $value }}%"

  # 高异常率告警
  - alert: HighExceptionRate
    expr: |
      rate(sentinel_resource_exception_qps[5m])
      / rate(sentinel_resource_pass_qps[5m]) > 0.05
    for: 3m
    labels:
      severity: critical
      service: user-service
    annotations:
      summary: "Sentinel 异常率过高"
      description: "资源 {{ $labels.resource }} 异常率超过5%,当前值: {{ $value }}%"

  # 响应时间过长告警
  - alert: HighResponseTime
    expr: |
      avg(sentinel_resource_rt) by (resource) > 1000
    for: 5m
    labels:
      severity: warning
      service: user-service
    annotations:
      summary: "Sentinel 响应时间过长"
      description: "资源 {{ $labels.resource }} 平均响应时间超过1000ms,当前值: {{ $value }}ms"

  # 熔断告警
  - alert: CircuitBreakerOpen
    expr: |
      sentinel_degrade_status{resource=~".+"} == 1
    for: 1m
    labels:
      severity: critical
      service: user-service
    annotations:
      summary: "Sentinel 熔断触发"
      description: "资源 {{ $labels.resource }} 已被熔断,请立即检查服务状态"}`}
        />

        <h3 className="text-xl font-bold text-gray-800 mb-4 mt-6">步骤 6: 自定义监控指标</h3>
        <CodeBlock
          language="java"
          filename="CustomMetricsExporter.java"
          code={`package com.example.monitor;

import io.micrometer.core.instrument.Counter;
import io.micrometer.core.instrument.MeterRegistry;
import io.micrometer.core.instrument.Timer;
import org.springframework.stereotype.Component;

import java.util.concurrent.TimeUnit;

/**
 * 自定义监控指标导出器
 */
@Component
public class CustomMetricsExporter {

    private final Counter requestCounter;
    private final Counter blockCounter;
    private final Timer responseTimer;

    public CustomMetricsExporter(MeterRegistry registry) {
        // 请求计数器
        this.requestCounter = Counter.builder("sentinel_custom_requests_total")
            .description("Total requests")
            .tag("service", "user-service")
            .register(registry);

        // 限流计数器
        this.blockCounter = Counter.builder("sentinel_custom_blocks_total")
            .description("Total blocked requests")
            .tag("service", "user-service")
            .register(registry);

        // 响应时间
        this.responseTimer = Timer.builder("sentinel_custom_response_time")
            .description("Response time")
            .tag("service", "user-service")
            .register(registry);
    }

    /**
     * 记录请求
     */
    public void recordRequest() {
        requestCounter.increment();
    }

    /**
     * 记录限流
     */
    public void recordBlock() {
        blockCounter.increment();
    }

    /**
     * 记录响应时间
     */
    public void recordResponseTime(long milliseconds) {
        responseTimer.record(milliseconds, TimeUnit.MILLISECONDS);
    }
}`}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-bold text-gray-900 mb-2">📊 关键监控指标</h4>
            <ul className="text-sm space-y-1">
              <li>• passQps: 通过QPS</li>
              <li>• blockQps: 拒绝QPS</li>
              <li>• exceptionQps: 异常QPS</li>
              <li>• rt: 响应时间</li>
              <li>• threadCount: 线程数</li>
            </ul>
          </div>
          <div className="bg-red-50 p-4 rounded-lg">
            <h4 className="font-bold text-gray-900 mb-2">🚨 告警建议阈值</h4>
            <ul className="text-sm space-y-1">
              <li>• 拒绝率 &gt; 10%: 警告</li>
              <li>• 拒绝率 &gt; 30%: 严重</li>
              <li>• 异常率 &gt; 5%: 警告</li>
              <li>• RT &gt; 1000ms: 警告</li>
              <li>• 熔断开启: 立即处理</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 最佳实践 */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">最佳实践</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <BestPracticeCard2
            title="合理设置阈值"
            practices={[
              '不要设置过低,影响正常流量',
              '不要设置过高,保护效果有限',
              '根据压测结果确定阈值',
              '预留20-30%安全边界',
            ]}
          />
          <BestPracticeCard2
            title="选择合适的流控模式"
            practices={[
              '默认使用直接拒绝',
              '秒杀活动使用 Warm Up',
              '削峰填谷使用匀速排队',
              '根据场景灵活选择',
            ]}
          />
          <BestPracticeCard2
            title="熔断降级策略"
            practices={[
              '及时熔断,防止雪崩',
              '提供有意义的降级响应',
              '记录熔断日志,方便排查',
              '设置合理的恢复时间',
            ]}
          />
          <BestPracticeCard2
            title="规则持久化"
            practices={[
              '配置持久化到 Nacos',
              '避免重启丢失规则',
              '便于版本管理',
              '支持多环境配置',
            ]}
          />
        </div>
      </section>

      {/* 常见问题 */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">常见问题</h2>

        <div className="space-y-3">
          <FaqCard
            number={1}
            question="Sentinel 和 Nacos 的限流有什么区别?"
            answer="Nacos 限流主要针对服务注册发现场景,Sentinel 是更专业的流量控制组件。Sentinel 提供更丰富的流控策略、熔断降级、系统保护等功能。"
            isOpen={expandedFaq === 1}
            onClick={() => setExpandedFaq(expandedFaq === 1 ? null : 1)}
          />
          <FaqCard
            number={2}
            question="如何实现动态调整限流阈值?"
            answer="通过 Sentinel 控制台或 API 动态修改规则,无需重启应用。配置持久化到 Nacos 后,重启时自动加载规则。"
            isOpen={expandedFaq === 2}
            onClick={() => setExpandedFaq(expandedFaq === 2 ? null : 2)}
          />
          <FaqCard
            number={3}
            question="Warm Up 预热模式怎么用?"
            answer="适用于系统启动需要预热的场景。比如系统启动后前10秒,QPS从10慢慢增加到100,让系统逐步达到最佳状态。"
            isOpen={expandedFaq === 3}
            onClick={() => setExpandedFaq(expandedFaq === 3 ? null : 3)}
          />
          <FaqCard
            number={4}
            question="如何验证限流规则是否生效?"
            answer="使用压测工具(如 JMeter)发起大量请求,观察 Sentinel 控制台的实时监控,或者查看应用日志中的限流记录。"
            isOpen={expandedFaq === 4}
            onClick={() => setExpandedFaq(expandedFaq === 4 ? null : 4)}
          />
          <FaqCard
            number={5}
            question="生产环境需要注意什么?"
            answer="1) 合理设置阈值,不影响正常流量; 2) 配置规则持久化; 3) 监控和告警; 4) 定期review规则效果; 5) 准备降级预案。"
            isOpen={expandedFaq === 5}
            onClick={() => setExpandedFaq(expandedFaq === 5 ? null : 5)}
          />
        </div>
      </section>

      {/* 下一步学习 */}
      <section className="bg-gradient-to-r from-red-500 to-orange-600 text-white p-8 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">
          🎯 掌握了流量控制,下一步学习什么?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <NextStepCard
            title="Gateway 网关"
            description="学习如何统一管理多个服务的流量"
            link="/gateway"
            icon="🚪"
          />
          <NextStepCard
            title="Seata 分布式事务"
            description="学习如何在限流下保证数据一致性"
            link="/seata"
            icon="🔗"
          />
          <NextStepCard
            title="性能调优实战"
            description="学习系统性能优化技巧"
            link="/performance-tuning"
            icon="⚡"
          />
          <NextStepCard
            title="监控告警体系"
            description="学习建立完整的监控体系"
            link="/monitoring"
            icon="📊"
          />
        </div>
      </section>
    </div>
  );
};

// 特性卡片
interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
  color: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, color }) => {
  const colorClasses = {
    blue: 'bg-blue-50 border-blue-200',
    orange: 'bg-orange-50 border-orange-200',
    purple: 'bg-purple-50 border-purple-200',
  };

  return (
    <div className={`p-4 border-2 ${colorClasses[color as keyof typeof colorClasses]} rounded-lg`}>
      <div className="flex items-center mb-2">
        <span className="text-2xl mr-2">{icon}</span>
        <h4 className="font-bold text-gray-900">{title}</h4>
      </div>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  );
};

// 场景卡片
interface ScenarioCardProps {
  title: string;
  problem: string;
  result: string;
  solution: string;
}

const ScenarioCard: React.FC<ScenarioCardProps> = ({ title, problem, result, solution }) => {
  return (
    <div className="p-4 bg-white rounded border-2 border-red-200">
      <h4 className="font-bold text-gray-900 mb-2">{title}</h4>
      <p className="text-sm mb-1"><strong>问题:</strong> {problem}</p>
      <p className="text-sm mb-1"><strong>后果:</strong> <span className="text-red-600">{result}</span></p>
      <p className="text-sm"><strong>解决:</strong> <span className="text-green-600">{solution}</span></p>
    </div>
  );
};

// 解决方案卡片
interface SolutionCardProps {
  icon: string;
  title: string;
  desc: string;
  example: string;
}

const SolutionCard: React.FC<SolutionCardProps> = ({ icon, title, desc, example }) => {
  return (
    <div className="p-4 bg-white border-2 border-gray-200 rounded-lg hover:shadow-md transition-shadow">
      <span className="text-2xl">{icon}</span>
      <h4 className="font-bold text-gray-900 mt-2 mb-1">{title}</h4>
      <p className="text-sm text-gray-600 mb-2">{desc}</p>
      <p className="text-xs text-gray-500">示例: {example}</p>
    </div>
  );
};

// 概念卡片
interface ConceptCard2Props {
  title: string;
  level: 'beginner' | 'intermediate' | 'architect';
  description: string;
  example: string;
}

const ConceptCard2: React.FC<ConceptCard2Props> = ({ title, level, description, example }) => {
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
      <p className="text-gray-700 mb-3">{description}</p>
      <div className="text-sm">
        <span className="font-semibold text-gray-600">示例: </span>
        <code className="text-primary">{example}</code>
      </div>
    </div>
  );
};

// 流控模式卡片
interface FlowModeCardProps {
  title: string;
  icon: string;
  desc: string;
  scenario: string;
  example: string;
}

const FlowModeCard: React.FC<FlowModeCardProps> = ({ title, icon, desc, scenario, example }) => {
  return (
    <div className="p-5 bg-white border-2 border-gray-200 rounded-lg">
      <div className="flex items-center mb-3">
        <span className="text-2xl mr-2">{icon}</span>
        <h3 className="text-lg font-bold text-gray-900">{title}</h3>
      </div>
      <p className="text-sm text-gray-600 mb-2">{desc}</p>
      <p className="text-sm"><strong>场景:</strong> {scenario}</p>
      <p className="text-sm text-gray-500 mt-1">{example}</p>
    </div>
  );
};

// 状态盒子
interface StateBoxProps {
  state: string;
  desc: string;
  color: string;
  action: string;
}

const StateBox: React.FC<StateBoxProps> = ({ state, desc, color, action }) => {
  const colorClasses = {
    green: 'bg-green-100 border-green-400 text-green-800',
    red: 'bg-red-100 border-red-400 text-red-800',
    yellow: 'bg-yellow-100 border-yellow-400 text-yellow-800',
  };

  return (
    <div className={`p-4 border-2 rounded-lg text-center ${colorClasses[color as keyof typeof colorClasses]}`}>
      <div className="font-bold text-lg mb-1">{state}</div>
      <div className="text-sm mb-2">{desc}</div>
      <div className="text-xs">触发: {action}</div>
    </div>
  );
};

// 特性盒子
interface FeatureBoxProps {
  title: string;
  desc: string;
}

const FeatureBox: React.FC<FeatureBoxProps> = ({ title, desc }) => {
  return (
    <div className="p-3 bg-white border border-gray-200 rounded">
      <h4 className="font-bold text-gray-900 text-sm mb-1">{title}</h4>
      <p className="text-xs text-gray-600">{desc}</p>
    </div>
  );
};

// 系统保护卡片
interface SystemProtectCardProps {
  icon: string;
  title: string;
  desc: string;
}

const SystemProtectCard: React.FC<SystemProtectCardProps> = ({ icon, title, desc }) => {
  return (
    <div className="p-4 bg-purple-50 border-2 border-purple-200 rounded-lg text-center">
      <span className="text-3xl mb-2 block">{icon}</span>
      <h4 className="font-bold text-gray-900 mb-1">{title}</h4>
      <p className="text-sm text-gray-600">{desc}</p>
    </div>
  );
};

// 控制台特性卡片
interface ConsoleFeatureCardProps {
  icon: string;
  title: string;
  desc: string;
}

const ConsoleFeatureCard: React.FC<ConsoleFeatureCardProps> = ({ icon, title, desc }) => {
  return (
    <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
      <div className="flex items-center mb-2">
        <span className="text-2xl mr-2">{icon}</span>
        <h4 className="font-bold text-gray-900">{title}</h4>
      </div>
      <p className="text-sm text-gray-600">{desc}</p>
    </div>
  );
};

// 最佳实践卡片
interface BestPracticeCard2Props {
  title: string;
  practices: string[];
}

const BestPracticeCard2: React.FC<BestPracticeCard2Props> = ({ title, practices }) => {
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

// FAQ 卡片
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

// 下一步卡片
interface NextStepCardProps {
  title: string;
  description: string;
  link: string;
  icon: string;
}

const NextStepCard: React.FC<NextStepCardProps> = ({ title, description, link, icon }) => {
  return (
    <a
      href={link}
      className="block p-4 bg-white/10 backdrop-blur rounded-lg hover:bg-white/20 transition-colors"
    >
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
