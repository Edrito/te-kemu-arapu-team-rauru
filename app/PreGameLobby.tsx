import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import React, { useEffect, useState } from "react";
import PlayerBar from "te-kemu-arapu-compx374-team-rauru/components/PlayerBar";
import { SafeAreaView } from "react-native-safe-area-context";
import LobbyComponent from "te-kemu-arapu-compx374-team-rauru/components/LobbyComponent";
import { router } from "expo-router";

const PreGameLobby = () => {
  // Path to current player icon
  // Testing purposes only
  const playerIconTest = "../assets/images/react-logo.png";
  const lobbyCode = "H02Dwd2";

  // This is so that the page changes size in real time when screen size changes
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
    <SafeAreaView className="flex-1 bg-primary_red items-center">
      <View className="w-full">
        <PlayerBar playerIcon={playerIconTest} />
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
          <Text className="font-pangolin text-[60px] text-center">
            The Alphabet Game
          </Text>
        </View>

        <View className="items-center flex-row justify-between flex-1 m-3 border-4 border-dashed rounded-lg p-3 bg-green-950 min-h-[60px] max-h-[60px]">
          <Text className="text-white text-[20px] font-bold mr-5 font-pangolin">
            Lobby Code:
          </Text>
          <Text className="text-[20px] font-bold border-2 border-dashed rounded-lg p-1 bg-white font-pangolin">
            {lobbyCode}
          </Text>
        </View>

        <View className="w-full h-[50%] items-center justify-center">
          <ScrollView className="border rounded-md bg-orange-400 p-3 m-2">
            {/* Insert players here */}
            <LobbyComponent lobbyIcon={playerIconTest} lobbyName="PLAYER 1" />
            <LobbyComponent lobbyIcon={playerIconTest} lobbyName="PLAYER 2" />
            <LobbyComponent lobbyIcon={playerIconTest} lobbyName="PLAYER 3" />
            <LobbyComponent lobbyIcon={playerIconTest} lobbyName="PLAYER 4" />

          </ScrollView>
        </View>

        <TouchableOpacity
          // Send to game
          onPress={() => router.push("/gameState")}
          className="justify-center h-[60px] border-2 border-dashed bg-orange-500 p-0.5 px-5 m-2 rounded"
        >
          <Text className="text-[30px] text-center font-pangolin">
            Start Game
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PreGameLobby;
