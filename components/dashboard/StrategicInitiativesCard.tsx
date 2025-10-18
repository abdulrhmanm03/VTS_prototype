"use client";

import React from "react";

interface Initiative {
  name: string;
  status: "Ahead" | "On Track" | "Behind";
  completion: string;
  progress: number;
  budget: string;
  spent: string;
}

const StrategicInitiativesCard = () => {
  // Dummy data
  const strategicInitiatives: Initiative[] = [
    {
      name: "Zero Trust Implementation",
      status: "Ahead",
      completion: "Q4 2025",
      progress: 85,
      budget: "$1.2M",
      spent: "$950K",
    },
    {
      name: "Cloud Security Upgrade",
      status: "On Track",
      completion: "Q3 2025",
      progress: 60,
      budget: "$900K",
      spent: "$500K",
    },
    {
      name: "Security Awareness Training",
      status: "Behind",
      completion: "Q2 2025",
      progress: 40,
      budget: "$150K",
      spent: "$120K",
    },
    {
      name: "Incident Response Automation",
      status: "On Track",
      completion: "Q4 2025",
      progress: 70,
      budget: "$600K",
      spent: "$400K",
    },
  ];

  return (
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
  );
};

export default StrategicInitiativesCard;
