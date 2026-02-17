import React from 'react';

export interface FaqCardProps {
  number: number;
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
}

export const FaqCard: React.FC<FaqCardProps> = ({
  number,
  question,
  answer,
  isOpen,
  onClick
}) => {
  return (
    <div className="bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
      <button
        onClick={onClick}
        className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
      >
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
          {number}. {question}
        </h3>
        <svg
          className={`w-5 h-5 text-gray-500 dark:text-gray-400 transition-transform flex-shrink-0 ml-4 ${
            isOpen ? 'rotate-180' : ''
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      {isOpen && (
        <div className="px-6 pb-4 text-gray-700 dark:text-gray-200 text-sm whitespace-pre-line">
          {answer}
        </div>
      )}
    </div>
  );
};
