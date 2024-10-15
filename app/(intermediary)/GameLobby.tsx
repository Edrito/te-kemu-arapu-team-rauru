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
  Alert,
  ImageBackground,
} from "react-native"; import { useAuth } from '../../context/AuthContext';
import { isLobbyHost } from '../helpers';
import { useGame } from '../../context/GameContext';
import { GameScreenParams } from "../types";
import { useLanguage } from '../../context/languageToggleButton';

const GameLobby: React.FC<GameScreenParams> =  ({ gameId, lobbyCode, mainState, playerProfiles }) => {
  const { gameState, startGame, leaveLobby, deleteLobby } = useGame();
  const { user } = useAuth();
  const { getText } = useLanguage();


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
        <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}>
        <ImageBackground
          source={require("te-kemu-arapu-compx374-team-rauru/assets/images/tekemuarapu-bg-80.jpg")}
          style={{
            flex: 1,
            width: '100%',
            height: '100%',
            opacity: 0.5,
          }}
          resizeMode="cover"
        />
      </View>

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
        </View>
        {gameState?.settings.lobbyName != null ? <View className="items-center ">
          <Text className="font-pangolin text-[46px] text-center">
           {
            gameState?.settings.lobbyName
           }
          </Text>
        </View>:null}
        <View className="items-center flex-row justify-between flex-1 m-3 border-4 border-dashed rounded-lg p-10 bg-green-950 min-h-[60px] max-h-[60px]">
          <Text className="text-white text-[30px] font-bold mr-5 font-pangolin">
            {getText('lobbyCode')}
          </Text>
          <Text className="text-[40px] font-bold border-2 border-dashed rounded-lg p-2 bg-white font-pangolin">
            {gameState?.lobbyCode ?? ''}
          </Text>
        </View>

        <View className="w-full h-[50%] justify-center">
          <ScrollView className="border rounded-md bg-orange-500 p-3 m-2">
            {playerProfiles.map((player) => (
              <LobbyComponent
                key={player.userId}
                username={player.username}
                icon={player.icon}
                color={player.color}
                userId={player.userId}
                difficulty={player.difficulty}
              />
            ))}
          </ScrollView>
        </View>

        <View >
        {isLobbyHostValue ? <TouchableOpacity
          // Send to game
          onPress={handleStartGame}
          className="justify-center h-[60px] border-2 border-dashed bg-green-700 p-0.5 px-5 m-2 rounded"
        >
          <Text className="text-[30px] text-center font-pangolin">
            {getText('startGame')}
          </Text>
        </TouchableOpacity> : null}

        <TouchableOpacity
            onPress={handleLeaveAction}
            className="justify-center h-[60px] border-2 border-dashed bg-red-500 p-0.5 px-5 m-2 rounded"
            >
              <Text className="text-[30px] text-center font-pangolin">
                {isLobbyHostValue ? getText('endGame') : getText('leaveGame')}
              </Text>
            </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default GameLobby;