"use client";
import React from "react";

const Model = ({
  children,
  modalStyle = "bg-white w-[25%]   rounded-md",
  modalTitle,
}) => {
  return (
    <>
      <div
        className="justify-center items-center flex overflow-x-hidden
         overflow-y-auto fixed inset-0 z-50 
    outline-none focus:outline-none"
      >
        <div className={modalStyle}>
          {modalTitle && (
            <h3 className="text-center text-[#727271] text-[20px] mt-3 font-extrabold">
              {modalTitle}
            </h3>
          )}
          <div className="px-10">{children}</div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
};

export default Model;
