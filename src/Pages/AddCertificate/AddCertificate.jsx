import { Button, Skeleton } from "@mui/material";
import { AiOutlineCloudUpload } from "react-icons/ai";
import React, { useContext, useEffect } from "react";
import AddCertificateLogic from "./AddCertificateLogic";
import { globalDataContext } from "../../Context/GlobalDataContext";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CertificationCard from "../../Components/CertificationCard/CertificationCard";
import "./AddCertificate.css";
import SubHeader from "../../Components/SubHeader/SubHeader";

const AddCertificate = () => {
  const {
    inputFileRef,
    fileChanged,
    newCertificate,
    img,
    fileContainerClickHandler,
    newCertificateStateChange,
    sendNewCertificateData,
    allCertificate,
    isSkeletonLoading,
    manageQuestions,
    deleteCertificate,
  } = AddCertificateLogic();
  document.title = `Certificate | CodeWar`;

  const { isLoadingState, setActiveTab } = useContext(globalDataContext);

  useEffect(() => {
    setActiveTab("Certificate");
  }, []);

  return (
    <>
      <SubHeader
        subHeaderNevigationLink={{
          Certificate: {
            name: "Add Certificate",
            link: "",
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
                  placeholder="Add new certification course"
                  value={newCertificate.certificate_name}
                  onChange={newCertificateStateChange}
                  name="certificate_name"
                />
                <Button
                  variant="contained"
                  color="primary"
                  className="add-language-btn"
                  endIcon={<AddCircleOutlineIcon className="add-button-icon" />}
                  onClick={sendNewCertificateData}
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
                    <p>Select certificate icon file</p>
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
            <div className="admin-certificate-list">
              <Skeleton
                animation="wave"
                variant="rectangular"
                className="admin-certificate-card-container"
                height={155}
              />
              <Skeleton
                animation="wave"
                variant="rectangular"
                className="admin-certificate-card-container"
                height={155}
              />
              <Skeleton
                animation="wave"
                variant="rectangular"
                className="admin-certificate-card-container"
                height={155}
              />
            </div>
          ) : (
            <div className="admin-certificate-list">
              {allCertificate ? (
                Object.keys(allCertificate)
                  .map((id) => {
                    return (
                      <div
                        className="admin-certificate-card-container"
                        key={id}
                      >
                        <CertificationCard
                          certificateIcon={
                            allCertificate[id].certificate_icon_path
                          }
                          skillTitle={allCertificate[id].certificate_name}
                          manageQuestions={() =>
                            manageQuestions(allCertificate[id].certificate_name)
                          }
                          deleteCertificate={() =>
                            deleteCertificate(
                              id,
                              allCertificate[id].certificate_name
                            )
                          }
                        />
                      </div>
                    );
                  })
                  .reverse()
              ) : (
                <h5 style={{ textAlign: "center", color: "var(--text-color)" }}>
                  Please enter certificate!!
                </h5>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AddCertificate;
