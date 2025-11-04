"use client"

import { useStore } from "@/lib/store"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { X, CheckCircle, AlertCircle, Mail, Trash2 } from "lucide-react"

interface NotificationDropdownProps {
  onClose: () => void
}

export function NotificationDropdown({ onClose }: NotificationDropdownProps) {
  const { currentUser, getUserNotifications, markNotificationRead, deleteNotification } = useStore()

  if (!currentUser) return null

  const notifications = getUserNotifications(currentUser.id)

  const getIcon = (type: string) => {
    switch (type) {
      case "booking":
      case "payment":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "approval":
        return <CheckCircle className="h-4 w-4 text-blue-500" />
      case "rejection":
        return <AlertCircle className="h-4 w-4 text-red-500" />
      default:
        return <Mail className="h-4 w-4 text-primary" />
    }
  }

  return (
    <div className="absolute right-0 top-12 w-96 z-50">
      <Card className="border shadow-lg">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="font-semibold text-foreground">Notifications</h3>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
            <X className="h-4 w-4" />
          </button>
        </div>

        {notifications.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-sm text-muted-foreground">No notifications yet</p>
          </div>
        ) : (
          <ScrollArea className="h-96">
            <div className="space-y-2 p-3">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-3 rounded-lg border transition-all ${
                    notification.read ? "bg-background border-border" : "bg-primary/5 border-primary/20"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3 flex-1">
                      {getIcon(notification.type)}
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-foreground text-sm">{notification.title}</p>
                        <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{notification.message}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {new Date(notification.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => deleteNotification(notification.id)}
                      className="flex-shrink-0"
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                  {!notification.read && (
                    <Button
                      size="sm"
                      variant="outline"
                      className="w-full mt-2 text-xs bg-transparent"
                      onClick={() => markNotificationRead(notification.id)}
                    >
                      Mark as Read
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </ScrollArea>
        )}
      </Card>
    </div>
  )
}
