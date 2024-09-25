import React, { useState } from "react";
import { View, Text, Pressable } from "react-native";

<<<<<<< HEAD
const Dropdown = () => {
=======
// Define props type for Dropdown
interface DropdownProps {
  onSelect: (value: string) => void;
}

const Dropdown: React.FC<DropdownProps> = ({ onSelect }) => {
>>>>>>> 48fdcabb9249a1c40330ea991831f951e1c4547f
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState("Select");

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleOptionSelect = (value: string) => {
    setSelectedValue(value);
<<<<<<< HEAD
=======
    onSelect(value); // Call the onSelect prop
>>>>>>> 48fdcabb9249a1c40330ea991831f951e1c4547f
    setIsOpen(false);
  };

  return (
    <View style={{ width: 120, position: "relative" }}>
      <Pressable
        onPress={toggleDropdown}
        style={{
          backgroundColor: "orange",
          paddingVertical: 5,
          paddingHorizontal: 10,
          borderRadius: 5,
          borderWidth: 1,
          borderColor: "black",
        }}
      >
        <Text style={{ color: "black", fontSize: 12 }}>{selectedValue}</Text>
      </Pressable>

      {isOpen && (
        <View
          style={{
            backgroundColor: "orange",
            borderRadius: 5,
            borderWidth: 1,
            borderColor: "black",
            marginTop: 2,
            width: "100%",
            overflow: "hidden",
          }}
        >
          <Pressable onPress={() => handleOptionSelect("Beginner")}>
            <Text style={{ padding: 5, fontSize: 12 }}>Beginner</Text>
          </Pressable>
          <Pressable onPress={() => handleOptionSelect("Intermediate")}>
            <Text style={{ padding: 5, fontSize: 12 }}>Intermediate</Text>
          </Pressable>
          <Pressable onPress={() => handleOptionSelect("Pro")}>
            <Text style={{ padding: 5, fontSize: 12 }}>Pro</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
};

export default Dropdown;
