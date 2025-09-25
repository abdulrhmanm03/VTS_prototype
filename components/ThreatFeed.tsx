"use client";

import { FC } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Clock } from "lucide-react";

const threatLevels = {
  CRITICAL: "bg-red-600 text-white",
  HIGH: "bg-orange-500 text-black",
  MEDIUM: "bg-blue-500 text-white",
};

const threats = [
  { id: 1, level: "CRITICAL", confidence: "96%", title: "APT40 Maritime Infrastructure", region: "Asia-Pacific", time: "2m ago" },
  { id: 2, level: "HIGH", confidence: "89%", title: "LockBit 3.0 Ransomware Evolution", region: "Global", time: "8m ago" },
  { id: 3, level: "HIGH", confidence: "92%", title: "Supply Chain Compromise", region: "UAE", time: "15m ago" },
  { id: 4, level: "CRITICAL", confidence: "87%", title: "Zero-Day Exploitation", region: "MENA", time: "23m ago" },
  { id: 5, level: "MEDIUM", confidence: "94%", title: "Phishing Campaign Surge", region: "Global", time: "31m ago" },
  { id: 6, level: "HIGH", confidence: "90%", title: "IoT Device Vulnerability", region: "Europe", time: "45m ago" },
  { id: 7, level: "MEDIUM", confidence: "88%", title: "Social Engineering Alert", region: "North America", time: "1h ago" },
  { id: 8, level: "CRITICAL", confidence: "93%", title: "Critical Cloud Misconfiguration", region: "APAC", time: "1h 15m ago" },
  { id: 9, level: "HIGH", confidence: "85%", title: "Ransomware Email Campaign", region: "Europe", time: "1h 30m ago" },
  { id: 10, level: "MEDIUM", confidence: "91%", title: "Malware Botnet Activity", region: "Global", time: "2h ago" },
];

const LiveThreatFeed: FC = () => {
  return (
    <Card className="bg-[#0e1321] border-none text-white h-[600px] overflow-y-auto hide-scrollbar">
      <CardHeader>
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          Live Threat Feed 
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {threats.map((threat) => (
          <Card
            key={threat.id}
            className="
              w-full
              h-24
              bg-[#171e30]/70
              border border-[#2a3145] 
              p-3 
              shadow-md
              backdrop-blur-md
              transition-all duration-300 
              hover:bg-gradient-to-r hover:from-blue-400/20 hover:to-blue-600/20
              hover:shadow-[0_0_20px_rgba(59,130,246,0.6)]
              hover:-translate-y-1
              overflow-hidden
            "
          >
            <div className="flex items-center justify-between">
              <h3 className="text-white font-semibold text-sm truncate">{threat.title}</h3>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${threatLevels[threat.level as keyof typeof threatLevels]}`}>
                {threat.level}
              </span>
            </div>
            <div className="text-xs text-gray-400 mt-1 flex gap-2 items-center">
              <span>{threat.region}</span>
              <span>• {threat.confidence} confidence</span>
            </div>
            <div className="flex items-center text-xs text-gray-500 mt-1">
              <Clock className="h-3 w-3 mr-1" /> {threat.time}
            </div>
          </Card>
        ))}
      </CardContent>
    </Card>
  );
};

export default LiveThreatFeed;