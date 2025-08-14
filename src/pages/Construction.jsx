// @ts-ignore;
import React, { useState } from 'react';
// @ts-ignore;
import { Card, CardHeader, CardTitle, CardContent, Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui';
// @ts-ignore;
import { CheckCircle, Clock, ChevronDown } from 'lucide-react';

const constructionStages = [{
  id: 1,
  name: '拆改工程',
  date: '2023-08-01',
  status: 'completed',
  photos: ['https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=500', 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=500']
}, {
  id: 2,
  name: '水电改造',
  date: '2023-08-10',
  status: 'completed',
  photos: ['https://images.unsplash.com/photo-1600566752355-35792bedcfe3?w=500', 'https://images.unsplash.com/photo-1600566752227-9f3d5d3266c1?w=500']
}, {
  id: 3,
  name: '泥瓦工程',
  date: '2023-08-20',
  status: 'in-progress',
  photos: ['https://images.unsplash.com/photo-1600607688969-a5bfcd646554?w=500']
}, {
  id: 4,
  name: '木作工程',
  date: '2023-09-01',
  status: 'pending',
  photos: []
}];
export default function ConstructionProgress(props) {
  const [expandedItem, setExpandedItem] = useState(null);
  return <div className="p-4">
      <Card>
        <CardHeader>
          <CardTitle>施工进度</CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full" value={expandedItem} onValueChange={setExpandedItem}>
            {constructionStages.map(stage => <AccordionItem key={stage.id} value={stage.id.toString()}>
                <AccordionTrigger className="hover:no-underline">
                  <div className="flex items-center w-full">
                    <div className="mr-4">
                      {stage.status === 'completed' && <CheckCircle className="h-5 w-5 text-green-500" />}
                      {stage.status === 'in-progress' && <Clock className="h-5 w-5 text-yellow-500" />}
                      {stage.status === 'pending' && <Clock className="h-5 w-5 text-gray-400" />}
                    </div>
                    <div className="flex-1 text-left">
                      <h3 className="font-medium">{stage.name}</h3>
                      <p className="text-sm text-gray-500">{stage.date}</p>
                    </div>
                    <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    {stage.photos.length > 0 ? stage.photos.map((photo, index) => <div key={index} className="relative aspect-square">
                        <img src={photo} alt={`${stage.name}施工照片${index + 1}`} className="w-full h-full object-cover rounded-lg" />
                      </div>) : <p className="col-span-2 text-center text-gray-500 py-8">暂无现场照片</p>}
                  </div>
                </AccordionContent>
              </AccordionItem>)}
          </Accordion>
        </CardContent>
      </Card>
    </div>;
}