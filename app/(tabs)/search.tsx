import {
  View,
  StyleSheet,
  ActivityIndicator,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { defaultStyles } from "../../constants/Styles";
import Header from "@/components/Header";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { RootState } from "@/store";
import { searchNews } from "@/redux/newsSlice";
import { FlatList } from "react-native-gesture-handler";
import Colors from "@/constants/Colors";
import SearchBar from "@/components/SearchBar";

export default function Search() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const [query, setQuery] = useState<string>("");

  const { articles, status, error } = useAppSelector(
    (state: RootState) => state.news
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (query) {
      dispatch(
        searchNews({
          q: query,
          from: "2024-06-26",
          to: "2024-06-26",
          language: "en",
          sortBy: "relevancy",
        })
      );
    }
  }, [query, dispatch]);

  const handleNavigation = (item: any) => {
    router.push({
      pathname: "screens/news-details",
      params: { ...item },
    });
  };

  const handleSearch = (value: string) => {
    setQuery(value);
  };

  console.log(() => handleSearch('apple'));

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={[defaultStyles.container, { paddingTop: insets.top }]}>
        <View>
          <Header
            title={"Headline News"}
            subTitle={"Get the news as it break"}
            icon={"align-right"}
          />
          <SearchBar
            value={query}
            onSearch={(newVlue) => handleSearch(newVlue)}
          />
        </View>
        {/* Fetched News Component */}
        {status === "loading" && <ActivityIndicator />}
        {status === "failed" && <Text>{error}</Text>}
        {status === "succeeded" && (
          <FlatList
            data={articles}
            keyExtractor={(item) => item.url}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.articleContainer}
                onPress={() => handleNavigation(item)}
              >
                <Image
                  source={{ uri: item.urlToImage! }}
                  style={styles.articleImage}
                />
                <View style={styles.descBox}>
                  <Text style={styles.articleDesc} numberOfLines={4}>
                    {item.description}
                  </Text>
                  <Text style={styles.articleAuthor} numberOfLines={1}>
                    {item.author}
                  </Text>
                </View>
              </TouchableOpacity>
            )}
            contentContainerStyle={{ paddingBottom: insets.bottom }}
          />
        )}
      </View>
    </KeyboardAvoidingView>
  );
}
const styles = StyleSheet.create({
  articleContainer: {
    width: "auto",
    flexDirection: "row",
    alignContent: "center",
    marginBottom: 10,
    marginHorizontal: 10,
    justifyContent: "space-between",
    alignItems: "center",
  },
  articleDesc: {
    fontFamily: "mont",
    fontSize: 10,
    color: Colors.white,
  },
  descBox: {
    width: "65%",
    gap: 8,
  },
  articleImage: {
    height: 80,
    width: 110,
    borderRadius: 8,
  },
  articleAuthor: {
    fontFamily: "mont",
    color: Colors.grey,
  },
});
