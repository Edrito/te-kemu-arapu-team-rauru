import React from "react";
import { Text, Pressable, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import Scoreboard from "te-kemu-arapu-compx374-team-rauru/components/Scoreboard";

const players = [
  {
    icon: "🐬",
    name: "Koru Aihe",
    score: 53,
  },
  {
    icon: "🍎",
    name: "Āporo",
    score: 53,
  },
  {
    icon: "🍎",
    name: "Āporo",
    score: 34,
  },
  {
    icon: "🍎",
    name: "Āporo",
    score: 22,
  },
  {
    icon: "🍎",
    name: "Āporo",
    score: 4,
  },
  {
    icon: "🍎",
    name: "Āporo",
    score: 54,
  },
  {
    icon: "🍎",
    name: "Āporo",
    score: 52,
  },
  {
    icon: "🍎",
    name: "Āporo",
    score: 32,
  },
  {
    icon: "🍎",
    name: "Āporo",
    score: 100,
  },
];

const Start = () => {
  const router = useRouter();

  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#A01D1D",
      }}
    >
      <Text
        style={{
          fontSize: 80,
          fontFamily: "Crayonara-Regular",
          margin: 30,
        }}
      >
        Score
      </Text>

      {/* Scoreboard */}
      <View
        style={{
          borderWidth: 5,
        }}
      >
        <Scoreboard players={players} />
      </View>

      {/* Return button */}
      <Pressable
        onPress={() => router.push("/")}
        style={({ pressed }) => [
          {
            backgroundColor: pressed ? "#8c4f00" : "#c97d1a",
            padding: 20,
            borderRadius: 8,
            borderWidth: 2,
            borderColor: "black",
            margin: 30,
          },
        ]}
      >
        <Text
          style={{
            fontSize: 30,
            fontFamily: "Crayonara-Regular",
            fontWeight: "bold",
            color: "white",
          }}
        >
          Return
        </Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default Start;
