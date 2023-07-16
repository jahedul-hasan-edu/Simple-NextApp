"use client";
import React from "react";
import { toast } from "react-toastify";
// import { }
const DeleteUser = ({ close, userData, getAllUserSData, apiMethod,
  title="user"
 }) => {
  const handleDelete = async () => {
    await apiMethod(userData.id);
    toast("User deletion successful.");
    close();
    getAllUserSData();
  };
  return (
    <>
      <div>
        <div className="flex   my-5  w-full">
          <span className="border-t-2 border-t-[#C1C1C1] w-full" />
        </div>
        <p className="text-[0.9rem]">
          Do you want to permanently delete this {title} from the portal? If yes,
          click confirm to proceed.
        </p>

        <div className="w-full flex justify-center gap-8 mt-2">
          <button
            className="  
      
            bg-[#D73636] 
            text-[#FFFFFF]
       mt-1 px-5
       rounded-md
       w-28  p-1.5
        shadow-[#717171] shadow-sm
        font-semibold
        transition-all
        hover:shadow-md hover:shadow-[#717171] border-0 hover:scale-105
        "
            onClick={handleDelete}
            type="button"
          >
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
            type="button"
          >
            Cancel
          </button>
        </div>
      </div>
    </>
  );
};

export default DeleteUser;
