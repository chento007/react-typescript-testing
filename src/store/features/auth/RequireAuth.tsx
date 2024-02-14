import React, { useState, useEffect } from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import {
  getDecryptedRefresh,
  getDecryptedRefreshAuth,
} from "../../../lib/cryptography";
import LoadingComponent from "../../../components/LoadingComponent";
import { useSelector } from "react-redux";
import { selectIsAuthenticated } from "./authSlice";

const RequireAuth = () => {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [hasValidRefreshToken, setHasValidRefreshToken] = useState(false);

  useEffect(() => {

    setIsLoading(true);

    const checkRefreshToken = async () => {
      const refresh = await getDecryptedRefresh();
      setHasValidRefreshToken(!!refresh);
      setIsLoading(false);
    };

    checkRefreshToken();
  }, []);

  if (isLoading) {
    return (
      <>
        <LoadingComponent />
      </>
    );
  }

  return hasValidRefreshToken ? (
    <Outlet />
  ) : (
    <Navigate to="/auth/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
