import React from 'react';
import { CardProps } from '../../types';
import { cn } from '../../lib/utils';

// カードコンポーネント
const Card: React.FC<CardProps> = ({ 
  title, 
  footer, 
  children, 
  className, 
  ...props 
}) => {
  return (
    <div 
      className={cn(
        "rounded-lg border border-gray-200 bg-white shadow-sm",
        className || ""
      )} 
      {...props}
    >
      {title && (
        <div className="border-b border-gray-200 px-4 py-3">
          <h2 className="text-lg font-semibold">{title}</h2>
        </div>
      )}
      <div className="p-4">
        {children}
      </div>
      {footer && (
        <div className="border-t border-gray-200 px-4 py-3">
          {footer}
        </div>
      )}
    </div>
  );
};

export default Card;
