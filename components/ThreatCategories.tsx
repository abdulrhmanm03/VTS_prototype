"use client";

import { FC } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Folders, Shield, AlertCircle, Bug, Globe, Lock, Wifi, Cloud, Server, User } from "lucide-react";

const threatCategories = [
  { name: 'APT Groups', active: 23, trend: -12, level: 'CRITICAL', icon: Shield },
  { name: 'Ransomware', active: 156, trend: 8, level: 'CRITICAL', icon: Lock },
  { name: 'Supply Chain', active: 89, trend: -34, level: 'MEDIUM', icon: Globe },
  { name: 'Zero-Day', active: 12, trend: -5, level: 'CRITICAL', icon: AlertCircle },
  { name: 'Phishing', active: 12, trend: 4, level: 'HIGH', icon: User },
  { name: 'IoT Vulnerabilities', active: 47, trend: 10, level: 'HIGH', icon: Wifi },
  { name: 'Botnet Activity', active: 32, trend: -7, level: 'CRITICAL', icon: Bug },
  { name: 'Cloud Misconfig', active: 18, trend: -2, level: 'MEDIUM', icon: Cloud },
  { name: 'Malware', active: 66, trend: 5, level: 'MEDIUM', icon: Server },
  { name: 'Social Engineering', active: 29, trend: -3, level: 'HIGH', icon: Folders },
];

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

const ThreatCategories: FC = () => {
  return (
    <Card className="bg-[#0e1321] border-none text-white h-[600px] shadow-lg backdrop-blur-md hover:shadow-[0_0_30px_rgba(59,130,246,0.6)] transition-shadow duration-300">
      <CardHeader>
        <CardTitle className="text-lg font-semibold flex items-center gap-2 text-blue-400 drop-shadow-[0_0_12px_rgba(59,130,246,0.9)]">
          <Folders className="h-6 w-6 text-blue-400" />
          Threat Categories
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2 overflow-y-auto hide-scrollbar">
        {threatCategories.map((threat) => {
          const Icon = threat.icon;
          return (
            <Card
              key={threat.name}
              className={`
                relative border-none text-white overflow-hidden rounded-xl
                bg-white/5 shadow-md backdrop-blur-md
                hover:shadow-[0_0_16px_rgba(59,130,246,0.5)] transition-all duration-300
                h-20 flex items-center
              `}
            >
              {/* Gradient Overlay */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${threatGradients[threat.level as keyof typeof threatGradients]} pointer-events-none`}
              />
              <div className="relative z-10 w-full px-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-white font-semibold text-xs truncate flex items-center gap-2">
                    {threat.name} 
                    <Icon className="h-5 w-5 text-blue-400" /> {/* Inline icon */}
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
                  <span className="font-bold text-white">{threat.active}</span>
                  <span>• {threat.trend}</span>
                </div>
              </div>
            </Card>
          );
        })}
      </CardContent>
    </Card>
  );
};

export default ThreatCategories;