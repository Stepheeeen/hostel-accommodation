"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, MapPin, Calendar, Copy } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface BookingConfirmationProps {
  bookingReference: string
  hostelName: string
  location: string
  roomType: string
  price: number
  checkInDate?: string
  onClose: () => void
}

export function BookingConfirmation({
  bookingReference,
  hostelName,
  location,
  roomType,
  price,
  checkInDate,
  onClose,
}: BookingConfirmationProps) {
  const { toast } = useToast()

  const copyReference = () => {
    navigator.clipboard.writeText(bookingReference)
    toast({ title: "Copied to clipboard" })
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="rounded-full bg-green-100 p-4">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </div>
          <CardTitle className="text-2xl">Booking Confirmed!</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Confirmation Details */}
          <div className="bg-muted rounded-lg p-4 space-y-4">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Hostel</p>
              <p className="font-semibold text-foreground">{hostelName}</p>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">{location}</span>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Room Type</p>
              <p className="font-semibold text-foreground">{roomType}</p>
            </div>
            {checkInDate && (
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">{checkInDate}</span>
              </div>
            )}
            <div className="border-t pt-3 flex items-center justify-between">
              <span className="text-muted-foreground">Amount Paid:</span>
              <span className="text-lg font-bold text-primary">₦{price.toLocaleString()}</span>
            </div>
          </div>

          {/* Reference Number */}
          <div>
            <p className="text-sm text-muted-foreground mb-2">Booking Reference</p>
            <div className="flex items-center gap-2 p-3 bg-card border border-border rounded-lg">
              <code className="flex-1 font-mono text-sm font-semibold text-foreground">{bookingReference}</code>
              <Button size="sm" variant="ghost" onClick={copyReference}>
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Next Steps */}
          <div className="bg-accent/10 rounded-lg p-4">
            <p className="text-sm font-semibold text-foreground mb-2">Next Steps:</p>
            <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
              <li>Save your booking reference</li>
              <li>Check your email for confirmation</li>
              <li>Contact the hostel 24 hours before check-in</li>
            </ul>
          </div>

          <Button onClick={onClose} className="w-full" size="lg">
            View My Bookings
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
