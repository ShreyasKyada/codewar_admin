import React from "react";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Box, MenuItem, TextField, Button } from "@mui/material";
import "./AddQuestion.css";
import AddQuestionLogic from "./AddQuestionLogic";

const AddQuestion = () => {
  const {
    questionData,
    editorstate,
    sendQuestionData,
    getQuestionData,
    handleEditorChange,
  } = AddQuestionLogic();

  return (
    <>
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
          <div className="editor-container">
            <Editor
              editorstate={editorstate}
              onEditorStateChange={handleEditorChange}
              editorClassName="editor-class"
              toolbarClassName="toolbar-class"
              toolbar={{
                options: [
                  "inline",
                  "blockType",
                  "fontSize",
                  "fontFamily",
                  "list",
                  "textAlign",
                  "colorPicker",
                  "link",
                  "embedded",
                  "remove",
                  "history",
                ],
                inline: { inDropdown: true },
                list: { inDropdown: true },
                link: { inDropdown: true },
              }}
            />
          </div>

          <div className="default-code-container">
            <textarea
              className="default-code-textarea"
              placeholder="Enter Default code"
              name="default_code"
              value={questionData.default_code}
              onChange={getQuestionData}
            />
          </div>
          <div className="test-case-container" name="test_case_0">
            <p className="test-case-label">Test case: 0</p>
            <TextField
              id="outlined-helperText"
              label="Input"
              className="textbox test-case-input-textbox"
              name="input"
              // value={questionData.test_case_0.input ? questionData.test_case_0.input :"" }
              onChange={getQuestionData}
            />
            <TextField
              id="outlined-helperText"
              label="Output"
              className="textbox test-case-output-textbox"
              name="output"
              // value={questionData.test_case_0.output ? questionData.test_case_0.output :"" }
              onChange={getQuestionData}
            />
          </div>
          <Button
            variant="outlined"
            className="add-question-btn"
            onClick={sendQuestionData}
          >
            Add question
          </Button>
        </div>
      </div>
    </>
  );
};

export default AddQuestion;
