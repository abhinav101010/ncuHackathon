import { Navigate } from "react-router-dom";

export default function ProtectedTeamRoute({ children }) {
  const token = localStorage.getItem("teamToken");

  // If team is not logged in
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Allow access to dashboard
  return <>{children}</>;
}
