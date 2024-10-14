import { SplashScreen, Stack } from "expo-router";
import React from "react";
import { AuthProvider } from "../context/AuthContext";
import { GameProvider } from "../context/GameContext";
import { useFonts } from "expo-font";
import { useEffect } from "react";
import { LanguageProvider } from "te-kemu-arapu-compx374-team-rauru/context/languageToggleButton";


// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function Root() {
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
        <LanguageProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="MainPage" />
          <Stack.Screen name="profile" />
          <Stack.Screen name="(management)/Game" />
          <Stack.Screen name="(category)/choosingCategory" />
          <Stack.Screen name="(category)/voting" />
        </Stack>
        </LanguageProvider>
      </GameProvider>
    </AuthProvider>
  );
}
