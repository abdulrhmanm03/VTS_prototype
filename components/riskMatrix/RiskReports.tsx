"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";

const reports = [
  { title: "Q1 2025 Risk Summary", date: "Apr 10, 2025", type: "Quarterly" },
  { title: "Incident Review Report", date: "Jun 20, 2025", type: "Incident" },
  {
    title: "Compliance Gap Analysis",
    date: "Aug 05, 2025",
    type: "Compliance",
  },
];

export default function RiskReports() {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-white flex items-center">
        <FileText className="h-5 w-5 mr-2 text-blue-400" /> Risk Reports Archive
      </h2>
      <p className="text-sm text-gray-400">
        Access historical and compliance reports
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {reports.map((r) => (
          <Card
            key={r.title}
            className="bg-white/5 border-none rounded-2xl hover:bg-white/10 hover:shadow-[0_0_20px_rgba(59,130,246,0.4)] transition-all"
          >
            <CardHeader>
              <CardTitle className="text-blue-400 text-base">
                {r.title}
              </CardTitle>
              <p className="text-xs text-gray-400">
                {r.type} · {r.date}
              </p>
            </CardHeader>
            <CardContent>
              <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white">
                <FileText className="mr-2 h-4 w-4" /> View Report
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
