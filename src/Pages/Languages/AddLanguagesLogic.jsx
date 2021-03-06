import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { useContext, useEffect, useRef, useState } from "react";
import { globalDataContext } from "../../Context/GlobalDataContext";
import appRef, { storage } from "../../Firebase/Firebase";

const AddLanguagesLogic = () => {
  const inputFileRef = useRef();
  const {
    setIsLoadingState,
    setSnackbarData,
    isConfirmDeletionState,
    setOpenAlertBox,
    setAlertBoxText,
    setIsConfirmDeletionState,
  } = useContext(globalDataContext);
  const [img, setImg] = useState();
  const [allLanguages, setAllLanguages] = useState({});
  const [isSkeletonLoading, setIsSkeletonLoading] = useState(true);
  const [deleteId, setDeleteId] = useState([]);
  const [newLanguage, setNewLanguage] = useState({
    language_name: "",
    icon_path: "",
  });

  useEffect(() => {
    let cleanUp = true;

    if (cleanUp) {
      appRef.child("/languages").on("value", (snap) => {
        if (cleanUp) {
          setAllLanguages(snap.val());
          setIsSkeletonLoading(false);
        }
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

  const newLanguageChangeState = ({ target }) => {
    setNewLanguage({ ...newLanguage, [target.name]: target.value });
  };

  const isLanguageAvailableFun = async () => {
    const data = appRef
      .child("/languages")
      .get()
      .then((snap) => {
        let flag = false;
        const languageObj = snap.val();
        if (languageObj) {
          Object.values(languageObj).forEach((element) => {
            if (element.language_name === newLanguage.language_name) {
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
      `/language_icons/${newLanguage.language_name}/`
    );
    const uploadTask = uploadBytesResumable(storageRef, file);

    await uploadTask.then(async () => {
      await getDownloadURL(storageRef).then((url) => {
        setNewLanguage({ ...newLanguage, icon_path: url });
      });
    });
  };

  // when we get icon_path then data will inserted
  useEffect(() => {
    if (newLanguage.language_name) {
      appRef.child("languages").push(newLanguage, () => {
        setNewLanguage({
          language_name: "",
          icon_path: "",
        });
        setImg();
      });
      setSnackbarData("Language added successfully!!", "success");
    }
  }, [newLanguage.icon_path]);

  const sendNewLanguageIconData = async () => {
    // onclick add icon button
    // check the language is already available or not
    try {
      if (!newLanguage.language_name && !img) {
        setSnackbarData("Please fill the data first!!", "error");
      } else if (!newLanguage.language_name) {
        setSnackbarData("Please enter a language name", "error");
      } else if (!img) {
        setSnackbarData("Please select a icon file", "error");
      } else {
        setIsLoadingState(true);
        const isLanguageAvailable = await isLanguageAvailableFun();

        if (isLanguageAvailable) {
          setSnackbarData("This language is already entered", "error");
        } else {
          await uploadFiles(inputFileRef.current.files[0]);
        }
        setIsLoadingState(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(async () => {
    if (isConfirmDeletionState === true) {
      document.getElementById(deleteId[0]).classList.add("disabled");
      setIsLoadingState(true);
      await appRef.child(`languages/${deleteId[0]}`).remove();
      await appRef.child(`languages_questions/${deleteId[1]}`).remove(() => {
        setSnackbarData("Language deleted successfully!!", "success");
        setIsLoadingState(false);
      });
      const storageRef = ref(storage, `/language_icons/${deleteId[1]}/`);
      deleteObject(storageRef);
      setIsConfirmDeletionState(false);
    }
  }, [isConfirmDeletionState]);

  const deleteBtnWaitingConfirmation = (id, langName) => {
    setDeleteId([id, langName]);
    setOpenAlertBox(true);
    setAlertBoxText({
      heading: "Are you sure want to delete this language?",
      body: "once you deleted the language then it will permanently deleted.and all questions will remove related to this language!! so be careful.!!",
    });
  };

  return {
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
  };
};

export default AddLanguagesLogic;
