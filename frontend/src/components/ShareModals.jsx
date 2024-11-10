import React from "react";
import { X } from "lucide-react";

const ShareModals = ({ isOpen, message, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black bg-opacity-30 transition-opacity duration-300 ease-in-out">
      <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 shadow-2xl w-80 max-w-full relative transform transition-transform duration-500 hover:scale-105 hover:rotate-1">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 transition-colors duration-200"
          aria-label="Close Modal"
        >
          <X size={20} />
        </button>

        {/* Modal Header */}
        <h3 className="text-xl font-bold text-[#4A3F8C] dark:text-[#D4BBFF] mb-4 text-center tracking-wide">
          Share Post
        </h3>

        {/* Message */}
        <p className="text-gray-600 dark:text-gray-300 mb-6 text-sm text-center">
          {message}
        </p>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="w-full py-3 rounded-xl bg-gradient-to-r from-[#804FEF] to-[#B36EDC] text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-105"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ShareModals;
