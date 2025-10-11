function RecipePreview({ data, setPreview }) {
  return (
    <div className="flex items-center justify-center w-full  from-orange-50 via-rose-50 to-amber-50 px-4 py-12">
      <div className="w-full max-w-5xl bg-white shadow-2xl rounded-3xl overflow-hidden border border-gray-100 flex flex-col md:flex-row">
        <div className="md:w-1/2 w-full h-full md:h-auto relative overflow-hidden">
          <img
            src={data.imageUrl}
            alt={data.title}
            className="w-full h-full rounded-t-3xl md:rounded-l-3xl md:rounded-tr-none transition-transform duration-300 hover:scale-105"
            onError={(e) =>
              (e.target.src =
                "https://via.placeholder.com/600x400?text=Image+Not+Available")
            }
          />
          <div className="absolute top-4 left-4 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-md">
            ⏱ {data.cookingTime} min
          </div>
        </div>

        <div className="md:w-1/2 w-full p-6 sm:p-8 flex flex-col justify-between">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
              {data.title}
            </h2>

            <h3 className="text-xl font-semibold text-gray-700 mb-2 flex items-center gap-2">
              🧂 Ingredients
            </h3>
            <ul className="list-disc list-inside text-gray-600 text-base space-y-1 mb-4">
              {data.ingredients?.split(",").map((item, i) => (
                <li key={i} className="capitalize">
                  {item.trim()}
                </li>
              ))}
            </ul>

            <h3 className="text-xl font-semibold text-gray-700 mb-2 flex items-center gap-2">
              🍳 Method
            </h3>
            <p className="text-gray-600 text-base leading-relaxed whitespace-pre-line">
              {data.method}
            </p>
          </div>

          <div className="pt-4 text-center md:text-right">
            <button
              onClick={() => setPreview(false)}
              className="px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-2xl shadow-md hover:shadow-lg transition-all duration-200"
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
