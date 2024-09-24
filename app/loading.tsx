import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const Loading = () => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#A01D1D",
      }}
    >
      <View style={{ margin: 50 }}>
        <Text
          style={{
            fontFamily: "Crayonara-Regular",
            fontSize: 70,
            padding: 20,
          }}
        >
          Loading
        </Text>

        <ActivityIndicator size={"large"} color={"black"} />
      </View>
      <View style={{}}>
        <Text
          style={{
            fontFamily: "Crayonara-Regular",
            fontSize: 70,
            padding: 20,
            borderWidth: 2,
            backgroundColor: "green",
            marginBottom: 30,
          }}
        >
          Did you know:
        </Text>
      </View>
      <Text
        style={{
          fontFamily: "Crayonara-Regular",
          fontSize: 60,
          padding: 20,
          borderWidth: 2,
          backgroundColor: "green",
        }}
      >
        FACTFACTFACTFACTFACTFACTFACTFACTFACTFACTFACTFACT
      </Text>
    </SafeAreaView>
  );
};

export default Loading;

const styles = StyleSheet.create({});
