"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, MapPin, Server, Link2 } from "lucide-react";
import { ResponsiveContainer, AreaChart, Area } from "recharts";

const iocs = [
  {
    type: "IP Address",
    value: "192.168.1.100",
    severity: "High",
    firstSeen: "2024-01-15",
    lastSeen: "2024-01-20",
    source: "Internal Analysis",
    tags: ["Malware", "C2"],
    geo: "Germany",
    asn: "AS3320 Deutsche Telekom AG",
    confidence: 92,
    detections: 13,
    related: ["45.32.77.54", "malware-c2.net"],
    trend: [
      { day: "Mon", hits: 4 },
      { day: "Tue", hits: 6 },
      { day: "Wed", hits: 7 },
      { day: "Thu", hits: 10 },
      { day: "Fri", hits: 8 },
    ],
  },
  {
    type: "Domain",
    value: "malicious-domain.com",
    severity: "Medium",
    firstSeen: "2024-01-18",
    lastSeen: "2024-01-19",
    source: "External Feed",
    tags: ["Phishing", "Brand Abuse"],
    geo: "Singapore",
    asn: "AS45102 Alibaba Cloud",
    confidence: 80,
    detections: 7,
    related: ["spoof-brand.co", "login-mirror.io"],
    trend: [
      { day: "Mon", hits: 2 },
      { day: "Tue", hits: 3 },
      { day: "Wed", hits: 4 },
      { day: "Thu", hits: 3 },
      { day: "Fri", hits: 5 },
    ],
  },
  {
    type: "File Hash",
    value: "a1b2c3d4e5f6...",
    severity: "High",
    firstSeen: "2024-01-17",
    lastSeen: "2024-01-20",
    source: "Internal Analysis",
    tags: ["Trojan", "Dropper"],
    geo: "N/A",
    asn: "N/A",
    confidence: 96,
    detections: 24,
    related: ["setup.zip", "payload.exe"],
    trend: [
      { day: "Mon", hits: 6 },
      { day: "Tue", hits: 8 },
      { day: "Wed", hits: 10 },
      { day: "Thu", hits: 9 },
      { day: "Fri", hits: 11 },
    ],
  },
  {
    type: "IP Address",
    value: "203.0.113.55",
    severity: "Low",
    firstSeen: "2024-01-12",
    lastSeen: "2024-01-18",
    source: "Threat Feed",
    tags: ["Scanner"],
    geo: "USA",
    asn: "AS15169 Google LLC",
    confidence: 60,
    detections: 4,
    related: ["malicious-site.com"],
    trend: [
      { day: "Mon", hits: 1 },
      { day: "Tue", hits: 2 },
      { day: "Wed", hits: 3 },
      { day: "Thu", hits: 2 },
      { day: "Fri", hits: 2 },
    ],
  },
  {
    type: "Domain",
    value: "crypto-steal.net",
    severity: "High",
    firstSeen: "2024-01-10",
    lastSeen: "2024-01-20",
    source: "External Feed",
    tags: ["Cryptojacking", "Phishing"],
    geo: "Netherlands",
    asn: "AS14061 KPN Internet",
    confidence: 94,
    detections: 15,
    related: ["wallet-hack.com", "miner-scam.org"],
    trend: [
      { day: "Mon", hits: 5 },
      { day: "Tue", hits: 7 },
      { day: "Wed", hits: 6 },
      { day: "Thu", hits: 9 },
      { day: "Fri", hits: 10 },
    ],
  },
];

const threatActors = [
  {
    name: "LockBit",
    type: "Ransomware Group",
    severity: "Critical",
    lastActive: "2025-10-06",
    campaigns: 5,
  },
  {
    name: "TA505",
    type: "APT",
    severity: "High",
    lastActive: "2025-10-07",
    campaigns: 3,
  },
];

const malwareCampaigns = [
  {
    name: "Phishing Finance Q3",
    affectedRegions: ["EU", "US"],
    type: "Phishing",
    discovered: "2025-09-25",
  },
  {
    name: "Cryptojacking Wave",
    affectedRegions: ["Asia", "Europe"],
    type: "Cryptojacking",
    discovered: "2025-10-01",
  },
];

const tags = ["Ransomware", "Phishing", "Cryptojacking", "C2", "Trojan"];
const regions = ["Germany", "Singapore", "USA", "Netherlands"];

