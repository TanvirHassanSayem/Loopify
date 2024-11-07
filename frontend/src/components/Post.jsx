
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { axiosInstance } from "../lib/axios";
import { Link, useParams } from "react-router-dom";
import { Loader, MessageCircle, Send, Share2, ThumbsUp, Trash2, Sun, Moon } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

import PostAction from "./PostAction";
import ShareModals from "./ShareModals";

const Post = ({ post }) => {
  const { postId } = useParams();
  const { data: authUser } = useQuery({ queryKey: ["authUser"] });
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState(post.comments || []);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [likeAnimation, setLikeAnimation] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [message, setMessage] = useState("");

  const isOwner = authUser._id === post.author._id;
  const isLiked = post.likes.includes(authUser._id);
  const queryClient = useQueryClient();

  const { mutate: deletePost, isPending: isDeletingPost } = useMutation({
    mutationFn: async () => {
      await axiosInstance.delete(`/posts/delete/${post._id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  const { mutate: createComment, isPending: isAddingComment } = useMutation({
    mutationFn: async (newComment) => {
      await axiosInstance.post(`/posts/${post._id}/comment`, { content: newComment });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  const { mutate: likePost, isPending: isLikingPost } = useMutation({
    mutationFn: async () => {
      await axiosInstance.post(`/posts/${post._id}/like`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      queryClient.invalidateQueries({ queryKey: ["post", postId] });
    },
  });

  const handleDeletePost = () => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;
    deletePost();
  };

  const handleLikePost = async () => {
    if (isLikingPost) return;
    setLikeAnimation(true);
    likePost();
    setTimeout(() => setLikeAnimation(false), 300);
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      createComment(newComment);
      setNewComment("");
      setComments([
        ...comments,
        {
          content: newComment,
          user: {
            _id: authUser._id,
            name: authUser.name,
            profilePicture: authUser.profilePicture,
          },
          createdAt: new Date(),
        },
      ]);
    }
  };

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  const handleSharePost = () => {
    const shareableLink = `${window.location.origin}/posts/${post._id}`;
    navigator.clipboard.writeText(shareableLink).then(() => {
      // setMessage('Link copied to clipboard!');
      // setIsModalOpen(true);
      document.getElementById('sharemodal').showModal()
      
    }).catch((err) => {
      console.error('Failed to copy text: ', err);
      setMessage('Failed to copy the link.');
      setIsModalOpen(true);
    });
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={`bg-secondary shadow-lg rounded-lg mb-6 ${theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-gray-900"}`}>
      {/* Theme Toggle Button */}
      <div className="flex justify-end p-2">
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full bg-primary hover:bg-primary-dark transition-colors duration-300"
          aria-label="Toggle Theme"
        >
          {theme === "light" ? <Moon size={20} className="text-gray-700" /> : <Sun size={20} className="text-yellow-400" />}
        </button>
      </div>

      <div className="p-5">
        {/* Header Section */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <Link to={`/profile/${post?.author?.username}`}>
              <img
                src={post.author.profilePicture || "/avatar.png"}
                alt={post.author.name}
                className="w-10 h-10 rounded-full mr-3 border-2 border-primary"
              />
            </Link>
            <div>
              <Link to={`/profile/${post?.author?.username}`} className="font-semibold hover:underline text-gray-900 dark:text-gray-200">
                {post.author.name}
              </Link>
              <p className="text-sm text-info">{post.author.headline}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
              </p>
            </div>
          </div>
          {isOwner && (
            <button onClick={handleDeletePost} className="text-red-600 hover:text-red-800 transition-colors">
              {isDeletingPost ? <Loader size={18} className="animate-spin" /> : <Trash2 size={18} />}
            </button>
          )}
        </div>

        {/* Post Content */}
        <p className="mb-4 text-gray-900 dark:text-gray-200">{post.content}</p>
        {post.image && <img src={post.image} alt="Post content" className="rounded-lg w-full object-cover mb-4" />}

        {/* Post Actions */}
        <div className="flex justify-around py-2 border-t border-gray-300 dark:border-gray-600">
          <PostAction
            icon={
              <ThumbsUp
                size={20}
                className={`transition-transform duration-200 ${likeAnimation ? 'scale-125' : 'scale-100'}`}
              />
            }
            text={`Like (${post.likes.length})`}
            onClick={handleLikePost}
            className="hover:bg-blue-200 dark:hover:bg-blue-900 transition-colors duration-300 rounded-lg p-2"
          />
          <PostAction
            icon={<MessageCircle size={20} />}
            text={`Comment (${comments.length})`}
            onClick={() => setShowComments(!showComments)}
            className="hover:bg-blue-200 dark:hover:bg-blue-900 transition-colors duration-300 rounded-lg p-2"
          />
          <PostAction
            icon={<Share2 size={20} />}
            text="Share"
            onClick={handleSharePost}
            className="hover:bg-blue-200 dark:hover:bg-blue-900 transition-colors duration-300 rounded-lg p-2"
          />
        </div>
      </div>

      {/* Comments Section */}
      {showComments && (
        <div className="px-4 py-4 bg-gray-100 dark:bg-gray-700 rounded-b-lg">
          <div className="mb-4 max-h-60 overflow-y-auto">
            {comments.map((comment) => (
              <div key={comment._id} className="mb-3 p-3 bg-white dark:bg-gray-800 shadow rounded-lg flex items-start">
                <img src={comment.user.profilePicture || "/avatar.png"} alt={comment.user.name} className="w-8 h-8 rounded-full mr-2" />
                <div className="flex-grow">
                  <div className="flex items-center">
                    <span className="font-semibold text-sm mr-2 text-gray-900 dark:text-gray-200">{comment.user.name}</span>
                    <span className="text-xs text-gray-400 dark:text-gray-500">{formatDistanceToNow(new Date(comment.createdAt))} ago</span>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300">{comment.content}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Add Comment Input */}
          <form onSubmit={handleAddComment} className="flex items-center">
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a comment..."
              className="flex-grow p-2 rounded-l-full bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button
              type="submit"
              className="bg-primary p-2 rounded-r-full hover:bg-primary-dark transition-colors"
              disabled={isAddingComment}
            >
              {isAddingComment ? <Loader size={18} className="animate-spin text-white" /> : <Send size={18} className="text-white" />}
            </button>
          </form>
        </div>
      )}

      {/* Share Modal */}
      <ShareModals isOpen={isModalOpen} message={message} onClose={closeModal} />

    </div>
  );
};

export default Post;
