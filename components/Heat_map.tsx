// components/GlobalThreatHeatMap.js
"use client";

import { MapContainer, TileLayer, CircleMarker, Tooltip } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const threatData = [
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

const GlobalThreatHeatMap = () => {
  return (
    <div
  className="relative bg-white/5 rounded-2xl overflow-hidden mx-auto my-8 backdrop-blur-md 
             transition-shadow duration-300 hover:shadow-[0_0_30px_10px_rgba(59,130,246,0.7)]"
    >
      {/* Gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-blue-800/10 to-transparent pointer-events-none" />

      <div className="relative z-10 p-4">
        <div className="flex items-center mb-4">
          <span className="text-4xl mr-2">🌐</span>
          <h1 className="text-xl font-bold text-white">Global Threat Heat Map</h1>
        </div>

        {/* 🔹 More padding on all sides */}
        <div className="w-full h-[350px] rounded-lg overflow-hidden p-6 pt-8">
          <MapContainer
            center={[30, 40]}
            zoom={2}
            scrollWheelZoom={true}
            className="w-full h-full rounded-lg"
          >
            {/* <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            /> */}

<TileLayer
  url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://www.carto.com/">CARTO</a>'
  subdomains={["a","b","c","d"]}
/>


            {threatData.map((threat, idx) => (
              <CircleMarker
                key={idx}
                center={[threat.lat, threat.lng]}
                radius={8}
                color={threat.color}
                fillColor={threat.color}
                fillOpacity={0.7}
                className="animate-pulse"
              >
                <Tooltip>{`Threat Level: ${threat.color}`}</Tooltip>
              </CircleMarker>
            ))}
          </MapContainer>
        </div>

        <div className="absolute bottom-4 right-4 flex items-center space-x-2">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
          <span className="text-xs text-white/70">Live Data Stream</span>
        </div>
      </div>
    </div>
  );
};

export default GlobalThreatHeatMap;