"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Search, AlertCircle, Globe, Shield } from "lucide-react";
import ScanAndReport from "@/components/ScanAndReport";
import AssetInventory from "@/components/asm/AssetInventory";
import ExternalExposure from "@/components/asm/ExternalExposure";
import Monitoring from "@/components/asm/Monitoring";

export default function AttackSurfacePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tabParam = searchParams.get("tab") || "inventory";
  const [activeTab, setActiveTab] = useState(tabParam);

  useEffect(() => {
    setActiveTab(tabParam);
  }, [tabParam]);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    const params = new URLSearchParams(window.location.search);
    params.set("tab", value);
    router.replace(`?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="flex flex-col gap-6 p-6 min-h-screen text-white">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center mb-2 space-x-2">
          <h1 className="text-4xl font-bold text-blue-400 drop-shadow-[0_0_12px_rgba(59,130,246,0.9)]">
            Attack Surface Management
          </h1>
        </div>
        <div className="ml-2">
          <p className="text-gray-400">
            Discover, assess, and monitor your external attack surface
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Assets */}
        <Card
          className="relative border-none text-white overflow-hidden rounded-2xl bg-white/5 shadow-lg backdrop-blur-md 
          hover:shadow-[0_0_30px_rgba(59,130,246,0.6)] transition-shadow duration-300"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-blue-800/10 to-transparent pointer-events-none" />
          <div className="relative z-10">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">
                Total Assets
              </CardTitle>
              <Globe className="h-8 w-8 text-blue-400 drop-shadow-md" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold drop-shadow-lg">1,234</div>
              <p className="text-xs text-green-500">+12 discovered today</p>
            </CardContent>
          </div>
        </Card>

        {/* Critical Vulnerabilities */}
        <Card
          className="relative border-none text-white overflow-hidden rounded-2xl bg-white/5 shadow-lg backdrop-blur-md 
          hover:shadow-[0_0_30px_rgba(59,130,246,0.6)] transition-shadow duration-300"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-red-900/20 via-red-800/10 to-transparent pointer-events-none" />
          <div className="relative z-10">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">
                Critical Vulnerabilities
              </CardTitle>
              <AlertCircle className="h-8 w-8 text-red-500 drop-shadow-md" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold drop-shadow-lg">12</div>
              <p className="text-xs text-green-500">-3 from last week</p>
            </CardContent>
          </div>
        </Card>

        {/* Exposed Services */}
        <Card
          className="relative border-none text-white overflow-hidden rounded-2xl bg-white/5 shadow-lg backdrop-blur-md 
          hover:shadow-[0_0_30px_rgba(59,130,246,0.6)] transition-shadow duration-300"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-green-900/20 via-green-800/10 to-transparent pointer-events-none" />
          <div className="relative z-10">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">
                Exposed Services
              </CardTitle>
              <Globe className="h-8 w-8 text-green-400 drop-shadow-md" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold drop-shadow-lg">47</div>
              <p className="text-xs text-yellow-500">5 require attention</p>
            </CardContent>
          </div>
        </Card>

        {/* Risk Score */}
        <Card
          className="relative border-none text-white overflow-hidden rounded-2xl bg-white/5 shadow-lg backdrop-blur-md 
          hover:shadow-[0_0_30px_rgba(59,130,246,0.6)] transition-shadow duration-300"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-900/20 via-yellow-800/10 to-transparent pointer-events-none" />
          <div className="relative z-10">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">
                Risk Score
              </CardTitle>
              <Shield className="h-8 w-8 text-yellow-400 drop-shadow-md" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold drop-shadow-lg">68/100</div>
              <p className="text-xs text-green-500">Improving trend</p>
            </CardContent>
          </div>
        </Card>
      </div>

      {/* Search + Actions */}
      <div className="flex items-center space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search assets, domains, IPs..."
            className="pl-8 bg-white/10 border-none rounded-lg text-white placeholder-gray-400"
          />
        </div>
        <Button
          variant="outline"
          className="bg-white/10 hover:bg-white/20 border-none"
        >
          Filter
        </Button>
        <Button className="bg-blue-500 hover:bg-blue-600 shadow-lg">
          Start Scan
        </Button>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={handleTabChange} className="mt-4">
        <TabsList className="bg-white/10 p-1 rounded-lg">
          <TabsTrigger value="inventory">Asset Inventory</TabsTrigger>
          <TabsTrigger value="scan">Scan and Report</TabsTrigger>
          <TabsTrigger value="exposure">External Exposure</TabsTrigger>
          <TabsTrigger value="monitoring">Monitoring</TabsTrigger>
        </TabsList>

        <TabsContent value="inventory" className="mt-6">
          <AssetInventory />
        </TabsContent>

        <TabsContent value="scan" className="mt-6">
          <ScanAndReport />
        </TabsContent>

        <TabsContent value="exposure" className="mt-6">
          <ExternalExposure />
        </TabsContent>

        <TabsContent value="monitoring" className="mt-6">
          <Monitoring />
        </TabsContent>
      </Tabs>
    </div>
  );
}
