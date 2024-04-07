import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const AuthProvider = () => {
  const user = localStorage.getItem("currentUser");
  console.log(user);
  if (!user) {
    return <Navigate to={"/"} />;
  } else {
    return <Outlet />;
  }
};

export default AuthProvider;
