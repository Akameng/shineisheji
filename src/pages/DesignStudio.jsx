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
    const loadKujialeSDK = () => {
      if (window.KLDesigner) {
        initializeDesigner();
        return;
      }
      const script = document.createElement('script');
      script.src = 'https://sdk.kujiale.com/designer/v1/kldesigner.js';
      script.async = true;
      script.onload = () => {
        if (window.KLDesigner) {
          initializeDesigner();
        } else {
          handleLoadError();
        }
      };
      script.onerror = handleLoadError;
      document.body.appendChild(script);
      return () => {
        document.body.removeChild(script);
      };
    };
    const initializeDesigner = () => {
      try {
        window.KLDesigner.init({
          container: document.getElementById('kujiale-container'),
          // 替换为您的实际API配置
          appKey: 'YOUR_APP_KEY',
          onReady: () => {
            setDesignerLoaded(true);
            setIsLoading(false);
          },
          onError: error => {
            console.error('酷家乐设计工具初始化失败:', error);
            handleLoadError();
          }
        });
      } catch (error) {
        handleLoadError();
      }
    };
    const handleLoadError = () => {
      setIsLoading(false);
      toast({
        title: '加载失败',
        description: '无法加载酷家乐设计工具，请稍后重试',
        variant: 'destructive'
      });
    };
    loadKujialeSDK();
  }, [toast]);
  const handleSaveDesign = async () => {
    if (!designerLoaded) {
      toast({
        title: '操作失败',
        description: '设计工具未加载完成',
        variant: 'destructive'
      });
      return;
    }
    try {
      const designData = window.KLDesigner.getCurrentDesign();
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
        description: '设计已保存'
      });
    } catch (error) {
      console.error('保存失败:', error);
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
                <div id="kujiale-container" className="h-96 border rounded-lg mb-4 bg-gray-100">
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