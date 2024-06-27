import {
  View,
  StyleSheet,
  ActivityIndicator,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import { defaultStyles } from "../../constants/Styles";
import Header from "@/components/Header";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { RootState } from "@/store";
import { removeBookmark } from "@/redux/newsSlice";
import { FlatList } from "react-native-gesture-handler";
import Colors from "@/constants/Colors";
import SearchBarPlaceholder from "@/components/SearchBarPlaceholder";
import { MaterialIcons } from "@expo/vector-icons";

export default function Bookmark() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const { bookmarks, status, error } = useAppSelector(
    (state: RootState) => state.news
  );
  const dispatch = useAppDispatch();

  const handleNavigation = (item: any) => {
    router.push({
      pathname: "screens/news-details",
      params: { ...item },
    });
  };

  const handleRemoveBookmark = (article: any) => {
    dispatch(removeBookmark(article));
  };

  return (
    <View style={[defaultStyles.container, { paddingTop: insets.top }]}>
      <View>
        <Header
          title={"Bookmark"}
          subTitle={"All your bookmarked news in one place."}
          icon={"align-right"}
        />
        <SearchBarPlaceholder
          onTap={() => router.push("(tabs)/search")}
          readOnly={true}
        />
      </View>
      {/* Display bookmared items */}
      {status === "loading" && <ActivityIndicator />}
      {status === "failed" && <Text>{error}</Text>}
      {status === "succeeded" && (
        <FlatList
          data={bookmarks}
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
                  <TouchableOpacity onPress={() => handleRemoveBookmark(item)}>
                    <MaterialIcons name="delete-outline" size={18} color={Colors.white} />
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
