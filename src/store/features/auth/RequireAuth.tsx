import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentAccessToken } from "./authSlice";
import { useGetUserQuery } from "../user/userApiSlice";
import LoadingComponent from "../../../components/LoadingComponent";

const RequireAuth = () => {

  const token = useSelector(selectCurrentAccessToken);
  const location = useLocation();

  return token ? (
    <Outlet />
  ) : (
    <Navigate to="/auth/login" state={{ from: location }} replace />
  );
};
export default RequireAuth;
