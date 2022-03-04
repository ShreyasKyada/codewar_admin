import React, { useState } from "react";
import SideDrawer from "./Components/SideDrawer/SideDrawer";
import { Box } from "@mui/system";
import Routing from "./Components/Routing";
import Navbar from "./Components/Navbar/Navbar";
import { Divider, useMediaQuery } from "@mui/material";
import ThemeContext from "./Context/ThemeContext";
import GlobalDataContext from "./Context/GlobalDataContext";

function App() {
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const mobileView = useMediaQuery("(min-width:800px)");
  const toggleDrawer = (open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setIsOpenDrawer(open);
  };

  return (
    <>
      <GlobalDataContext>
        <ThemeContext>
          <Box sx={{ display: "flex" }}>
            <SideDrawer
              mobileView={mobileView}
              isOpenDrawer={isOpenDrawer}
              toggleDrawer={toggleDrawer}
            />
            <Box component="main" sx={{ flexGrow: 1, minWidth: `calc(100% - 10.49rem)`}}>
              <Navbar
                isOpenDrawer={isOpenDrawer}
                mobileView={mobileView}
                toggleDrawer={toggleDrawer}
              />
              <Routing />
            </Box>
          </Box>
        </ThemeContext>
      </GlobalDataContext>
    </>
  );
}

export default App;
