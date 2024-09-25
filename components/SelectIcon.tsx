import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";

// Define types for the icon data
interface IconData {
<<<<<<< HEAD
  // Icon: string may be temporary unless we plan to use emojis
=======
>>>>>>> 48fdcabb9249a1c40330ea991831f951e1c4547f
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
<<<<<<< HEAD
      "A symbol of free spirit, closeness to nature, playfulness, harmony and friendship",
=======
      "A symbol of free spirit, closeness to nature, playfulness, harmony, and friendship",
>>>>>>> 48fdcabb9249a1c40330ea991831f951e1c4547f
  },
  {
    icon: "🐟",
    color: "aqua",
    name: "FISH",
    description: "This is fish",
  },
];

<<<<<<< HEAD
const SelectIcon: React.FC = () => {
=======
const SelectIcon: React.FC<{ onSelect: (icon: string) => void }> = ({ onSelect }) => {
>>>>>>> 48fdcabb9249a1c40330ea991831f951e1c4547f
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  // Handlers for navigation
  const handleNext = () => {
<<<<<<< HEAD
    // '%' Ensures that the index will always wrap back to the first index when exceeding the max
    setCurrentIndex((prevIndex) => (prevIndex + 1) % iconData.length);
  };

  const handlePrevious = () => {
    // '+iconData.length' ensures that array wraps around when at the start of the array
    // % ensures that the index wraps around within the limits of the array
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + iconData.length) % iconData.length
    );
=======
    setCurrentIndex((prevIndex) => (prevIndex + 1) % iconData.length);
    onSelect(iconData[(currentIndex + 1) % iconData.length].icon); // Notify parent about the selected icon
  };

  const handlePrevious = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + iconData.length) % iconData.length
    );
    onSelect(iconData[(currentIndex - 1 + iconData.length) % iconData.length].icon); // Notify parent about the selected icon
>>>>>>> 48fdcabb9249a1c40330ea991831f951e1c4547f
  };

  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      {/* Left Arrow */}
      <TouchableOpacity onPress={handlePrevious}>
        <Text style={{ fontSize: 30, paddingHorizontal: 10 }}>{"<"}</Text>
      </TouchableOpacity>

<<<<<<< HEAD
      {/* Controls icon, text and background colour */}
=======
      {/* Icon Display */}
>>>>>>> 48fdcabb9249a1c40330ea991831f951e1c4547f
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
