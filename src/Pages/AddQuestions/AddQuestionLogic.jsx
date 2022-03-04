import { useNavigate, useParams } from "react-router-dom";
import { EditorState, convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
import { useContext, useEffect, useState } from "react";
import appRef from "../../Firebase/Firebase";
import { globalDataContext } from "../../Context/GlobalDataContext";

const AddQuestionLogic = () => {
  const { setIsLoadingState, setSnackbarData } = useContext(globalDataContext);
  const { mode, languageName } = useParams();
  const nevigate = useNavigate();

  // this path is depends on mode like language,contest, certificate
  const path = `/${mode}_questions/${languageName}`;

  const [editorstate, setEditorState] = useState(EditorState.createEmpty());
  const [questionData, setQuestionData] = useState({
    question_heading: "",
    difficulty_level: "",
    require_skill: "",
    max_score: 0,
    question_detail_HTML: "",
    default_code: "",
    test_case_0: {
      input: "",
      output: "",
    },
  });

  const getQuestionData = ({ target }) => {
    if (target.name === "input" || target.name === "output") {
      setQuestionData({
        ...questionData,
        [target.parentElement.parentElement.parentElement.attributes.name
          .value]: {
          [target.name]: target.value,
        },
      });
    } else {
      setQuestionData({ ...questionData, [target.name]: target.value });
    }
  };

  const editorDataConvertToHTML = () => {
    // setHTMLData(draftToHtml(convertToRaw(editorstate.getCurrentContent())));
    setQuestionData({
      ...questionData,
      question_detail_HTML: draftToHtml(
        convertToRaw(editorstate.getCurrentContent())
      ),
    });
  };

  useEffect(() => {
    if (questionData.question_detail_HTML) {
      appRef.child(path).push(questionData, () => {
        setIsLoadingState(false);
        nevigate(`/questions-list/${mode}/${languageName}`);
      });
    }
  }, [questionData.question_detail_HTML]);

  const sendQuestionData = async () => {
    // it will send all the questions data in url language
    /* steps:
            1. Convert text editor data to html format
            2. strore the html data in given questionData.question_detail_HTML
            3. send questionData to database according to url language
                - this step done by useEffect..
      */
    setIsLoadingState(true);
    editorDataConvertToHTML();
  };

  const handleEditorChange = (editorData) => {
    setEditorState(editorData);
  };

  return {
    questionData,
    editorstate,
    sendQuestionData,
    getQuestionData,
    handleEditorChange,
  };
};

export default AddQuestionLogic;
