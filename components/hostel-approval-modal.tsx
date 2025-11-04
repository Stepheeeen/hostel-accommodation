"use client"

import { useState } from "react"
import { useStore, type Hostel } from "@/lib/store"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { createNotification } from "@/lib/notification-service"
import { X, MapPin, DollarSign } from "lucide-react"

interface HostelApprovalModalProps {
  hostel: Hostel
  onClose: () => void
  onApprove: () => void
}

export function HostelApprovalModal({ hostel, onClose, onApprove }: HostelApprovalModalProps) {
  const { updateHostel, users } = useStore()
  const { toast } = useToast()
  const [rejectionReason, setRejectionReason] = useState("")
  const [showRejectForm, setShowRejectForm] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleApprove = () => {
    setLoading(true)
    updateHostel(hostel.id, { status: "active" })

    const hostelOwner = users.find((u) => u.id === hostel.owner_id)
    if (hostelOwner) {
      createNotification({
        userId: hostelOwner.id,
        type: "approval",
        title: "Hostel Approved!",
        message: `Your hostel "${hostel.name}" has been approved and is now live on HostelHub!`,
        data: { hostelName: hostel.name },
      })
    }

    toast({ title: "Hostel approved successfully" })
    setTimeout(() => {
      onApprove()
      onClose()
      setLoading(false)
    }, 500)
  }

  const handleReject = () => {
    if (!rejectionReason.trim()) {
      toast({ title: "Error", description: "Please provide a rejection reason", variant: "destructive" })
      return
    }

    setLoading(true)
    updateHostel(hostel.id, { status: "inactive" })

    const hostelOwner = users.find((u) => u.id === hostel.owner_id)
    if (hostelOwner) {
      createNotification({
        userId: hostelOwner.id,
        type: "rejection",
        title: "Hostel Application Rejected",
        message: `Your hostel application for "${hostel.name}" was not approved. Reason: ${rejectionReason}`,
        data: { hostelName: hostel.name, reason: rejectionReason },
      })
    }

    toast({ title: "Hostel rejected" })
    setTimeout(() => {
      onApprove()
      onClose()
      setLoading(false)
    }, 500)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <CardTitle>Review Hostel Application</CardTitle>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
            <X className="h-5 w-5" />
          </button>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Hostel Info */}
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-foreground mb-2">{hostel.name}</h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  {hostel.location} - Near {hostel.nearbySchool}
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4" />₦{hostel.price.toLocaleString()} per month
                </div>
              </div>
            </div>

            {/* Amenities */}
            <div>
              <p className="text-sm font-semibold text-foreground mb-2">Amenities</p>
              <div className="flex flex-wrap gap-2">
                {hostel.amenities.map((amenity) => (
                  <span key={amenity} className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-medium">
                    {amenity}
                  </span>
                ))}
              </div>
            </div>

            {/* Images */}
            {hostel.images.length > 0 && (
              <div>
                <p className="text-sm font-semibold text-foreground mb-2">Images</p>
                <div className="grid grid-cols-3 gap-2">
                  {hostel.images.map((img, idx) => (
                    <img
                      key={idx}
                      src={img || "/placeholder.svg"}
                      alt={`Hostel ${idx + 1}`}
                      className="w-full h-24 object-cover rounded-lg"
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons or Rejection Form */}
          {!showRejectForm ? (
            <div className="flex gap-3 pt-4 border-t">
              <Button onClick={handleApprove} className="flex-1" disabled={loading} size="lg">
                Approve
              </Button>
              <Button onClick={() => setShowRejectForm(true)} variant="outline" className="flex-1" disabled={loading}>
                Reject
              </Button>
              <Button onClick={onClose} variant="ghost" className="flex-1" disabled={loading}>
                Cancel
              </Button>
            </div>
          ) : (
            <div className="space-y-3 p-4 border border-border rounded-lg bg-card">
              <p className="text-sm font-semibold text-foreground">Rejection Reason</p>
              <textarea
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                placeholder="Explain why this hostel is being rejected..."
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground min-h-24"
              />
              <div className="flex gap-2">
                <Button onClick={handleReject} className="flex-1" disabled={loading}>
                  Confirm Rejection
                </Button>
                <Button
                  onClick={() => setShowRejectForm(false)}
                  variant="outline"
                  className="flex-1"
                  disabled={loading}
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
