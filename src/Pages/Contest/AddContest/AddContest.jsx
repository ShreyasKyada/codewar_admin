import React from "react";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

import "./AddContest.css";
import AddContestLogic from "./AddContestLogic";

const AddContest = () => {
  const { sendAddContestData, getAddContestData, addContest } =
    AddContestLogic();

  return (
    <>
      <div className="add-contest-container">
        <div className="add-contest-sub-container">
          <div className="contest-heading-container">
            <TextField
              id="outlined-helperText"
              label="Contest Name"
              name="contest_name"
              onChange={getAddContestData}
              value={addContest.contest_name}
              className="contest-name-textbox"
            />
            <TextField
              id="outlined-helperText"
              label="Competition Duration"
              name="duration"
              className="duration-textbox"
              onChange={getAddContestData}
              value={addContest.duration}
            />
          </div>
          <div className="add-contest-time">
            <TextField
              id="outlined-helperText"
              label="Starts at"
              name="starts_at"
              onChange={getAddContestData}
              value={addContest.starts_at}
              className="contest-start-at"
            />
            <TextField
              id="outlined-helperText"
              label="Ends at"
              name="ends_at"
              onChange={getAddContestData}
              value={addContest.ends_at}
              className="contest-end-at"
            />
          </div>

          <div className="add-contest-description">
            <textarea
              className="contest-description-textarea"
              name="description"
              placeholder="Contest Description"
              onChange={getAddContestData}
              value={addContest.description}
            />
          </div>
          <Stack className="add-contest-button">
            <Button onClick={sendAddContestData} variant="contained">
              Insert
            </Button>
          </Stack>
        </div>
      </div>
    </>
  );
};

export default AddContest;
