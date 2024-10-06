import React from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import '../global.css';

const AwaitPlayer = () => {
  return (
    <SafeAreaView className="flex-1 justify-center items-center bg-primary_red">
      <View className="m-12">
        <Text className="font-pangolin text-6xl p-5 text-white">
          Awaiting Next Player...
        </Text>
      </View>
      <View>
        <Text className="font-pangolin text-6xl p-5 border-2 border-white bg-green-600 mb-8">
          Get Ready!
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default AwaitPlayer;