import { Text, View, ActivityIndicator, Dimensions, ImageBackground } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import "te-kemu-arapu-compx374-team-rauru/global.css";
import { FACTS } from "te-kemu-arapu-compx374-team-rauru/constants/MaoriFacts";

const Loading = () => {
  const randomFact = FACTS[Math.floor(Math.random() * FACTS.length)];
  
  // This is so that the page changes size in real time when screen size changes
  const [windowDimensions, setWindowDimensions] = useState(
    Dimensions.get("window")
  );
  useEffect(() => {
    const resizeScreen = () => {
      setWindowDimensions(Dimensions.get("window"));
    };
    const subscription = Dimensions.addEventListener("change", resizeScreen);
    return () => subscription?.remove();
  }, []);

  return (
    <SafeAreaView className="flex-1 w-full justify-center items-center bg-[#A01D1D]">

       <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}>
        <ImageBackground
          source={require("te-kemu-arapu-compx374-team-rauru/assets/images/tekemuarapu-bg-80.jpg")}
          style={{
            flex: 1,
            width: '100%',
            height: '100%',
            opacity: 0.5,
          }}
          resizeMode="cover"
        />
      </View>

      <View className="m-[50px] w-[80%]">
        <Text className="font-pangolin text-[70px] text-center p-5">
          Loading
        </Text>

        <ActivityIndicator size={"large"} color={"black"} />
      </View>

      <View>
        <Text
          style={{ fontSize: windowDimensions.width < 1036 ? 50 : 70 }}
          className="font-pangolin text-center p-5 border-2 border-dashed rounded-xl bg-green-700 mb-[30px]"
        >
          Did you know:
        </Text>
      </View>

      <View className="w-[70%] p-1">
        <Text
          style={{ fontSize: windowDimensions.width < 1036 ? 40 : 60 }}
          className="text-center font-pangolin text-[60px] border-2 border-dashed rounded-xl bg-green-700"
        >
          {randomFact}
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default Loading;
