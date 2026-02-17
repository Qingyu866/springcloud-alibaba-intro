import React from 'react';

export interface NextStepCardProps {
  title: string;
  description: string;
  link: string;
  icon: string;
}

export const NextStepCard: React.FC<NextStepCardProps> = ({
  title,
  description,
  link,
  icon
}) => {
  return (
    <a
      href={link}
      className="block p-4 bg-white/10 backdrop-blur rounded-lg hover:bg-white/20 transition-colors"
    >
      <div className="flex items-start">
        <span className="text-2xl mr-3">{icon}</span>
        <div className="flex-1">
          <h4 className="font-bold mb-1">{title}</h4>
          <p className="text-sm opacity-90">{description}</p>
        </div>
        <svg
          className="w-5 h-5 flex-shrink-0 ml-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </div>
    </a>
  );
};
