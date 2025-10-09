"use client"

import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Search, Filter, RefreshCcw } from "lucide-react"

import RemediationPriorities from "@/components/riskMatrix/RemediationPriorities"
import HistoricalTrends from "@/components/riskMatrix/HistoricalTrends"
import Benchmarks from "@/components/riskMatrix/Benchmarks"
import RiskReports from "@/components/riskMatrix/RiskReports"

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

      {/* Search Bar and Buttons */}
      <div className="flex items-center space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search risk areas, recommendations..."
            className="pl-8 bg-white/10 border-none rounded-lg text-white placeholder-gray-400"
          />
        </div>
        <Button variant="outline" className="bg-white/10 hover:bg-white/20 border-none">
          <Filter className="h-4 w-4" />
        </Button>
        <Button className="bg-blue-500 hover:bg-blue-600 shadow-lg">
          <RefreshCcw className="mr-2 h-4 w-4" />
          Recalculate Scores
        </Button>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="remediation-priorities" className="mt-4">
        <TabsList className="bg-white/10 p-1 rounded-lg">
          <TabsTrigger value="remediation-priorities">Remediation Priorities</TabsTrigger>
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
  )
}