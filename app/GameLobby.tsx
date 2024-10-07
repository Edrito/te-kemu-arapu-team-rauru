import React from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { isLobbyHost } from './helpers';
import { useGame } from '../context/GameContext';

const GameLobby: React.FC = () => {
  const { gameState, startGame } = useGame();
  const { user } = useAuth();

  const handleStartGame = async () => {
    if (!gameState || !user) {
      return;
    }

    const isUserLobbyHost = isLobbyHost(gameState, user.uid);

    if (!isUserLobbyHost) {
      Alert.alert('Error', 'Only the lobby creator can start the game.');
      return;
    }
    try {
      await startGame();
      Alert.alert('Success', 'The game has started!');
    } catch (error) {
      console.error('Failed to start the game:', error);
      Alert.alert('Error', 'Failed to start the game.');
    }
  };

  return (
    <View>
      <Text>Game Lobby</Text>
      <Text>Lobby Code: {gameState?.lobbyCode}</Text>
      <Text>Players:</Text>
      {gameState?.participants.map((playerId) => (
        <Text key={playerId}>{playerId}</Text>
      ))}
      
      {/* Conditional rendering to ensure `gameState` is not null */}
      {gameState && user && isLobbyHost(gameState, user?.uid) && (
        <TouchableOpacity onPress={handleStartGame}>
          <Text>Start Game</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default GameLobby;