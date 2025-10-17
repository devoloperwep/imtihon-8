// react
import { useSelector, useDispatch } from "react-redux";
import { clear } from "../app/feature/recipeSlice";
// react-router-dom
import { Link } from "react-router-dom";
// components
import RecipeItem from "../components/RecipeItem";
// toast
import { toast } from "react-toastify";
// hooks
import Users from "../components/Users";
import { useCollection } from "../hooks/useCollection";

function Home() {
  const recipe = useSelector((store) => store.recipe);
  const { data } = useCollection("users");
  console.log(data);
  const dispatch = useDispatch();

  const handleClearAll = () => {
    if (confirm("Haqiqatan ham barcha retseptlarni o‘chirmoqchimisiz?")) {
      dispatch(clear());
      toast.dark("Hammasi olib tashlandi.");
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-b from-orange-50 to-white py-12 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-10">
          <h3 className="text-3xl font-bold text-orange-800 tracking-wide">
            🍽 Recipes
          </h3>

          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <Link
              to="/createRecipe"
              className="w-full sm:w-auto text-center text-sm sm:text-base px-4 sm:px-6 py-2 sm:py-2.5 bg-orange-500 hover:bg-orange-600 text-white rounded-xl shadow-md transition-all duration-300"
            >
              + Add Recipe
            </Link>

            {recipe.length > 0 && (
              <button
                onClick={handleClearAll}
                className="w-full sm:w-auto text-center text-sm sm:text-base px-4 sm:px-6 py-2 sm:py-2.5 bg-red-500 hover:bg-red-600 text-white rounded-xl shadow-md transition-all duration-300"
              >
                🗑 Hammasini o‘chirish
              </button>
            )}
          </div>
        </div>

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

        <div className="mt-12">
          <div className="flex items-center justify-between mb-6">
            <h4 className="text-2xl font-bold text-orange-800">Users</h4>
            <span className="text-sm text-gray-500">
              {data?.length ?? 0} ta foydalanuvchi
            </span>
          </div>

          {data?.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center border-2 border-dashed border-gray-200 rounded-2xl bg-white">
              <h5 className="text-lg font-medium text-gray-600">
                Hech qanday foydalanuvchi topilmadi
              </h5>
              <p className="text-sm text-gray-400 mt-2">
                Foydalanuvchilar yuklanmoqda yoki mavjud emas.
              </p>
            </div>
          ) : (
            <ul className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {data?.map((user) => (
                <li
                  key={user.uid}
                  className="bg-white rounded-xl shadow-sm p-4 hover:shadow-md transition-shadow"
                >
                  <Users user={user} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}

export default Home;
