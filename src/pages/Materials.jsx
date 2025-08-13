// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui';

import { Navbar } from '@/components/Navbar';
export default function Materials(props) {
  const {
    $w
  } = props;
  return <div className="pb-16">
      <div className="p-4">
        <Card>
          <CardHeader>
            <CardTitle>材料商城</CardTitle>
          </CardHeader>
          <CardContent>
            <p>选择您喜欢的装修材料</p>
          </CardContent>
        </Card>
      </div>
      <Navbar $w={$w} />
    </div>;
}