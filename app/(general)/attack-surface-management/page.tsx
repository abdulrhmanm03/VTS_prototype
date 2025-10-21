"use client";

import { useState } from "react";
import {
  Globe,
  Server,
  AlertTriangle,
  CheckCircle,
  Clock,
  Search,
  Shield,
  Activity,
  Filter,
  Play,
  Pause,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import ConfirmDialogButton from "@/components/ConfirmButton";

export default function SurfaceSentinel() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTab, setSelectedTab] = useState("assets");
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [currentPhase, setCurrentPhase] = useState("");

  const scanPhases = [
    {
      name: "Asset Discovery",
      duration: 3000,
      description: "Discovering external assets...",
    },
    {
      name: "Port Scanning",
      duration: 4000,
      description: "Scanning open ports and services...",
    },
    {
      name: "Service Detection",
      duration: 3500,
      description: "Identifying running services...",
    },
    {
      name: "Vulnerability Assessment",
      duration: 5000,
      description: "Analyzing vulnerabilities...",
    },
    {
      name: "Risk Analysis",
      duration: 2500,
      description: "Computing risk scores...",
    },
    {
      name: "Report Generation",
      duration: 2000,
      description: "Generating findings report...",
    },
  ];

  const startScan = async () => {
    setIsScanning(true);
    setScanProgress(0);

    for (let i = 0; i < scanPhases.length; i++) {
      setCurrentPhase(scanPhases[i].name);
      await new Promise((resolve) =>
        setTimeout(resolve, scanPhases[i].duration)
      );
      setScanProgress(((i + 1) / scanPhases.length) * 100);
    }

    setIsScanning(false);
    setCurrentPhase("");
    alert("Scan completed! New assets and vulnerabilities discovered.");
  };

  return (
    <div className="min-h-screen p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-3">
          <div>
            <h1 className="text-4xl font-bold text-blue-400 drop-shadow-[0_0_12px_rgba(59,130,246,0.9)]">
              SurfaceSentinel
            </h1>
            <p className="text-blue-300">
              Attack Surface Management & External Asset Discovery
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={startScan}
            disabled={isScanning}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-700 text-white rounded-lg font-semibold flex items-center space-x-2 shadow-lg shadow-blue-500/20"
          >
            {isScanning ? (
              <Pause className="w-5 h-5 animate-pulse" />
            ) : (
              <Play className="w-5 h-5" />
            )}
            <span>{isScanning ? "Scanning..." : "Start Scan"}</span>
          </button>
          <ConfirmDialogButton
            buttonLabel="Export Report"
            dialogTitle="Confirm Export"
            extraContent="Are you sure you want to export the report?"
            onConfirm={() => console.log("Report exported")}
            onCancel={() => console.log("Export canceled")}
          />
        </div>
      </div>

      {isScanning && (
        <div className="bg-slate-900/50 backdrop-blur-lg rounded-2xl p-8 border border-slate-700/50 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="flex items-center space-x-3 mb-2">
                <Activity className="w-8 h-8 text-blue-400 animate-pulse" />
                <h2 className="text-2xl font-bold text-white">
                  Active Scan in Progress
                </h2>
              </div>
              <p className="text-slate-400">
                Scanning external attack surface...
              </p>
            </div>
            <div className="text-right">
              <div className="text-4xl font-bold text-blue-400">
                {Math.round(scanProgress)}%
              </div>
              <div className="text-sm text-slate-400">Complete</div>
            </div>
          </div>

          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-slate-400">
                Phase: {currentPhase}
              </span>
              <span className="text-sm text-blue-400 font-semibold">
                {scanPhases.find((p) => p.name === currentPhase)?.description}
              </span>
            </div>
            <div className="h-3 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-500 transition-all duration-500"
                style={{ width: `${scanProgress}%` }}
              />
            </div>
          </div>

          <div className="grid grid-cols-6 gap-4">
            {scanPhases.map((phase, idx) => (
              <div
                key={idx}
                className={`bg-slate-800/50 rounded-lg p-4 border transition-all ${
                  currentPhase === phase.name
                    ? "border-blue-500 shadow-lg shadow-blue-500/20"
                    : (scanProgress / 100) * scanPhases.length > idx
                    ? "border-green-500/50"
                    : "border-slate-700"
                }`}
              >
                <div className="text-center">
                  <div
                    className={`w-12 h-12 rounded-lg mx-auto mb-3 flex items-center justify-center ${
                      (scanProgress / 100) * scanPhases.length > idx
                        ? "bg-green-500/20"
                        : currentPhase === phase.name
                        ? "bg-blue-500/20"
                        : "bg-slate-700/50"
                    }`}
                  >
                    {(scanProgress / 100) * scanPhases.length > idx ? (
                      <CheckCircle className="w-6 h-6 text-green-400" />
                    ) : currentPhase === phase.name ? (
                      <Activity className="w-6 h-6 text-blue-400 animate-pulse" />
                    ) : (
                      <Clock className="w-6 h-6 text-slate-600" />
                    )}
                  </div>
                  <div className="text-xs font-semibold text-white mb-1">
                    {phase.name}
                  </div>
                  <div className="text-xs text-slate-500">
                    {(scanProgress / 100) * scanPhases.length > idx
                      ? "✓ Done"
                      : currentPhase === phase.name
                      ? "Running..."
                      : "Pending"}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Stats Overview */}
      <div className="grid grid-cols-6 gap-4 mb-8">
        {[
          {
            label: "Total Assets",
            value: "2,847",
            icon: Server,
            color: "blue",
            trend: "+127",
            change: "+4.7%",
          },
          {
            label: "Exposed Services",
            value: "234",
            icon: Globe,
            color: "orange",
            trend: "+23",
            change: "+10.9%",
          },
          {
            label: "Critical Findings",
            value: "34",
            icon: AlertTriangle,
            color: "red",
            trend: "-8",
            change: "-19.0%",
          },
          {
            label: "Secure Assets",
            value: "2,579",
            icon: CheckCircle,
            color: "green",
            trend: "+135",
            change: "+5.5%",
          },
          {
            label: "Open Ports",
            value: "1,456",
            icon: Shield,
            color: "purple",
            trend: "+45",
            change: "+3.2%",
          },
          {
            label: "Last Scan",
            value: "15m ago",
            icon: Clock,
            color: "cyan",
            trend: "Active",
            change: "Live",
          },
        ].map((stat, idx) => (
          <Card key={idx} className="bg-slate-900/50 border-slate-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-3">
                <div
                  className={`w-10 h-10 rounded-lg bg-${stat.color}-500/20 flex items-center justify-center`}
                >
                  <stat.icon className={`w-5 h-5 text-${stat.color}-400`} />
                </div>
                <span className="text-xs text-green-400 font-semibold">
                  {stat.change}
                </span>
              </div>
              <div className="text-3xl font-bold text-white mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-slate-400 mb-1">{stat.label}</div>
              <div className="text-xs text-green-400">{stat.trend}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs
        value={selectedTab}
        onValueChange={setSelectedTab}
        className="space-y-6"
      >
        <TabsList className="bg-slate-900/50 border border-slate-700">
          <TabsTrigger value="assets">Asset Inventory</TabsTrigger>
          <TabsTrigger value="domains">Domains & Subdomains</TabsTrigger>
          <TabsTrigger value="ports">Open Ports & Services</TabsTrigger>
          <TabsTrigger value="certificates">SSL Certificates</TabsTrigger>
          <TabsTrigger value="technologies">Technologies</TabsTrigger>
          <TabsTrigger value="supply-chain">Supply Chain</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="assets" className="space-y-6">
          {/* Search Bar */}
          <Card className="bg-slate-900/50 border-slate-700">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Search className="w-5 h-5 text-slate-400" />
                <Input
                  placeholder="Search assets by domain, IP, or service..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 bg-slate-800 border-slate-700 text-white"
                />
                <button className="px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-600 text-white rounded-lg flex items-center space-x-2">
                  <Filter className="w-4 h-4" />
                  <span>Filter</span>
                </button>
              </div>
            </CardContent>
          </Card>

          {/* Asset List */}
          <Card className="bg-slate-900/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Discovered Assets</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  {
                    domain: "api.acmecorp.com",
                    ip: "203.0.113.42",
                    type: "API Server",
                    status: "active",
                    risk: "medium",
                    ports: [80, 443, 8080],
                    lastSeen: "2h ago",
                  },
                  {
                    domain: "mail.acmecorp.com",
                    ip: "203.0.113.43",
                    type: "Mail Server",
                    status: "active",
                    risk: "low",
                    ports: [25, 465, 587],
                    lastSeen: "2h ago",
                  },
                  {
                    domain: "dev.acmecorp.com",
                    ip: "203.0.113.44",
                    type: "Development",
                    status: "active",
                    risk: "critical",
                    ports: [22, 80, 443, 3306],
                    lastSeen: "2h ago",
                  },
                  {
                    domain: "cdn.acmecorp.com",
                    ip: "203.0.113.45",
                    type: "CDN",
                    status: "active",
                    risk: "low",
                    ports: [80, 443],
                    lastSeen: "2h ago",
                  },
                  {
                    domain: "admin.acmecorp.com",
                    ip: "203.0.113.46",
                    type: "Admin Panel",
                    status: "active",
                    risk: "high",
                    ports: [443, 8443],
                    lastSeen: "2h ago",
                  },
                ].map((asset, idx) => (
                  <div
                    key={idx}
                    className="bg-slate-800/50 rounded-lg p-4 border border-slate-700 hover:border-blue-500/50 transition-all"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <span className="text-lg font-semibold text-white">
                            {asset.domain}
                          </span>
                          <span
                            className={`px-2 py-1 rounded text-xs font-bold ${
                              asset.risk === "critical"
                                ? "bg-red-500/20 text-red-400"
                                : asset.risk === "high"
                                ? "bg-orange-500/20 text-orange-400"
                                : asset.risk === "medium"
                                ? "bg-yellow-500/20 text-yellow-400"
                                : "bg-green-500/20 text-green-400"
                            }`}
                          >
                            {asset.risk}
                          </span>
                          <span className="px-2 py-1 rounded text-xs bg-blue-500/20 text-blue-400">
                            {asset.type}
                          </span>
                        </div>
                        <div className="grid grid-cols-3 gap-4 text-sm">
                          <div>
                            <span className="text-slate-400">IP Address: </span>
                            <span className="text-white font-mono">
                              {asset.ip}
                            </span>
                          </div>
                          <div>
                            <span className="text-slate-400">Open Ports: </span>
                            <span className="text-white font-mono">
                              {asset.ports.join(", ")}
                            </span>
                          </div>
                          <div>
                            <span className="text-slate-400">Last Seen: </span>
                            <span className="text-white">{asset.lastSeen}</span>
                          </div>
                        </div>
                      </div>
                      <ConfirmDialogButton
                        buttonLabel="Export Report"
                        dialogTitle="Confirm Export"
                        extraContent="Are you sure you want to export the report?"
                        onConfirm={() => console.log("Report exported")}
                        onCancel={() => console.log("Export canceled")}
                      />
                    </div>
                    {asset.risk === "critical" && (
                      <div className="mt-3 pt-3 border-t border-slate-700">
                        <div className="flex items-center space-x-2 text-sm text-red-400">
                          <AlertTriangle className="w-4 h-4" />
                          <span>
                            Database port exposed to internet (3306/MySQL)
                          </span>
                        </div>
                      </div>
                    )}
                    {asset.risk === "high" && (
                      <div className="mt-3 pt-3 border-t border-slate-700">
                        <div className="flex items-center space-x-2 text-sm text-orange-400">
                          <AlertTriangle className="w-4 h-4" />
                          <span>
                            Admin panel accessible without IP restriction
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="domains" className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <Card className="bg-slate-900/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Domain Hierarchy</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    {
                      domain: "acmecorp.com",
                      subdomains: 47,
                      status: "verified",
                    },
                    {
                      domain: "acme-tech.io",
                      subdomains: 23,
                      status: "verified",
                    },
                    {
                      domain: "acmeproducts.net",
                      subdomains: 12,
                      status: "unverified",
                    },
                  ].map((domain, idx) => (
                    <div
                      key={idx}
                      className="bg-slate-800/50 rounded-lg p-4 border border-slate-700"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-white font-semibold">
                          {domain.domain}
                        </span>
                        <span
                          className={`px-2 py-1 rounded text-xs font-bold ${
                            domain.status === "verified"
                              ? "bg-green-500/20 text-green-400"
                              : "bg-yellow-500/20 text-yellow-400"
                          }`}
                        >
                          {domain.status}
                        </span>
                      </div>
                      <div className="text-sm text-slate-400">
                        {domain.subdomains} subdomains discovered
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-900/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Recent Discoveries</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    {
                      subdomain: "staging.acmecorp.com",
                      discovered: "2h ago",
                      risk: "high",
                    },
                    {
                      subdomain: "test-api.acmecorp.com",
                      discovered: "5h ago",
                      risk: "medium",
                    },
                    {
                      subdomain: "backup.acmecorp.com",
                      discovered: "1d ago",
                      risk: "critical",
                    },
                    {
                      subdomain: "vpn.acmecorp.com",
                      discovered: "2d ago",
                      risk: "low",
                    },
                  ].map((item, idx) => (
                    <div
                      key={idx}
                      className="bg-slate-800/50 rounded-lg p-3 border border-slate-700"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-semibold text-white">
                          {item.subdomain}
                        </span>
                        <span
                          className={`px-2 py-1 rounded text-xs font-bold ${
                            item.risk === "critical"
                              ? "bg-red-500/20 text-red-400"
                              : item.risk === "high"
                              ? "bg-orange-500/20 text-orange-400"
                              : item.risk === "medium"
                              ? "bg-yellow-500/20 text-yellow-400"
                              : "bg-green-500/20 text-green-400"
                          }`}
                        >
                          {item.risk}
                        </span>
                      </div>
                      <span className="text-xs text-slate-400">
                        Discovered {item.discovered}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="ports" className="space-y-6">
          <Card className="bg-slate-900/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">
                Open Ports & Services
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  {
                    port: 22,
                    service: "SSH",
                    hosts: 12,
                    risk: "medium",
                    version: "OpenSSH 8.2",
                  },
                  {
                    port: 80,
                    service: "HTTP",
                    hosts: 89,
                    risk: "low",
                    version: "nginx 1.21.0",
                  },
                  {
                    port: 443,
                    service: "HTTPS",
                    hosts: 156,
                    risk: "low",
                    version: "nginx 1.21.0",
                  },
                  {
                    port: 3306,
                    service: "MySQL",
                    hosts: 3,
                    risk: "critical",
                    version: "MySQL 8.0.28",
                  },
                  {
                    port: 8080,
                    service: "HTTP-Alt",
                    hosts: 23,
                    risk: "medium",
                    version: "Apache 2.4.52",
                  },
                  {
                    port: 8443,
                    service: "HTTPS-Alt",
                    hosts: 8,
                    risk: "medium",
                    version: "Tomcat 9.0",
                  },
                ].map((port, idx) => (
                  <div
                    key={idx}
                    className="bg-slate-800/50 rounded-lg p-4 border border-slate-700"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <span className="text-2xl font-bold text-white">
                            {port.port}
                          </span>
                          <span className="text-white font-semibold">
                            {port.service}
                          </span>
                          <span
                            className={`px-2 py-1 rounded text-xs font-bold ${
                              port.risk === "critical"
                                ? "bg-red-500/20 text-red-400"
                                : port.risk === "medium"
                                ? "bg-yellow-500/20 text-yellow-400"
                                : "bg-green-500/20 text-green-400"
                            }`}
                          >
                            {port.risk}
                          </span>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-slate-400">
                              Exposed Hosts:{" "}
                            </span>
                            <span className="text-white font-semibold">
                              {port.hosts}
                            </span>
                          </div>
                          <div>
                            <span className="text-slate-400">Version: </span>
                            <span className="text-white font-mono text-xs">
                              {port.version}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="certificates" className="space-y-6">
          <Card className="bg-slate-900/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">SSL/TLS Certificates</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  {
                    domain: "*.acmecorp.com",
                    issuer: "Let's Encrypt",
                    expires: "2025-12-31",
                    daysLeft: 287,
                    status: "valid",
                  },
                  {
                    domain: "api.acmecorp.com",
                    issuer: "DigiCert",
                    expires: "2025-06-15",
                    daysLeft: 89,
                    status: "expiring",
                  },
                  {
                    domain: "old.acmecorp.com",
                    issuer: "Let's Encrypt",
                    expires: "2024-01-15",
                    daysLeft: -90,
                    status: "expired",
                  },
                  {
                    domain: "mail.acmecorp.com",
                    issuer: "Sectigo",
                    expires: "2026-03-20",
                    daysLeft: 456,
                    status: "valid",
                  },
                ].map((cert, idx) => (
                  <div
                    key={idx}
                    className="bg-slate-800/50 rounded-lg p-4 border border-slate-700"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <span className="text-white font-semibold">
                            {cert.domain}
                          </span>
                          <span
                            className={`px-2 py-1 rounded text-xs font-bold ${
                              cert.status === "expired"
                                ? "bg-red-500/20 text-red-400"
                                : cert.status === "expiring"
                                ? "bg-yellow-500/20 text-yellow-400"
                                : "bg-green-500/20 text-green-400"
                            }`}
                          >
                            {cert.status}
                          </span>
                        </div>
                        <div className="grid grid-cols-3 gap-4 text-sm">
                          <div>
                            <span className="text-slate-400">Issuer: </span>
                            <span className="text-white">{cert.issuer}</span>
                          </div>
                          <div>
                            <span className="text-slate-400">Expires: </span>
                            <span className="text-white">{cert.expires}</span>
                          </div>
                          <div>
                            <span className="text-slate-400">Days Left: </span>
                            <span
                              className={`font-semibold ${
                                cert.daysLeft < 0
                                  ? "text-red-400"
                                  : cert.daysLeft < 90
                                  ? "text-yellow-400"
                                  : "text-green-400"
                              }`}
                            >
                              {cert.daysLeft}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="technologies" className="space-y-6">
          <div className="grid grid-cols-3 gap-6">
            {[
              {
                category: "Web Servers",
                items: ["nginx", "Apache", "IIS"],
                count: 156,
              },
              {
                category: "Frameworks",
                items: ["React", "Next.js", "Django"],
                count: 89,
              },
              {
                category: "Databases",
                items: ["MySQL", "PostgreSQL", "MongoDB"],
                count: 34,
              },
              {
                category: "CDN",
                items: ["Cloudflare", "Akamai", "Fastly"],
                count: 67,
              },
              {
                category: "Analytics",
                items: ["Google Analytics", "Mixpanel"],
                count: 45,
              },
              {
                category: "Security",
                items: ["WAF", "DDoS Protection"],
                count: 23,
              },
            ].map((tech, idx) => (
              <Card key={idx} className="bg-slate-900/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white text-lg">
                    {tech.category}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 mb-4">
                    {tech.items.map((item, i) => (
                      <div
                        key={i}
                        className="bg-slate-800/50 rounded px-3 py-2 text-sm text-white"
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                  <div className="text-sm text-slate-400">
                    {tech.count} instances detected
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Supply Chain Tab */}
        <TabsContent value="supply-chain" className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <Card className="bg-slate-900/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">
                  Third-Party Services
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  {
                    service: "AWS CloudFront",
                    risk: "Low",
                    assets: 234,
                    status: "Monitored",
                  },
                  {
                    service: "Cloudflare CDN",
                    risk: "Low",
                    assets: 189,
                    status: "Monitored",
                  },
                  {
                    service: "SendGrid Email",
                    risk: "Medium",
                    assets: 12,
                    status: "Review Required",
                  },
                  {
                    service: "Stripe Payment",
                    risk: "Low",
                    assets: 8,
                    status: "Compliant",
                  },
                ].map((service, idx) => (
                  <div
                    key={idx}
                    className="bg-slate-800/50 rounded-lg p-4 border border-slate-700"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h4 className="text-sm font-semibold text-white mb-1">
                          {service.service}
                        </h4>
                        <div className="text-xs text-slate-400">
                          {service.assets} assets
                        </div>
                      </div>
                      <span
                        className={`px-2 py-1 rounded text-xs font-bold ${
                          service.risk === "Low"
                            ? "bg-green-500/20 text-green-400"
                            : service.risk === "Medium"
                            ? "bg-yellow-500/20 text-yellow-400"
                            : "bg-red-500/20 text-red-400"
                        }`}
                      >
                        {service.risk} Risk
                      </span>
                    </div>
                    <div className="text-xs text-slate-400">
                      {service.status}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="bg-slate-900/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">
                  External Dependencies
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  {
                    dependency: "Google Analytics",
                    type: "Analytics",
                    exposure: "Public",
                  },
                  {
                    dependency: "Intercom Chat",
                    type: "Support",
                    exposure: "Public",
                  },
                  {
                    dependency: "Auth0",
                    type: "Authentication",
                    exposure: "Protected",
                  },
                  {
                    dependency: "Datadog",
                    type: "Monitoring",
                    exposure: "Internal",
                  },
                ].map((dep, idx) => (
                  <div
                    key={idx}
                    className="bg-slate-800/50 rounded-lg p-3 border border-slate-700"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-semibold text-white">
                        {dep.dependency}
                      </span>
                      <span className="px-2 py-1 bg-blue-500/20 text-blue-400 text-xs rounded">
                        {dep.type}
                      </span>
                    </div>
                    <div className="text-xs text-slate-400">
                      Exposure: {dep.exposure}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-3 gap-6">
            <Card className="bg-slate-900/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">
                  Asset Growth (6 Months)
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { month: "May", assets: 2234, change: "+89" },
                  { month: "Jun", assets: 2389, change: "+155" },
                  { month: "Jul", assets: 2512, change: "+123" },
                  { month: "Aug", assets: 2678, change: "+166" },
                  { month: "Sep", assets: 2756, change: "+78" },
                  { month: "Oct", assets: 2847, change: "+91" },
                ].map((data, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg"
                  >
                    <span className="text-sm text-slate-300">{data.month}</span>
                    <div className="flex items-center space-x-3">
                      <span className="text-lg font-bold text-white">
                        {data.assets}
                      </span>
                      <span className="text-xs text-green-400">
                        {data.change}
                      </span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="bg-slate-900/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Risk Distribution</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  {
                    level: "Critical",
                    count: 34,
                    percentage: 1.2,
                    color: "red",
                  },
                  {
                    level: "High",
                    count: 89,
                    percentage: 3.1,
                    color: "orange",
                  },
                  {
                    level: "Medium",
                    count: 145,
                    percentage: 5.1,
                    color: "yellow",
                  },
                  {
                    level: "Low",
                    count: 2579,
                    percentage: 90.6,
                    color: "green",
                  },
                ].map((risk, idx) => (
                  <div key={idx}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-slate-300">
                        {risk.level}
                      </span>
                      <span className="text-sm font-semibold text-white">
                        {risk.count} ({risk.percentage}%)
                      </span>
                    </div>
                    <div className="w-full bg-slate-800 rounded-full h-2">
                      <div
                        className={`bg-${risk.color}-500 h-2 rounded-full transition-all`}
                        style={{ width: `${risk.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="bg-slate-900/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Discovery Metrics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { label: "New Assets (30d)", value: "347", trend: "+12%" },
                  { label: "Decommissioned", value: "89", trend: "+5%" },
                  { label: "Scan Coverage", value: "98.7%", trend: "+0.3%" },
                  { label: "Avg Scan Time", value: "4.2h", trend: "-0.8h" },
                ].map((metric, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg"
                  >
                    <div>
                      <div className="text-xs text-slate-400 mb-1">
                        {metric.label}
                      </div>
                      <div className="text-xl font-bold text-white">
                        {metric.value}
                      </div>
                    </div>
                    <span className="text-sm font-semibold text-green-400">
                      {metric.trend}
                    </span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
