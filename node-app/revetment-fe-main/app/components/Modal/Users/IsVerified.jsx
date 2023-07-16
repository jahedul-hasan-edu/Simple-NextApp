"use client";
import React from "react";
import { verifyUser } from "../../../../API/index";
import { toast } from "react-toastify";

const IsVerified = ({ close, userData, getAllUserSData }) => {
  const handleConfirm = async () => {
    const apimodel = {
      userid: userData.id,
      body: {
        role: userData?.role,
        isVerified: !userData?.isVerified,
      },
    };


    await verifyUser(apimodel);
    toast("The user has been verified.");
    close();
    getAllUserSData();
  };
  return (
    <div>
      <div className="flex   my-5  w-full">
        <span className="border-t-2 border-t-[#C1C1C1] w-full" />
      </div>
      <p className="text-[0.9rem] mb-3">
        {userData.isVerified
          ? " Are you sure you want to un-verify this user?"
          : "Are you sure you want to verify this user?"}
      </p>
      <div className="w-full flex justify-center gap-8 mt-2">
        <button
          className="  
      
            bg-[#1B8ADD]
            text-[#FFFFFF]
       mt-1 px-5
       rounded-md
       w-28  p-1.5
        shadow-[#717171] shadow-sm
        font-semibold
        transition-all
        hover:shadow-md hover:shadow-[#717171] border-0 hover:scale-105
        "
          onClick={handleConfirm}
          type="button">
          Confirm
        </button>
        <button
          className="  
                bg-[#f8f9f9] 
       text-[#393737]
       mt-1 px-5
       rounded-md
       w-28  p-1.5
        shadow-[#717171] shadow-sm
        font-semibold
        transition-all
        hover:shadow-md hover:shadow-[#717171] border-0 hover:scale-105
        "
          onClick={close}
          type="button">
          Cancel
        </button>
      </div>
    </div>
  );
};

export default IsVerified;
