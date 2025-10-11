import React from "react";

function RecipePreview({ data, setPreview }) {
  console.log(data);
  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-rose-50 to-amber-50">
        <div className="text-center">
          <p className="text-gray-600 text-lg">⚠️ No recipe to preview yet.</p>
          <p className="text-gray-500">
            Please fill the form and click “Preview”.
          </p>
          <button className="btn mt-4 font-normal">Create Recipe</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-rose-50 to-amber-50 flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-3xl bg-white shadow-2xl rounded-3xl overflow-hidden border border-gray-100">
        {/* Image */}
        <div className="relative">
          <img
            src={data.imageUrl}
            alt={data.title}
            className="w-full h-64 object-cover"
            onError={(e) =>
              (e.target.src =
                "https://via.placeholder.com/600x400?text=Image+Not+Available")
            }
          />
          <div className="absolute top-4 left-4 bg-orange-500 text-white px-4 py-1 rounded-full text-sm font-semibold shadow-md">
            ⏱ {data.cookingTime} min
          </div>
        </div>

        {/* Content */}
        <div className="p-8 space-y-6">
          <h2 className="text-3xl font-bold text-gray-800">{data.title}</h2>

          <div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              🧂 Ingredients
            </h3>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              {data.ingredients?.split(",").map((item, i) => (
                <li key={i} className="capitalize">
                  {item.trim()}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              🍳 Method
            </h3>
            <p className="text-gray-600 leading-relaxed whitespace-pre-line">
              {data.method}
            </p>
          </div>

          <div className="pt-4 text-center">
            <button
              onClick={() => window.history.back()}
              className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-2xl shadow-md hover:shadow-lg transition-all duration-200"
            >
              ← Back to Edit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecipePreview;
