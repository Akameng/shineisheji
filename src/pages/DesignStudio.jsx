// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Button } from '@/components/ui';

import { Navbar } from '@/components/Navbar';
export default function DesignStudio(props) {
  const {
    $w
  } = props;
  return <div className="pb-16">
      <div className="p-4">
        <h2 className="text-xl font-bold mb-4">设计工作室</h2>
        <Button onClick={() => window.open('https://www.cool-de.com')} className="w-full">
          打开酷家乐设计工具
        </Button>
      </div>
      <Navbar $w={$w} />
    </div>;
}