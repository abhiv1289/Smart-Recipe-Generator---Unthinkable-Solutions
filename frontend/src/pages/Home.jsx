import React from "react";
import IngredientInput from "../components/IngredientInput";

export default function Home() {
  return (
    <main className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold mb-4">Smart Recipe Generator</h1>
      <p className="mb-6 text-gray-600">
        Add ingredients or upload photos of ingredients to get recipe
        suggestions.
      </p>

      <IngredientInput />
    </main>
  );
}
