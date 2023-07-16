"use client";
import L from "leaflet";
// import markerIcon from "../../../../public/img/LocationIcon.png";

var MarkerIcon = new L.Icon({
  // iconUrl: require("../../../../public/LocationIcon.png"),
  // shadowUrl: require("../../../../public/img/marker_shadow.png").default,
  iconSize: [35, 35],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

export default MarkerIcon;
