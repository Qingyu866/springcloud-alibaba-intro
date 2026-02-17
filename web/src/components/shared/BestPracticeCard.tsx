import React from 'react';

export interface BestPracticeCardProps {
  title: string;
  practices: string[];
  icon?: string;
}

export const BestPracticeCard: React.FC<BestPracticeCardProps> = ({
  title,
  practices,
  icon = '✓'
}) => {
  return (
    <div className="bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-lg p-5">
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">{title}</h3>
      <ul className="space-y-2">
        {practices.map((practice, index) => (
          <li key={index} className="flex items-start">
            <span className="text-green-600 dark:text-green-400 mr-2 flex-shrink-0">{icon}</span>
            <span className="text-sm text-gray-700 dark:text-gray-200">{practice}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
