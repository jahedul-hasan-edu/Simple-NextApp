export default {
  geoserver: {
    workspace:"revetment",
    baseURL: `http://65.1.151.250:8080/geoserver/revetment/wms?`,
    layers: [
      {
        name: "revetment",
        label: "Revetment",
        checked: true,
        opacity: 0.7,
        // zoomstart: 10,
        // zoomend: 0,
      },
    ],
  },
};
