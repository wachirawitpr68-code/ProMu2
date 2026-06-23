const assert = require('assert');

// Simulate types and logic from gameUtils.ts
const generateId = () => Math.random().toString(36).substring(2, 9);

const getMemoryKey = (item) => {
  return `${item.type}_${item.subtype}_${item.condition}`;
};

const generateItems = (count, memoryMap) => {
  const items = [];
  const types = ['Sword', 'Armor'];
  const armorSubtypes = ['Helmet', 'Gloves', 'Boots', 'Chest_Shoulder_Leg_Plate', 'Foot_Armor'];
  const conditions = ['Perfect', 'Damaged', 'Heavily_Damaged'];

  for (let i = 0; i < count; i++) {
    const type = types[Math.floor(Math.random() * types.length)];
    const subtype = type === 'Sword' ? 'None' : armorSubtypes[Math.floor(Math.random() * armorSubtypes.length)];
    const condition = conditions[Math.floor(Math.random() * conditions.length)];
    
    const correct_channel = condition === 'Perfect' ? 1 : condition === 'Damaged' ? 2 : 3;

    const tempItem = { type, subtype, condition };
    const key = getMemoryKey(tempItem);

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

// --- Test Cases ---
console.log("Starting System Logic Tests...");

// Test 1: Stage 1 generation (no memory)
const memoryMap = {};
const stage1Items = generateItems(5, memoryMap).map(item => ({ ...item, predicted_channel: 1 }));
console.log("\n[Test 1] Stage 1 Items (Predicted should all be 1):");
stage1Items.forEach(i => console.log(`Type: ${i.type}, Condition: ${i.condition}, Predicted: ${i.predicted_channel}, Correct: ${i.correct_channel}`));

// Test 2: Simulating Feedback Loop
console.log("\n[Test 2] Simulating Feedback Loop for Stage 1...");
let score = 0;
stage1Items.forEach(item => {
  if (item.predicted_channel === item.correct_channel) {
    score += 1;
    memoryMap[getMemoryKey(item)] = item.correct_channel;
    console.log(`[+] Correct! Earned 1 point. Memorized ${getMemoryKey(item)} -> ${item.correct_channel}`);
  } else {
    // User corrects it
    memoryMap[getMemoryKey(item)] = item.correct_channel;
    console.log(`[-] Incorrect! User fixed it. Memorized ${getMemoryKey(item)} -> ${item.correct_channel}`);
  }
});

// Test 3: Stage 2 generation (with memory)
console.log("\n[Test 3] Stage 2 Items (Using populated Memory Map):");
const stage2Items = generateItems(5, memoryMap);
stage2Items.forEach(i => {
  const isKnown = memoryMap[getMemoryKey(i)] !== undefined;
  console.log(`Type: ${i.type}, Condition: ${i.condition}, Predicted: ${i.predicted_channel}, Correct: ${i.correct_channel} | Memory Exists: ${isKnown}`);
  if (isKnown) {
    assert.strictEqual(i.predicted_channel, i.correct_channel, "Prediction should match correct channel if memory exists!");
  }
});

console.log("\n✅ All System Logic Tests Passed!");
