import { useState } from "react";
import "./Login.css";
import { supabase } from "../supabase";

function Login({ setScreen }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {

    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }

    // 1. Supabase login
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert(error.message);
      return;
    }

    // 2. Get username from database using email (SAFE METHOD)
    const { data: userData, error: fetchError } = await supabase
      .from("scores")
      .select("username")
      .eq("email", email)
      .single();

    if (fetchError) {
      console.log(fetchError);
    }

    // 3. Final username fallback
    const finalUsername =
      userData?.username || email.split("@")[0];

    // 4. Save session
    localStorage.setItem("loggedIn", "true");
    localStorage.setItem("currentUser", finalUsername);

    alert("Login Successful 🎉");

    setScreen("home");
  };

  return (
    <div className="auth">
      <div className="box">

        <h1>Login</h1>

        <input
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={login}>Login</button>

        <button onClick={() => setScreen("signup")}>
          Signup
        </button>

      </div>
    </div>
  );
}

export default Login;