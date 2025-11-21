import React from "react";
import { Link } from "react-router-dom";

export default function RecipesPage({ recipes }) {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Recipe Suggestions</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {recipes.map((r) => (
          <div key={r.id} className="border rounded-lg shadow p-4 bg-white">
            <img
              src={r.image}
              alt={r.title}
              className="w-full h-48 object-cover rounded"
            />

            <h2 className="text-lg font-semibold mt-3">{r.title}</h2>

            <p className="text-sm mt-2">
              <span className="font-semibold">Used ingredients:</span>{" "}
              {r.usedIngredients.map((i) => i.name).join(", ")}
            </p>

            <p className="text-sm mt-1">
              <span className="font-semibold">Missing:</span>{" "}
              {r.missedIngredients.map((i) => i.name).join(", ") || "None"}
            </p>

            <Link
              to={`/recipe/${r.id}`}
              className="inline-block mt-3 px-4 py-2 bg-indigo-600 text-white rounded"
            >
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
