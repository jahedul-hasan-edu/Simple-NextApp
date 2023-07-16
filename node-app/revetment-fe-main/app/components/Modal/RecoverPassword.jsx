"use client";
import React from "react";
import Image from "next/image";
const ForgetModel = ({ close }) => {
  return (
    <>
      <div className="flex w-full justify-center h-[84px] mt-2">
        <Image
          src="/Logo.png"
          alt="Alt text"
          width={100}
          height={400}
          style={{ height: "auto" }}
        />
      </div>
      <div className="flex w-full justify-center  mt-3 h-6">
        <Image
          src="/banglaa.png"
          alt="Alt text"
          width={180}
          height={400}
          style={{ height: "auto" }}
        />
      </div>
      <h3 className="text-center text-[20px] text-[#727271] font-bold">
        Password Reset
      </h3>

      <div className="border-t-2 border-t-[#C1C1C1] w-full my-2"></div>
      <p className="text-[#727271] text-justify  font-light mb-3 ">
        You will recieve an email to reset your password. Please enter your
        email first.
      </p>
      <div className="mt-5">
        <input
          type="email"
          id="email-address-icon"
          className="bg-gray-50 border border-gray-300
                 text-gray-900 text-sm 
                rounded-lg focus:ring-blue-500
                 focus:border-blue-500 block w-full
                  pl-3 p-2  
                 dark:bg-gray-700 dark:border-gray-600
                  dark:placeholder-gray-400
                  dark:text-white dark:focus:ring-blue-500
                 dark:focus:border-blue-500"
          placeholder="Email"
        />
        <button
          className="  
             bg-[#1B8ADD] 
             text-[#FFFFFF]
             mt-3
             rounded-md
               w-full p-2 
              shadow-[#717171] shadow-sm
              font-semibold
              transition-all
              hover:shadow-md hover:shadow-[#717171] border-0 hover:scale-105
              "
          type="button"
          onClick={close}>
          Recover Password
        </button>
      </div>
    </>
  );
};

export default ForgetModel;
