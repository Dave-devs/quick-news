import {
  View,
  StyleSheet,
  ActivityIndicator,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { defaultStyles } from "../../constants/Styles";
import Header from "@/components/Header";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { RootState } from "@/store";
import {
  addBookmark,
  fetchEverythingNews,
  removeBookmark,
} from "@/redux/newsSlice";
import { FlatList } from "react-native-gesture-handler";
import Colors from "@/constants/Colors";
import SearchBarPlaceholder from "@/components/SearchBarPlaceholder";
import { MaterialIcons } from "@expo/vector-icons";

export default function Home() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const { articles, bookmarks, status, error } = useAppSelector(
    (state: RootState) => state.news
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(
      fetchEverythingNews({
        q: "apple",
        from: "2024-06-26",
        to: "2024-06-26",
        language: "en",
        sortBy: "relevancy",
      })
    );
  }, [dispatch]);

  // Navigate to detai screen
  const handleNavigation = (item: any) => {
    router.push({
      pathname: "screens/news-details",
      params: { ...item },
    });
  };

  // Handle Bookmark
  const isBookmarked = (article: any) => {
    return bookmarks.some((bookmark) => bookmark.url === article.url);
  };
  const handleBookmarkToggle = (article: any) => {
    if (isBookmarked(article)) {
      dispatch(removeBookmark(article));
    } else {
      dispatch(addBookmark(article));
    }
  };

  return (
    <View style={[defaultStyles.container, { paddingTop: insets.top }]}>
      {/* Haeder Components */}
      <View>
        <Header
          title={"Headline News"}
          subTitle={"Get the news as it break"}
          icon={"align-right"}
        />
        <SearchBarPlaceholder
          onTap={() => router.push("(tabs)/search")}
          readOnly={true}
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
                {/* Author & Bookmark Icon */}
                <View style={styles.authorBox}>
                  <Text style={styles.articleAuthor} numberOfLines={1}>
                    {item.author}
                  </Text>
                  <TouchableOpacity onPress={() => handleBookmarkToggle(item)}>
                    <MaterialIcons
                      name={isBookmarked(item) ? "bookmark" : "bookmark-outline"}
                      size={18}
                      color={Colors.white}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          )}
          contentContainerStyle={{ paddingBottom: insets.bottom }}
        />
      )}
    </View>
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
  authorBox: {
    flexDirection: "row",
    alignItems: "center",
  },
  articleAuthor: {
    fontFamily: "mont",
    color: Colors.grey,
    flex: 1,
  },
});
