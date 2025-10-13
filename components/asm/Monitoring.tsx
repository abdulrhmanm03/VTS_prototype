"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { Globe, Lock, Server, Cloud, Search } from "lucide-react";

const exposureStats = [
  { name: "Open Ports", value: 125 },
  { name: "Public Hosts", value: 25 },
  { name: "Exposed Web Apps", value: 14 },
  { name: "Detected Services", value: 38 },
];

const exposureData = [
  { type: "HTTP", count: 18 },
  { type: "HTTPS", count: 27 },
  { type: "SSH", count: 20 },
  { type: "RDP", count: 10 },
  { type: "FTP", count: 5 },
];

const exposedAssets = [
  {
    id: 1,
    host: "api.company.com",
    ip: "45.32.12.10",
    ports: "80, 443",
    risk: "Medium",
    service: "HTTPS, HTTP",
  },
  {
    id: 2,
    host: "staging.company.com",
    ip: "45.32.12.11",
    ports: "22, 443",
    risk: "High",
    service: "SSH, HTTPS",
  },
  {
    id: 3,
    host: "vpn.company.com",
    ip: "45.32.12.9",
    ports: "443, 1194",
    risk: "Critical",
    service: "HTTPS, OpenVPN",
  },
  {
    id: 4,
    host: "portal.company.com",
    ip: "45.32.12.13",
    ports: "443",
    risk: "Low",
    service: "HTTPS",
  },
  {
    id: 5,
    host: "cdn.company.com",
    ip: "45.32.12.18",
    ports: "80, 443",
    risk: "Medium",
    service: "HTTP, HTTPS",
  },
];

export default function ExternalExposure() {
  const [search, setSearch] = useState("");

  const filteredAssets = useMemo(
    () =>
      exposedAssets.filter(
        (asset) =>
          asset.host.toLowerCase().includes(search.toLowerCase()) ||
          asset.ip.includes(search)
      ),
    [search]
  );

  return (
    <div className="space-y-8 text-white">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold">External Exposure Overview</h2>
        <p className="text-gray-400">
          Understand externally accessible assets, their open ports, and
          exposure risk.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {exposureStats.map((stat, i) => {
          const gradient =
            i === 0
              ? "from-blue-800/20 to-blue-500/10 border-blue-500/20"
              : i === 1
              ? "from-green-800/20 to-green-500/10 border-green-500/20"
              : i === 2
              ? "from-yellow-800/20 to-yellow-500/10 border-yellow-500/20"
              : "from-purple-800/20 to-purple-500/10 border-purple-500/20";

          const icon =
            i === 0 ? (
              <Server className="w-10 h-10 text-blue-400" />
            ) : i === 1 ? (
              <Globe className="w-10 h-10 text-green-400" />
            ) : i === 2 ? (
              <Cloud className="w-10 h-10 text-yellow-400" />
            ) : (
              <Lock className="w-10 h-10 text-purple-400" />
            );

          return (
            <Card
              key={stat.name}
              className={`bg-gradient-to-br ${gradient} border backdrop-blur-xl shadow-lg rounded-2xl`}
            >
              <CardContent className="flex flex-col items-center justify-center p-4 space-y-2">
                {icon}
                <h3 className="text-lg font-semibold">{stat.name}</h3>
                <p className="text-3xl font-bold">{stat.value}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Exposure Distribution Chart */}
      <Card className="bg-white/5 border-none backdrop-blur-xl rounded-2xl shadow-lg">
        <CardHeader>
          <CardTitle className="text-center">
            Exposure Type Distribution
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={exposureData}>
              <XAxis dataKey="type" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1f2937",
                  border: "none",
                  color: "#fff",
                }}
              />
              <Bar dataKey="count" radius={6} fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Search and Table */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Search className="text-gray-400" />
          <Input
            placeholder="Search by host or IP..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-white/20 border-none text-white placeholder:text-gray-400 focus:ring-2 focus:ring-blue-400"
            type="text"
          />
        </div>

        <Card className="bg-white/5 border-none backdrop-blur-md rounded-2xl shadow-lg overflow-hidden">
          <CardHeader>
            <CardTitle>Exposed Assets</CardTitle>
          </CardHeader>
          <CardContent className="overflow-x-auto">
            {filteredAssets.length === 0 ? (
              <p className="text-gray-400 p-4">No assets found.</p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow className="text-gray-400">
                    <TableHead>Host</TableHead>
                    <TableHead>IP</TableHead>
                    <TableHead>Ports</TableHead>
                    <TableHead>Services</TableHead>
                    <TableHead>Risk</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAssets.map((asset) => (
                    <TableRow
                      key={asset.id}
                      className="hover:bg-white/10 transition"
                    >
                      <TableCell className="font-medium">
                        {asset.host}
                      </TableCell>
                      <TableCell>{asset.ip}</TableCell>
                      <TableCell>{asset.ports}</TableCell>
                      <TableCell>{asset.service}</TableCell>
                      <TableCell>
                        <Badge
                          className={
                            asset.risk === "Critical"
                              ? "bg-red-500/30 text-red-300"
                              : asset.risk === "High"
                              ? "bg-orange-500/30 text-orange-300"
                              : asset.risk === "Medium"
                              ? "bg-yellow-500/30 text-yellow-300"
                              : "bg-green-500/30 text-green-300"
                          }
                        >
                          {asset.risk}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button
                          size="sm"
                          className="bg-blue-600 hover:bg-blue-700"
                        >
                          Details
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
