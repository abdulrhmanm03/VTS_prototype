"use client";

import { FC } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Clock, Radio } from "lucide-react";

const actorGradients = {
  CRITICAL: "from-red-900/20 via-red-800/10 to-transparent",
  HIGH: "from-orange-900/20 via-orange-800/10 to-transparent",
  MEDIUM: "from-blue-900/20 via-blue-800/10 to-transparent",
};

const badgeColors = {
  CRITICAL: "bg-red-600 text-white",
  HIGH: "bg-orange-500 text-black",
  MEDIUM: "bg-blue-500 text-white",
};

const actors = [
  { id: 1, level: "CRITICAL", name: "APT29 (Cozy Bear)", campaign: "Advanced Espionage Targeting Governments", region: "Global", time: "1h ago" },
  { id: 2, level: "HIGH", name: "LockBit 4.0", campaign: "Ransomware-as-a-Service Expansion", region: "Global", time: "2h ago" },
  { id: 3, level: "HIGH", name: "TA505", campaign: "Financial Malware & Phishing Campaigns", region: "Europe & North America", time: "3h ago" },
  { id: 4, level: "CRITICAL", name: "Hafnium", campaign: "Microsoft Exchange Zero-Day Exploitation", region: "Global", time: "4h ago" },
  { id: 5, level: "MEDIUM", name: "FIN7", campaign: "Point-of-Sale Malware Attacks", region: "North America", time: "5h ago" },
  { id: 6, level: "HIGH", name: "Cobalt Strike Users", campaign: "IoT & Network Intrusions", region: "Europe & Asia", time: "6h ago" },
  { id: 7, level: "MEDIUM", name: "Silent Lynx", campaign: "Credential Theft & Social Engineering", region: "North America", time: "7h ago" },
  { id: 8, level: "CRITICAL", name: "Chimera", campaign: "Cloud Misconfiguration Exploits", region: "APAC", time: "8h ago" },
];


const TrendingThreatActors: FC = () => {
  return (
    <Card className="bg-[#0e1321] border-none text-white h-[600px] shadow-lg backdrop-blur-md hover:shadow-[0_0_30px_rgba(59,130,246,0.6)] transition-shadow duration-300">
      <CardHeader>
        <CardTitle className="text-lg font-semibold flex items-center gap-2 text-blue-400 drop-shadow-[0_0_12px_rgba(59,130,246,0.9)]">
          <Radio className="h-6 w-6 text-blue-400 animate-pulse" />
          Top Threat Actors
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2 overflow-y-auto hide-scrollbar">
        {actors.map((actor) => (
          <Card
            key={actor.id}
            className={`
              relative border-none text-white overflow-hidden rounded-xl 
              bg-white/5 shadow-md backdrop-blur-md 
              hover:shadow-[0_0_16px_rgba(59,130,246,0.5)] transition-all duration-300
              h-20 flex items-center
            `}
          >
            {/* Gradient Overlay */}
            <div
              className={`absolute inset-0 bg-gradient-to-br ${actorGradients[actor.level as keyof typeof actorGradients]} pointer-events-none`}
            />
            <div className="relative z-10 w-full px-3">
              <div className="flex items-center justify-between">
                <h3 className="text-white font-semibold text-xs truncate">
                  {actor.name}  {actor.campaign}
                </h3>
                <span
                  className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
                    badgeColors[actor.level as keyof typeof badgeColors]
                  }`}
                >
                  {actor.level}
                </span>
              </div>
              <div className="text-[11px] text-gray-400 mt-0.5 flex gap-2 items-center">
                <span>{actor.region}</span>
              </div>
              <div className="flex items-center text-[10px] text-gray-500 mt-0.5">
                <Clock className="h-3 w-3 mr-1" /> {actor.time}
              </div>
            </div>
          </Card>
        ))}
      </CardContent>
    </Card>
  );
};

export default TrendingThreatActors;