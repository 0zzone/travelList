// GlobeMap.js
import { useEffect, useRef } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { locations } from "../data";

const GlobeMap = () => {
  const mapContainer = useRef(null);
  const mapRef = useRef(null);

  useEffect(() => {
    if (mapRef.current) {
      return;
    }

    mapRef.current = new maplibregl.Map({
      container: mapContainer.current,
      style: "https://api.maptiler.com/maps/basic-v2-dark/style.json?key=fOmpZv3kQMBcpznjK9v6",
      center: [0, 0],
      zoom: 2,
      minZoom:2,
      maxZoom: 5,
    });

    mapRef.current.on('style.load', () => {
      mapRef.current.setProjection({
        type: 'globe', // Set projection to globe
      });
    });

    mapRef.current.on('load', () => {
      locations.forEach((location) => {
        const el = document.createElement('div');
        el.className = 'marker'
        el.style.width = '16px';
        el.style.height = '16px';
        el.style.borderRadius = '50%';
        el.style.backgroundColor = '#06c';
        el.style.boxShadow = '0 0 4px rgba(0, 0, 0, 0.3)';

        el.addEventListener('click', () => {
          mapRef.current.flyTo({
            center: location.coordinates,
            zoom: 4,
            speed: 1.2,
            curve: 1.42
          });
        });

        new maplibregl.Marker({element: el})
          .setLngLat(location.coordinates)
          .addTo(mapRef.current);
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
