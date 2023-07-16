"use client";
import React from "react";
import Header from "./Header";
import { NavbarSimple } from "./SideBar";
import { ToastContainer } from "react-toastify";
import { sidebarOpen } from "../signal";

const index = ({ children }) => {
  return (
    <>
      <main className="w-full h-full">
        <ToastContainer />
        <div className="w-full h-[4rem] bg-[#00416E] ">
          <Header />
        </div>
        <div className=" w-ful flex  " style={{ height: "calc(100vh - 4rem)" }}>
          {sidebarOpen.value && (
            <div className="w-[20%] h-full overflow-hidden delay-100 ease-in-out duration-500">
              <NavbarSimple />
            </div>
          )}
          <div
            className={`${
              sidebarOpen.value ? "w-[80%]" : "w-[100%]"
            } overflow-y-auto h-full relative delay-100 ease-linear duration-300 `}>
            <img
              src="/control.png"
              className={`absolute cursor-pointer left-2 top-5 w-11 z-40 border-dark-purple ${
                sidebarOpen.value ? "rotate-0" : "rotate-180"
              }
           border-2 rounded-full`}
              onClick={() => (sidebarOpen.value = !sidebarOpen.value)}
            />

            {children}
          </div>
        </div>
      </main>
    </>
  );
};

export default index;
