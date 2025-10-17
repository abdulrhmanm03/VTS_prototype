"use client";

import { FC, useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Clock, Radio } from "lucide-react";

const threatGradients = {
  CRITICAL: "from-red-900/20 via-red-800/10 to-transparent",
  HIGH: "from-orange-900/20 via-orange-800/10 to-transparent",
  MEDIUM: "from-blue-900/20 via-blue-800/10 to-transparent",
};

const badgeColors = {
  CRITICAL: "bg-red-600 text-white",
  HIGH: "bg-orange-500 text-black",
  MEDIUM: "bg-blue-500 text-white",
};

const initialThreats = [
  {
    id: 1,
    level: "CRITICAL",
    confidence: "96%",
    title: "APT40 Maritime Infrastructure",
    region: "Asia-Pacific",
    time: "2m ago",
  },
  {
    id: 2,
    level: "HIGH",
    confidence: "89%",
    title: "LockBit 3.0 Ransomware Evolution",
    region: "Global",
    time: "8m ago",
  },
  {
    id: 3,
    level: "HIGH",
    confidence: "92%",
    title: "Supply Chain Compromise",
    region: "UAE",
    time: "15m ago",
  },
];

const threatPool = [
  {
    level: "CRITICAL",
    confidence: "87%",
    title: "Zero-Day Exploitation",
    region: "MENA",
  },
  {
    level: "MEDIUM",
    confidence: "94%",
    title: "Phishing Campaign Surge",
    region: "Global",
  },
  {
    level: "HIGH",
    confidence: "90%",
    title: "IoT Device Vulnerability",
    region: "Europe",
  },
  {
    level: "MEDIUM",
    confidence: "88%",
    title: "Social Engineering Alert",
    region: "North America",
  },
  {
    level: "CRITICAL",
    confidence: "93%",
    title: "Critical Cloud Misconfiguration",
    region: "APAC",
  },
];

const LiveThreatFeed: FC = () => {
  const [threats, setThreats] = useState(initialThreats);

  useEffect(() => {
    const interval = setInterval(() => {
      const randomThreat =
        threatPool[Math.floor(Math.random() * threatPool.length)];
      const newThreat = {
        ...randomThreat,
        id: Date.now(),
        time: "Just now",
      };

      setThreats((prev) => [newThreat, ...prev].slice(0, 10)); // keep max 10 threats
    }, 5000); // every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <Card className="bg-[#0e1321] border-none text-white h-[600px] shadow-lg backdrop-blur-md hover:shadow-[0_0_30px_rgba(59,130,246,0.6)] transition-shadow duration-300">
      <CardHeader>
        <CardTitle className="text-lg font-semibold flex items-center gap-2 text-blue-400 drop-shadow-[0_0_12px_rgba(59,130,246,0.9)]">
          <Radio className="h-6 w-6 text-blue-400 animate-pulse" />
          Live Threat Feed
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2 overflow-y-auto hide-scrollbar">
        {threats.map((threat) => (
          <Card
            key={threat.id}
            className={`
              relative border-none text-white overflow-hidden rounded-xl 
              bg-white/5 shadow-md backdrop-blur-md 
              hover:shadow-[0_0_16px_rgba(59,130,246,0.5)] transition-all duration-300
              h-20 flex items-center
            `}
          >
            {/* Gradient Overlay */}
            <div
              className={`absolute inset-0 bg-gradient-to-br ${
                threatGradients[threat.level as keyof typeof threatGradients]
              } pointer-events-none`}
            />
            <div className="relative z-10 w-full px-3">
              <div className="flex items-center justify-between">
                <h3 className="text-white font-semibold text-xs truncate">
                  {threat.title}
                </h3>
                <span
                  className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
                    badgeColors[threat.level as keyof typeof badgeColors]
                  }`}
                >
                  {threat.level}
                </span>
              </div>
              <div className="text-[11px] text-gray-400 mt-0.5 flex gap-2 items-center">
                <span>{threat.region}</span>
                <span>• {threat.confidence} confidence</span>
              </div>
              <div className="flex items-center text-[10px] text-gray-500 mt-0.5">
                <Clock className="h-3 w-3 mr-1" /> {threat.time}
              </div>
            </div>
          </Card>
        ))}
      </CardContent>
    </Card>
  );
};

export default LiveThreatFeed;
