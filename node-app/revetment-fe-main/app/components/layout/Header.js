"use client";
import React from "react";
import Image from "next/image";
import { Avatar } from "@mantine/core";
import Link from "next/link";
import { userInfo } from "../signal";

const Header = () => {
  return (
    <div
      className="w-full  h-full px-5
    flex justify-between items-center
    px-shadow-[#7b848a] shadow-lg "
    >
      <div className="flex items-center ">
        <div className="w-16 h-auto ">
          <Image src="/Logo.png" alt="Alt text" width={500} height={500} />
        </div>
        <div className="flex w-full h-9">
          <Image
            src="/image 23.png"
            alt="Alt text"
            width={280}
            height={400}
            priority
            style={{ height: "auto" }}
          />
        </div>
      </div>
      <div className="flex gap-5 items-center">
        <h3 className="text-white text-base">
          {" "}
          {userInfo.value?.firstname !== undefined
            ? userInfo.value?.firstname
            : "User"}
        </h3>
        <Link href="/profile">
          <Avatar
            radius="xl"
            as="/profile"
            className="cursor-pointer"
            src="./profile (1).png"
            size={40}
          />
        </Link>
      </div>
    </div>
  );
};

export default Header;
