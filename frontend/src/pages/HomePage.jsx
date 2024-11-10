import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../lib/axios";
import Sidebar from "../components/Sidebar";
import PostCreation from "../components/PostCreation";
import Post from "../components/Post";
import { Users } from "lucide-react";
import RecommendedUser from "../components/RecommendedUser";
import React from 'react';
import PersonalizedNewsFeed from '../components/PersonalizedNewsFeed';


const HomePage = () => {
  // Fetching current user details
  const { data: authUser, isLoading: authUserLoading, isError: authUserError, error: authUserErrorMessage } = useQuery({
    queryKey: ["authUser"],
  });

  // Fetching recommended users to follow
  const { data: recommendedUsers, isLoading: recommendedUsersLoading, isError: recommendedUsersError, error: recommendedUsersErrorMessage } = useQuery({
    queryKey: ["recommendedUsers"],
    queryFn: async () => {
      const res = await axiosInstance.get("/users/suggestions");
      return res.data;
    },
  });

  // Fetching posts to show in the feed
  const { data: posts, isLoading: postsLoading, isError: postsError, error: postsErrorMessage } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const res = await axiosInstance.get("/posts");
      return res.data;
    },
  });

  // Show loading spinner if data is being fetched
  if (authUserLoading || recommendedUsersLoading || postsLoading) {
    return (
      <div className="text-center py-10">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 mx-auto"></div>
      </div>
    );
  }

  // Show error message if data fetch fails
  if (authUserError || recommendedUsersError || postsError) {
    const errorMessage = authUserErrorMessage?.message || recommendedUsersErrorMessage?.message || postsErrorMessage?.message;
    return (
      <div className="text-center py-10">
        <span className="text-red-500 font-semibold">Error: {errorMessage}</span>
      </div>
    );
  }

  return (

    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 px-4 sm:px-6 lg:px-8">
      
      {/* Sidebar (only visible on larger screens) */}
      <div className="hidden lg:block lg:col-span-1">
  {/* Sidebar Section */}
  <Sidebar user={authUser} />

  {/* Add margin to create space between Sidebar and Recommended Users */}
  {recommendedUsers?.length > 0 && (
    <div className="mt-8 col-span-1 lg:col-span-1 hidden lg:block">
      {/* Stylish background with gradient, blur effect, and smooth transition */}
      <div className="bg-gradient-to-r from-teal-400 via-indigo-500 to-purple-600 rounded-lg shadow-xl p-6 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:opacity-90 backdrop-blur-md">
        <h2 className="font-semibold mb-6 text-white text-2xl tracking-wide">
          People You May Know
        </h2>
        <div className="space-y-4">
          {recommendedUsers?.map((user) => (
            <RecommendedUser key={user._id} user={user} />
          ))}
        </div>
      </div>
    </div>
  )}
</div>

      
      {/* Post Feed (center section) */}
      <div className="col-span-1 lg:col-span-2 order-first lg:order-none">
        <PostCreation user={authUser} />

        {posts?.length > 0 ? (
          posts?.map((post) => (
            <Post key={post._id} post={post} />
          ))
        ) : (
          // If no posts are available
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 text-center transition-all duration-300 hover:shadow-xl">
            <div className="mb-6">
              <Users size={64} className="mx-auto text-blue-500" />
            </div>
            <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100 drop-shadow-lg">No Posts Yet</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">Connect with others to start seeing posts in your feed!</p>
          </div>
        )}
      </div>
      
      <div className="home-page">
            {/* Other components like Sidebar and PostCreation */}
            <PersonalizedNewsFeed />
        </div> 
      {/* Recommended Users (right side, only on large screens) */}
     


  

    </div>
  );
};

export default HomePage;
