import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
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
            {!user ? (
              <>
                <Link to="/login" className="hover:underline">Login</Link>
                <Link to="/register" className="hover:underline">Register</Link>
              </>
            ) : (
              <>
                <Link to="/home" className="hover:underline">Home</Link>
                <Link to="/profile" className="hover:underline">Profile</Link>
              </>
            )}
          </div>
        </nav>

        {/* Routes */}
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} /> 
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/register" element={<Register />} />

          {/* Protect Home: only show if user logged in */}
          <Route
            path="/home"
            element={user ? <Home /> : <Navigate to="/login" replace />}
          />
          <Route
            path="/profile"
            element={user ? <Profile /> : <Navigate to="/login" replace />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

