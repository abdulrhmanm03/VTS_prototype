"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Shield } from "lucide-react"
import Cookies from "js-cookie"

export default function AuthPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)

  const API_URL = "http://localhost:3000/api/auth"

  const handleSubmit = async () => {
    setLoading(true)
    setMessage("")

    try {
      const res = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })

      const data = await res.json()

      if (!res.ok) {
        setMessage(data.detail || "Something went wrong")
      } else {
        setMessage(data.message)

        if (data.token) {
          Cookies.set("token", data.token, {
            expires: 7,
            secure: true,
            sameSite: "strict",
            path: "/",
          })

          try {
            localStorage.setItem("token", data.token)
          } catch (err) {
            console.error("Failed to save token in localStorage:", err)
          }
        }

        setPassword("")
        router.push("/")
      }
    } catch (err) {
      setMessage("Failed to connect to server")
      console.error("Auth error:", err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center from-gray-900 via-black to-gray-800 p-6 text-white min-h-screen">
      <Card className="relative w-full max-w-md border-none text-white overflow-hidden rounded-2xl bg-white/5 shadow-lg backdrop-blur-md mt-10">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 via-blue-800/10 to-transparent pointer-events-none" />
        <div className="relative z-10">
          <CardHeader className="pb-0">
            <CardTitle className="text-2xl font-semibold text-center text-blue-400 drop-shadow-[0_0_8px_rgba(59,130,246,0.9)] flex items-center mb-6 space-x-3">
              <Shield className="h-12 w-12 text-blue-400 drop-shadow-[0_0_8px_rgba(30,64,175,0.8)]" />
              <h1 className="text-4xl font-bold text-blue-400 drop-shadow-[0_0_12px_rgba(59,130,246,0.9)]">
                Sentinel Sovereign
              </h1>
            </CardTitle>
            <p className="text-center text-sm text-gray-400">
              Sign in to continue
            </p>
          </CardHeader>

          <CardContent className="pt-4 space-y-4">
            <div>
              <label className="text-sm text-gray-300">Email</label>
              <Input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white/10 border-none text-white placeholder-gray-400 mt-1"
              />
            </div>
            <div>
              <label className="text-sm text-gray-300">Password</label>
              <Input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-white/10 border-none text-white placeholder-gray-400 mt-1"
              />
            </div>
            <Button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
            >
              {loading ? "Processing..." : "Login"}
            </Button>
            <p className="text-xs text-gray-400 text-center">
              Forgot password? <span className="text-blue-400 cursor-pointer">Reset</span>
            </p>

            {message && (
              <p className={`text-center mt-4 text-sm ${message.toLowerCase().includes("success") ? "text-green-400" : "text-red-400"}`}>
                {message}
              </p>
            )}
          </CardContent>
        </div>
      </Card>
    </div>
  )
}