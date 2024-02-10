import React from "react";
import { useGetUserQuery } from "../store/features/user/userApiSlice";
import { useGetProductQuery } from "../store/features/product/productApiSlice";
import CardProduct from "../components/Home/CardProduct";
import UserProfile from "../components/UserProfile";
import { ProductType } from "../@types/product";
import LoadingComponent from "../components/LoadingComponent";
import HomePageIndex from "../components/Home";

export default function HomePage() {
  // get currect user
  const { data: user, isLoading, isError } = useGetUserQuery(undefined);

  // get all product
  const {
    data: products,
    isLoading: isProductLoading,
    isError: isProductError,
  } = useGetProductQuery(undefined);

  // when it loading
  if (isLoading || isProductLoading) {
    return (
      <>
        <LoadingComponent />
      </>
    );
  }

  // when something error
  if (isError || isProductError) {
    return <h1>Error...</h1>;
  }

  return (
    <>

      <HomePageIndex />
    </>
  );
}
