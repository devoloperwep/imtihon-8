import { createSlice } from "@reduxjs/toolkit";

const initialState = localStorage.getItem("reciple")
  ? JSON.parse(localStorage.getItem("reciple"))
  : [];

const recipeSlice = createSlice({
  name: "recipe",
  initialState,
  reducers: {
    addRecipe: (state, { payload }) => {
      state.push(payload);
      localStorage.setItem("reciple", JSON.stringify(state));
    },
    removeRecipe: (state, { payload }) => {
      const updated = state.filter((item) => item.id !== payload);
      localStorage.setItem("reciple", JSON.stringify(updated));
      return updated;
    },
    clear: () => {
      localStorage.clear("reciple");
      return [];
    },
  },
});

export const { addRecipe, clear, removeRecipe } = recipeSlice.actions;
export default recipeSlice.reducer;
