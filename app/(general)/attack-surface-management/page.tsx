"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { AlertCircle, Globe, Shield, Loader2, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import AssetInventory from "@/components/asm/AssetInventory";
import ExternalExposure from "@/components/asm/ExternalExposure";

export default function AttackSurfacePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tabParam = searchParams.get("tab") || "inventory";
  const [activeTab, setActiveTab] = useState(tabParam);
  const [scanStarted, setScanStarted] = useState(false);
  const [scanCompleted, setScanCompleted] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setActiveTab(tabParam);
  }, [tabParam]);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    const params = new URLSearchParams(window.location.search);
    params.set("tab", value);
    router.replace(`?${params.toString()}`, { scroll: false });
  };

  const handleStartScan = () => {
    setScanStarted(true);
    setScanCompleted(false);
    setProgress(0);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setScanCompleted(true), 500);
          return 100;
        }
        return prev + 10;
      });
    }, 500);
  };

  return (
    <div className="flex flex-col gap-6 p-6 min-h-screen text-white">
      {/* Header with Button */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-4xl font-bold text-blue-400 drop-shadow-[0_0_12px_rgba(59,130,246,0.9)]">
            Attack Surface Management
          </h1>
          <p className="text-gray-400 mt-1">
            Discover, assess, and monitor your external attack surface
          </p>
        </div>

        <Button
          disabled={scanStarted && !scanCompleted}
          onClick={handleStartScan}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl flex items-center gap-2 shadow-lg"
        >
          {scanStarted && !scanCompleted ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Scanning...
            </>
          ) : (
            <>
              <Play className="w-4 h-4" />
              Start Scan
            </>
          )}
        </Button>
      </div>

      {/* Scan Progress (Fake Animation) */}
      {scanStarted && !scanCompleted && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="relative bg-white/10 border border-blue-500/20 rounded-2xl p-6 shadow-lg overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/30 via-blue-800/10 to-transparent animate-pulse" />
          <div className="relative z-10 flex flex-col items-center text-center space-y-4">
            <Loader2 className="w-10 h-10 animate-spin text-blue-400" />
            <p className="text-lg font-medium">Scanning external assets...</p>
            <p className="text-sm text-gray-400">
              Discovering endpoints, services, and vulnerabilities
            </p>
            <div className="w-full bg-white/10 rounded-full h-2 mt-4 overflow-hidden">
              <motion.div
                className="h-2 bg-blue-500 rounded-full"
                style={{ width: `${progress}%` }}
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.4 }}
              />
            </div>
            <p className="text-sm text-gray-400">{progress}% completed</p>
          </div>
        </motion.div>
      )}

      {/* Stats + Tabs appear only after scan */}
      {scanCompleted && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Total Assets */}
            <Card className="relative border-none text-white overflow-hidden rounded-2xl bg-white/5 shadow-lg backdrop-blur-md hover:shadow-[0_0_30px_rgba(59,130,246,0.6)] transition-shadow duration-300">
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
            <Card className="relative border-none text-white overflow-hidden rounded-2xl bg-white/5 shadow-lg backdrop-blur-md hover:shadow-[0_0_30px_rgba(59,130,246,0.6)] transition-shadow duration-300">
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
            <Card className="relative border-none text-white overflow-hidden rounded-2xl bg-white/5 shadow-lg backdrop-blur-md hover:shadow-[0_0_30px_rgba(59,130,246,0.6)] transition-shadow duration-300">
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
            <Card className="relative border-none text-white overflow-hidden rounded-2xl bg-white/5 shadow-lg backdrop-blur-md hover:shadow-[0_0_30px_rgba(59,130,246,0.6)] transition-shadow duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-900/20 via-yellow-800/10 to-transparent pointer-events-none" />
              <div className="relative z-10">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-400">
                    Risk Score
                  </CardTitle>
                  <Shield className="h-8 w-8 text-yellow-400 drop-shadow-md" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold drop-shadow-lg">
                    68/100
                  </div>
                  <p className="text-xs text-green-500">Improving trend</p>
                </CardContent>
              </div>
            </Card>
          </div>

          {/* Tabs */}
          <Tabs
            value={activeTab}
            onValueChange={handleTabChange}
            className="mt-8"
          >
            <TabsList className="bg-white/10 p-1 rounded-lg">
              <TabsTrigger value="inventory">Asset Inventory</TabsTrigger>
              <TabsTrigger value="exposure">External Exposure</TabsTrigger>
            </TabsList>

            <TabsContent value="inventory" className="mt-6">
              <AssetInventory />
            </TabsContent>

            <TabsContent value="exposure" className="mt-6">
              <ExternalExposure />
            </TabsContent>
          </Tabs>
        </motion.div>
      )}

      {/* Default View Before Scan */}
      {/* Default View Before Scan (Show Previous Summary) */}
      {!scanStarted && !scanCompleted && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-8"
        >
          {/* Last Scan Summary */}
          <div className="bg-white/5 border border-slate-700/30 backdrop-blur-lg rounded-2xl p-6 shadow-lg">
            <h2 className="text-2xl font-semibold text-blue-400 mb-2">
              Last Scan Summary
            </h2>
            <p className="text-gray-400 mb-6">
              Last external attack surface scan completed on{" "}
              <span className="text-white font-medium">October 12, 2025</span>.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Total Assets */}
              <Card className="bg-white/5 border-none rounded-2xl backdrop-blur-md text-white">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm text-gray-400">
                    Total Assets
                  </CardTitle>
                  <Globe className="h-6 w-6 text-blue-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">1,218</div>
                  <p className="text-xs text-green-500">+32 since last month</p>
                </CardContent>
              </Card>

              {/* Exposed Services */}
              <Card className="bg-white/5 border-none rounded-2xl backdrop-blur-md text-white">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm text-gray-400">
                    Exposed Services
                  </CardTitle>
                  <Shield className="h-6 w-6 text-yellow-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">43</div>
                  <p className="text-xs text-yellow-500">
                    5 high-risk endpoints
                  </p>
                </CardContent>
              </Card>

              {/* Vulnerabilities */}
              <Card className="bg-white/5 border-none rounded-2xl backdrop-blur-md text-white">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm text-gray-400">
                    Critical Vulns
                  </CardTitle>
                  <AlertCircle className="h-6 w-6 text-red-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">14</div>
                  <p className="text-xs text-green-500">-2 since last scan</p>
                </CardContent>
              </Card>

              {/* Risk Score */}
              <Card className="bg-white/5 border-none rounded-2xl backdrop-blur-md text-white">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm text-gray-400">
                    Risk Score
                  </CardTitle>
                  <Shield className="h-6 w-6 text-green-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">72/100</div>
                  <p className="text-xs text-green-500">Moderate risk level</p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Overview Section */}
          <Card className="bg-white/5 border border-slate-700/30 rounded-2xl backdrop-blur-lg p-6">
            <CardHeader>
              <CardTitle className="text-xl text-blue-400">
                External Exposure Overview
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-400 space-y-4">
              <p>
                Your organization currently maintains{" "}
                <span className="text-white font-medium">
                  76 active internet-facing domains
                </span>
                , including cloud resources, SaaS services, and externally
                hosted assets.
              </p>
              <p>
                The previous scan revealed several outdated TLS configurations
                and misconfigured DNS records that may increase your exposure
                risk.
              </p>
              <p className="text-sm text-gray-500 italic">
                Click “Start Scan” to perform a fresh discovery and risk
                assessment.
              </p>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  );
}
