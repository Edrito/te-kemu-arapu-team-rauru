import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import colorOptions from "../constants/Colors";
import '../global.css';

interface IconData {
  icon: string;
  name: string;
  description: string;
}

// Extended Māori cultural sensitive icons and descriptions
const iconData: IconData[] = [
  {
    icon: "🗻",
    name: "MAUNGA",
    description: "Mountains are sacred to Māori, representing ancestors, identity, and the strength of the land.",
  },
  {
    icon: "🐬",
    name: "AIHE",
    description: "Dolphins are seen as symbols of joy, protection, and guardianship in the ocean, important to Māori navigators.",
  },
  {
    icon: "🌿",
    name: "RAU",
    description: "Ferns, particularly the silver fern (Ponga), are iconic in Māori culture, representing new beginnings and resilience.",
  },
  {
    icon: "🐢",
    name: "HONU",
    description: "Turtles, while more prominent in other Polynesian cultures, also symbolize endurance, protection, and longevity in some Māori traditions.",
  },
  {
    icon: "🌊",
    name: "MOANA",
    description: "The ocean ('Moana') is vital in Māori life, symbolizing sustenance, connection to ancestors, and the pathways of navigation.",
  },
  {
    icon: "🔥",
    name: "AHI",
    description: "Fire ('Ahi') is revered for its role in rituals, representing transformation, energy, and sacred warmth.",
  },
  {
    icon: "🦅",
    name: "KĀHU",
    description: "The hawk ('Kāhu') is a symbol of foresight, vision, and guidance, often seen as a spiritual messenger.",
  },
  {
    icon: "🌕",
    name: "MARAMA",
    description: "The moon ('Marama') is connected to timekeeping, rhythms of nature, and balance between light and darkness in Māori tradition.",
  },
  {
    icon: "🌺",
    name: "KOWHAI",
    description: "The Kowhai tree, with its golden flowers, symbolizes beauty, growth, and the connection between people and nature.",
  },
  {
    icon: "🐳",
    name: "TOHORĀ",
    description: "The whale ('Tohorā') is an important ancestor and symbol of strength, protection, and guidance for Māori people.",
  },
];


const SelectIcon: React.FC<{ onSelect: (icon: string, color: string) => void }> = ({ onSelect }) => {
  const [currentIconIndex, setCurrentIconIndex] = useState<number>(0);
  const [currentColor, setCurrentColor] = useState<string>(colorOptions.colorOptions[0]);

  const handleIconNext = () => {
    setCurrentIconIndex((prevIndex) => (prevIndex + 1) % iconData.length);
    onSelect(iconData[(currentIconIndex + 1) % iconData.length].icon, currentColor);
  };

  const handleIconPrevious = () => {
    setCurrentIconIndex((prevIndex) => (prevIndex - 1 + iconData.length) % iconData.length);
    onSelect(iconData[(currentIconIndex - 1 + iconData.length) % iconData.length].icon, currentColor);
  };

  const handleColorSelect = (color: string) => {
    setCurrentColor(color);
    onSelect(iconData[currentIconIndex].icon, color);
  };

  return (
    <View className="w-full">
      {/* Icon Navigation */}
      <View className="flex-row items-center mb-5">
        <TouchableOpacity onPress={handleIconPrevious}>
          <Text className="text-[30px] px-2.5">{"<<"}</Text>
        </TouchableOpacity>

        {/* Icon Display Box */}
        <View className="flex-1 items-center" style={{ width: 120, padding: 10 }}>
          <View
            style={{
              width: 100,
              height: 100,
              backgroundColor: currentColor,
              borderRadius: 50,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text className="text-[50px]">{iconData[currentIconIndex].icon}</Text>
          </View>
          <Text className="text-[25px] font-bold my-2.5 font-pangolin">
            {iconData[currentIconIndex].name}
          </Text>
          <Text className="text-center text-[20px] font-pangolin">
            {iconData[currentIconIndex].description}
          </Text>
        </View>

        <TouchableOpacity onPress={handleIconNext}>
          <Text className="text-[30px] px-2.5">{">>"}</Text>
        </TouchableOpacity>
      </View>

      {/* Color Selection */}
      <View className="flex-row justify-around mt-5">
        {colorOptions.colorOptions.map((color: string) => (
          <TouchableOpacity
            key={color}
            style={{ backgroundColor: color, width: 50, height: 50, borderRadius: 25 }}
            onPress={() => handleColorSelect(color)}
          />
        ))}
      </View>
    </View>
  );
};

export default SelectIcon;
