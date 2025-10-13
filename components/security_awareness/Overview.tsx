"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Mail, Users, Target, AlertTriangle } from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  Pie,
  PieChart as RePieChart,
  Cell,
  Bar,
  BarChart as ReBarChart,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

export default function Overview() {
  const campaignTrends = [
    { name: "Security Awareness", opened: 0, clicked: 0, submitted: 0 },
    { name: "Benefits Enroll.", opened: 50, clicked: 20, submitted: 0 },
    { name: "Invoice Payment", opened: 100, clicked: 35, submitted: 10 },
    { name: "Q4 Password Sec.", opened: 40, clicked: 10, submitted: 0 },
  ];

  const behaviorData = [
    { name: "Opened Email", value: 75, color: "#3b82f6" },
    { name: "Clicked Link", value: 25, color: "#f59e0b" },
  ];

  const engagementData = [
    { name: "Sent", value: 3, color: "#6366f1" },
    { name: "Opened", value: 3, color: "#3b82f6" },
    { name: "Clicked", value: 1, color: "#f59e0b" },
    { name: "Submitted", value: 0, color: "#ef4444" },
  ];

  const recentCampaigns = [
    {
      name: "Q4 Password Security Test",
      date: "29/09/2025",
      targets: 4,
      interactions: 1,
      engagement: "~30%",
      status: "completed",
    },
    {
      name: "Employee Feedback Survey",
      date: "10/10/2025",
      targets: 6,
      interactions: 2,
      engagement: "~30%",
      status: "completed",
    },
    {
      name: "Invoice Payment Verification",
      date: "06/10/2025",
      targets: 3,
      interactions: 1,
      engagement: "~30%",
      status: "completed",
    },
  ];

  return (
    <div className="space-y-8 text-gray-100 mt-5">
      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          {
            title: "Total Campaigns",
            value: "5",
            change: "+12% vs last month",
            color: "text-blue-400",
            icon: Mail,
            changeColor: "text-green-400",
          },
          {
            title: "Total Targets",
            value: "18",
            change: "+8% vs last month",
            color: "text-green-400",
            icon: Users,
            changeColor: "text-green-400",
          },
          {
            title: "Avg Click Rate",
            value: "33.3%",
            change: "-5% vs last month",
            color: "text-yellow-400",
            icon: Target,
            changeColor: "text-red-400",
          },
          {
            title: "Vulnerability Score",
            value: "Medium",
            change: "Improving vs last month",
            color: "text-red-400",
            icon: AlertTriangle,
            changeColor: "text-green-400",
          },
        ].map((stat, i) => (
          <Card
            key={i}
            className="bg-white/5 border-none backdrop-blur-md shadow-lg hover:shadow-[0_0_25px_rgba(59,130,246,0.5)] transition"
          >
            <CardContent className="p-5 space-y-2">
              <div className="flex items-center justify-between">
                <p className="text-gray-400">{stat.title}</p>
                <stat.icon className={stat.color} />
              </div>
              <h2 className="text-3xl font-bold">{stat.value}</h2>
              <p className={`${stat.changeColor} text-sm`}>{stat.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Performance Trends */}
        <Card className="bg-white/5 border-none backdrop-blur-md shadow-lg">
          <CardHeader>
            <CardTitle className="text-gray-100">
              Campaign Performance Trends
            </CardTitle>
            <p className="text-gray-400 text-sm">
              Open, click, and submission rates across recent campaigns
            </p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={campaignTrends}>
                <XAxis dataKey="name" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="opened"
                  stroke="#3b82f6"
                  fill="#3b82f6"
                  fillOpacity={0.3}
                  name="Opened %"
                />
                <Area
                  type="monotone"
                  dataKey="clicked"
                  stroke="#f59e0b"
                  fill="#f59e0b"
                  fillOpacity={0.3}
                  name="Clicked %"
                />
                <Area
                  type="monotone"
                  dataKey="submitted"
                  stroke="#ef4444"
                  fill="#ef4444"
                  fillOpacity={0.3}
                  name="Submitted %"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Behavior Distribution */}
        <Card className="bg-white/5 border-none backdrop-blur-md shadow-lg">
          <CardHeader>
            <CardTitle className="text-gray-100">
              User Behavior Distribution
            </CardTitle>
            <p className="text-gray-400 text-sm">
              How users responded to phishing attempts
            </p>
          </CardHeader>
          <CardContent className="flex justify-center">
            <ResponsiveContainer width="80%" height={220}>
              <RePieChart>
                <Pie
                  data={behaviorData}
                  dataKey="value"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label={(entry) => `${entry.name}: ${entry.value}%`}
                >
                  {behaviorData.map((entry, idx) => (
                    <Cell key={idx} fill={entry.color} />
                  ))}
                </Pie>
              </RePieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Engagement Overview */}
      <Card className="bg-white/5 border-none backdrop-blur-md shadow-lg">
        <CardHeader>
          <CardTitle className="text-gray-100">
            Engagement Metrics Overview
          </CardTitle>
          <p className="text-gray-400 text-sm">
            Total interactions across all campaigns
          </p>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <ReBarChart data={engagementData}>
              <XAxis dataKey="name" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip />
              <Bar dataKey="value">
                {engagementData.map((entry, idx) => (
                  <Cell key={idx} fill={entry.color} />
                ))}
              </Bar>
            </ReBarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Recent Campaigns */}
      <Card className="bg-white/5 border-none backdrop-blur-md shadow-lg">
        <CardHeader>
          <CardTitle className="text-gray-100">Recent Campaigns</CardTitle>
          <p className="text-gray-400 text-sm">
            Latest phishing simulation campaigns with real-time status
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          {recentCampaigns.map((c, idx) => (
            <div
              key={idx}
              className="flex flex-col md:flex-row md:items-center justify-between bg-white/5 p-4 rounded-xl"
            >
              <div>
                <h3 className="font-semibold text-gray-100">{c.name}</h3>
                <p className="text-sm text-gray-400">
                  {c.date} • {c.targets} targets
                </p>
              </div>
              <div className="flex items-center space-x-4 text-sm text-gray-300">
                <span>{c.interactions} interactions</span>
                <span>{c.engagement} engagement</span>
                <Badge className="bg-green-600/80 text-white capitalize">
                  {c.status}
                </Badge>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
