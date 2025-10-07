"use client"

import { useState, useRef, useEffect } from "react"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import Cookies from "js-cookie"
import { useRouter } from "next/navigation"
import { jwtDecode } from "jwt-decode"

interface DecodedToken {
  id?: string
  fullName?: string
  email?: string
  exp?: number
}

export default function UserAvatar() {
  const [open, setOpen] = useState(false)
  const [user, setUser] = useState<DecodedToken | null>(null)
  const router = useRouter()
  const ref = useRef<HTMLDivElement>(null)

  console.log("UserAvatar mounted")

  // Decode JWT token from cookies or localStorage
  useEffect(() => {
    console.log("UserAvatar useEffect running")
    let token = Cookies.get("token")

    // fallback to localStorage
    if (!token) {
      token = localStorage.getItem("token") || undefined
    }

    if (token) {
      try {
        const decoded: DecodedToken = jwtDecode(token)
        console.log("Decoded token:", decoded)
        setUser(decoded)
      } catch (error) {
        console.error("Failed to decode token:", error)
      }
    } else {
      console.log("No token found in cookies or localStorage")
    }
  }, [])

  // Close the popover if clicked outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleSignOut = () => {
    // Remove token from both cookies and localStorage
    Cookies.remove("token")
    localStorage.removeItem("token")
    router.push("/auth")
  }

  const initials = user?.fullName
    ? user.fullName
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
    : "U"

  return (
    <div className="relative" ref={ref}>
      <Avatar
        className="cursor-pointer"
        onClick={() => setOpen((prev) => !prev)}
      >
        <AvatarImage src="" alt={user?.fullName || "User"} />
        <AvatarFallback>{initials}</AvatarFallback>
      </Avatar>

      {open && (
        <div className="absolute right-0 mt-2 w-52 bg-muted/20 backdrop-blur-md rounded-lg border border-blue-400/30 shadow-lg drop-shadow-[0_0_10px_rgba(59,130,246,0.6)] z-50 p-4">
          <div className="mb-3">
            <p className="text-sm font-medium text-white">
              {user?.fullName || "Unknown User"}
            </p>
            <p className="text-xs text-blue-200">
              {user?.email || "no-email@example.com"}
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="w-full text-white border-blue-400 hover:bg-blue-400/20"
            onClick={handleSignOut}
          >
            Sign Out
          </Button>
        </div>
      )}
    </div>
  )
}