export default function ThreatIntelOverview() {
  return (
    <div className="space-y-8 text-white">
      {/* Header */}
      <div className="flex justify-between items-center mb-2">
        <h1 className="text-2xl font-bold">Threat Intelligence Overview</h1>
        <Badge className="bg-blue-500/20 text-blue-400 border border-blue-500/30 px-3 py-1 text-sm">
          Live Feed Active
        </Badge>
      </div>

      {/* IOC Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {iocs.map((ioc, idx) => (
          <Card
            key={idx}
            className={`relative overflow-hidden rounded-2xl border-none shadow-lg backdrop-blur-md transition-all hover:scale-[1.01] hover:shadow-[0_0_35px_rgba(59,130,246,0.6)] ${
              ioc.severity === "High"
                ? "bg-gradient-to-br from-red-900/30 via-red-800/20 to-transparent"
                : ioc.severity === "Medium"
                ? "bg-gradient-to-br from-yellow-900/30 via-yellow-800/20 to-transparent"
                : "bg-gradient-to-br from-green-900/30 via-green-800/20 to-transparent"
            }`}
          >
            <div className="relative z-10 p-2">
              <CardHeader className="flex justify-between items-start space-y-0">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <Badge variant="secondary">{ioc.type}</Badge>
                    <span className="font-mono font-semibold truncate">
                      {ioc.value}
                    </span>
                    <Badge
                      className={`${
                        ioc.severity === "High"
                          ? "bg-red-600 text-white"
                          : ioc.severity === "Medium"
                          ? "bg-yellow-500 text-white"
                          : "bg-green-500 text-white"
                      }`}
                    >
                      {ioc.severity}
                    </Badge>
                  </div>
                  <div className="text-xs text-white/60">
                    First: {ioc.firstSeen} • Last: {ioc.lastSeen}
                  </div>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  className="border-white/20 text-white hover:border-blue-400 hover:text-white"
                >
                  <Eye className="h-4 w-4 mr-1" /> View
                </Button>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Confidence, Detections, Sparkline */}
                <div className="flex justify-between items-center">
                  <div className="flex flex-col text-sm text-white/70">
                    <span>
                      Confidence:{" "}
                      <span
                        className={`font-semibold ${
                          ioc.confidence > 90
                            ? "text-green-400"
                            : ioc.confidence > 70
                            ? "text-yellow-400"
                            : "text-red-400"
                        }`}
                      >
                        {ioc.confidence}%
                      </span>
                    </span>
                    <span>Detections: {ioc.detections}</span>
                  </div>
                  <div className="w-32 h-10">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={ioc.trend}>
                        <Area
                          type="monotone"
                          dataKey="hits"
                          stroke="#3b82f6"
                          fill="#3b82f6"
                          fillOpacity={0.3}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Geo / ASN */}
                <div className="grid grid-cols-2 gap-3 text-sm text-white/70">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-blue-400" /> {ioc.geo}
                  </div>
                  <div className="flex items-center gap-2">
                    <Server className="w-4 h-4 text-purple-400" /> {ioc.asn}
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {ioc.tags.map((tag, i) => (
                    <Badge
                      key={i}
                      variant="outline"
                      className="border-white/20 text-white/80 bg-white/5"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>

                {/* Related */}
                <div>
                  <div className="flex items-center gap-2 text-gray-400 text-sm mb-1">
                    <Link2 className="w-4 h-4 text-blue-400" />
                    Related Indicators
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {ioc.related.map((rel, i) => (
                      <Badge
                        key={i}
                        variant="outline"
                        className="border-blue-400/30 text-blue-300 bg-blue-900/10"
                      >
                        {rel}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </div>
          </Card>
        ))}
      </div>

      {/* Threat Summary Table */}
      <Card className="bg-white/5 rounded-2xl backdrop-blur-md shadow-lg">
        <CardHeader>
          <CardTitle>Threat Summary Table</CardTitle>
        </CardHeader>
        <CardContent>
          <table className="w-full text-sm">
            <thead className="text-gray-400 border-b border-gray-700">
              <tr>
                <th className="text-left py-2">Indicator</th>
                <th className="text-left">Type</th>
                <th className="text-left">Severity</th>
                <th className="text-left">Confidence</th>
                <th className="text-left">Source</th>
                <th className="text-left">Last Seen</th>
              </tr>
            </thead>
            <tbody>
              {iocs.map((ioc, idx) => (
                <tr
                  key={idx}
                  className="border-b border-gray-800 hover:bg-white/5 transition"
                >
                  <td className="py-2 font-mono">{ioc.value}</td>
                  <td>{ioc.type}</td>
                  <td
                    className={`${
                      ioc.severity === "High"
                        ? "text-red-400"
                        : ioc.severity === "Medium"
                        ? "text-yellow-400"
                        : "text-green-400"
                    }`}
                  >
                    {ioc.severity}
                  </td>
                  <td>{ioc.confidence}%</td>
                  <td>{ioc.source}</td>
                  <td>{ioc.lastSeen}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>

      {/* Threat Actors */}
      <Card className="bg-white/5 rounded-2xl backdrop-blur-md shadow-lg">
        <CardHeader>
          <CardTitle>Top Threat Actors</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {threatActors.map((actor, i) => (
              <div
                key={i}
                className="flex justify-between items-center p-2 border-b border-gray-700 last:border-none"
              >
                <div className="flex flex-col">
                  <span className="font-semibold">{actor.name}</span>
                  <span className="text-sm text-white/60">{actor.type}</span>
                </div>
                <div className="flex flex-col items-end text-sm text-white/70">
                  <span>Severity: {actor.severity}</span>
                  <span>Active Campaigns: {actor.campaigns}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Malware Campaigns */}
      <Card className="bg-white/5 rounded-2xl backdrop-blur-md shadow-lg">
        <CardHeader>
          <CardTitle>Recent Malware Campaigns</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {malwareCampaigns.map((campaign, i) => (
              <div
                key={i}
                className="p-2 border-b border-gray-700 last:border-none flex justify-between items-center"
              >
                <div>
                  <span className="font-semibold">{campaign.name}</span>
                  <div className="text-sm text-white/60">{campaign.type}</div>
                </div>
                <div className="text-sm text-white/70">
                  Regions: {campaign.affectedRegions.join(", ")}
                  <br />
                  Discovered: {campaign.discovered}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Trending Tags */}
      <Card className="bg-white/5 rounded-2xl backdrop-blur-md shadow-lg">
        <CardHeader>
          <CardTitle>Trending Threat Tags</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, i) => (
              <Badge
                key={i}
                variant="outline"
                className="border-white/20 text-white/80 bg-white/5 text-sm"
              >
                {tag} ({Math.floor(Math.random() * 20) + 1})
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Top Affected Regions */}
      <Card className="bg-white/5 rounded-2xl backdrop-blur-md shadow-lg">
        <CardHeader>
          <CardTitle>Top Affected Regions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {regions.map((region, i) => (
              <div
                key={i}
                className="p-2 bg-white/10 rounded-xl flex flex-col items-center"
              >
                <MapPin className="w-6 h-6 text-blue-400 mb-1" />
                <span>{region}</span>
                <span className="text-xs text-white/60">
                  {Math.floor(Math.random() * 20) + 5} detections
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Weekly Threat Trends */}
      <Card className="bg-white/5 rounded-2xl backdrop-blur-md shadow-lg">
        <CardHeader>
          <CardTitle>Weekly Threat Trends</CardTitle>
        </CardHeader>
        <CardContent className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={iocs.flatMap((i) =>
                i.trend.map((t) => ({ day: t.day, [i.value]: t.hits }))
              )}
            >
              {iocs.map((ioc, idx) => (
                <Area
                  key={idx}
                  type="monotone"
                  dataKey={ioc.value}
                  stroke={idx % 2 === 0 ? "#3b82f6" : "#f97316"}
                  fill={idx % 2 === 0 ? "#3b82f6" : "#f97316"}
                  fillOpacity={0.3}
                />
              ))}
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* IOC Severity Distribution */}
      <Card className="bg-white/5 rounded-2xl backdrop-blur-md shadow-lg">
        <CardHeader>
          <CardTitle>IOC Severity Distribution</CardTitle>
        </CardHeader>
        <CardContent className="h-40">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={[
                {
                  severity: "High",
                  count: iocs.filter((i) => i.severity === "High").length,
                },
                {
                  severity: "Medium",
                  count: iocs.filter((i) => i.severity === "Medium").length,
                },
                {
                  severity: "Low",
                  count: iocs.filter((i) => i.severity === "Low").length,
                },
              ]}
            >
              <Area
                type="monotone"
                dataKey="count"
                stroke="#f87171"
                fill="#f87171"
                fillOpacity={0.3}
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Threat Ticker */}
      <div className="w-full flex justify-center overflow-hidden">
        <div className="animate-marquee whitespace-nowrap flex gap-4 items-center">
          detected •
          <span className="text-red-400">Zero-day exploit CVE-2025-44321</span>
          active •
          <span className="text-yellow-400">
            Phishing campaign targeting finance
          </span>
        </div>
      </div>
    </div>
  );
}
