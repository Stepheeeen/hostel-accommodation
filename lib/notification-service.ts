import { useStore, type Notification } from "./store"

type NotificationType = "booking" | "payment" | "approval" | "rejection" | "cancellation" | "system"

interface CreateNotificationParams {
  userId: string
  type: NotificationType
  title: string
  message: string
  data?: Record<string, any>
}

export function createNotification({ userId, type, title, message, data }: CreateNotificationParams) {
  const store = useStore.getState()

  const notification: Notification = {
    id: "notif-" + Date.now(),
    user_id: userId,
    type,
    title,
    message,
    read: false,
    data,
    createdAt: new Date().toISOString(),
  }

  store.addNotification(notification)

  simulateEmailNotification(userId, title, message)

  return notification
}

function simulateEmailNotification(userId: string, title: string, message: string) {
  // In production, this would call an email service like SendGrid, Resend, or nodemailer
  console.log(`[EMAIL] To: ${userId}`)
  console.log(`[EMAIL] Subject: ${title}`)
  console.log(`[EMAIL] Body: ${message}`)
}

export function getNotificationMessage(
  type: NotificationType,
  data: Record<string, any>,
): { title: string; message: string } {
  switch (type) {
    case "booking":
      return {
        title: "Booking Confirmed",
        message: `Your booking at ${data.hostelName} for ${data.roomType} room has been confirmed. Reference: ${data.reference}`,
      }
    case "payment":
      return {
        title: "Payment Successful",
        message: `Payment of ₦${data.amount.toLocaleString()} received for your booking at ${data.hostelName}`,
      }
    case "approval":
      return {
        title: "Hostel Approved",
        message: `Your hostel "${data.hostelName}" has been approved and is now live on HostelHub!`,
      }
    case "rejection":
      return {
        title: "Hostel Rejected",
        message: `Your hostel application was not approved. Reason: ${data.reason}`,
      }
    case "cancellation":
      return {
        title: "Booking Cancelled",
        message: `Your booking at ${data.hostelName} has been cancelled. Refund will be processed within 3-5 business days.`,
      }
    default:
      return {
        title: "System Notification",
        message: data.message || "You have a new notification",
      }
  }
}
