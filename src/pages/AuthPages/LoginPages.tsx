import { useLoginMutation } from "../../store/features/auth/authApiSlice";
import {
  isAuthenticated,
  setCredentials,
} from "../../store/features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

export default function LoginPages() {
  const navigate = useNavigate();
  const loggedIn = useSelector(isAuthenticated);
  console.log(loggedIn);
  
  if (loggedIn) {
    navigate("/", { replace: true });
  }


  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const [login, { isLoading }] = useLoginMutation();

  const handleLogin = async () => {
    try {
      // .unwrap() is a utility function that will return either the fulfilled value or throw the rejected value as an error.
      const { data } = await login({
        email: "chento222@gmail.com",
        password: "Chento@123",
      }).unwrap();
      console.log(data);
      dispatch(setCredentials(data));
      navigate("/", { replace: true });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex w-[75%] m-auto h-screen  p-11 ">
      <div className="w-[50%]  flex justify-center items-center">
        <img src="/assets/images/login.webp" alt="" />
      </div>
      <form className="w-[50%]  mx-auto  p-10 flex flex-col justify-center items-center">
        <h2 className="text-3xl text-gray-900 dark:text-white">Login</h2>

        <div className="mb-5 w-full">
          <label
            htmlFor="website-admin"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Username
          </label>
          <div className="flex">
            <input
              type="text"
              id="website-admin"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              placeholder="Bonnie Green"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>
        <div className="mb-5 w-full">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your password
            <input
              type="password"
              id="password"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
        </div>
        <button
          type="button"
          onClick={handleLogin}
          className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
        >
          Login
        </button>
      </form>
    </div>
  );
}
