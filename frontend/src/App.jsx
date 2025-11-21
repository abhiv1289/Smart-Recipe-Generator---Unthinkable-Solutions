import React, { useState } from "react";
import IngredientInput from "./components/IngredientInput";
import RecipesPage from "./pages/RecipesPage";
import RecipeDetail from "./pages/RecipeDetail";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

export default function App() {
  const [recipes, setRecipes] = useState([]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<IngredientInput setRecipes={setRecipes} />} />

        <Route path="/recipes" element={<RecipesPage recipes={recipes} />} />

        <Route path="/recipe/:id" element={<RecipeDetail />} />
      </Routes>
    </Router>
  );
}
