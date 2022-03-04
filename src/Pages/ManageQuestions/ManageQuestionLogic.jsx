import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import appRef from "../../Firebase/Firebase";

const ManageQuestionLogic = () => {
  const { mode, languageName } = useParams();
  const [allQuestions, setAllQuestions] = useState({});

  useEffect(() => {
    let cleanUp = true;
    if (cleanUp) {
      appRef
        .child(`/${mode}_questions/${languageName}`)
        .on("value", (snapshot) => {
          setAllQuestions(snapshot.val());
        });
    }
    return () => {
      cleanUp = false;
    };
  }, [mode, languageName]);

  return {
    allQuestions,
    mode,
    languageName,
  };
};

export default ManageQuestionLogic;
