import React from "react";
import "./SideDrawer.css";
import ListItemButton from "@mui/material/ListItemButton";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { Drawer, Toolbar } from "@mui/material";
import { RiBracesFill } from "react-icons/ri";
import { MdOutlineQuestionAnswer } from "react-icons/md";
import SideDrawerLogic from "./SideDrawerLogic";
import { Link } from "react-router-dom";

const SideDrawer = ({ mobileView, isOpenDrawer, toggleDrawer }) => {
  const { handleClick, open, getObj, defaultObj, sideLanguages } =
    SideDrawerLogic();

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
          {mobileView ? <Toolbar className="toolbar">Shreyas </Toolbar> : ""}
          <div className="navigation-list">
            <Link to={"/add-languages"} className="links">
              <ListItemButton className="list-item-btn">
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
              {Object.keys(sideLanguages).map((id) => {
                return sideLanguages[id].language_name ? (
                  <Link
                    key={id}
                    className="links"
                    to={`/questions-list/languages/${sideLanguages[id].language_name}`}
                  >
                    <ListItemButton className="nested-list-btn list-item-btn">
                      <img
                        className="list-item-btn-icon"
                        alt="img"
                        src={sideLanguages[id].icon_path}
                      />
                      <p>{sideLanguages[id].language_name}</p>
                    </ListItemButton>
                  </Link>
                ) : (
                  ""
                );
              })}
            </Collapse>
            <Link to={"/contest"} className="links">
              <ListItemButton className="list-item-btn">
                <RiBracesFill className="list-item-btn-icon" />
                <p className="list-text">Contest</p>
              </ListItemButton>
            </Link>
            <Link to={"/addcertificate"} className="links">
              <ListItemButton className="list-item-btn">
                <RiBracesFill className="list-item-btn-icon" />
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
