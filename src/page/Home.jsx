// react
import { useSelector, useDispatch } from "react-redux";
import { clear } from "../app/feature/recipeSlice";
// react-router-dom
import { Link } from "react-router-dom";
// components
import RecipeItem from "../components/RecipeItem";

function Home() {
  const recipe = useSelector((store) => store.recipe);
  const dispatch = useDispatch();

  const handleClearAll = () => {
    if (confirm("Haqiqatan ham barcha retseptlarni o‘chirmoqchimisiz?")) {
      dispatch(clear());
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-b from-orange-50 to-white py-12 px-4">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-10">
          <h3 className="text-3xl font-bold text-gray-800 tracking-wide">
            🍽 Recipes
          </h3>

          <div className="flex gap-3">
            <Link
              to="/createRecipe"
              className="px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-xl shadow-md transition-all duration-300"
            >
              + Add Recipe
            </Link>

            {/* 🗑 Hammasini o‘chirish tugmasi */}
            {recipe.length > 0 && (
              <button
                onClick={handleClearAll}
                className="px-6 py-2 bg-red-500 hover:bg-red-600 text-white rounded-xl shadow-md transition-all duration-300"
              >
                🗑 Hammasini o‘chirish
              </button>
            )}
          </div>
        </div>

        {/* Recipe list */}
        {recipe.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center border-2 border-dashed border-gray-300 rounded-2xl bg-gray-50">
            <h3 className="text-2xl font-semibold text-gray-500 mb-2">
              No Recipes Found
            </h3>
            <p className="text-gray-400">
              Start adding your first delicious recipe 🍰
            </p>
          </div>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {recipe.map((rec) => (
              <RecipeItem key={rec.id} rec={rec} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default Home;
