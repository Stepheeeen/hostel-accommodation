"use client"

import { useStore } from "@/lib/store"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { NotificationBell } from "./notification-bell"
import { LogOut } from "lucide-react"

export function Navbar() {
  const { currentUser, setCurrentUser } = useStore()
  const router = useRouter()

  const handleLogout = () => {
    setCurrentUser(null)
    router.push("/")
  }

  const getDashboardLink = () => {
    if (!currentUser) return "/auth"
    switch (currentUser.role) {
      case "student":
        return "/dashboard/student"
      case "owner":
        return "/dashboard/owner"
      case "admin":
        return "/dashboard/admin"
      default:
        return "/dashboard/student"
    }
  }

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-card shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl text-primary">
            HostelHub
          </Link>

          <div className="flex items-center gap-4">
            <NotificationBell />

            {!currentUser ? (
              <>
                <Link href="/demo" className="text-sm font-medium text-foreground hover:text-primary">
                  Demo
                </Link>
                <Link href="/auth?tab=login" className="text-sm font-medium text-foreground hover:text-primary">
                  Sign In
                </Link>
                <Link
                  href="/auth?tab=signup"
                  className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
                >
                  Sign Up
                </Link>
              </>
            ) : (
              <div className="flex items-center gap-4">
                <span
                  className="text-sm text-muted-foreground cursor-pointer hover:text-primary"
                  onClick={() => router.push(getDashboardLink())}
                >
                  {currentUser.name}
                </span>
                <Button size="sm" variant="outline" onClick={handleLogout} className="gap-2 bg-transparent">
                  <LogOut className="h-4 w-4" /> Logout
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
