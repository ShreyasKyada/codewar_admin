import { useContext, useState } from "react";
import { globalDataContext } from "../../../Context/GlobalDataContext";
import appRef from "../../../Firebase/Firebase";

const AddContestLogic = () => {
  const [addContest, setAddContest] = useState({
    contest_name: "",
    duration: "",
    starts_at: "",
    ends_at: "",
    description: "",
  });

  const { setSnackbarData, setIsLoadingState } = useContext(globalDataContext);

  const sendAddContestData = () => {
    const { contest_name, duration, starts_at, ends_at, description } =
      addContest;

    if (!contest_name || !duration || !starts_at || !ends_at || !description) {
      setSnackbarData("Fill the data first", "error");
    } else {
      setIsLoadingState(true);
      setSnackbarData("Contest added successfully", "success");
      appRef.child("contest").push(addContest, () => {
        setIsLoadingState(false);
      });
    }
  };

  const getAddContestData = (event) => {
    setAddContest({ ...addContest, [event.target.name]: event.target.value });
  };

  return {
    sendAddContestData,
    getAddContestData,
    addContest,
  };
};

export default AddContestLogic;
