"use client";

import { useEffect, useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useSearchParams, useRouter } from "next/navigation";
import ThreatIntelOverview from "@/components/threat_intel/Overview";
import ThreatLandscape from "@/components/threat_intel/Landscape";
import Enrichment from "@/components/threat_intel/Enrishment";
import ThreatActors from "@/components/threat_intel/ThreatActor";

export default function ThreatIntelPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const tabParam = searchParams.get("tab");
  const [defaultTab, setDefaultTab] = useState("overview");

  useEffect(() => {
    setDefaultTab(tabParam || "overview");
  }, [tabParam]);

  const handleTabChange = (tab: string) => {
    router.replace(`?tab=${tab}`);
    setDefaultTab(tab);
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-4xl font-bold text-blue-400 drop-shadow-[0_0_12px_rgba(59,130,246,0.9)]">
          Threat Intelligence Hub
        </h1>
        <p className="text-muted-foreground">
          Centralized management and analysis of threat intelligence data
        </p>
      </div>

      <Tabs value={defaultTab} onValueChange={handleTabChange}>
        <TabsList className="relative flex space-x-2 bg-white/5 backdrop-blur-md rounded-2xl p-1 shadow-lg hover:shadow-[0_0_30px_rgba(59,130,246,0.6)] transition-shadow duration-300 border-none">
          <TabsTrigger
            value="overview"
            className="flex-1 text-white/90 bg-white/5 rounded-xl px-4 py-2 text-sm font-medium hover:bg-white/10 transition-all"
          >
            Overview
          </TabsTrigger>
          <TabsTrigger
            value="landscape"
            className="flex-1 text-white/90 bg-white/5 rounded-xl px-4 py-2 text-sm font-medium hover:bg-white/10 transition-all"
          >
            Threat Landscape
          </TabsTrigger>
          <TabsTrigger
            value="enrichment"
            className="flex-1 text-white/90 bg-white/5 rounded-xl px-4 py-2 text-sm font-medium hover:bg-white/10 transition-all"
          >
            Enrichment
          </TabsTrigger>
          <TabsTrigger
            value="threat-actors"
            className="flex-1 text-white/90 bg-white/5 rounded-xl px-4 py-2 text-sm font-medium hover:bg-white/10 transition-all"
          >
            Threat Actors
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-4">
          <ThreatIntelOverview />
        </TabsContent>

        <TabsContent value="landscape" className="mt-4">
          <ThreatLandscape />
        </TabsContent>

        <TabsContent value="enrichment" className="mt-4">
          <Enrichment />
        </TabsContent>

        <TabsContent value="threat-actors" className="mt-4">
          <ThreatActors />
        </TabsContent>
      </Tabs>
    </div>
  );
}
