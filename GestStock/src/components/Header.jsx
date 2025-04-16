import { Link } from "react-router-dom";
import { useState } from "react";
import profileLogo from "../assets/icon.png";
import { Bell } from "lucide-react";
import { useNotification } from "../context/NotificationContext";

const Header = ({ title }) => {
  const [showNotif, setShowNotif] = useState(false);
  const { notifications, unreadCount, markAllAsRead } = useNotification(); // ✅ seulement ça !

  const handleToggleNotif = () => {
    setShowNotif(!showNotif);
    if (!showNotif) markAllAsRead();
  };

  return (
    <div className="header" style={{ position: "relative" }}>
      <div
        className="notif-icon"
        onClick={handleToggleNotif}
        style={{ cursor: "pointer", marginRight: "10px" }}
      >
        <Bell size={26} />
        {unreadCount > 0 && (
          <span
            style={{
              position: "absolute",
              top: -5,
              left: 20,
              background: "red",
              color: "white",
              borderRadius: "50%",
              fontSize: "12px",
              padding: "2px 6px",
            }}
          >
            {unreadCount}
          </span>
        )}
      </div>

      {showNotif && (
        <div className="notif-dropdown">
          {notifications.length > 0 ? (
            notifications.map((n) => (
              <div key={n.id} className="notif-item">
                {n.message}
              </div>
            ))
          ) : (
            <p style={{ fontSize: "14px", color: "#999" }}>Aucune notification</p>
          )}
        </div>
      )}

      <h1>{title}</h1>

      <Link to="/profile">
        <img src={profileLogo || "/placeholder.svg"} className="logo" alt="Profile Logo" />
      </Link>
    </div>
  );
};

export default Header;
