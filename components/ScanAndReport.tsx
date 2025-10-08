"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ScanReport from "@/components/ScanReport";

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
  id: string;
  status: "pending" | "running" | "done" | "failed";
  progress: number;
  result?: ReportData | null;
  error?: string | null;
};

export default function ScanAndReport() {
  const [url, setUrl] = useState("");
  const [taskId, setTaskId] = useState<string | null>(null);
  const [status, setStatus] = useState<ScanStatus | null>(null);
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState<ReportData | null>(null);

  async function handleScan() {
    if (!url) return;
    setLoading(true);
    setReport(null);
    setTaskId(null);
    setStatus(null);

    try {
      // Step 1: create scan task
      const resp = await fetch("http://127.0.0.1:8000/scan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });

      if (!resp.ok) throw new Error(`Scan creation failed: ${resp.status}`);

      const data = await resp.json();
      setTaskId(data.task_id);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  }

  // Step 2: poll scan progress
  useEffect(() => {
    if (!taskId) return;

    const interval = setInterval(async () => {
      try {
        const resp = await fetch(`http://127.0.0.1:8000/scan/${taskId}`);
        if (!resp.ok) throw new Error(`Failed to get status`);
        const data: ScanStatus = await resp.json();
        setStatus(data);

        if (data.status === "done") {
          setReport(data.result || null);
          setLoading(false);
          clearInterval(interval);
        } else if (data.status === "failed") {
          setLoading(false);
          clearInterval(interval);
        }
      } catch (err) {
        console.error("Polling error:", err);
        setLoading(false);
        clearInterval(interval);
      }
    }, 5000); // poll every 5s

    return () => clearInterval(interval);
  }, [taskId]);

  const progress =
    status && status.progress
      ? Math.min(status.progress, 100)
      : loading
      ? 0
      : 0;

  return (
    <div className="space-y-6">
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
              {loading
                ? status?.status === "running"
                  ? `Scanning... ${progress}%`
                  : "Initializing..."
                : "Scan and Generate Report"}
            </Button>

            {/* Optional progress indicator */}
            {status && status.status !== "done" && (
              <div className="text-sm text-blue-300">
                Status: {status.status} ({progress}%)
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