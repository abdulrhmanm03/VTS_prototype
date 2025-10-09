"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  AreaChart,
  Area,
} from "recharts";
import {
  ChartColumnStacked,
  ChartPie,
  ChartLine,
  ChartArea,
} from "lucide-react";

const threatActivityData = [
  { name: "Mon", threats: 20 },
  { name: "Tue", threats: 30 },
  { name: "Wed", threats: 35 },
  { name: "Thu", threats: 25 },
  { name: "Fri", threats: 30 },
  { name: "Sat", threats: 20 },
  { name: "Sun", threats: 25 },
];

const riskDistributionData = [
  { name: "Low", value: 51, color: "#4CAF50" },
  { name: "Medium", value: 26, color: "#FFC107" },
  { name: "High", value: 16, color: "#FF9800" },
  { name: "Critical", value: 7, color: "#F44336" },
];

const incidentTrendData = threatActivityData.map((d) => ({
  ...d,
  value: d.threats + Math.floor(Math.random() * 10),
}));
const vulnerabilityData = threatActivityData.map((d) => ({
  ...d,
  value: d.threats * 1.2,
}));
const alertSeverityData = [
  { name: "Info", value: 40, color: "#2196F3" },
  { name: "Warning", value: 30, color: "#FFC107" },
  { name: "Danger", value: 20, color: "#FF5722" },
  { name: "Critical", value: 10, color: "#F44336" },
];
const networkTrafficData = [
  { name: "HTTP", value: 120, color: "#4CAF50" },
  { name: "HTTPS", value: 80, color: "#2196F3" },
  { name: "FTP", value: 30, color: "#FF9800" },
  { name: "SSH", value: 20, color: "#F44336" },
];

export default function DashboardCharts() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Row 1 */}
      <ChartCard
        title="Threat Activity"
        icon={<ChartColumnStacked />}
        color="blue"
        maxY={40}
        content={
          <BarChart data={threatActivityData}>
            <XAxis dataKey="name" stroke="#6B7280" fontSize={12} />
            <YAxis stroke="#6B7280" fontSize={12} domain={[0, 40]} />
            <Tooltip
              cursor={{ fill: "rgba(255,255,255,0.1)" }}
              contentStyle={{
                backgroundColor: "#3A3A3A",
                border: "none",
                borderRadius: "2px",
                fontSize: "4px",
              }}
              itemStyle={{ color: "#FFFFFF", fontSize: "4px" }}
            />
            <Bar dataKey="threats" fill="#BB86FC" />
          </BarChart>
        }
      />

      <ChartCard
        title="Risk Distribution"
        icon={<ChartPie />}
        color="orange"
        content={
          <PieChart>
            <Pie
              data={riskDistributionData}
              cx="50%"
              cy="50%"
              innerRadius={25}
              outerRadius={50}
              paddingAngle={5}
              dataKey="value"
              label={({ name, percent }) =>
                `${name} ${(Number(percent) * 100).toFixed(0)}%`
              }
              labelLine={false}
            >
              {riskDistributionData.map((entry, index) => (
                <Cell key={index} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "#3A3A3A",
                border: "none",
                borderRadius: "2px",
                fontSize: "4px",
              }}
              itemStyle={{ color: "#FFFFFF", fontSize: "4px" }}
            />
          </PieChart>
        }
      />

      <ChartCard
        title="Incident Trend"
        icon={<ChartLine />}
        color="green"
        maxY={40}
        content={
          <LineChart data={incidentTrendData}>
            <XAxis dataKey="name" stroke="#6B7280" fontSize={12} />
            <YAxis stroke="#6B7280" fontSize={12} domain={[0, 40]} />
            <Tooltip
              cursor={{ stroke: "rgba(255,255,255,0.3)", strokeWidth: 2 }}
              contentStyle={{
                backgroundColor: "#3A3A3A",
                border: "none",
                borderRadius: "2px",
                fontSize: "4px",
              }}
              itemStyle={{ color: "#FFFFFF", fontSize: "4px" }}
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#4CAF50"
              strokeWidth={2}
              dot={{ r: 3 }}
            />
          </LineChart>
        }
      />

      {/* Row 2 */}
      <ChartCard
        title="Vulnerability Overview"
        icon={<ChartArea />}
        color="purple"
        maxY={40}
        content={
          <AreaChart data={vulnerabilityData}>
            <XAxis dataKey="name" stroke="#6B7280" fontSize={12} />
            <YAxis stroke="#6B7280" fontSize={12} domain={[0, 40]} />
            <Tooltip
              cursor={{ fill: "rgba(255,255,255,0.1)" }}
              contentStyle={{
                backgroundColor: "#3A3A3A",
                border: "none",
                borderRadius: "2px",
                fontSize: "4px",
              }}
              itemStyle={{ color: "#FFFFFF", fontSize: "4px" }}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#9C27B0"
              fill="rgba(156,39,176,0.3)"
            />
          </AreaChart>
        }
      />

      <ChartCard
        title="Alert Severity"
        icon={<ChartPie />}
        color="red"
        content={
          <PieChart>
            <Pie
              data={alertSeverityData}
              cx="50%"
              cy="50%"
              innerRadius={20}
              outerRadius={40}
              paddingAngle={5}
              dataKey="value"
              label={({ name, percent }) =>
                `${name} ${(Number(percent) * 100).toFixed(0)}%`
              }
              labelLine={false}
            >
              {alertSeverityData.map((entry, index) => (
                <Cell key={index} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "#3A3A3A",
                border: "none",
                borderRadius: "2px",
                fontSize: "4px",
              }}
              itemStyle={{ color: "#FFFFFF", fontSize: "4px" }}
            />
          </PieChart>
        }
      />

      <ChartCard
        title="Network Traffic"
        icon={<ChartColumnStacked />}
        color="teal"
        content={
          <PieChart>
            <Pie
              data={networkTrafficData}
              cx="50%"
              cy="50%"
              innerRadius={20}
              outerRadius={40}
              paddingAngle={5}
              dataKey="value"
              label={({ name, percent }) =>
                `${name} ${(Number(percent) * 100).toFixed(0)}%`
              }
              labelLine={false}
            >
              {networkTrafficData.map((entry, index) => (
                <Cell key={index} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "#3A3A3A",
                border: "none",
                borderRadius: "2px",
                fontSize: "4px",
              }}
              itemStyle={{ color: "#FFFFFF", fontSize: "4px" }}
            />
          </PieChart>
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
  maxY?: number;
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
        <CardContent className="h-48 p-2">
          <ResponsiveContainer width="100%" height="100%">
            {content}
          </ResponsiveContainer>
        </CardContent>
      </div>
    </Card>
  );
}
