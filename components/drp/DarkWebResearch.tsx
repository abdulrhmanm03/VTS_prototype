"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/components/ui/tooltip";
import { ShieldAlert, Globe, User, Link2, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ResponsiveContainer, AreaChart, Area } from "recharts";

type ActivityData = {
  day: string;
  mentions: number;
};

type DarkWebItem = {
  title: string;
  source: string;
  riskLevel: string;
  tags: string[];
  lastSeen: string;
  confidence: number;
  author: string;
  mentions: ActivityData[];
  relatedLinks: string[];
  description: string;
};

// 🕵️‍♂️ Dummy Dark Web Intelligence Data
const darkWebData: DarkWebItem[] = [
  {
    title: "Credential Dump — Corporate Portal Access",
    source: "RaidForums (mirror)",
    riskLevel: "Critical",
    tags: ["Credentials", "Access Sale", "Corporate"],
    lastSeen: "2025-10-10",
    confidence: 97,
    author: "darkh4nd",
    description:
      "Dump contains over 5,000 credentials allegedly from internal VPN and email systems. Seller verified by multiple forum members.",
    mentions: [
      { day: "Mon", mentions: 8 },
      { day: "Tue", mentions: 15 },
      { day: "Wed", mentions: 21 },
      { day: "Thu", mentions: 17 },
      { day: "Fri", mentions: 25 },
    ],
    relatedLinks: [
      "hxxp://raidforumsxyz.onion/thread/9342",
      "hxxp://leakshop.onion/credpack",
    ],
  },
  {
    title: "Database Leak — Financial Institution Clients",
    source: "BreachBase",
    riskLevel: "High",
    tags: ["Database", "PII", "Finance"],
    lastSeen: "2025-10-09",
    confidence: 92,
    author: "crypt0hunter",
    description:
      "Leaked database includes 120K+ client records with names, SSNs, and partial card numbers. Offered for 0.5 BTC.",
    mentions: [
      { day: "Mon", mentions: 6 },
      { day: "Tue", mentions: 9 },
      { day: "Wed", mentions: 12 },
      { day: "Thu", mentions: 10 },
      { day: "Fri", mentions: 14 },
    ],
    relatedLinks: [
      "hxxp://breachbase.onion/db-546",
      "hxxp://cryptohuntermarket.onion/offer",
    ],
  },
  {
    title: "Ransomware Negotiation — LockBit 3.0",
    source: "DarkNegotiator",
    riskLevel: "Severe",
    tags: ["Ransomware", "Negotiation", "Extortion"],
    lastSeen: "2025-10-12",
    confidence: 99,
    author: "LockBitOps",
    description:
      "Live negotiation logs between attackers and victim organization posted publicly on ransomware portal.",
    mentions: [
      { day: "Mon", mentions: 10 },
      { day: "Tue", mentions: 14 },
      { day: "Wed", mentions: 18 },
      { day: "Thu", mentions: 19 },
      { day: "Fri", mentions: 23 },
    ],
    relatedLinks: [
      "hxxp://lockbit3.onion/chat",
      "hxxp://ransomhub.onion/posts/lockbit",
    ],
  },
  {
    title: "New Exploit Kit — 'ZeroFlux' Advertised",
    source: "ExploitMarket",
    riskLevel: "Medium",
    tags: ["Exploit", "Tool", "Zero-Day"],
    lastSeen: "2025-10-08",
    confidence: 85,
    author: "ZeroDealer",
    description:
      "Exploit kit capable of remote code execution on outdated CMS systems. Includes demo video and Bitcoin address for purchase.",
    mentions: [
      { day: "Mon", mentions: 2 },
      { day: "Tue", mentions: 4 },
      { day: "Wed", mentions: 6 },
      { day: "Thu", mentions: 5 },
      { day: "Fri", mentions: 8 },
    ],
    relatedLinks: [
      "hxxp://exploitmarket.onion/zeroflux",
      "hxxp://zerodealer.onion/demo",
    ],
  },
  {
    title: "Compromised Access — Gov Subdomain Credentials",
    source: "BlackHatWorld",
    riskLevel: "High",
    tags: ["Access Sale", "Government", "Login"],
    lastSeen: "2025-10-07",
    confidence: 93,
    author: "rootx",
    description:
      "Login credentials and admin panels for government subdomains available. Seller offers verification proof via escrow.",
    mentions: [
      { day: "Mon", mentions: 4 },
      { day: "Tue", mentions: 7 },
      { day: "Wed", mentions: 10 },
      { day: "Thu", mentions: 8 },
      { day: "Fri", mentions: 12 },
    ],
    relatedLinks: [
      "hxxp://blackhatworld.onion/govsale",
      "hxxp://rootxescrow.onion",
    ],
  },
];

