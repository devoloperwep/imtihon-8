import { Navigate } from "react-router-dom";

function ProtectedRoutes({ children, user }) {
  if (user) {
    return children;
  } else {
    <Navigate to="/login" />;
  }
}

export default ProtectedRoutes;
