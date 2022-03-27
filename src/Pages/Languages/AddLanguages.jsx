import React, { useContext, useEffect } from "react";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import "./AddLanguages.css";
import { Button, Skeleton } from "@mui/material";
import { AiOutlineCloudUpload } from "react-icons/ai";
import LanguageCard from "../../Components/LanguageCard/LanguageCard";
import { globalDataContext } from "../../Context/GlobalDataContext";
import AddLanguageLogic from "./AddLanguagesLogic";
import SubHeader from "../../Components/SubHeader/SubHeader";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

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
    isSkeletonLoading,
    deleteBtnWaitingConfirmation,
  } = AddLanguageLogic();

  const { isLoadingState, setActiveTab } = useContext(globalDataContext);

  document.title = `Add language | CodeWar`;
  useEffect(() => {
    setActiveTab("Languages");
  }, []);

  return (
    <>
      <SubHeader
        subHeaderNevigationLink={{
          AddLanguage: {
            name: "Add Language",
            link: "/AddLanguage",
          },
        }}
      />
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

          {isSkeletonLoading ? (
            <div className="admin-language-list">
              <Skeleton
                animation="wave"
                variant="rectangular"
                className="admin-language-card-container"
                height={60}
              />
              <Skeleton
                animation="wave"
                variant="rectangular"
                className="admin-language-card-container"
                height={60}
              />
              <Skeleton
                animation="wave"
                variant="rectangular"
                className="admin-language-card-container"
                height={60}
              />
              <Skeleton
                animation="wave"
                variant="rectangular"
                className="admin-language-card-container"
                height={60}
              />
              <Skeleton
                animation="wave"
                variant="rectangular"
                className="admin-language-card-container"
                height={60}
              />
              <Skeleton
                animation="wave"
                variant="rectangular"
                className="admin-language-card-container"
                height={60}
              />
            </div>
          ) : (
            <div className="admin-language-list">
              {allLanguages ? (
                Object.keys(allLanguages).map((id) => {
                  return (
                    allLanguages[id].language_name && (
                      <div
                        key={id}
                        className="admin-language-card-container"
                        id={`${id}`}
                      >
                        <LanguageCard
                          iconURL={allLanguages[id].icon_path}
                          languageName={allLanguages[id].language_name}
                        />
                        <DeleteOutlineIcon
                          className="language-card-delete-btn"
                          onClick={() =>
                            deleteBtnWaitingConfirmation(
                              id,
                              allLanguages[id].language_name
                            )
                          }
                        />
                      </div>
                    )
                  );
                })
              ) : (
                <h5 style={{ textAlign: "center", width: "100%" }}>
                  Nothing to show
                </h5>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AddLanguages;
