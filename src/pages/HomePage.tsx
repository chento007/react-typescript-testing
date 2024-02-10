import React from "react";
import { useGetUserQuery } from "../store/features/user/userApiSlice";
import { useGetProductQuery } from "../store/features/product/productApiSlice";
import CardProduct from "../components/Home/CardProduct";
import UserProfile from "../components/UserProfile";
import { ProductType } from "../@types/product";
import LoadingComponent from "../components/LoadingComponent";

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
      {/* just display user */}
      <UserProfile email={user?.data?.email} username={""} />

      {/* list all product */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 max-w-screen-xl px-32">
        {products?.data.map((item: ProductType, index: number) => (
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
