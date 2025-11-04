"use client"

import type React from "react"

import { useState, useMemo } from "react"
import { useStore } from "@/lib/store"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { HostelFilters } from "@/components/hostel-filters"
import { HostelDetailModal } from "@/components/hostel-detail-modal"
import { MapPin, Wifi, Wind, Lock, Droplet, Zap } from "lucide-react"

export default function BrowsePage() {
  const { hostels, rooms } = useStore()
  const [searchLocation, setSearchLocation] = useState("")
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 250000])
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([])
  const [sortBy, setSortBy] = useState("relevance")
  const [selectedHostel, setSelectedHostel] = useState<string | null>(null)

  const amenityIcons: Record<string, React.ReactNode> = {
    WiFi: <Wifi className="h-4 w-4" />,
    AC: <Wind className="h-4 w-4" />,
    Security: <Lock className="h-4 w-4" />,
    Water: <Droplet className="h-4 w-4" />,
    Laundry: <Zap className="h-4 w-4" />,
  }

  const filteredHostels = useMemo(() => {
    const filtered = hostels.filter((hostel) => {
      const matchesLocation =
        hostel.location.toLowerCase().includes(searchLocation.toLowerCase()) ||
        hostel.nearbySchool.toLowerCase().includes(searchLocation.toLowerCase())

      const matchesPrice = hostel.price >= priceRange[0] && hostel.price <= priceRange[1]

      const matchesAmenities =
        selectedAmenities.length === 0 || selectedAmenities.every((amenity) => hostel.amenities.includes(amenity))

      return matchesLocation && matchesPrice && matchesAmenities
    })

    if (sortBy === "price-low") {
      filtered.sort((a, b) => a.price - b.price)
    } else if (sortBy === "price-high") {
      filtered.sort((a, b) => b.price - a.price)
    } else if (sortBy === "newest") {
      filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    }

    return filtered
  }, [hostels, searchLocation, priceRange, selectedAmenities, sortBy])

  const hasActiveFilters = searchLocation || priceRange[0] > 0 || priceRange[1] < 250000 || selectedAmenities.length > 0

  const handleClearFilters = () => {
    setSearchLocation("")
    setPriceRange([0, 250000])
    setSelectedAmenities([])
    setSortBy("relevance")
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 space-y-2">
          <h1 className="text-3xl font-bold text-foreground">Find Your Hostel</h1>
          <p className="text-muted-foreground">
            {filteredHostels.length} {filteredHostels.length === 1 ? "hostel" : "hostels"} found
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-4">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 rounded-lg border border-border p-6">
              <HostelFilters
                searchLocation={searchLocation}
                onSearchLocationChange={setSearchLocation}
                priceRange={priceRange}
                onPriceRangeChange={setPriceRange}
                selectedAmenities={selectedAmenities}
                onAmenitiesChange={setSelectedAmenities}
                sortBy={sortBy}
                onSortChange={setSortBy}
                hasActiveFilters={hasActiveFilters}
                onClearFilters={handleClearFilters}
              />
            </div>
          </div>

          {/* Hostels Grid */}
          <div className="lg:col-span-3">
            {filteredHostels.length === 0 ? (
              <Card>
                <CardContent className="pt-12 pb-12 text-center space-y-4">
                  <p className="text-muted-foreground text-lg">No hostels found matching your criteria</p>
                  <Button variant="outline" onClick={handleClearFilters}>
                    Clear Filters
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
                {filteredHostels.map((hostel) => {
                  const availableRooms = rooms.filter((r) => r.hostel_id === hostel.id && r.is_available)
                  const totalRooms = rooms.filter((r) => r.hostel_id === hostel.id)

                  return (
                    <Card
                      key={hostel.id}
                      className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                      onClick={() => setSelectedHostel(hostel.id)}
                    >
                      <div className="relative h-40 overflow-hidden bg-muted">
                        <img
                          src={hostel.images[0] || "/placeholder.svg"}
                          alt={hostel.name}
                          className="h-full w-full object-cover hover:scale-105 transition-transform"
                        />
                        {availableRooms.length === 0 && (
                          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                            <span className="text-white font-semibold">Fully Booked</span>
                          </div>
                        )}
                      </div>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg line-clamp-1">{hostel.name}</CardTitle>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <MapPin className="h-4 w-4 flex-shrink-0" />
                          <span className="truncate">{hostel.location}</span>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <p className="text-2xl font-bold text-primary">₦{hostel.price.toLocaleString()}</p>
                          <p className="text-xs text-muted-foreground">from per month</p>
                        </div>

                        <div>
                          <p className="mb-2 text-sm font-semibold text-foreground">Key Amenities</p>
                          <div className="flex flex-wrap gap-2">
                            {hostel.amenities.slice(0, 4).map((amenity) => (
                              <div
                                key={amenity}
                                className="flex items-center gap-1 rounded-full bg-primary/10 px-2 py-1 text-xs"
                              >
                                {amenityIcons[amenity] || <Zap className="h-3 w-3" />}
                                <span className="text-primary">{amenity}</span>
                              </div>
                            ))}
                            {hostel.amenities.length > 4 && (
                              <div className="flex items-center gap-1 rounded-full bg-muted px-2 py-1 text-xs text-muted-foreground">
                                +{hostel.amenities.length - 4} more
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="border-t pt-3">
                          <p className="text-sm text-muted-foreground mb-2">
                            <span className="font-semibold text-foreground">{availableRooms.length}</span> of{" "}
                            <span className="font-semibold text-foreground">{totalRooms.length}</span> rooms available
                          </p>
                          <div className="w-full bg-muted rounded-full h-1.5">
                            <div
                              className="bg-primary h-1.5 rounded-full transition-all"
                              style={{
                                width: `${totalRooms.length > 0 ? (availableRooms.length / totalRooms.length) * 100 : 0}%`,
                              }}
                            />
                          </div>
                        </div>

                        <Button className="w-full" disabled={availableRooms.length === 0}>
                          {availableRooms.length === 0 ? "Fully Booked" : "View Details"}
                        </Button>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      {selectedHostel && (
        <HostelDetailModal
          hostel={hostels.find((h) => h.id === selectedHostel)!}
          onClose={() => setSelectedHostel(null)}
        />
      )}
    </div>
  )
}
