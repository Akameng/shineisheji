// @ts-ignore;
import React, { useEffect } from 'react';
// @ts-ignore;
import { Button, Card, CardHeader, CardTitle, CardContent } from '@/components/ui';

// @ts-ignore;
import { Navbar } from '@/components/Navbar';
export default function DesignStudio(props) {
  const {
    $w
  } = props;
  useEffect(() => {
    // 初始化酷家乐设计工具
    const initKujialeDesigner = () => {
      // 这里替换为实际的酷家乐API初始化代码
      console.log('初始化酷家乐设计工具');
      // 示例：window.KLDesigner.init({...});
    };

    // 加载酷家乐SDK
    const script = document.createElement('script');
    script.src = 'https://sdk.kujiale.com/designer/v1/kldesigner.js';
    script.onload = initKujialeDesigner;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);
  const handleSaveDesign = async () => {
    try {
      // 调用酷家乐API获取当前设计数据
      // const designData = window.KLDesigner.getCurrentDesign();

      // 保存到数据模型
      await $w.cloud.callDataSource({
        dataSourceName: 'designer_dispatch',
        methodName: 'wedaCreateV2',
        params: {
          data: {
            designData: {},
            // 替换为实际设计数据
            status: 'draft',
            createdAt: new Date().toISOString()
          }
        }
      });

      // 提示保存成功
      console.log('设计保存成功');
    } catch (error) {
      console.error('保存失败:', error);
    }
  };
  return <div className="pb-16">
      <div className="p-4">
        <Card>
          <CardHeader>
            <CardTitle>设计工作室</CardTitle>
          </CardHeader>
          <CardContent>
            <div id="kujiale-container" className="h-96 border rounded-lg mb-4">
              {/* 酷家乐设计工具将渲染在这里 */}
            </div>
            <Button onClick={handleSaveDesign} className="w-full">
              保存设计
            </Button>
          </CardContent>
        </Card>
      </div>
      <Navbar $w={$w} />
    </div>;
}