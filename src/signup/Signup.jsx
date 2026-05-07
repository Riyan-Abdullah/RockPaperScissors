import { useState } from "react";
import "../login/Login.css";
import { supabase } from "../supabase";

function Signup({ setScreen }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signup = async () => {

    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }

    // 1. Supabase Auth (email + password only)
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      alert(error.message);
      return;
    }

    // 2. Check if email already exists
    const { data: existing } = await supabase
      .from("scores")
      .select("email")
      .eq("email", email)
      .single();

    // 3. Insert only if not exists
    if (!existing) {
      const { error: dbError } = await supabase
        .from("scores")
        .insert([
          {
            email: email,
            score: 0,
          },
        ]);

      if (dbError) console.log(dbError);
    }

    // 4. Save email for game use
    localStorage.setItem("currentUser", email);
    localStorage.setItem("loggedIn", "true");

    alert("Signup Successful 🎉");

    setScreen("login");
  };

  return (
    <div className="auth">
      <div className="box">

        <h1>Signup</h1>

        <input
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          placeholder="Password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={signup}>Signup</button>

        <button onClick={() => setScreen("login")}>
          Back
        </button>

      </div>
    </div>
  );
}

export default Signup;