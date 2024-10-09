import React, { useEffect, useState } from "react";
import { Alert, Dimensions, Modal, Pressable, SafeAreaView, ScrollView, TextInput, View, Text } from "react-native";
import { useRouter } from "expo-router";
import DifficultyDropdown from "../components/DifficultyDropdown";
import SelectIcon from "../components/SelectIcon";
import { addDoc, collection } from "firebase/firestore";
import { firestore } from "../firebaseConfig";
import { useAuth } from "../context/AuthContext";
import colorOptions from "../constants/Colors";

interface ProfileData {
  username: string;
  difficulty: string;
  icon: string | null;
  color: string;
}

const Profile: React.FC = () => {
  const { user, setUserProfile } = useAuth();
  const router = useRouter();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [difficulty, setDifficulty] = useState("Select");
  const [icon, setIcon] = useState<string | null>(null);
  const [username, setUsername] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>(colorOptions.colorOptions[0]);
  const [windowDimensions, setWindowDimensions] = useState(Dimensions.get("window"));

  // Adjust the layout based on window resizing
  useEffect(() => {
    const resizeScreen = () => {
      setWindowDimensions(Dimensions.get("window"));
    };
    const subscription = Dimensions.addEventListener("change", resizeScreen);
    return () => subscription?.remove();
  }, []);

  useEffect(() => {
    const resizeScreen = () => {
      setWindowDimensions(Dimensions.get("window"));
    };
    const subscription = Dimensions.addEventListener("change", resizeScreen);
    return () => subscription?.remove();
  }, []);


  const handleCreateProfile = async () => {
    if (!user?.uid) {
      Alert.alert("User ID not found. Please sign in again.");
      return;
    }

    
    if (!username.trim() || difficulty === "Select" || !icon || !selectedColor) {
      Alert.alert("Please fill in all fields.");
      return;
    }

    const profileData: ProfileData = {
      username: username.trim(),
      difficulty: difficulty,
      icon: icon,
      color: selectedColor,
    };

    try {
      await addProfileData(profileData);

      setUserProfile({
        userId: user.uid,
        ...profileData,
        icon: profileData.icon ?? "default",
      });

      router.push(`/MainPage`);
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert("Error creating profile: " + error.message);
      } else {
        Alert.alert("Error creating profile.");
      }
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

  const handleIconSelect = (icon: string, color: string) => {
    setIcon(icon);
    setSelectedColor(color);
  };

  return (
    <SafeAreaView className="flex-1 justify-center items-center bg-primary_red">
      <ScrollView
        style={{
          flex: 1,
          minWidth: windowDimensions.width < 1036 ? "100%" : "50%",
          maxWidth: windowDimensions.width < 1036 ? "100%" : "50%",
        }}
        contentContainerStyle={{
          alignItems: "center",
          padding: 20,
        }}
      >
        <Text className="font-pangolin text-[70px] text-center p-5">
          Create Profile
        </Text>

        {/* Username Input */}
        <View className="w-[80%] mb-[30px]">
          <TextInput
            className="h-12 border-2 border-green-700 rounded-lg px-4 bg-white text-[18px] text-[#333] shadow-md"
            placeholder="Enter your username"
            placeholderTextColor="#888"
            value={username}
            onChangeText={setUsername}
          />
        </View>

        {/* Difficulty Section */}
          <View className="flex-row items-center mb-[30px]">
            <Text className="text-[50px] mr-10 font-pangolin">Difficulty</Text>

          <Pressable onPress={() => setIsModalVisible(true)}>
            <Text className="text-[30px] border-2 border-black border-dashed bg-green-700 px-6 m-1 rounded font-pangolin">
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
              <Text className="text-[30px] m-5 font-pangolin">
                Beginner: Longer time to guess and more access to hints.
              </Text>
              <Text className="text-[30px] m-5 font-pangolin">
                Intermediate: Shorter time to guess with access to a single hint.
              </Text>
              <Text className="text-[30px] m-5 font-pangolin">
                Pro: Minimal time to guess with no hints available.
              </Text>

              <Pressable onPress={() => setIsModalVisible(false)}>
                <Text className="font-pangolin text-[30px] border-2 border-black border-dashed bg-green-700 p-0.5 px-5 m-1 rounded">
                  Close
                </Text>
              </Pressable>
            </View>
          </Modal>
        </View>

        {/* Dropdown for selecting difficulty */}
        <View className="justify-center items-center bg-primary_red mb-[30px]" style={{ zIndex: 10 }}>
          <DifficultyDropdown onSelect={setDifficulty} />
        </View>

        {/* Icon selection */}
        <View className="w-[40%] min-w-[400px] mb-[30px]" style={{ zIndex: 1 }}>
          <SelectIcon onSelect={handleIconSelect} />
        </View>

        {/* Create Button */}
        <Pressable onPress={handleCreateProfile}>
          <Text className="font-pangolin text-[30px] border-2 border-black border-dashed bg-green-700 p-1.5 px-5 rounded">
            Create
          </Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
