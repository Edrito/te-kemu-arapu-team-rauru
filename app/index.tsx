import { Text, View } from "react-native";
import React from "react";
import Login from "../components/Login";
import { AuthProvider } from "../context/AuthContext";

export default function Index() {
  return (
    <AuthProvider>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ fontSize: 24, fontWeight: "bold" }}>Welcome to the Home Page</Text>
        <Login />
      </View>
    </AuthProvider>
  );
}
