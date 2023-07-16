"use client";
import { MapContainer, Marker, Popup, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import FullScreenControl from "./mapComponents/FullScreenController";
import Geocoder from "./mapComponents/GeoCoder";
import { memo, useRef, useState } from "react";
// import InPrint from "./mapComponents/InPrint";
// import BaseMapControll from "./mapComponents/BaseMapControll";
// import Control from "react-leaflet-custom-control";
// import MeaureTool from "./mapComponents/MeasureTool";
// import { useState } from "react";
import BaseMapControl from "./mapComponents/BaseMapControl";
import { getFeatureInfo } from "./mapComponents/GetFeatureInfo";

// function MyComponent() {
//   const [zoomLevel, setZoomLevel] = useState(5); // initial zoom level provided for MapContainer

//   const mapEvents = useMapEvents({
//     zoomend: () => {
//       setZoomLevel(mapEvents.getZoom());
//     },
//   });

//   console.log(zoomLevel);

//   return null;
// }

const MapEventsHandler = ({ setMarkerPosition, setFeatureInfo }) => {
  const map = useMapEvents({
    click: async (e) => {
      const result = await getFeatureInfo(e.latlng, map);
      setFeatureInfo(result);
      setMarkerPosition(e.latlng);
    },
  });

  return null;
};

const LeafletMap = () => {
  const mapRef = useRef();
  const [featureInfo, setFeatureInfo] = useState(null);
  const [markerPosition, setMarkerPosition] = useState(null);

  return (
    <div className="w-full h-screen ">
      <MapContainer
        id="map"
        className="map z-0"
        center={[23.836580105116106, 90.37232070576533]}
        zoom={9}
        minZoom={4}
        maxZoom={23}
        zoomControl={false}
        ref={mapRef}>    
        <BaseMapControl />
        {/* <MeaureTool /> */}
        <FullScreenControl position="bottomright" />
        <MapEventsHandler setMarkerPosition={setMarkerPosition} setFeatureInfo={setFeatureInfo} getFeatureInfo={getFeatureInfo} />
        {markerPosition && featureInfo && (
            <Popup position={markerPosition}>
              {/* Display the feature info here. Modify this according to your data structure. */}
              <p><b>Name:</b> {featureInfo.name}</p>
              <p><b>Description:</b> {featureInfo.description}</p>
            </Popup>
        )}
        <Geocoder />
      </MapContainer>
    
    </div>
  );
};
export default memo(LeafletMap);