"use client";
import * as L from "leaflet";
import React, { useEffect } from "react";
import { useMap } from "react-leaflet";

export default () => {
  const map = useMap();

  useEffect(() => {
    map.addControl(
      L.control.scale({
        position: "bottomright",
      })
    );
  }, []);

  return <></>;
};
