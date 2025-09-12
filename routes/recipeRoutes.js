const express = require("express");
const router = express.Router();
const Recipe = require("../models/Recipe");

// Add recipe
router.post("/", async (req, res) => {
  try {
    const recipe = new Recipe(req.body);
    await recipe.save();
    res.json(recipe);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all recipes
router.get("/", async (req, res) => {
  const recipes = await Recipe.find();
  res.json(recipes);
});

module.exports = router;
