// components/GlobalThreatHeatMap.js
"use client";

import { useState } from "react";
import { MapContainer, TileLayer, CircleMarker, Tooltip, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const globalThreatData = [
  { lat: 20, lng: 15, color: "red" },
  { lat: 40, lng: 25, color: "yellow" },
  { lat: 30, lng: 45, color: "yellow" },
  { lat: 25, lng: 55, color: "orange" },
  { lat: 20, lng: 65, color: "red" },
  { lat: 35, lng: 75, color: "orange" },
  { lat: 30, lng: 85, color: "red" },
  { lat: 50, lng: 88, color: "yellow" },
  { lat: 60, lng: 78, color: "yellow" },
];

const uaeThreatData = [
  { lat: 25.276987, lng: 55.296249, color: "red" }, // Dubai
  { lat: 24.453884, lng: 54.3773438, color: "orange" }, // Abu Dhabi
  { lat: 25.405216, lng: 55.513643, color: "yellow" }, // Sharjah
  { lat: 23.276987, lng: 56.296249, color: "red" }, // Dubai
  { lat: 24.453884, lng: 53.3773438, color: "orange" }, // Abu Dhabi
  { lat: 23.405216, lng: 52.513643, color: "yellow" }, // Sharjah
];

const MapUpdater = ({ center, zoom }) => {
  const map = useMap();
  map.setView(center, zoom);
  return null;
};

const GlobalThreatHeatMap = () => {
  const [mode, setMode] = useState("global");

  const mapConfig =
    mode === "global"
      ? { center: [30, 40], zoom: 2, data: globalThreatData }
      : { center: [24, 54.5], zoom: 7, data: uaeThreatData };

  return (
    <div
      className="relative bg-white/5 rounded-2xl overflow-hidden mx-auto my-8 backdrop-blur-md 
             transition-shadow duration-300 hover:shadow-[0_0_30px_10px_rgba(59,130,246,0.7)]"
    >
      {/* Gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-blue-800/10 to-transparent pointer-events-none" />

      <div className="relative z-10 p-4">
        {/* Header with toggle */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <span className="text-4xl mr-2">🌐</span>
            <h1 className="text-xl font-bold text-blue-400 drop-shadow-[0_0_12px_rgba(59,130,246,0.9)]">
              Global Threat Heat Map
            </h1>
          </div>

          {/* Toggle options */}
          <div className="flex space-x-2 bg-white/10 rounded-lg p-1">
            <button
              className={`px-3 py-1 rounded-md text-sm font-semibold transition ${
                mode === "global" ? "bg-blue-500 text-white" : "text-blue-300 hover:bg-white/5"
              }`}
              onClick={() => setMode("global")}
            >
              Global
            </button>
            <button
              className={`px-3 py-1 rounded-md text-sm font-semibold transition ${
                mode === "uae" ? "bg-blue-500 text-white" : "text-blue-300 hover:bg-white/5"
              }`}
              onClick={() => setMode("uae")}
            >
              UAE
            </button>
          </div>
        </div>

        {/* Map */}
        <div className="w-full h-[350px] rounded-lg overflow-hidden p-6 pt-8">
          <MapContainer
            center={mapConfig.center}
            zoom={mapConfig.zoom}
            scrollWheelZoom={true}
            className="w-full h-full rounded-lg"
          >
            <MapUpdater center={mapConfig.center} zoom={mapConfig.zoom} />

            <TileLayer
              url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://www.carto.com/">CARTO</a>'
              subdomains={["a", "b", "c", "d"]}
            />

            {mapConfig.data.map((threat, idx) => (
              <CircleMarker
                key={idx}
                center={[threat.lat, threat.lng]}
                radius={8}
                color={threat.color}
                fillColor={threat.color}
                fillOpacity={0.7}
                className="animate-pulse"
              >
                <Tooltip>{`Threat Level: ${threat.color.toUpperCase()}`}</Tooltip>
              </CircleMarker>
            ))}
          </MapContainer>
        </div>

        {/* Live data stream indicator */}
        <div className="absolute bottom-4 right-4 flex items-center space-x-2">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
          <span className="text-xs text-white/70">Live Data Stream</span>
        </div>
      </div>
    </div>
  );
};

export default GlobalThreatHeatMap;