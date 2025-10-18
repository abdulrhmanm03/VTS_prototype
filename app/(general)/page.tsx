"use client";

import { Shield } from "lucide-react";
import ThreatCategories from "@/components/dashboard/ThreatCategories";
import LiveThreatFeed from "@/components/dashboard/ThreatFeed";
import GlobalThreatHeatMap from "@/components/HeatMap";
import MetricsBar from "@/components/dashboard/MetricBar";
import StatsCards from "@/components/dashboard/StatsCards";
import DashboardCharts from "@/components/dashboard/Charts";
import CriticalAlerts from "@/components/dashboard/CriticalAlerts";
import TrendingThreatActors from "@/components/dashboard/TrendingThreat";
import BusinessRiskCard from "@/components/dashboard/BusinessRiskCard";
import ComplianceFrameworkCard from "@/components/dashboard/ComplianceFrameworkCard";
import StrategicInitiativesCard from "@/components/dashboard/StrategicInitiativesCard";

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6 p-6 min-h-screen text-white ">
      <div className="mb-6">
        <div className="flex items-center mb-2 space-x-2">
          <Shield className="h-15 w-15 text-blue-400 drop-shadow-[0_0_8px_rgba(30,64,175,0.8)]" />
          <h1 className="text-6xl font-bold text-blue-400 drop-shadow-[0_0_12px_rgba(59,130,246,0.9)]">
            CHURCHILL<sup className="text-xl align-super">™</sup>
          </h1>
        </div>

        <div className="ml-4">
          <h2 className="text-3xl font-bold text-white">
            Threat Intelligence Dashboard
          </h2>
          <p className="text-gray-400">
            Real-time overview of your organization&#39;s security posture
          </p>
        </div>
      </div>

      <StatsCards />

      <div>
        <GlobalThreatHeatMap />
      </div>

      <MetricsBar />

      <div className="flex gap-6">
        <div className="w-7/12">
          <BusinessRiskCard />
        </div>
        <div className="w-5/12">
          <ComplianceFrameworkCard />
        </div>
      </div>

      <DashboardCharts />

      <StrategicInitiativesCard />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <ThreatCategories />
        <LiveThreatFeed />
        <TrendingThreatActors />
      </div>

      <CriticalAlerts />
    </div>
  );
}
