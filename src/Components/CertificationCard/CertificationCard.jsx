import { Box, Button } from "@mui/material";
import React from "react";
import { MdDelete } from "react-icons/md";
import "./CertificationCard.css";

const CertificationCard = ({
  certificateIcon,
  skillTitle,
  deleteCertificate,
  manageQuestions,
}) => {
  return (
    <Box className="certification-card">
      <img className="certificate-icon" src={certificateIcon} />
      <p className="skill-title">{skillTitle}</p>
      <Button
        variant="outlined"
        className="certification-btn"
        color="primary"
        onClick={manageQuestions}
      >
        Manage questions
      </Button>
      <MdDelete
        className="certificate-card-icons"
        onClick={deleteCertificate}
      />
    </Box>
  );
};

export default CertificationCard;
