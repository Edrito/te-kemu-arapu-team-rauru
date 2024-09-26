import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator } from "react-native";
import { useFonts } from "expo-font";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList, User } from './types'; // Adjust based on your structure
import { StackNavigationProp } from '@react-navigation/stack';

type LobbyNavigationProp = StackNavigationProp<RootStackParamList, 'Lobby'>;

export default function Lobby() {
  const [lobbyName, setLobbyName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [username, setUsername] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [icon, setIcon] = useState<string | null>(null);

  const navigation = useNavigation<LobbyNavigationProp>(); // Use the correct typing for navigation

  // Load fonts
  const [fontsLoaded] = useFonts({
    NotoSans: require("../assets/fonts/NotoSans-Regular.ttf"),
  });

  // Fetch profile data from AsyncStorage
  const fetchProfileData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@profile_data');
      const profileData = jsonValue != null ? JSON.parse(jsonValue) : null;

      if (profileData) {
        setUsername(profileData.username);
        setDifficulty(profileData.difficulty);
        setIcon(profileData.icon);
      }
    } catch (e) {
      console.error('Failed to fetch profile data', e);
    }
  };

  useEffect(() => {
    fetchProfileData();
  }, []);

  const handleCreateLobby = () => {
    if (lobbyName.trim() === "") {
      setErrorMessage("Please enter a lobby name.");
    } else {
      setErrorMessage("");
      console.log("Lobby Created:", lobbyName, "by", username);
      
      const newUsers: User[] = [{ username }]; // Initialize users with the current user
      navigation.navigate("GameLobby", {
        lobbyName,
        creator: username,
        users: newUsers,
      });
    }
  };

  const handleJoinLobby = () => {
    if (lobbyName.trim() === "") {
      setErrorMessage("Please enter a lobby name.");
    } else {
      setErrorMessage("");
      console.log("Joining Lobby:", lobbyName, "as", username);

      const dummyCreator = "Other User"; // This could be replaced with actual logic
      const newUsers: User[] = [{ username }, { username: dummyCreator }];
      navigation.navigate("GameLobby", {
        lobbyName,
        creator: dummyCreator,
        users: newUsers,
      });
    }
  };

  if (!fontsLoaded) {
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#A01D1D" }}>
        <ActivityIndicator size="large" color="#ffffff" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#A01D1D" }}>
      <Text style={{ fontSize: 60, fontWeight: "bold", color: "black", marginBottom: 50, fontFamily: "NotoSans-Regular" }}>
        Te Kēmu Arapū
      </Text>

      <Text style={{ fontSize: 20, color: "#fff", marginBottom: 20 }}>Welcome, {username}!</Text>
      <Text style={{ fontSize: 16, color: "#fff", marginBottom: 20 }}>Difficulty: {difficulty}</Text>
      {icon && <Text style={{ fontSize: 16, color: "#fff", marginBottom: 20 }}>Icon: {icon}</Text>}

      <TextInput
        style={{
          height: 40,
          borderColor: 'gray',
          borderWidth: 1,
          width: '80%',
          marginBottom: 20,
          paddingHorizontal: 10,
          backgroundColor: "#fff",
        }}
        placeholder="Enter lobby name"
        value={lobbyName}
        onChangeText={setLobbyName}
      />

      {errorMessage ? (
        <Text style={{ color: "red", marginBottom: 20 }}>{errorMessage}</Text>
      ) : null}

      <View style={{ justifyContent: 'center', width: '80%', marginBottom: 20 }}>
        <TouchableOpacity
          style={{
            backgroundColor: "#CD853F",
            paddingVertical: 15,
            paddingHorizontal: 30,
            borderRadius: 10,
            marginVertical: 10,
            alignItems: 'center',
            borderColor: "#000",
            borderWidth: 2,
          }}
          onPress={handleJoinLobby}
        >
          <Text style={{ fontSize: 18, fontWeight: "bold", color: "#fff" }}>JOIN</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            backgroundColor: "#CD853F",
            paddingVertical: 15,
            paddingHorizontal: 30,
            borderRadius: 10,
            marginVertical: 10,
            alignItems: 'center',
            borderColor: "#000",
            borderWidth: 2,
          }}
          onPress={handleCreateLobby}
        >
          <Text style={{ fontSize: 18, fontWeight: "bold", color: "#fff" }}>CREATE</Text>
        </TouchableOpacity>
      </View>

      <Text style={{ marginTop: 100, fontSize: 20, color: "#000" }}>DEMO</Text>
    </SafeAreaView>
  );
}
