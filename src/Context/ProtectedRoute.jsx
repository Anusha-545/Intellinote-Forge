import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const ProtectedRoute = ({ children }) => {
  const { token } = useAuth();

  // If no token → redirect to login
  console.log(token);
  
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // If token exists → allow access
  return children;
};

export default ProtectedRoute;