import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [recipes, setRecipes] = useState([]);
  const [form, setForm] = useState({ title: "", description: "", imageURL: "" });

  // Fetch recipes from backend
  useEffect(() => {
    axios.get("http://localhost:5000/recipes")
      .then(res => setRecipes(res.data))
      .catch(err => console.log(err));
  }, []);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:5000/recipes", form)
      .then(res => {
        setRecipes([...recipes, res.data]); // Add new recipe to list
        setForm({ title: "", description: "", imageURL: "" }); // Clear form
      })
      .catch(err => console.log(err));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>📚 Book/Recipe Sharing Platform</h1>

      {/* Recipe Form */}
      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
        <input
          type="text"
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
        <input
          type="text"
          placeholder="Image URL"
          value={form.imageURL}
          onChange={(e) => setForm({ ...form, imageURL: e.target.value })}
        />
        <button type="submit">Add Recipe</button>
      </form>

      {/* Recipe List */}
      {recipes.length === 0 ? (
        <p>No recipes yet. Add one above!</p>
      ) : (
        <ul>
          {recipes.map((recipe) => (
            <li key={recipe._id} style={{ marginBottom: "20px" }}>
              <h2>{recipe.title}</h2>
              <p>{recipe.description}</p>
              {recipe.imageURL && (
                <img src={recipe.imageURL} alt={recipe.title} width="150" />
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
