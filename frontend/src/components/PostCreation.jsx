import React, { useState, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { Image, Loader } from "lucide-react";

const PostCreation = ({ user }) => {
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isTyping, setIsTyping] = useState(false);

  const queryClient = useQueryClient();

  const { mutate: createPostMutation, isPending } = useMutation({
    mutationFn: async (postData) => {
      const res = await axiosInstance.post("/posts/create", postData, {
        headers: { "Content-Type": "application/json" },
      });
      return res.data;
    },
    onSuccess: () => {
      toast.success("Post created successfully");
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      resetForm();
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || "Failed to create post");
    },
  });

  const handlePostCreation = async () => {
    if (content.trim() === "" && !image) return;

    try {
      const postData = { content };
      if (image) postData.image = await readFileAsDataURL(image);

      // Preserve white spaces by sending the content as is
      createPostMutation(postData);
    } catch (error) {
      console.error("Error in handlePostCreation:", error);
    }
  };

  const resetForm = () => {
    setContent("");
    setImage(null);
    setImagePreview(null);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) {
      readFileAsDataURL(file).then(setImagePreview);
    } else {
      setImagePreview(null);
    }
  };

  const readFileAsDataURL = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  // Auto-save functionality with debounce
  useEffect(() => {
    if (!content && !image) return;

    setIsTyping(true);
    const debounceTimer = setTimeout(() => {
      handlePostCreation();
      setIsTyping(false);
    }, 1000); // Adjust delay time as needed

    return () => clearTimeout(debounceTimer);
  }, [content, image]);

  return (
    <div className="bg-gradient-to-br from-indigo-200 via-purple-200 to-pink-200 rounded-xl shadow-2xl p-6 transform hover:scale-105 transition-transform duration-500 ease-in-out">
      <div className="flex items-start space-x-4">
        <img
          src={user.profilePicture || "/avatar.png"}
          alt={user.name}
          className="w-14 h-14 rounded-full border-4 border-primary shadow-lg transition-transform transform hover:scale-110 duration-300"
        />
        <textarea
          placeholder="What's on your mind?"
          className="w-full p-5 rounded-xl bg-white shadow-xl focus:outline-none focus:ring-2 focus:ring-purple-600 text-gray-800 font-medium transition-all duration-300 min-h-[120px] resize-none"
          style={{ whiteSpace: "pre-wrap" }} // Ensures white spaces are kept
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>

      {imagePreview && (
        <div className="mt-4 rounded-lg overflow-hidden shadow-lg">
          <img
            src={imagePreview}
            alt="Selected"
            className="w-full h-auto rounded-lg transform hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}

      <div className="flex justify-between items-center mt-6">
        <label className="flex items-center text-primary cursor-pointer transition-all duration-300 hover:text-purple-800">
          <Image size={26} className="mr-2 transform transition-all duration-200 hover:scale-110" />
          <span className="text-lg font-medium">Add Photo</span>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
          />
        </label>

        <button
          className={`bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold rounded-xl px-6 py-3 transform transition-transform duration-300 shadow-lg ${
            isPending ? "cursor-not-allowed opacity-70" : "hover:scale-105"
          }`}
          onClick={handlePostCreation}
          disabled={isPending || isTyping}
        >
          {isPending ? <Loader className="animate-spin" size={20} /> : "Share"}
        </button>
      </div>
    </div>
  );
};

export default PostCreation;
