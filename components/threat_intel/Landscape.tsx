"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, LineChart, Line, AreaChart, Area, PieChart, Pie, Cell } from "recharts";
import { ShieldAlert, Globe, Activity, Wifi, Cpu } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const threatTrends = [
  { month: "Jan", malware: 23, phishing: 12 },
  { month: "Feb", malware: 18, phishing: 15 },
  { month: "Mar", malware: 28, phishing: 21 },
  { month: "Apr", malware: 35, phishing: 25 },
  { month: "May", malware: 40, phishing: 30 },
  { month: "Jun", malware: 45, phishing: 35 },
];

const threatSources = [
  { name: "Dark Web", value: 35 },
  { name: "Botnets", value: 25 },
  { name: "Phishing Kits", value: 20 },
  { name: "Exploit Markets", value: 15 },
  { name: "Forums", value: 5 },
];

const regionDistribution = [
  { region: "North America", incidents: 42 },
  { region: "Europe", incidents: 36 },
  { region: "Asia", incidents: 55 },
  { region: "Middle East", incidents: 28 },
  { region: "Africa", incidents: 18 },
];

const severityData = [
  { name: "Critical", value: 30 },
  { name: "High", value: 45 },
  { name: "Medium", value: 20 },
  { name: "Low", value: 5 },
];

const COLORS = ["#ef4444", "#f97316", "#3b82f6", "#10b981"];

const topThreats = [
  { name: "Ransomware - LockBit 3.0", type: "Malware", trend: "+25%" },
  { name: "Credential Stealer - RedLine", type: "Phishing", trend: "+12%" },
  { name: "Zero-day CVE-2025-1234", type: "Exploit", trend: "+9%" },
  { name: "DDoS Campaign - Mantis", type: "Botnet", trend: "+17%" },
  { name: "APT Group - Sandworm", type: "Nation-State", trend: "+8%" },
];

export default function ThreatLandscape() {
  return (
    <div className="space-y-6 text-white">
      {/* === Top Stats Row === */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {[
          { title: "Active Threats", value: "347", icon: ShieldAlert, color: "from-red-500/20 to-red-900/10" },
          { title: "Open Incidents", value: "128", icon: Activity, color: "from-orange-500/20 to-orange-900/10" },
          { title: "Dark Web Mentions", value: "523", icon: Globe, color: "from-blue-500/20 to-blue-900/10" },
          { title: "Botnets Detected", value: "74", icon: Wifi, color: "from-green-500/20 to-green-900/10" },
          { title: "Zero-Day Exploits", value: "6", icon: Cpu, color: "from-purple-500/20 to-purple-900/10" },
        ].map((stat, i) => (
          <Card key={i} className={`bg-gradient-to-br ${stat.color} rounded-2xl backdrop-blur-md shadow-md`}>
            <CardContent className="p-4 flex flex-col items-center text-center">
              <stat.icon className="w-6 h-6 mb-2 text-blue-400" />
              <div className="text-lg font-bold">{stat.value}</div>
              <div className="text-xs text-gray-400">{stat.title}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* === Graphs Grid === */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Line Chart */}
        <Card className="bg-white/5 rounded-2xl backdrop-blur-md shadow-lg hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] transition-all">
          <CardHeader>
            <CardTitle>Monthly Threat Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={threatTrends}>
                <XAxis dataKey="month" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip />
                <Line type="monotone" dataKey="malware" stroke="#3b82f6" strokeWidth={2} />
                <Line type="monotone" dataKey="phishing" stroke="#f59e0b" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Bar Chart */}
        <Card className="bg-white/5 rounded-2xl backdrop-blur-md shadow-lg hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] transition-all">
          <CardHeader>
            <CardTitle>Threat Sources Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={threatSources}>
                <XAxis dataKey="name" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip />
                <Bar dataKey="value" fill="#3b82f6" radius={[10, 10, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Area Chart */}
        <Card className="bg-white/5 rounded-2xl backdrop-blur-md shadow-lg hover:shadow-[0_0_30px_rgba(34,197,94,0.5)] transition-all">
          <CardHeader>
            <CardTitle>Regional Incident Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={regionDistribution}>
                <XAxis dataKey="region" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip />
                <Area type="monotone" dataKey="incidents" stroke="#10b981" fill="#10b981" fillOpacity={0.3} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Pie Chart */}
        <Card className="bg-white/5 rounded-2xl backdrop-blur-md shadow-lg hover:shadow-[0_0_30px_rgba(239,68,68,0.5)] transition-all">
          <CardHeader>
            <CardTitle>Threat Severity Levels</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={severityData}
                  dataKey="value"
                  cx="50%"
                  cy="50%"
                  outerRadius={70}
                  label
                >
                  {severityData.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* === Table Section === */}
      <Card className="bg-white/5 rounded-2xl backdrop-blur-md shadow-lg">
        <CardHeader>
          <CardTitle>Top Emerging Threats</CardTitle>
        </CardHeader>
        <CardContent>
          <table className="w-full text-sm">
            <thead className="text-gray-400 border-b border-gray-700">
              <tr>
                <th className="text-left py-2">Name</th>
                <th className="text-left">Type</th>
                <th className="text-right">Trend</th>
              </tr>
            </thead>
            <tbody>
              {topThreats.map((t, i) => (
                <tr key={i} className="border-b border-gray-800 hover:bg-white/5">
                  <td className="py-2">{t.name}</td>
                  <td><Badge variant="outline">{t.type}</Badge></td>
                  <td className="text-right text-green-400 font-semibold">{t.trend}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}