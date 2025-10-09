"use client";

import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Shield,
  Search,
  BarChart3,
  CheckCircle2,
  Zap,
  Bell,
} from "lucide-react";

export default function OnboardingPage() {
  const router = useRouter();

  return (
    <div className="flex flex-col gap-10 p-6 min-h-screen text-white">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-blue-400 drop-shadow-[0_0_12px_rgba(59,130,246,0.9)]">
          Welcome to Sentinel Sovereign
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Let’s get you started with managing and securing your attack surface
          in just a few steps.
        </p>
      </div>

      {/* Progress Indicator */}
      <div className="flex justify-center items-center space-x-4">
        {["Discover", "Assess", "Monitor"].map((step, idx) => (
          <div key={idx} className="flex items-center space-x-2">
            <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center font-bold text-sm shadow-lg">
              {idx + 1}
            </div>
            <span className="text-sm text-gray-300">{step}</span>
            {idx < 2 && <div className="w-12 h-0.5 bg-blue-500/50" />}
          </div>
        ))}
      </div>

      {/* Steps */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Step 1 */}
        <Card
          className="relative border-none text-white overflow-hidden rounded-2xl bg-white/5 shadow-lg backdrop-blur-md 
          hover:shadow-[0_0_30px_rgba(59,130,246,0.6)] transition-shadow duration-300"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-blue-800/10 to-transparent pointer-events-none" />
          <div className="relative z-10">
            <CardHeader className="flex flex-col items-center text-center space-y-2 pb-2">
              <Search className="h-10 w-10 text-blue-400 drop-shadow-md" />
              <CardTitle className="text-lg font-semibold text-gray-200">
                Discover
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center text-gray-400 text-sm">
              Automatically find all assets in your environment: domains, IPs,
              and services.
            </CardContent>
          </div>
        </Card>

        {/* Step 2 */}
        <Card
          className="relative border-none text-white overflow-hidden rounded-2xl bg-white/5 shadow-lg backdrop-blur-md 
          hover:shadow-[0_0_30px_rgba(59,130,246,0.6)] transition-shadow duration-300"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-red-900/20 via-red-800/10 to-transparent pointer-events-none" />
          <div className="relative z-10">
            <CardHeader className="flex flex-col items-center text-center space-y-2 pb-2">
              <Shield className="h-10 w-10 text-red-400 drop-shadow-md" />
              <CardTitle className="text-lg font-semibold text-gray-200">
                Assess
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center text-gray-400 text-sm">
              Evaluate vulnerabilities and risks associated with your exposed
              assets.
            </CardContent>
          </div>
        </Card>

        {/* Step 3 */}
        <Card
          className="relative border-none text-white overflow-hidden rounded-2xl bg-white/5 shadow-lg backdrop-blur-md 
          hover:shadow-[0_0_30px_rgba(59,130,246,0.6)] transition-shadow duration-300"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-green-900/20 via-green-800/10 to-transparent pointer-events-none" />
          <div className="relative z-10">
            <CardHeader className="flex flex-col items-center text-center space-y-2 pb-2">
              <BarChart3 className="h-10 w-10 text-green-400 drop-shadow-md" />
              <CardTitle className="text-lg font-semibold text-gray-200">
                Monitor
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center text-gray-400 text-sm">
              Continuously track changes and get alerts when new risks appear.
            </CardContent>
          </div>
        </Card>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Quick Start Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-white/5 backdrop-blur-md rounded-2xl shadow-lg hover:shadow-[0_0_20px_rgba(59,130,246,0.4)] transition-shadow">
            <CardContent className="p-6 text-center space-y-2">
              <Zap className="h-8 w-8 text-yellow-400 mx-auto drop-shadow" />
              <p className="text-gray-300">
                Run your first attack surface scan
              </p>
              <Button
                className="bg-blue-500 hover:bg-blue-600"
                onClick={() =>
                  router.push("/attack-surface-management?tab=scan")
                }
              >
                Start Scan
              </Button>
            </CardContent>
          </Card>
          <Card className="bg-white/5 backdrop-blur-md rounded-2xl shadow-lg hover:shadow-[0_0_20px_rgba(59,130,246,0.4)] transition-shadow">
            <CardContent className="p-6 text-center space-y-2">
              <Bell className="h-8 w-8 text-green-400 mx-auto drop-shadow" />
              <p className="text-gray-300">Set up real-time alerts</p>
              <Button variant="outline" className="bg-white/10 border-none">
                Configure
              </Button>
            </CardContent>
          </Card>
          <Card className="bg-white/5 backdrop-blur-md rounded-2xl shadow-lg hover:shadow-[0_0_20px_rgba(59,130,246,0.4)] transition-shadow">
            <CardContent className="p-6 text-center space-y-2">
              <CheckCircle2 className="h-8 w-8 text-blue-400 mx-auto drop-shadow" />
              <p className="text-gray-300">Review security best practices</p>
              <Button variant="outline" className="bg-white/10 border-none">
                View Guide
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Checklist */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Onboarding Checklist</h2>
        <ul className="space-y-3 text-gray-300 text-sm">
          <li className="flex items-center space-x-2">
            <CheckCircle2 className="h-5 w-5 text-green-400" />
            <span>Connect your first domain or IP</span>
          </li>
          <li className="flex items-center space-x-2">
            <CheckCircle2 className="h-5 w-5 text-green-400" />
            <span>Run an initial vulnerability scan</span>
          </li>
          <li className="flex items-center space-x-2">
            <CheckCircle2 className="h-5 w-5 text-green-400" />
            <span>Set up monitoring and notifications</span>
          </li>
        </ul>
      </div>

      {/* CTA */}
      <div className="flex justify-center mt-6">
        <Button
          size="lg"
          className="bg-blue-500 hover:bg-blue-600 shadow-lg px-8 py-6 rounded-xl text-lg"
          onClick={() => router.push("/")}
        >
          Go to Dashboard
        </Button>
      </div>
    </div>
  );
}
