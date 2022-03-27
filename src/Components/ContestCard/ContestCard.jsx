import React, { useState } from "react";
import "./ContestCard.css";
import { Button, Collapse } from "@mui/material";
import { MdEdit, MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";

const ContestCard = ({ data, deleteContest, editContest }) => {
  const [isCollapse, setIsCollapse] = useState(false);

  const toggleCollapseState = () => {
    setIsCollapse(!isCollapse);
  };

  return (
    <div className="contest-card-container">
      <div className="contest-card-sub-container">
        <div
          className="content-card-top-container"
          onClick={toggleCollapseState}
        >
          <p className="content-card-title">{data.contest_name}</p>
          <div className="contest-icon-container">
            <Button
              variant="outlined"
              component={Link}
              to={`/questions-list/contest/${data.contest_name}`}
              className="contest-btn"
              color="primary"
            >
              Manage questions
            </Button>
            <MdEdit className="contest-card-icons" onClick={editContest} />
            <MdDelete className="contest-card-icons" onClick={deleteContest} />
          </div>
        </div>
        <Collapse in={isCollapse} timeout={700} unmountOnExit>
          <div className="contest-collapse-container">
            <div className="contest-subtitle">Description</div>
            <div className="contest-description">{data.description}</div>
          </div>
        </Collapse>
      </div>
      <br></br>
    </div>
  );
};

export default ContestCard;
