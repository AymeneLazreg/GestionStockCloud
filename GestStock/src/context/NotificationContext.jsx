import { createContext, useContext, useState } from "react";

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  // Ajouter une nouvelle notification
  const addNotification = (message) => {
    const newNotif = {
      id: Date.now(), // ID unique basé sur le timestamp
      message,
    };

    setNotifications((prev) => [newNotif, ...prev]);
    setUnreadCount((prev) => prev + 1);
  };

  // Marquer toutes comme lues (réinitialise juste le badge)
  const markAllAsRead = () => {
    setUnreadCount(0);
  };

  // Vider les notifications (optionnel si tu veux un bouton plus tard)
  const clearNotifications = () => {
    setNotifications([]);
    setUnreadCount(0);
  };

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        addNotification,
        unreadCount,
        markAllAsRead,
        clearNotifications,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

// Hook pour y accéder dans les composants
export const useNotification = () => useContext(NotificationContext);
