"use client";

import { useState } from "react";
import {
  Zap,
  Target,
  Shield,
  CheckCircle,
  Code,
  Terminal,
  Lock,
  Unlock,
  Activity,
  Download,
  FileText,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const RedShift = () => {
  type LiveOutput = {
    time: string;
    text: string;
    type: "info" | "warning" | "success";
  };
  type ExploitAttempt = {
    id: number;
    phase: string;
    test: string;
    result: "success" | "failed" | string;
    severity: "critical" | "high" | "medium" | string;
    mitre: string;
  };
  type Vulnerability = {
    id: string;
    title: string;
    severity: string;
    cvss: number;
    exploitable: boolean;
    description: string;
    remediation: string;
    mitre: string[];
    cwe: string;
  };
  type AttackStep = { step: string; mitre: string };
  type TestResults = {
    target: string;
    duration: string;
    profile?: string;
    findings: {
      critical: number;
      high: number;
      medium: number;
      low: number;
      info: number;
      [key: string]: number;
    };
    vulnerabilities: Vulnerability[];
    exploited_successfully: number;
    attack_path: AttackStep[];
    recommendations: string[];
    mitre_coverage: { [tactic: string]: number };
  };

  const [testing, setTesting] = useState(false);
  const [testProgress, setTestProgress] = useState(0);
  const [currentTest, setCurrentTest] = useState("");
  const [testResults, setTestResults] = useState<TestResults | null>(null);
  const [liveOutput, setLiveOutput] = useState<LiveOutput[]>([]);
  const [exploitAttempts, setExploitAttempts] = useState<ExploitAttempt[]>([]);
  const [selectedProfile, setSelectedProfile] = useState("web-app");
  const [selectedTab, setSelectedTab] = useState("profiles");

  const testPhases = [
    {
      name: "Reconnaissance",
      duration: 3000,
      tests: ["DNS Enumeration", "Port Scanning", "Service Detection"],
      mitre: ["T1595", "T1590", "T1592"],
    },
    {
      name: "Initial Access",
      duration: 4000,
      tests: [
        "Exploit Public-Facing Application",
        "Phishing",
        "Valid Accounts",
      ],
      mitre: ["T1190", "T1566", "T1078"],
    },
    {
      name: "Execution",
      duration: 5000,
      tests: ["Command Injection", "PowerShell", "Scripting"],
      mitre: ["T1059.001", "T1059.003", "T1059"],
    },
    {
      name: "Privilege Escalation",
      duration: 3500,
      tests: ["Sudo Misconfig", "SUID Binaries", "Kernel Exploits"],
      mitre: ["T1548", "T1068", "T1055"],
    },
    {
      name: "Lateral Movement",
      duration: 2500,
      tests: ["Pass the Hash", "Remote Services", "SSH Hijacking"],
      mitre: ["T1550.002", "T1021", "T1563.001"],
    },
    {
      name: "Exfiltration",
      duration: 2000,
      tests: [
        "Data Transfer",
        "Exfiltration Over C2",
        "Automated Exfiltration",
      ],
      mitre: ["T1041", "T1048", "T1020"],
    },
  ];

  const pentestProfiles = [
    {
      id: "web-app",
      name: "Web Application Security",
      description: "Comprehensive web app testing including OWASP Top 10",
      duration: "15-20 min",
      tests: 45,
      modules: [
        "SQL Injection",
        "XSS",
        "CSRF",
        "Authentication",
        "Session Management",
        "API Security",
      ],
      mitre: ["T1190", "T1059", "T1078", "T1550"],
    },
    {
      id: "network-infra",
      name: "Network Infrastructure",
      description: "Network services, protocols, and infrastructure testing",
      duration: "20-30 min",
      tests: 67,
      modules: [
        "Port Scanning",
        "Service Enumeration",
        "Protocol Analysis",
        "Firewall Testing",
        "VPN Assessment",
      ],
      mitre: ["T1595", "T1046", "T1040", "T1557"],
    },
    {
      id: "cloud-security",
      name: "Cloud Security Assessment",
      description: "AWS, Azure, GCP security configuration review",
      duration: "25-35 min",
      tests: 89,
      modules: [
        "IAM Misconfigurations",
        "Storage Exposure",
        "Network Security",
        "Logging & Monitoring",
      ],
      mitre: ["T1078.004", "T1530", "T1580", "T1562"],
    },
    {
      id: "api-security",
      name: "API Security Testing",
      description: "REST/GraphQL API security assessment",
      duration: "10-15 min",
      tests: 34,
      modules: [
        "Authentication",
        "Authorization",
        "Rate Limiting",
        "Input Validation",
        "Data Exposure",
      ],
      mitre: ["T1190", "T1078", "T1213"],
    },
    {
      id: "mobile-app",
      name: "Mobile Application",
      description: "iOS and Android app security testing",
      duration: "30-40 min",
      tests: 78,
      modules: [
        "Binary Analysis",
        "Data Storage",
        "Network Communication",
        "Authentication",
        "Code Obfuscation",
      ],
      mitre: ["T1437", "T1409", "T1438", "T1444"],
    },
    {
      id: "red-team",
      name: "Full Red Team Exercise",
      description: "Complete adversary simulation with all attack phases",
      duration: "45-60 min",
      tests: 156,
      modules: [
        "Reconnaissance",
        "Initial Access",
        "Execution",
        "Persistence",
        "Privilege Escalation",
        "Defense Evasion",
        "Credential Access",
        "Discovery",
        "Lateral Movement",
        "Collection",
        "Exfiltration",
        "Impact",
      ],
      mitre: [
        "T1595",
        "T1190",
        "T1059",
        "T1053",
        "T1548",
        "T1070",
        "T1003",
        "T1082",
        "T1021",
        "T1005",
        "T1041",
        "T1486",
      ],
    },
  ];

  const startPentest = async () => {
    setTesting(true);
    setTestProgress(0);
    setLiveOutput([]);
    setExploitAttempts([]);
    setTestResults(null);

    for (let i = 0; i < testPhases.length; i++) {
      setCurrentTest(testPhases[i].name);

      // Simulate live terminal output
      const outputInterval = setInterval(() => {
        const outputs = [
          `[*] Scanning target: 203.0.113.42`,
          `[+] Port 80 open - HTTP detected`,
          `[+] Port 443 open - HTTPS detected`,
          `[!] Vulnerability found: CVE-2024-${Math.floor(
            Math.random() * 9999
          )}`,
          `[*] Attempting exploit...`,
          `[+] Exploit successful!`,
          `[*] Gathering credentials...`,
          `[+] Found hash: $2a$10$...`,
          `[!] Weak password detected`,
          `[*] Attempting lateral movement...`,
          `[*] MITRE ATT&CK: ${
            testPhases[i].mitre[
              Math.floor(Math.random() * testPhases[i].mitre.length)
            ]
          }`,
        ];

        const chosen = outputs[Math.floor(Math.random() * outputs.length)];
        const type: LiveOutput["type"] = chosen.includes("[!]")
          ? "warning"
          : chosen.includes("[+]")
          ? "success"
          : "info";

        const output = {
          time: new Date().toLocaleTimeString(),
          text: chosen,
          type,
        };

        setLiveOutput((prev) => [output, ...prev].slice(0, 20));
      }, 600);

      // Simulate exploit attempts
      setTimeout(() => {
        const newAttempt = {
          id: Date.now(),
          phase: testPhases[i].name,
          test: testPhases[i].tests[
            Math.floor(Math.random() * testPhases[i].tests.length)
          ],
          result: Math.random() > 0.3 ? "success" : "failed",
          severity: ["critical", "high", "medium"][
            Math.floor(Math.random() * 3)
          ],
          mitre:
            testPhases[i].mitre[
              Math.floor(Math.random() * testPhases[i].mitre.length)
            ],
        };
        setExploitAttempts((prev) => [...prev, newAttempt]);
      }, testPhases[i].duration / 2);

      await new Promise((resolve) =>
        setTimeout(resolve, testPhases[i].duration)
      );
      clearInterval(outputInterval);

      setTestProgress(((i + 1) / testPhases.length) * 100);
    }

    // Generate final results
    setTestResults({
      target: "203.0.113.42 (acmecorp.com)",
      duration: "18.5 seconds",
      profile: pentestProfiles.find((p) => p.id === selectedProfile)?.name,
      findings: {
        critical: 2,
        high: 5,
        medium: 12,
        low: 23,
        info: 45,
      },
      vulnerabilities: [
        {
          id: "VULN-001",
          title: "SQL Injection in Login Form",
          severity: "Critical",
          cvss: 9.8,
          exploitable: true,
          description:
            "Username parameter vulnerable to boolean-based blind SQL injection",
          remediation: "Use parameterized queries and input validation",
          mitre: ["T1190", "T1059.004"],
          cwe: "CWE-89",
        },
        {
          id: "VULN-002",
          title: "Unauthenticated Admin Panel Access",
          severity: "Critical",
          cvss: 10.0,
          exploitable: true,
          description:
            "Admin panel accessible without authentication at /admin",
          remediation: "Implement authentication and IP whitelisting",
          mitre: ["T1078", "T1190"],
          cwe: "CWE-306",
        },
        {
          id: "VULN-003",
          title: "Cross-Site Scripting (XSS)",
          severity: "High",
          cvss: 7.5,
          exploitable: true,
          description: "Reflected XSS in search parameter",
          remediation: "Implement output encoding and CSP headers",
          mitre: ["T1059.007"],
          cwe: "CWE-79",
        },
        {
          id: "VULN-004",
          title: "Weak TLS Configuration",
          severity: "High",
          cvss: 7.4,
          exploitable: false,
          description: "Server supports TLS 1.0 and weak cipher suites",
          remediation: "Disable TLS 1.0/1.1, use strong ciphers only",
          mitre: ["T1040", "T1557"],
          cwe: "CWE-327",
        },
        {
          id: "VULN-005",
          title: "Missing Security Headers",
          severity: "Medium",
          cvss: 5.3,
          exploitable: false,
          description: "HSTS, X-Frame-Options, and CSP headers not implemented",
          remediation: "Configure security headers on web server",
          mitre: ["T1190"],
          cwe: "CWE-693",
        },
      ],
      exploited_successfully: 3,
      attack_path: [
        { step: "SQL Injection → Database Access", mitre: "T1190" },
        { step: "Credential Harvesting → Admin Access", mitre: "T1003" },
        { step: "Admin Panel → System Shell", mitre: "T1059" },
        { step: "Privilege Escalation → Root Access", mitre: "T1548" },
      ],
      recommendations: [
        "Implement WAF to protect against common attacks",
        "Enforce strong authentication on all admin interfaces",
        "Regular security patching and updates",
        "Implement network segmentation",
        "Deploy comprehensive logging and monitoring",
      ],
      mitre_coverage: {
        reconnaissance: 3,
        initial_access: 2,
        execution: 4,
        persistence: 0,
        privilege_escalation: 2,
        defense_evasion: 1,
        credential_access: 1,
        discovery: 2,
        lateral_movement: 1,
        collection: 0,
        exfiltration: 1,
        impact: 0,
      },
    });

    setTesting(false);
    setCurrentTest("");
  };

  return (
    <div className="min-h-screen bg-transparent p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-3">
          <div>
            <h1 className="text-4xl font-bold text-blue-400 drop-shadow-[0_0_12px_rgba(59,130,246,0.9)]">
              RedShift
            </h1>
            <p className="text-orange-300">
              Offensive Security & Penetration Testing
            </p>
          </div>
        </div>

        <button
          onClick={startPentest}
          disabled={testing}
          className="px-6 py-3 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 disabled:from-slate-700 disabled:to-slate-700 text-white rounded-lg font-semibold flex items-center space-x-2 shadow-lg shadow-orange-500/20"
        >
          <Target className={`w-5 h-5 ${testing ? "animate-pulse" : ""}`} />
          <span>{testing ? "Testing in Progress..." : "Launch Pentest"}</span>
        </button>
      </div>

      <Tabs
        value={selectedTab}
        onValueChange={setSelectedTab}
        className="space-y-6"
      >
        <TabsList className="bg-slate-900/50 border border-slate-700">
          <TabsTrigger value="profiles">Pentest Profiles</TabsTrigger>
          <TabsTrigger value="simulation">Live Simulation</TabsTrigger>
          <TabsTrigger value="mitre">MITRE ATT&CK</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        {/* Pentest Profiles Tab */}
        <TabsContent value="profiles" className="space-y-6">
          {/* Test Configuration */}
          <div className="grid grid-cols-3 gap-6">
            <Card className="bg-slate-900/50 border-slate-700/50">
              <CardHeader>
                <CardTitle className="text-white text-sm">
                  Target Configuration
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <label className="text-xs text-slate-500 mb-1 block">
                    Target IP/Domain
                  </label>
                  <input
                    type="text"
                    defaultValue="203.0.113.42"
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-500 mb-1 block">
                    Scan Intensity
                  </label>
                  <select className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white text-sm">
                    <option>Stealth</option>
                    <option>Normal</option>
                    <option>Aggressive</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs text-slate-500 mb-1 block">
                    Selected Profile
                  </label>
                  <select
                    value={selectedProfile}
                    onChange={(e) => setSelectedProfile(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white text-sm"
                  >
                    {pentestProfiles.map((profile) => (
                      <option key={profile.id} value={profile.id}>
                        {profile.name}
                      </option>
                    ))}
                  </select>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-900/50 border-slate-700/50">
              <CardHeader>
                <CardTitle className="text-white text-sm">
                  Test Modules
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {[
                  "Web Application",
                  "Network Services",
                  "Authentication",
                  "Authorization",
                  "Data Exposure",
                ].map((module, idx) => (
                  <label
                    key={idx}
                    className="flex items-center space-x-2 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      defaultChecked
                      className="rounded bg-slate-800 border-slate-600"
                    />
                    <span className="text-sm text-white">{module}</span>
                  </label>
                ))}
              </CardContent>
            </Card>

            <Card className="bg-slate-900/50 border-slate-700/50">
              <CardHeader>
                <CardTitle className="text-white text-sm">
                  Quick Stats
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { label: "Tests Run", value: "847" },
                  { label: "Vulnerabilities Found", value: "234" },
                  { label: "Success Rate", value: "87%" },
                  { label: "Avg. Duration", value: "18.5s" },
                ].map((stat, idx) => (
                  <div key={idx} className="flex justify-between">
                    <span className="text-xs text-slate-500">
                      {stat.label}:
                    </span>
                    <span className="text-sm font-bold text-white">
                      {stat.value}
                    </span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Pre-built Profiles */}
          <div className="grid grid-cols-2 gap-6">
            {pentestProfiles.map((profile) => (
              <Card
                key={profile.id}
                className={`bg-slate-900/50 border-2 transition-all cursor-pointer ${
                  selectedProfile === profile.id
                    ? "border-orange-500 shadow-lg shadow-orange-500/20"
                    : "border-slate-700 hover:border-slate-600"
                }`}
                onClick={() => setSelectedProfile(profile.id)}
              >
                <CardHeader>
                  <CardTitle className="text-white flex items-center justify-between">
                    <span>{profile.name}</span>
                    {selectedProfile === profile.id && (
                      <CheckCircle className="w-5 h-5 text-orange-400" />
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-slate-400">
                    {profile.description}
                  </p>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-xs text-slate-500 mb-1">
                        Duration
                      </div>
                      <div className="text-sm font-semibold text-white">
                        {profile.duration}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-slate-500 mb-1">
                        Total Tests
                      </div>
                      <div className="text-sm font-semibold text-white">
                        {profile.tests}
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="text-xs text-slate-500 mb-2">
                      Test Modules
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {profile.modules.slice(0, 4).map((module, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 bg-orange-500/20 text-orange-400 text-xs rounded"
                        >
                          {module}
                        </span>
                      ))}
                      {profile.modules.length > 4 && (
                        <span className="px-2 py-1 bg-slate-700 text-slate-400 text-xs rounded">
                          +{profile.modules.length - 4} more
                        </span>
                      )}
                    </div>
                  </div>

                  <div>
                    <div className="text-xs text-slate-500 mb-2">
                      MITRE ATT&CK Coverage
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {profile.mitre.slice(0, 6).map((technique, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 bg-purple-500/20 text-purple-400 text-xs rounded font-mono"
                        >
                          {technique}
                        </span>
                      ))}
                      {profile.mitre.length > 6 && (
                        <span className="px-2 py-0.5 bg-slate-700 text-slate-400 text-xs rounded">
                          +{profile.mitre.length - 6}
                        </span>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Live Simulation Tab */}
        <TabsContent value="simulation" className="space-y-6">
          {/* Active Testing Interface */}
          {testing && (
            <Card className="bg-slate-900/50 border-slate-700/50">
              <CardContent className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <Activity className="w-6 h-6 text-orange-400 animate-pulse" />
                    <div>
                      <h2 className="text-2xl font-bold text-white">
                        Penetration Test in Progress
                      </h2>
                      <p className="text-sm text-slate-400">
                        Target: 203.0.113.42 (acmecorp.com)
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-orange-400">
                      {Math.round(testProgress)}%
                    </div>
                    <div className="text-sm text-slate-400">Complete</div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-slate-400">
                      Current Phase: {currentTest}
                    </span>
                    <span className="text-sm text-orange-400 font-semibold">
                      {
                        exploitAttempts.filter((e) => e.result === "success")
                          .length
                      }{" "}
                      successful exploits
                    </span>
                  </div>
                  <div className="h-3 bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-orange-500 to-red-500 transition-all duration-500"
                      style={{ width: `${testProgress}%` }}
                    />
                  </div>
                </div>

                {/* Test Phases */}
                <div className="grid grid-cols-6 gap-4 mb-8">
                  {testPhases.map((phase, idx) => (
                    <div
                      key={idx}
                      className={`bg-slate-800/50 rounded-lg p-4 border transition-all ${
                        currentTest === phase.name
                          ? "border-orange-500 shadow-lg shadow-orange-500/20"
                          : (testProgress / 100) * testPhases.length > idx
                          ? "border-green-500/50"
                          : "border-slate-700"
                      }`}
                    >
                      <div className="text-center">
                        <div
                          className={`w-12 h-12 rounded-lg mx-auto mb-3 flex items-center justify-center ${
                            (testProgress / 100) * testPhases.length > idx
                              ? "bg-green-500/20"
                              : currentTest === phase.name
                              ? "bg-orange-500/20"
                              : "bg-slate-700/50"
                          }`}
                        >
                          {(testProgress / 100) * testPhases.length > idx ? (
                            <CheckCircle className="w-6 h-6 text-green-400" />
                          ) : currentTest === phase.name ? (
                            <Activity className="w-6 h-6 text-orange-400 animate-pulse" />
                          ) : (
                            <Shield className="w-6 h-6 text-slate-600" />
                          )}
                        </div>
                        <div className="text-xs font-semibold text-white mb-1">
                          {phase.name}
                        </div>
                        <div className="text-xs text-slate-500">
                          {(testProgress / 100) * testPhases.length > idx
                            ? "Complete"
                            : currentTest === phase.name
                            ? "Running..."
                            : "Pending"}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Live Terminal and Exploit Results */}
                <div className="grid grid-cols-2 gap-6">
                  {/* Terminal Output */}
                  <div className="bg-black/80 rounded-xl p-4 border border-orange-500/30">
                    <div className="flex items-center space-x-2 mb-3 pb-3 border-b border-slate-700">
                      <Terminal className="w-4 h-4 text-green-400" />
                      <span className="text-sm font-semibold text-white">
                        Live Terminal Output
                      </span>
                    </div>
                    <div className="font-mono text-xs space-y-1 max-h-[400px] overflow-y-auto">
                      {liveOutput.map((output, idx) => (
                        <div
                          key={idx}
                          className={`animate-fade-in ${
                            output.type === "success"
                              ? "text-green-400"
                              : output.type === "warning"
                              ? "text-yellow-400"
                              : "text-cyan-400"
                          }`}
                        >
                          <span className="text-slate-500">
                            [{output.time}]
                          </span>{" "}
                          {output.text}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Exploit Attempts */}
                  <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
                    <div className="flex items-center space-x-2 mb-3 pb-3 border-b border-slate-700">
                      <Code className="w-4 h-4 text-orange-400" />
                      <span className="text-sm font-semibold text-white">
                        Exploit Attempts
                      </span>
                    </div>
                    <div className="space-y-2 max-h-[400px] overflow-y-auto">
                      {exploitAttempts.map((attempt) => (
                        <div
                          key={attempt.id}
                          className="bg-slate-900/50 rounded-lg p-3 border border-slate-700 animate-slide-in"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center space-x-2">
                              {attempt.result === "success" ? (
                                <Unlock className="w-4 h-4 text-green-400" />
                              ) : (
                                <Lock className="w-4 h-4 text-red-400" />
                              )}
                              <span className="text-xs font-semibold text-white">
                                {attempt.test}
                              </span>
                            </div>
                            <span
                              className={`px-2 py-0.5 rounded text-xs font-bold ${
                                attempt.severity === "critical"
                                  ? "bg-red-500/20 text-red-400"
                                  : attempt.severity === "high"
                                  ? "bg-orange-500/20 text-orange-400"
                                  : "bg-yellow-500/20 text-yellow-400"
                              }`}
                            >
                              {attempt.severity}
                            </span>
                          </div>
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-purple-400 font-mono">
                              {attempt.mitre}
                            </span>
                            <span
                              className={`font-semibold ${
                                attempt.result === "success"
                                  ? "text-green-400"
                                  : "text-red-400"
                              }`}
                            >
                              {attempt.result === "success"
                                ? "✓ Exploited"
                                : "✗ Failed"}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Test Results */}
          {testResults && (
            <div className="space-y-6">
              {/* Summary Card */}
              <Card className="bg-gradient-to-r from-orange-900/50 to-red-900/50 border-orange-500/30">
                <CardContent className="p-8">
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <h2 className="text-3xl font-bold text-white mb-2">
                        Penetration Test Complete
                      </h2>
                      <p className="text-orange-300">
                        Target: {testResults.target}
                      </p>
                      <p className="text-sm text-slate-400">
                        Duration: {testResults.duration}
                      </p>
                      <p className="text-sm text-slate-400">
                        Profile: {testResults.profile}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-5xl font-bold text-orange-400 mb-2">
                        {testResults.findings.critical +
                          testResults.findings.high}
                      </div>
                      <div className="text-sm text-slate-300">
                        Critical & High Issues
                      </div>
                    </div>
                  </div>

                  {/* Findings Summary */}
                  <div className="grid grid-cols-5 gap-4">
                    {[
                      {
                        label: "Critical",
                        count: testResults.findings.critical,
                        color: "red",
                      },
                      {
                        label: "High",
                        count: testResults.findings.high,
                        color: "orange",
                      },
                      {
                        label: "Medium",
                        count: testResults.findings.medium,
                        color: "yellow",
                      },
                      {
                        label: "Low",
                        count: testResults.findings.low,
                        color: "blue",
                      },
                      {
                        label: "Info",
                        count: testResults.findings.info,
                        color: "slate",
                      },
                    ].map((finding, idx) => (
                      <div
                        key={idx}
                        className={`bg-${finding.color}-500/10 rounded-lg p-4 border border-${finding.color}-500/30 text-center`}
                      >
                        <div
                          className={`text-3xl font-bold text-${finding.color}-400 mb-1`}
                        >
                          {finding.count}
                        </div>
                        <div className="text-sm text-slate-300">
                          {finding.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Vulnerability Details */}
              <Card className="bg-slate-900/50 border-slate-700/50">
                <CardHeader>
                  <CardTitle className="text-white">
                    Vulnerability Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {testResults.vulnerabilities.map((vuln: Vulnerability) => (
                    <div
                      key={vuln.id}
                      className="bg-slate-800/50 rounded-xl p-6 border border-slate-700 hover:border-orange-500/50 transition-all"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <span
                              className={`px-3 py-1 rounded text-xs font-bold ${
                                vuln.severity === "Critical"
                                  ? "bg-red-500 text-white"
                                  : vuln.severity === "High"
                                  ? "bg-orange-500 text-white"
                                  : "bg-yellow-500 text-black"
                              }`}
                            >
                              {vuln.severity}
                            </span>
                            <span className="text-xs font-mono text-slate-500">
                              {vuln.id}
                            </span>
                            <span className="text-xs font-mono text-purple-400">
                              {vuln.cwe}
                            </span>
                            {vuln.exploitable && (
                              <span className="px-2 py-1 bg-red-500/20 text-red-400 text-xs font-bold rounded flex items-center space-x-1">
                                <Zap className="w-3 h-3" />
                                <span>EXPLOITABLE</span>
                              </span>
                            )}
                          </div>
                          <h3 className="text-lg font-bold text-white mb-2">
                            {vuln.title}
                          </h3>
                          <p className="text-sm text-slate-400 mb-3">
                            {vuln.description}
                          </p>

                          <div className="flex items-center space-x-2 mb-3">
                            <span className="text-xs text-slate-500">
                              MITRE ATT&CK:
                            </span>
                            {vuln.mitre.map(
                              (technique: string, idx: number) => (
                                <span
                                  key={idx}
                                  className="px-2 py-0.5 bg-purple-500/20 text-purple-400 text-xs rounded font-mono"
                                >
                                  {technique}
                                </span>
                              )
                            )}
                          </div>

                          <div className="bg-slate-900/50 rounded-lg p-3 mb-3">
                            <div className="text-xs text-slate-500 mb-1">
                              Remediation
                            </div>
                            <div className="text-sm text-green-400">
                              {vuln.remediation}
                            </div>
                          </div>
                        </div>

                        <div className="ml-6 text-right">
                          <div className="text-3xl font-bold text-orange-400 mb-1">
                            {vuln.cvss}
                          </div>
                          <div className="text-xs text-slate-400">
                            CVSS Score
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3">
                        <button className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white text-sm rounded-lg">
                          View Full Report
                        </button>
                        <button className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white text-sm rounded-lg">
                          Export POC
                        </button>
                        <button className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white text-sm rounded-lg">
                          Create Ticket
                        </button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Attack Path Visualization */}
              <div className="grid grid-cols-2 gap-6">
                <Card className="bg-slate-900/50 border-slate-700/50">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center">
                      <Target className="w-5 h-5 mr-2 text-orange-400" />
                      Attack Path
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {testResults.attack_path.map(
                      (item: AttackStep, idx: number) => (
                        <div
                          key={idx}
                          className="relative pl-8 pb-6 border-l-2 border-orange-500 last:pb-0"
                        >
                          <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-orange-500 border-2 border-slate-900" />
                          <div className="bg-slate-800/50 rounded-lg p-4">
                            <div className="flex items-center justify-between mb-2">
                              <div className="text-xs text-orange-400 font-semibold">
                                Step {idx + 1}
                              </div>
                              <span className="text-xs font-mono text-purple-400">
                                {item.mitre}
                              </span>
                            </div>
                            <div className="text-sm text-white">
                              {item.step}
                            </div>
                          </div>
                        </div>
                      )
                    )}
                  </CardContent>
                </Card>

                <Card className="bg-slate-900/50 border-slate-700/50">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center">
                      <Shield className="w-5 h-5 mr-2 text-green-400" />
                      Recommendations
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {testResults.recommendations.map(
                      (rec: string, idx: number) => (
                        <div
                          key={idx}
                          className="flex items-start space-x-3 p-4 bg-slate-800/50 rounded-lg"
                        >
                          <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <span className="text-xs font-bold text-green-400">
                              {idx + 1}
                            </span>
                          </div>
                          <p className="text-sm text-slate-300 flex-1">{rec}</p>
                        </div>
                      )
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </TabsContent>

        {/* MITRE ATT&CK Tab */}
        <TabsContent value="mitre" className="space-y-6">
          {testResults && (
            <Card className="bg-slate-900/50 border-slate-700/50">
              <CardHeader>
                <CardTitle className="text-white">
                  MITRE ATT&CK Coverage Matrix
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-4 gap-4">
                  {Object.entries(testResults.mitre_coverage).map(
                    ([tactic, count]: [string, number]) => (
                      <div
                        key={tactic}
                        className="bg-slate-800/50 rounded-lg p-4 border border-slate-700"
                      >
                        <div className="text-center mb-3">
                          <div className="text-3xl font-bold text-purple-400 mb-1">
                            {count}
                          </div>
                          <div className="text-xs text-slate-400 capitalize">
                            {tactic.replace("_", " ")}
                          </div>
                        </div>
                        <div className="w-full bg-slate-700 rounded-full h-2">
                          <div
                            className="bg-purple-500 h-2 rounded-full transition-all"
                            style={{ width: `${(count / 5) * 100}%` }}
                          />
                        </div>
                      </div>
                    )
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          <Card className="bg-slate-900/50 border-slate-700/50">
            <CardHeader>
              <CardTitle className="text-white">Detected Techniques</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                {
                  id: "T1190",
                  name: "Exploit Public-Facing Application",
                  tactic: "Initial Access",
                  detected: true,
                },
                {
                  id: "T1059",
                  name: "Command and Scripting Interpreter",
                  tactic: "Execution",
                  detected: true,
                },
                {
                  id: "T1078",
                  name: "Valid Accounts",
                  tactic: "Initial Access",
                  detected: true,
                },
                {
                  id: "T1548",
                  name: "Abuse Elevation Control Mechanism",
                  tactic: "Privilege Escalation",
                  detected: true,
                },
                {
                  id: "T1003",
                  name: "OS Credential Dumping",
                  tactic: "Credential Access",
                  detected: true,
                },
                {
                  id: "T1021",
                  name: "Remote Services",
                  tactic: "Lateral Movement",
                  detected: false,
                },
              ].map((technique, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg border border-slate-700"
                >
                  <div className="flex items-center space-x-4">
                    <span className="px-3 py-1 bg-purple-500/20 text-purple-400 text-sm font-mono rounded">
                      {technique.id}
                    </span>
                    <div>
                      <div className="text-sm font-semibold text-white">
                        {technique.name}
                      </div>
                      <div className="text-xs text-slate-400">
                        {technique.tactic}
                      </div>
                    </div>
                  </div>
                  <span
                    className={`px-3 py-1 rounded text-xs font-bold ${
                      technique.detected
                        ? "bg-red-500/20 text-red-400"
                        : "bg-green-500/20 text-green-400"
                    }`}
                  >
                    {technique.detected ? "Detected" : "Not Detected"}
                  </span>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Reports Tab */}
        <TabsContent value="reports" className="space-y-6">
          <Card className="bg-slate-900/50 border-slate-700/50">
            <CardHeader>
              <CardTitle className="text-white">
                Generate Penetration Test Report
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-3 gap-4">
                {[
                  {
                    name: "Executive Summary",
                    description:
                      "High-level overview for C-suite and board members",
                    icon: FileText,
                    audience: "Executive",
                  },
                  {
                    name: "Technical Report",
                    description:
                      "Detailed technical findings for security teams",
                    icon: Code,
                    audience: "Technical",
                  },
                  {
                    name: "Compliance Report",
                    description: "Compliance-focused report for auditors",
                    icon: Shield,
                    audience: "Compliance",
                  },
                ].map((report, idx) => (
                  <div
                    key={idx}
                    className="bg-slate-800/50 rounded-lg p-6 border border-slate-700 hover:border-orange-500/50 transition-all cursor-pointer"
                  >
                    <div className="w-12 h-12 rounded-lg bg-orange-500/20 flex items-center justify-center mb-4">
                      <report.icon className="w-6 h-6 text-orange-400" />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">
                      {report.name}
                    </h3>
                    <p className="text-sm text-slate-400 mb-4">
                      {report.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-slate-500">
                        Audience: {report.audience}
                      </span>
                      <button className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white text-sm rounded-lg flex items-center space-x-2">
                        <Download className="w-4 h-4" />
                        <span>Generate</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {testResults && (
                <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-700">
                  <h3 className="text-lg font-bold text-white mb-4">
                    Latest Test Results
                  </h3>
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <div className="text-sm text-slate-400 mb-2">
                        Test Summary
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-300">Target:</span>
                          <span className="text-white font-semibold">
                            {testResults.target}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-300">Duration:</span>
                          <span className="text-white font-semibold">
                            {testResults.duration}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-300">Profile:</span>
                          <span className="text-white font-semibold">
                            {testResults.profile}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-300">Exploited:</span>
                          <span className="text-red-400 font-semibold">
                            {testResults.exploited_successfully} vulnerabilities
                          </span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-slate-400 mb-2">
                        Findings Breakdown
                      </div>
                      <div className="space-y-2">
                        {Object.entries(testResults.findings).map(
                          ([severity, count]: [string, number]) => (
                            <div
                              key={severity}
                              className="flex items-center justify-between"
                            >
                              <span className="text-sm text-slate-300 capitalize">
                                {severity}:
                              </span>
                              <span className="text-sm font-semibold text-white">
                                {count}
                              </span>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 flex items-center space-x-3">
                    <button className="px-6 py-3 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white rounded-lg font-semibold flex items-center space-x-2">
                      <Download className="w-5 h-5" />
                      <span>Export All Reports</span>
                    </button>
                    <button className="px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-semibold">
                      Schedule Retest
                    </button>
                    <button className="px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-semibold">
                      Share Results
                    </button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default RedShift;
