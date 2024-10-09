import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import React, { useEffect, useState } from "react";
import PlayerBar from "te-kemu-arapu-compx374-team-rauru/components/PlayerBar";
import { SafeAreaView } from "react-native-safe-area-context";
import LobbyComponent from "te-kemu-arapu-compx374-team-rauru/components/LobbyComponent";
import { router } from "expo-router";

const LobbyHome = () => {
  // Path to current player icon
  // Testing purposes only
  const playerIconTest = "../assets/images/react-logo.png";

  const [lobbyName, setLobbyName] = useState("");

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
          minWidth: windowDimensions.width < 1036 ? "90%" : "50%",
          maxWidth: windowDimensions.width < 1036 ? "90%" : "50%",
        }}
        contentContainerStyle={{
          alignItems: "center",
        }}
      >
        <View className="items-center p-2">
          <Text className="font-pangolin text-[70px]">Te kēmu Arapū</Text>
          <Text className="font-pangolin text-[60px]">The Alphabet Game</Text>
        </View>

        <View className="items-center justify-center flex-row flex-wrap">
          <TextInput
            className="border-2 border-dashed text-center bg-orange-400 text-[30px] p-2 m-2 h-[60px]"
            onChangeText={setLobbyName}
            value={lobbyName}
            placeholder="-"
          ></TextInput>
          <TouchableOpacity className="justify-center h-[60px] border-2 border-dashed bg-orange-500 p-0.5 px-5 m-1 rounded ">
            <Text className="text-[30px] text-center font-pangolin">
              Join Lobby
            </Text>
          </TouchableOpacity>
        </View>

        <View className="w-[70%] h-[50%] items-center justify-center">
          <ScrollView className="border rounded-md bg-orange-400 p-3  m-2">
            <LobbyComponent lobbyIcon={playerIconTest} lobbyName="LOBBY NAME" />
            <LobbyComponent lobbyIcon={playerIconTest} lobbyName="LOBBY 2" />
            <LobbyComponent lobbyIcon={playerIconTest} lobbyName="LOBBY 3" />
            <LobbyComponent lobbyIcon={playerIconTest} lobbyName="LOBBY 4" />
 
          </ScrollView>
        </View>

        <TouchableOpacity onPress={() => router.push('/CreateLobby')} className="justify-center h-[60px] border-2 border-dashed bg-orange-500 p-0.5 px-5 m-2 rounded">
          <Text className="text-[30px] text-center font-pangolin">
            Create Lobby
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default LobbyHome;
