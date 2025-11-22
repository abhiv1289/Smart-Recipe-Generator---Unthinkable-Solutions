import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import jsPDF from "jspdf";
import { ThemeContext } from "../context/ThemeContext";

export default function RecipeDetail() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [showList, setShowList] = useState(false);

  const { theme } = useContext(ThemeContext);
  const isDark = theme === "dark";

  // your uploaded image as fallback
  const fallbackImg = "/mnt/data/c95da042-e03f-49b5-b678-ea9f517293f5.png";

  useEffect(() => {
    async function fetchRecipe() {
      const res = await fetch(
        `${
          import.meta.env.MODE === "development"
            ? import.meta.env.BASE_URL_DEV
            : import.meta.env.BASE_URL_PROD
        }/recipe/${id}`
      );
      const data = await res.json();
      setRecipe(data.recipe);
    }
    fetchRecipe();
  }, [id]);

  // ----------------------
  // STYLED LOADER
  // ----------------------
  if (!recipe) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-full border-4 border-blue-400 border-t-transparent animate-spin"></div>
          <p
            className={`text-lg font-medium ${
              isDark ? "text-blue-200" : "text-blue-700"
            }`}
          >
            Fetching recipe details...
          </p>
        </div>
      </div>
    );
  }

  const ingredients = recipe.extendedIngredients.map((i) => i.original);

  // TXT download
  function downloadText() {
    const content = ingredients.join("\n");
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `${recipe.title}-shopping-list.txt`;
    a.click();
  }

  // PDF download
  function downloadPDF() {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text(recipe.title + " - Shopping List", 10, 10);

    doc.setFontSize(12);
    ingredients.forEach((item, i) => {
      doc.text(`${i + 1}. ${item}`, 10, 20 + i * 7);
    });

    doc.save(`${recipe.title}-shopping-list.pdf`);
  }

  return (
    <div
      className={`min-h-screen px-6 py-10 transition-colors duration-300 ${
        isDark ? "text-blue-100" : "text-slate-800"
      }`}
    >
      <div
        className={`max-w-4xl mx-auto p-8 rounded-3xl shadow-xl backdrop-blur-xl
          ${
            isDark
              ? "glass-panel border border-white/10"
              : "bg-white/50 border border-blue-100"
          }
        `}
      >
        {/* Title */}
        <h1
          className={`text-3xl md:text-4xl font-extrabold mb-6 drop-shadow ${
            isDark ? "text-blue-200" : "text-blue-700"
          }`}
        >
          {recipe.title}
        </h1>

        {/* Image */}
        <div className="w-full overflow-hidden rounded-2xl mb-6">
          <img
            src={recipe.image || fallbackImg}
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = fallbackImg;
            }}
            alt={recipe.title}
            className="w-full h-64 md:h-80 object-cover rounded-xl shadow-md"
          />
        </div>

        {/* Ingredients */}
        <h2
          className={`text-2xl font-semibold mb-3 ${
            isDark ? "text-blue-200" : "text-blue-700"
          }`}
        >
          Ingredients
        </h2>
        <ul
          className={`list-disc ml-6 space-y-1 ${
            isDark ? "text-blue-100/90" : "text-slate-700"
          }`}
        >
          {ingredients.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>

        {/* Instructions */}
        <h2
          className={`text-2xl font-semibold mt-8 mb-3 ${
            isDark ? "text-blue-200" : "text-blue-700"
          }`}
        >
          Instructions
        </h2>

        <div className={`${isDark ? "text-blue-100/90" : "text-slate-700"}`}>
          {recipe.analyzedInstructions?.length > 0 ? (
            <ol className="list-decimal ml-6 space-y-2">
              {recipe.analyzedInstructions[0].steps.map((step) => (
                <li key={step.number}>{step.step}</li>
              ))}
            </ol>
          ) : (
            <p>No instructions available.</p>
          )}
        </div>

        {/* Nutrition */}
        <h2
          className={`text-2xl font-semibold mt-8 mb-2 ${
            isDark ? "text-blue-200" : "text-blue-700"
          }`}
        >
          Nutrition Facts
        </h2>
        <p className={`${isDark ? "text-blue-100/90" : "text-slate-700"}`}>
          <strong>Calories:</strong> {recipe.nutrition.nutrients[0]?.amount}{" "}
          kcal
        </p>

        {/* Button */}
        <button
          className={`
            mt-8 px-6 py-3 rounded-xl font-semibold transition-transform shadow-lg
            hover:scale-[1.03]
            ${
              isDark
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-blue-600 hover:bg-blue-700"
            }
            text-white
          `}
          onClick={() => setShowList(true)}
        >
          Generate Shopping List
        </button>
      </div>

      {/* ---------------- Modal ---------------- */}
      {showList && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div
            className={`p-6 rounded-2xl max-w-md w-full shadow-xl backdrop-blur-xl ${
              isDark
                ? "glass-panel border border-white/10"
                : "bg-white/70 border border-blue-100"
            }`}
          >
            <h2
              className={`text-2xl font-bold mb-4 ${
                isDark ? "text-blue-200" : "text-blue-700"
              }`}
            >
              {recipe.title} – Shopping List
            </h2>

            <ul
              className={`list-disc ml-6 mb-6 space-y-1 ${
                isDark ? "text-blue-100/90" : "text-slate-700"
              }`}
            >
              {ingredients.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>

            <div className="flex gap-3">
              <button
                className={`px-4 py-2 rounded-lg font-semibold shadow transition hover:scale-105 
                  ${
                    isDark
                      ? "bg-blue-600 hover:bg-blue-700"
                      : "bg-blue-600 hover:bg-blue-700"
                  }
                  text-white
                `}
                onClick={downloadText}
              >
                Download TXT
              </button>

              <button
                className={`px-4 py-2 rounded-lg font-semibold shadow transition hover:scale-105 
                  bg-red-600 hover:bg-red-700 text-white
                `}
                onClick={downloadPDF}
              >
                Download PDF
              </button>
            </div>

            <button
              className={`mt-5 px-4 py-2 w-full rounded-lg font-semibold transition
                ${
                  isDark
                    ? "bg-gray-600/40 hover:bg-gray-600/60 text-blue-100"
                    : "bg-gray-300 hover:bg-gray-400 text-slate-800"
                }
              `}
              onClick={() => setShowList(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
