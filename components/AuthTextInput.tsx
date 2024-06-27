import { View, Text, StyleSheet, TextInput } from "react-native";
import React from "react";
import Colors from '@/constants/Colors';

interface AuthTextInputState {
  value: string;
  onChangeText: any;
  placeholder?: string;
  secureTextEntry?: boolean;
}

export default function AuthTextInput({
  value,
  onChangeText,
  secureTextEntry,
  placeholder,
}: AuthTextInputState) {
  return (
    <View style={styles.box}>
      <TextInput
        style={styles.textInput}
        placeholder={placeholder}
        placeholderTextColor={"#D9D9D9"}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        numberOfLines={1}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    backgroundColor: "white",
    height: 40,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.primary,
    marginBottom: 20,
  },
  textInput: {
    padding: 10,
    width: "100%",
    fontFamily: 'mont'
  }
})
