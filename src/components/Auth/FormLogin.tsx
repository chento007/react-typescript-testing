import { useLoginMutation } from "../../store/features/auth/authApiSlice";
import { setCredentials } from "../../store/features/auth/authSlice";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ErrorType } from "../../@types/error";
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { CiUser } from "react-icons/ci";
import { RiLockPasswordFill } from "react-icons/ri";
import { FaE, FaKey } from "react-icons/fa6";

import LoadingComponent from "../LoadingComponent";

export interface SerializedError {
  name?: string;
  message?: string;
  stack?: string;
  code?: string;
}

// validate password with formik
const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{6,}$/;

// create a validation schema
const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .required("Password is required")
    .matches(
      passwordRegex,
      "Password must be at least 6 characters, a number, an Uppercase, and a Lowercase"
    ),
});

export default function FormLogin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login, { isLoading, isSuccess, isError, error }] = useLoginMutation();
  const [isOpenPassword, setIsOpenPassword] = useState(false);
  const [isOpenConfirmPassword, setIsOpenConfirmPassword] = useState(false);

  const handleSubmit = async ({ email, password }) => {
    try {
      const response = await login({
        email,
        password,
      }).unwrap();
      if (response.data) {
        dispatch(setCredentials(response.data));
        navigate("/", { replace: true });
      }
    } catch (error: any) {
      console.error(error);
    }
  };

  if (isError) {
    toast.error((error as ErrorType).data.message);
  }
  if (isLoading) {
    return <LoadingComponent />;
  }

  return (
    <div className="flex border-2 border-blue-400 rounded-lg items-center justify-center  w-1/2 m-auto  p-11 h-1/2">
      <ToastContainer />
      {/* //   <div className="flex w-[75%] m-auto h-screen  p-11 "> */}

      <div className="w-full">
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            setTimeout(() => {
              handleSubmit(values);
              resetForm();
            }, 1000);
          }}
        >
          {({ isSubmitting }) => (
            <Form className="w-full">
              {/* title */}
              <p className="text-[24px] text-center font-semibold mb-10">
                Login
              </p>

              {/* email */}
              <div className="mb-6">
                <label
                  htmlFor="email"
                  className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
                >
                  Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <CiUser />
                  </div>
                  <Field
                    type="email"
                    name="email"
                    id="floating_email"
                    className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="example@gmail.com"
                    required
                  />
                </div>
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-[13px]"
                />
              </div>

              {/* password */}
              <div className="mb-6">
                <label
                  htmlFor="password"
                  className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
                >
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <FaKey />
                  </div>
                  <Field
                    type={isOpenPassword ? "text" : "password"}
                    name="password"
                    className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setIsOpenPassword(!isOpenPassword)}
                    className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    {isOpenPassword ? <FaEye /> : <FaEyeSlash />}
                  </button>
                </div>
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 text-[13px]"
                />
              </div>

              {/* route to register */}
              <div className="my-6 text-center">
                <span>
                  You don't have an account yet?{" "}
                  <Link to={"/auth/signup"} className="text-blue-600">Register here</Link>
                </span>
              </div>
              {/* Submit */}
              <div className="relative z-0 w-full mb-6 group flex justify-center">
                <button
                  disabled={isSubmitting}
                  type="submit"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Login
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
