import { SafeAreaView } from "react-native-safe-area-context";
import { Text, Modal, View, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { useState } from "react";
import Dropdown from "../components/Dropdown";
import SelectIcon from "@/components/SelectIcon";
import React from "react";

const Profile = () => {
  const router = useRouter();

  const [isModalVIsible, setIsModalVisible] = useState(false);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#A01D1D",
      }}
    >
      {/* TODO: TAILWIND DOESNT WORK.*/}
      <Text
        style={{
          fontFamily: "Crayonara-Regular",
          fontSize: 70,
          padding: 20,
        }}
      >
        Create Profile
      </Text>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Text
          style={{
            fontSize: 50,
            marginRight: 10,
            fontFamily: "Crayonara-Regular",
          }}
        >
          Difficulty
        </Text>

        <Pressable onPress={() => setIsModalVisible(true)}>
          <Text
            style={{
              fontSize: 30,
              borderWidth: 3,
              backgroundColor: "orange",
              padding: 3,
              paddingLeft: 20,
              paddingRight: 20,
              margin: 5,
              borderRadius: 5,
            }}
          >
            ?
          </Text>
        </Pressable>

        <Modal
          visible={isModalVIsible}
          onRequestClose={() => setIsModalVisible(false)}
          animationType="slide"
          presentationStyle="pageSheet"
        >
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#A01D1D",
            }}
          >
            <Text
              style={{
                fontSize: 30,
                margin: 20,
                fontFamily: "Crayonara-Regular",
              }}
            >
              Beginner: Longer time to guess and more access to hints.
            </Text>
            <Text
              style={{
                fontSize: 30,
                margin: 20,
                fontFamily: "Crayonara-Regular",
              }}
            >
              Intermediate: Shorter time to guess with access to a single hint.
            </Text>
            <Text
              style={{
                fontSize: 30,
                margin: 20,
                fontFamily: "Crayonara-Regular",
              }}
            >
              Pro: Minimal time to guess with no hints available.
            </Text>

            <Pressable onPress={() => setIsModalVisible(false)}>
              <Text
                style={{
                  fontSize: 30,
                  borderWidth: 3,
                  backgroundColor: "orange",
                  padding: 3,
                  paddingLeft: 20,
                  paddingRight: 20,
                  margin: 5,
                  borderRadius: 5,
                }}
              >
                Close
              </Text>
            </Pressable>
          </View>
        </Modal>
      </View>

      {/* This view controls the Dropdown */}
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#A01D1D",
          margin: 30,
          width: 1000,
          paddingBottom: 70,
        }}
      >
        <Dropdown />
      </View>
      {/* This view controls the icon select */}
      <View className="w-300px">
        <SelectIcon />
      </View>

      <Pressable onPress={() => router.push("/loading")}>
        <Text
          style={{
            fontFamily: "Crayonara-Regular",
            fontSize: 30,
            borderWidth: 3,
            backgroundColor: "orange",
            padding: 5,
            paddingLeft: 20,
            paddingRight: 20,
            margin: 30,
            borderRadius: 5,
          }}
        >
          Create
        </Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default Profile;
