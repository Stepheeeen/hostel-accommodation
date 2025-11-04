// Mock data store with in-memory storage
import { create } from "zustand"

export interface User {
  id: string
  name: string
  email: string
  role: "student" | "owner" | "admin"
  password: string
}

export interface Hostel {
  id: string
  name: string
  location: string
  nearbySchool: string
  price: number
  amenities: string[]
  images: string[]
  owner_id: string
  status: "active" | "pending" | "inactive"
  createdAt: string
}

export interface Room {
  id: string
  hostel_id: string
  type: string
  price: number
  is_available: boolean
}

export interface Booking {
  id: string
  user_id: string
  room_id: string
  hostel_id: string
  amount: number
  status: "pending" | "paid" | "cancelled"
  reference: string
  createdAt: string
}

export interface Payment {
  id: string
  booking_id: string
  reference: string
  status: "pending" | "completed" | "failed"
  amount: number
  createdAt: string
}

export interface Notification {
  id: string
  user_id: string
  type: "booking" | "payment" | "approval" | "rejection" | "cancellation" | "system"
  title: string
  message: string
  read: boolean
  data?: Record<string, any>
  createdAt: string
}

interface Store {
  currentUser: User | null
  setCurrentUser: (user: User | null) => void
  users: User[]
  hostels: Hostel[]
  rooms: Room[]
  bookings: Booking[]
  payments: Payment[]
  notifications: Notification[]
  addHostel: (hostel: Hostel) => void
  updateHostel: (id: string, hostel: Partial<Hostel>) => void
  deleteHostel: (id: string) => void
  addBooking: (booking: Booking) => void
  updateBooking: (id: string, booking: Partial<Booking>) => void
  addPayment: (payment: Payment) => void
  resetDemo: () => void
  addRoom: (room: Room) => void
  updateRoom: (id: string, room: Partial<Room>) => void
  deleteRoom: (id: string) => void
  getRoomsByHostel: (hostelId: string) => Room[]
  addNotification: (notification: Notification) => void
  markNotificationRead: (notificationId: string) => void
  getUserNotifications: (userId: string) => Notification[]
  deleteNotification: (notificationId: string) => void
}

const mockUsers: User[] = [
  { id: "1", name: "Chioma Adeyemi", email: "chioma@student.com", role: "student", password: "password" },
  { id: "2", name: "Tunde Okonkwo", email: "tunde@owner.com", role: "owner", password: "password" },
  { id: "3", name: "Zainab Ahmed", email: "zainab@admin.com", role: "admin", password: "password" },
  { id: "4", name: "Amara Okoro", email: "amara@student.com", role: "student", password: "password" },
  { id: "5", name: "Ibrahim Hassan", email: "ibrahim@owner.com", role: "owner", password: "password" },
  { id: "6", name: "Grace Eze", email: "grace@student.com", role: "student", password: "password" },
  { id: "7", name: "David Obi", email: "david@student.com", role: "student", password: "password" },
  { id: "8", name: "Fatima Abubakar", email: "fatima@owner.com", role: "owner", password: "password" },
]

const mockHostels: Hostel[] = [
  {
    id: "h1",
    name: "Elite Heights Hostel",
    location: "Yaba, Lagos",
    nearbySchool: "UNILAG",
    price: 150000,
    amenities: ["WiFi", "AC", "Security", "Water", "Generator", "Parking"],
    images: ["/modern-hostel-room-with-ac.jpg"],
    owner_id: "2",
    status: "active",
    createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "h2",
    name: "Campus Haven",
    location: "Ibadan",
    nearbySchool: "UNIBEN",
    price: 120000,
    amenities: ["WiFi", "Security", "Water", "Laundry", "Gym"],
    images: ["/comfortable-student-accommodation.jpg"],
    owner_id: "2",
    status: "active",
    createdAt: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "h3",
    name: "Academic Plaza",
    location: "Ile-Ife",
    nearbySchool: "OAU",
    price: 100000,
    amenities: ["WiFi", "AC", "Study Area", "Security", "Water"],
    images: ["/student-hostel-near-university.jpg"],
    owner_id: "2",
    status: "active",
    createdAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "h4",
    name: "Unity Suites",
    location: "Lekki, Lagos",
    nearbySchool: "Lagos State University",
    price: 180000,
    amenities: ["WiFi", "AC", "Security", "Pool", "Gym", "Restaurant"],
    images: ["/premium-student-hostel-accommodation.jpg"],
    owner_id: "5",
    status: "active",
    createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "h5",
    name: "Scholar's Rest",
    location: "Enugu",
    nearbySchool: "UNEC",
    price: 95000,
    amenities: ["WiFi", "Security", "Water", "Study Lounge"],
    images: ["/affordable-hostel-for-university-students.jpg"],
    owner_id: "5",
    status: "active",
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "h6",
    name: "Prime Living",
    location: "Port Harcourt",
    nearbySchool: "UNIPORT",
    price: 140000,
    amenities: ["WiFi", "AC", "Generator", "Security", "Water", "Kitchen"],
    images: ["/spacious-hostel-room-with-facilities.jpg"],
    owner_id: "5",
    status: "pending",
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "h7",
    name: "Tech Hub Accommodation",
    location: "Kano",
    nearbySchool: "BUK",
    price: 110000,
    amenities: ["WiFi", "AC", "Security", "Study Area", "Generator"],
    images: ["/modern-hostel-room-with-ac.jpg"],
    owner_id: "8",
    status: "active",
    createdAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "h8",
    name: "Student's Paradise",
    location: "Portharcourt",
    nearbySchool: "University of Portharcourt",
    price: 125000,
    amenities: ["WiFi", "AC", "Pool", "Gym", "Security", "Water"],
    images: ["/comfortable-student-accommodation.jpg"],
    owner_id: "8",
    status: "active",
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
  },
]

