import React, { useState } from "react";
import { detectFoodFromImage } from "../utils/foodDetector";
import { useNavigate } from "react-router-dom";

export default function IngredientInput({ setRecipes }) {
  const [images, setImages] = useState([]);
  const [textIngredients, setTextIngredients] = useState([""]);
  const [diet, setDiet] = useState("none");
  const navigate = useNavigate();

  // -----------------------------
  // Upload Images
  // -----------------------------
  function handleImageChange(e) {
    const files = Array.from(e.target.files);

    const previews = files.map((file) => ({
      file,
      url: URL.createObjectURL(file),
      detected: null, // will be filled after TF.js detection
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

    images.forEach((img) => form.append("images", img.file));
    form.append("ingredientsText", textIngredients.filter(Boolean).join(","));
    form.append("diet", diet);

    try {
      const res = await fetch("http://localhost:5000/api/recognize", {
        method: "POST",
        body: form,
      });

      const data = await res.json();
      console.log(data);
      // Step 2: Fetch recipes
      const recipeRes = await fetch("http://localhost:5000/api/recipes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ingredients: data.ingredients,
          diet: data.diet,
        }),
      });

      const recipeData = await recipeRes.json();
      console.log(recipeData);
      setRecipes(recipeData.recipes);
      navigate("/recipes");
    } catch (err) {
      console.error(err);
      alert("Recognition failed.");
    }
  }

  return (
    <div className="space-y-4">
      {/* ------------------ Image Upload ------------------ */}
      <div>
        <label className="block text-sm font-medium mb-1">
          Upload ingredient photos
        </label>

        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleImageChange}
        />

        <div className="flex gap-3 mt-3 flex-wrap">
          {images.map((img, i) => (
            <div key={i} className="flex flex-col items-center">
              <img
                src={img.url}
                alt="preview"
                className="w-24 h-24 object-cover rounded-md shadow-sm"
                onLoad={async (e) => {
                  // Detect only once
                  if (!img.detected) {
                    const food = await detectFoodFromImage(e.target);

                    // Update state properly
                    setImages((prev) => {
                      const updated = [...prev];
                      updated[i] = { ...updated[i], detected: food };
                      return updated;
                    });
                  }
                }}
              />

              {img.detected && (
                <p className="text-sm mt-1 text-green-600">{img.detected}</p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ------------------ Typed Ingredients ------------------ */}
      <div>
        <label className="block text-sm font-medium mb-1">
          Type ingredients
        </label>

        {textIngredients.map((val, idx) => (
          <input
            key={idx}
            className="w-full p-2 border rounded mb-2"
            value={val}
            placeholder="e.g., tomato, onion"
            onChange={(e) => handleTextChange(idx, e.target.value)}
          />
        ))}

        <button className="text-sm underline" onClick={addTextInput}>
          + add another
        </button>
      </div>

      {/* ------------------ Diet ------------------ */}
      <div>
        <label className="block text-sm font-medium mb-1">
          Dietary preference
        </label>
        <select
          value={diet}
          onChange={(e) => setDiet(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="none">None</option>
          <option value="vegetarian">Vegetarian</option>
          <option value="vegan">Vegan</option>
          <option value="gluten-free">Gluten-free</option>
        </select>
      </div>

      {/* ------------------ Button ------------------ */}
      <div className="pt-4">
        <button
          onClick={handleRecognize}
          className="px-4 py-2 rounded bg-indigo-600 text-white"
        >
          Recognize & suggest recipes
        </button>
      </div>
    </div>
  );
}
