import { Button, Skeleton } from "@mui/material";
import React, { useContext, useEffect } from "react";
import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";
import ManageQuestionLogic from "./ManageQuestionLogic";
import QuestionCard from "../../Components/QuestionCard/QuestionCard";
import "./ManageQuestion.css";
import { globalDataContext } from "../../Context/GlobalDataContext";
import SubHeader from "../../Components/SubHeader/SubHeader";

const ManageQuestions = () => {
  const {
    allQuestions,
    mode,
    languageName,
    deleteQuestion,
    editQuestion,
    isSkeletonLoading,
  } = ManageQuestionLogic();
  const { setActiveTab } = useContext(globalDataContext);

  document.title = `${languageName} questions | CodeWar`;

  useEffect(() => {
    if (mode === "certificate") setActiveTab("Certificate");
    else if (mode === "contest") setActiveTab("Contest");
    else setActiveTab(`Question/${languageName}`);
  }, [languageName]);

  return (
    <>
      {mode === "certificate" && (
        <SubHeader
          subHeaderNevigationLink={{
            Questions: {
              name: "Certificate",
              link: "/addcertificate",
            },
            Questions_1: {
              name: languageName,
              link: "",
            },
          }}
        />
      )}
      {mode === "languages" && (
        <SubHeader
          subHeaderNevigationLink={{
            Questions: {
              name: "Questions",
              link: "",
            },
            Questions_1: {
              name: languageName,
              link: "",
            },
          }}
        />
      )}
      {mode === "contest" && (
        <SubHeader
          subHeaderNevigationLink={{
            Questions: {
              name: "Contest",
              link: "/contest",
            },
            Questions_1: {
              name: languageName,
              link: "",
            },
          }}
        />
      )}

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
        {isSkeletonLoading ? (
          <div className="manage-question-sub-container">
            <Skeleton
              animation="wave"
              variant="rectangular"
              className="challenge-card-container-skeleton"
              height={110}
            />
            <Skeleton
              animation="wave"
              variant="rectangular"
              className="challenge-card-container-skeleton"
              height={110}
            />
            <Skeleton
              animation="wave"
              variant="rectangular"
              className="challenge-card-container-skeleton"
              height={110}
            />
            <Skeleton
              animation="wave"
              variant="rectangular"
              className="challenge-card-container-skeleton"
              height={110}
            />
          </div>
        ) : (
          <div className="manage-question-sub-container">
            {allQuestions && !isSkeletonLoading ? (
              Object.keys(allQuestions)
                .map((id) => {
                  return (
                    <QuestionCard
                      key={id}
                      data={allQuestions[id]}
                      deleteQuestion={() =>
                        deleteQuestion(id, allQuestions[id].question_heading)
                      }
                      editQuestion={() => editQuestion(id)}
                    />
                  );
                })
                .reverse()
            ) : (
              <h3 style={{ textAlign: "center", color: "var(--text-color)" }}>
                Nothing to show :-){" "}
              </h3>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default ManageQuestions;
