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
  