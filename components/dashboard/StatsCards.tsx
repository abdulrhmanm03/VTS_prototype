"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { AlertCircle, Shield, Database, Eye } from "lucide-react";

const stats = [
  {
    title: "Total Events",
    value: "5,432",
    change: "+8% from last week",
    changeColor: "text-green-500",
    icon: AlertCircle,
    gradient: "from-indigo-900/30 via-indigo-800/10",
    iconColor: "text-indigo-400",
    details: {
      description: "Breakdown of all events by type, severity, and source.",
      flow: [
        { step: "Detected", count: 1200 },
        { step: "Analyzed", count: 950 },
        { step: "Resolved", count: 750 },
        { step: "Escalated", count: 100 },
      ],
    },
  },
  {
    title: "Active Campaigns",
    value: "87",
    change: "+3 campaigns this week",
    changeColor: "text-green-500",
    icon: Shield,
    gradient: "from-blue-900/30 via-blue-800/10",
    iconColor: "text-blue-400",
    details: {
      description: "Current campaigns with status and team assignments.",
      flow: [
        { step: "Planned", count: 20 },
        { step: "Running", count: 60 },
        { step: "Completed", count: 7 },
      ],
    },
  },
  {
    title: "Affected Assets",
    value: "1,234",
    change: "+12 affected assets today",
    changeColor: "text-red-500",
    icon: Eye,
    gradient: "from-red-900/30 via-red-800/10",
    iconColor: "text-red-400",
    details: {
      description: "View affected assets by type and location.",
      flow: [
        { step: "Servers", count: 500 },
        { step: "Endpoints", count: 600 },
        { step: "Network Devices", count: 134 },
      ],
    },
  },
  {
    title: "Leaked Data Count",
    value: "3,210",
    change: "+5% from last month",
    changeColor: "text-red-500",
    icon: Database,
    gradient: "from-purple-900/30 via-purple-800/10",
    iconColor: "text-purple-400",
    details: {
      description: "Leaked data incidents with source and type breakdown.",
      flow: [
        { step: "Internal", count: 1200 },
        { step: "External", count: 2010 },
      ],
    },
  },
];

export default function StatsCards() {
  const [selectedCard, setSelectedCard] = useState<string | null>(null);

  const handleCardClick = (title: string) => {
    setSelectedCard(selectedCard === title ? null : title);
  };

  const selectedDetails = stats.find((s) => s.title === selectedCard)?.details;

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4 text-blue-400">
        Executive Summary
      </h2>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map(
          ({
            title,
            value,
            change,
            changeColor,
            icon: Icon,
            gradient,
            iconColor,
          }) => (
            <Card
              key={title}
              className="relative border-none text-white overflow-hidden rounded-2xl bg-white/5 shadow-lg backdrop-blur-md hover:shadow-[0_0_30px_rgba(59,130,246,0.6)] transition-shadow duration-300 cursor-pointer"
              onClick={() => handleCardClick(title)}
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${gradient} to-transparent pointer-events-none`}
              />
              <div className="relative z-10">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-400">
                    {title}
                  </CardTitle>
                  <Icon className={`h-8 w-8 ${iconColor} drop-shadow-md`} />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold drop-shadow-lg">
                    {value}
                  </div>
                  <p className={`text-xs ${changeColor}`}>{change}</p>
                </CardContent>
              </div>
            </Card>
          )
        )}
      </div>

      {/* Full-width Details Panel */}
      {selectedDetails && (
        <Card className="mt-6 relative border-none text-white overflow-hidden rounded-2xl bg-white/5 shadow-lg backdrop-blur-md w-full transition-all duration-300">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 via-blue-800/10 to-transparent pointer-events-none" />
          <div className="relative z-10 p-6">
            <h3 className="text-lg font-semibold mb-4">
              {selectedCard} Details
            </h3>
            <p className="text-gray-300 mb-4">{selectedDetails.description}</p>

            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="border-b border-gray-600">
                  <th className="pb-2">Step</th>
                  <th className="pb-2">Count</th>
                </tr>
              </thead>
              <tbody>
                {selectedDetails.flow.map((item, index) => (
                  <tr key={index} className="border-b border-gray-700">
                    <td className="py-2">{item.step}</td>
                    <td className="py-2">{item.count}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </div>
  );
}
