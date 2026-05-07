import { useState } from "react";
import "./Game.css";
import click from "../assets/click.mp3";
import win from "../assets/win.mp3";
import lose from "../assets/lose.mp3";
import { supabase } from "../supabase";

function Game({ setScreen }) {
  const [score, setScore] = useState(0);
  const [result, setResult] = useState("");
  const [userChoice, setUserChoice] = useState("");
  const [compChoice, setCompChoice] = useState("");

  const choices = ["rock", "paper", "scissors"];

  const play = (choice) => {
    const soundOn = localStorage.getItem("sound") !== "off";

    if (soundOn) new Audio(click).play();

    const comp = choices[Math.floor(Math.random() * 3)];

    setUserChoice(choice);
    setCompChoice(comp);

    if (choice === comp) {
      setResult("Draw 🤝");
    } 
    else if (
      (choice === "rock" && comp === "scissors") ||
      (choice === "paper" && comp === "rock") ||
      (choice === "scissors" && comp === "paper")
    ) {
      if (soundOn) new Audio(win).play();

      const newScore = score + 1;
      setScore(newScore);
      setResult("You Win 😎");

      updateLeaderboard(newScore);
    } 
    else {
      if (soundOn) new Audio(lose).play();

      setScore(0);
      setResult("You Lose 😢");
    }
  };

  // ✅ FIXED DATABASE FUNCTION
  const updateLeaderboard = async (s) => {

    const name = localStorage.getItem("currentUser");

    const safeScore = Number(s); // 🔥 FORCE NUMBER

    const { data: existingUser, error: fetchError } = await supabase
      .from("scores")
      .select("*")
      .eq("username", name)
      .single();

    if (fetchError && fetchError.code !== "PGRST116") {
      console.log(fetchError);
      return;
    }

    // UPDATE EXISTING USER
    if (existingUser) {
      if (safeScore > existingUser.score) {
        const { error } = await supabase
          .from("scores")
          .update({ score: safeScore })
          .eq("username", name);

        if (error) console.log(error);
      }
    }

    // INSERT NEW USER
    else {
      const { error } = await supabase
        .from("scores")
        .insert([
          {
            username: name,
            score: safeScore,
          },
        ]);

      if (error) console.log(error);
    }
  };

  return (
    <div className="game-container">
      <div className="game-box">

        <h1>🎮 Rock Paper Scissors</h1>

        <div className="choices">
          <button onClick={() => play("rock")}>🪨 Rock</button>
          <button onClick={() => play("paper")}>📄 Paper</button>
          <button onClick={() => play("scissors")}>✂️ Scissors</button>
        </div>

        <div className="result-box">
          {userChoice && <p>Your Choice: {userChoice}</p>}
          {compChoice && <p>Computer: {compChoice}</p>}
          {result && <h2>{result}</h2>}
        </div>

        <h3 className="score">Score: {score}</h3>

        <button className="back-btn" onClick={() => setScreen("home")}>
          ⬅ Back
        </button>

      </div>
    </div>
  );
}

export default Game;