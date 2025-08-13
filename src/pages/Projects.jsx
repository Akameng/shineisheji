// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui';

import { Navbar } from '@/components/Navbar';
export default function Projects(props) {
  const {
    $w
  } = props;
  return <div className="pb-16">
      <div className="p-4">
        <Card>
          <CardHeader>
            <CardTitle>我的项目</CardTitle>
          </CardHeader>
          <CardContent>
            <p>查看项目进度</p>
          </CardContent>
        </Card>
      </div>
      <Navbar $w={$w} />
    </div>;
}