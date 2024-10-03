// helpers.ts
import { Game } from './types';

export const isLobbyHost = (game: Game, playerId: string) => {
    return game.gameId === playerId;
    }


export const getCurrentGame = (game: Game) => {
  const currentGameId = game.state.currentGame;
  return game.settings.games[currentGameId];
};



export const getCurrentGameType = (game: Game) => {
    return getCurrentGame(game).type;
    }



export const getCurrentPhase = (game: Game) => {
  return game.state.phase;
};

export const getPlayerScore = (game: Game, playerId: string) => {
  return game.state.scores[playerId] || 0;
};

export const getCurrentCategory = (game: Game) => {
  return game.state.gameState.currentCategory;
};

export const getPlayerTurn = (game: Game) => {
  return game.state.gameState.playerTurn;
};
