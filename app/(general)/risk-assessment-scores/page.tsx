"use client";

import React, { useState } from "react";
import {
  AlertCircle,
  TrendingDown,
  BarChart3,
  FileText,
  Users,
  Calendar,
  DollarSign,
  Clock,
  Download,
  Filter,
  Plus,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const RiskRegister = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedTab, setSelectedTab] = useState("register");

  return (
    <div className="min-h-screen bg-transparent p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-3">
          <div>
            <h1 className="text-4xl font-bold text-blue-400 drop-shadow-[0_0_12px_rgba(59,130,246,0.9)]">
              Risk Register
            </h1>
            <p className="text-emerald-300">
              Enterprise Risk Management & Compliance
            </p>
          </div>
        </div>
        <button className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-semibold flex items-center space-x-2 shadow-lg shadow-emerald-500/20">
          <Plus className="w-5 h-5" />
          <span>Add New Risk</span>
        </button>
      </div>

      {/* Risk Metrics */}
      <div className="grid grid-cols-6 gap-6 mb-8">
        {[
          {
            label: "Total Risks",
            value: "247",
            trend: "-18 this month",
            icon: AlertCircle,
            color: "emerald",
            change: "-6.8%",
          },
          {
            label: "Critical Risks",
            value: "34",
            trend: "-8 mitigated",
            icon: TrendingDown,
            color: "red",
            change: "-19.0%",
          },
          {
            label: "Risk Score",
            value: "68/100",
            trend: "Down from 85",
            icon: BarChart3,
            color: "yellow",
            change: "-20.0%",
          },
          {
            label: "Compliance",
            value: "96%",
            trend: "+4% improvement",
            icon: FileText,
            color: "green",
            change: "+4.3%",
          },
          {
            label: "Avg Resolution",
            value: "12 days",
            trend: "-3 days faster",
            icon: Clock,
            color: "blue",
            change: "-20.0%",
          },
          {
            label: "Financial Impact",
            value: "$2.4M",
            trend: "Potential exposure",
            icon: DollarSign,
            color: "orange",
            change: "-15.2%",
          },
        ].map((metric, idx) => (
          <Card key={idx} className="bg-slate-900/50 border-slate-700/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-3">
                <div
                  className={`w-10 h-10 rounded-lg bg-${metric.color}-500/20 flex items-center justify-center`}
                >
                  <metric.icon className={`w-5 h-5 text-${metric.color}-400`} />
                </div>
                <span
                  className={`text-xs font-semibold ${
                    metric.change.startsWith("-")
                      ? "text-green-400"
                      : "text-red-400"
                  }`}
                >
                  {metric.change}
                </span>
              </div>
              <div className="text-3xl font-bold text-white mb-1">
                {metric.value}
              </div>
              <div className="text-sm text-slate-400 mb-2">{metric.label}</div>
              <div className="text-xs text-green-400">{metric.trend}</div>
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
          <TabsTrigger value="register">Risk Register</TabsTrigger>
          <TabsTrigger value="matrix">Risk Matrix</TabsTrigger>
          <TabsTrigger value="analytics">Analytics & Trends</TabsTrigger>
          <TabsTrigger value="compliance">Compliance Tracking</TabsTrigger>
          <TabsTrigger value="supply-chain">Supply Chain Risks</TabsTrigger>
        </TabsList>

        {/* Risk Register Table */}
        <TabsContent value="register" className="space-y-6">
          <Card className="bg-slate-900/50 border-slate-700/50">
            <CardHeader>
              <CardTitle className="text-white flex items-center justify-between">
                <span>Active Risk Register</span>
                <div className="flex space-x-3">
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="px-4 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white text-sm"
                  >
                    <option value="all">All Categories</option>
                    <option value="cyber">Cyber Security</option>
                    <option value="operational">Operational</option>
                    <option value="financial">Financial</option>
                    <option value="compliance">Compliance</option>
                    <option value="strategic">Strategic</option>
                    <option value="reputational">Reputational</option>
                  </select>
                  <button className="px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-600 text-white rounded-lg text-sm flex items-center space-x-2">
                    <Filter className="w-4 h-4" />
                    <span>Filter</span>
                  </button>
                  <button className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-sm flex items-center space-x-2">
                    <Download className="w-4 h-4" />
                    <span>Export</span>
                  </button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto hide-scrollbar">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-700">
                      <th className="text-left py-3 px-4 text-sm font-semibold text-slate-400">
                        Risk ID
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-slate-400">
                        Description
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-slate-400">
                        Category
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-slate-400">
                        Impact
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-slate-400">
                        Likelihood
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-slate-400">
                        Risk Score
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-slate-400">
                        Owner
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-slate-400">
                        Status
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-slate-400">
                        Due Date
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-slate-400">
                        Financial Impact
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      {
                        id: "RSK-001",
                        description:
                          "Ransomware Attack on Critical Infrastructure",
                        category: "Cyber Security",
                        impact: "Critical",
                        likelihood: "High",
                        riskScore: 20,
                        riskLevel: "Critical",
                        owner: "CISO",
                        status: "Active",
                        dueDate: "2024-12-31",
                        financialImpact: "$1.2M",
                      },
                      {
                        id: "RSK-002",
                        description: "Data Breach due to Weak Authentication",
                        category: "Cyber Security",
                        impact: "High",
                        likelihood: "Medium",
                        riskScore: 12,
                        riskLevel: "High",
                        owner: "Security Team",
                        status: "Mitigating",
                        dueDate: "2024-11-15",
                        financialImpact: "$850K",
                      },
                      {
                        id: "RSK-003",
                        description: "Regulatory Non-Compliance (GDPR)",
                        category: "Compliance",
                        impact: "High",
                        likelihood: "Medium",
                        riskScore: 12,
                        riskLevel: "High",
                        owner: "Legal",
                        status: "Active",
                        dueDate: "2024-10-30",
                        financialImpact: "$2.5M",
                      },
                      {
                        id: "RSK-004",
                        description: "Third-Party Vendor Security Weakness",
                        category: "Operational",
                        impact: "Medium",
                        likelihood: "High",
                        riskScore: 9,
                        riskLevel: "Medium",
                        owner: "Procurement",
                        status: "Monitoring",
                        dueDate: "2025-01-15",
                        financialImpact: "$450K",
                      },
                      {
                        id: "RSK-005",
                        description: "Insider Threat - Privileged User Abuse",
                        category: "Cyber Security",
                        impact: "High",
                        likelihood: "Low",
                        riskScore: 8,
                        riskLevel: "Medium",
                        owner: "HR & Security",
                        status: "Active",
                        dueDate: "2024-12-01",
                        financialImpact: "$680K",
                      },
                      {
                        id: "RSK-006",
                        description: "Cloud Misconfiguration Exposure",
                        category: "Cyber Security",
                        impact: "Critical",
                        likelihood: "Medium",
                        riskScore: 15,
                        riskLevel: "Critical",
                        owner: "Cloud Team",
                        status: "Mitigating",
                        dueDate: "2024-11-30",
                        financialImpact: "$1.5M",
                      },
                      {
                        id: "RSK-007",
                        description: "Supply Chain Disruption",
                        category: "Operational",
                        impact: "High",
                        likelihood: "Medium",
                        riskScore: 12,
                        riskLevel: "High",
                        owner: "Operations",
                        status: "Active",
                        dueDate: "2025-02-28",
                        financialImpact: "$3.2M",
                      },
                      {
                        id: "RSK-008",
                        description: "API Security Vulnerabilities",
                        category: "Cyber Security",
                        impact: "High",
                        likelihood: "High",
                        riskScore: 16,
                        riskLevel: "Critical",
                        owner: "Dev Team",
                        status: "Mitigating",
                        dueDate: "2024-11-20",
                        financialImpact: "$920K",
                      },
                    ].map((risk, idx) => (
                      <tr
                        key={idx}
                        className="border-b border-slate-800 hover:bg-slate-800/50 transition-colors cursor-pointer"
                      >
                        <td className="py-4 px-4">
                          <span className="text-sm font-mono text-emerald-400">
                            {risk.id}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <div className="text-sm font-semibold text-white max-w-xs">
                            {risk.description}
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <span className="text-sm text-slate-300">
                            {risk.category}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <span
                            className={`px-2 py-1 rounded text-xs font-bold ${
                              risk.impact === "Critical"
                                ? "bg-red-500/20 text-red-400"
                                : risk.impact === "High"
                                ? "bg-orange-500/20 text-orange-400"
                                : "bg-yellow-500/20 text-yellow-400"
                            }`}
                          >
                            {risk.impact}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <span
                            className={`px-2 py-1 rounded text-xs font-bold ${
                              risk.likelihood === "High"
                                ? "bg-red-500/20 text-red-400"
                                : risk.likelihood === "Medium"
                                ? "bg-yellow-500/20 text-yellow-400"
                                : "bg-green-500/20 text-green-400"
                            }`}
                          >
                            {risk.likelihood}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center space-x-2">
                            <span className="text-lg font-bold text-white">
                              {risk.riskScore}
                            </span>
                            <span
                              className={`px-2 py-1 rounded text-xs font-bold ${
                                risk.riskLevel === "Critical"
                                  ? "bg-red-500 text-white"
                                  : risk.riskLevel === "High"
                                  ? "bg-orange-500 text-white"
                                  : "bg-yellow-500 text-black"
                              }`}
                            >
                              {risk.riskLevel}
                            </span>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center space-x-2">
                            <Users className="w-4 h-4 text-slate-500" />
                            <span className="text-sm text-slate-300">
                              {risk.owner}
                            </span>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <span
                            className={`px-2 py-1 rounded text-xs font-semibold ${
                              risk.status === "Active"
                                ? "bg-blue-500/20 text-blue-400"
                                : risk.status === "Mitigating"
                                ? "bg-yellow-500/20 text-yellow-400"
                                : "bg-green-500/20 text-green-400"
                            }`}
                          >
                            {risk.status}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center space-x-2 text-xs text-slate-400">
                            <Calendar className="w-3 h-3" />
                            <span>{risk.dueDate}</span>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <span className="text-sm font-semibold text-red-400">
                            {risk.financialImpact}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Risk Matrix Heatmap */}
        <TabsContent value="matrix" className="space-y-6">
          <Card className="bg-slate-900/50 border-slate-700/50">
            <CardHeader>
              <CardTitle className="text-white">Risk Matrix Heatmap</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-6 gap-2">
                {/* Headers */}
                <div></div>
                {["Very Low", "Low", "Medium", "High", "Critical"].map(
                  (label, idx) => (
                    <div
                      key={idx}
                      className="text-center text-xs font-semibold text-slate-400 pb-2"
                    >
                      {label}
                    </div>
                  )
                )}

                {/* Rows */}
                {["Critical", "High", "Medium", "Low", "Very Low"].map(
                  (impact, rowIdx) => (
                    <React.Fragment key={rowIdx}>
                      <div className="flex items-center justify-end pr-2 text-xs font-semibold text-slate-400">
                        {impact}
                      </div>
                      {[1, 2, 3, 4, 5].map((likelihood, colIdx) => {
                        const riskLevel = (5 - rowIdx) * likelihood;
                        const bgColor =
                          riskLevel >= 15
                            ? "bg-red-500"
                            : riskLevel >= 10
                            ? "bg-orange-500"
                            : riskLevel >= 5
                            ? "bg-yellow-500"
                            : "bg-green-500";

                        const count = Math.floor(Math.random() * 25) + 1;

                        return (
                          <div
                            key={colIdx}
                            className={`${bgColor} rounded-lg p-4 text-center cursor-pointer hover:opacity-80 transition-opacity`}
                          >
                            <div className="text-2xl font-bold text-white">
                              {count}
                            </div>
                            <div className="text-xs text-white/80">risks</div>
                          </div>
                        );
                      })}
                    </React.Fragment>
                  )
                )}
              </div>

              <div className="mt-6 flex items-center justify-center space-x-6 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-green-500 rounded"></div>
                  <span className="text-slate-400">Low (1-4)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-yellow-500 rounded"></div>
                  <span className="text-slate-400">Medium (5-9)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-orange-500 rounded"></div>
                  <span className="text-slate-400">High (10-14)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-red-500 rounded"></div>
                  <span className="text-slate-400">Critical (15-25)</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Risk Distribution */}
          <div className="grid grid-cols-2 gap-6">
            <Card className="bg-slate-900/50 border-slate-700/50">
              <CardHeader>
                <CardTitle className="text-white">
                  Risk Distribution by Category
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { category: "Cyber Security", count: 89, percentage: 36 },
                  { category: "Operational", count: 67, percentage: 27 },
                  { category: "Compliance", count: 45, percentage: 18 },
                  { category: "Financial", count: 28, percentage: 11 },
                  { category: "Strategic", count: 18, percentage: 8 },
                ].map((cat, idx) => (
                  <div key={idx}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-slate-300">
                        {cat.category}
                      </span>
                      <span className="text-sm font-semibold text-white">
                        {cat.count} risks
                      </span>
                    </div>
                    <div className="w-full bg-slate-800 rounded-full h-3">
                      <div
                        className="bg-emerald-500 h-3 rounded-full transition-all"
                        style={{ width: `${cat.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="bg-slate-900/50 border-slate-700/50">
              <CardHeader>
                <CardTitle className="text-white">
                  Risk Velocity (30 Days)
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { label: "New Risks Identified", value: 47, trend: "+12%" },
                  { label: "Risks Mitigated", value: 65, trend: "+23%" },
                  { label: "Risks Escalated", value: 8, trend: "-15%" },
                  { label: "Risks Closed", value: 52, trend: "+18%" },
                ].map((metric, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg"
                  >
                    <div>
                      <div className="text-xs text-slate-400 mb-1">
                        {metric.label}
                      </div>
                      <div className="text-2xl font-bold text-white">
                        {metric.value}
                      </div>
                    </div>
                    <span
                      className={`text-sm font-semibold ${
                        metric.trend.startsWith("+")
                          ? "text-green-400"
                          : "text-red-400"
                      }`}
                    >
                      {metric.trend}
                    </span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Analytics & Trends */}
        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-3 gap-6">
            <Card className="bg-slate-900/50 border-slate-700/50">
              <CardHeader>
                <CardTitle className="text-white">
                  Risk Trends (6 Months)
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  {
                    month: "May",
                    total: 198,
                    critical: 42,
                    high: 67,
                    medium: 89,
                  },
                  {
                    month: "Jun",
                    total: 212,
                    critical: 45,
                    high: 71,
                    medium: 96,
                  },
                  {
                    month: "Jul",
                    total: 234,
                    critical: 48,
                    high: 78,
                    medium: 108,
                  },
                  {
                    month: "Aug",
                    total: 256,
                    critical: 51,
                    high: 85,
                    medium: 120,
                  },
                  {
                    month: "Sep",
                    total: 267,
                    critical: 46,
                    high: 89,
                    medium: 132,
                  },
                  {
                    month: "Oct",
                    total: 247,
                    critical: 34,
                    high: 82,
                    medium: 131,
                  },
                ].map((data, idx) => (
                  <div key={idx} className="bg-slate-800/50 rounded-lg p-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-semibold text-white">
                        {data.month}
                      </span>
                      <span className="text-sm text-slate-400">
                        {data.total} total
                      </span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <div
                        className="flex-1 bg-red-500 h-2 rounded"
                        style={{
                          width: `${(data.critical / data.total) * 100}%`,
                        }}
                      />
                      <div
                        className="flex-1 bg-orange-500 h-2 rounded"
                        style={{ width: `${(data.high / data.total) * 100}%` }}
                      />
                      <div
                        className="flex-1 bg-yellow-500 h-2 rounded"
                        style={{
                          width: `${(data.medium / data.total) * 100}%`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="bg-slate-900/50 border-slate-700/50">
              <CardHeader>
                <CardTitle className="text-white">Top Risk Owners</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { owner: "CISO", risks: 45, critical: 12 },
                  { owner: "Security Team", risks: 38, critical: 8 },
                  { owner: "Operations", risks: 34, critical: 6 },
                  { owner: "Legal", risks: 28, critical: 5 },
                  { owner: "Cloud Team", risks: 23, critical: 4 },
                  { owner: "Dev Team", risks: 19, critical: 3 },
                ].map((owner, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center">
                        <Users className="w-5 h-5 text-emerald-400" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-white">
                          {owner.owner}
                        </div>
                        <div className="text-xs text-slate-400">
                          {owner.risks} risks assigned
                        </div>
                      </div>
                    </div>
                    <span className="px-2 py-1 bg-red-500/20 text-red-400 text-xs font-bold rounded">
                      {owner.critical} critical
                    </span>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="bg-slate-900/50 border-slate-700/50">
              <CardHeader>
                <CardTitle className="text-white">
                  Financial Impact Analysis
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center p-6 bg-slate-800/50 rounded-lg">
                  <div className="text-4xl font-bold text-red-400 mb-2">
                    $12.8M
                  </div>
                  <div className="text-sm text-slate-400">
                    Total Potential Exposure
                  </div>
                </div>
                <div className="space-y-3">
                  {[
                    {
                      category: "Cyber Security",
                      amount: "$5.2M",
                      percentage: 41,
                    },
                    {
                      category: "Operational",
                      amount: "$3.8M",
                      percentage: 30,
                    },
                    { category: "Compliance", amount: "$2.5M", percentage: 19 },
                    { category: "Financial", amount: "$1.3M", percentage: 10 },
                  ].map((item, idx) => (
                    <div key={idx}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-slate-400">
                          {item.category}
                        </span>
                        <span className="text-sm font-semibold text-white">
                          {item.amount}
                        </span>
                      </div>
                      <div className="w-full bg-slate-800 rounded-full h-2">
                        <div
                          className="bg-red-500 h-2 rounded-full"
                          style={{ width: `${item.percentage}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Compliance Tracking */}
        <TabsContent value="compliance" className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <Card className="bg-slate-900/50 border-slate-700/50">
              <CardHeader>
                <CardTitle className="text-white">
                  Compliance Frameworks
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  {
                    framework: "ISO 27001",
                    compliance: 96,
                    gaps: 4,
                    status: "Compliant",
                  },
                  {
                    framework: "GDPR",
                    compliance: 94,
                    gaps: 6,
                    status: "Compliant",
                  },
                  {
                    framework: "SOC 2 Type II",
                    compliance: 98,
                    gaps: 2,
                    status: "Compliant",
                  },
                  {
                    framework: "NIST CSF",
                    compliance: 92,
                    gaps: 8,
                    status: "In Progress",
                  },
                  {
                    framework: "PCI DSS",
                    compliance: 89,
                    gaps: 11,
                    status: "In Progress",
                  },
                  {
                    framework: "HIPAA",
                    compliance: 91,
                    gaps: 9,
                    status: "Compliant",
                  },
                ].map((item, idx) => (
                  <div key={idx} className="bg-slate-800/50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <div className="text-sm font-semibold text-white mb-1">
                          {item.framework}
                        </div>
                        <div className="text-xs text-slate-400">
                          {item.gaps} gaps identified
                        </div>
                      </div>
                      <span
                        className={`px-3 py-1 rounded text-xs font-bold ${
                          item.status === "Compliant"
                            ? "bg-green-500/20 text-green-400"
                            : "bg-yellow-500/20 text-yellow-400"
                        }`}
                      >
                        {item.status}
                      </span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="flex-1 bg-slate-700 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${
                            item.compliance >= 95
                              ? "bg-green-500"
                              : item.compliance >= 90
                              ? "bg-yellow-500"
                              : "bg-orange-500"
                          }`}
                          style={{ width: `${item.compliance}%` }}
                        />
                      </div>
                      <span className="text-sm font-bold text-white">
                        {item.compliance}%
                      </span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="bg-slate-900/50 border-slate-700/50">
              <CardHeader>
                <CardTitle className="text-white">
                  Compliance Gaps & Remediation
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  {
                    gap: "Access Control Policy Update",
                    framework: "ISO 27001",
                    priority: "High",
                    dueDate: "2024-11-15",
                  },
                  {
                    gap: "Data Retention Documentation",
                    framework: "GDPR",
                    priority: "Medium",
                    dueDate: "2024-12-01",
                  },
                  {
                    gap: "Incident Response Testing",
                    framework: "SOC 2",
                    priority: "High",
                    dueDate: "2024-11-20",
                  },
                  {
                    gap: "Vendor Risk Assessment",
                    framework: "NIST CSF",
                    priority: "Critical",
                    dueDate: "2024-10-31",
                  },
                  {
                    gap: "Encryption Key Management",
                    framework: "PCI DSS",
                    priority: "High",
                    dueDate: "2024-11-30",
                  },
                ].map((gap, idx) => (
                  <div
                    key={idx}
                    className="bg-slate-800/50 rounded-lg p-3 border border-slate-700"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <div className="text-sm font-semibold text-white mb-1">
                          {gap.gap}
                        </div>
                        <div className="text-xs text-slate-400">
                          {gap.framework}
                        </div>
                      </div>
                      <span
                        className={`px-2 py-1 rounded text-xs font-bold ${
                          gap.priority === "Critical"
                            ? "bg-red-500/20 text-red-400"
                            : gap.priority === "High"
                            ? "bg-orange-500/20 text-orange-400"
                            : "bg-yellow-500/20 text-yellow-400"
                        }`}
                      >
                        {gap.priority}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2 text-xs text-slate-400">
                      <Calendar className="w-3 h-3" />
                      <span>Due: {gap.dueDate}</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Supply Chain Risks */}
        <TabsContent value="supply-chain" className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <Card className="bg-slate-900/50 border-slate-700/50">
              <CardHeader>
                <CardTitle className="text-white">
                  Third-Party Risk Assessment
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  {
                    vendor: "CloudProvider Inc",
                    riskScore: 78,
                    category: "Infrastructure",
                    status: "High Risk",
                    lastAssessment: "2024-09-15",
                  },
                  {
                    vendor: "DataAnalytics Corp",
                    riskScore: 92,
                    category: "Data Processing",
                    status: "Critical",
                    lastAssessment: "2024-10-01",
                  },
                  {
                    vendor: "EmailService Ltd",
                    riskScore: 45,
                    category: "Communication",
                    status: "Medium Risk",
                    lastAssessment: "2024-08-20",
                  },
                  {
                    vendor: "PaymentGateway Co",
                    riskScore: 23,
                    category: "Financial",
                    status: "Low Risk",
                    lastAssessment: "2024-09-30",
                  },
                  {
                    vendor: "SecurityTools Inc",
                    riskScore: 34,
                    category: "Security",
                    status: "Low Risk",
                    lastAssessment: "2024-10-10",
                  },
                ].map((vendor, idx) => (
                  <div
                    key={idx}
                    className="bg-slate-800/50 rounded-lg p-4 border border-slate-700"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="text-sm font-semibold text-white mb-1">
                          {vendor.vendor}
                        </div>
                        <div className="text-xs text-slate-400">
                          {vendor.category}
                        </div>
                      </div>
                      <span
                        className={`px-2 py-1 rounded text-xs font-bold ${
                          vendor.status === "Critical"
                            ? "bg-red-500/20 text-red-400"
                            : vendor.status === "High Risk"
                            ? "bg-orange-500/20 text-orange-400"
                            : vendor.status === "Medium Risk"
                            ? "bg-yellow-500/20 text-yellow-400"
                            : "bg-green-500/20 text-green-400"
                        }`}
                      >
                        {vendor.status}
                      </span>
                    </div>
                    <div className="flex items-center space-x-3 mb-2">
                      <div className="flex-1 bg-slate-700 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${
                            vendor.riskScore >= 80
                              ? "bg-red-500"
                              : vendor.riskScore >= 60
                              ? "bg-orange-500"
                              : vendor.riskScore >= 40
                              ? "bg-yellow-500"
                              : "bg-green-500"
                          }`}
                          style={{ width: `${vendor.riskScore}%` }}
                        />
                      </div>
                      <span className="text-sm font-bold text-white">
                        {vendor.riskScore}
                      </span>
                    </div>
                    <div className="text-xs text-slate-400">
                      Last Assessment: {vendor.lastAssessment}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="bg-slate-900/50 border-slate-700/50">
              <CardHeader>
                <CardTitle className="text-white">
                  Supply Chain Intelligence
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: "Total Vendors", value: "127" },
                    { label: "Critical Vendors", value: "23" },
                    { label: "High Risk", value: "18" },
                    { label: "Assessments Due", value: "12" },
                  ].map((stat, idx) => (
                    <div
                      key={idx}
                      className="bg-slate-800/50 rounded-lg p-4 text-center"
                    >
                      <div className="text-3xl font-bold text-white mb-1">
                        {stat.value}
                      </div>
                      <div className="text-xs text-slate-400">{stat.label}</div>
                    </div>
                  ))}
                </div>

                <div className="pt-4 border-t border-slate-700">
                  <h4 className="text-sm font-semibold text-white mb-3">
                    Recent Vendor Incidents
                  </h4>
                  <div className="space-y-3">
                    {[
                      {
                        vendor: "DataAnalytics Corp",
                        incident: "Data Breach",
                        date: "2024-10-01",
                        impact: "High",
                        status: "Under Review",
                      },
                      {
                        vendor: "CloudProvider Inc",
                        incident: "Service Outage",
                        date: "2024-09-15",
                        impact: "Medium",
                        status: "Resolved",
                      },
                      {
                        vendor: "EmailService Ltd",
                        incident: "Phishing Campaign",
                        date: "2024-08-22",
                        impact: "Low",
                        status: "Resolved",
                      },
                    ].map((incident, idx) => (
                      <div
                        key={idx}
                        className="bg-slate-800/50 rounded-lg p-3 border border-slate-700"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-semibold text-white">
                            {incident.vendor}
                          </span>
                          <span
                            className={`px-2 py-1 rounded text-xs font-bold ${
                              incident.status === "Under Review"
                                ? "bg-yellow-500/20 text-yellow-400"
                                : "bg-green-500/20 text-green-400"
                            }`}
                          >
                            {incident.status}
                          </span>
                        </div>
                        <div className="text-xs text-slate-400 mb-1">
                          {incident.incident}
                        </div>
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-slate-500">
                            {incident.date}
                          </span>
                          <span
                            className={`px-2 py-0.5 rounded font-bold ${
                              incident.impact === "High"
                                ? "bg-red-500/20 text-red-400"
                                : incident.impact === "Medium"
                                ? "bg-yellow-500/20 text-yellow-400"
                                : "bg-green-500/20 text-green-400"
                            }`}
                          >
                            {incident.impact} Impact
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default RiskRegister;
