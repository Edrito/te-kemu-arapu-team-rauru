import React, { useRef, useState } from "react";
import {
  Pressable,
  ScrollView,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withTiming} from "react-native-reanimated";
import { useLanguage } from "../context/languageToggleButton";
import "../global.css";

interface DropdownProps {
  onSelect: (value: string) => void;
}

const DifficultyDropdown: React.FC<DropdownProps> = ({ onSelect }) => {
  const { getText } = useLanguage(); // Use currentLanguage to track the current language
  const [isOpen, setIsOpen] = useState(false);
  const [selectedEnglishValue, setSelectedEnglishValue] =
    useState<string>("Select"); // Store the English value
  const dropdownHeight = useSharedValue(0);
  const dropdownOpacity = useSharedValue(0);
  const dropdownRef = useRef<View>(null);

  // Translate the selected value for display purposes
  const translatedSelectedValue = getText(
    selectedEnglishValue.toLowerCase() as "beginner" | "intermediate" | "pro"
  );

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      dropdownHeight.value = withTiming(250, { duration: 200 });
      dropdownOpacity.value = withTiming(1, { duration: 200 });
    } else {
      dropdownHeight.value = withTiming(0, { duration: 200 });
      dropdownOpacity.value = withTiming(0, { duration: 200 });
    }
  };

  const handleOptionSelect = (englishValue: string) => {
    setSelectedEnglishValue(englishValue);
    onSelect(englishValue); 
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
        const isOutside = !(
          locationX >= pageX &&
          locationX <= pageX + width &&
          locationY >= pageY &&
          locationY <= pageY + height
        );
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
          className="bg-green-700 py-2 px-3 rounded border border-black"
        >
          {/* Display the translated value */}
          <Text className="text-2xl font-pangolin text-white">
            {translatedSelectedValue}
          </Text>
        </Pressable>

        {isOpen && (
          <Animated.View
            ref={dropdownRef}
            style={animatedStyle}
            className="bg-green-700 rounded border border-black mt-0.5 w-full absolute z-20 overflow-hidden"
          >
            <ScrollView
              contentContainerStyle={{ paddingBottom: 10 }}
              style={{ maxHeight: 250 }}
            >
              {/* Option for Beginner */}
              <Pressable
                onPress={() => handleOptionSelect("Beginner")}
                className="flex-col px-4 py-2"
              >
                <Text className="text-xl font-pangolin text-white">
                  {getText("beginner")}
                </Text>
                <Text className="text-sm text-gray-300">
                  {getText("beginnerDescription")}
                </Text>
              </Pressable>

              {/* Option for Intermediate */}
              <Pressable
                onPress={() => handleOptionSelect("Intermediate")}
                className="flex-col px-4 py-2"
              >
                <Text className="text-xl font-pangolin text-white">
                  {getText("intermediate")}
                </Text>
                <Text className="text-sm text-gray-300">
                  {getText("intermediateDescription")}
                </Text>
              </Pressable>

              {/* Option for Pro */}
              <Pressable
                onPress={() => handleOptionSelect("Pro")}
                className="flex-col px-4 py-2"
              >
                <Text className="text-xl font-pangolin text-white">
                  {getText("pro")}
                </Text>
                <Text className="text-sm text-gray-300">
                  {getText("proDescription")}
                </Text>
              </Pressable>
            </ScrollView>
          </Animated.View>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default DifficultyDropdown;
