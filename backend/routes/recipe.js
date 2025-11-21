import express from "express";
import fetch from "node-fetch";

const router = express.Router();

router.post("/recipes", async (req, res) => {
  try {
    const { ingredients, diet } = req.body;

    if (!ingredients || ingredients.length === 0) {
      return res.status(400).json({ error: "No ingredients provided" });
    }

    const query = ingredients.join(",+");

    const url = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${query}&number=5&apiKey=${process.env.SPOON_KEY}`;

    const response = await fetch(url);
    const recipes = await response.json();

    res.json({ recipes, diet });
  } catch (err) {
    console.error("Recipe API error:", err);
    res.status(500).json({ error: "Failed to fetch recipes" });
  }
});

router.get("/recipe/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const url = `https://api.spoonacular.com/recipes/${id}/information?includeNutrition=true&apiKey=${process.env.SPOON_KEY}`;

    const response = await fetch(url);
    const data = await response.json();

    res.json({ recipe: data });
  } catch (err) {
    console.error("Recipe detail error:", err);
    res.status(500).json({ error: "Failed to fetch recipe details" });
  }
});

export default router;
