import { useEffect, useState } from "react";
import { supabase } from "../supabase";
import "./Profile.css";

function Profile({ setScreen }) {
  const [user, setUser] = useState(null);
  const [score, setScore] = useState(0);

  useEffect(() => {
    fetchUser();
    fetchScore();
  }, []);

  const fetchUser = async () => {
    const { data } = await supabase.auth.getUser();
    setUser(data.user);
  };

  const fetchScore = async () => {
    const currentUser = localStorage.getItem("currentUser");

    const { data } = await supabase
      .from("scores")
      .select("*")
      .eq("username", currentUser)
      .single();

    if (data) setScore(data.score);
  };

  const logout = async () => {
    await supabase.auth.signOut();
    localStorage.clear();
    setScreen("login");
  };

  return (
    <div className="profile-container">

      <div className="profile-box">

        <h1>👤 Profile</h1>

        <div className="profile-info">
          <p>📧 {user?.email}</p>
          <p>🏆 Best Score: {score}</p>
        </div>

        <div className="profile-buttons">

          <button onClick={() => setScreen("home")}>
            ⬅ Back
          </button>

          <button onClick={logout}>
            🚪 Logout
          </button>

        </div>

      </div>

    </div>
  );
}

export default Profile;