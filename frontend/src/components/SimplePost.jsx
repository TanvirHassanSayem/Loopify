// src/components/SimplePost.jsx
import React from 'react';
import { formatDistanceToNow } from 'date-fns';

const SimplePost = ({ post }) => {
    return (
        <div className="bg-white shadow-md rounded-lg p-4 mb-4">
            <div className="flex items-center mb-2">
                <img src={post.author.profilePicture || "/avatar.png"} alt={post.author.name} className="w-10 h-10 rounded-full mr-2" />
                <div>
                    <h3 className="font-semibold">{post.author.name}</h3>
                    <p className="text-sm text-gray-500">{formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}</p>
                </div>
            </div>
            <p className="text-gray-800">{post.content}</p>
            {post.image && <img src={post.image} alt="Post content" className="mt-2 rounded-lg w-full" />}
        </div>
    );
};

export default SimplePost;