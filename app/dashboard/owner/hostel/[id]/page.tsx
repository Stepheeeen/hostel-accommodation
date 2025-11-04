"use client"

import { use } from "react"
import { useStore } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RoomManagement } from "@/components/room-management"
import { EditHostelModal } from "@/components/edit-hostel-modal"
import { useState } from "react"
import { ArrowLeft, Edit2, Trash2 } from "lucide-react"
import { useRouter } from "next/navigation"

interface PageProps {
  params: Promise<{ id: string }>
}

export default function HostelDetailsPage({ params }: PageProps) {
  const { id } = use(params)
  const router = useRouter()
  const { hostels, bookings, deleteHostel } = useStore()
  const [showEdit, setShowEdit] = useState(false)

  const hostel = hostels.find((h) => h.id === id)
  const hostelBookings = bookings.filter((b) => b.hostel_id === id)

  if (!hostel) {
    return (
      <div className="min-h-screen bg-background px-4 py-12">
        <div className="mx-auto max-w-7xl text-center">
          <p className="text-muted-foreground">Hostel not found</p>
          <Button onClick={() => router.back()} className="mt-4">
            Go Back
          </Button>
        </div>
      </div>
    )
  }

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this hostel?")) {
      deleteHostel(id)
      router.push("/dashboard/owner")
    }
  }

  return (
    <div className="min-h-screen bg-background px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" onClick={() => router.back()}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-foreground">{hostel.name}</h1>
              <p className="text-muted-foreground">{hostel.location}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button size="sm" onClick={() => setShowEdit(true)} className="gap-2">
              <Edit2 className="h-4 w-4" /> Edit
            </Button>
            <Button size="sm" variant="destructive" onClick={handleDelete} className="gap-2">
              <Trash2 className="h-4 w-4" /> Delete
            </Button>
          </div>
        </div>

        {/* Info Cards */}
        <div className="mb-8 grid gap-4 sm:grid-cols-3">
          <Card>
            <CardContent className="pt-6 space-y-2">
              <p className="text-sm text-muted-foreground">University</p>
              <p className="text-xl font-semibold text-foreground">{hostel.nearbySchool}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 space-y-2">
              <p className="text-sm text-muted-foreground">Monthly Price</p>
              <p className="text-xl font-semibold text-primary">₦{hostel.price.toLocaleString()}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 space-y-2">
              <p className="text-sm text-muted-foreground">Status</p>
              <p
                className={`text-xl font-semibold capitalize ${
                  hostel.status === "active" ? "text-green-600" : "text-yellow-600"
                }`}
              >
                {hostel.status}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Amenities */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Amenities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {hostel.amenities.map((amenity) => (
                <span key={amenity} className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                  {amenity}
                </span>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Room Management */}
        <div className="mb-8">
          <RoomManagement hostelId={id} />
        </div>

        {/* Bookings */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Bookings ({hostelBookings.length})</CardTitle>
          </CardHeader>
          <CardContent>
            {hostelBookings.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">No bookings yet</p>
            ) : (
              <div className="space-y-3">
                {hostelBookings.slice(0, 5).map((booking) => (
                  <div
                    key={booking.id}
                    className="flex items-center justify-between border border-border rounded-lg p-3"
                  >
                    <div>
                      <p className="font-medium text-foreground">{booking.reference}</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(booking.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-primary">₦{booking.amount.toLocaleString()}</p>
                      <p className="text-xs text-muted-foreground capitalize">{booking.status}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {showEdit && <EditHostelModal hostel={hostel} onClose={() => setShowEdit(false)} />}
    </div>
  )
}
