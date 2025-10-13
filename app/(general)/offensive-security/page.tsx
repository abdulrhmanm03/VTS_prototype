"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Search, GitBranch, Terminal, ShieldAlert, Play } from "lucide-react";
import StartSimulation from "@/components/StartSimulation";

export default function OffensiveSecurityPage() {
  return (
    <div className="flex flex-col gap-6 p-6 min-h-screen text-white">
      {/* Header */}
      <div className="mb-4">
        <div className="flex items-center mb-2 space-x-3">
          <h1 className="text-4xl font-bold text-blue-400 drop-shadow-[0_0_12px_rgba(59,130,246,0.9)]">
            Offensive Security Lab
          </h1>
          <Badge className="bg-red-600 text-white">Pentest</Badge>
        </div>
        <p className="text-gray-400 ml-1">
          Simulate attacks, run engagements, and validate defenses safely.
        </p>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search engagements, tools, exploits..."
            className="pl-8 bg-white/10 border-none rounded-lg text-white placeholder-gray-400"
          />
        </div>
        <Button variant="outline" className="bg-white/10 border-none">
          Filters
        </Button>
        <Button className="bg-red-600 hover:bg-red-700 shadow-lg">
          New Engagement
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="relative border-none text-white overflow-hidden rounded-2xl bg-white/5 shadow-lg backdrop-blur-md hover:shadow-[0_0_30px_rgba(59,130,246,0.6)] transition-shadow duration-300">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-blue-800/10 to-transparent pointer-events-none" />
          <div className="relative z-10">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">
                Active Engagements
              </CardTitle>
              <GitBranch className="h-8 w-8 text-blue-400 drop-shadow-md" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold drop-shadow-lg">3</div>
              <p className="text-xs text-green-500">1 starting today</p>
            </CardContent>
          </div>
        </Card>

        <Card className="relative border-none text-white overflow-hidden rounded-2xl bg-white/5 shadow-lg backdrop-blur-md hover:shadow-[0_0_30px_rgba(59,130,246,0.6)] transition-shadow duration-300">
          <div className="absolute inset-0 bg-gradient-to-br from-red-900/20 via-red-800/10 to-transparent pointer-events-none" />
          <div className="relative z-10">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">
                Critical Findings
              </CardTitle>
              <ShieldAlert className="h-8 w-8 text-red-500 drop-shadow-md" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold drop-shadow-lg">7</div>
              <p className="text-xs text-yellow-400">triage required</p>
            </CardContent>
          </div>
        </Card>

        <Card className="relative border-none text-white overflow-hidden rounded-2xl bg-white/5 shadow-lg backdrop-blur-md hover:shadow-[0_0_30px_rgba(59,130,246,0.6)] transition-shadow duration-300">
          <div className="absolute inset-0 bg-gradient-to-br from-green-900/20 via-green-800/10 to-transparent pointer-events-none" />
          <div className="relative z-10">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">
                Exploit Modules
              </CardTitle>
              <Terminal className="h-8 w-8 text-green-400 drop-shadow-md" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold drop-shadow-lg">128</div>
              <p className="text-xs text-gray-400">community & custom</p>
            </CardContent>
          </div>
        </Card>

        <Card className="relative border-none text-white overflow-hidden rounded-2xl bg-white/5 shadow-lg backdrop-blur-md hover:shadow-[0_0_30px_rgba(59,130,246,0.6)] transition-shadow duration-300">
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-900/20 via-yellow-800/10 to-transparent pointer-events-none" />
          <div className="relative z-10">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">
                Simulations Run
              </CardTitle>
              <Play className="h-8 w-8 text-yellow-400 drop-shadow-md" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold drop-shadow-lg">42</div>
              <p className="text-xs text-green-500">last 30 days</p>
            </CardContent>
          </div>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="engagements" className="mt-4">
        <TabsList className="bg-white/10 p-1 rounded-lg">
          <TabsTrigger value="engagements">Engagements</TabsTrigger>
          <TabsTrigger value="tools">Toolbox</TabsTrigger>
          <TabsTrigger value="exploits">Exploit Library</TabsTrigger>
          <TabsTrigger value="simulator">Attack Simulator</TabsTrigger>
        </TabsList>

        <TabsContent value="engagements" className="space-y-4 mt-6">
          <h2 className="text-lg font-semibold">Active Engagements</h2>
          <p className="text-sm text-gray-400">
            Manage ongoing tests and view recent activity.
          </p>

          {/* Engagements Table */}
          <Card className="relative border-none rounded-2xl bg-white/5 shadow-lg backdrop-blur-md hover:shadow-[0_0_20px_rgba(59,130,246,0.4)] transition-shadow duration-300">
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Engagement</TableHead>
                    <TableHead>Target</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Findings</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>Internal Red Team</TableCell>
                    <TableCell>10.0.0.0/24</TableCell>
                    <TableCell>
                      <Badge className="bg-yellow-500 text-white">
                        In Progress
                      </Badge>
                    </TableCell>
                    <TableCell>4</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="bg-white/10 border-none"
                        >
                          View
                        </Button>
                        <Button size="sm" className="bg-blue-500">
                          Details
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell>Web App Pentest</TableCell>
                    <TableCell>app.corp.local</TableCell>
                    <TableCell>
                      <Badge className="bg-red-600 text-white">Critical</Badge>
                    </TableCell>
                    <TableCell>7</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="bg-white/10 border-none"
                        >
                          View
                        </Button>
                        <Button size="sm" className="bg-blue-500">
                          Details
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tools" className="space-y-4 mt-6">
          <h2 className="text-lg font-semibold">Toolbox</h2>
          <p className="text-sm text-gray-400">
            Common offensive tools available in the lab.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-white/5 backdrop-blur-md rounded-2xl shadow-lg transition-shadow">
              <CardContent className="p-6 text-center space-y-3">
                <Terminal className="h-8 w-8 text-green-400 mx-auto drop-shadow" />
                <div className="text-sm text-gray-300">Interactive Shells</div>
                <Button className="bg-blue-500 hover:bg-blue-600">Open</Button>
              </CardContent>
            </Card>

            <Card className="bg-white/5 backdrop-blur-md rounded-2xl shadow-lg transition-shadow">
              <CardContent className="p-6 text-center space-y-3">
                <GitBranch className="h-8 w-8 text-blue-400 mx-auto drop-shadow" />
                <div className="text-sm text-gray-300">Versioned Payloads</div>
                <Button variant="outline" className="bg-white/10 border-none">
                  Browse
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-white/5 backdrop-blur-md rounded-2xl shadow-lg transition-shadow">
              <CardContent className="p-6 text-center space-y-3">
                <Play className="h-8 w-8 text-yellow-400 mx-auto drop-shadow" />
                <div className="text-sm text-gray-300">Automation Runner</div>
                <Button className="bg-blue-500 hover:bg-blue-600">
                  Run Job
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="exploits" className="space-y-4 mt-6">
          <h2 className="text-lg font-semibold">Exploit Library</h2>
          <p className="text-sm text-gray-400">
            Community and curated modules.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="bg-white/5 backdrop-blur-md rounded-2xl shadow-lg">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">
                      Remote Code Exec - CVE-2023-XXXX
                    </div>
                    <div className="text-xs text-gray-400">
                      Web framework / unauthenticated
                    </div>
                  </div>
                  <div className="text-sm text-gray-300">Module • 2024</div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/5 backdrop-blur-md rounded-2xl shadow-lg">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">
                      Privilege Escalation - Local
                    </div>
                    <div className="text-xs text-gray-400">
                      Windows kernel / requires local access
                    </div>
                  </div>
                  <div className="text-sm text-gray-300">Module • 2022</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="simulator" className="space-y-4 mt-6">
          <Card className="bg-white/5 backdrop-blur-md rounded-2xl shadow-lg p-4">
            <CardContent>
              <StartSimulation />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
