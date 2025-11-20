import React, { useState } from "react";

export default function IngredientInput() {
  const [images, setImages] = useState([]);
  const [textIngredients, setTextIngredients] = useState([""]);
  const [diet, setDiet] = useState("none");

  function handleImageChange(e) {
    const files = Array.from(e.target.files);
    const previews = files.map((f) => ({
      file: f,
      url: URL.createObjectURL(f),
    }));
    setImages((prev) => [...prev, ...previews]);
  }

  function handleTextChange(idx, value) {
    const copy = [...textIngredients];
    copy[idx] = value;
    setTextIngredients(copy);
  }

  function addTextInput() {
    setTextIngredients((s) => [...s, ""]);
  }

  async function handleRecognize() {
    // For now we call a stub API; backend will be added later.
    const form = new FormData();
    images.forEach((i) => form.append("images", i.file));
    form.append("ingredientsText", textIngredients.filter(Boolean).join(","));
    form.append("diet", diet);

    try {
      const res = await fetch("http://localhost:5000/api/recognize", {
        method: "POST",
        body: form,
      });

      const data = await res.json();
      alert("Recognized ingredients: " + (data.ingredients || []).join(", "));
      // next step will use this to fetch recipes
    } catch (err) {
      console.error(err);
      alert("Recognition failed (this is a stub for now).");
    }
  }

  return (
    <div className="space-y-4">
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
            <img
              key={i}
              src={img.url}
              alt="preview"
              className="w-20 h-20 object-cover rounded-md shadow-sm"
            />
          ))}
        </div>
      </div>

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
