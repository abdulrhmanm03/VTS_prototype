"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GitBranch, Terminal, ShieldAlert, Play } from "lucide-react";
import AttackSimulator from "@/components/offensive_security/AttackSim";

export default function OffensiveSecurityPage() {
  return (
    <div className="flex flex-col gap-6 p-6 min-h-screen text-white">
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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="relative border-none text-white overflow-hidden rounded-2xl bg-white/5 shadow-lg backdrop-blur-md">
          <div className="relative z-10">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">
                Active Engagements
              </CardTitle>
              <GitBranch className="h-8 w-8 text-blue-400 drop-shadow-md" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-green-500">1 starting today</p>
            </CardContent>
          </div>
        </Card>

        <Card className="relative border-none text-white overflow-hidden rounded-2xl bg-white/5 shadow-lg backdrop-blur-md">
          <div className="relative z-10">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">
                Critical Findings
              </CardTitle>
              <ShieldAlert className="h-8 w-8 text-red-500 drop-shadow-md" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">7</div>
              <p className="text-xs text-yellow-400">triage required</p>
            </CardContent>
          </div>
        </Card>

        <Card className="relative border-none text-white overflow-hidden rounded-2xl bg-white/5 shadow-lg backdrop-blur-md">
          <div className="relative z-10">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">
                Exploit Modules
              </CardTitle>
              <Terminal className="h-8 w-8 text-green-400 drop-shadow-md" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">128</div>
              <p className="text-xs text-gray-400">community & custom</p>
            </CardContent>
          </div>
        </Card>

        <Card className="relative border-none text-white overflow-hidden rounded-2xl bg-white/5 shadow-lg backdrop-blur-md">
          <div className="relative z-10">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">
                Simulations Run
              </CardTitle>
              <Play className="h-8 w-8 text-yellow-400 drop-shadow-md" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">42</div>
              <p className="text-xs text-green-500">last 30 days</p>
            </CardContent>
          </div>
        </Card>
      </div>

      <div className="mt-6">
        <AttackSimulator defaultTarget="203.0.113.42" />
      </div>
    </div>
  );
}
