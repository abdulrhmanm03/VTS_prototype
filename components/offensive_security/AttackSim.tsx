"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Activity, Target, Download, FileText, Copy } from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip as ReTooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
} from "recharts";

// ---------------------------
// Types
// ---------------------------

type Vulnerability = {
  id: string;
  title: string;
  severity: string;
  cvss: number;
  exploitable: boolean;
  description: string;
  remediation: string;
};

type Evidence = { step: string; note: string; time: string };

type TimelineEvent = { time: string; event: string; severity?: string };

type Findings = {
  critical: number;
  high: number;
  medium: number;
  low: number;
  info: number;
};

type TestResults = {
  target: string;
  duration: string;
  findings: Findings;
  vulnerabilities: Vulnerability[];
  exploited_successfully: number;
  attack_path: string[];
  recommendations: string[];
  evidence: Evidence[];
  timeline: TimelineEvent[];
};

type ExploitAttempt = {
  id: number;
  phase: string;
  test: string;
  result: "success" | "failed";
  severity: "Critical" | "High" | "Medium";
};

type LiveOutputEntry = {
  time: string;
  text: string;
  type: "info" | "success" | "warning";
};

// ---------------------------
// Component
// ---------------------------

export default function AttackSimulator({
  defaultTarget = "203.0.113.42",
}: {
  defaultTarget?: string;
}) {
  const [testing, setTesting] = useState(false);
  const [testProgress, setTestProgress] = useState(0);
  const [currentTest, setCurrentTest] = useState("");
  const [testResults, setTestResults] = useState<TestResults | null>(null);
  const [liveOutput, setLiveOutput] = useState<LiveOutputEntry[]>([]);
  const [exploitAttempts, setExploitAttempts] = useState<ExploitAttempt[]>([]);
  const [targetInput, setTargetInput] = useState(defaultTarget);
  const [showRaw, setShowRaw] = useState(false);

  // ---------------------------
  // Constants
  // ---------------------------

  const COLOR_MAP: Record<string, string> = {
    Critical: "#b91c1c",
    High: "#f97316",
    Medium: "#fbbf24",
    Low: "#60a5fa",
    Info: "#94a3b8",
  };

  const testPhases = [
    {
      name: "Reconnaissance",
      duration: 2000,
      tests: ["DNS Enumeration", "Port Scanning", "Service Detection"],
    },
    {
      name: "Vulnerability Scanning",
      duration: 3000,
      tests: ["CVE Detection", "Misconfigurations", "Weak Passwords"],
    },
    {
      name: "Exploitation Attempts",
      duration: 4000,
      tests: ["SQL Injection", "XSS Testing", "RCE Attempts"],
    },
    {
      name: "Privilege Escalation",
      duration: 2500,
      tests: ["Sudo Misconfig", "SUID Binaries", "Kernel Exploits"],
    },
    {
      name: "Lateral Movement",
      duration: 2000,
      tests: ["Credential Harvesting", "Network Pivoting"],
    },
    {
      name: "Data Exfiltration Test",
      duration: 1800,
      tests: ["Data Access", "Egress Testing"],
    },
  ];

  // ---------------------------
  // Lifecycle
  // ---------------------------

  useEffect(() => {
    return () => setTesting(false);
  }, []);

  // ---------------------------
  // Helpers
  // ---------------------------

  const pushLive = (
    text: string,
    type: "info" | "success" | "warning" = "info"
  ) => {
    const item: LiveOutputEntry = {
      time: new Date().toLocaleTimeString(),
      text,
      type,
    };
    setLiveOutput((prev) => [item, ...prev].slice(0, 200));
  };

  // ---------------------------
  // Core Simulation Logic
  // ---------------------------

  const startPentest = async () => {
    setTesting(true);
    setTestProgress(0);
    setLiveOutput([]);
    setExploitAttempts([]);
    setTestResults(null);

    const runStart = Date.now();
    const timeline: TimelineEvent[] = [];

    for (let i = 0; i < testPhases.length; i++) {
      const phase = testPhases[i];
      setCurrentTest(phase.name);
      pushLive(`[*] Starting phase: ${phase.name}`);
      timeline.push({
        time: new Date().toISOString(),
        event: `Phase started: ${phase.name}`,
      });

      const outputInterval = setInterval(() => {
        const outputs = [
          `[*] Scanning target: ${targetInput}`,
          `[+] Port 80 open - HTTP detected`,
          `[+] Port 443 open - HTTPS detected`,
          `[!] Vulnerability candidate: CVE-2024-${Math.floor(
            Math.random() * 9999
          )}`,
          `[*] Attempting exploit...`,
          `[+] Exploit successful!`,
          `[*] Gathering credentials...`,
          `[!] Weak password detected`,
          `[*] Attempting lateral movement...`,
        ];

        const chosen = outputs[Math.floor(Math.random() * outputs.length)];
        const type: LiveOutputEntry["type"] = chosen.includes("[!]")
          ? "warning"
          : chosen.includes("[+]")
          ? "success"
          : "info";
        pushLive(chosen, type);
      }, 450);

      const attemptTimer = setTimeout(() => {
        const newAttempt: ExploitAttempt = {
          id: Date.now() + Math.random(),
          phase: phase.name,
          test: phase.tests[Math.floor(Math.random() * phase.tests.length)],
          result: Math.random() > 0.35 ? "success" : "failed",
          severity: ["Critical", "High", "Medium"][
            Math.floor(Math.random() * 3)
          ] as ExploitAttempt["severity"],
        };
        setExploitAttempts((prev) => [newAttempt, ...prev]);
        pushLive(
          `[*] Exploit attempt: ${
            newAttempt.test
          } — ${newAttempt.result.toUpperCase()}`,
          newAttempt.result === "success" ? "success" : "warning"
        );
        timeline.push({
          time: new Date().toISOString(),
          event: `Exploit ${newAttempt.test} — ${newAttempt.result}`,
          severity: newAttempt.severity,
        });
      }, phase.duration / 2);

      await new Promise((r) => setTimeout(r, phase.duration));
      clearInterval(outputInterval);
      clearTimeout(attemptTimer);

      setTestProgress(Math.round(((i + 1) / testPhases.length) * 100));
    }

    // ---------------------------
    // Results (deterministic mock)
    // ---------------------------

    const findings: Findings = {
      critical: 3,
      high: 7,
      medium: 15,
      low: 25,
      info: 60,
    };

    const vulnerabilities: Vulnerability[] = [
      {
        id: "VULN-001",
        title: "SQL Injection in Login Form",
        severity: "Critical",
        cvss: 9.8,
        exploitable: true,
        description:
          "Username parameter vulnerable to boolean-based blind SQL injection",
        remediation: "Use parameterized queries and input validation",
      },
      {
        id: "VULN-002",
        title: "Unauthenticated Admin Panel Access",
        severity: "Critical",
        cvss: 10.0,
        exploitable: true,
        description: "Admin panel accessible without authentication at /admin",
        remediation: "Implement authentication and IP whitelisting",
      },
      {
        id: "VULN-003",
        title: "Cross-Site Scripting (XSS)",
        severity: "High",
        cvss: 7.5,
        exploitable: true,
        description: "Reflected XSS in search parameter",
        remediation: "Implement output encoding and CSP headers",
      },
      {
        id: "VULN-004",
        title: "Outdated TLS Cipher",
        severity: "Medium",
        cvss: 5.3,
        exploitable: false,
        description:
          "Server supports weak ciphers (TLS_RSA_WITH_AES_128_CBC_SHA)",
        remediation:
          "Disable weak ciphers and enable TLS 1.2+ with modern suites",
      },
    ];

    const evidence: Evidence[] = [
      {
        step: "Port scan",
        note: "80/443 open",
        time: new Date().toLocaleTimeString(),
      },
      {
        step: "SQLi test",
        note: "blind SQLi confirmed",
        time: new Date().toLocaleTimeString(),
      },
      {
        step: "Credentials",
        note: "Harvested user: alice@example.com",
        time: new Date().toLocaleTimeString(),
      },
    ];

    const timelineEvents: TimelineEvent[] = [
      {
        time: new Date().toLocaleTimeString(),
        event: "Reconnaissance started",
        severity: "Info",
      },
      {
        time: new Date().toLocaleTimeString(),
        event: "SQL Injection discovered",
        severity: "Critical",
      },
      {
        time: new Date().toLocaleTimeString(),
        event: "Admin panel accessed",
        severity: "Critical",
      },
      {
        time: new Date().toLocaleTimeString(),
        event: "Lateral movement detected",
        severity: "High",
      },
    ];

    setTestResults({
      target: `${targetInput} (acmecorp.com)`,
      duration: `${Math.round((Date.now() - runStart) / 1000)} seconds`,
      findings,
      vulnerabilities,
      exploited_successfully:
        exploitAttempts.filter((e) => e.result === "success").length || 4,
      attack_path: [
        "SQL Injection → Database Access",
        "Credential Harvesting → Admin Access",
        "Admin Panel → System Shell",
        "Privilege Escalation → Root Access",
      ],
      recommendations: [
        "Implement WAF to protect against common attacks",
        "Enforce strong authentication on all admin interfaces",
        "Regular security patching and updates",
        "Implement network segmentation",
        "Deploy comprehensive logging and monitoring",
      ],
      evidence,
      timeline: timelineEvents,
    });

    setTesting(false);
    setCurrentTest("");
  };

  // ---------------------------
  // Export Helpers
  // ---------------------------

  const exportJson = () => {
    if (!testResults) return;
    const blob = new Blob([JSON.stringify(testResults, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `pentest-report-${new Date().toISOString()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const exportCsv = () => {
    if (!testResults) return;
    const rows = [
      ["id", "title", "severity", "cvss", "exploitable", "description"],
      ...testResults.vulnerabilities.map((v) => [
        v.id,
        v.title,
        v.severity,
        String(v.cvss),
        String(v.exploitable),
        v.description,
      ]),
    ];
    const csv = rows
      .map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(","))
      .join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `vulnerabilities-${new Date().toISOString()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const copySummary = async () => {
    if (!testResults) return;
    const text = `Pentest ${testResults.target} — ${testResults.findings.critical} critical, ${testResults.findings.high} high, ${testResults.findings.medium} medium — ${testResults.duration}`;
    await navigator.clipboard.writeText(text);
    pushLive("Summary copied to clipboard", "success");
  };

  // ---------------------------
  // Derived Data
  // ---------------------------

  const pieData = testResults
    ? [
        { name: "Critical", value: testResults.findings.critical },
        { name: "High", value: testResults.findings.high },
        { name: "Medium", value: testResults.findings.medium },
        { name: "Low", value: testResults.findings.low },
        { name: "Info", value: testResults.findings.info },
      ]
    : [];

  const barData = testResults
    ? testResults.vulnerabilities.map((v) => ({ name: v.title, cvss: v.cvss }))
    : [];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="text-2xl font-semibold text-white">
            RedShift — Attack Simulator
          </div>
          <Badge className="bg-red-600 text-white">Experimental</Badge>
        </div>

        <div className="flex items-center gap-3">
          <input
            value={targetInput}
            onChange={(e) => setTargetInput(e.target.value)}
            className="px-3 py-2 rounded-lg bg-white/5 text-white text-sm border-none"
          />
          <Button
            onClick={startPentest}
            className="bg-red-600 hover:bg-red-700"
            disabled={testing}
          >
            <Target className="w-4 h-4 mr-2" />
            {testing ? `Running — ${testProgress}%` : "Launch"}
          </Button>
        </div>
      </div>

      {/* Live panel */}
      {testing && (
        <Card className="bg-white/3 rounded-2xl p-4 border-none">
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Activity className="w-6 h-6 text-orange-400 animate-pulse" />
                <div>
                  <div className="text-lg text-white font-semibold">
                    {currentTest || "Initializing..."}
                  </div>
                  <div className="text-sm text-gray-300">
                    Live simulation output — expanded
                  </div>
                </div>
              </div>

              <div className="text-right">
                <div className="text-3xl font-bold text-orange-400">
                  {testProgress}%
                </div>
                <div className="text-xs text-gray-300">Complete</div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-2 bg-black/70 rounded-lg p-4 max-h-[360px] overflow-y-auto font-mono text-xs text-cyan-300">
                {liveOutput.map((l, i) => (
                  <div
                    key={i}
                    className={`mb-2 ${
                      l.type === "success"
                        ? "text-green-300"
                        : l.type === "warning"
                        ? "text-yellow-300"
                        : "text-cyan-300"
                    }`}
                  >
                    <span className="text-slate-500">[{l.time}]</span> {l.text}
                  </div>
                ))}
              </div>

              <div className="col-span-1 space-y-2 max-h-[360px] overflow-y-auto">
                <div className="bg-white/3 rounded-lg p-3">
                  <div className="text-xs text-gray-300">Exploit Attempts</div>
                  <div className="text-xl font-bold">
                    {exploitAttempts.length}
                  </div>
                  <div className="text-xs text-gray-400">
                    Successful (so far):{" "}
                    {
                      exploitAttempts.filter((a) => a.result === "success")
                        .length
                    }
                  </div>
                </div>

                <div className="bg-white/3 rounded-lg p-3">
                  <div className="text-xs text-gray-300">Quick Actions</div>
                  <div className="mt-3 flex gap-2">
                    <Button size="sm" onClick={copySummary}>
                      <Copy className="w-3 h-3 mr-2" />
                      Copy Summary
                    </Button>
                    <Button size="sm" variant="outline">
                      Stop
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Results */}
      {testResults && !testing && (
        <Card className="rounded-2xl p-6 bg-white/5">
          <CardContent>
            <div className="flex items-start justify-between">
              <div>
                <div className="text-2xl font-bold text-white">
                  Pentest Complete — {testResults.target}
                </div>
                <div className="text-sm text-gray-300 mt-1">
                  Duration: {testResults.duration} • Run:{" "}
                  {new Date().toLocaleString()}
                </div>
                <div className="mt-3 text-sm text-gray-300">
                  Summary: {testResults.findings.critical} critical,{" "}
                  {testResults.findings.high} high,{" "}
                  {testResults.findings.medium} medium
                </div>

                <div className="mt-4 grid grid-cols-3 gap-3">
                  <div className="col-span-1 bg-white/3 rounded-lg p-4">
                    <div className="text-xs text-gray-300">Critical & High</div>
                    <div className="text-3xl font-bold text-orange-400">
                      {testResults.findings.critical +
                        testResults.findings.high}
                    </div>
                    <div className="text-xs text-gray-400 mt-2">
                      Exploitations: {testResults.exploited_successfully}
                    </div>
                  </div>

                  <div className="col-span-1 bg-white/3 rounded-lg p-4">
                    <div className="text-xs text-gray-300">Total Findings</div>
                    <div className="text-3xl font-bold">
                      {Object.values(testResults.findings).reduce(
                        (a, b) => a + b,
                        0
                      )}
                    </div>
                    <div className="text-xs text-gray-400 mt-2">
                      Including informational items
                    </div>
                  </div>

                  <div className="col-span-1 bg-white/3 rounded-lg p-4">
                    <div className="text-xs text-gray-300">Top CVSS</div>
                    <div className="text-3xl font-bold text-orange-400">
                      {Math.max(
                        ...testResults.vulnerabilities.map((v) => v.cvss)
                      )}
                    </div>
                    <div className="text-xs text-gray-400 mt-2">
                      Highest severity score
                    </div>
                  </div>
                </div>

                {/* Big vulnerability table */}
                <div className="mt-6 bg-white/3 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div className="font-semibold text-sm text-white">
                      Top Vulnerabilities (detailed)
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" onClick={exportJson}>
                        <FileText className="w-3 h-3 mr-2" />
                        Export JSON
                      </Button>
                      <Button size="sm" onClick={exportCsv}>
                        <Download className="w-3 h-3 mr-2" />
                        Export CSV
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => setShowRaw((s) => !s)}
                        variant="outline"
                      >
                        {showRaw ? "Hide Raw" : "Show Raw"}
                      </Button>
                    </div>
                  </div>

                  <div className="mt-3 overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="text-gray-400">
                          <th className="pr-4">ID</th>
                          <th className="pr-4">Title</th>
                          <th className="pr-4">Severity</th>
                          <th className="pr-4">CVSS</th>
                          <th className="pr-4">Exploitable</th>
                          <th className="pr-4">Remediation</th>
                        </tr>
                      </thead>
                      <tbody>
                        {testResults.vulnerabilities.map((v) => (
                          <tr key={v.id} className="border-t border-white/5">
                            <td className="py-3">{v.id}</td>
                            <td className="py-3">
                              {v.title}
                              <div className="text-xs text-gray-400">
                                {v.description}
                              </div>
                            </td>
                            <td className="py-3">
                              <Badge
                                className="bg-white/6 text-sm"
                                style={{ backgroundColor: "transparent" }}
                              >
                                {v.severity}
                              </Badge>
                            </td>
                            <td className="py-3 font-semibold">{v.cvss}</td>
                            <td className="py-3">
                              {v.exploitable ? "Yes" : "No"}
                            </td>
                            <td className="py-3 text-xs text-gray-300">
                              {v.remediation}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {showRaw && (
                    <pre className="mt-4 p-3 bg-black/60 text-xs rounded text-cyan-200 overflow-auto">
                      {JSON.stringify(testResults, null, 2)}
                    </pre>
                  )}
                </div>
              </div>

              {/* Right column: charts + timeline + recommendations */}
              <div className="w-96 ml-6">
                <div className="bg-white/3 rounded-lg p-4 mb-4">
                  <div className="font-semibold text-sm text-white">
                    Findings Breakdown
                  </div>
                  <div className="h-48 mt-2">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={pieData}
                          dataKey="value"
                          nameKey="name"
                          cx="50%"
                          cy="50%"
                          innerRadius={30}
                          outerRadius={70}
                          label
                        >
                          {pieData.map((entry, idx) => (
                            <Cell
                              key={`cell-${idx}`}
                              fill={COLOR_MAP[entry.name] || "#64748b"}
                            />
                          ))}
                        </Pie>
                        <ReTooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="bg-white/3 rounded-lg p-4 mb-4">
                  <div className="font-semibold text-sm text-white">
                    Vuln CVSS (bar)
                  </div>
                  <div className="h-40 mt-2">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={barData}>
                        <XAxis dataKey="name" hide />
                        <YAxis />
                        <ReTooltip />
                        <Bar dataKey="cvss" name="CVSS">
                          {barData.map((entry, idx) => (
                            <Cell key={`b-${idx}`} fill={"#f59e0b"} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="bg-white/3 rounded-lg p-4 mb-4">
                  <div className="flex items-center justify-between">
                    <div className="font-semibold text-sm text-white">
                      Attack Timeline
                    </div>
                    <div className="text-xs text-gray-400">
                      {testResults.timeline.length} events
                    </div>
                  </div>
                  <ol className="mt-3 text-xs text-gray-300 space-y-2">
                    {testResults.timeline.map((t, i) => (
                      <li key={i} className="bg-black/10 p-2 rounded">
                        <div className="text-xs font-medium">{t.time}</div>
                        <div className="text-xs text-gray-300">{t.event}</div>
                      </li>
                    ))}
                  </ol>
                </div>

                <div className="bg-white/3 rounded-lg p-4">
                  <div className="font-semibold text-sm text-white">
                    Recommendations
                  </div>
                  <ul className="list-disc list-inside text-xs text-gray-300 mt-2 space-y-1">
                    {testResults.recommendations.map((r, i) => (
                      <li key={i}>{r}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Bottom: Evidence & Attack Path */}
            <div className="mt-6 grid grid-cols-3 gap-4">
              <div className="col-span-1 bg-white/3 rounded-lg p-4">
                <div className="font-semibold text-sm text-white">Evidence</div>
                <div className="mt-3 text-xs text-gray-300 space-y-2">
                  {testResults.evidence.map((e, i) => (
                    <div key={i} className="bg-black/10 p-2 rounded">
                      <div className="text-xs font-medium">{e.step}</div>
                      <div className="text-xs text-gray-400">{e.note}</div>
                      <div className="text-2xs text-gray-500">{e.time}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="col-span-2 bg-white/3 rounded-lg p-4">
                <div className="font-semibold text-sm text-white">
                  Attack Path
                </div>
                <ol className="list-decimal list-inside text-xs text-gray-300 mt-2">
                  {testResults.attack_path.map((p, i) => (
                    <li key={i}>{p}</li>
                  ))}
                </ol>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
