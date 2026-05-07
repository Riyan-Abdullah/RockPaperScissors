import { useState, useEffect } from "react";
import { supabase } from "./supabase";

import Login from "./login/Login";
import Signup from "./signup/Signup";
import Homepage from "./homepage/Homepage";
import Game from "./game/Game";
import Records from "./records/Records";
import Settings from "./settings/Settings";
import Rules from "./rules/Rules";
import Profile from "./profile/Profile";

function App() {
  const [screen, setScreen] = useState("login");

  // CHECK SUPABASE SESSION ON START
  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getSession();

      if (data.session) {
        setScreen("home");
      } else {
        setScreen("login");
      }
    };

    checkUser();
  }, []);

  return (
    <>
      {screen === "login" && <Login setScreen={setScreen} />}
      {screen === "signup" && <Signup setScreen={setScreen} />}

      {screen === "home" && <Homepage setScreen={setScreen} />}
      {screen === "game" && <Game setScreen={setScreen} />}
      {screen === "records" && <Records setScreen={setScreen} />}
      {screen === "settings" && <Settings setScreen={setScreen} />}
      {screen === "rules" && <Rules setScreen={setScreen} />}

      {/* 👤 PROFILE SCREEN */}
      {screen === "profile" && <Profile setScreen={setScreen} />}
    </>
  );
}

export default App;