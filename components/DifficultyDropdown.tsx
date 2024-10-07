import React, { useState } from "react";
import { View, Text, Pressable } from "react-native";
import '../global.css'

// This component is a dropdown view used for selecting the difficulty level
// in the create profile screen

interface DropdownProps {
  onSelect: (value: string) => void;
}

const DifficultyDropdown: React.FC<DropdownProps> = ({ onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState("Select");

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleOptionSelect = (value: string) => {
    setSelectedValue(value);
    onSelect(value); // Call the onSelect prop
    setIsOpen(false);
  };

  return (
    <View className="w-full max-w-[600px] min-w-[300px] relative">
      <Pressable
        onPress={toggleDropdown}
        className="bg-orange-500 py-1.5 px-2.5 rounded border border-black"
      >
        <Text className="text-black text-[24px]">{selectedValue}</Text>
      </Pressable>

      {isOpen && (
        <View className="bg-orange-500 rounded border border-black mt-0.5 w-full overflow-hidden">
          <Pressable onPress={() => handleOptionSelect("Beginner")}>
            <Text className="p-1.5 pl-2.5 text-[24px]"
            >
              Beginner
            </Text>
          </Pressable>
          <Pressable onPress={() => handleOptionSelect("Intermediate")}>
            <Text className="p-1.5 pl-2.5 text-[24px]"
            >
              Intermediate
            </Text>
          </Pressable>
          <Pressable onPress={() => handleOptionSelect("Pro")}>
            <Text className="p-1.5 pl-2.5 text-[24px]"
            >
              Pro
            </Text>
          </Pressable>
        </View>
      )}
    </View>
  );
};

export default DifficultyDropdown;
