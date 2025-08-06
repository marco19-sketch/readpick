import React from "react";
import { Navigate } from "react-router-dom";
import {useAuth} from "../hooks/useAuth";

export default function ProtectedRoute({ children }) {
  const { user } = useAuth();
   console.log("ProtectedRoute user:", user);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
