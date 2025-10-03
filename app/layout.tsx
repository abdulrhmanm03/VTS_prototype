// RootLayout.tsx
"use client"

import { Suspense, useState } from "react"
import "@/app/globals.css"
import Sidebar from "@/components/Sidebar"
import Topbar from "@/components/Topbar"
import Chatbot from "@/components/Chatbot"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  return (
    <html lang="en" className="dark">
      <body className="relative min-h-screen">
        <Suspense fallback={<div>Loading...</div>}>
        {/* Background */}
        <div className="fixed inset-0 bg-gradient-to-br from-blue-950 via-black to-blue-900/20 -z-10" />

        {/* Sidebar */}
        <Sidebar collapsed={sidebarCollapsed} />

        {/* Main content */}
        <div className={`flex flex-col min-h-screen transition-all duration-300 ${sidebarCollapsed ? "ml-20" : "ml-60"} text-white`}>
          <Topbar
            collapsed={sidebarCollapsed}
            toggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)}
          />
          <main className="flex-1 p-6 overflow-y-auto">{children}</main>
        </div>

        {/* Floating Chatbot */}
        <Chatbot />
        </Suspense>
      </body>
    </html>
  )
}