
import React, { createContext, useState, useEffect } from "react";




export const ChatContext = createContext(null);


const ChatContextProvider = ({ children }) => {
    const [loading, setLoading] = useState(false)
    const [chatHide, setChatHide] = useState(true)
    const [user, setUser] = useState(null);

    useEffect(() => {

    }, []);

    const authInfo = { chatHide, setChatHide,user, setUser };
    return (
        <ChatContext.Provider value={authInfo}>{!loading && children}</ChatContext.Provider>
    );
};

export default ChatContextProvider;