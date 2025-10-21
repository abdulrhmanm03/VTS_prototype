"use client";

import React, { useEffect, useRef, useState } from "react";
import ProgressCard from "@/components/ai/PrograssCard";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Brain,
  ShieldCheck,
  Activity,
  AlertTriangle,
  Play,
  MessageSquare,
  Zap,
  PieChart,
  Clock,
  Database,
  Users,
  ChevronRight,
  Sparkles,
  RefreshCcw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// -----------------------------------------------------------------------------
// SentinelAnalysisPage.tsx
// Full redesign: neon/cyber + enterprise + infographic-rich + mock AI chat
// Drop-in replacement for your existing page. Uses only Tailwind, framer-motion,
// lucide-react and your shadcn components.
// -----------------------------------------------------------------------------

export default function SentinelAnalysisPage() {
  const [activeTab, setActiveTab] = useState<string>("executive");

  // Analysis run state
  const [analysisStarted, setAnalysisStarted] = useState(false);
  const [analysisCompleted, setAnalysisCompleted] = useState(false);
  const [, setProgress] = useState(0);
  const [, setCurrentStage] = useState("Idle");
  const intervalRef = useRef<number | null>(null);

  // Chat state
  type Msg = {
    id: string;
    role: "ai" | "user" | "system";
    text: string;
    time?: string;
  };
  const [messages, setMessages] = useState<Msg[]>([
    { id: "m0", role: "system", text: "System: Sentient offline" },
    {
      id: "m1",
      role: "ai",
      text: "Hello — I'm Sentient AI. I can summarize findings, propose containment actions, and generate a ready incident report.",
      time: new Date().toLocaleTimeString(),
    },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  // STAGED progress messages
  const STAGES = [
    { pct: 0, label: "Initializing models" },
    { pct: 12, label: "Checking logs & connectors" },
    { pct: 30, label: "Ingesting telemetry" },
    { pct: 52, label: "Analyzing endpoint behaviors" },
    { pct: 70, label: "Correlating cross-source events" },
    { pct: 86, label: "Scoring and prioritizing risks" },
    { pct: 96, label: "Compiling report" },
    { pct: 100, label: "Finalizing" },
  ];

  const updateStageFromProgress = (p: number) => {
    for (let i = STAGES.length - 1; i >= 0; i--) {
      if (p >= STAGES[i].pct) {
        setCurrentStage(STAGES[i].label);
        return;
      }
    }
    setCurrentStage("Starting");
  };

  const startAnalysis = () => {
    if (intervalRef.current) {
      window.clearInterval(intervalRef.current);
    }
    setAnalysisStarted(true);
    setAnalysisCompleted(false);
    setProgress(0);
    setCurrentStage("Initializing models");

    intervalRef.current = window.setInterval(() => {
      setProgress((prev) => {
        const jitter = Math.floor(Math.random() * 14) + 6;
        const next = Math.min(100, prev + jitter);
        updateStageFromProgress(next);
        if (next >= 100) {
          if (intervalRef.current) {
            window.clearInterval(intervalRef.current);
            intervalRef.current = null;
          }
          setTimeout(() => {
            setAnalysisCompleted(true);
            setAnalysisStarted(false);
            setCurrentStage("Completed");
            // push mock findings into chat
            pushAIMessage(
              "Analysis finished. Key: 2 high-risk chains, 1 ransomware-like artifact, 3 suspicious credentials. Type `generate report` to prepare an incident summary.`"
            );
          }, 900);
        }
        return next;
      });
    }, 420);
  };

  const pushUserMessage = (text: string) => {
    const msg: Msg = {
      id: `u${Date.now()}`,
      role: "user",
      text,
      time: new Date().toLocaleTimeString(),
    };
    setMessages((m) => [...m, msg]);
    return msg.id;
  };

  const pushAIMessage = (text: string, delay = 800) => {
    setTyping(true);
    setTimeout(() => {
      const msg: Msg = {
        id: `a${Date.now()}`,
        role: "ai",
        text,
        time: new Date().toLocaleTimeString(),
      };
      setMessages((m) => [...m, msg]);
      setTyping(false);
    }, delay + Math.floor(Math.random() * 900));
  };

  const handleSend = () => {
    if (!input.trim()) return;
    const text = input.trim();
    pushUserMessage(text);
    setInput("");
    // simulated AI response logic
    setTimeout(() => {
      if (
        text.toLowerCase().includes("generate report") ||
        text.toLowerCase().includes("incident report")
      ) {
        pushAIMessage(
          "Preparing incident report...\n- 2 high-risk chains\n- Affected hosts: host-172.16.3.22, host-172.16.4.10\n- Recommended actions: isolate, rotate keys, force MFA.\nReport ready: [Download report].",
          1100
        );
      } else if (text.toLowerCase().includes("isolate")) {
        pushAIMessage(
          "Isolating host... Host isolation request queued. Manual confirmation required."
        );
      } else if (text.toLowerCase().includes("summary")) {
        pushAIMessage(
          "Summary: 7 suspicious sessions, 3 lateral movement attempts, C2 beaconing on 2 endpoints. Top priority: isolate endpoint-22."
        );
      } else {
        pushAIMessage(
          "Acknowledged. Investigating \nSuggested: run memory capture, check recent login patterns, rotate compromised tokens."
        );
      }
    }, 400);
  };

  // quick-recommendation action
  const applyRecommendation = (rec: string) => {
    pushUserMessage(`Apply: ${rec}`);
    pushAIMessage(`Action applied: ${rec}`, 700);
  };

  // helper small components ---------------------------------------------------
  const StatCard = ({
    title,
    value,
    icon,
    color,
  }: {
    title: string;
    value: string | number;
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    color: string;
  }) => (
    <Card
      className={`p-4 rounded-2xl bg-gradient-to-br ${color} border-none shadow-lg`}
    >
      <div className="flex items-start gap-4">
        <div className="p-2 bg-white/6 rounded-lg">
          {React.createElement(icon, { className: "w-6 h-6 text-white" })}
        </div>
        <div>
          <div className="text-sm text-gray-200">{title}</div>
          <div className="text-2xl font-bold text-white mt-1">{value}</div>
        </div>
      </div>
    </Card>
  );

  const RiskBar = ({
    label,
    pct,
    color,
  }: {
    label: string;
    pct: number;
    color: string;
  }) => (
    <div className="space-y-1">
      <div className="flex items-center justify-between text-xs text-gray-300">
        <div>{label}</div>
        <div className="font-medium">{pct}%</div>
      </div>
      <div className="w-full bg-white/6 rounded-full h-3 overflow-hidden">
        <motion.div
          className={`h-3 ${color}`}
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.9 }}
        />
      </div>
    </div>
  );

  // Tiny charts using inline SVG ------------------------------------------------
  const MiniSpark = ({
    points = "0,40 40,22 80,30 120,18 160,28 200,10",
  }: {
    points?: string;
  }) => (
    <svg viewBox="0 0 200 40" className="w-full h-10">
      <polyline
        fill="none"
        stroke="url(#g)"
        strokeWidth="2"
        strokeLinecap="round"
        points={points}
      />
      <defs>
        <linearGradient id="g" x1="0" x2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#06b6d4" />
        </linearGradient>
      </defs>
    </svg>
  );

  // Recommendation feed data
  const recommendations = [
    {
      title: "Contain Endpoint",
      body: "Isolate host-172.16.3.22 and capture memory image.",
      icon: ShieldCheck,
      color: "bg-gradient-to-r from-blue-700 to-cyan-500",
    },
    {
      title: "Force MFA",
      body: "Enforce MFA for accounts flagged with anomalous logins.",
      icon: Brain,
      color: "bg-gradient-to-r from-violet-600 to-pink-500",
    },
    {
      title: "Rotate Keys",
      body: "Rotate service-account keys and revoke stale tokens.",
      icon: Activity,
      color: "bg-gradient-to-r from-emerald-600 to-teal-400",
    },
    {
      title: "Sim Phish",
      body: "Start targeted phishing simulation for execs.",
      icon: AlertTriangle,
      color: "bg-gradient-to-r from-amber-500 to-rose-500",
    },
  ];

  // ---------------------------------------------------------------------------
  // RENDER
  // ---------------------------------------------------------------------------
  return (
    <div className="min-h-screen p-8">
      {/* background neon + particles */}
      {/* <div className="absolute inset-0 -z-10 bg-gradient-to-br from-slate-900 via-[#0b1222] to-[#020617]" />
      <div className="pointer-events-none absolute -left-20 -top-40 w-[700px] h-[700px] bg-gradient-to-tr from-[#6d28d9]/30 to-[#06b6d4]/12 rounded-full blur-3xl opacity-80" />
      <div className="pointer-events-none absolute -right-40 -bottom-40 w-[600px] h-[600px] bg-gradient-to-bl from-[#f97316]/12 to-[#ef4444]/10 rounded-full blur-2xl" /> */}

      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-violet-400 to-pink-400 drop-shadow-lg">
            Sentient Analyst
          </h1>
          <p className="text-sm text-gray-300 mt-2 max-w-xl">
            Interactive AI assistant
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right text-xs text-gray-400 mr-2">Mode</div>
          <div className="px-3 py-2 rounded-md bg-white/5 border border-white/6">
            Cyber-Fusion
          </div>
          <Button
            className="ml-4 bg-gradient-to-r from-indigo-600 to-cyan-500"
            onClick={startAnalysis}
          >
            <Play className="w-4 h-4 mr-2" /> Launch AI Analysis
          </Button>
        </div>
      </div>

      {/* Top stats */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-6">
        <StatCard
          title="Telemetry / day"
          value="2.5M"
          icon={Database}
          color="from-sky-700 to-indigo-500"
        />
        <StatCard
          title="Anomalies Detected"
          value={"7,382"}
          icon={Zap}
          color="from-emerald-600 to-teal-400"
        />
        <StatCard
          title="Active Incidents"
          value={3}
          icon={AlertTriangle}
          color="from-rose-600 to-red-500"
        />
        <StatCard
          title="Avg Response"
          value={"12m"}
          icon={Clock}
          color="from-yellow-500 to-amber-500"
        />
      </div>

      {/* main layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v)}>
            <div className="bg-white/6 rounded-xl p-2 mb-4 flex items-center gap-2">
              <TabsList className="bg-transparent p-0 flex gap-2 w-full">
                <TabsTrigger
                  value="executive"
                  className={`flex-1 py-2 rounded-lg ${
                    activeTab === "executive"
                      ? "bg-gradient-to-r from-indigo-600 to-cyan-500 text-white"
                      : "text-gray-300"
                  }`}
                >
                  Executive Overview
                </TabsTrigger>
                <TabsTrigger
                  value="keyfindings"
                  className={`flex-1 py-2 rounded-lg ${
                    activeTab === "keyfindings"
                      ? "bg-gradient-to-r from-rose-500 to-pink-500 text-white"
                      : "text-gray-300"
                  }`}
                >
                  Key Findings
                </TabsTrigger>
                <TabsTrigger
                  value="prediction"
                  className={`flex-1 py-2 rounded-lg ${
                    activeTab === "prediction"
                      ? "bg-gradient-to-r from-amber-400 to-orange-500 text-white"
                      : "text-gray-300"
                  }`}
                >
                  Threat Prediction
                </TabsTrigger>
                <TabsTrigger
                  value="askai"
                  className={`flex-1 py-2 rounded-lg ${
                    activeTab === "askai"
                      ? "bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white"
                      : "text-gray-300"
                  }`}
                >
                  Ask AI
                </TabsTrigger>
              </TabsList>
              <div className="ml-auto text-xs text-gray-400 mr-2">
                Status:{" "}
                {analysisStarted
                  ? "Running"
                  : analysisCompleted
                  ? "Ready"
                  : "Idle"}
              </div>
            </div>

            {/* EXECUTIVE */}
            <TabsContent value="executive">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
                <Card className="p-4 bg-gradient-to-br from-slate-800/60 to-slate-900/40 border-none rounded-2xl">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="text-sm text-gray-300">
                        Threats Mitigated (30d)
                      </div>
                      <div className="text-3xl font-bold text-white mt-2">
                        1,240
                      </div>
                    </div>
                    <div className="text-xs text-gray-400">
                      +12% vs last period
                    </div>
                  </div>
                  <div className="mt-3">
                    <MiniSpark />
                  </div>
                </Card>

                <Card className="p-4 bg-gradient-to-br from-slate-800/60 to-slate-900/40 border-none rounded-2xl">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="text-sm text-gray-300">
                        High Confidence Alerts
                      </div>
                      <div className="text-3xl font-bold text-white mt-2">
                        7
                      </div>
                    </div>
                    <div className="text-xs text-gray-400">2 critical</div>
                  </div>
                  <div className="mt-3 grid grid-cols-3 gap-2 text-xs text-gray-400">
                    <div className="bg-white/3 p-2 rounded">Hosts: 3</div>
                    <div className="bg-white/3 p-2 rounded">APIs: 2</div>
                    <div className="bg-white/3 p-2 rounded">Tokens: 4</div>
                  </div>
                </Card>

                <Card className="p-4 bg-gradient-to-br from-slate-800/60 to-slate-900/40 border-none rounded-2xl">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="text-sm text-gray-300">
                        Confidence Score
                      </div>
                      <div className="text-3xl font-bold text-white mt-2">
                        86%
                      </div>
                    </div>
                    <div className="text-xs text-gray-400">Aggregated</div>
                  </div>
                  <div className="mt-3">
                    <div className="flex items-center gap-2">
                      <PieChart className="w-5 h-5 text-white/80" />
                      <div className="text-xs text-gray-400">
                        Model ensemble: transformer + graph
                      </div>
                    </div>
                  </div>
                </Card>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <Card className="p-6 rounded-2xl bg-white/5">
                  <h3 className="text-lg font-semibold text-blue-300 mb-3">
                    Predictive Threat Alerts
                  </h3>
                  <ul className="space-y-3 text-sm text-gray-300">
                    <li className="flex items-start gap-3">
                      <span className="p-2 rounded bg-red-600/20">
                        <AlertTriangle className="w-5 h-5 text-red-300" />
                      </span>
                      <div>
                        <div className="font-medium">C2 Beaconing (High)</div>
                        <div className="text-xs text-gray-400">
                          2 endpoints — action: network quarantine
                        </div>
                      </div>
                    </li>

                    <li className="flex items-start gap-3">
                      <span className="p-2 rounded bg-amber-500/20">
                        <Users className="w-5 h-5 text-amber-300" />
                      </span>
                      <div>
                        <div className="font-medium">
                          Suspicious IAM Token Use (Medium)
                        </div>
                        <div className="text-xs text-gray-400">
                          3 critical APIs — action: rotate tokens
                        </div>
                      </div>
                    </li>

                    <li className="flex items-start gap-3">
                      <span className="p-2 rounded bg-emerald-600/20">
                        <ShieldCheck className="w-5 h-5 text-emerald-300" />
                      </span>
                      <div>
                        <div className="font-medium">
                          Ransomware-like activity (Elevated)
                        </div>
                        <div className="text-xs text-gray-400">
                          1 host — action: isolate + file integrity monitoring
                        </div>
                      </div>
                    </li>
                  </ul>
                </Card>

                <Card className="p-6 rounded-2xl bg-white/5">
                  <h3 className="text-lg font-semibold text-blue-300 mb-3">
                    Recent Telemetry Snapshot
                  </h3>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Source</TableHead>
                        <TableHead>Event Type</TableHead>
                        <TableHead>Count</TableHead>
                        <TableHead>When</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>Firewall</TableCell>
                        <TableCell>Blocked Connections</TableCell>
                        <TableCell>340</TableCell>
                        <TableCell>3m</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Azure AD</TableCell>
                        <TableCell>Failed Logins</TableCell>
                        <TableCell>28</TableCell>
                        <TableCell>10m</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Endpoint</TableCell>
                        <TableCell>Process Spawns</TableCell>
                        <TableCell>980</TableCell>
                        <TableCell>15m</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </Card>
              </div>
            </TabsContent>

            {/* KEY FINDINGS */}
            <TabsContent value="keyfindings">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  {
                    title: "Lateral Movement Detected",
                    severity: "High",
                    desc: "Repeated failed logins + new service account creations → data exfil attempts.",
                    icon: Zap,
                  },
                  {
                    title: "Privilege Abuse",
                    severity: "Medium",
                    desc: "Unusual admin API calls from a dev workstation.",
                    icon: Brain,
                  },
                  {
                    title: "Unpatched Hosts",
                    severity: "Medium",
                    desc: "Several endpoints missing recent security patches.",
                    icon: RefreshCcw,
                  },
                  {
                    title: "Credential Stuffing Campaign",
                    severity: "High",
                    desc: "Automated login attempts across multiple accounts.",
                    icon: Users,
                  },
                ].map((f) => (
                  <Card
                    key={f.title}
                    className={`p-4 rounded-2xl bg-gradient-to-br ${
                      f.severity === "High"
                        ? "from-rose-600 to-red-500"
                        : "from-indigo-700 to-cyan-500"
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div className="p-2 rounded bg-white/8">
                        {React.createElement(f.icon, {
                          className: "w-6 h-6 text-white",
                        })}
                      </div>
                      <div>
                        <div className="text-sm text-white/90 font-semibold">
                          {f.title}
                        </div>
                        <div className="text-xs text-white/80 mt-1">
                          {f.desc}
                        </div>
                        <div className="mt-3 text-xs text-white/70">
                          Severity: {f.severity}
                        </div>
                        <div className="mt-3">
                          <Button
                            size="sm"
                            onClick={() => applyRecommendation(f.title)}
                            className="bg-black/20"
                          >
                            Apply
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              <div className="mt-4">
                <Card className="p-4 rounded-2xl bg-white/5">
                  <h4 className="text-sm text-blue-300 font-semibold mb-3">
                    Correlation Map
                  </h4>
                  <div className="w-full h-48 bg-gradient-to-br from-black/20 to-white/3 rounded-lg flex items-center justify-center text-xs text-gray-400">
                    [ Node graph placeholder — cross-source correlation shown
                    here ]
                  </div>
                </Card>
              </div>
            </TabsContent>

            {/* PREDICTION */}
            <TabsContent value="prediction">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <Card className="p-4 rounded-2xl bg-white/5">
                  <h3 className="text-lg font-semibold text-blue-300 mb-4">
                    Top Predictions
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <div className="text-sm">
                          Ransomware Attack (7 days)
                        </div>
                        <div className="text-xs text-gray-300">Prob: 42%</div>
                      </div>
                      <RiskBar
                        label="Exposed file shares"
                        pct={72}
                        color="bg-red-500"
                      />
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <div className="text-sm">Phishing Campaign (live)</div>
                        <div className="text-xs text-gray-300">Prob: 61%</div>
                      </div>
                      <RiskBar
                        label="Executive-targeted"
                        pct={61}
                        color="bg-amber-400"
                      />
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <div className="text-sm">Insider Data Exfil</div>
                        <div className="text-xs text-gray-300">Prob: 28%</div>
                      </div>
                      <RiskBar
                        label="Privileged account abnormality"
                        pct={28}
                        color="bg-emerald-400"
                      />
                    </div>
                  </div>
                </Card>

                <Card className="p-4 rounded-2xl bg-white/5">
                  <h3 className="text-lg font-semibold text-blue-300 mb-4">
                    Simulated Impact
                  </h3>
                  <div className="space-y-3 text-sm text-gray-300">
                    <div>
                      • Predicted affected assets: file servers, backup nodes.
                    </div>
                    <div>• Business impact: moderate (possible downtime)</div>
                    <div>
                      • Recommended playbooks: isolate, backup validation, legal
                      notify
                    </div>
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-2">
                    {[
                      { name: "Contain", pct: 76 },
                      { name: "Detect", pct: 92 },
                      { name: "Respond", pct: 48 },
                      { name: "Recover", pct: 33 },
                    ].map((m) => (
                      <div key={m.name} className="p-2 bg-white/6 rounded">
                        <div className="text-xs text-gray-300 mb-1">
                          {m.name}
                        </div>
                        <div className="text-sm font-semibold text-white">
                          {m.pct}%
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            </TabsContent>

            {/* ASK AI */}
            <TabsContent value="askai">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <Card className="col-span-2 p-4 rounded-2xl bg-white/5 flex flex-col">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <MessageSquare className="w-6 h-6 text-violet-300" />
                      <div>
                        <div className="font-semibold text-white">
                          AI Chat Assistant
                        </div>
                        <div className="text-xs text-gray-400">
                          Offline assistant — simulated replies
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="text-xs text-gray-400">Persona</div>
                      <div className="px-2 py-1 rounded bg-white/5 text-xs">
                        Analyst
                      </div>
                    </div>
                  </div>

                  <div
                    className="flex-1 overflow-auto p-3 bg-black/20 rounded-lg mb-3"
                    style={{ minHeight: 260 }}
                  >
                    <div className="space-y-3">
                      {messages.map((m) => (
                        <div
                          key={m.id}
                          className={`flex ${
                            m.role === "user" ? "justify-end" : "justify-start"
                          }`}
                        >
                          <div
                            className={`max-w-[78%] ${
                              m.role === "user"
                                ? "bg-gradient-to-r from-slate-700 to-slate-800 text-white rounded-tr-md rounded-bl-md rounded-tl-md p-3"
                                : "bg-white/6 rounded-br-md rounded-tl-md rounded-tr-md p-3 text-gray-200"
                            }`}
                          >
                            <div className="text-xs text-gray-400 mb-1">
                              {m.role === "user"
                                ? "You"
                                : m.role === "ai"
                                ? "Sentient AI"
                                : "System"}
                            </div>
                            <div className="whitespace-pre-wrap text-sm">
                              {m.text}
                            </div>
                            <div className="text-2xs text-gray-500 mt-2 text-right">
                              {m.time}
                            </div>
                          </div>
                        </div>
                      ))}

                      {typing && (
                        <div className="flex justify-start">
                          <div className="bg-white/6 rounded p-3">
                            <div className="flex items-center gap-2">
                              <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
                              <div className="w-2 h-2 rounded-full bg-white animate-pulse delay-75" />
                              <div className="w-2 h-2 rounded-full bg-white animate-pulse delay-150" />
                            </div>
                          </div>
                        </div>
                      )}

                      <div ref={chatEndRef} />
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <input
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") handleSend();
                      }}
                      placeholder="Ask the AI (e.g., 'generate report', 'isolate host-172.16.3.22')"
                      className="flex-1 bg-transparent border border-white/8 rounded-md p-2 text-sm text-white placeholder:text-gray-400"
                    />
                    <Button
                      onClick={handleSend}
                      className="bg-gradient-to-r from-violet-600 to-fuchsia-500"
                    >
                      Send
                    </Button>
                  </div>
                </Card>

                {/* Right column: Recommendations feed */}
                <div className="flex flex-col gap-3">
                  <Card className="p-4 rounded-2xl bg-white/6">
                    <div className="flex items-center justify-between mb-3">
                      <div className="text-sm font-semibold">
                        AI Recommendations
                      </div>
                      <div className="text-xs text-gray-400">Live</div>
                    </div>
                    <div className="space-y-3">
                      {recommendations.map((r) => (
                        <div
                          key={r.title}
                          className="p-3 rounded bg-gradient-to-br from-black/20 to-white/5"
                        >
                          <div className="flex items-start gap-3">
                            <div className="p-2 rounded bg-white/6">
                              {React.createElement(r.icon, {
                                className: "w-5 h-5 text-white",
                              })}
                            </div>
                            <div className="flex-1">
                              <div className="font-medium text-white text-sm">
                                {r.title}
                              </div>
                              <div className="text-xs text-gray-300 mt-1">
                                {r.body}
                              </div>
                              <div className="mt-3 flex items-center gap-2">
                                <Button
                                  size="sm"
                                  onClick={() => applyRecommendation(r.title)}
                                  className="bg-gradient-to-r from-indigo-600 to-cyan-500 text-xs"
                                >
                                  Apply
                                </Button>
                                <Button
                                  size="sm"
                                  onClick={() => {
                                    pushUserMessage(`Explain ${r.title}`);
                                    pushAIMessage(
                                      `Explanation: ${r.body}`,
                                      600
                                    );
                                  }}
                                  className="bg-white/6 text-xs"
                                >
                                  Explain
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card>

                  <Card className="p-3 rounded-2xl bg-white/6">
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-sm font-semibold">Quick Actions</div>
                      <div className="text-xs text-gray-400">Simulated</div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <button
                        onClick={() => {
                          pushUserMessage("generate report");
                          pushAIMessage("Generating consolidated report", 900);
                        }}
                        className="flex items-center justify-between text-xs p-2 rounded bg-gradient-to-r from-violet-600 to-cyan-500"
                      >
                        <div className="flex items-center gap-2">
                          <Sparkles className="w-4 h-4" /> Generate Incident
                          Report
                        </div>
                        <ChevronRight className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => {
                          pushUserMessage("isolate host-172.16.3.22");
                          pushAIMessage("Isolating host-172.16.3.22", 700);
                        }}
                        className="flex items-center justify-between text-xs p-2 rounded bg-gradient-to-r from-rose-500 to-red-400"
                      >
                        <div className="flex items-center gap-2">
                          <ShieldCheck className="w-4 h-4" /> Isolate Host
                        </div>
                        <ChevronRight className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => {
                          setMessages((m) => [
                            ...m,
                            {
                              id: `s${Date.now()}`,
                              role: "system",
                              text: "Tokens rotated",
                              time: new Date().toLocaleTimeString(),
                            },
                          ]);
                        }}
                        className="flex items-center justify-between text-xs p-2 rounded bg-gradient-to-r from-emerald-500 to-teal-400"
                      >
                        <div className="flex items-center gap-2">
                          <RefreshCcw className="w-4 h-4" /> Rotate Keys
                        </div>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </Card>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* right column summary / live feed */}
        <div className="hidden lg:block">
          <div className="flex flex-col gap-4">
            <ProgressCard />
            <Card className="p-4 rounded-2xl bg-white/6">
              <div className="flex items-center justify-between mb-2">
                <div className="text-sm font-semibold">Top Alerts</div>
                <div className="text-xs text-gray-400">Updated</div>
              </div>
              <ul className="space-y-2 text-sm text-gray-300">
                <li className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-red-400" /> C2
                  Beaconing — host-172.16.3.22
                </li>
                <li className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-amber-300" /> IAM token misuse
                  — svc-A
                </li>
                <li className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-green-300" /> Suspicious
                  process injection — host-172.16.4.10
                </li>
              </ul>
            </Card>

            <Card className="p-4 rounded-2xl bg-white/6">
              <div className="text-sm font-semibold mb-2">Recent Actions</div>
              <div className="text-xs text-gray-300 space-y-2">
                <div>
                  • 12:12 — Quarantine request queued for host-172.16.3.22
                </div>
                <div>• 12:05 — Token rotation recommended for svc-A</div>
                <div>• 11:50 — Phish sim started for execs</div>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* tiny footer */}
      <div className="mt-8 text-xs text-gray-500">
        All actions are designed by Sentient UI · v1.0
      </div>
    </div>
  );
}
