import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute: React.FC<{ element: React.ReactElement }> = ({
  element,
}) => {
  const userDataString = localStorage.getItem("userData");
  const userData = userDataString ? JSON.parse(userDataString) : null;

  return userData ? element : <Navigate to="/login" />;
};

export default PrivateRoute;
