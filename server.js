const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

// 🔹 MongoDB connection
mongoose.connect("mongodb://127.0.0.1:27017/bookRecipeDB")
.then(() => console.log("✅ MongoDB Connected"))
.catch(err => console.log(err));

// 🔹 Simple test route
app.get("/", (req, res) => {
  res.send("Hello, Book/Recipe App is working!");
});

// Start server
const PORT = 5000;
const recipeRoutes = require("./routes/recipeRoutes");
app.use("/recipes", recipeRoutes);
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
