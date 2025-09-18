const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path"); // 🆕 for serving uploaded images
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

// 🆕 Serve uploaded images as static files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// 🔹 MongoDB connection
mongoose
  .connect("mongodb://127.0.0.1:27017/bookRecipeDB")
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log(err));

// 🔹 Simple test route
app.get("/", (req, res) => {
  res.send("Hello, Book/Recipe App is working!");
});

// Routes
const recipeRoutes = require("./routes/recipeRoutes");
app.use("/recipes", recipeRoutes);

// Start server
const PORT = 5000;
app.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
);
