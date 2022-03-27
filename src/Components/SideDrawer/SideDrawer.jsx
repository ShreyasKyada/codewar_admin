import React, { useContext } from "react";
import "./SideDrawer.css";
import ListItemButton from "@mui/material/ListItemButton";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { Drawer, Toolbar } from "@mui/material";
import { RiBracesFill } from "react-icons/ri";
import { GrCertificate } from "react-icons/gr";
import { BsTrophy } from "react-icons/bs";
import { MdOutlineQuestionAnswer } from "react-icons/md";
import SideDrawerLogic from "./SideDrawerLogic";
import { Link } from "react-router-dom";
import { globalDataContext } from "../../Context/GlobalDataContext";

const SideDrawer = ({ mobileView, isOpenDrawer, toggleDrawer }) => {
  const { handleClick, open, getObj, defaultObj, sideLanguages } =
    SideDrawerLogic();

  const { activeTab } = useContext(globalDataContext);

  return (
    <>
      <Drawer
        sx={!mobileView ? getObj() : defaultObj()}
        variant={!mobileView ? "temporary" : "permanent"}
        className="drawer"
        anchor={"left"}
        open={isOpenDrawer}
        onClose={toggleDrawer(false)}
      >
        <div className="sidedrawer">
          {mobileView ? (
            <Toolbar className="toolbar">
              <img
                src="https://firebasestorage.googleapis.com/v0/b/codewar-project-2022.appspot.com/o/Logo.svg?alt=media&token=6d889c90-3c92-4f71-860a-f94ddf636275"
                alt="Logo"
              />
            </Toolbar>
          ) : (
            ""
          )}
          <div className="navigation-list">
            <Link
              to={"/add-languages"}
              className="links"
              onClick={toggleDrawer(false)}
            >
              <ListItemButton
                className={
                  activeTab === "Languages"
                    ? "list-item-btn active"
                    : "list-item-btn"
                }
              >
                <RiBracesFill className="list-item-btn-icon" />
                <p className="list-text">Languages</p>
              </ListItemButton>
            </Link>

            <ListItemButton onClick={handleClick} className="list-item-btn">
              <MdOutlineQuestionAnswer className="list-item-btn-icon" />
              <p className="list-text">Questions</p>
              {open ? (
                <ExpandLess className="expand-less-more-icons" />
              ) : (
                <ExpandMore className="expand-less-more-icons" />
              )}
            </ListItemButton>
            <Collapse in={open} timeout="auto" unmountOnExit>
              {sideLanguages && Object.keys(sideLanguages).map((id) => {
                return sideLanguages[id].language_name ? (
                  <Link
                    key={id}
                    className="links"
                    onClick={toggleDrawer(false)}
                    to={`/questions-list/languages/${sideLanguages[id].language_name}`}
                  >
                    <ListItemButton
                      className={
                        activeTab ===
                        `Question/${sideLanguages[id].language_name}`
                          ? "nested-list-btn list-item-btn active"
                          : "nested-list-btn list-item-btn"
                      }
                    >
                      <img
                        className="list-item-btn-icon"
                        alt="img"
                        src={sideLanguages[id].icon_path}
                      />
                      <p>{sideLanguages[id].language_name} </p>
                    </ListItemButton>
                  </Link>
                ) : (
                  ""
                );
              })}
            </Collapse>
            <Link
              to={"/contest"}
              className="links"
              onClick={toggleDrawer(false)}
            >
              <ListItemButton
                className={
                  activeTab === "Contest"
                    ? "list-item-btn active"
                    : "list-item-btn"
                }
              >
                <BsTrophy className="list-item-btn-icon" />
                <p className="list-text">Contest</p>
              </ListItemButton>
            </Link>
            <Link
              to={"/addcertificate"}
              className="links"
              onClick={toggleDrawer(false)}
            >
              <ListItemButton
                className={
                  activeTab === "Certificate"
                    ? "list-item-btn active"
                    : "list-item-btn"
                }
              >
                <GrCertificate className="list-item-btn-icon" />
                <p className="list-text">Certification</p>
              </ListItemButton>
            </Link>
          </div>
        </div>
      </Drawer>
    </>
  );
};
export default SideDrawer;
