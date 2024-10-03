import { firestore } from '../firebaseConfig';
import { collection, query, where, onSnapshot } from 'firebase/firestore';

export const subscribeToGameState = (
  lobbyCode: string,
  onGameStateChange: (gameState: any) => void,
  onError: (error: any) => void
) => {
  const gamesCollection = collection(firestore, 'games');
  const q = query(gamesCollection, where('lobbyCode', '==', lobbyCode));
  console.log('Subscribing to game state with lobbyCode:', lobbyCode);

const unsubscribe = onSnapshot(
    q,
    (querySnapshot) => {
      if (!querySnapshot.empty) {
        const docSnap = querySnapshot.docs[0];
        console.log('Game state changed:', docSnap.data());
        onGameStateChange(docSnap.data());
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

  return unsubscribe;
};