import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useFonts } from "expo-font";
import { SafeAreaView } from "react-native-safe-area-context";
import "../global.css";

export default function Lobby() {
  const [lobbyName, setLobbyName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Load fonts
  const [fontsLoaded] = useFonts({
    Crayonara: require("../assets/fonts/Crayonara-Regular.ttf"), // Adjust path as needed
  });

  const handleCreateLobby = () => {
    if (lobbyName.trim() === "") {
      setErrorMessage("Please enter a lobby name.");
    } else {
      setErrorMessage("");
      console.log("Lobby Created:", lobbyName);
      // Add your create lobby functionality here
    }
  };

  const handleJoinLobby = () => {
    if (lobbyName.trim() === "") {
      setErrorMessage("Please enter a lobby name.");
    } else {
      setErrorMessage("");
      console.log("Joining Lobby:", lobbyName);
      // Add your join lobby functionality here
    }
  };

  // Show a loading indicator or placeholder until fonts are loaded
  if (!fontsLoaded) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center bg-primary_red">
        <ActivityIndicator size="large" color="#ffffff" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 justify-center items-center bg-primary_red">
      {/* Title */}
      <Text className="text-[60px] font-bold text-white mb-12 font-pangolin">
        Te Kēmu Arapū
      </Text>

      {/* Input for lobby name */}
      <TextInput
        className="h-[40px] border-gray-500 border w-[80%] mb-5 px-2.5 bg-white"
        placeholder="Enter lobby name"
        value={lobbyName}
        onChangeText={setLobbyName}
      />

      {errorMessage ? (
        <Text className="text-red-500 mb-5">{errorMessage}</Text>
      ) : null}

      {/* Button Container */}
      <View className="justify-center w-[80%] mb-5">
        <TouchableOpacity
          className="bg-[#CD853F] py-3.5 px-7.5 rounded-lg my-2.5 items-center border-dashed border-2 border-black"
          onPress={handleJoinLobby}
        >
          <Text className="text-[18px] font-bold text-white">JOIN</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="bg-[#CD853F] py-3.5 px-7.5 rounded-lg my-2.5 items-center border-2 border-dashed border-black"
          onPress={handleCreateLobby}
        >
          <Text className="text-[18px] font-bold text-white">CREATE</Text>
        </TouchableOpacity>
      </View>

      {/* Footer */}
      <Text className="mt-24 text-[20px] text-black">DEMO</Text>
    </SafeAreaView>
  );
}
