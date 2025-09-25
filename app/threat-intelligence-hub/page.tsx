"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye } from "lucide-react";
import ScanReport from "@/components/ScanReport";
import GlobalThreatHeatMap from "@/components/Heat_map";
import { useSearchParams, useRouter } from "next/navigation";

type IOC = {
  type: "IP Address" | "Domain" | "File Hash";
  value: string;
  severity: "High" | "Medium" | "Low";
  firstSeen: string;
  lastSeen: string;
  source: string;
  tags: string[];
};

type Alert = {
  alert: string;
  solution: string;
  confidence: string;
  url: string;
  risk: string;
};

type ReportData = {
  name: string;
  ip: string;
  zap_scan: {
    alerts_count: number;
    alerts: Alert[];
  };
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
  const [report, setReport] = useState<ReportData | null>(null);
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const searchParams = useSearchParams();
  const router = useRouter();
  const tabParam = searchParams.get("tab");

  const [defaultTab, setDefaultTab] = useState("iocs"); // fallback

  useEffect(() => {
    if (tabParam) {
      setDefaultTab(tabParam);
    } else {
      setDefaultTab("iocs");
    }
  }, [tabParam]);

  const handleTabChange = (tab: string) => {
    router.replace(`?tab=${tab}`); // update the URL param without reloading
    setDefaultTab(tab);
  };

  async function handleScan() {
    if (!url) return;
    setLoading(true);
    setReport(null);

    try {
      const resp = await fetch("http://127.0.0.1:8000/scan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });

      if (!resp.ok) throw new Error(`Scan failed: ${resp.status}`);

      const data: ReportData = await resp.json();
      setReport(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

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
          <TabsTrigger value="iocs" className="flex-1 text-white/90 bg-white/5 backdrop-blur-md rounded-xl px-4 py-2 text-sm font-medium hover:bg-white/10 hover:shadow-[0_0_20px_rgba(59,130,246,0.5)] transition-all duration-300">
            IOCs & Indicators
          </TabsTrigger>
          <TabsTrigger value="report" className="flex-1 text-white/90 bg-white/5 backdrop-blur-md rounded-xl px-4 py-2 text-sm font-medium hover:bg-white/10 hover:shadow-[0_0_20px_rgba(59,130,246,0.5)] transition-all duration-300">
            Report & Analytics
          </TabsTrigger>
          <TabsTrigger value="heatmap" className="flex-1 text-white/90 bg-white/5 backdrop-blur-md rounded-xl px-4 py-2 text-sm font-medium hover:bg-white/10 hover:shadow-[0_0_20px_rgba(59,130,246,0.5)] transition-all duration-300">
            Global Heat Map
          </TabsTrigger>
        </TabsList>

        {/* IOCs Tab */}
        <TabsContent value="iocs" className="mt-4 space-y-4">
          {iocs.map((ioc, idx) => (
            <Card key={idx} className="relative border-none text-white overflow-hidden rounded-2xl bg-white/5 shadow-lg backdrop-blur-md hover:shadow-[0_0_30px_rgba(59,130,246,0.6)] transition-shadow duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-blue-800/10 to-transparent pointer-events-none" />
              <div className="relative z-10">
                <CardHeader className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">{ioc.type}</Badge>
                    <span className="font-mono font-medium">{ioc.value}</span>
                    <Badge className={ioc.severity === "High" ? "bg-red-500 text-white" : ioc.severity === "Medium" ? "bg-yellow-500 text-white" : "bg-green-500 text-white"}>
                      {ioc.severity}
                    </Badge>
                  </div>
                  <Button variant="outline" size="sm" className="text-white border-white/20 hover:border-blue-400 hover:text-white transition">
                    <Eye className="h-4 w-4 mr-1" /> Details
                  </Button>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-white/70">
                    First: {ioc.firstSeen} &nbsp;•&nbsp; Last: {ioc.lastSeen} &nbsp;•&nbsp; Source: {ioc.source}
                  </p>
                  <div className="flex gap-2 mt-2">
                    {ioc.tags.map((tag, i) => (
                      <Badge key={i} variant="outline" className="border-white/20 text-white/80">
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
        <TabsContent value="report" className="mt-4 space-y-6">
          <Card className="relative border-none text-white overflow-hidden rounded-2xl bg-white/5 shadow-lg backdrop-blur-md hover:shadow-[0_0_30px_rgba(59,130,246,0.6)] transition-shadow duration-300">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-blue-800/10 to-transparent pointer-events-none" />
            <div className="relative z-10">
              <CardHeader>
                <CardTitle className="text-white">Scan & Generate Report</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col space-y-4">
                <Input
                  type="url"
                  placeholder="Enter URL (e.g. https://example.com)"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="bg-white/5 backdrop-blur-md text-white placeholder-white/50 border-none rounded-lg shadow-[0_0_15px_rgba(59,130,246,0.4)] focus:shadow-[0_0_25px_rgba(59,130,246,0.6)] focus:outline-none transition-all duration-300"
                />
                <Button
                  onClick={handleScan}
                  disabled={loading || !url}
                  className="bg-white/10 hover:bg-white/20 text-white shadow-[0_0_10px_rgba(59,130,246,0.5)] hover:shadow-[0_0_20px_rgba(59,130,246,0.7)] transition-all duration-300"
                >
                  {loading ? "Scanning..." : "Scan and Generate Report"}
                </Button>
              </CardContent>
            </div>
          </Card>

          {report && <ScanReport data={report} />}
        </TabsContent>

        {/* Global Heat Map Tab */}
        <TabsContent value="heatmap" className="mt-4">
          <GlobalThreatHeatMap />
        </TabsContent>
      </Tabs>
    </div>
  );
}