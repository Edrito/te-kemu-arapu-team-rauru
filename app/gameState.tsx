import { View, Text, SafeAreaView, Pressable, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import Wheel from "../components/Wheel"; // Assuming the Wheel component is imported from your wheel implementation
import GameBar from "../components/GameBar"; // Assuming GameBar is a custom component

const GameState = () => {
  const [timer, setTimer] = useState(60); // Initialize timer with 60 seconds
  const [hint, setHint] = useState(false); // State to track if hint is shown or not

  // Function to handle hint button press
  const onHintPress = () => {
    setHint(!hint); // Toggle hint state when the hint button is pressed
  };

  // Countdown timer logic (this will decrease the timer by 1 every second)
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
      return () => clearInterval(interval); // Clear the interval on component unmount
    }
  }, [timer]);

  return (
    <SafeAreaView className="flex-1 bg-primary_red">
      {/* Game Bar at the top */}
      <View className="w-full">
        <GameBar />
      </View>

      {/* ScrollView to enable mouse-wheel scrolling */}
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={true} // Optional: show scroll bar indicator
      >
        {/* Timer placed at the top-right */}
        <View className="absolute top-10 right-10 p-6 border-2 border-dashed bg-green-900 items-center">
          <Text className="text-[40px] text-white">Time: {timer}s</Text>
        </View>

        {/* Centered Wheel */}
        <View className="flex-1 items-center justify-center">
          <Wheel wheelColor="blue" arrowColor="black" />

          {/* Hint display (conditional) */}
          {hint && (
            <Text className="text-[18px] text-white m-2">This is your hint!</Text>
          )}
        </View>

        {/* Hint and Pass Buttons at the bottom */}
        <View className="flex-row items-center justify-between p-2 mb-5">
          {/* Hint Button on the left */}
          <Pressable
            onPress={onHintPress}
            className="m-2 p-6 border-2 border-dashed bg-blue-500 items-center"
          >
            <Text className="text-[20px] text-white">Hint</Text>
          </Pressable>

          {/* Pass Button on the right */}
          <Pressable className="m-2 p-6 border-2 border-dashed bg-orange-500 items-center">
            <Text className="text-[40px] text-white">PASS</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default GameState;
