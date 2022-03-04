import React from "react";
import ContestCard from "../../../Components/ContestCard/ContestCard";
import "./ContestList.css";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";
import ContestListLogic from "./ContestListLogic";

const ContestList = () => {
  const { contestList } = ContestListLogic();

  return (
    <>
      <div className="btn-conatiner">
        <Link to="/addcontest" className="links">
          <Button
            endIcon={<AddIcon className="circle-icon" />}
            variant="contained"
            className="add-question-btn"
          >
            Add Contest
          </Button>
        </Link>
      </div>
      <div className="contest-list-card-container">
        <h1 className="contest-heading">Active Contest</h1>
        {Object.keys(contestList).map((id) => {
          return <ContestCard data={contestList[id]} />;
        })}

        <h1 className="contest-heading">Archived Contest</h1>
      </div>
    </>
  );
};

export default ContestList;
