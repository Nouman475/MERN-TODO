import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./Signin";
import Register from "./Register";
import { AuthProvider } from "./../../contexts/AuthContext";

export default function Auth() {
  return (
    <>
      <AuthProvider>
        <Routes>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Routes>
      </AuthProvider>
    </>
  );
}
