"use client";
import React, { useState } from "react";
import { MapContainer, Marker, TileLayer, useMapEvents } from "react-leaflet";
import FullScreenControl from "../../Map/mapComponents/FullScreenController";
import LedgerCustomGeocoder from "./LedgerCustomGeocoder";
import Control from "react-leaflet-custom-control";

const MapEventsHandler = ({handleLatLng}) => {
  const [markerPosition, setMarkerPosition] = useState(null);

  useMapEvents({
    click: (e) => {
      const { latlng } = e;
      setMarkerPosition(latlng);
      handleLatLng(latlng)
    },
  });

  return markerPosition ? <Marker position={markerPosition} /> : null;
};
const MapSection = ({ handleLatLng }) => {
  return (
    <MapContainer className="w-full h-full" center={[23.777176, 90.399452]} zoom={13} minZoom={6}>
    <TileLayer
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    <FullScreenControl position="bottomleft" />
    <MapEventsHandler handleLatLng={handleLatLng}/>
    <LedgerCustomGeocoder />
  </MapContainer>
  )
}

export default MapSection