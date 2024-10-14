import React, { useEffect, useState } from "react";
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
  { icon: "🗻", name: "MAUNGA", description: "Mountains are sacred to Māori, representing ancestors, identity, and the strength of the land." },
  { icon: "🐬", name: "AIHE", description: "Dolphins are symbols of joy, protection, and guardianship in the ocean, important to Māori navigators." },
  { icon: "🌿", name: "RAU", description: "Ferns, particularly the silver fern, are iconic in Māori culture, representing new beginnings and resilience." },
  { icon: "🐢", name: "HONU", description: "Turtles symbolize endurance, protection, and longevity in some Māori traditions." },
  { icon: "🌊", name: "MOANA", description: "The ocean is vital in Māori life, symbolizing sustenance, connection to ancestors, and pathways of navigation." },
  { icon: "🔥", name: "AHI", description: "Fire is revered for its role in rituals, representing transformation, energy, and sacred warmth." },
  { icon: "🦅", name: "KĀHU", description: "The hawk is a symbol of foresight, vision, and guidance, often seen as a spiritual messenger." },
  { icon: "🌕", name: "MARAMA", description: "The moon is connected to timekeeping, rhythms of nature, and balance in Māori tradition." },
  { icon: "🌺", name: "KOWHAI", description: "The Kowhai tree symbolizes beauty, growth, and the connection between people and nature." },
  { icon: "🐳", name: "TOHORĀ", description: "The whale is an important ancestor and symbol of strength, protection, and guidance for Māori people." },
];

const SelectIcon: React.FC<{ onSelect: (icon: string, color: string) => void }> = ({ onSelect }) => {
  const [currentIconIndex, setCurrentIconIndex] = useState<number>(0);
  const [currentColor, setCurrentColor] = useState<string>(colorOptions.colorOptions[0]);

  const getRandomIndex = (length: number) => Math.floor(Math.random() * length);

  useEffect(() => {
    const randomIconIndex = getRandomIndex(iconData.length);
    const randomColorIndex = getRandomIndex(colorOptions.colorOptions.length);
    setCurrentIconIndex(randomIconIndex);
    setCurrentColor(colorOptions.colorOptions[randomColorIndex]);
    onSelect(iconData[randomIconIndex].icon, colorOptions.colorOptions[randomColorIndex]);
  }, []);

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
    <View className="w-full bg-red-700 p-4 border-black border-2 rounded-lg">
      {/* Icon Navigation */}
      <View className="flex-row items-center mb-5 justify-between">
        <TouchableOpacity onPress={handleIconPrevious}>
          <Text className="text-3xl px-4">{"<<"}</Text>
        </TouchableOpacity>

        {/* Icon Display Box */}
        <View className="flex-1 items-center mx-4">
          <View className="w-24 h-24 bg-gray-200 rounded-full flex justify-center items-center mb-4" style={{ backgroundColor: currentColor }}>
            <Text className="text-5xl">{iconData[currentIconIndex].icon}</Text>
          </View>
          <Text className="text-xl font-bold mb-2">{iconData[currentIconIndex].name}</Text>
          <Text className="text-center text-base px-2">{iconData[currentIconIndex].description}</Text>
        </View>

        <TouchableOpacity onPress={handleIconNext}>
          <Text className="text-3xl px-4">{">>"}</Text>
        </TouchableOpacity>
      </View>

      {/* Color Selection */}
      <View className="flex-row justify-around mt-5">
        {colorOptions.colorOptions.map((color: string) => (
          <TouchableOpacity
            key={color}
            className="w-12 h-12 rounded-full"
            style={{ backgroundColor: color }}
            onPress={() => handleColorSelect(color)}
          />
        ))}
      </View>
    </View>
  );
};

export default SelectIcon;
