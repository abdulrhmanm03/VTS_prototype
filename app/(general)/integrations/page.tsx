"use client";

import { useState } from "react";
import {
  Plug,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Settings,
  Database,
  Shield,
  Cloud,
  Users,
  MessageSquare,
  Activity,
  RefreshCw,
  Download,
  Upload,
  Zap,
  Eye,
  EyeOff,
  Play,
  Trash2,
  Copy,
  ExternalLink,
} from "lucide-react";

interface Integration {
  id: string;
  name: string;
  category: string;
  description: string;
  status: "connected" | "disconnected" | "error" | "configuring";
  logo: string;
  health: number;
  lastSync: string;
  dataFlow: {
    sent: number;
    received: number;
  };
  config: {
    apiKey?: string;
    endpoint?: string;
    webhook?: string;
    syncInterval?: string;
  };
}

const Integrations = ({ region = "Global" }: { region?: string }) => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedIntegration, setSelectedIntegration] =
    useState<Integration | null>(null);
  const [showConfigModal, setShowConfigModal] = useState(false);
  const [showApiKey, setShowApiKey] = useState(false);

  const categories = [
    { id: "all", name: "All Integrations", icon: Plug, count: 24 },
    { id: "siem", name: "SIEM", icon: Database, count: 4 },
    { id: "soar", name: "SOAR", icon: Zap, count: 3 },
    { id: "edr", name: "EDR/XDR", icon: Shield, count: 4 },
    { id: "ticketing", name: "Ticketing", icon: MessageSquare, count: 3 },
    {
      id: "threat-intel",
      name: "Threat Intelligence",
      icon: Activity,
      count: 5,
    },
    { id: "cloud", name: "Cloud Security", icon: Cloud, count: 3 },
    { id: "identity", name: "Identity & Access", icon: Users, count: 2 },
  ];

  const [integrations, setIntegrations] = useState<Integration[]>([
    {
      id: "splunk",
      name: "Splunk Enterprise",
      category: "siem",
      description:
        "Security Information and Event Management platform for log analysis and correlation",
      status: "connected",
      logo: "🔷",
      health: 98,
      lastSync: "2 minutes ago",
      dataFlow: { sent: 45678, received: 123456 },
      config: {
        apiKey: "sk_live_••••••••••••3x9K",
        endpoint: "https://splunk.company.com:8089",
        syncInterval: "5 minutes",
      },
    },
    {
      id: "qradar",
      name: "IBM QRadar",
      category: "siem",
      description:
        "Enterprise SIEM solution for threat detection and compliance",
      status: "connected",
      logo: "🔵",
      health: 95,
      lastSync: "5 minutes ago",
      dataFlow: { sent: 34567, received: 98765 },
      config: {
        apiKey: "qr_••••••••••••7h2M",
        endpoint: "https://qradar.company.com",
        syncInterval: "10 minutes",
      },
    },
    {
      id: "sentinel",
      name: "Microsoft Sentinel",
      category: "siem",
      description: "Cloud-native SIEM and SOAR solution from Microsoft Azure",
      status: "connected",
      logo: "☁️",
      health: 100,
      lastSync: "1 minute ago",
      dataFlow: { sent: 56789, received: 145678 },
      config: {
        apiKey: "az_••••••••••••9k4L",
        endpoint: "https://portal.azure.com/sentinel",
        syncInterval: "3 minutes",
      },
    },
    {
      id: "elastic",
      name: "Elastic Security",
      category: "siem",
      description: "Open-source SIEM with powerful search and analytics",
      status: "disconnected",
      logo: "🟡",
      health: 0,
      lastSync: "Never",
      dataFlow: { sent: 0, received: 0 },
      config: {},
    },
    {
      id: "xsoar",
      name: "Palo Alto XSOAR",
      category: "soar",
      description: "Security orchestration, automation and response platform",
      status: "connected",
      logo: "🟠",
      health: 97,
      lastSync: "3 minutes ago",
      dataFlow: { sent: 23456, received: 67890 },
      config: {
        apiKey: "pa_••••••••••••5m8N",
        endpoint: "https://xsoar.company.com",
        webhook: "https://churchill.ai/webhooks/xsoar",
        syncInterval: "5 minutes",
      },
    },
    {
      id: "swimlane",
      name: "Swimlane",
      category: "soar",
      description: "Low-code security automation platform",
      status: "connected",
      logo: "🔶",
      health: 92,
      lastSync: "8 minutes ago",
      dataFlow: { sent: 12345, received: 45678 },
      config: {
        apiKey: "sw_••••••••••••2p7Q",
        endpoint: "https://swimlane.company.com",
        syncInterval: "15 minutes",
      },
    },
    {
      id: "demisto",
      name: "Cortex XSOAR",
      category: "soar",
      description: "Extended security orchestration and automation",
      status: "error",
      logo: "🔴",
      health: 45,
      lastSync: "2 hours ago",
      dataFlow: { sent: 5678, received: 12345 },
      config: {
        apiKey: "cx_••••••••••••8k3R",
        endpoint: "https://cortex.company.com",
      },
    },
    {
      id: "crowdstrike",
      name: "CrowdStrike Falcon",
      category: "edr",
      description: "Cloud-native endpoint protection platform",
      status: "connected",
      logo: "🦅",
      health: 99,
      lastSync: "1 minute ago",
      dataFlow: { sent: 78901, received: 234567 },
      config: {
        apiKey: "cs_••••••••••••4n9S",
        endpoint: "https://api.crowdstrike.com",
        syncInterval: "2 minutes",
      },
    },
    {
      id: "sentinelone",
      name: "SentinelOne",
      category: "edr",
      description: "Autonomous endpoint protection and EDR",
      status: "connected",
      logo: "🛡️",
      health: 96,
      lastSync: "4 minutes ago",
      dataFlow: { sent: 45678, received: 123456 },
      config: {
        apiKey: "s1_••••••••••••7m2T",
        endpoint: "https://api.sentinelone.net",
        syncInterval: "5 minutes",
      },
    },
    {
      id: "carbonblack",
      name: "VMware Carbon Black",
      category: "edr",
      description: "Next-gen antivirus and EDR solution",
      status: "connected",
      logo: "⚫",
      health: 94,
      lastSync: "6 minutes ago",
      dataFlow: { sent: 34567, received: 89012 },
      config: {
        apiKey: "cb_••••••••••••5k8U",
        endpoint: "https://defense.conferdeploy.net",
        syncInterval: "10 minutes",
      },
    },
    {
      id: "defender",
      name: "Microsoft Defender",
      category: "edr",
      description: "Enterprise endpoint security from Microsoft",
      status: "disconnected",
      logo: "🔷",
      health: 0,
      lastSync: "Never",
      dataFlow: { sent: 0, received: 0 },
      config: {},
    },
    {
      id: "servicenow",
      name: "ServiceNow",
      category: "ticketing",
      description: "IT service management and ticketing platform",
      status: "connected",
      logo: "🎫",
      health: 98,
      lastSync: "2 minutes ago",
      dataFlow: { sent: 12345, received: 23456 },
      config: {
        apiKey: "sn_••••••••••••9p4V",
        endpoint: "https://company.service-now.com",
        webhook: "https://churchill.ai/webhooks/servicenow",
        syncInterval: "5 minutes",
      },
    },
    {
      id: "jira",
      name: "Jira Service Management",
      category: "ticketing",
      description: "Issue tracking and project management",
      status: "connected",
      logo: "📋",
      health: 95,
      lastSync: "5 minutes ago",
      dataFlow: { sent: 8901, received: 15678 },
      config: {
        apiKey: "jr_••••••••••••3m7W",
        endpoint: "https://company.atlassian.net",
        syncInterval: "10 minutes",
      },
    },
    {
      id: "freshservice",
      name: "Freshservice",
      category: "ticketing",
      description: "Cloud-based IT service desk",
      status: "disconnected",
      logo: "🍃",
      health: 0,
      lastSync: "Never",
      dataFlow: { sent: 0, received: 0 },
      config: {},
    },
    {
      id: "misp",
      name: "MISP",
      category: "threat-intel",
      description: "Open-source threat intelligence platform",
      status: "connected",
      logo: "🔗",
      health: 97,
      lastSync: "3 minutes ago",
      dataFlow: { sent: 23456, received: 56789 },
      config: {
        apiKey: "mp_••••••••••••6k2X",
        endpoint: "https://misp.company.com",
        syncInterval: "15 minutes",
      },
    },
    {
      id: "threatconnect",
      name: "ThreatConnect",
      category: "threat-intel",
      description: "Threat intelligence operations platform",
      status: "connected",
      logo: "🔐",
      health: 99,
      lastSync: "1 minute ago",
      dataFlow: { sent: 45678, received: 123456 },
      config: {
        apiKey: "tc_••••••••••••8n5Y",
        endpoint: "https://api.threatconnect.com",
        syncInterval: "5 minutes",
      },
    },
    {
      id: "recordedfuture",
      name: "Recorded Future",
      category: "threat-intel",
      description: "Real-time threat intelligence",
      status: "connected",
      logo: "📡",
      health: 96,
      lastSync: "4 minutes ago",
      dataFlow: { sent: 34567, received: 89012 },
      config: {
        apiKey: "rf_••••••••••••4m9Z",
        endpoint: "https://api.recordedfuture.com",
        syncInterval: "10 minutes",
      },
    },
    {
      id: "anomali",
      name: "Anomali ThreatStream",
      category: "threat-intel",
      description: "Threat intelligence management platform",
      status: "disconnected",
      logo: "🌊",
      health: 0,
      lastSync: "Never",
      dataFlow: { sent: 0, received: 0 },
      config: {},
    },
    {
      id: "virustotal",
      name: "VirusTotal",
      category: "threat-intel",
      description: "File and URL analysis service",
      status: "connected",
      logo: "🦠",
      health: 100,
      lastSync: "30 seconds ago",
      dataFlow: { sent: 12345, received: 45678 },
      config: {
        apiKey: "vt_••••••••••••7p3A",
        endpoint: "https://www.virustotal.com/api/v3",
        syncInterval: "1 minute",
      },
    },
    {
      id: "aws-security",
      name: "AWS Security Hub",
      category: "cloud",
      description: "Centralized security and compliance for AWS",
      status: "connected",
      logo: "☁️",
      health: 98,
      lastSync: "2 minutes ago",
      dataFlow: { sent: 56789, received: 145678 },
      config: {
        apiKey: "aws_••••••••••••5k8B",
        endpoint: "https://securityhub.amazonaws.com",
        syncInterval: "5 minutes",
      },
    },
    {
      id: "azure-defender",
      name: "Azure Defender",
      category: "cloud",
      description: "Cloud security posture management for Azure",
      status: "connected",
      logo: "🔷",
      health: 97,
      lastSync: "3 minutes ago",
      dataFlow: { sent: 45678, received: 123456 },
      config: {
        apiKey: "az_••••••••••••9m4C",
        endpoint: "https://management.azure.com",
        syncInterval: "5 minutes",
      },
    },
    {
      id: "gcp-scc",
      name: "Google Cloud SCC",
      category: "cloud",
      description: "Security Command Center for GCP",
      status: "disconnected",
      logo: "🔴",
      health: 0,
      lastSync: "Never",
      dataFlow: { sent: 0, received: 0 },
      config: {},
    },
    {
      id: "okta",
      name: "Okta",
      category: "identity",
      description: "Identity and access management platform",
      status: "connected",
      logo: "🔑",
      health: 99,
      lastSync: "1 minute ago",
      dataFlow: { sent: 23456, received: 67890 },
      config: {
        apiKey: "ok_••••••••••••6n7D",
        endpoint: "https://company.okta.com",
        syncInterval: "5 minutes",
      },
    },
    {
      id: "azure-ad",
      name: "Azure Active Directory",
      category: "identity",
      description: "Cloud-based identity and access management",
      status: "connected",
      logo: "🔷",
      health: 98,
      lastSync: "2 minutes ago",
      dataFlow: { sent: 34567, received: 89012 },
      config: {
        apiKey: "ad_••••••••••••8p2E",
        endpoint: "https://graph.microsoft.com",
        syncInterval: "5 minutes",
      },
    },
  ]);

  const filteredIntegrations =
    activeCategory === "all"
      ? integrations
      : integrations.filter((i) => i.category === activeCategory);

  const stats = {
    total: integrations.length,
    connected: integrations.filter((i) => i.status === "connected").length,
    disconnected: integrations.filter((i) => i.status === "disconnected")
      .length,
    errors: integrations.filter((i) => i.status === "error").length,
    avgHealth: Math.round(
      integrations
        .filter((i) => i.status === "connected")
        .reduce((acc, i) => acc + i.health, 0) /
        integrations.filter((i) => i.status === "connected").length
    ),
  };

  const handleConnect = (integration: Integration) => {
    setIntegrations((prev) =>
      prev.map((i) =>
        i.id === integration.id
          ? { ...i, status: "connected", health: 95, lastSync: "Just now" }
          : i
      )
    );
  };

  const handleDisconnect = (integration: Integration) => {
    setIntegrations((prev) =>
      prev.map((i) =>
        i.id === integration.id
          ? {
              ...i,
              status: "disconnected",
              health: 0,
              lastSync: "Never",
              dataFlow: { sent: 0, received: 0 },
            }
          : i
      )
    );
  };

  const handleTest = (integration: Integration) => {
    alert(
      `Testing connection to ${integration.name}...\n\n✓ API endpoint reachable\n✓ Authentication successful\n✓ Data flow verified\n\nConnection test passed!`
    );
  };

  return (
    <div className="min-h-screen bg-transparent p-8 ">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-3">
          <div>
            <h1 className="text-4xl font-bold text-blue-400 drop-shadow-[0_0_12px_rgba(59,130,246,0.9)]">
              Integrations Hub
            </h1>
            <p className="text-slate-400">
              Connect CHURCHILL with your security ecosystem
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="bg-slate-900 rounded-lg px-4 py-2 border border-slate-700">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full bg-green-400"></div>
              <span className="text-sm text-white">Region: {region}</span>
            </div>
          </div>
          <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white rounded-lg font-semibold flex items-center space-x-2">
            <Plug className="w-5 h-5" />
            <span>Add Integration</span>
          </button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-5 gap-6 mb-8">
        <div className="bg-slate-900 rounded-xl p-6 border border-slate-700">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-slate-400">Total Integrations</span>
            <Plug className="w-5 h-5 text-blue-400" />
          </div>
          <div className="text-3xl font-bold text-white">{stats.total}</div>
        </div>

        <div className="bg-slate-900 rounded-xl p-6 border border-green-500/30">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-slate-400">Connected</span>
            <CheckCircle className="w-5 h-5 text-green-400" />
          </div>
          <div className="text-3xl font-bold text-green-400">
            {stats.connected}
          </div>
        </div>

        <div className="bg-slate-900 rounded-xl p-6 border border-slate-700">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-slate-400">Disconnected</span>
            <XCircle className="w-5 h-5 text-slate-400" />
          </div>
          <div className="text-3xl font-bold text-slate-400">
            {stats.disconnected}
          </div>
        </div>

        <div className="bg-slate-900 rounded-xl p-6 border border-red-500/30">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-slate-400">Errors</span>
            <AlertTriangle className="w-5 h-5 text-red-400" />
          </div>
          <div className="text-3xl font-bold text-red-400">{stats.errors}</div>
        </div>

        <div className="bg-slate-900 rounded-xl p-6 border border-slate-700">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-slate-400">Avg Health</span>
            <Activity className="w-5 h-5 text-cyan-400" />
          </div>
          <div className="text-3xl font-bold text-cyan-400">
            {stats.avgHealth}%
          </div>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="bg-slate-900 rounded-xl p-2 border border-slate-700 mb-8 overflow-x-auto hide-scrollbar">
        <div className="flex space-x-2 min-w-max">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`flex items-center space-x-2 px-4 py-3 rounded-lg font-semibold transition-all whitespace-nowrap ${
                activeCategory === category.id
                  ? "bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg"
                  : "text-slate-400 hover:text-white hover:bg-slate-800"
              }`}
            >
              <category.icon className="w-5 h-5" />
              <span>{category.name}</span>
              <span
                className={`px-2 py-0.5 rounded-full text-xs ${
                  activeCategory === category.id
                    ? "bg-white/20"
                    : "bg-slate-700"
                }`}
              >
                {category.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Integrations Grid */}
      <div className="grid grid-cols-3 gap-6">
        {filteredIntegrations.map((integration) => (
          <div
            key={integration.id}
            className={`bg-slate-900 rounded-xl p-6 border transition-all hover:shadow-lg ${
              integration.status === "connected"
                ? "border-green-500/30 hover:border-green-500/50"
                : integration.status === "error"
                ? "border-red-500/30 hover:border-red-500/50"
                : "border-slate-700 hover:border-slate-600"
            }`}
          >
            {/* Integration Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-lg bg-slate-800 flex items-center justify-center text-2xl">
                  {integration.logo}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">
                    {integration.name}
                  </h3>
                  <div className="flex items-center space-x-2 mt-1">
                    {integration.status === "connected" && (
                      <>
                        <CheckCircle className="w-4 h-4 text-green-400" />
                        <span className="text-xs text-green-400 font-semibold">
                          Connected
                        </span>
                      </>
                    )}
                    {integration.status === "disconnected" && (
                      <>
                        <XCircle className="w-4 h-4 text-slate-400" />
                        <span className="text-xs text-slate-400">
                          Disconnected
                        </span>
                      </>
                    )}
                    {integration.status === "error" && (
                      <>
                        <AlertTriangle className="w-4 h-4 text-red-400" />
                        <span className="text-xs text-red-400 font-semibold">
                          Error
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {integration.status === "connected" && (
                <div className="text-right">
                  <div className="text-2xl font-bold text-green-400">
                    {integration.health}%
                  </div>
                  <div className="text-xs text-slate-400">Health</div>
                </div>
              )}
            </div>

            {/* Description */}
            <p className="text-sm text-slate-400 mb-4">
              {integration.description}
            </p>

            {/* Stats */}
            {integration.status === "connected" && (
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="bg-slate-800/50 rounded-lg p-3">
                  <div className="flex items-center space-x-2 mb-1">
                    <Upload className="w-3 h-3 text-blue-400" />
                    <span className="text-xs text-slate-400">Sent</span>
                  </div>
                  <div className="text-sm font-bold text-white">
                    {integration.dataFlow.sent.toLocaleString()}
                  </div>
                </div>
                <div className="bg-slate-800/50 rounded-lg p-3">
                  <div className="flex items-center space-x-2 mb-1">
                    <Download className="w-3 h-3 text-cyan-400" />
                    <span className="text-xs text-slate-400">Received</span>
                  </div>
                  <div className="text-sm font-bold text-white">
                    {integration.dataFlow.received.toLocaleString()}
                  </div>
                </div>
              </div>
            )}

            {/* Last Sync */}
            <div className="flex items-center space-x-2 mb-4 text-xs text-slate-500">
              <RefreshCw className="w-3 h-3" />
              <span>Last sync: {integration.lastSync}</span>
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-2">
              {integration.status === "connected" ? (
                <>
                  <button
                    onClick={() => {
                      setSelectedIntegration(integration);
                      setShowConfigModal(true);
                    }}
                    className="flex-1 px-3 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-sm font-semibold flex items-center justify-center space-x-1"
                  >
                    <Settings className="w-4 h-4" />
                    <span>Configure</span>
                  </button>
                  <button
                    onClick={() => handleTest(integration)}
                    className="flex-1 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-semibold flex items-center justify-center space-x-1"
                  >
                    <Play className="w-4 h-4" />
                    <span>Test</span>
                  </button>
                  <button
                    onClick={() => handleDisconnect(integration)}
                    className="px-3 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </>
              ) : (
                <button
                  onClick={() => handleConnect(integration)}
                  className="w-full px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-lg text-sm font-semibold flex items-center justify-center space-x-2"
                >
                  <Plug className="w-4 h-4" />
                  <span>Connect</span>
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Configuration Modal */}
      {showConfigModal && selectedIntegration && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-8">
          <div className="bg-slate-900 rounded-2xl border border-slate-700 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="p-6 border-b border-slate-700">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-lg bg-slate-800 flex items-center justify-center text-2xl">
                    {selectedIntegration.logo}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">
                      {selectedIntegration.name}
                    </h2>
                    <p className="text-sm text-slate-400">
                      Integration Configuration
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setShowConfigModal(false);
                    setSelectedIntegration(null);
                    setShowApiKey(false);
                  }}
                  className="text-slate-400 hover:text-white"
                >
                  <XCircle className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              {/* API Key */}
              {selectedIntegration.config.apiKey && (
                <div>
                  <label className="block text-sm font-semibold text-white mb-2">
                    API Key
                  </label>
                  <div className="flex items-center space-x-2">
                    <input
                      type={showApiKey ? "text" : "password"}
                      value={selectedIntegration.config.apiKey}
                      readOnly
                      className="flex-1 px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white"
                    />
                    <button
                      onClick={() => setShowApiKey(!showApiKey)}
                      className="px-4 py-3 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg text-white"
                    >
                      {showApiKey ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                    <button className="px-4 py-3 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg text-white">
                      <Copy className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              )}

              {/* Endpoint */}
              {selectedIntegration.config.endpoint && (
                <div>
                  <label className="block text-sm font-semibold text-white mb-2">
                    API Endpoint
                  </label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={selectedIntegration.config.endpoint}
                      readOnly
                      className="flex-1 px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white"
                    />
                    <button className="px-4 py-3 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg text-white">
                      <ExternalLink className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              )}

              {/* Webhook */}
              {selectedIntegration.config.webhook && (
                <div>
                  <label className="block text-sm font-semibold text-white mb-2">
                    Webhook URL
                  </label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={selectedIntegration.config.webhook}
                      readOnly
                      className="flex-1 px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white"
                    />
                    <button className="px-4 py-3 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg text-white">
                      <Copy className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              )}

              {/* Sync Interval */}
              {selectedIntegration.config.syncInterval && (
                <div>
                  <label className="block text-sm font-semibold text-white mb-2">
                    Sync Interval
                  </label>
                  <select className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white">
                    <option value="1">1 minute</option>
                    <option value="3">3 minutes</option>
                    <option value="5" selected>
                      5 minutes
                    </option>
                    <option value="10">10 minutes</option>
                    <option value="15">15 minutes</option>
                    <option value="30">30 minutes</option>
                    <option value="60">1 hour</option>
                  </select>
                </div>
              )}

              {/* Health Status */}
              <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-semibold text-white">
                    Connection Health
                  </span>
                  <span className="text-2xl font-bold text-green-400">
                    {selectedIntegration.health}%
                  </span>
                </div>
                <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-green-500 to-emerald-500"
                    style={{ width: `${selectedIntegration.health}%` }}
                  />
                </div>
              </div>

              {/* Data Flow Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
                  <div className="flex items-center space-x-2 mb-2">
                    <Upload className="w-4 h-4 text-blue-400" />
                    <span className="text-sm text-slate-400">Data Sent</span>
                  </div>
                  <div className="text-2xl font-bold text-white">
                    {selectedIntegration.dataFlow.sent.toLocaleString()}
                  </div>
                  <div className="text-xs text-slate-500 mt-1">events</div>
                </div>
                <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
                  <div className="flex items-center space-x-2 mb-2">
                    <Download className="w-4 h-4 text-cyan-400" />
                    <span className="text-sm text-slate-400">
                      Data Received
                    </span>
                  </div>
                  <div className="text-2xl font-bold text-white">
                    {selectedIntegration.dataFlow.received.toLocaleString()}
                  </div>
                  <div className="text-xs text-slate-500 mt-1">events</div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-6 border-t border-slate-700 flex items-center justify-between">
              <button
                onClick={() => handleTest(selectedIntegration)}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold flex items-center space-x-2"
              >
                <Play className="w-5 h-5" />
                <span>Test Connection</span>
              </button>
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => {
                    setShowConfigModal(false);
                    setSelectedIntegration(null);
                    setShowApiKey(false);
                  }}
                  className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-lg font-semibold"
                >
                  Close
                </button>
                <button className="px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-lg font-semibold">
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Integrations;
