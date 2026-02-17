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

export const ProjectPaymentPage: React.FC = () => {
  const [openModule, setOpenModule] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-green-800 text-white rounded-lg p-6 mb-8">
        <h1 className="text-4xl font-bold mb-2">微服务支付系统</h1>
        <p className="text-green-100">基于 Spring Cloud Alibaba 的分布式支付系统实战</p>
        <div className="flex gap-3 text-sm mt-4">
          <span className="px-3 py-1 bg-white/20 rounded-full">🚀 实战项目</span>
          <span className="px-3 py-1 bg-white/20 rounded-full">⏱️ 约120分钟</span>
          <span className="px-3 py-1 bg-white/20 rounded-full">💰 6个核心模块</span>
        </div>
      </div>

      {/* Why Payment System */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">为什么学习支付系统？</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-r-lg">
            <h3 className="text-xl font-bold text-green-800 mb-3">✅ 核心业务场景</h3>
            <ul className="text-gray-700 space-y-2">
              <li>• 电商交易闭环的关键</li>
              <li>• 资金安全的最后一道防线</li>
              <li>• 高并发处理的典型场景</li>
              <li>• 分布式事务的必然选择</li>
            </ul>
          </div>
          <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-lg">
            <h3 className="text-xl font-bold text-red-800 mb-3">❌ 技术挑战</h3>
            <ul className="text-gray-700 space-y-2">
              <li>• 支付状态同步难题</li>
              <li>• 重复支付与退款</li>
              <li>• 支付回调幂等性</li>
              <li>• 资金安全与风控</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Core Modules */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">核心功能模块</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { icon: '💳', title: '收银台', desc: '统一收银台，多支付方式' },
            { icon: '🔗', title: '支付网关', desc: '第三方支付渠道对接' },
            { icon: '📝', title: '交易记录', desc: '完整交易流水追踪' },
            { icon: '💸', title: '退款系统', desc: '自动退款与审核流程' },
            { icon: '🔒', title: '风控系统', desc: '异常交易检测与拦截' },
            { icon: '📊', title: '对账系统', desc: '日终对账与差异处理' },
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
            <div className="text-purple-700 font-bold mb-2">┌─ Gateway Layer (API Gateway)</div>
            <div className="text-blue-700 font-bold mb-2">├─ Business Layer</div>
            <div className="text-gray-600 ml-4">• payment-service (支付服务)</div>
            <div className="text-gray-600 ml-4">• refund-service (退款服务)</div>
            <div className="text-gray-600 ml-4">• reconciliation-service (对账服务)</div>
            <div className="text-green-700 font-bold mb-2">├─ Integration Layer</div>
            <div className="text-gray-600 ml-4">• Alipay SDK</div>
            <div className="text-gray-600 ml-4">• WeChat Pay SDK</div>
            <div className="text-gray-600 ml-4">• UnionPay SDK</div>
            <div className="text-orange-700 font-bold">└─ Data Layer</div>
            <div className="text-gray-600 ml-4">• MySQL + Redis + MongoDB</div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">数据库设计</h3>
          <CodeBlock
            language="sql"
            code={`-- 支付主表
CREATE TABLE \`payment_main\` (
  \`id\` BIGINT PRIMARY KEY AUTO_INCREMENT,
  \`payment_no\` VARCHAR(64) NOT NULL COMMENT '支付流水号',
  \`order_no\` VARCHAR(64) NOT NULL COMMENT '订单号',
  \`user_id\` BIGINT NOT NULL COMMENT '用户ID',
  \`payment_type\` VARCHAR(20) NOT NULL COMMENT '支付类型',
  \`amount\` DECIMAL(10,2) NOT NULL COMMENT '支付金额',
  \`status\` TINYINT NOT NULL DEFAULT 0 COMMENT '支付状态',
  \`transaction_id\` VARCHAR(128) COMMENT '第三方交易号',
  \`pay_time\` DATETIME COMMENT '支付时间',
  \`create_time\` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY \`uk_payment_no\` (\`payment_no\`),
  KEY \`idx_order_no\` (\`order_no\`),
  KEY \`idx_user_id\` (\`user_id\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 支付回调记录表
CREATE TABLE \`payment_callback\` (
  \`id\` BIGINT PRIMARY KEY AUTO_INCREMENT,
  \`payment_no\` VARCHAR(64) NOT NULL,
  \`content\` TEXT NOT NULL COMMENT '回调内容',
  \`sign_status\` TINYINT NOT NULL COMMENT '验签状态',
  \`process_status\` TINYINT NOT NULL DEFAULT 0 COMMENT '处理状态',
  \`retry_count\` INT NOT NULL DEFAULT 0,
  \`create_time\` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  KEY \`idx_payment_no\` (\`payment_no\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`}
          />
        </div>
      </section>

      {/* Implementation Details */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">核心实现</h2>

        {/* Payment Gateway */}
        <div className="mb-6">
          <button
            onClick={() => setOpenModule(openModule === 'gateway' ? null : 'gateway')}
            className="w-full bg-white border-2 border-green-300 rounded-lg p-5 flex items-center justify-between hover:bg-green-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">🔗</span>
              <div className="text-left">
                <h3 className="text-lg font-bold text-gray-900">支付网关</h3>
                <p className="text-gray-600 text-sm">统一支付渠道对接</p>
              </div>
            </div>
            <span className="text-gray-400">&rbrace;</span>
          </button>
          {openModule === 'gateway' && (
            <div className="mt-4 bg-white border border-gray-200 rounded-lg p-6">
              <CodeBlock
                language="java"
                code={`// 支付渠道枚举
public enum PaymentChannel {
    ALIPAY("alipay", "支付宝"),
    WECHAT("wechat", "微信支付"),
    UNIONPAY("unionpay", "银联");

    private final String code;
    private final String name;
}

// 支付请求
@Data
public class PaymentRequest {
    private String orderNo;
    private Long userId;
    private BigDecimal amount;
    private PaymentChannel channel;
    private String subject;
    private String returnUrl;
    private String notifyUrl;
}

// 支付网关服务
@Service
public class PaymentGatewayService {
    private Map<PaymentChannel, PaymentStrategy> strategyMap;

    @Autowired
    public PaymentGatewayService(List<PaymentStrategy> strategies) {
        this.strategyMap = strategies.stream()
            .collect(Collectors.toMap(
                PaymentStrategy::getChannel,
                Function.identity()
            ));
    }

    public PaymentResponse pay(PaymentRequest request) {
        // 1. 参数校验
        validateRequest(request);

        // 2. 幂等性校验
        String idempotentKey = getIdempotentKey(request);
        if (!redisTemplate.setIfAbsent(idempotentKey, "1", 5, TimeUnit.MINUTES)) {
            throw new BusinessException("重复支付请求");
        }

        // 3. 获取支付策略
        PaymentStrategy strategy = strategyMap.get(request.getChannel());
        if (strategy == null) {
            throw new BusinessException("不支持的支付方式");
        }

        // 4. 创建支付记录
        Payment payment = createPayment(request);

        // 5. 调用第三方支付
        PaymentResponse response = strategy.pay(request, payment);

        // 6. 更新支付状态
        updatePaymentStatus(payment, response);

        return response;
    }
}`}
              />
            </div>
          )}
        </div>

        {/* Alipay Integration */}
        <div className="mb-6">
          <button
            onClick={() => setOpenModule(openModule === 'alipay' ? null : 'alipay')}
            className="w-full bg-white border-2 border-blue-300 rounded-lg p-5 flex items-center justify-between hover:bg-blue-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">💳</span>
              <div className="text-left">
                <h3 className="text-lg font-bold text-gray-900">支付宝集成</h3>
                <p className="text-gray-600 text-sm">扫码支付、网页支付、APP支付</p>
              </div>
            </div>
            <span className="text-gray-400">&rbrace;</span>
          </button>
          {openModule === 'alipay' && (
            <div className="mt-4 bg-white border border-gray-200 rounded-lg p-6">
              <CodeBlock
                language="java"
                code={`@Service
public class AlipayPaymentStrategy implements PaymentStrategy {
    @Autowired
    private AlipayClient alipayClient;

    @Autowired
    private AlipayConfig config;

    @Override
    public PaymentChannel getChannel() {
        return PaymentChannel.ALIPAY;
    }

    @Override
    public PaymentResponse pay(PaymentRequest request, Payment payment) {
        // 创建支付请求
        AlipayTradePagePayRequest alipayRequest = new AlipayTradePagePayRequest();
        alipayRequest.setNotifyUrl(config.getNotifyUrl());
        alipayRequest.setReturnUrl(request.getReturnUrl());

        // 业务参数
        JSONObject bizContent = new JSONObject();
        bizContent.put("out_trade_no", payment.getPaymentNo());
        bizContent.put("total_amount", request.getAmount());
        bizContent.put("subject", request.getSubject());
        bizContent.put("product_code", "FAST_INSTANT_TRADE_PAY");
        alipayRequest.setBizContent(bizContent.toString());

        try {
            // 调用支付宝API
            AlipayTradePagePayResponse response = alipayClient.pageExecute(alipayRequest);

            if (response.isSuccess()) {
                return PaymentResponse.builder()
                    .paymentNo(payment.getPaymentNo())
                    .payUrl(response.getBody())
                    .build();
            } else {
                throw new BusinessException("支付宝支付失败：" + response.getSubMsg());
            }
        } catch (AlipayApiException e) {
            throw new BusinessException("支付宝调用异常", e);
        }
    }

    @Override
    public PaymentNotifyResponse notify(Map<String, String> params) {
        // 验证签名
        boolean signVerified = AlipaySignature.rsa256CheckV1(
            params,
            config.getAlipayPublicKey(),
            "UTF-8",
            "RSA2"
        );

        if (!signVerified) {
            throw new BusinessException("签名验证失败");
        }

        // 解析通知参数
        String tradeNo = params.get("trade_no");
        String outTradeNo = params.get("out_trade_no");
        String tradeStatus = params.get("trade_status");
        BigDecimal totalAmount = new BigDecimal(params.get("total_amount"));

        return PaymentNotifyResponse.builder()
            .transactionId(tradeNo)
            .paymentNo(outTradeNo)
            .status(tradeStatus)
            .amount(totalAmount)
            .build();
    }
}`}
              />
            </div>
          )}
        </div>

        {/* WeChat Pay Integration */}
        <div className="mb-6">
          <button
            onClick={() => setOpenModule(openModule === 'wechat' ? null : 'wechat')}
            className="w-full bg-white border-2 border-yellow-300 rounded-lg p-5 flex items-center justify-between hover:bg-yellow-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">💬</span>
              <div className="text-left">
                <h3 className="text-lg font-bold text-gray-900">微信支付集成</h3>
                <p className="text-gray-600 text-sm">JSAPI支付、H5支付、Native支付</p>
              </div>
            </div>
            <span className="text-gray-400">&rbrace;</span>
          </button>
          {openModule === 'wechat' && (
            <div className="mt-4 bg-white border border-gray-200 rounded-lg p-6">
              <CodeBlock
                language="java"
                code={`@Service
public class WechatPayPaymentStrategy implements PaymentStrategy {
    @Autowired
    private WechatPayClient wechatPayClient;

    @Override
    public PaymentChannel getChannel() {
        return PaymentChannel.WECHAT;
    }

    @Override
    public PaymentResponse pay(PaymentRequest request, Payment payment) {
        // Native支付（扫码支付）
        if (request.getPayType() == PayType.NATIVE) {
            return nativePay(request, payment);
        }

        // H5支付
        if (request.getPayType() == PayType.H5) {
            return h5Pay(request, payment);
        }

        // JSAPI支付
        if (request.getPayType() == PayType.JSAPI) {
            return jsapiPay(request, payment);
        }

        throw new BusinessException("不支持的支付类型");
    }

    private PaymentResponse nativePay(PaymentRequest request, Payment payment) {
        WechatPayNativeRequest wechatRequest = new WechatPayNativeRequest();
        wechatRequest.setOutTradeNo(payment.getPaymentNo());
        wechatRequest.setDescription(request.getSubject());
        wechatRequest.setAmount(new Amount(request.getAmount().multiply(new BigDecimal("100")).intValue()));

        try {
            WechatPayNativeResponse response = wechatPayClient.nativePay(wechatRequest);

            return PaymentResponse.builder()
                .paymentNo(payment.getPaymentNo())
                .qrCode(response.getCodeUrl())
                .build();
        } catch (Exception e) {
            throw new BusinessException("微信支付调用失败", e);
        }
    }

    @Override
    public PaymentNotifyResponse notify(Map<String, String> params) {
        // 验证签名
        boolean signVerified = WechatPaySignature.verify(
            params,
            wechatPayConfig.getApiKey()
        );

        if (!signVerified) {
            throw new BusinessException("签名验证失败");
        }

        return PaymentNotifyResponse.builder()
            .transactionId(params.get("transaction_id"))
            .paymentNo(params.get("out_trade_no"))
            .status(params.get("result_code"))
            .amount(new BigDecimal(params.get("total_fee")).divide(new BigDecimal("100")))
            .build();
    }
}`}
              />
            </div>
          )}
        </div>

        {/* Refund System */}
        <div className="mb-6">
          <button
            onClick={() => setOpenModule(openModule === 'refund' ? null : 'refund')}
            className="w-full bg-white border-2 border-purple-300 rounded-lg p-5 flex items-center justify-between hover:bg-purple-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">💸</span>
              <div className="text-left">
                <h3 className="text-lg font-bold text-gray-900">退款系统</h3>
                <p className="text-gray-600 text-sm">自动退款与审核流程</p>
              </div>
            </div>
            <span className="text-gray-400">&rbrace;</span>
          </button>
          {openModule === 'refund' && (
            <div className="mt-4 bg-white border border-gray-200 rounded-lg p-6">
              <CodeBlock
                language="java"
                code={`@Service
public class RefundService {
    @Autowired
    private PaymentMapper paymentMapper;

    @Autowired
    private RefundMapper refundMapper;

    @Autowired
    private RocketMQTemplate rocketMQTemplate;

    /**
     * 申请退款
     */
    @Transactional
    public String applyRefund(RefundRequest request) {
        // 1. 查询支付记录
        Payment payment = paymentMapper.selectByOrderNo(request.getOrderNo());
        if (payment == null) {
            throw new BusinessException("支付记录不存在");
        }

        // 2. 校验退款金额
        if (request.getRefundAmount().compareTo(payment.getAmount()) > 0) {
            throw new BusinessException("退款金额不能大于支付金额");
        }

        // 3. 查询已退款金额
        BigDecimal refundedAmount = refundMapper.sumRefundAmount(request.getOrderNo());
        if (refundedAmount == null) {
            refundedAmount = BigDecimal.ZERO;
        }

        if (refundedAmount.add(request.getRefundAmount()).compareTo(payment.getAmount()) > 0) {
            throw new BusinessException("累计退款金额不能大于支付金额");
        }

        // 4. 创建退款记录
        Refund refund = new Refund();
        refund.setRefundNo(generateRefundNo());
        refund.setOrderNo(request.getOrderNo());
        refund.setPaymentNo(payment.getPaymentNo());
        refund.setRefundAmount(request.getRefundAmount());
        refund.setRefundReason(request.getReason());
        refund.setStatus(RefundStatus.PENDING);
        refundMapper.insert(refund);

        // 5. 发送退款消息
        RefundMessage message = RefundMessage.builder()
            .refundNo(refund.getRefundNo())
            .orderNo(request.getOrderNo())
            .refundAmount(request.getRefundAmount())
            .build();

        rocketMQTemplate.syncSend("refund-topic", message);

        return refund.getRefundNo();
    }

    /**
     * 执行退款
     */
    @RocketMQMessageListener(
        topic = "refund-topic",
        consumerGroup = "refund-consumer-group"
    )
    @Service
    public class RefundConsumer implements RocketMQListener<RefundMessage> {
        @Autowired
        private RefundProcessor refundProcessor;

        @Override
        public void onMessage(RefundMessage message) {
            try {
                refundProcessor.processRefund(message.getRefundNo());
            } catch (Exception e) {
                log.error("退款处理失败：{}", message.getRefundNo(), e);
                // 重新入队，稍后重试
                throw e;
            }
        }
    }

    /**
     * 退款处理器
     */
    @Service
    public class RefundProcessor {
        public void processRefund(String refundNo) {
            // 1. 查询退款记录
            Refund refund = refundMapper.selectByRefundNo(refundNo);

            // 2. 查询支付记录
            Payment payment = paymentMapper.selectByPaymentNo(refund.getPaymentNo());

            // 3. 调用第三方退款接口
            PaymentStrategy strategy = paymentStrategyFactory.getStrategy(payment.getPaymentType());
            RefundResponse response = strategy.refund(refund, payment);

            // 4. 更新退款状态
            if (response.isSuccess()) {
                refund.setStatus(RefundStatus.SUCCESS);
                refund.setRefundId(response.getRefundId());
            } else {
                refund.setStatus(RefundStatus.FAILED);
                refund.setFailReason(response.getErrorMsg());
            }

            refundMapper.updateById(refund);
        }
    }
}`}
              />
            </div>
          )}
        </div>

        {/* Reconciliation System */}
        <div className="mb-6">
          <button
            onClick={() => setOpenModule(openModule === 'reconciliation' ? null : 'reconciliation')}
            className="w-full bg-white border-2 border-orange-300 rounded-lg p-5 flex items-center justify-between hover:bg-orange-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">📊</span>
              <div className="text-left">
                <h3 className="text-lg font-bold text-gray-900">对账系统</h3>
                <p className="text-gray-600 text-sm">日终对账与差异处理</p>
              </div>
            </div>
            <span className="text-gray-400">&rbrace;</span>
          </button>
          {openModule === 'reconciliation' && (
            <div className="mt-4 bg-white border border-gray-200 rounded-lg p-6">
              <CodeBlock
                language="java"
                code={`@Service
public class ReconciliationService {
    @Autowired
    private PaymentMapper paymentMapper;

    @Autowired
    private AlipayClient alipayClient;

    /**
     * 日终对账任务
     */
    @Scheduled(cron = "0 0 1 * * ?")  // 每天凌晨1点执行
    public void dailyReconciliation() {
        LocalDate yesterday = LocalDate.now().minusDays(1);
        String date = yesterday.format(DateTimeFormatter.ofPattern("yyyy-MM-dd"));

        log.info("开始执行日终对账：{}", date);

        // 1. 拉取第三方账单
        List<ThirdPartyBill> thirdPartyBills = fetchThirdPartyBills(date);

        // 2. 查询本地支付记录
        List<Payment> localPayments = paymentMapper.selectByDate(yesterday);

        // 3. 对比差异
        List<ReconciliationDiff> diffs = compareBills(thirdPartyBills, localPayments);

        // 4. 处理差异
        processDifferences(diffs);

        // 5. 生成对账报告
        generateReconciliationReport(date, diffs);

        log.info("日终对账完成：{}", date);
    }

    /**
     * 拉取第三方账单
     */
    private List<ThirdPartyBill> fetchThirdPartyBills(String date) {
        // 拉取支付宝账单
        AlipayDataDataserviceBillDownloadurlQueryRequest request =
            new AlipayDataDataserviceBillDownloadurlQueryRequest();
        request.setBizContent(String.format("{\"bill_type\":\"trade\",\"bill_date\":\"%s\"}", date));

        AlipayDataDataserviceBillDownloadurlQueryResponse response =
            alipayClient.execute(request);

        if (response.isSuccess()) {
            String billUrl = response.getBillDownloadUrl();
            return downloadAndParseBill(billUrl);
        }

        return Collections.emptyList();
    }

    /**
     * 对比账单差异
     */
    private List<ReconciliationDiff> compareBills(
        List<ThirdPartyBill> thirdPartyBills,
        List<Payment> localPayments
    ) {
        List<ReconciliationDiff> diffs = new ArrayList<>();

        Map<String, ThirdPartyBill> thirdPartyMap = thirdPartyBills.stream()
            .collect(Collectors.toMap(ThirdPartyBill::getPaymentNo, Function.identity()));

        Map<String, Payment> localMap = localPayments.stream()
            .collect(Collectors.toMap(Payment::getPaymentNo, Function.identity()));

        // 检查本地有但第三方没有的（支付失败）
        for (Payment payment : localPayments) {
            if (!thirdPartyMap.containsKey(payment.getPaymentNo())) {
                diffs.add(ReconciliationDiff.builder()
                    .paymentNo(payment.getPaymentNo())
                    .diffType(DiffType.LOCAL_ONLY)
                    .localAmount(payment.getAmount())
                    .build());
            }
        }

        // 检查第三方有但本地没有的（漏单）
        for (ThirdPartyBill bill : thirdPartyBills) {
            if (!localMap.containsKey(bill.getPaymentNo())) {
                diffs.add(ReconciliationDiff.builder()
                    .paymentNo(bill.getPaymentNo())
                    .diffType(DiffType.THIRD_PARTY_ONLY)
                    .thirdPartyAmount(bill.getAmount())
                    .build());
            }
        }

        // 检查金额不一致
        for (Payment payment : localPayments) {
            ThirdPartyBill bill = thirdPartyMap.get(payment.getPaymentNo());
            if (bill != null && payment.getAmount().compareTo(bill.getAmount()) != 0) {
                diffs.add(ReconciliationDiff.builder()
                    .paymentNo(payment.getPaymentNo())
                    .diffType(DiffType.AMOUNT_MISMATCH)
                    .localAmount(payment.getAmount())
                    .thirdPartyAmount(bill.getAmount())
                    .build());
            }
        }

        return diffs;
    }

    /**
     * 处理差异
     */
    private void processDifferences(List<ReconciliationDiff> diffs) {
        for (ReconciliationDiff diff : diffs) {
            switch (diff.getDiffType()) {
                case LOCAL_ONLY:
                    // 本地有但第三方没有，可能是支付失败，需要检查
                    handleLocalOnly(diff);
                    break;
                case THIRD_PARTY_ONLY:
                    // 漏单，需要补录
                    handleThirdPartyOnly(diff);
                    break;
                case AMOUNT_MISMATCH:
                    // 金额不一致，需要人工介入
                    handleAmountMismatch(diff);
                    break;
            }
        }
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
            <h3 className="text-lg font-bold text-gray-900 mb-3">🔐 安全防护</h3>
            <ul className="text-gray-700 text-sm space-y-2">
              <li>• 所有接口必须验证签名</li>
              <li>• 敏感信息加密存储</li>
              <li>• 支付密码二次验证</li>
              <li>• IP白名单限制</li>
            </ul>
          </div>
          <div className="bg-white border-l-4 border-green-500 rounded-lg p-5 shadow-md">
            <h3 className="text-lg font-bold text-gray-900 mb-3">🎯 幂等性保证</h3>
            <ul className="text-gray-700 text-sm space-y-2">
              <li>• 支付流水号唯一约束</li>
              <li>• Redis 幂等键防重</li>
              <li>• 支付回调幂等处理</li>
              <li>• 状态机控制流转</li>
            </ul>
          </div>
          <div className="bg-white border-l-4 border-yellow-500 rounded-lg p-5 shadow-md">
            <h3 className="text-lg font-bold text-gray-900 mb-3">⚡ 高可用保障</h3>
            <ul className="text-gray-700 text-sm space-y-2">
              <li>• 支付通道多活</li>
              <li>• 异步重试机制</li>
              <li>• 降级开关配置</li>
              <li>• 补单定时任务</li>
            </ul>
          </div>
          <div className="bg-white border-l-4 border-purple-500 rounded-lg p-5 shadow-md">
            <h3 className="text-lg font-bold text-gray-900 mb-3">📊 监控告警</h3>
            <ul className="text-gray-700 text-sm space-y-2">
              <li>• 支付成功率监控</li>
              <li>• 支付耗时统计</li>
              <li>• 异常交易告警</li>
              <li>• 对账差异通知</li>
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
            <h3 className="text-lg font-bold text-gray-900">1. 如何保证支付回调的幂等性？</h3>
            <span className="text-2xl text-gray-400">&lbrace;openFaq === 1 ? '−' : '+'&rbrace;</span>
          </button>
          {openFaq === 1 && (
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
              <div className="text-gray-700 whitespace-pre-line">幂等性保证方案：

1. 数据库唯一约束
   - payment_no 作为唯一索引
   - 重复回调插入失败，直接返回成功

2. Redis 分布式锁
   ```java
   public void handleCallback(String paymentNo) &lbrace;
       String lockKey = "payment:callback:" + paymentNo;
       Boolean locked = redisTemplate.opsForValue()
           .setIfAbsent(lockKey, "1", 30, TimeUnit.SECONDS);

       if (!locked) &lbrace;
           throw new BusinessException("重复回调");
       &rbrace;

       try &lbrace;
           // 处理回调逻辑
       &rbrace; finally &lbrace;
           redisTemplate.delete(lockKey);
       &rbrace;
   &rbrace;
   ```

3. 状态校验
   - 查询支付状态
   - 已成功支付的直接返回
   - 处理中的更新状态
   - 失败的重新处理</div>
            </div>
          )}
        </div>

        <div className="bg-white border-2 border-gray-200 rounded-lg overflow-hidden mt-4">
          <button
            onClick={() => setOpenFaq(openFaq === 2 ? null : 2)}
            className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
          >
            <h3 className="text-lg font-bold text-gray-900">2. 支付回调失败如何处理？</h3>
            <span className="text-2xl text-gray-400">&lbrace;openFaq === 2 ? '−' : '+'&rbrace;</span>
          </button>
          {openFaq === 2 && (
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
              <div className="text-gray-700 whitespace-pre-line">回调失败处理方案：

1. 记录原始回调
   - 保存完整回调内容到 callback 表
   - 标记为待处理状态

2. 异步重试机制
   - 使用 MQ 延迟队列
   - 指数退避策略重试
   - 最大重试次数限制

3. 主动查询补偿
   ```java
   @Scheduled(fixedDelay = 60000)  // 每分钟执行
   public void queryPendingPayments() &lbrace;
       List&lt;Payment&gt; pendingPayments =
           paymentMapper.selectPendingPayments(Duration.ofMinutes(5));

       for (Payment payment : pendingPayments) &lbrace;
           // 调用第三方查询接口
           PaymentQueryResponse response = queryPaymentStatus(payment);

           if (response.isSuccess()) &lbrace;
               // 更新本地状态
               updatePaymentStatus(payment, response);
           &rbrace;
       &rbrace;
   &rbrace;
   ```

4. 对账差异处理
   - 日终对账发现遗漏
   - 人工介入核实</div>
            </div>
          )}
        </div>

        <div className="bg-white border-2 border-gray-200 rounded-lg overflow-hidden mt-4">
          <button
            onClick={() => setOpenFaq(openFaq === 3 ? null : 3)}
            className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
          >
            <h3 className="text-lg font-bold text-gray-900">3. 如何防止重复支付？</h3>
            <span className="text-2xl text-gray-400">&lbrace;openFaq === 3 ? '−' : '+'&rbrace;</span>
          </button>
          {openFaq === 3 && (
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
              <div className="text-gray-700 whitespace-pre-line">防重复支付方案：

1. 前端防抖
   - 支付按钮点击后立即禁用
   - 支付中状态提示

2. 后端幂等
   ```java
   public PaymentResponse pay(PaymentRequest request) &lbrace;
       // 生成幂等键
       String idempotentKey = String.format(
           "payment:idempotent:%s:%s:%s",
           request.getUserId(),
           request.getOrderNo(),
           request.getAmount()
       );

       // 设置幂等键（5分钟有效）
       Boolean success = redisTemplate.opsForValue()
           .setIfAbsent(idempotentKey, "1", 5, TimeUnit.MINUTES);

       if (!success) &lbrace;
           // 查询已有支付记录
           Payment existingPayment =
               paymentMapper.selectByOrderNo(request.getOrderNo());
           return buildResponse(existingPayment);
       &rbrace;

       // 创建支付...
   &rbrace;
   ```

3. 数据库约束
   - user_id + order_no 唯一索引
   - 同一订单同一用户只能创建一条支付记录

4. 支付状态校验
   - 创建支付前查询订单状态
   - 已支付订单拒绝再次支付</div>
            </div>
          )}
        </div>
      </section>

      <K8sDeploymentCard projectType="payment" />

      {/* Next Steps */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">下一步学习</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <a href="/project-user-center" className="block bg-green-50 hover:bg-green-100 border border-green-200 rounded-lg p-6 transition-colors">
            <h3 className="text-xl font-bold text-green-900 mb-2">用户中心</h3>
            <p className="text-green-700">用户、账户、权限</p>
          </a>
          <a href="/project-flash-sale" className="block bg-orange-50 hover:bg-orange-100 border border-orange-200 rounded-lg p-6 transition-colors">
            <h3 className="text-xl font-bold text-orange-900 mb-2">秒杀系统</h3>
            <p className="text-orange-700">高并发支付场景</p>
          </a>
          <a href="/project-comprehensive" className="block bg-purple-50 hover:bg-purple-100 border border-purple-200 rounded-lg p-6 transition-colors">
            <h3 className="text-xl font-bold text-purple-900 mb-2">综合项目</h3>
            <p className="text-purple-700">完整电商系统整合</p>
          </a>
        </div>
      </section>
    </div>
  );
};
