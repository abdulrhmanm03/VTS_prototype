"use client";

import { useState } from "react";
import {
  Shield,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Users,
  Building2,
  FileCheck,
  Target,
  Globe,
  Download,
  FileText,
  CheckCircle,
  BarChart3,
  Activity,
  Award,
  Clock,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

type Region = "global" | "uae";
type View = "executive" | "operational";
type Timeframe = "month" | "quarter" | "year";

interface ExecutiveMetrics {
  securityPosture: {
    score: number;
    trend: string;
    status: string;
    description: string;
    riskLevel: string;
  };
  financialRisk: {
    potentialLoss: string;
    prevented: string;
    trend: string;
    description: string;
    savings: string;
  };
  complianceStatus: {
    score: number;
    frameworks: string[];
    compliant: number;
    total: number;
    nextAudit: string;
  };
  businessImpact: {
    incidentsPrevented: number;
    downtimePrevented: string;
    reputationScore: number;
    customerTrust: string;
  };
  teamPerformance: {
    responseTime: string;
    resolutionRate: number;
    activeIncidents: number;
    teamEfficiency: string;
  };
}

interface BusinessRisk {
  category: string;
  level: "Low" | "Medium" | "High";
  impact: string;
  probability: string;
  mitigation: string;
  color: string;
  trend: "up" | "down" | "stable";
}

interface ComplianceFramework {
  name: string;
  status: "Compliant" | "In Progress";
  score: number;
  lastAudit: string;
  nextAudit: string;
}

interface StrategicInitiative {
  name: string;
  progress: number;
  status: "Ahead" | "On Track" | "Delayed";
  completion: string;
  budget: string;
  spent: string;
}

interface ROIData {
  month: string;
  investment: number;
  savings: number;
  incidents: number;
}

interface BenchmarkData {
  metric: string;
  yourOrg: number;
  industry: number;
  leader: number;
}

interface CommandNexusProps {
  region?: Region;
}

const CommandNexus: React.FC<CommandNexusProps> = ({ region = "global" }) => {
  const [selectedRegion, setSelectedRegion] = useState<Region>(region);
  const [selectedView, setSelectedView] = useState<View>("executive");
  const [showReportModal, setShowReportModal] = useState(false);
  const [selectedTimeframe, setSelectedTimeframe] =
    useState<Timeframe>("month");

  // Executive metrics
  const executiveMetrics: ExecutiveMetrics = {
    securityPosture: {
      score: 87,
      trend: "+5%",
      status: "Strong",
      description: "Overall organizational security health",
      riskLevel: "Low",
    },
    financialRisk: {
      potentialLoss: "$2.4M",
      prevented: "$8.7M",
      trend: "-23%",
      description: "Estimated financial exposure from cyber threats",
      savings: "$6.3M",
    },
    complianceStatus: {
      score: 94,
      frameworks: ["ISO 27001", "GDPR", "PCI DSS", "NIST CSF"],
      compliant: 15,
      total: 16,
      nextAudit: "45 days",
    },
    businessImpact: {
      incidentsPrevented: 1247,
      downtimePrevented: "127 hours",
      reputationScore: 92,
      customerTrust: "+12%",
    },
    teamPerformance: {
      responseTime: "8 min",
      resolutionRate: 94,
      activeIncidents: 3,
      teamEfficiency: "+18%",
    },
  };

  const businessRisks: BusinessRisk[] = [
    {
      category: "Data Breach Risk",
      level: "Low",
      impact: "$1.2M",
      probability: "12%",
      mitigation: "Active",
      color: "green",
      trend: "down",
    },
    {
      category: "Ransomware Threat",
      level: "Medium",
      impact: "$3.5M",
      probability: "28%",
      mitigation: "Enhanced",
      color: "yellow",
      trend: "stable",
    },
    {
      category: "Supply Chain Risk",
      level: "Medium",
      impact: "$2.1M",
      probability: "22%",
      mitigation: "Monitoring",
      color: "yellow",
      trend: "up",
    },
    {
      category: "Insider Threat",
      level: "Low",
      impact: "$890K",
      probability: "8%",
      mitigation: "Active",
      color: "green",
      trend: "down",
    },
  ];

  const complianceFrameworks: ComplianceFramework[] = [
    {
      name: "ISO 27001",
      status: "Compliant",
      score: 96,
      lastAudit: "Jan 2024",
      nextAudit: "Jan 2025",
    },
    {
      name: "GDPR",
      status: "Compliant",
      score: 94,
      lastAudit: "Feb 2024",
      nextAudit: "Feb 2025",
    },
    {
      name: "PCI DSS",
      status: "Compliant",
      score: 92,
      lastAudit: "Mar 2024",
      nextAudit: "Mar 2025",
    },
    {
      name: "NIST CSF",
      status: "In Progress",
      score: 88,
      lastAudit: "Dec 2023",
      nextAudit: "Jun 2024",
    },
  ];

  const strategicInitiatives: StrategicInitiative[] = [
    {
      name: "Zero Trust Architecture",
      progress: 67,
      status: "On Track",
      completion: "Q3 2024",
      budget: "$450K",
      spent: "$301K",
    },
    {
      name: "Cloud Security Enhancement",
      progress: 82,
      status: "Ahead",
      completion: "Q2 2024",
      budget: "$320K",
      spent: "$245K",
    },
    {
      name: "Security Awareness Program",
      progress: 45,
      status: "On Track",
      completion: "Q4 2024",
      budget: "$180K",
      spent: "$78K",
    },
    {
      name: "Incident Response Automation",
      progress: 91,
      status: "Ahead",
      completion: "Q2 2024",
      budget: "$275K",
      spent: "$238K",
    },
  ];

  const securityROI: ROIData[] = [
    { month: "Jan", investment: 120, savings: 340, incidents: 12 },
    { month: "Feb", investment: 115, savings: 380, incidents: 9 },
    { month: "Mar", investment: 125, savings: 420, incidents: 7 },
    { month: "Apr", investment: 130, savings: 390, incidents: 8 },
    { month: "May", investment: 135, savings: 450, incidents: 5 },
    { month: "Jun", investment: 140, savings: 520, incidents: 3 },
  ];

  const industryBenchmark: BenchmarkData[] = [
    { metric: "Security Posture", yourOrg: 87, industry: 72, leader: 94 },
    { metric: "Incident Response", yourOrg: 92, industry: 68, leader: 96 },
    { metric: "Compliance", yourOrg: 94, industry: 78, leader: 98 },
    { metric: "Team Efficiency", yourOrg: 88, industry: 71, leader: 93 },
    { metric: "Risk Management", yourOrg: 85, industry: 69, leader: 91 },
  ];

  const handleExport = (format: string) => {
    console.log(`[v0] Exporting executive dashboard in ${format} format`);
    setShowReportModal(true);
  };

  return (
    <div className="min-h-screen">
      <header className="  border-b  sticky top-0 z-50">
        <div className="max-w-[1920px] mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div>
                <h1 className="text-4xl font-bold text-blue-400 drop-shadow-[0_0_12px_rgba(59,130,246,0.9)]">
                  Executive Security Dashboard
                </h1>
                <p className="text-sm text-blue-300">
                  Strategic Security Overview & Business Impact
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-slate-800/50 rounded-lg p-1">
                <button
                  onClick={() => setSelectedView("executive")}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                    selectedView === "executive"
                      ? "bg-blue-600 text-white"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  Executive View
                </button>
                <button
                  onClick={() => setSelectedView("operational")}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                    selectedView === "operational"
                      ? "bg-blue-600 text-white"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  Operational View
                </button>
              </div>

              <div className="flex items-center space-x-2 bg-slate-800/50 rounded-lg p-1">
                <button
                  onClick={() => setSelectedRegion("global")}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                    selectedRegion === "global"
                      ? "bg-blue-600 text-white"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  <Globe className="w-4 h-4 inline mr-2" />
                  Global
                </button>
                <button
                  onClick={() => setSelectedRegion("uae")}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                    selectedRegion === "uae"
                      ? "bg-blue-600 text-white"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  🇦🇪 UAE
                </button>
              </div>

              <button
                onClick={() => handleExport("pdf")}
                className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-lg transition-all"
              >
                <Download className="w-4 h-4 text-white" />
                <span className="text-sm font-semibold text-white">
                  Export Report
                </span>
              </button>

              <div className="text-right">
                <div className="text-xs text-slate-400">Last Updated</div>
                <div className="text-sm font-semibold text-white">
                  {new Date().toLocaleTimeString()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-[1920px] mx-auto px-6 py-8">
        <div className="grid grid-cols-5 gap-6 mb-8">
          <div className="bg-gradient-to-br from-green-900/40 to-green-800/20 backdrop-blur-lg rounded-2xl p-6 border border-green-500/30 hover:border-green-400/50 transition-all">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center">
                <Shield className="w-6 h-6 text-green-400" />
              </div>
              <div className="flex items-center space-x-1 px-2 py-1 rounded-lg bg-green-500/20">
                <TrendingUp className="w-4 h-4 text-green-400" />
                <span className="text-xs font-semibold text-green-400">
                  {executiveMetrics.securityPosture.trend}
                </span>
              </div>
            </div>
            <div className="text-4xl font-bold text-white mb-2">
              {executiveMetrics.securityPosture.score}
            </div>
            <div className="text-sm font-semibold text-green-300 mb-1">
              Security Posture Score
            </div>
            <div className="text-xs text-slate-400">
              {executiveMetrics.securityPosture.description}
            </div>
            <div className="mt-4 pt-4 border-t border-green-500/20">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400">Risk Level</span>
                <span className="text-xs font-bold text-green-400">
                  {executiveMetrics.securityPosture.riskLevel}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-900/40 to-blue-800/20 backdrop-blur-lg rounded-2xl p-6 border border-blue-500/30 hover:border-blue-400/50 transition-all">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-blue-400" />
              </div>
              <div className="flex items-center space-x-1 px-2 py-1 rounded-lg bg-green-500/20">
                <TrendingDown className="w-4 h-4 text-green-400" />
                <span className="text-xs font-semibold text-green-400">
                  {executiveMetrics.financialRisk.trend}
                </span>
              </div>
            </div>
            <div className="text-4xl font-bold text-white mb-2">
              {executiveMetrics.financialRisk.potentialLoss}
            </div>
            <div className="text-sm font-semibold text-blue-300 mb-1">
              Financial Risk Exposure
            </div>
            <div className="text-xs text-slate-400">
              {executiveMetrics.financialRisk.description}
            </div>
            <div className="mt-4 pt-4 border-t border-blue-500/20">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400">Losses Prevented</span>
                <span className="text-xs font-bold text-green-400">
                  {executiveMetrics.financialRisk.prevented}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-900/40 to-purple-800/20 backdrop-blur-lg rounded-2xl p-6 border border-purple-500/30 hover:border-purple-400/50 transition-all">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center">
                <FileCheck className="w-6 h-6 text-purple-400" />
              </div>
              <div className="flex items-center space-x-1 px-2 py-1 rounded-lg bg-green-500/20">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span className="text-xs font-semibold text-green-400">
                  Compliant
                </span>
              </div>
            </div>
            <div className="text-4xl font-bold text-white mb-2">
              {executiveMetrics.complianceStatus.score}%
            </div>
            <div className="text-sm font-semibold text-purple-300 mb-1">
              Compliance Status
            </div>
            <div className="text-xs text-slate-400">
              {executiveMetrics.complianceStatus.compliant}/
              {executiveMetrics.complianceStatus.total} frameworks
            </div>
            <div className="mt-4 pt-4 border-t border-purple-500/20">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400">Next Audit</span>
                <span className="text-xs font-bold text-purple-400">
                  {executiveMetrics.complianceStatus.nextAudit}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-orange-900/40 to-orange-800/20 backdrop-blur-lg rounded-2xl p-6 border border-orange-500/30 hover:border-orange-400/50 transition-all">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-orange-500/20 flex items-center justify-center">
                <Target className="w-6 h-6 text-orange-400" />
              </div>
              <div className="flex items-center space-x-1 px-2 py-1 rounded-lg bg-green-500/20">
                <TrendingUp className="w-4 h-4 text-green-400" />
                <span className="text-xs font-semibold text-green-400">
                  {executiveMetrics.businessImpact.customerTrust}
                </span>
              </div>
            </div>
            <div className="text-4xl font-bold text-white mb-2">
              {executiveMetrics.businessImpact.incidentsPrevented}
            </div>
            <div className="text-sm font-semibold text-orange-300 mb-1">
              Incidents Prevented
            </div>
            <div className="text-xs text-slate-400">
              Protecting business operations
            </div>
            <div className="mt-4 pt-4 border-t border-orange-500/20">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400">Downtime Saved</span>
                <span className="text-xs font-bold text-orange-400">
                  {executiveMetrics.businessImpact.downtimePrevented}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-cyan-900/40 to-cyan-800/20 backdrop-blur-lg rounded-2xl p-6 border border-cyan-500/30 hover:border-cyan-400/50 transition-all">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-cyan-500/20 flex items-center justify-center">
                <Users className="w-6 h-6 text-cyan-400" />
              </div>
              <div className="flex items-center space-x-1 px-2 py-1 rounded-lg bg-green-500/20">
                <TrendingUp className="w-4 h-4 text-green-400" />
                <span className="text-xs font-semibold text-green-400">
                  {executiveMetrics.teamPerformance.teamEfficiency}
                </span>
              </div>
            </div>
            <div className="text-4xl font-bold text-white mb-2">
              {executiveMetrics.teamPerformance.resolutionRate}%
            </div>
            <div className="text-sm font-semibold text-cyan-300 mb-1">
              Resolution Rate
            </div>
            <div className="text-xs text-slate-400">
              Security team performance
            </div>
            <div className="mt-4 pt-4 border-t border-cyan-500/20">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400">Avg Response</span>
                <span className="text-xs font-bold text-cyan-400">
                  {executiveMetrics.teamPerformance.responseTime}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6 mb-8">
          <div className="col-span-2 bg-slate-900/50 backdrop-blur-lg rounded-2xl p-6 border border-slate-700/50">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-white">
                  Business Risk Assessment
                </h2>
                <p className="text-sm text-slate-400">
                  Financial impact and mitigation status
                </p>
              </div>
              <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg transition-colors">
                View Full Report
              </button>
            </div>
            <div className="space-y-4">
              {businessRisks.map((risk, idx) => (
                <div
                  key={idx}
                  className="bg-slate-800/50 rounded-xl p-5 border border-slate-700 hover:border-blue-500/50 transition-all"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-semibold text-white">
                          {risk.category}
                        </h3>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-bold ${
                            risk.level === "Low"
                              ? "bg-green-500/20 text-green-400"
                              : risk.level === "Medium"
                              ? "bg-yellow-500/20 text-yellow-400"
                              : "bg-red-500/20 text-red-400"
                          }`}
                        >
                          {risk.level} Risk
                        </span>
                        <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-500/20 text-blue-400">
                          {risk.mitigation}
                        </span>
                      </div>
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <div className="text-slate-400 text-xs mb-1">
                            Potential Impact
                          </div>
                          <div className="text-white font-bold">
                            {risk.impact}
                          </div>
                        </div>
                        <div>
                          <div className="text-slate-400 text-xs mb-1">
                            Probability
                          </div>
                          <div className="text-white font-bold">
                            {risk.probability}
                          </div>
                        </div>
                        <div>
                          <div className="text-slate-400 text-xs mb-1">
                            Trend
                          </div>
                          <div className="flex items-center space-x-1">
                            {risk.trend === "down" ? (
                              <TrendingDown className="w-4 h-4 text-green-400" />
                            ) : risk.trend === "up" ? (
                              <TrendingUp className="w-4 h-4 text-red-400" />
                            ) : (
                              <Activity className="w-4 h-4 text-yellow-400" />
                            )}
                            <span className="text-white font-bold capitalize">
                              {risk.trend}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${
                        risk.level === "Low"
                          ? "bg-gradient-to-r from-green-500 to-green-600"
                          : risk.level === "Medium"
                          ? "bg-gradient-to-r from-yellow-500 to-yellow-600"
                          : "bg-gradient-to-r from-red-500 to-red-600"
                      }`}
                      style={{ width: `${Number.parseInt(risk.probability)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-slate-900/50 backdrop-blur-lg rounded-2xl p-6 border border-slate-700/50">
            <h2 className="text-xl font-bold text-white mb-6">
              Compliance Frameworks
            </h2>
            <div className="space-y-4">
              {complianceFrameworks.map((framework, idx) => (
                <div
                  key={idx}
                  className="bg-slate-800/50 rounded-lg p-4 border border-slate-700 hover:border-purple-500/50 transition-all"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <Award className="w-5 h-5 text-purple-400" />
                      <span className="text-sm font-semibold text-white">
                        {framework.name}
                      </span>
                    </div>
                    <span
                      className={`px-2 py-1 rounded text-xs font-bold ${
                        framework.status === "Compliant"
                          ? "bg-green-500/20 text-green-400"
                          : "bg-yellow-500/20 text-yellow-400"
                      }`}
                    >
                      {framework.status}
                    </span>
                  </div>
                  <div className="mb-3">
                    <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                      <span>Compliance Score</span>
                      <span className="text-white font-bold">
                        {framework.score}%
                      </span>
                    </div>
                    <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-purple-500 to-purple-600"
                        style={{ width: `${framework.score}%` }}
                      />
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <div>
                      <div className="text-slate-500">Last Audit</div>
                      <div className="text-slate-300 font-semibold">
                        {framework.lastAudit}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-slate-500">Next Audit</div>
                      <div className="text-purple-400 font-semibold">
                        {framework.nextAudit}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6 mb-8">
          <div className="bg-slate-900/50 backdrop-blur-lg rounded-2xl p-6 border border-slate-700/50">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-white">
                  Security Investment ROI
                </h2>
                <p className="text-sm text-slate-400">
                  Investment vs. Cost Savings (in $1000s)
                </p>
              </div>
              <div className="flex space-x-2">
                {(["month", "quarter", "year"] as Timeframe[]).map((tf) => (
                  <button
                    key={tf}
                    onClick={() => setSelectedTimeframe(tf)}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                      selectedTimeframe === tf
                        ? "bg-blue-600 text-white"
                        : "bg-slate-700 text-slate-300 hover:bg-slate-600"
                    }`}
                  >
                    {tf.charAt(0).toUpperCase() + tf.slice(1)}
                  </button>
                ))}
              </div>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={securityROI}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="month" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1e293b",
                    border: "1px solid #475569",
                    borderRadius: "8px",
                  }}
                />
                <Legend />
                <Bar
                  dataKey="investment"
                  fill="#3b82f6"
                  name="Investment"
                  radius={[8, 8, 0, 0]}
                />
                <Bar
                  dataKey="savings"
                  fill="#22c55e"
                  name="Cost Savings"
                  radius={[8, 8, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-slate-700">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400">$2.7M</div>
                <div className="text-xs text-slate-400">Total Savings</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400">$765K</div>
                <div className="text-xs text-slate-400">Total Investment</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-400">353%</div>
                <div className="text-xs text-slate-400">ROI</div>
              </div>
            </div>
          </div>

          <div className="bg-slate-900/50 backdrop-blur-lg rounded-2xl p-6 border border-slate-700/50">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-white">
                  Industry Benchmarking
                </h2>
                <p className="text-sm text-slate-400">
                  Your organization vs. industry average
                </p>
              </div>
              <button className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white text-sm font-semibold rounded-lg transition-colors">
                Full Analysis
              </button>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={industryBenchmark} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis type="number" stroke="#94a3b8" domain={[0, 100]} />
                <YAxis
                  dataKey="metric"
                  type="category"
                  stroke="#94a3b8"
                  width={120}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1e293b",
                    border: "1px solid #475569",
                    borderRadius: "8px",
                  }}
                />
                <Legend />
                <Bar
                  dataKey="yourOrg"
                  fill="#3b82f6"
                  name="Your Organization"
                  radius={[0, 8, 8, 0]}
                />
                <Bar
                  dataKey="industry"
                  fill="#64748b"
                  name="Industry Average"
                  radius={[0, 8, 8, 0]}
                />
                <Bar
                  dataKey="leader"
                  fill="#22c55e"
                  name="Industry Leader"
                  radius={[0, 8, 8, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
            <div className="mt-6 pt-6 border-t border-slate-700">
              <div className="flex items-center justify-between">
                <div className="text-sm text-slate-400">
                  Overall Performance
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-lg font-bold text-green-400">
                    Above Average
                  </span>
                  <TrendingUp className="w-5 h-5 text-green-400" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-slate-900/50 backdrop-blur-lg rounded-2xl p-6 border border-slate-700/50 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-white">
                Strategic Security Initiatives
              </h2>
              <p className="text-sm text-slate-400">
                Key projects and their progress
              </p>
            </div>
            <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg transition-colors">
              View All Projects
            </button>
          </div>
          <div className="grid grid-cols-2 gap-6">
            {strategicInitiatives.map((initiative, idx) => (
              <div
                key={idx}
                className="bg-slate-800/50 rounded-xl p-5 border border-slate-700 hover:border-blue-500/50 transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white mb-1">
                      {initiative.name}
                    </h3>
                    <div className="flex items-center space-x-3">
                      <span
                        className={`px-2 py-1 rounded text-xs font-bold ${
                          initiative.status === "Ahead"
                            ? "bg-green-500/20 text-green-400"
                            : initiative.status === "On Track"
                            ? "bg-blue-500/20 text-blue-400"
                            : "bg-red-500/20 text-red-400"
                        }`}
                      >
                        {initiative.status}
                      </span>
                      <span className="text-xs text-slate-400">
                        Target: {initiative.completion}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-white">
                      {initiative.progress}%
                    </div>
                    <div className="text-xs text-slate-400">Complete</div>
                  </div>
                </div>
                <div className="mb-4">
                  <div className="h-3 bg-slate-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500"
                      style={{ width: `${initiative.progress}%` }}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="text-slate-400 text-xs mb-1">Budget</div>
                    <div className="text-white font-semibold">
                      {initiative.budget}
                    </div>
                  </div>
                  <div>
                    <div className="text-slate-400 text-xs mb-1">Spent</div>
                    <div className="text-white font-semibold">
                      {initiative.spent}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-slate-900/50 backdrop-blur-lg rounded-2xl p-6 border border-slate-700/50">
          <h2 className="text-xl font-bold text-white mb-6">
            Executive Actions
          </h2>
          <div className="grid grid-cols-4 gap-4">
            {[
              {
                icon: FileText,
                label: "Board Report",
                description: "Generate executive summary",
                color: "blue",
                action: () => handleExport("board-report"),
              },
              {
                icon: BarChart3,
                label: "Risk Analysis",
                description: "Comprehensive risk assessment",
                color: "purple",
                action: () => console.log("[v0] Opening risk analysis"),
              },
              {
                icon: Award,
                label: "Compliance Audit",
                description: "Review compliance status",
                color: "green",
                action: () => console.log("[v0] Opening compliance audit"),
              },
              {
                icon: DollarSign,
                label: "Budget Review",
                description: "Security spending analysis",
                color: "yellow",
                action: () => console.log("[v0] Opening budget review"),
              },
              {
                icon: Users,
                label: "Team Performance",
                description: "SOC team metrics",
                color: "cyan",
                action: () => console.log("[v0] Opening team performance"),
              },
              {
                icon: Target,
                label: "Strategic Planning",
                description: "Security roadmap",
                color: "orange",
                action: () => console.log("[v0] Opening strategic planning"),
              },
              {
                icon: Building2,
                label: "Vendor Assessment",
                description: "Third-party risk review",
                color: "red",
                action: () => console.log("[v0] Opening vendor assessment"),
              },
              {
                icon: Clock,
                label: "Incident Review",
                description: "Past incidents analysis",
                color: "pink",
                action: () => console.log("[v0] Opening incident review"),
              },
            ].map((action, idx) => (
              <button
                key={idx}
                onClick={action.action}
                className={`bg-gradient-to-br from-${action.color}-600/20 to-${action.color}-700/20 hover:from-${action.color}-600/30 hover:to-${action.color}-700/30 border border-${action.color}-500/30 rounded-xl p-5 transition-all hover:scale-105 text-left group`}
              >
                <action.icon
                  className={`w-8 h-8 text-${action.color}-400 mb-3 group-hover:scale-110 transition-transform`}
                />
                <div className="text-sm font-semibold text-white mb-1">
                  {action.label}
                </div>
                <div className="text-xs text-slate-400">
                  {action.description}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {showReportModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-8">
          <div className="bg-slate-900 rounded-2xl max-w-2xl w-full border border-slate-700 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6">
              <h2 className="text-2xl font-bold text-white mb-2">
                Generate Executive Report
              </h2>
              <p className="text-blue-100">Select report type and format</p>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-2 gap-4 mb-6">
                {[
                  {
                    name: "Board Summary",
                    desc: "High-level overview for board meetings",
                  },
                  {
                    name: "Risk Assessment",
                    desc: "Detailed risk analysis and mitigation",
                  },
                  {
                    name: "Compliance Report",
                    desc: "Regulatory compliance status",
                  },
                  {
                    name: "Financial Impact",
                    desc: "ROI and cost savings analysis",
                  },
                  {
                    name: "Strategic Review",
                    desc: "Initiative progress and roadmap",
                  },
                  {
                    name: "Incident Summary",
                    desc: "Security incidents and response",
                  },
                ].map((report, idx) => (
                  <button
                    key={idx}
                    className="bg-slate-800/50 hover:bg-slate-700/50 rounded-lg p-4 border border-slate-700 hover:border-blue-500/50 transition-all text-left"
                  >
                    <div className="text-sm font-semibold text-white mb-1">
                      {report.name}
                    </div>
                    <div className="text-xs text-slate-400">{report.desc}</div>
                  </button>
                ))}
              </div>

              <div className="mb-6">
                <label className="text-sm font-semibold text-white mb-2 block">
                  Export Format
                </label>
                <div className="grid grid-cols-4 gap-3">
                  {["PDF", "PowerPoint", "Excel", "Word"].map((format) => (
                    <button
                      key={format}
                      className="px-4 py-3 bg-slate-800 hover:bg-blue-600 text-white rounded-lg text-sm font-semibold transition-colors"
                    >
                      {format}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-end space-x-3">
                <button
                  onClick={() => setShowReportModal(false)}
                  className="px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-semibold transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    console.log("[v0] Generating executive report");
                    setShowReportModal(false);
                  }}
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg font-semibold transition-all"
                >
                  Generate Report
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommandNexus;
