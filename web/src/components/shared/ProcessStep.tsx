import React from 'react';

export interface ProcessStepProps {
  step: string;
  title: string;
  description: string;
  details?: string[];
  color?: 'blue' | 'green' | 'purple' | 'amber' | 'indigo' | 'emerald';
}

export const ProcessStep: React.FC<ProcessStepProps> = ({
  step,
  title,
  description,
  details,
  color = 'blue'
}) => {
  const colorClasses: Record<string, string> = {
    blue: 'bg-blue-600',
    green: 'bg-green-600',
    purple: 'bg-purple-600',
    amber: 'bg-amber-600',
    indigo: 'bg-indigo-600',
    emerald: 'bg-emerald-600',
  };

  return (
    <div className="flex items-start">
      <span
        className={`flex-shrink-0 w-8 h-8 ${colorClasses[color]} text-white rounded-full flex items-center justify-center text-sm font-bold mr-4`}
      >
        {step}
      </span>
      <div className="flex-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
        <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-1">{title}</h4>
        <p className="text-sm text-gray-700 dark:text-gray-200 mb-3">{description}</p>
        {details && details.length > 0 && (
          <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
            {details.map((detail, index) => (
              <li key={index}>• {detail}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
