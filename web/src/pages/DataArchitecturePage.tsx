import { CodeBlock } from '../components';
import { useState } from 'react';

interface ChallengeCardProps {
  title: string;
  level: 'critical' | 'high' | 'medium';
  description: string;
  impact: string;
}

const ChallengeCard: React.FC<ChallengeCardProps> = ({ title, level, description, impact }) => {
  const levelConfig = {
    critical: { icon: '🔴', label: '严重', color: 'bg-red-50 border-red-300' },
    high: { icon: '🟠', label: '高', color: 'bg-orange-50 border-orange-300' },
    medium: { icon: '🟡', label: '中', color: 'bg-yellow-50 border-yellow-300' },
  };

  return (
    <div className={`p-5 border-2 rounded-lg ${levelConfig[level].color}`}>
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-xl font-bold text-gray-900">{title}</h3>
        <span className="text-xs px-2 py-1 bg-white rounded">
          {levelConfig[level].icon} {levelConfig[level].label}
        </span>
      </div>
      <p className="text-gray-700 mb-3 text-sm">{description}</p>
      <div className="text-sm">
        <span className="font-semibold text-gray-600">影响:</span>
        <span className="text-gray-700 ml-2">{impact}</span>
      </div>
    </div>
  );
};

interface SolutionCardProps {
  title: string;
  principle: string;
  advantages: string[];
  limitations: string[];
}

