import { useState } from "react";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router";
import Home from "./pages/Home";
import IngredientInput from "./components/IngredientInput";
import RecipesPage from "./pages/RecipesPage";
import RecipeDetail from "./pages/RecipeDetail";
import Footer from "./components/Footer";

export default function App() {
  const [recipes, setRecipes] = useState([]);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/input"
          element={<IngredientInput setRecipes={setRecipes} />}
        />
        <Route path="/recipes" element={<RecipesPage recipes={recipes} />} />
        <Route path="/recipe/:id" element={<RecipeDetail />} />
      </Routes>
      <Footer />
    </>
  );
}
