import React, { useEffect } from "react";
import "../global.css";
import GameBar from "te-kemu-arapu-compx374-team-rauru/components/GameBar";
import {
  Text,
  Pressable,
  SafeAreaView,
  View,
  ScrollView,
  ImageBackground,
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
            <Text style={{textShadowColor: 'white', textShadowRadius: 5}} className="font-pangolin text-[130px] p-[100px] text-center">
              Te kēmu Arapū
            </Text>

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
                {getText('start')}
              </Text>
            </Pressable>
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

            <Text className="text-[30px] self-center font-bold">
              DEMO
            </Text>
          </View>
        </ScrollView>
    </SafeAreaView>
  );
};

export default Start;
