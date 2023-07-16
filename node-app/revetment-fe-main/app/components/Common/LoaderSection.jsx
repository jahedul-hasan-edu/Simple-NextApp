


import React from "react";
import { Loader } from "@mantine/core";

const LoaderSection = ({ state }) => {
  return (
    state && <div className="fixed top-0 left-0 w-screen z-50 bg-[#ffffffac] h-screen flex justify-center items-center">
      <Loader color="violet" size="xl" />
    </div>
  );
};

export default LoaderSection;
