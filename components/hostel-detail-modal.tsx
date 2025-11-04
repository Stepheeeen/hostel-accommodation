"use client"

import type React from "react"

import { useState } from "react"
import { useStore, type Hostel } from "@/lib/store"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { X, MapPin, DollarSign, Wifi, Wind, Lock, Droplet, Zap } from "lucide-react"
import { BookingModal } from "./booking-modal"

interface HostelDetailModalProps {
  hostel: Hostel
  onClose: () => void
}

export function HostelDetailModal({ hostel, onClose }: HostelDetailModalProps) {
  const { rooms } = useStore()
  const [showBooking, setShowBooking] = useState(false)

  const hostelRooms = rooms.filter((r) => r.hostel_id === hostel.id)
  const availableRooms = hostelRooms.filter((r) => r.is_available)
  const occupancyRate =
    hostelRooms.length > 0 ? ((hostelRooms.length - availableRooms.length) / hostelRooms.length) * 100 : 0

  const amenityIcons: Record<string, React.ReactNode> = {
    WiFi: <Wifi className="h-5 w-5" />,
    AC: <Wind className="h-5 w-5" />,
    Security: <Lock className="h-5 w-5" />,
    Water: <Droplet className="h-5 w-5" />,
    Laundry: <Zap className="h-5 w-5" />,
  }

  const roomTypes = [...new Set(hostelRooms.map((r) => r.type))]
  const minPrice = Math.min(...hostelRooms.map((r) => r.price))
  const maxPrice = Math.max(...hostelRooms.map((r) => r.price))

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
        <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle className="text-2xl">{hostel.name}</CardTitle>
            <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
              <X className="h-6 w-6" />
            </button>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Image */}
            <div className="relative h-64 overflow-hidden rounded-lg bg-muted">
              <img
                src={hostel.images[0] || "/placeholder.svg"}
                alt={hostel.name}
                className="h-full w-full object-cover"
              />
            </div>

            {/* Location Info */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="h-5 w-5" />
                <span>{hostel.location}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Zap className="h-5 w-5" />
                <span>Near {hostel.nearbySchool}</span>
              </div>
            </div>

            {/* Pricing Info */}
            <div className="bg-accent/10 rounded-lg p-4 space-y-2">
              <div className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-primary" />
                <span className="font-semibold text-foreground">Pricing</span>
              </div>
              <div className="text-sm text-muted-foreground">
                <p>
                  Price range: <span className="font-semibold text-foreground">₦{minPrice.toLocaleString()}</span> -{" "}
                  <span className="font-semibold text-foreground">₦{maxPrice.toLocaleString()}</span> per month
                </p>
              </div>
            </div>

            {/* Amenities */}
            <div className="space-y-3">
              <h3 className="font-semibold text-foreground">Amenities</h3>
              <div className="grid grid-cols-2 gap-3">
                {hostel.amenities.map((amenity) => (
                  <div key={amenity} className="flex items-center gap-2 p-3 rounded-lg bg-card border border-border">
                    <div className="text-primary">{amenityIcons[amenity] || <Zap className="h-5 w-5" />}</div>
                    <span className="text-sm font-medium text-foreground">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Room Info */}
            <div className="space-y-3">
              <h3 className="font-semibold text-foreground">Room Types Available</h3>
              <div className="space-y-2">
                {roomTypes.map((type) => {
                  const typeRooms = hostelRooms.filter((r) => r.type === type)
                  const availableCount = typeRooms.filter((r) => r.is_available).length
                  const typeMinPrice = Math.min(...typeRooms.map((r) => r.price))

                  return (
                    <div
                      key={type}
                      className="flex items-center justify-between p-3 rounded-lg bg-card border border-border"
                    >
                      <div>
                        <p className="font-medium text-foreground">{type} Room</p>
                        <p className="text-xs text-muted-foreground">
                          {availableCount} of {typeRooms.length} available
                        </p>
                      </div>
                      <p className="text-sm font-semibold text-primary">₦{typeMinPrice.toLocaleString()}</p>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Occupancy */}
            <div className="space-y-2">
              <p className="text-sm font-medium text-foreground">Occupancy</p>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-primary h-2 rounded-full transition-all" style={{ width: `${occupancyRate}%` }} />
              </div>
              <p className="text-xs text-muted-foreground">{Math.round(occupancyRate)}% occupied</p>
            </div>

            {/* Action Button */}
            <Button
              className="w-full"
              size="lg"
              onClick={() => setShowBooking(true)}
              disabled={availableRooms.length === 0}
            >
              {availableRooms.length === 0 ? "Fully Booked" : "Book Now"}
            </Button>
          </CardContent>
        </Card>
      </div>

      {showBooking && <BookingModal hostelId={hostel.id} onClose={() => setShowBooking(false)} />}
    </>
  )
}
