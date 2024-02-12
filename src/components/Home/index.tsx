import React from "react";
import { useGetUserQuery } from "../../store/features/user/userApiSlice";
import { useGetProductQuery } from "../../store/features/product/productApiSlice";
import LoadingComponent from "../LoadingComponent";
import UserProfile from "../UserProfile";
import { ProductType } from "../../@types/product";
import CardProduct from "./CardProduct";
import ModalAddNewProduct from "./ModalAddNewProduct";

export default function HomePageIndex() {
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

  return (
    <>
      {/* just display user */}
      <UserProfile email={user?.data?.email} username={""} />

      {/* create product */}
      <div className="max-w-screen-xl px-32">
        <ModalAddNewProduct />
      </div>

      {/* list all product */}
      <div className="grid grid-cols-5 md:grid-cols-5 gap-4 max-w-screen-xl pl-32">
        {products?.data.map((item: ProductType, index: number) => (
          <CardProduct
            id={item.id}
            price={item.price}
            user={item.user}
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
