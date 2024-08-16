import axios from "axios";

let loginUser = async (formData, handleClickVariant, navigate)=>{
    try {
      let { data } = await axios({
        method: "post",
        url: "http://localhost:5000/api/v1/login",
        data: formData,
      });
      
      localStorage.setItem("token", data.token);
      navigate("/thank-you");
      handleClickVariant("success", "Login Successful")();
    } catch (error) {
      console.log(error);
    }

}

export default loginUser;