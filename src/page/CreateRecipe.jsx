// React
import { useState } from "react";
// react-redux
import { useDispatch, useSelector } from "react-redux";
import { addRecipe, clear, removeRecipe } from "../app/feature/recipeSlice";
// router-dom
import { Link, useNavigate } from "react-router-dom";
// components
import RecipePreview from "../components/RecipePreview";
import { useError } from "../components/useError";
// uuid
import { v4 as uuidv4 } from "uuid";

function CreateRecipe() {
  // redux
  const recipe = useSelector((store) => store.recipe);
  const dispatch = useDispatch();
  console.log(recipe);
  // useState
  const [data, setData] = useState(null);
  const [preview, setPreview] = useState(false);
  const [title, setTitle] = useState("");
  const [cookingTime, setCookingTime] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [method, setMethod] = useState("");
  const [errors, setErrors] = useState({});
  // router-dom
  const navigate = useNavigate();

  // handlePreview
  const handlePreview = () => {
    const formData = { title, cookingTime, ingredients, imageUrl, method };
    const safeErrors = useError(formData);

    if (Object.keys(safeErrors).length === 0) {
      setData(formData);
      setErrors({});
      setPreview(true);
    } else {
      setErrors(safeErrors);
    }
  };

  // handleSubmit
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = { title, cookingTime, ingredients, imageUrl, method };
    const safeErrors = useError(formData);

    if (Object.keys(safeErrors).length === 0) {
      setData(formData);
      setErrors({});
      e.target.reset();
      setPreview(false);
      dispatch(addRecipe({ ...formData, id: uuidv4() }));
      navigate("/");
    } else {
      setErrors(safeErrors);
    }
  };

  // auto filling
  function autoFilling(e) {
    e.preventDefault();
    setTitle("Palov");
    setCookingTime("120");
    setIngredients("guruch, sabzi, go'sht, piyoz, yog', tuz, ziravorlar, suv");
    setImageUrl(
      "https://adrastravel.com/wp-content/uploads/2021/12/plov-na-lyagane.jpg"
    );
    setMethod(
      "1. Go'shtni qovuring.\n2. Piyoz va sabzini qo'shing.\n3. Suv solib qaynating.\n4. Guruchni qo'shib dimlang.\n5. Osh tayyor!"
    );
  }
  return (
    <div className="min-h-screen from-orange-50 via-rose-50 to-amber-50 flex flex-col items-center justify-center py-6 px-3">
      <Link
        to="/"
        className="self-start mb-4 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-xl shadow-md transition-all duration-200"
      >
        🏠 Home
      </Link>
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
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              placeholder="Enter recipe title..."
              className={`w-full p-2 sm:p-3 text-gray-900 border ${
                errors.title ? "border-red-400" : "border-gray-300"
              } rounded-xl focus:ring-2 focus:ring-orange-400 focus:border-orange-400 outline-none transition-all`}
            />
            {errors.title && (
              <p className="text-red-500 text-xs mt-1 italic">
                ⚠️ {errors.title}
              </p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Cooking Time (minutes)
            </label>
            <input
              value={cookingTime}
              onChange={(e) => setCookingTime(e.target.value)}
              type="number"
              placeholder="e.g. 30"
              className={`w-full p-2 sm:p-3 text-gray-900 border ${
                errors.cookingTime ? "border-red-400" : "border-gray-300"
              } rounded-xl focus:ring-2 focus:ring-orange-400 focus:border-orange-400 outline-none transition-all`}
            />
            {errors.cookingTime && (
              <p className="text-red-500 text-xs mt-1 italic">
                ⚠️ {errors.cookingTime}
              </p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Ingredients
            </label>
            <input
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
              placeholder="Tomato, Cheese, Pasta..."
              className={`w-full p-2 sm:p-3 text-gray-900 border ${
                errors.ingredients ? "border-red-400" : "border-gray-300"
              } rounded-xl focus:ring-2 focus:ring-orange-400 focus:border-orange-400 outline-none transition-all`}
            />
            {errors.ingredients && (
              <p className="text-red-500 text-xs mt-1 italic">
                ⚠️ {errors.ingredients}
              </p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Image URL
            </label>
            <input
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              type="url"
              placeholder="Paste image URL..."
              className={`w-full p-2 sm:p-3 text-gray-900 border ${
                errors.imageUrl ? "border-red-400" : "border-gray-300"
              } rounded-xl focus:ring-2 focus:ring-orange-400 focus:border-orange-400 outline-none transition-all`}
            />
            {errors.imageUrl && (
              <p className="text-red-500 text-xs mt-1 italic">
                ⚠️ {errors.imageUrl}
              </p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Cooking Method
            </label>
            <textarea
              value={method}
              onChange={(e) => setMethod(e.target.value)}
              placeholder="Describe your cooking steps..."
              className={`w-full p-2 sm:p-3 text-gray-900 border ${
                errors.method ? "border-red-400" : "border-gray-300"
              } rounded-xl h-24 sm:h-28 resize-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 outline-none transition-all`}
            />
            {errors.method && (
              <p className="text-red-500 text-xs mt-1 italic">
                ⚠️ {errors.method}
              </p>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-between pt-2">
            <button
              type="submit"
              className="w-full sm:w-auto px-5 py-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-xl"
            >
              Apply
            </button>
            <button
              onClick={autoFilling}
              className="btn w-full sm:w-auto h-12 px-6 bg-neutral-900 text-white font-semibold rounded-xl shadow-md hover:bg-neutral-800 active:bg-neutral-700 transition-all duration-300 ease-in-out"
            >
              ⚡ Auto Filling
            </button>

            <button
              onClick={handlePreview}
              type="button"
              className="w-full sm:w-auto px-5 py-2 border-2 border-orange-400 text-orange-500 hover:bg-orange-50 font-semibold rounded-xl"
            >
              Preview
            </button>
          </div>
        </form>
      )}
      {preview && <RecipePreview setPreview={setPreview} data={data} />}
    </div>
  );
}

export default CreateRecipe;
