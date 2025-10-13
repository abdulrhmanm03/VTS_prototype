"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import Overview from "@/components/security_awareness/Overview";
import TargetGroups from "@/components/security_awareness/TargetGroup";
import TemplatesCard from "@/components/security_awareness/Temblates";
import CampaignsCard from "@/components/security_awareness/Campaigns";

export default function SecurityAwarenessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentTab = searchParams.get("tab") || "overview";

  const tabs = [
    { name: "Overview", tab: "overview" },
    { name: "Group and Targets", tab: "group-and-targets" },
    { name: "Campaign", tab: "campaign" },
    { name: "Templates", tab: "templates" },
  ];

  const handleTabChange = (value: string) => {
    router.push(`?tab=${value}`);
  };

  return (
    <div className="p-6">
      <div>
        <h1 className="text-4xl font-bold text-blue-400 drop-shadow-[0_0_12px_rgba(59,130,246,0.9)]">
          Security Awareness
        </h1>
        <p className="text-gray-400">
          Empower your team with knowledge and best practices to mitigate cyber
          threats.
        </p>
      </div>

      <Tabs
        value={currentTab}
        onValueChange={handleTabChange}
        className="mt-10"
      >
        <TabsList className="grid grid-cols-4 w-full bg-white/5 backdrop-blur-md border-none">
          {tabs.map((t) => (
            <TabsTrigger
              key={t.tab}
              value={t.tab}
              className="data-[state=active]:text-blue-400 data-[state=active]:shadow-[0_0_12px_rgba(59,130,246,0.8)] transition"
            >
              {t.name}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="overview">
          <Overview />
        </TabsContent>

        <TabsContent value="group-and-targets">
          <TargetGroups />
        </TabsContent>

        <TabsContent value="campaign">
          <CampaignsCard />
        </TabsContent>

        <TabsContent value="templates">
          <TemplatesCard />
        </TabsContent>
      </Tabs>
    </div>
  );
}
