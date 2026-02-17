import React from 'react';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { Footer } from './Footer';
import { Breadcrumb } from './Breadcrumb';

interface LayoutProps {
  children: React.ReactNode;
  showFooter?: boolean;
}

export const Layout: React.FC<LayoutProps> = ({ children, showFooter = true }) => {
  return (
    <div className="page-container">
      <Sidebar />

      <div className="content-area">
        <main className="main-content">
          <div className="content-wrapper">
            <Breadcrumb />
            {children}
          </div>
        </main>
        {showFooter && <Footer />}
      </div>
    </div>
  );
};
