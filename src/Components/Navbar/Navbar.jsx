import {
  AppBar,
  LinearProgress,
  ListItemButton,
  ListItemIcon,
} from "@mui/material";
import React, { useContext } from "react";
import "./Navbar.css";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import { themeContext } from "../../Context/ThemeContext";
import { BsMoon } from "react-icons/bs";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { AiOutlineSearch } from "react-icons/ai";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import { globalDataContext } from "../../Context/GlobalDataContext";
import { MdLogout } from "react-icons/md";
import { authContext } from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom";

const Navbar = ({ isOpenDrawer, mobileView, toggleDrawer }) => {
  const { toggleDarkMode, isDarkMode } = useContext(themeContext);
  const { setValidUser, username } = useContext(authContext);
  const { isLoadingState } = useContext(globalDataContext);
  const nevigation = useNavigate();

  const logOut = () => {
    const d = new Date();
    d.setTime(d.getTime() + 30 * 24 * 60 * 60 * 1000);
    const userInfo = {
      isvalidUser: "false",
      username: "",
    };
    document.cookie =
      "CodeWarAdminLogin=" +
      JSON.stringify(userInfo) +
      ";" +
      d.toUTCString() +
      ";";
    setValidUser(false);
    nevigation("/");
  };

  return (
    <>
      <AppBar position="sticky" className="appbar">
        <div className="progressbar-container">
          {isLoadingState ? <LinearProgress /> : ""}
        </div>
        {!mobileView ? (
          isOpenDrawer ? (
            <CloseRoundedIcon
              onClick={toggleDrawer(false)}
              className="mobile-bars"
            />
          ) : (
            <MenuRoundedIcon
              onClick={toggleDrawer(true)}
              className="mobile-bars"
            />
          )
        ) : (
          ""
        )}

        <div className="search-icon-container">
          {mobileView ? (
            <div className="search-box-container">
              {/* searchbox design */}
              <div className="search-box-icon-container">
                <div className="search-icon-container">
                  {/* <SearchOutlinedIcon className="search-icon" /> */}
                  <AiOutlineSearch className="search-icon" />
                </div>
                <input
                  className="search-box"
                  type="text"
                  placeholder="Search..."
                />
              </div>
            </div>
          ) : (
            ""
          )}
          <div className="icon-container">
            {/* Dark mode icon toggle */}
            {isDarkMode ? (
              <BsMoon className="theme-icon-moon" onClick={toggleDarkMode} />
            ) : (
              <LightModeOutlinedIcon
                className="theme-icon"
                onClick={toggleDarkMode}
              />
            )}
          </div>
          {mobileView ? (
            <ListItemButton
              className="list-item-btn-navbar"
              disableRipple={true}
            >
              <ListItemIcon className="list-item-icon-navbar">
                <PersonOutlineIcon className="person-icon" />
              </ListItemIcon>
              <p className="list-item-text-navbar">{username && username}</p>
            </ListItemButton>
          ) : (
            ""
          )}
          <MdLogout className="admin-logout-btn" onClick={logOut} />
        </div>
      </AppBar>
    </>
  );
};

export default Navbar;
