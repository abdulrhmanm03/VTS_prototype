"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { TrendingUp } from "lucide-react"

export default function RemediationPriorities() {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold flex items-center text-white">
        <TrendingUp className="h-5 w-5 mr-2 text-blue-400" /> Remediation Priority Matrix
      </h2>
      <p className="text-sm text-gray-400">
        High-impact improvements to boost your risk score
      </p>

      {/* Card 1 */}
      <Card className="bg-white/5 backdrop-blur-md border-none rounded-2xl hover:shadow-[0_0_20px_rgba(59,130,246,0.4)] transition-all">
        <CardContent className="flex flex-col p-4 space-y-2">
          <div className="flex items-center space-x-2">
            <span className="font-bold">Dark Web Monitoring</span>
            <Badge className="bg-red-500 text-white">High Impact</Badge>
            <Badge variant="secondary">Medium Effort</Badge>
          </div>
          <p className="text-sm text-gray-400">
            Current: 62 · Target: 75 · Timeline: 3 months
          </p>
          <div className="flex items-center space-x-4">
            <div className="flex-1">
              <p className="text-sm font-semibold mb-1">Progress to Target</p>
              <div className="h-2 bg-white/20 rounded-full">
                <div className="h-full rounded-full bg-blue-500" style={{ width: "48%" }}></div>
              </div>
            </div>
            <span className="font-semibold">48%</span>
            <Button variant="outline" size="sm" className="bg-white/10 border-none">Plan</Button>
            <Button size="sm" className="bg-blue-500 hover:bg-blue-600">Start</Button>
          </div>
        </CardContent>
      </Card>

      {/* Card 2 */}
      <Card className="bg-white/5 backdrop-blur-md border-none rounded-2xl hover:shadow-[0_0_20px_rgba(59,130,246,0.4)] transition-all">
        <CardContent className="flex flex-col p-4 space-y-2">
          <div className="flex items-center space-x-2">
            <span className="font-bold">Attack Surface Management</span>
            <Badge className="bg-red-500 text-white">High Impact</Badge>
            <Badge variant="secondary">High Effort</Badge>
          </div>
          <p className="text-sm text-gray-400">
            Current: 68 · Target: 80 · Timeline: 6 months
          </p>
          <div className="flex items-center space-x-4">
            <div className="flex-1">
              <p className="text-sm font-semibold mb-1">Progress to Target</p>
              <div className="h-2 bg-white/20 rounded-full">
                <div className="h-full rounded-full bg-blue-500" style={{ width: "60%" }}></div>
              </div>
            </div>
            <span className="font-semibold">60%</span>
            <Button variant="outline" size="sm" className="bg-white/10 border-none">Plan</Button>
            <Button size="sm" className="bg-blue-500 hover:bg-blue-600">Start</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}