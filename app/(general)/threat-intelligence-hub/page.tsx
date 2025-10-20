"use client";

import { useEffect, useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  AlertTriangle,
  Bug,
  DollarSign,
  FileText,
  Globe2,
  Shield,
  Target,
  Users,
  Lock,
} from "lucide-react";
import ThreatIntelOverview from "@/components/threat_intel/Overview";
import ThreatLandscape from "@/components/threat_intel/Landscape";
import Enrichment from "@/components/threat_intel/Enrishment";
import ThreatActors from "@/components/threat_intel/ThreatActor";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ThreatIntelPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const tabParam = searchParams.get("tab");
  const [defaultTab, setDefaultTab] = useState("overview");

  useEffect(() => {
    setDefaultTab(tabParam || "overview");
  }, [tabParam]);

  const handleTabChange = (tab: string) => {
    router.replace(`?tab=${tab}`);
    setDefaultTab(tab);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-blue-400 drop-shadow-[0_0_12px_rgba(59,130,246,0.9)]">
            Threat Intelligence Hub
          </h1>
          <p className="text-muted-foreground">
            Centralized management and analysis of threat intelligence data
          </p>
        </div>

        {/* Fake Generate Report button */}
        <Button
          variant="outline"
          className="bg-blue-500/10 border border-blue-400/30 text-blue-300 hover:bg-blue-500/20 hover:text-blue-200 transition-all duration-300 rounded-xl shadow-md hover:shadow-[0_0_20px_rgba(59,130,246,0.5)]"
        >
          <FileText className="w-4 h-4 mr-2" />
          Generate Report
        </Button>
      </div>

      <Tabs value={defaultTab} onValueChange={handleTabChange}>
        <TabsList className="relative flex space-x-2 bg-white/5 backdrop-blur-md rounded-2xl p-1 shadow-lg hover:shadow-[0_0_30px_rgba(59,130,246,0.6)] transition-shadow duration-300 border-none">
          <TabsTrigger
            value="overview"
            className="flex-1 text-white/90 bg-white/5 rounded-xl px-4 py-2 text-sm font-medium hover:bg-white/10 transition-all"
          >
            Overview
          </TabsTrigger>
          <TabsTrigger
            value="landscape"
            className="flex-1 text-white/90 bg-white/5 rounded-xl px-4 py-2 text-sm font-medium hover:bg-white/10 transition-all"
          >
            Threat Landscape
          </TabsTrigger>
          <TabsTrigger
            value="enrichment"
            className="flex-1 text-white/90 bg-white/5 rounded-xl px-4 py-2 text-sm font-medium hover:bg-white/10 transition-all"
          >
            Enrichment
          </TabsTrigger>
          <TabsTrigger
            value="threat-actors"
            className="flex-1 text-white/90 bg-white/5 rounded-xl px-4 py-2 text-sm font-medium hover:bg-white/10 transition-all"
          >
            Threat Actors
          </TabsTrigger>
          <TabsTrigger
            value="malware"
            className="flex-1 text-white/90 bg-white/5 rounded-xl px-4 py-2 text-sm font-medium hover:bg-white/10 transition-all"
          >
            Malware Intelligence
          </TabsTrigger>
          <TabsTrigger
            value="ransomware"
            className="flex-1 text-white/90 bg-white/5 rounded-xl px-4 py-2 text-sm font-medium hover:bg-white/10 transition-all"
          >
            Ransomware Tracker
          </TabsTrigger>
          <TabsTrigger
            value="fraud"
            className="flex-1 text-white/90 bg-white/5 rounded-xl px-4 py-2 text-sm font-medium hover:bg-white/10 transition-all"
          >
            Fraud Intelligence
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-4">
          <ThreatIntelOverview />
        </TabsContent>

        <TabsContent value="landscape" className="mt-4">
          <ThreatLandscape />
        </TabsContent>

        <TabsContent value="enrichment" className="mt-4">
          <Enrichment />
        </TabsContent>

        <TabsContent value="threat-actors" className="mt-4">
          <ThreatActors />
        </TabsContent>

        <TabsContent value="malware" className="space-y-6">
          <div className="grid grid-cols-4 gap-4 mb-6 mt-6">
            {[
              {
                label: "Active Families",
                value: "847",
                icon: Bug,
                color: "red",
              },
              {
                label: "New Samples",
                value: "2,341",
                icon: AlertTriangle,
                color: "orange",
              },
              {
                label: "C2 Servers",
                value: "1,523",
                icon: Globe2,
                color: "purple",
              },
              {
                label: "Detection Rate",
                value: "94%",
                icon: Shield,
                color: "green",
              },
            ].map((stat, idx) => (
              <Card key={idx} className="bg-slate-900/50 border-slate-700">
                <CardContent className="p-6">
                  <div
                    className={`w-10 h-10 rounded-lg bg-${stat.color}-500/20 flex items-center justify-center mb-3`}
                  >
                    <stat.icon className={`w-5 h-5 text-${stat.color}-400`} />
                  </div>
                  <div className="text-3xl font-bold text-white">
                    {stat.value}
                  </div>
                  <div className="text-sm text-slate-400">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="bg-slate-900/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">
                Top Malware Families (Last 30 Days)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    name: "Emotet",
                    samples: 4521,
                    trend: "+12%",
                    severity: "critical",
                    type: "Trojan",
                  },
                  {
                    name: "TrickBot",
                    samples: 3847,
                    trend: "+8%",
                    severity: "high",
                    type: "Banking Trojan",
                  },
                  {
                    name: "Qakbot",
                    samples: 3234,
                    trend: "-5%",
                    severity: "high",
                    type: "Trojan",
                  },
                  {
                    name: "IcedID",
                    samples: 2891,
                    trend: "+15%",
                    severity: "medium",
                    type: "Banking Trojan",
                  },
                  {
                    name: "Dridex",
                    samples: 2456,
                    trend: "+3%",
                    severity: "medium",
                    type: "Banking Trojan",
                  },
                ].map((malware, idx) => (
                  <div
                    key={idx}
                    className="bg-slate-800/50 rounded-lg p-4 border border-slate-700"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <span className="text-lg font-bold text-white">
                            {malware.name}
                          </span>
                          <span
                            className={`px-2 py-1 rounded text-xs font-bold ${
                              malware.severity === "critical"
                                ? "bg-red-500/20 text-red-400"
                                : malware.severity === "high"
                                ? "bg-orange-500/20 text-orange-400"
                                : "bg-yellow-500/20 text-yellow-400"
                            }`}
                          >
                            {malware.severity}
                          </span>
                          <span className="text-xs text-slate-500">
                            {malware.type}
                          </span>
                        </div>
                        <div className="flex items-center space-x-4">
                          <span className="text-sm text-slate-400">
                            {malware.samples.toLocaleString()} samples
                          </span>
                          <span
                            className={`text-sm ${
                              malware.trend.startsWith("+")
                                ? "text-red-400"
                                : "text-green-400"
                            }`}
                          >
                            {malware.trend}
                          </span>
                        </div>
                      </div>
                      <button className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-sm">
                        View Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ransomware" className="space-y-6">
          <div className="grid grid-cols-4 gap-4 mb-6 mt-6">
            {[
              {
                label: "Active Groups",
                value: "67",
                icon: Users,
                color: "red",
              },
              {
                label: "Recent Attacks",
                value: "234",
                icon: AlertTriangle,
                color: "orange",
              },
              {
                label: "Avg Ransom",
                value: "$2.4M",
                icon: DollarSign,
                color: "yellow",
              },
              {
                label: "Leak Sites",
                value: "42",
                icon: Globe2,
                color: "purple",
              },
            ].map((stat, idx) => (
              <Card key={idx} className="bg-slate-900/50 border-slate-700">
                <CardContent className="p-6">
                  <div
                    className={`w-10 h-10 rounded-lg bg-${stat.color}-500/20 flex items-center justify-center mb-3`}
                  >
                    <stat.icon className={`w-5 h-5 text-${stat.color}-400`} />
                  </div>
                  <div className="text-3xl font-bold text-white">
                    {stat.value}
                  </div>
                  <div className="text-sm text-slate-400">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="bg-slate-900/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">
                Active Ransomware Groups
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    name: "LockBit 3.0",
                    victims: 89,
                    activity: "Very High",
                    ransom: "$1.5M - $5M",
                    status: "active",
                  },
                  {
                    name: "ALPHV/BlackCat",
                    victims: 67,
                    activity: "High",
                    ransom: "$2M - $10M",
                    status: "active",
                  },
                  {
                    name: "Royal",
                    victims: 45,
                    activity: "High",
                    ransom: "$500K - $3M",
                    status: "active",
                  },
                  {
                    name: "Play",
                    victims: 34,
                    activity: "Medium",
                    ransom: "$1M - $4M",
                    status: "active",
                  },
                  {
                    name: "BianLian",
                    victims: 28,
                    activity: "Medium",
                    ransom: "$300K - $2M",
                    status: "monitoring",
                  },
                ].map((group, idx) => (
                  <div
                    key={idx}
                    className="bg-slate-800/50 rounded-lg p-4 border border-slate-700"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <span className="text-lg font-bold text-white">
                            {group.name}
                          </span>
                          <span
                            className={`px-2 py-1 rounded text-xs font-bold ${
                              group.status === "active"
                                ? "bg-red-500/20 text-red-400"
                                : "bg-yellow-500/20 text-yellow-400"
                            }`}
                          >
                            {group.status}
                          </span>
                        </div>
                        <div className="grid grid-cols-3 gap-4 text-sm">
                          <div>
                            <span className="text-slate-400">Victims: </span>
                            <span className="text-white font-semibold">
                              {group.victims}
                            </span>
                          </div>
                          <div>
                            <span className="text-slate-400">Activity: </span>
                            <span className="text-red-400 font-semibold">
                              {group.activity}
                            </span>
                          </div>
                          <div>
                            <span className="text-slate-400">Ransom: </span>
                            <span className="text-white font-semibold">
                              {group.ransom}
                            </span>
                          </div>
                        </div>
                      </div>
                      <button className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm">
                        Track Group
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="fraud" className="space-y-6">
          <div className="grid grid-cols-4 gap-4 mb-6 mt-6">
            {[
              {
                label: "Phishing Sites",
                value: "12,847",
                icon: AlertTriangle,
                color: "red",
              },
              {
                label: "Scam Campaigns",
                value: "3,421",
                icon: Target,
                color: "orange",
              },
              {
                label: "Compromised Cards",
                value: "89K",
                icon: Lock,
                color: "yellow",
              },
              {
                label: "Fraud Networks",
                value: "234",
                icon: Users,
                color: "purple",
              },
            ].map((stat, idx) => (
              <Card key={idx} className="bg-slate-900/50 border-slate-700">
                <CardContent className="p-6">
                  <div
                    className={`w-10 h-10 rounded-lg bg-${stat.color}-500/20 flex items-center justify-center mb-3`}
                  >
                    <stat.icon className={`w-5 h-5 text-${stat.color}-400`} />
                  </div>
                  <div className="text-3xl font-bold text-white">
                    {stat.value}
                  </div>
                  <div className="text-sm text-slate-400">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-6">
            <Card className="bg-slate-900/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">
                  Top Phishing Targets
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { brand: "Microsoft", count: 4521, trend: "+23%" },
                    { brand: "PayPal", count: 3847, trend: "+18%" },
                    { brand: "Amazon", count: 3234, trend: "+15%" },
                    { brand: "Apple", count: 2891, trend: "+12%" },
                    { brand: "Banking", count: 2456, trend: "+9%" },
                  ].map((target, idx) => (
                    <div
                      key={idx}
                      className="bg-slate-800/50 rounded-lg p-3 border border-slate-700"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-white font-semibold">
                          {target.brand}
                        </span>
                        <div className="flex items-center space-x-3">
                          <span className="text-slate-400">
                            {target.count.toLocaleString()} sites
                          </span>
                          <span className="text-red-400 text-sm">
                            {target.trend}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-900/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">
                  Recent Fraud Campaigns
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    {
                      title: "Tax Refund Scam",
                      victims: "12K+",
                      status: "active",
                    },
                    {
                      title: "Crypto Investment Fraud",
                      victims: "8K+",
                      status: "active",
                    },
                    {
                      title: "Tech Support Scam",
                      victims: "6K+",
                      status: "monitoring",
                    },
                    {
                      title: "Romance Scam Network",
                      victims: "4K+",
                      status: "active",
                    },
                    {
                      title: "Job Offer Phishing",
                      victims: "3K+",
                      status: "monitoring",
                    },
                  ].map((campaign, idx) => (
                    <div
                      key={idx}
                      className="bg-slate-800/50 rounded-lg p-3 border border-slate-700"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-white font-semibold text-sm">
                          {campaign.title}
                        </span>
                        <span
                          className={`px-2 py-1 rounded text-xs font-bold ${
                            campaign.status === "active"
                              ? "bg-red-500/20 text-red-400"
                              : "bg-yellow-500/20 text-yellow-400"
                          }`}
                        >
                          {campaign.status}
                        </span>
                      </div>
                      <span className="text-xs text-slate-400">
                        {campaign.victims} potential victims
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
