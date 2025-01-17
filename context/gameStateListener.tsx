import { firestore } from '../firebaseConfig';
import { collection, query, where, onSnapshot, DocumentChange, DocumentData, QuerySnapshot } from 'firebase/firestore';
import { MainState, GameSettings, GameState, State } from '../app/types';


export const subscribeToGameState = (
  lobbyCode: string,
  onGameStateChange: (gameState: MainState | null) => void,
  onError: (error: any) => void
) => {
  const gamesCollection = collection(firestore, 'games');
  const q = query(gamesCollection, where('lobbyCode', '==', lobbyCode));
  console.log('Subscribing to game state with lobbyCode:', lobbyCode);

  let previousDocData: Record<string, DocumentData> = {};
const subscribe = onSnapshot(
  q,
  (querySnapshot: QuerySnapshot<DocumentData>) => {
    if (!querySnapshot.empty) {
      const docChanges = querySnapshot.docChanges();
      docChanges.forEach((change: DocumentChange<DocumentData>) => {
        const docId = change.doc.id;
        const currentData = change.doc.data();
        const previousData = previousDocData[docId] || {};

        if (change.type === 'added') {
          console.log('New game:', currentData);
        }

        if (change.type === 'modified') {
          // const differences = getDifferences(previousData, currentData);
          // console.log('Modified game (changes only):', differences);
          console.log('modified game:', currentData);

        }

        if (change.type === 'removed') {
          console.log('Removed game:', currentData);
        }

        if (change.type !== 'removed') {
          previousDocData[docId] = currentData;
        } else {
          delete previousDocData[docId];
        }
      });

      // Handle snapshot data as you were doing before
      const docSnap = querySnapshot.docs[0];
      const docData = docSnap.data();
        
        // Safely extract nested data from Firestore with default fallbacks
        const settingsData = docData.settings || {};
        const stateData = docData.state || {};
        const gameStateData = stateData.gameState || {};

        const settings: GameSettings = {
          endConditions: {
            time: settingsData?.endConditions?.time || '',
            score: settingsData?.endConditions?.score || 0,
            playerScore: settingsData?.endConditions?.playerScore || 0,
          },
          lobbyName: settingsData?.lobbyName || '',
          games: settingsData?.games || {},
        };

        const gameState: GameState = {
          phase: gameStateData?.phase || 'choosingCategory',
          phaseEnd: gameStateData?.phaseEnd || '',
          votes: gameStateData?.votes || {},
          categoryVotes: gameStateData?.categoryVotes || {},
          lettersCovered: gameStateData?.lettersCovered || [],
          playerTurn: gameStateData?.playerTurn || '',
          playersEliminated: gameStateData?.playersEliminated || [],
          categoriesCovered: gameStateData?.categoriesCovered || [],
          currentCategory: gameStateData?.currentCategory || '',
          selectedLetter: gameStateData?.selectedLetter || '',
          positiveVotes: gameStateData?.positiveVotes || [],
          negativeVotes: gameStateData?.negativeVotes || [],
          neutralVotes: gameStateData?.neutralVotes || [],
        };

        const state: State = {
          currentGame: stateData?.currentGame || '',
          phase: stateData?.phase || '',
          phaseEnd: stateData?.phaseEnd || '',
          scores: stateData?.scores || {},
          gameState: gameState,
        };

        const game: MainState = {
          gameId: docSnap.id,
          errors: docData?.errors ?? 0,
          lobbyCode: docData.lobbyCode || '',
          isLobbyOpen: docData?.isLobbyOpen ?? true,
          settings: settings,
          state: state,
          categories: docData.categories || [],
          alphabet: docData.alphabet || [],
          participants: docData.participants || [],
        };

        onGameStateChange(game);
      } else {
        //TODO Return an empty game state instead of erroring out, so the UI can handle it!
        const errorMessage = `No game found with lobbyCode: ${lobbyCode}`;
        console.error(errorMessage);
        onGameStateChange(null);
      }
    },
    (error) => {
      console.error('Error subscribing to game state:', error);
      onError(error);
    }
  );

  return subscribe;
};