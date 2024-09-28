import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, Pressable } from "react-native";
import "../global.css";

interface HeaderBarIcon {
  // Change string to whatever type the icon will be
  playerIcon: string;
}

const HeaderBar: React.FC<HeaderBarIcon> = ({ playerIcon }) => {
  const [language, setLanguage] = useState("English");

  const changeLanguage = () => {
    setLanguage((language) => (language === "English" ? "Maori" : "English"));
  };

  return (
    <View className="w-full h-[60px] bg-red-500 flex-row justify-between items-center px-4">
      {/* Player Icon */}
      <Image
        source={{ uri: playerIcon }}
        className="w-[40px] h-[40px] rounded-full"
      />

      <Pressable onPress={changeLanguage} className="flex-row items-center">
        {/* Need to use inline stlying here. Nativewind does not work for Image component */}
        <Image
          source={require("../assets/images/rotating_icon.png")}
          style={{ width: 40, height: 40 }}
          resizeMode="contain"
        />
        <Text className="text-[30px] font-bold font-notosans ml-2">
          {language}
        </Text>
      </Pressable>
    </View>
  );
};

export default HeaderBar;
