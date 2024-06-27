import React from "react";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { WebView } from "react-native-webview";

interface NewsWebViewProps {
  url: string;
}

export default function NewsWebView({ url }: NewsWebViewProps) {
  const insets = useSafeAreaInsets();
  return (
    <View style={{ flex: 1, paddingTop: insets.top }}>
      <WebView source={{ uri: url }} />
    </View>
  );
}
