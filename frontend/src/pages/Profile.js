import React, { useEffect, useState } from "react";
import axios from "axios";

function Profile() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios.get("http://localhost:5000/auth/profile", {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then((res) => setProfile(res.data))
    .catch(() => alert("⚠️ Failed to fetch profile"));
  }, []);

  if (!profile) return <p className="text-center mt-10">Loading profile...</p>;

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">👤 Profile</h2>
      <p><b>Name:</b> {profile.name}</p>
      <p><b>Email:</b> {profile.email}</p>
    </div>
  );
}

export default Profile;
