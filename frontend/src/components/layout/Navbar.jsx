// import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
// import { axiosInstance } from "../../lib/axios";
// import { Link } from "react-router-dom";
// import { Bell, Home, LogOut, User, Users, Menu } from "lucide-react"; // Import the Menu icon for mobile toggle
// import { useState } from "react"; // Import useState for managing the mobile menu state
// import React from 'react';
// import { Link } from 'react-router-dom';

// const Navbar = () => {
//   const { data: authUser } = useQuery({ queryKey: ["authUser"] });
//   const queryClient = useQueryClient();

//   const { data: notifications } = useQuery({
//     queryKey: ["notifications"],
//     queryFn: async () => axiosInstance.get("/notifications"),
//     enabled: !!authUser,
//   });

//   const { data: connectionRequests } = useQuery({
//     queryKey: ["connectionRequests"],
//     queryFn: async () => axiosInstance.get("/connections/requests"),
//     enabled: !!authUser,
//   });

//   const { mutate: logout } = useMutation({
//     mutationFn: () => axiosInstance.post("/auth/logout"),
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["authUser"] });
//     },
//   });

//   const unreadNotificationCount = notifications?.data.filter((notif) => !notif.read).length;
//   const unreadConnectionRequestsCount = connectionRequests?.data?.length;

//   // State to manage mobile menu visibility
//   const [isOpen, setIsOpen] = useState(false);

//   return (
//     <nav className="bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-500 shadow-lg sticky top-0 z-10">
//       <div className="max-w-7xl mx-auto px-4 lg:px-8">
//         <div className="flex justify-between items-center py-3">
//           {/* Logo Section */}
//           <div className="flex items-center space-x-4">
//             <Link to="/" className="flex items-center space-x-2 group">
//               <div className="p-1.5 bg-gradient-to-br from-teal-400 via-teal-500 to-teal-600 rounded-xl transition-transform transform hover:scale-110 duration-300 shadow-[0px_4px_20px_rgba(128,79,239,0.5)] group-hover:shadow-[0px_6px_25px_rgba(128,79,239,0.7)]">
//                 <img
//                   className="h-12 w-12 rounded-lg transition-transform transform group-hover:scale-105 duration-300 group-hover:rotate-3 shadow-lg"
//                   src="/small-logo.png"
//                   alt="Brand Logo"
//                 />
//               </div>
//             </Link>
//           </div>

//           {/* Hamburger Menu Button */}
//           <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-white">
//             <Menu size={24} />
//           </button>

