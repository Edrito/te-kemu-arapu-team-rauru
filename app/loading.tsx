import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import '../global.css'

const Loading = () => {
  return (
    <SafeAreaView className="flex-1 justify-center items-center bg-[#A01D1D]">
      <View style={{ margin: 50 }}>
        <Text className="font-pangolin text-[70px] p-5">
          Loading
        </Text>

        <ActivityIndicator size={"large"} color={"black"} />
      </View>
      <View>
        <Text className="font-pangolin text-[70px] p-5 border-2 bg-green-500 mb-7.5">
          Did you know:
        </Text>
      </View>
      <Text className="font-pangolin text-[60px] p-5 border-2 bg-green-500">
        FACTFACTFACTFACTFACTFACTFACTFACTFACTFACTFACTFACT
      </Text>
    </SafeAreaView>
  );
};

export default Loading;

const styles = StyleSheet.create({});
