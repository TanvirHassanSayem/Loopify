import React from "react";
import { X } from "lucide-react";

const ShareModals = ({ isOpen, message, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center  backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-900 rounded-2xl p-5 shadow-2xl w-64 max-w-full relative transform transition-all duration-300 scale-100 hover:scale-105">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300"
          aria-label="Close Modal"
        >
          <X size={18} />
        </button>

        {/* Modal Header */}
        <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-3 text-center">
          Share Post
        </h3>

        {/* Message */}
        <p className="text-gray-600 dark:text-gray-300 mb-5 text-sm text-center">
          {message}
        </p>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="w-full py-2 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold hover:from-indigo-600 hover:to-blue-500 transition-colors duration-300"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ShareModals;
