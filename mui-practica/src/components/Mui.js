import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./pages/Header";
import Login from "./pages/Login";

const Mui = () => {
  return (
    <div>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Login />} />
        </Routes>
      </Router>
    </div>
  );
};

export default Mui;
