"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Brain,
  ShieldCheck,
  Activity,
  AlertTriangle,
  Loader2,
  Play,
  Cpu,
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

export default function SentinelAnalysisPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tabParam = searchParams.get("tab") || "insights";
  const [activeTab, setActiveTab] = useState(tabParam);
  const [analysisStarted, setAnalysisStarted] = useState(false);
  const [analysisCompleted, setAnalysisCompleted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [expandedCard, setExpandedCard] = useState<string | null>(null);

  useEffect(() => {
    setActiveTab(tabParam);
  }, [tabParam]);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    const params = new URLSearchParams(window.location.search);
    params.set("tab", value);
    router.replace(`?${params.toString()}`, { scroll: false });
  };

  const handleStartAnalysis = () => {
    setAnalysisStarted(true);
    setAnalysisCompleted(false);
    setProgress(0);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setAnalysisCompleted(true), 600);
          return 100;
        }
        return prev + 10;
      });
    }, 400);
  };

  const toggleCard = (id: string) => {
    setExpandedCard((prev) => (prev === id ? null : id));
  };

  return (
    <div className="flex flex-col gap-10 p-8 min-h-screen text-white">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-5xl font-bold text-blue-400 drop-shadow-[0_0_14px_rgba(192,132,252,0.8)]">
            Sentinel Analysis
          </h1>
          <p className="text-gray-400 mt-2 text-lg max-w-3xl">
            AI-powered behavioral analytics and threat correlation engine —
            discover, predict, and respond before incidents occur.
          </p>
        </div>
      </div>

      {/* BEFORE ANALYSIS */}
      {!analysisStarted && !analysisCompleted && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col gap-10"
        >
          {/* Intro Card */}
          <Card className="bg-white/5 border-none rounded-2xl p-8 text-gray-300 shadow-lg backdrop-blur-md text-center">
            <Cpu className="w-14 h-14 text-blue-400 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-blue-300 mb-2">
              Sentinel AI Ready
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Begin an AI-powered deep analysis across your telemetry data to
              uncover hidden threats, anomalies, and behavioral risks.
            </p>
            <div className="mt-6 flex justify-center">
              <Button
                onClick={handleStartAnalysis}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl flex items-center gap-2"
              >
                <Play className="w-5 h-5" /> Launch AI Analysis
              </Button>
            </div>
          </Card>

          {/* Capabilities Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-white/5 border-none rounded-2xl p-6 text-gray-300">
              <h3 className="text-lg font-semibold text-blue-300 mb-2">
                Telemetry Sources
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Sentinel processes SIEM, EDR, and NDR data from multiple
                regions, unifying over 2.5M daily telemetry points.
              </p>
            </Card>

            <Card className="bg-white/5 border-none rounded-2xl p-6 text-gray-300">
              <h3 className="text-lg font-semibold text-blue-300 mb-2">
                Machine Learning Models
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Transformer-based anomaly detectors, ensemble classifiers, and
                correlation graphs trained on 3 years of enterprise data.
              </p>
            </Card>

            <Card className="bg-white/5 border-none rounded-2xl p-6 text-gray-300">
              <h3 className="text-lg font-semibold text-blue-300 mb-2">
                Expected Output
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Risk prioritization, anomaly timelines, and confidence metrics —
                fully visualized and actionable.
              </p>
            </Card>
          </div>

          {/* What Sentinel Will Do */}
          <Card className="bg-white/5 border-none rounded-2xl p-8 text-gray-300">
            <h3 className="text-xl font-semibold text-blue-300 mb-4">
              What Sentinel Will Analyze
            </h3>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li>• Correlation between login behaviors and time anomalies</li>
              <li>• Endpoint command execution patterns</li>
              <li>• DNS and network beaconing activity</li>
              <li>• Privilege escalation and abnormal privilege persistence</li>
              <li>• Cloud identity and API usage deviations</li>
            </ul>
          </Card>

          {/* Sample Telemetry Preview */}
          <Card className="bg-white/5 border-none rounded-2xl p-6">
            <h3 className="text-xl font-semibold mb-4 text-blue-300">
              Recent Telemetry Snapshot
            </h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Source</TableHead>
                  <TableHead>Event Type</TableHead>
                  <TableHead>Count</TableHead>
                  <TableHead>Timestamp</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>Firewall Logs</TableCell>
                  <TableCell>Blocked Connections</TableCell>
                  <TableCell>340</TableCell>
                  <TableCell>3 mins ago</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Azure AD</TableCell>
                  <TableCell>Failed Logins</TableCell>
                  <TableCell>28</TableCell>
                  <TableCell>10 mins ago</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Endpoint Sensors</TableCell>
                  <TableCell>Process Spawns</TableCell>
                  <TableCell>980</TableCell>
                  <TableCell>15 mins ago</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Card>
        </motion.div>
      )}

      {/* PROGRESS STATE */}
      {analysisStarted && !analysisCompleted && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="relative bg-white/10 border border-blue-500/20 rounded-2xl p-8 shadow-lg overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/30 via-blue-800/10 to-transparent animate-pulse" />
          <div className="relative z-10 flex flex-col items-center text-center space-y-4">
            <Loader2 className="w-12 h-12 animate-spin text-blue-400" />
            <p className="text-xl font-medium">
              Running deep learning models...
            </p>
            <p className="text-sm text-gray-400">
              Evaluating over 2.5M telemetry signals and behavioral logs
            </p>
            <div className="w-full bg-white/10 rounded-full h-3 mt-4 overflow-hidden">
              <motion.div
                className="h-3 bg-blue-500 rounded-full"
                style={{ width: `${progress}%` }}
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.4 }}
              />
            </div>
            <p className="text-sm text-gray-400">{progress}% completed</p>
          </div>
        </motion.div>
      )}

      {/* AFTER ANALYSIS */}
      {analysisCompleted && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-10"
        >
          {/* Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                id: "anomalies",
                title: "Detected Anomalies",
                value: "42",
                icon: Activity,
                color: "blue",
                desc: "+8 new patterns detected",
              },
              {
                id: "risk",
                title: "High-Risk Behaviors",
                value: "7",
                icon: AlertTriangle,
                color: "red",
                desc: "Critical attention required",
              },
              {
                id: "confidence",
                title: "AI Confidence",
                value: "96%",
                icon: Brain,
                color: "blue",
                desc: "Stable accuracy across models",
              },
              {
                id: "score",
                title: "Overall Risk Score",
                value: "73/100",
                icon: ShieldCheck,
                color: "green",
                desc: "Moderate risk environment",
              },
            ].map((card) => (
              <motion.div
                key={card.id}
                whileHover={{ scale: 1.02 }}
                onClick={() => toggleCard(card.id)}
                className={`p-4 cursor-pointer relative text-white overflow-hidden rounded-2xl bg-white/5 shadow-lg backdrop-blur-md hover:shadow-[0_0_30px_rgba(192,132,252,0.6)] transition-all duration-300 ${
                  expandedCard === card.id ? "ring-2 ring-blue-500" : ""
                }`}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-blue-800/10 to-transparent pointer-events-none" />
                <div className="relative z-10">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-gray-400">
                      {card.title}
                    </CardTitle>
                    <card.icon
                      className={`h-8 w-8 text-${card.color}-400 drop-shadow-md`}
                    />
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold drop-shadow-lg">
                      {card.value}
                    </div>
                    <p className="text-xs text-green-500">{card.desc}</p>
                  </CardContent>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Anomaly Breakdown Section */}
          <Card className="bg-white/5 border-none rounded-2xl p-6 text-gray-300">
            <h3 className="text-xl font-semibold mb-4 text-blue-300">
              Anomaly Breakdown by Category
            </h3>
            <ul className="text-sm text-gray-400 space-y-2">
              <li>• User Behavior: 15 anomalies (5 high-risk)</li>
              <li>• Network Traffic: 12 anomalies (2 critical)</li>
              <li>• Endpoint Actions: 10 anomalies (3 medium)</li>
              <li>• Cloud API Calls: 5 anomalies (low-risk)</li>
            </ul>
          </Card>

          {/* Tabs with insights, behavior, summary */}
          <Tabs
            value={activeTab}
            onValueChange={handleTabChange}
            className="mt-10"
          >
            <TabsList className="bg-white/10 p-1 rounded-lg">
              <TabsTrigger value="insights">Threat Insights</TabsTrigger>
              <TabsTrigger value="behavior">Behavioral Patterns</TabsTrigger>
              <TabsTrigger value="summary">AI Summary</TabsTrigger>
            </TabsList>

            <TabsContent value="insights" className="mt-6">
              <Card className="bg-white/5 border-none rounded-2xl p-6 text-gray-300">
                <h3 className="text-xl font-semibold mb-4 text-blue-300">
                  Emerging Threats
                </h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Threat Name</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Confidence</TableHead>
                      <TableHead>Detected</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>APT Storm</TableCell>
                      <TableCell>Phishing / C2</TableCell>
                      <TableCell>97%</TableCell>
                      <TableCell>2 hours ago</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>ZeroSky</TableCell>
                      <TableCell>Exploit Kit</TableCell>
                      <TableCell>92%</TableCell>
                      <TableCell>6 hours ago</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>EchoPulse</TableCell>
                      <TableCell>Recon Activity</TableCell>
                      <TableCell>89%</TableCell>
                      <TableCell>1 day ago</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Card>
            </TabsContent>

            <TabsContent value="behavior" className="mt-6">
              <Card className="bg-white/5 border-none rounded-2xl p-6 text-gray-300">
                <h3 className="text-xl font-semibold mb-4 text-blue-300">
                  Behavioral Pattern Analysis
                </h3>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li>
                    • Concurrent logins detected from separate geolocations.
                  </li>
                  <li>
                    • Unusual privilege escalations traced to new service
                    accounts.
                  </li>
                  <li>
                    • Network lateral movement patterns match prior simulations.
                  </li>
                  <li>
                    • False positive rates reduced by 21% after retraining.
                  </li>
                </ul>
              </Card>
            </TabsContent>

            <TabsContent value="summary" className="mt-6">
              <Card className="bg-white/5 border-none rounded-2xl p-6 text-gray-300">
                <h3 className="text-xl font-semibold mb-4 text-blue-300">
                  AI Correlation Summary
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  The Sentinel AI engine correlated 2.3 million events from 450
                  endpoints. Confidence remains above 95% across model layers.
                  <br />
                  <br />
                  <strong>Recommendation:</strong> Focus on external traffic
                  anomalies and privilege escalation attempts.
                </p>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Recommendations Section */}
          <Card className="bg-white/5 border-none rounded-2xl p-8 text-gray-300">
            <h3 className="text-xl font-semibold text-blue-300 mb-4">
              Response Recommendations
            </h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li>• Isolate 3 high-risk endpoints for further triage.</li>
              <li>
                • Enforce MFA challenges on 2 user accounts showing anomalies.
              </li>
              <li>• Deploy network sandboxing for outbound C2-like traffic.</li>
              <li>
                • Re-run AI correlation in 24 hours to confirm stabilization.
              </li>
            </ul>
          </Card>

          {/* Next Steps */}
          <div className="flex flex-col md:flex-row gap-6">
            <Card className="flex-1 bg-white/5 border-none rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-blue-300 mb-3">
                Next Steps
              </h3>
              <ul className="text-gray-400 text-sm space-y-2">
                <li>• Generate incident report summary</li>
                <li>• Export findings to SIEM dashboard</li>
                <li>• Schedule re-analysis pipeline</li>
              </ul>
            </Card>

            <Card className="flex-1 bg-white/5 border-none rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-blue-300 mb-3">
                Confidence Overview
              </h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                All anomaly detection models maintained a steady mean confidence
                of 96.4%, with no overfitting signals across validation layers.
              </p>
            </Card>
          </div>
        </motion.div>
      )}
    </div>
  );
}
