import { useEffect, useState } from "react";
import "./Records.css";
import { supabase } from "../supabase";

function Records({ setScreen }) {

  const [records, setRecords] = useState([]);

  useEffect(() => {
    fetchRecords();
  }, []);

  const fetchRecords = async () => {

    const { data, error } = await supabase
      .from("scores")
      .select("username, score")
      .order("score", { ascending: false })
      .limit(5);

    if (error) {
      console.log(error);
      return;
    }

    setRecords(data || []);
  };

  return (
    <div className="recordsPage">

      <div className="recordsBox">

        <h1 className="recordsTitle">
          🏆 Leaderboard
        </h1>

        <div className="recordsList">

          {records.length > 0 ? (

            records.map((u, i) => (

              <div className="recordCard" key={i}>

                <span className="rank">
                  #{i + 1}
                </span>

                <span className="playerName">
                  {u.username}
                </span>

                <span className="playerScore">
                  {u.score}
                </span>

              </div>

            ))

          ) : (

            <p className="noRecord">
              No Records Yet
            </p>

          )}

        </div>

        <button
          className="backBtn"
          onClick={() => setScreen("home")}
        >
          ⬅ Back
        </button>

      </div>

    </div>
  );
}

export default Records;