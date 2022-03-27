import { Alert, Button, Snackbar, TextField } from "@mui/material";
import React from "react";
import LogInLogic from "./LogInLogic";
import "./LogIn.css";

const LogIn = () => {
  const {
    getLoginData,
    loginFun,
    isButtonDisabled,
    showHeaderSnackbar,
    hideSnackbar,
    headerErrorText,
    severity,
  } = LogInLogic();
  document.title = "Admin login";

  return (
    <div className="login-container">
      <Snackbar
        open={showHeaderSnackbar}
        autoHideDuration={4000}
        onClose={hideSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        // className="snackbar-header"
      >
        {severity === "error" ? (
          <Alert
            severity="error"
            variant="filled"
            className="alert snackbar-alert"
          >
            {headerErrorText}
          </Alert>
        ) : (
          <Alert
            severity="success"
            variant="filled"
            className="alert snackbar-alert"
          >
            {headerErrorText}
          </Alert>
        )}
      </Snackbar>
      <div className="login-sub-container">
        <img
          src="https://firebasestorage.googleapis.com/v0/b/codewar-project-2022.appspot.com/o/Logo.svg?alt=media&token=6d889c90-3c92-4f71-860a-f94ddf636275"
          alt="Logo"
          className="login-logo"
        ></img>
        <h3 className="login-heading">Admin login</h3>
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
          type="password"
          onChange={getLoginData}
        />
        <Button
          className="login-btn"
          disabled={isButtonDisabled ? true : false}
          variant="contained"
          onClick={loginFun}
        >
          Log In
        </Button>
      </div>
    </div>
  );
  {
    /* </Dialog> */
  }
};

export default LogIn;
