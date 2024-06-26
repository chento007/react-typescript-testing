import {
  BaseQueryFn,
  FetchArgs,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import {
  logout,
  setCredentials,
  setCurrentUser,
} from "../features/auth/authSlice";
import { getRefresh, getDecryptedRefresh } from "../../lib/cryptography";
import { RootState } from "../store";

interface CustomError {
  message: string;
  status: number;
}

// create base query with authentication
const baseQuery = fetchBaseQuery({
  baseUrl: "https://localhost:3001/api",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.access;
    headers.set("content-type", "application/json");
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReAuth = async (args, api, extraOptions) => {
  
  let result = await baseQuery(args, api, extraOptions);
  console.log("result respone : ",result);
  
  if (result.error?.status === 401) {
    const refresh = await getDecryptedRefresh();

    if (refresh) {
      try {
        const refreshResult = await baseQuery(
          {
            url: "/auth/refresh",
            method: "POST",
            body: { refreshToken: refresh },
          },
          api,
          extraOptions
        );

        // Check if the refresh was successful
        if ((refreshResult?.data as any).data) {
          // Dispatch the new credentials to the store
          api.dispatch(setCredentials((refreshResult?.data as any).data));

          // Retry the original query with the new access token
          result = await baseQuery(args, api, extraOptions);
        } else {
          // Refreshing the token failed, log out the user
          api.dispatch(logout());

          // Consider using a more user-friendly notification system than alert
          console.error("Session expired. Please log in again. 1");
        }
      } catch (error) {
        console.error("Failed to refresh access token", error);
        api.dispatch(logout());
      }
    } else {
      api.dispatch(logout());
      console.error("Session expired. Please log in again. 2");
    }
  }

  return result;
};

// create api slice with custom base query
export const apiSlice = createApi({
  baseQuery: baseQueryWithReAuth,
  tagTypes: ["User", "Product","Auth"], // tagTypes are used for cache invalidation
  endpoints: (builder) => ({}),
});
