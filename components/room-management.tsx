"use client"

import type React from "react"

import { useState } from "react"
import { useStore, type Room } from "@/lib/store"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import { Trash2, Plus } from "lucide-react"

interface RoomManagementProps {
  hostelId: string
}

export function RoomManagement({ hostelId }: RoomManagementProps) {
  const { rooms, addRoom, updateRoom, deleteRoom, getRoomsByHostel } = useStore()
  const { toast } = useToast()
  const [showAddRoom, setShowAddRoom] = useState(false)
  const [formData, setFormData] = useState({ type: "", price: "" })

  const hostelRooms = getRoomsByHostel(hostelId)

  const handleAddRoom = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.type || !formData.price) {
      toast({ title: "Error", description: "Fill all fields", variant: "destructive" })
      return
    }

    const newRoom: Room = {
      id: "r" + Date.now(),
      hostel_id: hostelId,
      type: formData.type,
      price: Number.parseInt(formData.price),
      is_available: true,
    }

    addRoom(newRoom)
    setFormData({ type: "", price: "" })
    setShowAddRoom(false)
    toast({ title: "Success", description: "Room added!" })
  }

  const toggleAvailability = (roomId: string, isAvailable: boolean) => {
    updateRoom(roomId, { is_available: !isAvailable })
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <CardTitle>Room Management</CardTitle>
        <Button size="sm" onClick={() => setShowAddRoom(!showAddRoom)} className="gap-2">
          <Plus className="h-4 w-4" /> Add Room
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {showAddRoom && (
          <form onSubmit={handleAddRoom} className="border border-border rounded-lg p-4 space-y-3">
            <div>
              <label className="block text-sm font-medium mb-1">Room Type</label>
              <Input
                placeholder="e.g., Shared, Ensuite, Single"
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Price (₦)</label>
              <Input
                type="number"
                placeholder="150000"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              />
            </div>
            <div className="flex gap-2">
              <Button type="submit" className="flex-1">
                Add
              </Button>
              <Button type="button" variant="outline" onClick={() => setShowAddRoom(false)}>
                Cancel
              </Button>
            </div>
          </form>
        )}

        {hostelRooms.length === 0 ? (
          <p className="text-muted-foreground text-center py-4">No rooms added yet</p>
        ) : (
          <div className="space-y-2">
            {hostelRooms.map((room) => (
              <div key={room.id} className="flex items-center justify-between border border-border rounded-lg p-3">
                <div className="flex-1">
                  <p className="font-medium text-foreground">{room.type}</p>
                  <p className="text-sm text-muted-foreground">₦{room.price.toLocaleString()}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleAvailability(room.id, room.is_available)}
                    className={`px-3 py-1 text-xs rounded-full ${
                      room.is_available ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                    }`}
                  >
                    {room.is_available ? "Available" : "Unavailable"}
                  </button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => {
                      deleteRoom(room.id)
                      toast({ title: "Room deleted" })
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
