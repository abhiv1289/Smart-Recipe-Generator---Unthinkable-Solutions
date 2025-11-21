import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import jsPDF from "jspdf";

export default function RecipeDetail() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [showList, setShowList] = useState(false);

  useEffect(() => {
    async function fetchRecipe() {
      const res = await fetch(`http://localhost:5000/api/recipe/${id}`);
      const data = await res.json();
      setRecipe(data.recipe);
    }
    fetchRecipe();
  }, [id]);

  if (!recipe)
    return <p className="p-6 text-blue-300 text-lg">Loading recipe...</p>;

  const ingredients = recipe.extendedIngredients.map((i) => i.original);

  // -------------------------
  // Download TXT
  // -------------------------
  function downloadText() {
    const content = ingredients.join("\n");
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `${recipe.title}-shopping-list.txt`;
    a.click();
  }

  // -------------------------
  // Download PDF
  // -------------------------
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
    <div className="min-h-screen px-6 py-10 text-blue-200">
      <div className="max-w-4xl mx-auto glass-panel p-8 rounded-xl shadow-xl">
        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-extrabold text-blue-400 drop-shadow mb-6">
          {recipe.title}
        </h1>

        {/* Image */}
        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-64 md:h-80 object-cover rounded-xl mb-6 border border-blue-400/30"
        />

        {/* Ingredients */}
        <h2 className="text-2xl font-bold text-blue-300 mb-3">Ingredients</h2>
        <ul className="list-disc ml-6 text-blue-200/90 space-y-1">
          {ingredients.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>

        {/* Instructions */}
        <h2 className="text-2xl font-bold text-blue-300 mt-8 mb-3">
          Instructions
        </h2>
        <div className="text-blue-200/90">
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
        <h2 className="text-2xl font-bold text-blue-300 mt-8 mb-2">
          Nutrition Facts
        </h2>
        <p className="text-blue-200/90">
          <strong>Calories:</strong> {recipe.nutrition.nutrients[0]?.amount}{" "}
          kcal
        </p>

        {/* Button */}
        <button
          className="mt-8 px-6 py-3 bg-blue-600 text-white rounded-lg neon-glow hover:scale-105 transition-transform"
          onClick={() => setShowList(true)}
        >
          Generate Shopping List
        </button>
      </div>

      {/* --------------------- MODAL --------------------- */}
      {showList && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="glass-panel p-6 rounded-xl w-full max-w-md border border-blue-500/20">
            <h2 className="text-2xl font-bold text-blue-300 mb-4">
              {recipe.title} – Shopping List
            </h2>

            <ul className="list-disc ml-6 mb-6 space-y-1">
              {ingredients.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>

            <div className="flex gap-3">
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded-lg neon-glow hover:scale-105 transition"
                onClick={downloadText}
              >
                Download TXT
              </button>

              <button
                className="px-4 py-2 bg-red-600 text-white rounded-lg neon-glow hover:scale-105 transition"
                onClick={downloadPDF}
              >
                Download PDF
              </button>
            </div>

            <button
              className="mt-5 px-4 py-2 bg-gray-500/40 text-white rounded-lg w-full hover:bg-gray-500/60 transition"
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
