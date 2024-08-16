import axios from "axios";

let loginUser = async (formData, handleClickVariant)=>{
    try {
      let { data } = await axios({
        method: "post",
        url: "http://localhost:5000/api/v1/login",
        data: formData,
      });
      console.log(data);
      localStorage.setItem("token", data.token);
      handleClickVariant("success", "Login Successful")();
    } catch (error) {
      console.log(error);
    }

}

export default loginUser;