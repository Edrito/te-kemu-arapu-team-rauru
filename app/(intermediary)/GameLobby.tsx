import React, { useEffect, useState } from "react";
import PlayerBar from "te-kemu-arapu-compx374-team-rauru/components/PlayerBar";
import { SafeAreaView } from "react-native-safe-area-context";
import LobbyComponent from "te-kemu-arapu-compx374-team-rauru/components/LobbyComponent";
import { router } from "expo-router"; import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Alert
} from "react-native"; import { useAuth } from '../../context/AuthContext';
import { isLobbyHost } from '../helpers';
import { useGame } from '../../context/GameContext';
import { GameScreenParams } from "../types";

const GameLobby: React.FC<GameScreenParams> =  ({ gameId, lobbyCode, mainState, playerProfiles }) => {
  const { gameState, startGame, leaveLobby, deleteLobby } = useGame();
  const { user } = useAuth();


  const isLobbyHostValue = isLobbyHost(gameState, user?.uid ?? '');
  const handleLeaveAction = async () => {
    if (!gameState || !user) {
      return;
    }

    try {
      if (isLobbyHostValue) {
        await deleteLobby();
        router.push('/MainPage');
        Alert.alert('Success', 'You have closed the game.');
        return;
      }
      leaveLobby();
      Alert.alert('Success', 'You have left the game.');
      router.push('/MainPage');
    } catch (error) {
      console.error('Failed to leave the game:', error);
      Alert.alert('Error', 'Failed to leave the game.');



    }
  }
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

  const [windowDimensions, setWindowDimensions] = useState(
    Dimensions.get("window")
  );
  useEffect(() => {
    // Function to handle resizing of the window
    const resizeScreen = () => {
      // Update the state with the current window dimensions
      setWindowDimensions(Dimensions.get("window"));
    };

    // Listen to changes in screen size
    const subscription = Dimensions.addEventListener("change", resizeScreen);

    // End listener
    return () => subscription?.remove();
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-primary_red items-center m-2">


      <ScrollView
        style={{
          flex: 1,
          minWidth: windowDimensions.width < 1036 ? "90%" : "50%",
          maxWidth: windowDimensions.width < 1036 ? "90%" : "50%",
        }}
        contentContainerStyle={{
          alignItems: "center",
          paddingBottom: 20,
        }}
      >
        <View className="items-center m-5 p-2">
          <Text className="font-pangolin text-[70px] text-center">
            Te kēmu Arapū
          </Text>
          <Text className="font-pangolin text-[60px] text-center">
            The Alphabet Game
          </Text>
        </View>

        <View className="items-center flex-row justify-between flex-1 m-3 border-4 border-dashed rounded-lg p-3 bg-green-950 min-h-[60px] max-h-[60px]">
          <Text className="text-white text-[20px] font-bold mr-5 font-pangolin">
            Lobby Code:
          </Text>
          <Text className="text-[20px] font-bold border-2 border-dashed rounded-lg p-1 bg-white font-pangolin">
            {gameState?.lobbyCode ?? ''}
          </Text>
        </View>

        <View className="w-full h-[50%]  justify-center">
          <ScrollView className="border rounded-md bg-orange-400 p-3 m-2">
         { playerProfiles.map((player) => (
            <LobbyComponent  username={player.username}
              icon={player.icon}
              color={player.color}
              userId={player.userId}
              difficulty={player.difficulty}

            />))}

          </ScrollView>
        </View>
        <View >
          <TouchableOpacity
            // Send to game
            onPress={handleLeaveAction}
            className="justify-center h-[60px] border-2 border-dashed bg-orange-500 p-0.5 px-5 m-2 rounded"
          >
            <Text className="text-[30px] text-center font-pangolin">
              {isLobbyHostValue ? 'End Game' : 'Leave Lobby'}
            </Text>
          </TouchableOpacity>
        </View>
        {isLobbyHostValue ? <TouchableOpacity
          // Send to game
          onPress={handleStartGame}
          className="justify-center h-[60px] border-2 border-dashed bg-orange-500 p-0.5 px-5 m-2 rounded"
        >
          <Text className="text-[30px] text-center font-pangolin">
            Start Game
          </Text>
        </TouchableOpacity> : null}
      </ScrollView>
    </SafeAreaView>
  );
};

export default GameLobby;