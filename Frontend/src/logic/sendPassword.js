import axios from "axios";

let sendPassword = async (formData, enqueueSnackbar, url) => {
    try {
      let { data } = await axios({
        method: "POST",
        url: `${url}/api/v1/register`,
        data: formData,
      });
      // snackbar
      console.log(data);
      enqueueSnackbar("Password sent to your email", { variant: "success" });
    } catch (error) {
      console.log(error);
    }
  };

  export default sendPassword;