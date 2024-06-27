import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { useLocalSearchParams } from "expo-router";
import Colors from "@/constants/Colors";
import NewsWebView from "@/components/NewsWebView";

export default function Details() {
  const params = useLocalSearchParams();
  const news = params;

  const imageUri = Array.isArray(news.urlToImage)
    ? news.urlToImage[0]
    : news.urlToImage;

  const [selectedUrl, setSelectedUrl] = useState<string | null>(null);

  if (selectedUrl) {
    return <NewsWebView url={selectedUrl} />;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}
      <View style={styles.newsBox}>
        <Text style={styles.newsTitle}>{news.title}</Text>
        <Text style={styles.newsAuthor}>By {news.author}</Text>
        <View style={styles.divider}></View>
        <Text style={styles.newsDesc}>{news.description}</Text>
        <Text style={styles.newsDesc}>{news.content}</Text>
        <View style={styles.divider}></View>
        <Text style={styles.newsAuthor}>By {news.publishedAt}</Text>
        <TouchableOpacity onPress={() => setSelectedUrl(news.url as string)}>
          <Text style={styles.newsUrl} numberOfLines={1}>
            {news.url}{" "}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  image: {
    width: "100%",
    height: 300,
    resizeMode: "cover",
  },
  newsBox: {
    paddingHorizontal: 5,
    marginTop: 20,
    gap: 10,
  },
  newsTitle: {
    fontFamily: "montSB",
    fontSize: 15,
  },
  newsAuthor: {
    fontFamily: "montM",
    fontSize: 15,
  },
  divider: {
    borderBottomWidth: 5,
    width: "100%",
    borderColor: "#e9ecef",
  },
  newsDesc: {
    fontFamily: "montSB",
    fontSize: 12,
  },
  newsUrl: {
    fontFamily: "montSB",
    fontSize: 12,
    color: "blue",
    paddingBottom: 20,
  },
});
