import React from "react";
import "./QuestionCard.css";
import DeleteIcon from "@mui/icons-material/Delete";
import Edit from "@mui/icons-material/Edit";

const QuestionCard = ({ data, deleteQuestion, editQuestion }) => {
  return (
    <>
      <div className="challenge-card-container">
        <section className="card-left-container">
          <p className="challenge-card-heading">{data.question_heading}</p>
          <p className="challenge-card-other">
            {data.difficulty_level}
            {",   "}
            {data.require_skill}
            {", Max score: "}
            {data.max_score}
          </p>
        </section>
        <section className="card-right-container">
          <DeleteIcon
            className="question-card-delete-icon"
            onClick={deleteQuestion}
          />
          <Edit className="question-card-edit-icon" onClick={editQuestion} />
        </section>
      </div>
    </>
  );
};

export default QuestionCard;
