"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts"

const data = [
  { month: "Apr", score: 74 },
  { month: "May", score: 70 },
  { month: "Jun", score: 75 },
  { month: "Jul", score: 78 },
  { month: "Aug", score: 80 },
  { month: "Sep", score: 82 },
]

export default function HistoricalTrends() {
  return (
    <Card className="bg-white/5 backdrop-blur-md border-none rounded-2xl">
      <CardHeader>
        <CardTitle>Historical Risk Trends</CardTitle>
        <p className="text-sm text-gray-400">Visualize your risk score progress over time</p>
      </CardHeader>
      <CardContent className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" />
            <XAxis dataKey="month" stroke="#888" />
            <YAxis stroke="#888" />
            <Tooltip
              contentStyle={{ backgroundColor: "#1f1f1f", border: "1px solid #444" }}
              labelStyle={{ color: "#fff" }}
              itemStyle={{ color: "#fff" }}
            />
            <Line type="monotone" dataKey="score" stroke="#3b82f6" activeDot={{ r: 8 }} />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}