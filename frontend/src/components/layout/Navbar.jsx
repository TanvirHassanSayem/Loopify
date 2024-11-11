import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../../lib/axios";
import { Link } from "react-router-dom";
import { Bell, Home, LogOut, Users, Menu, BarChart, ClipboardList } from "lucide-react"; // Added BarChart and ClipboardList icons
import { useState } from "react";
import React from "react";

const Navbar = () => {
  const { data: authUser } = useQuery({ queryKey: ["authUser"] });
  const queryClient = useQueryClient();

  const { data: notifications } = useQuery({
    queryKey: ["notifications"],
    queryFn: async () => axiosInstance.get("/notifications"),
    enabled: !!authUser,
  });

  const { data: connectionRequests } = useQuery({
    queryKey: ["connectionRequests"],
    queryFn: async () => axiosInstance.get("/connections/requests"),
    enabled: !!authUser,
  });

  const { mutate: logout } = useMutation({
    mutationFn: () => axiosInstance.post("/auth/logout"),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
  });

  const unreadNotificationCount = notifications?.data.filter((notif) => !notif.read).length;
  const unreadConnectionRequestsCount = connectionRequests?.data?.length;

  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-500 shadow-lg sticky top-0 z-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo Section */}
          <div className="flex items-center space-x-4">
            <Link to="/" className="group flex items-center">
              <div className="p-2 bg-gradient-to-br from-teal-400 via-teal-500 to-teal-600 rounded-full transition-transform transform hover:scale-110 duration-300 shadow-lg">
                <img
                  className="h-10 w-10 rounded-lg object-cover"
                  src="/small-logo.png"
                  alt="Brand Logo"
                />
              </div>
            </Link>
          </div>

          {/* Hamburger Menu Button */}
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-white">
            <Menu size={26} />
          </button>

          {/* Navigation Links */}
          <div
            className={`${
              isOpen ? "flex" : "hidden"
            } flex-col md:flex md:flex-row items-center gap-6 md:gap-8 text-white md:space-x-4 transition-all duration-300`}
          >
            {authUser ? (
              <>
                {/* Home */}
                <NavItem to="/" label="Home" Icon={Home} />

                {/* My Network */}
                <NavItem
                  to="/network"
                  label="My Network"
                  Icon={Users}
                  badgeCount={unreadConnectionRequestsCount}
                  badgeColor="bg-blue-600"
                />

                {/* Notifications */}
                <NavItem
                  to="/notifications"
                  label="Notifications"
                  Icon={Bell}
                  badgeCount={unreadNotificationCount}
                  badgeColor="bg-red-600"
                />

                {/* Polls */}
                <NavItem to="/polls" label="Polls" Icon={BarChart} />

                {/* Surveys */}
                <NavItem to="/surveys" label="Surveys" Icon={ClipboardList} />

                {/* Profile */}
                <Link
                  to={`/profile/${authUser.username}`}
                  className="relative flex items-center space-x-2 group"
                >
                  <img
                    src={authUser.profilePicture || "/default-profile.png"}
                    alt="Profile"
                    className="w-8 h-8 rounded-full object-cover border-2 border-purple-500"
                  />
                  <span className="hidden md:block text-sm font-semibold group-hover:text-gray-200 transition-colors duration-300">
                    Me
                  </span>
                </Link>

                {/* Logout */}
                <button
                  onClick={() => logout()}
                  className="flex items-center space-x-1 text-sm text-white hover:text-gray-200 transition-transform duration-300"
                >
                  <LogOut size={22} className="hover:scale-110 transition-transform duration-300" />
                  <span className="hidden md:inline">Logout</span>
                </button>
              </>
            ) : (
              <>
                {/* Sign In & Join Now */}
                <Link
                  to="/login"
                  className="text-white bg-blue-500 px-4 py-1 rounded-lg shadow hover:bg-blue-600 transition-transform duration-300 transform hover:scale-105"
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className="text-white bg-green-500 px-4 py-1 rounded-lg shadow hover:bg-green-600 transition-transform duration-300 transform hover:scale-105"
                >
                  Join Now
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

const NavItem = ({ to, label, Icon, badgeCount, badgeColor }) => (
  <Link
    to={to}
    className="relative flex flex-col items-center group transition-transform duration-300 transform hover:scale-105"
  >
    {Icon && (
      <Icon size={24} className="group-hover:scale-110 transition-transform duration-300" />
    )}
    {label && (
      <span className="text-xs hidden md:block group-hover:text-gray-200 transition-colors duration-300">
        {label}
      </span>
    )}
    {badgeCount > 0 && (
      <span
        className={`absolute -top-2 -right-2 bg-opacity-80 ${badgeColor} text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse`}
      >
        {badgeCount}
      </span>
    )}
  </Link>
);

export default Navbar;
