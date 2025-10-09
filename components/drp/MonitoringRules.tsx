"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function MonitoringRules() {
  return (
    <div className="space-y-4 mt-6">
      <h2 className="text-lg font-semibold">Monitoring Rules</h2>
      <p className="text-sm text-gray-400">Create and manage your automated detection rules</p>

      <Card className="bg-white/5 border-none rounded-2xl backdrop-blur-md shadow-lg p-4">
        <div className="flex space-x-2 mb-4">
          <Input placeholder="Rule name" className="bg-white/10 border-none text-white" />
          <Input placeholder="Condition (e.g., domain contains 'secure')" className="bg-white/10 border-none text-white flex-1" />
          <Button className="bg-blue-500 hover:bg-blue-600">Add</Button>
        </div>
      </Card>

      {[ 
        { rule: "Detect 'secure' domains", status: "Active" },
        { rule: "Monitor executive mentions", status: "Active" },
      ].map((r, i) => (
        <Card key={i} className="bg-white/5 border-none rounded-2xl backdrop-blur-md shadow-lg hover:shadow-[0_0_20px_rgba(59,130,246,0.4)] transition-shadow duration-300">
          <CardContent className="flex items-center justify-between p-4">
            <span className="font-medium">{r.rule}</span>
            <div className="flex space-x-2">
              <Button size="sm" variant="outline" className="bg-white/10 border-none">{r.status}</Button>
              <Button size="sm" className="bg-blue-500 hover:bg-blue-600">Edit</Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}