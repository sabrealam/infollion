import React, { useState } from "react";
import Login from "./Login";
import Register from "./Register";
import '../App.css'
import Otp from "./Otp";
function AuthPage() { 
  const [error, setError] = React.useState(false);
  let [login, setLogin] = useState(false);
  let [alertCount, setAlertCount] = useState(0);
 
 

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        overflow: "hidden",
      }}
      className="auth-page"
    >
      <div className="first-half" style={{ width: "50%", height: "100%" }}>
        <img
          src="https://slir.netlify.app/assets/sidePanel_new-iCiYVcEK.svg"
          alt="image"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center",
          }}
        />
      </div>
      {/* Devider Line ------------------------------- */}
      <div id="second-half" 
      // style={{ width: "50%", height: "100%", background:"pink" }}
      >
        {
  login === true ? (
    <Login setLogin={setLogin} />
  ) : login === false ? (
    <Register setLogin={setLogin} />
  ) : login === 1 ? ( 
    <Otp setLogin={setLogin} alertCount={alertCount} setAlertCount={setAlertCount} />
  ) : (
    ""
  )
}
      </div>
    </div>
  );
}

export default AuthPage;

const top100Films = ["Mr", "Mrs", "Miss", "Dr.", "Ms", "Prof."];
