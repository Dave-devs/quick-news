import React, { useContext, useEffect } from "react";
import { SplashScreen, Stack, useRouter, useSegments } from "expo-router";
import { useFonts } from "expo-font";
import { Provider } from "react-redux";
import { store } from "@/store";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthContext, AuthProvider } from "@/context/authContext";

export { ErrorBoundary } from "expo-router";
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    mont: require("../assets/fonts/Montserrat-Regular.ttf"),
    montM: require("../assets/fonts/Montserrat-Medium.ttf"),
    montSB: require("../assets/fonts/Montserrat-SemiBold.ttf"),
    montB: require("../assets/fonts/Montserrat-Bold.ttf"),
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <Provider store={store}>
          <AuthProvider>
            <RootLayoutNav />
            <StatusBar style="auto" />
          </AuthProvider>
        </Provider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

function RootLayoutNav() {
  const { user, initialized } = useContext(AuthContext);
  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    if (!initialized) return;

    const inTabsGroup = segments[0] === '(tabs)';

    if (user && !inTabsGroup) {
      router.replace('/home');
    } else if (!user) {
      router.replace('/auth/flash');
    }
  }, [user, initialized]);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      {initialized ? <Stack.Screen name="(tabs)" /> : <Stack.Screen name="auth/flash" />}
      <Stack.Screen name="auth/signin" />
      <Stack.Screen name="auth/signup" />
      <Stack.Screen name="screens/news-details" />
    </Stack>
  );
}
