import React from "react";
import { Route, Routes } from "react-router-dom";
import AddCertificate from "../Pages/Certification/AddCertificate/AddCertificate";
import AddContest from "../Pages/Contest/AddContest/AddContest";
import ContestList from "../Pages/Contest/ContestList/ContestList";
import AddLanguages from "../Pages/Languages/AddLanguages";
import ManageQuestions from "../Pages/ManageQuestions/ManageQuestions";
import AddQuestion from "../Pages/AddQuestions/AddQuestion";
import LogIn from "./Admin_Login/LogIn";

const Routing = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<LogIn />} />
        <Route path="/add-languages" element={<AddLanguages />} />
        <Route path="/contest" element={<ContestList />} />
        <Route path="/addcontest" element={<AddContest />} />
        <Route path="/addcertificate" element={<AddCertificate />} />
        <Route path="/add-question/:mode/:languageName" element={<AddQuestion />} />
        <Route path="/questions-list/:mode/:languageName" element={<ManageQuestions />} />
      </Routes>
    </>
  );
};

export default Routing;
