import React from "react";
// import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import "./QuestionCard.css";

const QuestionCard = ({ data }) => {
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
          <Button variant="outlined" className="btn-play" color="primary">
            Play With Friend
          </Button>
          <Button variant="outlined" className="button-problem" color="primary">
            Solve Problem
          </Button>
        </section>
      </div>
    </>
  );
};

export default QuestionCard;
