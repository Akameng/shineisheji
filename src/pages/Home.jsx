// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui';

import { Navbar } from '@/components/Navbar';
export default function Home(props) {
  const {
    $w
  } = props;
  return <div className="pb-16">
      <div className="p-4">
        <Card>
          <CardHeader>
            <CardTitle>欢迎使用装修设计平台</CardTitle>
          </CardHeader>
          <CardContent>
            <p>开始您的装修设计之旅</p>
          </CardContent>
        </Card>
      </div>
      <Navbar $w={$w} />
    </div>;
}