import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { navigationData } from '../data/navigation';

interface SearchResult {
  title: string;
  path: string;
  group: string;
  matchType: 'title' | 'group';
}

export const Search: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const searchIndex = useMemo(() => {
    const index: { title: string; path: string; group: string }[] = [];
    navigationData.forEach((group) => {
      group.items.forEach((item) => {
        index.push({
          title: item.label,
          path: item.path,
          group: group.title.replace(/[^\u4e00-\u9fa5a-zA-Z\s]/g, '').trim(),
        });
      });
    });
    return index;
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(true);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (query.trim() === '') {
      setResults([]);
      return;
    }

    const lowerQuery = query.toLowerCase();
    const matched: SearchResult[] = [];

    searchIndex.forEach((item) => {
      const titleMatch = item.title.toLowerCase().includes(lowerQuery);
      const groupMatch = item.group.toLowerCase().includes(lowerQuery);

      if (titleMatch) {
        matched.push({ ...item, matchType: 'title' });
      } else if (groupMatch) {
        matched.push({ ...item, matchType: 'group' });
      }
    });

    setResults(matched.slice(0, 10));
    setSelectedIndex(0);
  }, [query, searchIndex]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => Math.min(prev + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => Math.max(prev - 1, 0));
    } else if (e.key === 'Enter' && results[selectedIndex]) {
      navigate(results[selectedIndex].path);
      setIsOpen(false);
      setQuery('');
    }
  };

  const handleSelect = (path: string) => {
    navigate(path);
    setIsOpen(false);
    setQuery('');
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors"
      >
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <span className="hidden sm:inline">搜索</span>
        <kbd className="hidden sm:inline px-1.5 py-0.5 text-xs bg-gray-200 dark:bg-gray-600 rounded">
          ⌘K
        </kbd>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
          <div className="relative min-h-screen flex items-start justify-center pt-[20vh]">
            <div className="relative w-full max-w-xl mx-4 bg-white dark:bg-gray-800 rounded-xl shadow-2xl overflow-hidden">
              <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                <svg
                  className="w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="搜索页面..."
                  className="flex-1 text-lg bg-transparent border-none outline-none text-gray-900 dark:text-white placeholder-gray-400"
                  autoFocus
                />
                <kbd
                  className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 rounded cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600"
                  onClick={() => setIsOpen(false)}
                >
                  ESC
                </kbd>
              </div>

              {results.length > 0 && (
                <ul className="max-h-80 overflow-y-auto py-2">
                  {results.map((result, index) => (
                    <li key={result.path}>
                      <button
                        className={`w-full px-4 py-3 text-left flex items-center gap-3 transition-colors ${
                          index === selectedIndex
                            ? 'bg-primary-50 dark:bg-primary-900/30'
                            : 'hover:bg-gray-50 dark:hover:bg-gray-700/50'
                        }`}
                        onClick={() => handleSelect(result.path)}
                        onMouseEnter={() => setSelectedIndex(index)}
                      >
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-gray-900 dark:text-white truncate">
                            {result.title}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400 truncate">
                            {result.group}
                          </div>
                        </div>
                        <svg
                          className="w-4 h-4 text-gray-400"
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
                    </li>
                  ))}
                </ul>
              )}

              {query && results.length === 0 && (
                <div className="px-4 py-8 text-center text-gray-500 dark:text-gray-400">
                  <svg
                    className="w-12 h-12 mx-auto mb-3 text-gray-300 dark:text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <p>未找到匹配 "{query}" 的结果</p>
                </div>
              )}

              {!query && (
                <div className="px-4 py-8 text-center text-gray-500 dark:text-gray-400">
                  <svg
                    className="w-12 h-12 mx-auto mb-3 text-gray-300 dark:text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                    />
                  </svg>
                  <p>输入关键词搜索页面</p>
                  <p className="text-sm mt-1">支持页面名称和分组搜索</p>
                </div>
              )}

              <div className="px-4 py-2 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
                <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                  <span className="flex items-center gap-1">
                    <kbd className="px-1 py-0.5 bg-gray-200 dark:bg-gray-700 rounded">↑</kbd>
                    <kbd className="px-1 py-0.5 bg-gray-200 dark:bg-gray-700 rounded">↓</kbd>
                    选择
                  </span>
                  <span className="flex items-center gap-1">
                    <kbd className="px-1 py-0.5 bg-gray-200 dark:bg-gray-700 rounded">Enter</kbd>
                    打开
                  </span>
                  <span className="flex items-center gap-1">
                    <kbd className="px-1 py-0.5 bg-gray-200 dark:bg-gray-700 rounded">Esc</kbd>
                    关闭
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
