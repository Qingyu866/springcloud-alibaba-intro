
interface ConceptCardProps {
  title: string;
  description: string;
  example: string;
}

const ConceptCard: React.FC<ConceptCardProps> = ({ title, description, example }) => (
  <div className="bg-white border-2 border-slate-200 rounded-lg p-5">
    <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
    <p className="text-sm text-gray-700 mb-3">{description}</p>
    <div className="bg-gray-50 p-3 rounded">
      <code className="text-xs text-gray-800">{example}</code>
    </div>
  </div>
);

export const ConfigAdvancedPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="bg-gradient-to-r from-slate-700 to-slate-900 text-white rounded-lg p-6 mb-8">
        <h1 className="text-4xl font-bold mb-2">配置管理高级</h1>
        <p className="text-slate-200 text-lg">微服务配置管理进阶与实践</p>
        <div className="flex gap-3 text-sm mt-4">
          <span className="px-3 py-1 bg-white/20 rounded-full">🏗️ 架构师</span>
          <span className="px-3 py-1 bg-white/20 rounded-full">⏱️ 约50分钟</span>
        </div>
      </div>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">高级配置特性</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ConceptCard title="配置加密" description="敏感配置加密存储" example="jasypt.encryptor.password=xxx" />
          <ConceptCard title="版本控制" description="配置变更追溯" example="Git + Nacos" />
          <ConceptCard title="灰度发布" description="按用户/地域推送" example="config.beta.yaml" />
          <ConceptCard title="热更新" description="配置自动推送" example="@RefreshScope" />
        </div>
      </section>
    </div>
  );
};
