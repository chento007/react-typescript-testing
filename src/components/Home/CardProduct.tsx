import React from "react";
import ModalUpdateProduct from "./ModalUpdateProduct";
import { ProductType } from "../../@types/product";
import ModalDeleteProduct from "./ModalDeleteProduct";

export default function CardProduct(props: ProductType) {
  const { id, description, photo, price, title, user } = props;
  return (
    <>
      <div className="max-w-sm mt-4 flex flex-col justify-content-between items-end  bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <div className="h-[90%]">
          <a href="#">
            <img
              className="rounded-t-lg"
              src={
                photo
                  ? photo
                  : "https://vishwaentertainers.com/wp-content/uploads/2020/04/No-Preview-Available.jpg"
              }
              alt=""
            />
          </a>
          <div className="p-5">
            <a href="#">
              <h5 className="mb-2 text-[15px] font-bold tracking-tight text-gray-900 dark:text-white">
                {title}
              </h5>
            </a>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 line-clamp-3">
              {description}
            </p>

            <span className="text-[20px]">Price : {price}</span>
          </div>
        </div>
        <div>

          <ModalDeleteProduct id={id} />

          <ModalUpdateProduct
            photo={photo}
            description={description}
            id={id}
            price={price}
            title={title}
            user={user}
          />
        </div>
      </div>
    </>
  );
}
