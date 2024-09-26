import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import "../global.css";

// Define types for the icon data
interface IconData {
  icon: string;
  color: string;
  name: string;
  description: string;
}

// Define the array of icons
const iconData: IconData[] = [
  {
    icon: "🐬",
    color: "lightgreen",
    name: "KORU AIHE",
    description:
      "A symbol of free spirit, closeness to nature, playfulness, harmony, and friendship.",
  },
  {
    icon: "🐟",
    color: "aqua",
    name: "FISH",
    description: "This is fish",
  },
];

const SelectIcon: React.FC<{ onSelect: (icon: string) => void }> = ({
  onSelect,
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  // Handlers for navigation
  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % iconData.length);
    onSelect(iconData[(currentIndex + 1) % iconData.length].icon); // Notify parent about the selected icon
  };

  const handlePrevious = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + iconData.length) % iconData.length
    );
    onSelect(
      iconData[(currentIndex - 1 + iconData.length) % iconData.length].icon
    ); // Notify parent about the selected icon
  };

  return (
    <View className="flex-row items-center w-full">
      {/* Left Arrow */}
      <TouchableOpacity onPress={handlePrevious}>
        <Text className="text-[30px] px-2.5">{"<<"}</Text>
      </TouchableOpacity>

      {/* Icon Display */}
      <View
        style={{
          flex: 1,
          padding: 20,
          borderRadius: 10,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: iconData[currentIndex].color,
          width: "100%",
          height: 240,
        }}
      >
        <Text className="text-[50px]">{iconData[currentIndex].icon}</Text>

        <Text className="text-[20px] font-bold my-2.5">
          {iconData[currentIndex].name}
        </Text>

        <Text className="text-center text-[15px]">
          {iconData[currentIndex].description}
        </Text>
      </View>

      {/* Right Arrow */}
      <TouchableOpacity onPress={handleNext}>
        <Text className="text-[30px] px-2.5">{">>"}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SelectIcon;
