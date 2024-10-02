import { useFonts } from "expo-font";

import { SafeAreaView } from "react-native-safe-area-context";
import "../global.css";
import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, Pressable, ScrollView } from "react-native";
import { useAuth } from "../context/AuthContext";
import { router } from "expo-router";

export default function Lobby() {
  const [lobbyName, setLobbyName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const { user, signOutUser, userProfile } = useAuth();

  useEffect(() => {
    if (!user || !userProfile) {
      router.push("/");
    }
  }, [user, userProfile]);

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
    <SafeAreaView className="flex-1 bg-primary_red">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={true} keyboardShouldPersistTaps="handled">
        {/* Title */}
        <Text className="text-[60px] font-bold text-white mb-12 font-pangolin text-center">
          Te Kēmu Arapū
        </Text>

        <Text style={{ color: "#fff", fontSize: 20, marginBottom: 20, textAlign: "center" }}>
          Welcome, {userProfile?.username || "Player"}!
        </Text>

        {/* Input for lobby name */}
        <TextInput
          className="h-[40px] border-gray-500 border w-[80%] mb-5 px-2.5 bg-white self-center"
          placeholder="Enter lobby name"
          value={lobbyName}
          onChangeText={setLobbyName}
        />

        {errorMessage ? (
          <Text className="text-red-400 font-bold text-[15px] mb-5 text-center">{errorMessage}</Text>
        ) : null}

        {/* Button Container */}
        <View className="justify-center w-[80%] mb-5 self-center">
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

        <Pressable onPress={signOutUser}>
          <Text style={{ color: "#fff", fontSize: 16, textAlign: "center" }}>Sign Out</Text>
        </Pressable>

        {/* Footer */}
        <Text className="mt-24 text-[20px] text-black text-center">DEMO</Text>
      </ScrollView>
    </SafeAreaView>
  );
}
