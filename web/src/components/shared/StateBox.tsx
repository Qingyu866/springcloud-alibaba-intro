import React from 'react';

export interface StateBoxProps {
  status: 'success' | 'warning' | 'error' | 'info';
  title: string;
  children?: React.ReactNode;
}

export const StateBox: React.FC<StateBoxProps> = ({ status, title, children }) => {
  const statusClasses: Record<string, { bg: string; border: string; icon: string }> = {
    success: {
      bg: 'bg-green-50 dark:bg-green-900/30',
      border: 'border-green-500',
      icon: '✅',
    },
    warning: {
      bg: 'bg-yellow-50 dark:bg-yellow-900/30',
      border: 'border-yellow-500',
      icon: '⚠️',
    },
    error: {
      bg: 'bg-red-50 dark:bg-red-900/30',
      border: 'border-red-500',
      icon: '❌',
    },
    info: {
      bg: 'bg-blue-50 dark:bg-blue-900/30',
      border: 'border-blue-500',
      icon: '💡',
    },
  };

  const { bg, border, icon } = statusClasses[status];

  return (
    <div className={`${bg} border-l-4 ${border} p-6 rounded-lg mb-6`}>
      <h4 className="font-bold text-gray-900 dark:text-white mb-2">
        {icon} {title}
      </h4>
      {children && <div className="text-gray-700 dark:text-gray-200 text-sm">{children}</div>}
    </div>
  );
};
