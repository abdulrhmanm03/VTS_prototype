"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, RefreshCcw, TrendingUp } from "lucide-react"
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  BarChart,
  Bar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Tooltip,
} from "recharts"

// Data for the charts
const riskScoreTrendData = [
  { name: "Jan", score: 70 },
  { name: "Feb", score: 68 },
  { name: "Mar", score: 72 },
  { name: "Apr", score: 74 },
  { name: "May", score: 70 },
  { name: "Jun", score: 75 },
]

const industryComparisonData = [
  { name: "You", score: 72 },
  { name: "Industry Average", score: 85 },
  { name: "Top Quartile", score: 92 },
  { name: "Bottom Quartile", score: 45 },
]

const securityPostureData = [
  { subject: "Threat Intel", A: 85, fullMark: 100 },
  { subject: "Attack Surface", A: 68, fullMark: 100 },
  { subject: "Digital Risk", A: 80, fullMark: 100 },
  { subject: "Compliance", A: 90, fullMark: 100 },
  { subject: "Incident Response", A: 75, fullMark: 100 },
]

export default function RiskAssessmentPage() {
  return (
    <div className="flex flex-col gap-6 p-6 min-h-screen text-white">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center mb-2 space-x-2">
          <h1 className="text-4xl font-bold text-blue-400 drop-shadow-[0_0_12px_rgba(59,130,246,0.9)]">
            Risk Assessment Scores
          </h1>
        </div>
        <div className="ml-2">
          <p className="text-gray-400">
            Comprehensive risk analysis and organizational security posture
          </p>
        </div>
      </div>

      {/* Overall Risk Score */}
      <Card className="relative border-none text-white overflow-hidden rounded-2xl bg-white/5 shadow-lg backdrop-blur-md hover:shadow-[0_0_30px_rgba(234,179,8,0.6)] transition-shadow duration-300">
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-900/20 via-yellow-800/10 to-transparent pointer-events-none" />
        <div className="relative z-10">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Overall Risk Score</CardTitle>
            <div className="flex items-center space-x-2 text-green-500">
              <TrendingUp className="h-4 w-4" />
              <span className="text-sm">Improving</span>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-6">
              <div className="text-5xl font-bold text-yellow-500 drop-shadow-lg">72</div>
              <div className="flex-1">
                <div className="h-2 bg-white/20 rounded-full">
                  <div className="h-full rounded-full bg-yellow-500" style={{ width: "72%" }}></div>
                </div>
                <div className="flex justify-between text-xs mt-1 text-gray-400">
                  <span>High Risk</span>
                  <span>Medium Risk</span>
                  <span>Low Risk</span>
                </div>
              </div>
              <Badge className="bg-yellow-500 text-white text-lg px-4 py-2">Medium Risk</Badge>
            </div>
          </CardContent>
        </div>
      </Card>

      {/* Risk Categories Breakdown */}
      <Card className="relative border-none rounded-2xl bg-white/5 shadow-lg backdrop-blur-md hover:shadow-[0_0_20px_rgba(59,130,246,0.4)] transition-shadow duration-300">
        <CardHeader>
          <CardTitle className="text-white">Risk Categories Breakdown</CardTitle>
          <p className="text-sm text-gray-400">Detailed analysis across security domains</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <div className="flex items-center justify-between">
              <span className="font-medium">Threat Intelligence</span>
              <span className="font-bold text-green-500">85</span>
            </div>
            <p className="text-xs text-gray-400">IOC coverage and threat detection</p>
            <div className="h-2 bg-white/20 rounded-full mt-1">
              <div className="h-full rounded-full bg-green-500" style={{ width: "85%" }}></div>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <span className="font-medium">Attack Surface</span>
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-4 w-4 text-green-500" />
                <span className="font-bold text-yellow-500">68</span>
              </div>
            </div>
            <p className="text-xs text-gray-400">External exposure and vulnerabilities</p>
            <div className="h-2 bg-white/20 rounded-full mt-1">
              <div className="h-full rounded-full bg-yellow-500" style={{ width: "68%" }}></div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Risk Score Trend */}
        <Card className="relative border-none rounded-2xl bg-white/5 shadow-lg backdrop-blur-md hover:shadow-[0_0_20px_rgba(59,130,246,0.4)] transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="text-white">Risk Score Trend</CardTitle>
            <p className="text-sm text-gray-400">6-month risk score evolution</p>
          </CardHeader>
          <CardContent>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={riskScoreTrendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" />
                  <XAxis dataKey="name" stroke="#888" />
                  <YAxis stroke="#888" domain={[0, 100]} />
                  <Tooltip
                    contentStyle={{ backgroundColor: "#1f1f1f", border: "1px solid #444" }}
                    labelStyle={{ color: "#fff" }}
                    itemStyle={{ color: "#fff" }}
                  />
                  <Line type="monotone" dataKey="score" stroke="#3b82f6" activeDot={{ r: 8 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Industry Comparison */}
        <Card className="relative border-none rounded-2xl bg-white/5 shadow-lg backdrop-blur-md hover:shadow-[0_0_20px_rgba(59,130,246,0.4)] transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="text-white">Industry Comparison</CardTitle>
            <p className="text-sm text-gray-400">How you compare to industry peers</p>
          </CardHeader>
          <CardContent>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={industryComparisonData}>
                  <XAxis dataKey="name" stroke="#888" />
                  <YAxis stroke="#888" domain={[0, 100]} />
                  <Tooltip
                    contentStyle={{ backgroundColor: "#1f1f1f", border: "1px solid #444" }}
                    labelStyle={{ color: "#fff" }}
                    itemStyle={{ color: "#fff" }}
                  />
                  <Bar dataKey="score" fill="#3b82f6" barSize={40} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Security Posture Radar */}
        <Card className="relative border-none rounded-2xl bg-white/5 shadow-lg backdrop-blur-md hover:shadow-[0_0_20px_rgba(59,130,246,0.4)] transition-shadow duration-300 md:col-span-2">
          <CardHeader>
            <CardTitle className="text-white">Security Posture Radar</CardTitle>
            <p className="text-sm text-gray-400">Multi-dimensional view of your security capabilities</p>
          </CardHeader>
          <CardContent>
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={securityPostureData}>
                  <PolarGrid stroke="#2a2a2a" />
                  <PolarAngleAxis dataKey="subject" stroke="#888" />
                  <PolarRadiusAxis angle={90} domain={[0, 100]} stroke="#2a2a2a" />
                  <Radar name="Your Score" dataKey="A" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search Bar and Buttons */}
      <div className="flex items-center space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search risk areas, recommendations..."
            className="pl-8 bg-white/10 border-none rounded-lg text-white placeholder-gray-400"
          />
        </div>
        <Button variant="outline" className="bg-white/10 hover:bg-white/20 border-none">
          <Filter className="h-4 w-4" />
        </Button>
        <Button className="bg-blue-500 hover:bg-blue-600 shadow-lg">
          <RefreshCcw className="mr-2 h-4 w-4" />
          Recalculate Scores
        </Button>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="remediation-priorities" className="mt-4">
        <TabsList className="bg-white/10 p-1 rounded-lg">
          <TabsTrigger value="remediation-priorities">Remediation Priorities</TabsTrigger>
          <TabsTrigger value="historical-trends">Historical Trends</TabsTrigger>
          <TabsTrigger value="benchmarks">Benchmarks</TabsTrigger>
          <TabsTrigger value="risk-reports">Risk Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="remediation-priorities" className="space-y-4 mt-6">
          <h2 className="text-lg font-semibold flex items-center text-white">
            <TrendingUp className="h-5 w-5 mr-2 text-blue-400" /> Remediation Priority Matrix
          </h2>
          <p className="text-sm text-gray-400">
            High-impact improvements to boost your risk score
          </p>

          {/* Remediation Card 1 */}
          <Card className="relative border-none rounded-2xl bg-white/5 shadow-lg backdrop-blur-md hover:shadow-[0_0_20px_rgba(59,130,246,0.4)] transition-shadow duration-300">
            <CardContent className="flex flex-col p-4 space-y-2">
              <div className="flex items-center space-x-2">
                <span className="font-bold">Dark Web Monitoring</span>
                <Badge className="bg-red-500 text-white">High Impact</Badge>
                <Badge variant="secondary">Medium Effort</Badge>
              </div>
              <div className="text-sm text-gray-400">
                Current: 62 · Target: 75 · Timeline: 3 months
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex-1">
                  <div className="text-sm font-semibold mb-1">Progress to Target</div>
                  <div className="h-2 bg-white/20 rounded-full">
                    <div className="h-full rounded-full bg-blue-500" style={{ width: "48%" }}></div>
                  </div>
                </div>
                <div className="font-semibold">48%</div>
                <Button variant="outline" size="sm" className="bg-white/10 border-none">Plan</Button>
                <Button size="sm" className="bg-blue-500 hover:bg-blue-600">Start</Button>
              </div>
            </CardContent>
          </Card>

          {/* Remediation Card 2 */}
          <Card className="relative border-none rounded-2xl bg-white/5 shadow-lg backdrop-blur-md hover:shadow-[0_0_20px_rgba(59,130,246,0.4)] transition-shadow duration-300">
            <CardContent className="flex flex-col p-4 space-y-2">
              <div className="flex items-center space-x-2">
                <span className="font-bold">Attack Surface Management</span>
                <Badge className="bg-red-500 text-white">High Impact</Badge>
                <Badge variant="secondary">High Effort</Badge>
              </div>
              <div className="text-sm text-gray-400">
                Current: 68 · Target: 80 · Timeline: 6 months
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex-1">
                  <div className="text-sm font-semibold mb-1">Progress to Target</div>
                  <div className="h-2 bg-white/20 rounded-full">
                    <div className="h-full rounded-full bg-blue-500" style={{ width: "60%" }}></div>
                  </div>
                </div>
                <div className="font-semibold">60%</div>
                <Button variant="outline" size="sm" className="bg-white/10 border-none">Plan</Button>
                <Button size="sm" className="bg-blue-500 hover:bg-blue-600">Start</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}