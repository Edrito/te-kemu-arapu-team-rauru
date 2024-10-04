import React, { useEffect } from "react";
import "../global.css";
import PlayerBar from "te-kemu-arapu-compx374-team-rauru/components/PlayerBar";
import GameBar from "te-kemu-arapu-compx374-team-rauru/components/GameBar";
import { Text, Pressable, Button, SafeAreaView, View, ScrollView } from "react-native";
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
          router.push("/MainPage");
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
   

      <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={true} style={{ marginTop: 100 }}>
        <View className="flex-1 justify-center items-center">
          <Text className="font-pangolin text-[130px] p-[100px]">
            Te kēmu Arapū
          </Text>


      {/* TODO: DELETE THIS */}
      <View>
        <Text>This is an index to goto and test pages</Text>

        <Button
          title="(TESTING) go to loading screen"
          onPress={() => router.push("/loading")}
        />
     
      </View>

          {/* TODO: DELETE THIS */}
          <View>
            <Text>This is an index to goto and test pages</Text>

            <Button
              title="(TESTING) go to loading screen"
              onPress={() => router.push("/loading")}
            />
            <Button
              title="(TESTING) game state with wheel"
              onPress={() => router.push("/gameState")}
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