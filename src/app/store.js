import { configureStore } from "@reduxjs/toolkit";
import recipeSlice from "./feature/recipeSlice";
import userSlice from "./feature/userSlice";

export const store = configureStore({
  reducer: {
    recipe: recipeSlice,
    user: userSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // 🔥 to‘g‘ri joy
    }),
});
