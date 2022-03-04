import React, { useContext } from "react";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import "./AddLanguages.css";
import { Button } from "@mui/material";
import { AiOutlineCloudUpload } from "react-icons/ai";
import LanguageCard from "../../Components/LanguageCard/LanguageCard";
import { globalDataContext } from "../../Context/GlobalDataContext";
import AddLanguageLogic from "./AddLanguagesLogic";

const AddLanguages = () => {
  const {
    inputFileRef,
    fileChanged,
    newLanguage,
    img,
    fileContainerClickHandler,
    newLanguageChangeState,
    sendNewLanguageIconData,
    allLanguages,
  } = AddLanguageLogic();

  const { isLoadingState } = useContext(globalDataContext);

  return (
    <>
      <div className="admin-language-container">
        <div className="admin-language-sub-container">
          {/* <h3 className="lable">Add Language</h3> */}
          <div className="admin-language-top-container">
            <form>
              <div className="add-button-container">
                <input
                  className="add-language-textbox"
                  type="text"
                  placeholder="New Language"
                  value={newLanguage.language_name}
                  onChange={newLanguageChangeState}
                  name="language_name"
                />
                <Button
                  variant="contained"
                  color="primary"
                  className="add-language-btn"
                  endIcon={<AddCircleOutlineIcon className="add-button-icon" />}
                  onClick={sendNewLanguageIconData}
                  disabled={isLoadingState ? true : false}
                >
                  Add
                </Button>
                {/* <AddCircleOutlineIcon className="add-button" /> */}
              </div>

              <div
                className="language-file-container"
                onClick={fileContainerClickHandler}
              >
                {img ? (
                  <img className="demo-icon-img" src={img} />
                ) : (
                  <>
                    <AiOutlineCloudUpload className="cloud-icon" />
                    <p>Select language icon file </p>
                  </>
                )}
                <input
                  type="file"
                  ref={inputFileRef}
                  className="icon-file-uploader"
                  onChange={fileChanged}
                  required
                />
              </div>
            </form>
          </div>

          <div className="admin-language-list">
            {Object.keys(allLanguages).map((id) => {
              return allLanguages[id].language_name ? (
                <div key={id} className="admin-language-card-container">
                  <LanguageCard
                    iconURL={allLanguages[id].icon_path}
                    languageName={allLanguages[id].language_name}
                  />
                </div>
              ) : (
                ""
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default AddLanguages;
