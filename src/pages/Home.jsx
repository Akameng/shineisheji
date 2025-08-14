// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Button, Card } from '@/components/ui';

import { Navbar } from '@/components/Navbar';
const designCases = [{
  id: 1,
  title: "现代简约客厅",
  designer: "李想",
  area: "120㎡",
  image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=500",
  category: "客厅"
}, {
  id: 2,
  title: "北欧风格卧室",
  designer: "王雪",
  area: "90㎡",
  image: "https://images.unsplash.com/photo-1617806118233-18e1de247200?w=500",
  category: "卧室"
}, {
  id: 3,
  title: "工业风餐厅",
  designer: "张明",
  area: "150㎡",
  image: "https://images.unsplash.com/photo-1600121848594-d8644e57abab?w=500",
  category: "餐厅"
}, {
  id: 4,
  title: "日式禅意浴室",
  designer: "林静",
  area: "80㎡",
  image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=500",
  category: "浴室"
}];
const designers = [{
  id: 1,
  name: "李想",
  avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500",
  specialty: "现代简约"
}, {
  id: 2,
  name: "王雪",
  avatar: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=500",
  specialty: "北欧风格"
}, {
  id: 3,
  name: "张明",
  avatar: "https://images.unsplash.com/photo-1560253023-3ec5d502959f?w=500",
  specialty: "工业风"
}, {
  id: 4,
  name: "林静",
  avatar: "https://images.unsplash.com/photo-1573497019705-4a36b64d0f48?w=500",
  specialty: "日式禅意"
}];
export default function Home(props) {
  const {
    $w
  } = props;
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
            {designCases.map(designCase => <Card key={designCase.id} className="relative rounded-xl overflow-hidden h-48" onClick={() => handleCaseClick(designCase.id)}>
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
            {designers.map(designer => <div key={designer.id} className="flex-shrink-0 text-center" onClick={() => handleDesignerClick(designer.id)}>
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