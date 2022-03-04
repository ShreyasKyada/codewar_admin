import { Button } from "@mui/material";
import React from "react";
import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";
import ManageQuestionLogic from "./ManageQuestionLogic";
import QuestionCard from "../../Components/QuestionCard/QuestionCard";
import "./ManageQuestion.css";

const ManageQuestions = () => {
  const { allQuestions, mode, languageName } = ManageQuestionLogic();

  return (
    <div className="manage-question-container">
      <div className="manage-btn-conatiner">
        <Link to={`/add-question/${mode}/${languageName}`} className="links">
          <Button
            endIcon={<AddIcon className="circle-icon" />}
            variant="contained"
            className="add-question-btn"
          >
            Add question
          </Button>
        </Link>
      </div>
      <div className="manage-question-sub-container">
        {allQuestions
          ? Object.keys(allQuestions).map((id) => {
              return <QuestionCard key={id} data={allQuestions[id]} />;
            })
          : "Nothing to show"}
      </div>
    </div>
  );
};

export default ManageQuestions;
