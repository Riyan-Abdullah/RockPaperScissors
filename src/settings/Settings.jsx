import './Settings.css'

function Settings({ setScreen }) {

  const toggle=()=>{
    const s=localStorage.getItem("sound");
    localStorage.setItem("sound", s==="off"?"on":"off");
    alert("Sound toggled 🔊");
  };

  return (
    <div className="settingsPage">

      <div className="settingsBox">

        <h1>⚙ Settings</h1>

        <button className="settingsBtn" onClick={toggle}>
          Sound ON/OFF 🔊
        </button>

        <button
          className="backBtn"
          onClick={()=>setScreen("home")}
        >
          ⬅ Back
        </button>

      </div>

    </div>
  );
}

export default Settings;