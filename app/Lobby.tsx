
import { useFonts } from "expo-font";
import { SafeAreaView } from "react-native-safe-area-context";
import "../global.css";
import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, Pressable } from "react-native";
import { useAuth } from "../context/AuthContext";
import { router } from "expo-router";
import { createLobbyAction, joinLobbyAction } from "../utils/gamePayload";
import { sendPlayerAction } from "../utils/apiServices";

export default function Lobby() {
  const [lobbyName, setLobbyName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const {user, signOutUser, userProfile} = useAuth();

  useEffect(() => {
    if (!user || !userProfile) {
      router.push("/");
    }
  }, [user, userProfile]);
  
  // Load fonts
  const [fontsLoaded] = useFonts({
    Crayonara: require("../assets/fonts/Crayonara-Regular.ttf"),
  });


  const handleCreateLobby = async () => {

    if (!user) {
      console.error("User is not authenticated");
      return;
    }
    
    try{
      const gameType : string = "catagory";
      const actionPayload = createLobbyAction(user.uid, user.uid, gameType);

      const response = await sendPlayerAction(actionPayload);
      const lobbyCode : string = response.lobbyCode

      router.push({
        pathname: "/GameLobby",
        params: { lobbyCode },
      });

      }catch(error){
        console.error("Error creating lobby:", error);
        setErrorMessage("Failed to create lobby");
    }
  };

const handleJoinLobby = async () => {
      if (lobbyName.trim() === "") {
        setErrorMessage("Please enter a lobby code.");
        return;
      }

      if (!user) {
        console.error("User is not authenticated");
        return;
      }

      try {
        const lobbyCode: string = lobbyName.trim();
        const actionPayload = joinLobbyAction(user.uid, lobbyCode);
        console.log("Joining Lobby:", lobbyCode);
        await sendPlayerAction(actionPayload);

        router.push({
          pathname: "/GameLobby",
          params: { lobbyCode },
        });
      } catch (error) {
        console.error("Error joining lobby:", error);
        setErrorMessage("Failed to join lobby");
      }
  };

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

      <Text style={{ color: "#fff", fontSize: 20, marginBottom: 20 }}>
        Welcome, {userProfile?.username || "Player"}!
      </Text>

      {/* Input for lobby name */}
      <TextInput
        className="h-[40px] border-gray-500 border w-[80%] mb-5 px-2.5 bg-white"
        placeholder="Enter lobby name"
        value={lobbyName}
        onChangeText={setLobbyName}
      />

      {errorMessage ? (
        <Text className="text-red-400 font-bold text-[15px] mb-5">{errorMessage}</Text>
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

      <Pressable onPress={signOutUser}>
        <Text style={{ color: "#fff", fontSize: 16 }}>Sign Out</Text>
      </Pressable>

      {/* Footer */}
      <Text className="mt-24 text-[20px] text-black">DEMO</Text>
    </SafeAreaView>
  );
}
