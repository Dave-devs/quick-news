import { Article, News } from "@/interfaces/news";
import { RootState } from "@/store";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface NewsState {
  status: "idle" | "loading" | "succeeded" | "failed";
  articles: Article[];
  article: Article[];
  bookmarks: Article[];
  error: string | null;
  totalResults: number;
}

const initialState: NewsState = {
  status: "idle",
  articles: [],
  article: [],
  bookmarks: [],
  error: null,
  totalResults: 0,
};

const API_KEY = "fba88b41c8754d2cbe949c2c4ceca890";
const API_URL = `https://newsapi.org/v2/everything`;

interface FetchNewsArgs {
  q?: string;
  from?: string;
  to?: string;
  language?: string;
  sortBy?: string;
}

export const fetchEverythingNews = createAsyncThunk<
  News,
  FetchNewsArgs,
  { rejectValue: string }
>("news/fetchNews", async (args, { rejectWithValue }) => {
  try {
    const { q, from, to, language, sortBy } = args;
    const response = await axios.get(API_URL, {
      params: {
        q,
        from,
        to,
        language,
        sortBy,
        apiKey: API_KEY,
      },
    });
    return response.data;
  } catch (error: any) {
    return rejectWithValue(
      error.response.data.message || "Failed to fetch news"
    );
  }
});

export const searchNews = createAsyncThunk<
  News,
  FetchNewsArgs,
  { rejectValue: string }
>("news/searchNews", async (args, { rejectWithValue }) => {
  try {
    const { q, from, to, language, sortBy } = args;
    const response = await axios.get(API_URL, {
      params: {
        q,
        from,
        to,
        language,
        sortBy,
        apiKey: API_KEY,
      },
    });
    return response.data;
  } catch (error: any) {
    return rejectWithValue(
      error.response.data.message || "Failed to fetch news"
    );
  }
});

export const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {
    addBookmark: (state, action) => {
      state.bookmarks.push(action.payload);
    },
    removeBookmark: (state, action) => {
      state.bookmarks = state.bookmarks.filter(
        (bookmark) => bookmark.url !== action.payload.url
      );
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch everything news
      .addCase(fetchEverythingNews.pending, (state) => {
        state.status = "loading";
        state.error = null
      })
      .addCase(
        fetchEverythingNews.fulfilled,
        (state, action: PayloadAction<News>) => {
          state.status = "succeeded";
          state.articles = action.payload.articles;
          state.totalResults = action.payload.totalResults;
        }
      )
      .addCase(
        fetchEverythingNews.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.status = "failed";
          state.error = action.payload || "Something went wrong";
        }
      )
      // Search news
      .addCase(searchNews.pending, (state) => {
        state.status = "loading";
        state.error = null
      })
      .addCase(searchNews.fulfilled, (state, action: PayloadAction<News>) => {
        state.status = "succeeded";
        state.articles = action.payload.articles;
      })
      .addCase(searchNews.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.status = "failed";
        state.error = action.payload || "Something went wrong";
      });
  },
});

export const { addBookmark, removeBookmark } = newsSlice.actions;
export const selectCount = (state: RootState) => state.news;
export default newsSlice.reducer;
