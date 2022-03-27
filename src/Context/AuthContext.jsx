import React, { createContext, useEffect, useState } from "react";

export const authContext = createContext();

const AuthContext = ({ children }) => {
  const [validUser, setValidUser] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const cookie = document.cookie.split(";");

    for (let i = 0; i < cookie.length; i++) {
      if (cookie[i].trim().split("=")[0] === "CodeWarAdminLogin") {
        const adminInfo = JSON.parse(cookie[i].split("=")[1]);
        if (adminInfo.isvalidUser === "true") {
          setUsername(adminInfo.username);
          setValidUser(true);
        }
      }
    }
  }, []);

  return (
    <authContext.Provider value={{ validUser, setValidUser, username, setUsername }}>
      {children}
    </authContext.Provider>
  );
};

export default AuthContext;
