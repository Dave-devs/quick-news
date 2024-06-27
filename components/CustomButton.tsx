import { TouchableOpacity, Text, StyleSheet } from "react-native";
import React from "react";
import Colors from "@/constants/Colors";

interface CustomButtonProps {
  text: any;
  onPress: () => void;
  bgColor: any;
  borderWidth?: number;
  borderColor?: string;
  btnTextColor: string;
}

export default function CustomButton({ text, onPress, bgColor, btnTextColor, borderWidth, borderColor }: CustomButtonProps) {
  return (
    <TouchableOpacity style={[styles.conatiner, {backgroundColor: bgColor, borderColor: borderColor, borderWidth: 1}]} onPress={onPress}>
      <Text style={[styles.text, {color: btnTextColor}]}>{text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  conatiner: {
    width: "80%",
    height: 45,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10
  },
  text: {
    fontFamily: "montSB",
  },
});
