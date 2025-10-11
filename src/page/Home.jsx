// react
import { useState } from "react";
// react-router-dom
import { Link } from "react-router-dom";

function Home() {
  const [data, setData] = useState(false);
  return (
    <section>
      <div className="container mx-auto mt-12 p-6 bg-gradient-to-b from-orange-50 to-white rounded-2xl shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-3xl font-bold text-gray-800 tracking-wide">
            🍽 Recipes
          </h3>
          <Link
            to="/createRecipe"
            className="px-5 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-xl shadow-md transition-all duration-300"
          >
            + Add Recipe
          </Link>
        </div>

        <div className="flex flex-col items-center justify-center py-20 text-center border-2 border-dashed border-gray-300 rounded-2xl bg-gray-50">
          <h3 className="text-2xl font-semibold text-gray-500 mb-2">
            No Recipes Found
          </h3>
          <p className="text-gray-400">
            Start adding your first delicious recipe 🍰
          </p>
        </div>
      </div>
    </section>
  );
}

export default Home;
