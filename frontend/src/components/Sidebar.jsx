import { useState } from "react";
import { Link } from "react-router-dom";
import { Home, UserPlus, Bell, Sun, Moon } from "lucide-react";

export default function Sidebar({ user }) {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
  };

  return (
    <div
      className={`${
        theme === "dark"
          ? "bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white"
          : "bg-gradient-to-b from-white via-gray-50 to-gray-100 text-gray-800"
      } rounded-3xl shadow-2xl overflow-hidden transform transition-all duration-500 ease-in-out scale-100 hover:scale-105`}
    >
      {/* Theme Toggle Button */}
      <div className="p-4 flex justify-end">
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500 transition-all duration-300"
          aria-label="Toggle Theme"
        >
          {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>

      {/* Profile Section */}
      <div className="p-4 text-center relative">
        <div
          className="h-24 rounded-t-lg bg-cover bg-center filter brightness-90"
          style={{
            backgroundImage: `url("${user.bannerImg || "banner.jpg"}")`,
          }}
        />

        <Link to={`/profile/${user.username}`} className="absolute top-12 left-1/2 transform -translate-x-1/2">
          <img
            src={user.profilePicture || "/avatar.png"}
            alt={user.name}
            className="w-20 h-20 rounded-full border-4 border-white shadow-lg transform transition-all duration-300 hover:scale-105"
          />
        </Link>

        <div className="mt-16">
          <h2 className="text-lg font-bold" style={{ color: "#804FEF" }}>{user.name}</h2>
          <p className="text-sm" style={{ color: "#804FEF" }}>{user.headline}</p>
          <p className="text-xs mt-1 text-gray-500 dark:text-gray-400">
            {user.connections.length} connections
          </p>
        </div>
      </div>

      {/* Navigation Links */}
      <div className="border-t border-gray-200 dark:border-gray-700 mt-4">
        <nav className="flex flex-col space-y-1 p-4">
          <ul>
            {[
              { name: "Home", icon: <Home size={20} />, to: "/" },
              { name: "My Network", icon: <UserPlus size={20} />, to: "/network" },
              { name: "Notifications", icon: <Bell size={20} />, to: "/notifications" },
            ].map(({ name, icon, to }) => (
              <li key={name}>
                <Link
                  to={to}
                  className={`flex items-center py-2 px-4 rounded-md ${
                    theme === "dark"
                      ? "text-gray-300 hover:bg-gray-800"
                      : "text-gray-800 hover:bg-gray-200"
                  } transition-all duration-200 ease-in-out`}
                >
                  <div className="mr-3 text-purple-500">{icon}</div>
                  <span style={{ color: "#804FEF" }}>{name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Profile Link */}
      <div className="border-t border-gray-200 dark:border-gray-700 p-4 text-center mt-4">
        <Link
          to={`/profile/${user.username}`}
          className="text-sm font-semibold"
          style={{ color: "#804FEF" }}
        >
          Visit your profile
        </Link>
      </div>
    </div>
  );
}
