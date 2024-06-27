import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";
import CustomButton from "@/components/CustomButton";
import { useRouter } from "expo-router";
import Colors from "@/constants/Colors";

export default function flash() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <Image
        source={require("@/assets/images/flash.png")}
        style={styles.image}
      />
      <Text style={styles.text}>Get the news as it breaks!</Text>
      <CustomButton
        text="Sign In"
        onPress={() => router.push("auth/signin")}
        bgColor={Colors.primary}
        btnTextColor={Colors.white}
      />
      <CustomButton
        text="Sign Up"
        onPress={() => router.push("auth/signup")}
        bgColor={Colors.white}
        btnTextColor={Colors.primary}
        borderWidth={1}
        borderColor={Colors.primary}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bg,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 300,
    height: 300,
    marginBottom: 20,
    alignItems: "center",
  },
  text: {
    fontFamily: "montM",
    fontSize: 15,
    marginBottom: "45%",
  },
});
