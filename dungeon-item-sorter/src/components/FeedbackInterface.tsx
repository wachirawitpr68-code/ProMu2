import React, { useState } from 'react';
import type { Item, GameState } from '../models/types';
import { ItemCard } from './ItemCard';

interface FeedbackInterfaceProps {
  state: GameState;
  onItemFeedback: (item: Item, correct: boolean, selectedChannel?: number) => void;
  onAutoCorrectAll: () => void;
  onFinishStage: () => void;
}

export const FeedbackInterface: React.FC<FeedbackInterfaceProps> = ({ 
  state, 
  onItemFeedback, 
  onAutoCorrectAll,
  onFinishStage
}) => {
  const [askingChannel, setAskingChannel] = useState(false);
  const [stage2AskGeneral, setStage2AskGeneral] = useState(state.stage > 1);

  const currentItem = state.currentItems[state.feedbackIndex];

  // If all items processed in feedback
  if (state.feedbackIndex >= state.currentItems.length) {
    return (
      <div className="feedback-container">
        <h2>Stage {state.stage} Complete!</h2>
        <button className="btn primary" onClick={onFinishStage}>Next Stage</button>
      </div>
    );
  }

  // Stage 2+ first question
  if (stage2AskGeneral) {
    return (
      <div className="feedback-container">
        <h2>สายพานคัดแยกเป็นอย่างไร?</h2>
        <div className="button-group">
          <button 
            className="btn success" 
            onClick={() => {
              onAutoCorrectAll();
              onFinishStage();
            }}
          >
            คัดแยกได้ถูกต้อง (ทั้งหมด)
          </button>
          <button 
            className="btn danger" 
            onClick={() => setStage2AskGeneral(false)}
          >
            คัดแยกไม่ถูกต้อง (ตรวจสอบทีละชิ้น)
          </button>
        </div>
      </div>
    );
  }

  // Step-by-step Review
  return (
    <div className="feedback-container">
      <h2>ตรวจสอบผลลัพธ์ (Feedback Loop)</h2>
      <div className="review-area">
        <ItemCard item={currentItem} />
        
        <div className="review-controls">
          <p>
            ถูกส่งไปที่: <strong>ช่อง {currentItem.predicted_channel} ({currentItem.predicted_channel === 1 ? 'ขายต่อ' : currentItem.predicted_channel === 2 ? 'ส่งซ่อม' : 'คัดทิ้ง'})</strong>
          </p>
          
          {!askingChannel ? (
            <>
              <h3>ของชิ้นนี้ไปถูกช่องไหม?</h3>
              <div className="button-group">
                <button 
                  className="btn success"
                  onClick={() => onItemFeedback(currentItem, true)}
                >
                  {state.stage === 1 ? 'ถูกต้อง' : 'ไปถูกแล้ว'}
                </button>
                <button 
                  className="btn danger"
                  onClick={() => setAskingChannel(true)}
                >
                  {state.stage === 1 ? 'ไม่ถูกต้อง' : 'ของชิ้นนี้ยังไปไม่ถูก'}
                </button>
              </div>
            </>
          ) : (
            <div className="channel-selection">
              <h3>ควรจะคัดแยกไปสายพานช่องไหน?</h3>
              <div className="button-group">
                {[1, 2, 3].map(ch => (
                  <button 
                    key={ch} 
                    className="btn"
                    onClick={() => {
                      onItemFeedback(currentItem, false, ch);
                      setAskingChannel(false);
                    }}
                  >
                    ช่องที่ {ch} ({ch === 1 ? 'ขายต่อ' : ch === 2 ? 'ส่งซ่อม' : 'คัดทิ้ง'})
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      
      <div className="progress">
        Reviewing item {state.feedbackIndex + 1} of {state.currentItems.length}
      </div>
    </div>
  );
};
