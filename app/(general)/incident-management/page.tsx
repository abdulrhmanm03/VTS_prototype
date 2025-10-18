"use client";

import React, { useState } from "react";
import {
  AlertTriangle,
  Clock,
  Users,
  Activity,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  Shield,
  FileText,
  Play,
  Target,
  Zap,
  Database,
  Plus,
  Filter,
  Download,
  Upload,
  MessageSquare,
  UserPlus,
  Flag,
  GitBranch,
  Lock,
  RefreshCw,
  Edit,
  X,
} from "lucide-react";

export default function IncidentManagement() {
  const [activeTab, setActiveTab] = useState("overview");
  const [activeView, setActiveView] = useState("active");
  const [selectedIncident, setSelectedIncident] = useState("INC-2023-0910");
  const [showComments, setShowComments] = useState(false);

  const allIncidents = [
    {
      id: "INC-2023-0910",
      title: "MGM Resorts ALPHV/BlackCat Ransomware Attack",
      status: "active",
      severity: "critical",
      startTime: "2023-09-10T14:32:00Z",
      detectedTime: "2023-09-19T22:15:00Z",
      assignee: "John Anderson",
      team: "IR Alpha",
      threatActor: "Scattered Spider (UNC3944)",
      ransomware: "ALPHV/BlackCat",
      impact: "$110M",
      affectedSystems: 156,
      compromisedAccounts: 23,
      exfiltratedData: "100GB+",
      downtime: "10+ days",
    },
    {
      id: "INC-2023-0915",
      title: "Phishing Campaign - Finance Department",
      status: "investigating",
      severity: "high",
      startTime: "2023-09-15T08:20:00Z",
      detectedTime: "2023-09-15T09:45:00Z",
      assignee: "Sarah Chen",
      team: "SOC Team",
      affectedSystems: 12,
      compromisedAccounts: 3,
    },
    {
      id: "INC-2023-0918",
      title: "Suspicious Network Traffic - Data Center",
      status: "contained",
      severity: "medium",
      startTime: "2023-09-18T14:10:00Z",
      detectedTime: "2023-09-18T14:30:00Z",
      assignee: "Mike Rodriguez",
      team: "Network Ops",
      affectedSystems: 5,
    },
  ];

  const currentIncident = allIncidents.find(
    (inc) => inc.id === selectedIncident
  );

  const timelineEvents = [
    {
      time: "2023-09-10 14:32",
      phase: "Reconnaissance",
      severity: "medium",
      event: "LinkedIn OSINT activity detected",
      details: "Unusual profile viewing patterns on IT staff accounts",
      status: "detected",
    },
    {
      time: "2023-09-12 09:15",
      phase: "Initial Access",
      severity: "critical",
      event: "Help desk social engineering call",
      details: "Password reset requested for admin account via phone",
      status: "successful",
    },
    {
      time: "2023-09-12 09:47",
      phase: "Initial Access",
      severity: "critical",
      event: "Okta authentication - unusual location",
      details: "Admin login from IP: 193.233.20.34 (Russia)",
      status: "successful",
    },
    {
      time: "2023-09-13 16:22",
      phase: "Privilege Escalation",
      severity: "critical",
      event: "Azure AD admin role assigned",
      details: "Global Administrator rights granted to compromised account",
      status: "successful",
    },
    {
      time: "2023-09-19 22:15",
      phase: "Impact",
      severity: "critical",
      event: "Ransomware deployment",
      details: "ALPHV/BlackCat encrypted across 100+ ESXi servers",
      status: "active",
    },
  ];

  const iocData = {
    network: [
      {
        type: "IP",
        value: "193.233.20.34",
        threat: "C2 Server",
        confidence: "High",
      },
      {
        type: "IP",
        value: "185.220.102.252",
        threat: "Backup C2",
        confidence: "High",
      },
      {
        type: "Domain",
        value: "mgm-employee-portal[.]com",
        threat: "Phishing",
        confidence: "High",
      },
      {
        type: "Domain",
        value: "mgm-helpdesk[.]net",
        threat: "Credential Harvest",
        confidence: "High",
      },
    ],
    files: [
      {
        type: "MD5",
        value: "3c8c3e4f7a9d2e8b5c1a6d9e2f7a4b8c",
        threat: "ALPHV Ransomware",
        confidence: "High",
      },
      {
        type: "SHA256",
        value: "9e5b2a8d1c7f4e6b3a9d...",
        threat: "BlackCat Binary",
        confidence: "High",
      },
      {
        type: "Filename",
        value: "RESTORE_YOUR_FILES.txt",
        threat: "Ransom Note",
        confidence: "High",
      },
    ],
  };

  const responseActions = [
    {
      action: "Isolate compromised systems",
      status: "completed",
      assignee: "SOC Team",
      time: "22:30",
      priority: "critical",
    },
    {
      action: "Disable compromised accounts",
      status: "completed",
      assignee: "Identity Team",
      time: "22:45",
      priority: "critical",
    },
    {
      action: "Block C2 IPs at perimeter",
      status: "completed",
      assignee: "Network Team",
      time: "23:15",
      priority: "high",
    },
    {
      action: "Engage external IR firm",
      status: "completed",
      assignee: "CISO",
      time: "23:45",
      priority: "high",
    },
    {
      action: "Assess backup integrity",
      status: "in-progress",
      assignee: "Infrastructure",
      time: "00:30",
      priority: "critical",
    },
    {
      action: "Deploy EDR to all endpoints",
      status: "in-progress",
      assignee: "Security Ops",
      time: "01:15",
      priority: "high",
    },
    {
      action: "Conduct threat hunt",
      status: "pending",
      assignee: "Threat Intel",
      time: "TBD",
      priority: "medium",
    },
    {
      action: "Legal coordination",
      status: "in-progress",
      assignee: "Legal",
      time: "02:00",
      priority: "high",
    },
  ];

  const comments = [
    {
      user: "John Anderson",
      time: "2h ago",
      text: "Ransomware confirmed. Engaging IR protocol Alpha-1. All hands on deck.",
    },
    {
      user: "Sarah Chen",
      time: "1h ago",
      text: "Backup systems compromised. Estimated recovery time 48-72 hours.",
    },
    {
      user: "Mike Rodriguez",
      time: "30m ago",
      text: "Network segmentation implemented. Casino floor isolated from corporate.",
    },
  ];

  const metrics = [
    {
      label: "Time to Detect",
      value: "9 days",
      status: "critical",
      icon: Clock,
    },
    {
      label: "Time to Respond",
      value: "32 minutes",
      status: "good",
      icon: Zap,
    },
    {
      label: "Systems Affected",
      value: "156",
      status: "critical",
      icon: Database,
    },
    {
      label: "Data Exfiltrated",
      value: "100GB+",
      status: "critical",
      icon: TrendingUp,
    },
    {
      label: "Financial Impact",
      value: "$110M",
      status: "critical",
      icon: AlertTriangle,
    },
    { label: "Team Members", value: "47", status: "active", icon: Users },
  ];

  const vulnerabilities = [
    {
      id: "MGM-001",
      title: "Insufficient Multi-Factor Authentication",
      cvss: "9.1",
      description:
        "Okta MFA was not enforced for help desk-initiated password resets",
      impact: "Complete identity infrastructure compromise",
      severity: "critical",
    },
    {
      id: "MGM-002",
      title: "Weak Help Desk Identity Verification",
      cvss: "9.8",
      description:
        "Help desk verification relied on easily obtainable information from LinkedIn",
      impact: "Initial access leading to full network compromise",
      severity: "critical",
    },
    {
      id: "MGM-003",
      title: "Insufficient Network Segmentation",
      cvss: "8.7",
      description: "Casino operations accessible from corporate IT network",
      impact: "Ransomware spread to critical gaming infrastructure",
      severity: "high",
    },
  ];

  const getSeverityColor = (severity: string) => {
    const colors: Record<string, string> = {
      critical: "text-red-400 bg-red-950/50 border-red-800",
      high: "text-orange-400 bg-orange-950/50 border-orange-800",
      medium: "text-yellow-400 bg-yellow-950/50 border-yellow-800",
      low: "text-blue-400 bg-blue-950/50 border-blue-800",
    };
    return colors[severity] ?? "text-gray-400 bg-gray-950/50 border-gray-800";
  };

  const getStatusIcon = (status: string) => {
    if (status === "completed")
      return <CheckCircle className="w-4 h-4 text-green-500" />;
    if (status === "in-progress")
      return <Activity className="w-4 h-4 text-blue-500 animate-pulse" />;
    if (status === "pending")
      return <Clock className="w-4 h-4 text-gray-500" />;
    if (status === "active")
      return <Play className="w-4 h-4 text-red-500 animate-pulse" />;
    return <AlertCircle className="w-4 h-4 text-gray-500" />;
  };

  const getStatusBadgeColor = (status: string): string => {
    const colors: Record<string, string> = {
      active: "bg-red-500/20 text-red-400 border-red-500/50",
      investigating: "bg-orange-500/20 text-orange-400 border-orange-500/50",
      contained: "bg-blue-500/20 text-blue-400 border-blue-500/50",
      resolved: "bg-green-500/20 text-green-400 border-green-500/50",
    };
    return colors[status] || "bg-gray-500/20 text-gray-400 border-gray-500/50";
  };

  function setShowNewIncident(arg0: boolean): void {
    console.log(arg0);
    throw new Error("Function not implemented.");
  }

  function setShowAssignModal(arg0: boolean): void {
    console.log(arg0);
    throw new Error("Function not implemented.");
  }

  return (
    <div className="min-h-screen pg-transparent p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header with Actions */}
        <div className="bg-slate-900/50 backdrop-blur-xl rounded-xl shadow-2xl border border-slate-800 p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-red-950/50 rounded-lg border border-red-800">
                <Shield className="w-8 h-8 text-red-500" />
              </div>
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-4xl font-bold text-blue-400 drop-shadow-[0_0_12px_rgba(59,130,246,0.9)]">
                    Incident Management
                  </h1>
                  <span className="px-3 py-1 bg-red-600 text-white text-xs font-semibold rounded-full animate-pulse">
                    {allIncidents.filter((i) => i.status === "active").length}{" "}
                    ACTIVE
                  </span>
                </div>
                <p className="text-slate-400">
                  Real-time incident triage and response coordination
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button className="px-4 py-2 bg-slate-800 text-slate-300 rounded-lg hover:bg-slate-700 transition-colors flex items-center gap-2 border border-slate-700">
                <Filter className="w-4 h-4" />
                Filter
              </button>
              <button className="px-4 py-2 bg-slate-800 text-slate-300 rounded-lg hover:bg-slate-700 transition-colors flex items-center gap-2 border border-slate-700">
                <Download className="w-4 h-4" />
                Export
              </button>
              <button
                onClick={() => setShowNewIncident(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                New Incident
              </button>
            </div>
          </div>

          {/* View Switcher */}
          <div className="flex gap-2">
            {["active", "investigating", "contained", "all"].map((view) => (
              <button
                key={view}
                onClick={() => setActiveView(view)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  activeView === view
                    ? "bg-blue-600 text-white shadow-lg"
                    : "text-slate-400 hover:bg-slate-800 border border-slate-700"
                }`}
              >
                {view.charAt(0).toUpperCase() + view.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Incidents List */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {allIncidents.map((incident) => (
            <div
              key={incident.id}
              onClick={() => setSelectedIncident(incident.id)}
              className={`bg-slate-900/50 backdrop-blur-xl rounded-xl border p-4 cursor-pointer transition-all ${
                selectedIncident === incident.id
                  ? "border-blue-500 shadow-lg shadow-blue-500/20"
                  : "border-slate-800 hover:border-slate-700"
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-mono text-slate-500">
                      {incident.id}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded text-xs font-semibold border ${getStatusBadgeColor(
                        incident.status
                      )}`}
                    >
                      {incident.status.toUpperCase()}
                    </span>
                  </div>
                  <h3 className="text-sm font-semibold text-slate-200 mb-2">
                    {incident.title}
                  </h3>
                </div>
                <span
                  className={`px-2 py-1 rounded text-xs font-medium border ${getSeverityColor(
                    incident.severity
                  )}`}
                >
                  {incident.severity.toUpperCase()}
                </span>
              </div>

              <div className="space-y-2 text-xs text-slate-400">
                <div className="flex items-center justify-between">
                  <span>Assignee:</span>
                  <span className="text-slate-300">{incident.assignee}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Team:</span>
                  <span className="text-slate-300">{incident.team}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Systems:</span>
                  <span className="text-red-400 font-semibold">
                    {incident.affectedSystems}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Status Bar */}
        <div className="bg-gradient-to-r from-red-950 to-orange-950 rounded-xl shadow-2xl p-4 border border-red-800">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-900/30 rounded-lg backdrop-blur">
                <AlertTriangle className="w-6 h-6 text-red-400" />
              </div>
              <div>
                <div className="font-semibold text-red-100">
                  Critical Severity - Active Response
                </div>
                <div className="text-sm text-red-300">
                  Ransomware deployment detected • Enterprise-wide impact
                </div>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <button
                onClick={() => setShowComments(!showComments)}
                className="px-4 py-2 bg-slate-900/50 text-slate-300 rounded-lg hover:bg-slate-800 transition-colors flex items-center gap-2 border border-slate-700"
              >
                <MessageSquare className="w-4 h-4" />
                Comments ({comments.length})
              </button>
              <button
                onClick={() => setShowAssignModal(true)}
                className="px-4 py-2 bg-slate-900/50 text-slate-300 rounded-lg hover:bg-slate-800 transition-colors flex items-center gap-2 border border-slate-700"
              >
                <UserPlus className="w-4 h-4" />
                Assign
              </button>
              <div className="flex items-center gap-3 text-sm text-red-200">
                <div className="text-center">
                  <div className="text-red-300/80">Duration</div>
                  <div className="font-bold">9 days</div>
                </div>
                <div className="w-px h-12 bg-red-700/30"></div>
                <div className="text-center">
                  <div className="text-red-300/80">IR Team</div>
                  <div className="font-bold">47 Active</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Comments Sidebar */}
        {showComments && (
          <div className="bg-slate-900/50 backdrop-blur-xl rounded-xl shadow-2xl border border-slate-800 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-slate-200 flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-blue-500" />
                Incident Comments
              </h3>
              <button onClick={() => setShowComments(false)}>
                <X className="w-5 h-5 text-slate-500 hover:text-slate-300" />
              </button>
            </div>
            <div className="space-y-3">
              {comments.map((comment, idx) => (
                <div
                  key={idx}
                  className="bg-slate-800/50 rounded-lg p-3 border border-slate-700"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-slate-300">
                      {comment.user}
                    </span>
                    <span className="text-xs text-slate-500">
                      {comment.time}
                    </span>
                  </div>
                  <p className="text-sm text-slate-400">{comment.text}</p>
                </div>
              ))}
              <div className="flex gap-2 mt-4">
                <input
                  type="text"
                  placeholder="Add a comment..."
                  className="flex-1 px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-300 placeholder-slate-500 focus:outline-none focus:border-blue-500"
                />
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  Post
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {metrics.map((metric, idx) => {
            const Icon = metric.icon;
            return (
              <div
                key={idx}
                className="bg-slate-900/50 backdrop-blur-xl rounded-xl shadow-xl border border-slate-800 p-4"
              >
                <div className="flex items-center gap-2 mb-2">
                  <Icon className="w-4 h-4 text-slate-400" />
                  <span className="text-xs text-slate-400 font-medium">
                    {metric.label}
                  </span>
                </div>
                <div className="text-2xl font-bold text-slate-200">
                  {metric.value}
                </div>
                {metric.status && (
                  <div
                    className={`mt-2 text-xs font-semibold ${
                      metric.status === "critical"
                        ? "text-red-400"
                        : metric.status === "good"
                        ? "text-green-400"
                        : "text-blue-400"
                    }`}
                  >
                    {metric.status.toUpperCase()}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Main Content Tabs */}
        <div className="bg-slate-900/50 backdrop-blur-xl rounded-xl shadow-2xl border border-slate-800">
          <div className="border-b border-slate-800">
            <div className="flex gap-1 p-2">
              {[
                "overview",
                "timeline",
                "iocs",
                "response",
                "analysis",
                "playbook",
              ].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    activeTab === tab
                      ? "bg-blue-600 text-white shadow-lg"
                      : "text-slate-400 hover:bg-slate-800"
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div className="p-6">
            {activeTab === "overview" && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-slate-200 flex items-center gap-2">
                      <FileText className="w-5 h-5 text-blue-500" />
                      Incident Details
                    </h3>
                    <div className="space-y-3 bg-slate-800/50 rounded-lg p-4 border border-slate-700">
                      <div className="flex justify-between">
                        <span className="text-slate-400">Threat Actor:</span>
                        <span className="font-semibold text-slate-200">
                          {currentIncident?.threatActor ?? "—"}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Ransomware:</span>
                        <span className="font-semibold text-slate-200">
                          {currentIncident?.ransomware ?? "—"}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Attack Vector:</span>
                        <span className="font-semibold text-slate-200">
                          Social Engineering
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Initial Access:</span>
                        <span className="font-semibold text-slate-200">
                          Help Desk Compromise
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">
                          Affected Systems:
                        </span>
                        <span className="font-semibold text-red-400">
                          {currentIncident?.affectedSystems ?? "—"}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">
                          Compromised Accounts:
                        </span>
                        <span className="font-semibold text-red-400">
                          {currentIncident?.compromisedAccounts ?? "—"}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-slate-200 flex items-center gap-2">
                      <Target className="w-5 h-5 text-red-500" />
                      Impact Assessment
                    </h3>
                    <div className="space-y-3">
                      <div className="bg-red-950/50 border border-red-800 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <AlertTriangle className="w-5 h-5 text-red-500" />
                          <span className="font-semibold text-red-300">
                            Financial Impact
                          </span>
                        </div>
                        <div className="text-3xl font-bold text-red-400 mb-1">
                          {currentIncident?.impact ?? "—"}
                        </div>
                        <div className="text-sm text-red-400/80">
                          Publicly disclosed (SEC filing)
                        </div>
                      </div>

                      <div className="bg-orange-950/50 border border-orange-800 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Clock className="w-5 h-5 text-orange-500" />
                          <span className="font-semibold text-orange-300">
                            Operational Downtime
                          </span>
                        </div>
                        <div className="text-2xl font-bold text-orange-400 mb-1">
                          {currentIncident?.downtime ?? "—"}
                        </div>
                        <div className="text-sm text-orange-400/80">
                          Slot machines, hotels, POS systems
                        </div>
                      </div>

                      <div className="bg-purple-950/50 border border-purple-800 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Database className="w-5 h-5 text-purple-500" />
                          <span className="font-semibold text-purple-300">
                            Data Breach
                          </span>
                        </div>
                        <div className="text-2xl font-bold text-purple-400 mb-1">
                          {currentIncident?.exfiltratedData ?? "—"}
                        </div>
                        <div className="text-sm text-purple-400/80">
                          Customer PII, financial records
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-slate-200 mb-4 flex items-center gap-2">
                    <Shield className="w-5 h-5 text-blue-500" />
                    MITRE ATT&CK Techniques Observed
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {[
                      {
                        id: "T1566.002",
                        name: "Spear-phishing Link",
                        tactic: "Initial Access",
                      },
                      {
                        id: "T1078.004",
                        name: "Cloud Accounts",
                        tactic: "Initial Access",
                      },
                      {
                        id: "T1098",
                        name: "Account Manipulation",
                        tactic: "Persistence",
                      },
                      {
                        id: "T1021.001",
                        name: "Remote Desktop",
                        tactic: "Lateral Movement",
                      },
                      { id: "T1486", name: "Data Encrypted", tactic: "Impact" },
                      {
                        id: "T1490",
                        name: "Inhibit Recovery",
                        tactic: "Impact",
                      },
                    ].map((technique) => (
                      <div
                        key={technique.id}
                        className="bg-slate-800/50 border border-slate-700 rounded-lg p-3 hover:border-blue-600 transition-colors cursor-pointer"
                      >
                        <div className="text-xs text-slate-500 mb-1">
                          {technique.tactic}
                        </div>
                        <div className="font-semibold text-slate-300">
                          {technique.id}
                        </div>
                        <div className="text-sm text-slate-400">
                          {technique.name}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "timeline" && (
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-slate-200">
                    Attack Timeline
                  </h3>
                  <span className="text-sm text-slate-400">
                    {timelineEvents.length} events tracked
                  </span>
                </div>

                <div className="relative">
                  <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-slate-700"></div>

                  <div className="space-y-4">
                    {timelineEvents.map((event, idx) => (
                      <div key={idx} className="relative pl-14">
                        <div
                          className={`absolute left-3.5 w-5 h-5 rounded-full border-4 ${
                            event.severity === "critical"
                              ? "bg-red-600 border-red-900"
                              : event.severity === "high"
                              ? "bg-orange-500 border-orange-900"
                              : "bg-yellow-500 border-yellow-900"
                          }`}
                        ></div>

                        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4 hover:shadow-lg hover:border-slate-600 transition-all">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <span className="font-semibold text-slate-200">
                                  {event.event}
                                </span>
                                <span
                                  className={`px-2 py-0.5 rounded text-xs font-medium border ${getSeverityColor(
                                    event.severity
                                  )}`}
                                >
                                  {event.severity.toUpperCase()}
                                </span>
                              </div>
                              <div className="text-sm text-slate-400">
                                {event.details}
                              </div>
                            </div>
                            {getStatusIcon(event.status)}
                          </div>
                          <div className="flex items-center gap-4 text-xs text-slate-500">
                            <span>{event.time}</span>
                            <span>•</span>
                            <span className="px-2 py-1 bg-slate-700/50 rounded">
                              {event.phase}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "iocs" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-slate-200">
                    Indicators of Compromise
                  </h3>
                  <div className="flex gap-2">
                    <button className="px-3 py-1.5 bg-slate-800 text-slate-300 rounded-lg hover:bg-slate-700 transition-colors text-sm flex items-center gap-2 border border-slate-700">
                      <Download className="w-4 h-4" />
                      Export IOCs
                    </button>
                    <button className="px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm flex items-center gap-2">
                      <Upload className="w-4 h-4" />
                      Import to SIEM
                    </button>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-slate-300 mb-3 flex items-center gap-2">
                    <Activity className="w-4 h-4" />
                    Network Indicators
                  </h4>
                  <div className="bg-slate-800/30 rounded-lg overflow-hidden border border-slate-700">
                    <table className="w-full">
                      <thead className="bg-slate-800">
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400">
                            Type
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400">
                            Value
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400">
                            Threat
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400">
                            Confidence
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-700">
                        {iocData.network.map((ioc, idx) => (
                          <tr
                            key={idx}
                            className="hover:bg-slate-800/50 transition-colors"
                          >
                            <td className="px-4 py-3 text-sm font-mono text-slate-400">
                              {ioc.type}
                            </td>
                            <td className="px-4 py-3 text-sm font-mono text-slate-200">
                              {ioc.value}
                            </td>
                            <td className="px-4 py-3 text-sm text-slate-300">
                              {ioc.threat}
                            </td>
                            <td className="px-4 py-3">
                              <span className="px-2 py-1 bg-red-950/50 text-red-400 text-xs font-semibold rounded border border-red-800">
                                {ioc.confidence}
                              </span>
                            </td>
                            <td className="px-4 py-3">
                              <button className="text-blue-400 hover:text-blue-300 text-xs">
                                Block
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-slate-300 mb-3 flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    File Indicators
                  </h4>
                  <div className="bg-slate-800/30 rounded-lg overflow-hidden border border-slate-700">
                    <table className="w-full">
                      <thead className="bg-slate-800">
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400">
                            Type
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400">
                            Value
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400">
                            Threat
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400">
                            Confidence
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-700">
                        {iocData.files.map((ioc, idx) => (
                          <tr
                            key={idx}
                            className="hover:bg-slate-800/50 transition-colors"
                          >
                            <td className="px-4 py-3 text-sm font-mono text-slate-400">
                              {ioc.type}
                            </td>
                            <td className="px-4 py-3 text-sm font-mono text-slate-200 truncate max-w-xs">
                              {ioc.value}
                            </td>
                            <td className="px-4 py-3 text-sm text-slate-300">
                              {ioc.threat}
                            </td>
                            <td className="px-4 py-3">
                              <span className="px-2 py-1 bg-red-950/50 text-red-400 text-xs font-semibold rounded border border-red-800">
                                {ioc.confidence}
                              </span>
                            </td>
                            <td className="px-4 py-3">
                              <button className="text-blue-400 hover:text-blue-300 text-xs">
                                Quarantine
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "response" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-slate-200">
                    Response Actions
                  </h3>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 text-sm">
                      <span className="text-slate-400">Progress:</span>
                      <span className="font-semibold text-blue-400">
                        4/8 Completed
                      </span>
                    </div>
                    <button className="px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm flex items-center gap-2">
                      <Plus className="w-4 h-4" />
                      Add Action
                    </button>
                  </div>
                </div>

                <div className="space-y-3">
                  {responseActions.map((action, idx) => (
                    <div
                      key={idx}
                      className={`border rounded-lg p-4 ${
                        action.status === "completed"
                          ? "bg-green-950/30 border-green-800"
                          : action.status === "in-progress"
                          ? "bg-blue-950/30 border-blue-800"
                          : "bg-slate-800/30 border-slate-700"
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3 flex-1">
                          {getStatusIcon(action.status)}
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-semibold text-slate-200">
                                {action.action}
                              </span>
                              <span
                                className={`px-2 py-0.5 rounded text-xs font-semibold ${
                                  action.priority === "critical"
                                    ? "bg-red-950/50 text-red-400 border border-red-800"
                                    : action.priority === "high"
                                    ? "bg-orange-950/50 text-orange-400 border border-orange-800"
                                    : "bg-yellow-950/50 text-yellow-400 border border-yellow-800"
                                }`}
                              >
                                {action.priority.toUpperCase()}
                              </span>
                            </div>
                            <div className="flex items-center gap-3 text-sm text-slate-400">
                              <span className="flex items-center gap-1">
                                <Users className="w-3 h-3" />
                                {action.assignee}
                              </span>
                              <span>•</span>
                              <span className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {action.time}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span
                            className={`px-2 py-1 rounded text-xs font-semibold ${
                              action.status === "completed"
                                ? "bg-green-950/50 text-green-400 border border-green-800"
                                : action.status === "in-progress"
                                ? "bg-blue-950/50 text-blue-400 border border-blue-800"
                                : "bg-slate-700 text-slate-400 border border-slate-600"
                            }`}
                          >
                            {action.status.replace("-", " ").toUpperCase()}
                          </span>
                          <button className="p-1 hover:bg-slate-700 rounded">
                            <Edit className="w-4 h-4 text-slate-400" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "analysis" && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-slate-200">
                  Root Cause Analysis
                </h3>

                <div className="space-y-4">
                  {vulnerabilities.map((vuln) => (
                    <div
                      key={vuln.id}
                      className={`border-l-4 p-4 rounded ${
                        vuln.severity === "critical"
                          ? "bg-red-950/30 border-red-600"
                          : "bg-orange-950/30 border-orange-600"
                      }`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4
                            className={`font-semibold mb-1 ${
                              vuln.severity === "critical"
                                ? "text-red-300"
                                : "text-orange-300"
                            }`}
                          >
                            {vuln.title}
                          </h4>
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-xs font-mono bg-slate-900 text-white px-2 py-1 rounded border border-slate-700">
                              {vuln.id}
                            </span>
                            <span
                              className={`text-xs font-semibold px-2 py-1 rounded border ${
                                vuln.severity === "critical"
                                  ? "bg-red-900/50 text-red-300 border-red-700"
                                  : "bg-orange-900/50 text-orange-300 border-orange-700"
                              }`}
                            >
                              CVSS {vuln.cvss}
                            </span>
                          </div>
                        </div>
                      </div>
                      <p className="text-sm text-slate-300 mb-2">
                        {vuln.description}
                      </p>
                      <div className="text-sm">
                        <span className="font-semibold text-slate-300">
                          Impact:{" "}
                        </span>
                        <span className="text-slate-400">{vuln.impact}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-blue-950/30 border border-blue-800 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-300 mb-3">
                    Recommendations
                  </h4>
                  <ul className="space-y-2 text-sm text-slate-300">
                    <li className="flex items-start gap-2">
                      <span className="text-blue-400 mt-1">•</span>
                      <span>
                        Implement hardware MFA tokens for all privileged
                        accounts
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-400 mt-1">•</span>
                      <span>
                        Enhance help desk verification with callback
                        authentication
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-400 mt-1">•</span>
                      <span>
                        Deploy network microsegmentation for critical systems
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-400 mt-1">•</span>
                      <span>Implement air-gapped backup solutions</span>
                    </li>
                  </ul>
                </div>
              </div>
            )}

            {activeTab === "playbook" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-slate-200">
                    Incident Response Playbook
                  </h3>
                  <button className="px-3 py-1.5 bg-slate-800 text-slate-300 rounded-lg hover:bg-slate-700 transition-colors text-sm flex items-center gap-2 border border-slate-700">
                    <GitBranch className="w-4 h-4" />
                    View Full Playbook
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="p-2 bg-red-950/50 rounded border border-red-800">
                        <Flag className="w-5 h-5 text-red-400" />
                      </div>
                      <h4 className="font-semibold text-slate-200">
                        Phase 1: Identification
                      </h4>
                    </div>
                    <ul className="space-y-2 text-sm text-slate-400">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        Detect anomalous activity
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        Validate incident
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        Classify severity
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        Activate IR team
                      </li>
                    </ul>
                  </div>

                  <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="p-2 bg-orange-950/50 rounded border border-orange-800">
                        <Lock className="w-5 h-5 text-orange-400" />
                      </div>
                      <h4 className="font-semibold text-slate-200">
                        Phase 2: Containment
                      </h4>
                    </div>
                    <ul className="space-y-2 text-sm text-slate-400">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        Isolate affected systems
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        Block malicious IPs
                      </li>
                      <li className="flex items-center gap-2">
                        <Activity className="w-4 h-4 text-blue-500 animate-pulse" />
                        Disable compromised accounts
                      </li>
                      <li className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-gray-500" />
                        Preserve evidence
                      </li>
                    </ul>
                  </div>

                  <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="p-2 bg-yellow-950/50 rounded border border-yellow-800">
                        <Shield className="w-5 h-5 text-yellow-400" />
                      </div>
                      <h4 className="font-semibold text-slate-200">
                        Phase 3: Eradication
                      </h4>
                    </div>
                    <ul className="space-y-2 text-sm text-slate-400">
                      <li className="flex items-center gap-2">
                        <Activity className="w-4 h-4 text-blue-500 animate-pulse" />
                        Remove malware
                      </li>
                      <li className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-gray-500" />
                        Patch vulnerabilities
                      </li>
                      <li className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-gray-500" />
                        Reset credentials
                      </li>
                      <li className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-gray-500" />
                        Verify clean state
                      </li>
                    </ul>
                  </div>

                  <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="p-2 bg-green-950/50 rounded border border-green-800">
                        <RefreshCw className="w-5 h-5 text-green-400" />
                      </div>
                      <h4 className="font-semibold text-slate-200">
                        Phase 4: Recovery
                      </h4>
                    </div>
                    <ul className="space-y-2 text-sm text-slate-400">
                      <li className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-gray-500" />
                        Restore from backups
                      </li>
                      <li className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-gray-500" />
                        Rebuild compromised systems
                      </li>
                      <li className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-gray-500" />
                        Monitor for reinfection
                      </li>
                      <li className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-gray-500" />
                        Resume operations
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="bg-purple-950/30 border border-purple-800 rounded-lg p-4">
                  <h4 className="font-semibold text-purple-300 mb-3 flex items-center gap-2">
                    <FileText className="w-5 h-5" />
                    Post-Incident Activities
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm text-slate-300">
                    <div className="flex items-start gap-2">
                      <span className="text-purple-400 mt-1">•</span>
                      <span>Conduct lessons learned meeting</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-purple-400 mt-1">•</span>
                      <span>Update incident response procedures</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-purple-400 mt-1">•</span>
                      <span>Implement security improvements</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
