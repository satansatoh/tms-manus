import React from 'react';
import { PoliticianCardProps } from "../../types";
import Card from '../ui/Card';

// 政治家カードコンポーネント
const PoliticianCard: React.FC<PoliticianCardProps> = ({
  name,
  party,
  position,
  imageUrl,
  categories
}) => {
  return (
    <Card className="h-full transition-transform hover:scale-105">
      <div className="flex flex-col items-center">
        <div className="mb-3 h-24 w-24 overflow-hidden rounded-full">
          <img
            src={imageUrl || '/assets/default-profile.png'}
            alt={`${name}のプロフィール写真`}
            className="h-full w-full object-cover"
          />
        </div>
        <h3 className="mb-1 text-xl font-bold">{name}</h3>
        <p className="mb-2 text-sm text-gray-600">{party} | {position}</p>
        
        {categories && categories.length > 0 && (
          <div className="mt-3 w-full">
            <h4 className="mb-2 text-sm font-semibold">注力カテゴリ</h4>
            <div className="space-y-2">
              {categories.slice(0, 3).map((category) => (
                <div key={category.name} className="flex items-center">
                  <span className="mr-2 text-xs">{category.name}</span>
                  <div className="h-2 flex-1 rounded-full bg-gray-200">
                    <div
                      className="h-2 rounded-full bg-blue-500"
                      style={{ width: `${category.percentage}%` }}
                    ></div>
                  </div>
                  <span className="ml-2 text-xs">{category.percentage}%</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};

export default PoliticianCard;
