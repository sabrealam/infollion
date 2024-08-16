let   sendOtp = async (formData, handleClickVariant,setDisplay,setCount, setClickCount,startCountDown,url) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(formData.email)) {
      handleClickVariant("error", "Invalid email address format!")();
      return;
    }
// back tick `
    fetch(`https://infollion-apay.onrender.com/api/send-otp`, {
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
          setCount(60);
          startCountDown()
          setClickCount((count) => count + 1);
           
        } else {
          handleClickVariant("error", "Failed to send the OTP")();
        }
      })
      .catch((err) => console.log(err.message));
  };

  export default sendOtp