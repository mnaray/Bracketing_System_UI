import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AuthWrapper from "./components/AuthWrapper";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Detailed from "./pages/Detailed";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index path="/" element={<Navigate to="/home" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<AuthWrapper>{<Home />}</AuthWrapper>} />
        <Route
          path="/detailed"
          element={
            <AuthWrapper>
              {<Detailed bracketId="3eIL7Ezz1pGUgAdNNJfy" />}
            </AuthWrapper>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
