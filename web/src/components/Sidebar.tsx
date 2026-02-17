import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { navigationData } from '../data/navigation';

const levelConfig = {
  beginner: {
    icon: '🌱',
    label: '新手',
    color: 'text-green-600 dark:text-green-400',
    bgColor: 'bg-green-50 dark:bg-green-900/30',
  },
  intermediate: {
    icon: '🔧',
    label: '进阶',
    color: 'text-blue-600 dark:text-blue-400',
    bgColor: 'bg-blue-50 dark:bg-blue-900/30',
  },
  architect: {
    icon: '🏗️',
    label: '架构师',
    color: 'text-purple-600 dark:text-purple-400',
    bgColor: 'bg-purple-50 dark:bg-purple-900/30',
  },
};

export const Sidebar: React.FC = () => {
  const location = useLocation();
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set(['🌱 快速入门', '📦 核心组件', '🏗️ 架构师进阶']));

  const toggleGroup = (title: string) => {
    const newExpanded = new Set(expandedGroups);
    if (newExpanded.has(title)) {
      newExpanded.delete(title);
    } else {
      newExpanded.add(title);
    }
    setExpandedGroups(newExpanded);
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-content">
        <Link to="/" className="sidebar-logo">
          <div className="sidebar-logo-icon">
            <svg className="sidebar-logo-svg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
            </svg>
          </div>
          <div>
            <h1 className="sidebar-logo-title">Spring Cloud Alibaba</h1>
            <p className="sidebar-logo-subtitle">完整指南</p>
          </div>
        </Link>

        <div className="mb-6 p-4 bg-primary-50 dark:bg-primary-900/20 rounded-lg border border-primary-200 dark:border-primary-700">
          <h3 className="text-sm font-bold text-gray-900 dark:text-gray-100 mb-2">推荐学习路径</h3>
          <div className="space-y-2">
            <Link to="/learning-path" className="flex items-center text-sm text-primary-700 dark:text-primary-300 hover:text-primary-900 dark:hover:text-primary-200 transition-colors">
              <span className="mr-1">🌱</span>
              <span>新人路径 (8步)</span>
            </Link>
            <Link to="/learning-path" className="flex items-center text-sm text-primary-700 dark:text-primary-300 hover:text-primary-900 dark:hover:text-primary-200 transition-colors">
              <span className="mr-1">🏗️</span>
              <span>架构师速通 (8步)</span>
            </Link>
          </div>
        </div>

        <div className="space-y-6">
          {navigationData.map((group) => {
            const isExpanded = expandedGroups.has(group.title);

            return (
              <div key={group.title} className="sidebar-nav-group">
                <button
                  onClick={() => toggleGroup(group.title)}
                  className="flex items-center justify-between w-full text-left px-3 py-2 text-sm font-bold text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors"
                >
                  <span>{group.title}</span>
                  <svg
                    className={`w-4 h-4 transition-transform flex-shrink-0 ${
                      isExpanded ? 'rotate-90' : ''
                    }`}
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
                </button>

                {group.description && isExpanded && (
                  <p className="text-xs text-gray-500 dark:text-gray-400 px-3 py-2 italic border-l-2 border-gray-200 dark:border-gray-600 ml-3">
                    {group.description}
                  </p>
                )}

                {isExpanded && (
                  <ul className="sidebar-nav-list mt-2">
                    {group.items.map((item) => {
                      const isActive = item.path === location.pathname;
                      const level = item.level ? levelConfig[item.level] : null;

                      return (
                        <li key={item.path}>
                          <Link
                            to={item.path}
                            className={`sidebar-nav-link ${isActive ? 'active' : ''}`}
                          >
                            <div className="flex items-center justify-between">
                              <span className="flex-1">{item.label}</span>
                              {level && (
                                <span
                                  className={`ml-2 px-1.5 py-0.5 text-xs rounded ${level.bgColor} ${level.color}`}
                                  title={level.label}
                                >
                                  {level.icon}
                                </span>
                              )}
                            </div>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
          <h4 className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">难度等级</h4>
          <div className="space-y-1">
            <div className="flex items-center text-xs text-gray-600 dark:text-gray-400">
              <span className="mr-2">🌱</span>
              <span>新手友好</span>
            </div>
            <div className="flex items-center text-xs text-gray-600 dark:text-gray-400">
              <span className="mr-2">🔧</span>
              <span>需要基础</span>
            </div>
            <div className="flex items-center text-xs text-gray-600 dark:text-gray-400">
              <span className="mr-2">🏗️</span>
              <span>架构师向</span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};
