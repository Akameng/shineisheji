// @ts-ignore;
import React, { useState } from 'react';
// @ts-ignore;
import { Button, Card, CardHeader, CardTitle, CardContent, useToast } from '@/components/ui';

// @ts-ignore;
import { Navbar } from '@/components/Navbar';
const designTemplates = [{
  id: 1,
  name: '现代简约客厅',
  image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=500',
  description: '简洁线条，中性色调，功能至上'
}, {
  id: 2,
  name: '北欧风格卧室',
  image: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?w=500',
  description: '自然材质，明亮空间，简约设计'
}];
export default function DesignStudio(props) {
  const {
    $w
  } = props;
  const {
    toast
  } = useToast();
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const applyTemplate = () => {
    toast({
      title: '应用成功',
      description: `${selectedTemplate.name}模板已应用到您的设计`
    });
    // 这里添加实际应用逻辑
  };
  if (selectedTemplate) {
    return <div className="pb-16">
      <div className="p-4">
        <Card>
          <CardHeader>
            <CardTitle>{selectedTemplate.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <img src={selectedTemplate.image} alt={selectedTemplate.name} className="w-full h-64 object-cover rounded-lg mb-4" />
            <p className="mb-4">{selectedTemplate.description}</p>
            <Button onClick={applyTemplate} className="w-full">
              应用到我的设计
            </Button>
            <Button variant="outline" onClick={() => setSelectedTemplate(null)} className="w-full mt-2">
              返回
            </Button>
          </CardContent>
        </Card>
      </div>
      <Navbar $w={$w} />
    </div>;
  }
  return <div className="pb-16">
    <div className="p-4">
      <Card>
        <CardHeader>
          <CardTitle>设计工作室</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {designTemplates.map(template => <Card key={template.id} className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => setSelectedTemplate(template)}>
                <CardContent className="p-0">
                  <img src={template.image} alt={template.name} className="w-full h-48 object-cover rounded-t-lg" />
                  <div className="p-4">
                    <h3 className="font-medium">{template.name}</h3>
                    <p className="text-sm text-gray-500">{template.description}</p>
                  </div>
                </CardContent>
              </Card>)}
          </div>
        </CardContent>
      </Card>
    </div>
    <Navbar $w={$w} />
  </div>;
}