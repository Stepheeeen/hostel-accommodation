"use client"

import type React from "react"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { loginUser, signupUser } from "@/lib/auth"
import { useStore } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function AuthPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const { toast } = useToast()
  const { currentUser } = useStore()
  const [tab, setTab] = useState(searchParams.get("tab") || "login")

  // Login form
  const [loginEmail, setLoginEmail] = useState("chioma@student.com")
  const [loginPassword, setLoginPassword] = useState("password")
  const [loginLoading, setLoginLoading] = useState(false)

  // Signup form
  const [signupName, setSignupName] = useState("")
  const [signupEmail, setSignupEmail] = useState("")
  const [signupPassword, setSignupPassword] = useState("")
  const [signupRole, setSignupRole] = useState<"student" | "owner">("student")
  const [signupLoading, setSignupLoading] = useState(false)

  if (currentUser) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6 space-y-4">
            <p className="text-foreground">Already logged in as {currentUser.name}</p>
            <Button
              className="w-full"
              onClick={() => {
                router.push(
                  currentUser.role === "student"
                    ? "/dashboard/student"
                    : currentUser.role === "owner"
                      ? "/dashboard/owner"
                      : "/dashboard/admin",
                )
              }}
            >
              Go to Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoginLoading(true)

    const result = loginUser(loginEmail, loginPassword)
    if (result.success) {
      toast({ title: "Login successful!", description: "Welcome back!" })
      router.push(
        result.user?.role === "student"
          ? "/dashboard/student"
          : result.user?.role === "owner"
            ? "/dashboard/owner"
            : "/dashboard/admin",
      )
    } else {
      toast({ title: "Login failed", description: result.error, variant: "destructive" })
    }
    setLoginLoading(false)
  }

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setSignupLoading(true)

    const result = signupUser(signupName, signupEmail, signupPassword, signupRole)
    if (result.success) {
      toast({ title: "Account created!", description: "Welcome to HostelHub" })
      router.push(signupRole === "student" ? "/dashboard/student" : "/dashboard/owner")
    } else {
      toast({ title: "Signup failed", description: result.error, variant: "destructive" })
    }
    setSignupLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-card/50 px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-md">
        <Tabs value={tab} onValueChange={setTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Sign In</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>

          {/* Login Tab */}
          <TabsContent value="login">
            <Card>
              <CardHeader>
                <CardTitle>Sign In to HostelHub</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleLogin} className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-foreground">Email</label>
                    <Input
                      type="email"
                      placeholder="your@email.com"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground">Password</label>
                    <Input
                      type="password"
                      placeholder="••••••••"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={loginLoading}>
                    {loginLoading ? "Signing in..." : "Sign In"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Signup Tab */}
          <TabsContent value="signup">
            <Card>
              <CardHeader>
                <CardTitle>Create Account</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSignup} className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-foreground">Full Name</label>
                    <Input
                      type="text"
                      placeholder="Your name"
                      value={signupName}
                      onChange={(e) => setSignupName(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground">Email</label>
                    <Input
                      type="email"
                      placeholder="your@email.com"
                      value={signupEmail}
                      onChange={(e) => setSignupEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground">Password</label>
                    <Input
                      type="password"
                      placeholder="••••••••"
                      value={signupPassword}
                      onChange={(e) => setSignupPassword(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground">I am a:</label>
                    <div className="mt-2 space-y-2">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          value="student"
                          checked={signupRole === "student"}
                          onChange={(e) => setSignupRole(e.target.value as "student" | "owner")}
                        />
                        <span className="text-sm">Student</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          value="owner"
                          checked={signupRole === "owner"}
                          onChange={(e) => setSignupRole(e.target.value as "student" | "owner")}
                        />
                        <span className="text-sm">Hostel Owner</span>
                      </label>
                    </div>
                  </div>
                  <Button type="submit" className="w-full" disabled={signupLoading}>
                    {signupLoading ? "Creating account..." : "Sign Up"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
