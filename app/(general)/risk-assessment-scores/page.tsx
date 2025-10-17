"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

import RemediationPriorities from "@/components/riskMatrix/RemediationPriorities";
import HistoricalTrends from "@/components/riskMatrix/HistoricalTrends";
import Benchmarks from "@/components/riskMatrix/Benchmarks";
import RiskReports from "@/components/riskMatrix/RiskReports";

export default function RiskAssessmentPage() {
  return (
    <div className="flex flex-col gap-6 p-6 min-h-screen text-white">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-4xl font-bold text-blue-400 drop-shadow-[0_0_12px_rgba(59,130,246,0.9)]">
          Risk Assessment Scores
        </h1>
        <p className="text-gray-400 ml-1">
          Comprehensive risk analysis and organizational security posture
        </p>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="remediation-priorities" className="mt-4">
        <TabsList className="bg-white/10 p-1 rounded-lg">
          <TabsTrigger value="remediation-priorities">
            Remediation Priorities
          </TabsTrigger>
          <TabsTrigger value="historical-trends">Historical Trends</TabsTrigger>
          <TabsTrigger value="benchmarks">Benchmarks</TabsTrigger>
          <TabsTrigger value="risk-reports">Risk Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="remediation-priorities" className="mt-6">
          <RemediationPriorities />
        </TabsContent>

        <TabsContent value="historical-trends" className="mt-6">
          <HistoricalTrends />
        </TabsContent>

        <TabsContent value="benchmarks" className="mt-6">
          <Benchmarks />
        </TabsContent>

        <TabsContent value="risk-reports" className="mt-6">
          <RiskReports />
        </TabsContent>
      </Tabs>
    </div>
  );
}