const SolutionCard: React.FC<SolutionCardProps> = ({ title, principle, advantages, limitations }) => {
  return (
    <div className="bg-white border-2 border-blue-200 rounded-lg p-5">
      <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
      <div className="mb-4">
        <h4 className="font-semibold text-blue-600 mb-1">原理:</h4>
        <p className="text-sm text-gray-700">{principle}</p>
      </div>
      <div className="mb-3">
        <h4 className="font-semibold text-green-600 mb-2">优势:</h4>
        <ul className="text-sm text-gray-700 space-y-1">
          {advantages.map((adv, idx) => (
            <li key={idx} className="flex items-start">
              <span className="text-green-600 mr-2">✓</span>
              <span>{adv}</span>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h4 className="font-semibold text-orange-600 mb-2">限制:</h4>
        <ul className="text-sm text-gray-700 space-y-1">
          {limitations.map((lim, idx) => (
            <li key={idx} className="flex items-start">
              <span className="text-orange-600 mr-2">!</span>
              <span>{lim}</span>
            </li>
          ))}
        </ul>
      </div>
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

export const DataArchitecturePage: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="prose prose prose-slate max-w-none">
      {/* 页面头部 */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg p-6 mb-8">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-4xl font-bold mb-2">微服务数据架构设计</h1>
            <p className="text-purple-50 text-lg">分库分表、读写分离、数据同步实战</p>
          </div>
          <div className="flex gap-3 text-sm">
            <span className="px-3 py-1 bg-white/20 rounded-full">🏗️ 架构师</span>
            <span className="px-3 py-1 bg-white/20 rounded-full">⏱️ 约60分钟</span>
            <span className="px-3 py-1 bg-white/20 rounded-full">📚 12个知识点</span>
          </div>
        </div>
      </div>

      {/* 什么是数据架构 */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">什么是微服务数据架构?</h2>

        <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-lg mb-6">
          <p className="text-lg text-gray-800 leading-relaxed mb-4">
            <strong>微服务数据架构</strong> 是指在微服务架构中，为了应对<strong className="text-red-600">海量数据存储、高并发访问、数据一致性</strong>等挑战，
            而采用的一套数据管理方案。
          </p>
          <p className="text-gray-700 mb-4">
            核心目标是在保证<strong>数据一致性</strong>的前提下，实现<strong>高性能</strong>、<strong>高可用</strong>、<strong>可扩展</strong>的数据服务。
          </p>
          <div className="bg-white p-4 rounded border border-blue-200 mt-4">
            <h4 className="font-bold text-gray-900 mb-2">💡 核心技术栈</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start">
                <span className="text-purple-600 mr-2">✓</span>
                <span><strong>ShardingSphere</strong> - 分库分表中间件</span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-600 mr-2">✓</span>
                <span><strong>Canal</strong> - MySQL 数据同步工具</span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-600 mr-2">✓</span>
                <span><strong>RocketMQ</strong> - 消息队列实现最终一致性</span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-600 mr-2">✓</span>
                <span><strong>MySQL 主从复制</strong> - 读写分离基础</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-purple-50 border-2 border-purple-200 rounded-lg p-6 text-center">
            <div className="text-4xl mb-3">📊</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">海量数据</h3>
            <p className="text-sm text-gray-700">单表超千万<br/>需要分库分表</p>
          </div>
          <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6 text-center">
            <div className="text-4xl mb-3">⚡</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">高并发</h3>
            <p className="text-sm text-gray-700">读写分离<br/>提升性能</p>
          </div>
          <div className="bg-green-50 border-2 border-green-200 rounded-lg p-6 text-center">
            <div className="text-4xl mb-3">🔄</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">数据同步</h3>
            <p className="text-sm text-gray-700">CDC 实时同步<br/>保证一致性</p>
          </div>
        </div>
      </section>

      {/* 数据架构挑战 */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">数据架构面临的挑战</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ChallengeCard
            title="单表数据量过大"
            level="critical"
            description="当单表数据量超过千万级，查询性能急剧下降，索引效率降低，数据库维护困难"
            impact="查询慢、备份慢、DDL 操作阻塞业务"
          />
          <ChallengeCard
            title="读写并发高"
            level="critical"
            description="大量读请求和写请求同时访问数据库，导致数据库连接池耗尽，响应超时"
            impact="系统吞吐量低、用户体验差"
          />
          <ChallengeCard
            title="数据一致性难保证"
            level="high"
            description="微服务拆分后，跨服务的数据操作难以保证 ACID 特性，容易产生数据不一致"
            impact="库存超卖、余额错误等业务问题"
          />
          <ChallengeCard
            title="跨库查询困难"
            level="high"
            description="分库分表后，原本简单的 JOIN 查询变得复杂，需要应用层聚合数据"
            impact="开发复杂度增加、查询性能下降"
          />
          <ChallengeCard
            title="多租户数据隔离"
            level="medium"
            description="SaaS 场景下，需要保证不同租户的数据严格隔离，同时兼顾性能"
            impact="数据安全风险、资源分配不均"
          />
          <ChallengeCard
            title="分布式事务复杂"
            level="high"
            description="跨库操作无法使用本地事务，需要引入分布式事务方案（如 Seata），增加系统复杂度"
            impact="开发难度大、性能开销高"
          />
        </div>

        <div className="mt-6 bg-red-50 border-l-4 border-red-500 p-5 rounded-lg">
          <h4 className="font-bold text-gray-900 mb-2">⚠️ 典型故障案例</h4>
          <div className="text-sm text-gray-700 space-y-2">
            <p><strong>案例1:</strong> 某电商订单表未分表，数据量达 5000 万，"双11" 期间查询超时导致订单大量失败</p>
            <p><strong>案例2:</strong> 读写未分离，热点商品查询将主库 CPU 打满，导致下单操作全部超时</p>
            <p><strong>案例3:</strong> 多租户未隔离，个别大租户的高并发查询影响所有租户体验</p>
          </div>
        </div>
      </section>

      {/* 分库分表 - 垂直拆分 */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">分库分表 (一): 垂直拆分</h2>

        <div className="bg-white border-2 border-blue-200 rounded-lg p-6 mb-6">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">什么是垂直拆分?</h3>
          <p className="text-gray-700 mb-4">
            <strong>垂直拆分</strong> 是指根据业务模块，将<strong>不同的表拆分到不同的数据库</strong>中。
            通常是<strong>先垂直拆分，后水平拆分</strong>。
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-blue-50 p-4 rounded">
              <h4 className="font-bold text-blue-900 mb-2">📊 垂直分库</h4>
              <p className="text-sm text-gray-700">将不同业务模块的表分配到不同数据库</p>
              <p className="text-xs text-gray-600 mt-2">例: 用户库、订单库、商品库</p>
            </div>
            <div className="bg-green-50 p-4 rounded">
              <h4 className="font-bold text-green-900 mb-2">📋 垂直分表</h4>
              <p className="text-sm text-gray-700">将大表按字段拆分为多个小表</p>
              <p className="text-xs text-gray-600 mt-2">例: 用户表、用户详情表</p>
            </div>
          </div>
        </div>

        <h3 className="text-2xl font-bold text-gray-900 mb-4">垂直拆分示例</h3>
        <p className="text-gray-700 mb-4">
          假设有一个电商系统，包含用户、商品、订单等多个业务模块。原始架构是<strong>单库单表</strong>，
          现在进行垂直拆分，将不同模块分配到不同数据库。
        </p>

        <CodeBlock
          language="sql"
          code={`-- 垂直拆分前: 单库单表
-- ecommerce_db
├── user (用户表)
├── user_address (用户地址表)
├── product (商品表)
├── product_category (商品分类表)
├── order (订单表)
├── order_item (订单明细表)
└── payment (支付表)

-- 垂直拆分后: 多库
-- user_db (用户库)
├── user
└── user_address

-- product_db (商品库)
├── product
└── product_category

-- order_db (订单库)
├── order
├── order_item
└── payment`}
        />

        <h3 className="text-2xl font-bold text-gray-900 mb-4 mt-8">垂直分表示例</h3>
        <p className="text-gray-700 mb-4">
          对于字段非常多的大表（如用户表包含基础信息、扩展信息、统计信息等），可以拆分成多个相关表。
        </p>

        <CodeBlock
          language="sql"
          code={`-- 垂直分表前: 单表
CREATE TABLE user (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(50),
  password VARCHAR(100),
  email VARCHAR(100),
  phone VARCHAR(20),
  real_name VARCHAR(50),
  id_card VARCHAR(18),
  avatar_url VARCHAR(255),
  intro TEXT,
  -- 扩展字段
  province VARCHAR(50),
  city VARCHAR(50),
  address VARCHAR(255),
  -- 统计字段
  fans_count INT DEFAULT 0,
  follow_count INT DEFAULT 0,
  post_count INT DEFAULT 0,
  created_at DATETIME,
  updated_at DATETIME
);

-- 垂直分表后: 拆分为多个表
-- 1. user_base: 基础信息 (高频访问)
CREATE TABLE user_base (
  id BIGINT PRIMARY KEY,
  username VARCHAR(50),
  password VARCHAR(100),
  email VARCHAR(100),
  phone VARCHAR(20),
  avatar_url VARCHAR(255),
  created_at DATETIME,
  updated_at DATETIME
);

-- 2. user_profile: 扩展信息 (低频访问)
CREATE TABLE user_profile (
  user_id BIGINT PRIMARY KEY,
  real_name VARCHAR(50),
  id_card VARCHAR(18),
  intro TEXT,
  province VARCHAR(50),
  city VARCHAR(50),
  address VARCHAR(255)
);

-- 3. user_stats: 统计信息 (更新频繁)
CREATE TABLE user_stats (
  user_id BIGINT PRIMARY KEY,
  fans_count INT DEFAULT 0,
  follow_count INT DEFAULT 0,
  post_count INT DEFAULT 0,
  updated_at DATETIME
);`}
        />

        <div className="mt-6 bg-green-50 border-l-4 border-green-500 p-5 rounded-lg">
          <h4 className="font-bold text-gray-900 mb-2">✅ 垂直拆分的优势</h4>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>• <strong>职责清晰:</strong> 每个库/表职责单一，便于维护</li>
            <li>• <strong>降低耦合:</strong> 业务模块解耦，可独立开发部署</li>
            <li>• <strong>提升性能:</strong> 减少单表字段数，查询更快</li>
            <li>• <strong>扩展灵活:</strong> 针对性优化不同业务的数据存储</li>
          </ul>
        </div>

        <div className="mt-4 bg-yellow-50 border-l-4 border-yellow-500 p-5 rounded-lg">
          <h4 className="font-bold text-gray-900 mb-2">⚠️ 垂直拆分的挑战</h4>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>• <strong>跨库 JOIN:</strong> 需要在应用层实现数据聚合</li>
            <li>• <strong>分布式事务:</strong> 跨库操作需要分布式事务方案</li>
            <li>• <strong>成本增加:</strong> 需要维护更多数据库实例</li>
          </ul>
        </div>
      </section>

      {/* 分库分表 - 水平拆分 */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">分库分表 (二): 水平拆分</h2>

        <div className="bg-white border-2 border-blue-200 rounded-lg p-6 mb-6">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">什么是水平拆分?</h3>
          <p className="text-gray-700 mb-4">
            <strong>水平拆分</strong> 是指将<strong>同一张表的数据按某种规则分散到多个数据库或多个表中</strong>。
            水平拆分<strong>不改变表结构</strong>，只是将数据分散存储。
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-purple-50 p-4 rounded">
              <h4 className="font-bold text-purple-900 mb-2">📊 水平分库</h4>
              <p className="text-sm text-gray-700">将表数据按规则分散到不同数据库</p>
              <p className="text-xs text-gray-600 mt-2">例: 订单按用户 ID 分到 4 个库</p>
            </div>
            <div className="bg-indigo-50 p-4 rounded">
              <h4 className="font-bold text-indigo-900 mb-2">📋 水平分表</h4>
              <p className="text-sm text-gray-700">将表数据按规则分散到同一库的不同表</p>
              <p className="text-xs text-gray-600 mt-2">例: 订单表拆分为 order_0, order_1...</p>
            </div>
          </div>
        </div>

        <h3 className="text-2xl font-bold text-gray-900 mb-4">水平拆分策略</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <SolutionCard
            title="Range 范围分片"
            principle="按数据范围（如时间、ID 区间）分片，如 0-1000 万在库1，1000-2000 万在库2"
            advantages={[
              '实现简单，易于理解',
              '范围查询效率高',
              '扩容时可只需迁移部分数据'
            ]}
            limitations={[
              '数据分布不均，可能产生热点',
              '频繁扩容，成本高'
            ]}
          />
          <SolutionCard
            title="Hash 哈希分片"
            principle="按分片键（如 user_id）进行哈希计算，根据哈希值分配到不同库/表"
            advantages={[
              '数据分布均匀',
              '请求负载均衡',
              '无需频繁扩容'
            ]}
            limitations={[
              '范围查询性能差',
              '扩容需要大量数据迁移',
              '分片键选择至关重要'
            ]}
          />
        </div>

        <h3 className="text-2xl font-bold text-gray-900 mb-4 mt-8">Hash 分片示例</h3>
        <p className="text-gray-700 mb-4">
          假设订单表需要水平拆分到 4 个数据库，每个数据库 4 张表，共 16 张表。
          使用<strong> user_id 作为分片键</strong>，通过哈希计算确定数据位置。
        </p>

        <CodeBlock
          language="java"
          code={`/**
 * Hash 分片算法
 */
public class HashShardingAlgorithm {

    // 分库数
    private static final int DB_COUNT = 4;
    // 每个库的分表数
    private static final int TABLE_COUNT = 4;

    /**
     * 计算分库索引
     * 规则: hash(user_id) % 分库数
     */
    public int calculateDbIndex(Long userId) {
        int hash = Math.abs(userId.hashCode());
        return hash % DB_COUNT;
    }

    /**
     * 计算分表索引
     * 规则: hash(user_id) / 分库数 % 分表数
     */
    public int calculateTableIndex(Long userId) {
        int hash = Math.abs(userId.hashCode());
        return (hash / DB_COUNT) % TABLE_COUNT;
    }

    /**
     * 获取完整表名
     * 示例: order_db_0.order_0, order_db_1.order_2
     */
    public String getTableName(Long userId) {
        int dbIndex = calculateDbIndex(userId);
        int tableIndex = calculateTableIndex(userId);
        return String.format("order_%d", tableIndex);
    }

    /**
     * 生成真实数据源名称
     */
    public String getDataSourceName(Long userId) {
        int dbIndex = calculateDbIndex(userId);
        return String.format("ds_%d", dbIndex);
    }

    public static void main(String[] args) {
        HashShardingAlgorithm algorithm = new HashShardingAlgorithm();

        // 示例: user_id = 12345
        Long userId = 12345L;

        String dataSource = algorithm.getDataSourceName(userId);
        String table = algorithm.getTableName(userId);

        System.out.println("user_id: " + userId);
        System.out.println("数据源: " + dataSource);  // ds_1
        System.out.println("表名: " + table);         // order_1
    }
}`}
        />

        <CodeBlock
          language="sql"
          code={`-- 水平拆分结果: 4 个库，每个库 4 张表

-- order_db_0 (数据库 0)
├── order_0 (订单表 0)
├── order_1 (订单表 1)
├── order_2 (订单表 2)
└── order_3 (订单表 3)

-- order_db_1 (数据库 1)
├── order_0 (订单表 0)
├── order_1 (订单表 1)
├── order_2 (订单表 2)
└── order_3 (订单表 3)

-- order_db_2 (数据库 2)
├── order_0 (订单表 0)
├── order_1 (订单表 1)
├── order_2 (订单表 2)
└── order_3 (订单表 3)

-- order_db_3 (数据库 3)
├── order_0 (订单表 0)
├── order_1 (订单表 1)
├── order_2 (订单表 2)
└── order_3 (订单表 3)

-- 分片键选择建议:
-- 1. 选择查询频率高的字段 (如 user_id)
-- 2. 选择数据分布均匀的字段
-- 3. 避免使用枚举值少的字段 (如性别、状态)
-- 4. 避免使用递增 ID (容易产生热点)`}
        />

        <div className="mt-6 bg-blue-50 border-l-4 border-blue-500 p-5 rounded-lg">
          <h4 className="font-bold text-gray-900 mb-2">💡 分片键选择原则</h4>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>• <strong>查询频率:</strong> 优先选择 WHERE 条件中最常用的字段</li>
            <li>• <strong>数据均匀:</strong> 确保数据在各分片均匀分布</li>
            <li>• <strong>避免热点:</strong> 避免使用时间戳、序列 ID 等递增字段</li>
            <li>• <strong>业务关联:</strong> 尽量选择与业务逻辑相关的字段</li>
          </ul>
        </div>
      </section>

      {/* ShardingSphere 实战 */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">ShardingSphere 实战配置</h2>

        <div className="bg-white border-2 border-indigo-200 rounded-lg p-6 mb-6">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">什么是 ShardingSphere?</h3>
          <p className="text-gray-700 mb-4">
            <strong>ShardingSphere</strong> 是 Apache 开源的分布式数据库中间件，提供<strong>分库分表、读写分离、数据脱敏</strong>等功能。
            支持 JDBC 和 Proxy 两种模式。
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-indigo-50 p-4 rounded">
              <h4 className="font-bold text-indigo-900 mb-2">JDBC 模式</h4>
              <p className="text-sm text-gray-700">客户端模式，像使用普通 JDBC 一样使用</p>
              <p className="text-xs text-gray-600 mt-2">适合: 中小规模，低延迟</p>
            </div>
            <div className="bg-purple-50 p-4 rounded">
              <h4 className="font-bold text-purple-900 mb-2">Proxy 模式</h4>
              <p className="text-sm text-gray-700">服务端模式，对应用透明，类似 MySQL</p>
              <p className="text-xs text-gray-600 mt-2">适合: 大规模，统一管理</p>
            </div>
          </div>
        </div>

        <h3 className="text-2xl font-bold text-gray-900 mb-4">1. Maven 依赖</h3>

        <CodeBlock
          language="xml"
          code={`<!-- pom.xml -->
<dependencies>
    <!-- ShardingSphere JDBC -->
    <dependency>
        <groupId>org.apache.shardingsphere</groupId>
        <artifactId>shardingsphere-jdbc-core-spring-boot-starter</artifactId>
        <version>5.4.0</version>
    </dependency>

    <!-- 数据库驱动 -->
    <dependency>
        <groupId>mysql</groupId>
        <artifactId>mysql-connector-java</artifactId>
        <version>8.0.33</version>
    </dependency>

    <!-- 连接池 (推荐 HikariCP) -->
    <dependency>
        <groupId>com.zaxxer</groupId>
        <artifactId>HikariCP</artifactId>
    </dependency>
</dependencies>`}
        />

        <h3 className="text-2xl font-bold text-gray-900 mb-4 mt-8">2. 分库分表配置 (YAML)</h3>

        <CodeBlock
          language="yaml"
          code={`# application.yml
spring:
  shardingsphere:
    # 数据源配置
    datasource:
      names: ds0,ds1
      ds0:
        type: com.zaxxer.hikari.HikariDataSource
        driver-class-name: com.mysql.cj.jdbc.Driver
        jdbc-url: jdbc:mysql://localhost:3306/order_db_0?useSSL=false&serverTimezone=UTC
        username: root
        password: root
      ds1:
        type: com.zaxxer.hikari.HikariDataSource
        driver-class-name: com.mysql.cj.jdbc.Driver
        jdbc-url: jdbc:mysql://localhost:3306/order_db_1?useSSL=false&serverTimezone=UTC
        username: root
        password: root

    # 规则配置
    rules:
      # 分片规则
      sharding:
        # 表配置
        tables:
          # 逻辑表名: t_order (实际表: t_order_0, t_order_1)
          t_order:
            # 真实数据源: ds0.t_order_0, ds0.t_order_1, ds1.t_order_0, ds1.t_order_1
            actual-data-nodes: ds$->{0..1}.t_order_$->{0..1}
            # 分库策略
            database-strategy:
              standard:
                # 分片列
                sharding-column: user_id
                # 分片算法名称
                sharding-algorithm-name: db_mod
            # 分表策略
            table-strategy:
              standard:
                sharding-column: user_id
                sharding-algorithm-name: table_mod
            # 主键生成策略
            key-generate-strategy:
              column: order_id
              key-generator-name: snowflake

        # 分片算法
        sharding-algorithms:
          # 分库算法: user_id % 2
          db_mod:
            type: MOD
            props:
              sharding-count: 2
          # 分表算法: (user_id / 2) % 2
          table_mod:
            type: MOD
            props:
              sharding-count: 2

        # 主键生成算法
        key-generators:
          snowflake:
            type: SNOWFLAKE

    # 属性配置
    props:
      # 显示 SQL
      sql-show: true
      # 开启 SQL 解析缓存
      sql-parse-cache-able: true`}
        />

        <h3 className="text-2xl font-bold text-gray-900 mb-4 mt-8">3. Java 代码示例</h3>

        <CodeBlock
          language="java"
          code={`/**
 * 订单服务 - 使用 ShardingSphere
 */
@Service
public class OrderService {

    @Autowired
    private OrderMapper orderMapper;

    /**
     * 创建订单
     * ShardingSphere 会根据 user_id 自动路由到正确的库和表
     */
    public void createOrder(Order order) {
        // order_id 会自动生成（雪花算法）
        // 根据 user_id 分片到 ds0/1 和 t_order_0/1
        orderMapper.insert(order);
    }

    /**
     * 查询订单列表 (按 user_id 查询)
     * 直接路由到对应的分片，性能高
     */
    public List<Order> getOrdersByUserId(Long userId) {
        return orderMapper.selectByUserId(userId);
    }

    /**
     * 查询单个订单 (按 order_id)
     * 注意: 如果分片键不是 order_id，会路由到所有分片查询
     */
    public Order getOrderById(Long orderId) {
        // 建议在业务层缓存 order_id -> user_id 的映射
        return orderMapper.selectById(orderId);
    }

    /**
     * 范围查询
     * 会路由到所有分片，性能较差，建议使用 ES 等方案
     */
    public List<Order> getOrdersByTimeRange(LocalDateTime start, LocalDateTime end) {
        return orderMapper.selectByTimeRange(start, end);
    }
}

/**
 * 订单 Mapper
 */
@Mapper
public interface OrderMapper {

    @Insert("INSERT INTO t_order (order_id, user_id, order_no, amount, status) " +
            "VALUES (#{orderId}, #{userId}, #{orderNo}, #{amount}, #{status})")
    void insert(Order order);

    @Select("SELECT * FROM t_order WHERE user_id = #{userId} ORDER BY create_time DESC")
    List<Order> selectByUserId(Long userId);

    @Select("SELECT * FROM t_order WHERE order_id = #{orderId}")
    Order selectById(Long orderId);

    @Select("SELECT * FROM t_order WHERE create_time BETWEEN #{start} AND #{end}")
    List<Order> selectByTimeRange(@Param("start") LocalDateTime start,
                                   @Param("end") LocalDateTime end);
}`}
        />

        <div className="mt-6 bg-yellow-50 border-l-4 border-yellow-500 p-5 rounded-lg">
          <h4 className="font-bold text-gray-900 mb-2">⚠️ ShardingSphere 使用注意事项</h4>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>• <strong>分片键必传:</strong> 查询时必须带上分片键，否则全路由，性能极差</li>
            <li>• <strong>避免跨库 JOIN:</strong> 尽量在单库内完成关联，跨库 JOIN 需要应用层聚合</li>
            <li>• <strong>范围查询优化:</strong> 对于范围查询（如时间范围），建议使用 Elasticsearch</li>
            <li>• <strong>主键生成:</strong> 使用雪花算法或 UUID，确保全局唯一</li>
            <li>• <strong>分布式事务:</strong> 跨库操作需要配合 Seata 等分布式事务框架</li>
          </ul>
        </div>
      </section>

      {/* 读写分离 */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">读写分离架构</h2>

        <div className="bg-white border-2 border-blue-200 rounded-lg p-6 mb-6">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">什么是读写分离?</h3>
          <p className="text-gray-700 mb-4">
            <strong>读写分离</strong> 是指将数据库的<strong>读操作</strong>和<strong>写操作</strong>分离到不同的服务器上。
            主库（Master）处理写请求，从库（Slave）处理读请求。
          </p>
          <div className="bg-blue-50 p-4 rounded mb-4">
            <h4 className="font-bold text-blue-900 mb-2">🎯 核心价值</h4>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• <strong>提升性能:</strong> 读操作分散到多个从库，主库专注写入</li>
              <li>• <strong>高可用:</strong> 主库故障时，可快速切换到从库</li>
              <li>• <strong>扩展性强:</strong> 可以灵活增加从库数量应对读压力</li>
            </ul>
          </div>
        </div>

        <h3 className="text-2xl font-bold text-gray-900 mb-4">MySQL 主从复制原理</h3>

        <div className="bg-white border-2 border-indigo-200 rounded-lg p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-indigo-50 p-4 rounded">
              <h4 className="font-bold text-indigo-900 mb-2">步骤1: 主库写入</h4>
              <p className="text-sm text-gray-700">
                主库执行写操作，将数据变更记录到<strong> Binary Log (binlog)</strong>
              </p>
            </div>
            <div className="bg-purple-50 p-4 rounded">
              <h4 className="font-bold text-purple-900 mb-2">步骤2: 从库同步</h4>
              <p className="text-sm text-gray-700">
                从库 I/O 线程读取主库 binlog，写入到本地的<strong> Relay Log</strong>
              </p>
            </div>
            <div className="bg-blue-50 p-4 rounded">
              <h4 className="font-bold text-blue-900 mb-2">步骤3: 从库重放</h4>
              <p className="text-sm text-gray-700">
                从库 SQL 线程读取 Relay Log 并重放，实现数据同步
              </p>
            </div>
          </div>
        </div>

        <h3 className="text-2xl font-bold text-gray-900 mb-4">ShardingSphere 读写分离配置</h3>

        <CodeBlock
          language="yaml"
          code={`# application.yml
spring:
  shardingsphere:
    datasource:
      # 主库 (写)
      master:
        type: com.zaxxer.hikari.HikariDataSource
        driver-class-name: com.mysql.cj.jdbc.Driver
        jdbc-url: jdbc:mysql://localhost:3306/demo_db?useSSL=false&serverTimezone=UTC
        username: root
        password: root

      # 从库1 (读)
      slave0:
        type: com.zaxxer.hikari.HikariDataSource
        driver-class-name: com.mysql.cj.jdbc.Driver
        jdbc-url: jdbc:mysql://localhost:3307/demo_db?useSSL=false&serverTimezone=UTC
        username: root
        password: root

      # 从库2 (读)
      slave1:
        type: com.zaxxer.hikari.HikariDataSource
        driver-class-name: com.mysql.cj.jdbc.Driver
        jdbc-url: jdbc:mysql://localhost:3308/demo_db?useSSL=false&serverTimezone=UTC
        username: root
        password: root

    rules:
      # 读写分离规则
      readwrite-splitting:
        # 数据源配置
        data-sources:
          # 读写分离数据源名称
          readwrite_ds:
            # 类型: Static (静态) / Dynamic (动态)
            type: Static
            # 负载均衡算法
            load-balancer-name: round_robin
            # 写数据源
            write-data-source-name: master
            # 读数据源列表
            read-data-source-names:
              - slave0
              - slave1

        # 负载均衡算法
        load-balancers:
          # 轮询算法
          round_robin:
            type: ROUND_ROBIN
          # 随机算法
          random:
            type: RANDOM
          # 权重算法
          weight:
            type: WEIGHT

    props:
      sql-show: true`}
        />

        <h3 className="text-2xl font-bold text-gray-900 mb-4 mt-8">Java 代码示例</h3>

        <CodeBlock
          language="java"
          code={`/**
 * 读写分离示例
 */
@Service
public class ProductService {

    @Autowired
    private ProductMapper productMapper;

    /**
     * 查询商品 - 自动路由到从库
     */
    public Product getProductById(Long productId) {
        // ShardingSphere 自动将查询路由到 slave0 或 slave1
        return productMapper.selectById(productId);
    }

    /**
     * 创建商品 - 自动路由到主库
     */
    public void createProduct(Product product) {
        // ShardingSphere 自动将写入路由到 master
        productMapper.insert(product);
    }

    /**
     * 更新商品 - 自动路由到主库
     */
    public void updateProduct(Product product) {
        // 强制主库查询，确保数据一致性
        Product dbProduct = productMapper.selectByIdForUpdate(product.getId());

        // 更新操作路由到主库
        productMapper.updateById(product);
    }

    /**
     * 强制主库查询场景
     * 在某些业务场景下，写完立即读，需要强制从主库查询
     */
    @Transactional
    public Product createAndQuery(Product product) {
        // 1. 写入主库
        productMapper.insert(product);

        // 2. 同一事务内，查询会自动走主库
        Product savedProduct = productMapper.selectById(product.getId());

        return savedProduct;
    }

    /**
     * HintManager 强制主库查询
     */
    public Product getProductFromMaster(Long productId) {
        // 使用 HintManager 强制路由到主库
        try (HintManager hintManager = HintManager.getInstance()) {
            hintManager.setWriteRouteOnly();
            return productMapper.selectById(productId);
        }
    }
}`}
        />

        <div className="mt-6 bg-blue-50 border-l-4 border-blue-500 p-5 rounded-lg">
          <h4 className="font-bold text-gray-900 mb-2">💡 读写分离最佳实践</h4>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>• <strong>主从延迟:</strong> 典型延迟在几十毫秒到几秒，对实时性要求高的场景需要强制主库查询</li>
            <li>• <strong>事务内查询:</strong> 同一事务内的查询自动走主库，避免脏读</li>
            <li>• <strong>负载均衡:</strong> 推荐使用轮询或权重算法，确保从库负载均匀</li>
            <li>• <strong>从库监控:</strong> 监控从库延迟，延迟过大时及时告警</li>
            <li>• <strong>一主多从:</strong> 建议至少配置 2 个从库，避免单点故障</li>
          </ul>
        </div>
      </section>

      {/* 数据同步 - Canal CDC */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">数据同步 - Canal CDC</h2>

        <div className="bg-white border-2 border-green-200 rounded-lg p-6 mb-6">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">什么是 Canal?</h3>
          <p className="text-gray-700 mb-4">
            <strong>Canal</strong> 是阿里巴巴开源的 MySQL binlog 增量订阅&消费组件。
            通过<strong>模拟 MySQL Slave 的交互协议</strong>，将自己伪装为 MySQL Slave，
            向 MySQL Master 发送 dump 协议，获取 binlog 并解析。
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-green-50 p-4 rounded">
              <h4 className="font-bold text-green-900 mb-2">🎯 典型应用场景</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• 数据库镜像 / 备份</li>
                <li>• 异地多活数据同步</li>
                <li>• 缓存更新 (Redis/Elasticsearch)</li>
                <li>• 数据湖归档</li>
                <li>• 实时数据仓库</li>
              </ul>
            </div>
            <div className="bg-blue-50 p-4 rounded">
              <h4 className="font-bold text-blue-900 mb-2">✨ 核心优势</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• 实时性高，秒级同步</li>
                <li>• 对源库侵入小</li>
                <li>• 解耦生产者和消费者</li>
                <li>• 支持过滤、路由</li>
              </ul>
            </div>
          </div>
        </div>

        <h3 className="text-2xl font-bold text-gray-900 mb-4">1. MySQL 开启 binlog</h3>

        <CodeBlock
          language="yaml"
          code={`# my.cnf (MySQL 配置文件)
[mysqld]
# 开启 binlog
log-bin=mysql-bin
# binlog 格式 (ROW 格式最详细)
binlog-format=ROW
# 需要同步的数据库
binlog-do-db=demo_db
# server_id (必须唯一)
server_id=1

# 重启 MySQL
# systemctl restart mysql`}
        />

        <h3 className="text-2xl font-bold text-gray-900 mb-4 mt-8">2. Canal 配置文件</h3>

        <CodeBlock
          language="yaml"
          code={`# conf/example/instance.properties
## MySQL 地址
canal.instance.master.address=127.0.0.1:3306
## MySQL 用户名密码
canal.instance.dbUsername=canal
canal.instance.dbPassword=canal
## 需要同步的数据库
canal.instance.filter.regex=demo_db\\..*
## binlog 文件名
canal.instance.master.journal.name=
## binlog 偏移量
canal.instance.master.position=
## 连接超时时间
canal.instance.master.connectionTimeoutInSeconds=30
## 字符集
canal.instance.connectionCharset=UTF-8
## binlog 解析线程数
canal.instance.parser.parallelThreadSize=8`}
        />

        <h3 className="text-2xl font-bold text-gray-900 mb-4 mt-8">3. Java 客户端示例</h3>

        <CodeBlock
          language="java"
          code={`/**
 * Canal Client 示例 - 订阅 MySQL binlog
 */
@Component
public class CanalClient {

    private static final Logger log = LoggerFactory.getLogger(CanalClient.class);

    /**
     * 启动 Canal 客户端
     */
    @PostConstruct
    public void start() {
        // 创建 Canal 连接
        CanalConnector connector = CanalConnectors.newSingleConnector(
            new InetSocketAddress("127.0.0.1", 11111),
            "example",  // destination
            "",         // username
            ""          // password
        );

        try {
            // 连接 Canal Server
            connector.connect();
            // 订阅所有表
            connector.subscribe(".*\\..*");
            // 回滚到上次消费的位置
            connector.rollback();

            while (true) {
                // 获取消息 (每次获取 100 条，无超时)
                Message message = connector.getWithoutAck(100);
                long batchId = message.getId();
                int size = message.getEntries().size();

                if (batchId == -1 || size == 0) {
                    // 无数据，休眠 1 秒
                    Thread.sleep(1000);
                } else {
                    // 处理 binlog 消息
                    processEntries(message.getEntries());
                }

                // 确认消息
                connector.ack(batchId);
            }
        } catch (Exception e) {
            log.error("Canal 客户端异常", e);
        } finally {
            connector.disconnect();
        }
    }

    /**
     * 处理 binlog Entry
     */
    private void processEntries(List<CanalEntry.Entry> entries) {
        for (CanalEntry.Entry entry : entries) {
            // 跳过事务开始/结束
            if (entry.getEntryType() == CanalEntry.EntryType.TRANSACTIONBEGIN ||
                entry.getEntryType() == CanalEntry.EntryType.TRANSACTIONEND) {
                continue;
            }

            // 获取 RowChange
            CanalEntry.RowChange rowChange;
            try {
                rowChange = CanalEntry.RowChange.parseFrom(entry.getStoreValue());
            } catch (Exception e) {
                log.error("解析 RowChange 失败", e);
                continue;
            }

            // 获取事件类型 (INSERT/UPDATE/DELETE)
            CanalEntry.EventType eventType = rowChange.getEventType();

            // 遍历每一行数据
            for (CanalEntry.RowData rowData : rowChange.getRowDatasList()) {
                String tableName = entry.getHeader().getTableName();
                String schemaName = entry.getHeader().getSchemaName();

                log.info("数据库: {}, 表: {}, 操作: {}", schemaName, tableName, eventType);

                // 根据操作类型处理
                switch (eventType) {
                    case INSERT:
                        handleInsert(tableName, rowData.getAfterColumnsList());
                        break;
                    case UPDATE:
                        handleUpdate(tableName, rowData.getBeforeColumnsList(),
                                              rowData.getAfterColumnsList());
                        break;
                    case DELETE:
                        handleDelete(tableName, rowData.getBeforeColumnsList());
                        break;
                    default:
                        break;
                }
            }
        }
    }

    /**
     * 处理 INSERT 事件
     */
    private void handleInsert(String tableName, List<CanalEntry.Column> columns) {
        log.info("INSERT into table: {}", tableName);

        Map<String, String> data = new HashMap<>();
        for (CanalEntry.Column column : columns) {
            data.put(column.getName(), column.getValue());
            log.info("  {} = {}", column.getName(), column.getValue());
        }

        // 业务处理: 同步到 Redis / ES / MQ 等
        syncData(tableName, "INSERT", data);
    }

    /**
     * 处理 UPDATE 事件
     */
    private void handleUpdate(String tableName,
                              List<CanalEntry.Column> beforeColumns,
                              List<CanalEntry.Column> afterColumns) {
        log.info("UPDATE table: {}", tableName);

        Map<String, String> oldData = new HashMap<>();
        Map<String, String> newData = new HashMap<>();

        for (CanalEntry.Column column : afterColumns) {
            newData.put(column.getName(), column.getValue());

            // 判断是否更新
            if (column.getUpdated()) {
                log.info("  更新字段: {} | 旧值: {} | 新值: {}",
                    column.getName(),
                    getColumnValue(beforeColumns, column.getName()),
                    column.getValue());
            }
        }

        syncData(tableName, "UPDATE", newData);
    }

    /**
     * 处理 DELETE 事件
     */
    private void handleDelete(String tableName, List<CanalEntry.Column> columns) {
        log.info("DELETE from table: {}", tableName);

        Map<String, String> data = new HashMap<>();
        for (CanalEntry.Column column : columns) {
            data.put(column.getName(), column.getValue());
            log.info("  {} = {}", column.getName(), column.getValue());
        }

        syncData(tableName, "DELETE", data);
    }

    /**
     * 获取列值
     */
    private String getColumnValue(List<CanalEntry.Column> columns, String name) {
        return columns.stream()
            .filter(c -> c.getName().equals(name))
            .map(CanalEntry.Column::getValue)
            .findFirst()
            .orElse(null);
    }

    /**
     * 同步数据到其他存储
     */
    private void syncData(String tableName, String operation, Map<String, String> data) {
        // 示例1: 同步到 Redis
        if ("t_product".equals(tableName)) {
            Long productId = Long.valueOf(data.get("id"));
            redisTemplate.delete("product:" + productId);
            log.info("已删除 Redis 缓存: product:{}", productId);
        }

        // 示例2: 同步到 Elasticsearch
        if ("t_order".equals(tableName) && "INSERT".equals(operation)) {
            OrderDocument doc = convertToOrderDoc(data);
            elasticsearchTemplate.save(doc);
            log.info("已同步订单到 ES: {}", doc.getId());
        }

        // 示例3: 发送到消息队列
        MQMessage message = new MQMessage(tableName, operation, data);
        rocketMQTemplate.send("canal-sync-topic", message);
        log.info("已发送 MQ 消息: {}", message);
    }
}`}
        />

        <div className="mt-6 bg-green-50 border-l-4 border-green-500 p-5 rounded-lg">
          <h4 className="font-bold text-gray-900 mb-2">✅ Canal 最佳实践</h4>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>• <strong>幂等性:</strong> 消费者需要保证幂等性，避免重复消费导致数据不一致</li>
            <li>• <strong>异常重试:</strong> 消费失败需要记录并重试，避免数据丢失</li>
            <li>• <strong>监控告警:</strong> 监控 Canal 延迟，及时发现问题</li>
            <li>• <strong>数据校验:</strong> 定期对比源库和目标库数据，确保一致性</li>
            <li>• <strong>HA 部署:</strong> Canal Server 支持集群模式，避免单点故障</li>
          </ul>
        </div>
      </section>

      {/* 数据同步 - MQ 方案 */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">数据同步 - MQ 方案</h2>

        <div className="bg-white border-2 border-orange-200 rounded-lg p-6 mb-6">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">基于 MQ 的数据同步</h3>
          <p className="text-gray-700 mb-4">
            除了 Canal CDC，还可以通过<strong>消息队列</strong>实现数据同步。
            业务代码在写数据库的同时，发送消息到 MQ，消费者消费消息后同步到其他存储。
          </p>
          <div className="bg-orange-50 p-4 rounded mb-4">
            <h4 className="font-bold text-orange-900 mb-2">🎯 适用场景</h4>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• <strong>业务相关:</strong> 数据同步需要业务逻辑处理</li>
              <li>• <strong>跨服务:</strong> 需要将数据同步到其他微服务</li>
              <li>• <strong>低实时性:</strong> 对实时性要求不高，允许秒级延迟</li>
            </ul>
          </div>
        </div>

        <h3 className="text-2xl font-bold text-gray-900 mb-4">MQ 同步架构图</h3>

        <CodeBlock
          language="java"
          code={`/**
 * 订单服务 - 写入数据库后发送 MQ 消息
 */
@Service
public class OrderService {

    @Autowired
    private OrderMapper orderMapper;

    @Autowired
    private RocketMQTemplate rocketMQTemplate;

    /**
     * 创建订单
     * 1. 写入数据库
     * 2. 发送 MQ 消息同步数据
     */
    @Transactional(rollbackFor = Exception.class)
    public void createOrder(Order order) {
        // 1. 写入数据库
        orderMapper.insert(order);

        // 2. 发送 MQ 消息
        OrderSyncMessage message = new OrderSyncMessage();
        message.setOrderId(order.getId());
        message.setUserId(order.getUserId());
        message.setOrderNo(order.getOrderNo());
        message.setAmount(order.getAmount());
        message.setOperation("CREATE");
        message.setCreateTime(LocalDateTime.now());

        rocketMQTemplate.syncSend("order-sync-topic", message);

        log.info("订单创建成功，已发送同步消息: {}", order.getId());
    }
}

/**
 * 消费者 - 同步订单数据到其他存储
 */
@Component
@RocketMQMessageListener(
    topic = "order-sync-topic",
    consumerGroup = "order-sync-consumer-group"
)
public class OrderSyncConsumer implements RocketMQListener<OrderSyncMessage> {

    @Autowired
    private RedisTemplate<String, Object> redisTemplate;

    @Autowired
    private ElasticsearchRestTemplate esTemplate;

    @Autowired
    private UserClient userClient;  // Feign 客户端

    /**
     * 消费同步消息
     */
    @Override
    public void onMessage(OrderSyncMessage message) {
        try {
            log.info("收到订单同步消息: {}", message);

            // 1. 同步到 Redis (缓存)
            syncToRedis(message);

            // 2. 同步到 Elasticsearch (搜索)
            syncToElasticsearch(message);

            // 3. 通知用户服务 (跨服务同步)
            notifyUserService(message);

        } catch (Exception e) {
            log.error("订单同步失败: {}", message, e);
            // 抛出异常，触发 MQ 重试
            throw new RuntimeException("订单同步失败", e);
        }
    }

    /**
     * 同步到 Redis
     */
    private void syncToRedis(OrderSyncMessage message) {
        String key = "order:" + message.getOrderId();

        if ("CREATE".equals(message.getOperation()) ||
            "UPDATE".equals(message.getOperation())) {
            // 写入/更新缓存
            OrderCache cache = new OrderCache();
            cache.setOrderId(message.getOrderId());
            cache.setOrderNo(message.getOrderNo());
            cache.setAmount(message.getAmount());
            cache.setCreateTime(message.getCreateTime());

            redisTemplate.opsForValue().set(key, cache, 30, TimeUnit.MINUTES);
            log.info("已同步订单到 Redis: {}", key);

        } else if ("DELETE".equals(message.getOperation())) {
            // 删除缓存
            redisTemplate.delete(key);
            log.info("已删除 Redis 缓存: {}", key);
        }
    }

    /**
     * 同步到 Elasticsearch
     */
    private void syncToElasticsearch(OrderSyncMessage message) {
        OrderDocument document = new OrderDocument();
        document.setId(message.getOrderId());
        document.setOrderNo(message.getOrderNo());
        document.setUserId(message.getUserId());
        document.setAmount(message.getAmount());
        document.setCreateTime(message.getCreateTime());

        if ("CREATE".equals(message.getOperation()) ||
            "UPDATE".equals(message.getOperation())) {
            esTemplate.save(document);
            log.info("已同步订单到 ES: {}", document.getId());

        } else if ("DELETE".equals(message.getOperation())) {
            esTemplate.delete(message.getOrderNo(), OrderDocument.class);
            log.info("已删除 ES 文档: {}", message.getOrderNo());
        }
    }

    /**
     * 通知用户服务
     */
    private void notifyUserService(OrderSyncMessage message) {
        // 更新用户的订单数量
        userClient.updateOrderCount(message.getUserId());
        log.info("已通知用户服务更新订单统计");
    }
}`}
        />

        <div className="mt-6 bg-yellow-50 border-l-4 border-yellow-500 p-5 rounded-lg">
          <h4 className="font-bold text-gray-900 mb-2">⚠️ MQ 同方案的注意事项</h4>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>• <strong>一致性:</strong> DB 写入 + MQ 发送不是原子操作，需要本地消息表或事务消息保证一致性</li>
            <li>• <strong>顺序性:</strong> 同一订单的消息需要顺序消费，使用消息队列的顺序消息特性</li>
            <li>• <strong>幂等性:</strong> 消费者必须实现幂等性，避免重复消费导致数据不一致</li>
            <li>• <strong>重试机制:</strong> 设置合理的重试次数和超时时间，避免长时间阻塞</li>
          </ul>
        </div>
      </section>

      {/* 多租户数据隔离 */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">多租户数据隔离方案</h2>

        <div className="bg-white border-2 border-purple-200 rounded-lg p-6 mb-6">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">什么是多租户?</h3>
          <p className="text-gray-700 mb-4">
            <strong>多租户 (Multi-Tenancy)</strong> 是指单个应用实例为多个租户（客户）提供服务。
            每个租户的数据需要<strong>严格隔离</strong>，同时需要兼顾<strong>性能</strong>和<strong>成本</strong>。
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-purple-50 p-4 rounded">
              <h4 className="font-bold text-purple-900 mb-2">独立数据库</h4>
              <p className="text-xs text-gray-700">每个租户一个独立数据库</p>
              <p className="text-xs text-purple-600 mt-2">隔离性: ⭐⭐⭐⭐⭐</p>
              <p className="text-xs text-purple-600">成本: ⭐⭐⭐⭐⭐</p>
            </div>
            <div className="bg-indigo-50 p-4 rounded">
              <h4 className="font-bold text-indigo-900 mb-2">共享数据库独立 Schema</h4>
              <p className="text-xs text-gray-700">共享数据库，不同 Schema</p>
              <p className="text-xs text-indigo-600 mt-2">隔离性: ⭐⭐⭐⭐</p>
              <p className="text-xs text-indigo-600">成本: ⭐⭐⭐⭐</p>
            </div>
            <div className="bg-blue-50 p-4 rounded">
              <h4 className="font-bold text-blue-900 mb-2">共享数据库共享 Schema</h4>
              <p className="text-xs text-gray-700">通过 tenant_id 字段隔离</p>
              <p className="text-xs text-blue-600 mt-2">隔离性: ⭐⭐⭐</p>
              <p className="text-xs text-blue-600">成本: ⭐⭐</p>
            </div>
          </div>
        </div>

        <h3 className="text-2xl font-bold text-gray-900 mb-4">方案1: tenant_id 字段隔离</h3>

        <CodeBlock
          language="sql"
          code={`-- 共享数据库共享 Schema 方案
-- 在每个表中添加 tenant_id 字段

-- 租户表
CREATE TABLE tenant (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  tenant_name VARCHAR(100) NOT NULL,
  status TINYINT DEFAULT 1,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 用户表 (添加 tenant_id)
CREATE TABLE user (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  tenant_id BIGINT NOT NULL,  -- 租户 ID
  username VARCHAR(50) NOT NULL,
  password VARCHAR(100) NOT NULL,
  email VARCHAR(100),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY uk_tenant_username (tenant_id, username),  -- 租户内唯一
  KEY idx_tenant_id (tenant_id)  -- 租户 ID 索引
);

-- 订单表 (添加 tenant_id)
CREATE TABLE orders (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  tenant_id BIGINT NOT NULL,  -- 租户 ID
  user_id BIGINT NOT NULL,
  order_no VARCHAR(64) NOT NULL,
  amount DECIMAL(10, 2) NOT NULL,
  status TINYINT DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  KEY idx_tenant_id (tenant_id),
  KEY idx_tenant_user (tenant_id, user_id)
);

-- 查询时必须带 tenant_id
SELECT * FROM user WHERE tenant_id = 1 AND username = 'admin';
SELECT * FROM orders WHERE tenant_id = 1 AND user_id = 100;`}
        />

        <h3 className="text-2xl font-bold text-gray-900 mb-4 mt-8">方案2: MyBatis-Plus 多租户插件</h3>

        <CodeBlock
          language="java"
          code={`/**
 * MyBatis-Plus 多租户配置
 */
@Configuration
public class MybatisPlusConfig {

    /**
     * 多租户插件
     */
    @Bean
    public MybatisPlusInterceptor mybatisPlusInterceptor() {
        MybatisPlusInterceptor interceptor = new MybatisPlusInterceptor();

        // 添加多租户插件
        TenantLineInnerInterceptor tenantInterceptor = new TenantLineInnerInterceptor();
        tenantInterceptor.setTenantLineHandler(new TenantLineHandler() {

            /**
             * 获取当前租户 ID
             */
            @Override
            public Long getTenantId() {
                // 从 ThreadLocal 或 JWT Token 中获取租户 ID
                return TenantContext.getTenantId();
            }

            /**
             * 获取租户字段名
             */
            @Override
            public String getTenantIdColumn() {
                return "tenant_id";
            }

            /**
             * 判断是否过滤该表
             * 某些系统表（如租户表本身）不需要添加租户条件
             */
            @Override
            public boolean ignoreTable(String tableName) {
                // 忽略租户表
                return "tenant".equalsIgnoreCase(tableName);
            }
        });

        interceptor.addInnerInterceptor(tenantInterceptor);

        // 添加分页插件
        interceptor.addInnerInterceptor(new PaginationInnerInterceptor(DbType.MYSQL));

        return interceptor;
    }
}

/**
 * 租户上下文 (ThreadLocal)
 */
public class TenantContext {

    private static final ThreadLocal<Long> TENANT_ID = new ThreadLocal<>();

    /**
     * 设置租户 ID
     */
    public static void setTenantId(Long tenantId) {
        TENANT_ID.set(tenantId);
    }

    /**
     * 获取租户 ID
     */
    public static Long getTenantId() {
        Long tenantId = TENANT_ID.get();
        if (tenantId == null) {
            throw new RuntimeException("租户 ID 不能为空");
        }
        return tenantId;
    }

    /**
     * 清除租户 ID
     */
    public static void clear() {
        TENANT_ID.remove();
    }
}

/**
 * 拦截器 - 从请求中提取租户 ID
 */
@Component
public class TenantInterceptor implements HandlerInterceptor {

    @Override
    public boolean preHandle(HttpServletRequest request,
                            HttpServletResponse response,
                            Object handler) {
        // 从 Header 中获取租户 ID
        String tenantIdStr = request.getHeader("X-Tenant-Id");

        if (tenantIdStr != null) {
            Long tenantId = Long.parseLong(tenantIdStr);
            // 设置到 ThreadLocal
            TenantContext.setTenantId(tenantId);
        }

        return true;
    }

    @Override
    public void afterCompletion(HttpServletRequest request,
                               HttpServletResponse response,
                               Object handler,
                               Exception ex) {
        // 请求结束后清除 ThreadLocal
        TenantContext.clear();
    }
}

/**
 * 用户服务 - 自动添加租户条件
 */
@Service
public class UserService {

    @Autowired
    private UserMapper userMapper;

    /**
     * 查询用户
     * MyBatis-Plus 会自动添加: WHERE tenant_id = ?
     */
    public List<User> getUsers() {
        // 原始 SQL: SELECT * FROM user
        // 实际执行: SELECT * FROM user WHERE tenant_id = 1
        return userMapper.selectList(null);
    }

    /**
     * 创建用户
     * MyBatis-Plus 会自动设置 tenant_id
     */
    public void createUser(User user) {
        // tenant_id 会被自动填充
        userMapper.insert(user);
    }

    /**
     * 跨租户查询 (需要特殊处理)
     * 使用 @InterceptorIgnore 忽略多租户插件
     */
    public List<User> getAllTenantUsers() {
        // 使用原生 SQL 或注解方式跨租户查询
        return userMapper.selectList(
            new QueryWrapper<User>()
                .apply("1=1")  // 触发原生 SQL
        );
    }
}`}
        />

        <div className="mt-6 bg-purple-50 border-l-4 border-purple-500 p-5 rounded-lg">
          <h4 className="font-bold text-gray-900 mb-2">💡 多租户最佳实践</h4>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>• <strong>租户隔离:</strong> 数据库 + 应用层双重隔离，确保数据安全</li>
            <li>• <strong>性能优化:</strong> tenant_id 必须建立索引，查询时必须带租户条件</li>
            <li>• <strong>资源配额:</strong> 对大租户进行资源限制，避免占用过多资源</li>
            <li>• <strong>数据归档:</strong> 对历史数据进行归档，保持单表数据量合理</li>
            <li>• <strong>监控告警:</strong> 监控各租户的 QPS、响应时间，发现异常租户</li>
          </ul>
        </div>
      </section>

      {/* 最佳实践总结 */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">最佳实践总结</h2>

        <div className="bg-gradient-to-r from-green-50 to-blue-50 border-2 border-green-300 rounded-lg p-6 mb-6">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">🎯 数据架构设计原则</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-lg font-bold text-green-800 mb-3">设计原则</h4>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">1.</span>
                  <span><strong>先垂直后水平:</strong> 先按业务模块拆分，再按数据量水平拆分</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">2.</span>
                  <span><strong>分片键选择:</strong> 优先选择查询频率高、数据分布均匀的字段</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">3.</span>
                  <span><strong>避免跨库 JOIN:</strong> 尽量在单库内完成关联，或通过应用层聚合</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">4.</span>
                  <span><strong>读写分离:</strong> 读多写少场景必须配置读写分离</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">5.</span>
                  <span><strong>数据同步:</strong> 实时性要求高用 Canal，允许延迟用 MQ</span>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-bold text-blue-800 mb-3">技术选型</h4>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span><strong>分库分表:</strong> ShardingSphere (推荐) / MyCAT</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span><strong>读写分离:</strong> ShardingSphere / ProxySQL</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span><strong>数据同步:</strong> Canal CDC / RocketMQ</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span><strong>分布式事务:</strong> Seata AT / TCC / SAGA</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span><strong>多租户:</strong> MyBatis-Plus 插件 / ShardingSphere</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <h3 className="text-2xl font-bold text-gray-900 mb-4">常见问题 FAQ</h3>

        <div className="space-y-4">
          <FaqCard
            number={1}
            question="分库分表后如何查询分片键不是分片键的数据?"
            answer={`这种情况会路由到所有分片，性能较差。

解决方案:
1. 在应用层缓存分片键映射: 如 order_id -> user_id 的映射
2. 使用冗余字段: 在订单表中冗余 user_id，确保查询能带上分片键
3. 使用搜索引擎: 将数据同步到 ES，通过 ES 查询
4. 使用聚合表: 定期将分片表数据聚合到一张宽表`}
            isOpen={openFaq === 1}
            onClick={() => toggleFaq(1)}
          />

          <FaqCard
            number={2}
            question="如何避免分片后的数据倾斜?"
            answer={`数据倾斜会导致某些分片数据量远超其他分片，影响性能。

解决方案:
1. 选择合适的分片键: 确保数据均匀分布
2. 使用 Hash 分片: 比范围分片更均匀
3. 分片键组合: 使用多个字段组合作为分片键
4. 动态分片: 监控数据分布，动态调整分片规则
5. 二次分片: 对倾斜的分片进行二次拆分`}
            isOpen={openFaq === 2}
            onClick={() => toggleFaq(2)}
          />

          <FaqCard
            number={3}
            question="读写分离后如何保证主从一致性?"
            answer={`主从复制存在延迟（毫秒级到秒级），可能导致刚写入的数据读不到。

解决方案:
1. 强制主库查询: 使用 HintManager.setWriteRouteOnly()
2. 延迟双删: 写入后延迟 500ms 再删除缓存
3. 事务内查询: 同一事务内的查询自动走主库
4. 版本号机制: 在数据中增加版本号，读取时比较版本号
5. 实时性要求高的业务直接查询主库`}
            isOpen={openFaq === 3}
            onClick={() => toggleFaq(3)}
          />

          <FaqCard
            number={4}
            question="分库分表后如何处理分布式事务?"
            answer={`跨库操作无法使用本地事务，需要分布式事务方案。

解决方案:
1. Seata AT 模式: 对业务代码侵入小，推荐使用
2. Seata TCC 模式: 一致性更高，但需要编写三个接口
3. 消息最终一致性: 基于 MQ 的最终一致性方案
4. Saga 模式: 长事务场景，适合跨服务编排
5. 尽量避免跨库事务: 通过业务设计规避跨库操作`}
            isOpen={openFaq === 4}
            onClick={() => toggleFaq(4)}
          />

          <FaqCard
            number={5}
            question="如何平滑扩容分库分表?"
            answer={`分库分表扩容需要大量数据迁移，容易造成业务中断。

解决方案:
1. 翻倍扩容: 每次扩容数量翻倍，便于 Hash 计算
2. 双写方案: 新老库双写，数据同步后切换
3. 停服扩容: 选择业务低峰期，停止服务后迁移
4. 在线迁移: 使用中间件（如 ShardingSphere）的弹性迁移能力
5. 预留分片: 初始分片时预留一定空间，减少扩容次数`}
            isOpen={openFaq === 5}
            onClick={() => toggleFaq(5)}
          />

          <FaqCard
            number={6}
            question="多租户场景下如何防止资源抢占?"
            answer={`大租户可能占用过多资源，影响小租户体验。

解决方案:
1. 资源配额: 对每个租户的 QPS、存储空间设置上限
2. 优先级队列: 根据租户等级设置不同的优先级
3. 独立资源: VIP 租户使用独立的数据库实例
4. 限流降级: 对超租户的请求进行限流
5. 监控告警: 实时监控各租户资源使用情况，及时扩容`}
            isOpen={openFaq === 6}
            onClick={() => toggleFaq(6)}
          />
        </div>

        <div className="mt-6 bg-indigo-50 border-l-4 border-indigo-500 p-5 rounded-lg">
          <h4 className="font-bold text-gray-900 mb-2">📚 推荐阅读</h4>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>• <strong>ShardingSphere 官方文档:</strong> https://shardingsphere.apache.org</li>
            <li>• <strong>Canal GitHub:</strong> https://github.com/alibaba/canal</li>
            <li>• <strong>《大数据架构之道》:</strong> 了解数据架构设计原理</li>
            <li>• <strong>《数据库事务处理的艺术》:</strong> 深入理解事务原理</li>
          </ul>
        </div>
      </section>

      {/* 页脚 */}
      <div className="bg-gradient-to-r from-purple-100 to-indigo-100 border-2 border-purple-200 rounded-lg p-6 mt-12">
        <h3 className="text-xl font-bold text-gray-900 mb-3">🎓 学习检查清单</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">理论理解</h4>
            <ul className="space-y-1 text-gray-700">
              <li>☐ 理解垂直拆分和水平拆分的区别</li>
              <li>☐ 掌握分片键的选择原则</li>
              <li>☐ 理解主从复制原理</li>
              <li>☐ 了解 Canal CDC 工作机制</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">实践能力</h4>
            <ul className="space-y-1 text-gray-700">
              <li>☐ 能够配置 ShardingSphere 分库分表</li>
              <li>☐ 能够配置读写分离</li>
              <li>☐ 能够使用 Canal 进行数据同步</li>
              <li>☐ 能够实现多租户数据隔离</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
