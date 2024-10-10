import React, { useState, useEffect, useRef } from "react";
import { View, Text, Pressable, TouchableWithoutFeedback } from "react-native";
import Animated, { useSharedValue, withTiming, useAnimatedStyle } from "react-native-reanimated";
import '../global.css';
import { useLanguage } from "../context/languageToggleButton";

interface DropdownProps {
  onSelect: (value: string) => void;
}

const DifficultyDropdown: React.FC<DropdownProps> = ({ onSelect }) => {
  const { getText } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(getText('select'));
  const dropdownHeight = useSharedValue(0);
  const dropdownOpacity = useSharedValue(0);
  const dropdownRef = useRef<View>(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      dropdownHeight.value = withTiming(150, { duration: 200 });
      dropdownOpacity.value = withTiming(1, { duration: 200 });
    } else {
      dropdownHeight.value = withTiming(0, { duration: 200 });
      dropdownOpacity.value = withTiming(0, { duration: 200 });
    }
  };

  const handleOptionSelect = (value: string) => {
    setSelectedValue(value);
    onSelect(value);
    setIsOpen(false);
    dropdownHeight.value = withTiming(0, { duration: 200 });
    dropdownOpacity.value = withTiming(0, { duration: 200 });
  };

  const animatedStyle = useAnimatedStyle(() => ({
    height: dropdownHeight.value,
    opacity: dropdownOpacity.value,
  }));

  const handleOutsidePress = (event: any) => {
    if (dropdownRef.current) {
      dropdownRef.current.measure((_x, _y, width, height, pageX, pageY) => {
        const { locationX, locationY } = event.nativeEvent;
        const isOutside = !(locationX >= pageX && locationX <= pageX + width && locationY >= pageY && locationY <= pageY + height);
        if (isOutside) {
          setIsOpen(false);
          dropdownHeight.value = withTiming(0, { duration: 200 });
          dropdownOpacity.value = withTiming(0, { duration: 200 });
        }
      });
    }
  };

  return (
    <TouchableWithoutFeedback onPress={handleOutsidePress}>
      <View className="w-full max-w-[600px] min-w-[300px] relative">
        <Pressable
          onPress={toggleDropdown}
          className="bg-green-700 py-1.5 px-2.5 rounded border border-black"
        >
          <Text className="text-black text-[24px] font-pangolin">{selectedValue}</Text>
        </Pressable>

        {isOpen && (
          <Animated.View
            ref={dropdownRef}
            style={animatedStyle}
            className="bg-green-700 rounded border border-black mt-0.5 w-full absolute z-20 overflow-hidden"
          >
            <Pressable onPress={() => handleOptionSelect("Beginner")}>
              <Text className="py-2.5 pl-2.5 text-[24px] font-pangolin">{getText('beginner')}</Text>
            </Pressable>
            <Pressable onPress={() => handleOptionSelect("Intermediate")}>
              <Text className="py-2.5 pl-2.5 text-[24px] font-pangolin">{getText('intermediate')}</Text>
            </Pressable>
            <Pressable onPress={() => handleOptionSelect("Pro")}>
              <Text className="py-2.5 pl-2.5 text-[24px] font-pangolin">{getText('pro')}</Text>
            </Pressable>
          </Animated.View>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default DifficultyDropdown;
