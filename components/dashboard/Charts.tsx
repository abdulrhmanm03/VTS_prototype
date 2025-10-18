"use client";

import React, { useState } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";
import { TrendingUp } from "lucide-react";

const DashboardCharts = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState("month");

  // Dummy data
  const securityROI = [
    { month: "Jan", investment: 50, savings: 120 },
    { month: "Feb", investment: 80, savings: 150 },
    { month: "Mar", investment: 65, savings: 170 },
    { month: "Apr", investment: 90, savings: 200 },
  ];

  const industryBenchmark = [
    { metric: "Cybersecurity", yourOrg: 75, industry: 65, leader: 90 },
    { metric: "Compliance", yourOrg: 80, industry: 70, leader: 95 },
    { metric: "IT Ops", yourOrg: 60, industry: 55, leader: 85 },
    { metric: "Data Privacy", yourOrg: 85, industry: 75, leader: 95 },
  ];

  return (
    <div className="grid grid-cols-2 gap-6 mb-8">
      {/* Security Investment ROI */}
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
            {["month", "quarter", "year"].map((tf) => (
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

      {/* Industry Benchmarking */}
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
            <div className="text-sm text-slate-400">Overall Performance</div>
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
  );
};

export default DashboardCharts;
