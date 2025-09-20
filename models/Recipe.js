const mongoose = require("mongoose");

const RecipeSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    author: { type: String, required: false },
    description: { type: String, required: false },
    image: { type: String, required: false }, // 👈 match backend route
  },
  { timestamps: true }
);

module.exports = mongoose.model("Recipe", RecipeSchema);

