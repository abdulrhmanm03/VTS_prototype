"use client"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
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
} from "recharts"
import { ChartColumnStacked, ChartPie } from "lucide-react"

const threatActivityData = [
  { name: "Mon", threats: 20 },
  { name: "Tue", threats: 80 },
  { name: "Wed", threats: 100 },
  { name: "Thu", threats: 40 },
  { name: "Fri", threats: 50 },
  { name: "Sat", threats: 35 },
  { name: "Sun", threats: 45 },
]

const riskDistributionData = [
  { name: "Low", value: 51, color: "#4CAF50" },
  { name: "Medium", value: 26, color: "#FFC107" },
  { name: "High", value: 16, color: "#FF9800" },
  { name: "Critical", value: 7, color: "#F44336" },
]

const COLORS = riskDistributionData.map((d) => d.color)

export default function DashboardCharts() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Threat Activity Bar Chart */}
      <Card className="relative border-none text-white overflow-hidden rounded-2xl bg-white/5 shadow-lg backdrop-blur-md hover:shadow-[0_0_30px_rgba(59,130,246,0.6)] transition-shadow duration-300">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-blue-800/10 to-transparent pointer-events-none" />
        <div className="relative z-10">
          <CardHeader>
            <CardTitle className="text-lg font-medium flex items-center gap-2 text-blue-400">
              <ChartColumnStacked className="h-6 w-6 text-blue-400" />
              Threat Activity (Last 7 Days)
            </CardTitle>
            <p className="text-sm text-gray-400">Number of threats detected per day</p>
          </CardHeader>
          <CardContent className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={threatActivityData}>
                <XAxis dataKey="name" stroke="#6B7280" />
                <YAxis stroke="#6B7280" />
                <Tooltip
                  cursor={{ fill: "rgba(255,255,255,0.1)" }}
                  contentStyle={{ backgroundColor: "#3A3A3A", border: "none", borderRadius: "4px" }}
                  itemStyle={{ color: "#FFFFFF" }}
                />
                <Bar dataKey="threats" fill="#BB86FC" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </div>
      </Card>

      {/* Risk Distribution Pie Chart */}
      <Card className="relative border-none text-white overflow-hidden rounded-2xl bg-white/5 shadow-lg backdrop-blur-md hover:shadow-[0_0_30px_rgba(59,130,246,0.6)] transition-shadow duration-300">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-blue-800/10 to-transparent pointer-events-none" />
        <div className="relative z-10">
          <CardHeader>
            <CardTitle className="text-lg font-medium flex items-center gap-2 text-blue-400">
              <ChartPie className="h-6 w-6 text-blue-400" />
              Risk Distribution
            </CardTitle>
            <p className="text-sm text-gray-400">Current threat severity breakdown</p>
          </CardHeader>
          <CardContent className="h-64 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={riskDistributionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(Number(percent) * 100).toFixed(0)}%`}
                  labelLine={false}
                >
                  {riskDistributionData.map((entry, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: "#3A3A3A", border: "none", borderRadius: "4px" }}
                  itemStyle={{ color: "#FFFFFF" }}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </div>
      </Card>
    </div>
  )
}