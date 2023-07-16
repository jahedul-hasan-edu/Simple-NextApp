"use client";
import L from "leaflet";
import "leaflet.fullscreen";
import "leaflet.fullscreen/Control.FullScreen.css";

import { useMap } from "react-leaflet";
import { useEffect } from "react";

function FullScreenControl(props) {
  const map = useMap();

  useEffect(() => {
    const fcControl = L.control.fullscreen({
      position: props.position, // change the position of the button can be topleft, topright, bottomright or bottomleft, default topleft
      title: "Show me the fullscreen !", // change the title of the button, default Full Screen
      titleCancel: "Exit fullscreen mode", // change the title of the button when fullscreen is on, default Exit Full Screen
      content: null, // change the content of the button, can be HTML, default null
      forceSeparateButton: true, // force separate button to detach from zoom buttons, default false
      forcePseudoFullscreen: true, // force use of pseudo full screen even if full screen API is available, default false
      fullscreenElement: false, // Dom element to render in full screen, false by default, fallback to map._container
    });
    map.addControl(fcControl);
    return () => map.removeControl(fcControl);
  }, [map]);

  return null;
}

export default FullScreenControl;
