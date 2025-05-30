// GlobeMap.js
import { useEffect, useRef } from "react";
import { createRoot } from 'react-dom/client'
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { locations } from "../data";
import CardLocation from "./CardLocation";
import "./globe.css"
import { Chip } from "@heroui/react";

const GlobeMap = ({mapRef, getBackgroundColor}) => {

  const mapContainer = useRef(null);

  const elementsOnMapRef = useRef({});


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
      maxZoom: 8,
      attributionControl: false
    });

    mapRef.current.addControl(new maplibregl.NavigationControl(), 'bottom-left');

    mapRef.current.on('style.load', () => {
      mapRef.current.setProjection({
        type: 'globe',
      });
    });

    mapRef.current.on('load', () => {
      locations.forEach((location) => {
        const el = document.createElement('p');
        el.className = 'marker'
        el.style.fontSize = '20px';
        el.innerHTML = location.type;
        el.style.display = 'block';
        el.style.alignItems = 'center';
        el.style.justifyContent = 'center';

        el.addEventListener('click', () => {
          mapRef.current.flyTo({
            center: location.coordinates,
            zoom: 8,
            speed: 1.2,
            curve: 1.42
          });
        });

        const m = new maplibregl.Marker({element: el})
          .setLngLat(location.coordinates)
          .setOffset([0, -20])
          .addTo(mapRef.current);

        let popup;

        el.addEventListener('mouseover', () => {
          const popupDiv = document.createElement('div');
          createRoot(popupDiv).render(<CardLocation location={location} mapRef={mapRef} getBackgroundColor={getBackgroundColor} isOnMap />);

          popup = new maplibregl.Popup({
            className: 'custom-popup',
            closeButton: false,
            closeOnClick: false,
            offset: 25,
          })
            .setDOMContent(popupDiv)
            .setLngLat(location.coordinates)
            .setOffset([0, -50])
            .addTo(mapRef.current);

          m.setPopup(popup);
        });

        el.addEventListener('mouseleave', () => {
          if (popup) popup.remove();
        });

        el.addEventListener('click', () => {
          mapRef.current.flyTo({
            center: location.coordinates,
            zoom: 8,
            speed: 1.2,
            curve: 1.42
          });
        });


        elementsOnMapRef.current[location.name] = m;

      });
    });

  }, []);

  return (
    <div
      ref={mapContainer}
      className="w-[40dvw] h-[95dvh] mr-5 bg-[url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRI1yAubPrxKhUt3-D4sm8VpaC80KgR_PttJA&s')] rounded-lg"
    >
      <div className="flex justify-center w-full z-0">
        <Chip className="mt-[100px] mx-auto" variant="bordered" color="success">Explore the destinations directly on the globe</Chip>
      </div>
      <p className="text-center text-5xl text-white font-title mt-3">Interactive map</p>
    </div>
  );
};

export default GlobeMap;
