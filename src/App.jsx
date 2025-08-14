// @ts-ignore;
import React from 'react';

import Home from '@/pages/Home';
import DesignStudio from '@/pages/DesignStudio';
import Materials from '@/pages/Materials';
import Projects from '@/pages/Projects';
export default function App(props) {
  const {
    $w
  } = props;

  // 使用系统内置路由功能
  const renderPage = () => {
    const pageId = $w?.page?.dataset?.params?.pageId || 'home';
    switch (pageId) {
      case 'home':
        return <Home $w={$w} />;
      case 'design':
        return <DesignStudio $w={$w} />;
      case 'materials':
        return <Materials $w={$w} />;
      case 'projects':
        return <Projects $w={$w} />;
      default:
        return <Home $w={$w} />;
    }
  };
  return <div className="min-h-screen bg-background text-foreground">
      {renderPage()}
    </div>;
}