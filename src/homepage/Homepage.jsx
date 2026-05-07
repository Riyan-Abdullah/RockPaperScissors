import "./Homepage.css";

function Homepage({ setScreen }) {
  return (
    <div className="home">
      <h1>Rock Paper Scissors</h1>

      <div className="menu">

        <button onClick={() => setScreen("game")}>
          🎮 Start
        </button>

        <button onClick={() => setScreen("records")}>
          🏆 Records
        </button>

        {/* 👤 NEW PROFILE BUTTON */}
        <button onClick={() => setScreen("profile")}>
          👤 Profile
        </button>

        <button onClick={() => setScreen("settings")}>
          ⚙️ Settings
        </button>

        <button onClick={() => setScreen("rules")}>
          📜 Rules
        </button>

        <button
          onClick={() => {
            localStorage.clear();
            setScreen("login");
          }}
        >
          🚪 Exit
        </button>

      </div>
    </div>
  );
}

export default Homepage;