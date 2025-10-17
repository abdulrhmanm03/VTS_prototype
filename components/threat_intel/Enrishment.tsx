"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Loader2, ShieldAlert, Eye } from "lucide-react";

interface IOC {
  ip: string;
  domain: string;
  type: string;
  confidence: string;
  date: string;
  source: string;
  risk: string;
  details?: string; // new field for extra details
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
  const [expandedIOC, setExpandedIOC] = useState<string | null>(null); // track expanded IOC

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

    for (let i = 0; i < sources.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setActiveSources((prev) => [...prev, sources[i]]);
    }

    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIocs(simulatedIocs);
    setLoading(false);
    setShowSummary(true);
  };

  return (
    <div className="space-y-8 p-6">
      {/* Header */}
      <div className="flex flex-col items-center text-center">
        <h2 className="text-2xl font-bold mb-2">
          Threat Intelligence Enrichment
        </h2>
        <p className="text-gray-400 mb-6 max-w-xl">
          Launch automated enrichment across multiple intelligence sources to
          analyze suspicious IOCs and summarize threat context.
        </p>
        <Button
          onClick={handleStart}
          disabled={loading}
          className="w-full sm:w-1/2 bg-gradient-to-r from-blue-500/20 to-cyan-400/20 text-blue-300 border border-blue-400/40 hover:from-blue-600/30 hover:to-cyan-500/30"
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Enriching
              Data...
            </>
          ) : (
            "Start Enrichment Process"
          )}
        </Button>
      </div>

      {/* Enrichment Sources */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {activeSources.map((src, idx) => (
          <motion.div
            key={src.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.2 }}
          >
            <Card className="bg-white/5 backdrop-blur-md rounded-2xl border border-gray-700 shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>{src.name}</span>
                  <Badge
                    variant="outline"
                    className="text-blue-300 border-blue-400/30"
                  >
                    {src.confidence}% Confidence
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-gray-300">
                <p className="text-sm font-semibold text-blue-300">
                  {src.verdict}
                </p>
                <ul className="list-disc list-inside text-sm text-gray-400">
                  {src.metrics.map((m, i) => (
                    <li key={i}>{m}</li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-2">
                  {src.tags.map((tag) => (
                    <Badge
                      key={tag}
                      className="bg-blue-500/20 border border-blue-400/20 text-xs"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* AI Threat Summary */}
      {showSummary && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="p-6 bg-gradient-to-r from-gray-800/40 to-gray-900/40 border border-gray-700/50 rounded-2xl"
        >
          <h3 className="text-lg font-semibold mb-2 text-blue-300">
            AI Threat Summary
          </h3>
          <p className="text-gray-300 text-sm leading-relaxed">
            The enrichment process indicates a coordinated phishing campaign
            utilizing multiple domains linked to Emotet infrastructure. Several
            hosts show evidence of command-and-control activity, suggesting
            active infection attempts in the wild.
          </p>
        </motion.div>
      )}

      {/* IOC Results */}
      {showSummary && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <h3 className="text-xl font-semibold mb-4">Results Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {iocs.map((ioc, index) => (
              <Card
                key={index}
                className="bg-white/5 border border-gray-700/50 hover:border-blue-400/40 transition rounded-2xl shadow-md"
              >
                <CardHeader>
                  <CardTitle className="text-blue-200 flex items-center gap-2">
                    <ShieldAlert className="w-5 h-5 text-blue-400" />{" "}
                    {ioc.domain}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-1 text-sm text-gray-300">
                  <p>
                    <strong>IP:</strong> {ioc.ip}
                  </p>
                  <p>
                    <strong>Type:</strong> {ioc.type}
                  </p>
                  <p>
                    <strong>Confidence:</strong> {ioc.confidence}
                  </p>
                  <p>
                    <strong>Date:</strong> {ioc.date}
                  </p>
                  <p>
                    <strong>Source:</strong> {ioc.source}
                  </p>
                  <p>
                    <strong>Risk:</strong> {ioc.risk}
                  </p>

                  <Button
                    size="sm"
                    variant="outline"
                    className="w-full mt-3 bg-transparent border-blue-400/30 text-blue-300 hover:bg-blue-500/20"
                    onClick={() =>
                      setExpandedIOC(
                        expandedIOC === ioc.domain ? null : ioc.domain
                      )
                    }
                  >
                    <Eye className="w-4 h-4 mr-2" />{" "}
                    {expandedIOC === ioc.domain
                      ? "Hide Details"
                      : "View Details"}
                  </Button>

                  {/* Expanded Details */}
                  <AnimatePresence>
                    {expandedIOC === ioc.domain && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden mt-2 text-gray-300 text-sm bg-blue-900/20 p-3 rounded-lg"
                      >
                        {ioc.details}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}
