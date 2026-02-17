import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { navigationData } from '../data/navigation';

// 难度等级图标和颜色
const levelConfig = {
  beginner: {
    icon: '🌱',
    label: '新手',
    color: 'text-green-600',
    bgColor: 'bg-green-50',
  },
  intermediate: {
    icon: '🔧',
    label: '进阶',
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
  },
  architect: {
    icon: '🏗️',
    label: '架构师',
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
  },
};

export const Sidebar: React.FC = () => {
  const location = useLocation();
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set(['🌱 快速入门']));

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
    <aside className="w-72 bg-white border-r border-gray-200 h-[calc(100vh-4rem)] overflow-y-auto sticky top-16">
      <nav className="px-4 py-6">
        {/* 学习路径快捷入口 */}
        <div className="mb-6 p-4 bg-gradient-to-br from-primary-50 to-primary-100 rounded-lg">
          <h3 className="text-sm font-bold text-gray-900 mb-2">推荐学习路径</h3>
          <div className="space-y-2">
            <a href="/learning-path" className="flex items-center text-sm text-primary-700 hover:text-primary-900">
              <span className="mr-1">🌱</span>
              <span>新人路径 (8步)</span>
            </a>
            <a href="/learning-path" className="flex items-center text-sm text-primary-700 hover:text-primary-900">
              <span className="mr-1">🏗️</span>
              <span>架构师速通 (8步)</span>
            </a>
          </div>
        </div>

        {/* 导航分组 */}
        <ul className="space-y-4">
          {navigationData.map((group) => {
            const isExpanded = expandedGroups.has(group.title);

            return (
              <li key={group.title} className="border-b border-gray-100 last:border-0 pb-3">
                {/* 组标题 */}
                <button
                  onClick={() => toggleGroup(group.title)}
                  className="flex items-center justify-between w-full text-left px-3 py-2 text-sm font-bold text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
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

                {/* 组描述 */}
                {group.description && isExpanded && (
                  <p className="text-xs text-gray-500 px-3 py-2 italic border-l-2 border-gray-200 ml-3">
                    {group.description}
                  </p>
                )}

                {/* 组内链接 */}
                {isExpanded && (
                  <ul className="mt-2 space-y-1">
                    {group.items.map((item) => {
                      const isActive = item.path === location.pathname;
                      const level = item.level ? levelConfig[item.level] : null;

                      return (
                        <li key={item.path}>
                          <Link
                            to={item.path}
                            className={`block px-3 py-2 text-sm rounded-lg transition-colors ${
                              isActive
                                ? 'bg-primary-50 text-primary-700 font-medium border-l-4 border-primary-500'
                                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                            }`}
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
              </li>
            );
          })}
        </ul>

        {/* 难度说明 */}
        <div className="mt-6 pt-4 border-t border-gray-200">
          <h4 className="text-xs font-semibold text-gray-700 mb-2">难度等级</h4>
          <div className="space-y-1">
            <div className="flex items-center text-xs text-gray-600">
              <span className="mr-2">🌱</span>
              <span>新手友好</span>
            </div>
            <div className="flex items-center text-xs text-gray-600">
              <span className="mr-2">🔧</span>
              <span>需要基础</span>
            </div>
            <div className="flex items-center text-xs text-gray-600">
              <span className="mr-2">🏗️</span>
              <span>架构师向</span>
            </div>
          </div>
        </div>
      </nav>
    </aside>
  );
};
