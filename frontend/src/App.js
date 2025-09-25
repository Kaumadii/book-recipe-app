import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Profile from "./pages/Profile";

function App() {
  const [user, setUser] = useState(null);

  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        {/* Navbar */}
        <nav className="bg-blue-600 text-white px-8 py-4 shadow-lg flex justify-between">
          <h1 className="text-2xl font-bold">📚 Book Recipe App</h1>
          <div className="flex gap-4">
            <Link to="/" className="hover:underline">Home</Link>
            {!user ? (
              <>
                <Link to="/register" className="hover:underline">Register</Link>
                <Link to="/login" className="hover:underline">Login</Link>
              </>
            ) : (
              <Link to="/profile" className="hover:underline">Profile</Link>
            )}
          </div>
        </nav>

        {/* Routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
