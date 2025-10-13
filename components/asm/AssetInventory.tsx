"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts";
import {
  Search,
  Globe,
  Shield,
  AlertTriangle,
  AlertCircle,
} from "lucide-react";

const mockAssets = [
  {
    id: 1,
    name: "api.company.com",
    type: "Subdomain",
    risk: "Medium",
    lastScan: "2025-10-05",
    vulns: 3,
    services: "HTTPS, SSH",
    owner: "Team A",
    location: "US-East",
    description: "Public API endpoint for internal services",
  },
  {
    id: 2,
    name: "staging.company.com",
    type: "Subdomain",
    risk: "High",
    lastScan: "2025-10-07",
    vulns: 5,
    services: "HTTPS",
    owner: "Team B",
    location: "EU-West",
    description: "Staging environment for QA testing",
  },
  {
    id: 3,
    name: "portal.company.com",
    type: "Web App",
    risk: "Low",
    lastScan: "2025-10-08",
    vulns: 0,
    services: "HTTPS",
    owner: "Team C",
    location: "US-Central",
    description: "Employee portal for internal resources",
  },
  {
    id: 4,
    name: "192.168.1.22",
    type: "Host",
    risk: "Critical",
    lastScan: "2025-10-06",
    vulns: 8,
    services: "SSH, RDP",
    owner: "Ops Team",
    location: "On-Prem Data Center",
    description: "Critical internal host",
  },
  {
    id: 5,
    name: "cdn.company.com",
    type: "Asset",
    risk: "Medium",
    lastScan: "2025-10-08",
    vulns: 2,
    services: "HTTPS",
    owner: "Team D",
    location: "Global",
    description: "Content Delivery Network for assets",
  },
];

const pieData = [
  { name: "Low", value: 6 },
  { name: "Medium", value: 9 },
  { name: "High", value: 5 },
  { name: "Critical", value: 3 },
];

const COLORS = ["#22c55e", "#eab308", "#f97316", "#ef4444"];

export default function AssetInventory() {
  const [search, setSearch] = useState("");
  const [expandedRows, setExpandedRows] = useState<number[]>([]);

  const filteredAssets = useMemo(
    () =>
      mockAssets.filter((a) =>
        a.name.toLowerCase().includes(search.toLowerCase())
      ),
    [search]
  );

  const toggleRow = (id: number) => {
    setExpandedRows((prev) =>
      prev.includes(id) ? prev.filter((r) => r !== id) : [...prev, id]
    );
  };

  return (
    <div className="space-y-8 text-white">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold">Asset Inventory</h2>
        <p className="text-gray-400">
          Comprehensive view of discovered assets and security posture.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-blue-800/20 to-blue-500/10 border border-blue-500/20 backdrop-blur-xl shadow-lg rounded-2xl">
          <CardContent className="flex flex-col items-center justify-center p-4">
            <Globe className="w-10 h-10 text-blue-400 mb-2" />
            <h3 className="text-lg font-semibold">Total Assets</h3>
            <p className="text-3xl font-bold mt-1">52</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-800/20 to-green-500/10 border border-green-500/20 backdrop-blur-xl shadow-lg rounded-2xl">
          <CardContent className="flex flex-col items-center justify-center p-4">
            <Shield className="w-10 h-10 text-green-400 mb-2" />
            <h3 className="text-lg font-semibold">Protected</h3>
            <p className="text-3xl font-bold mt-1">44</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-yellow-800/20 to-yellow-500/10 border border-yellow-500/20 backdrop-blur-xl shadow-lg rounded-2xl">
          <CardContent className="flex flex-col items-center justify-center p-4">
            <AlertTriangle className="w-10 h-10 text-yellow-400 mb-2" />
            <h3 className="text-lg font-semibold">At Risk</h3>
            <p className="text-3xl font-bold mt-1">6</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-red-800/20 to-red-500/10 border border-red-500/20 backdrop-blur-xl shadow-lg rounded-2xl">
          <CardContent className="flex flex-col items-center justify-center p-4">
            <AlertCircle className="w-10 h-10 text-red-400 mb-2" />
            <h3 className="text-lg font-semibold">Critical</h3>
            <p className="text-3xl font-bold mt-1">2</p>
          </CardContent>
        </Card>
      </div>

      {/* Risk Distribution Chart */}
      <Card className="bg-white/5 backdrop-blur-xl border-none rounded-2xl shadow-lg">
        <CardHeader>
          <CardTitle className="text-center">Risk Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={3}
              >
                {pieData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Search and Table */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Search className="text-gray-400" />
          <Input
            placeholder="Search assets..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-white/10 border-none text-white placeholder:text-gray-400"
          />
        </div>

        <Card className="bg-white/5 border-none backdrop-blur-md rounded-2xl shadow-lg overflow-hidden">
          <CardHeader>
            <CardTitle>Recent Scanned Assets</CardTitle>
          </CardHeader>
          <CardContent className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="text-gray-400">
                  <TableHead>Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Risk</TableHead>
                  <TableHead>Last Scan</TableHead>
                  <TableHead>Vulnerabilities</TableHead>
                  <TableHead>Services</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAssets.map((asset) => (
                  <>
                    <TableRow
                      key={asset.id}
                      className="hover:bg-white/10 transition"
                    >
                      <TableCell className="font-medium">
                        {asset.name}
                      </TableCell>
                      <TableCell>
                        <Badge>{asset.type}</Badge>
                      </TableCell>
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
                      <TableCell>{asset.lastScan}</TableCell>
                      <TableCell>{asset.vulns}</TableCell>
                      <TableCell>{asset.services}</TableCell>
                      <TableCell>
                        <Button
                          size="sm"
                          className="bg-blue-600 hover:bg-blue-700"
                          onClick={() => toggleRow(asset.id)}
                        >
                          {expandedRows.includes(asset.id) ? "Hide" : "Details"}
                        </Button>
                      </TableCell>
                    </TableRow>

                    {expandedRows.includes(asset.id) && (
                      <TableRow className="bg-white/10 text-gray-300">
                        <TableCell colSpan={7}>
                          <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-2">
                            <p>
                              <span className="font-semibold">Owner:</span>{" "}
                              {asset.owner}
                            </p>
                            <p>
                              <span className="font-semibold">Location:</span>{" "}
                              {asset.location}
                            </p>
                            <p className="sm:col-span-2">
                              <span className="font-semibold">
                                Description:
                              </span>{" "}
                              {asset.description}
                            </p>
                          </div>
                        </TableCell>
                      </TableRow>
                    )}
                  </>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
