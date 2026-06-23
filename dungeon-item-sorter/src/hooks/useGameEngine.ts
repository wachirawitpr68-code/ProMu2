import { useState, useCallback } from 'react';
import type { Item, GameState } from '../models/types';
import { generateItems, getMemoryKey } from '../utils/gameUtils';

const ITEMS_PER_STAGE_BASE = 5;

export const useGameEngine = () => {
  const [state, setState] = useState<GameState>({
    stage: 1,
    score: 0, // Total score logic: it increases cumulatively
    totalItemsProcessed: 0,
    totalScore: 0, // overall total score
    memoryMap: {},
    currentItems: [],
    phase: 'Summary', // Starts at a screen where they can click 'Start'
    feedbackIndex: 0,
    stageScore: 0,
  });

  const startStage = useCallback(() => {
    const itemCount = state.stage === 1 ? ITEMS_PER_STAGE_BASE : ITEMS_PER_STAGE_BASE + Math.floor(state.stage / 2);
    
    // In Stage 1, memoryMap is empty so predicted_channel will be 1 by default
    // We also forcefully set predicted_channel to 1 if it's stage 1 as per requirements.
    const items = generateItems(itemCount, state.memoryMap).map(item => {
      if (state.stage === 1) {
        return { ...item, predicted_channel: 1 };
      }
      return item;
    });

    setState(prev => ({
      ...prev,
      currentItems: items,
      phase: 'Sorting',
      feedbackIndex: 0,
      stageScore: 0
    }));
  }, [state.stage, state.memoryMap]);

  const endSortingPhase = useCallback(() => {
    setState(prev => ({
      ...prev,
      phase: 'Summary'
    }));
  }, []);

  const enterFeedbackLoop = useCallback(() => {
    setState(prev => ({
      ...prev,
      phase: 'Feedback',
      feedbackIndex: 0
    }));
  }, []);

  const handleFeedbackItem = useCallback((item: Item, correct: boolean, selectedChannel?: number) => {
    setState(prev => {
      let newScore = prev.stageScore;
      const newMemory = { ...prev.memoryMap };

      if (correct) {
        newScore += 1;
        // Reinforce correct memory just in case
        newMemory[getMemoryKey(item)] = item.correct_channel;
      } else {
        if (selectedChannel) {
          newMemory[getMemoryKey(item)] = selectedChannel;
        }
      }

      return {
        ...prev,
        stageScore: newScore,
        memoryMap: newMemory,
        feedbackIndex: prev.feedbackIndex + 1
      };
    });
  }, []);

  const autoCorrectAll = useCallback(() => {
    setState(prev => {
      // User says all were sorted correctly
      const points = prev.currentItems.length;
      return {
        ...prev,
        stageScore: points,
        phase: 'Feedback' // We move to feedback but mark all as done
      };
    });
  }, []);

  const nextStage = useCallback(() => {
    setState(prev => ({
      ...prev,
      stage: prev.stage + 1,
      totalScore: prev.totalScore + prev.stageScore,
      totalItemsProcessed: prev.totalItemsProcessed + prev.currentItems.length,
      phase: 'Summary',
      currentItems: []
    }));
  }, []);

  return {
    state,
    startStage,
    endSortingPhase,
    enterFeedbackLoop,
    handleFeedbackItem,
    autoCorrectAll,
    nextStage
  };
};
