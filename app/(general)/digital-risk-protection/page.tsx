"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Search, Filter, Shield, AlertCircle, FileText, User } from "lucide-react"
import BrandProtection from "@/components/drp/BrandProtection"
import ExecutiveProtection from "@/components/drp/ExecutiveProtection"
import DataLeakDetection from "@/components/drp/DataLeakDetection"
import MonitoringRules from "@/components/drp/MonitoringRules"
import { ReactNode } from "react"

export default function DigitalRiskPage() {
  return (
    <div className="flex flex-col gap-6 p-6 min-h-screen text-white">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center mb-2 space-x-2">
          <h1 className="text-4xl font-bold text-blue-400 drop-shadow-[0_0_12px_rgba(59,130,246,0.9)]">
            Digital Risk Protection
          </h1>
        </div>
        <div className="ml-2">
          <p className="text-gray-400">
            Protect your brand, executives, and sensitive data from digital threats
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Brand Threats"
          value="23"
          change="+3 new this week"
          icon={<FileText className="h-8 w-8 text-blue-400 drop-shadow-md" />}
          gradient="from-blue-900/20 via-blue-800/10"
        />
        <StatCard
          title="Executive Risks"
          value="7"
          change="2 require attention"
          icon={<User className="h-8 w-8 text-purple-400 drop-shadow-md" />}
          gradient="from-purple-900/20 via-purple-800/10"
        />
        <StatCard
          title="Data Leaks"
          value="12"
          change="-2 from last month"
          icon={<AlertCircle className="h-8 w-8 text-red-500 drop-shadow-md" />}
          gradient="from-red-900/20 via-red-800/10"
        />
        <StatCard
          title="Monitoring Score"
          value="85/100"
          change="Excellent coverage"
          icon={<Shield className="h-8 w-8 text-yellow-400 drop-shadow-md" />}
          gradient="from-yellow-900/20 via-yellow-800/10"
        />
      </div>

      {/* Search + Actions */}
      <div className="flex items-center space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search threats, domains, executives..."
            className="pl-8 bg-white/10 border-none rounded-lg text-white placeholder-gray-400"
          />
        </div>
        <Button variant="outline" className="bg-white/10 hover:bg-white/20 border-none">
          <Filter className="h-4 w-4 mr-1" /> Filter
        </Button>
        <Button className="bg-blue-500 hover:bg-blue-600 shadow-lg">
          New Monitoring Rule
        </Button>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="brand-protection" className="mt-4">
        <TabsList className="bg-white/10 p-1 rounded-lg">
          <TabsTrigger value="brand-protection">Brand Protection</TabsTrigger>
          <TabsTrigger value="executive-protection">Executive Protection</TabsTrigger>
          <TabsTrigger value="data-leak-detection">Data Leak Detection</TabsTrigger>
          <TabsTrigger value="monitoring-rules">Monitoring Rules</TabsTrigger>
        </TabsList>

        <TabsContent value="brand-protection"><BrandProtection /></TabsContent>
        <TabsContent value="executive-protection"><ExecutiveProtection /></TabsContent>
        <TabsContent value="data-leak-detection"><DataLeakDetection /></TabsContent>
        <TabsContent value="monitoring-rules"><MonitoringRules /></TabsContent>
      </Tabs>
    </div>
  )
}

interface StatCardProps {
  title: string
  value: string
  change: string
  icon: ReactNode
  gradient: string
}

function StatCard({ title, value, change, icon, gradient }: StatCardProps) {
  return (
    <Card className="relative border-none text-white overflow-hidden rounded-2xl bg-white/5 shadow-lg backdrop-blur-md hover:shadow-[0_0_30px_rgba(59,130,246,0.6)] transition-shadow duration-300">
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} to-transparent pointer-events-none`} />
      <div className="relative z-10">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-gray-400">{title}</CardTitle>
          {icon}
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold drop-shadow-lg">{value}</div>
          <p className="text-xs text-green-500">{change}</p>
        </CardContent>
      </div>
    </Card>
  )
}