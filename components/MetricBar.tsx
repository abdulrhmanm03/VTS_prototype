"use client"

import { Card, CardContent } from "@/components/ui/card"

const metrics = [
  { label: "IOCs", value: "15.2K", delta: "+8%", deltaColor: "text-red-500", valueColor: "text-yellow-400" },
  { label: "Threat Actors", value: "127", delta: "+3", deltaColor: "text-yellow-400", valueColor: "text-purple-400" },
  { label: "Critical CVEs", value: "89", delta: "+15", deltaColor: "text-red-500", valueColor: "text-yellow-400" },
  { label: "Risk Score", value: "7.8", delta: "High", deltaColor: "text-orange-400", valueColor: "text-blue-400" },
  { label: "AI Confidence", value: "94.7%", delta: "Optimal", deltaColor: "text-green-500", valueColor: "text-green-400" },
  { label: "Assets Monitored", value: "2.3M", delta: "Real-time", deltaColor: "text-blue-400", valueColor: "text-cyan-400" },
  { label: "UAE Specific", value: "156", delta: "Regional", deltaColor: "text-purple-400", valueColor: "text-pink-400" },
]

interface MetricCardProps {
  label: string
  value: string | number
  delta?: string
  deltaColor?: string
  valueColor?: string
}

const MetricCard: React.FC<MetricCardProps> = ({ label, value, delta, deltaColor, valueColor }) => {
  return (
    <div className="flex flex-col items-center justify-center min-w-[120px] p-4">
      <span className={`text-2xl font-bold drop-shadow-lg ${valueColor || "text-white"}`}>{value}</span>
      {delta && <span className={`text-sm font-semibold ${deltaColor}`}>{delta}</span>}
      <span className="text-xs text-gray-400">{label}</span>
    </div>
  )
}

export default function MetricsBar() {
  return (
    <Card className="relative overflow-x-auto p-4 bg-white/5 shadow-lg backdrop-blur-md rounded-2xl border-none hide-scrollbar">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 via-blue-800/10 to-transparent pointer-events-none rounded-2xl" />
      <CardContent className="relative flex gap-6 min-w-max">
        {metrics.map((m, i) => (
          <MetricCard key={i} {...m} />
        ))}
      </CardContent>
    </Card>
  )
}