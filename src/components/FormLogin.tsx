import { useLoginMutation } from "../store/features/auth/authApiSlice";
import {
  isAuthenticated,
  setCredentials,
} from "../store/features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ErrorData } from "../@types/error";

export default function FormLogin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login, { isLoading, isSuccess, isError, error }] = useLoginMutation();

  if (isError) {
    toast.error((error as ErrorData).data.message);
  }
  
  if (isSuccess) {
    toast.success("Login Success");
  }
  const handleSubmit = async ({ email, password }) => {
    
    const response = await login({
      email,
      password,
    }).unwrap();

    dispatch(setCredentials(response.data));
    navigate("/", { replace: true });
  };

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

  return (
    <div className="flex  border-2 border-blue-400 rounded-lg items-center justify-center  w-[75%] m-auto  p-11">
      <ToastContainer />
      {/* //   <div className="flex w-[75%] m-auto h-screen  p-11 "> */}

      <div className="w-[80%]  flex justify-center items-center">
        <img src="/assets/images/login.webp" alt="" />
      </div>
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
            }, 500);
          }}
        >
          {({ isSubmitting }) => (
            <Form className="w-full">
              <p className="text-[24px] text-start font-semibold mb-16">
                Login
              </p>

              {/* Email */}
              <div className="relative z-0 w-full mb-6 group">
                <Field
                  type="email"
                  name="email"
                  id="floating_email"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                />
                <label
                  htmlFor="email"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Email address
                </label>
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500"
                />
              </div>
              {/* Password */}
              <div className="relative z-0 w-full mb-6 group">
                <Field
                  autoComplete="off"
                  type="password"
                  name="password"
                  id="floating_password"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                />
                <label
                  htmlFor="password"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Password
                </label>
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500"
                />
              </div>

              {/* Submit */}
              <div className="relative z-0 w-full mb-6 group">
                <button
                  disabled={isSubmitting}
                  type="submit"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Submit
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
