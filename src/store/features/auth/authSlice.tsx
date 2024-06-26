import {
  removeRefresh,
  storeRefresh,
  secureRefresh,
} from "../../../lib/cryptography";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: "",
  access: null,
  isAuthenticated:false
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {

      console.log(action.payload);
      
      state.access = action.payload.access;
      state.isAuthenticated = true;
      secureRefresh(action.payload.refresh);
    },
    setCurrentUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.user = "";
      state.access = null;
      state.isAuthenticated = false;
      removeRefresh();
    },
  },
});

export const { setCredentials, logout, setCurrentUser } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state) => state?.auth.user;
export const selectCurrentAccessToken = (state) => state?.auth.access;
export const selectIsAuthenticated = (state) => state?.auth.isAuthenticated;
