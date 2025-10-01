"use client"

import { Card, CardHeader, CardTitle, CardContent} from "@/components/ui/card"
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
import { AlertCircle, Shield, Database, Eye, Activity, ChartColumnStacked, ChartPie } from "lucide-react"
import ThreatCategories from "@/components/ThreatCategories"
import LiveThreatFeed from "@/components/ThreatFeed"
import GlobalThreatHeatMap from "@/components/HeatMap"
import MetricsBar from "@/components/MetricBar"

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

const COLORS = riskDistributionData.map((d) => d.color);
export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6 p-6 min-h-screen text-white ">
<div className="mb-6">
  {/* Main Title */}
  <div className="flex items-center mb-2 space-x-2">
    <Shield className="h-15 w-15 text-blue-400 drop-shadow-[0_0_8px_rgba(30,64,175,0.8)]" />
    <h1 className="text-6xl font-bold text-blue-400 drop-shadow-[0_0_12px_rgba(59,130,246,0.9)]">
      Sentinel Sovereign
    </h1>
  </div>

  {/* Subtitle / Dashboard description */}
  <div className="ml-4">
    <h2 className="text-3xl font-bold text-white">Threat Intelligence Dashboard</h2>
    <p className="text-gray-400">
      Real-time overview of your organization&#39;s security posture
    </p>
  </div>
</div>
      {/* Top Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="relative border-none text-white overflow-hidden rounded-2xl bg-white/5 shadow-lg backdrop-blur-md hover:shadow-[0_0_30px_rgba(59,130,246,0.6)] transition-shadow duration-300">
  {/* Gradient overlay */}
  <div className="absolute inset-0 bg-gradient-to-br from-red-900/30 via-red-800/10 to-transparent pointer-events-none" />
  <div className="relative z-10">
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium text-gray-400">Active Threats</CardTitle>
      <AlertCircle className="h-8 w-8 text-red-500 drop-shadow-md" />
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold drop-shadow-lg">174</div>
      <p className="text-xs text-green-500">+12% from last week</p>
    </CardContent>
  </div>
</Card>

<Card className="relative border-none text-white overflow-hidden rounded-2xl bg-white/5 shadow-lg backdrop-blur-md hover:shadow-[0_0_30px_rgba(59,130,246,0.6)] transition-shadow duration-300">
  <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 via-blue-800/10 to-transparent pointer-events-none" />
  <div className="relative z-10">
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium text-gray-400">Risk Score</CardTitle>
      <Shield className="h-8 w-8 text-blue-400 drop-shadow-md" />
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold drop-shadow-lg">72/100</div>
      <p className="text-xs text-red-500">-5 points from last month</p>
    </CardContent>
  </div>
</Card>

<Card className="relative border-none text-white overflow-hidden rounded-2xl bg-white/5 shadow-lg backdrop-blur-md hover:shadow-[0_0_30px_rgba(59,130,246,0.6)] transition-shadow duration-300">
  <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-purple-800/10 to-transparent pointer-events-none" />
  <div className="relative z-10">
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium text-gray-400">IOCs Processed</CardTitle>
      <Database className="h-8 w-8 text-purple-400 drop-shadow-md" />
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold drop-shadow-lg">2,847</div>
      <p className="text-xs text-green-500">+23% from yesterday</p>
    </CardContent>
  </div>
</Card>

<Card className="relative border-none text-white overflow-hidden rounded-2xl bg-white/5 shadow-lg backdrop-blur-md hover:shadow-[0_0_30px_rgba(59,130,246,0.6)] transition-shadow duration-300">
  <div className="absolute inset-0 bg-gradient-to-br from-green-900/30 via-green-800/10 to-transparent pointer-events-none" />
  <div className="relative z-10">
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium text-gray-400">Assets Monitored</CardTitle>
      <Eye className="h-8 w-8 text-green-400 drop-shadow-md" />
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold drop-shadow-lg">1,234</div>
      <p className="text-xs text-green-500">+2 new assets today</p>
    </CardContent>
  </div>
