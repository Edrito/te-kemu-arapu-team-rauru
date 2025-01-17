import React, { useState } from "react";
import { Modal, Pressable, SafeAreaView, ScrollView, TextInput, View, Text, useWindowDimensions, ImageBackground } from "react-native";
import { useRouter } from "expo-router";
import DifficultyDropdown from "../components/DifficultyDropdown";
import SelectIcon from "../components/SelectIcon";
import { collection, setDoc, doc } from "firebase/firestore";
import { firestore } from "../firebaseConfig";
import { useAuth } from "../context/AuthContext";
import colorOptions from "../constants/Colors";
import { ProfileData } from "./types";
import { useLanguage } from "../context/languageToggleButton";
import PlayerBar from "../components/PlayerBar";

const Profile: React.FC = () => {
  const { user, setUserProfile } = useAuth();
  const router = useRouter();
  const [difficulty, setDifficulty] = useState("Select");
  const [icon, setIcon] = useState<string | null>(null);
  const [username, setUsername] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>(colorOptions.colorOptions[0]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { getText } = useLanguage();


  const handleCreateProfile = async () => {
    setErrorMessage(null);

    if (!user?.uid) {
      setErrorMessage("User ID not found. Please sign in again.");
      return;
    }

    if (!username.trim() || difficulty === "Select" || !icon || !selectedColor) {
      setErrorMessage("Please fill in all fields.");
      return;
    }

    const profileData: ProfileData = {
      username: username.trim(),
      difficulty: difficulty,
      icon: icon,
      userId: user.uid,
      color: selectedColor,
    };
    
    try {
      await addProfileData(profileData);
      setUserProfile(profileData);
      router.push(`/MainPage`);
    } catch (error) {
      setErrorMessage("Error creating profile. Please try again.");
    }
  };

  const addProfileData = async (profile: ProfileData) => {
    try {
      const profileRef = doc(collection(firestore, "profile"), user?.uid ?? profile.userId);
      await setDoc(profileRef, profile);
      console.log("Document written with ID:", profile.userId);
    } catch (error) {
      console.error("Error adding document:", error);
      throw error;
    }
  };

  const handleIconSelect = (icon: string, color: string) => {
    setIcon(icon);
    setSelectedColor(color);
  };

  return (
    <SafeAreaView className="flex-1 justify-center items-center bg-primary_red pb-2">
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

      <PlayerBar playerIcon={icon ?? ""} />

      <ScrollView className="flex-1 w-full md:w-4/6 px-4 pb-10" contentContainerStyle={{ alignItems: "center" }}>
        <Text className="font-pangolin text-4xl md:text-6xl text-center p-5">{getText("createProfile")}</Text>

        {/* Username Input */}
        <View className="w-full flex items-center mb-8">
          <TextInput
            className="w-full max-w-2xl h-12 border-2 border-green-700 rounded-lg px-4 bg-white text-[18px] text-[#333] shadow-md text-center"
            placeholder={getText('enterUsername')}
            placeholderTextColor="#888"
            value={username}
            onChangeText={setUsername}
          />
        </View>

        {/* Difficulty Dropdown */}
        <View className="w-full justify-center items-center mb-8 z-10">
          <DifficultyDropdown onSelect={setDifficulty} />
        </View>
        {/* Icon selection */}
        <View className="w-full mb-8 min-w-[300px] z-5">
          <SelectIcon onSelect={handleIconSelect} />
        </View>

        {/* Create Button */}
         <Pressable onPress={handleCreateProfile} className="bg-green-700 py-3 rounded text-center border-2 border-black border-dashed">
          <Text className="font-pangolin text-2xl p-2 rounded text-white">
            {getText('create')}
          </Text>
        </Pressable>

        {/* Error Message */}
        {errorMessage && (
          <Text className="text-white font-bold text-xl text-center mt-4">{errorMessage}</Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
