// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Home, Box, BookOpen } from 'lucide-react';

export function Navbar({
  $w
}) {
  return <div className="fixed bottom-0 left-0 right-0 bg-card border-t flex justify-around p-2">
      <button onClick={() => $w.utils.navigateTo({
      pageId: 'home'
    })} className="flex flex-col items-center p-2">
        <Home className="w-5 h-5" />
        <span className="text-xs mt-1">首页</span>
      </button>
      <button onClick={() => $w.utils.navigateTo({
      pageId: 'design'
    })} className="flex flex-col items-center p-2">
        <Box className="w-5 h-5" />
        <span className="text-xs mt-1">设计</span>
      </button>
      <button onClick={() => $w.utils.navigateTo({
      pageId: 'projects'
    })} className="flex flex-col items-center p-2">
        <BookOpen className="w-5 h-5" />
        <span className="text-xs mt-1">项目</span>
      </button>
    </div>;
}