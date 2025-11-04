"use client"

import { useState } from "react"
import { useStore } from "@/lib/store"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { AddHostelModal } from "@/components/add-hostel-modal"
import { Trash2, Edit2 } from "lucide-react"
import { useRouter } from "next/navigation"

export default function OwnerDashboard() {
  const { currentUser, hostels, bookings, rooms, deleteHostel } = useStore()
  const { toast } = useToast()
  const [showAddHostel, setShowAddHostel] = useState(false)
  const router = useRouter()

  const ownerHostels = hostels.filter((h) => h.owner_id === currentUser?.id)
  const ownerBookings = bookings.filter((b) => {
    const hostel = hostels.find((h) => h.id === b.hostel_id)
    return hostel?.owner_id === currentUser?.id
  })

  const totalRevenue = ownerBookings.filter((b) => b.status === "paid").reduce((sum, b) => sum + b.amount, 0)

  const handleEdit = (hostelId: string) => {
    router.push(`/dashboard/owner/hostel/${hostelId}`)
  }

  const handleDelete = (hostelId: string) => {
    if (confirm("Are you sure you want to delete this hostel?")) {
      deleteHostel(hostelId)
      toast({ title: "Hostel deleted successfully" })
    }
  }

  return (
    <div className="min-h-screen bg-background px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-foreground">Welcome, {currentUser?.name}!</h1>
            <p className="text-muted-foreground">Manage your hostels and bookings</p>
          </div>
          <Button onClick={() => setShowAddHostel(true)} size="lg">
            + Add Hostel
          </Button>
        </div>

        {/* Stats */}
        <div className="mb-8 grid gap-4 sm:grid-cols-4">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Total Hostels</p>
                <p className="text-3xl font-bold text-primary">{ownerHostels.length}</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Active Bookings</p>
                <p className="text-3xl font-bold text-accent">
                  {ownerBookings.filter((b) => b.status === "paid").length}
                </p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Total Revenue</p>
                <p className="text-3xl font-bold text-primary">₦{totalRevenue.toLocaleString()}</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Available Rooms</p>
                <p className="text-3xl font-bold text-accent">
                  {rooms.filter((r) => r.is_available && ownerHostels.some((h) => h.id === r.hostel_id)).length}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Hostels */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>My Hostels</CardTitle>
          </CardHeader>
          <CardContent>
            {ownerHostels.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground mb-4">No hostels listed yet</p>
                <Button onClick={() => setShowAddHostel(true)}>Add Your First Hostel</Button>
              </div>
            ) : (
              <div className="space-y-4">
                {ownerHostels.map((hostel) => (
                  <div key={hostel.id} className="border border-border rounded-lg p-4 space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-semibold text-foreground">{hostel.name}</p>
                        <p className="text-sm text-muted-foreground">{hostel.location}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-primary">₦{hostel.price.toLocaleString()}</p>
                        <p className="text-xs text-muted-foreground capitalize">{hostel.status}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => handleEdit(hostel.id)}>
                        <Edit2 className="h-4 w-4 mr-1" /> View Details
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-destructive bg-transparent"
                        onClick={() => handleDelete(hostel.id)}
                      >
                        <Trash2 className="h-4 w-4 mr-1" /> Delete
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Bookings */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Bookings</CardTitle>
          </CardHeader>
          <CardContent>
            {ownerBookings.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">No bookings yet</p>
            ) : (
              <div className="space-y-4">
                {ownerBookings.slice(0, 5).map((booking) => {
                  const hostel = hostels.find((h) => h.id === booking.hostel_id)
                  return (
                    <div
                      key={booking.id}
                      className="flex items-center justify-between border border-border rounded-lg p-4"
                    >
                      <div>
                        <p className="font-semibold text-foreground">{hostel?.name}</p>
                        <p className="text-sm text-muted-foreground">{booking.reference}</p>
                      </div>
                      <p className="font-bold text-primary">₦{booking.amount.toLocaleString()}</p>
                    </div>
                  )
                })}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {showAddHostel && <AddHostelModal onClose={() => setShowAddHostel(false)} />}
    </div>
  )
}
