let verifyOtp = async (otp, handleClickVariant, navigate, alertCount, setAlertCount, sendPassword , enqueueSnackbar, formData, url) => { 
    if (alertCount >= 4) {
      handleClickVariant(
        "error",
        "You Can Only Verify Your OTP 4 Times In 24 Hours!"
      )();
      return; 
    }
    fetch(`${url}/api/verify-otp`, {
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
          sendPassword(formData, enqueueSnackbar, url);
        } else {
          handleClickVariant("error", "OTP verification failed!")();
        }
      })
      .catch((err) => console.log(err.message));
  };

  export default verifyOtp;