import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { FontAwesome } from "@expo/vector-icons";
import Colors from "@/constants/Colors";

interface HeaderProps {
  title: string;
  subTitle: string;
  icon: any;
}

export default function Header({ title, subTitle, icon }: HeaderProps) {
  return (
    <View style={styles.container}>
      <View style={styles.headerBox}>
        <Text style={styles.title}>{title}</Text>
        <FontAwesome name={icon} size={18} color={Colors.white} />
      </View>
      <Text style={styles.subTitle}>{subTitle}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16
  },
  headerBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    fontFamily: "montSB",
    fontSize: 24,
    color: Colors.white,
  },
  subTitle: {
    fontFamily: "mont",
    fontSize: 10,
    color: Colors.white,
  },
});
