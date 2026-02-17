import { configureStore } from "@reduxjs/toolkit";
import { userTaskSlice } from "./reducer";
import { api } from "../services/apiSlice";

export function makeStore(preloadedState) {
  return configureStore({
    reducer: {
      userTask: userTaskSlice.reducer,
      [api.reducerPath]: api.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(api.middleware),
    preloadedState,
  });
}
