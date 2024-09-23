import { Text, View } from "react-native";
import React from "react";
import Login from "../components/Login";
import { AuthProvider } from "../context/AuthContext";
import "../global.css"

export default function Index() {
  return (
    <AuthProvider>
      <View className="flex-1 items-center justify-center bg-primary_red">
        <Text className="text-white text-2xl font-bold">Testing out the text</Text>
        <Login />
      </View>
    </AuthProvider>
  );
}
