import { SplashScreen, Stack } from "expo-router";
import React from "react";
import { AuthProvider } from "../context/AuthContext";
import { GameProvider } from "../context/GameContext";
import {useFonts} from "expo-font";
import { useEffect } from "react";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();


export default function RootLayout() {

  const [fontsLoaded, error] = useFonts({
    "Crayonara-Regular": require("../assets/fonts/Crayonara-Regular.ttf"),
    "NotoSans-Regular": require("../assets/fonts/NotoSans-Regular.ttf"),
    "Pangolin-Regular": require("../assets/fonts/Pangolin-Regular.ttf"),
  });

  useEffect(() => {
    if (error) throw error;

    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, error]);

  if (!fontsLoaded) {
    return null;
  }

  if (!fontsLoaded && !error) {
    return null;
  }


  return (
    <AuthProvider>
      <GameProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="(category)" />
        <Stack.Screen name="Game" />
      </Stack>
      </GameProvider>
    </AuthProvider>
  );
}
