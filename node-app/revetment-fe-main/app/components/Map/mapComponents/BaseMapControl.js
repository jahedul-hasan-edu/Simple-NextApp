"use client";
import React from "react";
import { LayersControl, TileLayer } from "react-leaflet";
import WMSLayer from "./WMSLayer";

function BaseMapControl() {
  return (
    <>
      <LayersControl position="topright">
        <LayersControl.BaseLayer checked name="Street View">
          <TileLayer
            attribution="openstreetmaps"
            id="streets"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            maxZoom={22}
          />
        </LayersControl.BaseLayer>
        <LayersControl.BaseLayer name="Satellite View">
          <TileLayer
            attribution="openstreetmaps"
            id="satellite"
            url="https://mt0.google.com/vt/lyrs=y&hl=en&x={x}&y={y}&z={z}"
            maxZoom={22}
          />
        </LayersControl.BaseLayer>
        <LayersControl.BaseLayer name="Terrain View">
          <TileLayer
            attribution="Stamen Terrain"
            id="Terrain"
            url="https://stamen-tiles.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.jpg"
            maxZoom={22}
          />
        </LayersControl.BaseLayer>
        <LayersControl.Overlay name="Revetment">
          <WMSLayer />
        </LayersControl.Overlay>
      </LayersControl>
    </>
  );
}

export default BaseMapControl;
