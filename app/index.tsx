import { Text, Pressable, Button, SafeAreaView } from "react-native";
import { useRouter } from "expo-router";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import { getDoc, getDocs, collection, where, query } from "firebase/firestore";
import { firestore } from "../firebaseConfig";


const Start = () => {
  const router = useRouter();
  const { user } = useAuth();

 useEffect(() => {
  const checkUserProfile = async () => {
    if (user) {
      try {
        const queryWithUid = query(collection(firestore, "profile"), where("userId", "==", user.uid));
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

  return (

    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#A01D1D",
      }}
    >
      <Text
        style={{
          fontFamily: "Crayonara-Regular",
          fontSize: 130,
          padding: 100,
        }}
      >
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

      {/* TODO: DELETE THIS */}
      <Button
        title="(TESTING) go to scoreboard screen"
        onPress={() => router.push("/score")}
      />

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