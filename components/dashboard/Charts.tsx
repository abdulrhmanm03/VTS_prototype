"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts";
import { ChartPie, ChartColumnStacked } from "lucide-react";

// Sample data
const vulnerabilityDistributionData = [
  { name: "Low", value: 50, color: "#4CAF50" },
  { name: "Medium", value: 30, color: "#FFC107" },
  { name: "High", value: 15, color: "#FF9800" },
  { name: "Critical", value: 5, color: "#F44336" },
];

const securityPostureData = [
  { category: "Endpoint", score: 80 },
  { category: "Network", score: 65 },
  { category: "Application", score: 70 },
  { category: "Identity", score: 55 },
  { category: "Compliance", score: 75 },
];

export default function DashboardCharts() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Pie Chart */}
      <ChartCard
        title="Vulnerability Distribution"
        icon={<ChartPie />}
        color="orange"
        content={
          <PieChart>
            <Pie
              data={vulnerabilityDistributionData}
              cx="50%"
              cy="50%"
              innerRadius={30}
              outerRadius={60}
              dataKey="value"
              label={({ name, percent }) =>
                `${name} ${(Number(percent) * 100).toFixed(0)}%`
              }
              labelLine={false}
            >
              {vulnerabilityDistributionData.map((entry, index) => (
                <Cell key={index} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "#3A3A3A",
                border: "none",
                borderRadius: "4px",
                fontSize: "12px",
              }}
              itemStyle={{ color: "#FFFFFF", fontSize: "12px" }}
            />
          </PieChart>
        }
      />

      {/* Radar Chart */}
      <ChartCard
        title="Security Posture Analysis"
        icon={<ChartColumnStacked />}
        color="blue"
        content={
          <RadarChart
            cx="50%"
            cy="50%"
            outerRadius="70%"
            data={securityPostureData}
          >
            <PolarGrid />
            <PolarAngleAxis dataKey="category" />
            <PolarRadiusAxis angle={30} domain={[0, 100]} />
            <Radar
              name="Score"
              dataKey="score"
              stroke="#3B82F6"
              fill="#3B82F6"
              fillOpacity={0.3}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#3A3A3A",
                border: "none",
                borderRadius: "4px",
                fontSize: "12px",
              }}
              itemStyle={{ color: "#FFFFFF", fontSize: "12px" }}
            />
          </RadarChart>
        }
      />
    </div>
  );
}

// Reusable Chart Card Component
function ChartCard({
  title,
  icon,
  color,
  content,
}: {
  title: string;
  icon: React.ReactNode;
  color: string;
  content: React.ReactElement;
}) {
  return (
    <Card
      className={`relative border-none text-white overflow-hidden rounded-2xl bg-white/5 shadow-lg backdrop-blur-md hover:shadow-[0_0_20px_rgba(59,130,246,0.6)] transition-shadow duration-300`}
    >
      <div
        className={`absolute inset-0 bg-gradient-to-br from-${color}-900/20 via-${color}-800/10 to-transparent pointer-events-none`}
      />
      <div className="relative z-10">
        <CardHeader className="py-2">
          <CardTitle
            className={`text-sm font-medium flex items-center gap-1 text-${color}-400`}
          >
            {icon}
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent className="h-72 p-2">
          <ResponsiveContainer width="100%" height="100%">
            {content}
          </ResponsiveContainer>
        </CardContent>
      </div>
    </Card>
  );
}
