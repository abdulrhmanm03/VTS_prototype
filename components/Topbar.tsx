"use client"

import { Search, Bell, Globe, Zap } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

export default function Topbar() {
  return (
    <header className="flex items-center justify-between px-6 py-3 border-b-0 bg-muted/20">
      {/* Left side (Quick Action dropdown placeholder) */}
      <div className="flex items-center space-x-3">
        <div className="relative">
          <Button
            variant="ghost"
            size="sm"
            className="flex items-center space-x-1 text-white hover:text-blue-400 transition"
          >
            <Zap className="h-4 w-4" />
            <span className="text-sm font-medium">Quick Action</span>
          </Button>
          {/* Dropdown placeholder */}
          <div className="absolute mt-1 w-48 bg-gray-800 text-white rounded shadow-lg hidden group-hover:block">
            <ul>
              <li className="px-3 py-2 hover:bg-gray-700 cursor-pointer">Action 1</li>
              <li className="px-3 py-2 hover:bg-gray-700 cursor-pointer">Action 2</li>
              <li className="px-3 py-2 hover:bg-gray-700 cursor-pointer">Action 3</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Center (search bar) */}
      <div className="relative flex-1 max-w-md mx-auto">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-blue-400 drop-shadow-[0_0_6px_rgba(59,130,246,0.8)] z-10 pointer-events-none" />
        <Input
          placeholder="Search..."
          className="pl-8 w-full bg-white/10 text-white placeholder-blue-200 backdrop-blur-md border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-70 drop-shadow-[0_0_10px_rgba(59,130,246,0.6)]"
        />
      </div>

      {/* Right side (notifications, lang, avatar) */}
      <div className="flex items-center space-x-4 ml-4">
        <Button
          variant="ghost"
          size="icon"
          className="text-white hover:text-blue-400 transition"
        >
          <Bell className="h-5 w-5" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="text-white hover:text-blue-400 transition"
        >
          <Globe className="h-5 w-5" />
        </Button>
        <Avatar>
          <AvatarImage src="" alt="User" />
          <AvatarFallback>SS</AvatarFallback>
        </Avatar>
      </div>
    </header>
  )
}