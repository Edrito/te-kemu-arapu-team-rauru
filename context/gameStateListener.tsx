import { firestore } from '../firebaseConfig';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { MainState, GameSettings, GameState, State } from '../app/types';

export const subscribeToGameState = (
  lobbyCode: string,
  onGameStateChange: (gameState: MainState) => void,
  onError: (error: any) => void
) => {
  const gamesCollection = collection(firestore, 'games');
  const q = query(gamesCollection, where('lobbyCode', '==', lobbyCode));
  console.log('Subscribing to game state with lobbyCode:', lobbyCode);

  const subscribe = onSnapshot(
    q,
    (querySnapshot) => {
      if (!querySnapshot.empty) {
        const docSnap = querySnapshot.docs[0];
        console.log('Game state changed:', docSnap.data());
        var docData = docSnap.data();
        var stateData = docData.state;
        var gameStateData = docData.state.gameState;
        var settingsData = docData.settings;

        const settings: GameSettings = {
          endConditions: {
            time: settingsData.endConditions.time,
            score: settingsData.endConditions.score,
          },
          games: settingsData.games,
        };

        const gameState: GameState = gameStateData;
        const state: State = {
          ...stateData,
          gameState: gameState,
        };

        const game: MainState = {
          gameId: docSnap.id,
          errors: docData?.errors ?? 0,
          lobbyCode: docData.lobbyCode || '',
          isLobbyOpen: docData?.isLobbyOpen ?? true,
          settings: settings || {},
          state: state,
          participants: docData.participants || [],

        };

        onGameStateChange(game);

      } else {
        console.error('No game found with lobbyCode:', lobbyCode);
        onError(new Error('Game not found'));
      }
    },
    (error) => {
      console.error('Error subscribing to game state:', error);
      onError(error);
    }
  );

  return subscribe;
};