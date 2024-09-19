import React from "react";
import { View, Text, Button } from "react-native";

export default function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 24, fontWeight: "bold" }}>If your seeing this is havent messed it up yet!</Text>
      <Button
        title="Testing Button, i havent hooked this to anything"
      />
    </View>
  );
}