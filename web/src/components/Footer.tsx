import React from 'react';
import { footerLinks } from '../data/navigation';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* 学习资源 */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">
              学习资源
            </h3>
            <ul className="space-y-3">
              {footerLinks.learning.map((link) => (
                <li key={link.path}>
                  <a
                    href={link.path}
                    className="text-base text-gray-600 hover:text-primary-600 transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* 官方资源 */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">
              官方资源
            </h3>
            <ul className="space-y-3">
              {footerLinks.official.map((link: any, index: number) => (
                <li key={index}>
                  {link.href ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-base text-gray-600 hover:text-primary-600 transition-colors"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <a
                      href={link.path}
                      className="text-base text-gray-600 hover:text-primary-600 transition-colors"
                    >
                      {link.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* 社区 */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">
              社区
            </h3>
            <ul className="space-y-3">
              {footerLinks.community.map((link: any, index: number) => (
                <li key={index}>
                  {link.href ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-base text-gray-600 hover:text-primary-600 transition-colors"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <a
                      href={link.path}
                      className="text-base text-gray-600 hover:text-primary-600 transition-colors"
                    >
                      {link.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* 底部版权信息 */}
        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-base text-gray-500 text-center">
            &copy; {currentYear} Spring Cloud Alibaba 完整指南. 基于 MIT 许可证发布.
          </p>
          <p className="text-sm text-gray-400 text-center mt-2">
            致力于为开发者提供优质的 Spring Cloud Alibaba 学习资源
          </p>
        </div>
      </div>
    </footer>
  );
};
