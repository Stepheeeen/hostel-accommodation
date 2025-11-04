"use client"

import type React from "react"
import { useState } from "react"
import { useStore, type Hostel } from "@/lib/store"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import { X } from "lucide-react"

interface EditHostelModalProps {
  hostel: Hostel
  onClose: () => void
}

export function EditHostelModal({ hostel, onClose }: EditHostelModalProps) {
  const { updateHostel } = useStore()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: hostel.name,
    location: hostel.location,
    nearbySchool: hostel.nearbySchool,
    price: hostel.price.toString(),
    amenities: hostel.amenities,
  })

  const amenitiesOptions = ["WiFi", "AC", "Security", "Water", "Laundry", "Study Area"]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    if (!formData.name || !formData.location || !formData.nearbySchool || !formData.price) {
      toast({ title: "Error", description: "Please fill all fields", variant: "destructive" })
      setLoading(false)
      return
    }

    updateHostel(hostel.id, {
      name: formData.name,
      location: formData.location,
      nearbySchool: formData.nearbySchool,
      price: Number.parseInt(formData.price),
      amenities: formData.amenities,
    })

    toast({ title: "Success", description: "Hostel updated successfully!" })
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <Card className="w-full max-w-md max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <CardTitle>Edit Hostel</CardTitle>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
            <X className="h-5 w-5" />
          </button>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Hostel Name</label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Elite Heights Hostel"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Location</label>
              <Input
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="Yaba, Lagos"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Nearby School</label>
              <Input
                value={formData.nearbySchool}
                onChange={(e) => setFormData({ ...formData, nearbySchool: e.target.value })}
                placeholder="UNILAG"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Monthly Price (₦)</label>
              <Input
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                placeholder="150000"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Amenities</label>
              <div className="space-y-2">
                {amenitiesOptions.map((amenity) => (
                  <label key={amenity} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.amenities.includes(amenity)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setFormData({
                            ...formData,
                            amenities: [...formData.amenities, amenity],
                          })
                        } else {
                          setFormData({
                            ...formData,
                            amenities: formData.amenities.filter((a) => a !== amenity),
                          })
                        }
                      }}
                    />
                    <span className="text-sm">{amenity}</span>
                  </label>
                ))}
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Updating..." : "Update Hostel"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
