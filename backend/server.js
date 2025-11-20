import express from "express";
import cors from "cors";
import multer from "multer";

const app = express();
app.use(cors());
app.use(express.json());

// multer for image upload
const upload = multer({ storage: multer.memoryStorage() });

// Test route
app.get("/", (req, res) => {
  res.send("Backend is running...");
});

// Recognize route (mock)
app.post("/api/recognize", upload.array("images"), (req, res) => {
  console.log("Received images:", req.files.length);
  console.log("Received text ingredients:", req.body.ingredientsText);
  console.log("Diet:", req.body.diet);

  // Mock recognition: return random ingredients
  const mockDetected = ["tomato", "onion", "garlic", "potato", "carrot"];
  const shuffled = mockDetected.sort(() => Math.random() - 0.5);
  const selected = shuffled.slice(0, 3); // send 3 random

  res.json({
    ingredients: selected,
    message: "Mock recognition complete",
  });
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
