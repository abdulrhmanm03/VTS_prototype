// components/GlobalThreatHeatMap.js
"use client";

import { useState } from "react";
import {
  MapContainer,
  TileLayer,
  CircleMarker,
  Tooltip,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import type { LatLngTuple } from "leaflet";

// Enhanced threat data with metadata
interface ThreatPoint {
  lat: number;
  lng: number;
  color: string;
  actor: string;
  type: string;
  description: string;
  severity: string;
}

const globalThreatData: ThreatPoint[] = [
  {
    lat: 20,
    lng: 15,
    color: "red",
    actor: "APT28",
    type: "Malware",
    description: "High risk malware detected",
    severity: "Critical",
  },
  {
    lat: 40,
    lng: 25,
    color: "yellow",
    actor: "Unknown",
    type: "Phishing",
    description: "Phishing campaigns reported",
    severity: "Medium",
  },
  {
    lat: 30,
    lng: 45,
    color: "yellow",
    actor: "APT10",
    type: "Ransomware",
    description: "Ransomware activity",
    severity: "Medium",
  },
  {
    lat: 25,
    lng: 55,
    color: "orange",
    actor: "DarkHydra",
    type: "Botnet",
    description: "Botnet C2 servers active",
    severity: "High",
  },
  {
    lat: 20,
    lng: 65,
    color: "red",
    actor: "Lazarus Group",
    type: "Malware",
    description: "Critical malware detected",
    severity: "Critical",
  },
  {
    lat: 35,
    lng: 75,
    color: "orange",
    actor: "APT33",
    type: "Exploit",
    description: "Zero-day exploit activity",
    severity: "High",
  },
  {
    lat: 30,
    lng: 85,
    color: "red",
    actor: "Charming Kitten",
    type: "Phishing",
    description: "Targeted phishing campaign",
    severity: "Critical",
  },
  {
    lat: 50,
    lng: 88,
    color: "yellow",
    actor: "Unknown",
    type: "Malware",
    description: "Suspicious malware samples",
    severity: "Medium",
  },
  {
    lat: 60,
    lng: 78,
    color: "yellow",
    actor: "APT29",
    type: "Ransomware",
    description: "Ransomware campaigns ongoing",
    severity: "Medium",
  },
];

const uaeThreatData: ThreatPoint[] = [
  {
    lat: 25.276987,
    lng: 55.296249,
    color: "red",
    actor: "APT28",
    type: "Malware",
    description: "Critical malware in Dubai",
    severity: "Critical",
  },
  {
    lat: 24.453884,
    lng: 54.3773438,
    color: "orange",
    actor: "APT33",
    type: "Exploit",
    description: "High risk exploit activity in Abu Dhabi",
    severity: "High",
  },
  {
    lat: 25.405216,
    lng: 55.513643,
    color: "yellow",
    actor: "Unknown",
    type: "Phishing",
    description: "Medium risk phishing in Sharjah",
    severity: "Medium",
  },
];

interface MapUpdaterProps {
  center: LatLngTuple;
  zoom: number;
}

const MapUpdater = ({ center, zoom }: MapUpdaterProps) => {
  const map = useMap();
  map.setView(center, zoom);
  return null;
};

const GlobalThreatHeatMap = () => {
  const [mode, setMode] = useState("global");

  const mapConfig =
    mode === "global"
      ? {
          center: [30, 40] as [number, number],
          zoom: 2,
          data: globalThreatData,
        }
      : {
          center: [24, 54.5] as [number, number],
          zoom: 7,
          data: uaeThreatData,
        };

  return (
    <div
      className="relative bg-white/5 rounded-2xl overflow-hidden mx-auto my-8 backdrop-blur-md 
      transition-shadow duration-300 hover:shadow-[0_0_30px_10px_rgba(59,130,246,0.7)]"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-blue-800/10 to-transparent pointer-events-none" />

      <div className="relative z-10 p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <span className="text-4xl mr-2">🌐</span>
            <h1 className="text-xl font-bold text-blue-400 drop-shadow-[0_0_12px_rgba(59,130,246,0.9)]">
              Global Threat Heat Map
            </h1>
          </div>

          <div className="flex space-x-2 bg-white/10 rounded-lg p-1">
            <button
              className={`px-3 py-1 rounded-md text-sm font-semibold transition ${
                mode === "global"
                  ? "bg-blue-500 text-white"
                  : "text-blue-300 hover:bg-white/5"
              }`}
              onClick={() => setMode("global")}
            >
              Global
            </button>
            <button
              className={`px-3 py-1 rounded-md text-sm font-semibold transition ${
                mode === "uae"
                  ? "bg-blue-500 text-white"
                  : "text-blue-300 hover:bg-white/5"
              }`}
              onClick={() => setMode("uae")}
            >
              UAE
            </button>
          </div>
        </div>

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
                <Tooltip
                  direction="top"
                  offset={[0, -10]}
                  opacity={1}
                  sticky
                  className="custom-tooltip"
                >
                  <div
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(30,58,138,0.8), rgba(59,130,246,0.6))",
                      padding: "6px 10px",
                      borderRadius: "8px",
                      color: "white",
                      fontSize: "0.75rem",
                      lineHeight: "1.3",
                      minWidth: "160px",
                    }}
                  >
                    <div
                      style={{
                        borderBottom: "1px solid rgba(255,255,255,0.3)",
                        paddingBottom: "2px",
                        marginBottom: "2px",
                      }}
                    >
                      <strong>Actor:</strong>{" "}
                      <span style={{ color: "#fbbf24" }}>{threat.actor}</span>
                    </div>
                    <div
                      style={{
                        borderBottom: "1px solid rgba(255,255,255,0.3)",
                        paddingBottom: "2px",
                        marginBottom: "2px",
                      }}
                    >
                      <strong>Type:</strong>{" "}
                      <span style={{ color: "#34d399" }}>{threat.type}</span>
                    </div>
                    <div
                      style={{
                        borderBottom: "1px solid rgba(255,255,255,0.3)",
                        paddingBottom: "2px",
                        marginBottom: "2px",
                      }}
                    >
                      <strong>Severity:</strong>{" "}
                      <span style={{ color: "#f87171" }}>
                        {threat.severity}
                      </span>
                    </div>
                    <div>
                      <strong>Description:</strong> {threat.description}
                    </div>
                  </div>
                </Tooltip>
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
