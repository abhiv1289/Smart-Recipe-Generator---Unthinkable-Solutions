import * as mobilenet from "@tensorflow-models/mobilenet";
import "@tensorflow/tfjs";

let model = null;

export async function loadFoodModel() {
  if (!model) {
    model = await mobilenet.load({
      version: 2,
      alpha: 1.0,
    });
  }
  return model;
}

export async function detectFoodFromImage(imageElement) {
  const model = await loadFoodModel();
  const predictions = await model.classify(imageElement);

  // Take the top prediction
  const best = predictions[0];
  return best.className.toLowerCase(); // e.g., "pizza", "hotdog", "apple"
}