</Card>

      </div>
      <div><GlobalThreatHeatMap />
</div>
<MetricsBar />
{/* Charts Section */}
<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
  {/* Threat Activity Bar Chart */}
  <Card className="relative border-none text-white overflow-hidden rounded-2xl bg-white/5 shadow-lg backdrop-blur-md hover:shadow-[0_0_30px_rgba(59,130,246,0.6)] transition-shadow duration-300">
    <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-blue-800/10 to-transparent pointer-events-none" />
    <div className="relative z-10">
      <CardHeader>
        <CardTitle className="text-lg font-medium flex items-center gap-2 text-blue-400 drop-shadow-[0_0_12px_rgba(59,130,246,0.9)]">
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
        <CardTitle className="text-lg font-medium flex items-center gap-2 text-blue-400 drop-shadow-[0_0_12px_rgba(59,130,246,0.9)]">
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
              fill="#8884d8"
              paddingAngle={5}
              dataKey="value"
              label={({ name, percent }) => `${name} ${ (Number(percent) * 100).toFixed(0)}%`}
              labelLine={false}
            >
              {riskDistributionData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
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

{/* Recent Critical Alerts */}
<Card className="relative border-none text-white overflow-hidden rounded-2xl bg-white/5 shadow-lg backdrop-blur-md hover:shadow-[0_0_30px_rgba(59,130,246,0.6)] transition-shadow duration-300 col-span-full">
  <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-blue-800/10 to-transparent pointer-events-none" />
  <div className="relative z-10">
    <CardHeader>
      <CardTitle className="text-lg font-medium flex items-center gap-2 text-blue-400 drop-shadow-[0_0_12px_rgba(59,130,246,0.9)]">
        <Activity className="h-6 w-6 text-blue-400" />
        Recent Critical Alerts
        </CardTitle>
      <p className="text-sm text-gray-400">Latest high-priority threats requiring attention</p>
    </CardHeader>
    <CardContent className="space-y-4">
      {/* Alert Items */}
      <div className="flex justify-between items-center p-4 rounded-md">
        <div>
          <p className="font-semibold">Suspicious Domain Registration</p>
          <p className="text-sm text-gray-400">Domain similar to company brand detected</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">Critical</span>
          <span className="text-sm text-gray-400">2 minutes ago</span>
          <button className="bg-gray-700 text-white text-xs px-3 py-1 rounded hover:bg-gray-600">View</button>
        </div>
      </div>
      <div className="flex justify-between items-center p-4 rounded-md">
        <div>
          <p className="font-semibold">Data Leak on Dark Web</p>
          <p className="text-sm text-gray-400">Employee credentials found on underground forum</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded">High</span>
          <span className="text-sm text-gray-400">15 minutes ago</span>
          <button className="bg-gray-700 text-white text-xs px-3 py-1 rounded hover:bg-gray-600">View</button>
        </div>
      </div>
      <div className="flex justify-between items-center p-4 rounded-md">
        <div>
          <p className="font-semibold">APT Campaign Targeting Industry</p>
          <p className="text-sm text-gray-400">New campaign detected targeting financial sector</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded">High</span>
          <span className="text-sm text-gray-400">1 hour ago</span>
          <button className="bg-gray-700 text-white text-xs px-3 py-1 rounded hover:bg-gray-600">View</button>
        </div>
      </div>
      <div className="flex justify-between items-center p-4 rounded-md">
        <div>
          <p className="font-semibold">Phishing Attempt Detected</p>
          <p className="text-sm text-gray-400">Email impersonating CEO sent to multiple employees</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="bg-yellow-500 text-white text-xs font-bold px-2 py-1 rounded">Medium</span>
          <span className="text-sm text-gray-400">3 hours ago</span>
          <button className="bg-gray-700 text-white text-xs px-3 py-1 rounded hover:bg-gray-600">View</button>
        </div>
      </div>
    </CardContent>
  </div>
</Card>
<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ThreatCategories />
        <LiveThreatFeed />
      </div>

    </div>
  )
}