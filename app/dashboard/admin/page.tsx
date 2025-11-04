"use client"

import { useState } from "react"
import { useStore } from "@/lib/store"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { HostelApprovalModal } from "@/components/hostel-approval-modal"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts"
import { CheckCircle, TrendingUp, Users, Home, DollarSign } from "lucide-react"

export default function AdminDashboard() {
  const { hostels, bookings, payments, users } = useStore()
  const [selectedHostel, setSelectedHostel] = useState<string | null>(null)
  const [refreshKey, setRefreshKey] = useState(0)

  const hostelToApprove = hostels.find((h) => h.id === selectedHostel && h.status === "pending")

  const hostelStats = {
    total: hostels.length,
    active: hostels.filter((h) => h.status === "active").length,
    pending: hostels.filter((h) => h.status === "pending").length,
    inactive: hostels.filter((h) => h.status === "inactive").length,
  }

  const userStats = {
    total: users.length,
    students: users.filter((u) => u.role === "student").length,
    owners: users.filter((u) => u.role === "owner").length,
    admins: users.filter((u) => u.role === "admin").length,
  }

  const bookingStats = {
    total: bookings.length,
    paid: bookings.filter((b) => b.status === "paid").length,
    pending: bookings.filter((b) => b.status === "pending").length,
    cancelled: bookings.filter((b) => b.status === "cancelled").length,
  }

  const totalRevenue = bookings.filter((b) => b.status === "paid").reduce((sum, b) => sum + b.amount, 0)
  const monthlyRevenue = bookings.filter((b) => b.status === "paid").reduce((sum, b) => sum + b.amount, 0)
  const avgBookingValue = bookingStats.paid > 0 ? Math.round(totalRevenue / bookingStats.paid) : 0

  const chartData = [
    { name: "Jan", revenue: 0, bookings: 0 },
    { name: "Feb", revenue: 0, bookings: 0 },
    { name: "Mar", revenue: totalRevenue, bookings: bookingStats.paid },
  ]

  const pieData = [
    { name: "Paid", value: bookingStats.paid },
    { name: "Pending", value: bookingStats.pending },
    { name: "Cancelled", value: bookingStats.cancelled },
  ]

  const hostelStatusData = [
    { name: "Active", value: hostelStats.active },
    { name: "Pending", value: hostelStats.pending },
    { name: "Inactive", value: hostelStats.inactive },
  ]

  const COLORS = ["#1f4788", "#d4af37", "#8b5a3c"]

  const pendingHostels = hostels.filter((h) => h.status === "pending")

  return (
    <div className="min-h-screen bg-background px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8 space-y-2">
          <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
          <p className="text-muted-foreground">Platform overview and management</p>
        </div>

        {/* KPI Cards */}
        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardContent className="pt-6 space-y-2">
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">Total Users</p>
                <Users className="h-4 w-4 text-primary" />
              </div>
              <p className="text-3xl font-bold text-primary">{userStats.total}</p>
              <p className="text-xs text-muted-foreground">
                {userStats.students} students, {userStats.owners} owners
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 space-y-2">
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">Active Hostels</p>
                <Home className="h-4 w-4 text-accent" />
              </div>
              <p className="text-3xl font-bold text-accent">{hostelStats.active}</p>
              <p className="text-xs text-muted-foreground">{hostelStats.pending} pending approval</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 space-y-2">
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">Total Bookings</p>
                <TrendingUp className="h-4 w-4 text-primary" />
              </div>
              <p className="text-3xl font-bold text-primary">{bookingStats.total}</p>
              <p className="text-xs text-muted-foreground">{bookingStats.paid} confirmed</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 space-y-2">
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">Total Revenue</p>
                <DollarSign className="h-4 w-4 text-green-600" />
              </div>
              <p className="text-3xl font-bold text-green-600">₦{(totalRevenue / 1000000).toFixed(1)}M</p>
              <p className="text-xs text-muted-foreground">Avg: ₦{avgBookingValue.toLocaleString()}/booking</p>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="mb-8 grid gap-6 lg:grid-cols-2">
          {/* Revenue Trend */}
          <Card>
            <CardHeader>
              <CardTitle>Revenue Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis dataKey="name" stroke="var(--muted-foreground)" />
                  <YAxis stroke="var(--muted-foreground)" />
                  <Tooltip contentStyle={{ backgroundColor: "var(--card)", border: "1px solid var(--border)" }} />
                  <Legend />
                  <Line type="monotone" dataKey="revenue" stroke="var(--primary)" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Booking Status Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>Booking Status</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${value}`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Additional Analytics */}
        <div className="mb-8 grid gap-6 lg:grid-cols-2">
          {/* Hostel Status */}
          <Card>
            <CardHeader>
              <CardTitle>Hostel Status Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={hostelStatusData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis dataKey="name" stroke="var(--muted-foreground)" />
                  <YAxis stroke="var(--muted-foreground)" />
                  <Tooltip contentStyle={{ backgroundColor: "var(--card)", border: "1px solid var(--border)" }} />
                  <Bar dataKey="value" fill="var(--primary)" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* User Demographics */}
          <Card>
            <CardHeader>
              <CardTitle>User Demographics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-foreground">Students</span>
                    <span className="text-sm font-semibold text-primary">{userStats.students}</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full"
                      style={{ width: `${(userStats.students / userStats.total) * 100}%` }}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-foreground">Hostel Owners</span>
                    <span className="text-sm font-semibold text-accent">{userStats.owners}</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="bg-accent h-2 rounded-full"
                      style={{ width: `${(userStats.owners / userStats.total) * 100}%` }}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-foreground">Admins</span>
                    <span className="text-sm font-semibold">{userStats.admins}</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="bg-foreground/30 h-2 rounded-full"
                      style={{ width: `${(userStats.admins / userStats.total) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Pending Hostel Approvals */}
        <Card>
          <CardHeader>
            <CardTitle>Pending Hostel Approvals ({pendingHostels.length})</CardTitle>
          </CardHeader>
          <CardContent>
            {pendingHostels.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">All hostels are approved</p>
            ) : (
              <div className="space-y-3">
                {pendingHostels.map((hostel) => (
                  <div
                    key={hostel.id}
                    className="flex items-center justify-between border border-border rounded-lg p-4 hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex-1">
                      <p className="font-semibold text-foreground">{hostel.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {hostel.location} - {hostel.nearbySchool}
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">₦{hostel.price.toLocaleString()} per month</p>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => setSelectedHostel(hostel.id)}>
                        <CheckCircle className="h-4 w-4 mr-1" /> Review
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {hostelToApprove && (
        <HostelApprovalModal
          hostel={hostelToApprove}
          onClose={() => setSelectedHostel(null)}
          onApprove={() => setRefreshKey((k) => k + 1)}
        />
      )}
    </div>
  )
}
