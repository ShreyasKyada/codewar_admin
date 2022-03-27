import { createTheme } from "@mui/material";

const ThemeColor = (mode) => {
  return createTheme({
    palette: {
      mode: mode ? "dark" : "light",
      primary: {
        main: "#03cffc",
        light: "#03cffc",
        dark: "#01D8FD",
        contrastText: "black",
      },
      // primary: {
      //   main: "#03cffc",
      //   light: "#3ed8fa",
      //   dark: "#00b8e0",
      //   contrastText: "black",
      // },
    },
  });
};

export default ThemeColor;
