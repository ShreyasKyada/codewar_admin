import { useState, useEffect } from "react";
import appRef from "../../../Firebase/Firebase";

const ContestListLogic = () => {
  const [contestList, setContestList] = useState({});
  useEffect(() => {
    appRef.child("contest").on("value", (snap) => {
      setContestList(snap.val());
      console.log(snap.val());
    });
  }, []);

  return {
    contestList,
  };
};

export default ContestListLogic;
