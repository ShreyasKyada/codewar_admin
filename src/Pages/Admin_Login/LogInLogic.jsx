import { useContext, useState } from "react";
import { authContext } from "../../Context/AuthContext";
import { globalDataContext } from "../../Context/GlobalDataContext";
import appRef from "../../Firebase/Firebase";

const LogInLogic = () => {
  const { setIsLoadingState } = useContext(globalDataContext);
  const { setValidUser, setUsername } = useContext(authContext);
  const [showHeaderSnackbar, setShowHeaderSnackbar] = useState(false);
  const [severity, setSeverity] = useState("");
  const [headerErrorText, setHeaderErrorText] = useState("");

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const setSnackbarData = (errorText, typeOfSnackbar) => {
    setShowHeaderSnackbar(true);
    setHeaderErrorText(errorText);
    setSeverity(typeOfSnackbar);
  };

  const getLoginData = (event) => {
    setLoginData({ ...loginData, [event.target.name]: event.target.value });
  };

  const loginFun = () => {
    if (loginData.email && loginData.password) {
      setIsButtonDisabled(true);
      setIsLoadingState(true);
      appRef
        .child("admin_login_info")
        .orderByChild("email")
        .equalTo(loginData.email)
        .on("value", (snapshot) => {
          const snap = snapshot.val();

          if (snap) {
            const snapObj = Object.values(snap);
            if (snapObj[0].password === loginData.password) {
              const userInfo = {
                isvalidUser: "true",
                username: snapObj[0].username,
              };
              document.cookie =
                "CodeWarAdminLogin=" + JSON.stringify(userInfo) + ";";
              setSnackbarData("Login success!!", "success");
              setTimeout(() => {
                setValidUser(true);
                setUsername(userInfo.username);
              }, 100);
            } else {
              setSnackbarData("Wrong password.", "error");
            }
          } else {
            setSnackbarData("Email is not valid.", "error");
          }
          setIsLoadingState(false);
          setIsButtonDisabled(false);
        });
    } else {
      setSnackbarData("Please fill the data first!!", "error");
    }
  };

  const hideSnackbar = () => {
    setShowHeaderSnackbar(false);
  };

  return {
    getLoginData,
    loginFun,
    isButtonDisabled,
    showHeaderSnackbar,
    hideSnackbar,
    headerErrorText,
    severity,
  };
};

export default LogInLogic;
