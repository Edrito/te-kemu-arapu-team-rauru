import { View, Text, SafeAreaView, ScrollView, Pressable } from "react-native";
import React from "react";
import GameLettersGrid from "te-kemu-arapu-compx374-team-rauru/components/GameLettersGrid";
import "../../global.css";
import GameBar from "te-kemu-arapu-compx374-team-rauru/components/GameBar";
import { useLocalSearchParams} from "expo-router";

const selectLetterPlayer = () => {
  // Path to test player icon
  const playerIconTest = "../../assets/images/react-logo.png";
  const item = useLocalSearchParams();

  return (
    <SafeAreaView className="flex-1 bg-primary_red">
      {/* This view holds the header bar */}
      <View className="w-full">
        <GameBar />
      </View>

      <View className="w-full items-center justify-center mt-3">
        <Text className="text-[40px] text-white font-pangolin">
          Category: *INSERT SELECTED CATEGORY HERE*
        </Text>
      </View>

      <ScrollView className="w-full mt-5 items-center">
        {/* This view holds the letters */}
        <View className="flex-wrap flex-row justify-center">
          <GameLettersGrid />
        </View>
      </ScrollView>

      <View className="w-full items-center justify-center">
        <Text className="text-[40px] text-white font-pangolin">
          Current turn: *INSERT PLAYER NAME HERE*
        </Text>
      </View>

      {/* This view holds the timer and the pass button */}
      <View className="flex-row items-center justify-center p-2 m-4">
        <Text className="text-[40px] m-2 p-6 border-2 border-dashed bg-green-900">
          TIMER
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default selectLetterPlayer;
