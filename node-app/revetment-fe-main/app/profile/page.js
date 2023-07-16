"use client";
import React, { useState } from "react";
import { EditProfile, UserProfileImge } from "../components/revetment/profile";

const page = () => {
  const [userImage, setUserImage] = useState(null);
  return (
    <div className="w-full py-5 min-h-[88vh] px-5 bg-[#f2f2f2] ">
      <div className={`  flex justify-between w-full flex-wrap `}>
        <div className="w-[100%] md:w-[73%] h-auto mx-0 md:mx-[1%]  mt-3 md:mt-0">
          <EditProfile imagelink={userImage} setImageLink={setUserImage} />
        </div>
        <UserProfileImge imagelink={userImage} setImageLink={setUserImage} />
      </div>
    </div>
  );
};

export default page;
