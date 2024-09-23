import React, { useEffect } from "react";
import { Text, Pressable } from "react-native";
import { useFonts } from "expo-font";
import { SafeAreaView } from "react-native-safe-area-context";
import { SplashScreen, useRouter } from "expo-router";

const Start = () => {
  const router = useRouter();

  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#A01D1D",
      }}
    >
      <Text style={{
        fontFamily: "Crayonara-Regular",
        fontSize: 130,
        padding: 100
      }}>
        Te kemu Arapu
      </Text>

      <Pressable
        onPress={() => router.push("/profile")}
        style={({ pressed }) => [
          {
            backgroundColor: pressed ? "#8c4f00" : "#c97d1a",
            padding: 20,
            borderRadius: 8,
            borderWidth: 2,
            borderColor: "black",
          },
        ]}
      >
        <Text
          style={{
            fontSize: 30,
            fontFamily: "Crayonara-Regular",
            fontWeight: "bold",
            color: "white",
          }}
        >
          BEGIN!
        </Text>
      </Pressable>

      <Text
        style={{
          fontSize: 30,
          position: "absolute",
          bottom: 20,
          alignSelf: "center",
          fontWeight: "bold",
        }}
      >
        DEMO
      </Text>
    </SafeAreaView>
  );
};

export default Start;
