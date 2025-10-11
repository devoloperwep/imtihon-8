import { configureStore } from "@reduxjs/toolkit";
import recipeSlice from "./feature/recipeSlice";

export const store = configureStore({
  reducer: {
    recipe: recipeSlice,
  },
});
