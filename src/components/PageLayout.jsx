import React from 'react';
import { MenuBar } from './MenuBar';
import { Footer } from './Footer';
import { SettingsBar } from './SettingsBar';
import './styles/PageLayout.css';

export default function PageLayout({ title, subtitle, children }) {
  return (
    <div className="page-layout">
      <nav className="top-nav">
        <MenuBar />
        <h1 className="page-title">{title}</h1>
        <SettingsBar />
      </nav>
      <main className="page-main">{children}</main>

      <Footer />
    </div>
  );
}

export { PageLayout };
