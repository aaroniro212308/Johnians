import React from "react";
import { Route, Routes } from "react-router-dom";
import Johnians from "../admin/Pages/Johnians";
import Payments from "../admin/Pages/Payments";

const AppRoutes = () => {
  //admin sidebar contents route
  return (
    <>
      <Routes>  
          <Route path="/johnians" element={<Johnians />} />
          <Route path="/payments" element={<Payments />} />
      </Routes>
    </>
  );
};

export default AppRoutes;
