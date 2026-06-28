import React from 'react';
import type { Item } from '../models/types';

interface ItemCardProps {
  item: Item;
  small?: boolean;
}

const getItemIcon = (type: string, subtype: string) => {
  if (type === 'Sword') return '/assets/sword.png';
  if (type === 'Armor') {
    switch (subtype) {
      case 'Helmet': return '/assets/helmet.png';
      case 'Gloves': return '/assets/gloves.png';
      case 'Boots':
      case 'Foot_Armor': return '/assets/boots.png';
      case 'Chest_Shoulder_Leg_Plate': return '/assets/chest.png';
      default: return '/assets/chest.png';
    }
  }
  return '/assets/sword.png';
};

export const ItemCard: React.FC<ItemCardProps> = ({ item, small }) => {
  return (
    <div className={`item-card ${small ? 'small' : ''}`}>
      <div className="item-header">
        <span className="item-id">ID: {item.id}</span>
      </div>
      <div className="item-body">
        <div className={`item-graphic condition-${item.condition.toLowerCase()}`}>
          <img src={getItemIcon(item.type, item.subtype)} alt={item.subtype !== 'None' ? item.subtype : item.type} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
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
