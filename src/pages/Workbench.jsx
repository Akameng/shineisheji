// @ts-ignore;
import React, { useState } from 'react';
// @ts-ignore;
import { Button, Card, CardHeader, CardTitle, CardContent, ScrollArea } from '@/components/ui';
// @ts-ignore;
import { Search, Plus } from 'lucide-react';

const furnitureCategories = [{
  id: 1,
  name: '沙发',
  items: [{
    id: 101,
    name: '现代简约沙发',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500',
    price: 2999
  }, {
    id: 102,
    name: '北欧风格沙发',
    image: 'https://images.unsplash.com/photo-1583845112201-803eb10d708c?w=500',
    price: 3599
  }]
}, {
  id: 2,
  name: '床',
  items: [{
    id: 201,
    name: '实木双人床',
    image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=500',
    price: 4599
  }]
}];
export default function Workbench(props) {
  const [selectedFurniture, setSelectedFurniture] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const filteredCategories = furnitureCategories.map(category => ({
    ...category,
    items: category.items.filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()))
  })).filter(category => category.items.length > 0);
  return <div className="flex h-screen">
      {/* 侧边栏 */}
      <div className="w-64 border-r p-4">
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
          <input type="text" placeholder="搜索家具..." className="w-full pl-10 pr-4 py-2 border rounded-lg" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
        </div>
        
        <ScrollArea className="h-[calc(100vh-120px)]">
          {filteredCategories.map(category => <div key={category.id} className="mb-6">
              <h3 className="font-medium mb-2">{category.name}</h3>
              <div className="space-y-2">
                {category.items.map(item => <Card key={item.id} className="cursor-pointer hover:bg-gray-50" onClick={() => setSelectedFurniture(item)}>
                    <CardContent className="p-3 flex items-center">
                      <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded mr-3" />
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-gray-500">¥{item.price}</p>
                      </div>
                    </CardContent>
                  </Card>)}
              </div>
            </div>)}
        </ScrollArea>
      </div>

      {/* 主内容区 */}
      <div className="flex-1 p-8">
        <div className="border rounded-lg h-full flex items-center justify-center bg-gray-50">
          {selectedFurniture ? <div className="text-center">
              <img src={selectedFurniture.image} alt={selectedFurniture.name} className="max-h-[70vh] max-w-full object-contain mx-auto" />
              <div className="mt-4">
                <h2 className="text-xl font-bold">{selectedFurniture.name}</h2>
                <p className="text-gray-600">¥{selectedFurniture.price}</p>
                <Button className="mt-4">
                  <Plus className="mr-2 h-4 w-4" />
                  应用到设计
                </Button>
              </div>
            </div> : <div className="text-center text-gray-500">
              <p>请从右侧选择家具添加到设计</p>
            </div>}
        </div>
      </div>
    </div>;
}