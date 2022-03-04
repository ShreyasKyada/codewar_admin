import { createContext, useEffect, useState } from "react";
import { ThemeProvider } from "@mui/material";
import ThemeColor from "../Theme/ThemeColor";

export const themeContext = createContext();

const ThemeContext = ({ children }) => {
  // if isDarkMode is true then dark mode is enable
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add("dark");
      document.body.classList.remove("light");
    } else {
      document.body.classList.add("light");
      document.body.classList.remove("dark");
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    if(isDarkMode)
    setIsDarkMode(false);
    else 
    setIsDarkMode(true);
  }

  const Theme = ThemeColor(isDarkMode);

  return (
    <themeContext.Provider value={{ isDarkMode, Theme, toggleDarkMode }}>
      <ThemeProvider theme={Theme}>{children}</ThemeProvider>
    </themeContext.Provider>
  );
};

export default ThemeContext;
