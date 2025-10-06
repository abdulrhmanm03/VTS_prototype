"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, ShoppingCart, MessageSquare, Lock, AlertTriangle } from "lucide-react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: '2024-01-14', mentions: 15 },
  { name: '2024-01-15', mentions: 52 },
  { name: '2024-01-16', mentions: 40 },
  { name: '2024-01-17', mentions: 70 },
  { name: '2024-01-18', mentions: 72 },
  { name: '2024-01-19', mentions: 80 },
  { name: '2024-01-20', mentions: 95 },
];

export default function DarkWebIntelligencePage() {
  return (
    <div className="flex flex-col gap-6 p-6 min-h-screen text-white">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center mb-2 space-x-2">
          <h1 className="text-4xl font-bold text-blue-400 drop-shadow-[0_0_12px_rgba(59,130,246,0.9)]">
            AI Insights
          </h1>
        </div>
        <div className="ml-2">
          <p className="text-gray-400">Monitor criminal marketplaces, forums, and ransomware activities</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: "Active Listings", value: "47", sub: "+8 new this week", icon: ShoppingCart, gradient: 'from-blue-900/20 via-blue-800/10' },
          { title: "Forum Mentions", value: "234", sub: "+15% from last week", icon: MessageSquare, gradient: 'from-green-900/20 via-green-800/10' },
          { title: "Ransomware Victims", value: "12", sub: "3 in your industry", icon: Lock, gradient: 'from-red-900/20 via-red-800/10' },
          { title: "Threat Level", value: "High", sub: "Elevated activity detected", icon: AlertTriangle, gradient: 'from-yellow-900/20 via-yellow-800/10' },
        ].map((item, i) => (
          <Card key={i} className="relative border-none text-white overflow-hidden rounded-2xl bg-white/5 shadow-lg backdrop-blur-md hover:shadow-[0_0_30px_rgba(59,130,246,0.4)] transition-shadow duration-300">
            <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} to-transparent pointer-events-none`} />
            <div className="relative z-10">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-400">{item.title}</CardTitle>
                <item.icon className={`h-8 w-8 ${item.gradient.includes('red') ? 'text-red-400' : item.gradient.includes('green') ? 'text-green-400' : item.gradient.includes('yellow') ? 'text-yellow-400' : 'text-blue-400'} drop-shadow-md`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold drop-shadow-lg">{item.value}</div>
                <p className="text-xs text-gray-300">{item.sub}</p>
              </CardContent>
            </div>
          </Card>
        ))}
      </div>

      {/* Activity Trend Card */}
      <Card className="relative border-none rounded-2xl bg-white/5 shadow-lg backdrop-blur-md hover:shadow-[0_0_20px_rgba(59,130,246,0.35)] transition-shadow duration-300">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 to-transparent pointer-events-none" />
        <div className="relative z-10">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Dark Web Activity Trend</CardTitle>
            <p className="text-sm text-gray-400">Mentions and threats detected over the last 7 days</p>
          </CardHeader>
          <CardContent>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data} margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" />
                  <XAxis dataKey="name" stroke="#aaa" tickLine={false} axisLine={false} tickFormatter={(v) => v.slice(5)} />
                  <YAxis stroke="#aaa" tickLine={false} axisLine={false} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#0b1020', border: '1px solid #2b2540', borderRadius: '6px' }}
                    labelStyle={{ color: '#fff' }}
                    itemStyle={{ color: '#fff' }}
                  />
                  <Line type="monotone" dataKey="mentions" stroke="#3b82f6" strokeWidth={2} activeDot={{ r: 8, fill: "#22c55e" }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </div>
      </Card>

      {/* Search + Actions */}
      <div className="flex items-center space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search marketplaces, forums, threat actors..."
            className="pl-8 bg-white/10 border-none rounded-lg text-white placeholder-gray-400"
          />
        </div>
        <Button variant="outline" className="bg-white/10 hover:bg-white/20 border-none">
          <Filter />
        </Button>
        <Button className="bg-blue-500 hover:bg-blue-600 shadow-lg">New Search</Button>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="marketplace-monitoring" className="mt-4">
        <TabsList className="bg-white/10 p-1 rounded-lg">
          <TabsTrigger value="marketplace-monitoring">Marketplace Monitoring</TabsTrigger>
          <TabsTrigger value="forum-analysis">Forum Analysis</TabsTrigger>
          <TabsTrigger value="ransomware-intelligence">Ransomware Intelligence</TabsTrigger>
          <TabsTrigger value="threat-actors">Threat Actors</TabsTrigger>
        </TabsList>

        <TabsContent value="marketplace-monitoring" className="space-y-4 mt-6">
          <h2 className="text-lg font-semibold">Criminal Marketplace Monitoring</h2>
          <p className="text-sm text-gray-400">Track stolen data, malware, and illegal services</p>

          <Card className="relative border-none rounded-2xl bg-white/5 shadow-lg backdrop-blur-md hover:shadow-[0_0_20px_rgba(59,130,246,0.4)] transition-shadow duration-300">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 to-transparent pointer-events-none" />
            <div className="relative z-10">
              <CardContent className="flex items-center justify-between p-4">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <Badge className="bg-blue-600 text-white">Stolen Data</Badge>
                    <span className="font-medium">Corporate Email Database</span>
                    <Badge className="bg-red-600 text-white">Critical Risk</Badge>
                    <Badge variant="secondary" className="bg-gray-700">Active</Badge>
                  </div>
                  <p className="text-sm text-gray-400">Marketplace: DarkMarket Alpha · Price: $2,500 · Seller: DataBroker99 · Detected: 2024-01-20</p>
                </div>
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline" className="bg-white/10 border-none">Investigate</Button>
                  <Button size="sm" className="bg-red-600 hover:bg-red-700">Takedown</Button>
                </div>
              </CardContent>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
