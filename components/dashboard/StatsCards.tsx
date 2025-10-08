"use client"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { AlertCircle, Shield, Database, Eye, Bug } from "lucide-react"

const stats = [
  {
    title: "Total Events",
    value: "5,432",
    change: "+8% from last week",
    changeColor: "text-green-500",
    icon: AlertCircle,
    gradient: "from-indigo-900/30 via-indigo-800/10",
    iconColor: "text-indigo-400",
  },
  {
    title: "Active Campaigns",
    value: "87",
    change: "+3 campaigns this week",
    changeColor: "text-green-500",
    icon: Shield,
    gradient: "from-blue-900/30 via-blue-800/10",
    iconColor: "text-blue-400",
  },
  {
    title: "Affected Assets",
    value: "1,234",
    change: "+12 affected assets today",
    changeColor: "text-red-500",
    icon: Eye,
    gradient: "from-red-900/30 via-red-800/10",
    iconColor: "text-red-400",
  },
  {
    title: "Leaked Data Count",
    value: "3,210",
    change: "+5% from last month",
    changeColor: "text-red-500",
    icon: Database,
    gradient: "from-purple-900/30 via-purple-800/10",
    iconColor: "text-purple-400",
  },
  {
    title: "CVEs with Exploits",
    value: "45",
    change: "+7 new this week",
    changeColor: "text-yellow-500",
    icon: Bug,
    gradient: "from-yellow-900/30 via-yellow-800/10",
    iconColor: "text-yellow-400",
  },
]

export default function StatsCards() {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4 text-blue-400">Executive Summary</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
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
    </div>
  )
}