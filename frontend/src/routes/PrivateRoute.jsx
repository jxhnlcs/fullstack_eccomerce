import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const isAuthenticated = localStorage.getItem("idToken"); // Verifica se há um token salvo

  return isAuthenticated ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoute;