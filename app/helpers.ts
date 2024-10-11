// helpers.ts
import { MainState } from './types';

export const isLobbyHost = (game: MainState | null, playerId: string) => {
    return game?.gameId === playerId;
    }


export const getCurrentGame = (game: MainState) => {
  const currentGameId = game.state.currentGame;
  return game.settings.games[currentGameId];
};

export const concatenateStrings = (strings: string[] | null): string => {
  if (!strings || strings.length === 0) {
    return '';
  }
  return strings.join('');
};



export const getCurrentGameType = (game: MainState) => {
    return getCurrentGame(game)?.type??'';
    }



export const getCurrentPhase = (game: MainState) => {
  return game.state.phase;
};

export const getPlayerScore = (game: MainState, playerId: string) => {
  return game.state.scores[playerId] || 0;
};

export const getCurrentCategory = (game: MainState) => {
  return game.state.gameState.currentCategory;
};

export const getPlayerTurn = (game: MainState) => {
  return game.state.gameState.playerTurn;
};


export const getTimeRemaining = (game: MainState, gameState: boolean) => {
  try {
    const currentTime = new Date().getTime();
    const phaseEndString = gameState ? game.state.gameState.phaseEnd : game.state.phaseEnd;
    if (!phaseEndString) {
      return 20;
    }
    
    const phaseEnd = new Date(phaseEndString).getTime();
    const timeLeft = phaseEnd - currentTime;
    const clampedTime = Math.max(0, timeLeft);
    return Math.floor(clampedTime / 1000); // Convert milliseconds to seconds
  } catch (error) {
    return 0;
  }
};
