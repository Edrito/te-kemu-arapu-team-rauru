import React, { createContext, useState, useContext, useEffect } from 'react';
import { sendPlayerAction } from '../utils/apiCall';
import { MainState } from '../app/types';
import { subscribeToGameState } from '../context/gameStateListener';
import { useAuth } from './AuthContext';
import { playerAction } from 'te-kemu-arapu-compx374-team-rauru/utils/apiFunctions';

interface GameContextType {
  gameState: MainState | null;
  subscribeToGame: (lobbyCode: string) => void; // Added this line
  unsubscribeFromGame: () => void;
  startGame: () => Promise<void>;
  leaveLobby: () => Promise<void>;
  deleteLobby: () => Promise<void>;
  categoryVote: (voteType: string) => Promise<void>;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider = ({ children }: { children: React.ReactNode }) => {
  const [gameState, setGameState] = useState<MainState | null>(null);
  const [unsubscribe, setUnsubscribe] = useState<(() => void) | null>(null);
  const { user } = useAuth();
  const playerId = user?.uid;

  const subscribeToGame = (lobbyCode: string) => {
    if (unsubscribe) {
      unsubscribe();
    }

    const unsubscribeFn = subscribeToGameState(
      lobbyCode,
      (newGameState: MainState) => setGameState(newGameState),
      (error: any) => console.error('Error in game subscription:', error)
    );
    setUnsubscribe(() => unsubscribeFn);
  };

  const unsubscribeFromGame = () => {
    if (unsubscribe) {
      unsubscribe();
      setUnsubscribe(null);
      setGameState(null);
    }
  };

  const createGameAction = (actionType: string, details: any = {}) => {
    if (!playerId || !gameState?.gameId) return null;
    return playerAction(playerId, gameState.gameId, actionType, details);
  };

  const sendAction = async (actionPayload: any) => {
    if (!actionPayload) return;
    try {
      await sendPlayerAction(actionPayload);
    } catch (error) {
      console.error('Error sending action:', error);
    }
  };

  const startGame = async () => {
    const actionPayload = createGameAction('lobbyStart');
    await sendAction(actionPayload);
  };


  const leaveLobby = async () => {
    const actionPayload = createGameAction('lobbyLeave');
    await sendAction(actionPayload);
  };

  const deleteLobby = async () => {
    const actionPayload = createGameAction('lobbyDelete');
    await sendAction(actionPayload);
  };

  const categoryVote = async (voteType: string) => {
    const actionPayload = createGameAction('categoryVote', { voteType });
    await sendAction(actionPayload);
  };

  const contextValue = React.useMemo(
    () => ({
      gameState,
      subscribeToGame,
      unsubscribeFromGame,
      startGame,
      leaveLobby,
      deleteLobby,
      categoryVote,
    }),
    [gameState, unsubscribeFromGame, startGame, leaveLobby, deleteLobby, categoryVote]
  );

  return <GameContext.Provider value={contextValue}>{children}</GameContext.Provider>;
};

export const useGame = (): GameContextType => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};