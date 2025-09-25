"use client";

import { FC } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Sun } from "lucide-react";

const threatCategories = [
  { name: 'APT Groups', active: 23, trend: -12, color: 'bg-red-700', trendColor: 'text-red-500' },
  { name: 'Ransomware', active: 156, trend: 8, color: 'bg-green-700', trendColor: 'text-green-500' },
  { name: 'Supply Chain', active: 89, trend: -34, color: 'bg-red-700', trendColor: 'text-red-500' },
  { name: 'Zero-Day', active: 12, trend: -5, color: 'bg-red-700', trendColor: 'text-red-500' },
  { name: 'Phishing', active: 12, trend: 4, color: 'bg-green-700', trendColor: 'text-green-500' },
  { name: 'IoT Vulnerabilities', active: 47, trend: 10, color: 'bg-yellow-700', trendColor: 'text-green-500' },
  { name: 'Botnet Activity', active: 32, trend: -7, color: 'bg-red-700', trendColor: 'text-red-500' },
  { name: 'Cloud Misconfig', active: 18, trend: -2, color: 'bg-red-700', trendColor: 'text-red-500' },
  { name: 'Malware', active: 66, trend: 5, color: 'bg-green-700', trendColor: 'text-green-500' },
  { name: 'Social Engineering', active: 29, trend: -3, color: 'bg-red-700', trendColor: 'text-red-500' },
];

const ThreatCategories: FC = () => {
  return (
    <Card className="bg-[#0e1321] border-none overflow-y-auto text-white h-[600px] hide-scrollbar">
      <CardHeader>
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          Threat Categories
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 h-[530px] pr-1">
        {threatCategories.map(({ name, active, trend, color, trendColor }) => (
          <Card
            key={name}
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
            <CardHeader className="flex items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium flex items-center">
                {name}
              </CardTitle>
              <div className="text-2xl font-bold text-gray-200">{active}</div>
            </CardHeader>
          </Card>
        ))}
      </CardContent>
    </Card>
  );
};

export default ThreatCategories;