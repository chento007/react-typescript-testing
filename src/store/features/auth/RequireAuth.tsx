import { useLocation, Navigate, Outlet } from "react-router-dom";
import {getDecryptedRefreshAuth } from "../../../lib/cryptography";

const RequireAuth = () => {

  const location = useLocation();
  const refresh = getDecryptedRefreshAuth();

  return refresh ? (
    <Outlet />
  ) : (
    <Navigate to="/auth/login" state={{ from: location }} replace />
  );
};
export default RequireAuth;
