import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";

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
      "A symbol of free spirit, closeness to nature, playfulness, harmony, and friendship",
  },
  {
    icon: "🐟",
    color: "aqua",
    name: "FISH",
    description: "This is fish",
  },
];

const SelectIcon: React.FC<{ onSelect: (icon: string) => void }> = ({ onSelect }) => {
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
    onSelect(iconData[(currentIndex - 1 + iconData.length) % iconData.length].icon); // Notify parent about the selected icon
  };

  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      {/* Left Arrow */}
      <TouchableOpacity onPress={handlePrevious}>
        <Text style={{ fontSize: 30, paddingHorizontal: 10 }}>{"<"}</Text>
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
          width: 300,
        }}
      >
        <Text style={{ fontSize: 50 }}>{iconData[currentIndex].icon}</Text>
        <Text style={{ fontSize: 20, fontWeight: "bold", marginVertical: 10 }}>
          {iconData[currentIndex].name}
        </Text>
        <Text style={{ textAlign: "center" }}>
          {iconData[currentIndex].description}
        </Text>
      </View>

      {/* Right Arrow */}
      <TouchableOpacity onPress={handleNext}>
        <Text style={{ fontSize: 30, paddingHorizontal: 10 }}>{">"}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SelectIcon;
