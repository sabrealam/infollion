import React, { useState } from "react";
import Button from "@mui/material/Button";
import { Autocomplete, TextField } from "@mui/material";
import Login from "./Login";
import Register from "./Register";
import '../App.css'
function AuthPage() {
  let [formData, setFormData] = useState({
    tag: "",
    name: "",
    code: "",
    number: "",
    email: "",
  });
  const [error, setError] = React.useState(false);
  let [login, setLogin] = useState(false);
  let handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };
  let handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

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
        {login ? (
          <Login setLogin={setLogin} />
        ) : (
          <Register setLogin={setLogin} />
        )}
      </div>
    </div>
  );
}

export default AuthPage;

const top100Films = ["Mr", "Mrs", "Miss", "Dr.", "Ms", "Prof."];
