import React, { useEffect } from "react";
import { useGetUserQuery } from "../../store/features/user/userApiSlice";
import { useGetProductQuery } from "../../store/features/product/productApiSlice";
import CardProduct from "../../components/Home/CardProduct";
import { isAuthenticated } from "../../store/features/auth/authSlice";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function HomePage() {

  const navigate = useNavigate();

  const loggedIn = useSelector(isAuthenticated);
  console.log(loggedIn);
  const {
    data: user,
    isLoading,
    isSuccess: isSuccessGetUser,
    isError,
    error,
  } = useGetUserQuery(undefined);

  const {
    data: products,
    isLoading: isProductLoading,
    isSuccess: isSuccessGetProduct,
    isError: isProductError,
  } = useGetProductQuery(undefined);


  if (isLoading || isProductLoading) {
    return <h1>Loading...</h1>;
  }

  if (isError || isProductError) {
    return <h1>Error...</h1>;
  }

  if (!loggedIn) {
    navigate("/", { replace: true });
    return <h1>Please login</h1>;
  }

  return (
    <>
      <div>
        <div className="flex flex-wrap items-center justify-center flex-col cursor-pointer rounded-full">
          <img
            src="https://readymadeui.com/team-1.webp"
            className="w-14 h-14 rounded-full"
          />
          <h4 className="text-base text-[#333] font-bold mt-3">John Doe</h4>
          <p className="text-xs text-gray-500 mt-1">{user?.data?.email}</p>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {products?.data.map((item, index) => (
          <CardProduct
            description={item?.description}
            photo={item?.photo}
            title={item?.title}
            key={index}
          />
        ))}
      </div>
    </>
  );
}
