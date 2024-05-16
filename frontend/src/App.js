import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom"; // Importa Routes también

import Login from "./Autenticacion/Login";
import Register from "./Autenticacion/Register";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />{" "}
        <Route path="/register" element={<Register />} />{" "}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
