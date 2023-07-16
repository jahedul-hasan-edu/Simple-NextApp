"use client";
import React from "react";

const UserInformation = ({ user, setOpenEditProfile }) => {
  console.log("user", user);
  return (
    <>
      <div
        className="w-full h-auto  bg-white rounded-lg 
            shadow-[#004180] shadow-sm
            transition-all
            hover:shadow-lg hover:shadow-[#004180]"
      >
        <div className="flex justify-between items-center px-5 py-5 ">
          <div className="flex flex-col items-start">
            <h1 className="text-2xl ">User Information</h1>
            <p className="text-sm">
              Here you can see your personal information and edit it
            </p>
          </div>
          <button
            className="bg-[#004180] text-white  py-2 px-4 rounded-full "
            onClick={setOpenEditProfile}
          >
            Edit
          </button>
        </div>
        <div className="px-5 py-5">
          <div className="flex justify-between flex-row flex-wrap border-b-2 mt-5">
            <div className=" pr-5 overflow-x-auto">
              <h1
                className="  text-sm font-medium text-gray-900
       dark:text-white  text-start"
              >
                Name
              </h1>
            </div>
            <div
              className="
              pr-5 overflow-x-auto"
            >
              <h1 className="text-lg ">
                {user?.firstname + " " + user?.lastname}
              </h1>
            </div>
          </div>
          {/* use above div style and add more information of user like, email, permanent address, national ID, present address, marital status, date of birth, passport number, passport expiry date, emergency contact, religion, language preferences */}

          <div className="flex justify-between flex-row flex-wrap border-b-2 mt-5">
            <div className=" pr-5 overflow-x-auto">
              <h1
                className="  text-sm font-medium text-gray-900
       dark:text-white  text-start"
              >
                Email
              </h1>
            </div>
            <div
              className="
              pr-5 overflow-x-auto"
            >
              <h1 className="text-lg ">{user?.email ? user.email : "N/A"}</h1>
            </div>
          </div>

          <div className="flex justify-between flex-row flex-wrap border-b-2 mt-5">
            <div className=" pr-5 overflow-x-auto">
              <h1
                className="  text-sm font-medium text-gray-900
       dark:text-white  text-start"
              >
                Phone Number
              </h1>
            </div>
            <div className="pr-5 overflow-x-auto ">
              <h1 className="text-lg ">{user?.phone ? user?.phone : "N/A"}</h1>
            </div>
          </div>

          <div className="flex justify-between flex-row flex-wrap border-b-2 mt-5">
            <div className="pr-5 overflow-x-auto">
              <h1
                className="  text-sm font-medium text-gray-900
       dark:text-white  text-start"
              >
                User Role
              </h1>
            </div>
            <div
              className="
              pr-5 overflow-x-auto"
            >
              {" "}
              <h1 className="text-lg "> {user?.role ? user?.role : "N/A"}</h1>
            </div>
          </div>
          <div className="flex justify-between flex-row flex-wrap border-b-2 mt-5">
            <div className="pr-5 overflow-x-auto">
              <h1
                className="  text-sm font-medium text-gray-900
       dark:text-white  text-start"
              >
                Is Verified
              </h1>
            </div>
            <div
              className="
              pr-5 overflow-x-auto"
            >
              <h1 className="text-lg ">
                {user?.isVerified ? "Verified" : "Unverified"}
              </h1>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserInformation;
