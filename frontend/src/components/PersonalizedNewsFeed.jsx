// src/components/PersonalizedNewsFeed.jsx
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { axiosInstance } from '../lib/axios';
import SimplePost from './SimplePost'; // Import the SimplePost component

const PersonalizedNewsFeed = () => {
    // Fetch personalized posts for the user
    const { data: posts, isLoading, isError } = useQuery({
        queryKey: ['personalizedPosts'],
        queryFn: () => axiosInstance.get('/posts/personalized'),
    });

    // Show loading spinner if data is being fetched
    if (isLoading) {
        return <div className="text-center text-lg text-gray-500">Loading personalized news feed...</div>;
    }

    // Show error message if data fetch fails
    if (isError) {
        return <div className="text-center text-lg text-red-500">Error fetching personalized news feed.</div>;
    }

    return (
        <div className="personalized-news-feed max-w-3xl mx-auto p-6">
            <h2 className="text-3xl font-bold mb-8 text-[#804FEF] tracking-wide text-center">
                Personalized News Feed
            </h2>

            {posts.data.length > 0 ? (
                <div className="space-y-6">
                    {posts.data.map(post => (
                        <div
                            key={post._id}
                            className="bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500 p-4 rounded-lg shadow-md border border-purple-200 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:opacity-95"
                        >
                            <SimplePost post={post} /> {/* Use SimplePost instead of Post */}
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center text-lg text-gray-500">No personalized posts available.</div>
            )}
        </div>
    );
};

export default PersonalizedNewsFeed;