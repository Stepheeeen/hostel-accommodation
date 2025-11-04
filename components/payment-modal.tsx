"use client"

import { useState } from "react"
import { useStore, type Hostel, type Room } from "@/lib/store"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { Input } from "@/components/ui/input"
import { BookingConfirmation } from "./booking-confirmation"
import { createNotification } from "@/lib/notification-service"
import { X } from "lucide-react"

interface PaymentModalProps {
  hostel: Hostel
  room: Room
  onClose: () => void
  onBookingComplete: () => void
}

export function PaymentModal({ hostel, room, onClose, onBookingComplete }: PaymentModalProps) {
  const { currentUser, addBooking, addPayment, users } = useStore()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [showPaymentForm, setShowPaymentForm] = useState(false)
  const [cardNumber, setCardNumber] = useState("")
  const [expiryDate, setExpiryDate] = useState("")
  const [cvv, setCvv] = useState("")
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [bookingReference, setBookingReference] = useState("")

  const handlePayment = async () => {
    if (!cardNumber || !expiryDate || !cvv) {
      toast({ title: "Error", description: "Please fill all card details", variant: "destructive" })
      return
    }

    setLoading(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))

      const bookingId = "BK" + Date.now()
      const paymentRef = "PAY" + Math.random().toString(36).substr(2, 9).toUpperCase()

      const booking = {
        id: bookingId,
        user_id: currentUser!.id,
        room_id: room.id,
        hostel_id: hostel.id,
        amount: room.price,
        status: "paid" as const,
        reference: paymentRef,
        createdAt: new Date().toISOString(),
      }

      const payment = {
        id: "PM" + Date.now(),
        booking_id: bookingId,
        reference: paymentRef,
        status: "completed" as const,
        amount: room.price,
        createdAt: new Date().toISOString(),
      }

      addBooking(booking)
      addPayment(payment)
      setBookingReference(paymentRef)

      createNotification({
        userId: currentUser!.id,
        type: "payment",
        title: "Booking Confirmed!",
        message: `Your payment of ₦${room.price.toLocaleString()} has been received. Booking reference: ${paymentRef}`,
        data: { hostelName: hostel.name, amount: room.price, reference: paymentRef },
      })

      const hostelOwner = users.find((u) => u.id === hostel.owner_id)
      if (hostelOwner) {
        createNotification({
          userId: hostelOwner.id,
          type: "booking",
          title: "New Booking Received",
          message: `New booking at ${hostel.name} for ${room.type} room. Amount: ₦${room.price.toLocaleString()}`,
          data: { hostelName: hostel.name, roomType: room.type, reference: paymentRef },
        })
      }

      setShowConfirmation(true)
      toast({ title: "Payment Successful!", description: `Reference: ${paymentRef}` })
    } catch (error) {
      toast({
        title: "Payment Failed",
        description: "Please try again",
        variant: "destructive",
      })
    }

    setLoading(false)
  }

  if (showConfirmation) {
    return (
      <BookingConfirmation
        bookingReference={bookingReference}
        hostelName={hostel.name}
        location={hostel.location}
        roomType={room.type}
        price={room.price}
        onClose={() => {
          setShowConfirmation(false)
          onBookingComplete()
        }}
      />
    )
  }

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <CardTitle>Complete Payment</CardTitle>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
            <X className="h-5 w-5" />
          </button>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Order Summary */}
          <div className="bg-muted/50 p-4 rounded-lg space-y-3">
            <div className="flex justify-between">
              <span className="text-muted-foreground text-sm">Hostel:</span>
              <span className="font-semibold text-foreground text-sm">{hostel.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground text-sm">Room:</span>
              <span className="font-semibold text-foreground text-sm">{room.type}</span>
            </div>
            <div className="border-t border-border pt-3 flex justify-between">
              <span className="text-foreground font-medium">Total:</span>
              <span className="font-bold text-primary text-lg">₦{room.price.toLocaleString()}</span>
            </div>
          </div>

          {/* Payment Method Selection or Form */}
          {!showPaymentForm ? (
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Select Payment Method</p>
              <Button onClick={() => setShowPaymentForm(true)} className="w-full" size="lg">
                Pay with Card (Paystack)
              </Button>
            </div>
          ) : (
            <div className="space-y-4 p-4 border border-border rounded-lg bg-card">
              <h3 className="font-semibold text-foreground text-sm">Card Details (Demo)</h3>
              <Input placeholder="Full Name" defaultValue={currentUser?.name || ""} disabled className="text-sm" />
              <Input
                placeholder="Card Number (16 digits)"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                maxLength={19}
                className="text-sm"
              />
              <div className="grid grid-cols-2 gap-2">
                <Input
                  placeholder="MM/YY"
                  value={expiryDate}
                  onChange={(e) => setExpiryDate(e.target.value)}
                  className="text-sm"
                />
                <Input
                  placeholder="CVV"
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value)}
                  maxLength={3}
                  type="password"
                  className="text-sm"
                />
              </div>
              <div className="space-y-2">
                <Button
                  onClick={handlePayment}
                  disabled={loading || !cardNumber || !expiryDate || !cvv}
                  className="w-full"
                  size="lg"
                >
                  {loading ? "Processing Payment..." : "Complete Payment"}
                </Button>
                <Button
                  onClick={() => setShowPaymentForm(false)}
                  variant="outline"
                  className="w-full"
                  disabled={loading}
                >
                  Back
                </Button>
              </div>
            </div>
          )}

          <p className="text-xs text-muted-foreground text-center">
            This is a demo. No actual payment will be processed.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
