// GlobeMap.js
import React, { useEffect, useRef } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

const GlobeMap = () => {
  const mapContainer = useRef(null);
  const mapRef = useRef(null);

  useEffect(() => {
    if (mapRef.current) {
      return;
    }


    mapRef.current = new maplibregl.Map({
      container: mapContainer.current,
      style: 'https://demotiles.maplibre.org/style.json',
      center: [0, 0],
      zoom: 2,
      minZoom:2,
      maxZoom: 3,
    });

    mapRef.current.on('style.load', () => {
      mapRef.current.setProjection({
            type: 'globe', // Set projection to globe
      });
      
    });
  }, []);

  return (
    <div
      ref={mapContainer}
      className="w-[40dvw] h-[95dvh] mr-5 bg-dark-light rounded-lg"
    />
  );
};

export default GlobeMap;
