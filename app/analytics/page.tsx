"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"; // shadcn Input
import { useState } from "react";
import ScanReport from "@/components/ScanReport";
import GlobalThreatHeatMap from "@/components/HeatMap";

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

export default function AnalyticsPage() {
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState<ReportData | null>(null);
  const [url, setUrl] = useState("");

  async function handleScan() {
    if (!url) return; // don’t call scan if no URL entered
    setLoading(true);
    setReport(null);

    try {
      const resp = await fetch("http://127.0.0.1:8000/scan", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
      });

      if (!resp.ok) {
        throw new Error(`Scan failed: ${resp.status} ${resp.statusText}`);
      }

      const data: ReportData = await resp.json();
      setReport(data);
    } catch (error) {
      console.error("Failed to scan:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Analytics Dashboard</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col space-y-4">
          <Input
            type="url"
            placeholder="Enter URL (e.g. https://example.com)"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <Button onClick={handleScan} disabled={loading || !url}>
            {loading ? "Scanning..." : "Scan and Generate Report"}
          </Button>
        </CardContent>
      </Card>

      {report && <ScanReport data={report} />}
      
      <GlobalThreatHeatMap />
    </div>
  );
}
// numberupifthatrighteachlatefirstlongworknothroughcallnationsince