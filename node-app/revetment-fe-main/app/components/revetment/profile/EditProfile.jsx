"use client";
import React, { useState, useLayoutEffect } from "react";
import { userProfile } from "../../../../API";
import { toast } from "react-toastify";
import { handleUploadSingleFile } from "../../utils/utilityFunction";
const EditProfile = ({ imagelink, setImageLink }) => {
  const [userInfo, setUserInfo] = useState({
    firstname: "",
    lastname: "",
    email: "",
    pNumber: "",
    userRole: "",
    designation: "",
  });
  useLayoutEffect(() => {
    const data = JSON.parse(localStorage.getItem("userInfo"));

    if (data) {
      setUserInfo((state) => ({
        ...state,
        firstname: data.firstname,
        lastname: data.lastname,
        email: data?.email,
        pNumber: data?.phone,
        userRole: data?.role,
        designation: data?.role,
      }));
    }
  }, []);

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    let imageLocation = null;
    if (imagelink !== null) {
      const folderName = process.env.NEXT_PUBLIC_AWS_IMAGES;
      let uploadfile = await handleUploadSingleFile(imagelink, folderName);
      imageLocation = uploadfile.Location;
    }

    const body = {
      firstname: userInfo.firstname,
      lastname: userInfo.lastname,
      email: userInfo.email,
      phone: userInfo.pNumber,
      profileImage: imageLocation,
    };
    userProfile(body)
      .then((res) => {
        localStorage.setItem("userInfo", JSON.stringify(res?.user));
        toast("Your profile has been updated successfully.");
        closeEditSection();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const { firstname, lastname, email, pNumber, userRole } = userInfo;

  return (
    <div
      className="w-full h-auto  bg-white rounded-lg 
    shadow-[#004180] shadow-sm
    transition-all
    hover:shadow-lg hover:shadow-[#004180] 
  ">
      <div className="px-5 py-2">
        <form onSubmit={handleSubmitForm}>
          <div className="flex flex-wrap">
            <div className="w-full">
              <h1 className="text-xl font-semibold text-left mb-3 text-[#6e6b7b]">
                User Info
              </h1>
            </div>
            <div className="mb-4 md:w-[48%] sm:w-[100%] mr-2">
              <label
                className="block mb-2 text-sm font-medium text-gray-900
       dark:text-white  text-start"
                htmlFor="firstname">
                First Name
              </label>
              <input
                className="shadow appearance-none  rounded w-full py-2 px-3\
       text-gray-700 leading-tight border-[1px] border-[#d8d6de] pl-3"
                id="firstname"
                type="text"
                required
                placeholder="First Name"
                name="firstname"
                value={firstname}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4 md:w-[48%] sm:w-[100%] mr-2">
              <label
                className="block 
      mb-2 text-sm 
      font-medium
       text-gray-900
       dark:text-white
        text-start"
                htmlFor="lastname">
                Last Name
              </label>
              <input
                className="shadow appearance-none  rounded w-full py-2 px-3\
       text-gray-700 leading-tight border-[1px] border-[#d8d6de] pl-3"
                id="lastname"
                type="text"
                required
                placeholder="Last Name"
                name="lastname"
                value={lastname}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4 md:w-[48%] sm:w-[100%] mr-2">
              <label
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white  text-start"
                htmlFor="email">
                Email
              </label>
              <input
                className="shadow appearance-none  rounded w-full py-2 px-3\
       text-gray-700 leading-tight border-[1px] border-[#d8d6de] pl-3"
                id="email"
                type="email"
                placeholder="Email"
                required
                pattern="[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{1,63}$"
                name="email"
                value={email}
                onChange={handleChange}
              />
            </div>

            <div className="mb-4 md:w-[48%] sm:w-[100%] mr-2">
              <label
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white  text-start"
                htmlFor="pNumber">
                Phone Number
              </label>
              <input
                className="shadow appearance-none  rounded w-full py-2 px-3
       text-gray-700 leading-tight border-[1px] border-[#d8d6de] pl-3"
                id="pNumber"
                type="text"
                placeholder="Phone Number"
                required
                name="pNumber"
                value={pNumber}
                onChange={handleChange}
              />
            </div>

            <div className="mb-4 md:w-[48%] sm:w-[100%] mr-2">
              <label
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white  text-start"
                htmlFor="userRole">
                User Role
              </label>
              <input
                id="userRole"
                name="userRole"
                value={userRole !== null ? userRole : "N/A"}
                type="text"
                disabled
                className="shadow appearance-none  rounded w-full py-2 px-3
              text-gray-700 leading-tight border-[1px] border-[#d8d6de] pl-3"
                onChange={handleChange}
              />
            </div>
            <div className="mb-4 md:w-[48%] sm:w-[100%] mr-2">
              <label
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white  text-start"
                htmlFor="userRole">
                User Designation
              </label>
              <input
                id="userRole"
                name="userRole"
                value={userRole !== null ? userRole : "N/A"}
                type="text"
                disabled
                className="shadow appearance-none  rounded w-full py-2 px-3
              text-gray-700 leading-tight border-[1px] border-[#d8d6de] pl-3"
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="w-full flex justify-end gap-8 mr-2">
            <button
              className="  
      
       bg-[#1B8ADD] 
       text-white
       mt-1 px-5
       rounded-md
       w-28  p-1.5
        shadow-[#717171] shadow-sm
        font-semibold
        transition-all
        hover:shadow-md hover:shadow-[#717171] border-0 hover:scale-105
        "
              type="submit">
              Update
            </button>
            {/* <button
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
              // onClick={closeEditSection}
              type="button">
              Cancel
            </button> */}
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