//           {/* Navigation Links */}
//           <div className={`flex-col md:flex md:flex-row ${isOpen ? "flex" : "hidden"} md:flex items-center gap-4 md:gap-6 text-white transition-all duration-300 ease-in-out`}>
//             {authUser ? (
//               <>
//                 <Link
//                   to={"/"}
//                   className="text-neutral flex flex-col items-center group relative transition-all duration-300 transform hover:scale-105"
//                 >
//                   <Home size={24} className="transition-transform transform group-hover:scale-110 duration-300" />
//                   <span className="text-xs hidden md:block">Home</span>
//                   <span className="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-500 transform scale-x-0 group-hover:scale-x-100 transition-all duration-300"></span>
//                 </Link>
//                 <Link
//                   to="/network"
//                   className="text-neutral flex flex-col items-center relative group transition-all duration-300 transform hover:scale-105"
//                 >
//                   <Users size={24} className="transition-transform transform group-hover:scale-110 duration-300" />
//                   <span className="text-xs hidden md:block">My Network</span>
//                   {unreadConnectionRequestsCount > 0 && (
//                     <span className="absolute -top-1 -right-1 md:right-4 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
//                       {unreadConnectionRequestsCount}
//                     </span>
//                   )}
//                   <span className="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-500 transform scale-x-0 group-hover:scale-x-100 transition-all duration-300"></span>
//                 </Link>
//                 <Link
//                   to="/notifications"
//                   className="text-neutral flex flex-col items-center relative group transition-all duration-300 transform hover:scale-105"
//                 >
//                   <Bell size={24} className="transition-transform transform group-hover:scale-110 duration-300" />
//                   <span className="text-xs hidden md:block">Notifications</span>
//                   {unreadNotificationCount > 0 && (
//                     <span className="absolute -top-1 -right-1 md:right-4 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-ping">
//                       {unreadNotificationCount}
//                     </span>
//                   )}
//                   <span className="absolute bottom-0 left-0 w-full h-0.5 bg-red-600 transform scale-x-0 group-hover:scale-x-100 transition-all duration-300"></span>
//                 </Link>
//                 <Link
//                   to={`/profile/${authUser.username}`}
//                   className="text-neutral flex flex-col items-center hover:text-gray-100 transition-colors duration-200 ease-in-out group relative"
//                 >
//                   <div className="w-6 h-6 rounded-full bg-gray-300 overflow-hidden">
//                     <img
//                       className="w-full h-full object-cover"
//                       src={authUser?.profilePicture || "/default-profile.png"}
//                       alt="User Profile"
//                     />
//                   </div>
//                   <span className="text-xs hidden md:block">Me</span>
//                   <span className="absolute bottom-0 left-0 w-full h-0.5 bg-purple-600 transform scale-x-0 group-hover:scale-x-100 transition-all duration-300"></span>
//                 </Link>
//                 <button
//                   className="flex items-center space-x-1 text-sm text-white hover:text-gray-200 transition-colors duration-200 ease-in-out"
//                   onClick={() => logout()}
//                 >
//                   <LogOut size={24} className="transition-transform transform hover:scale-110 duration-300" />
//                   <span className="hidden md:inline">Logout</span>
//                 </button>
//               </>
//             ) : (
//               <>
//                 <Link to="/login" className="text-white bg-blue-500 px-4 py-1 rounded-lg shadow-md hover:bg-blue-600 transition-all duration-300 transform hover:scale-105">
//                   Sign In
//                 </Link>
//                 <Link to="/signup" className="text-white bg-green-500 px-4 py-1 rounded-lg shadow-md hover:bg-green-600 transition-all duration-300 transform hover:scale-105">
//                   Join now
//                 </Link>
//               </>
//             )}
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;




import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../../lib/axios";
import { Link } from "react-router-dom";
import { Bell, Home, LogOut, User, Users, Menu } from "lucide-react"; // Import the Menu icon for mobile toggle
import { useState } from "react"; // Import useState for managing the mobile menu state
import React from 'react';

