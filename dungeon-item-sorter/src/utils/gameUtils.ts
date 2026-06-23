import { Item, ItemType, SubType, Condition } from '../models/types';

export const generateId = () => Math.random().toString(36).substring(2, 9);

export const getMemoryKey = (item: Item): string => {
  return `${item.type}_${item.subtype}_${item.condition}`;
};

export const generateItems = (count: number, memoryMap: Record<string, number>): Item[] => {
  const items: Item[] = [];
  const types: ItemType[] = ['Sword', 'Armor'];
  const armorSubtypes: SubType[] = ['Helmet', 'Gloves', 'Boots', 'Chest_Shoulder_Leg_Plate', 'Foot_Armor'];
  const conditions: Condition[] = ['Perfect', 'Damaged', 'Heavily_Damaged'];

  for (let i = 0; i < count; i++) {
    const type = types[Math.floor(Math.random() * types.length)];
    const subtype = type === 'Sword' ? 'None' : armorSubtypes[Math.floor(Math.random() * armorSubtypes.length)];
    const condition = conditions[Math.floor(Math.random() * conditions.length)];
    
    const correct_channel = condition === 'Perfect' ? 1 : condition === 'Damaged' ? 2 : 3;

    // Build temporary item to get memory key
    const tempItem = { type, subtype, condition } as Item;
    const key = getMemoryKey(tempItem);

    // If we have a memory, use it; else predict 1
    const predicted_channel = memoryMap[key] || 1;

    items.push({
      id: generateId(),
      type,
      subtype,
      condition,
      correct_channel,
      predicted_channel
    });
  }

  return items;
};
