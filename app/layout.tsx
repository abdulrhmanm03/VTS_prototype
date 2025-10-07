"use client"

import "./globals.css"
import { Suspense} from "react"


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className="relative min-h-screen">
        <Suspense fallback={<div>Loading...</div>}>
                {children}
        </Suspense>
      </body>
    </html>
  )
}