import { useState } from "react";

const LogInLogic = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const getLoginData = (event) => {
    setLoginData({ ...loginData, [event.target.name]: event.target.value });
  };

  const loginFun = () => {
    console.log("DONE");
  }

  return {getLoginData, loginFun};
};

export default LogInLogic;
