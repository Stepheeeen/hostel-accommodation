import Link from "next/link"
import { Heart, Github, Mail } from "lucide-react"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-border bg-card mt-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid gap-8 md:grid-cols-4 mb-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="text-xl font-bold text-primary">HostelHub</div>
            <p className="text-sm text-muted-foreground">
              Making hostel accommodation easy and accessible for Nigerian students
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Github className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Platform */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Platform</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/browse" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Browse Hostels
                </Link>
              </li>
              <li>
                <Link href="/demo" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Demo Guide
                </Link>
              </li>
              <li>
                <Link
                  href="/auth?tab=signup"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Get Started
                </Link>
              </li>
            </ul>
          </div>

          {/* For Students */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">For Students</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Find Hostels
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  How It Works
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Safety Tips
                </a>
              </li>
            </ul>
          </div>

          {/* For Owners */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">For Owners</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  List Your Hostel
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Contact Sales
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-border my-8" />

        {/* Bottom */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground">Copyright {currentYear} HostelHub. All rights reserved.</p>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            Built with <Heart className="h-3 w-3 text-primary fill-primary" /> for Nigerian students
          </div>
        </div>
      </div>
    </footer>
  )
}
