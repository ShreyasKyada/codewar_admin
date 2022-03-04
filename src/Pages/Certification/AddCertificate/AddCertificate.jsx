import { Button } from "@mui/material";
import { AiOutlineCloudUpload } from "react-icons/ai";
import React, { useContext } from "react";
import AddCertificateLogic from "./AddCertificateLogic";
import { globalDataContext } from "../../../Context/GlobalDataContext";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CertificationCard from "../../../Components/CertificationCard/CertificationCard";
import "./AddCertificate.css";
import { Link } from "react-router-dom";

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
  } = AddCertificateLogic();
  const { isLoadingState } = useContext(globalDataContext);

  return (
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

        <div className="admin-certificate-list">
          {Object.keys(allCertificate).map((id) => {
            return allCertificate[id].certificate_name ? (
              <Link
                key={id}
                to={`/questions-list/certificate/${allCertificate[id].certificate_name}`}
                className="links"
              >
                <div className="admin-certificate-card-container">
                  <CertificationCard
                    certificateIcon={allCertificate[id].certificate_icon_path}
                    skillTitle={allCertificate[id].certificate_name}
                  />
                </div>
              </Link>
            ) : (
              ""
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AddCertificate;
