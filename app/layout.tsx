import "@/app/globals.css"
import { Inter } from "next/font/google"
import Sidebar from "@/components/Sidebar"
import Topbar from "@/components/Topbar"

const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({
  children,
}: {  
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} relative min-h-screen`}>
        {/* Full-page gradient background */}
        <div className="fixed inset-0 bg-gradient-to-br from-blue-950 via-black to-blue-900/20 -z-10" />

        {/* Sidebar is fixed */}
        <Sidebar />

        {/* Main content scrolls */}
        <div className="ml-60 flex flex-col min-h-screen text-white">
          {/* Topbar */}
          <Topbar />

          {/* Scrollable main area */}
          <main className="flex-1 p-6 overflow-y-auto">
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}