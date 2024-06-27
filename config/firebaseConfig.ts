import { initializeApp } from "firebase/app";
import {
  getReactNativePersistence,
  initializeAuth,
} from "firebase/auth/react-native";
import { getFirestore } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyDFoqhcvoy2X3DMSU554g0QsGHqpv2e3H4",
  authDomain: "quick-news-fef40.firebaseapp.com",
  projectId: "quick-news-fef40",
  storageBucket: "quick-news-fef40.appspot.com",
  messagingSenderId: "760640627488",
  appId: "1:760640627488:web:2c9c6d863cf364e0172d45"
};

export const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
export const db = getFirestore(app);
