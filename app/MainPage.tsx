import { useFonts } from "expo-font";
import { SafeAreaView } from "react-native-safe-area-context";
import "../global.css";
import { useProfileNavigation } from "../hooks/useProfilenav";
import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Pressable,
  ScrollView,
} from "react-native";
import { useAuth } from "../context/AuthContext";
import { router } from "expo-router";
import { createLobbyAction } from "../utils/apiFunctions";
import { sendPlayerAction } from "../utils/apiCall";
import JoinLobbyModal from "../components/JoinLobbyModal";
import CreateLobbyModal from "../components/CreateLobbyModal"; // Import the CreateLobbyModal component

export default function MainPage() {
  const [errorMessage, setErrorMessage] = useState("");

  const { user, signOutUser, userProfile } = useAuth();

  useProfileNavigation();

  // Load fonts
  const [fontsLoaded] = useFonts({
    Crayonara: require("../assets/fonts/Crayonara-Regular.ttf"),
  });

  const [isJoinModalVisible, setIsJoinModalVisible] = useState(false);
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
  
  
  const handleCreateLobby =  () => {
    if (!user) {
      console.error("User is not authenticated");
      setErrorMessage("You must be signed in to create a lobby.");
      return;
    }

    try {
      // const actionPayload = createLobbyAction(user.uid, lobbyName, "category");
      // const response = await sendPlayerAction(actionPayload);
      // const lobbyCode = response.lobbyCode;

      router.push({
        pathname: "/CreateLobby",
        // params: { lobbyCode },
      });
    } catch (error) {
      console.error("Error creating lobby:", error);
      setErrorMessage("Failed to create lobby");
    }
  };

  // Handle joining a lobby with a provided lobby code
  const handleJoinLobby = async (code: string) => {
    if (!user) {
      console.error("User is not authenticated");
      setErrorMessage("You must be signed in to join a lobby.");
      return;
    }

    try {
      const lobbyCode: string = code.trim();
      const actionPayload = {
        playerId: user.uid,
        lobbyCode: lobbyCode,
        action: {
          type: "lobbyJoin",
          details: {},
        },
      };
      console.log("Joining Lobby:", lobbyCode);
      await sendPlayerAction(actionPayload);

      router.push({
        pathname: "/Game",
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
    <SafeAreaView className="flex-1 bg-primary_red">
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={true}
        keyboardShouldPersistTaps="handled"
      >
        {/* Title */}
        <Text className="text-[60px] font-bold text-white mb-12 font-pangolin text-center">
          Te Kēmu Arapū
        </Text>

        <Text
          style={{
            color: "#fff",
            fontSize: 20,
            marginBottom: 20,
            textAlign: "center",
          }}
        >
          Welcome, {userProfile?.username ?? "Player"}!
        </Text>

        {errorMessage ? (
          <Text className="text-red-400 font-bold text-[15px] mb-5 text-center">
            {errorMessage}
          </Text>
        ) : null}

        {/* Button Container */}
        <View className="justify-center w-[80%] mb-5 self-center">
          {/* JOIN Button */}
          <TouchableOpacity
            className="bg-green-700 py-3.5 px-7.5 rounded-lg my-2.5 items-center border-dashed border-2 border-black"
            onPress={() => setIsJoinModalVisible(true)}
          >
            <Text className="text-[18px] font-bold text-white">JOIN</Text>
          </TouchableOpacity>

          {/* CREATE Button */}
          <TouchableOpacity
            className="bg-green-700 py-3.5 px-7.5 rounded-lg my-2.5 items-center border-2 border-dashed border-black"
            onPress={handleCreateLobby}
          >
            <Text className="text-[18px] font-bold text-white">CREATE</Text>
          </TouchableOpacity>
        </View>

        <Pressable onPress={signOutUser}>
          <Text
            style={{ color: "#fff", fontSize: 16, textAlign: "center" }}
          >
            Sign Out
          </Text>
        </Pressable>

        {/* Footer */}
        <Text className="mt-24 text-[20px] text-black text-center">DEMO</Text>
      </ScrollView>

      {/* Join Lobby Modal */}
      <JoinLobbyModal
        visible={isJoinModalVisible}
        onClose={() => setIsJoinModalVisible(false)}
        onJoin={(code) => {
          setIsJoinModalVisible(false);
          handleJoinLobby(code);
        }}
      />

      {/* Create Lobby Modal */}
      {/* <CreateLobbyModal
        visible={isCreateModalVisible}
        onClose={() => setIsCreateModalVisible(false)}
        onCreate={(lobbyName) => {
          setIsCreateModalVisible(false);
          handleCreateLobby(lobbyName);
        }}
      /> */}
    </SafeAreaView>
  );
}