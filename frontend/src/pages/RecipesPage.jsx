import React from "react";
import { Link } from "react-router-dom";

export default function RecipesPage({ recipes }) {
  return (
    <div className="min-h-screen px-6 py-10 text-blue-200">
      <h1 className="text-3xl md:text-4xl font-extrabold text-blue-400 drop-shadow mb-8 text-center">
        Recipe Suggestions
      </h1>

      {/* If no recipes */}
      {(!recipes || recipes.length === 0) && (
        <p className="text-center text-blue-300 text-lg">No recipes found.</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {recipes.map((r) => (
          <div
            key={r.id}
            className="glass-panel p-5 rounded-xl border border-blue-500/20 shadow-xl hover:scale-[1.02] transition-transform"
          >
            {/* Image */}
            <img
              src={r.image}
              alt={r.title}
              className="w-full h-48 object-cover rounded-lg border border-blue-300/20"
            />

            {/* Title */}
            <h2 className="text-xl font-bold text-blue-300 mt-4">{r.title}</h2>

            {/* Used Ingredients */}
            <p className="text-sm mt-3 text-blue-200/80">
              <span className="font-semibold text-blue-300">Used:</span>{" "}
              {r.usedIngredients.map((i) => i.name).join(", ")}
            </p>

            {/* Missing Ingredients */}
            <p className="text-sm mt-1 text-blue-200/80">
              <span className="font-semibold text-blue-300">Missing:</span>{" "}
              {r.missedIngredients.map((i) => i.name).join(", ") || "None"}
            </p>

            {/* View Details Button */}
            <Link
              to={`/recipe/${r.id}`}
              className="inline-block mt-5 px-4 py-2 bg-blue-600 text-white rounded-lg neon-glow hover:scale-105 transition-transform text-center w-full"
            >
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
