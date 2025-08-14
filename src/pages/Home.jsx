// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Button, Card } from '@/components/ui';

import { Navbar } from '@/components/Navbar';
export default function Home(props) {
  const {
    $w
  } = props;

  // 从数据模型获取案例数据
  const fetchDesignCases = async () => {
    try {
      const result = await $w.cloud.callDataSource({
        dataSourceName: 'design_cases',
        methodName: 'wedaGetRecordsV2',
        params: {
          select: {
            $master: true
          },
          limit: 4,
          orderBy: [{
            createdAt: 'desc'
          }]
        }
      });
      return result.records || [];
    } catch (error) {
      console.error('获取案例数据失败:', error);
      return [];
    }
  };

  // 从数据模型获取设计师数据
  const fetchDesigners = async () => {
    try {
      const result = await $w.cloud.callDataSource({
        dataSourceName: 'designers',
        methodName: 'wedaGetRecordsV2',
        params: {
          select: {
            $master: true
          },
          limit: 4
        }
      });
      return result.records || [];
    } catch (error) {
      console.error('获取设计师数据失败:', error);
      return [];
    }
  };
  const [designCases, setDesignCases] = React.useState([]);
  const [designers, setDesigners] = React.useState([]);
  React.useEffect(() => {
    fetchDesignCases().then(setDesignCases);
    fetchDesigners().then(setDesigners);
  }, []);
  const handleCaseClick = caseId => {
    $w.utils.navigateTo({
      pageId: 'design',
      params: {
        caseId
      }
    });
  };
  const handleDesignerClick = designerId => {
    $w.utils.navigateTo({
      pageId: 'designer',
      params: {
        designerId
      }
    });
  };
  return <div className="pb-16">
      <div className="p-4 space-y-6">
        <h1 className="text-2xl font-bold">家装灵感</h1>
        
        {/* 案例展示 */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold">精选家装案例</h2>
            <Button variant="link" onClick={() => $w.utils.navigateTo({
            pageId: 'cases'
          })}>
              查看全部
            </Button>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            {designCases.map(designCase => <Card key={designCase._id} className="relative rounded-xl overflow-hidden h-48" onClick={() => handleCaseClick(designCase._id)}>
                <img src={designCase.image} alt={designCase.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-3">
                  <div>
                    <h3 className="text-white font-medium">{designCase.title}</h3>
                    <p className="text-white text-xs">{designCase.area} · 设计师: {designCase.designer}</p>
                  </div>
                </div>
              </Card>)}
          </div>
        </div>

        {/* 推荐设计师 */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold">推荐设计师</h2>
            <Button variant="link" onClick={() => $w.utils.navigateTo({
            pageId: 'designers'
          })}>
              查看全部
            </Button>
          </div>
          
          <div className="flex space-x-4 overflow-x-auto pb-2">
            {designers.map(designer => <div key={designer._id} className="flex-shrink-0 text-center" onClick={() => handleDesignerClick(designer._id)}>
                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-blue-500 mx-auto">
                  <img src={designer.avatar} alt={designer.name} className="w-full h-full object-cover" />
                </div>
                <p className="text-sm mt-1 font-medium">{designer.name}</p>
                <p className="text-xs text-gray-500">{designer.specialty}</p>
              </div>)}
          </div>
        </div>

        {/* 开始设计按钮 */}
        <Button onClick={() => $w.utils.navigateTo({
        pageId: 'design'
      })} className="w-full bg-primary hover:bg-primary-dark">
          开始我的设计
        </Button>
      </div>
      
      <Navbar $w={$w} />
    </div>;
}