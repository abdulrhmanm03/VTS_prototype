"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ScanReport from "@/components/asm/ScanReport";

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

type ScanStatus = {
  status: "pending" | "running" | "done" | "failed";
  progress: number;
  result?: ReportData | null;
  error?: string | null;
};

export default function DemoScanAndReport() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<ScanStatus | null>(null);
  const [report, setReport] = useState<ReportData | null>(null);

  async function handleScan() {
    if (!url) return;
    setLoading(true);
    setReport(null);

    // Initialize fake scan
    setStatus({ status: "pending", progress: 0 });

    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.floor(Math.random() * 15) + 5; // increase 5-20%
      if (progress >= 100) progress = 100;

      setStatus({ status: "running", progress });

      if (progress === 100) {
        clearInterval(interval);
        fetchDemoReport();
      }
    }, 500); // every 0.5s
  }

  async function fetchDemoReport() {
    try {
      const resp = await fetch("/api/report"); // your demo endpoint
      if (!resp.ok) throw new Error("Failed to fetch demo report");
      const data: ReportData = await resp.json();

      setReport(data);
      setStatus({ status: "done", progress: 100 });
    } catch (err) {
      console.error(err);
      setStatus({
        status: "failed",
        progress: 100,
        error: (err as Error).message,
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <Card className="relative border-none text-white overflow-hidden rounded-2xl bg-white/5 shadow-lg backdrop-blur-md hover:shadow-[0_0_30px_rgba(59,130,246,0.6)] transition-shadow duration-300">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-blue-800/10 to-transparent pointer-events-none" />
        <div className="relative z-10">
          <CardHeader>
            <CardTitle className="text-white">Demo Scan & Report</CardTitle>
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
              {loading
                ? status?.status === "running"
                  ? `Scanning... ${status.progress}%`
                  : "Initializing..."
                : "Scan and Generate Report"}
            </Button>

            {status && status.status !== "done" && (
              <div className="text-sm text-blue-300">
                Status: {status.status} ({status.progress}%)
              </div>
            )}

            {status?.status === "failed" && (
              <div className="text-sm text-red-400">
                Scan failed: {status.error || "unknown error"}
              </div>
            )}
          </CardContent>
        </div>
      </Card>

      {report && <ScanReport data={report} />}
    </div>
  );
}
