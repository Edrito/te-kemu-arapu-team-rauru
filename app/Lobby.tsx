import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, Pressable } from "react-native";
import { useFonts } from "expo-font";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../context/AuthContext";
import { router } from "expo-router";

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
      <SafeAreaView
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#A01D1D",
        }}
      >
        <ActivityIndicator size="large" color="#ffffff" />
      </SafeAreaView>
    );
  }


  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#A01D1D", // Dark red background
      }}
    >
      {/* Title */}
      <Text
        style={{
          fontSize: 60,
          fontWeight: "bold",
          color: "white",
          marginBottom: 50,
          fontFamily: "Crayonara", // Use the custom Crayonara font
        }}
      >
        Te Kēmu Arapū
      </Text>

      <Text style={{ color: "#fff", fontSize: 20, marginBottom: 20 }}>
        Welcome, {userProfile?.username || "Player"}!
      </Text>

      {/* Input for lobby name */}
      <TextInput
        style={{
          height: 40,
          borderColor: 'gray',
          borderWidth: 1,
          width: '80%',
          marginBottom: 20,
          paddingHorizontal: 10,
          backgroundColor: "#fff", // White background for the input field
        }}
        placeholder="Enter lobby name"
        value={lobbyName}
        onChangeText={setLobbyName}
      />

      {errorMessage ? (
        <Text style={{ color: "red", marginBottom: 20 }}>{errorMessage}</Text>
      ) : null}

      {/* Button Container */}
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

      <Pressable onPress={signOutUser}>
        <Text style={{ color: "#fff", fontSize: 16 }}>Sign Out</Text>
      </Pressable>

      {/* Footer */}
      <Text style={{ marginTop: 100, fontSize: 20, color: "#000" }}>DEMO</Text>
    </SafeAreaView>
  );
}
