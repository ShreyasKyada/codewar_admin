import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { globalDataContext } from "../../Context/GlobalDataContext";
import appRef from "../../Firebase/Firebase";

const ManageQuestionLogic = () => {
  const { mode, languageName } = useParams();
  const [allQuestions, setAllQuestions] = useState({});
  const {
    setIsLoadingState,
    setOpenAlertBox,
    setAlertBoxText,
    isConfirmDeletionState,
    setSnackbarData,
    setIsConfirmDeletionState,
  } = useContext(globalDataContext);
  const [isSkeletonLoading, setIsSkeletonLoading] = useState(true);
  const [deleteLanguageID, setDeleteLanguageID] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    let cleanUp = true;
    if (cleanUp) {
      setIsSkeletonLoading(true);
      appRef
        .child(`/${mode}_questions/${languageName}`)
        .on("value", (snapshot) => {
          if (cleanUp) {
            setAllQuestions(snapshot.val());
            setIsSkeletonLoading(false);
          }
        });
    }
    return () => {
      cleanUp = false;
    };
  }, [mode, languageName]);

  useEffect(() => {
    if (deleteLanguageID[0] && isConfirmDeletionState) {
      setIsLoadingState(true);
      appRef
        .child(`/${mode}_questions/${languageName}/${deleteLanguageID[0]}`)
        .remove(() => {
          setSnackbarData(`"${deleteLanguageID[1]}" deleted!!!`, "success");
          setIsLoadingState(false);
          setIsConfirmDeletionState(false);
        });
    }
  }, [isConfirmDeletionState]);

  const deleteQuestion = (id, question_heading) => {
    setDeleteLanguageID([id, question_heading]);
    setOpenAlertBox(true);
    setAlertBoxText({
      heading: `Are you sure want to delete "${question_heading}"`,
      body: "Once you deleted the question then it will permanently deleted. so be careful.!!",
    });
  };

  const editQuestion = (id) => {
    navigate(`/add-question/${mode}/${languageName}/${id}`);
  };

  return {
    allQuestions,
    mode,
    languageName,
    deleteQuestion,
    editQuestion,
    isSkeletonLoading,
  };
};

export default ManageQuestionLogic;
