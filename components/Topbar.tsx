// Topbar.tsx
"use client"

import { Search, Bell, Globe, Zap, Menu } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import UserAvatar from "./UserAvatar"

interface TopbarProps {
  toggleSidebar: () => void
}

export default function Topbar({ toggleSidebar }: TopbarProps) {
  return (
    <header className="flex items-center justify-between px-6 py-3 border-b-0 bg-muted/20">
      {/* Left side: toggle + quick action */}
      <div className="flex items-center space-x-3">
        <Button
          variant="ghost"
          size="icon"
          className="text-white hover:text-blue-400 transition"
          onClick={toggleSidebar}
        >
          <Menu className="h-5 w-5" />
        </Button>

        <Button
          variant="ghost"
          size="sm"
          className="flex items-center space-x-1 text-white hover:text-blue-400 transition"
        >
          <Zap className="h-4 w-4" />
          <span className="text-sm font-medium">Quick Action</span>
        </Button>
      </div>

      {/* Center search */}
      <div className="relative flex-1 max-w-md mx-auto">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-blue-400 drop-shadow-[0_0_6px_rgba(59,130,246,0.8)] z-10 pointer-events-none" />
        <Input
          placeholder="Search..."
          className="pl-8 w-full bg-white/10 text-white placeholder-blue-200 backdrop-blur-md border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-70 drop-shadow-[0_0_10px_rgba(59,130,246,0.6)]"
        />
      </div>

      {/* Right side */}
      <div className="flex items-center space-x-4 ml-4">
        <Button variant="ghost" size="icon" className="text-white hover:text-blue-400 transition">
          <Bell className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon" className="text-white hover:text-blue-400 transition">
          <Globe className="h-5 w-5" />
        </Button>
        <UserAvatar />
      </div>
    </header>
  )
}