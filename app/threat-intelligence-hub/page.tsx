"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import GlobalThreatHeatMap from "@/components/HeatMap";
import { useSearchParams, useRouter } from "next/navigation";
import DarkWebProfilePage from "@/components/ThreatActor";

type IOC = {
  type: "IP Address" | "Domain" | "File Hash";
  value: string;
  severity: "High" | "Medium" | "Low";
  firstSeen: string;
  lastSeen: string;
  source: string;
  tags: string[];
};

const iocs: IOC[] = [
  {
    type: "IP Address",
    value: "192.168.1.100",
    severity: "High",
    firstSeen: "2024-01-15",
    lastSeen: "2024-01-20",
    source: "Internal Analysis",
    tags: ["Malware", "C2"],
  },
  {
    type: "Domain",
    value: "malicious-domain.com",
    severity: "Medium",
    firstSeen: "2024-01-18",
    lastSeen: "2024-01-19",
    source: "External Feed",
    tags: ["Phishing", "Brand Abuse"],
  },
  {
    type: "File Hash",
    value: "a1b2c3d4e5f6...",
    severity: "High",
    firstSeen: "2024-01-17",
    lastSeen: "2024-01-20",
    source: "Internal Analysis",
    tags: [],
  },
];

export default function ThreatIntelPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const tabParam = searchParams.get("tab");
  const [defaultTab, setDefaultTab] = useState("overview");

  useEffect(() => {
    if (tabParam) {
      setDefaultTab(tabParam);
    } else {
      setDefaultTab("overview");
    }
  }, [tabParam]);

  const handleTabChange = (tab: string) => {
    router.replace(`?tab=${tab}`);
    setDefaultTab(tab);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Page Title */}
      <div>
        <h1 className="text-4xl font-bold text-blue-400 drop-shadow-[0_0_12px_rgba(59,130,246,0.9)]">
          Threat Intelligence Hub
        </h1>
        <p className="text-muted-foreground">
          Centralized management and analysis of threat intelligence data
        </p>
      </div>

      {/* Tabs */}
      <Tabs value={defaultTab} onValueChange={handleTabChange}>
        <TabsList className="relative flex space-x-2 bg-white/5 backdrop-blur-md rounded-2xl p-1 shadow-lg hover:shadow-[0_0_30px_rgba(59,130,246,0.6)] transition-shadow duration-300 border-none">
          <TabsTrigger value="overview" className="flex-1 text-white/90 bg-white/5 backdrop-blur-md rounded-xl px-4 py-2 text-sm font-medium hover:bg-white/10 hover:shadow-[0_0_20px_rgba(59,130,246,0.5)] transition-all duration-300">
            Overview
          </TabsTrigger>
          <TabsTrigger value="landscape" className="flex-1 text-white/90 bg-white/5 backdrop-blur-md rounded-xl px-4 py-2 text-sm font-medium hover:bg-white/10 hover:shadow-[0_0_20px_rgba(59,130,246,0.5)] transition-all duration-300">
            Threat Landscape
          </TabsTrigger>
          <TabsTrigger value="heatmap" className="flex-1 text-white/90 bg-white/5 backdrop-blur-md rounded-xl px-4 py-2 text-sm font-medium hover:bg-white/10 hover:shadow-[0_0_20px_rgba(59,130,246,0.5)] transition-all duration-300">
            Threat Heat Map
          </TabsTrigger>
          <TabsTrigger value="enrichment" className="flex-1 text-white/90 bg-white/5 backdrop-blur-md rounded-xl px-4 py-2 text-sm font-medium hover:bg-white/10 hover:shadow-[0_0_20px_rgba(59,130,246,0.5)] transition-all duration-300">
            Enrichment
          </TabsTrigger>
          <TabsTrigger value="threat-actors" className="flex-1 text-white/90 bg-white/5 backdrop-blur-md rounded-xl px-4 py-2 text-sm font-medium hover:bg-white/10 hover:shadow-[0_0_20px_rgba(59,130,246,0.5)] transition-all duration-300">
            Threat Actors
          </TabsTrigger>
        </TabsList>

        {/* IOCs Tab */}
        <TabsContent value="overview" className="mt-4 space-y-4">
          {iocs.map((ioc, idx) => (
            <Card
              key={idx}
              className="relative border-none text-white overflow-hidden rounded-2xl bg-white/5 shadow-lg backdrop-blur-md hover:shadow-[0_0_30px_rgba(59,130,246,0.6)] transition-shadow duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-blue-800/10 to-transparent pointer-events-none" />
              <div className="relative z-10">
                <CardHeader className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">{ioc.type}</Badge>
                    <span className="font-mono font-medium">{ioc.value}</span>
                    <Badge
                      className={
                        ioc.severity === "High"
                          ? "bg-red-500 text-white"
                          : ioc.severity === "Medium"
                          ? "bg-yellow-500 text-white"
                          : "bg-green-500 text-white"
                      }
                    >
                      {ioc.severity}
                    </Badge>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-white border-white/20 hover:border-blue-400 hover:text-white transition"
                  >
                    <Eye className="h-4 w-4 mr-1" /> Details
                  </Button>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-white/70">
                    First: {ioc.firstSeen} &nbsp;•&nbsp; Last: {ioc.lastSeen}{" "}
                    &nbsp;•&nbsp; Source: {ioc.source}
                  </p>
                  <div className="flex gap-2 mt-2">
                    {ioc.tags.map((tag, i) => (
                      <Badge
                        key={i}
                        variant="outline"
                        className="border-white/20 text-white/80"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </div>
            </Card>
          ))}
        </TabsContent>

        {/* Report & Analytics Tab */}
        <TabsContent value="landscape" className="mt-4 space-y-6">
          <Card className="p-6 bg-white/5 text-white rounded-2xl shadow-lg">
            <p>This is the Threat Landscape page.</p>
          </Card>
        </TabsContent>

        {/* Global Heat Map Tab */}
        <TabsContent value="heatmap" className="mt-4">
          <GlobalThreatHeatMap />
        </TabsContent>

        {/* Enrichment Tab */}
        <TabsContent value="enrichment" className="mt-4">
          <Card className="p-6 bg-white/5 text-white rounded-2xl shadow-lg">
            <p>This is the Enrichment page.</p>
          </Card>
        </TabsContent>

        {/* Threat Actors Tab */}
        <TabsContent value="threat-actors" className="mt-4">
          <DarkWebProfilePage />
        </TabsContent>
      </Tabs>
    </div>
  );
}