import React, { useState } from "react";
import Button from "@mui/material/Button";
import { Autocomplete, TextField } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { enqueueSnackbar, useSnackbar } from "notistack";
import axios from "axios";
import sendOtp from "../logic/sendOtp";
import loginUser from "../logic/loginUser";
import { imgSrc } from "../assets/img";
function Login(props) {
  let [formData, setFormData] = useState({ email: "", password: "", });
  const [error, setError] = useState({ email: false, password: false,});
  let [isPasswordVisible, setIsPasswordVisible] = useState(true);
  let navigate = useNavigate();
  let url = import.meta.env.VITE_API_URL


  let handleSubmit = async (e) => {
    e.preventDefault();
    if (handleError()) {
      handleClickVariant("error", "Please fill in all required fields!")();
      return;
    }
    loginUser(formData, handleClickVariant, navigate, url);
  };
  let handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    handleError();
  };
  const handleClickVariant = (variant, message) => () => {
    enqueueSnackbar(message, { variant });
  };

  const handleError = () => {
    let errors = {};
    let hasError = false;

    Object.keys(formData).forEach((key) => {
      if (formData[key] === "") {
        errors[key] = true;
        hasError = true;
      }
    });

    setError(errors);
    return hasError;
  };
  let style = {
    width: "100%",
    minHeight: "50px",
    height: "auto",
    display: "flex",
    justifyContent: "center",
    marginTop: "10px",
  };
  return (
    <div
      className="login"
      style={{ width: "100%", height: "100%", padding: "20px" }}
    >
      <div
        style={{
          width: "100%",
          height: "70px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img
          style={{ width: "90px", height: "50px" }}
          src={imgSrc}
          alt=""
        />
      </div>
      <div className="login-input">
        <p style={{ fontSize: "20px", textAlign: "center", margin: "15px" }}>
          Login To Dashboard
        </p>
        <form action="" onSubmit={handleSubmit}>
          <div>
            <div style={style}>
              <TextField
                className="inpt"
                style={{ marginLeft: "15px" }}
                helperText={error.email ? "This Field Is Required" : ""}
                id="demo-helper-text-misaligned"
                label="Email / Username"
                name="email"
                onChange={(e) => handleChange(e)}
                size="small"
              />
            </div>
            <div style={style}>
              { isPasswordVisible ? (<TextField
                className="inpt"
                style={{ marginLeft: "15px" }}
                helperText={error.password ? "This Field Is Required" : ""}
                id="demo-helper-text-misaligned"
                label="Password*"
                size="small"
                name="password"
                onChange={(e) => handleChange(e)}
              />): (
                <TextField
                className="inpt"
                style={{ marginLeft: "15px" }}
                helperText={error.password ? "This Field Is Required" : ""}
                id="demo-helper-text-misaligned"
                label="Otp*"
                size="small"
                name="otp"
                onChange={(e) => handleChange(e)}
              />
              )}
            </div>
          </div>
          <div style={style}>
            <Button
              type="submit"
              variant="contained"
              className="inpt"
              disabled={isPasswordVisible ? false : true} 
              style={{
                height: "40px",

                borderRadius: "20px",
                background: "#ec9324",
                marginTop: "20px",
              }}
            >
              Login With Password
            </Button>
          </div>
          <div style={style}>
            <Button
              type="submit"
              className="inpt"
              style={{
                height: "40px",

                border: "1px solid gray",
                borderRadius: "10px",
                marginTop: "20px",
              }}
            >
              <img
                width={"20px"}
                height={"30px"}
                src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/google/google-original.svg"
              />{" "}
              &emsp; Sign In With Google
            </Button>
          </div>
          <div style={{ ...style, minHeight: "20px" }}>Or</div>
          <div style={style}>
            <Button
              // type="submit"
              className="inpt"
              style={{
                height: "40px",
                border: "1px solid gray",
                borderRadius: "10px",
              }}
              onClick={()=>{
                const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
                if (!emailRegex.test(formData.email)) {
                  handleClickVariant("error", "Invalid email address format!")();
                  return;
                }
                sendOtp(formData,handleClickVariant, navigate)
                props.setLogin(1)
              }}
            >
              Login With Otp
            </Button>
          </div>
          <div style={style}>
            <p>
              Don't have an account?{" "}
              <Link
                className="link"
                to=""
                onClick={() => props.setLogin(false)}
              >
                Register as an expert
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;

const top100Films = ["Mr", "Mrs", "Miss", "Dr.", "Ms", "Prof."];
