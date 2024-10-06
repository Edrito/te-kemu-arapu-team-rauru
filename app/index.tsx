import React, { useEffect } from "react";
import "../global.css";
import PlayerBar from "te-kemu-arapu-compx374-team-rauru/components/PlayerBar";
<<<<<<< HEAD
<<<<<<< HEAD
import GameBar from "te-kemu-arapu-compx374-team-rauru/components/GameBar";
import { Text, Pressable, Button, SafeAreaView, View, ScrollView } from "react-native";
=======
=======
>>>>>>> 5228e85ee26c80a3c323e36ce8e8e59e71daa7be
import { Text, Pressable, Button, SafeAreaView, View } from "react-native";
>>>>>>> 402a4b6 (Created player input screen for category gamemode)
import { useRouter } from "expo-router";
import { useAuth } from "../context/AuthContext";
import { getDocs, collection, where, query } from "firebase/firestore";
import { firestore } from "../firebaseConfig";


const Start = () => {
  const router = useRouter();
  const { user } = useAuth();

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
            router.push("/Lobby");
          }
        } catch (error) {
          console.error("Error fetching user profile:", error);
        }
      }
    };

    if (user) checkUserProfile();
  }, [user]);

  // Path to current player icon
  const playerIconTest = "../assets/images/react-logo.png";

  return (
    <SafeAreaView className="flex-1 bg-primary_red">
      {/* GameBar at the top */}
      <View className="w-full absolute top-0">
        <GameBar />
      </View>

      <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={true} style={{ marginTop: 100 }}>
        <View className="flex-1 justify-center items-center">
          <Text className="font-pangolin text-[130px] p-[100px]">
            Te kēmu Arapū
          </Text>

<<<<<<< HEAD

          <Pressable
            onPress={() => router.push("/profile")}
            style={({ pressed }) => [
              {
                backgroundColor: pressed ? "#8c4f00" : "#c97d1a",
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
              BEGIN!
            </Text>
          </Pressable>
=======
      <Pressable
        onPress={() => router.push('/Profile')}
        style={({ pressed }) => [
          {
            backgroundColor: pressed ? "#8c4f00" : "#c97d1a",
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
          BEGIN!
        </Text>
      </Pressable>
>>>>>>> 402a4b6 (Created player input screen for category gamemode)

      {/* TODO: DELETE THIS */}
      <View>
        <Text>This is an index to goto and test pages</Text>
        <Button
          title="(TESTING) go to scoreboard screen"
          onPress={() => router.push("/Score")}
        />
        <Button
          title="(TESTING) go to loading screen"
          onPress={() => router.push("/Loading")}
        />
        <Button
          title="(TESTING) go to category screen"
<<<<<<< HEAD
<<<<<<< HEAD
          onPress={() => router.push("/category")}
=======
          onPress={() => router.push("/SelectCategory")}
>>>>>>> 402a4b6 (Created player input screen for category gamemode)
=======
          onPress={() => router.push("/SelectCategory")}
>>>>>>> 5228e85ee26c80a3c323e36ce8e8e59e71daa7be
        />
        <Button
          title="(TESTING) go to letter select screen (Player POV)"
          onPress={() => router.push("/SelectLetterPlayer")}
        />
        <Button
          title="(TESTING) go to letter select screen (Spectator POV)"
          onPress={() => router.push("/SelectLetterSpectator")}
        />
      </View>

          <Text className="text-[30px] absolute bottom-5 self-center font-bold">
            DEMO
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Start;