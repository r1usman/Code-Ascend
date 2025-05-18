import { AlertTriangle, Bell, CheckCircle, Info, X } from "lucide-react";
import React, { useState } from "react";





const NotificationCenter = ({ onClose }) => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "info",
      message: "New resource added: 'Advanced JavaScript Patterns'",
      time: "Just now",
      read: false,
    },
    {
      id: 2,
      type: "warning",
      message: "Your attention level has dropped below 70%",
      time: "5 min ago",
      read: false,
    },
    {
      id: 3,
      type: "success",
      message: "Your question has been answered by the instructor",
      time: "10 min ago",
      read: false,
    },
    {
      id: 4,
      type: "info",
      message: "Quiz on React Hooks will begin in 15 minutes",
      time: "12 min ago",
      read: true,
    },
  ]);

  const markAllAsRead = () => {
    setNotifications(
      notifications.map((notification) => ({
        ...notification,
        read: true,
      }))
    );
  };

  const getIcon = (type) => {
    switch (type) {
      case "info":
        return <Info size={16} className="text-text_primary" />;
      case "warning":
        return <AlertTriangle size={16} className="text-amber-400" />;
      case "success":
        return <CheckCircle size={16} className="text-green-400" />;
      default:
        return <Bell size={16} className="text-dark-text-muted" />;
    }
  };

  return (
    <div className="w-80 bg-dark-bg-secondary2 rounded-lg shadow-xl border border-dark-gray-border overflow-hidden animate-slideIn">
      <div className="flex justify-between items-center p-3 border-b border-dark-gray-border">
        <div className="flex items-center gap-2">
          <Bell size={16} className="text-text_primary" />
          <h3 className="font-robert-medium text-dark-text-color">
            Notifications
          </h3>
          <span className="bg-text_primary/20 text-text_primary text-xs px-2 py-0.5 rounded-full">
            {notifications.filter((n) => !n.read).length}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={markAllAsRead}
            className="text-xs text-dark-text-muted hover:text-dark-text-color"
          >
            Mark all read
          </button>
          <button
            onClick={onClose}
            className="text-dark-text-muted hover:text-dark-text-color"
          >
            <X size={16} />
          </button>
        </div>
      </div>
      <div className="max-h-96 overflow-y-auto">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`p-3 border-b border-dark-gray-border ${
              notification.read ? "opacity-60" : ""
            } hover:bg-dark-bg-secondary3/50 transition-colors`}
          >
            <div className="flex items-start gap-3">
              <div className="mt-0.5">{getIcon(notification.type)}</div>
              <div className="flex-1">
                <p className="text-sm text-dark-text-color">
                  {notification.message}
                </p>
                <span className="text-xs text-dark-text-muted">
                  {notification.time}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationCenter;
