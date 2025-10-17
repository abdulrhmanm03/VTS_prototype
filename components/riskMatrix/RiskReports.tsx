"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";

const reports = [
  {
    title: "Q1 2025 Risk Summary",
    date: "Apr 10, 2025",
    type: "Quarterly",
    description:
      "Summary of risks for Q1 2025 across all departments, highlighting key metrics, incidents, and compliance gaps.",
    metrics: [
      { category: "Financial Risk", value: "Low" },
      { category: "Operational Risk", value: "Medium" },
      { category: "Compliance Risk", value: "High" },
      { category: "Cybersecurity Risk", value: "Medium" },
      { category: "Legal Risk", value: "Low" },
      { category: "Supply Chain Risk", value: "High" },
      { category: "Reputation Risk", value: "Medium" },
      { category: "Employee Turnover Risk", value: "Low" },
      { category: "Market Risk", value: "High" },
      { category: "Project Risk", value: "Medium" },
    ],
  },
  {
    title: "Incident Review Report",
    date: "Jun 20, 2025",
    type: "Incident",
    description:
      "Detailed review of security incidents in H1 2025, including resolution status and impact on operations.",
    metrics: [
      { category: "Incidents Reported", value: 12 },
      { category: "Resolved", value: 10 },
      { category: "Pending", value: 2 },
      { category: "Critical", value: 3 },
      { category: "High", value: 5 },
      { category: "Medium", value: 4 },
      { category: "Low", value: 0 },
      { category: "Downtime Hours", value: 15 },
      { category: "Financial Impact", value: "$25,000" },
      { category: "Lessons Learned", value: 8 },
    ],
  },
  {
    title: "Compliance Gap Analysis",
    date: "Aug 05, 2025",
    type: "Compliance",
    description:
      "Assessment of compliance gaps across departments with suggested remediation steps and deadlines.",
    metrics: [
      { category: "Policies Missing", value: 3 },
      { category: "Training Needed", value: 5 },
      { category: "Audits Pending", value: 2 },
      { category: "High Priority Gaps", value: 1 },
      { category: "Medium Priority Gaps", value: 4 },
      { category: "Low Priority Gaps", value: 5 },
      { category: "Departments Affected", value: 6 },
      { category: "Follow-up Required", value: 4 },
      { category: "Completed Actions", value: 7 },
      { category: "Upcoming Reviews", value: 2 },
    ],
  },
];

export default function RiskReports() {
  const [selectedReport, setSelectedReport] = useState<
    (typeof reports)[0] | null
  >(null);

  return (
    <div className="space-y-6">
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
              <Button
                className="w-full bg-blue-500 hover:bg-blue-600 text-white"
                onClick={() => setSelectedReport(r)}
              >
                <FileText className="mr-2 h-4 w-4" /> View Report
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {selectedReport && (
        <Card className="bg-white/5 border-none rounded-2xl p-6 mt-4">
          <CardHeader>
            <CardTitle className="text-blue-400 text-lg">
              {selectedReport.title}
            </CardTitle>
            <p className="text-sm text-gray-400">
              {selectedReport.type} · {selectedReport.date}
            </p>
          </CardHeader>
          <CardContent className="mt-4">
            <p className="text-gray-200 mb-4">{selectedReport.description}</p>
            <div className="overflow-x-auto hide-scrollbar max-h-[400px]">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-gray-600">
                    <th className="py-2 px-4 text-gray-400">Category</th>
                    <th className="py-2 px-4 text-gray-400">Value</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedReport.metrics.map((m, idx) => (
                    <tr key={idx} className="border-b border-gray-700">
                      <td className="py-2 px-4 text-gray-200">{m.category}</td>
                      <td className="py-2 px-4 text-gray-200">{m.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
