# HostelHub - Hostel Accommodation & Booking System

A comprehensive hostel booking platform designed for Nigerian students. HostelHub connects students looking for quality accommodation with verified hostel owners, featuring an intuitive search system, secure booking, and payment processing.

## Features

### For Students
- Browse and search hostels near their universities
- Advanced filtering by location, price, amenities, and more
- View detailed hostel information and room availability
- Secure booking system with payment integration
- Track booking history and payment status
- Real-time notifications for bookings and payments

### For Hostel Owners
- Add and manage multiple hostels
- Manage room inventory and pricing
- View active bookings and revenue
- Approve/manage student bookings
- Track platform analytics

### For Admins
- Approve/reject new hostel listings
- View comprehensive platform analytics
- Monitor revenue and booking trends
- Manage users and hostel status
- Access user demographics

## Technology Stack

- **Frontend**: Next.js 16, React 19, TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui
- **State Management**: Zustand
- **Data**: In-memory mock store (can be connected to real backend)
- **Charts**: Recharts

## Project Structure

\`\`\`
app/
├── page.tsx                 # Landing page
├── browse/page.tsx          # Hostel discovery & search
├── auth/page.tsx            # Authentication
├── demo/page.tsx            # Demo & testing guide
├── dashboard/
│   ├── student/page.tsx     # Student dashboard
│   ├── owner/page.tsx       # Owner dashboard
│   └── admin/page.tsx       # Admin dashboard
├── layout.tsx               # Root layout
└── globals.css              # Global styles

components/
├── navbar.tsx               # Navigation header
├── footer.tsx               # Footer
├── notification-bell.tsx    # Notifications
├── hostel-filters.tsx       # Search filters
├── hostel-detail-modal.tsx  # Hostel details
├── booking-modal.tsx        # Booking flow
├── payment-modal.tsx        # Payment form
├── add-hostel-modal.tsx     # Add hostel form
└── ...more components
\`\`\`

## Demo Data

### Test Accounts

**Student Account**
- Email: `chioma@student.com`
- Password: `password`

**Hostel Owner Account**
- Email: `tunde@owner.com`
- Password: `password`

**Admin Account**
- Email: `zainab@admin.com`
- Password: `password`

### Sample Data Included

- 8 hostels across major Nigerian cities
- 19 rooms with mixed availability
- 5 completed bookings with payment records
- Initial notifications for all user types
- 8 user accounts for testing

## Testing Scenarios

### Student Flow
1. Sign in as student
2. Browse hostels with various filters
3. View hostel details
4. Select a room and book
5. Complete payment (mock Paystack)
6. View booking in dashboard
7. Check notifications

### Owner Flow
1. Sign in as owner
2. Add a new hostel
3. Add rooms to the hostel
4. Edit hostel details
5. View bookings and revenue
6. Manage room availability

### Admin Flow
1. Sign in as admin
2. Review pending hostel approvals
3. Approve/reject hostels
4. View analytics dashboard
5. Monitor platform statistics
6. Check user demographics

## Getting Started

### Installation

\`\`\`bash
# Install dependencies
npm install

# Run development server
npm run dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) to view the application.

### Key Features to Test

1. **Authentication**: Test login/signup with different roles
2. **Hostel Discovery**: Use filters to search for specific hostels
3. **Booking Process**: Complete a full booking with payment
4. **Dashboard Views**: Compare student, owner, and admin dashboards
5. **Notifications**: Check notification bell for updates
6. **Analytics**: Review admin dashboard charts and statistics

## Color Scheme

- **Primary**: Deep Blue (`#1f4788`)
- **Accent**: Gold (`#d4af37`)
- **Background**: Off-white/Dark variants
- **Text**: Dark/Light variants based on theme

## Responsive Design

The application is fully responsive and optimized for:
- Mobile devices (320px+)
- Tablets (768px+)
- Desktop (1024px+)

## Demo Page

Visit `/demo` for a comprehensive testing guide with:
- Test account credentials
- Feature overview
- Testing scenarios
- Demo data information

## Future Enhancements

- Real database integration (PostgreSQL/MongoDB)
- Actual Paystack payment processing
- User reviews and ratings
- Advanced messaging system
- Booking calendar and date selection
- Real email notifications
- Mobile app version
- Social media integration

## Contributing

This is a demo project. For production use, consider:
- Adding a backend API
- Implementing real authentication
- Setting up a production database
- Adding payment gateway integration
- Implementing proper error handling
- Adding comprehensive testing

## License

MIT License - Feel free to use this project as a reference or starting point.
