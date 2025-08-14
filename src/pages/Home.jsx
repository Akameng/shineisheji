// @ts-ignore;
import React, { useState } from 'react';
// @ts-ignore;
import { Button, Card, CardHeader, CardTitle, CardContent, useToast } from '@/components/ui';
// @ts-ignore;
import { ChevronLeft, ChevronRight } from 'lucide-react';

const styles = [{
  id: 1,
  name: '现代简约',
  image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=500',
  description: '简洁线条，中性色调，功能至上'
}, {
  id: 2,
  name: '北欧风格',
  image: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?w=500',
  description: '自然材质，明亮空间，简约设计'
}, {
  id: 3,
  name: '工业风',
  image: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=500',
  description: '裸露材质，粗犷质感，开放空间'
}, {
  id: 4,
  name: '新中式',
  image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=500',
  description: '传统元素，现代演绎，东方韵味'
}];
export default function Home(props) {
  const {
    $w
  } = props;
  const {
    toast
  } = useToast();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedStyle, setSelectedStyle] = useState(null);
  const nextSlide = () => {
    setCurrentIndex(prevIndex => prevIndex === styles.length - 1 ? 0 : prevIndex + 1);
  };
  const prevSlide = () => {
    setCurrentIndex(prevIndex => prevIndex === 0 ? styles.length - 1 : prevIndex - 1);
  };
  const applyStyle = () => {
    toast({
      title: '应用成功',
      description: `${selectedStyle.name}风格已应用到您的户型`
    });
    // 这里添加实际应用逻辑
  };
  if (selectedStyle) {
    return <div className="p-4">
        <Card>
          <CardHeader>
            <CardTitle>{selectedStyle.name}风格</CardTitle>
          </CardHeader>
          <CardContent>
            <img src={selectedStyle.image} alt={selectedStyle.name} className="w-full h-64 object-cover rounded-lg mb-4" />
            <p className="mb-4">{selectedStyle.description}</p>
            <Button onClick={applyStyle} className="w-full">
              应用到我的户型
            </Button>
            <Button variant="outline" onClick={() => setSelectedStyle(null)} className="w-full mt-2">
              返回
            </Button>
          </CardContent>
        </Card>
      </div>;
  }
  return <div className="p-4">
      <Card>
        <CardHeader>
          <CardTitle>选择您喜欢的家装风格</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <img src={styles[currentIndex].image} alt={styles[currentIndex].name} className="w-full h-64 object-cover rounded-lg" />
            <button onClick={prevSlide} className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/50 p-2 rounded-full">
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button onClick={nextSlide} className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/50 p-2 rounded-full">
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
          <div className="mt-4 text-center">
            <h3 className="text-lg font-medium">{styles[currentIndex].name}</h3>
            <p className="text-sm text-gray-500">{styles[currentIndex].description}</p>
          </div>
          <Button onClick={() => setSelectedStyle(styles[currentIndex])} className="w-full mt-4">
            查看详情
          </Button>
        </CardContent>
      </Card>
    </div>;
}