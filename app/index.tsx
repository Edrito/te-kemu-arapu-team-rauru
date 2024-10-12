import React, { useEffect, useState } from "react";
import "../global.css";
import GameBar from "te-kemu-arapu-compx374-team-rauru/components/GameBar";
import {
  Text,
  Pressable,
  Button,
  SafeAreaView,
  View,
  ScrollView,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";
import { useAuth } from "../context/AuthContext";
import { getDocs, collection, where, query } from "firebase/firestore";
import { firestore } from "../firebaseConfig";
import { useLanguage } from "../context/languageToggleButton";

const Start = () => {
  const router = useRouter();
  const { user } = useAuth();
  const { getText } = useLanguage();

  useEffect(() => {
    const checkUserProfile = async () => {
      if (user) {
        try {
          const queryWithUid = query(
            collection(firestore, "profile"),
            where("userId", "==", user.uid)
          );
          const userSnapshot = await getDocs(queryWithUid);

          if (!userSnapshot.empty) {
            router.push("/MainPage");
          }
        } catch (error) {
          console.error("Error getting user profile:", error);
        }
      }
    };

    if (user) {
      checkUserProfile();
    }
  }, [user]);

  const [windowDimensions, setWindowDimensions] = useState(
    Dimensions.get("window")
  );
  useEffect(() => {
    const resizeScreen = () => {
      setWindowDimensions(Dimensions.get("window"));
    };

    const subscription = Dimensions.addEventListener("change", resizeScreen);

    return () => subscription?.remove();
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-primary_red">
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={true}
        style={{ marginTop: 100 }}
      >
        <ImageBackground
          source={require("../assets/images/tekemuarapu-bg-80.jpg")}
          className="flex-1 justify-center w-full h-full"
          resizeMode="cover"
        >
          <View className="flex-1 justify-center items-center">
            <Text
              style={{
                textShadowColor: "white",
                textShadowRadius: 5,
                fontSize: windowDimensions.width < 1036 ? 60 : 130,
              }}
              className="font-pangolin p-[100px] text-center"
            >
              Te kēmu Arapū
            </Text>

            <TouchableOpacity
              onPress={() => router.push("/profile")}
              className="p-[20px] border-2 border-dashed rounded-lg bg-green-800 m-[20px]"
            >
              <Text className="text-[30px] font-bold text-white font-pangolin">
                {getText("start")}
              </Text>
            </TouchableOpacity>
            {/* 
            <Pressable
              onPress={() => router.push("/profile")}
              style={({ pressed }) => [
                {
                  backgroundColor: pressed ? "#4CAF50" : "#2F6D30",
                  padding: 20,
                  borderRadius: 8,
                  borderWidth: 2,
                  borderColor: "black",
                  borderStyle: "dashed",
                  margin: 10,
                },
              ]}
            >
              <Text className="text-[30px] font-bold text-white font-crayonara">
                {getText("start")}
              </Text>
            </Pressable> */}
            {/* TODO: DELETE THIS */}
            <View>
              {/* <Text>This is an index to goto and test pages</Text> */}
              {/* <Button
              title="(TESTING) go to scoreboard screen"
              onPress={() => router.push("/Score")}
            />
            <Button
              title="(TESTING) go to loading screen"
              onPress={() => router.push("/Loading")}
            /> */}
              {/* <Button
              title="(TESTING) game state with wheel"
              onPress={() => router.push("/gameState")}
            /> */}
              {/* <Button
              title="(TESTING) go to category screen"
              onPress={() => router.push("/selectCategory")}
            /> */}
              {/* <Button
              title="(TESTING) go to letter select screen (Player POV)"
              onPress={() => router.push("/selectLetterPlayer")}
            />
            <Button
              title="(TESTING) go to letter select screen (Spectator POV)"
              onPress={() => router.push("/selectLetterSpectator")}
            /> */}
              {/* <Button
              title="(TESTING) go to vote screen"
              onPress={() => router.push("/voting")}
            /> */}
            </View>

            <Text className="text-[30px] self-center font-bold">DEMO</Text>
          </View>
        </ImageBackground>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Start;
