"use client"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Activity } from "lucide-react"

const alerts = [
  {
    title: "Suspicious Domain Registration",
    desc: "Domain similar to company brand detected",
    severity: "Critical",
    color: "bg-red-600",
    time: "2 minutes ago",
  },
  {
    title: "Data Leak on Dark Web",
    desc: "Employee credentials found on underground forum",
    severity: "High",
    color: "bg-orange-500",
    time: "15 minutes ago",
  },
  {
    title: "APT Campaign Targeting Industry",
    desc: "New campaign detected targeting financial sector",
    severity: "High",
    color: "bg-orange-500",
    time: "1 hour ago",
  },
  {
    title: "Phishing Attempt Detected",
    desc: "Email impersonating CEO sent to multiple employees",
    severity: "Medium",
    color: "bg-yellow-500",
    time: "3 hours ago",
  },
]

export default function CriticalAlerts() {
  return (
    <Card className="relative border-none text-white overflow-hidden rounded-2xl bg-white/5 shadow-lg backdrop-blur-md col-span-full">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-blue-800/10 to-transparent pointer-events-none" />
      <div className="relative z-10">
        <CardHeader>
          <CardTitle className="text-lg font-medium flex items-center gap-2 text-blue-400">
            <Activity className="h-6 w-6 text-blue-400" />
            Recent Critical Alerts
          </CardTitle>
          <p className="text-sm text-gray-400">
            Latest high-priority threats requiring attention
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          {alerts.map((a) => (
            <div key={a.title} className="flex justify-between items-center p-4 rounded-md">
              <div>
                <p className="font-semibold">{a.title}</p>
                <p className="text-sm text-gray-400">{a.desc}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className={`${a.color} text-white text-xs font-bold px-2 py-1 rounded`}>
                  {a.severity}
                </span>
                <span className="text-sm text-gray-400">{a.time}</span>
                <button className="bg-gray-700 text-white text-xs px-3 py-1 rounded hover:bg-gray-600">
                  View
                </button>
              </div>
            </div>
          ))}
        </CardContent>
      </div>
    </Card>
  )
}