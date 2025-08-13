// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Button } from '@/components/ui';
// @ts-ignore;
import { Home, Ruler, ShoppingCart, CalendarCheck } from 'lucide-react';

export function Navbar(props) {
  const {
    $w
  } = props;
  return <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-2">
      <div className="flex justify-around">
        <Button variant="ghost" onClick={() => $w.utils.navigateTo({
        pageId: 'home'
      })} className="flex flex-col items-center">
          <Home className="h-5 w-5" />
          <span className="text-xs">首页</span>
        </Button>
        <Button variant="ghost" onClick={() => $w.utils.navigateTo({
        pageId: 'design'
      })} className="flex flex-col items-center">
          <Ruler className="h-5 w-5" />
          <span className="text-xs">设计</span>
        </Button>
        <Button variant="ghost" onClick={() => $w.utils.navigateTo({
        pageId: 'materials'
      })} className="flex flex-col items-center">
          <ShoppingCart className="h-5 w-5" />
          <span className="text-xs">材料</span>
        </Button>
        <Button variant="ghost" onClick={() => $w.utils.navigateTo({
        pageId: 'projects'
      })} className="flex flex-col items-center">
          <CalendarCheck className="h-5 w-5" />
          <span className="text-xs">项目</span>
        </Button>
      </div>
    </nav>;
}