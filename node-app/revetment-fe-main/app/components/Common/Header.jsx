import React, { useState } from "react";

const Header = ({
  openModal,
  title,
  buttonTittle,
  mainStyle = "flex justify-between items-center  pb-5",
  paginationInfo,
  setPaginationInfo,
  fetchAllDocument,
  setLoader
}) => {

  const searchDocuments = () => {
    setLoader(true)
    fetchAllDocument()
  };

  return (
    <>
      <div className={mainStyle}>
        <h1 className="text-[#000000] font-normal text-[24px] ml-16">
          {title}
        </h1>
        <div className="flex gap-5 ">
          <div className="relative ">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                aria-hidden="true"
                className="w-5 h-5 text-gray-500 dark:text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
            </div>
            <input
              type="search"
              id="default-search"
              className="block w-52 p-2 pl-10  text-sm
           text-gray-900 border
           border-gray-300 rounded-lg bg-white
            focus:ring-blue-500
            focus:border-blue-500 dark:bg-gray-700
             dark:border-gray-600
             dark:placeholder-gray-400 dark:text-white
              dark:focus:ring-blue-500
              dark:focus:border-blue-500"
              placeholder="Search & Enter"
              // value={paginationInfo.value}
              onChange={(e) => setPaginationInfo({ ...paginationInfo, value: e.target.value })}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  searchDocuments();
                }
              }}
            />
          </div>
          <button
            type="submit"
            className="group relative flex w-52 justify-center rounded-md border 
                  border-transparent
                   bg-[#1B8ADD] py-2  text-sm font-medium
                    text-white
                   hover:bg-indigo-700
                    focus:outline-none focus:ring-2 focus:ring-indigo-500
                   focus:ring-offset-2 h-au "
            onClick={openModal}>
            {buttonTittle}
          </button>
        </div>
      </div>
    </>
  );
};

export default Header;
