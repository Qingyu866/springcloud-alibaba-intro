import React from 'react';

export interface PageHeaderProps {
  title: string;
  description: string;
  level?: 'architect' | 'intermediate' | 'beginner';
  duration?: string;
  topics?: number;
  gradient?: 'indigo' | 'emerald' | 'amber' | 'slate' | 'purple';
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  description,
  level = 'architect',
  duration = '约45分钟',
  topics = 8,
  gradient = 'indigo'
}) => {
  const gradientClasses: Record<string, string> = {
    indigo: 'from-indigo-600 to-purple-700',
    emerald: 'from-emerald-600 to-teal-700',
    amber: 'from-amber-600 to-orange-700',
    slate: 'from-slate-700 to-slate-900',
    purple: 'from-purple-600 to-indigo-700',
  };

  const levelLabels: Record<string, string> = {
    architect: '🏗️ 架构师',
    intermediate: '🔧 进阶',
    beginner: '🌱 新手',
  };

  return (
    <div className={`bg-gradient-to-r ${gradientClasses[gradient]} text-white rounded-xl p-6 mb-8`}>
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2">{title}</h1>
          <p className="text-lg opacity-90">{description}</p>
        </div>
        <div className="flex gap-3 text-sm">
          <span className="px-3 py-1 bg-white/20 rounded-full">
            {levelLabels[level]}
          </span>
          <span className="px-3 py-1 bg-white/20 rounded-full">⏱️ {duration}</span>
          <span className="px-3 py-1 bg-white/20 rounded-full">📚 {topics}个知识点</span>
        </div>
      </div>
    </div>
  );
};
