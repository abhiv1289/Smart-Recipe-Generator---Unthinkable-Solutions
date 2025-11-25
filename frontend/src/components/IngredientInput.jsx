import React, { useContext, useState } from "react";
import { detectFoodFromImage } from "../utils/foodDetector";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext";

export default function IngredientInput({ setRecipes }) {
  const [images, setImages] = useState([]);
  const [textIngredients, setTextIngredients] = useState([""]);
  const [diet, setDiet] = useState("none");
  const [loading, setLoading] = useState(false);

  const [dragActive, setDragActive] = useState(false); // ⭐ ADDED
  const fileInputRef = React.useRef(null);

  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "dark";
  const API_BASE = import.meta.env.VITE_API_BASE;

  // Upload images
  function handleImageChange(e) {
    const files = Array.from(e.target.files);
    const previews = files.map((file) => ({
      file,
      url: URL.createObjectURL(file),
      detected: null,
    }));
    setImages((prev) => [...prev, ...previews]);
  }

  // ⭐ DRAG & DROP HANDLERS (NEW)
  function handleDragOver(e) {
    e.preventDefault();
    setDragActive(true);
  }

  function handleDragLeave(e) {
    e.preventDefault();
    setDragActive(false);
  }

  function handleDrop(e) {
    e.preventDefault();
    setDragActive(false);

    if (e.dataTransfer.files.length > 0) {
      handleImageChange({ target: { files: e.dataTransfer.files } });
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  }

  // Text input
  function handleTextChange(idx, value) {
    const updated = [...textIngredients];
    updated[idx] = value;
    setTextIngredients(updated);
  }

  function addTextInput() {
    setTextIngredients((prev) => [...prev, ""]);
  }

  // Recognize
  async function handleRecognize() {
    const form = new FormData();
    setLoading(true);

    images.forEach((img) => form.append("images", img.file));
    form.append("ingredientsText", textIngredients.filter(Boolean).join(","));
    form.append("diet", diet);

    try {
      const res = await fetch(`${API_BASE}/recognize`, {
        method: "POST",
        body: form,
      });

      const data = await res.json();

      const recipeRes = await fetch(`${API_BASE}/recipes`, {
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

  // Generate Recipes (auto-detect if needed)
  async function handleGenerate() {
    setLoading(true);

    try {
      let ingredients = [];

      const needDetection = images.some((img) => !img.detected);

      if (needDetection) {
        const form = new FormData();
        images.forEach((img) => form.append("images", img.file));
        form.append(
          "ingredientsText",
          textIngredients.filter(Boolean).join(",")
        );
        form.append("diet", diet);

        const recognizeRes = await fetch(`${API_BASE}/recognize`, {
          method: "POST",
          body: form,
        });

        const recognizeData = await recognizeRes.json();
        ingredients = recognizeData.ingredients;
      } else {
        ingredients = [
          ...images.map((img) => img.detected).filter(Boolean),
          ...textIngredients.filter(Boolean),
        ];
      }

      const recipeRes = await fetch(`${API_BASE}/recipes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ingredients,
          diet,
        }),
      });

      const recipeData = await recipeRes.json();
      setRecipes(recipeData.recipes);

      navigate("/recipes");
    } catch (err) {
      console.error(err);
      alert("Recipe generation failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center px-6 py-16">
      <div
        className={`
          glass-panel p-10 rounded-3xl max-w-3xl w-full shadow-2xl backdrop-blur-xl 
          border ${isDark ? "border-white/10" : "border-white/20"}
        `}
      >
        <h2
          className={`
            text-4xl font-extrabold mb-6 text-center drop-shadow-lg
            ${isDark ? "text-blue-300" : "text-blue-700"}
          `}
        >
          Add Your Ingredients
        </h2>

        {loading && (
          <p
            className={`
              mb-4 text-center animate-pulse text-lg font-semibold
              ${isDark ? "text-blue-300" : "text-blue-600"}
            `}
          >
            Generating recipes...
          </p>
        )}

        {/* ⭐ DRAG & DROP BOX (NEW) */}
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`
            mb-4 p-8 border-2 border-dashed rounded-2xl text-center transition
            ${
              dragActive
                ? "border-blue-500 bg-blue-500/10"
                : "border-gray-400/40"
            }
            ${isDark ? "bg-white/5" : "bg-gray-100/50"}
          `}
        >
          <p className="text-lg opacity-80">Drag & Drop images here</p>
          <p className="text-sm opacity-60">or use the upload button below</p>
        </div>

        {/* Upload Photos */}
        <div className="mb-8">
          <label
            className={`block text-lg font-semibold mb-2 ${
              isDark ? "text-blue-200" : "text-gray-800"
            }`}
          >
            Upload ingredient photos
          </label>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageChange}
            className={`
              w-full p-3 rounded-xl border transition
              ${
                isDark
                  ? "border-blue-500/30 bg-white/10 text-blue-100 focus:ring-blue-600"
                  : "border-blue-300/40 bg-white/50 text-gray-900 focus:ring-blue-400"
              }
            `}
          />

          <div className="flex gap-4 mt-4 flex-wrap">
            {images.map((img, i) => (
              <div
                key={i}
                className={`
                  relative flex flex-col items-center p-3 rounded-xl shadow-md backdrop-blur-xl
                  ${
                    isDark
                      ? "border border-blue-500/20 bg-white/5"
                      : "border border-blue-300/30 bg-white/60"
                  }
                `}
              >
                <button
                  onClick={() => {
                    setImages((prev) => prev.filter((_, index) => index !== i));
                    if (fileInputRef.current) fileInputRef.current.value = "";
                  }}
                  className="absolute -top-2 -right-2 bg-red-500 text-white w-6 h-6 rounded-full flex items-center justify-center shadow-md hover:bg-red-600"
                >
                  ×
                </button>

                <img
                  src={img.url}
                  alt="preview"
                  className="w-24 h-24 object-cover rounded-lg border border-blue-400/50"
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
                  <p className="text-sm mt-2 text-green-500 dark:text-green-400">
                    {img.detected}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Typed Ingredients */}
        <div className="mb-8">
          <label
            className={`block text-lg font-semibold mb-2 ${
              isDark ? "text-blue-200" : "text-gray-800"
            }`}
          >
            Type ingredients
          </label>

          {textIngredients.map((val, idx) => (
            <input
              key={idx}
              value={val}
              placeholder="e.g., tomato, onion"
              onChange={(e) => handleTextChange(idx, e.target.value)}
              className={`
                w-full p-3 mb-3 rounded-xl transition
                ${
                  isDark
                    ? "bg-white/10 border border-blue-500/30 text-blue-100 placeholder-blue-300/40"
                    : "bg-white/50 border border-blue-300/40 text-gray-800 placeholder-gray-500"
                }
              `}
            />
          ))}

          <button
            onClick={addTextInput}
            className={`text-sm font-semibold ${
              isDark ? "text-blue-300" : "text-blue-600"
            }`}
          >
            + Add another ingredient
          </button>
        </div>
        {/* Diet Preference */}
        <div className="mb-8">
          <label
            className={`
      block text-lg font-semibold mb-2
      ${isDark ? "text-blue-200" : "text-gray-800"}
    `}
          >
            Dietary preference
          </label>

          <select
            value={diet}
            onChange={(e) => setDiet(e.target.value)}
            className={`
      w-full p-3 rounded-xl transition
      ${
        isDark
          ? "bg-white/10 border border-blue-500/30 text-blue-100 focus:ring-blue-600"
          : "bg-white/50 border border-blue-300/40 text-gray-800 focus:ring-blue-400"
      }
    `}
          >
            <option value="none">None</option>
            <option value="vegetarian">Vegetarian</option>
            <option value="vegan">Vegan</option>
            <option value="gluten-free">Gluten-free</option>
          </select>
        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-4 mt-6">
          <button
            onClick={handleRecognize}
            className={`
              w-full py-4 text-xl font-bold rounded-2xl shadow-lg
              ${
                isDark
                  ? "bg-purple-600 hover:bg-purple-700 text-white"
                  : "bg-purple-500 hover:bg-purple-600 text-white"
              }
            `}
          >
            Recognize Ingredients
          </button>

          <button
            onClick={handleGenerate}
            className={`
              w-full py-4 text-xl font-bold rounded-2xl shadow-lg
              ${
                isDark
                  ? "bg-blue-700 hover:bg-blue-800 text-white"
                  : "bg-blue-600 hover:bg-blue-700 text-white"
              }
            `}
          >
            Generate Recipes
          </button>
        </div>
      </div>
    </div>
  );
}
