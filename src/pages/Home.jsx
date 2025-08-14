// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Button } from '@/components/ui';

import { Navbar } from '@/components/Navbar';
export default function Home(props) {
  const {
    $w
  } = props;
  return <div className="pb-16">
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">欢迎使用设计工作室</h1>
        <Button onClick={() => $w.utils.navigateTo({
        pageId: 'design'
      })} className="w-full">
          开始设计
        </Button>
      </div>
      <Navbar $w={$w} />
    </div>;
}