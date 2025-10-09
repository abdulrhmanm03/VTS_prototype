"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@/components/ui/tooltip";
import { Activity, MapPin, Server, Link2 } from "lucide-react";
import { ResponsiveContainer, AreaChart, Area } from "recharts";

const enrichments = [
  {
    indicator: "malicious-domain.com",
    reputation: "High Risk",
    categories: ["Phishing", "Malware Distribution"],
    lastUpdate: "2025-09-15",
    confidence: 95,
    geo: "Russia",
    asn: "AS203020 EvilNet Ltd.",
    related: ["suspicious-login.net", "malware-dropper.io"],
    activity: [
      { day: "Mon", hits: 3 },
      { day: "Tue", hits: 8 },
      { day: "Wed", hits: 12 },
      { day: "Thu", hits: 9 },
      { day: "Fri", hits: 14 },
    ],
  },
  {
    indicator: "45.67.89.120",
    reputation: "Medium Risk",
    categories: ["Botnet", "Spam Source"],
    lastUpdate: "2025-08-10",
    confidence: 78,
    geo: "Ukraine",
    asn: "AS48031 HostLine ISP",
    related: ["darkspam.cc", "45.67.89.130"],
    activity: [
      { day: "Mon", hits: 2 },
      { day: "Tue", hits: 5 },
      { day: "Wed", hits: 4 },
      { day: "Thu", hits: 9 },
      { day: "Fri", hits: 6 },
    ],
  },
  {
    indicator: "cve-2025-44321",
    reputation: "Critical",
    categories: ["Exploit", "Zero-Day"],
    lastUpdate: "2025-10-01",
    confidence: 99,
    geo: "Global",
    asn: "N/A",
    related: ["0day-market.org", "exploit-scan.net"],
    activity: [
      { day: "Mon", hits: 10 },
      { day: "Tue", hits: 13 },
      { day: "Wed", hits: 17 },
      { day: "Thu", hits: 20 },
      { day: "Fri", hits: 23 },
    ],
  },
];

export default function Enrichment() {
  return (
    <TooltipProvider>
      <div className="space-y-6 text-white">
        {enrichments.map((item, idx) => (
          <Card
            key={idx}
            className={`bg-white/5 rounded-2xl backdrop-blur-md shadow-lg transition-all hover:shadow-[0_0_30px_rgba(59,130,246,0.6)] ${
              item.reputation === "Critical"
                ? "border border-red-500/30"
                : item.reputation === "High Risk"
                ? "border border-orange-500/30"
                : "border border-yellow-500/30"
            }`}
          >
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <div className="flex flex-col">
                  <span className="font-mono text-lg">{item.indicator}</span>
                  <div className="text-xs text-gray-400 mt-1">
                    Updated: {item.lastUpdate}
                  </div>
                </div>
                <Badge
                  className={`${
                    item.reputation === "Critical"
                      ? "bg-red-600"
                      : item.reputation === "High Risk"
                      ? "bg-orange-500"
                      : "bg-yellow-400"
                  } text-white`}
                >
                  {item.reputation}
                </Badge>
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">
              {/* Confidence + Sparkline */}
              <div className="flex items-center justify-between">
                <div className="text-sm text-white/70">
                  Confidence:{" "}
                  <span
                    className={`font-semibold ${
                      item.confidence > 90
                        ? "text-green-400"
                        : item.confidence > 70
                        ? "text-yellow-400"
                        : "text-red-400"
                    }`}
                  >
                    {item.confidence}%
                  </span>
                </div>
                <div className="w-32 h-10">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={item.activity}>
                      <Area
                        type="monotone"
                        dataKey="hits"
                        stroke="#3b82f6"
                        fill="#3b82f6"
                        fillOpacity={0.3}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Category Tags */}
              <div className="flex flex-wrap gap-2">
                {item.categories.map((cat, i) => (
                  <Badge
                    key={i}
                    variant="outline"
                    className="border-white/20 text-white/80 bg-white/5"
                  >
                    {cat}
                  </Badge>
                ))}
              </div>

              {/* Metadata Info Row */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-2 text-sm">
                <div className="flex items-center gap-2 text-white/70">
                  <MapPin className="w-4 h-4 text-blue-400" />
                  <Tooltip>
                    <TooltipTrigger>{item.geo}</TooltipTrigger>
                    <TooltipContent>Geolocation</TooltipContent>
                  </Tooltip>
                </div>

                <div className="flex items-center gap-2 text-white/70">
                  <Server className="w-4 h-4 text-purple-400" />
                  <Tooltip>
                    <TooltipTrigger>{item.asn}</TooltipTrigger>
                    <TooltipContent>Autonomous System (ISP)</TooltipContent>
                  </Tooltip>
                </div>

                <div className="flex items-center gap-2 text-white/70">
                  <Activity className="w-4 h-4 text-green-400" />
                  <Tooltip>
                    <TooltipTrigger>Active in last 7 days</TooltipTrigger>
                    <TooltipContent>Activity trend from collected logs</TooltipContent>
                  </Tooltip>
                </div>
              </div>

              {/* Related Indicators */}
              <div className="mt-3">
                <div className="flex items-center gap-2 mb-2 text-sm text-gray-400">
                  <Link2 className="w-4 h-4 text-blue-400" />
                  Related Indicators
                </div>
                <div className="flex flex-wrap gap-2">
                  {item.related.map((rel, i) => (
                    <Badge
                      key={i}
                      variant="outline"
                      className="border-blue-400/30 text-blue-300 bg-blue-900/10"
                    >
                      {rel}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </TooltipProvider>
  );
}