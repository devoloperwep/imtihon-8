import { useState } from "react";
import RecipePreview from "../components/RecipePreview";

function CreateRecipe() {
  const [data, setData] = useState(null);
  const [preview, setPreview] = useState(false);
  const [title, setTitle] = useState("");
  const [cookingTime, setCookingTime] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [method, setMethod] = useState("");

  if (preview) {
    setData({
      preview,
      title,
      cookingTime,
      ingredients,
      imageUrl,
      method,
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log({
      title,
      cookingTime,
      ingredients,
      imageUrl,
      method,
    });
    e.target.reset();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-rose-50 to-amber-50 flex items-center justify-center py-6 px-3">
      {!preview && (
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md bg-white shadow-xl rounded-2xl p-6 sm:p-8 space-y-6 border border-gray-100"
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800">
            🍳 Create New Recipe
          </h2>

          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Recipe Title
            </label>
            <input
              onChange={(e) => setTitle(e.target.value)}
              name="title"
              type="text"
              placeholder="Enter recipe title..."
              className="w-full p-2 sm:p-3 text-gray-900 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-400 focus:border-orange-400 outline-none transition-all duration-200"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Cooking Time (minutes)
            </label>
            <input
              onChange={(e) => setCookingTime(e.target.value)}
              name="cookingTime"
              type="number"
              placeholder="e.g. 30"
              className="w-full p-2 sm:p-3 text-gray-900 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-400 focus:border-orange-400 outline-none transition-all duration-200"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Ingredients
            </label>
            <div className="flex gap-2">
              <input
                onChange={(e) => setIngredients(e.target.value)}
                name="ingredients"
                placeholder="Tomato, Cheese, Pasta..."
                className="flex-1 p-2 sm:p-3 text-gray-900 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-400 focus:border-orange-400 outline-none transition-all duration-200"
              />
              <button
                type="button"
                className="px-3 sm:px-4 bg-orange-500 hover:bg-orange-600 text-white rounded-xl font-bold text-base transition-all duration-200"
              >
                +
              </button>
            </div>
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Image URL
            </label>
            <div className="flex gap-2">
              <input
                onChange={(e) => setImageUrl(e.target.value)}
                name="imageUrl"
                type="url"
                placeholder="Paste image URL..."
                className="flex-1 p-2 sm:p-3 text-gray-900 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-400 focus:border-orange-400 outline-none transition-all duration-200"
              />
              <button
                type="button"
                className="px-3 sm:px-4 bg-orange-500 hover:bg-orange-600 text-white rounded-xl font-bold text-base transition-all duration-200"
              >
                +
              </button>
            </div>
            <p className="text-red-500 text-xs mt-1 italic">
              ⚠️ Please provide a valid image URL.
            </p>
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Cooking Method
            </label>
            <textarea
              onChange={(e) => setMethod(e.target.value)}
              name="method"
              placeholder="Describe your cooking steps..."
              className="w-full p-2 sm:p-3 text-gray-900 border border-gray-300 rounded-xl h-24 sm:h-28 resize-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 outline-none transition-all duration-200"
            ></textarea>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-between pt-2">
            <button
              type="submit"
              className="w-full sm:w-auto px-5 py-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition-all duration-200"
            >
              Apply
            </button>
            <button
              onClick={() => setPreview(!preview)}
              type="button"
              className="w-full sm:w-auto px-5 py-2 border-2 border-orange-400 text-orange-500 hover:bg-orange-50 font-semibold rounded-xl transition-all duration-200"
            >
              Preview
            </button>
          </div>
        </form>
      )}
      {preview && <RecipePreview setPreview={setPreview} />}
    </div>
  );
}

export default CreateRecipe;
