import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useContext, useEffect, useRef, useState } from "react";
import { globalDataContext } from "../../../Context/GlobalDataContext";
import appRef, { storage } from "../../../Firebase/Firebase";

const AddCertificateLogic = () => {
  const inputFileRef = useRef();
  const { setIsLoadingState, setSnackbarData } = useContext(globalDataContext);
  const [img, setImg] = useState();
  const [allCertificate, setAllCertificate] = useState({});
  const [newCertificate, setNewCertificate] = useState({
    certificate_name: "",
    certificate_icon_path: "",
  });

  useEffect(() => {
    let cleanUp = true;

    if (cleanUp) {
      appRef.child("/certificate").on("value", (snap) => {
        setAllCertificate(snap.val());
      });
    }

    return () => {
      cleanUp = false;
    };
  }, []);

  const fileChanged = (file) => {
    const type = file.target.files[0].type;
    // This all types are accepted...
    // image/jpeg
    // image/png
    // image/svg+xml

    if (
      type === "image/jpeg" ||
      type === "image/png" ||
      type === "image/svg+xml"
    ) {
      let reader = new FileReader();
      reader.onload = function () {
        let result = reader.result;
        setImg(result);
      };
      reader.readAsDataURL(file.target.files[0]);
    } else {
      setSnackbarData("File must be in jpeg, png and svg format", "error");
    }
  };

  const fileContainerClickHandler = () => {
    inputFileRef.current.click();
  };

  const newCertificateStateChange = ({ target }) => {
    setNewCertificate({ ...newCertificate, [target.name]: target.value });
  };

  const isCertificateAvailableFun = async () => {
    const data = await appRef
      .child("/certificate")
      .get()
      .then((snap) => {
        let flag = false;
        const certificateObj = snap.val();
        if (certificateObj) {
          Object.values(certificateObj).forEach((element) => {
            if (element.certificate_name === newCertificate.certificate_name) {
              flag = true;
              return;
            }
          });
        }
        return flag;
      });
    return data;
  };

  const uploadFiles = async (file) => {
    const storageRef = ref(
      storage,
      `/cetificate_icon/${newCertificate.certificate_name}/`
    );
    const uploadTask = uploadBytesResumable(storageRef, file);

    await uploadTask.then(async () => {
      await getDownloadURL(storageRef).then((url) => {
        setNewCertificate({ ...newCertificate, certificate_icon_path: url });
      });
    });
  };

  // when we get icon_path then data will inserted
  useEffect(() => {
    if (newCertificate.certificate_name) {
      appRef.child("/certificate").push(newCertificate, () => {
        setNewCertificate({
          certificate_name: "",
          certificate_icon_path: "",
        });
        setImg();
      });
      setSnackbarData("Certificate added successfully!!", "success");
    }
  }, [newCertificate.certificate_icon_path]);

  const sendNewCertificateData = async () => {
    // onclick add icon button
    // check the language is already available or not

    if (!newCertificate.certificate_name && !img) {
      setSnackbarData("Please fill the data first!!", "error");
    } else if (!newCertificate.certificate_name) {
      setSnackbarData("Please enter a certificate name", "error");
    } else if (!img) {
      setSnackbarData("Please select a icon file", "error");
    } else {
      setIsLoadingState(true);
      const isCertificateAvailable = await isCertificateAvailableFun();

      if (isCertificateAvailable) {
        setSnackbarData("This certificate is already entered", "error");
      } else {
        // setNextLanguageID(await getNextId("languages/language_next_code"));
        await uploadFiles(inputFileRef.current.files[0]);
      }
      setIsLoadingState(false);
    }
  };

  return {
    inputFileRef,
    fileChanged,
    newCertificate,
    img,
    fileContainerClickHandler,
    newCertificateStateChange,
    sendNewCertificateData,
    allCertificate,
  };
};

export default AddCertificateLogic;
