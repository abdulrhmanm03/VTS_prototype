"use client";

import { useState, useEffect } from "react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import {
  AlertCircle,
  Shield,
  Home,
  BarChart,
  Activity,
  Bug,
  Swords,
  Settings,
  BadgeCheck,
  Ribbon,
  Brain,
  Link,
  AlertTriangle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import RegionToggle from "@/components/RegionToggle";

interface SidebarProps {
  collapsed: boolean;
}

export default function Sidebar({ collapsed }: SidebarProps) {
  const [active, setActive] = useState<string>("");
  const [openSubMenu, setOpenSubMenu] = useState<string>("");
  const [region, setRegion] = useState<"global" | "uae">("global");
  const [role, setRole] = useState<"SOC" | "IR" | "TI" | "TH">("SOC");
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const activeTab = searchParams.get("tab");

  const navItems = [
    { name: "Access Gate", icon: BadgeCheck, path: "/onboarding" },
    { name: "Command Nexus", icon: Home, path: "/" },
    {
      name: "IntelliSphere",
      icon: AlertCircle,
      path: "/threat-intelligence-hub",
      subItems: [
        { name: "Overview", tab: "overview" },
        { name: "Threat Landscape", tab: "landscape" },
        { name: "Enrichment", tab: "enrichment" },
        { name: "Threat Actors", tab: "threat-actors" },
        // { name: "Malware Intelligence", tab: "Malware Intelligence" },
        // { name: "Ransomware Intelligence", tab: "Ransomware Intelligence" },
        // { name: "Data Leaks", tab: "Data Leaks" },
        // { name: "Fraud Intelligence", tab: "Fraud Intelligence" },
      ],
    },
    {
      name: "Surface Sentinel",
      icon: Shield,
      path: "/attack-surface-management",
    },
    { name: "Deep Guard", icon: Activity, path: "/digital-risk-protection" },
    { name: "Risk Register", icon: BarChart, path: "/risk-assessment-scores" },
    { name: "VulnMatrix", icon: Bug, path: "/vulnerabilities-exploits" },
    { name: "Red Shift", icon: Swords, path: "/offensive-security" },
    { name: "Sentinel Analyst", icon: Brain, path: "/ai" },
    {
      name: "Incident Management",
      icon: AlertTriangle,
      path: "/incident-management",
    },
    {
      name: "Security Awareness",
      icon: Ribbon,
      path: "/security-awareness",
      subItems: [
        { name: "Overview", tab: "overview" },
        { name: "Group and Targets", tab: "group-and-targets" },
        { name: "Campaign", tab: "campaign" },
        { name: "Templates", tab: "templates" },
      ],
    },
    { name: "Integrations", icon: Link, path: "/integrations" },
  ];

  useEffect(() => {
    const sortedItems = [...navItems].sort(
      (a, b) => b.path.length - a.path.length
    );
    const current = sortedItems.find((item) => pathname.startsWith(item.path));
    if (current) setActive(current.name);
    if (current?.subItems && activeTab) setOpenSubMenu(current.name);
  }, [pathname, activeTab]);

  const handleNavigation = (name: string, path: string, tab?: string) => {
    const item = navItems.find((i) => i.name === name);
    if (!tab && item?.subItems) {
      if (collapsed) {
        const firstSubTab = item.subItems[0].tab;
        router.push(`${path}?tab=${firstSubTab}`);
        setActive(name);
      } else {
        setOpenSubMenu(openSubMenu === name ? "" : name);
        setActive(name);
      }
    } else {
      const url = tab ? `${path}?tab=${tab}` : path;
      router.push(url);
      setActive(name);
    }
  };

  return (
    <aside
      className={`fixed top-0 left-0 h-screen bg-slate-900/40 backdrop-blur-xl flex flex-col p-4 border-r border-slate-800 transition-all duration-300 ${
        collapsed ? "w-20" : "w-64"
      }`}
    >
      {/* Branding */}
      <div
        className={`flex items-center mb-5 space-x-2 ${
          collapsed ? "justify-center" : ""
        }`}
      >
        <Shield className="h-10 w-10 text-blue-400 drop-shadow-[0_0_8px_rgba(30,64,175,0.8)]" />
        {!collapsed && (
          <h1 className="text-2xl font-bold text-blue-400 drop-shadow-[0_0_12px_rgba(59,130,246,0.9)]">
            CHURCHILL<sup className="text-xl align-super">™</sup>
          </h1>
        )}
      </div>

      {/* Integrated Components */}
      {!collapsed && (
        <div className="space-y-4 mb-5">
          {/* Region Toggle */}
          <RegionToggle region={region} onChange={setRegion} />

          {/* Role Selector styled like header */}
          <div className="bg-slate-800/40 border border-slate-700/50 rounded-lg p-3">
            <p className="text-xs text-slate-400 mb-2 uppercase tracking-wide">
              Active Role
            </p>
            <div className="flex flex-wrap gap-2">
              {(["SOC", "IR", "TI", "TH"] as const).map((r) => (
                <button
                  key={r}
                  onClick={() => setRole(r)}
                  className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${
                    role === r
                      ? "bg-blue-600 text-white shadow-lg"
                      : "text-slate-400 hover:bg-slate-700 hover:text-white"
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="space-y-2 flex-1 overflow-y-auto hide-scrollbar pr-1">
        {navItems.map((item) => {
          const isActive = active === item.name;
          const hasSubItems = !!item.subItems;
          const isOpen = openSubMenu === item.name;

          return (
            <div key={item.name}>
              <Button
                variant="ghost"
                className={`w-full justify-start bg-transparent transition-transform duration-200 ${
                  isActive ? "scale-105" : ""
                } hover:scale-105`}
                onClick={() => handleNavigation(item.name, item.path)}
              >
                <item.icon
                  className={`mr-2 h-5 w-5 text-blue-400 drop-shadow-[0_0_8px_rgba(30,64,175,0.8)] ${
                    isActive ? "animate-pulse" : ""
                  }`}
                />
                {!collapsed && (
                  <span
                    className={`text-gray-300 ${
                      isActive ? "text-white drop-shadow-lg" : ""
                    }`}
                  >
                    {item.name}
                  </span>
                )}
              </Button>

              {!collapsed && hasSubItems && isOpen && (
                <div className="ml-6 mt-1 space-y-1">
                  {item.subItems!.map((sub) => {
                    const isSubActive = activeTab === sub.tab;
                    return (
                      <Button
                        key={sub.name}
                        variant="ghost"
                        className={`w-full justify-start text-sm bg-transparent ${
                          isSubActive ? "text-white" : "text-gray-400"
                        } hover:text-white hover:scale-105 transition-transform duration-200`}
                        onClick={() =>
                          handleNavigation(item.name, item.path, sub.tab)
                        }
                      >
                        {sub.name}
                      </Button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Settings Button */}
      <Button
        variant="ghost"
        className="justify-start bg-transparent transition-transform duration-200 hover:scale-105 text-gray-300 mt-4"
      >
        <Settings className="mr-2 h-5 w-5 text-blue-400 drop-shadow-[0_0_8px_rgba(30,64,175,0.8)]" />
        {!collapsed && "Settings"}
      </Button>
    </aside>
  );
}
