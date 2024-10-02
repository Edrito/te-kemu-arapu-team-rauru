// app/GameLobby.tsx
import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { useRoute, RouteProp } from "@react-navigation/native";
import { GameLobbyParams, RootStackParamList } from "./types"; // Adjust import based on your structure

export default function GameLobby() {
  const route = useRoute<RouteProp<RootStackParamList, 'GameLobby'>>(); // Correctly type the route
  const { lobbyName, creator, users } = route.params; // Extract the passed params

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lobby: {lobbyName}</Text>
      <Text style={styles.creator}>Created by: {creator}</Text>
      <Text style={styles.userListTitle}>Users:</Text>
      <FlatList
        data={users}
        renderItem={({ item }) => (
          <Text style={styles.userItem}>{item.username}</Text>
        )}
        keyExtractor={(item) => item.username}
      />
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#A01D1D", // Adjust background color if needed
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#fff", // Title color
  },
  creator: {
    fontSize: 20,
    marginBottom: 20,
    color: "#fff", // Creator color
  },
  userListTitle: {
    fontSize: 24,
    marginTop: 20,
    marginBottom: 10,
    color: "#fff", // User list title color
  },
  userItem: {
    fontSize: 18,
    color: "#fff", // User item color
    padding: 5,
  },
});
