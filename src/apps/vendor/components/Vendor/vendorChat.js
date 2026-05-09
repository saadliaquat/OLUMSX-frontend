import React, { useState, useEffect } from "react";
import Navbar from "./vendorNav";
import DisplayChatVendor from "./DisplayChatVendor";

export default function ChatVendor() {
  const vendorID = localStorage.getItem('userId');

  const [selectedChat, setSelectedChat] = useState(null);
  const [chats, setChats] = useState([]);
  const [customerID, setCustomerID] = useState("");
  useEffect(() => {
    const interval = setInterval(fetchChats, 5000);
    fetchChats();

    return () => clearInterval(interval);
  }, []);

  const fetchChats = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/chat/vendorchats', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ vendorID: vendorID })
      });

      if (!response.ok) {
        setChats([]);
        throw new Error('Failed to fetch chats');
      }

      const data = await response.json();
      setChats(data);
    } catch (error) {
      setChats([]);
      console.error('Error fetching chats:', error);
    }
  }

  const selectChat = (chat) => {
    setSelectedChat(chat);
    setCustomerID(chat.customerID);
  };

  return (
    <>
      <div className="shadow-lg">
        <Navbar />
        <div className="pt-20">
        </div>
        <div className="flex flex-row bg-white" style={{ height: 'calc(100vh - 70px)' }}>
          {/* <!-- Vendor Chat List --> */}
          <div className="w-1/4 flex flex-col border-r border-gray-200 overflow-y-auto">
            <div className="bg-blue-600 text-white p-4 w-full">
              <h1 className="font-bold text-3xl">Chats</h1>
            </div>

            {chats.map((chat, index) => (
              <div key={index}
                className="flex flex-row items-center p-4 hover:bg-blue-100 cursor-pointer border-b border-gray-100"
                onClick={() => selectChat(chat)}>
                <div className="flex-grow">
                  <h2 className="text-lg font-semibold">{chat.customerUsername}</h2>
                  <p className="text-gray-600">{chat.fromVendor ? 'You: ' : ''}{chat.lastMessage}</p>
                </div>
              </div>
            ))}
          </div>

          {/* <!-- Chat Detail View --> */}
          <div className="w-3/4 flex flex-col overflow-y-auto">
            {selectedChat ? (
              <DisplayChatVendor customerID={customerID} />
            ) : (
              <div className="p-4">
                <div className="text-gray-800 text-xl font-semibold">Select a chat to view the conversation</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>

  )
};