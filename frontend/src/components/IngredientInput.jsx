import React, { useState } from "react";
import { detectFoodFromImage } from "../utils/foodDetector";
import { useNavigate } from "react-router-dom";

export default function IngredientInput({ setRecipes }) {
  const [images, setImages] = useState([]);
  const [textIngredients, setTextIngredients] = useState([""]);
  const [diet, setDiet] = useState("none");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // -----------------------------
  // Upload Images
  // -----------------------------
  function handleImageChange(e) {
    const files = Array.from(e.target.files);

    const previews = files.map((file) => ({
      file,
      url: URL.createObjectURL(file),
      detected: null,
    }));

    setImages((prev) => [...prev, ...previews]);
  }

  // -----------------------------
  // Text Ingredients
  // -----------------------------
  function handleTextChange(idx, value) {
    const updated = [...textIngredients];
    updated[idx] = value;
    setTextIngredients(updated);
  }

  function addTextInput() {
    setTextIngredients((prev) => [...prev, ""]);
  }

  // -----------------------------
  // Handle Recognize
  // -----------------------------
  async function handleRecognize() {
    const form = new FormData();
    setLoading(true);

    images.forEach((img) => form.append("images", img.file));
    form.append("ingredientsText", textIngredients.filter(Boolean).join(","));
    form.append("diet", diet);

    try {
      const res = await fetch("http://localhost:5000/api/recognize", {
        method: "POST",
        body: form,
      });

      const data = await res.json();

      // Fetch recipes
      const recipeRes = await fetch("http://localhost:5000/api/recipes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ingredients: data.ingredients,
          diet: data.diet,
        }),
      });

      const recipeData = await recipeRes.json();
      setRecipes(recipeData.recipes);

      navigate("/recipes");
    } catch (err) {
      console.error(err);
      alert("Recognition failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-3xl mx-auto mt-10 glass-panel p-8 rounded-xl shadow-xl text-blue-200">

      <h2 className="text-3xl md:text-4xl font-bold mb-6 text-blue-400 drop-shadow">
        Add Your Ingredients
      </h2>

      {loading && (
        <p className="text-blue-400 neon-glow mb-4 text-lg">
          Generating recipes...
        </p>
      )}

      {/* ------------------ Upload Photos ------------------ */}
      <div className="mb-6">
        <label className="block text-sm font-semibold mb-2 text-blue-300">
          Upload ingredient photos
        </label>

        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleImageChange}
          className="w-full p-2 border border-blue-500/30 bg-transparent rounded-lg text-blue-200"
        />

        <div className="flex gap-4 mt-4 flex-wrap">
          {images.map((img, i) => (
            <div
              key={i}
              className="flex flex-col items-center p-2 rounded-lg border border-blue-400/20 bg-white/5 backdrop-blur"
            >
              <img
                src={img.url}
                alt="preview"
                className="w-24 h-24 object-cover rounded-lg border border-blue-500/30"
                onLoad={async (e) => {
                  if (!img.detected) {
                    const food = await detectFoodFromImage(e.target);

                    setImages((prev) => {
                      const updated = [...prev];
                      updated[i] = { ...updated[i], detected: food };
                      return updated;
                    });
                  }
                }}
              />

              {img.detected && (
                <p className="text-sm mt-1 text-green-400">{img.detected}</p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ------------------ Typed Ingredients ------------------ */}
      <div className="mb-6">
        <label className="block text-sm font-semibold mb-2 text-blue-300">
          Type ingredients
        </label>

        {textIngredients.map((val, idx) => (
          <input
            key={idx}
            className="w-full p-3 mb-2 rounded-lg bg-transparent border border-blue-500/30 text-blue-200"
            value={val}
            placeholder="e.g., tomato, onion"
            onChange={(e) => handleTextChange(idx, e.target.value)}
          />
        ))}

        <button
          className="text-sm underline text-blue-400 hover:text-blue-300 transition"
          onClick={addTextInput}
        >
          + add another
        </button>
      </div>

      {/* ------------------ Diet ------------------ */}
      <div className="mb-6">
        <label className="block text-sm font-semibold mb-2 text-blue-300">
          Dietary preference
        </label>

        <select
          value={diet}
          onChange={(e) => setDiet(e.target.value)}
          className="w-full p-3 rounded-lg bg-transparent border border-blue-500/30 text-blue-200"
        >
          <option value="none">None</option>
          <option value="vegetarian">Vegetarian</option>
          <option value="vegan">Vegan</option>
          <option value="gluten-free">Gluten-free</option>
        </select>
      </div>

      {/* ------------------ Button ------------------ */}
      <button
        onClick={handleRecognize}
        className="mt-4 px-6 py-3 w-full md:w-auto bg-blue-600 text-white rounded-lg neon-glow hover:scale-105 transition-transform"
      >
        Recognize & Suggest Recipes
      </button>
    </div>
  );
}
