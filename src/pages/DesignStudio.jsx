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
    let script;
    const loadKujialeSDK = () => {
      if (window.KLDesigner) {
        initializeDesigner();
        return;
      }
      script = document.createElement('script');
      script.src = 'https://sdk.kujiale.com/designer/v1/kldesigner.js';
      script.async = true;
      script.onload = () => {
        if (window.KLDesigner) {
          initializeDesigner();
        } else {
          handleLoadError('SDK加载失败，但未定义KLDesigner对象');
        }
      };
      script.onerror = () => handleLoadError('无法加载酷家乐SDK脚本');
      document.body.appendChild(script);
    };
    const initializeDesigner = () => {
      try {
        window.KLDesigner.init({
          container: document.getElementById('kujiale-container'),
          appKey: 'YOUR_APP_KEY',
          // 替换为实际appKey
          onReady: () => {
            setDesignerLoaded(true);
            setIsLoading(false);
            toast({
              title: '设计工具已加载',
              description: '可以开始设计了'
            });
          },
          onError: error => {
            handleLoadError(`设计工具初始化失败: ${error.message || '未知错误'}`);
          }
        });
      } catch (error) {
        handleLoadError(`初始化异常: ${error.message || '未知错误'}`);
      }
    };
    const handleLoadError = message => {
      setIsLoading(false);
      toast({
        title: '加载失败',
        description: message,
        variant: 'destructive'
      });
      if (script) {
        document.body.removeChild(script);
      }
    };
    loadKujialeSDK();
    return () => {
      if (script) {
        document.body.removeChild(script);
      }
    };
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
        description: '设计已保存到云端'
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