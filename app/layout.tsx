import "./globals.css"
import type { Metadata } from "next"
import { Suspense} from "react"

export const metadata: Metadata = {
  title: "Sentinel Sovereign",
  description: "Security dashboard and auth system",
}

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