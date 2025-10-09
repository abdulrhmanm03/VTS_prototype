"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export default function DataLeakDetection() {
  return (
    <div className="space-y-4 mt-6">
      <h2 className="text-lg font-semibold">Data Leak Detection</h2>
      <p className="text-sm text-gray-400">Monitor for leaked credentials, emails, or documents</p>

      {[
        { source: "Pastebin", item: "employee_logins.csv", risk: "High", date: "2024-02-01" },
        { source: "Dark Web Forum", item: "confidential_docs.zip", risk: "Critical", date: "2024-01-29" },
      ].map((d, i) => (
        <Card key={i} className="bg-white/5 border-none rounded-2xl backdrop-blur-md shadow-lg hover:shadow-[0_0_20px_rgba(239,68,68,0.4)] transition-shadow duration-300">
          <CardContent className="flex items-center justify-between p-4">
            <div>
              <div className="flex items-center space-x-2">
                <Badge className="bg-red-500 text-white">{d.source}</Badge>
                <span className="font-medium">{d.item}</span>
                <Badge className="bg-red-700 text-white">{d.risk} Risk</Badge>
              </div>
              <p className="text-sm text-gray-400">Detected: {d.date}</p>
            </div>
            <Button size="sm" className="bg-red-500 hover:bg-red-600">Remediate</Button>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}