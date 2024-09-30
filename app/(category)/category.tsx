import { View, Text, SafeAreaView, ScrollView, Pressable } from "react-native";
import React from "react";
import GameCheckBoxes from "te-kemu-arapu-compx374-team-rauru/components/GameCheckBoxes";
import "../../global.css";
import GameBar from "te-kemu-arapu-compx374-team-rauru/components/GameBar";

const Category = () => {
  // Path to test player icon
  const playerIconTest = "../../assets/images/react-logo.png";

  return (
    <SafeAreaView className="flex-1 bg-primary_red">
      {/* This view holds the header bar */}
      <View className="w-full">
        <GameBar />
      </View>

      <ScrollView className="w-full mt-5">
        <View className="flex-wrap flex-row justify-center">
          <GameCheckBoxes initialText="Landmarks" />
          <GameCheckBoxes initialText="Food" />
          <GameCheckBoxes initialText="TEST" />
          <GameCheckBoxes initialText="TEST" />
          <GameCheckBoxes initialText="TEST" />
          <GameCheckBoxes initialText="TEST" />
          <GameCheckBoxes initialText="TEST" />
          <GameCheckBoxes initialText="TEST" />
        </View>
      </ScrollView>

      {/* This view holds the timer and the pass button */}
      <View className="flex-row items-center justify-between p-2">
        <Text className="text-[40px] m-2 p-6 border-2 border-dashed bg-green-900">
          TIMER
        </Text>
        <Pressable className="m-2 p-6 border-2 border-dashed bg-orange-500 items-center">
          <Text className="text-[40px] text-white">PASS</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default Category;
