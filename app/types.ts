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
  
  export interface EndConditions {
    time: string;
    score: number;
  }
  
  export interface GameSettings {
    endConditions: EndConditions;
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
  
  export interface Game {
    gameId: string;
    errors: number;
    lobbyCode: string;
    isLobbyOpen: boolean;
    settings: GameSettings;
    participants: string[];
    state: State;
  }