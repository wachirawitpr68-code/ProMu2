import React from 'react';
import { useGameEngine } from './hooks/useGameEngine';
import { Dashboard } from './components/Dashboard';
import { ConveyorBelt } from './components/ConveyorBelt';
import { FeedbackInterface } from './components/FeedbackInterface';
import './index.css';

function App() {
  const { 
    state, 
    startStage, 
    endSortingPhase, 
    enterFeedbackLoop, 
    handleFeedbackItem, 
    autoCorrectAll, 
    nextStage 
  } = useGameEngine();

  return (
    <div className="game-wrapper">
      <header className="game-header">
        <h1>Dungeon Item Sorter</h1>
        <p className="subtitle">HITL Machine Learning Simulator</p>
      </header>
      
      <main className="game-main">
        <Dashboard state={state} />

        <div className="game-area">
          {state.phase === 'Summary' && (
            <div className="summary-screen panel">
              <h2>Ready for Stage {state.stage}</h2>
              <p>
                {state.stage === 1 
                  ? "Initial Training Stage: The machine knows nothing. It will sort everything into Channel 1. You must correct it."
                  : "Testing & Active Learning Stage: The machine will use what it learned to sort the items."}
              </p>
              <button className="btn primary massive" onClick={startStage}>
                Start Conveyor
              </button>
            </div>
          )}

          {state.phase === 'Sorting' && (
            <div className="sorting-screen panel">
              <h2>Sorting in progress...</h2>
              <ConveyorBelt 
                items={state.currentItems} 
                onComplete={() => {
                  endSortingPhase();
                  enterFeedbackLoop();
                }} 
              />
            </div>
          )}

          {state.phase === 'Feedback' && (
            <div className="feedback-screen panel">
              <FeedbackInterface 
                state={state}
                onItemFeedback={handleFeedbackItem}
                onAutoCorrectAll={autoCorrectAll}
                onFinishStage={nextStage}
              />
            </div>
          )}
        </div>
      </main>

      <footer className="game-footer">
        <h3>Machine Memory Map (Rules Learned)</h3>
        <div className="memory-map">
          {Object.entries(state.memoryMap).length === 0 ? (
            <p className="empty-memory">No rules learned yet.</p>
          ) : (
            <ul className="memory-list">
              {Object.entries(state.memoryMap).map(([key, ch]) => (
                <li key={key}>
                  <span className="memory-key">{key.replace(/_/g, ' ')}</span> 
                  {' ➔ '} 
                  <span className={`memory-val ch-${ch}`}>Channel {ch}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </footer>
    </div>
  );
}

export default App;
