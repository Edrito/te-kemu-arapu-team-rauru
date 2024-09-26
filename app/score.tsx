import React from "react";
import { Text, Pressable, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import Scoreboard from "te-kemu-arapu-compx374-team-rauru/components/Scoreboard";
import '../global.css'

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
    <SafeAreaView className="flex-1 justify-center items-center bg-primary_red">
      <Text className="text-[80px] font-notosans m-7.5">Score</Text>

      {/* Scoreboard */}
      <View className="border-5">
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
        <Text className="text-[30px] font-notosans font-bold text-white">
          Return
        </Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default Start;
