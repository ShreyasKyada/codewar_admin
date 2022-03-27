import React, { useContext, useState } from "react";
import SideDrawer from "./Components/SideDrawer/SideDrawer";
import { Box } from "@mui/system";
import Routing from "./Components/Routing";
import Navbar from "./Components/Navbar/Navbar";
import {
  Alert,
  Snackbar,
  useMediaQuery,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";

import ThemeContext from "./Context/ThemeContext";
import { globalDataContext } from "./Context/GlobalDataContext";
import { authContext } from "./Context/AuthContext";

function App() {
  const { validUser } = useContext(authContext);
  const {
    showHeaderSnackbar,
    headerErrorText,
    severity,
    setShowHeaderSnackbar,
    openAlertBox,
    alertBoxClose,
    confirmDeletionState,
    alertBoxText,
  } = useContext(globalDataContext);
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

  const hideSnackbar = () => {
    setShowHeaderSnackbar(false);
  };

  return (
    <>
      <ThemeContext>
        <Dialog
          open={openAlertBox}
          onClose={alertBoxClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {alertBoxText.heading}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {alertBoxText.body}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={alertBoxClose} autoFocus className="disagree-btn">
              Disagree
            </Button>
            <Button
              onClick={() => {
                confirmDeletionState();
              }}
              color="error"
              className="agree-btn"
            >
              Agree
            </Button>
          </DialogActions>
        </Dialog>
        <Snackbar
          open={showHeaderSnackbar}
          autoHideDuration={4000}
          onClose={hideSnackbar}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          className="snackbar-header"
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
        {validUser ? (
          <Box sx={{ display: "flex" }}>
            <SideDrawer
              mobileView={mobileView}
              isOpenDrawer={isOpenDrawer}
              toggleDrawer={toggleDrawer}
            />
            <Box
              component="main"
              sx={{ flexGrow: 1, minWidth: `calc(100% - 10.49rem)` }}
            >
              <Navbar
                isOpenDrawer={isOpenDrawer}
                mobileView={mobileView}
                toggleDrawer={toggleDrawer}
              />
              <Routing />
            </Box>
          </Box>
        ) : (
          <Routing />
        )}
      </ThemeContext>
    </>
  );
}

export default App;
