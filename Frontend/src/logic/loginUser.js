import axios from "axios";

let loginUser = async (formData, handleClickVariant, navigate,url)=>{
    try {
      let { data } = await axios({
        method: "post",
        url: `${url}/api/v1/login`,
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