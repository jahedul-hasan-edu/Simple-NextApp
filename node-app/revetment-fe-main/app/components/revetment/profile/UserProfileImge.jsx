"use client";
import React, { useState, useLayoutEffect } from "react";
import { Avatar } from "@mantine/core";
const UserProfileImge = ({ imagelink, setImageLink }) => {
  const [previewUrl, setPreviewUrl] = useState(null);
  useLayoutEffect(() => {
    const data = JSON.parse(localStorage.getItem("userInfo"));
    setPreviewUrl(data?.profileImage);
  }, []);
  const handleUploadImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageLink(file);
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewUrl(null);
    }
  };
  return (
    <>
      <div
        className="w-full  md:w-[25%]  bg-white h-[40%] rounded-lg flex flex-col items-center
        px-5 py-5
        justify-center
        
        shadow-[#004180] shadow-sm
        transition-all
        hover:shadow-lg hover:shadow-[#004180] 
        ">
        <div
          className=" rounded-full object-cover object-center hover:scale-110 transform transition duration-500 ease-in-out
            hover:bg-black hover:bg-opacity-20
            "
          id="profilePicInput">
          <label id="profilePicInput">
            <Avatar
              radius="xl"
              id="profilePicInput"
              as="/profile"
              className="cursor-pointer"
              src={`${previewUrl === null ? "./profile (1).png" : previewUrl}`}
              size={180}
            />
            <input
              type="file"
              id="profilePicInput"
              className="hidden"
              onChange={handleUploadImage}
            />
          </label>
        </div>
      </div>
    </>
  );
};

export default UserProfileImge;
