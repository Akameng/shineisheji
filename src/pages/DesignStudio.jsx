// @ts-ignore;
import React, { useEffect, useState } from 'react';
// @ts-ignore;
import { Button, Card, CardHeader, CardTitle, CardContent, useToast } from '@/components/ui';

// @ts-ignore;
import { Navbar } from '@/components/Navbar';
export default function DesignStudio(props) {
  const {
    $w
  } = props;
  const {
    toast
  } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [designerLoaded, setDesignerLoaded] = useState(false);
  useEffect(() => {
    const loadOpenSourceDesigner = async () => {
      try {
        // 加载开源设计工具库
        await loadScript('https://cdn.jsdelivr.net/npm/opensource-designer@1.0.0/dist/designer.min.js');

        // 初始化设计工具
        window.OpenSourceDesigner.init({
          container: document.getElementById('designer-container'),
          theme: 'light',
          onReady: () => {
            setDesignerLoaded(true);
            setIsLoading(false);
            toast({
              title: '设计工具已加载',
              description: '可以开始设计了'
            });
          },
          onError: error => {
            throw new Error(`设计工具初始化失败: ${error.message || '未知错误'}`);
          }
        });
      } catch (error) {
        setIsLoading(false);
        toast({
          title: '加载失败',
          description: error.message,
          variant: 'destructive'
        });
      }
    };
    const loadScript = src => {
      return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = src;
        script.async = true;
        script.onload = resolve;
        script.onerror = () => reject(new Error(`无法加载脚本: ${src}`));
        document.body.appendChild(script);
      });
    };
    loadOpenSourceDesigner();
    return () => {
      // 清理工作
      if (window.OpenSourceDesigner && window.OpenSourceDesigner.destroy) {
        window.OpenSourceDesigner.destroy();
      }
    };
  }, [toast]);
  const handleSaveDesign = async () => {
    try {
      const designData = window.OpenSourceDesigner.getCurrentDesign();
      await $w.cloud.callDataSource({
        dataSourceName: 'designer_dispatch',
        methodName: 'wedaCreateV2',
        params: {
          data: {
            designData: JSON.stringify(designData),
            status: 'draft',
            createdAt: new Date().toISOString()
          }
        }
      });
      toast({
        title: '保存成功',
        description: '设计已保存到云端'
      });
    } catch (error) {
      toast({
        title: '保存失败',
        description: error.message || '保存设计时出错',
        variant: 'destructive'
      });
    }
  };
  return <div className="pb-16">
      <div className="p-4">
        <Card>
          <CardHeader>
            <CardTitle>设计工作室</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? <div className="flex justify-center items-center h-96">
                <p>正在加载设计工具...</p>
              </div> : <>
                <div id="designer-container" className="h-96 border rounded-lg mb-4 bg-gray-100">
                  {!designerLoaded && <div className="flex justify-center items-center h-full">
                      <p>设计工具加载失败</p>
                    </div>}
                </div>
                <Button onClick={handleSaveDesign} className="w-full" disabled={!designerLoaded}>
                  保存设计
                </Button>
              </>}
          </CardContent>
        </Card>
      </div>
      <Navbar $w={$w} />
    </div>;
}