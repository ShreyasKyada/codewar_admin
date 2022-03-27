import React from "react";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

import "./AddContest.css";
import AddContestLogic from "./AddContestLogic";
import SubHeader from "../../../Components/SubHeader/SubHeader";
import { FormControlLabel, FormGroup, Switch } from "@mui/material";

const AddContest = () => {
  const {
    sendAddContestData,
    getAddContestData,
    addContest,
    isLoadingState,
    id,
  } = AddContestLogic();

  if (id) document.title = `Edit contest | CodeWar`;
  else document.title = `Add contest | CodeWar`;

  return (
    <>
      <SubHeader
        subHeaderNevigationLink={{
          Contest: {
            name: "Contest",
            link: "/contest",
          },
          AddContest: {
            name: id ? `${addContest.contest_name} (Update)` : "Add Contest",
            link: "",
          },
        }}
      />
      <div className="add-contest-container">
        <div className="add-contest-sub-container">
          <FormGroup className="switch-formgrp">
            <FormControlLabel
              control={<Switch checked={addContest.isActiveState} />}
              label="Active"
              className="formgrp-label"
              name="isActiveState"
              onChange={getAddContestData}
            />
          </FormGroup>
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
              label="Starts at (DD / MM / YYYY)"
              name="starts_at"
              onChange={getAddContestData}
              value={addContest.starts_at}
              className="contest-start-at"
            />
            <TextField
              id="outlined-helperText"
              label="Ends at (DD / MM / YYYY)"
              name="ends_at"
              onChange={getAddContestData}
              value={addContest.ends_at}
              className="contest-end-at"
            />
          </div>
          <div className="add-contest-time">
            <TextField
              id="outlined-helperText"
              label="Contest type"
              name="contest_type"
              onChange={getAddContestData}
              value={addContest.contest_type}
              className="contest-type"
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
            <Button
              onClick={sendAddContestData}
              variant="contained"
              disabled={isLoadingState ? true : false}
            >
              {id ? "Update" : "Insert"}
            </Button>
          </Stack>
        </div>
      </div>
    </>
  );
};

export default AddContest;
