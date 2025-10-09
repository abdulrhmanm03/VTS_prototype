"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import {
  Shield,
  Activity,
  AlertTriangle,
  Clock,
  Search,
  RefreshCw,
} from "lucide-react";

const summaryStats = [
  {
    name: "Active Monitors",
    value: 24,
    icon: <Shield className="w-10 h-10 text-green-400" />,
    color: "from-green-800/20 to-green-500/10 border-green-500/20",
  },
  {
    name: "Detected Changes",
    value: 12,
    icon: <Activity className="w-10 h-10 text-yellow-400" />,
    color: "from-yellow-800/20 to-yellow-500/10 border-yellow-500/20",
  },
  {
    name: "New Risks",
    value: 3,
    icon: <AlertTriangle className="w-10 h-10 text-red-400" />,
    color: "from-red-800/20 to-red-500/10 border-red-500/20",
  },
  {
    name: "Average Scan Time",
    value: "18m",
    icon: <Clock className="w-10 h-10 text-blue-400" />,
    color: "from-blue-800/20 to-blue-500/10 border-blue-500/20",
  },
];

const trendData = [
  { day: "Mon", detections: 2 },
  { day: "Tue", detections: 4 },
  { day: "Wed", detections: 3 },
  { day: "Thu", detections: 6 },
  { day: "Fri", detections: 5 },
  { day: "Sat", detections: 7 },
  { day: "Sun", detections: 3 },
];

const timelineEvents = [
  {
    date: "2025-10-07",
    event: "New vulnerability detected on portal.company.com",
    level: "High",
  },
  {
    date: "2025-10-06",
    event: "Configuration drift detected on api.company.com",
    level: "Medium",
  },
  {
    date: "2025-10-05",
    event: "Host 192.168.1.24 became unreachable",
    level: "Critical",
  },
  {
    date: "2025-10-04",
    event: "SSL certificate renewed for cdn.company.com",
    level: "Low",
  },
];

const monitors = [
  {
    id: 1,
    target: "api.company.com",
    type: "Web Monitor",
    status: "Active",
    lastScan: "1h ago",
    nextScan: "23h",
  },
  {
    id: 2,
    target: "vpn.company.com",
    type: "Host Monitor",
    status: "Active",
    lastScan: "2h ago",
    nextScan: "22h",
  },
  {
    id: 3,
    target: "staging.company.com",
    type: "Subdomain Monitor",
    status: "Paused",
    lastScan: "6h ago",
    nextScan: "—",
  },
  {
    id: 4,
    target: "cdn.company.com",
    type: "Service Monitor",
    status: "Active",
    lastScan: "30m ago",
    nextScan: "23h",
  },
  {
    id: 5,
    target: "portal.company.com",
    type: "App Monitor",
    status: "Active",
    lastScan: "3h ago",
    nextScan: "21h",
  },
];

export default function Monitoring() {
  const [search, setSearch] = useState("");

  const filteredMonitors = useMemo(
    () =>
      monitors.filter((m) =>
        m.target.toLowerCase().includes(search.toLowerCase())
      ),
    [search]
  );

  return (
    <div className="space-y-8 text-white">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold">Continuous Monitoring</h2>
        <p className="text-gray-400">
          Track changes, detect risks, and visualize monitoring activity in
          real-time.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {summaryStats.map((stat) => (
          <Card
            key={stat.name}
            className={`bg-gradient-to-br ${stat.color} border backdrop-blur-xl shadow-lg rounded-2xl`}
          >
            <CardContent className="flex flex-col items-center justify-center p-4 space-y-2">
              {stat.icon}
              <h3 className="text-lg font-semibold">{stat.name}</h3>
              <p className="text-3xl font-bold">{stat.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Activity Trend Chart */}
      <Card className="bg-white/5 border-none backdrop-blur-xl rounded-2xl shadow-lg">
        <CardHeader>
          <CardTitle className="text-center">
            Weekly Risk Detection Trend
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="day" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1f2937",
                  border: "none",
                  color: "#fff",
                }}
              />
              <Line
                type="monotone"
                dataKey="detections"
                stroke="#22c55e"
                strokeWidth={2.5}
                dot={{ r: 5, fill: "#22c55e" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Timeline of Events */}
      <Card className="bg-white/5 border-none backdrop-blur-md rounded-2xl shadow-lg">
        <CardHeader>
          <CardTitle>Recent Monitoring Events</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {timelineEvents.map((event, i) => (
            <div
              key={i}
              className="flex items-center justify-between p-3 bg-white/5 rounded-lg hover:bg-white/10 transition"
            >
              <div>
                <p className="font-medium">{event.event}</p>
                <p className="text-gray-400 text-sm">{event.date}</p>
              </div>
              <Badge
                className={
                  event.level === "Critical"
                    ? "bg-red-500/30 text-red-300"
                    : event.level === "High"
                    ? "bg-orange-500/30 text-orange-300"
                    : event.level === "Medium"
                    ? "bg-yellow-500/30 text-yellow-300"
                    : "bg-green-500/30 text-green-300"
                }
              >
                {event.level}
              </Badge>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Search and Table */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Search className="text-gray-400" />
          <Input
            placeholder="Search monitors..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-white/10 border-none text-white placeholder:text-gray-400"
          />
        </div>

        <Card className="bg-white/5 border-none backdrop-blur-md rounded-2xl shadow-lg overflow-hidden">
          <CardHeader className="flex items-center justify-between">
            <CardTitle>Active Monitors</CardTitle>
            <Button
              size="sm"
              className="bg-blue-600 hover:bg-blue-700 flex items-center space-x-2"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Refresh</span>
            </Button>
          </CardHeader>
          <CardContent className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="text-gray-400">
                  <TableHead>Target</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Scan</TableHead>
                  <TableHead>Next Scan</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredMonitors.map((m) => (
                  <TableRow key={m.id} className="hover:bg-white/10 transition">
                    <TableCell className="font-medium">{m.target}</TableCell>
                    <TableCell>{m.type}</TableCell>
                    <TableCell>
                      <Badge
                        className={
                          m.status === "Active"
                            ? "bg-green-500/30 text-green-300"
                            : "bg-gray-500/30 text-gray-300"
                        }
                      >
                        {m.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{m.lastScan}</TableCell>
                    <TableCell>{m.nextScan}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="bg-white/10 border-none"
                        >
                          Pause
                        </Button>
                        <Button
                          size="sm"
                          className="bg-blue-600 hover:bg-blue-700"
                        >
                          Details
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
