// @ts-ignore;
import React, { useEffect, useState } from 'react';
// @ts-ignore;
import { Button, Card, CardHeader, CardTitle, CardContent, useToast } from '@/components/ui';

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
    const loadHomeDesigner = async () => {
      try {
        // 加载家装设计专用库
        const {
          default: HomeDesigner
        } = await import('home-designer');

        // 初始化家装设计工具
        const designer = new HomeDesigner({
          container: document.getElementById('designer-container'),
          mode: '2d',
          tools: ['wall', 'door', 'window', 'furniture'],
          materials: ['wood', 'tile', 'paint'],
          onReady: () => {
            setDesignerLoaded(true);
            setIsLoading(false);
            toast({
              title: '家装设计工具已加载',
              description: '可以开始设计您的家了'
            });
          },
          onError: error => {
            throw new Error(`家装设计工具初始化失败: ${error.message}`);
          }
        });

        // 预加载家装素材
        designer.loadMaterials([{
          type: 'floor',
          name: '木地板'
        }, {
          type: 'wall',
          name: '瓷砖'
        }, {
          type: 'furniture',
          name: '沙发'
        }]);
      } catch (error) {
        setIsLoading(false);
        toast({
          title: '加载失败',
          description: error.message,
          variant: 'destructive'
        });
      }
    };
    loadHomeDesigner();
  }, [toast]);
  const handleSaveDesign = async () => {
    try {
      const designData = window.HomeDesigner.exportDesign();
      await $w.cloud.callDataSource({
        dataSourceName: 'designer_dispatch',
        methodName: 'wedaCreateV2',
        params: {
          data: {
            designData: JSON.stringify(designData),
            status: 'draft',
            createdAt: new Date().toISOString(),
            designType: 'home' // 标明是家装设计
          }
        }
      });
      toast({
        title: '保存成功',
        description: '您的家装设计已保存'
      });
    } catch (error) {
      toast({
        title: '保存失败',
        description: error.message,
        variant: 'destructive'
      });
    }
  };
  return <div className="pb-16">
      <div className="p-4">
        <Card>
          <CardHeader>
            <CardTitle>家装设计工作室</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? <div className="flex justify-center items-center h-96">
                <p>正在加载家装设计工具...</p>
              </div> : <>
                <div id="designer-container" className="h-96 border rounded-lg mb-4 bg-gray-100">
                  {!designerLoaded && <div className="flex justify-center items-center h-full">
                      <p>家装设计工具加载失败</p>
                    </div>}
                </div>
                <Button onClick={handleSaveDesign} className="w-full bg-primary hover:bg-primary-dark" disabled={!designerLoaded}>
                  保存家装设计
                </Button>
              </>}
          </CardContent>
        </Card>
      </div>
      <Navbar $w={$w} />
    </div>;
}