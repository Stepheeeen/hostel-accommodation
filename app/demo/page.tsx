"use client"

import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, Users, Home, CreditCard, Bell, BarChart3 } from "lucide-react"

export default function DemoPage() {
  const router = useRouter()

  const testAccounts = [
    {
      role: "Student",
      email: "chioma@student.com",
      password: "password",
      features: ["Browse hostels", "Book accommodations", "View bookings", "Receive notifications"],
    },
    {
      role: "Hostel Owner",
      email: "tunde@owner.com",
      password: "password",
      features: ["Add/manage hostels", "Manage rooms", "View bookings", "Track revenue"],
    },
    // {
    //   role: "Admin",
    //   email: "zainab@admin.com",
    //   password: "password",
    //   features: ["Approve hostels", "View analytics", "Manage users", "Platform oversight"],
    // },
  ]

  const features = [
    {
      icon: Home,
      title: "Hostel Discovery",
      description: "Advanced search and filtering to find the perfect hostel near your university",
    },
    {
      icon: CreditCard,
      title: "Secure Booking",
      description: "Easy booking process with mock Paystack integration for payment processing",
    },
    {
      icon: Users,
      title: "Role-Based System",
      description: "Different dashboards and features for students, owners, and admins",
    },
    {
      icon: Bell,
      title: "Notifications",
      description: "Real-time in-app notifications for bookings, payments, and approvals",
    },
    {
      icon: BarChart3,
      title: "Analytics",
      description: "Comprehensive admin dashboard with revenue charts and platform statistics",
    },
  ]

  return (
    <div className="min-h-screen bg-background px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-12 space-y-4 text-center">
          <h1 className="text-4xl font-bold text-foreground">HostelHub Demo & Testing Guide</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore the complete hostel booking platform with pre-configured test accounts and demo data
          </p>
        </div>

        {/* Test Accounts */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6">Test Accounts</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {testAccounts.map((account) => (
              <Card key={account.email}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    {account.role}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-xs font-semibold text-muted-foreground uppercase">Email</label>
                    <p className="font-mono text-sm text-foreground">{account.email}</p>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-muted-foreground uppercase">Password</label>
                    <p className="font-mono text-sm text-foreground">{account.password}</p>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-muted-foreground uppercase mb-2 block">Features</label>
                    <ul className="space-y-1">
                      {account.features.map((feature) => (
                        <li key={feature} className="text-sm text-muted-foreground flex items-center gap-2">
                          <span className="h-1.5 w-1.5 bg-primary rounded-full" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Button
                    className="w-full"
                    onClick={() => {
                      router.push("/auth?tab=login")
                    }}
                  >
                    Sign In as {account.role}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Key Features */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6">Key Features</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => {
              const Icon = feature.icon
              return (
                <Card key={feature.title}>
                  <CardContent className="pt-6 space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="bg-primary/10 p-2 rounded-lg">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="font-semibold text-foreground">{feature.title}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        {/* Demo Data */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6">Demo Data Included</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Hostels</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  8 sample hostels across major Nigerian cities (Lagos, Ibadan, Enugu, etc.)
                </p>
                <div className="bg-muted p-3 rounded-lg">
                  <p className="text-xs font-semibold text-foreground mb-2">Price Range:</p>
                  <p className="text-sm text-muted-foreground">₦95,000 - ₦220,000 per month</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Bookings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  5 completed bookings with payment records spanning the past month
                </p>
                <div className="bg-muted p-3 rounded-lg">
                  <p className="text-xs font-semibold text-foreground mb-2">Total Revenue:</p>
                  <p className="text-sm text-muted-foreground">₦670,000 in demo bookings</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Rooms</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  19 rooms across all hostels with various types: shared, ensuite, and premium suites
                </p>
                <div className="bg-muted p-3 rounded-lg">
                  <p className="text-xs font-semibold text-foreground mb-2">Availability:</p>
                  <p className="text-sm text-muted-foreground">Mix of available and fully booked rooms</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Notifications</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  Initial notifications for payments, approvals, and system messages
                </p>
                <div className="bg-muted p-3 rounded-lg">
                  <p className="text-xs font-semibold text-foreground mb-2">Try:</p>
                  <p className="text-sm text-muted-foreground">Check notification bell after login</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Testing Scenarios */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6">Testing Scenarios</h2>
          <Card>
            <CardContent className="pt-6 space-y-4">
              <div className="space-y-3">
                <div className="border-l-4 border-primary pl-4">
                  <h3 className="font-semibold text-foreground mb-1">As a Student</h3>
                  <p className="text-sm text-muted-foreground">
                    1. Browse hostels with filters • 2. View hostel details • 3. Make a booking • 4. Complete payment •
                    5. View booking history
                  </p>
                </div>

                <div className="border-l-4 border-accent pl-4">
                  <h3 className="font-semibold text-foreground mb-1">As a Hostel Owner</h3>
                  <p className="text-sm text-muted-foreground">
                    1. Add new hostel • 2. Manage rooms and pricing • 3. View pending bookings • 4. Track revenue • 5.
                    Edit hostel details
                  </p>
                </div>

                {/* <div className="border-l-4 border-green-600 pl-4">
                  <h3 className="font-semibold text-foreground mb-1">As an Admin</h3>
                  <p className="text-sm text-muted-foreground">
                    1. Review pending hostels • 2. Approve/reject hostels • 3. View analytics • 4. Monitor revenue • 5.
                    Manage users
                  </p>
                </div> */}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Start */}
        <div className="bg-primary/5 border border-primary/20 rounded-lg p-8 text-center space-y-4">
          <h2 className="text-2xl font-bold text-foreground">Ready to Explore?</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Start by browsing hostels as a student or managing your hostel as an owner
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
            <Button onClick={() => router.push("/browse")} size="lg">
              Browse Hostels
            </Button>
            <Button onClick={() => router.push("/auth?tab=login")} size="lg" variant="outline">
              Sign In
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
