import React from "react";
import Login from "../pages/Login";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import ServiceOrders from "../pages/ServiceOrder";
import ServiceOrdersByClient from "../pages/ServiceOrderByClient"

const Routing = () => (
  <BrowserRouter>
    <Routes>
      <Route exact path="/" element={<Login/>} /> 
      <Route exact path="/serviceOrders" element={<ServiceOrders/>} /> 
      <Route exact path="/serviceOrders/filterByClient" element={<ServiceOrdersByClient/>} /> 
    </Routes>
  </BrowserRouter>
);

export default Routing;