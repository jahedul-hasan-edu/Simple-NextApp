"use client";
import axios from "axios";

export function getFeatureInfo(centroid, map) {
    let size = map.getSize(),
      crs = map.options.crs,
      bounds = map.getBounds(),
      xy = map.latLngToContainerPoint(centroid, map.getZoom()),
      sw = crs.project(bounds.getSouthWest()),
      ne = crs.project(bounds.getNorthEast());
  
    let params = {
      service: "WMS",
      version: "1.1.1",
      request: "GetFeatureInfo",
      INFO_FORMAT: "application/json",
      BBOX: sw.x + "," + sw.y + "," + ne.x + "," + ne.y,
      WIDTH: size.x,
      HEIGHT: size.y,
      layers: "revetment:revetment",
      query_layers: "revetment:revetment",
      srs: crs.code,
      x: Math.round(xy.x),
      y: Math.round(xy.y),
      feature_count: 1,
    };
  
    return axios.get(`http://65.1.151.250:8080/geoserver/revetment/wms?`, { params: params })
    .then(function (response) {
      if (response && response?.data?.features && response?.data?.features.length > 0) {
        return response?.data?.features[0].properties;
      } else {
        return null;
      }
    })
    .catch(function (error) {
      console.error(error);
      return null;
    });    
};