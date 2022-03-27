import React, { useContext, useEffect, useRef } from "react";
import {
  Box,
  MenuItem,
  TextField,
  Button,
  Skeleton,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import "./AddQuestion.css";
import AddQuestionLogic from "./AddQuestionLogic";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import SubHeader from "../../Components/SubHeader/SubHeader";
import { globalDataContext } from "../../Context/GlobalDataContext";
import AceEditor from "react-ace";
import { Editor } from "@tinymce/tinymce-react";
import AddBoxIcon from "@mui/icons-material/AddBox";
import EditIcon from "@mui/icons-material/Edit";

import "ace-builds/src-noconflict/theme-vibrant_ink";

import "ace-builds/src-noconflict/mode-c_cpp";

const AddQuestion = () => {
  const {
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
  } = AddQuestionLogic();
  const { setActiveTab } = useContext(globalDataContext);

  if(qid) 
    document.title = `Edit question | CodeWar`;
  else document.title = `Add question | CodeWar`;

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
            Certificate: {
              name: "Certificate",
              link: "/addcertificate",
            },
            certiLang: {
              name: languageName,
              link: `/questions-list/certificate/${languageName}`,
            },
            AddQuestions: {
              name: `Add certificate question ( ${languageName} )`,
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
              link: `/questions-list/languages/${languageName}`,
            },
            Questions_1: {
              name: languageName,
              link: `/questions-list/languages/${languageName}`,
            },
            AddQuestions: {
              name: `Add question ( ${languageName} )`,
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
              link: `/questions-list/contest/${languageName}`,
            },
            AddQuestions: {
              name: `Add question ( ${languageName} )`,
              link: "",
            },
          }}
        />
      )}

      <div className="add-question-container">
        <div className="add-question-sub-container">
          <div className="add-question-heading">
            <TextField
              id="outlined-helperText"
              label="Question heading"
              name="question_heading"
              className="textbox heading-textbox"
              value={questionData.question_heading}
              onChange={getQuestionData}
            />

            <Box className="difficulty-level">
              <TextField
                id="outlined-select-currency"
                select
                fullWidth={true}
                label="difficulty level"
                value={questionData.difficulty_level}
                name="difficulty_level"
                onChange={getQuestionData}
                className="textbox"
              >
                <MenuItem className="level-menu-item" value={"Easy"}>
                  Easy
                </MenuItem>
                <MenuItem className="level-menu-item" value={"Medium"}>
                  Medium
                </MenuItem>
                <MenuItem className="level-menu-item" value={"Hard"}>
                  Hard
                </MenuItem>
              </TextField>
            </Box>
          </div>

          <div className="add-question-score-skill">
            <TextField
              id="outlined-helperText"
              label="Require skill"
              className="textbox require-skill"
              name="require_skill"
              value={questionData.require_skill}
              onChange={getQuestionData}
            />
            <TextField
              id="outlined-helperText"
              label="Max score"
              className="textbox max-score-textbox"
              name="max_score"
              value={questionData.max_score}
              onChange={getQuestionData}
            />
          </div>
          {isTextEditorLoading && (
            <Skeleton
              animation="wave"
              variant="rectangular"
              className="editor-container editor-skeleton"
              height={400}
            />
          )}
          <div className="editor-container" id="text-ditor">
            <Editor
              value={questionData.question_detail_HTML}
              className="text-editor"
              selector="textarea"
              init={{
                setup: function (editor) {
                  editor.on("init", () => {
                    setIsLoadingState(false);
                    document
                      .getElementById("text-ditor")
                      .setAttribute(
                        "style",
                        "border: 2px solid var(--glass-border-color); box-shadow: 0 0 15px var(--box-shadow); height: auto; width: 100%"
                      );

                    const head = document.getElementsByClassName(
                      "tox-edit-area__iframe"
                    )[0].contentWindow.document.head;

                    head.insertAdjacentHTML(
                      "beforeend",
                      `<style>::-webkit-scrollbar {
                      
                      width: 7.5px;
                      background-color: #1e1e1e;
                      border-radius: 10px;
                    }
                    
                    ::-webkit-scrollbar-thumb {
                      background-color: rgb(99, 99, 99);
                      border-radius: 10px;
                    }</style>`
                    );

                    document
                      .getElementsByClassName("tox-edit-area__iframe")[0]
                      .contentWindow.document.body.setAttribute(
                        "style",
                        "color: white !important;"
                      );
                    setIsTextEditorLoading(false);
                  });
                },

                height: 600,
                menubar: true,
                plugins: [
                  "advlist autolink lists link image",
                  "charmap print preview anchor help",
                  "searchreplace visualblocks code",
                  "insertdatetime media paste wordcount",
                  "fullscreen",
                  "code",
                  "image",
                  "advlist",
                ],
                toolbar:
                  "undo redo | formatselect | fontsizeselect | bold italic \
                   alignleft aligncenter alignright | \
                   bullist numlist | outdent indent | help | fullscreen | code | image",
              }}
              onEditorChange={getTextEditorData}
            />
          </div>

          <div className="default-code-container">
            <AceEditor
              mode="c_cpp"
              theme="vibrant_ink"
              width="100%"
              name="defailt-code-editor"
              editorProps={{ $blockScrolling: true }}
              className="default-code-textarea"
              value={questionData.default_code}
              onChange={getQuestionData}
              setOptions={{
                fontSize: 18,
                highlightActiveLine: false,
                selectionStyle: "text",
                highlightSelectedWord: false,
                highlightGutterLine: false,
                showGutter: true,
              }}
            />
          </div>

          <div className="test-case-container">
            <p className="test-case-label">Test cases</p>
            <div className="add-test-case-btn-container">
              <FormControl className="form-control">
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue="female"
                  name="radio-buttons-group"
                  className="radio-grp"
                  value={testCaseName}
                  onChange={radioBtnHandleChange}
                >
                  <FormControlLabel
                    value="sample"
                    control={<Radio />}
                    className="sample-test-radio-btn"
                    label="Sample test case"
                  />
                  <FormControlLabel
                    value="other"
                    control={<Radio />}
                    label="Test case"
                    className="sample-test-radio-btn"
                  />
                </RadioGroup>
              </FormControl>
            </div>
            <div className="test-case-container" name="shreyas">
              <p className="test-case-label">
                {isEditState &&
                  (testCaseName === "sample"
                    ? `Sample test case : ${testCaseNextNumber} (Update)`
                    : `Test case : ${testCaseNextNumber} (Update)`)}
                {!isEditState &&
                  (testCaseName === "sample"
                    ? `Sample test case : ${testCaseNextNumber}`
                    : `Test case : ${testCaseNextNumber}`)}
              </p>
              <AddBoxIcon
                className="test-case-add-icon"
                onClick={() => addTestCaseHTML()}
              />

              <TextField
                id="scroll-id"
                label="Input"
                className="textbox test-case-input-textbox"
                name="input"
                onChange={getTestCaseDataBedoreInsert}
                value={testCaseDataBeforeInsert.input}
              />
              <TextField
                id="outlined-helperText"
                label="Output"
                className="textbox test-case-output-textbox"
                name="output"
                value={testCaseDataBeforeInsert.output}
                onChange={getTestCaseDataBedoreInsert}
              />
            </div>

            {testCaseNumbers[0] && (
              <section id="test-Cases-id">
                {testCaseNumbers[0] &&
                  testCaseNumbers
                    .map((index, arrIndex) => {
                      return (
                        <div
                          className="test-case-container"
                          key={Math.random()}
                          name={
                            index.mode === "sample"
                              ? `sample_test_case_${index.i}`
                              : `other_test_case_${index.i}`
                          }
                        >
                          <p className="test-case-label">
                            {index.mode === "sample"
                              ? "Sample test case"
                              : "Test case"}{" "}
                            : {index.i}
                          </p>
                          <DeleteOutlineIcon
                            onClick={() => deleteTestCase(arrIndex)}
                            className="test-case-delete-icon"
                          />

                          <EditIcon
                            className="test-case-delete-icon test-case-edit-icon"
                            onClick={() => editTestCase(arrIndex)}
                          />

                          <TextField
                            id="outlined-helperText"
                            label="Input"
                            className="textbox test-case-input-textbox"
                            name="input"
                            value={testCaseData[arrIndex].input}
                            disabled
                          />
                          <TextField
                            id="outlined-helperText"
                            label="Output"
                            className="textbox test-case-output-textbox"
                            name="output"
                            value={testCaseData[arrIndex].output}
                            disabled
                          />
                        </div>
                      );
                    })
                    .reverse()}
              </section>
            )}
          </div>
          {isLoadingState ? (
            <Button variant="outlined" className="add-question-btn" disabled>
              {qid ? "Update question" : "Add question"}
            </Button>
          ) : (
            <Button
              variant="outlined"
              className="add-question-btn"
              onClick={sendQuestionData}
            >
              {qid ? "Update question" : "Add question"}
            </Button>
          )}
        </div>
      </div>
    </>
  );
};

export default AddQuestion;
