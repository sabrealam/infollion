import React, { useState } from "react";
import Button from "@mui/material/Button";
import { Autocomplete, TextField } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useSnackbar } from "notistack";
import { imgSrc } from "../assets/img";

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
  let [otp, setOtp] = useState({ otp: "" });
  let [alertCount, setAlertCount] = useState(0);
  let [countryData, setCountryData] = useState([]);
  const { enqueueSnackbar } = useSnackbar();
  let [display, setDisplay] = useState(false);
  let [clickCount, setClickCount] = useState(1);
  let navigate = useNavigate();

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

    if (clickCount === 1) {
      sendOtp();
    } else if (clickCount >= 2) {
      verifyOtp();
    }
  };

  let sendOtp = async () => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(formData.email)) {
      handleClickVariant("error", "Invalid email address format!")();
      return;
    }

    fetch("http://localhost:5000/api/send-otp", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.success === true) {
          handleClickVariant("success", "OTP sent successfully!")();
          setDisplay(true);
          setClickCount((count) => count + 1);
        } else {
          handleClickVariant("error", "Failed to send the OTP")();
        }
      })
      .catch((err) => console.log(err.message));
  };

  let verifyOtp = async () => {
    setAlertCount((count) => count + 1);
    if (alertCount >= 4) {
      handleClickVariant(
        "error",
        "You Can Only Verify Your OTP 4 Times In 24 Hours!"
      )();
      return;
    }
    fetch("http://localhost:5000/api/verify-otp", {
      method: "POST",
      body: JSON.stringify({ otp: otp }),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.success === true) {
          handleClickVariant("success", "OTP verified successfully!")();
          navigate("/thank-you");
          sendPassword();
        } else {
          handleClickVariant("error", "OTP verification failed!")();
        }
      })
      .catch((err) => console.log(err.message));
  };

  let handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError((prev) => ({ ...prev, [e.target.name]: false }));
  };

  let sendPassword = async () => {
    try {
      let { data } = await axios({
        method: "POST",
        url: "http://localhost:5000/api/v1/register",
        data: formData,
      });
      // snackbar
      console.log(data);
      enqueueSnackbar("Password sent to your email", { variant: "success" });
    } catch (error) {
      console.log(error);
    }
  };

  let fetchCountryData = async () => {
    try {
      let { data } = await axios.get("https://restcountries.com/v3.1/all");
      setCountryData(data);
    } catch (error) {
      console.log(error);
    }
  };

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
                onChange={(e, v) => setFormData({ ...formData, tag: v })}
                options={top100Films}
                getOptionLabel={(option) => option}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Mr/Mrs"
                    helperText={error.tag ? "This field is required" : ""}
                    size="small"
                    placeholder=""
                  />
                )}
                sx={{ width: "110px" }}
              />
              <TextField
                style={{ width: "75%", marginLeft: "15px" }}
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
                    helperText={error.code ? "This Field Is Required" : ""}
                    size="small"
                    placeholder=""
                  />
                )}
                sx={{ width: "110px" }}
              />
              <TextField
                style={{ width: "75%", marginLeft: "15px" }}
                helperText={error.number ? "This Field Is Required" : ""}
                label="Mobile Number*"
                size="small"
                name="number"
                onChange={handleChange}
              />
            </div>
          </div>
          <div>
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
