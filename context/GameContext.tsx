import React, { createContext, useState, useContext } from 'react';
import { sendPlayerAction } from '../utils/apiCall';
import { MainState } from '../app/types';
import { subscribeToGameState } from '../context/gameStateListener';
import { useAuth } from './AuthContext';
import { GameSettings } from '../app/types';

interface GameContextType {
  gameState: MainState | null;
  subscribeToGame: (lobbyCode: string) => void;
  unsubscribeFromGame: () => void;
  resetGameState: () => void;
  startGame: () => Promise<void>;
  leaveLobby: () => Promise<void>;
  deleteLobby: () => Promise<void>;
  categoryVote: (voteType: string) => Promise<void>;
  selectLetter: (letter: string) => Promise<void>;
  passTurn: () => Promise<void>;
  playerVote: (voteType: string) => Promise<void>;
  lobbyUpsert: (lobbyConfig: GameSettings) => Promise<any>;
}



const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider = ({ children }: { children: React.ReactNode }) => {
  const [gameState, setGameState] = useState<MainState | null>(null);
  const [unsubscribe, setUnsubscribe] = useState<(() => void) | null>(null);
  const { user } = useAuth();
  const playerId = user?.uid;

  // Function to subscribe to a game
  const subscribeToGame = (lobbyCode: string) => {
    if (unsubscribe) {
      unsubscribe();
    }

    const unsubscribeFn = subscribeToGameState(
      lobbyCode,
      (newGameState: MainState | null) => setGameState(newGameState),
      (error: any) => console.error('Error in game subscription:', error)
    );
    setUnsubscribe(() => unsubscribeFn);
  };

  // Function to reset game state and unsubscribe
  const resetGameState = () => {
    if (unsubscribe) {
      unsubscribe();
    }
    setUnsubscribe(null);
    setGameState(null);
  };

  // Unsubscribe from the game state
  const unsubscribeFromGame = () => {
    resetGameState();
  };

  // Create a game action
  const createGameAction = (actionType: string, details: any = {}) => {
    if (!playerId || !gameState?.gameId) return null;
    return  ({
      "action":{
        "type": actionType,
      details,

      },
      gameId: gameState.gameId,
      playerId,
      lobbyCode: gameState.lobbyCode,
    });
  };

  // Send player action to the server
  const sendAction = async (actionPayload: any) => {
    if (!actionPayload) return;
    try {
      await sendPlayerAction(actionPayload);
    } catch (error) {
      console.error('Error sending action:', error);
    }
  };

  // Start a new game
  const startGame = async () => {
    const actionPayload = createGameAction('lobbyStart');
    await sendAction(actionPayload);
  };

  // Leave the lobby
  const leaveLobby = async () => {
    const actionPayload = createGameAction('lobbyLeave');
    await sendAction(actionPayload);
  };

  // Delete the lobby
  const deleteLobby = async () => {
    const actionPayload = createGameAction('lobbyDelete');
    await sendAction(actionPayload);
  };

  const lobbyUpsert = async (lobbyConfig: GameSettings) => {
    const actionPayload = {
      gameId: gameState?.gameId,
      playerId,
      action: {
        type: 'lobbyUpsert',
        details: {
          "settings":lobbyConfig
        },
      },
    };
    console.log('Upserting lobby:', actionPayload);
    return await sendPlayerAction(actionPayload);
  }

  // Vote on a category
  const categoryVote = async (category: string) => {
    const actionPayload = createGameAction('categoryVote', { category });
    await sendAction(actionPayload);
  };

  const selectLetter = async (letter: string) => {
    const actionPayload = createGameAction('letterSelect', { letter });
    await sendAction(actionPayload);
  }

  const passTurn = async () => {
    const actionPayload = createGameAction('pass');
    await sendAction(actionPayload);
  }

  const playerVote = async (voteType: string) => {
    const actionPayload = createGameAction('vote', { voteType });
    await sendAction(actionPayload);
  }

  // Context value to be provided to children components
  const contextValue = React.useMemo(
    () => ({
      gameState,
      subscribeToGame,
      unsubscribeFromGame,
      resetGameState,
      startGame,
      leaveLobby,
      deleteLobby,
      selectLetter,
      passTurn,
      categoryVote,
      playerVote,
      lobbyUpsert,
    }),
    [gameState,
      selectLetter,
      passTurn,
      playerVote,

      unsubscribeFromGame,lobbyUpsert, startGame, leaveLobby, deleteLobby, categoryVote]
  );

  return <GameContext.Provider value={contextValue}>{children}</GameContext.Provider>;
};

// Hook to use the GameContext
export const useGame = (): GameContextType => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};