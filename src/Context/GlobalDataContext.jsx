import React, { createContext, useState } from "react";

export const globalDataContext = createContext();

const GlobalDataContext = ({ children }) => {
  const [isLoadingState, setIsLoadingState] = useState(false);
  const [headerErrorText, setHeaderErrorText] = useState("");
  const [showHeaderSnackbar, setShowHeaderSnackbar] = useState(false);
  const [severity, setSeverity] = useState("");

  const setSnackbarData = (errorText, typeOfSnackbar) => {
    setShowHeaderSnackbar(true);
    setHeaderErrorText(errorText);
    setSeverity(typeOfSnackbar);
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
        }}
      >
        {children}
      </globalDataContext.Provider>
    </>
  );
};

export default GlobalDataContext;
