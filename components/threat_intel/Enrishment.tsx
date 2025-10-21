"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Loader2,
  ShieldAlert,
  Activity,
  Network,
  Database,
  BarChart3,
} from "lucide-react";

interface IOC {
  ip: string;
  domain: string;
  type: string;
  confidence: string;
  date: string;
  source: string;
  risk: string;
  details?: string;
}

interface EnrichmentSource {
  name: string;
  confidence: number;
  verdict: string;
  metrics: string[];
  tags: string[];
}

export default function Enrichment() {
  const [loading, setLoading] = useState(false);
  const [activeSources, setActiveSources] = useState<EnrichmentSource[]>([]);
  const [showSummary, setShowSummary] = useState(false);
  const [iocs, setIocs] = useState<IOC[]>([]);
  const [expandedIOC, setExpandedIOC] = useState<string | null>(null);
  const [postUpdates, setPostUpdates] = useState<string[]>([]);

  const sources: EnrichmentSource[] = [
    {
      name: "VirusTotal",
      confidence: 92,
      verdict: "Malicious - High Confidence",
      metrics: ["Detected by 42/57 engines", "Linked to known phishing kits"],
      tags: ["Phishing", "Credential Theft", "C2"],
    },
    {
      name: "AbuseIPDB",
      confidence: 85,
      verdict: "Reported for abuse & scanning",
      metrics: ["Recent activity in 3 countries", "Brute-force behavior noted"],
      tags: ["Abuse", "Brute-force", "Scanner"],
    },
    {
      name: "Shodan",
      confidence: 78,
      verdict: "Open RDP & FTP ports found",
      metrics: ["Ports 21, 3389 open", "Weak SSL configuration"],
      tags: ["Exposure", "Vulnerability"],
    },
    {
      name: "GreyNoise",
      confidence: 68,
      verdict: "Seen in benign scanning activity",
      metrics: ["Tagged as opportunistic", "No targeted attacks detected"],
      tags: ["Scanner", "Low Threat"],
    },
    {
      name: "Hybrid Analysis",
      confidence: 91,
      verdict: "Executable shows network beaconing",
      metrics: ["C2 callouts to multiple IPs", "Suspicious mutex behavior"],
      tags: ["Malware", "C2", "Beaconing"],
    },
    {
      name: "ThreatFox",
      confidence: 88,
      verdict: "IOC associated with recent campaign",
      metrics: ["Listed in ThreatFox database", "TTP overlaps with Emotet"],
      tags: ["Campaign", "Emotet", "High Risk"],
    },
  ];

  const simulatedIocs: IOC[] = [
    {
      ip: "192.168.43.55",
      domain: "malicious-login.net",
      type: "Phishing Domain",
      confidence: "High",
      date: "2025-10-16",
      source: "VirusTotal",
      risk: "Critical",
      details:
        "This domain is linked to credential theft campaigns targeting financial institutions.",
    },
    {
      ip: "45.77.120.210",
      domain: "rdp-scanhost.org",
      type: "Scanner",
      confidence: "Medium",
      date: "2025-10-15",
      source: "AbuseIPDB",
      risk: "Moderate",
      details:
        "Observed performing brute-force RDP attempts across multiple hosts in the past 24h.",
    },
    {
      ip: "89.248.172.45",
      domain: "botnet-relay.com",
      type: "C2 Server",
      confidence: "High",
      date: "2025-10-14",
      source: "Hybrid Analysis",
      risk: "Severe",
      details:
        "C2 server for Emotet malware, communicating with infected endpoints.",
    },
    {
      ip: "103.51.122.88",
      domain: "update-secure.net",
      type: "Malware Host",
      confidence: "High",
      date: "2025-10-13",
      source: "ThreatFox",
      risk: "Critical",
      details: "Hosts malicious payloads and actively distributes ransomware.",
    },
    {
      ip: "156.232.10.34",
      domain: "cloud-proxy.io",
      type: "Proxy/VPN",
      confidence: "Low",
      date: "2025-10-12",
      source: "Shodan",
      risk: "Low",
      details:
        "Exposed open proxy server, potential for anonymized attack routing.",
    },
  ];

  const handleStart = async () => {
    setLoading(true);
    setActiveSources([]);
    setShowSummary(false);
    setIocs([]);
    setExpandedIOC(null);
    setPostUpdates([]);

    for (let i = 0; i < sources.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setActiveSources((prev) => [...prev, sources[i]]);
    }

    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIocs(simulatedIocs);
    setLoading(false);
    setShowSummary(true);

    const updates = [
      "Detected domain overlaps with known credential phishing infrastructure.",
      "Network telemetry confirms beaconing behavior from two Emotet nodes.",
      "New threat cluster identified: probable operator 'Atlas Spider'.",
      "Cross-referenced with sandbox analysis — samples show shared payload signature.",
    ];

    for (let i = 0; i < updates.length; i++) {
      await new Promise((r) => setTimeout(r, 2500));
      setPostUpdates((prev) => [...prev, updates[i]]);
    }
  };

  return (
    <div className="space-y-8 p-6">
      {/* Header */}{" "}
      <div className="flex flex-col items-center text-center">
        {" "}
        <h2 className="text-2xl font-bold mb-2 text-white">
          Threat Intelligence Enrichment{" "}
        </h2>{" "}
        <p className="text-gray-400 mb-6 max-w-xl">
          Launch automated enrichment across multiple intelligence sources to
          analyze suspicious IOCs and summarize threat context in real-time.{" "}
        </p>{" "}
        <Button
          onClick={handleStart}
          disabled={loading}
          className="w-full sm:w-1/2 bg-gradient-to-r from-blue-500/20 to-cyan-400/20 text-blue-300 border border-blue-400/40 hover:from-blue-600/30 hover:to-cyan-500/30"
        >
          {loading ? (
            <>
              {" "}
              <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Enriching
              Data...
            </>
          ) : (
            "Start Enrichment Process"
          )}{" "}
        </Button>{" "}
      </div>
      ```
      {/* BEFORE ENRICHMENT — Context Overview */}
      {!loading && !showSummary && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6"
        >
          <Card className="bg-gray-900/40 border border-gray-700/60 rounded-2xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-300">
                <Database className="w-5 h-5 text-blue-400" /> Source Overview
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 text-sm space-y-2">
              <p>
                The system is configured to query{" "}
                <strong>{sources.length}</strong> live threat intelligence feeds
                including sandbox data, abuse reports, and passive DNS.
              </p>
              <ul className="list-disc list-inside text-gray-400">
                <li>Real-time correlation of malicious domains and IPs</li>
                <li>Confidence scoring and behavioral overlap detection</li>
                <li>Cross-source IOC deduplication and summarization</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/40 border border-gray-700/60 rounded-2xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-300">
                <BarChart3 className="w-5 h-5 text-blue-400" /> Estimated
                Analysis Profile
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 text-sm">
              <p>Expected runtime: ~15 seconds</p>
              <p>Data correlation coverage: 98%</p>
              <p>AI summarization layer: Enabled</p>
              <p className="italic text-gray-400 mt-2">
                Ready to begin enrichment. Click the button above to start.
              </p>
            </CardContent>
          </Card>
        </motion.div>
      )}
      {/* DURING ENRICHMENT */}
      {loading && (
        <div className="space-y-4">
          <p className="text-gray-400 text-center mt-6">
            Collecting intelligence from sources...
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <AnimatePresence>
              {activeSources.map((src) => (
                <motion.div
                  key={src.name}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                >
                  <Card className="bg-gray-900/50 border border-gray-700 rounded-xl">
                    <CardHeader>
                      <CardTitle className="text-blue-300 flex items-center gap-2">
                        <Network className="w-4 h-4 text-blue-400" />
                        {src.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm text-gray-300 space-y-2">
                      <p className="text-blue-400 font-medium">{src.verdict}</p>
                      <ul className="list-disc list-inside text-gray-400">
                        {src.metrics.map((m) => (
                          <li key={m}>{m}</li>
                        ))}
                      </ul>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {src.tags.map((t) => (
                          <Badge
                            key={t}
                            className="bg-blue-500/10 text-blue-300 border border-blue-400/30"
                          >
                            {t}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      )}
      {/* AFTER ENRICHMENT */}
      {showSummary && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          {/* Summary */}
          <Card className="bg-white/5 border border-gray-700/60 rounded-2xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-300">
                <ShieldAlert className="w-5 h-5 text-blue-400" />
                AI Enrichment Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 text-sm space-y-2">
              <p>
                Enrichment completed successfully across {sources.length}{" "}
                intelligence feeds. Correlation detected{" "}
                <strong>{iocs.length}</strong> distinct IOCs with overlapping
                TTP patterns and risk profiles.
              </p>
              <p className="italic text-gray-400">
                Several IOCs show campaign-level coordination and shared payload
                lineage. Further proactive blocking is advised.
              </p>
            </CardContent>
          </Card>

          {/* Post Updates */}
          <AnimatePresence>
            {postUpdates.length > 0 && (
              <Card className="bg-gray-900/50 border border-gray-700/60 rounded-2xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-blue-300">
                    <Activity className="w-5 h-5 text-blue-400" />
                    Live Analysis Feed
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-gray-300 space-y-2">
                  {postUpdates.map((update, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.2 }}
                      className="border-l-2 border-blue-400 pl-3"
                    >
                      {update}
                    </motion.div>
                  ))}
                </CardContent>
              </Card>
            )}
          </AnimatePresence>

          {/* IOC Results */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {iocs.map((ioc) => (
              <Card
                key={ioc.ip}
                onClick={() =>
                  setExpandedIOC(expandedIOC === ioc.ip ? null : ioc.ip)
                }
                className="bg-white/5 border border-gray-700/60 rounded-2xl cursor-pointer hover:border-blue-500/40 transition-all"
              >
                <CardHeader>
                  <CardTitle className="flex items-center justify-between text-blue-300">
                    {ioc.domain}
                    <Badge
                      className={`${
                        ioc.risk === "Critical"
                          ? "bg-red-500/20 text-red-300 border border-red-400/40"
                          : ioc.risk === "Severe"
                          ? "bg-orange-500/20 text-orange-300 border border-orange-400/40"
                          : "bg-green-500/20 text-green-300 border border-green-400/40"
                      }`}
                    >
                      {ioc.risk}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <AnimatePresence>
                  {expandedIOC === ioc.ip && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                    >
                      <CardContent className="text-sm text-gray-300 space-y-1">
                        <p>
                          <strong>Type:</strong> {ioc.type}
                        </p>
                        <p>
                          <strong>Source:</strong> {ioc.source}
                        </p>
                        <p>
                          <strong>Confidence:</strong> {ioc.confidence}
                        </p>
                        <p className="text-gray-400">{ioc.details}</p>
                      </CardContent>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Card>
            ))}
          </div>

          {/* Recommendations */}
          <Card className="bg-blue-900/20 border border-blue-500/30 rounded-2xl">
            <CardHeader>
              <CardTitle className="text-blue-300 text-lg">
                Recommended Next Steps
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 text-sm space-y-2">
              <ul className="list-disc list-inside">
                <li>Block confirmed malicious domains at the network edge.</li>
                <li>
                  Correlate IOCs against local endpoint logs for activity
                  traces.
                </li>
                <li>
                  Initiate deeper sandbox detonation for Emotet-related samples.
                </li>
                <li>
                  Enable continuous enrichment for new domains matching pattern
                  sets.
                </li>
              </ul>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  );
}
