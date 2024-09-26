import React, { useEffect, useState } from "react";
import { View, Text, Pressable, Alert } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

const GameLobby: React.FC = () => {
  const [currentUsers, setCurrentUsers] = useState<string[]>([]);
  const [lobbyData, setLobbyData] = useState<{ username: string; difficulty: string; icon: string }[]>([]);

  useEffect(() => {
    // Fetch profile data from AsyncStorage
    const fetchProfileData = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('@profile_data');
        if (jsonValue) {
          const profileData = JSON.parse(jsonValue);
          setLobbyData((prevData) => [...prevData, profileData]);
        }
      } catch (e) {
        console.error('Failed to load profile data', e);
      }
    };

    fetchProfileData();
  }, []);

  const startGame = () => {
    if (currentUsers.length === 0) {
      Alert.alert("Error", "No players in the lobby to start the game!");
      return;
    }

    // Logic to start the game goes here
    Alert.alert("Game Starting", "The game will start now!");
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#A01D1D" }}>
      <Text style={{ fontFamily: "NotoSans-Regular", fontSize: 50, padding: 20 }}>Game Lobby</Text>
      
      {/* Display current users in the lobby */}
      <View style={{ marginBottom: 30 }}>
        <Text style={{ fontSize: 30, fontFamily: "NotoSans-Regular" }}>Current Users:</Text>
        {lobbyData.map((user, index) => (
          <View key={index} style={{ flexDirection: "row", alignItems: "center", marginVertical: 5 }}>
            <Text style={{ fontSize: 20, marginRight: 10 }}>{user.icon}</Text>
            <Text style={{ fontSize: 20 }}>{user.username}</Text>
          </View>
        ))}
      </View>

      {/* Start Game Button */}
      <Pressable onPress={startGame}>
        <Text style={{ fontFamily: "NotoSans-Regular", fontSize: 30, borderWidth: 3, backgroundColor: "orange", padding: 5, paddingLeft: 20, paddingRight: 20, borderRadius: 5 }}>
          Start Game
        </Text>
      </Pressable>
    </View>
  );
};

export default GameLobby;
