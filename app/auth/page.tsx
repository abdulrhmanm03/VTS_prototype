"use client"

import { useState } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Shield } from "lucide-react"

export default function AuthPage() {
  const [tab, setTab] = useState("login")

  return (
    <div className="flex flex-col items-center justify-center from-gray-900 via-black to-gray-800 p-6 text-white">
      {/* Auth Card */}
      <Card className="relative w-full max-w-md border-none text-white overflow-hidden rounded-2xl bg-white/5 shadow-lg backdrop-blur-md mt-10 ">
        {/* Overlay */}
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
              Sign in to continue or create a new account
            </p>
          </CardHeader>

          <CardContent className="pt-4">
            <Tabs value={tab} onValueChange={setTab} className="w-full">
              <TabsList className="grid grid-cols-2 mb-6 bg-white/10 rounded-lg">
                <TabsTrigger
                  value="login"
                  className="text-white data-[state=active]:bg-blue-500 data-[state=active]:text-white rounded-md"
                >
                  Login
                </TabsTrigger>
                <TabsTrigger
                  value="signup"
                  className="text-white data-[state=active]:bg-blue-500 data-[state=active]:text-white rounded-md"
                >
                  Sign Up
                </TabsTrigger>
              </TabsList>

              {/* Login Tab */}
              <TabsContent value="login" className="space-y-4">
                <div>
                  <label className="text-sm text-gray-300">Email</label>
                  <Input
                    type="email"
                    placeholder="you@example.com"
                    className="bg-white/10 border-none text-white placeholder-gray-400 mt-1"
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-300">Password</label>
                  <Input
                    type="password"
                    placeholder="••••••••"
                    className="bg-white/10 border-none text-white placeholder-gray-400 mt-1"
                  />
                </div>
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg">
                  Login
                </Button>
                <p className="text-xs text-gray-400 text-center">
                  Forgot password? <span className="text-blue-400 cursor-pointer">Reset</span>
                </p>
              </TabsContent>

              {/* Sign Up Tab */}
              <TabsContent value="signup" className="space-y-4">
                <div>
                  <label className="text-sm text-gray-300">Full Name</label>
                  <Input
                    type="text"
                    placeholder="John Doe"
                    className="bg-white/10 border-none text-white placeholder-gray-400 mt-1"
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-300">Email</label>
                  <Input
                    type="email"
                    placeholder="you@example.com"
                    className="bg-white/10 border-none text-white placeholder-gray-400 mt-1"
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-300">Password</label>
                  <Input
                    type="password"
                    placeholder="••••••••"
                    className="bg-white/10 border-none text-white placeholder-gray-400 mt-1"
                  />
                </div>
                <Button className="w-full bg-green-600 hover:bg-green-700 text-white rounded-lg">
                  Create Account
                </Button>
              </TabsContent>
            </Tabs>
          </CardContent>
        </div>
      </Card>
    </div>
  )
}