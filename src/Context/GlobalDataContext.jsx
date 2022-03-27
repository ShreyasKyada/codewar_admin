import React, { createContext, useEffect, useState } from "react";

export const globalDataContext = createContext();

const GlobalDataContext = ({ children }) => {
  const [isLoadingState, setIsLoadingState] = useState(false);
  const [headerErrorText, setHeaderErrorText] = useState("");
  const [showHeaderSnackbar, setShowHeaderSnackbar] = useState(false);
  const [severity, setSeverity] = useState("");
  const [activeTab, setActiveTab] = useState("");
  const [openAlertBox, setOpenAlertBox] = useState(false);
  const [isConfirmDeletionState, setIsConfirmDeletionState] = useState(false);
  const [alertBoxText, setAlertBoxText] = useState({ heading: "", body: "" });

  const setSnackbarData = (errorText, typeOfSnackbar) => {
    setShowHeaderSnackbar(true);
    setHeaderErrorText(errorText);
    setSeverity(typeOfSnackbar);
  };

  const confirmDeletionState = () => {
    setIsConfirmDeletionState(true);
    setOpenAlertBox(false);
  };

  useEffect(() => {
    if (openAlertBox) {
      setIsConfirmDeletionState(false);
    }
  }, [openAlertBox]);

  const alertBoxClose = () => {
    setIsConfirmDeletionState(false);
    setOpenAlertBox(false);
  };

  return (
    <>
      <globalDataContext.Provider
        value={{
          isLoadingState,
          setIsLoadingState,
          headerErrorText,
          showHeaderSnackbar,
          severity,
          setSnackbarData,
          setShowHeaderSnackbar,
          activeTab,
          setActiveTab,
          alertBoxClose,
          openAlertBox,
          confirmDeletionState,
          isConfirmDeletionState,
          alertBoxText,
          setOpenAlertBox,
          setAlertBoxText,
          setIsConfirmDeletionState,
        }}
      >
        {children}
      </globalDataContext.Provider>
    </>
  );
};

export default GlobalDataContext;
