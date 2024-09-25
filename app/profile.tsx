import React, { useState } from "react";
import { SafeAreaView, Text, Modal, View, Pressable, TextInput } from "react-native";
import { useRouter } from "expo-router";
import Dropdown from "../components/Dropdown";
import SelectIcon from "../components/SelectIcon";

interface ProfileData {
  username: string;
  difficulty: string;
  icon: string | null;
}

const Profile: React.FC = () => {
  const router = useRouter();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [difficulty, setDifficulty] = useState("Select");
  const [icon, setIcon] = useState<string | null>(null);
  const [username, setUsername] = useState<string>(""); // Change default value to empty

  const handleCreateProfile = () => {
    const profileData: ProfileData = {
        username,
        difficulty,
        icon,
    };

    console.log("Profile Data:", profileData);

    // Navigate to the Lobby with the profile data as a parameter
    router.push(`/Lobby?username=${encodeURIComponent(username)}&difficulty=${encodeURIComponent(difficulty)}&icon=${encodeURIComponent(icon || '')}`);
};


  return (
    <SafeAreaView style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#A01D1D" }}>
      <Text style={{ fontFamily: "Crayonara-Regular", fontSize: 70, padding: 20 }}>Create Profile</Text>
      
      {/* Improved Username Input */}
      <View style={{ marginBottom: 30, width: '80%' }}>
        <TextInput
          style={{
            height: 50,
            borderColor: 'orange',
            borderWidth: 2,
            borderRadius: 10,
            paddingHorizontal: 15,
            backgroundColor: "#fff",
            fontSize: 18,
            color: "#333",
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5, // For Android shadow
          }}
          placeholder="Enter your username"
          placeholderTextColor="#888" // Gray color for placeholder
          value={username}
          onChangeText={setUsername} // Update username state on change
        />
      </View>

      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Text style={{ fontSize: 50, marginRight: 10, fontFamily: "Crayonara-Regular" }}>Difficulty</Text>
        
        <Pressable onPress={() => setIsModalVisible(true)}>
          <Text style={{ fontSize: 30, borderWidth: 3, backgroundColor: "orange", padding: 3, paddingLeft: 20, paddingRight: 20, margin: 5, borderRadius: 5 }}>?</Text>
        </Pressable>
        
        <Modal visible={isModalVisible} onRequestClose={() => setIsModalVisible(false)} animationType="slide" presentationStyle="pageSheet">
          <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#A01D1D" }}>
            <Text style={{ fontSize: 30, margin: 20, fontFamily: "Crayonara-Regular" }}>Beginner: Longer time to guess and more access to hints.</Text>
            <Text style={{ fontSize: 30, margin: 20, fontFamily: "Crayonara-Regular" }}>Intermediate: Shorter time to guess with access to a single hint.</Text>
            <Text style={{ fontSize: 30, margin: 20, fontFamily: "Crayonara-Regular" }}>Pro: Minimal time to guess with no hints available.</Text>

            <Pressable onPress={() => setIsModalVisible(false)}>
              <Text style={{ fontSize: 30, borderWidth: 3, backgroundColor: "orange", padding: 3, paddingLeft: 20, paddingRight: 20, margin: 5, borderRadius: 5 }}>Close</Text>
            </Pressable>
          </View>
        </Modal>
      </View>

      {/* Dropdown for selecting difficulty */}
      <View style={{ justifyContent: "center", alignItems: "center", backgroundColor: "#A01D1D", margin: 30, width: '100%', paddingBottom: 70 }}>
        <Dropdown onSelect={setDifficulty} />
      </View>

      {/* Icon selection */}
      <View style={{ width: 300 }}>
        <SelectIcon onSelect={setIcon} />
      </View>

      <Pressable onPress={handleCreateProfile}>
        <Text style={{ fontFamily: "Crayonara-Regular", fontSize: 30, borderWidth: 3, backgroundColor: "orange", padding: 5, paddingLeft: 20, paddingRight: 20, margin: 30, borderRadius: 5 }}>Create</Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default Profile;
