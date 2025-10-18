"use client";

import { TrendingUp, TrendingDown, Activity } from "lucide-react";

interface Risk {
  category: string;
  level: string;
  impact: string;
  probability: string;
  mitigation: string;
  color: string;
  trend: "up" | "down" | "stable";
}

export default function BusinessRiskCard() {
  // Dummy data inside the component
  const businessRisks: Risk[] = [
    {
      category: "Data Breach Risk",
      level: "Low",
      impact: "$1.2M",
      probability: "12",
      mitigation: "Active",
      color: "green",
      trend: "down",
    },
    {
      category: "Ransomware Threat",
      level: "Medium",
      impact: "$3.5M",
      probability: "28",
      mitigation: "Enhanced",
      color: "yellow",
      trend: "stable",
    },
    {
      category: "Supply Chain Disruption",
      level: "High",
      impact: "$5.8M",
      probability: "65",
      mitigation: "Intensive",
      color: "red",
      trend: "up",
    },
    {
      category: "Regulatory Compliance",
      level: "Medium",
      impact: "$2.3M",
      probability: "40",
      mitigation: "Ongoing",
      color: "yellow",
      trend: "down",
    },
    {
      category: "Financial Fraud",
      level: "Low",
      impact: "$800K",
      probability: "10",
      mitigation: "Active",
      color: "green",
      trend: "stable",
    },
  ];

  return (
    <div className="bg-slate-900/50 backdrop-blur-lg rounded-2xl p-6 border border-slate-700/50">
      <h2 className="text-xl font-bold text-white mb-6">
        Business Risk Assessment
      </h2>
      <div className="space-y-4">
        {businessRisks.map((risk, idx) => (
          <div
            key={idx}
            className="bg-slate-800/50 rounded-xl p-5 border border-slate-700 hover:border-blue-500/50 transition-all"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className="text-lg font-semibold text-white">
                    {risk.category}
                  </h3>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold ${
                      risk.level === "Low"
                        ? "bg-green-500/20 text-green-400"
                        : risk.level === "Medium"
                        ? "bg-yellow-500/20 text-yellow-400"
                        : "bg-red-500/20 text-red-400"
                    }`}
                  >
                    {risk.level} Risk
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-500/20 text-blue-400">
                    {risk.mitigation}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <div className="text-slate-400 text-xs mb-1">
                      Potential Impact
                    </div>
                    <div className="text-white font-bold">{risk.impact}</div>
                  </div>
                  <div>
                    <div className="text-slate-400 text-xs mb-1">
                      Probability
                    </div>
                    <div className="text-white font-bold">
                      {risk.probability}
                    </div>
                  </div>
                  <div>
                    <div className="text-slate-400 text-xs mb-1">Trend</div>
                    <div className="flex items-center space-x-1">
                      {risk.trend === "down" ? (
                        <TrendingDown className="w-4 h-4 text-green-400" />
                      ) : risk.trend === "up" ? (
                        <TrendingUp className="w-4 h-4 text-red-400" />
                      ) : (
                        <Activity className="w-4 h-4 text-yellow-400" />
                      )}
                      <span className="text-white font-bold capitalize">
                        {risk.trend}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
              <div
                className={`h-full ${
                  risk.level === "Low"
                    ? "bg-gradient-to-r from-green-500 to-green-600"
                    : risk.level === "Medium"
                    ? "bg-gradient-to-r from-yellow-500 to-yellow-600"
                    : "bg-gradient-to-r from-red-500 to-red-600"
                }`}
                style={{ width: `${Number.parseInt(risk.probability)}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
