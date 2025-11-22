import express from "express";
import cors from "cors";
import multer from "multer";
import vision from "@google-cloud/vision";
import dotenv from "dotenv";
import recipeRoutes from "./routes/recipe.js";

dotenv.config();

const app = express();

// ⭐ CORS FIX — Full CORS Allow + Preflight
app.use(
  cors({
    origin: "*", // Allow ALL domains (Netlify, local, Render)
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// ⭐ Handle preflight requests
app.options("*", cors());

app.use(express.json());

// Multer memory storage
const upload = multer({ storage: multer.memoryStorage() });

// Google Vision Client
const client = new vision.ImageAnnotatorClient({
  keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS,
});

// Known ingredient list
const KNOWN_INGREDIENTS = [
  "tomato",
  "onion",
  "garlic",
  "potato",
  "carrot",
  "pepper",
  "chili pepper",
  "cabbage",
  "lettuce",
  "broccoli",
  "spinach",
  "fruit",
  "vegetable",
  "egg",
  "banana",
  "apple",
  "lemon",
  "lime",
  "cheese",
  "bread",
  "milk",
  "rice",
  "flour",
  "spice",
  "herb",
];

// -------------------------
// 📌 Image Recognition Route
// -------------------------
app.post("/api/recognize", upload.array("images"), async (req, res) => {
  try {
    const images = req.files ?? [];
    let detected = [];

    for (const img of images) {
      const [result] = await client.labelDetection(img.buffer);
      const labels = result.labelAnnotations.map((l) =>
        l.description.toLowerCase()
      );

      const matched = labels.filter((l) =>
        KNOWN_INGREDIENTS.some((k) => l.includes(k))
      );

      detected.push(...matched);
    }

    const userTyped = req.body.ingredientsText
      ? req.body.ingredientsText.split(",").map((x) => x.trim().toLowerCase())
      : [];

    const final = [...new Set([...detected, ...userTyped])];

    res.json({ ingredients: final, diet: req.body.diet || "none" });
  } catch (error) {
    console.error("Vision error:", error);
    res.status(500).json({ error: "Vision API failed" });
  }
});

// -------------------------
// 📌 Recipes Route
// -------------------------
app.use("/api", recipeRoutes);

// -------------------------
// 📌 Start Server
// -------------------------
app.listen(5000, () => console.log("Backend running on port 5000"));
