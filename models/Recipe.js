const mongoose = require("mongoose");

const RecipeSchema = new mongoose.Schema({
  title: String,
  description: String,
  imageURL: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Recipe", RecipeSchema);
