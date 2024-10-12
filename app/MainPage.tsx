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
  Modal,
  ImageBackground,
} from "react-native";
import { useAuth } from "../context/AuthContext";
import { router } from "expo-router";
import { createLobbyAction } from "../utils/apiFunctions";
import { sendPlayerAction } from "../utils/apiCall";
import JoinLobbyModal from "../components/JoinLobbyModal";
import CreateLobbyModal from "../components/CreateLobbyModal"; // Import the CreateLobbyModal component
import PlayerBar from "te-kemu-arapu-compx374-team-rauru/components/PlayerBar";
import { useLanguage } from "te-kemu-arapu-compx374-team-rauru/context/languageToggleButton";

export default function MainPage() {
  const [errorMessage, setErrorMessage] = useState("");
  const { getText } = useLanguage();
  const { user, signOutUser, userProfile } = useAuth();

  useProfileNavigation();

  // Load fonts
  const [fontsLoaded] = useFonts({
    Crayonara: require("../assets/fonts/Crayonara-Regular.ttf"),
  });

  const [isJoinModalVisible, setIsJoinModalVisible] = useState(false);
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
  const [gameGuideModal, setGameGuideModal] = useState(false);

  const handleCreateLobby = () => {
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
      <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}>
        <ImageBackground
          source={require("../assets/images/tekemuarapu-bg-80.jpg")}
          style={{
            flex: 1,
            width: '100%',
            height: '100%',
            opacity: 0.5,
          }}
          resizeMode="cover"
        />
      </View>
      
      {/* Main Content Goes Here */}
      <PlayerBar playerIcon={""} />
      <ScrollView
        className="p-5"
        contentContainerStyle={{ flexGrow: 1, alignItems: "center" }}
        showsVerticalScrollIndicator={true}
        keyboardShouldPersistTaps="handled"
      >
        {/* Title */}
        <Text className="text-[60px] font-bold text-white mb-12 font-pangolin text-center">
          Te Kēmu Arapū
        </Text>

        {/* User Information */}
        <Text
          style={{
            color: "#fff",
            fontSize: 20,
            marginBottom: 20,
            textAlign: "center",
          }}
        >
          {getText('welcome')}, {userProfile?.username ?? "Player"}!
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
            <Text className="text-[18px] font-bold text-white">{getText('join')}</Text>
          </TouchableOpacity>

          {/* CREATE Button */}
          <TouchableOpacity
            className="bg-green-700 py-3.5 px-7.5 rounded-lg my-2.5 items-center border-2 border-dashed border-black"
            onPress={handleCreateLobby}
          >
            <Text className="text-[18px] font-bold text-white">{getText('create')}</Text>
          </TouchableOpacity>
        </View>

        <Pressable onPress={signOutUser}>
          <Text style={{ color: "#fff", fontSize: 16, textAlign: "center" }}>
            {getText('signOut')}
          </Text>
        </Pressable>

        <TouchableOpacity
          className="items-center justify-center border-2 border-dashed w-[100px] p-3 bg-orange-400 absolute bottom-5 right-5"
          onPress={() => setGameGuideModal(true)}
        >
          <Text className="text-center font-pangolin text-[20px]">
            How to Play
          </Text>
        </TouchableOpacity>

        {/* Game Guide Modal */}
        <Modal
          visible={gameGuideModal}
          onRequestClose={() => setGameGuideModal(false)}
          animationType="slide"
          presentationStyle="pageSheet"
        >
          <ScrollView
            contentContainerStyle={{
              alignItems: "center",
              paddingBottom: 20,
              paddingTop: 20,
            }}
            className="flex-1 flex-start bg-primary_red"
          >
            <Text className="text-[60px] m-5 font-pangolin text-center font-bold text-white">
              Te Kēmu Arapū
            </Text>
            <Text className="text-[30px] m-5 font-pangolin text-center">
              A fun spoken game for family and friends to practice the Māori
              language! No board or cards needed—just your voice and some good
              company. Players have a time limit to guess, and others can vote
              on pronunciation. Perfect for gatherings and boosting te reo Māori
              skills!
            </Text>
            <Text className="text-[50px] m-5 font-pangolin text-center underline font-bold">
              Gamemodes
            </Text>
            <Text className="text-[30px] m-5 font-pangolin text-center">
              <Text className="font-bold text-orange-500
              underline">Category: </Text>
              Pick a category and a letter. Say a word in that category starting with the chosen letter.
            </Text>
            <Text className="text-[30px] m-5 font-pangolin text-center">
              <Text className="font-bold text-orange-500 underline">Random: </Text>
              A letter is picked at random, and you need to say a word that starts with it.
            </Text>
            <TouchableOpacity
              className="border-2 border-dashed bg-green-700 my-5"
              onPress={() => setGameGuideModal(false)}
            >
              <Text className="font-pangolin text-[30px] text-center p-0.5 px-5 m-1 rounded">
                Close
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </Modal>

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
    </SafeAreaView>

  );
}
