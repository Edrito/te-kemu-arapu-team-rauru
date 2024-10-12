import React, { useEffect, useState } from "react";
import "../global.css";
import GameBar from "te-kemu-arapu-compx374-team-rauru/components/GameBar";
import {
  Text,
  Pressable,
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
      <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}>
        <ImageBackground
          source={require("../assets/images/tekemuarapu-bg-80.jpg")}
          style={{
            flex: 1,
            width: '100%',
            height: '100%',
            opacity: 0.5,
          }}
          resizeMode="cover"
        />
      </View>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={true}
          style={{ marginTop: 100 }}
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
        
        
        
            <Text className="text-[30px] self-center font-bold">DEMO</Text>
          </View>
        </ScrollView>
    </SafeAreaView>
  );
};

export default Start;
