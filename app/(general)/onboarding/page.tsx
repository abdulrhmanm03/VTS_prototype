"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Building2, Users, Search, Settings, CheckCircle2 } from "lucide-react";

export default function OnboardingPage() {
  const router = useRouter();
  const [stage, setStage] = useState(1);

  const handleNext = () => setStage((s) => Math.min(s + 1, 4));
  const handleBack = () => setStage((s) => Math.max(s - 1, 1));

  const steps = [
    { name: "Organization Info", icon: Building2 },
    { name: "Security Team", icon: Users },
    { name: "Asset Discovery", icon: Search },
    { name: "Configuration", icon: Settings },
  ];

  return (
    <div className="flex flex-col gap-10 p-6 min-h-screen text-white">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-blue-400 drop-shadow-[0_0_12px_rgba(59,130,246,0.9)]">
          Welcome to Churchill
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Let’s complete your setup in a few simple steps.
        </p>
      </div>

      {/* Progress Indicator */}
      <div className="flex justify-center items-center space-x-4">
        {steps.map((step, idx) => {
          const Icon = step.icon;
          const active = idx + 1 <= stage;
          return (
            <div key={idx} className="flex items-center space-x-2">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shadow-lg transition-all ${
                  active
                    ? "bg-blue-500 text-white"
                    : "bg-white/10 text-gray-400"
                }`}
              >
                <Icon className="h-5 w-5" />
              </div>
              <span
                className={`text-sm ${
                  active ? "text-blue-400" : "text-gray-400"
                }`}
              >
                {step.name}
              </span>
              {idx < 3 && (
                <div
                  className={`w-12 h-0.5 transition-all ${
                    idx + 1 < stage ? "bg-blue-500/80" : "bg-gray-600/50"
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Active Stage Form */}
      <Card
        className="relative border-none text-white overflow-hidden rounded-2xl bg-white/5 shadow-lg backdrop-blur-md 
        hover:shadow-[0_0_30px_rgba(59,130,246,0.6)] transition-shadow duration-300 max-w-3xl mx-auto w-full"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-blue-800/10 to-transparent pointer-events-none" />
        <div className="relative z-10 p-8 space-y-6">
          {stage === 1 && (
            <>
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-center text-gray-200">
                  Organization Information
                </CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-300">
                    Organization Name *
                  </label>
                  <Input placeholder="Enter organization name" />
                </div>
                <div>
                  <label className="text-sm text-gray-300">
                    Primary Domain *
                  </label>
                  <Input placeholder="example.com" />
                </div>
                <div>
                  <label className="text-sm text-gray-300">Industry *</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select industry" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="finance">Finance</SelectItem>
                      <SelectItem value="healthcare">Healthcare</SelectItem>
                      <SelectItem value="technology">Technology</SelectItem>
                      <SelectItem value="education">Education</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm text-gray-300">
                    Organization Size *
                  </label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="small">1–50 employees</SelectItem>
                      <SelectItem value="medium">51–500 employees</SelectItem>
                      <SelectItem value="large">500+ employees</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="md:col-span-2">
                  <label className="text-sm text-gray-300">Domains *</label>
                  <Input placeholder="Add additional domains separated by commas" />
                </div>
              </CardContent>
            </>
          )}

          {stage === 2 && (
            <>
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-center text-gray-200">
                  Security Team Setup
                </CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-300">
                    Team Lead Name *
                  </label>
                  <Input placeholder="Full name" />
                </div>
                <div>
                  <label className="text-sm text-gray-300">
                    Team Lead Email *
                  </label>
                  <Input placeholder="lead@example.com" type="email" />
                </div>
                <div>
                  <label className="text-sm text-gray-300">Team Members</label>
                  <Input placeholder="Comma-separated emails" />
                </div>
                <div>
                  <label className="text-sm text-gray-300">
                    Incident Contact *
                  </label>
                  <Input placeholder="+1 555 555 5555" />
                </div>
              </CardContent>
            </>
          )}

          {stage === 3 && (
            <>
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-center text-gray-200">
                  Asset Discovery
                </CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-300">IP Ranges *</label>
                  <Input placeholder="e.g. 192.168.1.0/24, 10.0.0.0/16" />
                </div>
                <div>
                  <label className="text-sm text-gray-300">
                    Cloud Providers
                  </label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select provider" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="aws">AWS</SelectItem>
                      <SelectItem value="azure">Azure</SelectItem>
                      <SelectItem value="gcp">Google Cloud</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="md:col-span-2">
                  <label className="text-sm text-gray-300">
                    Additional Notes
                  </label>
                  <Input placeholder="Optional notes about assets" />
                </div>
              </CardContent>
            </>
          )}

          {stage === 4 && (
            <>
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-center text-gray-200">
                  Configuration
                </CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-300">
                    Notification Preferences
                  </label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="email">Email</SelectItem>
                      <SelectItem value="slack">Slack</SelectItem>
                      <SelectItem value="teams">Microsoft Teams</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm text-gray-300">
                    Scan Frequency *
                  </label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="md:col-span-2">
                  <label className="text-sm text-gray-300">
                    API Key (optional)
                  </label>
                  <Input placeholder="Enter API key if applicable" />
                </div>
              </CardContent>
            </>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-4">
            <Button
              variant="outline"
              className="bg-white/10 border-none"
              disabled={stage === 1}
              onClick={handleBack}
            >
              Back
            </Button>
            {stage < 4 ? (
              <Button
                className="bg-blue-500 hover:bg-blue-600"
                onClick={handleNext}
              >
                Next
              </Button>
            ) : (
              <Button
                className="bg-green-500 hover:bg-green-600 flex items-center gap-2"
                onClick={() => router.push("/")}
              >
                <CheckCircle2 className="h-5 w-5" />
                Finish Setup
              </Button>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
}
