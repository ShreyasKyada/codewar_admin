import { useEffect, useState } from "react";
import appRef from "../../Firebase/Firebase";

const SideDrawerLogic = () => {
  const [open, setOpen] = useState(true);
  const [sideLanguages, setSideLanguages] = useState({});

  const handleClick = () => {
    setOpen(!open);
  };

  useEffect(() => {
    let cleanUp = true;

    if (cleanUp) {
      appRef.child("/languages").on("value", (snap) => {
        if (cleanUp) setSideLanguages(snap.val());
      });
    }

    return () => {
      cleanUp = false;
    };
  }, []);

  const getObj = () => {
    return {
      "& .MuiDrawer-paper": {
        top: "69px",
      },
      "& .MuiModal-root": {
        top: "69px",
      },
    };
  };

  const defaultObj = () => {
    return {
      "& .MuiDrawer-paper": {
        top: "0px",
      },
      "& .MuiModal-root": {
        top: "0px",
      },
    };
  };

  return { handleClick, open, getObj, defaultObj, sideLanguages };
};

export default SideDrawerLogic;
