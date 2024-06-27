import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./redux/authSlice";
import newsSlice from "./redux/newsSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    news: newsSlice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: process.env.NODE_ENV !== "production" ? false : true,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
