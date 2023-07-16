"use client";
import React, { memo } from "react";
import dynamic from "next/dynamic";
const MapComponent = dynamic(() => import("../components/Map/Map"), {
  ssr: false,
});

const page = () => {
  return (
    <div className="w-full h-full bg-[#f2f2f2]">
      <MapComponent />
    </div>
  );
};

export default page;
