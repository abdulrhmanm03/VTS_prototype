"use client";

import { useState, useMemo, JSX } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts";
import { AlertCircle, AlertTriangle, CheckCircle, Shield } from "lucide-react";

type Alert = {
  alert: string;
  solution: string;
  confidence: string;
  url: string;
  risk: string;
};

type ScanData = {
  name: string;
  ip: string;
  zap_scan: {
    alerts_count: number;
    alerts: Alert[];
  };
};

interface Props {
  data: ScanData;
}

const riskColors: Record<string, string> = {
  high: "bg-red-500 text-black",
  medium: "bg-yellow-500 text-black",
  low: "bg-blue-500 text-black",
  informational: "bg-gray-500 text-black",
};

const confColors: Record<string, string> = {
  high: "bg-green-500 text-black",
  medium: "bg-yellow-500 text-black",
  low: "bg-blue-500 text-black",
};

const riskIcons: Record<string, JSX.Element> = {
  high: <AlertCircle className="w-8 h-8 text-red-500 mb-2" />,
  medium: <AlertTriangle className="w-8 h-8 text-yellow-400 mb-2" />,
  low: <CheckCircle className="w-8 h-8 text-blue-500 mb-2" />,
};

// Utility function to truncate text
const truncate = (text: string, length: number) =>
  text.length > length ? text.slice(0, length) + "…" : text;

