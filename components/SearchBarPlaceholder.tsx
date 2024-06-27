import { View, StyleSheet, Pressable, TextInput } from "react-native";
import React from "react";
import Colors from "@/constants/Colors";
import { Feather, FontAwesome } from "@expo/vector-icons";

interface SearchBarProps {
  onTap: () => void;
  readOnly?: boolean;
}

export default function SearchBarPlaceholder({ onTap, readOnly }: SearchBarProps) {
  return (
    <View>
      <Pressable style={styles.conatiner} onPress={onTap}>
        <Feather name="search" size={20} color={Colors.primary} />
        <TextInput
          style={styles.textinput}
          placeholder="Search"
          placeholderTextColor={Colors.primary}
          readOnly={readOnly}
        />
        <FontAwesome name="sliders" size={18} color={Colors.primary} />
      </Pressable>
    </View>
  );
}
const styles = StyleSheet.create({
  conatiner: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.white,
    borderRadius: 30,
    margin: 15,
    padding: 15,
    gap: 12,
  },
  textinput: {
    flex: 1,
    fontFamily: "montM",
    fontSize: 15,
  },
});

// Is there a way to use both SearchBar com as placeholder and nav to search page?
