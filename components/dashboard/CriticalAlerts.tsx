"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Activity } from "lucide-react";

const alerts = [
  {
    title: "Suspicious Domain Registration",
    desc: "Domain similar to company brand detected",
    severity: "Critical",
    color: "bg-red-600",
    time: "2 minutes ago",
    details: {
      source: "Threat Intelligence Feed",
      affected: "External brand domains",
      description:
        "This domain was registered from a suspicious IP and mimics company branding. Likely used for phishing.",
      recommended:
        "Monitor traffic to this domain, block DNS resolution if needed.",
      indicators: ["domain: example-secure.com", "IP: 192.168.1.100"],
    },
  },
  {
    title: "Data Leak on Dark Web",
    desc: "Employee credentials found on underground forum",
    severity: "High",
    color: "bg-orange-500",
    time: "15 minutes ago",
    details: {
      source: "Dark Web Scan",
      affected: "Employee accounts",
      description:
        "Credentials including emails and hashed passwords have been found on multiple forums.",
      recommended:
        "Force password reset, enable MFA, and notify affected users.",
      indicators: ["email: user@example.com", "password hash: abc123..."],
    },
  },
  {
    title: "APT Campaign Targeting Industry",
    desc: "New campaign detected targeting financial sector",
    severity: "High",
    color: "bg-orange-500",
    time: "1 hour ago",
    details: {
      source: "SOC Monitoring",
      affected: "Finance department systems",
      description:
        "APT group is targeting executives via spear-phishing and malicious attachments.",
      recommended:
        "Update endpoint protection, alert users, and review logs for suspicious activity.",
      indicators: [
        "malware hash: 123abc...",
        "phishing domain: bank-secure.com",
      ],
    },
  },
  {
    title: "Phishing Attempt Detected",
    desc: "Email impersonating CEO sent to multiple employees",
    severity: "Medium",
    color: "bg-yellow-500",
    time: "3 hours ago",
    details: {
      source: "Email Security Gateway",
      affected: "Employees",
      description:
        "The email requested urgent wire transfers, mimicking executive instructions.",
      recommended:
        "Warn recipients, block sender, and report to security team.",
      indicators: ["from: ceo@company.com", "subject: Urgent Payment Required"],
    },
  },
];

export default function CriticalAlerts() {
  const [expanded, setExpanded] = useState<{ [key: string]: boolean }>({});

  const toggleDetails = (title: string) => {
    setExpanded((prev) => ({ ...prev, [title]: !prev[title] }));
  };

  return (
    <Card className="relative border-none text-white overflow-hidden rounded-2xl bg-white/5 shadow-lg backdrop-blur-md col-span-full">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-blue-800/10 to-transparent pointer-events-none" />
      <div className="relative z-10">
        <CardHeader>
          <CardTitle className="text-lg font-medium flex items-center gap-2 text-blue-400">
            <Activity className="h-6 w-6 text-blue-400" />
            Recent Critical Alerts
          </CardTitle>
          <p className="text-sm text-gray-400 mb-3">
            Latest high-priority threats requiring attention
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          {alerts.map((a) => (
            <div
              key={a.title}
              className="flex flex-col p-4 rounded-md bg-white/5 backdrop-blur-sm"
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-semibold">{a.title}</p>
                  <p className="text-sm text-gray-400">{a.desc}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={`${a.color} text-white text-xs font-bold px-2 py-1 rounded`}
                  >
                    {a.severity}
                  </span>
                  <span className="text-sm text-gray-400">{a.time}</span>
                  <button
                    onClick={() => toggleDetails(a.title)}
                    className="bg-gray-700 text-white text-xs px-3 py-1 rounded hover:bg-gray-600"
                  >
                    {expanded[a.title] ? "Hide Details" : "Details"}
                  </button>
                </div>
              </div>

              {expanded[a.title] && (
                <div className="mt-2 text-sm text-gray-300 space-y-1">
                  <p>
                    <span className="font-semibold">Source:</span>{" "}
                    {a.details.source}
                  </p>
                  <p>
                    <span className="font-semibold">Affected Systems:</span>{" "}
                    {a.details.affected}
                  </p>
                  <p>
                    <span className="font-semibold">Description:</span>{" "}
                    {a.details.description}
                  </p>
                  <p>
                    <span className="font-semibold">Recommended Actions:</span>{" "}
                    {a.details.recommended}
                  </p>
                  <p>
                    <span className="font-semibold">Indicators:</span>{" "}
                    {a.details.indicators.join(", ")}
                  </p>
                </div>
              )}
            </div>
          ))}
        </CardContent>
      </div>
    </Card>
  );
}
