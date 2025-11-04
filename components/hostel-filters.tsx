"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { X } from "lucide-react"

interface HostelFiltersProps {
  searchLocation: string
  onSearchLocationChange: (value: string) => void
  priceRange: [number, number]
  onPriceRangeChange: (value: [number, number]) => void
  selectedAmenities: string[]
  onAmenitiesChange: (amenities: string[]) => void
  sortBy: string
  onSortChange: (sort: string) => void
  hasActiveFilters: boolean
  onClearFilters: () => void
}

const amenitiesOptions = ["WiFi", "AC", "Security", "Water", "Laundry", "Study Area"]
const sortOptions = [
  { value: "relevance", label: "Relevance" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "newest", label: "Newest" },
]

export function HostelFilters({
  searchLocation,
  onSearchLocationChange,
  priceRange,
  onPriceRangeChange,
  selectedAmenities,
  onAmenitiesChange,
  sortBy,
  onSortChange,
  hasActiveFilters,
  onClearFilters,
}: HostelFiltersProps) {
  const toggleAmenity = (amenity: string) => {
    if (selectedAmenities.includes(amenity)) {
      onAmenitiesChange(selectedAmenities.filter((a) => a !== amenity))
    } else {
      onAmenitiesChange([...selectedAmenities, amenity])
    }
  }

  return (
    <div className="space-y-6">
      {/* Search */}
      <div>
        <label className="block text-sm font-semibold text-foreground mb-2">Search Location</label>
        <Input
          placeholder="Search by location or university..."
          value={searchLocation}
          onChange={(e) => onSearchLocationChange(e.target.value)}
        />
      </div>

      {/* Price Range */}
      <div>
        <label className="block text-sm font-semibold text-foreground mb-2">Price Range (₦)</label>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs text-muted-foreground">Min</label>
            <Input
              type="number"
              value={priceRange[0]}
              onChange={(e) => onPriceRangeChange([Number.parseInt(e.target.value) || 0, priceRange[1]])}
              placeholder="0"
            />
          </div>
          <div>
            <label className="text-xs text-muted-foreground">Max</label>
            <Input
              type="number"
              value={priceRange[1]}
              onChange={(e) => onPriceRangeChange([priceRange[0], Number.parseInt(e.target.value) || 250000])}
              placeholder="250000"
            />
          </div>
        </div>
      </div>

      {/* Amenities */}
      <div>
        <label className="block text-sm font-semibold text-foreground mb-3">Amenities</label>
        <div className="space-y-2">
          {amenitiesOptions.map((amenity) => (
            <label key={amenity} className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedAmenities.includes(amenity)}
                onChange={() => toggleAmenity(amenity)}
                className="w-4 h-4 rounded"
              />
              <span className="text-sm text-foreground">{amenity}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Sort */}
      <div>
        <label className="block text-sm font-semibold text-foreground mb-2">Sort By</label>
        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground"
        >
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {/* Clear Filters */}
      {hasActiveFilters && (
        <Button variant="outline" className="w-full bg-transparent" onClick={onClearFilters}>
          <X className="h-4 w-4 mr-2" /> Clear Filters
        </Button>
      )}
    </div>
  )
}
