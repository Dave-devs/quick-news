import { View, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import React from "react";
import Colors from "@/constants/Colors";
import { Feather, FontAwesome } from "@expo/vector-icons";

interface SearchBarProps {
  value: string;
  onSearch: (text: string) => void;
}

export default function SearchBar({ value, onSearch }: SearchBarProps) {
  return (
    <View>
      <View style={styles.conatiner}>
        <FontAwesome name="sliders" size={18} color={Colors.primary} />
        <TextInput
          value={value}
          onChangeText={onSearch}
          placeholder="Search"
          style={styles.textinput}
          placeholderTextColor={Colors.primary}
          autoCapitalize='none'
        />
        <TouchableOpacity onPress={() => onSearch(value)}>
          <Feather name="search" size={20} color={Colors.primary} />
        </TouchableOpacity>
      </View>
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
    color: Colors.black
  },
});