export default function DarkWebResearch() {
  const [loading, setLoading] = useState(false);
  const [intel, setIntel] = useState<DarkWebItem[]>([]);

  const handleScan = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setIntel(darkWebData);
    }, 1800);
  };

  return (
    <TooltipProvider>
      <div className="space-y-8 text-white mt-5">
        {/* 🔘 Button */}
        <div className="flex flex-col items-center text-center">
          <Button
            onClick={handleScan}
            disabled={loading}
            className="w-full text-white py-4 text-lg font-semibold rounded-2xl 
              bg-gradient-to-r from-purple-900/40 via-blue-900/20 to-indigo-700/20 
              hover:from-purple-700/40 hover:to-indigo-500/20 
              border border-purple-400/30 shadow-[0_0_25px_rgba(168,85,247,0.4)] 
              backdrop-blur-md transition-all"
          >
            <Eye className="w-5 h-5 mr-2" />
            {intel.length > 0
              ? "Refresh Dark Web Findings"
              : "Start Dark Web Research"}
          </Button>
          <p className="text-sm text-gray-400 mt-2 max-w-2xl">
            Initiate dark web intelligence gathering — this scan will identify
            new leaked credentials, ransomware negotiations, and marketplace
            listings from TOR sources.
          </p>
        </div>

        {loading && (
          <div className="text-center text-gray-400 mt-4 animate-pulse">
            Scanning hidden services and dark web sources...
          </div>
        )}

        {/* 🧩 Results */}
        {intel.length > 0 && (
          <div className="space-y-8 mt-8">
            {intel.map((item, idx) => (
              <Card
                key={idx}
                className={`w-full bg-white/5 rounded-2xl backdrop-blur-md shadow-lg transition-all hover:shadow-[0_0_30px_rgba(147,51,234,0.6)] ${
                  item.riskLevel === "Critical"
                    ? "border border-red-500/40"
                    : item.riskLevel === "High"
                    ? "border border-orange-500/40"
                    : "border border-yellow-400/40"
                }`}
              >
                <CardHeader>
                  <CardTitle className="flex justify-between items-start">
                    <div>
                      <span className="text-lg font-semibold">
                        {item.title}
                      </span>
                      <div className="text-xs text-gray-400 mt-1">
                        Seen on: {item.lastSeen} • Author: {item.author}
                      </div>
                    </div>
                    <Badge
                      className={`${
                        item.riskLevel === "Critical"
                          ? "bg-red-600"
                          : item.riskLevel === "High"
                          ? "bg-orange-500"
                          : "bg-yellow-400"
                      } text-white`}
                    >
                      {item.riskLevel}
                    </Badge>
                  </CardTitle>
                </CardHeader>

                <CardContent className="space-y-4">
                  <p className="text-gray-300 text-sm">{item.description}</p>

                  <div className="flex items-center justify-between">
                    <div className="text-sm text-white/70">
                      Confidence:{" "}
                      <span
                        className={`font-semibold ${
                          item.confidence > 95
                            ? "text-green-400"
                            : item.confidence > 80
                            ? "text-yellow-400"
                            : "text-red-400"
                        }`}
                      >
                        {item.confidence}%
                      </span>
                    </div>
                    <div className="w-32 h-10">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={item.mentions}>
                          <Area
                            type="monotone"
                            dataKey="mentions"
                            stroke="#8b5cf6"
                            fill="#8b5cf6"
                            fillOpacity={0.3}
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {item.tags.map((tag, i) => (
                      <Badge
                        key={i}
                        variant="outline"
                        className="border-purple-400/30 text-purple-300 bg-purple-900/10"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-3 text-sm">
                    <div className="flex items-center gap-2 text-white/70">
                      <Globe className="w-4 h-4 text-blue-400" />
                      <Tooltip>
                        <TooltipTrigger>{item.source}</TooltipTrigger>
                        <TooltipContent>Dark Web Source</TooltipContent>
                      </Tooltip>
                    </div>
                    <div className="flex items-center gap-2 text-white/70">
                      <User className="w-4 h-4 text-indigo-400" />
                      <Tooltip>
                        <TooltipTrigger>{item.author}</TooltipTrigger>
                        <TooltipContent>Threat Actor</TooltipContent>
                      </Tooltip>
                    </div>
                    <div className="flex items-center gap-2 text-white/70">
                      <ShieldAlert className="w-4 h-4 text-red-400" />
                      <Tooltip>
                        <TooltipTrigger>{item.riskLevel}</TooltipTrigger>
                        <TooltipContent>Risk Level</TooltipContent>
                      </Tooltip>
                    </div>
                  </div>

                  <div className="mt-3">
                    <div className="flex items-center gap-2 mb-2 text-sm text-gray-400">
                      <Link2 className="w-4 h-4 text-purple-400" />
                      Related Links
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {item.relatedLinks.map((link, i) => (
                        <Badge
                          key={i}
                          variant="outline"
                          className="border-purple-400/30 text-purple-300 bg-purple-900/10"
                        >
                          {link}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </TooltipProvider>
  );
}
