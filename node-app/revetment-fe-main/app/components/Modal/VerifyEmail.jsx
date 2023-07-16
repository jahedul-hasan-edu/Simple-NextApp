"use client";
import React from "react";
import Image from "next/image";
const VerifyEmail = ({ close }) => {
  return (
    <>
      <div className="flex w-full justify-center h-20 mt-2">
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
      <h3 className="text-center text-[19px] text-[#727271] font-bold">
        Verify Your Email
      </h3>

      <div className="border-t-2 border-t-[#C1C1C1] w-full my-1"></div>
      <p className="text-[#727271] text-justify   mb-2 ">
        To start using RTID, we need to verify your email ID. A code has been
        sent to your email. Please enter the code below to verify.
      </p>
      <div className="mt-1">
        <input
          type="text"
          id="email-address-icon"
          className="bg-gray-50 border border-gray-300
               text-gray-900 text-sm 
              rounded-lg focus:ring-blue-500
               focus:border-blue-500 block w-full
                pl-3 p-1.5  
               dark:bg-gray-700 dark:border-gray-600
                dark:placeholder-gray-400
                dark:text-white dark:focus:ring-blue-500
               dark:focus:border-blue-500"
          placeholder="Enter Code"
        />
        <button
          className="  
           bg-[#1B8ADD] 
           text-[#FFFFFF]
           mt-1
           rounded-md
             w-full p-1.5
            shadow-[#717171] shadow-sm
            font-semibold
            transition-all
            hover:shadow-md hover:shadow-[#717171] border-0 hover:scale-105
            "
          type="button"
          onClick={close}>
          Verify
        </button>
        <div className="text-center mt-1 font-semibold">
          <button
            className=" 
           text-[#1B8ADD] 
           
            "
            type="button">
            Resend Code
          </button>
        </div>
      </div>
    </>
  );
};

export default VerifyEmail;
