import { Link } from "react-router-dom";
import { useState } from "react";
import profileLogo from "../assets/icon.png";
import { Bell } from "lucide-react";
import { useNotification } from "../context/NotificationContext";

const Header = ({ title }) => {
  const [showNotif, setShowNotif] = useState(false);
  const { notifications, unreadCount, markAllAsRead } = useNotification();

  const handleToggleNotif = () => {
    setShowNotif(!showNotif);
    if (!showNotif) markAllAsRead();
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 bg-white shadow-md z-50 h-16 px-6 flex items-center justify-between">
        {/* Colonne gauche : bouton notif */}
        <div className="relative flex-shrink-0">
          <button
            onClick={handleToggleNotif}
            className="bg-gray-100 hover:bg-gray-200 p-2 rounded-full transition-colors relative"
          >
            <Bell size={22} className="text-gray-700" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 left-5 bg-red-500 text-white text-xs font-bold rounded-full px-1.5 py-0.5">
                {unreadCount}
              </span>
            )}
          </button>

          {showNotif && (
            <div className="absolute top-12 left-0 w-72 max-h-64 overflow-auto bg-white border rounded shadow-md p-3 space-y-2 z-50">
              {notifications.length > 0 ? (
                notifications.map((n) => (
                  <div key={n.id} className="text-sm text-gray-700 border-b last:border-b-0 pb-1">
                    {n.message}
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-400">Aucune notification</p>
              )}
            </div>
          )}
        </div>

        {/* Titre centré (avec position absolute pour ne pas être influencé par les colonnes) */}
        <div className="absolute left-1/2 transform -translate-x-1/2 max-w-[70%] text-center">
          <h1 className="text-xl font-semibold text-gray-800 truncate whitespace-nowrap">
            {title}
          </h1>
        </div>

        {/* Colonne droite : profil */}
        <div className="flex-shrink-0">
          <Link to="/profile">
            <img
              src={profileLogo || "/placeholder.svg"}
              alt="Profil"
              className="h-9 w-9 rounded-full object-cover border border-gray-300"
            />
          </Link>
        </div>
      </header>

      {/* Marge haute pour éviter que le contenu soit masqué */}
      <div className="h-16" />
    </>
  );
};

export default Header;
