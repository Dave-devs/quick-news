import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  ToastAndroid,
} from "react-native";
import React, { useState } from "react";
import { defaultStyles } from "@/constants/Styles";
import Colors from "@/constants/Colors";
import { useAppSelector, useAppDispatch } from "@/hooks";
import { registerUser } from "@/redux/authSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import AuthTextInput from "@/components/AuthTextInput";
import { AntDesign } from "@expo/vector-icons";
import SocialAuthBtn from "@/components/SocialAuthBtn";
import CustomButton from "@/components/CustomButton";

export default function SignUp() {
  const router = useRouter();

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const { status, error, user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const handleRegister = async () => {
    console.log(name, email, password);
    dispatch(registerUser({ name, email, password }));

    if (user) {
      await AsyncStorage.setItem("userToken", user.uid);
      router.replace("(tabs)/home");
    }
  };

  return (
    <View style={defaultStyles.container}>
      <Text style={defaultStyles.headerText}>QUICK NEWS</Text>
      <View style={styles.titleBg}>
        <Text style={styles.titleTxt}>Sign Up to continue</Text>
      </View>

      {/* TextInputs */}
      <View style={styles.textInput}>
        <Text style={styles.placeholder}>Name</Text>
        <AuthTextInput
          value={name}
          onChangeText={setName}
          placeholder={"John Doe"}
        />
        <Text style={styles.placeholder}>Email</Text>
        <AuthTextInput
          value={email}
          onChangeText={setEmail}
          placeholder={"johndoe@gmail.com"}
        />
        <Text style={styles.placeholder}>Password</Text>
        <AuthTextInput
          value={password}
          onChangeText={setPassword}
          placeholder={"password"}
          secureTextEntry={true}
        />
      </View>

      <View style={styles.termsBox}>
        <AntDesign name="checkcircle" size={16} color={Colors.white} />
        <Text style={styles.termText}>
          I accept the Terms and Privacy Policy
        </Text>
      </View>

      <View style={{ alignItems: "center", marginBottom: "5%" }}>
        <CustomButton
          onPress={() => handleRegister()}
          text={
            status === "loading" ? (
              <ActivityIndicator size={"small"} color={Colors.primary} />
            ) : (
              "Sign Up"
            )
          }
          bgColor={Colors.white}
          btnTextColor={Colors.primary}
        />
        {status === 'failed' && <Text style={{ color: 'red', alignSelf: 'center' }}>{error}</Text>}
      </View>

      <Text style={styles.option}>Other registration options</Text>

      {/* Social Auth Options */}
      <View style={styles.socialBox}>
        <SocialAuthBtn icon={"facebook"} onClick={() => {}} />
        <SocialAuthBtn icon={"google"} onClick={() => {}} />
        <SocialAuthBtn icon={"apple"} onClick={() => {}} />
      </View>

      <View style={styles.haveActBox}>
        <Text style={styles.haveActTxt1}>Already have an account?</Text>
        <TouchableOpacity onPress={() => router.push("auth/signin")}>
          <Text style={styles.haveActTxt2}>Sign In</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  titleBg: {
    width: "80%",
    height: 30,
    backgroundColor: Colors.primary,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
  },
  titleTxt: {
    fontFamily: "mont",
    fontSize: 12,
    alignSelf: "center",
    color: Colors.white,
  },
  textInput: {
    marginTop: "10%",
    marginHorizontal: 15,
  },
  placeholder: {
    fontFamily: "montSB",
    marginBottom: 5,
    color: Colors.white
  },
  termsBox: {
    flexDirection: "row",
    marginHorizontal: 15,
    gap: 10,
    alignItems: "center",
    marginTop: -5,
    marginBottom: "15%",
  },
  termText: {
    fontFamily: "montSB",
    fontSize: 10,
    color: Colors.white
  },
  option: {
    fontFamily: "montM",
    fontSize: 15,
    alignSelf: "center",
    marginBottom: "10%",
    color: Colors.white
  },
  socialBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 15,
    marginBottom: "5%",
  },
  haveActBox: {
    flexDirection: "row",
    marginHorizontal: 15,
    gap: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop: -5,
    marginBottom: "20%",
  },
  haveActTxt1: {
    fontFamily: "montM",
    fontSize: 14,
    color: Colors.white
  },
  haveActTxt2: {
    fontFamily: "montB",
    fontSize: 14,
    color: Colors.white
  },
});
