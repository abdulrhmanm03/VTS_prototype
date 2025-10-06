// UserAvatar.tsx
"use client"

import { useState, useRef, useEffect } from "react"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import Cookies from "js-cookie"
import { useRouter } from "next/navigation"

export default function UserAvatar() {
  const [open, setOpen] = useState(false)
  const router = useRouter()
  const ref = useRef<HTMLDivElement>(null)

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
    Cookies.remove("token")
    router.push("/auth")
  }

  return (
    <div className="relative" ref={ref}>
      <Avatar
        className="cursor-pointer"
        onClick={() => setOpen((prev) => !prev)}
      >
        <AvatarImage src="" alt="User" />
        <AvatarFallback>SS</AvatarFallback>
      </Avatar>

      {open && (
        <div className="absolute right-0 mt-2 w-52 bg-muted/20 backdrop-blur-md rounded-lg border border-blue-400/30 shadow-lg drop-shadow-[0_0_10px_rgba(59,130,246,0.6)] z-50 p-4">
          {/* Dummy user info */}
          <div className="mb-3">
            <p className="text-sm font-medium text-white">John Doe</p>
            <p className="text-xs text-blue-200">john.doe@example.com</p>
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