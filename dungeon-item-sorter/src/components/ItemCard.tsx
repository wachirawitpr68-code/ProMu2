import React from 'react';
import type { Item } from '../models/types';

interface ItemCardProps {
  item: Item;
  small?: boolean;
}

const getItemIcon = (type: string, subtype: string) => {
  if (type === 'Sword') return '🗡️';
  if (type === 'Armor') {
    switch (subtype) {
      case 'Helmet': return '🪖';
      case 'Gloves': return '🧤';
      case 'Boots':
      case 'Foot_Armor': return '🥾';
      case 'Chest_Shoulder_Leg_Plate': return '👕';
      default: return '🛡️';
    }
  }
  return '📦';
};

export const ItemCard: React.FC<ItemCardProps> = ({ item, small }) => {
  return (
    <div className={`item-card ${small ? 'small' : ''}`}>
      <div className="item-header">
        <span className="item-id">ID: {item.id}</span>
      </div>
      <div className="item-body">
        <div className={`item-graphic condition-${item.condition.toLowerCase()}`}>
          {getItemIcon(item.type, item.subtype)}
        </div>
        <div className="item-type">{item.type}</div>
        {item.subtype !== 'None' && <div className="item-subtype">{item.subtype.replace(/_/g, ' ')}</div>}
        <div className={`item-condition condition-${item.condition.toLowerCase()}`}>
          {item.condition.replace('_', ' ')}
        </div>
      </div>
      {!small && (
        <div className="item-footer">
          <div>Predicted: CH {item.predicted_channel}</div>
        </div>
      )}
    </div>
  );
};
