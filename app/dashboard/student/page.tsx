"use client"

import { useStore } from "@/lib/store"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { MapPin, CheckCircle, Clock, CreditCard } from "lucide-react"

export default function StudentDashboard() {
  const { currentUser, bookings, hostels, rooms } = useStore()
  const router = useRouter()

  const studentBookings = bookings.filter((b) => b.user_id === currentUser?.id)

  const sortedBookings = [...studentBookings].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  )

  const getBookingDetails = (booking: any) => {
    const hostel = hostels.find((h) => h.id === booking.hostel_id)
    const room = rooms.find((r) => r.id === booking.room_id)
    return { hostel, room }
  }

  const paidBookings = studentBookings.filter((b) => b.status === "paid")
  const totalSpent = paidBookings.reduce((sum, b) => sum + b.amount, 0)

  return (
    <div className="min-h-screen bg-background px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8 space-y-2">
          <h1 className="text-3xl font-bold text-foreground">Welcome, {currentUser?.name}!</h1>
          <p className="text-muted-foreground">Manage your hostel bookings and reservations</p>
        </div>

        {/* Stats */}
        <div className="mb-8 grid gap-4 sm:grid-cols-3">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Total Bookings</p>
                <p className="text-3xl font-bold text-primary">{studentBookings.length}</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Active Bookings</p>
                <p className="text-3xl font-bold text-accent">{paidBookings.length}</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Total Spent</p>
                <p className="text-3xl font-bold text-primary">₦{totalSpent.toLocaleString()}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Bookings List */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>My Bookings</CardTitle>
              <Button onClick={() => router.push("/browse")}>+ Book Another Hostel</Button>
            </div>
          </CardHeader>
          <CardContent>
            {studentBookings.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground mb-4">No bookings yet. Let's find you the perfect hostel!</p>
                <Button onClick={() => router.push("/browse")} size="lg">
                  Browse Hostels
                </Button>
              </div>
            ) : (
              <div className="space-y-3">
                {sortedBookings.map((booking) => {
                  const { hostel, room } = getBookingDetails(booking)
                  const bookingDate = new Date(booking.createdAt).toLocaleDateString()

                  return (
                    <div
                      key={booking.id}
                      className="border border-border rounded-lg p-4 hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-start justify-between">
                        <div className="space-y-2 flex-1">
                          <p className="font-semibold text-foreground text-lg">{hostel?.name}</p>
                          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <MapPin className="h-4 w-4" />
                              {hostel?.location}
                            </div>
                            <div>{room?.type} Room</div>
                            <div>Booked on {bookingDate}</div>
                          </div>
                        </div>
                        <div className="text-right space-y-2">
                          <p className="font-bold text-primary text-lg">₦{booking.amount.toLocaleString()}</p>
                          <div className="flex items-center justify-end gap-1">
                            {booking.status === "paid" ? (
                              <>
                                <CheckCircle className="h-4 w-4 text-green-500" />
                                <span className="text-xs font-semibold text-green-600">CONFIRMED</span>
                              </>
                            ) : (
                              <>
                                <Clock className="h-4 w-4 text-yellow-500" />
                                <span className="text-xs font-semibold text-yellow-600">PENDING</span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="mt-3 flex gap-2">
                        <Button size="sm" variant="outline">
                          <CreditCard className="h-4 w-4 mr-1" /> Ref: {booking.reference}
                        </Button>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
