import { Button, TextField } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import LogInLogic from "./LogInLogic";
import "./LogIn.css"

const LogIn = () => {

  const {getLoginData, loginFun} = LogInLogic();

  return (
    <div className="login-container">
      <TextField
        className="login-text-field"
        variant="standard"
        label="Your email"
        name="email"
        onChange={getLoginData}
      />
      <TextField
        className="login-text-field"
        variant="standard"
        label="Your password"
        name="password"
        onChange={getLoginData}
      />
      <Link to="/" className="forgot-password">
        Forgot your password?
      </Link>
      <Button className="login-btn" variant="contained" onClick={loginFun}>
        Log In
      </Button>
    </div>
  );
};

export default LogIn;
