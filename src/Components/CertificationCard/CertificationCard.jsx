import { Box, Button } from "@mui/material";
import React from "react";
import "./CertificationCard.css";

const CertificationCard = ({ certificateIcon, skillTitle }) => {
  return (
    <Box className="certification-card">
      <img className="certificate-icon" src={certificateIcon} />
      <p className="skill-title">{skillTitle}</p>
      <Button variant="outlined" className="certification-btn" color="primary">
        Manage questions
      </Button>
    </Box>
  );
};

export default CertificationCard;
