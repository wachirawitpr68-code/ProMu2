import React from 'react';
import type { GameState } from '../models/types';

interface DashboardProps {
  state: GameState;
}

export const Dashboard: React.FC<DashboardProps> = ({ state }) => {
  const { stage, stageScore, currentItems, totalScore, totalItemsProcessed } = state;
  const accuracy = totalItemsProcessed === 0 ? 0 : Math.round((totalScore / totalItemsProcessed) * 100);

  return (
    <div className="dashboard">
      <div className="dashboard-item">
        <span className="label">STAGE</span>
        <span className="value">{stage}</span>
      </div>
      <div className="dashboard-item">
        <span className="label">STAGE SCORE</span>
        <span className="value">{stageScore} / {currentItems.length || '-'}</span>
      </div>
      <div className="dashboard-item">
        <span className="label">TOTAL SCORE</span>
        <span className="value">{totalScore}</span>
      </div>
      <div className="dashboard-item">
        <span className="label">ACCURACY</span>
        <span className="value">{accuracy}%</span>
      </div>
    </div>
  );
};
