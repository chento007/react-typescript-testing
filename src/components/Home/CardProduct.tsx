import React from "react";

export default function CardProduct({ photo, title, description }) {
  return (
    <>
      <div className="max-w-sm mt-10  bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
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
        </div>
      </div>
    </>
  );
}
