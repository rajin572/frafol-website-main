/* eslint-disable @typescript-eslint/no-unused-vars */
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import cartReducer from "./features/cart/cartSlice"; // Import your auth slice
import sidebarReducer from "./features/sidebar/sidebarSlice"; // Import your auth slice
import conversationReducer from "./features/conversation/conversationSlice";
import { baseApi } from "./api/baseApi";
import { persistStore, persistReducer } from "redux-persist";
import createWebStorage from "redux-persist/lib/storage/createWebStorage";
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

// Handle storage creation for SSR (Server-Side Rendering)
const createNoopStorage = () => {
  return {
    getItem(_key: string) {
      return Promise.resolve(null);
    },
    setItem(_key: string, value: string) {
      return Promise.resolve(value);
    },
    removeItem(_key: string) {
      return Promise.resolve();
    },
  };
};

// Use appropriate storage based on SSR or browser
const storage =
  typeof window === "undefined"
    ? createNoopStorage()
    : createWebStorage("local");

// Configuration for persisting only the auth state (accessToken)
const persistConfig = {
  key: "frafol_main",
  storage,
  whitelist: ["auth", "cart", "sidebar"], // Persist only the `auth` slice (for accessToken)
  blacklist: ["baseApi", "conversation"], // Do not persist the `baseApi` slice
};

// Combine reducers (add `baseApi` and `auth` reducers)
const rootReducer = {
  [baseApi.reducerPath]: baseApi.reducer,
  cart: cartReducer, // Persisted auth reducer
  sidebar: sidebarReducer,
  conversation: conversationReducer,

  // gallery: galleryReducer,
};

// Create persisted reducer for the auth slice
const persistedAuthReducer = persistReducer(
  persistConfig,
  combineReducers(rootReducer)
);

// Configure the Redux store with persisted reducer and middleware for API
export const store = configureStore({
  reducer: persistedAuthReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(baseApi.middleware), // Add `baseApi` middleware
});

// Create persistor for Redux store persistence
export const persistor = persistStore(store);

// Define RootState type to infer the store's state shape
export type RootState = ReturnType<typeof store.getState>;

// Define AppDispatch type for dispatching actions in the app
export type AppDispatch = typeof store.dispatch;
