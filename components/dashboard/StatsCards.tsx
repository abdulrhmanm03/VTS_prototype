"use client"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { AlertCircle, Shield, Database, Eye } from "lucide-react"

const stats = [
  {
    title: "Active Threats",
    value: "174",
    change: "+12% from last week",
    changeColor: "text-green-500",
    icon: AlertCircle,
    gradient: "from-red-900/30 via-red-800/10",
    iconColor: "text-red-500",
  },
  {
    title: "Risk Score",
    value: "72/100",
    change: "-5 points from last month",
    changeColor: "text-red-500",
    icon: Shield,
    gradient: "from-blue-900/30 via-blue-800/10",
    iconColor: "text-blue-400",
  },
  {
    title: "IOCs Processed",
    value: "2,847",
    change: "+23% from yesterday",
    changeColor: "text-green-500",
    icon: Database,
    gradient: "from-purple-900/30 via-purple-800/10",
    iconColor: "text-purple-400",
  },
  {
    title: "Assets Monitored",
    value: "1,234",
    change: "+2 new assets today",
    changeColor: "text-green-500",
    icon: Eye,
    gradient: "from-green-900/30 via-green-800/10",
    iconColor: "text-green-400",
  },
]

export default function StatsCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map(({ title, value, change, changeColor, icon: Icon, gradient, iconColor }) => (
        <Card
          key={title}
          className="relative border-none text-white overflow-hidden rounded-2xl bg-white/5 shadow-lg backdrop-blur-md hover:shadow-[0_0_30px_rgba(59,130,246,0.6)] transition-shadow duration-300"
        >
          <div className={`absolute inset-0 bg-gradient-to-br ${gradient} to-transparent pointer-events-none`} />
          <div className="relative z-10">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">{title}</CardTitle>
              <Icon className={`h-8 w-8 ${iconColor} drop-shadow-md`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold drop-shadow-lg">{value}</div>
              <p className={`text-xs ${changeColor}`}>{change}</p>
            </CardContent>
          </div>
        </Card>
      ))}
    </div>
  )
}