import React, { useState } from "react";
import "../global.css";
import { SafeAreaView, Text, Modal, View, Pressable, TextInput, Alert, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import Dropdown from "../components/Dropdown";
import SelectIcon from "../components/SelectIcon";
import { addDoc, collection } from "firebase/firestore";
import { firestore } from "../firebaseConfig";
import { useAuth } from "../context/AuthContext";


interface ProfileData {
  username: string;
  difficulty: string;
  icon: string | null;
}

const Profile: React.FC = () => {
  const { user, setUserProfile } = useAuth();
  const router = useRouter();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [difficulty, setDifficulty] = useState("Select");
  const [icon, setIcon] = useState<string | null>(null);
  const [username, setUsername] = useState<string>("");

  const handleCreateProfile = async () => {
      try {
          if (!user || !user.uid) {
            Alert.alert("User ID not found. Please sign in again.");
            return;
          }

      const profileData: ProfileData = {
        username: username.trim() ?? "Player",
        difficulty: difficulty ?? "Beginner", 
        icon: icon,
      };

        await addProfileData(profileData);

        setUserProfile({ userId: user.uid, ...profileData, icon: profileData.icon ?? "default" });


        router.push(`/MainPage`);
      } catch (error) {
        Alert.alert("Error creating profile: " + error);
      }
    };


  const addProfileData = async (profile: ProfileData) => {
      try {
        const docRef = await addDoc(collection(firestore, "profile"), {
          userId: user?.uid,
          ...profile,
        });
        console.log("Document written with ID: ", docRef.id);
      } catch (error) {
        console.error("Error adding document:", error);
        throw error;
      }
    };

  return (
    <SafeAreaView className="flex-1 justify-center items-center bg-primary_red">
      <Text className="font-pangolin text-[70px] p-5">Create Profile</Text>

      {/* Improved Username Input */}
      <View className="w-[80%] mb-[70px]">
        <TextInput
          className="h-12 border-2 border-orange-500 rounded-lg px-4 bg-white text-[18px] text-[#333] shadow-md"
          placeholder="Enter your username"
          placeholderTextColor="#888" // Gray color for placeholder
          value={username}
          onChangeText={setUsername} // Update username state on change
        />
      </View>

      <View className="flex-row items-center">
        <Text className="text-[50px] mr-10 font-notosans">Difficulty</Text>

        <Pressable onPress={() => setIsModalVisible(true)}>
          <Text className="text-[30px] border-2 border-black border-dashed bg-orange-500 px-6 m-1 rounded">
            ?
          </Text>
        </Pressable>

        <Modal
          visible={isModalVisible}
          onRequestClose={() => setIsModalVisible(false)}
          animationType="slide"
          presentationStyle="pageSheet"
        >
          <View className="flex-1 justify-center items-center bg-primary_red">
            <Text className="text-[30px] m-5 font-notosans">
              Beginner: Longer time to guess and more access to hints.
            </Text>
            <Text className="text-[30px] m-5 font-notosans">
              Intermediate: Shorter time to guess with access to a single hint.
            </Text>
            <Text className="text-[30px] m-5 font-notosans">
              Pro: Minimal time to guess with no hints available.
            </Text>

            <Pressable onPress={() => setIsModalVisible(false)}>
              <Text className="text-[30px] border-2 border-black border-dashed bg-orange-500 p-0.5 px-5 m-1 rounded">
                Close
              </Text>
            </Pressable>
          </View>
        </Modal>
      </View>

      {/* Dropdown for selecting difficulty */}
      <View className="justify-center items-center bg-primary_red m-7 pb-16">
        <Dropdown onSelect={setDifficulty} />
      </View>

      {/* Icon selection */}
      <View className="w-[30%] min-w-[350px]">
        <SelectIcon onSelect={setIcon} />
      </View>

      <Pressable onPress={handleCreateProfile}>
        <Text className="font-notosans text-[30px] border-2 border-black border-dashed bg-orange-500 p-1.5 px-5 m-7 rounded">
          Create
        </Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default Profile;
