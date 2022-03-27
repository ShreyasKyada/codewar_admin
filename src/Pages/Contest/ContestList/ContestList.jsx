import React, { useContext, useEffect } from "react";
import ContestCard from "../../../Components/ContestCard/ContestCard";
import "./ContestList.css";
import { Button, Skeleton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";
import ContestListLogic from "./ContestListLogic";
import { globalDataContext } from "../../../Context/GlobalDataContext";
import SubHeader from "../../../Components/SubHeader/SubHeader";

const ContestList = () => {
  const {
    deleteContest,
    editContest,
    isSkeletonLoading,
    activeContestList,
    archiveContestList,
  } = ContestListLogic();
  const { setActiveTab } = useContext(globalDataContext);
  
  document.title = `All contest | CodeWar`

  useEffect(() => {
    setActiveTab("Contest");
  }, []);

  return (
    <>
      <SubHeader
        subHeaderNevigationLink={{
          Contest: {
            name: "Contest",
            link: "",
          },
        }}
      />
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
      {isSkeletonLoading ? (
        <div className="contest-list-card-container">
          <h1 className="contest-heading">Active Contest</h1>
          <Skeleton
            animation="wave"
            variant="rectangular"
            className="contest-card-container-skeleton"
            height={100}
          />
          <Skeleton
            animation="wave"
            variant="rectangular"
            className="contest-card-container-skeleton"
            height={100}
          />
          <h1 className="contest-heading">Archived Contest</h1>
          <Skeleton
            animation="wave"
            variant="rectangular"
            className="contest-card-container-skeleton"
            height={100}
          />
          <Skeleton
            animation="wave"
            variant="rectangular"
            className="contest-card-container-skeleton"
            height={100}
          />
        </div>
      ) : (
        <div className="contest-list-card-container">
          <h1 className="contest-heading">Active Contest</h1>
          {activeContestList ? (
            Object.keys(activeContestList)
              .map((id) => {
                return (
                  <ContestCard
                    key={id}
                    data={activeContestList[id]}
                    deleteContest={() =>
                      deleteContest(id, activeContestList[id].contest_name)
                    }
                    editContest={() => editContest(id)}
                  />
                );
              })
              .reverse()
          ) : (
            <h4 style={{ textAlign: "center", color: "var(--text-color)" }}>
              No active contest.
            </h4>
          )}

          <h1 className="contest-heading">Archived Contest</h1>
          {archiveContestList ? (
            Object.keys(archiveContestList)
              .map((id) => {
                return (
                  <ContestCard
                    key={id}
                    data={archiveContestList[id]}
                    deleteContest={() =>
                      deleteContest(id, archiveContestList[id].contest_name)
                    }
                    editContest={() => editContest(id)}
                  />
                );
              })
              .reverse()
          ) : (
            <h4 style={{ textAlign: "center", color: "var(--text-color)" }}>
              No archived contest.
            </h4>
          )}
        </div>
      )}
    </>
  );
};

export default ContestList;
