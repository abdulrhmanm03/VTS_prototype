"use client"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { ShieldCheck, AlertTriangle } from "lucide-react"

export default function RiskAssessment() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <Card className="bg-white/5 border-none text-white rounded-2xl backdrop-blur-md shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShieldCheck className="text-green-400" /> Overall Security Posture
          </CardTitle>
        </CardHeader>
        <CardContent className="text-gray-300">
          Risk Level: <span className="text-green-400 font-semibold">Moderate</span><br />
          Most assets have been patched within SLA.
        </CardContent>
      </Card>

      <Card className="bg-white/5 border-none text-white rounded-2xl backdrop-blur-md shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="text-red-400" /> High-Risk Assets
          </CardTitle>
        </CardHeader>
        <CardContent className="text-gray-300">
          5 servers with unpatched CVEs older than 90 days. Recommend immediate action.
        </CardContent>
      </Card>
    </div>
  )
}