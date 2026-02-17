import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { navigationData } from '../data/navigation';

export const Breadcrumb: React.FC = () => {
  const location = useLocation();
  const pathSegments = location.pathname.split('/').filter(Boolean);

  if (pathSegments.length === 0) {
    return null;
  }

  const findNavItem = (path: string) => {
    for (const group of navigationData) {
      for (const item of group.items) {
        if (item.path === path) {
          return item;
        }
      }
    }
    return null;
  };

  const findGroup = (path: string) => {
    for (const group of navigationData) {
      for (const item of group.items) {
        if (item.path === path) {
          return group;
        }
      }
    }
    return null;
  };

  const getBreadcrumbItems = () => {
    const items: { label: string; path: string }[] = [];

    const firstSegment = '/' + pathSegments[0];
    const firstItem = findNavItem(firstSegment);

    if (firstItem) {
      const group = findGroup(firstSegment);
      if (group) {
        items.push({ label: group.title.replace(/[^\u4e00-\u9fa5a-zA-Z\s]/g, '').trim(), path: '' });
      }
      items.push({ label: firstItem.label, path: firstSegment });
    }

    for (let i = 1; i < pathSegments.length; i++) {
      const path = '/' + pathSegments.slice(0, i + 1).join('/');
      const item = findNavItem(path);
      if (item) {
        items.push({ label: item.label, path });
      }
    }

    return items;
  };

  const breadcrumbItems = getBreadcrumbItems();

  if (breadcrumbItems.length === 0) {
    return null;
  }

  return (
    <nav className="flex items-center flex-wrap gap-2 text-sm text-gray-600 dark:text-gray-400 mb-6">
      <Link
        to="/"
        className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors flex items-center"
      >
        <svg
          className="w-4 h-4 mr-1"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
          />
        </svg>
        首页
      </Link>
      {breadcrumbItems.map((item, index) => (
        <React.Fragment key={index}>
          <svg
            className="w-4 h-4 text-gray-400 dark:text-gray-500"
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
          {item.path && index < breadcrumbItems.length - 1 ? (
            <Link
              to={item.path}
              className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-gray-900 dark:text-white font-medium">{item.label}</span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};
