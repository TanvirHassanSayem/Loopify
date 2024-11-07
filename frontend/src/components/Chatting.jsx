import React, { useContext, useEffect, useState } from 'react';
import { ChatContext } from '../utils/ChatContext';
import { axiosInstance } from "../lib/axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const Chatting = () => {
    const { chatHide, setChatHide, user } = useContext(ChatContext);
    const [chat, setChat] = useState([]);
    const [isTyping, setIsTyping] = useState(false);
    const queryClient = useQueryClient();

    const { data: chatData } = useQuery({
        queryKey: ["chat", user],
        queryFn: () => axiosInstance.get(`/chats/getmessages/${user}`),
        enabled: !chatHide,
    });

    useEffect(() => {
        if (chatData) setChat(chatData.data);
    }, [chatData]);

    useEffect(() => {
        const interval = setInterval(() => {
            if (!chatHide) queryClient.invalidateQueries({ queryKey: ["chat", user] });
        }, 2000);
        return () => clearInterval(interval);
    }, [chatHide, queryClient, user]);

    const { mutate: handlepost } = useMutation({
        mutationFn: async (message) => {
            await axiosInstance.post(`/chats/sendmessages`, { to: user, message: message });
        },
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["chat", user] }),
    });

    const sendHandle = (e) => {
        e.preventDefault();
        let text = e.target.text.value;
        setChat((prevChat) => [...prevChat, { to: user, message: text }]);
        handlepost(text);
        e.target.text.value = '';
        setIsTyping(false);
    };

    return (
        <>
            {!chatHide && (
                <div id="chat-container" className="fixed bottom-0 right-4 w-96 z-[9999] transition-opacity duration-300">
                    <div className="relative bg-white/70 backdrop-blur-lg shadow-2xl rounded-lg max-w-lg w-full overflow-hidden">
                        {/* Background overlay */}
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-500 via-indigo-500 to-blue-500 opacity-50 blur-md"></div>

                        {/* Header */}
                        <div className="relative p-4 border-b bg-gradient-to-r from-indigo-600 to-purple-700 text-white flex justify-between items-center rounded-t-lg shadow-xl z-10">
                            <div className="flex items-center space-x-2">
                                <p className="text-lg font-semibold">{user}</p>
                                <span className="bg-white text-indigo-600 text-xs font-bold py-1 px-2 rounded-full">
                                    Chatting with
                                </span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <p className="text-lg font-semibold">You</p>
                                <button
                                    id="close-chat"
                                    onClick={() => setChatHide(true)}
                                    className="text-gray-200 hover:text-gray-400 p-2 bg-gray-800 rounded-full transition duration-200 transform hover:scale-110"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-5 h-5"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        {/* Chat area */}
                        <div id="chatbox" className="relative p-4 h-80 overflow-y-auto bg-chat-pattern z-10">
                            {chat.map((e, index) => (
                                <div 
                                    key={index} 
                                    className={`mb-3 transition-all duration-300 transform ${
                                        user !== e.from ? "text-right" : "text-left"
                                    }`}
                                >
                                    <p
                                        className={`${
                                            user !== e.from
                                                ? "bg-gradient-to-r from-purple-500 to-indigo-500 text-white"
                                                : "bg-gray-300 text-gray-900"
                                        } rounded-3xl py-2 px-4 inline-block shadow-lg max-w-xs opacity-90 hover:opacity-100`}
                                    >
                                        {e.message}
                                    </p>
                                </div>
                            ))}
                            {isTyping && (
                                <div className="text-left mb-2 text-gray-500 text-sm italic">
                                    {user} is typing...
                                </div>
                            )}
                        </div>

                        {/* Message input */}
                        <form onSubmit={sendHandle} className="relative p-4 border-t flex bg-white/70 backdrop-blur-lg z-10 rounded-b-lg">
                            <input
                                id="user-input"
                                type="text"
                                name="text"
                                placeholder="Type a message..."
                                onChange={() => setIsTyping(true)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-l-full focus:outline-none focus:ring-2 focus:ring-indigo-600 placeholder-gray-500"
                            />
                            <button
                                id="send-button"
                                className="bg-indigo-500 text-white px-4 py-2 rounded-r-full hover:bg-indigo-600 transition duration-300 transform hover:scale-105"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-5 h-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                                    />
                                </svg>
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {/* CSS for Background Pattern */}
            <style jsx>{`
                .bg-chat-pattern {
                    background-image: linear-gradient(rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.1)), url('https://www.transparenttextures.com/patterns/cubes.png'); 
                    background-size: cover;
                    background-repeat: repeat;
                }
            `}</style>
        </>
    );
};

export default Chatting;
