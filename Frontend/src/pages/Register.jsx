import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { Autocomplete, TextField } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useSnackbar } from "notistack";
import { imgSrc } from "../assets/img";
import sendOtp from "../logic/sendOtp";
import verifyOtp from "../logic/verifyOtp";
import sendPassword from "../logic/sendPassword";

let intervalId;
function Register(props) {
  let [formData, setFormData] = useState({
    tag: "",
    name: "",
    code: "",
    number: "",
    email: "",
    // otp: "",
  });

  const [error, setError] = useState({
    tag: false,
    name: false,
    code: false,
    number: false,
    email: false,
    // otp: false,
  });
  let [count, setCount] = useState(0);
  let [otp, setOtp] = useState({ otp: "" });
  let [alertCount, setAlertCount] = useState(0);
  let [countryData, setCountryData] = useState([]);
  const { enqueueSnackbar } = useSnackbar();
  let [display, setDisplay] = useState(false);
  let [clickCount, setClickCount] = useState(1);
  let navigate = useNavigate();
  const [isCounting, setIsCounting] = useState(false);
  let url = import.meta.env.VITE_API_URL;
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

  let handleSubmit = async (e) => {
    e.preventDefault();

    if (handleError()) {
      handleClickVariant("error", "Please fill in all required fields!")();
      return;
    }

    const mobileRegex = /^[6-9]\d{9}$/;
    if (!mobileRegex.test(formData.number)) {
      handleClickVariant("error", "Invalid mobile number format!")();
      return;
    }
    if(clickCount == 1){
      fetch("https://infollion-apay.onrender.com/api/v1/register/check", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
  
      })
        .then((response) => response.json())
        .then((data) => {
          if(data.message == "User already exist"){
            handleClickVariant("error", "User already exist")();
            props.setLogin(true)
            return
          }else {
            sendOtp(
              formData,
              handleClickVariant,
              setDisplay,
              setCount,
              setClickCount,
              startCountDown,
              url
            );
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  
     if (clickCount >= 2) {
      verifyOtp(
        otp,
        handleClickVariant,
        navigate,
        alertCount,
        setAlertCount,
        sendPassword,
        enqueueSnackbar,
        formData,
        url
      );
    }
  };

  let handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError((prev) => ({ ...prev, [e.target.name]: false }));
  };

  let fetchCountryData = async () => {
    try {
      let { data } = await axios.get("https://restcountries.com/v3.1/all");
      setCountryData(data);
    } catch (error) {
      console.log(error);
    }
  };

  const startCountDown = () => {
    if (isCounting) return;
    setIsCounting(true);
    intervalId = setInterval(() => {
      setCount((prev) => {
        if (prev <= 1) {
          clearInterval(intervalId);
          setIsCounting(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  useEffect(() => {
    return () => clearInterval(intervalId); // Cleanup interval on unmount
  }, []);
  React.useEffect(() => {
    fetchCountryData();
  }, []);
  return (
    <div
      className="register"
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
        <img style={{ width: "90px", height: "50px" }} src={imgSrc} alt="" />
      </div>
      <div className="inputt">
        <p style={{ fontSize: "20px", margin: "15px" }}>
          Register As An Expert
        </p>
        <form onSubmit={handleSubmit}>
          <div>
            <div
              style={{
                width: "100%",
                minHeight: "50px",
                display: "flex",
                justifyContent: "space-between",
                height: "auto",
              }}
            >
              <Autocomplete
                limitTags={2}
                size="small"
                id="multiple-limit-tags"
                onChange={(e, v) => {
                  setFormData({ ...formData, tag: v });
                  //  handleError()
                }}
                options={top100Films}
                getOptionLabel={(option) => option}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Mr/Mrs"
                    helperText={error.tag ? "This field is required" : ""}
                    style={{ width: "130px" }}
                    size="small"
                    placeholder=""
                  />
                )}
                sx={{ width: "110px" }}
              />
              <TextField
                style={{ width: "75%", marginLeft: "30px" }}
                helperText={error.name ? "This Field Is Required" : ""}
                label="Name"
                name="name"
                onChange={handleChange}
                size="small"
              />
            </div>
            <div
              style={{
                width: "100%",
                minHeight: "50px",
                display: "flex",
                justifyContent: "space-between",
                marginTop: "10px",
              }}
            >
              <Autocomplete
                limitTags={2}
                size="small"
                onChange={(e, v) =>
                  setFormData({
                    ...formData,
                    code: v?.idd?.root + v?.idd?.suffixes,
                  })
                }
                id="multiple-limit-tags"
                options={countryData}
                getOptionLabel={(option) =>
                  option?.idd?.root +
                  option?.idd?.suffixes +
                  " " +
                  option?.name?.common
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="ISD"
                    style={{ width: "130px" }}
                    helperText={error.code ? "This Field Is Required" : ""}
                    size="small"
                    placeholder=""
                  />
                )}
                sx={{ width: "110px" }}
              />
              <TextField
                style={{ width: "75%", marginLeft: "30px" }}
                helperText={error.number ? "This Field Is Required" : ""}
                label="Mobile Number*"
                size="small"
                name="number"
                onChange={handleChange}
              />
            </div>
          </div>

          <div style={{ textAlign: "right" }}>
            <TextField
              style={{ width: "100%", marginTop: "10px" }}
              helperText={error.email ? "This Field Is Required" : ""}
              label="Email*"
              name="email"
              onChange={handleChange}
              size="small"
            />
            <TextField
              style={{
                width: "100%",
                marginTop: "20px",
                display: display ? "flex" : "none",
              }}
              helperText={error.otp ? "This Field Is Required" : ""}
              label="Otp*"
              name="otp"
              onChange={(e) => {
                // setOtp(e.target.name)
                setOtp(e.target.value);
              }}
              size="small"
            />
            <div
              style={{
                color: "red",
                cursor: "pointer",
                marginTop: "5px",
                display: clickCount == 2 ? "block" : "none",
              }}
            >
              {alertCount >= 4 ? (
                "Disabled"
              ) : count == 0 ? (
                <p
                  style={{ color: "red", cursor: "pointer", marginTop: "10px" }}
                  onClick={() => {
                    setCount(60);
                    startCountDown();
                    sendOtp(
                      formData,
                      handleClickVariant,
                      setDisplay,
                      setCount,
                      setClickCount,
                      startCountDown,
                      url
                    );
                  }}
                >
                  Resend OTP
                </p>
              ) : (
                <p>Resend OTP in {count} seconds</p>
              )}
            </div>
            <Button
              type="submit"
              style={{
                width: "100%",
                borderRadius: "5px",
                background: "#ec9324",
                marginTop: "30px",
                color: "white",
              }}
            >
              {clickCount === 1 ? "Get Otp On Email" : "Submit"}
            </Button>
          </div>
          {/* <div>
            <p>Resend OTP in   seconds</p>
              
          </div> */}
          <div
            style={{
              width: "100%",
              minHeight: "50px",
              height: "auto",
              display: "flex",
              justifyContent: "center",
              marginTop: "10px",
            }}
          >
            <p>
              Already have an account?{" "}
              <Link to="" className="link" onClick={() => props.setLogin(true)}>
                Login Here
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;

const top100Films = ["Mr", "Mrs", "Miss", "Dr.", "Ms", "Prof."];
