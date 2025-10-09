"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export default function BrandProtection() {
  return (
    <div className="space-y-4 mt-6">
      <h2 className="text-lg font-semibold">Brand Protection Monitoring</h2>
      <p className="text-sm text-gray-400">Monitor for typosquatting, phishing, and brand abuse</p>

      {[
        {
          type: "Typosquatting",
          domain: "companyy.com",
          risk: "High Risk",
          riskColor: "bg-red-500",
          date: "2024-01-20",
          action: "Takedown Requested",
        },
        {
          type: "Phishing",
          domain: "company-secure.net",
          risk: "Critical Risk",
          riskColor: "bg-red-700",
          date: "2024-01-18",
          action: "None",
        },
      ].map((t, i) => (
        <Card
          key={i}
          className="relative border-none rounded-2xl bg-white/5 shadow-lg backdrop-blur-md hover:shadow-[0_0_20px_rgba(59,130,246,0.4)] transition-shadow duration-300"
        >
          <CardContent className="flex items-center justify-between p-4">
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <Badge className="bg-orange-500 text-white">{t.type}</Badge>
                <span className="font-medium">{t.domain}</span>
                <Badge className={`${t.riskColor} text-white`}>{t.risk}</Badge>
                <Badge variant="secondary">Active</Badge>
              </div>
              <p className="text-sm text-gray-400">
                Similarity: 95% · Detected: {t.date} · Action: {t.action}
              </p>
            </div>
            <div className="flex space-x-2">
              <Button size="sm" variant="outline" className="bg-white/10 border-none">
                Investigate
              </Button>
              <Button size="sm" className="bg-blue-500 hover:bg-blue-600">
                Takedown
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}