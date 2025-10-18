"use client";

import { CheckCircle, Clock } from "lucide-react";

interface Framework {
  name: string;
  status: "Compliant" | "In Progress";
  score: string;
  lastAudit: string;
  nextAudit: string;
}

export default function ComplianceFrameworkCard() {
  // Dummy compliance frameworks data
  const frameworks: Framework[] = [
    {
      name: "ISO 27001",
      status: "Compliant",
      score: "96%",
      lastAudit: "Jan 2024",
      nextAudit: "Jan 2025",
    },
    {
      name: "GDPR",
      status: "Compliant",
      score: "94%",
      lastAudit: "Feb 2024",
      nextAudit: "Feb 2025",
    },
    {
      name: "PCI DSS",
      status: "Compliant",
      score: "92%",
      lastAudit: "Mar 2024",
      nextAudit: "Mar 2025",
    },
    {
      name: "NIST CSF",
      status: "In Progress",
      score: "88%",
      lastAudit: "Dec 2023",
      nextAudit: "Jun 2024",
    },
  ];

  return (
    <div className="bg-slate-900/50 backdrop-blur-lg rounded-2xl p-6 border border-slate-700/50">
      <h2 className="text-xl font-bold text-white mb-6">
        Compliance Frameworks
      </h2>
      <div className="space-y-4">
        {frameworks.map((fw, idx) => (
          <div
            key={idx}
            className="bg-slate-800/50 rounded-xl p-5 border border-slate-700 hover:border-blue-500/50 transition-all"
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold text-white">{fw.name}</h3>
              <span
                className={`px-3 py-1 rounded-full text-xs font-bold ${
                  fw.status === "Compliant"
                    ? "bg-green-500/20 text-green-400"
                    : "bg-yellow-500/20 text-yellow-400"
                }`}
              >
                {fw.status}
              </span>
            </div>
            <div className="grid grid-cols-4 gap-4 text-sm">
              <div>
                <div className="text-slate-400 text-xs mb-1">
                  Compliance Score
                </div>
                <div className="text-white font-bold">{fw.score}</div>
              </div>
              <div>
                <div className="text-slate-400 text-xs mb-1">Last Audit</div>
                <div className="text-white font-bold">{fw.lastAudit}</div>
              </div>
              <div>
                <div className="text-slate-400 text-xs mb-1">Next Audit</div>
                <div className="text-white font-bold">{fw.nextAudit}</div>
              </div>
              <div className="flex items-center justify-end">
                {fw.status === "Compliant" ? (
                  <CheckCircle className="w-5 h-5 text-green-400" />
                ) : (
                  <Clock className="w-5 h-5 text-yellow-400" />
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
