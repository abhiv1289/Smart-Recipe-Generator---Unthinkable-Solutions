import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext";

export default function RecipesPage({ recipes = [] }) {
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "dark";

  // Use uploaded file as fallback image (local path you provided)
  const placeholder = "/mnt/data/c95da042-e03f-49b5-b678-ea9f517293f5.png";

  return (
    <div
      className={`min-h-screen px-6 py-10 transition-colors duration-300
        ${
          isDark
            ? "bg-[#071023] text-blue-100"
            : "bg-transparent text-slate-900"
        }
      `}
    >
      <header className="max-w-6xl mx-auto mb-8">
        <h1
          className={`text-3xl md:text-4xl font-extrabold drop-shadow mb-2 text-center
            ${isDark ? "text-blue-200" : "text-blue-600"}
          `}
        >
          Recipe Suggestions
        </h1>

        <p
          className={`text-center max-w-2xl mx-auto text-sm md:text-base
            ${isDark ? "text-blue-100/80" : "text-blue-600/80"}
          `}
        >
          Based on the ingredients you provided — quick ideas you can cook right
          now.
        </p>
      </header>

      {/* Empty state */}
      {(!recipes || recipes.length === 0) && (
        <div className="max-w-3xl mx-auto text-center py-20">
          <p
            className={`mb-6 ${isDark ? "text-blue-100/80" : "text-slate-700"}`}
          >
            No recipes found. Try adding more ingredients or upload clearer
            photos.
          </p>
          <Link
            to="/input"
            className={`inline-block px-6 py-3 rounded-lg font-semibold shadow
              ${
                isDark
                  ? "bg-blue-600 hover:bg-blue-700 text-white"
                  : "bg-blue-600 hover:bg-blue-700 text-white"
              }
              transition
            `}
          >
            Add ingredients
          </Link>
        </div>
      )}

      {/* Grid */}
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {recipes.map((r) => {
            const used = (r.usedIngredients || [])
              .map((i) => i.name)
              .slice(0, 4);
            const missed = (r.missedIngredients || [])
              .map((i) => i.name)
              .slice(0, 4);
            return (
              <article
                key={r.id}
                className={`group relative rounded-2xl overflow-hidden border transition-shadow transform hover:-translate-y-1 hover:shadow-2xl
                  ${
                    isDark
                      ? "bg-white/3 border-white/6"
                      : "bg-white/50 border-blue-100"
                  }
                `}
                aria-labelledby={`title-${r.id}`}
              >
                {/* Image */}
                <div className="h-48 w-full overflow-hidden">
                  <img
                    src={r.image || placeholder}
                    alt={r.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = placeholder;
                    }}
                  />
                </div>

                {/* Card body */}
                <div className="p-5">
                  <h2
                    id={`title-${r.id}`}
                    className={`text-lg md:text-xl font-semibold truncate
                      ${isDark ? "text-blue-100" : "text-slate-900"}
                    `}
                    title={r.title}
                  >
                    {r.title}
                  </h2>

                  <div className="mt-3 flex items-center justify-between text-sm">
                    <div
                      className={`flex items-center gap-3 ${
                        isDark ? "text-blue-200/90" : "text-slate-600"
                      }`}
                    >
                      <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-medium">
                        Used: {r.usedIngredients?.length ?? 0}
                      </span>
                      <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/5 text-amber-300 text-xs font-medium">
                        Missing: {r.missedIngredients?.length ?? 0}
                      </span>
                    </div>

                    {/* optional ready time if available */}
                    {r.readyInMinutes && (
                      <div
                        className={`text-xs px-2 py-1 rounded-md ${
                          isDark
                            ? "bg-white/5 text-blue-200"
                            : "bg-slate-100 text-slate-800"
                        }`}
                      >
                        {r.readyInMinutes} min
                      </div>
                    )}
                  </div>

                  {/* Ingredients preview */}
                  <div className="mt-4 text-sm leading-relaxed">
                    <p
                      className={`${
                        isDark ? "text-blue-200/80" : "text-slate-700"
                      }`}
                    >
                      <strong
                        className={`${
                          isDark ? "text-blue-100" : "text-slate-900"
                        }`}
                      >
                        Used:
                      </strong>{" "}
                      {used.length ? used.join(", ") : "—"}
                    </p>

                    <p
                      className={`mt-1 ${
                        isDark ? "text-blue-200/70" : "text-slate-600"
                      }`}
                    >
                      <strong
                        className={`${
                          isDark ? "text-blue-100" : "text-slate-900"
                        }`}
                      >
                        Missing:
                      </strong>{" "}
                      {missed.length ? missed.join(", ") : "None"}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="mt-5">
                    <Link
                      to={`/recipe/${r.id}`}
                      className={`block text-center px-4 py-2 rounded-lg font-semibold shadow-sm transition
                        ${
                          isDark
                            ? "bg-blue-500 hover:bg-blue-600 text-white"
                            : "bg-blue-600 hover:bg-blue-700 text-white"
                        }
                      `}
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
}
