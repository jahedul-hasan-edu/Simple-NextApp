
"use client";
import React, { useRef } from 'react';
import { FeatureGroup } from 'react-leaflet';
import { EditControl } from 'react-leaflet-draw';


const DraggableMarker = ({ handleLatLng }) => {
    const drawnItems = useRef();
    // Create handlers for the drawing events
    const onEditPath = (e) => {
        const { layers: { _layers } } = e;
        // Loop over the layers and call handleLatLng for each
        for (const layer of Object.values(_layers)) {
            handleLatLng(layer._latlng.lat, layer._latlng.lng, false);
        }
    }

    const onCreate = (e) => {
        const { layerType, layer } = e;
        if (layerType === 'marker') {
            const { lat, lng } = layer.getLatLng();
            handleLatLng(lat, lng, false);
            // Delete all previous markers
            drawnItems.current.eachLayer((layer) => {
                drawnItems.current.removeLayer(layer);
            });
            // Add the newly created marker
            drawnItems.current.addLayer(layer);
        }
    }

    const onDeleted = (e) => {
        handleLatLng(null, null, true);
    };

    return (
        <FeatureGroup ref={drawnItems}>
        <EditControl
            position='topright'
            onEdited={onEditPath}
            onCreated={onCreate}
            onDeleted={onDeleted}
            draw={{
                polyline: false,
                polygon: false,
                rectangle: false,
                circle: false,
                circlemarker: false
            }}
        />
    </FeatureGroup>
    );
}

export default DraggableMarker;
