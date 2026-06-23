export type ItemType = 'Sword' | 'Armor';
export type SubType = 'None' | 'Helmet' | 'Gloves' | 'Boots' | 'Chest_Shoulder_Leg_Plate' | 'Foot_Armor';
export type Condition = 'Perfect' | 'Damaged' | 'Heavily_Damaged';

export interface Item {
  id: string;
  type: ItemType;
  subtype: SubType;
  condition: Condition;
  correct_channel: number; // 1, 2, or 3
  predicted_channel: number; // 1, 2, or 3
  image?: string; // Optional for styling
}

export interface GameState {
  stage: number;
  score: number;
  totalItemsProcessed: number;
  totalScore: number;
  memoryMap: Record<string, number>;
  currentItems: Item[];
  phase: 'Sorting' | 'Feedback' | 'Summary';
  feedbackIndex: number;
  stageScore: number;
}
