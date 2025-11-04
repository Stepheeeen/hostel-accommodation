"use client"

import type React from "react"

import { useStore } from "@/lib/store"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { currentUser } = useStore()
  const router = useRouter()

  useEffect(() => {
    if (!currentUser) {
      router.push("/auth")
    }
  }, [currentUser, router])

  if (!currentUser) {
    return null
  }

  return <>{children}</>
}
