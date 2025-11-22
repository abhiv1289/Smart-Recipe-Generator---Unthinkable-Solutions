# Smart Recipe Generator 🍽️

A full-stack application that identifies ingredients from uploaded images using **Google Cloud Vision API**, merges them with text-based ingredients and dietary preferences, and generates recipe suggestions using the **Spoonacular API**.  
Includes full recipe details, instructions, nutrition, shopping list downloads, and responsive neon-blueberry UI with Light/Dark theme.

---

# 🖼️ Screenshots (Insert Your Images)

Add your screenshots inside `assets/screenshots/`.

## Home Page

![Home](assets/screenshots/home.png)

## Ingredient Input Page

![Input](assets/screenshots/input.png)

## Recipes Page

![Recipes](assets/screenshots/recipes.png)

## Recipe Detail Page

![Details](assets/screenshots/detail.png)

---

# 🌐 Live Links

Frontend (Netlify): https://your-netlify-url  
Backend (Render): https://your-render-url

---

# 🚀 Features

- 📸 Image ingredient recognition (Google Cloud Vision API)
- ✍️ Manual ingredient text input
- 🥗 Dietary preferences filter
- 🍽 Recipe suggestions (Spoonacular API)
- 📖 Detailed recipe pages
- 🔢 Nutrition facts
- 🛒 Shopping list generator (TXT + PDF)
- 🌗 Light/Dark theme
- 📱 Fully responsive neon-blueberry UI
- 🔁 React Router + Layout Outlet for no-refresh navigation

---

# 🛠 Tech Stack

## Frontend

- React (Vite)
- Tailwind CSS v4
- React Router DOM
- jsPDF

## Backend

- Node.js + Express
- Multer (image upload)
- Google Cloud Vision API
- Spoonacular Food API
- Hosted on Render

---

# 📁 Project Structure

```
smart-recipe-generator/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── layouts/
│   │   ├── context/
│   │   └── App.jsx
│   └── index.css
│
├── backend/
│   ├── routes/
│   ├── controllers/
│   ├── vision-key.json (ignored)
│   └── server.js
│
└── README.md
```

---

# ⚙️ Setup Instructions (Local)

## 1️⃣ Clone Repo

```bash
git clone https://github.com/abhiv1289/smart-recipe-generator
cd smart-recipe-generator
```

---

# 🖥️ Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

`index.css` must contain:

```css
@import "tailwindcss";
```

---

# 🧰 Backend Setup

```bash
cd backend
npm install
npm run dev
```

---

# 🔐 Environment Variables (backend/.env)

```
PORT=5000
SPOON_KEY=your_spoonacular_key
GOOGLE_APPLICATION_CREDENTIALS=./vision-key.json
```

Place your Google Vision JSON file inside `/backend/vision-key.json`.

---

# 🧠 Google Cloud Vision Setup

1. Open Google Cloud Console
2. Create project
3. Enable _Cloud Vision API_
4. Create Service Account
5. Assign role: **Vision API User**
6. Create key → JSON
7. Download as `vision-key.json`
8. Move to `/backend`
9. Add path in `.env`

---

# 🍽 Spoonacular API Setup

1. Go to https://spoonacular.com/food-api
2. Create free account
3. Copy API key
4. Insert in `.env` as:

```
SPOON_KEY=your_key_here
```

---

# 📡 Backend API Routes

## POST `/api/recognize`

→ Google Vision LABEL_DETECTION + typed ingredients.

## POST `/api/recipes`

→ Spoonacular `findByIngredients`

## GET `/api/recipe/:id`

→ Spoonacular recipe **information + nutrition**

---

# 🚀 Deployment

## Render (Backend)

- Add env vars
- Upload vision-key.json as Secret File
- Run command:

```
npm start
```

## Netlify (Frontend)

```
build: npm run build
publish: dist
```

---

# 🧠 200-Word Approach

This Smart Recipe Generator simplifies cooking by intelligently converting user-supplied images and typed text into recipe recommendations using machine learning and structured API data. Ingredient recognition is performed with **Google Cloud Vision API (LABEL_DETECTION)**, which identifies common food items from uploaded images. These recognized labels are cleaned and merged with ingredients manually entered by the user and filtered through dietary preferences. The backend then uses the **Spoonacular “findByIngredients” API** to generate recipe suggestions ranked by used and missing ingredients. When users select a recipe, the backend fetches detailed step-by-step instructions, ingredient lists, and nutritional information via Spoonacular’s `information` endpoint with `includeNutrition=true`.

The frontend is built using React (Vite) with TailwindCSS for styling in a modern neon-blueberry UI theme that supports both light and dark modes. A shared layout with React Router’s `Outlet` ensures seamless page navigation without full reloads. The recipe detail page includes a shopping list generator with TXT and PDF export options using jsPDF.

The backend uses Node.js with Express, Multer for image upload handling, and Google Vision + Spoonacular integrations. The frontend is deployed on **Netlify**, and the backend is deployed on **Render**, ensuring scalability and reliability.  
This architecture provides a smooth, fast, and accurate recipe discovery experience.

---

# ✔ Submission Checklist

- [x] Image recognition
- [x] Google Vision (LABEL_DETECTION)
- [x] Spoonacular integration
- [x] Dietary filter
- [x] Recipe list + detail
- [x] Nutrition facts
- [x] TXT/PDF shopping list
- [x] Responsive UI
- [x] Light/Dark Mode
- [x] Hosted on Netlify + Render
- [x] README + Documentation
