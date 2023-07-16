"use client";
import { useEffect } from "react";
import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";
import L from "leaflet";
import { useMap } from "react-leaflet";
import "leaflet-geosearch/assets/css/leaflet.css";
import MarkerIcon from "./MarkerIcon";

const Geocoder = () => {
  const map = useMap();

  useEffect(() => {
    const provider = new OpenStreetMapProvider();

    // const provider = new GoogleProvider({
    //   params: {
    //     key: apiKey,
    //     language: "eng",
    //     region: "pak",
    //   },
    // });

    const searchControl = new GeoSearchControl({
      provider: provider,
      showMarker: true,
      style: "bar",
      // marker: {
      //   // optional: L.Marker    - default L.Icon.Default
      //   icon: new L.Icon.Default(),
      //   draggable: false,
      // },
      marker: MarkerIcon,
    });

    map.addControl(searchControl);
    return () => map.removeControl(searchControl);
  }, [map]);

  return null;
};

export default Geocoder;