const mockRooms: Room[] = [
  { id: "r1", hostel_id: "h1", type: "Shared (4-bed)", price: 150000, is_available: true },
  { id: "r2", hostel_id: "h1", type: "Ensuite (Double)", price: 180000, is_available: true },
  { id: "r3", hostel_id: "h1", type: "Ensuite (Single)", price: 200000, is_available: false },
  { id: "r4", hostel_id: "h2", type: "Shared (4-bed)", price: 120000, is_available: true },
  { id: "r5", hostel_id: "h2", type: "Ensuite (Double)", price: 150000, is_available: false },
  { id: "r6", hostel_id: "h2", type: "Shared (2-bed)", price: 135000, is_available: true },
  { id: "r7", hostel_id: "h3", type: "Shared (4-bed)", price: 100000, is_available: true },
  { id: "r8", hostel_id: "h3", type: "Ensuite (Double)", price: 130000, is_available: true },
  { id: "r9", hostel_id: "h4", type: "Ensuite (Double)", price: 180000, is_available: true },
  { id: "r10", hostel_id: "h4", type: "Premium Suite (Double)", price: 220000, is_available: false },
  { id: "r11", hostel_id: "h5", type: "Shared (4-bed)", price: 95000, is_available: true },
  { id: "r12", hostel_id: "h5", type: "Ensuite (Double)", price: 120000, is_available: true },
  { id: "r13", hostel_id: "h6", type: "Shared (4-bed)", price: 140000, is_available: true },
  { id: "r14", hostel_id: "h6", type: "Ensuite (Double)", price: 170000, is_available: true },
  { id: "r15", hostel_id: "h7", type: "Shared (4-bed)", price: 110000, is_available: true },
  { id: "r16", hostel_id: "h7", type: "Ensuite (Double)", price: 140000, is_available: true },
  { id: "r17", hostel_id: "h8", type: "Shared (4-bed)", price: 125000, is_available: true },
  { id: "r18", hostel_id: "h8", type: "Ensuite (Double)", price: 155000, is_available: false },
  { id: "r19", hostel_id: "h8", type: "Premium Suite (Double)", price: 200000, is_available: true },
]

