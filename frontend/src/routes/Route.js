import React from "react";
import Login from "../pages/Login";
import { isAuthenticated } from "../auth";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import ServiceOrders from "../pages/ServiceOrder";

const Routing = () => (
  <BrowserRouter>
    <Routes>
      <Route exact path="/" element={<Login/>} /> 
      <Route exact path="/serviceOrders" element={<ServiceOrders/>} /> 
    </Routes>
  </BrowserRouter>
);

export default Routing;