"use client"

import { useState } from "react"
import { useStore } from "@/lib/store"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { PaymentModal } from "./payment-modal"
import { X } from "lucide-react"

interface BookingModalProps {
  hostelId: string
  onClose: () => void
}

export function BookingModal({ hostelId, onClose }: BookingModalProps) {
  const { hostels, rooms, currentUser } = useStore()
  const { toast } = useToast()
  const [showPayment, setShowPayment] = useState(false)
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null)

  const hostel = hostels.find((h) => h.id === hostelId)
  const availableRooms = rooms.filter((r) => r.hostel_id === hostelId && r.is_available)

  if (!hostel) return null

  if (!currentUser) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6 space-y-4">
            <p className="text-foreground font-medium">Please sign in to book a hostel</p>
            <Button className="w-full" onClick={onClose}>
              Close
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const selectedRoomData = availableRooms.find((r) => r.id === selectedRoom)

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <CardTitle>{hostel.name}</CardTitle>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
            <X className="h-5 w-5" />
          </button>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="font-semibold text-foreground mb-4">Select a Room</h3>
            <div className="space-y-3">
              {availableRooms.map((room) => (
                <button
                  key={room.id}
                  onClick={() => setSelectedRoom(room.id)}
                  className={`w-full p-4 border rounded-lg transition-all text-left ${
                    selectedRoom === room.id ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-semibold text-foreground">{room.type} Room</p>
                      <p className="text-sm text-muted-foreground">Per month</p>
                    </div>
                    <p className="text-lg font-bold text-primary">₦{room.price.toLocaleString()}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {selectedRoomData && (
            <div className="border-t pt-4 space-y-4">
              <div>
                <p className="text-sm font-semibold text-foreground mb-3">Booking Summary</p>
                <div className="space-y-2 bg-muted/50 p-4 rounded-lg">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground text-sm">Hostel:</span>
                    <span className="font-semibold text-foreground text-sm">{hostel.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground text-sm">Room Type:</span>
                    <span className="font-semibold text-foreground text-sm">{selectedRoomData.type}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground text-sm">Location:</span>
                    <span className="font-semibold text-foreground text-sm">{hostel.location}</span>
                  </div>
                  <div className="border-t border-border pt-2 flex justify-between text-lg">
                    <span className="text-foreground font-medium">Total:</span>
                    <span className="text-primary font-bold">₦{selectedRoomData.price.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <Button className="w-full" onClick={() => setShowPayment(true)} size="lg">
                Proceed to Payment
              </Button>
            </div>
          )}

          {!selectedRoom && (
            <p className="text-sm text-muted-foreground text-center py-4">Select a room to see booking summary</p>
          )}
        </CardContent>
      </Card>

      {showPayment && selectedRoomData && (
        <PaymentModal
          hostel={hostel}
          room={selectedRoomData}
          onClose={() => setShowPayment(false)}
          onBookingComplete={() => {
            onClose()
            setShowPayment(false)
          }}
        />
      )}
    </div>
  )
}
