export const useError = (data) => {
  const errors = {};

  if (!data?.title || data?.title.trim() === "") {
    errors.title = "Title is required!";
  }

  if (!data?.cookingTime || data.cookingTime?.trim() === "") {
    errors.cookingTime = "Cooking time is required!";
  }

  if (!data?.ingredients || data?.ingredients.trim() === "") {
    errors.ingredients = "Ingredients are required!";
  }

  if (!data?.imageUrl || data?.imageUrl.trim() === "") {
    errors.imageUrl = "Image URL is required!";
  } else {
    try {
      new URL(data.imageUrl); // URL syntaxini tekshiradi
    } catch (err) {
      errors.imageUrl = "Invalid image URL!";
    }
  }

  if (!data?.method || data?.method.trim() === "") {
    errors.method = "Method is required!";
  }

  return errors;
};
