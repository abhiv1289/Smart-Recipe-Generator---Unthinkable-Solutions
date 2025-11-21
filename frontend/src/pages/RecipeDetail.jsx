import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import jsPDF from "jspdf";

export default function RecipeDetail() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [showList, setShowList] = useState(false); // modal toggle

  useEffect(() => {
    async function fetchRecipe() {
      const res = await fetch(`http://localhost:5000/api/recipe/${id}`);
      const data = await res.json();
      setRecipe(data.recipe);
    }
    fetchRecipe();
  }, [id]);

  if (!recipe) return <p className="p-6">Loading recipe...</p>;

  const ingredients = recipe.extendedIngredients.map((i) => i.original);

  // -------------------------
  // Download as text file
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
  // Download as PDF
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
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">{recipe.title}</h1>

      <img
        src={recipe.image}
        alt={recipe.title}
        className="w-full h-72 object-cover rounded"
      />

      <h2 className="text-xl font-semibold mt-6">Ingredients</h2>
      <ul className="list-disc ml-6 mt-2">
        {recipe.extendedIngredients.map((i) => (
          <li key={i.id}>{i.original}</li>
        ))}
      </ul>

      <h2 className="text-xl font-semibold mt-6">Instructions</h2>
      <div className="mt-2">
        {recipe.analyzedInstructions.length > 0 ? (
          <ol className="list-decimal ml-6">
            {recipe.analyzedInstructions[0].steps.map((step) => (
              <li key={step.number} className="mb-2">
                {step.step}
              </li>
            ))}
          </ol>
        ) : (
          <p>No instructions available.</p>
        )}
      </div>

      <h2 className="text-xl font-semibold mt-6">Nutrition Facts</h2>
      <p className="mt-2 text-gray-700">
        <strong>Calories:</strong> {recipe.nutrition.nutrients[0]?.amount} kcal
      </p>

      {/* SHOPPING LIST BUTTON */}
      <button
        className="px-4 py-2 bg-green-600 text-white rounded mt-6"
        onClick={() => setShowList(true)}
      >
        Generate Shopping List
      </button>

      {/* --------------------- MODAL --------------------- */}
      {showList && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h2 className="text-xl font-semibold mb-4">
              {recipe.title} – Shopping List
            </h2>

            <ul className="list-disc ml-6 mb-4">
              {ingredients.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>

            <div className="flex gap-3">
              <button
                className="px-3 py-2 bg-blue-600 text-white rounded"
                onClick={downloadText}
              >
                Download TXT
              </button>
              <button
                className="px-3 py-2 bg-red-600 text-white rounded"
                onClick={downloadPDF}
              >
                Download PDF
              </button>
            </div>

            <button
              className="mt-4 px-3 py-2 bg-gray-300 rounded w-full"
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
