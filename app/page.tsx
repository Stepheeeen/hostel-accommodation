"use client"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useStore } from "@/lib/store"
import { Card, CardContent } from "@/components/ui/card"
import { Search, MapPin, TrendingUp, Users, HomeIcon } from "lucide-react"

export default function Home() {
  const router = useRouter()
  const { hostels } = useStore()

  const featuredHostels = hostels.filter((h) => h.status === "active").slice(0, 3)

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Hero Section */}
      <section className="px-4 py-16 sm:px-6 lg:px-8 text-center space-y-6">
        <div className="space-y-3">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground">
            Find Your Perfect <span className="text-primary">Hostel Home</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover comfortable, affordable, and secure hostel accommodations near your university
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <Button onClick={() => router.push("/browse")} size="lg" className="gap-2">
            <Search className="h-5 w-5" /> Browse Hostels
          </Button>
          <Button onClick={() => router.push("/demo")} size="lg" variant="outline">
            View Demo
          </Button>
        </div>
      </section>

      {/* Stats Section */}
      <section className="px-4 py-12 sm:px-6 lg:px-8 bg-muted/50">
        <div className="mx-auto max-w-7xl grid gap-8 sm:grid-cols-3">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">
              {hostels.filter((h) => h.status === "active").length}
            </div>
            <p className="text-muted-foreground">Active Hostels</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">1000+</div>
            <p className="text-muted-foreground">Students Housed</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">5 Cities</div>
            <p className="text-muted-foreground">Coverage Areas</p>
          </div>
        </div>
      </section>

      {/* Featured Hostels */}
      <section className="px-4 py-16 sm:px-6 lg:px-8 flex-1">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 space-y-2">
            <h2 className="text-3xl font-bold text-foreground">Featured Hostels</h2>
            <p className="text-muted-foreground">Top-rated accommodations for students</p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredHostels.map((hostel) => (
              <Card key={hostel.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <img
                  src={hostel.images[0] || "/placeholder.svg"}
                  alt={hostel.name}
                  className="w-full h-48 object-cover"
                />
                <CardContent className="p-4 space-y-3">
                  <div>
                    <h3 className="font-semibold text-lg text-foreground">{hostel.name}</h3>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                      <MapPin className="h-4 w-4" /> {hostel.location}
                    </div>
                  </div>

                  <div className="border-t pt-3">
                    <p className="font-bold text-primary text-lg">₦{hostel.price.toLocaleString()}/month</p>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {hostel.amenities.slice(0, 3).map((amenity) => (
                        <span key={amenity} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                          {amenity}
                        </span>
                      ))}
                    </div>
                  </div>

                  <Button className="w-full" onClick={() => router.push("/browse")}>
                    View Details
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-4 py-16 sm:px-6 lg:px-8 bg-muted/50">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-3xl font-bold text-foreground text-center mb-12">Why Choose HostelHub?</h2>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div className="text-center space-y-3">
              <div className="flex justify-center">
                <div className="bg-primary/10 p-3 rounded-lg">
                  <HomeIcon className="h-6 w-6 text-primary" />
                </div>
              </div>
              <h3 className="font-semibold text-foreground">Verified Hostels</h3>
              <p className="text-sm text-muted-foreground">All hostels are verified and reviewed by students</p>
            </div>

            <div className="text-center space-y-3">
              <div className="flex justify-center">
                <div className="bg-primary/10 p-3 rounded-lg">
                  <Search className="h-6 w-6 text-primary" />
                </div>
              </div>
              <h3 className="font-semibold text-foreground">Easy Search</h3>
              <p className="text-sm text-muted-foreground">Find hostels near your university in seconds</p>
            </div>

            <div className="text-center space-y-3">
              <div className="flex justify-center">
                <div className="bg-primary/10 p-3 rounded-lg">
                  <TrendingUp className="h-6 w-6 text-primary" />
                </div>
              </div>
              <h3 className="font-semibold text-foreground">Best Prices</h3>
              <p className="text-sm text-muted-foreground">Compare and book at the best rates</p>
            </div>

            <div className="text-center space-y-3">
              <div className="flex justify-center">
                <div className="bg-primary/10 p-3 rounded-lg">
                  <Users className="h-6 w-6 text-primary" />
                </div>
              </div>
              <h3 className="font-semibold text-foreground">24/7 Support</h3>
              <p className="text-sm text-muted-foreground">Our support team is always ready to help</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl text-center space-y-6">
          <h2 className="text-3xl font-bold text-foreground">Ready to Find Your Hostel?</h2>
          <Button onClick={() => router.push("/browse")} size="lg" className="gap-2">
            <Search className="h-5 w-5" /> Start Browsing Now
          </Button>
        </div>
      </section>
    </div>
  )
}
