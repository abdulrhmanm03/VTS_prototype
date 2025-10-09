"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export default function ExecutiveProtection() {
  return (
    <div className="space-y-4 mt-6">
      <h2 className="text-lg font-semibold">Executive Protection Monitoring</h2>
      <p className="text-sm text-gray-400">Detect impersonation, leaks, and threats to executives</p>

      {[
        {
          name: "John Doe",
          platform: "LinkedIn",
          risk: "Impersonation Detected",
          date: "2024-02-03",
          action: "Pending Review",
        },
        {
          name: "Jane Smith",
          platform: "Twitter",
          risk: "Targeted Harassment",
          date: "2024-01-30",
          action: "Escalated",
        },
      ].map((e, i) => (
        <Card key={i} className="bg-white/5 border-none rounded-2xl backdrop-blur-md shadow-lg hover:shadow-[0_0_20px_rgba(147,51,234,0.4)] transition-shadow duration-300">
          <CardContent className="flex items-center justify-between p-4">
            <div>
              <div className="flex items-center space-x-2">
                <Badge className="bg-purple-500 text-white">{e.platform}</Badge>
                <span className="font-medium">{e.name}</span>
                <Badge className="bg-red-500 text-white">{e.risk}</Badge>
              </div>
              <p className="text-sm text-gray-400">
                Detected: {e.date} · Action: {e.action}
              </p>
            </div>
            <Button size="sm" className="bg-purple-500 hover:bg-purple-600">Investigate</Button>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}