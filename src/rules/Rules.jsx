import "./Rules.css";

function Rules({ setScreen }) {

  return (
    <div className="rulesPage">

      <div className="rulesBox">

        <h1>📜 Game Rules</h1>

        <div className="rulesList">

          <div className="ruleCard">
            🪨 Rock beats Scissors
          </div>

          <div className="ruleCard">
            📄 Paper beats Rock
          </div>

          <div className="ruleCard">
            ✂️ Scissors beats Paper
          </div>

          <div className="ruleCard">
            🤝 Same choices = Draw
          </div>

          <div className="ruleCard">
            🏆 Every win increases score
          </div>

          <div className="ruleCard">
            😢 Losing resets score to 0
          </div>

        </div>

        <button
          className="rulesBackBtn"
          onClick={()=>setScreen("home")}
        >
          ⬅ Back
        </button>

      </div>

    </div>
  );
}

export default Rules;