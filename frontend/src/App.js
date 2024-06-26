import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./Autenticacion/Login";
import Register from "./Autenticacion/Register";
import Panel from "./Task/Panel";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} /> 
        <Route path="/login" element={<Login />} />{" "}
        <Route path="/register" element={<Register />} />{" "}
        <Route path="/panel" element={<Panel />} />{" "}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