export default function ScanReport({ data }: Props) {
  const [expandedRisk, setExpandedRisk] = useState<string | null>(null);
  const [showSubUrls, setShowSubUrls] = useState(false);

  const baseAlerts = data.zap_scan.alerts.filter(
    (a) => a.risk.toLowerCase() !== "informational"
  );

  const alertCounts = useMemo(() => {
    const counts = { high: 0, medium: 0, low: 0 };
    baseAlerts.forEach((a) => {
      const r = a.risk.toLowerCase() as "high" | "medium" | "low";
      if (r === "high" || r === "medium" || r === "low") {
        counts[r] += 1;
      }
    });
    return counts;
  }, [baseAlerts]);

  const pieData = [
    { name: "High", value: alertCounts.high, color: "#f87171" },
    { name: "Medium", value: alertCounts.medium, color: "#facc15" },
    { name: "Low", value: alertCounts.low, color: "#60a5fa" },
  ];

  const distinctSubUrls = useMemo(() => {
    const urls = baseAlerts.map((a) => a.url);
    return Array.from(new Set(urls));
  }, [baseAlerts]);

  const filteredAlertsByRisk = (risk: string) =>
    baseAlerts.filter((a) => a.risk.toLowerCase() === risk.toLowerCase());

  const handleRiskCardClick = (risk: string) => {
    setExpandedRisk(expandedRisk === risk ? null : risk);
    setShowSubUrls(false);
  };

  const handleAssetCardClick = () => {
    setShowSubUrls(!showSubUrls);
    setExpandedRisk(null);
  };

  return (
    <div className="flex flex-col items-center justify-start space-y-6 py-6 px-4">
      {/* Asset Info */}
      <Card className="relative w-full max-w-3xl border-none text-white overflow-x-auto hide-scrollbar rounded-2xl bg-white/5 shadow-lg backdrop-blur-md hover:shadow-[0_0_30px_rgba(59,130,246,0.6)] transition duration-300">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 via-blue-800/5 to-transparent pointer-events-none" />
        <div className="relative z-10">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-blue-400 drop-shadow-[0_0_12px_rgba(59,130,246,0.9)]">
              Asset: {data.name}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-1 text-white/80">
            <p>
              <strong>IP:</strong> {data.ip}
            </p>
            <p>
              <strong>Total Alerts:</strong> {baseAlerts.length}
            </p>
          </CardContent>
        </div>
      </Card>

      {/* Summary Cards */}
      <div className="flex justify-center w-full">
        <div className="inline-grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 place-items-center">
          {/* Assets Discovered Card */}
          <Card
            onClick={handleAssetCardClick}
            className="cursor-pointer w-32 h-32 flex items-center justify-center rounded-full bg-white/10 border border-white/20 hover:shadow-[0_0_25px_rgba(59,130,246,0.5)] transition-all duration-300"
          >
            <CardContent className="text-center flex flex-col items-center justify-center">
              <Shield className="w-12 h-12 text-green-500 mb-2" />
              <CardTitle className="text-md font-semibold">Assets</CardTitle>
              <p className="text-2xl font-bold mt-1">{distinctSubUrls.length}</p>
            </CardContent>
          </Card>

          {/* Risk Cards */}
          {(["high", "medium", "low"] as const).map((risk) => (
            <Card
              key={risk}
              onClick={() => handleRiskCardClick(risk)}
              className={`cursor-pointer w-32 h-32 flex items-center justify-center rounded-full border border-white/20 text-white hover:shadow-lg transition-all duration-300 ${
                risk === "high"
                  ? "bg-red-500/20"
                  : risk === "medium"
                  ? "bg-yellow-400/20"
                  : "bg-blue-400/20"
              }`}
            >
              <CardContent className="text-center flex flex-col items-center justify-center">
                {riskIcons[risk]}
                <CardTitle className="text-lg font-semibold capitalize">{risk}</CardTitle>
                <p className="text-2xl font-bold mt-1">{alertCounts[risk]}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Pie Chart */}
      <Card className="w-full max-w-2xl bg-white/5 rounded-2xl p-4 shadow-lg backdrop-blur-md">
        <CardTitle className="mb-1 text-center font-bold text-2xl text-blue-400 drop-shadow-[0_0_12px_rgba(59,130,246,0.9)]">Alert Distribution</CardTitle>
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              outerRadius={80}
              innerRadius={40}
              label={({ name, value }) => `${name}: ${value}`}
            >
              {pieData.map((entry, idx) => (
                <Cell key={idx} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value: number, name: string) => [value, name]}
              contentStyle={{ backgroundColor: "#1e293b", color: "white" }}
            />
          </PieChart>
        </ResponsiveContainer>
      </Card>

{/* Detailed Alerts */}
{expandedRisk && (
  <div className="space-y-4 w-full max-w-4xl">
    <h2 className="text-3xl text-center mb-4 font-bold text-blue-400 drop-shadow-[0_0_12px_rgba(59,130,246,0.9)]">
      {expandedRisk.toUpperCase()} Alerts
    </h2>

    {filteredAlertsByRisk(expandedRisk).length > 0 ? (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredAlertsByRisk(expandedRisk).map((alert, idx) => (
          <Card
            key={idx}
            className="bg-white/5 text-white hover:shadow-[0_0_20px_rgba(59,130,246,0.5)] transition duration-300 rounded-2xl p-4"
          >
            <CardTitle className="text-lg font-semibold mb-2">
              {truncate(alert.alert, 40)}
            </CardTitle>
            <p className="text-white/80 mb-1">
              <strong>Solution:</strong> {truncate(alert.solution, 60)}
            </p>
            <p className="mb-1">
              <Badge className={confColors[alert.confidence.toLowerCase()]}>
                Confidence: {alert.confidence}
              </Badge>
              <Badge
                className={`ml-2 ${riskColors[alert.risk.toLowerCase()]}`}
              >
                Risk: {alert.risk}
              </Badge>
            </p>
            <p className="font-bold">Asset:</p>
            <p className="text-blue-400 underline break-all">
              {truncate(alert.url, 50)}
            </p>
          </Card>
        ))}
      </div>
    ) : (
      <div className="flex flex-col items-center justify-center text-center bg-white/5 backdrop-blur-md text-white/70 p-8 rounded-2xl border border-white/10">
        <Shield className="w-12 h-12 text-blue-400 mb-3" />
        <p className="text-lg font-semibold">No alerts found</p>
        <p className="text-sm text-white/50">
          There are currently no {expandedRisk.toLowerCase()} alerts to display.
        </p>
      </div>
    )}
  </div>
)}

      {/* Asset Discovered Sub-URLs */}
      {showSubUrls && (
  <div className="space-y-6 w-full max-w-5xl mx-auto">
    <h2 className="text-3xl text-center mb-4 font-bold text-blue-400 drop-shadow-[0_0_12px_rgba(59,130,246,0.9)]">
      Assets Discovered
    </h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {distinctSubUrls.map((url, idx) => (
<Card key={idx} className="transform hover:scale-105 transition duration-300 relative bg-gradient-to-br from-blue-800/20 text-white rounded-2xl p-4 hover:shadow-[0_0_20px_rgba(59,130,246,0.7)] w-full h-36 flex items-start justify-start">
  {/* Gradient overlay glow */}
  <div className="absolute inset-0 bg-gradient-to-r from-white/5 via-white/10 to-white/5 blur-xl pointer-events-none"></div>

  <p className="font-medium break-all text-blue-400 drop-shadow-[0_0_12px_rgba(59,130,246,0.9)]">
    {url}
  </p>
</Card>
      ))}
    </div>
  </div>
)}

    </div>
  );
}