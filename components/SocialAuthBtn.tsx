import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import Colors from "@/constants/Colors";
import { FontAwesome } from "@expo/vector-icons";

interface SocialBtnState {
  icon: any;
  onClick: () => void;
}

export default function SocialAuthBtn({ icon, onClick }: SocialBtnState) {
  return (
    <TouchableOpacity style={styles.box} onPress={onClick}>
          <FontAwesome name={icon} size={24} color="black" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  box: {
    height: 65,
    width: 65,
    borderWidth: 1,
    borderRadius: 99,
    borderColor: Colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 30,
    height: 30,
    resizeMode: "contain",
  },
});
