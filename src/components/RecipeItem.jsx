function RecipeItem({ rec }) {
  console.log(rec);
  return (
    <div className="flex justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg overflow-hidden hover:scale-[1.02] transition-transform duration-300">
        <img
          src={rec.imageUrl}
          alt={rec.title}
          className="w-full h-64 object-cover"
        />

        <div className="p-6">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">{rec.title}</h2>

          <p className="text-sm text-gray-500 mb-4 flex items-center gap-2">
            ⏱ <span>{rec.cookingTime} daqiqa ichida tayyor</span>
          </p>

          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-700 mb-1">
              🍚 Ingredientlar:
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              {rec.ingredients}
            </p>
          </div>

          <div className="bg-orange-50 p-4 rounded-xl border border-orange-200">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              👨‍🍳 Tayyorlanish usuli:
            </h3>
            <pre className="whitespace-pre-wrap text-gray-700 text-sm leading-relaxed">
              {rec.method}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecipeItem;
