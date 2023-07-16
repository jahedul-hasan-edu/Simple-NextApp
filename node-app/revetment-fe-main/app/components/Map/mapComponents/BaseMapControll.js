
"use client";
import React, { useEffect } from "react";
import { TileLayer, useMap } from "react-leaflet";
import Control from "react-leaflet-custom-control";
import Image from "next/image";

export default React.forwardRef((props, ref) => {
  const [Sattelite, setSattelite] = React.useState(true);
  const map = useMap();
  var initialcenter = [33.52361143873816, 73.19812774658205];

  return (
    <>
      {!Sattelite && (
        <TileLayer
          attribution="openstreetmaps"
          id="mapbox streets"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          maxZoom={21}
        />
      )}
      {Sattelite && (
        <TileLayer
          attribution="Esri Online"
          id="esri"
          url="https://mt0.google.com/vt/lyrs=y&hl=en&x={x}&y={y}&z={z}"
          maxZoom={21}
        />
      )}
      <Control position="bottomleft">
        <>
          <div id="basemapcontrols">
            <div className="w-9"></div>
            <div className="leftMapControls space-y-2">
              <div className="ABC self-center">
                <div className="mr-1" onClick={() => setSattelite(!Sattelite)}>
                  {Sattelite ? (
                    <Image
                      style={{
                        backgroundColor: "white",
                        borderRadius: "10px",
                        border: "2px solid white",
                      }}
                      src={"/img/street.png"}
                      alt="Sattellite map"
                      height={50}
                      width={50}
                    />
                  ) : (
                    <Image
                      style={{
                        backgroundColor: "white",
                        borderRadius: "10px",
                        border: "2px solid white",
                      }}
                      src={"/img/sattelite.jpg"}
                      alt="OSM map"
                      height={50}
                      width={50}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      </Control>
    </>
  );
});