const mockBookingsAndPayments = () => {
  const now = new Date()
  return {
    bookings: [
      {
        id: "BK1001",
        user_id: "1",
        room_id: "r1",
        hostel_id: "h1",
        amount: 150000,
        status: "paid" as const,
        reference: "PAY20240115A",
        createdAt: new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: "BK1002",
        user_id: "4",
        room_id: "r4",
        hostel_id: "h2",
        amount: 120000,
        status: "paid" as const,
        reference: "PAY20240120B",
        createdAt: new Date(now.getTime() - 25 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: "BK1003",
        user_id: "6",
        room_id: "r7",
        hostel_id: "h3",
        amount: 100000,
        status: "paid" as const,
        reference: "PAY20240125C",
        createdAt: new Date(now.getTime() - 20 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: "BK1004",
        user_id: "7",
        room_id: "r9",
        hostel_id: "h4",
        amount: 180000,
        status: "paid" as const,
        reference: "PAY20240201D",
        createdAt: new Date(now.getTime() - 15 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: "BK1005",
        user_id: "1",
        room_id: "r12",
        hostel_id: "h5",
        amount: 120000,
        status: "paid" as const,
        reference: "PAY20240210E",
        createdAt: new Date(now.getTime() - 8 * 24 * 60 * 60 * 1000).toISOString(),
      },
    ],
    payments: [
      {
        id: "PM1001",
        booking_id: "BK1001",
        reference: "PAY20240115A",
        status: "completed" as const,
        amount: 150000,
        createdAt: new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: "PM1002",
        booking_id: "BK1002",
        reference: "PAY20240120B",
        status: "completed" as const,
        amount: 120000,
        createdAt: new Date(now.getTime() - 25 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: "PM1003",
        booking_id: "BK1003",
        reference: "PAY20240125C",
        status: "completed" as const,
        amount: 100000,
        createdAt: new Date(now.getTime() - 20 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: "PM1004",
        booking_id: "BK1004",
        reference: "PAY20240201D",
        status: "completed" as const,
        amount: 180000,
        createdAt: new Date(now.getTime() - 15 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: "PM1005",
        booking_id: "BK1005",
        reference: "PAY20240210E",
        status: "completed" as const,
        amount: 120000,
        createdAt: new Date(now.getTime() - 8 * 24 * 60 * 60 * 1000).toISOString(),
      },
    ],
  }
}

const mockNotifications = (): Notification[] => {
  const now = new Date()
  return [
    {
      id: "n1",
      user_id: "1",
      type: "payment",
      title: "Payment Confirmed",
      message: "Your booking payment of ₦150,000 has been successfully processed",
      read: false,
      data: { bookingId: "BK1001", amount: 150000 },
      createdAt: new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "n2",
      user_id: "2",
      type: "approval",
      title: "Hostel Approved",
      message: "Your hostel 'Elite Heights Hostel' has been approved and is now live",
      read: true,
      data: { hostelId: "h1" },
      createdAt: new Date(now.getTime() - 28 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "n3",
      user_id: "4",
      type: "booking",
      title: "Booking Confirmed",
      message: "Your reservation at Campus Haven is confirmed for the upcoming semester",
      read: true,
      data: { hostelId: "h2", bookingId: "BK1002" },
      createdAt: new Date(now.getTime() - 25 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "n4",
      user_id: "1",
      type: "system",
      title: "Welcome to HostelHub",
      message: "Complete your profile to get better hostel recommendations",
      read: false,
      createdAt: new Date(now.getTime() - 2 * 60 * 60 * 1000).toISOString(),
    },
  ]
}

export const useStore = create<Store>((set, get) => {
  const { bookings: initialBookings, payments: initialPayments } = mockBookingsAndPayments()
  const initialNotifications = mockNotifications()

  return {
    currentUser: null,
    setCurrentUser: (user) => set({ currentUser: user }),
    users: mockUsers,
    hostels: mockHostels,
    rooms: mockRooms,
    bookings: initialBookings,
    payments: initialPayments,
    notifications: initialNotifications,

    addHostel: (hostel) => set((state) => ({ hostels: [...state.hostels, hostel] })),
    updateHostel: (id, hostel) =>
      set((state) => ({
        hostels: state.hostels.map((h) => (h.id === id ? { ...h, ...hostel } : h)),
      })),
    deleteHostel: (id) =>
      set((state) => ({
        hostels: state.hostels.filter((h) => h.id !== id),
        rooms: state.rooms.filter((r) => r.hostel_id !== id),
      })),

    addRoom: (room) => set((state) => ({ rooms: [...state.rooms, room] })),
    updateRoom: (id, room) =>
      set((state) => ({
        rooms: state.rooms.map((r) => (r.id === id ? { ...r, ...room } : r)),
      })),
    deleteRoom: (id) => set((state) => ({ rooms: state.rooms.filter((r) => r.id !== id) })),
    getRoomsByHostel: (hostelId) => get().rooms.filter((r) => r.hostel_id === hostelId),

    addBooking: (booking) => set((state) => ({ bookings: [...state.bookings, booking] })),
    updateBooking: (id, booking) =>
      set((state) => ({
        bookings: state.bookings.map((b) => (b.id === id ? { ...b, ...booking } : b)),
      })),

    addPayment: (payment) => set((state) => ({ payments: [...state.payments, payment] })),

    addNotification: (notification) => set((state) => ({ notifications: [notification, ...state.notifications] })),
    markNotificationRead: (notificationId) =>
      set((state) => ({
        notifications: state.notifications.map((n) => (n.id === notificationId ? { ...n, read: true } : n)),
      })),
    getUserNotifications: (userId) =>
      get()
        .notifications.filter((n) => n.user_id === userId)
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()),
    deleteNotification: (notificationId) =>
      set((state) => ({
        notifications: state.notifications.filter((n) => n.id !== notificationId),
      })),

    resetDemo: () => {
      const { bookings: freshBookings, payments: freshPayments } = mockBookingsAndPayments()
      set({
        currentUser: null,
        bookings: freshBookings,
        payments: freshPayments,
        notifications: mockNotifications(),
        hostels: mockHostels,
        users: mockUsers,
        rooms: mockRooms,
      })
    },
  }
})
