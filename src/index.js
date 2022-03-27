import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import "./Theme/index.css";
import AuthContext from "./Context/AuthContext";
import GlobalDataContext from "./Context/GlobalDataContext";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContext>
        <GlobalDataContext>
          <App />
        </GlobalDataContext>
      </AuthContext>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
