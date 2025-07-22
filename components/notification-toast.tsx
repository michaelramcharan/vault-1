"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { CheckCircle, AlertCircle, Info, X } from "lucide-react"

interface ToastNotification {
  id: string
  type: "success" | "error" | "info"
  title: string
  message: string
  duration?: number
}

interface NotificationToastProps {
  notifications: ToastNotification[]
  onRemove: (id: string) => void
}

export function NotificationToast({ notifications, onRemove }: NotificationToastProps) {
  useEffect(() => {
    notifications.forEach((notification) => {
      if (notification.duration !== 0) {
        const timer = setTimeout(() => {
          onRemove(notification.id)
        }, notification.duration || 5000)

        return () => clearTimeout(timer)
      }
    })
  }, [notifications, onRemove])

  const getIcon = (type: ToastNotification["type"]) => {
    switch (type) {
      case "success":
        return <CheckCircle className="w-5 h-5 text-green-400" />
      case "error":
        return <AlertCircle className="w-5 h-5 text-red-400" />
      case "info":
        return <Info className="w-5 h-5 text-blue-400" />
    }
  }

  const getColors = (type: ToastNotification["type"]) => {
    switch (type) {
      case "success":
        return "border-green-500/30 bg-green-900/20"
      case "error":
        return "border-red-500/30 bg-red-900/20"
      case "info":
        return "border-blue-500/30 bg-blue-900/20"
    }
  }

  return (
    <div className="fixed top-4 right-4 z-[100] space-y-2">
      <AnimatePresence>
        {notifications.map((notification) => (
          <motion.div
            key={notification.id}
            initial={{ opacity: 0, x: 300, scale: 0.3 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 300, scale: 0.5, transition: { duration: 0.2 } }}
            className={`max-w-sm p-4 rounded-lg border backdrop-blur-sm ${getColors(notification.type)}`}
          >
            <div className="flex items-start space-x-3">
              {getIcon(notification.type)}
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-medium text-white">{notification.title}</h4>
                <p className="text-sm text-gray-300 mt-1">{notification.message}</p>
              </div>
              <button
                onClick={() => onRemove(notification.id)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}

// Hook for managing notifications
export function useNotifications() {
  const [notifications, setNotifications] = useState<ToastNotification[]>([])

  const addNotification = (notification: Omit<ToastNotification, "id">) => {
    const id = Math.random().toString(36).substr(2, 9)
    setNotifications((prev) => [...prev, { ...notification, id }])
  }

  const removeNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id))
  }

  return {
    notifications,
    addNotification,
    removeNotification,
  }
}
