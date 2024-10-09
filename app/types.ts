// app/types.ts


export interface ProfileData {
  username: string;
  difficulty: string;
  icon: string | null;
  color: string;
  userId: string;
}

// Define the parameters for the GameLobby screen
export type GameLobbyParams = {
  lobbyName: string; // Name of the lobby
  creator: string; // Username of the lobby creator
  users: { username: string }[]; // List of users in the lobby
};

// Define the root stack parameter list for navigation
export type RootStackParamList = {
  Lobby: undefined; // No parameters for the Lobby screen
  GameLobby: GameLobbyParams; // Parameters for the GameLobby screen
};

// Define the parameters for the GameScreen
export type GameScreenParams = {
  gameId: string;
  lobbyCode: string;
  mainState: MainState;
  playerProfiles: ProfileData[];
};

// Scores for each player
export type Scores = { [playerId: string]: number };

// ScoresProps type for components
export type ScoresProps = {
  scores: Scores;
};

// Interface for game end conditions
export interface GameEndConditions {
  time: number; // seconds
  score: number;
  maxCategories: number;
}

export interface LobbyEndConditions {
  time: number; // seconds
  score: number;
  playerScore: number;
}


// Interface for individual game settings
export interface Game {
  type: string; // Game type (e.g., "category", "random")
  endConditions: GameEndConditions;
}

// Interface for all game settings
export interface Games {
  [key: string]: Game; // e.g., "0": Game, "1": Game, etc.
}

// Interface for overall game settings
export interface GameSettings {
  endConditions: LobbyEndConditions;
  lobbyName: string;
  games: Games;


}

// Interface for internal game state
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
  categoryVotes: { [category: string]: string[] };
  votes: { [playerId: string]: string };
}

export interface State {
  currentGame: string;
  phase: string;
  phaseEnd: string;
  scores: Scores;
  gameState: GameState;
}

// Interface for the main state of the entire game context
export interface MainState {
  gameId: string;
  errors: number;
  lobbyCode: string; // A 4-digit code containing letters and numbers
  isLobbyOpen: boolean;
  settings: GameSettings;
  participants: string[];
  categories: string[];
  alphabet: string[];
  state: State;
}