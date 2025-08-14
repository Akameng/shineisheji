// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Button, Card, CardHeader, CardTitle, CardContent, Table, TableHeader, TableBody, TableRow, TableCell } from '@/components/ui';
// @ts-ignore;
import { Download, Share2 } from 'lucide-react';

const selectedItems = [{
  id: 101,
  name: '现代简约沙发',
  price: 2999,
  quantity: 1
}, {
  id: 201,
  name: '实木双人床',
  price: 4599,
  quantity: 1
}];
const designStyle = {
  id: 1,
  name: '现代简约',
  designFee: 2000
};
const serviceFee = 500;
const total = selectedItems.reduce((sum, item) => sum + item.price * item.quantity, 0) + designStyle.designFee + serviceFee;
export default function Quotation(props) {
  const handleDownload = () => {
    // 下载报价单逻辑
    console.log('下载报价单');
  };
  const handleShare = () => {
    // 分享报价单逻辑
    console.log('分享报价单');
  };
  return <div className="p-4">
      <Card>
        <CardHeader>
          <CardTitle>装修报价单</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <h3 className="font-medium mb-2">设计风格: {designStyle.name}</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableCell>项目</TableCell>
                  <TableCell>单价</TableCell>
                  <TableCell>数量</TableCell>
                  <TableCell>小计</TableCell>
                </TableRow>
              </TableHeader>
              <TableBody>
                {selectedItems.map(item => <TableRow key={item.id}>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>¥{item.price}</TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell>¥{item.price * item.quantity}</TableCell>
                  </TableRow>)}
                <TableRow>
                  <TableCell colSpan={3}>设计费</TableCell>
                  <TableCell>¥{designStyle.designFee}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={3}>服务费</TableCell>
                  <TableCell>¥{serviceFee}</TableCell>
                </TableRow>
                <TableRow className="font-bold">
                  <TableCell colSpan={3}>总计</TableCell>
                  <TableCell>¥{total}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
          <div className="flex space-x-4">
            <Button onClick={handleDownload} className="flex-1">
              <Download className="mr-2 h-4 w-4" />
              下载报价单
            </Button>
            <Button variant="outline" onClick={handleShare} className="flex-1">
              <Share2 className="mr-2 h-4 w-4" />
              分享报价单
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>;
}