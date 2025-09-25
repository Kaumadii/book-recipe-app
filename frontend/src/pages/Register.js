import React, { useState } from "react";
import axios from "axios";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/auth/register", { name, email, password });
      alert("✅ Registered successfully, now login!");
    } catch (err) {
      alert("Registration failed: " + (err.response?.data?.error || err.message));
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Register</h2>
      <form onSubmit={handleRegister} className="flex flex-col gap-3">
        <input type="text" placeholder="Name" onChange={(e) => setName(e.target.value)} required className="p-2 border rounded" />
        <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required className="p-2 border rounded" />
        <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required className="p-2 border rounded" />
        <button type="submit" className="bg-blue-600 text-white p-2 rounded">Register</button>
      </form>
    </div>
  );
}

export default Register;
