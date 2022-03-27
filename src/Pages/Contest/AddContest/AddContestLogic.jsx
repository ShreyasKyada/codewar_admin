import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { globalDataContext } from "../../../Context/GlobalDataContext";
import appRef from "../../../Firebase/Firebase";

const AddContestLogic = () => {
  const [addContest, setAddContest] = useState({
    contest_name: "",
    duration: "",
    starts_at: "",
    ends_at: "",
    description: "",
    contest_type: "",
    isActiveState: true,
  });

  const { setSnackbarData, setIsLoadingState, isLoadingState } =
    useContext(globalDataContext);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    // get data for update contest
    let cleanUp = true;
    if (id && cleanUp) {
      setIsLoadingState(true);
      appRef.child(`/contest/${id}`).on("value", (snapshot) => {
        if(cleanUp){
          setAddContest(snapshot.val());
        }
        setIsLoadingState(false);
      });
    }
    return () => cleanUp = false;
  }, [id]);

  const sendAddContestData = () => {
    const {
      contest_name,
      duration,
      starts_at,
      ends_at,
      contest_type,
      description,
      isActiveState,
    } = addContest;

    if (
      !contest_name ||
      !duration ||
      !starts_at ||
      !ends_at ||
      !contest_type ||
      !description
    ) {
      setSnackbarData("Fill the data first", "error");
    } else {
      if (id) {
        setIsLoadingState(true);
        appRef.child(`contest/${id}`).set(addContest, () => {
          setIsLoadingState(false);
          setSnackbarData("Contest updated successfully!!", "success");
          navigate(-1);
        });
      } else {
        if (!isActiveState) {
          setSnackbarData("Contest must be in active state", "error");
        } else {
          setIsLoadingState(true);
          appRef.child("contest").push(addContest, () => {
            setIsLoadingState(false);
            setSnackbarData("Contest added successfully!!", "success");
            navigate(-1);
          });
        }
      }
    }
  };

  const getAddContestData = (event) => {
    // checked
    if (event.target.name === "isActiveState") {
      setAddContest({
        ...addContest,
        [event.target.name]: event.target.checked,
      });
    } else {
      setAddContest({ ...addContest, [event.target.name]: event.target.value });
    }
  };

  return {
    sendAddContestData,
    getAddContestData,
    addContest,
    isLoadingState,
    id,
  };
};

export default AddContestLogic;