const Navbar = () => {
  const { data: authUser  } = useQuery({ queryKey: ["authUser "] });
  const queryClient = useQueryClient();

  const { data: notifications } = useQuery({
    queryKey: ["notifications"],
    queryFn: async () => axiosInstance.get("/notifications"),
    enabled: !!authUser ,
  });

  const { data: connectionRequests } = useQuery({
    queryKey: ["connectionRequests"],
    queryFn: async () => axiosInstance.get("/connections/requests"),
    enabled: !!authUser ,
  });

  const { mutate: logout } = useMutation({
    mutationFn: () => axiosInstance.post("/auth/logout"),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["authUser "] });
    },
  });

  const unreadNotificationCount = notifications?.data.filter((notif) => !notif.read).length;
  const unreadConnectionRequestsCount = connectionRequests?.data?.length;

  // State to manage mobile menu visibility
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-500 shadow-lg sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="flex justify-between items-center py-3">
          {/* Logo Section */}
          <div className="flex items-center space-x-4">
            <Link to="/" className="flex items-center space-x-2 group">
              <div className="p-1.5 bg-gradient-to-br from-teal-400 via-teal-500 to-teal-600 rounded-xl transition-transform transform hover:scale-110 duration-300 shadow-[0px_4px_20px_rgba(128,79,239,0.5)] group-hover:shadow-[0px_6px_25px_rgba(128,79,239,0.7)]">
                <img
                  className="h-12 w-12 rounded-lg transition-transform transform group-hover:scale-105 duration-300 group-hover:rotate-3 shadow-lg"
                  src="/small-logo.png"
                  alt="Brand Logo"
                />
              </div>
            </Link>
          </div>

          {/* Hamburger Menu Button */}
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-white">
            <Menu size={24} />
          </button>

          {/* Navigation Links */}
          <div className={`flex-col md:flex md:flex-row ${isOpen ? "flex" : "hidden"} md:flex items-center gap-4 md:gap-6 text-white transition-all duration-300 ease-in-out`}>
            {authUser  ? (
              <>
                <Link
                  to={"/"}
                  className="text-neutral flex flex-col items-center group relative transition-all duration-300 transform hover:scale-105"
                >
                  <Home size={24} className="transition-transform transform group-hover:scale-110 duration-300" />
                  <span className="text-xs hidden md:block">Home</span>
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-500 transform scale-x-0 group-hover:scale-x-100 transition-all duration-300"></span>
                </Link>
                <Link
                  to="/network"
                  className="text-neutral flex flex-col items-center relative group transition-all duration-300 transform hover:scale-105"
                >
                  <Users size={24} className="transition-transform transform group-hover:scale-110 duration-300" />
                  <span className="text-xs hidden md:block">My Network</span>
                  {unreadConnectionRequestsCount > 0 && (
                    <span className="absolute -top-1 -right-1 md:right-4 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                      {unreadConnectionRequestsCount}
                    </span>
                  )}
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-500 transform scale-x-0 group-hover:scale-x-100 transition-all duration-300"></span>
                </Link>
                <Link
                  to="/notifications"
                  className="text-neutral flex flex-col items-center relative group transition-all duration-300 transform hover:scale-105"
                >
                  <Bell size={24} className="transition-transform transform group-hover:scale-110 duration-300" />
                  <span className="text-xs hidden md:block">Notifications</span>
                  {unreadNotificationCount > 0 && (
                    <span className="absolute -top-1 -right-1 md:right-4 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-ping">
                      {unreadNotificationCount}
                    </span>
                  )}
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-red-600 transform scale-x-0 group-hover:scale-x-100 transition-all duration-300"></span>
                </Link>
                <Link
                  to={`/profile/${authUser .username}`}
                  className="text-neutral flex flex-col items-center hover:text-gray-100 transition-colors duration-200 ease-in-out group relative"
                >
                  <div className="w-6 h-6 rounded-full bg-gray-300 overflow-hidden">
                    <img
                      className="w-full h-full object-cover"
                      src={authUser ?.profilePicture || "/default-profile.png"}
                      alt="User  Profile"
                    />
                  </div>
                  <span className="text-xs hidden md:block">Me</span>
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-purple-600 transform scale-x-0 group-hover:scale-x-100 transition-all duration-300"></span>
                </Link>
                <Link
                  to="/polls"
                  className="text-neutral flex flex-col items-center group relative transition-all duration-300 transform hover:scale-105"
                >
                  <span className="text-xs hidden md:block">Polls</span>
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-500 transform scale-x-0 group-hover:scale-x-100 transition-all duration-300"></span>
                </Link>
                <Link
                  to="/surveys"
                  className="text-neutral flex flex-col items-center group relative transition-all duration-300 transform hover:scale-105"
                >
                  <span className="text-xs hidden md:block">Surveys</span>
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-500 transform scale-x-0 group-hover:scale-x-100 transition-all duration-300"></span>
                </Link>
                <button
                  className="flex items-center space-x-1 text-sm text-white hover:text-gray-200 transition-colors duration-200 ease-in-out"
                  onClick={() => logout()}
                >
                  <LogOut size={24} className="transition-transform transform hover:scale-110 duration-300" />
                  <span className="hidden md:inline">Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-white bg-blue-500 px-4 py-1 rounded-lg shadow-md hover:bg-blue-600 transition-all duration-300 transform hover:scale-105">
                  Sign In
                </Link>
                <Link to="/signup" className="text-white bg-green-500 px-4 py-1 rounded-lg shadow-md hover:bg-green-600 transition-all duration-300 transform hover:scale-105">
                  Join now
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;