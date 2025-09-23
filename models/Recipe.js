const mongoose = require("mongoose");

const RecipeSchema = new mongoose.Schema({
  title: String,
  author: String,
  description: String,
  image: String,   // ✅ must be 'image'
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Recipe", RecipeSchema);
