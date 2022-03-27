import React from "react";
import "./LanguageCard.css";

const LanguageCard = ({ iconURL, languageName }) => {
  return (
    <div className="language-card">
      <img src={iconURL} className="language-icon" />
      <div className="language-name">{languageName}</div>
    </div>
  );
};

export default LanguageCard;
