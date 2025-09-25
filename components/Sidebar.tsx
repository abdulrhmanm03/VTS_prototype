"use client"

import { useState, useEffect } from "react"
import { usePathname, useSearchParams, useRouter } from "next/navigation"
import { AlertCircle, Shield, Home, BarChart, Activity, Bug, Globe, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"

const navItems = [
  { name: "Dashboard", icon: Home, path: "/" },
  {
    name: "Threat Intelligence",
    icon: AlertCircle,
    path: "/threat-intelligence-hub",
    subItems: [
      { name: "IOCs & Indicators", tab: "iocs" },
      { name: "Report & Analytics", tab: "report" },
      { name: "Global Heat Map", tab: "heatmap" },
    ],
  },
  { name: "ASM", icon: Shield, path: "/attack-surface-management" },
  { name: "Digital Risk Protection", icon: Activity, path: "/digital-risk-protection" },
  { name: "Risk Management", icon: BarChart, path: "/risk-assessment-scores" },
  { name: "AI Insights", icon: Globe, path: "/dark-web-intelligence" },
  { name: "Vulnerabilities & Exploits", icon: Bug, path: "/vulnerabilities-exploits" },
]

export default function Sidebar() {
  const [active, setActive] = useState<string>("")
  const [openSubMenu, setOpenSubMenu] = useState<string>("")
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const activeTab = searchParams.get("tab") // e.g., "iocs"

  useEffect(() => {
    // Sort navItems by path length descending to match longer (more specific) paths first
    const sortedItems = [...navItems].sort((a, b) => b.path.length - a.path.length)
    const current = sortedItems.find(item => pathname.startsWith(item.path))
    if (current) setActive(current.name)

    // If a subitem tab is present, open submenu
    if (current?.subItems && activeTab) {
      setOpenSubMenu(current.name)
    }
  }, [pathname, activeTab])

  const handleNavigation = (name: string, path: string, tab?: string) => {
    if (!tab && navItems.find(item => item.name === name)?.subItems) {
      // Toggle submenu for main item
      setOpenSubMenu(openSubMenu === name ? "" : name)
    } else {
      const url = tab ? `${path}?tab=${tab}` : path
      router.push(url)
    }
    setActive(name)
  }

  return (
    <aside className="fixed top-0 left-0 w-60 h-screen bg-muted/30 flex flex-col justify-between p-4 border-r">
      {/* Branding */}
      <div className="flex items-center mb-6 space-x-2">
        <Shield className="h-10 w-10 text-blue-400 drop-shadow-[0_0_8px_rgba(30,64,175,0.8)]" />
        <h1 className="text-2xl font-bold text-blue-400 drop-shadow-[0_0_12px_rgba(59,130,246,0.9)]">
          Sentinel Sovereign
        </h1>
      </div>

      {/* Navigation */}
      <div className="space-y-2 flex-1">
        {navItems.map((item) => {
          const isActive = active === item.name
          const hasSubItems = !!item.subItems
          const isOpen = openSubMenu === item.name

          return (
            <div key={item.name}>
              <Button
                variant="ghost"
                className={`
                  w-full justify-start bg-transparent
                  transition-transform duration-200
                  ${isActive ? "scale-105" : ""}
                  hover:scale-105
                `}
                onClick={() => handleNavigation(item.name, item.path)}
              >
                <item.icon
                  className={`
                    mr-2 h-5 w-5
                    text-blue-400
                    drop-shadow-[0_0_8px_rgba(30,64,175,0.8)]
                    ${isActive ? "animate-pulse" : ""}
                  `}
                />
                <span className={`text-gray-300 ${isActive ? "text-white drop-shadow-lg" : ""}`}>
                  {item.name}
                </span>
              </Button>

              {/* Subitems */}
              {hasSubItems && isOpen && (
                <div className="ml-6 mt-1 space-y-1">
                  {item.subItems!.map(sub => {
                    const isSubActive = activeTab === sub.tab
                    return (
                      <Button
                        key={sub.name}
                        variant="ghost"
                        className={`
                          w-full justify-start text-sm bg-transparent
                          ${isSubActive ? "text-white" : "text-gray-400"}
                          hover:text-white hover:scale-105 transition-transform duration-200
                        `}
                        onClick={() => handleNavigation(item.name, item.path, sub.tab)}
                      >
                        {sub.name}
                      </Button>
                    )
                  })}
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Settings */}
      <Button
        variant="ghost"
        className="justify-start bg-transparent transition-transform duration-200 hover:scale-105 text-gray-300"
      >
        <Settings className="mr-2 h-5 w-5 text-blue-400 drop-shadow-[0_0_8px_rgba(30,64,175,0.8)]" />
        Settings
      </Button>
    </aside>
  )
}