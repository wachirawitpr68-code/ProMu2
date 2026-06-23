import React, { useEffect, useState } from 'react';
import type { Item } from '../models/types';
import { ItemCard } from './ItemCard';

interface ConveyorBeltProps {
  items: Item[];
  onComplete: () => void;
}

export const ConveyorBelt: React.FC<ConveyorBeltProps> = ({ items, onComplete }) => {
  const [animatedItems, setAnimatedItems] = useState<string[]>([]); // track IDs of items that have finished animating

  useEffect(() => {
    if (items.length === 0) return;
    
    // Simulate animation time. Each item takes some time to move, staggering them.
    const totalTime = (items.length * 1000) + 2000;
    
    const timeout = setTimeout(() => {
      onComplete();
    }, totalTime);

    return () => clearTimeout(timeout);
  }, [items, onComplete]);

  return (
    <div className="conveyor-container">
      <div className="channels-target">
        <div className="channel target-1">CH 1 (ขายต่อ)</div>
        <div className="channel target-2">CH 2 (ส่งซ่อม)</div>
        <div className="channel target-3">CH 3 (คัดทิ้ง)</div>
      </div>
      
      <div className="conveyor-track">
        {items.map((item, index) => {
          // Calculate animation delay for staggering
          const delay = index * 1; 
          return (
            <div 
              key={item.id} 
              className={`moving-item target-ch-${item.predicted_channel}`}
              style={{ animationDelay: `${delay}s` }}
            >
              <ItemCard item={item} small />
            </div>
          );
        })}
      </div>
    </div>
  );
};
