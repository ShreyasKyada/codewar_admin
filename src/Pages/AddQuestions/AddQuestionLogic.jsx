import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useRef, useState } from "react";
import appRef from "../../Firebase/Firebase";
import { globalDataContext } from "../../Context/GlobalDataContext";
import { authContext } from "../../Context/AuthContext";

const AddQuestionLogic = () => {
  const { mode, languageName, qid } = useParams();
  const nevigate = useNavigate();
  const { username } = useContext(authContext);
  const { setIsLoadingState, setSnackbarData, isLoadingState } =
    useContext(globalDataContext);
  const [sendDataState, setSendDataState] = useState(false);
  const [testCaseName, setTestCaseName] = useState("sample");
  const [testCaseNextNumber, setTestCaseNextNumber] = useState(0);
  const [isEditState, setIsEditState] = useState(false);
  const [testCaseData, setTestCaseData] = useState([]);
  const [testCaseNumbers, setTestCaseNumbers] = useState([]);
  const [isTextEditorLoading, setIsTextEditorLoading] = useState(true);
  const [testCaseDataBeforeInsert, setTestCaseDataBeforeInsert] = useState({
    input: "",
    output: "",
  });
  const [questionData, setQuestionData] = useState({
    author: username,
    question_heading: "",
    difficulty_level: "",
    require_skill: "",
    max_score: 0,
    question_detail_HTML: "",
    default_code: "",
    test_cases: {},
  });

  const path = `/${mode}_questions/${languageName}`;

  const getQuestionData = (event) => {
    if (!event.target) {
      setQuestionData({ ...questionData, default_code: event });
    } else {
      setQuestionData({
        ...questionData,
        [event.target.name]: event.target.value,
      });
    }
  };

  useEffect(() => {
    setIsLoadingState(true);
    if (qid) {
      setIsLoadingState(true);
      appRef.child(path + "/" + qid).on("value", (snapshot) => {
        let snap = snapshot.val();
        
        let tempArr = [];
        let count = 0;
        let tempArrData = [];
        for (
          let i = count, j = 0;
          j < snap.test_cases.sample_test_case.length;
          i++, j++, count++
        ) {
          tempArr.push({
            i: i,
            mode: "sample",
          });
          tempArrData.push(snap.test_cases.sample_test_case[j]);
        }
        if (snap.test_cases.other_test_case) {
          for (
            let i = count, j = 0;
            j < snap.test_cases.other_test_case.length;
            i++, j++
          ) {
            tempArr.push({
              i: i,
              mode: "other",
            });
            tempArrData.push(snap.test_cases.other_test_case[j]);
          }
        }

        snap = { ...snap, test_cases: "" };
        setQuestionData(snap);
        setTestCaseData(tempArrData);
        setTestCaseNumbers(tempArr);
        setTestCaseNextNumber(tempArr.length);
      });
    }
  }, [qid]);

  // data send
  useEffect(() => {
    if (questionData.test_cases.sample_test_case && sendDataState) {
      if (
        !questionData.default_code ||
        !questionData.question_heading ||
        !questionData.difficulty_level ||
        !questionData.require_skill ||
        !questionData.max_score ||
        !questionData.question_detail_HTML
      ) {
        setSnackbarData("Please fill the data first!!", "error");
        setIsLoadingState(false);
      } else if (!questionData.test_cases.sample_test_case.length > 0) {
        setSnackbarData("Need minimum 1 sample test case!!", "error");
        setIsLoadingState(false);
      } else {
        if (qid) {
          appRef.child(`${path}/${qid}`).set(questionData, () => {
            setIsLoadingState(false);
            setSnackbarData(
              `"${questionData.question_heading}" updated successfully!!`,
              "success"
            );
            nevigate(`/questions-list/${mode}/${languageName}`);
          });
        }

        if (!qid) {
          appRef.child(path).push(questionData, () => {
            setIsLoadingState(false);
            setSnackbarData(
              `"${questionData.question_heading}" added successfully!!`,
              "success"
            );
            nevigate(`/questions-list/${mode}/${languageName}`);
          });
        }
      }
    }
  }, [questionData.test_cases]);

  const getTestCaseData = () => {
    let tempObj = { sample_test_case: [], other_test_case: [] };
    for (let i = 0; i < testCaseNumbers.length; i++) {
      if (testCaseNumbers[i].mode === "sample") {
        tempObj = {
          ...tempObj,
          sample_test_case: [
            ...tempObj.sample_test_case,
            {
              input: testCaseData[i].input,
              output: testCaseData[i].output,
            },
          ],
        };
      } else if (testCaseNumbers[i].mode === "other") {
        tempObj = {
          ...tempObj,
          other_test_case: [
            ...tempObj.other_test_case,
            {
              input: testCaseData[i].input,
              output: testCaseData[i].output,
            },
          ],
        };
      }
    }
    setQuestionData({ ...questionData, test_cases: tempObj });
    setSendDataState(true);
  };

  const sendQuestionData = () => {
    getTestCaseData();
    setIsLoadingState(true);
  };

  const deleteTestCase = (index) => {
    if (testCaseNumbers.length === 1) {
      setSnackbarData("Need minimum 1 sample test case", "error");
      return;
    }
    let tempArr = testCaseNumbers;
    let tempDataArr = testCaseData;

    if (testCaseNumbers.length >= 0) {
      for (let i = index; i < testCaseNumbers.length - 1; i++) {
        tempArr[i] = tempArr[i + 1];
        tempArr[i].i = tempArr[i].i - 1;

        tempDataArr[i] = tempDataArr[i + 1];
      }
      tempArr.length = tempArr.length - 1;
      tempDataArr.length = tempDataArr.length - 1;
      setTestCaseNumbers(Object.values(tempArr));
      setTestCaseData(Object.values(tempDataArr));
    }
    if (tempArr.length === 0) {
      setSnackbarData("Need minimum 1 sample test case", "error");
      setTestCaseNumbers([
        {
          i: 0,
          mode: "sample",
        },
      ]);
    }
    setTestCaseNextNumber(testCaseNextNumber - 1);
    tempArr = [];
  };

  const editTestCase = (index) => {
    setTestCaseNextNumber(index);
    setIsEditState(true);
    setTestCaseDataBeforeInsert(testCaseData[index]);
    setTestCaseName(testCaseNumbers[index].mode);
  };

  const getTextEditorData = (event) => {
    setQuestionData({ ...questionData, question_detail_HTML: event });
  };

  const radioBtnHandleChange = (event) => {
    setTestCaseName(event.target.value);
  };

  const getTestCaseDataBedoreInsert = (event) => {
    setTestCaseDataBeforeInsert({
      ...testCaseDataBeforeInsert,
      [event.target.name]: event.target.value,
    });
  };

  const addTestCaseHTML = () => {
    if (testCaseDataBeforeInsert.output) {
      if (isEditState) {
        if (testCaseName === "sample") {
          setSnackbarData(
            `Sample test case ${testCaseNextNumber} updated!!`,
            "success"
          );
        } else {
          setSnackbarData(
            `Test case ${testCaseNextNumber} updated!!`,
            "success"
          );
        }

        let tempArr = testCaseData;
        tempArr[testCaseNextNumber] = testCaseDataBeforeInsert;
        setTestCaseData(tempArr);
        setTestCaseNumbers(testCaseNumbers);
        setTestCaseNextNumber(testCaseNumbers.length);
        setIsEditState(false);
      } else {
        if (testCaseName === "sample") {
          setSnackbarData(
            `Sample test case ${testCaseNextNumber} added!!`,
            "success"
          );
        } else {
          setSnackbarData(`Test case ${testCaseNextNumber} added!!`, "success");
        }
        setTestCaseNextNumber(testCaseNextNumber + 1);
        setTestCaseData([...testCaseData, testCaseDataBeforeInsert]);
        setTestCaseNumbers([
          ...testCaseNumbers,
          { i: testCaseNumbers.length, mode: testCaseName },
        ]);
      }
      setTestCaseDataBeforeInsert({ input: "", output: "" });
    } else {
      setSnackbarData("Please enter output field", "error");
    }
  };

  return {
    questionData,
    sendQuestionData,
    getQuestionData,
    addTestCaseHTML,
    testCaseNumbers,
    deleteTestCase,
    languageName,
    mode,
    qid,
    isTextEditorLoading,
    setIsTextEditorLoading,
    getTextEditorData,
    testCaseData,
    testCaseName,
    radioBtnHandleChange,
    testCaseDataBeforeInsert,
    getTestCaseDataBedoreInsert,
    editTestCase,
    testCaseNextNumber,
    isEditState,
    isLoadingState,
    setIsLoadingState,
  };
};

export default AddQuestionLogic;
