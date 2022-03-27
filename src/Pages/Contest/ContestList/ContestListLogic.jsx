import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { globalDataContext } from "../../../Context/GlobalDataContext";
import appRef from "../../../Firebase/Firebase";

const ContestListLogic = () => {
  const [isSkeletonLoading, setIsSkeletonLoading] = useState(true);
  const {
    setIsLoadingState,
    setOpenAlertBox,
    setAlertBoxText,
    isConfirmDeletionState,
    setSnackbarData,
    setIsConfirmDeletionState,
  } = useContext(globalDataContext);
  const navigate = useNavigate();
  const [deleteContestID, setDeleteContestID] = useState([]);
  const [activeContestList, setActiveContestList] = useState({});
  const [archiveContestList, setArchiveContestList] = useState({});

  useEffect(() => {
    setIsLoadingState(true);
    let cleanUp = true;

    if (cleanUp) {
      appRef
        .child("contest")
        .orderByChild("isActiveState")
        .equalTo(true)
        .on("value", (snap) => {
          if (cleanUp) setActiveContestList(snap.val());
          setIsSkeletonLoading(false);
          setIsLoadingState(false);
        });
      appRef
        .child("contest")
        .orderByChild("isActiveState")
        .equalTo(false)
        .on("value", (snap) => {
          if (cleanUp) setArchiveContestList(snap.val());
          setIsSkeletonLoading(false);
          setIsLoadingState(false);
        });
    }

    return () => (cleanUp = false);
  }, []);

  useEffect(async () => {
    if (deleteContestID[0] && isConfirmDeletionState) {
      setIsLoadingState(true);

      await appRef.child(`contest/${deleteContestID[0]}`).remove();
      await appRef
        .child(`contest_questions/${deleteContestID[1]}`)
        .remove(() => {
          setSnackbarData(`"${deleteContestID[1]}" deleted!!!`, "success");
          setIsLoadingState(false);
          setIsConfirmDeletionState(false);
        });
    }
  }, [isConfirmDeletionState]);

  const deleteContest = (id, contest_name) => {
    setDeleteContestID([id, contest_name]);
    setOpenAlertBox(true);
    setAlertBoxText({
      heading: `Are you sure want to delete "${contest_name}"`,
      body: "Once you deleted the contest then it will permanently deleted all questions related to this contest will be also delete. so be careful.!!",
    });
  };

  const editContest = (id) => {
    navigate(`/contest/${id}`);
  };

  return {
    deleteContest,
    editContest,
    isSkeletonLoading,
    activeContestList,
    archiveContestList,
  };
};

export default ContestListLogic;
