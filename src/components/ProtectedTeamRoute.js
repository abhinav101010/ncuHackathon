import { Navigate } from "react-router-dom";

export default function ProtectedTeamRoute({ children }) {
  const token = localStorage.getItem("teamToken");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
}