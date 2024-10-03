// app/types.ts

// Define the parameters for the GameLobby screen
export type GameLobbyParams = {
    lobbyName: string;        // Name of the lobby
    creator: string;         // Username of the lobby creator
    users: { username: string }[]; // List of users in the lobby
  };
  
  // Define the root stack parameter list for navigation
  export type RootStackParamList = {
    Lobby: undefined;         // No parameters for the Lobby screen
    GameLobby: GameLobbyParams; // Parameters for the GameLobby screen
  };
  
  export type GameScreenParams = {
    gameId: string;
    lobbyCode: string;
    mainState: MainState;
  };

  export type ScoresProps = {
    scores: { [playerId: string]: number };
  };

  
  export interface GameSettings {
    endConditions: {
      time: string;
      score: number;
    };
    games: {
      [key: string]: {
        type: string;
        endConditions: {
          duration: number;
          score: number;
        };
      };
    };
  }
  
  export interface GameState {
    phase: string;
    phaseEnd: string;
    positiveVotes: string[];
    negativeVotes: string[];
    neutralVotes: string[];
    lettersCovered: string[];
    playerTurn: string;
    playersEliminated: string[];
    categoriesCovered: string[];
    currentCategory: string;
    selectedLetter: string;
  }
  
  export interface State {
    currentGame: string;
    phase: string;
    phaseEnd: string;
    scores: {
      [playerId: string]: number;
    };
    gameState: GameState;
  }
  
  export interface MainState {
    gameId: string;
    errors: number;
    lobbyCode: string;
    isLobbyOpen: boolean;
    settings: GameSettings;
    participants: string[];
    state: State;
  }