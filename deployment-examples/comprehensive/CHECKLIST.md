# 部署检查清单

## 部署前检查

### 环境检查

- [ ] Kubernetes 版本 >= 1.25
- [ ] kubectl 已安装并配置
- [ ] helm 已安装
- [ ] Docker 已安装并登录镜像仓库
- [ ] 集群节点 >= 3个
- [ ] 节点资源配置充足 (8 CPU, 32GB RAM+)
- [ ] StorageClass 已配置
- [ ] 网络插件已安装

### 配置检查

- [ ] 镜像仓库可访问
- [ ] 所有镜像已推送
- [ ] Secrets 已创建
- [ ] ConfigMaps 已配置
- [ ] 域名证书已准备
- [ ] Ingress Controller 已安装

### 依赖服务检查

- [ ] Nacos 集群可访问
- [ ] MySQL 主从可访问
- [ ] Redis 集群可访问
- [ ] RocketMQ 可访问
- [ ] Seata TC 可访问
- [ ] Jaeger 可访问

## 部署过程检查

### 基础设施部署

- [ ] 命名空间已创建
- [ ] Secrets 已创建
- [ ] Nacos 3个Pod全部Running
- [ ] Nacos 集群模式已验证
- [ ] MySQL 3个Pod全部Running
- [ ] MySQL 主从复制已验证
- [ ] Redis 6个Pod全部Running
- [ ] Redis 集群模式已验证
- [ ] RocketMQ 2个Pod全部Running
- [ ] Seata TC 3个Pod全部Running
- [ ] Jaeger 1个PodRunning

### 业务服务部署

- [ ] Gateway 3个Pod全部Running
- [ ] Order Service 3个Pod全部Running
- [ ] User Service 3个Pod全部Running
- [ ] Flash Order Service 5个Pod全部Running
- [ ] Inventory Service 3个Pod全部Running
- [ ] Payment Service 3个Pod全部Running
- [ ] Callback Service 3个Pod全部Running
- [ ] Auth Service 3个Pod全部Running
- [ ] Permission Service 3个Pod全部Running
- [ ] Tenant Service 3个Pod全部Running
- [ ] Profile Service 3个Pod全部Running

### 监控部署

- [ ] Prometheus ServiceMonitor已创建
- [ ] Prometheus 告警规则已创建
- [ ] Grafana Dashboard已创建
- [ ] AlertManager已配置
- [ ] 告警渠道已配置

### 日志部署

- [ ] Elasticsearch 3个Pod全部Running
- [ ] Kibana 1个PodRunning
- [ ] Filebeat DaemonSet运行正常
- [ ] 日志索引已创建

## 部署后验证

### 健康检查

- [ ] 所有Pod状态为Running
- [ ] 所有Pod就绪
- [ ] 所有Service有Endpoints
- [ ] Ingress已创建并访问正常
- [ ] HPA已创建

### 功能验证

#### 服务注册

- [ ] Gateway已注册到Nacos
- [ ] 所有业务服务已注册到Nacos
- [ ] 服务实例数量正确

#### 服务调用

- [ ] Gateway可访问
- [ ] Gateway路由正常
- [ ] 订单服务可调用
- [ ] 用户服务可调用
- [ ] 秒杀服务可调用
- [ ] 库存服务可调用
- [ ] 支付服务可调用

#### 数据库连接

- [ ] MySQL主库可连接
- [ ] MySQL从库可连接
- [ ] 数据可正常读写
- [ ] 主从复制正常

#### Redis连接

- [ ] Redis集群可连接
- [ ] 数据可正常读写
- [ ] 集群模式正常

#### 消息队列

- [ ] RocketMQ可连接
- [ ] 消息可正常发送
- [ ] 消息可正常消费
- [ ] 无消息堆积

#### 分布式事务

- [ ] Seata TC可连接
- [ ] 全局事务可正常提交
- [ ] 全局事务可正常回滚

### 性能验证

- [ ] 服务响应时间正常 (P95 < 1s)
- [ ] 错误率正常 (< 1%)
- [ ] QPS达到预期
- [ ] HPA可正常扩容
- [ ] HPA可正常缩容

### 监控验证

- [ ] Prometheus数据采集正常
- [ ] Grafana Dashboard显示正常
- [ ] 告警规则已加载
- [ ] 告警通道正常
- [ ] 测试告警可发送

### 日志验证

- [ ] Elasticsearch索引正常创建
- [ ] 日志可正常采集
- [ ] Kibana可查询日志
- [ ] 日志内容完整

### 安全验证

- [ ] 所有Secret正确
- [ ] 密码符合要求
- [ ] 网络策略已配置
- [ ] TLS证书有效
- [ ] 访问控制已配置

## 运行时检查

### 日常监控

- [ ] 每日检查Pod状态
- [ ] 每日检查资源使用率
- [ ] 每日检查HPA状态
- [ ] 每日检查告警
- [ ] 每日检查日志

### 定期维护

- [ ] 每周检查磁盘使用
- [ ] 每周检查证书有效期
- [ ] 每周检查镜像版本
- [ ] 每月检查资源配额
- [ ] 每月进行备份验证

### 故障处理

- [ ] 故障响应流程已定义
- [ ] 故障处理人员已培训
- [ ] 应急预案已准备
- [ ] 备份恢复已测试
- [ ] 故障演练已完成

## 升级检查

### 升级前

- [ ] 新版本镜像已推送
- [ ] 数据库已备份
- [ ] 配置已备份
- [ ] 回滚方案已准备
- [ ] 维护窗口已确定

### 升级中

- [ ] 滚动升级正常
- [ ] 服务无中断
- [ ] 数据迁移正常
- [ ] 配置更新正常

### 升级后

- [ ] 所有Pod正常
- [ ] 功能验证通过
- [ ] 性能验证通过
- [ ] 监控正常
- [ ] 日志正常

## 灾备检查

### 数据备份

- [ ] MySQL备份已配置
- [ ] Redis备份已配置
- [ ] Elasticsearch备份已配置
- [ ] 配置备份已配置
- [ ] 备份定期验证

### 灾备演练

- [ ] 节点故障演练
- [ ] Pod故障演练
- [ ] 网络故障演练
- [ ] 存储故障演练
- [ ] 恢复演练

### 应急预案

- [ ] 主库宕机预案
- [ ] Redis集群故障预案
- [ ] 消息队列故障预案
- [ ] 服务雪崩预案
- [ ] 数据恢复预案

## 安全检查

### 访问控制

- [ ] RBAC已配置
- [ ] 最小权限原则
- [ ] 审计日志已开启
- [ ] 异常登录告警

### 网络安全

- [ ] NetworkPolicy已配置
- [ ] Ingress TLS已配置
- [ ] 服务间加密
- [ ] DDoS防护已配置

### 数据安全

- [ ] 敏感数据加密
- [ ] 备份数据加密
- [ ] 传输加密
- [ ] 密码轮换策略

## 合规检查

- [ ] 数据留存策略
- [ ] 数据脱敏策略
- [ ] 隐私保护措施
- [ ] 审计日志完整性
- [ ] 合规报告生成

## 文档检查

- [ ] 架构文档已更新
- [ ] 部署文档已更新
- [ ] 运维手册已更新
- [ ] 故障处理手册已更新
- [ ] 应急预案已更新

## 培训检查

- [ ] 运维人员已培训
- [ ] 开发人员已培训
- [ ] 安全培训已完成
- [ ] 应急演练已完成
- [ ] 知识传递已完成
