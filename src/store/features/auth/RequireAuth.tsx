import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentAccessToken } from "./authSlice";
import { useGetUserQuery } from "../user/userApiSlice";
import LoadingComponent from "../../../components/LoadingComponent";

const RequireAuth = () => {
  const token = useSelector(selectCurrentAccessToken);

  const {
    data: user,
    isLoading,
    isSuccess: isSuccessGetUser,
    isError,
    error,
  } = useGetUserQuery(undefined);
  const location = useLocation();

  if (isLoading) {
    return (
      <>
        <LoadingComponent />
      </>
    );
  }

  return user ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};
export default RequireAuth;
