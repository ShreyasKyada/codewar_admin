import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import AddCertificate from "../Pages/AddCertificate/AddCertificate";
import AddContest from "../Pages/Contest/AddContest/AddContest";
import ContestList from "../Pages/Contest/ContestList/ContestList";
import AddLanguages from "../Pages/Languages/AddLanguages";
import ManageQuestions from "../Pages/ManageQuestions/ManageQuestions";
import AddQuestion from "../Pages/AddQuestions/AddQuestion";
import LogIn from "../Pages/Admin_Login/LogIn";
import { authContext } from "../Context/AuthContext";

const Routing = () => {
  const { validUser } = useContext(authContext);

  return (
    <>
      <Routes>
        {!validUser && (
          <>
            <Route path="/" element={<LogIn />} />
            <Route path="*" element={<LogIn />} />
          </>
        )}

        {validUser && (
          <>
            <Route path="/" element={<AddLanguages />} />
            <Route path="/add-languages" element={<AddLanguages />} />
            <Route path="/contest" element={<ContestList />} />
            <Route path="/addcontest" element={<AddContest />} />
            <Route path="/contest/:id" element={<AddContest />} />
            <Route path="/addcertificate" element={<AddCertificate />} />
            <Route
              path="/add-question/:mode/:languageName"
              element={<AddQuestion />}
            />
            <Route
              path="/add-question/:mode/:languageName/:qid"
              element={<AddQuestion />}
            />
            <Route
              path="/questions-list/:mode/:languageName"
              element={<ManageQuestions />}
            />
            <Route path="*" element={"Error"} />
          </>
        )}
      </Routes>
    </>
  );
};

export default Routing;
