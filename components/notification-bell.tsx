"use client"

import { useState } from "react"
import { useStore } from "@/lib/store"
import { Bell } from "lucide-react"
import { NotificationDropdown } from "./notification-dropdown"

export function NotificationBell() {
  const { currentUser, getUserNotifications } = useStore()
  const [showDropdown, setShowDropdown] = useState(false)

  if (!currentUser) return null

  const notifications = getUserNotifications(currentUser.id)
  const unreadCount = notifications.filter((n) => !n.read).length

  return (
    <div className="relative">
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className="relative p-2 text-muted-foreground hover:text-foreground transition-colors"
      >
        <Bell className="h-5 w-5" />
        {unreadCount > 0 && <span className="absolute top-1 right-1 h-2 w-2 bg-destructive rounded-full" />}
      </button>

      {showDropdown && <NotificationDropdown onClose={() => setShowDropdown(false)} />}
    </div>
  )
}
