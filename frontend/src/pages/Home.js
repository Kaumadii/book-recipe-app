import React, { useState, useEffect } from "react";
import axios from "axios";

function Home() {
  const [recipes, setRecipes] = useState([]);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  // Fetch recipes
  useEffect(() => {
    axios
      .get("http://localhost:5000/recipes")
      .then((res) => setRecipes(res.data))
      .catch((err) => console.error(err));
  }, []);

  // Add new recipe
  const addRecipe = async (e) => {
    e.preventDefault();
    if (!title || !author) return alert("Please fill all fields!");

    const formData = new FormData();
    formData.append("title", title);
    formData.append("author", author);
    formData.append("description", description);
    if (imageFile) {
      formData.append("image", imageFile);
    }

    try {
      const res = await axios.post("http://localhost:5000/recipes", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setRecipes([...recipes, res.data]);
      setTitle("");
      setAuthor("");
      setDescription("");
      setImageFile(null);
      e.target.reset(); // clear form
    } catch (err) {
      console.error("❌ Upload failed:", err.response?.data || err.message);
    alert("Failed to add recipe: " + (err.response?.data?.error || err.message));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Navbar */}
      <nav className="bg-blue-600 text-white px-8 py-4 shadow-lg">
        <h1 className="text-2xl font-bold">📚 Book Recipe App</h1>
      </nav>

      {/* Hero Section */}
      <header className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-center py-16">
        <h2 className="text-4xl font-extrabold mb-4">
          Discover & Share Book Recipes
        </h2>
        <p className="text-lg">
          Add your favorite books and see what others are reading.
        </p>
      </header>

      {/* Add Recipe Form */}
      <section className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-md">
        <h3 className="text-xl font-semibold mb-4">➕ Add a New Recipe</h3>
        <form onSubmit={addRecipe} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Book Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
            required
          />
          <input
            type="text"
            placeholder="Author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
            required
          />
          <textarea
            placeholder="Short Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files[0])}
            className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="submit"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
          >
            Add
          </button>
        </form>
      </section>

      {/* Recipe List */}
      <section className="max-w-5xl mx-auto mt-10 p-6">
        <h3 className="text-xl font-semibold mb-6">📖 Recipe Collection</h3>
        {recipes.length === 0 ? (
          <p className="text-gray-500">No recipes yet. Add one above!</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {recipes.map((recipe) => (
              <div
                key={recipe._id}
                className="p-6 bg-white rounded-2xl shadow hover:shadow-lg transition relative"
              >
          <img
  src={
    recipe.image
      ? `http://localhost:5000${recipe.image}`   // ✅ prepend server URL
      : "https://via.placeholder.com/300x200.png?text=No+Image"
  }
  alt={recipe.title}
  className="w-full h-40 object-cover rounded-lg mb-4"
/>
                <h4 className="text-lg font-bold text-blue-600">
                  {recipe.title}
                </h4>
                <p className="text-gray-700">by {recipe.author}</p>          
                <button
  onClick={() => setSelectedRecipe(recipe)}
  className="mt-3 px-4 py-2 bg-indigo-500 text-white text-sm rounded hover:bg-indigo-600"
>
  👁 View Details
</button>


                {/* Delete button */}
                <button
                  onClick={async () => {
                    if (
                      !window.confirm("Are you sure you want to delete this recipe?")
                    )
                      return;
                    try {
                      await axios.delete(
                        `http://localhost:5000/recipes/${recipe._id}`
                      );
                      setRecipes(recipes.filter((r) => r._id !== recipe._id));
                    } catch (err) {
                      console.error(err);
                      alert("Failed to delete recipe.");
                    }
                  }}
                  className="absolute top-4 right-4 px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600"
                >
                  ✕ Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </section>
      {selectedRecipe && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
    <div className="bg-white rounded-2xl shadow-lg p-6 w-96 relative">
      <button
        onClick={() => setSelectedRecipe(null)}
        className="absolute top-2 right-2 text-gray-600 hover:text-black"
      >
        ✕
      </button>
      <img
  src={
    selectedRecipe.image
      ? `http://localhost:5000${selectedRecipe.image}`
      : "https://via.placeholder.com/400x300"
  }
  alt={selectedRecipe.title}
  className="w-full max-h-[500px] object-contain rounded-lg mb-4"
/>
      <h2 className="text-xl font-bold text-blue-600">{selectedRecipe.title}</h2>
      <p className="text-gray-700 mb-2">by {selectedRecipe.author || "Unknown"}</p>
      <p className="text-gray-600">{selectedRecipe.description}</p>
      <p className="text-gray-400 text-sm mt-3">
        Added: {new Date(selectedRecipe.createdAt).toLocaleString()}
      </p>
    </div>
  </div>
)}
    </div>
  );
}

export default Home;