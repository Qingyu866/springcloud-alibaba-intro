import React from 'react';

export interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
  color?: 'blue' | 'orange' | 'purple' | 'green' | 'red' | 'indigo';
}

export const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  description,
  color = 'blue'
}) => {
  const colorClasses: Record<string, string> = {
    blue: 'bg-blue-50 dark:bg-blue-900/30 border-blue-200 dark:border-blue-700',
    orange: 'bg-orange-50 dark:bg-orange-900/30 border-orange-200 dark:border-orange-700',
    purple: 'bg-purple-50 dark:bg-purple-900/30 border-purple-200 dark:border-purple-700',
    green: 'bg-green-50 dark:bg-green-900/30 border-green-200 dark:border-green-700',
    red: 'bg-red-50 dark:bg-red-900/30 border-red-200 dark:border-red-700',
    indigo: 'bg-indigo-50 dark:bg-indigo-900/30 border-indigo-200 dark:border-indigo-700',
  };

  const iconBgClasses: Record<string, string> = {
    blue: 'bg-blue-100 dark:bg-blue-800/50',
    orange: 'bg-orange-100 dark:bg-orange-800/50',
    purple: 'bg-purple-100 dark:bg-purple-800/50',
    green: 'bg-green-100 dark:bg-green-800/50',
    red: 'bg-red-100 dark:bg-red-800/50',
    indigo: 'bg-indigo-100 dark:bg-indigo-800/50',
  };

  return (
    <div className={`p-6 border-2 ${colorClasses[color]} rounded-xl`}>
      <div className={`w-10 h-10 ${iconBgClasses[color]} rounded-lg flex items-center justify-center text-xl mb-4`}>
        {icon}
      </div>
      <h4 className="font-semibold text-gray-900 dark:text-white mb-2">{title}</h4>
      <p className="text-sm text-gray-600 dark:text-gray-400">{description}</p>
    </div>
  );
};
